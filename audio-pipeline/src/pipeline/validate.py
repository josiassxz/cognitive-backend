"""Validação estrutural. Passar aqui NÃO significa "perfeitamente sincronizado":
significa apenas que os dados são coerentes. A validação auditiva é separada."""
from __future__ import annotations

from typing import Any


def utf16_len(text: str) -> int:
    """Offsets de destaque usam unidades UTF-16 (mesma convenção de String.length no JS)."""
    return len(text.encode("utf-16-le")) // 2


def utf16_slice(text: str, start: int, end: int) -> str:
    return text.encode("utf-16-le")[start * 2 : end * 2].decode("utf-16-le", errors="replace")


def validate_content(
    words: list[dict[str, Any]],
    segments: list[dict[str, Any]],
    duration_ms: int,
    translations: dict[str, Any] | None = None,
    excluded_word_ids: set[str] | None = None,
) -> dict[str, Any]:
    errors: list[str] = []
    warnings: list[str] = []
    excluded = excluded_word_ids or set()

    # Palavras: limites e ordem monotônica.
    previous_end = 0
    for word in words:
        start, end = word["startMs"], word["endMs"]
        if not (isinstance(start, int) and isinstance(end, int)):
            errors.append(f"{word['id']}: tempos não inteiros")
            continue
        if not (0 <= start < end <= duration_ms):
            errors.append(f"{word['id']}: intervalo inválido {start}-{end} (duração {duration_ms})")
        if start < previous_end:
            errors.append(f"{word['id']}: fora de ordem (início {start} < fim anterior {previous_end})")
        previous_end = max(previous_end, end)

    # Trechos: partição exata das palavras aprovadas, na ordem original.
    index_of = {word["id"]: i for i, word in enumerate(words)}
    approved = [w["id"] for w in words if w["id"] not in excluded]
    covered: list[str] = []
    seen_ids: set[str] = set()
    for position, seg in enumerate(segments):
        label = f"{seg.get('id', '?')} (#{position})"
        if seg["id"] in seen_ids:
            errors.append(f"{label}: id de trecho repetido")
        seen_ids.add(seg["id"])
        if seg.get("index") != position:
            errors.append(f"{label}: index {seg.get('index')} não corresponde à posição")
        first, last = index_of.get(seg["firstWordId"]), index_of.get(seg["lastWordId"])
        if first is None or last is None or first > last:
            errors.append(f"{label}: limites de palavras inválidos")
            continue
        seg_words = [w for w in words[first : last + 1] if w["id"] not in excluded]
        covered.extend(w["id"] for w in seg_words)
        if not seg_words:
            errors.append(f"{label}: trecho sem palavras")
            continue
        if seg["text"] != " ".join(w["word"] for w in seg_words):
            errors.append(f"{label}: texto difere das palavras")
        if seg["startMs"] != seg_words[0]["startMs"] or seg["endMs"] != seg_words[-1]["endMs"]:
            errors.append(f"{label}: startMs/endMs não derivam das palavras")
        if not (0 <= seg["startMs"] < seg["endMs"] <= duration_ms):
            errors.append(f"{label}: intervalo inválido")
        if not (0 <= seg["playStartMs"] <= seg["startMs"] and seg["endMs"] <= seg["playEndMs"] <= duration_ms):
            errors.append(f"{label}: limites de reprodução não contêm o trecho")
        prev_end = words[first - 1]["endMs"] if first > 0 else 0
        next_start = words[last + 1]["startMs"] if last + 1 < len(words) else duration_ms
        if seg["playStartMs"] < prev_end and prev_end <= seg["startMs"]:
            errors.append(f"{label}: playStartMs invade a palavra anterior")
        if seg["playEndMs"] > next_start and next_start >= seg["endMs"]:
            errors.append(f"{label}: playEndMs invade a palavra seguinte")
        if seg["quality"] not in {"ok", "needs_review"}:
            errors.append(f"{label}: quality inválido")
    if covered != approved:
        missing = [w for w in approved if w not in set(covered)]
        duplicated = len(covered) - len(set(covered))
        errors.append(
            f"partição inválida: {len(missing)} palavra(s) sem trecho, {duplicated} duplicada(s) "
            f"ou ordem alterada (ex.: {missing[:3]})"
        )

    # Traduções.
    translation_status = "translation_pending"
    if translations is not None:
        items = translations.get("items", {})
        seg_ids = [s["id"] for s in segments]
        missing_ids = [i for i in seg_ids if i not in items]
        extra_ids = [i for i in items if i not in set(seg_ids)]
        if missing_ids:
            errors.append(f"tradução ausente para {len(missing_ids)} trecho(s) (ex.: {missing_ids[:3]})")
        if extra_ids:
            errors.append(f"tradução com {len(extra_ids)} id(s) inexistente(s) (ex.: {extra_ids[:3]})")
        by_id = {s["id"]: s for s in segments}
        for seg_id, item in items.items():
            seg = by_id.get(seg_id)
            if seg is None:
                continue
            if item.get("sourceText") != seg["text"]:
                errors.append(f"{seg_id}: tradução feita sobre texto inglês diferente do atual")
            text = item.get("translation", "")
            if not isinstance(text, str) or not text.strip():
                errors.append(f"{seg_id}: tradução vazia")
                continue
            valid_word_ids = {w["id"] for w in words[index_of[seg["firstWordId"]] : index_of[seg["lastWordId"]] + 1]}
            for highlight in item.get("highlights", []):
                if not highlight.get("wordIds") or not set(highlight["wordIds"]) <= valid_word_ids:
                    errors.append(f"{seg_id}: destaque com wordIds fora do trecho")
                pt = highlight.get("pt", {})
                start, end = pt.get("start"), pt.get("end")
                if not (isinstance(start, int) and isinstance(end, int) and 0 <= start < end <= utf16_len(text)):
                    errors.append(f"{seg_id}: destaque PT com offsets inválidos")
                elif utf16_slice(text, start, end) != pt.get("text"):
                    errors.append(f"{seg_id}: destaque PT não corresponde ao texto no intervalo")
        if not missing_ids and not extra_ids:
            translation_status = "complete"

    by_source: dict[str, int] = {}
    for word in words:
        by_source[word["timeSource"]] = by_source.get(word["timeSource"], 0) + 1
    review_segments = [s["id"] for s in segments if s["quality"] == "needs_review"]
    durations = [s["endMs"] - s["startMs"] for s in segments]
    counts = [s["wordCount"] for s in segments]
    if words and by_source.get("aligner", 0) / len(words) < 0.9:
        warnings.append("menos de 90% das palavras medidas pelo alinhador")
    return {
        "status": "valid" if not errors else "invalid",
        "errors": errors,
        "warnings": warnings,
        "translationStatus": translation_status,
        "stats": {
            "words": len(words),
            "wordsByTimeSource": by_source,
            "alignedRatio": round(by_source.get("aligner", 0) / max(1, len(words)), 4),
            "segments": len(segments),
            "segmentsNeedingReview": len(review_segments),
            "segmentWords": {"min": min(counts, default=0), "max": max(counts, default=0), "avg": round(sum(counts) / max(1, len(counts)), 2)},
            "segmentMs": {"min": min(durations, default=0), "max": max(durations, default=0), "avg": round(sum(durations) / max(1, len(durations)))},
        },
        "segmentsNeedingReview": review_segments,
        "auditoryValidation": "pending",
        "note": "Validação estrutural apenas. Escuta humana de todos os trechos ainda é necessária antes de 'ready'.",
    }
