"""Traduções do piloto, escritas pelo Claude (Fable 5.2) numa sessão do Claude Code em 2026-11-12,
porque não havia ANTHROPIC_API_KEY configurada. Entram pelo provedor `file`, que aplica a mesma
validação de IDs/destaques do provedor `anthropic`. Uso:
    uv run python pilot/build_translations.py <segments.json> <saida.json>
"""
import json
import sys

# (tradução, [(destaque_en, destaque_pt), ...]) na ordem dos trechos
ROWS = [
    ("Era uma vez, em certa aldeia, uma menininha do campo,", [("Once upon a time", "Era uma vez")]),
    ("a criatura mais linda que já se viu.", []),
    ("Sua mãe gostava muito dela, e sua avó a adorava ainda mais.", [("was fond of", "gostava muito"), ("doted on", "adorava")]),
    ("Essa boa senhora mandou fazer para ela um capuzinho vermelho.", [("had a little red riding hood made", "mandou fazer para ela um capuzinho vermelho")]),
    ("Ele caía tão bem na menina", [("suited", "caía tão bem")]),
    ("que todos a chamavam de Chapeuzinho Vermelho.", []),
    ("Um dia, sua mãe fez uns bolos e lhe disse:", []),
    ("Vá, minha querida, ver como está sua avó,", []),
    ("porque ela tem estado muito doente.", [("has been very ill", "tem estado muito doente")]),
    ("Leve para ela um bolo e este potinho de manteiga.", []),
    ("Chapeuzinho Vermelho partiu imediatamente para a casa da avó,", [("set out", "partiu")]),
    ("que morava em outra aldeia.", []),
    ("Quando atravessava o bosque,", []),
    ("ela encontrou um lobo", [("met with", "encontrou")]),
    ("que estava com muita vontade de devorá-la,", [("had a very great mind to", "estava com muita vontade de"), ("eat her up", "devorá-la")]),
    ("mas não se atreveu, por causa de uns lenhadores que trabalhavam ali perto, na floresta.", [("dared not", "não se atreveu")]),
    ("Ele perguntou aonde ela ia.", []),
    ("A pobre criança, que não sabia", []),
    ("que era perigoso parar e conversar com um lobo,", []),
    ("disse a ele: Vou ver a minha avó", []),
    ("e levar para ela um bolo e um potinho de manteiga, da parte da minha mãe.", []),
    ("Ela mora longe?", [("far off", "longe")]),
    ("disse o lobo.", []),
    ("Ah, sim, respondeu Chapeuzinho Vermelho,", []),
    ("fica além daquele moinho que você vê ali,", [("beyond", "além")]),
    ("na primeira casa da aldeia.", []),
    ("Bem, disse o lobo, eu também vou vê-la.", []),
    ("Eu vou por este caminho e você vai por aquele,", []),
    ("e veremos quem chega lá primeiro.", []),
    ("O lobo correu o mais rápido que pôde,", [("as fast as he could", "o mais rápido que pôde")]),
    ("pegando o caminho mais curto, e a menina foi por um caminho mais longo,", [("roundabout way", "caminho mais longo")]),
    ("distraindo-se em colher nozes, correr atrás de borboletas", [("running after", "correr atrás de")]),
    ("e fazer buquês de florzinhas.", []),
    ("Não demorou muito para o lobo chegar à casa da velhinha.", [("It was not long before", "Não demorou muito para")]),
    ("Ele bateu à porta. Toc, toc. Quem é?", [("knocked at", "bateu à")]),
    ("Sua netinha, Chapeuzinho Vermelho, respondeu o lobo,", []),
    ("imitando a voz dela, que lhe trouxe um bolo", [("counterfeiting", "imitando")]),
    ("e um potinho de manteiga que a mamãe mandou.", []),
    ("A boa avó, que estava de cama porque estava doente,", [("was in bed", "estava de cama")]),
    ("gritou: Puxe a cordinha, e o trinco vai subir.", [("cried out", "gritou")]),
    ("O lobo puxou a cordinha, e a porta se abriu,", []),
    ("e então ele logo se atirou sobre a boa senhora", [("fell upon", "se atirou sobre")]),
    ("e a devorou num instante,", [("in a moment", "num instante")]),
    ("pois fazia mais de três dias que ele não comia.", []),
    ("Depois ele fechou a porta e se deitou na cama da avó,", [("got into", "se deitou na")]),
    ("esperando Chapeuzinho Vermelho,", []),
    ("que chegou algum tempo depois e bateu à porta. Toc, toc. Quem é?", [("some time afterwards", "algum tempo depois")]),
    ("Chapeuzinho Vermelho,", []),
    ("ao ouvir a voz grossa do lobo, a princípio ficou com medo,", [("at first", "a princípio")]),
    ("mas, achando que a avó estava resfriada e rouca,", [("had a cold", "estava resfriada"), ("hoarse", "rouca")]),
    ("respondeu: É a sua netinha, Chapeuzinho Vermelho,", []),
    ("que lhe trouxe um bolo", []),
    ("e um potinho de manteiga que a mamãe lhe manda.", []),
    ("O lobo gritou para ela,", []),
    ("suavizando a voz o quanto podia:", [("as much as he could", "o quanto podia")]),
    ("Puxe a cordinha, e o trinco vai subir.", []),
    ("Chapeuzinho Vermelho puxou a cordinha, e a porta se abriu.", []),
    ("O lobo disse a ela, escondendo-se debaixo das cobertas:", [("bedclothes", "cobertas")]),
    ("ponha o bolo e o potinho de manteiga em cima do banquinho", [("upon", "em cima do")]),
    ("e venha se deitar na cama comigo.", []),
    ("Chapeuzinho Vermelho tirou a roupa e se deitou na cama.", [("took off", "tirou")]),
    ("Ela ficou muito espantada ao ver como a avó era de camisola", [("greatly amazed", "muito espantada")]),
    ("e disse a ela: Vovó, que braços grandes você tem!", []),
    ("É para te abraçar melhor, minha querida.", [("All the better to", "É para")]),
    ("Vovó, que pernas grandes você tem!", []),
    ("É para correr melhor, minha criança.", []),
    ("Vovó, que orelhas grandes você tem!", []),
    ("É para ouvir melhor, minha criança.", []),
    ("Vovó, que olhos grandes você tem!", []),
    ("É para ver melhor, minha criança.", []),
    ("Vovó, que dentes grandes você tem!", []),
    ("É para te devorar melhor! E,", [("eat you up", "te devorar")]),
    ("dizendo essas palavras, esse lobo malvado se atirou sobre Chapeuzinho Vermelho", [("wicked", "malvado"), ("fell upon", "se atirou sobre")]),
    ("e a devorou inteirinha. Fim.", [("ate her all up", "a devorou inteirinha")]),
]

segments = json.load(open(sys.argv[1], encoding="utf-8"))["segments"]
assert len(segments) == len(ROWS), (len(segments), len(ROWS))
out = {
    "provider": "claude-code-session",
    "model": "claude-fable-5-2",
    "provenance": "Traduzido pelo Claude (Fable 5.2) em sessão do Claude Code em 2026-11-12, sem API (não havia ANTHROPIC_API_KEY). Revisão humana recomendada.",
    "target": "pt-BR",
    "items": [
        {"id": seg["id"], "translation": text, "highlights": [{"en": en, "pt": pt} for en, pt in highlights]}
        for seg, (text, highlights) in zip(segments, ROWS)
    ],
}
json.dump(out, open(sys.argv[2], "w", encoding="utf-8"), ensure_ascii=False, indent=1)
print("itens:", len(out["items"]))
