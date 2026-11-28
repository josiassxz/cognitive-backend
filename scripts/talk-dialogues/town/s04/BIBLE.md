# Tunely Town — Temporada 4: "Route 66" (bíblia da história)

Reconstruída na revisão final a partir dos 8 episódios (o roteirista não deixou bíblia).

## Premissa
O aluno ("you", sem nome e SEM GÊNERO) chegou do Brasil ontem. O avô, Francisco "Frank" Almeida, brasileiro
que viveu em Chicago e dirigiu ônibus escolar por trinta anos, deixou a van amarela de 1974 para os dois
netos, juntos: o aluno e o primo Rafa, que cresceu em Chicago e mal fala português. No porta-luvas há
cartões-postais do verão de 1974, escritos para a vó Rosa (viva; "drive the road, then you'll know"), cada
um com um enigma que leva a uma pessoa que conheceu o Frank. Seis dias, de segunda a sexta, Chicago a Santa Monica.

## A verdade (só fecha no ep. 8)
Em 1974 o Frank foi para a Califórnia atrás de emprego, sem dinheiro, pagando a estrada com trabalho e música.
Em Tulsa soube por telefone que a Rosa estava grávida (a mãe do Rafa) e seguiu para o oeste mesmo assim, porque
"bebê custa dinheiro". Em Santa Monica ofereceram a ele um emprego num barco de pesca: paga boa, mas oito meses
no mar por ano. Ele recusou e voltou feliz para casa. Deixou com a Sal, na loja de iscas do fim do píer, uma
caixa trancada com uma fita cassete gravada em agosto de 1974 e um cartão-postal em branco (o último, para os
netos escreverem à Rosa). A chave ficou escondida atrás do porta-luvas. Não há dinheiro: a herança é a estrada
e as pessoas dela, e o plano de fazer os dois netos virarem família. Anos depois ele mandou à Sal uma carta com
três perguntas para os netos (e a gaita). Sem vilão.

Linha do tempo de 1974 (manter coerente): uma semana lavando pratos na Dot; três noites no Blue Star; Amarillo;
Rusty Spur; Floresta Petrificada em 3 de agosto; posto do Earl; Santa Monica. Volta: passa pelo Earl nove dias
depois e pelo Hank "umas duas semanas" depois, rumo ao leste. No total, cerca de um mês fora ("A month later").

## Personagens (chave, nome, papel, voz, lado)
- `n` Narrator, narrador, `bf_emma`, center. 2ª pessoa, frases curtas.
- `r` Rafa, seu primo de Chicago, `am_puck`, right. Falante, brincalhão, comilão, sonha com tesouro e tacos.
  Chama a van de "the Toaster". Todos os episódios.
- `d` Dot, dona da lanchonete (Missouri), `af_bella`, left. Calorosa, chama todo mundo de "hon". Ep. 2.
- `w` Walt, dono do motel Blue Star (Tulsa), `am_michael`, left. Seco, frases mínimas. Ep. 3.
- `l` Lupe, mecânica (Amarillo), `af_kore`, left. Sarcástica, sem paciência, coração bom. Ep. 4.
- `h` Hank, músico de estrada (Rusty Spur, Novo México), `am_fenrir`, left. Calmo, contador de histórias. Ep. 5.
- `k` Ranger June, guarda do parque (Arizona), `af_sarah`, left. Entusiasmada, apaixonada por regras. Ep. 6.
- `o` Earl, dono do posto Last Chance Gas (Mojave), `am_onyx`, left. Rabugento de humor seco. Ep. 7.
- `s` Sal (Salvadora), dona da loja de iscas (Santa Monica), `af_nicole`, left. Direta, chama de "honey". Ep. 8.
- `c` Frank, o avô numa fita de 1974, `am_eric`, center. Inglês de imigrante, sem contrações. Ep. 8.
Na estrada todos chamam o avô de Frank; sobrenome Almeida. A van se chama Rosie (pela Rosa).

## Flags
| flag | valores | define | lê |
|---|---|---|---|
| `driver` | you / rafa | ep1 | ep4 (quem dirigia quando a van fumou) |
| `van_plan` | keep / sell / later | ep1; ep7 pode trocar para keep/sell | ep4, ep8 (fala do Rafa no final) |
| `pie` | cherry / apple / pecan | ep2 | ep3 (abertura) |
| `helped_dot` | yes / no | ep2 | ep2 (despedida), ep4 (desconto da Lupe: 120 em vez de 200) |
| `slept` | badly / well | ep3 | ep3 (quarto), ep4 (abertura) |
| `radio` | fixed / broken | ep4 | ep5 (abertura), ep8 (onde tocam a fita) |
| `sang` | yes / no | ep5 | ep5 (despedida), ep6 (abertura) |
| `rock` | asked / no | ep6 | ep6 (despedida), ep7 (abertura) |
| `water` | yes | ep7 | ep7 (despedida) |
| `f_van`, `f_song`, `f_why` | yes | ep8 (respostas certas) | ep8 (finais) |
| `ending` | best | ep8 | ep8 (gaita) |

