"""Transcrição local (sem API da OpenAI) com adaptadores intercambiáveis.

Cada adaptador recebe um WAV 16 kHz mono de uma janela e devolve segmentos com
palavras em segundos relativos à janela. A conversão para milissegundos absolutos
e a deduplicação de sobreposições acontecem em `transcribe_chunks`.
"""
from __future__ import annotations

import importlib.metadata
import time
from pathlib import Path
from typing import Any, Callable, Protocol

from .audio import Chunk, extract_wav
from .config import AsrParams, params_dict
from .util import atomic_write_json, read_json_or_none, sha256_json


class AsrAdapter(Protocol):
    name: str

    def versions(self) -> dict[str, str]: ...

    def transcribe(self, wav_path: Path, params: AsrParams) -> dict[str, Any]: ...

    def detect_language(self, wav_path: Path, params: AsrParams) -> str | None: ...


def _pkg_version(name: str) -> str:
    try:
        return importlib.metadata.version(name)
    except importlib.metadata.PackageNotFoundError:
        return "ausente"


def _hf_snapshot_revision(repo: str) -> str | None:
    """Revisão (commit) do modelo no cache local do Hugging Face, quando disponível."""
    try:
        from huggingface_hub import scan_cache_dir

        for cached in scan_cache_dir().repos:
            if cached.repo_id == repo:
                revisions = sorted(cached.revisions, key=lambda r: r.last_modified, reverse=True)
                if revisions:
                    return revisions[0].commit_hash
    except Exception:
        return None
    return None


class MlxWhisperAdapter:
    name = "mlx"

    def versions(self) -> dict[str, str]:
        return {"mlx-whisper": _pkg_version("mlx-whisper"), "mlx": _pkg_version("mlx")}

    def transcribe(self, wav_path: Path, params: AsrParams) -> dict[str, Any]:
        import mlx_whisper

        return mlx_whisper.transcribe(
            str(wav_path),
            path_or_hf_repo=params.model,
            language=params.language,
            word_timestamps=True,
            condition_on_previous_text=params.condition_on_previous_text,
            verbose=None,
        )

    def detect_language(self, wav_path: Path, params: AsrParams) -> str | None:
        import mlx_whisper

        result = mlx_whisper.transcribe(
            str(wav_path), path_or_hf_repo=params.model, clip_timestamps=[0, 30], verbose=None
        )
        return result.get("language")


class FasterWhisperAdapter:
    """Fallback em CPU (CTranslate2) caso o MLX não funcione no ambiente."""

    name = "faster-whisper"

    def __init__(self) -> None:
        self._model = None

    def versions(self) -> dict[str, str]:
        return {"faster-whisper": _pkg_version("faster-whisper"), "ctranslate2": _pkg_version("ctranslate2")}

    def _load(self, params: AsrParams):
        if self._model is None:
            from faster_whisper import WhisperModel

            self._model = WhisperModel(params.model, device="cpu", compute_type="int8")
        return self._model

    def transcribe(self, wav_path: Path, params: AsrParams) -> dict[str, Any]:
        segments_iter, info = self._load(params).transcribe(
            str(wav_path),
            language=params.language,
            word_timestamps=True,
            condition_on_previous_text=params.condition_on_previous_text,
        )
        segments = []
        for seg in segments_iter:
            segments.append(
                {
                    "start": seg.start,
                    "end": seg.end,
                    "text": seg.text,
                    "avg_logprob": seg.avg_logprob,
                    "no_speech_prob": seg.no_speech_prob,
                    "compression_ratio": seg.compression_ratio,
                    "temperature": seg.temperature,
                    "words": [
                        {"word": w.word, "start": w.start, "end": w.end, "probability": w.probability}
                        for w in (seg.words or [])
                    ],
                }
            )
        return {"language": info.language, "segments": segments}

    def detect_language(self, wav_path: Path, params: AsrParams) -> str | None:
        _, info = self._load(params).transcribe(str(wav_path), language=None)
        return info.language


def get_adapter(engine: str) -> AsrAdapter:
    if engine == "mlx":
        return MlxWhisperAdapter()
    if engine in {"faster-whisper", "whisper"}:
        return FasterWhisperAdapter()
    raise ValueError(f"ASR desconhecido: {engine} (use mlx ou faster-whisper)")


def _ms(seconds: float, offset_ms: int) -> int:
    return int(round(seconds * 1000)) + offset_ms


