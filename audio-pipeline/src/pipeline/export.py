"""Exportação do pacote importável (`content.import.json`) e checagem contra o JSON Schema."""
from __future__ import annotations

import os
import shutil
from pathlib import Path
from typing import Any

from .config import PACKAGE_ROOT, PIPELINE_REVISION, SCHEMA_VERSION
from .library import display_title, library_meta
from .util import atomic_write_json, now_iso, read_json, read_json_or_none, sha256_json

SCHEMA_PATH = PACKAGE_ROOT / "schemas" / "content-import.schema.json"


def media_root() -> Path | None:
    """Raiz da mídia original (capas): MEDIA_ROOT ou o backup local ao lado do projeto."""
    configured = os.environ.get("MEDIA_ROOT")
    candidate = Path(configured) if configured else PACKAGE_ROOT.parent / "backup-s3" / "tunely-nebula-audio"
    return candidate if candidate.is_dir() else None


def build_package(job_dir: Path) -> dict[str, Any]:
    manifest = read_json(job_dir / "manifest.json")
    alignment = read_json(job_dir / "alignment.json")
    segments = read_json(job_dir / "segments.json")["segments"]
    validation = read_json(job_dir / "validation.json")
    raw = read_json(job_dir / "transcript.raw.json")
    reviewed = read_json(job_dir / "transcript.reviewed.json")
    translations = read_json_or_none(job_dir / "translations.pt-BR.json")
    if validation["status"] != "valid":
        raise SystemExit(f"validação com erros; corrija antes de exportar: {validation['errors'][:3]}")

    words = alignment["words"]
    index = {w["id"]: i for i, w in enumerate(words)}
    complete = bool(translations and translations.get("status") == "complete")
    items = translations["items"] if complete else {}
    out_segments = []
    for seg in segments:
        seg_words = words[index[seg["firstWordId"]] : index[seg["lastWordId"]] + 1]
        translated = items.get(seg["id"])
        out_segments.append(
            {
                "id": seg["id"],
                "index": seg["index"],
                "text": seg["text"],
                "translation": translated["translation"] if translated else None,
                "startMs": seg["startMs"],
                "endMs": seg["endMs"],
                "playStartMs": seg["playStartMs"],
                "playEndMs": seg["playEndMs"],
                "quality": seg["quality"],
                "reviewReasons": seg["reviewReasons"],
                "highlights": [
                    {"wordIds": h["wordIds"], "pt": h["pt"]} for h in (translated["highlights"] if translated else [])
                ],
                "words": [
                    {
                        "id": w["id"], "word": w["word"], "startMs": w["startMs"], "endMs": w["endMs"],
                        "timeSource": w["timeSource"], **({"score": w["score"]} if "score" in w else {}),
                    }
                    for w in seg_words
                ],
            }
        )

    package: dict[str, Any] = {
        "schemaVersion": SCHEMA_VERSION,
        "contentKey": manifest["contentKey"],
        "revision": PIPELINE_REVISION,
        "source": "reconstructed_audio",
        "title": manifest["titleSuggestion"] if manifest.get("titleConfirmed") else display_title(manifest["titleSuggestion"]),
        "titleConfirmed": bool(manifest.get("titleConfirmed")),
        "author": manifest.get("authorSuggestion") or "",
        "authorConfirmed": False,
        "language": raw.get("language", "en"),
        "audio": {
            "storageKey": manifest["source"]["relativePath"],
            "sha256": manifest["source"]["sha256"],
            "sizeBytes": manifest["source"]["sizeBytes"],
            "durationMs": manifest["audio"]["durationMs"],
            "codec": manifest["audio"]["codec"],
            "channels": manifest["audio"]["channels"],
            "sampleRate": manifest["audio"]["sampleRate"],
        },
        "cover": {"storageKey": manifest.get("coverSuggestion"), "confirmed": False},
        "quality": {
            # Nunca sai "ready" daqui: a escuta humana é registrada depois, no editor.
            "status": "needs_review",
            "auditoryValidation": "pending",
            "alignedRatio": validation["stats"]["alignedRatio"],
            "wordsByTimeSource": validation["stats"]["wordsByTimeSource"],
            "segmentsNeedingReview": validation["stats"]["segmentsNeedingReview"],
            "asrFlags": reviewed.get("flags", []),
            "corrections": reviewed.get("corrections", []),
            "editorialExclusions": reviewed.get("exclusions", []),
        },
        "translation": {
            "status": "complete" if complete else "translation_pending",
            "target": "pt-BR",
            "provider": translations.get("provider") if complete else None,
            "model": translations.get("model") if complete else None,
            "provenance": translations.get("provenance") if complete else None,
            "highlightOffsets": "utf16",
        },
        "provenance": {
            "pipelineRevision": PIPELINE_REVISION,
            "asr": {"engine": raw["engine"], "model": raw["model"], "modelRevision": raw.get("modelRevision"), "packageVersions": raw["packageVersions"]},
            "aligner": {"engine": alignment["engine"], "model": alignment["model"], "packageVersions": alignment["packageVersions"]},
            "segmentation": "rules-v2",
            "generatedAt": now_iso(),
        },
        "segments": out_segments,
    }
    cover_key = manifest.get("coverSuggestion")
    root = media_root()
    package["library"] = library_meta(segments, (root / cover_key) if (root and cover_key) else None)
    # Hash do conteúdo (sem o carimbo de data) para idempotência no importador.
    hashable = {k: v for k, v in package.items() if k != "provenance"}
    package["packageHash"] = sha256_json(hashable)
    return package


def check_schema(package: dict[str, Any]) -> list[str]:
    import jsonschema

    validator = jsonschema.Draft202012Validator(read_json(SCHEMA_PATH))
    return [f"{'/'.join(str(p) for p in e.absolute_path)}: {e.message}" for e in validator.iter_errors(package)][:20]


def export_package(job_dir: Path, output: Path | None) -> Path:
    package = build_package(job_dir)
    errors = check_schema(package)
    if errors:
        raise SystemExit("pacote não atende ao schema:\n  " + "\n  ".join(errors))
    atomic_write_json(job_dir / "content.import.json", package)
    if output is None:
        return job_dir / "content.import.json"
    output.mkdir(parents=True, exist_ok=True)
    target = output / f"{package['contentKey']}.import.json"
    shutil.copyfile(job_dir / "content.import.json", target)
    return target
