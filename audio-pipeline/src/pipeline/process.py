"""Orquestração por conteúdo, com checkpoint por etapa.

Cada artefato guarda `inputsHash` (entradas + parâmetros + versões de modelo). Reexecutar
reaproveita o que continua válido: mudar a tradução não refaz ASR; mudar o inglês invalida
alinhamento e derivados.
"""
from __future__ import annotations

import os
import shutil
import time
from dataclasses import dataclass
from pathlib import Path
from typing import Any, Callable

from . import align as align_mod
from . import asr as asr_mod
from . import review as review_mod
from . import segment as segment_mod
from . import translate as translate_mod
from . import validate as validate_mod
from .audio import Chunk, detect_silences, plan_chunks, probe
from .config import (
    PIPELINE_REVISION, SCHEMA_VERSION, AlignParams, AsrParams, ChunkParams, SegmentParams, TranslateParams,
    params_dict, processing_root,
)
from .inventory import content_key_for
from .state import StateDb
from .util import atomic_write_json, now_iso, peak_rss_mb, read_json, read_json_or_none, sha256_file, sha256_json, task_lock

Log = Callable[[str], None]


@dataclass
class Job:
    source: Path
    relative_path: str
    sha256: str
    title_suggestion: str
    cover_suggestion: str | None = None
    author_suggestion: str | None = None

    @property
    def content_key(self) -> str:
        return content_key_for(self.sha256)

    @property
    def dir(self) -> Path:
        return processing_root() / self.sha256 / PIPELINE_REVISION

    def path(self, name: str) -> Path:
        return self.dir / name


def find_job_dir(content: str) -> Path:
    """Aceita contentKey (sha256-...), hash puro ou prefixo único do hash."""
    token = content.removeprefix("sha256-")
    root = processing_root()
    matches = [p for p in root.iterdir() if p.is_dir() and p.name.startswith(token)] if root.exists() else []
    if len(matches) != 1:
        raise SystemExit(f"conteúdo '{content}' não encontrado (ou ambíguo) em {root}")
    return matches[0] / PIPELINE_REVISION


def _dir_size(path: Path) -> int:
    return sum(p.stat().st_size for p in path.rglob("*") if p.is_file()) if path.exists() else 0


def _load_words_by_segment(alignment: dict, segments: list[dict]) -> dict[str, list[dict]]:
    words = alignment["words"]
    index = {w["id"]: i for i, w in enumerate(words)}
    return {s["id"]: words[index[s["firstWordId"]] : index[s["lastWordId"]] + 1] for s in segments}


def _flagged_word_ids(reviewed: dict) -> set[str]:
    """Palavras dentro de intervalos sinalizados pelo ASR (ex.: pontuação perdida)."""
    words = [w["id"] for seg in reviewed["segments"] for w in seg["words"]]
    position = {word_id: i for i, word_id in enumerate(words)}
    out: set[str] = set()
    seg_words = {seg["id"]: [w["id"] for w in seg["words"]] for seg in reviewed["segments"]}
    for flag in reviewed.get("flags", []):
        if flag.get("fromWord") in position and flag.get("toWord") in position:
            out.update(words[position[flag["fromWord"]] : position[flag["toWord"]] + 1])
        elif flag.get("segment") in seg_words:
            out.update(seg_words[flag["segment"]])
    return out


