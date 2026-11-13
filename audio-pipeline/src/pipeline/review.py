"""Revisão automática do ASR: sinaliza problemas, nunca inventa texto.

Gera `transcript.reviewed.json` a partir do bruto. Correções humanas (ou baseadas em
evidência) são registradas em `corrections` com autor, motivo e valor anterior; qualquer
mudança no inglês muda o hash de entrada do alinhamento e dispara realinhamento.
"""
from __future__ import annotations

from typing import Any

from .util import now_iso, sha256_json


REVIEW_RULES = "review-v3"


def _silence_overlap(start: int, end: int, silences: list[tuple[int, int]]) -> int:
    total = 0
    for s_start, s_end in silences:
        if s_end <= start:
            continue
        if s_start >= end:
            break
        total += min(end, s_end) - max(start, s_start)
    return total


def detect_flags(raw: dict[str, Any], silences: list[tuple[int, int]], duration_ms: int) -> list[dict[str, Any]]:
    flags: list[dict[str, Any]] = []
    segments = raw["segments"]

    if raw.get("detectedLanguage") and raw["detectedLanguage"] != raw.get("language"):
        flags.append(
            {
                "kind": "language_mismatch",
                "detail": f"idioma detectado '{raw['detectedLanguage']}' difere do esperado '{raw.get('language')}'",
            }
        )

    repeat_run = 1
    for index, seg in enumerate(segments):
        ratio = seg.get("compressionRatio")
        if ratio is not None and ratio > 2.4:
            flags.append({"kind": "repetitive_text", "segment": seg["id"], "detail": f"compressionRatio={ratio}"})
        logprob = seg.get("avgLogprob")
        if logprob is not None and logprob < -1.0:
            flags.append({"kind": "low_confidence", "segment": seg["id"], "detail": f"avgLogprob={logprob}"})
        no_speech = seg.get("noSpeechProb")
        if no_speech is not None and no_speech > 0.6:
            flags.append(
                {"kind": "possible_hallucination_on_silence", "segment": seg["id"], "detail": f"noSpeechProb={no_speech}"}
            )
        # Texto atribuído a um intervalo quase todo silencioso = suspeita de alucinação.
        span = max(1, seg["endMs"] - seg["startMs"])
        if span >= 1500 and _silence_overlap(seg["startMs"], seg["endMs"], silences) / span > 0.85:
            flags.append({"kind": "text_over_silence", "segment": seg["id"], "detail": "trecho ≥85% silencioso"})
        if index > 0 and seg["text"].strip().lower() == segments[index - 1]["text"].strip().lower():
            repeat_run += 1
            if repeat_run == 3:
                flags.append({"kind": "spurious_repetition", "segment": seg["id"], "detail": "mesmo texto 3x seguidas"})
        else:
            repeat_run = 1

    # Omissões: intervalo longo sem palavras que NÃO é silêncio no áudio.
    words = [w for seg in segments for w in seg["words"]]
    boundaries = [(0, words[0]["startMs"], None, words[0]["id"])] if words else []
    for prev, nxt in zip(words, words[1:]):
        boundaries.append((prev["endMs"], nxt["startMs"], prev["id"], nxt["id"]))
    if words:
        boundaries.append((words[-1]["endMs"], duration_ms, words[-1]["id"], None))
    for gap_start, gap_end, before, after in boundaries:
        gap = gap_end - gap_start
        if gap < 2000:
            continue
        voiced = gap - _silence_overlap(gap_start, gap_end, silences)
        if voiced > 1500:
            flags.append(
                {
                    "kind": "possible_omission",
                    "afterWord": before,
                    "beforeWord": after,
                    "startMs": gap_start,
                    "endMs": gap_end,
                    "detail": f"{voiced} ms com som e sem palavras transcritas",
                }
            )
    if not words:
        flags.append({"kind": "no_speech", "detail": "nenhuma palavra reconhecida"})

    # Trechos longos sem pontuação final: o ASR perdeu a pontuação; a segmentação ali é menos confiável.
    run_start = 0
    for index, word in enumerate(words):
        closed = word["word"].rstrip("\"'”’)]").endswith((".", "!", "?", "…"))
        if closed or index == len(words) - 1:
            length = index - run_start + 1
            marks = sum(1 for w in words[run_start : index + 1] if w["word"].rstrip("\"'”’)]").endswith((",", ";", ":", ".", "!", "?")))
            # Frases longas legítimas têm vírgulas; só sinaliza quando quase não há pontuação.
            if length >= 30 and marks < length / 20:
                flags.append(
                    {
                        "kind": "punctuation_missing",
                        "fromWord": words[run_start]["id"],
                        "toWord": word["id"],
                        "detail": f"{length} palavras seguidas sem pontuação final",
                    }
                )
            run_start = index + 1
    return flags


