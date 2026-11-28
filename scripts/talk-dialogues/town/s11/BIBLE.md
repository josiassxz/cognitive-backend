# Temporada 11: "The Last Ferry" / "A última balsa" (bíblia da história)

Nível B2 · Drama documental · 8 episódios · pasta `town/s11/` · slugs `s11-NN-...`

## Premissa
O aluno ("you", sem nome e sem gênero, brasileiro/a) faz documentários e vai a **Skerra**, ilha remota (fictícia)
da Escócia. A balsa **Kittiwake**, única ligação com o continente (Port Carrick), pode ser cancelada para sempre.
Em cinco dias (segunda a sexta) o aluno entrevista cinco moradores com visões opostas e, na sexta, exibe o filme
no salão comunitário, antes de a ilha decidir o que pedir à repartição. O tema é a vida da comunidade: sem
partidos, sem política real. A "repartição" é só o departamento regional de transportes.

## A verdade (só se fecha no ep. 8)
Todo mundo briga pela pergunta errada ("salvar a Kittiwake" x "cancelar a rota"). Os fatos:
1. O número oficial (11 passageiros por travessia) é honesto, mas foi contado em 3 semanas de fevereiro e só
   conta bilhetes. Moradores viajam com passe de residente e não aparecem.
2. O diário de bordo do capitão registra 34 por travessia na média do ano, mais toda a carga (pesca do Duncan,
   correio, remédios, mercearia).
3. A Kittiwake tem 40 anos; o capitão acha que aguenta só mais dois invernos. Por isso ele nunca mostrou o
   diário: salvar a rota com os números dele poderia condenar o barco dele.
4. A carta de 1974 (mãe da Morag, 40 assinaturas) nunca pediu um navio: pediu "a daily crossing, however small".
5. Há dois anos a Priya redigiu uma terceira opção: barco menor, 12 lugares, diário, metade do custo. Foi
   engavetada porque todas as cartas da ilha diziam só "save the Kittiwake".
6. A Isla não quer abandonar a ilha: tem vaga em engenharia naval em Glasgow e, com duas balsas por semana
   (segunda e quinta), ir embora significa ir de vez. Com barco diário ela volta toda sexta.
Desfecho: a ilha pede, junta, o barco diário. Sem vilão: a Priya cresceu numa ilha que perdeu o barco (Annasay)
e não quer assinar isso de novo.

## Personagens (chave, nome, papel, voz, lado)
- `n` Narrator, Narrador, `bf_emma`, center. 2ª pessoa, frases curtas.
- `c` Captain Reid (Callum), capitão da balsa, `bm_george`, left. Seco, poucas palavras, humor de pedra. 31 anos na rota.
- `i` Isla (MacRae), 19, tripulante da balsa e filha do Duncan, `bf_alice`, right. Registro informal, sarcástica, gírias ("bottle it", "cheers").
- `m` Morag (Sinclair), dona da pousada Tern House, `bf_isabella`, right. Falante, maternal, "dear", alimenta todo mundo.
- `d` Duncan (MacRae), pescador de lagosta, `bm_daniel`, left. Rabugento brincalhão, orgulhoso; diz que a ilha se vira sem a balsa.
- `p` Priya Nair, funcionária do departamento regional de transportes, `bf_lily`, right. Registro formal, precisa, ironia fina. O "casaco cinza".

## Flags (memória)
| flag | valores | define | lê |
|---|---|---|---|
| `crossing` | sick / fine | ep1 (enjoo na travessia) | ep2 (Morag: biscoito de gengibre), ep5 (Priya estava na balsa) |
| `collect` | numbers / stories | ep1 (fim) | ep7 (Callum lembra ao abrir o diário) |
| `room` | sea / garden | ep2 | ep6 (gaivotas ou galo) |
| `side` | fair / island | ep2 (de que lado é o filme) | ep5 (a notícia chegou à Priya) |
| `helped_duncan` | yes / no | ep3 (carregar caixas) | ep3 (caminho da pista), ep6 ("my crew" x "Precious Hands"), ep8 |
| `camera_off` | yes / no | ep4 | ep4 (versão sincera x versão educada) |
| `promised` | yes / half | ep4 (o que dizer ao pai) | ep6 (narrador lembra a promessa) |
| `priya_trust` | yes / no (ausente = sim) | ep5, ep7 | ep5 (pergunta em off), ep7 (fria ou aberta) |
| `asked_option` | yes | ep5 (pergunta certa em off) | ep7 (Priya responde sem você repetir) |
| `isla_secret` | kept / told | ep6 (Duncan pergunta) | ep8 (Isla na porta) |
| `accused` | yes | ep8 (gafe) | ep8 (piada final da Priya) |
| `f_num`, `f_need`, `f_plan`, `ending` | | ep8 | ep8 (três desfechos) |