## Pistas (fala marcada com `clue`)
| pista | ep | nó | como se consegue | uso no ep. 8 |
|---|---|---|---|---|
| `rosa_cards` | 1 | `r_cards` | sempre | contexto |
| `dishes` | 2 | `d_met` / `d_met2` | perguntar como se conheceram | contexto |
| `rosie` | 2, 4 | `d_rosie` / `d_rosie2`; `l_rosie` | perguntar da van à Dot ou o nome à Lupe | pergunta 1 |
| `baby_news` | 3 | `w_call2` | perguntar por que três noites ou se houve algo especial | pergunta 3; desvios nos ep. 5, 6, 7 |
| `key` | 4 | `l_gb` | pedir para olhar o porta-luvas | abre a caixa (senão chave de fenda) |
| `song` | 5 | `h_song` | perguntar o que tocaram ou qual era a música | pergunta 2 |
| `logbook` | 6 | `k_log2` | sempre | frase extra no cartão final |
| `said_no` | 7 | `o_said` | sempre | contexto da pergunta 3 |
| `sal` | 7 | `r_riddle2` | sempre | leva ao píer |

## Episódios
1. `s04-01-the-glove-box` A2, car, Segunda 7h, Chicago. Elenco n, r. A van, o combinado de falar inglês, os
   cartões, enigma 1 (a menor coisa que se desenha: dot), a oferta de quatro mil dólares do colecionador.
   Define `driver`, `van_plan`. Pista `rosa_cards`.
2. `s04-02-dots-diner` A2, restaurant, Segunda 13h, Missouri. Elenco n, r, d. Pedido, torta, a Dot reconhece
   o cartão; duas de três histórias (pratos, Rosie, emprego); lavar ou não os pratos. Enigma 2 (estrela azul
   que zumbe). Define `pie`, `helped_dot`. Pistas `dishes`, `rosie`.
3. `s04-03-the-blue-star` A2, hotel, Segunda 21h, Tulsa. Elenco n, r, w. Quarto 4 (barato, máquina de gelo)
   ou 9; a foto na parede; o telefonema. Enigma 3 (médico de mãos sujas, cidade com nome de cor: Amarillo).
   Define `slept`. Pista `baby_news`.
4. `s04-04-the-doctor-with-dirty-hands` A2, garage, Terça 14h, Amarillo. Elenco n, r, l. Correia arrebentada,
   pronta amanhã ao meio-dia; o motor do Frank foi o primeiro da Lupe; a van vale oito mil; porta-luvas e
   toca-fitas (fita de samba). Enigma 4 (seis cordas, espora enferrujada). Define `radio`. Pistas `rosie`, `key`.
5. `s04-05-six-strings` B1, stage, Quarta 20h, Novo México. Elenco n, r, h. A música do Frank; cantar ou não;
   ele voltou duas semanas depois, feliz, e disse que a resposta ficou no fim da estrada. Enigma 5 (floresta
   de pedra). Define `sang`. Pista `song`.
6. `s04-06-the-stone-forest` B1, park, Quinta 15h, Arizona. Elenco n, r, k. Regras do parque, a van atolada em
   1974, a charada da estrada, o livro de visitas. Enigma 6 (a última chance é uma placa). Define `rock`.
   Pista `logbook`.
7. `s04-07-last-chance` B1, shop, Sexta 13h, Mojave. Elenco n, r, o. Abastecer, o amassado de 1974, o fiado, a
   volta nove dias depois: conseguiu o emprego e disse não. Último enigma (roda que não vai a lugar nenhum, Sal
   vende minhocas). Define `water`, pode redefinir `van_plan`. Pistas `said_no`, `sal`.
8. `s04-08-the-end-of-the-road` B1, beach, Sexta 19h, píer de Santa Monica. Elenco n, r, s, c. Sal é uma mulher
   (gafe leve se perguntar por "he"). Erro constrangedor recuperável: perguntar quanto dinheiro ele deixou
   (`s_money`), consertado com desculpa ou com o Rafa assumindo a culpa. Três perguntas do Frank (van, música,
   por que disse não); a opção certa só aparece para quem tem a pista. Finais: `end_best` (3 de 3, ganham a
   gaita, cena `n_harm`), `end_good` (1 ou 2), `end_basic` (nenhuma; a Sal diz as respostas). Variações: chave
   ou chave de fenda (`clue_key`), fita na van ou na loja (`radio`), fala do Rafa sobre a van (`van_plan`),
   frase do livro de visitas no cartão (`clue_logbook`). Em todos os finais a van fica com eles.

## Cuidados de manutenção
- Não citar "Rosie" antes de a pista ser possível; no ep. 8 a Sal sempre diz as três respostas antes de o Rafa usar o nome.
- Distâncias: "two thousand miles" = "três mil quilômetros" nas traduções; cem milhas = cento e sessenta quilômetros.
- Ep. 2 e ep. 8 estão com 48 nós (teto do guia): para acrescentar um nó, tire outro.