# Rodapés lidos pelo TTS que não fazem parte da obra (mesmos marcadores do importador de livros).
_TAIL_MARKERS = [
    ["hope", "you", "have", "enjoyed", "the", "reading"],
    ["come", "back", "to", "http"],
    ["this", "material", "may", "be", "protected", "by", "copyright"],
]


def _plain(word: str) -> str:
    return "".join(ch for ch in word.lower() if ch.isalnum())


def detect_editorial_exclusions(segments: list[dict[str, Any]]) -> list[dict[str, Any]]:
    """Exclusão editorial explícita e reversível: rodapé do site lido ao final do áudio."""
    words = [w for seg in segments for w in seg["words"]]
    tokens = [_plain(w["word"]) for w in words]
    tail_zone = max(0, len(tokens) - 120)  # só no final do áudio
    first_hit = None
    for marker in _TAIL_MARKERS:
        for start in range(tail_zone, len(tokens) - len(marker) + 1):
            if tokens[start : start + len(marker)] == marker:
                first_hit = start if first_hit is None else min(first_hit, start)
                break
    if first_hit is None:
        return []
    return [
        {
            "fromWordId": words[first_hit]["id"],
            "toWordId": words[-1]["id"],
            "wordCount": len(words) - first_hit,
            "reason": "rodapé do site de origem lido pelo narrador (não faz parte do texto)",
            "auto": True,
        }
    ]


def excluded_word_ids(reviewed: dict[str, Any]) -> set[str]:
    words = [w["id"] for seg in reviewed["segments"] for w in seg["words"]]
    position = {word_id: i for i, word_id in enumerate(words)}
    out: set[str] = set()
    for exclusion in reviewed.get("exclusions", []):
        a, b = position.get(exclusion["fromWordId"]), position.get(exclusion["toWordId"])
        if a is not None and b is not None and a <= b:
            out.update(words[a : b + 1])
    return out


def build_reviewed(raw: dict[str, Any], raw_hash: str, flags: list[dict[str, Any]], previous: dict[str, Any] | None) -> dict[str, Any]:
    """Cria o transcript revisado; reaplica correções rastreadas feitas sobre o mesmo bruto."""
    corrections = []
    if previous and previous.get("basedOnRawHash") == raw_hash:
        corrections = list(previous.get("corrections", []))
    segments = [
        {
            "id": seg["id"],
            "chunk": seg["chunk"],
            "startMs": seg["startMs"],
            "endMs": seg["endMs"],
            "words": [{"id": w["id"], "word": w["word"], "startMs": w["startMs"], "endMs": w["endMs"]} for w in seg["words"]],
        }
        for seg in raw["segments"]
    ]
    by_id = {w["id"]: w for seg in segments for w in seg["words"]}
    for correction in corrections:
        target = by_id.get(correction["wordId"])
        if target is not None:
            target["word"] = correction["after"]
            target["corrected"] = True
    for seg in segments:
        seg["text"] = " ".join(w["word"] for w in seg["words"])
    return {
        "basedOnRawHash": raw_hash,
        "reviewRules": REVIEW_RULES,
        "language": raw.get("language"),
        "flags": flags,
        "corrections": corrections,
        "exclusions": (
            previous["exclusions"]
            if previous and previous.get("basedOnRawHash") == raw_hash and "exclusions" in previous
            else detect_editorial_exclusions(segments)
        ),
        "segments": segments,
        "text": " ".join(seg["text"] for seg in segments),
    }


def apply_correction(reviewed: dict[str, Any], word_id: str, new_text: str, author: str, reason: str) -> dict[str, Any]:
    """Corrige UMA palavra (mesma contagem de tokens), registrando rastro."""
    new_text = new_text.strip()
    if not new_text or " " in new_text:
        raise ValueError("a correção deve ser exatamente uma palavra (sem espaços)")
    for seg in reviewed["segments"]:
        for word in seg["words"]:
            if word["id"] == word_id:
                before = word["word"]
                if before == new_text:
                    return reviewed
                word["word"] = new_text
                word["corrected"] = True
                seg["text"] = " ".join(w["word"] for w in seg["words"])
                reviewed["corrections"] = [c for c in reviewed.get("corrections", []) if c["wordId"] != word_id]
                reviewed["corrections"].append(
                    {"wordId": word_id, "before": before, "after": new_text, "author": author, "reason": reason, "at": now_iso()}
                )
                reviewed["text"] = " ".join(s["text"] for s in reviewed["segments"])
                return reviewed
    raise KeyError(f"palavra {word_id} não encontrada")


def alignment_input_hash(reviewed: dict[str, Any]) -> str:
    return sha256_json([[s["chunk"], s["startMs"], s["endMs"], [w["word"] for w in s["words"]]] for s in reviewed["segments"]])