def process_content(
    job: Job,
    state: StateDb,
    asr_params: AsrParams,
    align_params: AlignParams,
    segment_params: SegmentParams,
    chunk_params: ChunkParams,
    translate_provider: str | None = None,
    keep_tmp: bool = False,
    log: Log = print,
) -> dict[str, Any]:
    key, rev = job.content_key, PIPELINE_REVISION
    job.dir.mkdir(parents=True, exist_ok=True)
    with task_lock(job.dir / ".lock"):
        metrics: dict[str, Any] = {"stages": {}}
        state.record_content(key, job.relative_path, None, "processing")

        def stage(name: str, fn: Callable[[], tuple[str, dict[str, Any] | None]]) -> None:
            started = time.monotonic()
            try:
                inputs_hash, info = fn()
            except Exception as error:
                state.record_stage(key, rev, name, "failed", error=f"{type(error).__name__}: {error}"[:500])
                raise
            elapsed = round(time.monotonic() - started, 2)
            metrics["stages"][name] = {"seconds": elapsed, **(info or {})}
            state.record_stage(key, rev, name, "done", inputs_hash=inputs_hash, metrics=metrics["stages"][name])

        # --- probe + plano de janelas -------------------------------------------------
        ctx: dict[str, Any] = {}

        def do_probe() -> tuple[str, dict | None]:
            if sha256_file(job.source) != job.sha256:
                raise RuntimeError("hash do arquivo mudou desde o inventário")
            info = probe(job.source)
            plan_hash = sha256_json({"audio": job.sha256, "chunk": params_dict(chunk_params)})
            cached = read_json_or_none(job.path("chunks.json"))
            if cached and cached.get("inputsHash") == plan_hash:
                silences = [tuple(s) for s in cached["silences"]]
                chunks = [Chunk(**c) for c in cached["chunks"]]
            else:
                silences = detect_silences(job.source, chunk_params)
                chunks = plan_chunks(info.duration_ms, silences, chunk_params)
                atomic_write_json(
                    job.path("chunks.json"),
                    {"inputsHash": plan_hash, "silences": silences, "chunks": [c.__dict__ for c in chunks]},
                )
            ctx.update(info=info, silences=silences, chunks=chunks)
            return plan_hash, {"durationMs": info.duration_ms, "chunks": len(chunks), "silences": len(silences)}

        stage("probe", do_probe)
        info, silences, chunks = ctx["info"], ctx["silences"], ctx["chunks"]
        state.record_content(key, job.relative_path, info.duration_ms, "processing")

        # --- ASR ----------------------------------------------------------------------
        def do_asr() -> tuple[str, dict | None]:
            versions = asr_mod.get_adapter(asr_params.engine).versions()
            inputs_hash = sha256_json(
                {"audio": job.sha256, "asr": params_dict(asr_params), "versions": versions, "chunks": [c.__dict__ for c in chunks]}
            )
            cached = read_json_or_none(job.path("transcript.raw.json"))
            if cached and cached.get("inputsHash") == inputs_hash:
                ctx["raw"] = cached
                return inputs_hash, {"reused": True, "words": cached["wordCount"]}
            raw = asr_mod.transcribe_chunks(job.source, chunks, job.dir, asr_params, job.sha256, log)
            raw = {
                "schemaVersion": SCHEMA_VERSION, "contentKey": key, "inputsHash": inputs_hash, "generatedAt": now_iso(),
                "audio": {"sha256": job.sha256, "durationMs": info.duration_ms}, **raw,
            }
            atomic_write_json(job.path("transcript.raw.json"), raw)
            ctx["raw"] = raw
            return inputs_hash, {"reused": False, "words": raw["wordCount"], "asrSeconds": raw["asrSecondsThisRun"]}

        stage("asr", do_asr)
        raw = ctx["raw"]

        # --- revisão automática (sinalização) -----------------------------------------
        def do_review() -> tuple[str, dict | None]:
            raw_hash = raw["inputsHash"]
            previous = read_json_or_none(job.path("transcript.reviewed.json"))
            if previous and previous.get("basedOnRawHash") == raw_hash and previous.get("reviewRules") == review_mod.REVIEW_RULES:
                ctx["reviewed"] = previous  # preserva correções rastreadas
            else:
                flags = review_mod.detect_flags(raw, silences, info.duration_ms)
                reviewed = review_mod.build_reviewed(raw, raw_hash, flags, previous)
                atomic_write_json(job.path("transcript.reviewed.json"), reviewed)
                ctx["reviewed"] = reviewed
            reviewed = ctx["reviewed"]
            return raw_hash, {"flags": len(reviewed["flags"]), "corrections": len(reviewed["corrections"])}

        stage("review", do_review)
        reviewed = ctx["reviewed"]

        # --- alinhamento forçado --------------------------------------------------------
        def do_align() -> tuple[str, dict | None]:
            inputs_hash = sha256_json(
                {"audio": job.sha256, "text": review_mod.alignment_input_hash(reviewed), "align": params_dict(align_params),
                 "versions": align_mod._versions()}
            )
            cached = read_json_or_none(job.path("alignment.json"))
            if cached and cached.get("inputsHash") == inputs_hash:
                ctx["alignment"] = cached
                return inputs_hash, {"reused": True, **cached["stats"]}
            if not reviewed["segments"]:
                raise RuntimeError("nenhuma fala reconhecida; nada para alinhar")
            result = align_mod.align_transcript(
                job.source, reviewed, chunks, job.dir, align_params, job.sha256, info.duration_ms, log
            )
            alignment = {"schemaVersion": SCHEMA_VERSION, "contentKey": key, "inputsHash": inputs_hash, "generatedAt": now_iso(), **result}
            atomic_write_json(job.path("alignment.json"), alignment)
            ctx["alignment"] = alignment
            return inputs_hash, {"reused": False, **result["stats"], "alignSeconds": result["alignSecondsThisRun"]}

        stage("align", do_align)
        alignment = ctx["alignment"]
        metrics["tmpDiskBytes"] = _dir_size(job.dir / "tmp")
        if not keep_tmp:
            shutil.rmtree(job.dir / "tmp", ignore_errors=True)  # WAVs são regeneráveis

        # --- segmentação didática -----------------------------------------------------
        def do_segment() -> tuple[str, dict | None]:
            excluded = review_mod.excluded_word_ids(reviewed)
            flagged = _flagged_word_ids(reviewed)
            inputs_hash = sha256_json(
                {"alignment": alignment["inputsHash"], "segment": params_dict(segment_params),
                 "excluded": sorted(excluded), "flagged": sorted(flagged), "rules": "rules-v2"}
            )
            cached = read_json_or_none(job.path("segments.json"))
            if cached and cached.get("inputsHash") == inputs_hash:
                ctx["segments"] = cached
                return inputs_hash, {"reused": True, "segments": len(cached["segments"])}
            segments = segment_mod.build_segments(key, alignment["words"], info.duration_ms, segment_params, excluded, flagged)
            doc = {
                "schemaVersion": SCHEMA_VERSION, "contentKey": key, "inputsHash": inputs_hash, "generatedAt": now_iso(),
                "params": params_dict(segment_params), "strategy": "rules-v2 (pontuação + pausas + limites semânticos)",
                "excludedWordIds": sorted(excluded), "exclusions": reviewed.get("exclusions", []),
                "segments": segments,
            }
            atomic_write_json(job.path("segments.json"), doc)
            ctx["segments"] = doc
            return inputs_hash, {"reused": False, "segments": len(segments)}

        stage("segment", do_segment)

        manifest = {
            "schemaVersion": SCHEMA_VERSION,
            "contentKey": key,
            "revision": rev,
            "source": {"relativePath": job.relative_path, "sha256": job.sha256, "sizeBytes": job.source.stat().st_size},
            "audio": {
                "durationMs": info.duration_ms, "codec": info.codec, "channels": info.channels,
                "sampleRate": info.sample_rate, "bitRate": info.bit_rate,
            },
            "titleSuggestion": job.title_suggestion,
            "titleConfirmed": False,
            "coverSuggestion": job.cover_suggestion,
            "authorSuggestion": job.author_suggestion,
            "metrics": {**metrics, "peakRssMb": peak_rss_mb()},
            "updatedAt": now_iso(),
        }
        atomic_write_json(job.path("manifest.json"), manifest)

    # tradução / validação / export usam seu próprio lock
    if translate_provider:
        try:
            translate_content(job.dir, state, translate_provider, log=log)
        except translate_mod.TranslationAuthError as error:
            log(f"  tradução pendente: {error}")
    validation = validate_content(job.dir, state, log=log)
    state.record_content(
        key, job.relative_path, info.duration_ms,
        "processed" if validation["translationStatus"] == "complete" else "translation_pending",
    )
    return {"contentKey": key, "dir": str(job.dir), "validation": validation, "metrics": manifest["metrics"]}


