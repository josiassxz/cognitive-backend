# Temporada 7: "Night Train to Edinburgh" / "Trem noturno para Edimburgo" (bíblia)

Nível B1 (todos os episódios; a língua fica mais rica do 1 ao 8: horários e descrições no começo,
suposições com might / must have / can't have, contradições e tato do 4 em diante). Gênero: mistério clássico.

## Premissa
O aluno ("you", sem nome e sem gênero, do Brasil) vai passar o fim de semana em Edimburgo e pega o trem
noturno **Northern Star** em Londres, sexta às 23h30 (chegada 7h20). No vagão C viajam a violinista
Clara Whitmore, o assistente dela e o **Nightingale**, um violino de trezentos anos. Pouco depois da uma,
o estojo aparece vazio. A chefe de trem, Moira, está sozinha no turno e pede a sua ajuda: "ninguém se abre
com um uniforme, mas com você as pessoas falam". Ela chama o aluno de "berth nine" (cabine nove).

## A verdade (só no ep. 8)
Ninguém roubou. No mês passado, em Viena, a Clara travou no palco e saiu sem tocar. Apavorada com o concerto
de sábado (dois mil lugares), às 0h45 ela mesma tirou o violino do estojo, enrolou no vestido de concerto e
escondeu na própria capa de roupa, no bagageiro: sem violino, sem concerto, sem vergonha. O Oliver achou o
estojo vazio à 1h15, gritou, entendeu tudo e passou a protegê-la: mentiu que viu o violino à uma em ponto
(para dar um álibi a ela) e não deixou a Moira abrir a capa. À uma ele estava na plataforma de Crewe,
ligando para a antiga professora da Clara. Sem vilão: no fim, a Clara toca no vagão-lounge ao amanhecer.

### Linha do tempo
23h30 partida · 23h50 lounge: Lang oferece "qualquer preço", Clara recusa e não quer tocar · 0h15 Clara sai ·
0h30 Jamie na porta da cabine 5 ouve "I can't do it, Oliver. Not tomorrow." · 0h45 Dot (atrás do gato) vê
alguém de xale verde entrar no bagageiro com algo nos braços · 0h55–1h10 parada em Crewe, Oliver na
plataforma · 1h10 Lang sai do lounge · 1h15 Oliver acha o estojo vazio.

### Segredos de cada um (todos escondem algo)
- Clara: escondeu o próprio violino. Oliver: mentiu o horário para protegê-la.
- Sr. Lang: tem um estojo vazio debaixo da cama (é para um violino de leilão). Pista falsa.
- Dot: trouxe o gato Marmalade escondido na sacola de tricô (o "choro de violino" no corredor).
- Jamie: passagem de poltrona, mas esteve no vagão-leito para deixar um bilhete de fã que não teve coragem de entregar.

## Personagens (chave, nome, papel, voz, lado)
- `n` Narrator, "Narrador", `bf_emma`, center.
- `m` Moira Campbell, chefe de trem, escocesa, seca, justa, humor de pedra. `bf_isabella`, left
- `d` Dot Pringle, avó tagarela da cabine oito, tricô laranja, digressões sobre o Harold e a Margaret. `bf_alice`, left
- `o` Oliver Finch, assistente da Clara, organizado, leal, mente mal. `bm_daniel`, left
- `c` Clara Whitmore, violinista famosa, elegante, exausta, xale verde. `af_sarah`, right
- `l` Mr. Edgar Lang, colecionador pomposo e irônico, não sabe tocar uma nota. `bm_george`, right
- `j` Jamie Okafor, estudante de violino, 19 anos, nervoso, teste no sábado, alérgico a gato. `am_puck`, right

## Flags (memória)
- `called_conductor=yes` (ep1) → ep3 (Moira: "still not the conductor").
- `held_bag=yes|no` (ep1) → ep5 (você carregou o gato sem saber).
- `helped_jamie=yes|no` (ep1) → ep5 (ele confia ou não), ep6 (conta o que ouviu de cara, ou só depois de um pedido de desculpas).
- `order=tea|chocolate|toastie` (ep2) → ep2 (Moira serve), ep4 (Lang lembra do misto).
- `lang_friend=yes|no` (ep2) → ep4 (ele conta de Viena de boa vontade, ou você precisa se desculpar).
- `promised_quiet=yes|no` (ep3) → ep7 (Oliver confia ou mede as palavras), ep8 (fala final da Clara).
- `accused_lang=yes` (ep4 ou ep8) → ep8 (Lang devolve a alfinetada).
- `cat_secret=kept|honest` (ep5) → ep6 (Moira pergunta do gato, ou a Dot já confessou).
- `f_who`, `f_where`, `f_why` (ep8) → desfecho.

## Pistas (9)
`locked_case` (ep3, sempre) · `no_practice` (ep3, só se perguntar do ensaio) · `lang_auction` (ep4, sempre) ·
`vienna` (ep4, só se perguntar da carreira; exige `lang_friend` ou desculpas) · `marmalade` (ep5, sempre) ·
`green_shawl` (ep5, perde quem se precipita e diz "foi o Sr. Lang") · `cant_do_it` (ep6, só se perguntar o que
ele ouviu; exige `helped_jamie` ou desculpas) · `oliver_lie` (ep6, sempre) · `garment_bag` (ep7, sempre).

## Episódios
1. `ep01` `s07-01-platform-one` · station · "Sexta · 23h10" · n, m, d, j. Embarque. Moira confere a passagem (gafe do
   "conductor"), horários e parada em Crewe. Dot pede para carregar a sacola de tricô, que se mexe. Jamie tromba em
   você e espalha as partituras. Clara passa de xale verde; Oliver leva o estojo "como um bebê". Lang observa.
   Define `called_conductor`, `held_bag`, `helped_jamie`. Gancho: "What could possibly go wrong?"
2. `ep02` `s07-02-the-lounge-car` · train · "Sexta · 23h50" · n, m, d, l, c. Pedido no bar (`order`), tricô da Dot, Lang
   oferece qualquer preço e Clara recusa; Lang puxa conversa (`lang_friend`); Clara se recusa a tocar, mãos tremendo;
   cartas com a Dot. Gancho: grito no corredor, o violino sumiu.
3. `ep03` `s07-03-the-empty-case` · train · "Sábado · 1h20" · n, m, o, c. Estojo vazio. Oliver: "at one o'clock, exactly".
   Crewe 0h55–1h10. Pista `locked_case`. Clara pede segredo (`promised_quiet`). Moira pede sua ajuda. A sós com o
   Oliver: pista opcional `no_practice`; ele aponta para o Lang. Lê `called_conductor`. Gancho: o violino ainda está a bordo.
4. `ep04` `s07-04-forty-one-violins` · train · "Sábado · 2h" · n, m, l. Conversa com o Lang (tato ou acusação). Álibi: cartas
   com a Dot até 1h10. Estojo debaixo da cama: pode acusar (`accused_lang`, constrangedor e recuperável). Pistas
   `lang_auction` e, opcional, `vienna`. Lê `order`, `lang_friend`. Gancho: um choro fino vindo da cabine oito.
5. `ep05` `s07-05-very-lively-wool` · train · "Sábado · 2h45" · n, d, j. O gato Marmalade (`marmalade`), segredo da Dot
   (`cat_secret`). Ela viu alguém às 0h45 no bagageiro (`green_shawl`, se você tiver paciência). Jamie aparece
   espirrando. Lê `held_bag`, `helped_jamie`. Gancho: Jamie acha que está encrencado.
6. `ep06` `s07-06-coach-d` · train · "Sábado · 3h30" · n, j, m. Jamie conta do bilhete, do que ouviu atrás da porta
   (`cant_do_it`, opcional) e do Oliver na plataforma. Moira confronta com o que o Oliver disse (`oliver_lie`).
   Lê `helped_jamie`, `cat_secret`. Gancho: chá com o Sr. Finch.
7. `ep07` `s07-07-tea-with-mr-finch` · train · "Sábado · 4h30" · n, m, o. Apontar a contradição com tato ou de frente.
   Oliver admite o telefonema, quase "confessa" o roubo para proteger a Clara. Moira revela a capa que ele não deixou
   abrir (`garment_bag`); você decide se ela abre já ou espera. Lê `promised_quiet`. Gancho: amanhece na Escócia.
8. `ep08` `s07-08-edinburgh-at-dawn` · train · "Sábado · 6h40" · n, m, d, o, c, l, j. Moira pergunta quem, onde e por quê
   (opções certas dependem de `clue_green_shawl`/`clue_cant_do_it` e `clue_vienna`/`clue_cant_do_it`/`clue_no_practice`).
   Desfechos: (a) melhor, quem+onde+por quê: você conversa a sós com a Clara, e ela mesma vai contar; (b) bom, parcial:
   todos no lounge, Oliver confessa em falso e a Clara o interrompe; (c) básico: Moira pega o telefone e a Clara
   entra com a capa. Erro recuperável: acusar o Lang. Depois: o bilhete do Jamie, a Clara toca ao nascer do sol,
   seis lugares na primeira fila. Lê `accused_lang`, `promised_quiet`.
