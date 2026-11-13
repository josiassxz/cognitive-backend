"""Tradução pt-BR e destaques didáticos.

Regras:
- Só texto, IDs e contexto vizinho são enviados; nunca o áudio.
- O modelo NÃO define tempos nem altera o inglês: a resposta é validada por ID e os
  destaques são convertidos em IDs de palavras existentes + offsets UTF-16 no português.
- Sem credencial o estado fica `translation_pending`; nenhuma tradução é fabricada.
- 401 interrompe a etapa com orientação clara (sem retry infinito).
"""
from __future__ import annotations

import json
import os
import random
import re
import time
from pathlib import Path
from typing import Any, Callable

from .config import TranslateParams
from .util import atomic_write_json, now_iso, read_json, read_json_or_none, sha256_json
from .validate import utf16_len

# USD por milhão de tokens (entrada, saída). Tabela de referência de 2026-11; pode ser
# sobrescrita por ANTHROPIC_PRICE_INPUT_PER_MTOK / ANTHROPIC_PRICE_OUTPUT_PER_MTOK.
_PRICES = {
    "claude-opus-5-5": (4.0, 20.0),
    "claude-sonnet-5-5": (2.0, 10.0),
    "claude-haiku-5-5": (0.10, 0.50),
    "claude-fable-5-2": (8.0, 40.0),
}
DEFAULT_MODEL = "claude-opus-5-5"

SYSTEM_PROMPT = """Você traduz trechos de histórias e textos em inglês para português brasileiro, para estudantes de inglês.

Cada item é um TRECHO de escuta (pode ser só parte de uma frase). Traduza cada trecho separadamente, de forma natural e fiel, coerente com o contexto da história fornecido. Como os trechos são lidos um abaixo do outro, a tradução de um trecho deve cobrir só o conteúdo daquele trecho, mesmo que a frase continue no seguinte.

Para cada trecho, opcionalmente indique de 0 a 2 destaques didáticos: expressões úteis, phrasal verbs ou construções que valem a atenção do aluno. Em cada destaque, "en" é uma sequência contígua de palavras copiada exatamente do trecho em inglês e "pt" é a parte correspondente copiada exatamente da sua tradução. Não destaque palavras triviais; muitos trechos não terão destaque.

Devolva exatamente um item por id recebido, sem ids extras, sem alterar o inglês."""

_OUTPUT_SCHEMA = {
    "type": "object",
    "properties": {
        "items": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "id": {"type": "string"},
                    "translation": {"type": "string"},
                    "highlights": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "properties": {"en": {"type": "string"}, "pt": {"type": "string"}},
                            "required": ["en", "pt"],
                            "additionalProperties": False,
                        },
                    },
                },
                "required": ["id", "translation", "highlights"],
                "additionalProperties": False,
            },
        }
    },
    "required": ["items"],
    "additionalProperties": False,
}


class TranslationAuthError(RuntimeError):
    pass


class TranslationResponseError(RuntimeError):
    pass


_TOKEN = re.compile(r"[^a-z0-9']+")


def _norm(text: str) -> str:
    return _TOKEN.sub("", text.lower().replace("’", "'"))


def resolve_highlight(segment_words: list[dict[str, Any]], translation: str, en: str, pt: str) -> dict[str, Any] | None:
    """Converte um destaque textual em IDs de palavras + offsets UTF-16. None se não validar."""
    wanted = [_norm(tok) for tok in en.split() if _norm(tok)]
    have = [_norm(w["word"]) for w in segment_words]
    if not wanted or not pt.strip():
        return None
    word_ids = None
    for start in range(0, len(have) - len(wanted) + 1):
        if have[start : start + len(wanted)] == wanted:
            word_ids = [w["id"] for w in segment_words[start : start + len(wanted)]]
            break
    position = translation.find(pt)
    if word_ids is None or position < 0:
        return None
    start16 = utf16_len(translation[:position])
    return {
        "wordIds": word_ids,
        "en": " ".join(w["word"] for w in segment_words if w["id"] in set(word_ids)),
        "pt": {"start": start16, "end": start16 + utf16_len(pt), "text": pt},
    }


def validate_batch_response(batch: list[dict[str, Any]], data: Any) -> dict[str, dict[str, Any]]:
    """Rejeita IDs ausentes, extras ou repetidos e traduções vazias."""
    if not isinstance(data, dict) or not isinstance(data.get("items"), list):
        raise TranslationResponseError("resposta sem lista 'items'")
    expected = [seg["id"] for seg in batch]
    received = [item.get("id") for item in data["items"] if isinstance(item, dict)]
    if len(received) != len(set(received)):
        raise TranslationResponseError("ids repetidos na resposta")
    if set(received) != set(expected):
        missing = sorted(set(expected) - set(received))[:3]
        extra = sorted(set(received) - set(expected))[:3]
        raise TranslationResponseError(f"ids não conferem (ausentes: {missing}, extras: {extra})")
    out: dict[str, dict[str, Any]] = {}
    for item in data["items"]:
        text = item.get("translation")
        if not isinstance(text, str) or not text.strip():
            raise TranslationResponseError(f"tradução vazia para {item.get('id')}")
        out[item["id"]] = {"translation": text.strip(), "highlights": item.get("highlights") or []}
    return out


