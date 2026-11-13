"""CLI do worker local. `pipeline --help` lista os comandos; exemplos testados no README."""
from __future__ import annotations

import argparse
import json
import os
import platform
import shutil
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path
from typing import Any

from .config import (
    PIPELINE_REVISION, AlignParams, AsrParams, ChunkParams, SegmentParams, TranslateParams, processing_root,
)
from .util import atomic_write_json, now_iso, read_json, read_json_or_none, run, sha256_file


def log(message: str) -> None:
    print(message, flush=True)


# --------------------------------------------------------------------------- doctor
def cmd_doctor(_args: argparse.Namespace) -> int:
    checks: list[tuple[str, bool, str]] = []

    def add(name: str, ok: bool, detail: str) -> None:
        checks.append((name, ok, detail))

    add("arquitetura", platform.machine() == "arm64", f"{platform.system()} {platform.machine()}")
    add("python", sys.version_info[:2] in {(3, 11), (3, 12)}, platform.python_version())
    for tool in ("ffmpeg", "ffprobe"):
        path = shutil.which(tool)
        if not path:
            add(tool, False, "não encontrado no PATH")
            continue
        result = run([tool, "-version"], timeout=20)
        first = (result.stdout or result.stderr).splitlines()[0] if (result.stdout or result.stderr) else ""
        add(tool, result.returncode == 0, first[:70] if result.returncode == 0 else f"falha ao executar: {result.stderr.strip()[:120]}")
    if shutil.which("ffmpeg"):
        probe = run(
            ["ffmpeg", "-nostdin", "-v", "error", "-f", "lavfi", "-i", "sine=frequency=440:duration=0.2",
             "-ac", "1", "-ar", "16000", "-f", "wav", "-y", os.devnull], timeout=30,
        )
        add("ffmpeg decodifica/gera PCM 16 kHz", probe.returncode == 0, "ok" if probe.returncode == 0 else probe.stderr.strip()[:120])

    import importlib.metadata as md

    for package in ("mlx-whisper", "mlx", "whisperx", "torch", "torchaudio", "anthropic", "jsonschema"):
        try:
            add(f"pacote {package}", True, md.version(package))
        except md.PackageNotFoundError:
            add(f"pacote {package}", False, "não instalado (rode `uv sync`)")

    asr = AsrParams()
    try:
        from huggingface_hub import scan_cache_dir

        cached = {repo.repo_id: repo for repo in scan_cache_dir().repos}
        repo = cached.get(asr.model)
        add(
            f"modelo ASR {asr.model}", repo is not None,
            f"em cache ({repo.size_on_disk / 1e9:.2f} GB, {repo.repo_path})" if repo else "ainda não baixado (será baixado no 1º uso; requer rede)",
        )
    except Exception as error:  # noqa: BLE001
        add("cache Hugging Face", False, str(error)[:120])
    torch_hub = Path(os.environ.get("TORCH_HOME", Path.home() / ".cache" / "torch")) / "hub" / "checkpoints"
    wav2vec = list(torch_hub.glob("wav2vec2_fairseq_base_ls960_asr_ls960*")) if torch_hub.exists() else []
    add("modelo de alinhamento wav2vec2 (en)", bool(wav2vec), str(wav2vec[0]) if wav2vec else "ainda não baixado (1º uso; requer rede)")

    root = processing_root()
    try:
        root.mkdir(parents=True, exist_ok=True)
        free = shutil.disk_usage(root).free / 1e9
        add("PROCESSING_ROOT gravável", True, f"{root} ({free:.0f} GB livres)")
        add("espaço livre ≥ 20 GB", free >= 20, f"{free:.0f} GB")
    except OSError as error:
        add("PROCESSING_ROOT gravável", False, str(error))

    has_key = bool(os.environ.get("ANTHROPIC_API_KEY") or os.environ.get("ANTHROPIC_AUTH_TOKEN"))
    profile = (Path.home() / ".config" / "anthropic").exists()
    add(
        "credencial Anthropic (tradução)", has_key or profile,
        "variável de ambiente presente" if has_key else ("perfil `ant auth` encontrado" if profile else
        "ausente → tradução fica translation_pending (ASR/alinhamento funcionam)"),
    )

    optional = {"credencial Anthropic (tradução)", f"modelo ASR {asr.model}", "modelo de alinhamento wav2vec2 (en)"}
    failed = False
    for name, ok, detail in checks:
        mark = "OK " if ok else ("AVISO" if name in optional else "FALHA")
        failed = failed or (not ok and name not in optional)
        log(f"[{mark:5}] {name}: {detail}")
    log("\nResultado: " + ("ambiente pronto." if not failed else "há falhas obrigatórias acima."))
    return 1 if failed else 0


