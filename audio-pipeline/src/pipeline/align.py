"""Alinhamento forçado do texto revisado contra o áudio.

Conversão explícita MLX/Whisper -> formato do alinhador (WhisperX): cada segmento
vira {"text", "start", "end"} em segundos relativos à janela decodificada, e o
resultado volta para ms absolutos no MP3 original.

Origem do tempo de cada palavra (`timeSource`):
  - "aligner":      medido pelo alinhador (CTC wav2vec2) com score >= mínimo
  - "asr":          alinhador não mediu (ex.: numerais) ou score baixo; mantém o tempo
                    medido pelo ASR (cross-attention do Whisper) — precisa de revisão
  - "interpolated": nenhuma medição disponível; valor estimado, SEMPRE marcado para revisão
"""
from __future__ import annotations

import importlib.metadata
import re
import time
from pathlib import Path
from typing import Any, Callable

from .audio import Chunk, extract_wav
from .config import AlignParams, params_dict
from .util import atomic_write_json, read_json_or_none, sha256_json

_NORMALIZE = re.compile(r"[^a-z0-9']+")


def normalize_token(text: str) -> str:
    return _NORMALIZE.sub("", text.lower().replace("’", "'"))


def _versions() -> dict[str, str]:
    out = {}
    for name in ("whisperx", "torch", "torchaudio"):
        try:
            out[name] = importlib.metadata.version(name)
        except importlib.metadata.PackageNotFoundError:
            out[name] = "ausente"
    return out


class WhisperXAligner:
    name = "whisperx"

    def __init__(self, params: AlignParams) -> None:
        import whisperx

        self._wx = whisperx
        self._params = params
        self._model, self._metadata = whisperx.load_align_model(language_code=params.language, device=params.device)
        self.model_name = "WAV2VEC2_ASR_BASE_960H (torchaudio)" if params.language == "en" else "padrão do WhisperX"

    def align(self, wav_path: Path, segments: list[dict[str, Any]]) -> list[dict[str, Any]]:
        """`segments`: [{"text","start","end"}] em segundos relativos ao WAV. Retorna word_segments."""
        audio = self._wx.load_audio(str(wav_path))
        result = self._wx.align(
            segments, self._model, self._metadata, audio, self._params.device, return_char_alignments=False
        )
        return list(result.get("word_segments", []))


def get_aligner(params: AlignParams) -> WhisperXAligner:
    if params.engine == "whisperx":
        return WhisperXAligner(params)
    raise ValueError(f"alinhador desconhecido: {params.engine} (use whisperx)")


def _align_chunk(
    aligner: WhisperXAligner, wav: Path, chunk: Chunk, segments: list[dict[str, Any]], params: AlignParams
) -> list[dict[str, Any]]:
    """Alinha os segmentos de uma janela. Retorna palavras na mesma ordem e quantidade da entrada."""
    span_ms = chunk.decode_end_ms - chunk.decode_start_ms
    wx_segments = []
    for seg in segments:
        start = max(0, seg["startMs"] - chunk.decode_start_ms)
        end = min(span_ms, seg["endMs"] - chunk.decode_start_ms)
        if end <= start:
            end = min(span_ms, start + 200)
        wx_segments.append(
            {"text": " ".join(w["word"] for w in seg["words"]), "start": start / 1000, "end": end / 1000}
        )
    aligned = aligner.align(wav, wx_segments)

    source_words = [w for seg in segments for w in seg["words"]]
    # O WhisperX separa por espaços; a sequência deve casar 1:1 com as palavras de entrada.
    one_to_one = len(aligned) == len(source_words) and all(
        normalize_token(str(a.get("word", ""))) == normalize_token(s["word"]) for a, s in zip(aligned, source_words)
    )
    out: list[dict[str, Any]] = []
    for index, src in enumerate(source_words):
        word: dict[str, Any] = {"id": src["id"], "word": src["word"]}
        if src.get("corrected"):
            word["corrected"] = True
        measured = aligned[index] if one_to_one else None
        score = measured.get("score") if measured else None
        if (
            measured is not None
            and measured.get("start") is not None
            and measured.get("end") is not None
            and score is not None
            and float(score) >= params.min_word_score
        ):
            word["startMs"] = int(round(float(measured["start"]) * 1000)) + chunk.decode_start_ms
            word["endMs"] = int(round(float(measured["end"]) * 1000)) + chunk.decode_start_ms
            word["timeSource"] = "aligner"
            word["score"] = round(float(score), 3)
        else:
            word["startMs"] = src["startMs"]
            word["endMs"] = src["endMs"]
            word["timeSource"] = "asr"
            if score is not None:
                word["score"] = round(float(score), 3)
            word["reason"] = (
                "sequência do alinhador não casou com o texto"
                if not one_to_one
                else ("sem medição do alinhador" if score is None else "score abaixo do mínimo")
            )
        out.append(word)
    return out