def translate_content(
    job_dir: Path, state: StateDb, provider: str, input_file: Path | None = None,
    params: TranslateParams | None = None, budget_usd: float | None = None, log: Log = print,
) -> dict[str, Any]:
    params = params or TranslateParams()
    manifest = read_json(job_dir / "manifest.json")
    segments_doc = read_json(job_dir / "segments.json")
    alignment = read_json(job_dir / "alignment.json")
    segments = segments_doc["segments"]
    words_by_segment = _load_words_by_segment(alignment, segments)
    key, rev = manifest["contentKey"], manifest["revision"]
    out_path = job_dir / f"translations.{params.target}.json"
    with task_lock(job_dir / ".lock"):
        try:
            if provider == "file":
                if input_file is None:
                    raise SystemExit("--input é obrigatório com --provider file")
                result = translate_mod.translate_from_file(segments, words_by_segment, input_file)
            elif provider == "anthropic":
                if budget_usd is None and os.environ.get("TRANSLATION_BUDGET_LIMIT"):
                    budget_usd = float(os.environ["TRANSLATION_BUDGET_LIMIT"])
                result = translate_mod.translate_with_anthropic(
                    segments, words_by_segment, manifest["titleSuggestion"], job_dir / "translate-cache", params, budget_usd, log
                )
            else:
                raise SystemExit(f"provedor desconhecido: {provider}")
        except translate_mod.TranslationAuthError as error:
            state.record_stage(key, rev, "translate", "failed", error=str(error)[:500])
            raise
        result = {"schemaVersion": SCHEMA_VERSION, "contentKey": key, "segmentsHash": segments_doc["inputsHash"], **result}
        atomic_write_json(out_path, result)
        state.record_stage(
            key, rev, "translate", "done" if result["status"] == "complete" else "pending",
            inputs_hash=segments_doc["inputsHash"], metrics={"usage": result["usage"], "pending": len(result["pendingIds"])},
        )
    return result


