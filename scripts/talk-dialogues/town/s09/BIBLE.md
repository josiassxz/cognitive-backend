# Tunely Town — Temporada 9: "The Kitchen Final" (bíblia da história)

## Premissa
O aluno ("you", sem nome e SEM GÊNERO; brasileiro/a) é um dos quatro finalistas de **The Kitchen Final**, o maior
programa de culinária da TV britânica, gravado no Estúdio 4, em Manchester. É a semana final: três provas
(sopa, prova técnica, semifinal em duplas) e a final na quinta. Entre as provas, coisas dão errado: o creme
some da bandeja, a baunilha de outra participante desaparece, um cartão de receita vem trocado, o mel da avó
escocesa some, o pote de sal está cheio de açúcar. Todo mundo fala em sabotagem, e o suspeito óbvio é o chef
convencido. O aluno cozinha, recebe e dá críticas, trabalha em dupla e, ouvindo as pessoas, junta as peças.
Nível B1 do começo ao fim (falas um pouco mais ricas a partir do ep. 5). Tom: comédia leve de bastidores, calor humano.

## A verdade (só revelada no ep. 8)
Não é sabotagem. É o **Toby**, o assistente de produção novo, na **semana de experiência**. O outro assistente pediu
demissão na sexta, ninguém avisou a produtora, e o Toby está fazendo os dois turnos: chega às quatro da manhã e
tranca o estúdio à meia-noite. Perdeu o último ônibus e dorme no sofá do camarim. De tão exausto, guardou o creme
na geladeira da equipe (ao lado dos próprios sanduíches), imprimiu o cartão de receita do ano passado, embalou o mel
da Morag na caixa de produtos de limpeza e trocou as etiquetas de sal e açúcar. Ele anota tudo com uma caneta
verde (a única que funciona). A produtora Dee, estressada, disse "mais um erro e eu vou ter que te dispensar",
então ele escondeu cada erro. No final, a Dee descobre que o erro foi do escritório, mantém o Toby, contrata um
segundo assistente e manda ele dormir. Sem vilão.
Pista falsa: o **Rupert** some com o celular e foi visto perto da despensa. Ele liga para a mãe antes de cada prova
para pedir conselhos, e morre de vergonha disso.

## Personagens (chave, nome, papel, voz Kokoro, lado)
- `n` Narrator — "Narrador", `bf_emma`, center. 2ª pessoa, frases curtas.
- `g` Morag MacLeod — participante, avó escocesa de 71 anos, de Inverness. Calorosa, direta, humor seco; chama você de
  "dear", diz "wee" e "aye". `bf_alice`, left
- `c` Rupert Lang — participante, dono de restaurante, convencido, fala alto; chama você de "Brazil". No fundo é
  inseguro e decente. `bm_george`, right
- `p` Nina — participante, estudante de ciência dos alimentos, de Seattle, tímida, pede desculpas por tudo,
  observadora. `af_nicole`, left
- `s` Stella Hart — apresentadora, animada, trocadilhos, chama todo mundo de "darling". `bf_isabella`, right
- `v` Victor Crane — jurado temido, seco, poucas palavras, justo. `bm_daniel`, left
- `t` Toby — assistente de produção novo, exausto, atrapalhado, gentil; chama você de "number four". `bm_fable`, left
- `d` Dee — produtora, sobrecarregada, dura mas justa. `bf_lily`, right

## Pistas (9)
`double_shift` (ep1, só se perguntar se o Toby está bem) · `crew_fridge` (ep2) · `victor_taste` (ep3 se perguntar;
segunda chance no ep7) · `old_recipe` (ep4) · `sofa` (ep5, só se pedir para a Nina contar o que viu) ·
`trial_week` (ep5 se perguntar o que ela ouviu; ou ep6 se você ajudou o Toby no ep1) · `rupert_mum` (ep6) ·
`green_pen` (ep6) · `victor_past` (ep7, só se perguntar ao Victor sobre erros).

## Memória (flags)
- `helped_toby` yes|no (ep1: ajudar com as colheres) → ep2 (ele lembra), ep6 (só se abre com quem ajudou: `trial_week`)
- `dish` moqueca|feijoada|mousse (ep1: prato prometido para a final) → ep8 (o prato que você serve)
- `owe_morag` yes|no (ep2: aceitar ou não o creme dela) → ep5 (ela cobra o favor ou provoca seu orgulho)
- `tasted` yes|no (ep2: provar a sopa) → ep3 (o Victor percebe)
- `took_crit` well|argued (ep3: como você recebe a crítica) → ep7 (o Victor lembra)
- `rupert_rel` friendly|cold (ep3) → ep5 (o Rupert pede seu apoio ou te desafia)
- `theory` mistake|sabotage (ep3: o que você diz à Nina) → ep5 (ela lembra)
- `recipe_fix` asked|shared|trusted (ep4: o que você faz com o cartão errado) → ep5 (a Nina comenta)
- `rupert_secret` kept|tell|deal (ep6: o segredo da mãe) → ep7 (como ele te recebe como dupla), ep8
- `accused_rupert` yes (ep8: gafe recuperável) · `f_who`, `f_why`, `f_hide` (ep8) · `plate` simple|fancy (ep8)

