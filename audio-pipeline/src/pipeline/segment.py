"""Segmentação didática: unidades naturais de escuta, não frases gramaticais rígidas.

Combina pontuação, pausas medidas e limites semânticos simples. Os tempos de cada
trecho vêm SEMPRE das palavras alinhadas (`firstWordId`/`lastWordId`); nada é derivado
de contagem de caracteres ou de palavras.
"""
from __future__ import annotations

import hashlib
import re
from typing import Any

from .config import SegmentParams

_ABBREVIATIONS = {"mr.", "mrs.", "ms.", "dr.", "st.", "prof.", "sr.", "jr.", "vs.", "etc.", "e.g.", "i.e.", "no."}
_TRAILING_CLOSERS = "\"'”’)]}»"
_STRONG_PUNCT = (",", ";", ":", "—", "–")

# Palavras que não devem terminar um trecho (ficariam soltas do que vem depois).
_NO_END = {
    "a", "an", "the", "of", "to", "in", "on", "at", "by", "for", "with", "from", "into", "onto", "upon", "about",
    "and", "or", "but", "nor", "so", "if", "as", "than", "that", "which", "who", "whom", "whose", "because",
    "when", "while", "where", "although", "though", "unless", "until", "since",
    "my", "your", "his", "her", "its", "our", "their", "this", "these", "those", "some", "any", "no", "every",
    "is", "am", "are", "was", "were", "be", "been", "being", "has", "have", "had", "do", "does", "did",
    "will", "would", "shall", "should", "can", "could", "may", "might", "must",
    "not", "never", "very", "too", "quite", "rather", "more", "most", "mr", "mrs", "dr",
}
# Partículas comuns de phrasal verbs: não separar do verbo anterior.
_PARTICLES = {"up", "out", "off", "down", "away", "back", "over", "on", "in", "along", "around", "through", "apart"}
_CONJUNCTIONS = {
    "and", "but", "or", "nor", "so", "yet", "because", "although", "though", "while", "when", "whenever", "where",
    "if", "unless", "until", "since", "before", "after", "that", "which", "who", "whom", "whose", "as", "then",
}
_PREPOSITIONS = {"in", "on", "at", "by", "for", "with", "from", "into", "to", "of", "about", "through", "under", "over", "towards", "toward", "without", "within"}

_NORM = re.compile(r"[^a-z']+")


def _norm(word: str) -> str:
    return _NORM.sub("", word.lower().replace("’", "'"))


def _core(word: str) -> str:
    return word.rstrip(_TRAILING_CLOSERS)


def is_sentence_end(word: str, next_word: str | None) -> bool:
    core = _core(word)
    if not core or core[-1] not in ".!?…":
        return False
    if core.lower() in _ABBREVIATIONS:
        return False
    # Inicial isolada ("J. R. R.") não fecha frase.
    if len(core) == 2 and core[0].isalpha() and core[1] == "." and next_word and next_word[:1].isupper():
        return False
    return True


def _ends_with_strong_punct(word: str) -> bool:
    core = word.rstrip("\"”)]}»")
    return bool(core) and (core.endswith(_STRONG_PUNCT) or word != core)


def _break_cost(words: list[dict[str, Any]], k: int, params: SegmentParams) -> float:
    """Custo de quebrar depois da palavra k (dentro de uma frase)."""
    current, following = words[k], words[k + 1]
    gap = following["startMs"] - current["endMs"]
    punct = _ends_with_strong_punct(current["word"])
    pause = gap >= params.pause_break_ms
    next_norm = _norm(following["word"])
    cur_norm = _norm(current["word"])
    # Pontuação perdida pelo ASR: maiúscula depois de uma pausa indica início de frase.
    starts_upper = following["word"][:1].isupper() and following["word"] not in {"I", "I'm", "I'll", "I've", "I'd"}
    if not punct and pause and starts_upper and not current["word"][:1].isupper():
        return 0.5
    if not punct and (cur_norm in _NO_END or (next_norm in _PARTICLES and not pause)):
        return 40.0  # quebra "proibida" (ainda possível se não houver alternativa)
    if punct and pause:
        return 0.0
    if punct:
        return 0.5
    if pause and next_norm in _CONJUNCTIONS:
        return 1.0
    if pause:
        return 2.0
    if next_norm in _CONJUNCTIONS:
        return 3.0
    if next_norm in _PREPOSITIONS:
        return 6.0
    return 12.0


def _span_cost(words: list[dict[str, Any]], i: int, j: int, params: SegmentParams) -> float:
    length = j - i + 1
    duration = words[j]["endMs"] - words[i]["startMs"]
    cost = ((length - params.target_words) / params.target_words) ** 2 * 4
    if length < params.min_words:
        cost += (params.min_words - length) * 3
    if length > params.max_words:
        cost += (length - params.max_words) * 6
    if duration > params.max_ms:
        cost += (duration - params.max_ms) / 1000 * 4
    return cost