def validate_content(job_dir: Path, state: StateDb, log: Log = print) -> dict[str, Any]:
    manifest = read_json(job_dir / "manifest.json")
    alignment = read_json(job_dir / "alignment.json")
    segments = read_json(job_dir / "segments.json")["segments"]
    reviewed = read_json(job_dir / "transcript.reviewed.json")
    translations = read_json_or_none(job_dir / "translations.pt-BR.json")
    # Tradução parcial (pendente) não é erro estrutural: valida só quando completa.
    usable = translations if translations and translations.get("status") == "complete" else None
    segments_doc = read_json(job_dir / "segments.json")
    result = validate_mod.validate_content(
        alignment["words"], segments, manifest["audio"]["durationMs"], usable, set(segments_doc.get("excludedWordIds", []))
    )
    result["exclusions"] = segments_doc.get("exclusions", [])
    result["asrFlags"] = reviewed.get("flags", [])
    result["contentKey"] = manifest["contentKey"]
    result["generatedAt"] = now_iso()
    with task_lock(job_dir / ".lock"):
        atomic_write_json(job_dir / "validation.json", result)
    state.record_stage(
        manifest["contentKey"], manifest["revision"], "validate", "done" if result["status"] == "valid" else "failed",
        error="; ".join(result["errors"][:3]) or None, metrics=result["stats"],
    )
    return result
