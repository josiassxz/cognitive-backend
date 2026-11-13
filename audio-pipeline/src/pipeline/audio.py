"""FFprobe/FFmpeg: metadados reais, decodificação de janelas e detecção de pausas.

A linha do tempo original do MP3 é sempre preservada: nenhuma etapa remove silêncio
ou altera velocidade. Janelas são extraídas com offset absoluto conhecido.
"""
from __future__ import annotations

import json
import re
from dataclasses import dataclass
from pathlib import Path

from .config import ChunkParams
from .util import run


class AudioError(RuntimeError):
    pass


@dataclass(frozen=True)
class AudioInfo:
    duration_ms: int
    codec: str
    channels: int
    sample_rate: int
    bit_rate: int | None
    format_name: str


def probe(path: Path) -> AudioInfo:
    result = run(
        [
            "ffprobe", "-v", "error", "-select_streams", "a:0",
            "-show_entries", "format=duration,bit_rate,format_name:stream=codec_name,channels,sample_rate",
            "-of", "json", str(path),
        ],
        timeout=120,
    )
    if result.returncode != 0:
        raise AudioError(f"ffprobe falhou: {result.stderr.strip()[:300]}")
    data = json.loads(result.stdout or "{}")
    streams = data.get("streams") or []
    fmt = data.get("format") or {}
    if not streams or "duration" not in fmt:
        raise AudioError("arquivo sem stream de áudio ou sem duração")
    stream = streams[0]
    bit_rate = fmt.get("bit_rate")
    return AudioInfo(
        duration_ms=int(round(float(fmt["duration"]) * 1000)),
        codec=str(stream.get("codec_name", "")),
        channels=int(stream.get("channels", 0)),
        sample_rate=int(stream.get("sample_rate", 0)),
        bit_rate=int(bit_rate) if bit_rate and str(bit_rate).isdigit() else None,
        format_name=str(fmt.get("format_name", "")),
    )


def extract_wav(source: Path, dest: Path, start_ms: int, end_ms: int) -> None:
    """Decodifica [start_ms, end_ms) para PCM mono 16 kHz. `-ss` depois de `-i` = corte exato."""
    dest.parent.mkdir(parents=True, exist_ok=True)
    result = run(
        [
            "ffmpeg", "-nostdin", "-v", "error", "-y", "-i", str(source),
            "-ss", f"{start_ms / 1000:.3f}", "-t", f"{(end_ms - start_ms) / 1000:.3f}",
            "-vn", "-ac", "1", "-ar", "16000", "-c:a", "pcm_s16le", str(dest),
        ],
        timeout=3600,
    )
    if result.returncode != 0 or not dest.exists() or dest.stat().st_size < 100:
        raise AudioError(f"ffmpeg falhou ao decodificar janela: {result.stderr.strip()[:300]}")


_SILENCE_START = re.compile(r"silence_start: (-?[0-9.]+)")
_SILENCE_END = re.compile(r"silence_end: (-?[0-9.]+)")


def detect_silences(source: Path, params: ChunkParams) -> list[tuple[int, int]]:
    """Pausas (start_ms, end_ms) na linha do tempo original."""
    result = run(
        [
            "ffmpeg", "-nostdin", "-v", "info", "-i", str(source), "-vn",
            "-af", f"silencedetect=noise={params.silence_db}dB:d={params.min_silence_seconds}",
            "-f", "null", "-",
        ],
        timeout=7200,
    )
    if result.returncode != 0:
        raise AudioError(f"silencedetect falhou: {result.stderr.strip()[-300:]}")
    silences: list[tuple[int, int]] = []
    start: float | None = None
    for line in result.stderr.splitlines():
        match = _SILENCE_START.search(line)
        if match:
            start = max(0.0, float(match.group(1)))
            continue
        match = _SILENCE_END.search(line)
        if match and start is not None:
            silences.append((int(round(start * 1000)), int(round(float(match.group(1)) * 1000))))
            start = None
    return silences


@dataclass(frozen=True)
class Chunk:
    index: int
    # trecho decodificado (pode incluir sobreposição)
    decode_start_ms: int
    decode_end_ms: int
    # trecho "dono": palavras cujo ponto médio cai aqui pertencem a este chunk
    own_start_ms: int
    own_end_ms: int
    cut_kind: str  # "silence" | "overlap" | "end"


def plan_chunks(duration_ms: int, silences: list[tuple[int, int]], params: ChunkParams) -> list[Chunk]:
    """Divide o áudio em janelas, cortando no meio de pausas quando possível.

    Sem pausa utilizável perto do corte, usa sobreposição e a regra do ponto médio
    para que nenhuma palavra seja perdida nem duplicada.
    """
    target = int(params.target_seconds * 1000)
    search = int(params.search_seconds * 1000)
    overlap = int(params.overlap_seconds * 1000)
    if duration_ms <= target + search:
        return [Chunk(0, 0, duration_ms, 0, duration_ms, "end")]

    cuts: list[tuple[int, str]] = []
    cursor = 0
    while duration_ms - cursor > target + search:
        ideal = cursor + target
        best: tuple[int, int] | None = None  # (distância, ponto de corte)
        for s_start, s_end in silences:
            mid = (s_start + s_end) // 2
            if mid <= cursor or mid >= duration_ms:
                continue
            dist = abs(mid - ideal)
            if dist <= search and (best is None or dist < best[0]):
                best = (dist, mid)
        if best is not None:
            cuts.append((best[1], "silence"))
            cursor = best[1]
        else:
            cuts.append((ideal, "overlap"))
            cursor = ideal

    chunks: list[Chunk] = []
    prev_cut, prev_kind = 0, "start"
    for index, (cut, kind) in enumerate([*cuts, (duration_ms, "end")]):
        decode_start = prev_cut - overlap if prev_kind == "overlap" else prev_cut
        decode_end = cut + overlap if kind == "overlap" else cut
        chunks.append(
            Chunk(
                index=index,
                decode_start_ms=max(0, decode_start),
                decode_end_ms=min(duration_ms, decode_end),
                own_start_ms=prev_cut,
                own_end_ms=cut,
                cut_kind=kind,
            )
        )
        prev_cut, prev_kind = cut, kind
    return chunks