# ------------------------------------------------------------------------ inventory
def cmd_inventory(args: argparse.Namespace) -> int:
    from .inventory import build_inventory

    manifest = build_inventory(Path(args.input), Path(args.output), log)
    totals = manifest["totals"]
    hours = totals["includedDurationMs"] / 3_600_000
    log(f"arquivos: {totals['files']}  por extensão: {totals['byExtension']}")
    log(f"áudios: {totals['audio']}  incluídos: {totals['included']}  excluídos: {totals['excluded']}")
    log(f"duração incluída: {hours:.1f} h  tamanho: {totals['includedSizeBytes'] / 1e9:.2f} GB  com sugestão de capa: {totals['withCoverSuggestion']}")
    for item in manifest["items"]:
        if item["decision"] == "excluded":
            log(f"  excluído: {item['relativePath']} — {item['decisionReason']}")
    log(f"manifesto: {args.output}")
    return 0


# -------------------------------------------------------------------------- process
def _job_from_file(path: Path, media_root: Path | None, manifest_item: dict[str, Any] | None = None):
    from .inventory import _title_suggestion
    from .process import Job

    path = path.resolve()
    if manifest_item:
        return Job(path, manifest_item["relativePath"], manifest_item["sha256"], manifest_item["titleSuggestion"], manifest_item.get("coverSuggestion"), manifest_item.get("authorSuggestion"))
    if media_root is None:
        # storageKey = caminho relativo à raiz de mídia; por padrão, "<pasta>/<arquivo>"
        media_root = path.parent.parent
    relative = path.relative_to(media_root.resolve()).as_posix()
    job = Job(path, relative, sha256_file(path), _title_suggestion(path.stem))
    # Reaproveita sugestões de capa/autor do inventário, se existir.
    inventory = read_json_or_none(processing_root() / "inventory.json")
    for item in (inventory or {}).get("items", []):
        if item.get("sha256") == job.sha256:
            job.cover_suggestion, job.author_suggestion = item.get("coverSuggestion"), item.get("authorSuggestion")
            break
    return job


def _params(args: argparse.Namespace):
    asr = AsrParams(engine=args.asr, language=args.language, **({"model": args.asr_model} if args.asr_model else {}))
    align = AlignParams(engine=args.aligner, language=args.language)
    chunk = ChunkParams(target_seconds=args.chunk_seconds)
    return asr, align, SegmentParams(), chunk


def _print_result(result: dict[str, Any]) -> None:
    validation = result["validation"]
    stats = validation["stats"]
    log(f"conteúdo: {result['contentKey']}")
    log(f"  pasta: {result['dir']}")
    log(f"  validação estrutural: {validation['status']}  erros: {len(validation['errors'])}  avisos: {len(validation['warnings'])}")
    log(f"  palavras: {stats['words']}  por origem do tempo: {stats['wordsByTimeSource']}  (alinhador: {stats['alignedRatio']:.1%})")
    log(f"  trechos: {stats['segments']}  para revisão: {stats['segmentsNeedingReview']}  palavras/trecho: {stats['segmentWords']}  ms/trecho: {stats['segmentMs']}")
    log(f"  tradução: {validation['translationStatus']}  sinalizações do ASR: {len(validation['asrFlags'])}")
    for error in validation["errors"][:10]:
        log(f"  ERRO: {error}")


def cmd_process(args: argparse.Namespace) -> int:
    from .process import process_content
    from .state import StateDb

    asr, align, segment, chunk = _params(args)
    job = _job_from_file(Path(args.file), Path(args.media_root) if args.media_root else None)
    state = StateDb(processing_root())
    try:
        result = process_content(job, state, asr, align, segment, chunk, args.translate, args.keep_tmp, log)
    finally:
        state.close()
    _print_result(result)
    stages = result["metrics"]["stages"]
    log("  tempos (s): " + ", ".join(f"{name}={info['seconds']}" for name, info in stages.items()) + f"  pico RSS: {result['metrics']['peakRssMb']} MB")
    return 0 if result["validation"]["status"] == "valid" else 2