## Episódios
1. `ep01.json` `s09-01-lights-camera-apron` B1 · studio/studio · "Segunda · 7h" · n, t, s, g
   Chegada ao estúdio. Toby confunde seu número, derruba quarenta colheres (DEFINE `helped_toby`); se você perguntar se
   ele está bem → `double_shift`. Entrevista com a Stella (DEFINE `dish`). Morag, a vizinha de bancada, oferece shortbread.
   Começa a prova da sopa: o creme não está na sua bandeja.
2. `ep02.json` `s09-02-the-missing-cream` B1 · kitchen/kitchen · "Segunda · 10h" · n, g, c, s, t
   Prova 1: sopa "com gosto de casa". Pedir creme ao Rupert (ele nega), aceitar o da Morag ou improvisar (DEFINE
   `owe_morag`). Stella narra seus passos. Provar ou não (DEFINE `tasted`). Toby aparece tarde demais com o creme:
   estava na geladeira da equipe (`crew_fridge`); LÊ `helped_toby`. Gancho: o jurado chega.
3. `ep03.json` `s09-03-the-verdict` B1 · stage/studio · "Segunda · 12h" · n, v, s, c, p
   Victor julga sua sopa (LÊ `tasted`); você reage à crítica (DEFINE `took_crit`); se perguntar o que ele procura →
   `victor_taste`. Rupert leva uma bronca e desconta em você (DEFINE `rupert_rel`). Nina vence e conta que a baunilha
   dela também sumiu (DEFINE `theory`). Gancho: a prova técnica.
4. `ep04.json` `s09-04-the-wrong-recipe` B1 · kitchen/kitchen · "Terça · 9h" · n, s, p, t, c
   Prova técnica: scones de queijo. Seu cartão diz "cheese biscuits, bake for fifty"; o da Nina diz "fifteen".
   Chamar a Stella, copiar da Nina ou confiar no cartão (DEFINE `recipe_fix`). Stella: é a receita do ano passado
   (`old_recipe`); há uma anotação em tinta verde. Toby traz o cartão certo, com marca de travesseiro no rosto.
   Rupert insinua que alguém quer te tirar da competição.
5. `ep05.json` `s09-05-canteen-gossip` B1 · cafe/cafe · "Terça · 13h" · n, g, p, c
   Almoço na cantina. O mel de urze da Morag sumiu (LÊ `owe_morag`). Nina (LÊ `recipe_fix`, `theory`) viu alguém no
   sofá (`sofa`) e ouviu a produtora ameaçar alguém (`trial_week`): depende do que você pergunta. Rupert se defende
   (LÊ `rupert_rel`) e fala de uma "ligação particular". Plano: despensa às sete.
6. `ep06.json` `s09-06-the-pantry-at-night` B1 · kitchen/kitchen · "Terça · 19h" · n, c, t
   Na despensa, você flagra o Rupert ao telefone com a mãe (`rupert_mum`; DEFINE `rupert_secret`). Depois chega o
   Toby: o mel está na caixa de limpeza, etiqueta em tinta verde, caneta verde atrás da orelha (`green_pen`).
   LÊ `helped_toby`: se você ajudou, ele confessa a semana de experiência (`trial_week`). Gancho: a Dee chama o Toby
   pelo rádio; ele avisa: "amanhã, confira o sal".
7. `ep07.json` `s09-07-too-many-cooks` B1 · kitchen/kitchen · "Quarta · 10h" · n, s, c, v, g
   Semifinal em duplas: você e o Rupert (LÊ `rupert_secret`). Dividir tarefas, lidar com um parceiro que grita,
   defender seu molho. O pote de sal tem açúcar. Victor julga (LÊ `took_crit`): de quem é a culpa do frango seco?
   Se você perguntar sobre erros → `victor_past`; se pedir conselho → `victor_taste`. Gancho: a Dee vai apontar o
   "sabotador" diante das câmeras.
8. `ep08.json` `s09-08-the-final-plate` B1 · stage/studio · "Quinta · 14h" · n, d, c, t, v, g, s
   A Dee confronta todos. Você pode acusar o Rupert (gafe recuperável: ele mostra as ligações para a mãe). Três
   perguntas: quem, por quê, por que escondeu (`f_who`, `f_why`, `f_hide`). Desvios encadeados com `clue_trial_week`
   e `clue_double_shift`/`clue_sofa`: final completo (você explica tudo com provas), parcial (bons palpites; o Toby
   se entrega) ou básico (a Dee ameaça interrogar todos; o Toby se entrega). `clue_victor_past`: o próprio Victor
   defende o Toby; senão, a Morag. Depois a final: LÊ `dish`; servir simples ou enfeitado (DEFINE `plate`):
   simples → você vence; enfeitado → a Morag vence e você fica em segundo. LÊ `accused_rupert`, `rupert_secret`.
