# Revisão final de uma temporada (leitura de ponta a ponta)

Você é o revisor final de UMA temporada de um áudio-drama interativo para brasileiros aprendendo inglês.
O roteirista já entregou tudo validado, mas NÃO fez a releitura completa. Seu trabalho é ler os 8 episódios
do início ao fim, como o aluno vai ouvir, e corrigir o que encontrar, sem reescrever a história.

Leia antes: `town/WRITERS_GUIDE.md` (regras) e o `BIBLE.md` da temporada (a verdade, personagens, flags, pistas).

## O que procurar e corrigir (edite os `epNN.json` e o `season.json` diretamente)
1. **Inglês**: cada fala soa como um falante nativo de verdade, no nível do episódio? Corrija erros, frases
   traduzidas do português, registro errado, britânico x americano incoerente com o personagem, repetições.
   Falas com mais de ~20 palavras: encurte ou divida em dois nós (mantendo a estrutura válida).
2. **Voz sintética**: sem "...", sem palavras em MAIÚSCULAS, sem siglas difíceis, números por extenso, sem "Er,".
   Nomes ou palavras estrangeiras que um TTS inglês erraria: troque por algo seguro quando não fizer falta.
3. **Aluno sem gênero**: nenhuma fala trata o aluno por sir/madam/he/she/guy/girl/lady; nas traduções em
   português, nada que marque gênero do aluno (obrigado/obrigada, sozinho, cansado, bem-vindo…): reescreva.
4. **Traduções**: português do Brasil natural e fiel ao sentido; sem travessões.
5. **Perguntas**: toda pergunta tem 2–3 opções válidas realmente diferentes + exatamente 1 sem sentido com reação
   que repete a pergunta de outro jeito. A opção sem sentido tem graça e é plausível para quem ouviu errado?
   As opções válidas respondem de verdade ao que foi perguntado? A fala seguinte faz sentido para CADA opção
   que leva a ela (cuidado com opções diferentes que caem no mesmo nó e recebem uma resposta que só serve a uma)?
6. **Continuidade**: siga os caminhos principais de cada episódio. Algum personagem responde algo que não
   combina com o caminho? Alguma memória (flag) é citada sem ter acontecido naquele caminho? As pistas são
   de fato DITAS na fala marcada com `clue`, e o texto da pista em `season.json` corresponde ao que foi dito?
   Os finais do ep. 8 fecham com as pistas e não contradizem episódios anteriores?
7. **`memories`** em `season.json`: frases corretas, sem spoiler do final, sem gênero.
8. **Intros e descrições** (pt-BR): recapitulam sem entregar a verdade da temporada.

## Regras
- Mudanças cirúrgicas: preserve ids de nós, flags, pistas e a estrutura, a menos que haja erro real.
- Depois de editar, valide SEMPRE com `--no-audio`:
  `cd /Users/josiassiqueira/Documents/projetos-josias/talk-tts && uv run python gen_dialogues.py --no-audio --only town --season <id>`
- Não toque em nada fora de `town/<id>/`. Não gere áudio.

## Relatório final (curto)
Quantas falas alterou por episódio, os 5 problemas mais importantes que corrigiu (com antes → depois), e o que
ainda considera fraco mas preferiu não mexer.