# ------------------------------------------------------------------------- validate
def cmd_validate(args: argparse.Namespace) -> int:
    from .process import find_job_dir, validate_content
    from .state import StateDb

    job_dir = find_job_dir(args.content)
    state = StateDb(processing_root())
    try:
        validation = validate_content(job_dir, state, log)
    finally:
        state.close()
    _print_result({"contentKey": validation["contentKey"], "dir": str(job_dir), "validation": validation})
    return 0 if validation["status"] == "valid" else 2


# ------------------------------------------------------------------------ translate
def cmd_translate(args: argparse.Namespace) -> int:
    from . import translate as translate_mod
    from .process import find_job_dir, translate_content, validate_content
    from .state import StateDb

    job_dir = find_job_dir(args.content)
    params = TranslateParams(
        provider=args.provider, target=args.target, reuse_cache_from=tuple(args.reuse_cache_from or ()),
        **({"model": args.model} if args.model else {}),
    )
    if args.estimate:
        segments = read_json(job_dir / "segments.json")["segments"]
        log(json.dumps(translate_mod.estimate(segments, params), ensure_ascii=False, indent=2))
        return 0
    state = StateDb(processing_root())
    try:
        try:
            result = translate_content(
                job_dir, state, args.provider, Path(args.input) if args.input else None, params, args.budget_usd, log
            )
        except translate_mod.TranslationAuthError as error:
            log(f"ERRO: {error}")
            log("estado mantido: translation_pending")
            return 3
        validation = validate_content(job_dir, state, log)
    finally:
        state.close()
    log(f"tradução: {result['status']}  traduzidos: {len(result['items'])}  pendentes: {len(result['pendingIds'])}  destaques descartados: {result['droppedHighlights']}")
    if result.get("usage"):
        log(f"uso: {result['usage']}")
    for failure in result["failures"]:
        log(f"  falha no lote {failure['batch']}: {failure['error']}")
    log(f"validação estrutural: {validation['status']} ({len(validation['errors'])} erros)")
    return 0 if result["status"] == "complete" and validation["status"] == "valid" else 2


# ---------------------------------------------------------------------------- batch
def cmd_batch(args: argparse.Namespace) -> int:
    from .process import process_content
    from .state import StateDb

    if args.workers != 1:
        log("aviso: só --workers 1 é suportado nesta revisão (memória medida no piloto com 1 worker)")
    manifest = read_json(Path(args.manifest))
    input_dir = Path(manifest["inputDir"])
    asr, align, segment, chunk = _params(args)
    items = [i for i in manifest["items"] if i["decision"] == "included"]
    items.sort(key=lambda i: i.get("durationMs", 0))
    if args.limit:
        items = items[: args.limit]
    if args.max_hours:
        budget_ms, selected, total = args.max_hours * 3_600_000, [], 0
        for item in items:
            if total + item.get("durationMs", 0) > budget_ms:
                break
            selected.append(item)
            total += item.get("durationMs", 0)
        items = selected
    state = StateDb(processing_root())
    done = failed = skipped = 0
    started = time.monotonic()
    report_path = processing_root() / "batch-report.json"
    try:
        for position, item in enumerate(items, start=1):
            key = item["contentKey"]
            job_dir = processing_root() / item["sha256"] / PIPELINE_REVISION
            if args.resume and (job_dir / "validation.json").exists() and state.content_status(key) in {"processed", "translation_pending", "exported"}:
                skipped += 1
                continue
            log(f"[{position}/{len(items)}] {item['relativePath']} ({item.get('durationMs', 0) / 60000:.1f} min)")
            try:
                job = _job_from_file(input_dir / item["relativePath"], input_dir, item)
                result = process_content(job, state, asr, align, segment, chunk, args.translate, False, log)
                done += 1
                stats = result["validation"]["stats"]
                log(f"    ok: {stats['segments']} trechos, alinhador {stats['alignedRatio']:.1%}, revisão em {stats['segmentsNeedingReview']} trechos")
            except KeyboardInterrupt:
                log("interrompido; rode de novo com --resume para continuar")
                break
            except Exception as error:  # noqa: BLE001 — uma falha não derruba o lote
                failed += 1
                state.record_content(key, item["relativePath"], item.get("durationMs"), "failed", f"{type(error).__name__}: {error}"[:500])
                log(f"    FALHOU: {type(error).__name__}: {error}")
            write_batch_report(state, manifest, report_path)
    finally:
        write_batch_report(state, manifest, report_path)
        state.close()
    log(f"lote: {done} processados, {skipped} já prontos, {failed} falhas, em {(time.monotonic() - started) / 60:.1f} min")
    log(f"relatório: {report_path}")
    return 0 if failed == 0 else 2


