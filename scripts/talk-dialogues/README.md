# Diálogos do Talk

Fonte de verdade dos diálogos ramificados (`dialogues/*.json`) e do gerador de voz.
A cópia de trabalho com os modelos fica em `../../../talk-tts` (fora do git: modelos Kokoro ~350 MB).

Formato de nó: `[personagem, texto, tradução, próximo]`. `próximo` = id (fala automática), `null` (fim)
ou lista de opções `[texto, tradução, próximo]`; opção sem sentido = `[texto, tradução, null, reação, reação_pt]`.

Fluxo (em talk-tts):
1. `uv run python gen_dialogues.py` → valida árvores, gera MP3 (Kokoro, local e gratuito) em out/media
   e escreve `cognitive-backend/src/talk/dialogues.data.ts`.
2. QA: `cd audio-pipeline && .venv/bin/python ../talk-tts/qa_asr.py ../talk-tts/out/jobs.json`
   (Whisper transcreve cada áudio e lista os que não batem com o texto).
3. `rsync -a out/media/talk/ tunely-vps:/opt/tunely/media/talk/` e `chown -R 1000:1000` no servidor.
Modelos: github.com/thewh1teagle/kokoro-onnx (release model-files-v1.0).
