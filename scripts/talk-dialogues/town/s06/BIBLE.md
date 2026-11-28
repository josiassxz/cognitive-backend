# Tunely Town — Temporada 6: "Flat 4B" (bíblia da história)

Nível A2–B1 · Sitcom com mistério · 8 episódios, de domingo a sábado.

## Premissa
O aluno ("you", sem nome e SEM GÊNERO) é brasileiro(a) e aluga um quarto num apartamento dividido em
Manchester, o **Flat 4B**. Moram lá a **Mei** (programadora metódica, planilha para tudo), o **Callum**
(estudante de música, trombonista, caótico) e a **Priya** (enfermeira de plantão noturno). Some comida da
geladeira à noite, passinhos correm pelo corredor às três da manhã e o senhorio, **Mr. Whitaker**, marcou
uma vistoria para sábado. Quem é o "fantasma do 4B"?

Vocabulário: casa e cômodos, regras e contrato, contas e divisão de despesas, reclamar com jeito, pedir
desculpas, negociar (horários, tarefas, condições), rotina, telefone formal.

## A verdade (só revelada no ep. 8)
A **Mei**, a pessoa que nunca quebrou uma regra na vida, achou um filhote de gato encharcado atrás das
lixeiras na noite da tempestade, há duas semanas, e não conseguiu deixá-lo lá. O contrato proíbe animais
(cláusula nove), então ela o escondeu no quarto. O gato se chama **Bug**. Os passinhos das três são ele
correndo. A comida some porque, quando a ração acaba, a Mei pega presunto, frango ou leite dos colegas em
pânico e, por culpa, repõe no dia seguinte com uma marca melhor e etiqueta perfeita. As latas de atum e a
caixa pesada (areia) também são dela. O Callum espirra há duas semanas porque é alérgico a gato.
Pistas falsas: o Callum (vive na cozinha de madrugada, deve dinheiro, mas dormiu em Leeds na noite em que
o frango sumiu e as orelhas dele não ficam vermelhas) e a Priya (está no hospital na hora dos barulhos).
Saída: a cláusula nove diz "sem permissão POR ESCRITO", e o Whitaker só proibiu animais porque um cachorro
escondido roeu três portas; se pedirem direito e oferecerem depósito e limpeza, ele escuta. Sem vilão.

## Personagens (chave, nome, papel, voz Kokoro, lado)
- `n` Narrator — "Narrador", `bf_emma`, center. 2ª pessoa, frases curtas no nível do episódio.
- `m` Mei Chen — "Programadora, colega de apartamento", `af_kore`, left. Canadense de Vancouver. Precisa,
  seca, numera regras ("Rule fourteen"), fica travada e formal quando esconde algo. Coração mole.
- `c` Callum — "Estudante de música, colega de apartamento", `bm_fable`, right. Brincalhão, bagunceiro,
  exagerado, honesto demais (as orelhas ficam vermelhas quando mente).
- `p` Priya — "Enfermeira, colega de apartamento", `bf_alice`, left. Cansada, direta, humor seco, conta tudo.
- `w` Mr. Gerald Whitaker — "Senhorio, dono do apartamento", `bm_george`, right. Formal, pontual demais,
  detesta surpresas, sente falta do cachorro Pickle.
- `o` Mrs. Okafor — "Vizinha do 3B", `bf_isabella`, right. Ex-motorista de ônibus, chama todos de "love",
  perdeu a gata Duchess na primavera passada.

## Flags (memória)
| flag | onde é definida | onde volta |
|---|---|---|
| `food` = ham / chicken / salmon | ep1 (o que você põe na geladeira) | ep2 (some), ep3 (volta melhor) |
| `chore` = bins / bathroom / kitchen | ep1 (tarefa escolhida) | ep5 (plano de limpeza), ep7 (faxina) |
| `milk` = yes / no | ep2 (emprestar leite ao Callum) | ep3 (ele devolve ou comprou o dele) |
| `quiet_promise` = yes / no | ep2 (promessa à Priya) | ep5 (elogio ou bronca do despertador + pedido de desculpas) |
| `tone` = polite / blunt | ep3 (como você pergunta ao Callum; dá para consertar na hora) | ep4 (ele está magoado e você pede desculpas, ou não) |
| `practice` = home / campus | ep4 (acordo sobre o trombone) | ep5 (item "barulho" da reunião) |
| `helped_callum` = yes / no | ep4 (carregar o amplificador) | ep5 (ele retribui), ep7 (agradece ou comenta) |
| `helped_okafor` = yes / no | ep6 (garrafas) | ep6 (despedida), ep8 (ela lembra) |
| `asked_ten` = yes / no | ep7 (negociar o horário) | ep7 (reação da Priya) |
| `hid_bug`, `f_perm`, `f_offer` | ep8 | ep8 (caminhos e desfechos) |

