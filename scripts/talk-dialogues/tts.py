"""Gera MP3 com Kokoro (local, gratuito). Uso: uv run python tts.py jobs.json  (lista de {out, text, voice, speed})"""
import json, subprocess, sys, os, tempfile
import soundfile as sf
from kokoro_onnx import Kokoro
k = Kokoro("models/kokoro-v1.0.onnx", "models/voices-v1.0.bin")
jobs = json.load(open(sys.argv[1]))
for i, j in enumerate(jobs):
    if os.path.exists(j["out"]) and not j.get("force"): continue
    os.makedirs(os.path.dirname(j["out"]), exist_ok=True)
    lang = "en-gb" if j["voice"].startswith("b") else "en-us"
    samples, sr = k.create(j["text"], voice=j["voice"], speed=j.get("speed", 1.0), lang=lang)
    with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as t: sf.write(t.name, samples, sr)
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", t.name, "-ac", "1", "-b:a", "64k", j["out"]], check=True)
    os.unlink(t.name)
    print(f"{i+1}/{len(jobs)} {j['out']}", flush=True)
