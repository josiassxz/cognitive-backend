"""Auditoria automática dos cortes (NÃO substitui a escuta humana).

Para cada trecho, decodifica exatamente [playStartMs, playEndMs] do MP3 original,
re-transcreve o clipe isolado e compara com o texto esperado. Detecta:
  - palavra inicial/final cortada (faltando no clipe)
  - vazamento da linha vizinha (palavra a mais no início/fim)
É um indicador independente do alinhador, mas o ASR em clipes curtos também erra;
divergências viram itens para escuta, não vereditos.
"""
from __future__ import annotations

import shutil
from pathlib import Path
from typing import Any, Callable

from .align import normalize_token
from .asr import get_adapter
from .audio import extract_wav
from .config import AsrParams
from .util import atomic_write_json, now_iso, read_json


def _tokens(text: str) -> list[str]:
    return [t for t in (normalize_token(part) for part in text.split()) if t]


def classify(expected: list[str], heard: list[str], prev_last: str | None, next_first: str | None) -> str:
    if heard == expected:
        return "match"
    if not heard:
        return "empty"
    if len(heard) > len(expected) and heard[-len(expected) :] == expected:
        return "leading_extra_prev_word" if prev_last and heard[0] == prev_last else "leading_extra"
    if len(heard) > len(expected) and heard[: len(expected)] == expected:
        return "trailing_extra_next_word" if next_first and heard[-1] == next_first else "trailing_extra"
    if len(heard) < len(expected) and expected[1:] == heard:
        return "first_word_missing"
    if len(heard) < len(expected) and expected[:-1] == heard:
        return "last_word_missing"
    if len(heard) == len(expected):
        diffs = sum(1 for a, b in zip(expected, heard) if a != b)
        return "one_word_differs" if diffs == 1 else "text_differs"
    return "text_differs"


def audit_clips(job_dir: Path, source: Path, params: AsrParams, log: Callable[[str], None] = print) -> dict[str, Any]:
    segments = read_json(job_dir / "segments.json")["segments"]
    adapter = get_adapter(params.engine)
    tmp = job_dir / "tmp-audit"
    tmp.mkdir(parents=True, exist_ok=True)
    rows = []
    counts: dict[str, int] = {}
    try:
        for index, seg in enumerate(segments):
            wav = tmp / f"{seg['id']}.wav"
            extract_wav(source, wav, seg["playStartMs"], seg["playEndMs"])
            raw = adapter.transcribe(wav, params)
            heard_text = " ".join(str(s.get("text", "")).strip() for s in raw.get("segments", []))
            expected, heard = _tokens(seg["text"]), _tokens(heard_text)
            prev_last = _tokens(segments[index - 1]["text"])[-1] if index > 0 else None
            next_first = _tokens(segments[index + 1]["text"])[0] if index + 1 < len(segments) else None
            verdict = classify(expected, heard, prev_last, next_first)
            counts[verdict] = counts.get(verdict, 0) + 1
            rows.append({"id": seg["id"], "index": seg["index"], "verdict": verdict, "expected": seg["text"], "heard": heard_text})
            wav.unlink(missing_ok=True)
            if (index + 1) % 20 == 0:
                log(f"  auditados {index + 1}/{len(segments)}")
    finally:
        shutil.rmtree(tmp, ignore_errors=True)
    report = {
        "generatedAt": now_iso(),
        "method": "re-transcrição de cada clipe [playStartMs, playEndMs] com o mesmo ASR",
        "limitations": "indicador automático; não substitui escuta humana. ASR em clipes curtos pode errar.",
        "summary": {"segments": len(segments), "byVerdict": dict(sorted(counts.items())),
                    "matchRatio": round(counts.get("match", 0) / max(1, len(segments)), 4)},
        "items": rows,
    }
    atomic_write_json(job_dir / "clip-audit.json", report)
    return report
