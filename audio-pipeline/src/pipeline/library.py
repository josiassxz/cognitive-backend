"""Metadados de vitrine da biblioteca: paleta da capa e dificuldade estimada.

Tudo aqui é derivado de dados locais e marcado como estimativa:
- paleta: cores quantizadas da própria capa (Pillow), ajustadas para fundo escuro/claro legível;
- dificuldade: proporção de palavras raras (frequência Zipf < 3.5 no `wordfreq`), ignorando
  nomes próprios no meio da frase, mapeada para uma faixa CEFR aproximada. NÃO é um nível
  oficial de editora; a UI deve exibir "nível estimado".
"""
from __future__ import annotations

import colorsys
import re
from pathlib import Path
from typing import Any

LIBRARY_REVISION = "library-v1"
RARE_ZIPF = 3.5
# Limiares calibrados na distribuição deste acervo (0,3%–7,6% de palavras raras).
CEFR_BANDS: list[tuple[float, str]] = [(1.5, "a1"), (2.5, "a2"), (3.5, "b1"), (4.5, "b2")]
_WORD = re.compile(r"[A-Za-z][A-Za-z'’-]*")


def _hex(rgb: tuple[float, float, float]) -> str:
    return "#" + "".join(f"{max(0, min(255, round(c * 255))):02x}" for c in rgb)


def _with_lightness(rgb: tuple[float, float, float], lightness: float, min_sat: float = 0.0) -> tuple[float, float, float]:
    h, _, s = colorsys.rgb_to_hls(*rgb)
    return colorsys.hls_to_rgb(h, lightness, max(s, min_sat) if s > 0.08 else s)


def cover_palette(path: Path) -> dict[str, Any] | None:
    """Paleta {dominant, vibrant, background, surface, accent, onAccent} ou None se não houver capa."""
    from PIL import Image

    if not path.is_file():
        return None
    with Image.open(path) as image:
        small = image.convert("RGB")
        small.thumbnail((96, 96))
        quantized = small.quantize(colors=8, method=Image.Quantize.MEDIANCUT)
        palette = quantized.getpalette() or []
        counts = sorted(quantized.getcolors() or [], reverse=True)
    swatches = []
    total = sum(count for count, _ in counts) or 1
    for count, index in counts:
        r, g, b = (palette[index * 3 + k] / 255 for k in range(3))
        h, l, s = colorsys.rgb_to_hls(r, g, b)
        swatches.append({"rgb": (r, g, b), "share": count / total, "l": l, "s": s})
    if not swatches:
        return None
    dominant = swatches[0]
    # "Vibrante": mais saturada entre as que ocupam ao menos 3% da capa e não são quase pretas/brancas.
    candidates = [sw for sw in swatches if sw["share"] >= 0.03 and 0.18 < sw["l"] < 0.85] or swatches
    vibrant = max(candidates, key=lambda sw: sw["s"] * (0.6 + sw["share"]))
    base = vibrant if vibrant["s"] > 0.18 else dominant
    accent = _with_lightness(base["rgb"], 0.62, min_sat=0.45)
    accent_l = colorsys.rgb_to_hls(*accent)[1]
    return {
        "dominant": _hex(dominant["rgb"]),
        "vibrant": _hex(vibrant["rgb"]),
        # Fundo escuro na matiz da capa: legível com texto claro (contraste > 10:1).
        "background": _hex(_with_lightness(base["rgb"], 0.11)),
        "surface": _hex(_with_lightness(base["rgb"], 0.19)),
        "accent": _hex(accent),
        "onAccent": "#0b0b10" if accent_l >= 0.5 else "#ffffff",
    }


def difficulty(segments: list[dict[str, Any]]) -> dict[str, Any]:
    from wordfreq import zipf_frequency

    tokens: list[str] = []
    for segment in segments:
        words = _WORD.findall(segment["text"])
        for position, word in enumerate(words):
            sentence_start = position == 0
            if word[0].isupper() and not sentence_start and word.lower() != "i":
                continue  # nome próprio provável: não mede vocabulário
            tokens.append(word.lower().replace("’", "'").strip("'"))
    tokens = [token for token in tokens if token]
    if not tokens:
        return {"rareWordPercent": None, "cefrEstimate": None, "method": LIBRARY_REVISION}
    rare = sum(1 for token in tokens if zipf_frequency(token, "en") < RARE_ZIPF) / len(tokens) * 100
    level = next((band for limit, band in CEFR_BANDS if rare < limit), "c1")
    first, last = segments[0], segments[-1]
    minutes = max((last["endMs"] - first["startMs"]) / 60000, 0.1)
    return {
        "rareWordPercent": round(rare, 2),
        "uniqueWords": len(set(tokens)),
        "wordsPerMinute": round(len(tokens) / minutes),
        "cefrEstimate": level,
        "method": f"{LIBRARY_REVISION}: % de palavras com Zipf<{RARE_ZIPF} (wordfreq), sem nomes próprios",
    }


_MINOR = {"a", "an", "and", "as", "at", "but", "by", "for", "from", "in", "into", "of", "on", "or", "the", "to", "with"}


def display_title(slug_title: str) -> str:
    """Título legível a partir da sugestão do nome do arquivo.

    O slug perde apóstrofos ("the-emperor-s-new-clothes"): um "s" isolado volta a ser "'s".
    Palavras menores ficam minúsculas no meio do título (estilo de título em inglês).
    """
    words = slug_title.split()
    out: list[str] = []
    for position, word in enumerate(words):
        if word.lower() == "s" and out:
            out[-1] += "'s"
            continue
        if word.lower() in {"t", "ll", "re", "ve", "d", "m"} and out and position > 0:
            out[-1] += "'" + word.lower()
            continue
        lower = word.lower()
        out.append(lower if (out and lower in _MINOR) else word[:1].upper() + word[1:])
    return " ".join(out)


def library_meta(segments: list[dict[str, Any]], cover_path: Path | None) -> dict[str, Any]:
    return {
        "revision": LIBRARY_REVISION,
        "palette": cover_palette(cover_path) if cover_path else None,
        "difficulty": difficulty(segments),
    }