def write_batch_report(state, manifest: dict[str, Any], path: Path) -> dict[str, Any]:
    exported = {c["contentKey"]: c for c in state.export()["contents"]}
    rows = []
    for item in manifest["items"]:
        row: dict[str, Any] = {
            "relativePath": item["relativePath"], "contentKey": item["contentKey"], "durationMs": item.get("durationMs"),
            "decision": item["decision"], "decisionReason": item["decisionReason"],
        }
        entry = exported.get(item["contentKey"])
        if item["decision"] != "included":
            row["status"] = "excluded"
        elif entry is None:
            row["status"] = "not_started"
        else:
            row["status"] = entry["status"]
            row["error"] = entry["lastError"]
            validation = read_json_or_none(processing_root() / item["sha256"] / PIPELINE_REVISION / "validation.json")
            if validation:
                row.update(
                    structural=validation["status"], translation=validation["translationStatus"],
                    alignedRatio=validation["stats"]["alignedRatio"], segments=validation["stats"]["segments"],
                    segmentsNeedingReview=validation["stats"]["segmentsNeedingReview"], asrFlags=len(validation.get("asrFlags", [])),
                    auditoryValidation=validation["auditoryValidation"],
                )
        rows.append(row)
    counts: dict[str, int] = {}
    for row in rows:
        counts[row["status"]] = counts.get(row["status"], 0) + 1
    report = {"generatedAt": now_iso(), "revision": PIPELINE_REVISION, "counts": counts, "items": rows}
    atomic_write_json(path, report)
    return report


def cmd_report(args: argparse.Namespace) -> int:
    from .state import StateDb

    state = StateDb(processing_root())
    try:
        report = write_batch_report(state, read_json(Path(args.manifest)), Path(args.output) if args.output else processing_root() / "batch-report.json")
    finally:
        state.close()
    log(json.dumps(report["counts"], ensure_ascii=False))
    return 0


# --------------------------------------------------------------------------- export
def cmd_export(args: argparse.Namespace) -> int:
    from .export import export_package
    from .process import find_job_dir
    from .state import StateDb

    job_dir = find_job_dir(args.content)
    target = export_package(job_dir, Path(args.output) if args.output else None)
    manifest = read_json(job_dir / "manifest.json")
    state = StateDb(processing_root())
    try:
        state.record_stage(manifest["contentKey"], manifest["revision"], "export", "done")
    finally:
        state.close()
    package = read_json(target)
    log(f"pacote: {target}")
    log(f"  trechos: {len(package['segments'])}  tradução: {package['translation']['status']}  qualidade: {package['quality']['status']}  hash: {package['packageHash'][:16]}…")
    return 0


