"""Transcreve cada MP3 gerado e compara com o texto (detecta palavras trocadas/omitidas pelo TTS).
Rodar com o venv do audio-pipeline: .venv/bin/python ../talk-tts/qa_asr.py ../talk-tts/out/jobs.json"""
import json, re, sys, difflib
import mlx_whisper
MODEL = "mlx-community/whisper-large-v3-turbo"
norm = lambda t: re.sub(r"[^a-z0-9' ]", " ", t.lower().replace("-", " ")).split()
jobs = json.load(open(sys.argv[1]))
bad = []
for i, j in enumerate(jobs):
    path = "../talk-tts/" + j["out"]
    got = mlx_whisper.transcribe(path, path_or_hf_repo=MODEL, language="en")["text"]
    a, b = norm(j["text"]), norm(got)
    r = difflib.SequenceMatcher(None, a, b).ratio()
    if r < 0.85: bad.append({"ratio": round(r, 2), "text": j["text"], "heard": got.strip(), "out": j["out"], "voice": j["voice"]})
print(json.dumps(bad, ensure_ascii=False, indent=1)); print(len(bad), "suspeitos de", len(jobs), file=sys.stderr)