def _materialize(
    segments: list[dict[str, Any]], words_by_segment: dict[str, list[dict[str, Any]]], raw_items: dict[str, dict[str, Any]]
) -> tuple[dict[str, Any], int]:
    items: dict[str, Any] = {}
    dropped = 0
    for seg in segments:
        raw = raw_items.get(seg["id"])
        if raw is None:
            continue
        highlights = []
        for candidate in raw.get("highlights", []):
            resolved = resolve_highlight(
                words_by_segment[seg["id"]], raw["translation"], str(candidate.get("en", "")), str(candidate.get("pt", ""))
            )
            if resolved is None:
                dropped += 1
            else:
                highlights.append(resolved)
        items[seg["id"]] = {"sourceText": seg["text"], "translation": raw["translation"], "highlights": highlights}
    return items, dropped


def _batches(segments: list[dict[str, Any]], size: int) -> list[list[dict[str, Any]]]:
    return [segments[i : i + size] for i in range(0, len(segments), size)]


def _user_prompt(batch: list[dict[str, Any]], before: list[str], after: list[str], title: str) -> str:
    payload = {
        "titulo_sugerido": title,
        "contexto_anterior": before,
        "trechos": [{"id": seg["id"], "en": seg["text"]} for seg in batch],
        "contexto_posterior": after,
    }
    return (
        "Traduza os itens de `trechos` para português brasileiro. `contexto_anterior` e `contexto_posterior` "
        "servem só de contexto e não devem ser traduzidos.\n\n" + json.dumps(payload, ensure_ascii=False, indent=1)
    )


def _prices(model: str) -> tuple[float, float] | None:
    env_in, env_out = os.environ.get("ANTHROPIC_PRICE_INPUT_PER_MTOK"), os.environ.get("ANTHROPIC_PRICE_OUTPUT_PER_MTOK")
    if env_in and env_out:
        return float(env_in), float(env_out)
    return _PRICES.get(model)