def split_sentence(words: list[dict[str, Any]], params: SegmentParams) -> list[tuple[int, int]]:
    """Divide uma frase em trechos (índices inclusivos) por programação dinâmica."""
    n = len(words)
    duration = words[-1]["endMs"] - words[0]["startMs"]
    if n <= params.max_words and duration <= params.max_ms:
        return [(0, n - 1)]
    max_span = params.max_words * 2
    best: list[float] = [float("inf")] * (n + 1)
    back: list[int] = [0] * (n + 1)
    best[0] = 0.0
    for end in range(1, n + 1):
        for start in range(max(0, end - max_span), end):
            if best[start] == float("inf"):
                continue
            cost = best[start] + _span_cost(words, start, end - 1, params)
            if end < n:
                cost += _break_cost(words, end - 1, params)
            if cost < best[end]:
                best[end] = cost
                back[end] = start
    spans: list[tuple[int, int]] = []
    end = n
    while end > 0:
        start = back[end]
        spans.append((start, end - 1))
        end = start
    return list(reversed(spans))


def _merge_tiny(spans: list[tuple[int, int]], words: list[dict[str, Any]], params: SegmentParams) -> list[tuple[int, int]]:
    """Une trechos de 1–2 palavras ao vizinho quando cabem juntos (ex.: "Yes," + resto)."""
    merged: list[tuple[int, int]] = []
    for span in spans:
        if merged:
            prev = merged[-1]
            prev_len = prev[1] - prev[0] + 1
            cur_len = span[1] - span[0] + 1
            gap = words[span[0]]["startMs"] - words[prev[1]]["endMs"]
            combined_ms = words[span[1]]["endMs"] - words[prev[0]]["startMs"]
            if (
                (prev_len <= 2 or cur_len <= 2)
                and prev_len + cur_len <= params.max_words
                and combined_ms <= params.max_ms
                and gap <= 900
            ):
                merged[-1] = (prev[0], span[1])
                continue
        merged.append(span)
    return merged


def segment_id(content_key: str, first_word_id: str, last_word_id: str) -> str:
    digest = hashlib.sha256(f"{content_key}:{first_word_id}:{last_word_id}".encode()).hexdigest()
    return f"seg_{digest[:16]}"


def build_segments(
    content_key: str,
    words: list[dict[str, Any]],
    duration_ms: int,
    params: SegmentParams,
    excluded_ids: set[str] | None = None,
    review_word_ids: set[str] | None = None,
) -> list[dict[str, Any]]:
    """`words` é a lista COMPLETA (ordem do áudio). Palavras em `excluded_ids` não entram em
    nenhum trecho, mas continuam valendo como vizinhas para limitar a margem de reprodução."""
    excluded_ids = excluded_ids or set()
    review_word_ids = review_word_ids or set()
    if not words:
        return []
    # 1) sequências contínuas de palavras aprovadas -> frases
    spans: list[tuple[int, int]] = []
    run: list[int] = []

    def flush_run() -> None:
        if not run:
            return
        local = [words[i] for i in run]
        sentences: list[tuple[int, int]] = []
        start = 0
        for index, word in enumerate(local):
            nxt = local[index + 1]["word"] if index + 1 < len(local) else None
            if is_sentence_end(word["word"], nxt) or index == len(local) - 1:
                sentences.append((start, index))
                start = index + 1
        run_spans: list[tuple[int, int]] = []
        for s_start, s_end in sentences:
            for a, b in split_sentence(local[s_start : s_end + 1], params):
                run_spans.append((s_start + a, s_start + b))
        for a, b in _merge_tiny(run_spans, local, params):
            spans.append((run[a], run[b]))
        run.clear()

    for index, word in enumerate(words):
        if word["id"] in excluded_ids:
            flush_run()
        else:
            run.append(index)
    flush_run()

    # 2) materialização com limites linguísticos e de reprodução
    segments: list[dict[str, Any]] = []
    for index, (a, b) in enumerate(spans):
        seg_words = words[a : b + 1]
        start_ms, end_ms = seg_words[0]["startMs"], seg_words[-1]["endMs"]
        prev_end = words[a - 1]["endMs"] if a > 0 else 0
        next_start = words[b + 1]["startMs"] if b + 1 < len(words) else duration_ms
        # Margem só dentro do espaço livre entre palavras vizinhas.
        play_start = max(start_ms - params.play_pad_start_ms, min(start_ms, prev_end + params.neighbor_guard_ms), 0)
        play_end = min(end_ms + params.play_pad_end_ms, max(end_ms, next_start - params.neighbor_guard_ms), duration_ms)
        reasons = sorted({f"word_time_{w['timeSource']}" for w in seg_words if w["timeSource"] != "aligner"})
        if any(w.get("corrected") for w in seg_words):
            reasons.append("text_corrected")
        if any(w["id"] in review_word_ids for w in seg_words):
            reasons.append("asr_flagged")
        segments.append(
            {
                "id": segment_id(content_key, seg_words[0]["id"], seg_words[-1]["id"]),
                "index": index,
                "firstWordId": seg_words[0]["id"],
                "lastWordId": seg_words[-1]["id"],
                "text": " ".join(w["word"] for w in seg_words),
                "startMs": start_ms,
                "endMs": end_ms,
                "playStartMs": play_start,
                "playEndMs": play_end,
                "wordCount": len(seg_words),
                "quality": "needs_review" if reasons else "ok",
                "reviewReasons": reasons,
            }
        )
    return segments