def _convert_chunk(raw: dict[str, Any], chunk: Chunk) -> list[dict[str, Any]]:
    """Segmentos da janela -> ms absolutos, mantendo só palavras que pertencem ao chunk."""
    segments: list[dict[str, Any]] = []
    for seg in raw.get("segments", []):
        words = []
        for word in seg.get("words") or []:
            text = str(word.get("word", "")).strip()
            if not text:
                continue
            start = _ms(float(word["start"]), chunk.decode_start_ms)
            end = _ms(float(word["end"]), chunk.decode_start_ms)
            midpoint = (start + end) // 2
            # Regra do ponto médio: cada palavra pertence a exatamente um chunk.
            if not (chunk.own_start_ms <= midpoint < chunk.own_end_ms):
                if not (chunk.cut_kind == "end" and midpoint >= chunk.own_end_ms):
                    continue
            entry = {"word": text, "startMs": start, "endMs": max(start, end)}
            # Só registra a probabilidade se o modelo realmente a devolveu.
            if word.get("probability") is not None:
                entry["probability"] = round(float(word["probability"]), 4)
            words.append(entry)
        if not words:
            continue
        item: dict[str, Any] = {
            "chunk": chunk.index,
            "startMs": words[0]["startMs"],
            "endMs": words[-1]["endMs"],
            "text": " ".join(w["word"] for w in words),
            "words": words,
        }
        for src, dst in (
            ("avg_logprob", "avgLogprob"),
            ("no_speech_prob", "noSpeechProb"),
            ("compression_ratio", "compressionRatio"),
            ("temperature", "temperature"),
        ):
            if seg.get(src) is not None:
                item[dst] = round(float(seg[src]), 4)
        segments.append(item)
    return segments


def transcribe_chunks(
    source: Path,
    chunks: list[Chunk],
    work_dir: Path,
    params: AsrParams,
    audio_sha256: str,
    log: Callable[[str], None] = print,
) -> dict[str, Any]:
    """Transcreve janela a janela, com checkpoint atômico por janela (retomável)."""
    adapter = get_adapter(params.engine)
    versions = adapter.versions()
    chunk_dir = work_dir / "chunks"
    tmp_dir = work_dir / "tmp"
    all_segments: list[dict[str, Any]] = []
    detected_language: str | None = None
    timings: list[float] = []

    for chunk in chunks:
        key = sha256_json(
            {"audio": audio_sha256, "chunk": chunk.__dict__, "asr": params_dict(params), "versions": versions}
        )
        checkpoint = chunk_dir / f"asr-{chunk.index:04d}.json"
        cached = read_json_or_none(checkpoint)
        if cached and cached.get("inputsHash") == key:
            all_segments.extend(cached["segments"])
            detected_language = detected_language or cached.get("detectedLanguage")
            log(f"  ASR janela {chunk.index + 1}/{len(chunks)}: checkpoint reutilizado")
            continue

        wav = tmp_dir / f"chunk-{chunk.index:04d}.wav"
        extract_wav(source, wav, chunk.decode_start_ms, chunk.decode_end_ms)
        started = time.monotonic()
        language = None
        if chunk.index == 0:
            language = adapter.detect_language(wav, params)
            detected_language = language
        raw = adapter.transcribe(wav, params)
        elapsed = time.monotonic() - started
        timings.append(elapsed)
        segments = _convert_chunk(raw, chunk)
        atomic_write_json(
            checkpoint,
            {"inputsHash": key, "detectedLanguage": language, "elapsedSeconds": round(elapsed, 2), "segments": segments},
        )
        all_segments.extend(segments)
        audio_seconds = (chunk.decode_end_ms - chunk.decode_start_ms) / 1000
        log(
            f"  ASR janela {chunk.index + 1}/{len(chunks)}: {audio_seconds:.0f}s de áudio em {elapsed:.1f}s "
            f"({audio_seconds / max(elapsed, 0.01):.1f}x tempo real)"
        )

    all_segments.sort(key=lambda s: (s["startMs"], s["endMs"]))
    word_counter = 0
    for index, seg in enumerate(all_segments, start=1):
        seg["id"] = f"r{index:05d}"
        for word in seg["words"]:
            word_counter += 1
            word["id"] = f"w{word_counter:06d}"

    return {
        "engine": adapter.name,
        "model": params.model,
        "modelRevision": _hf_snapshot_revision(params.model),
        "packageVersions": versions,
        "params": params_dict(params),
        "language": params.language,
        "detectedLanguage": detected_language,
        "chunks": [c.__dict__ for c in chunks],
        "segments": all_segments,
        "text": " ".join(seg["text"] for seg in all_segments),
        "wordCount": word_counter,
        "asrSecondsThisRun": round(sum(timings), 2),
    }