def estimate(segments: list[dict[str, Any]], params: TranslateParams) -> dict[str, Any]:
    """Estimativa grosseira (≈4 caracteres por token) para decidir orçamento antes do lote."""
    model = params.model or DEFAULT_MODEL
    chars = sum(len(seg["text"]) for seg in segments)
    batches = max(1, -(-len(segments) // params.batch_size))
    input_tokens = int(chars / 4 * 1.6) + batches * 600  # texto + contexto + JSON + prompt
    output_tokens = int(chars / 4 * 1.9) + len(segments) * 25
    prices = _prices(model)
    cost = None if prices is None else round(input_tokens / 1e6 * prices[0] + output_tokens / 1e6 * prices[1], 4)
    return {
        "model": model,
        "segments": len(segments),
        "batches": batches,
        "estimatedInputTokens": input_tokens,
        "estimatedOutputTokens": output_tokens,
        "estimatedCostUsd": cost,
        "method": "heurística de 4 caracteres/token; calibre com o uso real medido no piloto",
    }


def translate_with_anthropic(
    segments: list[dict[str, Any]],
    words_by_segment: dict[str, list[dict[str, Any]]],
    title: str,
    cache_dir: Path,
    params: TranslateParams,
    budget_usd: float | None = None,
    log: Callable[[str], None] = print,
) -> dict[str, Any]:
    import anthropic

    model = params.model or DEFAULT_MODEL
    client = anthropic.Anthropic(timeout=params.timeout_seconds, max_retries=0)
    try:
        client.models.retrieve(model)
    except anthropic.AuthenticationError as error:
        raise TranslationAuthError(
            "Anthropic respondeu 401: credencial ausente ou inválida. Defina ANTHROPIC_API_KEY (ou faça `ant auth login`) "
            "e rode `pipeline translate` de novo; ASR/alinhamento não precisam ser refeitos."
        ) from error
    except anthropic.NotFoundError as error:
        raise TranslationAuthError(f"modelo '{model}' não disponível nesta conta; ajuste ANTHROPIC_MODEL") from error
    except anthropic.APIConnectionError as error:
        raise TranslationAuthError(
            "não foi possível falar com a API da Anthropic (sem credencial resolvida ou sem rede)"
        ) from error

    prices = _prices(model)
    usage = {"inputTokens": 0, "outputTokens": 0, "cacheReadInputTokens": 0, "requests": 0, "cachedBatches": 0}
    raw_items: dict[str, dict[str, Any]] = {}
    failures: list[dict[str, Any]] = []
    stopped: str | None = None

    def spent() -> float | None:
        if prices is None:
            return None
        return usage["inputTokens"] / 1e6 * prices[0] + usage["outputTokens"] / 1e6 * prices[1]

    batches = _batches(segments, params.batch_size)
    for number, batch in enumerate(batches, start=1):
        first, last = segments.index(batch[0]), segments.index(batch[-1])
        before = [s["text"] for s in segments[max(0, first - params.context_segments) : first]]
        after = [s["text"] for s in segments[last + 1 : last + 1 + params.context_segments]]
        def cache_key(for_model: str) -> str:
            return sha256_json(
                {"model": for_model, "prompt": params.prompt_version, "system": SYSTEM_PROMPT, "target": params.target,
                 "batch": [[s["id"], s["text"]] for s in batch], "before": before, "after": after}
            )

        cache_file = cache_dir / f"{cache_key(model)}.json"
        cached = read_json_or_none(cache_file)
        for other in params.reuse_cache_from:
            if cached:
                break
            cached = read_json_or_none(cache_dir / f"{cache_key(other)}.json")
        if cached:
            raw_items.update(cached["items"])
            usage["cachedBatches"] += 1
            continue
        if budget_usd is not None and (spent() or 0) >= budget_usd:
            stopped = f"orçamento de US$ {budget_usd} atingido"
            break

        attempt = 0
        while True:
            attempt += 1
            try:
                response = client.messages.create(
                    model=model,
                    max_tokens=16000,
                    system=SYSTEM_PROMPT,
                    messages=[{"role": "user", "content": _user_prompt(batch, before, after, title)}],
                    output_config={"effort": params.effort, "format": {"type": "json_schema", "schema": _OUTPUT_SCHEMA}},
                )
                usage["requests"] += 1
                usage["inputTokens"] += response.usage.input_tokens
                usage["outputTokens"] += response.usage.output_tokens
                usage["cacheReadInputTokens"] += getattr(response.usage, "cache_read_input_tokens", 0) or 0
                if response.stop_reason == "refusal":
                    raise TranslationResponseError("o modelo recusou este lote (stop_reason=refusal)")
                if response.stop_reason == "max_tokens":
                    raise TranslationResponseError("resposta truncada (max_tokens)")
                text = next((b.text for b in response.content if b.type == "text"), "")
                items = validate_batch_response(batch, json.loads(text))
                atomic_write_json(cache_file, {"items": items, "model": model, "at": now_iso()})
                raw_items.update(items)
                log(f"  tradução lote {number}/{len(batches)}: {len(batch)} trechos")
                break
            except anthropic.AuthenticationError as error:
                raise TranslationAuthError(
                    "Anthropic respondeu 401 durante a tradução. Corrija ANTHROPIC_API_KEY e rode `pipeline translate` de novo."
                ) from error
            except (anthropic.RateLimitError, anthropic.APIConnectionError, anthropic.InternalServerError) as error:
                if attempt > params.max_retries:
                    failures.append({"batch": number, "error": f"{type(error).__name__} após {attempt} tentativas"})
                    break
                retry_after = 0.0
                response_obj = getattr(error, "response", None)
                if response_obj is not None:
                    try:
                        retry_after = float(response_obj.headers.get("retry-after", "0"))
                    except ValueError:
                        retry_after = 0.0
                delay = max(retry_after, min(60.0, 2.0**attempt + random.uniform(0, 1)))
                log(f"  tradução lote {number}: {type(error).__name__}; nova tentativa em {delay:.0f}s")
                time.sleep(delay)
            except (TranslationResponseError, json.JSONDecodeError) as error:
                # Resposta inválida: uma segunda tentativa; depois registra e segue.
                if attempt >= 2:
                    failures.append({"batch": number, "error": str(error)})
                    break
            except anthropic.APIStatusError as error:
                failures.append({"batch": number, "error": f"HTTP {error.status_code}: {error.message}"})
                break

    items, dropped = _materialize(segments, words_by_segment, raw_items)
    pending = [s["id"] for s in segments if s["id"] not in items]
    cost = spent()
    return {
        "provider": "anthropic",
        "model": model,
        "reusedCacheModels": list(params.reuse_cache_from),
        "promptVersion": params.prompt_version,
        "target": params.target,
        "status": "complete" if not pending else "translation_pending",
        "items": items,
        "pendingIds": pending,
        "failures": failures,
        "stoppedReason": stopped,
        "droppedHighlights": dropped,
        "usage": {**usage, "costUsd": None if cost is None else round(cost, 4)},
        "generatedAt": now_iso(),
    }


def translate_from_file(
    segments: list[dict[str, Any]], words_by_segment: dict[str, list[dict[str, Any]]], source: Path
) -> dict[str, Any]:
    """Importa traduções produzidas fora da API (com procedência declarada), com a MESMA validação."""
    data = read_json(source)
    raw_items = validate_batch_response(segments, data)
    items, dropped = _materialize(segments, words_by_segment, raw_items)
    return {
        "provider": data.get("provider", "file"),
        "model": data.get("model"),
        "provenance": data.get("provenance"),
        "promptVersion": data.get("promptVersion", "file"),
        "target": data.get("target", "pt-BR"),
        "status": "complete",
        "items": items,
        "pendingIds": [],
        "failures": [],
        "stoppedReason": None,
        "droppedHighlights": dropped,
        "usage": None,
        "generatedAt": now_iso(),
    }
