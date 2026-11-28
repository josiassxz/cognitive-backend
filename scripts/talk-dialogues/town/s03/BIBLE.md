# Tunely Town — Temporada 3: "The Food Truck" (bíblia da história)

## Premissa
O aluno ("you", sem nome e SEM GÊNERO) é brasileiro(a) e acabou de chegar a **Austin, Texas**, para abrir com a
prima **Bia** um food truck de comida brasileira, o **The Little Toucan** (amarelo, com um tucano na lateral),
no pátio de trucks **Maple Yard**. Em duas semanas acontece o **Street Food Festival** (Riverside Park), com o
prêmio **Golden Fork** e cinco mil dólares, decidido por um **jurado secreto** que visita os trucks como cliente
comum. Nível A2 do começo ao fim (frases um pouco mais longas nos episódios finais). Tom: comédia leve de recomeço.

Cardápio (sempre em inglês simples, sem palavras em português nas falas): beans and rice plate (8 dólares),
steak sandwich (10), cheese bread (3 por 4 dólares), chocolate truffle, passion fruit juice, coffee (2).

## A verdade (só revelada no ep. 8)
O jurado secreto é o **Sr. Walter Boone**, o senhor quieto de chapéu cinza que vem todo dia às onze, pede sempre
"the usual" (arroz com feijão e café preto sem açúcar) e nunca elogia. Ele foi dono do Boone's Diner por trinta
anos. A esposa dele, Helena, era brasileira e fazia pão de queijo todo domingo: a comida do truck tem "gosto de
casa", e é por isso que ele volta. Ele não fala de comida; o elogio dele é o prato vazio. O que ele quer de um
truck: comida simples e bem feita, sem paparico, cliente tratado igual. Pista falsa: **Tyler**, o blogueiro de
câmera e caderninho (doze seguidores, treze com a mãe). O rival **Chuck** não é vilão: é barulhento, exagera no
molho, e no fim aprende a pôr menos.

## Personagens (chave, nome, papel, voz, lado)
- `n` Narrator, narrador, `bf_emma`, center. 2ª pessoa, frases curtas.
- `b` Bia, prima e sócia. Otimista, fala rápido, entra em pânico de um jeito engraçado. `af_bella`, left
- `w` Mr. Boone, cliente quieto de chapéu cinza. Seco, poucas palavras, "Hm.", chama o aluno de "kid". `am_michael`, right
- `c` Chuck Dawson, dono do Smoke King (costelas). Barulhento, convencido, coração mole; chama o aluno de "Toucan". `am_fenrir`, left
- `t` Tasha, técnica de geladeiras. Prática, direta, conhece todo mundo. `af_kore`, right
- `l` Linda, cliente exigente que trabalha em frente. Dura mas justa. `af_sarah`, left
- `d` Dale, fornecedor. Tranquilo demais, sempre atrasado, "no worries". `am_eric`, right
- `j` Tyler, blogueiro de comida. Elétrico, empolgado com tudo. `am_puck`, right
- `p` Priya, organizadora do festival. Clara e objetiva. `bf_isabella`, right

## Pistas (9)
`secret_judge` (ep1, garantida) · `same_order` (ep2, garantida) · `simple_food` (ep2 se perguntar do ano passado;
segunda chance no ep7) · `old_diner` (ep3, só se falar do Sr. Boone com a Tasha) · `clean_plate` (ep4, garantida) ·
`black_coffee` (ep5, só se perguntar do jurado ao Dale) · `never_praises` (ep6, garantida) · `tyler_blog` (ep7, se o
Chuck estiver de bem com você ou se você pedir desculpas) · `homemade` (ep7, só se `boone_talk=yes` ou
`sample=cheese_bread`).

## Memórias (flags)
- `sample` = cheese_bread | truffle | none (ep1). Lida no ep6 (o Sr. Boone lembra), ep7 (abre a conversa da Helena), ep8 (fala final).
- `helped_chuck` = yes | no (ep2, guardanapos). Lida no ep7 (gelo de graça e fofoca, ou frieza).
- `fridge` = new_part | old_part (ep3). Lida no ep5 (falta dinheiro para pagar o Dale) e ep7 (a geladeira falha de novo ou fica pequena).
- `linda` = remake | refund | argued (ep4). Lida no ep4 (conselho do Sr. Boone), ep6 (avaliação de uma estrela), ep8 (traz o escritório ou dá segunda chance).
- `boone_talk` = yes (ep6, se você trata todos igual ou puxa conversa). Lida no ep7.
- `f_who`, `f_what`, `f_how` (ep8): as três respostas certas do final.