def enforce_monotonic(words: list[dict[str, Any]], duration_ms: int) -> int:
    """Garante ordem temporal e limites válidos. Palavras corrigidas viram 'interpolated'.

    Retorna quantas palavras precisaram de correção.
    """
    fixed = 0
    previous_end = 0
    for index, word in enumerate(words):
        start, end = int(word["startMs"]), int(word["endMs"])
        end = min(end, duration_ms)
        # Pequena sobreposição com a palavra anterior: apenas recorta o início (segue medido).
        if start < previous_end < end:
            start = previous_end
        word["startMs"], word["endMs"] = start, end
        ok = 0 <= start < end <= duration_ms and start >= previous_end
        if not ok:
            # Não há medição utilizável: estima entre os vizinhos e marca explicitamente.
            next_start = duration_ms
            for later in words[index + 1 :]:
                if later["timeSource"] == "aligner" and later["startMs"] > previous_end:
                    next_start = int(later["startMs"])
                    break
            pending = 1
            for later in words[index + 1 :]:
                if later["timeSource"] == "aligner" and later["startMs"] > previous_end:
                    break
                pending += 1
            room = max(pending, next_start - previous_end)
            slot = max(1, room // pending)
            start = min(max(previous_end, 0), max(0, duration_ms - 1))
            end = min(duration_ms, start + slot)
            if end <= start:
                end = min(duration_ms, start + 1)
            word["startMs"], word["endMs"] = start, end
            word["timeSource"] = "interpolated"
            word["reason"] = "tempo fora de ordem ou inválido; valor estimado, não medido"
            word.pop("score", None)
            fixed += 1
        previous_end = int(word["endMs"])
    return fixed


def align_transcript(
    source: Path,
    reviewed: dict[str, Any],
    chunks: list[Chunk],
    work_dir: Path,
    params: AlignParams,
    audio_sha256: str,
    duration_ms: int,
    log: Callable[[str], None] = print,
) -> dict[str, Any]:
    versions = _versions()
    chunk_dir = work_dir / "chunks"
    tmp_dir = work_dir / "tmp"
    by_chunk: dict[int, list[dict[str, Any]]] = {}
    for seg in reviewed["segments"]:
        by_chunk.setdefault(int(seg["chunk"]), []).append(seg)

    aligner: WhisperXAligner | None = None
    words: list[dict[str, Any]] = []
    elapsed_total = 0.0
    for chunk in chunks:
        segments = by_chunk.get(chunk.index, [])
        if not segments:
            continue
        key = sha256_json(
            {
                "audio": audio_sha256,
                "chunk": chunk.__dict__,
                "align": params_dict(params),
                "versions": versions,
                "segments": [[s["startMs"], s["endMs"], [w["word"] for w in s["words"]]] for s in segments],
            }
        )
        checkpoint = chunk_dir / f"align-{chunk.index:04d}.json"
        cached = read_json_or_none(checkpoint)
        if cached and cached.get("inputsHash") == key:
            words.extend(cached["words"])
            log(f"  alinhamento janela {chunk.index + 1}/{len(chunks)}: checkpoint reutilizado")
            continue
        if aligner is None:
            aligner = get_aligner(params)
        wav = tmp_dir / f"chunk-{chunk.index:04d}.wav"
        if not wav.exists():
            extract_wav(source, wav, chunk.decode_start_ms, chunk.decode_end_ms)
        started = time.monotonic()
        chunk_words = _align_chunk(aligner, wav, chunk, segments, params)
        elapsed = time.monotonic() - started
        elapsed_total += elapsed
        atomic_write_json(checkpoint, {"inputsHash": key, "elapsedSeconds": round(elapsed, 2), "words": chunk_words})
        words.extend(chunk_words)
        audio_seconds = (chunk.decode_end_ms - chunk.decode_start_ms) / 1000
        log(
            f"  alinhamento janela {chunk.index + 1}/{len(chunks)}: {audio_seconds:.0f}s de áudio em {elapsed:.1f}s "
            f"({audio_seconds / max(elapsed, 0.01):.1f}x tempo real)"
        )

    interpolated = enforce_monotonic(words, duration_ms)
    counts = {"aligner": 0, "asr": 0, "interpolated": 0}
    for word in words:
        counts[word["timeSource"]] += 1
    total = max(1, len(words))
    return {
        "engine": params.engine,
        "model": aligner.model_name if aligner else "checkpoint",
        "packageVersions": versions,
        "params": params_dict(params),
        "durationMs": duration_ms,
        "words": words,
        "stats": {
            "words": len(words),
            "bySource": counts,
            "alignedRatio": round(counts["aligner"] / total, 4),
            "interpolatedByOrderFix": interpolated,
        },
        "alignSecondsThisRun": round(elapsed_total, 2),
    }