## Pistas
`winter_count` (ep1 Isla, se perguntar da contagem; ou ep5 Priya) · `old_letter` (ep2, se perguntar da moldura; ou ep6)
· `freight` (ep3, se perguntar para onde vão as caixas; ou ep6) · `isla_reason` (ep4, câmera desligada ou a pergunta
certa) · `priya_island` (ep5, só com confiança e a pergunta pessoal) · `logbook` (ep7, sempre) · `engine` (ep7, se
perguntar "Finish her?") · `hidden_proposal` (ep7, só se a Priya confiar em você e você perguntar).

## Episódios
1. `ep01` `s11-01-the-crossing` · B2 · boat / beach · "Balsa Kittiwake" · Segunda 7h · n, c, i.
   Embarque em Port Carrick. A Isla te conta: passageiro nove. Capitão dá a regra (nada de cartão-postal), onda,
   enjoo. Define `crossing`, `collect`. Pista `winter_count` (opcional). Gancho: "comece pela Morag".
2. `ep02` `s11-02-the-tern-house` · hotel · "Pousada Tern House" · Segunda 11h · n, m.
   Check-in, primeira entrevista (concessão: "Mind you, I'll admit one thing"). Lê `crossing`. Define `room`,
   `side`. Pista `old_letter` (se perguntar da moldura). Gancho: Duncan gritando no porto.
3. `ep03` `s11-03-the-harbour` · beach · "Porto de Skerra" · Terça 6h · n, d, i.
   Carregar caixas ou não. Duncan: "we managed before". Define/lê `helped_duncan`. Pista `freight` (pergunta
   certa; sem ajudar, exige insistir). Gancho: Isla marca no farol.
4. `ep04` `s11-04-off-the-record` · nature · "Trilha do farol" · Terça 16h · n, i.
   Registro informal. Desligar a câmera? Define `camera_off`, `promised`. Pista `isla_reason`. Gancho: a
   funcionária chegou.
5. `ep05` `s11-05-the-grey-coat` · office · "Salão comunitário" · Quarta 10h · n, p.
   Registro formal. Lê `crossing`, `side`. Você pode acusar ("That's a lie") e se desculpar. Define
   `priya_trust`, `asked_option`. Pistas `winter_count`, `priya_island`. Gancho: o livro do capitão.
6. `ep06` `s11-06-the-puffin` · pub · "Pub The Puffin" · Quarta 20h · n, d, m.
   Moderar e resumir a briga. Lê `room`, `helped_duncan`, `clue_freight`, `clue_old_letter`, `promised`.
   Define `isla_secret`. Segunda chance para `freight` e `old_letter`. Gancho: bilhete do capitão.
7. `ep07` `s11-07-the-logbook` · boat / beach · "Ponte de comando da Kittiwake" · Quinta 5h · n, c, p.
   O diário de bordo. Lê `collect`, `priya_trust`, `asked_option`. Pistas `logbook`, `engine`, `hidden_proposal`.
   Gancho: uma noite para montar o filme.
8. `ep08` `s11-08-the-screening` · stage / restaurant · "Salão comunitário" · Sexta 19h · n, m, d, i, c, p.
   Exibição. Três perguntas (números, necessidade, plano) com opções certas liberadas pelas pistas. Gafe
   recuperável: acusar a repartição de mentir. Desfechos: `best` (três acertos: voto unânime, carta na segunda),
   `good` (acertou a necessidade, faltou algo: capitão e Priya completam, carta durante a semana), `basic`
   (capitão se levanta e conta tudo; nova reunião, um mês de prazo). Em todos: Isla conta ao pai, Duncan aceita,
   Callum se oferece para treiná-la, você batiza o filme.

## Vocabulário-alvo
Opinião com nuance e concessão (granted, mind you, to be fair, I'll give you that, a point but not the whole
picture), hipóteses (if there were a boat every day, I'd...; as if the camera weren't here), entrevistar
(walk me through, off the record, on camera, may I ask), resumir (in short, sum it up, let me check I've understood),
registro formal (Priya) x informal (Isla).
