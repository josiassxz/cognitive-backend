"""Gera MP3 com Kokoro (local, gratuito). Uso: uv run python tts.py jobs.json  (lista de {out, text, voice, speed})"""
import json, subprocess, sys, os, tempfile
import soundfile as sf
from kokoro_onnx import Kokoro
# Vários processos em paralelo: cada um usa poucas threads (TTS_THREADS), senão disputam a CPU.
_threads = int(os.environ.get("TTS_THREADS", "0"))
if _threads:
    import onnxruntime as rt
    _opts = rt.SessionOptions()
    _opts.intra_op_num_threads = _threads
    _opts.inter_op_num_threads = 1
    k = Kokoro.from_session(rt.InferenceSession("models/kokoro-v1.0.onnx", _opts, providers=["CPUExecutionProvider"]), "models/voices-v1.0.bin")
else:
    k = Kokoro("models/kokoro-v1.0.onnx", "models/voices-v1.0.bin")
jobs = json.load(open(sys.argv[1]))
# fatia opcional para rodar em paralelo: tts.py jobs.json <i> <n>
if len(sys.argv) == 4:
    i_, n_ = int(sys.argv[2]), int(sys.argv[3])
    jobs = jobs[i_::n_]
for i, j in enumerate(jobs):
    if os.path.exists(j["out"]) and not j.get("force"): continue
    os.makedirs(os.path.dirname(j["out"]), exist_ok=True)
    lang = "en-gb" if j["voice"].startswith("b") else "en-us"  # mistura: vale a 1ª voz
    voice = j["voice"]
    if "+" in voice:  # mistura de vozes: "am_michael+am_fenrir" ou com pesos "bf_alice*0.65+af_heart*0.35"
        parts, weights = [], []
        for part in voice.split("+"):
            name, _, w = part.partition("*")
            parts.append(k.get_voice_style(name))
            weights.append(float(w) if w else 1.0)
        voice = sum(p * w for p, w in zip(parts, weights)) / sum(weights)
    samples, sr = k.create(j["text"], voice=voice, speed=j.get("speed", 1.0), lang=lang)
    with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as t: sf.write(t.name, samples, sr)
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", t.name, "-af", "dynaudnorm=p=0.7:m=6:g=31,alimiter=limit=0.89", "-ac", "1", "-b:a", "64k", j["out"]], check=True)
    os.unlink(t.name)
    print(f"{i+1}/{len(jobs)} {j['out']}", flush=True)