## Pistas (9)
`meat_only` ep1 · `three_am` ep2 · `night_shift` ep2 · `guilty_ghost` ep3 · `sneezing` ep4 (só se você
perguntar dos espirros) · `written_permission` ep5 · `room_below` ep6 · `rainy_night` ep6 (só se você
perguntar da tempestade) · `landlord_reason` ep7 (só se você perguntar por que a regra existe).

## Episódios
1. `ep01.json` `s06-01-moving-in` A2 · home · "Flat 4B" · Domingo 15h · n, m, c
   A Mei recebe você com regras e etiquetas. Você guarda sua comida (DEFINE `food`) e escolhe uma tarefa
   (DEFINE `chore`). O Callum conta do fantasma: some presunto, frango e leite, nunca legumes (`meat_only`).
   Gancho: carta do senhorio, vistoria no sábado; a Mei derruba a xícara.
2. `ep02.json` `s06-02-three-in-the-morning` A2 · kitchen · Segunda 3h · n, c, p
   Passinhos e arranhões às três (`three_am`, dito pelo narrador). O Callum está na cozinha comendo cereal e
   pede leite (DEFINE `milk`). Sua comida sumiu (LÊ `food`). De manhã chega a Priya: plantão de domingo a
   quinta (`night_shift`), pede silêncio (DEFINE `quiet_promise`) e aposta no Callum. Gancho: as orelhas.
3. `ep03.json` `s06-03-the-guilty-ghost` A2 · kitchen · Terça 18h · n, c, m
   A comida voltou, melhor e etiquetada (LÊ `food`; `guilty_ghost`). LÊ `milk`. Conta de luz: quanto, como
   pagar. Você pergunta ao Callum com jeito ou na lata (DEFINE `tone`). Regra catorze: a lista na geladeira.
   Gancho: a Mei some com uma caixa pesada; o Callum espirra.
4. `ep04.json` `s06-04-the-practice-room` A2 · campus/studio · Quarta 13h · n, c
   LÊ `tone` (pedir desculpas ou não). Opinião sincera sobre a música, negociar o horário do trombone
   (DEFINE `practice`). Se você pergunta dos espirros: só em casa, alergia a gato (`sneezing`); se fala do
   fantasma: álibi em Leeds. Favor do show (DEFINE `helped_callum`). Gancho: reunião e contrato à noite.
5. `ep05.json` `s06-05-house-meeting` B1 · home · Quarta 19h · n, m, p, c, o
   Reunião: plano de limpeza (LÊ `chore`, `helped_callum`), barulho (LÊ `quiet_promise`, `practice`),
   contrato: cláusula nove, "sem permissão por escrito" (`written_permission`). A Mei diz que senhorio
   sempre nega. Gancho: a Sra. Okafor bate na porta por causa do barulho de madrugada.
6. `ep06.json` `s06-06-downstairs` B1 · home · "Flat 3B" · Quinta 17h · n, o
   Pedir desculpas e ouvir a reclamação. Favor das garrafas (DEFINE `helped_okafor`). Pezinhos em cima da
   cama dela, embaixo do último quarto (`room_below`). A gata Duchess. Se você pergunta da tempestade: a Mei
   ajoelhada nas lixeiras, guardando algo no casaco (`rainy_night`). Negociar solução. Gancho: o Whitaker vai ligar.
7. `ep07.json` `s06-07-the-landlord-calls` B1 · phone · Sexta 18h · n, w, c, p
   Telefonema formal: negociar o horário (DEFINE `asked_ten`), o que ele vai olhar e, se você perguntar, o
   motivo da regra (`landlord_reason`). Faxina (LÊ `chore`, `helped_callum`). Às três, alguma coisa macia
   passa no corredor. Gancho: luz embaixo da porta da Mei, sete horas para a vistoria.
8. `ep08.json` `s06-08-inspection-day` B1 · home · Sábado 9h · n, m, p, c, w, o
   Reunião das nove: o que é e quem é o fantasma. Acusar o Callum é o erro constrangedor (ele se defende,
   você pede desculpas). A Mei confessa; entra o Bug. O Whitaker chega antes: esconder (o gato mia, e mentir
   deixa as orelhas do Callum vermelhas) ou contar a verdade (DEFINE `hid_bug`). Negociação:
   - com `clue_written_permission` você pode pedir a permissão por escrito (`f_perm`);
   - com `clue_landlord_reason` você pode oferecer depósito e limpeza (`f_offer`).
   Desfechos: **melhor** (os dois: o gato fica, por escrito), **bom** (um dos dois: um mês de teste),
   **básico** (nenhum: o Bug vai morar com a Sra. Okafor, um andar abaixo). LÊ `helped_okafor`.
   Fecho: Whitaker e o Pickle, regra quinze da Mei ("in this flat, we tell each other things").
