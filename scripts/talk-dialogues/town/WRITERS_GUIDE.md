# Guia do roteirista — histórias do Tunely Town

Você vai escrever UMA temporada completa (8 episódios) de um áudio-drama interativo para brasileiros
aprendendo inglês. O aluno OUVE os personagens (vozes sintéticas, som ambiente) e responde escolhendo
uma fala. A história tem memória (o que o aluno diz muda falas e caminhos depois) e "pistas" (coisas
importantes que ele ouve e que vão para um caderno, e que mudam o final).

## Leia antes (obrigatório)
- `town/s01/BIBLE.md` e `town/s01/ep01.json`, `ep05.json`, `ep08.json`: a temporada 1, que é o padrão de
  qualidade, tom, tamanho e técnica (desvios por memória, pistas, três finais).
- `gen_dialogues.py`: o validador. A docstring define o formato; `build()` e o bloco `town` mostram o que é checado.

## O que entregar, na sua pasta `town/<id>/`
1. `BIBLE.md` — escreva PRIMEIRO: premissa, a "verdade" que só se revela no fim, personagens (chave, nome,
   papel em pt-BR, voz, lado), e para cada episódio: slug, nível, lugar, hora, elenco, o que acontece,
   flags que define/lê, pistas que revela. Planeje a temporada inteira antes de escrever falas.
2. `season.json`:
   ```json
   {"season": <número dado>, "title": "<título em pt-BR>", "subtitle": "<1–2 frases em pt-BR, sem spoiler>",
    "level": "A2–B1", "genre": "<gênero em pt-BR>",
    "clues": {"<id>": {"title": "<curto, pt-BR>", "note": "<1 frase em pt-BR: o fato que o aluno ouviu>"}}}
   ```
   6 a 9 pistas. Em histórias que não são de mistério, as "pistas" são descobertas que importam no final
   (o que o jurado gosta, o segredo de alguém, um fato que resolve o problema).
3. `ep01.json` … `ep08.json`, um objeto por arquivo:
   ```json
   {"slug": "<id>-01-<kebab>", "episode": 1, "title": "<English title>", "level": "A2",
    "place": "<ícone da lista>", "placeLabel": "<nome do lugar, curto>", "time": "Segunda · 9h",
    "ambience": "<som da lista>", "description": "<pt-BR, 1 linha>", "intro": "<pt-BR, 1–2 frases; do ep. 2 em diante, recapitula>",
    "cast": {"n": ["Narrator", "Narrador", "bf_emma", "center"], "x": ["Name", "Papel em pt-BR", "voz", "left|right"]},
    "start": "<id do primeiro nó>", "nodes": { ... }}
   ```

### Nós
- fala: `["x", "English line", "tradução pt-BR", próximo]` — próximo = id | null (fim do episódio) | lista de opções
- fala com meta: `[..., {"clue": "id"}]` (a pista é revelada quando ESTA fala é dita; também vale como flag `clue_<id>`)
  ou `[..., {"set": {"flag": "valor"}}]`
- desvio pela memória (sem fala): `{"branch": [["flag=valor", "idA"], ["!flag", "idB"], ["clue_x", "idC"], [null, "padrão"]]}`
  (para E lógico, encadeie desvios; sempre termine com `[null, id]`)
- opção válida: `["English answer", "pt", "próximoId"]` ou `[..., "próximoId", {"set": {"flag": "valor"}}]`
- opção sem sentido: `["English answer", "pt", null, "reação do personagem", "pt da reação"]`
- flags e valores: minúsculas `[a-z0-9_]`. Flag lida num episódio precisa ter sido definida antes.

### Listas fechadas
- `ambience`: cafe, street, shop, office, police, market, pub, festival, airport, station, train, restaurant,
  hotel, park, beach, home, car, clinic, campus, party, nature, kitchen, gym, studio
- `place` (ícone): os mesmos acima, mais: phone, bank, museum, boat, stage, court, garage, farm, library
- vozes de personagem (Kokoro). Americanas: af_alloy, af_aoede, af_bella, af_jessica, af_kore, af_nicole, af_nova,
  af_river, af_sarah, af_sky, am_echo, am_eric, am_fenrir, am_michael, am_onyx, am_puck. Britânicas: bf_alice,
  bf_isabella, bf_lily, bm_daniel, bm_fable, bm_george, bm_lewis. Melhores: af_bella, af_nicole, af_sarah, af_kore,
  am_eric, am_michael, am_fenrir, am_puck, bf_isabella, bf_alice, bm_george, bm_fable, bm_daniel.
  Narrador é SEMPRE `["Narrator", "Narrador", "bf_emma", "center"]`. Não use bf_emma, am_adam, am_santa nem af_heart
  em personagens. Cada personagem mantém a MESMA voz e o MESMO lado em todos os episódios; num mesmo episódio,
  nunca duas pessoas com a mesma voz, e equilibre esquerda/direita.

