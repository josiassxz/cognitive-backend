# Tunely Town — Temporada 1: "O mistério de Millbrook" (bíblia da história)

## Premissa
O aluno ("you", sem nome e SEM GÊNERO: nunca usar sir/madam/he/she/guy/girl/lady para o aluno) é um(a)
brasileiro(a) que acabou de se mudar para **Millbrook**, uma cidadezinha inglesa à beira-mar, para trabalhar
no jornal local, **The Millbrook Gazette**. Na primeira manhã, o pote de doações do café some. Ao longo da
semana, ouvindo as pessoas (o texto fica escondido por padrão!), o aluno junta pistas e, no festival de quinta,
conta o que aconteceu.

## A verdade (só revelada no ep. 8)
O **Sam** (17 anos, irmão da Emma, jaqueta vermelha) pegou o pote. Não foi roubo: o pote era ideia dele
(para o parquinho novo). Estava pesado de moedas, e ele quis trocar por notas no banco para entregar um
"cheque gigante" surpresa no festival. Mas segunda era **feriado bancário** (banco fechado). Ele trocou parte
das moedas na loja do Ravi (de boné), guardou o dinheiro, e quando a polícia entrou no caso ficou com vergonha
e não contou. No festival ele entrega o dinheiro, com as economias dele somadas. Final feliz, sem vilão.
Pista falsa: o **Kevin** (colega do jornal) também usa jaqueta vermelha, mas estava no dentista.

## Personagens (chave no JSON, nome, papel, voz Kokoro, lado do som)
- `n`  Narrator — narrador, "Narrador", `bf_emma`, center. Narra em inglês SIMPLES no nível do episódio, 2ª pessoa
  ("You open the door. The café smells of fresh bread."). 1–2 frases curtas por nó. Usar no início e em transições.
- `e`  Emma Clarke — dona do Corner Café, americana, calorosa, fala rápido quando nervosa. `af_bella`, left
- `s`  Sam Clarke — 17 anos, irmão da Emma, trabalha meio período no café, tímido, toca violão. `am_eric`, right
- `h`  Mr. Arthur Hughes — vizinho idoso (Rose Street nº 14; o aluno mora no nº 12), rabugento mas bom,
  cachorro chamado Biscuit. `bm_george`, left
- `r`  Ravi Shah — dono da loja de conveniência da esquina, falante, adora fofoca. `am_michael`, right
- `m`  Maggie Brennan — editora-chefe do Gazette, britânica, direta, engraçada. `bf_isabella`, left
- `k`  Kevin Moore — colega do jornal (fotógrafo), brincalhão, jaqueta vermelha. `am_fenrir`, right
- `o`  Officer Lucy Ruiz — policial da cidade, calma, precisa. `af_jessica`, left
- `l`  Leo — músico de rua na praça do mercado, amigo do Sam. `am_puck`, right

## Episódios (arquivo, slug, nível, ambience, place, time, elenco, função)
1. `ep01.json` `town-01-a-new-start` A1 · ambience `cafe` · place `cafe` · time "Segunda · 9h"
   Elenco n, e, s. Você chega na cidade, pede bebida (DEFINE `drink` = coffee | tea | hot_chocolate),
   conversa com a Emma, vê o pote de doações ("for the new playground"), o Sam serve e sai apressado.
   Fim: Emma percebe que o pote sumiu. Você viu alguém de jaqueta vermelha sair → pista `red_jacket`.
2. `ep02.json` `town-02-rose-street` A1 · `street` · place `street` · "Segunda · 11h"
   Elenco n, h. Você procura sua casa (Rose Street nº 12). Mr. Hughes procura o cachorro Biscuit.
   Ajudar ou não (DEFINE `helped_hughes` = yes | no). Ele viu um rapaz correndo com sacola que tilintava → `heavy_bag`.
3. `ep03.json` `town-03-corner-shop` A2 · `shop` · place `shop` · "Segunda · 17h"
   Elenco n, r. Compras básicas (pão, leite, chip de celular, troco). Ravi fofoca: banco fechado hoje
   (`bank_holiday`), um rapaz educado de boné trocou muitas moedas (`coins`). Pode usar `drink` ("Tea bags? / coffee?").
4. `ep04.json` `town-04-the-gazette` A2 · `office` · place `office` · "Terça · 9h"
   Elenco n, m, k. Primeiro dia no jornal. Maggie dá a pauta: o pote sumido, para a edição do festival.
   Kevin brinca (DEFINE `kevin_friend` = yes | no conforme você reage). Maggie conta que o pote foi ideia do Sam (`jar_idea`).
5. `ep05.json` `town-05-police-station` A2/B1 (use "B1") · `police` · place `police` · "Terça · 14h"
   Elenco n, o. Você entrevista a Officer Ruiz para a matéria. Janela 9h10–9h20 e a câmera só mostra
   uma manga vermelha (`time_window`). BRANCH em `clue_red_jacket`: se você tem a pista, pode contar o que viu.
6. `ep06.json` `town-06-market-day` B1 · `market` · place `market` · "Quarta · 11h"
   Elenco n, l, h. Leo toca na praça; conta que o Sam perguntou se o banco estava aberto (`bank_question`).
   Mr. Hughes aparece com Biscuit: BRANCH em `helped_hughes=yes` (ele é simpático, agradece) vs não (seco).
7. `ep07.json` `town-07-quiz-night` B1 · `pub` · place `pub` · "Quarta · 20h"
   Elenco n, k, e, s. Quiz no pub The Anchor. Kevin mostra o recibo do dentista (`kevin_alibi`);
   BRANCH em `kevin_friend` (ele te chama para o time dele vs. fica na dele). Emma lembra sua bebida (BRANCH em `drink=...`).
   Sam fica nervoso quando o pote é mencionado e quase conta.
8. `ep08.json` `town-08-the-festival` B1 (use "B1") · `festival` · place `festival` · "Quinta · 18h"
   Elenco n, m, e, s, o, h. Final no festival do porto. Maggie pergunta o que você descobriu. Você decide
   o que dizer; BRANCHES em pistas (`clue_coins`, `clue_bank_question`, `clue_bank_holiday`, `clue_jar_idea`...)
   mudam o quão bem você explica. Pode acusar o Kevin (caminho constrangedor, mas recuperável).
   Final: Sam revela o dinheiro + economias; Emma emocionada; Maggie: "That's our front page."
   Melhor final se você juntou pistas suficientes (use branches encadeados para "E").

## Regras de escrita (OBRIGATÓRIAS)
- Inglês natural e idiomático, falas CURTAS (máx. ~18 palavras; A1 bem simples, B1 mais rico com phrasal verbs).
- O aluno sempre tem 3 ou 4 opções: 2–3 válidas (caminhos diferentes de verdade, não sinônimos) + 1 sem sentido
  (engraçada, plausível de confundir para quem não entendeu o áudio) com reação do personagem que repete a pergunta
  de outro jeito.
- Pistas importantes são DITAS (é um jogo de escuta). A pista é marcada no nó em que é dita: `{"clue": "coins"}`.
- Traduções `pt` em português do Brasil natural, não literal.
- Cada episódio: 25–45 nós, 7–11 perguntas no caminho mais longo, começa com narrador, termina com gancho para o próximo.
- Não usar números longos/soletrar; preços simples ("two pounds fifty").
- Proibido: violência, romance, política, palavrões. Tom: comédia leve + mistério aconchegante.