## Episódios
1. `ep01.json` `s03-01-opening-day` A2 · street · "Maple Yard" · Segunda · 11h · elenco n, b, w.
   Primeiro dia. Bia ensina a frase de atendimento e os preços. Primeiro cliente: o senhor de chapéu cinza pede
   arroz com feijão e café sem açúcar, paga dez dólares, come calado. DEFINE `sample`. Bia lê o folheto do
   festival → `secret_judge`. Gancho: um caminhão vermelho estaciona ao lado.
2. `ep02.json` `s03-02-the-rival` A2 · street · Terça · 11h · elenco n, b, c, w.
   Chuck se apresenta e prova o pão de queijo ("needs sauce"). O Sr. Boone pede "same as yesterday" → `same_order`;
   nome no copo; troco para vinte. Chuck pede guardanapos: DEFINE `helped_chuck`. Se perguntar do ano passado →
   `simple_food`. Gancho: a geladeira faz clique.
3. `ep03.json` `s03-03-the-fridge` A2 · kitchen · "Dentro do truck" · Quarta · 8h · elenco n, b, t.
   Geladeira morta. Ligar para a Tasha, descrever o problema, dar o endereço, escolher peça nova (300) ou usada
   (90): DEFINE `fridge`. Conversa: se mencionar o Sr. Boone → `old_diner`. Pagar, recibo. Gancho: uma mulher de
   óculos escuros lê o cardápio sem sorrir.
4. `ep04.json` `s03-04-the-difficult-customer` A2 · street · Quinta · 13h · elenco n, b, l, w.
   Linda recebeu frango frio em vez de carne sem cebola. Refazer, devolver o dinheiro ou discutir: DEFINE `linda`
   (pedir desculpas depois de discutir vira `remake`). O Sr. Boone pergunta o que você aprendeu (LÊ `linda`).
   Bia repara no prato vazio → `clean_plate`. Gancho: o Dale não trouxe o queijo.
5. `ep05.json` `s03-05-the-late-delivery` A2 · street · Sexta · 7h · elenco n, b, d.
   Cobrar o Dale por telefone, conferir a entrega (peixe em vez de queijo), resolver, pagar (LÊ `fridge`: com a
   peça nova falta dinheiro e é preciso negociar). Se perguntar do jurado → `black_coffee`. Gancho: um rapaz de câmera.
6. `ep06.json` `s03-06-the-blogger` A2 · street · Sexta · 12h · elenco n, b, c, j, w.
   Tyler pede para descrever a comida; Bia e Chuck têm certeza de que ele é o jurado. Tyler conta o boato →
   `never_praises`. O Sr. Boone lembra do primeiro dia (LÊ `sample`) e testa você: DEFINE `boone_talk`. LÊ `linda`
   (avaliação de uma estrela).
7. `ep07.json` `s03-07-the-night-before` A2 · street · "Maple Yard, à noite" · Sexta · 20h (uma semana depois) · elenco n, b, c, w.
   Véspera. LÊ `fridge` (pifa de novo / pequena demais): falta gelo. LÊ `helped_chuck`: Chuck dá gelo e conta do
   Tyler → `tyler_blog` (e `simple_food` se perguntar), ou vende o gelo e não conta nada. O Sr. Boone aparece no
   escuro; LÊ `boone_talk` / `sample`: fala da Helena → `homemade`.
8. `ep08.json` `s03-08-the-festival` A2 · festival · "Riverside Park" · Sábado · 16h · elenco n, b, c, l, w, j, p.
   Linda volta (LÊ `linda`). Priya anuncia: o jurado está no parque; às cinco, um prato e uma bebida no palco.
   QUEM ganha tratamento de rei? (certo: ninguém, é o Sr. Boone e ele detesta paparico; erro constrangedor mas
   recuperável: bajular o Tyler). O QUE vai no prato? (simples, gosto de casa × três molhos). COMO servir? (café
   preto sem açúcar e nenhuma pergunta × suco doce e muita conversa). As opções certas só aparecem com as pistas.
   Finais: **melhor** (três acertos: Golden Fork, Chuck em segundo), **bom** (prato certo: Best New Truck, Chuck
   vence com menos molho), **básico** (sem prêmio). Em todos, o Sr. Boone fala pela primeira vez (LÊ `sample`), diz
   que a comida tem gosto de casa e promete voltar segunda, às onze.
