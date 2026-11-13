"""Configuração do worker. Tudo vem de variáveis de ambiente ou flags; nada de segredo em arquivo."""
from __future__ import annotations

import os
from dataclasses import asdict, dataclass, field
from pathlib import Path

PIPELINE_REVISION = "pipeline-v1"
SCHEMA_VERSION = 1

PACKAGE_ROOT = Path(__file__).resolve().parents[2]


def _load_dotenv() -> None:
    """Lê audio-pipeline/.env (se existir) sem sobrescrever o ambiente e sem imprimir valores."""
    env_file = PACKAGE_ROOT / ".env"
    if not env_file.is_file():
        return
    for raw in env_file.read_text(encoding="utf-8").splitlines():
        line = raw.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, _, value = line.partition("=")
        key = key.strip()
        value = value.strip().strip('"').strip("'")
        if key and key not in os.environ:
            os.environ[key] = value


_load_dotenv()


def processing_root() -> Path:
    return Path(os.environ.get("PROCESSING_ROOT") or PACKAGE_ROOT / "processing").expanduser().resolve()


@dataclass(frozen=True)
class ChunkParams:
    """Janelas de processamento para áudios longos."""

    target_seconds: float = 600.0  # tamanho alvo de cada janela
    search_seconds: float = 45.0  # distância máxima para procurar uma pausa perto do corte
    min_silence_seconds: float = 0.30
    silence_db: float = -35.0
    overlap_seconds: float = 4.0  # usado só quando não há pausa utilizável perto do corte


@dataclass(frozen=True)
class AsrParams:
    engine: str = field(default_factory=lambda: os.environ.get("ASR_ENGINE", "mlx"))
    model: str = field(
        default_factory=lambda: os.environ.get("ASR_MODEL", "mlx-community/whisper-large-v3-turbo")
    )
    language: str = "en"
    condition_on_previous_text: bool = False


@dataclass(frozen=True)
class AlignParams:
    engine: str = field(default_factory=lambda: os.environ.get("ALIGNMENT_ENGINE", "whisperx"))
    language: str = "en"
    device: str = "cpu"
    # abaixo deste score o alinhamento da palavra é tratado como não confiável
    min_word_score: float = 0.20


@dataclass(frozen=True)
class SegmentParams:
    """Alvos da segmentação didática. São alvos, não cortes rígidos."""

    min_words: int = 4
    max_words: int = 14
    target_words: int = 8
    min_ms: int = 2000
    max_ms: int = 10000
    pause_break_ms: int = 250  # pausa que já sugere fronteira natural
    play_pad_start_ms: int = 80
    play_pad_end_ms: int = 160
    neighbor_guard_ms: int = 20  # distância mínima preservada até a palavra vizinha


@dataclass(frozen=True)
class TranslateParams:
    provider: str = "anthropic"
    model: str = field(default_factory=lambda: os.environ.get("ANTHROPIC_MODEL", ""))
    target: str = "pt-BR"
    batch_size: int = 40
    context_segments: int = 2
    max_retries: int = 5
    timeout_seconds: float = 120.0
    prompt_version: str = "translate-v1"
    # Tradução não precisa de raciocínio longo: esforço baixo reduz tokens de saída (pensamento é cobrado como saída).
    effort: str = field(default_factory=lambda: os.environ.get("ANTHROPIC_EFFORT", "low"))
    # Lotes já traduzidos por estes modelos são reaproveitados do cache; só os que faltam
    # (ex.: recusados pelo modelo menor) vão para `model`.
    reuse_cache_from: tuple[str, ...] = ()


def params_dict(obj: object) -> dict:
    return asdict(obj)  # type: ignore[arg-type]