# --------------------------------------------------------------------------- import
def cmd_import(args: argparse.Namespace) -> int:
    from .audio import probe
    from .export import check_schema

    package_path = Path(args.package)
    package = read_json(package_path)
    errors = check_schema(package)
    if errors:
        log("pacote inválido pelo schema:")
        for error in errors:
            log(f"  {error}")
        return 2
    log(f"schema ok: {package['contentKey']} ({len(package['segments'])} trechos)")
    media_root = args.media_root or os.environ.get("MEDIA_ROOT")
    if media_root:
        audio_path = Path(media_root) / package["audio"]["storageKey"]
        if not audio_path.is_file():
            log(f"ERRO: áudio não encontrado em {audio_path}")
            return 2
        if sha256_file(audio_path) != package["audio"]["sha256"]:
            log("ERRO: hash do áudio na raiz de mídia difere do pacote")
            return 2
        if abs(probe(audio_path).duration_ms - package["audio"]["durationMs"]) > 50:
            log("ERRO: duração do áudio difere do pacote")
            return 2
        log("mídia ok: hash e duração conferem")
    else:
        log("aviso: sem --media-root/MEDIA_ROOT; hash e duração da mídia serão conferidos só pelo servidor")

    api_url = (args.api_url or os.environ.get("PIPELINE_API_URL") or "").rstrip("/")
    token = os.environ.get("PIPELINE_IMPORT_TOKEN", "")
    if not api_url:
        log("sem --api-url/PIPELINE_API_URL: validação local concluída, nada enviado.")
        return 0 if args.dry_run else 2
    if not token:
        log("ERRO: defina PIPELINE_IMPORT_TOKEN (mesmo valor de IMPORT_API_TOKEN no backend)")
        return 2
    url = f"{api_url}/content-import" + ("?dryRun=1" if args.dry_run else "")
    request = urllib.request.Request(
        url, data=json.dumps(package).encode("utf-8"), method="POST",
        headers={"Content-Type": "application/json", "X-Import-Token": token},
    )
    try:
        with urllib.request.urlopen(request, timeout=300) as response:
            body = json.loads(response.read().decode("utf-8"))
    except urllib.error.HTTPError as error:
        log(f"ERRO HTTP {error.code}: {error.read().decode('utf-8', 'replace')[:800]}")
        return 2
    except urllib.error.URLError as error:
        log(f"ERRO de conexão com {api_url}: {error.reason}")
        return 2
    log(json.dumps(body, ensure_ascii=False, indent=2))
    return 0


# -------------------------------------------------------------------------- correct
def cmd_correct(args: argparse.Namespace) -> int:
    from .process import find_job_dir
    from .review import apply_correction
    from .util import task_lock

    job_dir = find_job_dir(args.content)
    with task_lock(job_dir / ".lock"):
        reviewed = read_json(job_dir / "transcript.reviewed.json")
        apply_correction(reviewed, args.word, args.text, args.author, args.reason)
        atomic_write_json(job_dir / "transcript.reviewed.json", reviewed)
    log(f"correção registrada em {args.word}. Rode `pipeline process --file <mp3>` para realinhar e regenerar derivados.")
    return 0


# ---------------------------------------------------------------------- audit-clips
def cmd_audit_clips(args: argparse.Namespace) -> int:
    from .clipaudit import audit_clips
    from .process import find_job_dir

    job_dir = find_job_dir(args.content)
    report = audit_clips(job_dir, Path(args.source), AsrParams(), log)
    summary = report["summary"]
    log(json.dumps(summary, ensure_ascii=False, indent=2))
    log(f"relatório: {job_dir / 'clip-audit.json'}")
    return 0


