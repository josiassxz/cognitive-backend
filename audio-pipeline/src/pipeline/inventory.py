"""Inventário reproduzível da pasta de mídia.

Nome de arquivo nunca é tratado como confirmação de título/autor/nível: vira apenas
`titleSuggestion`, revisável. Nada é apagado; exclusões são só marcadas no manifesto.
"""
from __future__ import annotations

import re
from pathlib import Path

from .audio import AudioError, probe
from .util import atomic_write_json, now_iso, sha256_file

AUDIO_EXT = {".mp3", ".m4a", ".wav", ".ogg", ".flac", ".aac"}
IMAGE_EXT = {".jpg", ".jpeg", ".png", ".webp"}

# Regras de exclusão do catálogo (o arquivo original permanece no disco).
_TEST_NAME = re.compile(r"^(teste?|test|debug|tts-debug|healthcheck|meu-texto-para-tts)([-_.]|$)", re.I)
_EXCLUDED_DIRS = {"healthchecks", "debug", "snippets"}
_SUFFIX_ID = re.compile(r"-[a-z0-9]{8}$")


def content_key_for(sha256: str) -> str:
    return f"sha256-{sha256}"


def _slug_base(stem: str) -> str:
    return _SUFFIX_ID.sub("", stem.lower())


def _title_suggestion(stem: str) -> str:
    words = _slug_base(stem).replace("_", "-").split("-")
    return " ".join(word.capitalize() for word in words if word)


def _normalize_for_match(name: str) -> str:
    return re.sub(r"[^a-z0-9]+", "", name.lower())


def _exclusion_reason(rel: Path) -> str | None:
    parts = {part.lower() for part in rel.parts[:-1]}
    hit = parts & _EXCLUDED_DIRS
    if hit:
        return f"pasta técnica ({sorted(hit)[0]})"
    if _TEST_NAME.search(rel.stem):
        return "nome indica arquivo de teste/diagnóstico"
    return None


def build_inventory(input_dir: Path, output: Path, log=print) -> dict:
    input_dir = input_dir.resolve()
    files = sorted(p for p in input_dir.rglob("*") if p.is_file() and p.name != ".DS_Store")
    images = [p for p in files if p.suffix.lower() in IMAGE_EXT]
    image_index: dict[str, list[Path]] = {}
    for image in images:
        image_index.setdefault(_normalize_for_match(image.stem), []).append(image)

    by_ext: dict[str, int] = {}
    for path in files:
        by_ext[path.suffix.lower() or "(sem extensão)"] = by_ext.get(path.suffix.lower() or "(sem extensão)", 0) + 1

    items: list[dict] = []
    seen_hash: dict[str, str] = {}
    audio_files = [p for p in files if p.suffix.lower() in AUDIO_EXT]
    for position, path in enumerate(audio_files, start=1):
        rel = path.relative_to(input_dir)
        if position % 25 == 0 or position == len(audio_files):
            log(f"  inventariando {position}/{len(audio_files)}")
        item: dict = {
            "relativePath": rel.as_posix(),
            "sizeBytes": path.stat().st_size,
            "titleSuggestion": _title_suggestion(path.stem),
            "titleConfirmed": False,
            "errors": [],
        }
        sha = sha256_file(path)
        item["sha256"] = sha
        item["contentKey"] = content_key_for(sha)
        try:
            info = probe(path)
            item.update(
                durationMs=info.duration_ms,
                codec=info.codec,
                channels=info.channels,
                sampleRate=info.sample_rate,
                bitRate=info.bit_rate,
            )
        except AudioError as error:
            item["errors"].append(str(error))

        # Sugestão de capa por nome (revisável, nunca aplicada como fato).
        # Padrão observado: capas em "<slug>-<autor>.jpg" e áudios em "<slug>-<id>.mp3".
        slug = _slug_base(path.stem)
        candidates = sorted(
            (img for img in images if img.stem.lower() == slug or img.stem.lower().startswith(slug + "-")),
            key=lambda img: len(img.stem),
        )
        item["coverSuggestion"] = candidates[0].relative_to(input_dir).as_posix() if candidates else None
        item["coverConfirmed"] = False
        remainder = candidates[0].stem.lower()[len(slug) :].strip("-") if candidates else ""
        item["authorSuggestion"] = " ".join(part.capitalize() for part in remainder.split("-") if part) or None
        item["authorConfirmed"] = False

        reason = _exclusion_reason(rel)
        if item["errors"]:
            item["state"] = "error"
            item["decision"] = "excluded"
            item["decisionReason"] = "falha ao ler o áudio"
        elif sha in seen_hash:
            item["state"] = "duplicate"
            item["decision"] = "excluded"
            item["decisionReason"] = f"conteúdo idêntico a {seen_hash[sha]}"
            item["duplicateOf"] = seen_hash[sha]
        elif reason:
            item["state"] = "excluded"
            item["decision"] = "excluded"
            item["decisionReason"] = reason
        else:
            item["state"] = "pending"
            item["decision"] = "included"
            item["decisionReason"] = "áudio de conteúdo em pasta de catálogo"
        seen_hash.setdefault(sha, rel.as_posix())
        items.append(item)

    included = [i for i in items if i["decision"] == "included"]
    manifest = {
        "schemaVersion": 1,
        "generatedAt": now_iso(),
        "inputDir": str(input_dir),
        "totals": {
            "files": len(files),
            "byExtension": dict(sorted(by_ext.items())),
            "audio": len(items),
            "included": len(included),
            "excluded": len(items) - len(included),
            "includedDurationMs": sum(i.get("durationMs", 0) for i in included),
            "includedSizeBytes": sum(i["sizeBytes"] for i in included),
            "withCoverSuggestion": sum(1 for i in included if i["coverSuggestion"]),
        },
        "items": items,
    }
    atomic_write_json(output, manifest)
    return manifest
