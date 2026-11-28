# Tunely Town — Temporada 5: "Exchange Year" (bíblia da história)

## Premissa
O aluno ("you", sem nome e SEM GÊNERO) é brasileiro(a) e passa um semestre de intercâmbio na **Hartwell
University**, em Boston. Mora na suíte 3B do alojamento Linden Hall com a Tasha, resolve a vida na secretaria,
almoça no refeitório, vai parar ao vivo na rádio do campus e cai no **grupo quatro** da matéria *Cities and
People*: um trabalho que vale a nota, sobre "trabalho invisível" (título: *The Campus After Dark*). Na semana
da apresentação, o Miles, responsável pelos slides, some. Gênero: vida no campus, comédia leve, calor humano.

## A verdade (só revelada no ep. 8)
O **Miles Park** não fugiu. Ele guardava a única cópia dos slides no notebook velho ("não mostro trabalho pela
metade"). No domingo da semana 10, o notebook morreu ao vivo na rádio, onde ele é técnico de som voluntário.
O conserto custa 400 dólares. Ele trabalha escondido no refeitório, no turno das 5h, e pegou todos os turnos
extras; depois do trabalho, passa as noites no computador doze da biblioteca refazendo os slides (terminou 7 de
20). Não contou a ninguém porque nunca pede ajuda e porque ouviu a Priya dizer no refeitório "He has one job.
One." Ironia que fecha a temporada: o grupo estudou trabalho invisível por dez semanas e não viu o trabalhador
invisível do próprio grupo. Sem vilão: a Priya é mandona por ansiedade e pede desculpa.
Pista falsa: a teoria do Gus de que o Miles foi a Nova York ver a banda do primo (a "foto" é uma caixa de som).

## Personagens (chave, nome, papel, voz, lado)
- `n` Narrator — "Narrador", `bf_emma`, center. 2ª pessoa, frases curtas no nível do episódio.
- `t` Tasha Brooks — colega de suíte, locutora do *The Global Hour*; falante, calorosa, não desiste. `af_bella`, left
- `m` Miles Park — vizinho e colega de grupo; tímido, conserta tudo, nunca pede ajuda ("I've got it"). `am_eric`, right
- `d` Mr. Doyle — secretário acadêmico, britânico, seco, ama formulários. `bm_george`, left
- `g` Gus — colega de grupo; piadista, sempre com fome. `am_puck`, right
- `w` Professor Okafor — professora de Cities and People; exigente, espirituosa, justa. `bf_isabella`, left
- `p` Priya — colega de grupo; organizada, direta, entra em pânico em forma de lista. `af_sarah`, left
- `r` Rosa — funcionária do refeitório, cabo-verdiana, maternal ("my dear"). `af_kore`, right
- `f` Ms. Finch — bibliotecária que só sussurra, humor seco. `af_nicole`, right

## Pistas (7)
`never_asks` (ep1, opcional) · `late_slot` (ep2, opcional) · `only_copy` (ep3, sempre) · `early_shift` (ep4,
opcional) · `dead_laptop` (ep5, sempre) · `library_nights` (ep6, opcional, duas chances) · `one_thing` (ep7, opcional)

## Flags
`gift` (coffee|candy|flipflops, ep1 → ep5, ep7) · `radio_yes` (ep1 → ep5) · `id_photo` (smile|serious|blink,
ep2 → ep2, ep3, ep4, ep6) · `role` (interviews|numbers|opening, ep3 → ep4) · `warned_copy` (ep3 → ep8) ·
`fries` (ep4 → ep6) · `talk_miles` (ep4 → ep5) · `praised_miles` (ep5 → ep7) · `dead_air` (lesson|weather|sang,
ep5 → ep6) · `message` (kind|firm|help, ep6 → ep7) · `trust` (ep7, no próprio ep.) · `accused` (ep8) ·
`f_what`, `f_where`, `f_why`, `ending` (ep8, internas do final)

## Episódios
1. `ep01.json` `s05-01-move-in-day` A2 · home · "Semana 1 · Sáb 10h" · n, t, m
   Chegada à suíte 3B. Escolher quarto, dar o presente do Brasil (DEFINE `gift`), convite para a rádio
   (DEFINE `radio_yes`). O Miles conserta o Wi-Fi e recusa ajuda com a geladeira. Pista `never_asks` se você
   perguntar por que ele não quis ajuda. Gancho: a secretaria.
2. `ep02.json` `s05-02-the-registrar` A2 · office · "Semana 1 · Seg 9h" · n, d, g
   Fila com o Gus; foto da carteirinha (DEFINE `id_photo`); matrícula errada (Natação Avançada) trocada por
   Cities and People. Pista `late_slot` só se você perguntar sobre prazos. LÊ `id_photo`.
3. `ep03.json` `s05-03-group-four` A2 · campus · "Semana 1 · Ter 14h" · n, w, p, g, m
   Primeira aula, tema "invisible work", grupo quatro. Dividir tarefas (DEFINE `role`). O Miles fica com os
   slides e a única cópia no notebook (`only_copy`); você pode sugerir um backup (DEFINE `warned_copy`).
   LÊ `id_photo`.
4. `ep04.json` `s05-04-lunch-meeting` A2 · restaurant · "Semana 6 · Qua 12h" · n, r, p, g
   Pedir almoço com a Rosa (pista `early_shift` se você perguntar do Miles), prestar contas (LÊ `role`),
   fritas do Gus (DEFINE `fries`), a Priya solta "He has one job" e alguém de moletom cinza se afasta.
   Quem fala com o Miles (DEFINE `talk_miles`). Convidar a Rosa para a entrevista. LÊ `id_photo`.
5. `ep05.json` `s05-05-on-air` B1 · studio · "Semana 9 · Dom 20h" · n, t, m, g
   Entrevista ao vivo (LÊ `radio_yes`, `gift`, `talk_miles`). O Gus liga disfarçado (DEFINE `praised_miles`).
   O notebook do Miles morre no ar (`dead_laptop`); você segura o silêncio (DEFINE `dead_air`). Ele sai sem
   a jaqueta. Gancho: não atende mais a porta.
6. `ep06.json` `s05-06-computer-twelve` B1 · library · "Semana 10 · Ter 22h" · n, f, p, g
   Reunião de emergência. Ms. Finch e o computador doze (`library_nights`, no começo ou na saída). Teoria de
   Nova York, plano B, mensagem de voz (DEFINE `message`), e-mail para a professora.
   LÊ `id_photo`, `dead_air`, `fries`. Gancho: "I'm sorry".
7. `ep07.json` `s05-07-five-in-the-morning` B1 · kitchen · "Semana 10 · Qui 5h" · n, t, r, m
   A Tasha te acorda (LÊ `gift`); com `early_shift` você mesmo deduz o refeitório. A Rosa conta o que ele
   ouviu (`one_thing`, se você perguntar). O Miles aparece, quase explica, promete vir (LÊ `message`,
   `praised_miles`; DEFINE `trust`: com jeito, ele entrega o pen drive com 7 slides).
8. `ep08.json` `s05-08-group-four-presents` B1 · campus · "Semana 10 · Sex 9h40" · n, p, g, w, m, r
   A Priya pede fatos: o quê (`f_what`), onde (`f_where`, precisa de `library_nights`), por quê (`f_why`,
   precisa de `one_thing` ou `never_asks`). Três desfechos: melhor (os três: a Priya pede desculpa antes de
   ele falar, nota máxima), bom (por quê + parte), básico (passam raspando). Erro constrangedor: acusar o
   Miles de fugir com a professora bem atrás de você (recuperável, vira piada do Gus no fim). `late_slot`
   libera pedir o último horário (catorze slides em vez de sete). LÊ `warned_copy`. O Miles revela tudo em
   todos os caminhos; a Rosa aplaude no fundo.