## Regras de escrita (o validador não pega tudo: a responsabilidade é sua)
- O aluno é "you": sem nome e SEM GÊNERO (nada de sir/madam/he/she/guy/girl/lady/dude para o aluno; nas traduções,
  evite formas com gênero: "valeu" em vez de "obrigado/a", "que bom te ver"). É brasileiro(a).
- Inglês natural e idiomático no nível indicado. Falas CURTAS (máx. ~18 palavras; A1/A2 bem simples; B1/B2 com
  phrasal verbs, expressões e registro adequado). Uma voz sintética vai ler: evite siglas, números longos
  (escreva por extenso: "two pounds fifty"), "..." e palavras em MAIÚSCULAS. Não use "Er,"; use "Uh," ou "Well,".
- Toda pergunta tem 3 ou 4 opções: 2–3 válidas que levam a caminhos DIFERENTES de verdade (não sinônimos) + exatamente
  1 sem sentido — engraçada e tentadora para quem ouviu errado (som parecido, palavra com dois sentidos) — com uma
  reação do personagem que repete a pergunta de outro jeito.
- Coisas importantes são DITAS (é treino de escuta): a pista fica no nó da fala que a contém.
- Memória: pelo menos 4 flags que voltam em episódios posteriores e mudam falas de verdade (alguém lembra do que
  você pediu, de um favor, de uma promessa, de uma gafe). Algumas pistas só aparecem se o aluno puxar o assunto certo.
- Final (ep. 8): pelo menos três desfechos conforme as pistas juntadas (use desvios encadeados), e um caminho
  de "erro constrangedor mas recuperável". Recompensa emocional clara. Sem vilão cruel.
- Cada episódio: 35–48 nós, 8–11 perguntas no caminho mais longo e no mínimo 6 no mais curto; começa com o
  narrador (2ª pessoa, frases curtas no nível do episódio: "You open the door. It smells of fresh bread."),
  usa o narrador nas transições, e termina com um gancho para o próximo (menos o 8).
- Os níveis sobem ao longo da temporada dentro da faixa dada.
- Personagens com voz própria (um falante, um seco, um brincalhão, um tímido…), humor leve, calor humano.
- Proibido: violência, romance com o aluno, política, religião, palavrões, marcas reais como parte do enredo.
- Traduções `pt` em português do Brasil natural (não literal), sem travessões.

## Validar (sempre com --no-audio)
```
cd /Users/josiassiqueira/Documents/projetos-josias/talk-tts
uv run python gen_dialogues.py --no-audio --only town --season <id>
```
Precisa terminar sem erros ("<id>: 8 episódios, N pistas, M nós"). NUNCA rode sem `--no-audio`. Não edite nada fora
da sua pasta `town/<id>/`. Outros roteiristas estão escrevendo outras temporadas ao mesmo tempo em pastas vizinhas:
não leia nem altere as deles.

## Antes de terminar
Releia cada episódio como o aluno vai ouvir e lapide: cada fala soa como gente de verdade? As opções sem sentido
têm graça? As pistas e memórias fecham no final? Depois responda com um relatório curto: por episódio, nós,
decisões (mín–máx), flags definidas/lidas e pistas; e qualquer ressalva.

## Complemento: "a história lembra" (obrigatório no season.json)
Inclua em `season.json` a chave `"memories"`: um objeto que traduz as memórias do aluno em frases curtas
em pt-BR, mostradas no caderno da história. Chave = condição (`"flag=valor"` ou `"flag"`), valor = frase
em segunda pessoa, sem gênero, sem spoiler do final. Uma entrada para cada flag que volta em episódios
posteriores (4 a 8 entradas). Exemplo da temporada 1:
```json
"memories": {
  "drink=tea": "A Emma sabe que você pede chá.",
  "helped_hughes=yes": "O Sr. Hughes lembra que você ajudou a achar o Biscuit.",
  "helped_hughes=no": "O Sr. Hughes lembra que você estava com pressa."
}
```
