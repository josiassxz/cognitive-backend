# Talk: situações avulsas e Tunely Town

Fonte de verdade dos roteiros e do gerador de voz/ambiente. A cópia de trabalho com os modelos fica em
`../../../talk-tts` (fora do git: modelos Kokoro ~350 MB).

- `dialogues/*.json` → situações avulsas (`src/talk/dialogues.data.ts`)
- `town/season.json` + `town/ep*.json` → temporada contínua (`src/talk/town.data.ts`); a bíblia da
  história (personagens, verdade do mistério, flags e pistas de cada episódio) está em `town/BIBLE.md`.

## Formato de nó
- fala: `[personagem, texto, tradução, próximo]`; `próximo` = id, `null` (fim) ou lista de opções
- fala com meta: `[..., {"clue": "coins"}]` (revela pista) ou `{"set": {"flag": "valor"}}`
- desvio pela memória (sem fala): `{"branch": [["drink=tea", "id"], ["!flag", "id"], [null, "padrão"]]}`
- opção válida: `[texto, tradução, próximo]` ou `[texto, tradução, próximo, {"set": {...}}]`
- opção sem sentido: `[texto, tradução, null, reação, reação_pt]`

A memória do aluno não tem tabela própria: é derivada da última tentativa de cada episódio
(`TalkAttempt.details.flags`), e as pistas são a união de todas as tentativas (`details.clues`).

## Fluxo (em talk-tts)
1. `uv run python gen_dialogues.py` → valida árvores, flags e pistas, gera os MP3 (Kokoro, local e
   gratuito; as falas do aluno saem em duas vozes) e escreve os dois arquivos de dados do backend.
   `--no-audio` só valida; `--only town|dialogues` restringe.
2. `uv run python ambience.py` → sons ambientes procedurais (loops estéreo) em `out/media/talk/ambience`.
3. QA: `cd audio-pipeline && .venv/bin/python ../talk-tts/qa_asr.py ../talk-tts/out/jobs.json`
   (Whisper transcreve cada áudio e lista os que não batem com o texto).
4. `rsync -a out/media/talk/ tunely-vps:/opt/tunely/media/talk/` e `chown -R 1000:1000` no servidor.

Modelos: github.com/thewh1teagle/kokoro-onnx (release model-files-v1.0).