# ----------------------------------------------------------------------------- main
def _add_processing_flags(parser: argparse.ArgumentParser) -> None:
    parser.add_argument("--asr", default=os.environ.get("ASR_ENGINE", "mlx"), choices=["mlx", "faster-whisper"])
    parser.add_argument("--asr-model", default=None, help="repositório/modelo do ASR (padrão: ASR_MODEL ou whisper-large-v3-turbo MLX)")
    parser.add_argument("--aligner", default=os.environ.get("ALIGNMENT_ENGINE", "whisperx"), choices=["whisperx"])
    parser.add_argument("--language", default="en")
    parser.add_argument("--chunk-seconds", type=float, default=600.0, help="tamanho alvo das janelas para áudios longos")
    parser.add_argument("--translate", default=None, choices=["anthropic"], help="traduzir em seguida (requer credencial)")


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(prog="pipeline", description="Worker local de reconstrução de conteúdo de áudio (Tunely).")
    sub = parser.add_subparsers(dest="command", required=True)

    sub.add_parser("doctor", help="verifica ferramentas, modelos, espaço e credenciais (sem imprimir segredos)").set_defaults(fn=cmd_doctor)

    p = sub.add_parser("inventory", help="inventaria a pasta de mídia (hash, duração real, duplicatas, exclusões)")
    p.add_argument("--input", required=True)
    p.add_argument("--output", required=True)
    p.set_defaults(fn=cmd_inventory)

    p = sub.add_parser("process", help="ASR → revisão → alinhamento → segmentação → validação de um arquivo")
    p.add_argument("--file", required=True)
    p.add_argument("--media-root", default=None, help="raiz de mídia (define o storageKey relativo)")
    p.add_argument("--keep-tmp", action="store_true", help="mantém WAVs temporários")
    _add_processing_flags(p)
    p.set_defaults(fn=cmd_process)

    p = sub.add_parser("validate", help="validação estrutural de um conteúdo processado")
    p.add_argument("--content", required=True, help="contentKey, hash ou prefixo único")
    p.set_defaults(fn=cmd_validate)

    p = sub.add_parser("translate", help="traduz os trechos para pt-BR (Claude) ou importa traduções de arquivo")
    p.add_argument("--content", required=True)
    p.add_argument("--provider", default="anthropic", choices=["anthropic", "file"])
    p.add_argument("--target", default="pt-BR", choices=["pt-BR"])
    p.add_argument("--model", default=None, help="padrão: ANTHROPIC_MODEL ou claude-opus-5-5")
    p.add_argument("--input", default=None, help="arquivo JSON de traduções (com --provider file)")
    p.add_argument("--budget-usd", type=float, default=None, help="teto de gasto (padrão: TRANSLATION_BUDGET_LIMIT)")
    p.add_argument("--estimate", action="store_true", help="só estima tokens/custo, sem chamar a API")
    p.add_argument(
        "--reuse-cache-from", action="append", metavar="MODEL",
        help="reaproveita lotes já traduzidos por MODEL (repetível); só os lotes ausentes usam --model",
    )
    p.set_defaults(fn=cmd_translate)

    p = sub.add_parser("batch", help="processa todos os incluídos do manifesto, retomável")
    p.add_argument("--manifest", required=True)
    p.add_argument("--resume", action="store_true", help="pula conteúdos já processados")
    p.add_argument("--workers", type=int, default=int(os.environ.get("PIPELINE_WORKERS", "1")))
    p.add_argument("--limit", type=int, default=None, help="processa só os N menores")
    p.add_argument("--max-hours", type=float, default=None, help="limita a soma de horas de áudio desta execução")
    _add_processing_flags(p)
    p.set_defaults(fn=cmd_batch)

    p = sub.add_parser("report", help="regenera o relatório do lote a partir do estado local")
    p.add_argument("--manifest", required=True)
    p.add_argument("--output", default=None)
    p.set_defaults(fn=cmd_report)

    p = sub.add_parser("export", help="gera o pacote importável content.import.json")
    p.add_argument("--content", required=True)
    p.add_argument("--output", default=None, help="pasta de destino (opcional)")
    p.set_defaults(fn=cmd_export)

    p = sub.add_parser("import", help="valida o pacote e envia ao backend (ou só valida com --dry-run)")
    p.add_argument("--package", required=True)
    p.add_argument("--dry-run", action="store_true")
    p.add_argument("--api-url", default=None, help="ex.: http://localhost:3333/api/admin (padrão: PIPELINE_API_URL)")
    p.add_argument("--media-root", default=None, help="confere hash/duração do áudio nesta raiz (padrão: MEDIA_ROOT)")
    p.set_defaults(fn=cmd_import)

    p = sub.add_parser("correct", help="corrige UMA palavra do inglês com rastro (dispara realinhamento no próximo process)")
    p.add_argument("--content", required=True)
    p.add_argument("--word", required=True, help="id da palavra, ex.: w000393")
    p.add_argument("--text", required=True)
    p.add_argument("--author", required=True)
    p.add_argument("--reason", required=True)
    p.set_defaults(fn=cmd_correct)

    p = sub.add_parser("audit-clips", help="auditoria automática: recorta cada trecho e re-transcreve para detectar cortes/vazamentos")
    p.add_argument("--content", required=True)
    p.add_argument("--source", required=True, help="caminho do MP3 original")
    p.set_defaults(fn=cmd_audit_clips)
    return parser


def main(argv: list[str] | None = None) -> int:
    args = build_parser().parse_args(argv)
    return int(args.fn(args) or 0)


if __name__ == "__main__":
    raise SystemExit(main())
