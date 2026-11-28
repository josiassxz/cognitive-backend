"""Gera os sons ambientes do Tunely Town (loops estéreo, sem emenda), 100% local e procedural.

Murmúrio de gente = dezenas de frases das vozes Kokoro, sobrepostas, abafadas e com reverb.
O resto (xícaras, espresso, campainha, teclado, trânsito, gaivotas, ondas, violão) é sintetizado.
Saída: out/media/talk/ambience/<lugar>.mp3   Uso: uv run python ambience.py [lugar ...]"""
import os, subprocess, sys, tempfile
import numpy as np
import soundfile as sf
from scipy import signal

SR = 32000
DUR = 48.0  # segundos (o loop)
XF = 3.0    # crossfade da emenda
OUT = "out/media/talk/ambience"
rng = np.random.default_rng(7)
N = int(SR * (DUR + XF))

# ---------- utilidades ----------
def silence():
    return np.zeros((N, 2), dtype=np.float32)

def lp(x, f, order=4):
    return signal.sosfilt(signal.butter(order, f, "low", fs=SR, output="sos"), x, axis=0)

def hp(x, f, order=4):
    return signal.sosfilt(signal.butter(order, f, "high", fs=SR, output="sos"), x, axis=0)

def bp(x, lo, hi, order=3):
    return signal.sosfilt(signal.butter(order, [lo, hi], "band", fs=SR, output="sos"), x, axis=0)

def pan(mono, p):
    """p em [-1, 1]; lei de potência constante."""
    a = (p + 1) * np.pi / 4
    return np.stack([mono * np.cos(a), mono * np.sin(a)], axis=1)

def place(bed, snd, t, p=0.0, gain=1.0):
    i = int(t * SR) % N
    st = pan(snd * gain, p) if snd.ndim == 1 else snd * gain
    n = min(len(st), N - i)
    bed[i:i + n] += st[:n]
    if n < len(st):  # dá a volta: o que passa do fim continua no começo
        rest = st[n:][: N]
        bed[: len(rest)] += rest

def reverb(x, secs=1.2, wet=0.25, damp=3000):
    n = int(SR * secs)
    ir = rng.standard_normal((n, 2)) * np.exp(-np.linspace(0, 7, n))[:, None]
    ir = lp(ir, damp)
    ir /= np.abs(ir).sum(axis=0, keepdims=True) ** 0.5 * 8
    w = np.stack([signal.fftconvolve(x[:, c], ir[:, c])[: len(x)] for c in range(2)], axis=1)
    return x * (1 - wet) + w * wet

def env_exp(n, tau):
    return np.exp(-np.arange(n) / (SR * tau))

def brown(n):
    w = np.cumsum(rng.standard_normal(n))
    w = hp(w, 20, 2)
    return w / (np.abs(w).max() + 1e-9)

def norm(x, peak=1.0):
    return x / (np.abs(x).max() + 1e-9) * peak

def db(v):
    return 10 ** (v / 20)

# ---------- fontes ----------
_BABBLE = None
BABBLE_LINES = [
    "Did you see the game last night?", "I can't believe it's raining again.", "She said she'd call me back.",
    "We should go to the beach on Sunday.", "How much was that?", "Oh, that's lovely, thank you.",
    "No, I think it was on Tuesday.", "My brother's moving to London.", "Honestly, I don't mind either way.",
    "Is this seat taken?", "It's been ages, how are you?", "They've opened a new place by the harbour.",
    "I'll have the same, please.", "Could you pass the sugar?", "He never listens, though.",
    "Right, shall we get going?", "That's exactly what I told her!", "We need more milk.",
    "Oh really? When was that?", "I'm absolutely starving.", "Let's meet at seven.", "Not bad, not bad at all.",
    "The traffic was terrible this morning.", "Are you coming to the festival?", "I love your scarf.",
    "Sorry, I didn't catch that.", "Two more, please.", "It's on me this time.", "What a week!",
    "I think we're lost.", "Shall I order for you?", "Fair enough.", "You're joking!", "Cheers, thanks a lot.",
]
VOICES = ["af_bella", "af_nicole", "af_sarah", "af_sky", "af_river", "am_michael", "am_eric", "am_echo", "am_liam",
          "bf_alice", "bf_lily", "bf_isabella", "bm_daniel", "bm_lewis", "bm_george", "am_onyx", "af_kore"]

def babble_clips():
    global _BABBLE
    if _BABBLE is None:
        from kokoro_onnx import Kokoro
        k = Kokoro("models/kokoro-v1.0.onnx", "models/voices-v1.0.bin")
        clips = []
        for i, t in enumerate(BABBLE_LINES):
            v = VOICES[i % len(VOICES)]
            s, sr = k.create(t, voice=v, speed=float(rng.uniform(0.95, 1.15)), lang="en-gb" if v.startswith("b") else "en-us")
            s = signal.resample_poly(s, SR, sr).astype(np.float32)
            clips.append(norm(s, 0.9))
        _BABBLE = clips
    return _BABBLE

def babble(bed, density, gain, cutoff=2200, voices_spread=0.9):
    """density = falas por segundo (sobrepostas)."""
    clips = babble_clips()
    layer = silence()
    t = 0.0
    while t < DUR + XF:
        c = clips[rng.integers(len(clips))]
        place(layer, c, t, float(rng.uniform(-voices_spread, voices_spread)), float(rng.uniform(0.25, 1.0)))
        t += float(rng.exponential(1 / density))
    layer = lp(layer, cutoff)
    layer = reverb(layer, 1.0, 0.45, 2500)
    bed += norm(layer) * gain

def clink(gain=1.0):
    n = int(SR * 0.5)
    t = np.arange(n) / SR
    f0 = rng.uniform(2200, 3400)
    s = sum(np.sin(2 * np.pi * f0 * r * t + rng.uniform(0, 6)) * a for r, a in [(1, 1), (1.53, 0.6), (2.31, 0.4), (3.07, 0.2)])
    return (s * env_exp(n, 0.07) * gain).astype(np.float32)

def cups(bed, rate, gain):
    t = 0.0
    while t < DUR + XF:
        n = rng.integers(1, 3)
        for j in range(n):
            place(bed, clink(float(rng.uniform(0.3, 1))), t + j * rng.uniform(0.08, 0.2), float(rng.uniform(-0.8, 0.8)), gain)
        t += float(rng.exponential(1 / rate))

def steam(bed, gain, t0):
    n = int(SR * 4)
    s = bp(rng.standard_normal(n), 2500, 7000)
    e = np.minimum(1, np.arange(n) / (SR * 0.4)) * np.minimum(1, (n - np.arange(n)) / (SR * 0.8))
    place(bed, norm(s * e) , t0, -0.6, gain)

def grinder(bed, gain, t0):
    n = int(SR * 3)
    t = np.arange(n) / SR
    s = (signal.sawtooth(2 * np.pi * 95 * t) * 0.5 + bp(rng.standard_normal(n), 400, 3000)) * np.minimum(1, np.minimum(t / 0.2, (3 - t) / 0.3))
    place(bed, norm(lp(s, 3500)), t0, -0.5, gain)

def hum(bed, freq, gain, pan_=0.0):
    t = np.arange(N) / SR
    s = sum(np.sin(2 * np.pi * freq * h * t) / h for h in (1, 2, 3, 4))
    s *= 1 + 0.05 * np.sin(2 * np.pi * 0.13 * t)
    place(bed, norm(s).astype(np.float32), 0, pan_, gain)

def doorbell(gain):
    n = int(SR * 1.6)
    t = np.arange(n) / SR
    a = np.sin(2 * np.pi * 1318 * t) * env_exp(n, 0.5)
    b = np.zeros(n); k = int(SR * 0.35)
    b[k:] = np.sin(2 * np.pi * 1046 * t[: n - k]) * env_exp(n - k, 0.6)
    return ((a + b) * 0.5 * gain).astype(np.float32)

def typing(bed, gain, p=0.4):
    t = 0.0
    while t < DUR + XF:
        burst = rng.integers(8, 40)
        for _ in range(burst):
            n = int(SR * 0.03)
            c = hp(rng.standard_normal(n), 1500) * env_exp(n, 0.004)
            place(bed, c.astype(np.float32), t, p + float(rng.uniform(-0.1, 0.1)), gain * float(rng.uniform(0.5, 1)))
            t += float(rng.uniform(0.07, 0.2))
        t += float(rng.exponential(3))

def phone_ring(gain, uk=True):
    """toque britânico (duplo) ao longe"""
    n = int(SR * 3.0)
    t = np.arange(n) / SR
    tone = (np.sin(2 * np.pi * 400 * t) + np.sin(2 * np.pi * 450 * t)) * 0.5
    gate = ((t % 3.0 < 0.4) | ((t % 3.0 > 0.6) & (t % 3.0 < 1.0))).astype(float)
    return lp(tone * gate * gain, 2500).astype(np.float32)

def traffic(bed, gain, cars_per_min=10):
    place(bed, norm(lp(brown(N), 300)).astype(np.float32), 0, 0, gain * 0.6)
    t = 0.0
    while t < DUR + XF:
        d = float(rng.uniform(3, 6))
        n = int(SR * d)
        x = np.linspace(-1, 1, n)
        e = np.exp(-(x * 2.2) ** 2)
        s = lp(rng.standard_normal(n), float(rng.uniform(500, 1200))) * e
        direction = rng.choice([-1, 1])
        st = np.stack([s * np.cos((direction * x + 1) * np.pi / 4), s * np.sin((direction * x + 1) * np.pi / 4)], axis=1)
        place(bed, norm(st).astype(np.float32), t, 0, gain * float(rng.uniform(0.4, 1)))
        t += float(rng.exponential(60 / cars_per_min))

def footsteps(bed, gain):
    t = 0.0
    while t < DUR + XF:
        steps = rng.integers(4, 12)
        p = float(rng.uniform(-0.8, 0.8))
        for _ in range(steps):
            n = int(SR * 0.06)
            c = bp(rng.standard_normal(n), 200, 2000) * env_exp(n, 0.012)
            place(bed, c.astype(np.float32), t, p, gain * float(rng.uniform(0.5, 1)))
            t += float(rng.uniform(0.45, 0.6))
        t += float(rng.exponential(4))

def gull(gain):
    n = int(SR * rng.uniform(0.5, 0.9))
    t = np.arange(n) / SR
    f = 1500 - 700 * (t / t[-1]) ** 0.7 + 40 * np.sin(2 * np.pi * 28 * t)
    ph = 2 * np.pi * np.cumsum(f) / SR
    s = sum(np.sin(ph * h) / h ** 1.3 for h in (1, 2, 3, 4, 5))
    e = np.minimum(1, t / 0.05) * env_exp(n, t[-1] / 2.5)
    return (bp(s * e, 600, 6000) * gain).astype(np.float32)

def gulls(bed, rate, gain):
    t = 2.0
    while t < DUR + XF:
        p = float(rng.uniform(-0.9, 0.9))
        for j in range(rng.integers(1, 4)):
            place(bed, gull(1.0), t + j * 0.55, p, gain * float(rng.uniform(0.4, 1)))
        t += float(rng.exponential(1 / rate))

def waves(bed, gain):
    t = np.arange(N) / SR
    sw = 0.55 + 0.45 * np.sin(2 * np.pi * t / 7.3) ** 2
    s = lp(rng.standard_normal(N), 900) * sw
    s2 = lp(rng.standard_normal(N), 700) * (0.55 + 0.45 * np.sin(2 * np.pi * t / 9.1 + 1) ** 2)
    bed += np.stack([norm(s), norm(s2)], axis=1).astype(np.float32) * gain

def birds(bed, rate, gain):
    t = 0.0
    while t < DUR + XF:
        p = float(rng.uniform(-1, 1))
        for _ in range(rng.integers(2, 6)):
            n = int(SR * rng.uniform(0.05, 0.12))
            tt = np.arange(n) / SR
            f0 = rng.uniform(3000, 5500)
            f = f0 + rng.uniform(-1500, 1500) * tt / tt[-1]
            s = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.sin(np.pi * tt / tt[-1])
            place(bed, s.astype(np.float32), t, p, gain)
            t += float(rng.uniform(0.08, 0.2))
        t += float(rng.exponential(1 / rate))

def pluck(freq, dur, damp=0.996):
    """Karplus-Strong (corda dedilhada)."""
    n = int(SR * dur)
    p = int(SR / freq)
    out = np.zeros(n + p)
    out[:p] = lp(rng.uniform(-1, 1, p), 4000, 1) * 0.6
    for i in range(p, n + p - 1):
        out[i] = damp * 0.5 * (out[i - p] + out[i - p + 1])
    o = lp(out[:n], 3200, 2)
    a = int(SR * 0.006)
    o[:a] *= np.linspace(0, 1, a)
    return o.astype(np.float32)

NOTE = {"E2": 82.41, "A2": 110.0, "B2": 123.47, "C3": 130.81, "D3": 146.83, "E3": 164.81, "F#3": 185.0, "G2": 98.0,
        "G3": 196.0, "A3": 220.0, "B3": 246.94, "C4": 261.63, "D4": 293.66, "E4": 329.63, "F#4": 369.99, "G4": 392.0}
CHORDS = [("G2", "D3", "G3", "B3", "D4", "G4"), ("D3", "A3", "D4", "F#4"), ("E2", "B2", "E3", "G3", "B3", "E4"), ("C3", "E3", "G3", "C4", "E4")]

def guitar(bed, gain, p, tempo=96):
    beat = 60 / tempo
    cache = {}
    t, ci = 0.0, 0
    while t < DUR + XF:
        chord = CHORDS[ci % 4]
        pattern = [0, 2, 1, 3, 2, 4, 3, 5]
        for k, idx in enumerate(pattern):
            note = chord[idx % len(chord)]
            if note not in cache:
                cache[note] = pluck(NOTE[note], 2.4)
            place(bed, cache[note], t + k * beat / 2, p, gain * (1.0 if k == 0 else 0.7))
        t += beat * 4
        ci += 1

def radio(bed, gain):
    clips = babble_clips()
    t = 4.0
    while t < DUR + XF:
        c = clips[rng.integers(len(clips))]
        s = bp(c, 500, 2800)
        s = np.tanh(s * 3) * 0.5
        sq = hp(rng.standard_normal(int(SR * 0.12)), 2000) * 0.3
        clip = np.concatenate([sq, s, sq]).astype(np.float32)
        place(bed, clip, t, 0.7, gain)
        t += float(rng.uniform(8, 16))

def crowd_cheer(gain):
    n = int(SR * 3)
    t = np.arange(n) / SR
    s = bp(rng.standard_normal(n), 300, 4000) * np.minimum(1, t / 0.3) * env_exp(n, 1.2)
    return (s * gain).astype(np.float32)

# ---------- cenas ----------
def scene_cafe(b):
    babble(b, 1.6, db(-22))
    cups(b, 0.35, db(-30))
    for t0 in (6, 27): steam(b, db(-32), t0)
    grinder(b, db(-34), 17)
    hum(b, 55, db(-40), -0.5)

def scene_street(b):
    traffic(b, db(-24), 8)
    footsteps(b, db(-32))
    gulls(b, 0.12, db(-30))
    birds(b, 0.15, db(-36))
    babble(b, 0.25, db(-34), 1800)

def scene_shop(b):
    hum(b, 50, db(-42), 0.6)   # geladeira
    place(b, doorbell(1.0), 3.0, -0.2, db(-26))
    place(b, doorbell(1.0), 31.0, -0.2, db(-27))
    babble(b, 0.3, db(-32), 2000)
    traffic(b, db(-40), 4)
    footsteps(b, db(-36))

def scene_office(b):
    typing(b, db(-30), 0.5)
    typing(b, db(-34), -0.6)
    hum(b, 60, db(-42))
    place(b, phone_ring(1.0), 14.0, -0.7, db(-36))
    babble(b, 0.4, db(-32), 1800)
    place(b, lp(brown(N), 200).astype(np.float32), 0, 0, db(-38))  # ar-condicionado

def scene_police(b):
    hum(b, 50, db(-40))
    radio(b, db(-30))
    place(b, phone_ring(1.0), 22.0, 0.6, db(-34))
    typing(b, db(-36), -0.4)
    babble(b, 0.25, db(-34), 1600)

def scene_market(b):
    babble(b, 1.2, db(-23), 2600)
    guitar(b, db(-24), 0.55, 92)
    gulls(b, 0.1, db(-32))
    footsteps(b, db(-32))

def scene_pub(b):
    babble(b, 2.6, db(-19), 2400)
    cups(b, 0.5, db(-28))
    hum(b, 50, db(-42))

def scene_festival(b):
    babble(b, 2.2, db(-21), 2600)
    guitar(b, db(-22), -0.3, 104)
    waves(b, db(-30))
    gulls(b, 0.15, db(-30))
    for t0 in (12, 38): place(b, crowd_cheer(1.0), t0, 0.2, db(-30))

# ---------- mais fontes (lugares das outras histórias) ----------
def wind(bed, gain, cutoff=500):
    t = np.arange(N) / SR
    sw = 0.5 + 0.5 * np.sin(2 * np.pi * t / 11.0) ** 2
    a = lp(rng.standard_normal(N), cutoff) * sw
    b = lp(rng.standard_normal(N), cutoff * 0.8) * (0.5 + 0.5 * np.sin(2 * np.pi * t / 13.7 + 2) ** 2)
    bed += np.stack([norm(a), norm(b)], axis=1).astype(np.float32) * gain

def chime(gain, notes=(659.25, 523.25, 783.99)):
    """aviso de alto-falante (aeroporto/estação)"""
    out = np.zeros(int(SR * 2.4))
    for i, f in enumerate(notes):
        n = int(SR * 1.2)
        t = np.arange(n) / SR
        tone = (np.sin(2 * np.pi * f * t) + 0.3 * np.sin(2 * np.pi * f * 2 * t)) * env_exp(n, 0.45)
        k = int(SR * 0.42 * i)
        out[k:k + n] += tone[: len(out) - k]
    return (out * 0.4 * gain).astype(np.float32)

def announcement(bed, gain, t0, p=0.0):
    """voz de alto-falante abafada e com eco (ininteligível de propósito)"""
    clips = babble_clips()
    c = np.concatenate([clips[rng.integers(len(clips))], np.zeros(int(SR * 0.2)), clips[rng.integers(len(clips))]])
    c = bp(c, 400, 2400)
    st = reverb(pan(c.astype(np.float32), p), 2.2, 0.6, 2000)
    place(bed, chime(1.0), t0, p, gain)
    place(bed, norm(st).astype(np.float32), t0 + 1.8, 0, gain)

def rumble(bed, gain, freq=120):
    """motor/trilho: grave contínuo com leve variação"""
    t = np.arange(N) / SR
    s = lp(brown(N), freq * 2.5) * (1 + 0.15 * np.sin(2 * np.pi * 0.21 * t))
    place(bed, norm(s).astype(np.float32), 0, 0, gain)

def clack(bed, gain, period=0.72):
    """junta de trilho: tu-tum, tu-tum"""
    t = 0.0
    while t < DUR + XF:
        for off in (0.0, 0.11):
            n = int(SR * 0.05)
            c = bp(rng.standard_normal(n), 80, 900) * env_exp(n, 0.012)
            place(bed, c.astype(np.float32), t + off, float(rng.uniform(-0.3, 0.3)), gain)
        t += period

def sizzle(bed, gain, t0, dur=6.0, p=0.3):
    n = int(SR * dur)
    t = np.arange(n) / SR
    s = hp(rng.standard_normal(n), 3500) * (0.6 + 0.4 * rng.random(n)) * np.minimum(1, np.minimum(t / 0.5, (dur - t) / 1.5))
    place(bed, norm(s).astype(np.float32), t0, p, gain)

def chop(bed, gain, t0, p=-0.3):
    for i in range(int(rng.integers(6, 14))):
        n = int(SR * 0.04)
        c = bp(rng.standard_normal(n), 300, 2500) * env_exp(n, 0.008)
        place(bed, c.astype(np.float32), t0 + i * 0.19, p, gain * float(rng.uniform(0.6, 1)))

def clock(bed, gain):
    t = 0.0
    k = 0
    while t < DUR + XF:
        n = int(SR * 0.012)
        c = hp(rng.standard_normal(n), 2500) * env_exp(n, 0.002)
        place(bed, c.astype(np.float32), t, 0.5, gain * (1.0 if k % 2 == 0 else 0.7))
        t += 1.0
        k += 1

def beep(gain, f=880, dur=0.12):
    n = int(SR * dur)
    t = np.arange(n) / SR
    return (np.sin(2 * np.pi * f * t) * np.minimum(1, np.minimum(t / 0.01, (dur - t) / 0.02)) * gain).astype(np.float32)

def kids(bed, rate, gain):
    """crianças brincando ao longe: vozes aceleradas e abafadas"""
    clips = babble_clips()
    layer = silence()
    t = 1.0
    while t < DUR + XF:
        c = clips[rng.integers(len(clips))]
        c = signal.resample(c, int(len(c) / 1.45)).astype(np.float32)
        place(layer, c, t, float(rng.uniform(-0.9, 0.9)), float(rng.uniform(0.4, 1)))
        t += float(rng.exponential(1 / rate))
    bed += norm(reverb(lp(layer, 3000), 1.6, 0.5, 2500)) * gain

def thump(bed, gain, tempo=124):
    """música ao longe: só o grave marcando"""
    beat = 60 / tempo
    n = int(SR * 0.18)
    t = np.arange(n) / SR
    k = (np.sin(2 * np.pi * (55 + 60 * np.exp(-t * 30)) * t) * env_exp(n, 0.05)).astype(np.float32)
    x = 0.0
    while x < DUR + XF:
        place(bed, k, x, 0, gain)
        x += beat

# ---------- cenas novas ----------
def scene_airport(b):
    babble(b, 1.8, db(-24), 2000)
    for t0 in (5, 29): announcement(b, db(-27), t0, 0.0)
    footsteps(b, db(-30))
    rumble(b, db(-40), 90)
    hum(b, 60, db(-44))

def scene_station(b):
    babble(b, 1.2, db(-25), 2200)
    announcement(b, db(-27), 9, -0.3)
    rumble(b, db(-36), 70)
    footsteps(b, db(-29))
    for t0 in (24, 25.2): place(b, beep(1.0, 1200), t0, 0.5, db(-32))

def scene_train(b):
    rumble(b, db(-24), 110)
    clack(b, db(-28))
    wind(b, db(-38), 1500)
    babble(b, 0.3, db(-34), 1500)
    place(b, chime(1.0, (784.0, 659.25)), 20, 0.0, db(-34))

def scene_restaurant(b):
    babble(b, 2.0, db(-22), 2300)
    cups(b, 0.6, db(-29))
    guitar(b, db(-34), -0.5, 84)
    hum(b, 50, db(-44))

def scene_hotel(b):
    babble(b, 0.5, db(-30), 1800)
    place(b, lp(brown(N), 220).astype(np.float32), 0, 0, db(-36))
    guitar(b, db(-36), 0.4, 72)
    footsteps(b, db(-34))
    place(b, doorbell(1.0), 16.0, 0.6, db(-34))
    place(b, phone_ring(1.0), 33.0, -0.6, db(-38))

def scene_park(b):
    birds(b, 0.5, db(-28))
    wind(b, db(-34), 700)
    kids(b, 0.25, db(-33))
    footsteps(b, db(-34))
    traffic(b, db(-42), 3)

def scene_beach(b):
    waves(b, db(-22))
    gulls(b, 0.14, db(-29))
    wind(b, db(-34), 900)
    kids(b, 0.15, db(-35))

def scene_home(b):
    clock(b, db(-36))
    hum(b, 50, db(-44), -0.4)
    traffic(b, db(-42), 3)
    birds(b, 0.08, db(-40))
    place(b, lp(brown(N), 180).astype(np.float32), 0, 0, db(-40))

def scene_car(b):
    rumble(b, db(-23), 140)
    wind(b, db(-30), 1800)
    traffic(b, db(-34), 5)
    for t0 in (13, 13.45, 13.9, 14.35): place(b, beep(1.0, 660, 0.06), t0, -0.4, db(-34))  # seta

def scene_clinic(b):
    hum(b, 60, db(-42))
    place(b, lp(brown(N), 250).astype(np.float32), 0, 0, db(-38))
    babble(b, 0.3, db(-33), 1700)
    footsteps(b, db(-33))
    place(b, phone_ring(1.0), 18.0, 0.6, db(-36))
    for t0 in (8, 30): place(b, beep(1.0, 988, 0.15), t0, -0.5, db(-36))

def scene_campus(b):
    babble(b, 1.3, db(-25), 2500)
    footsteps(b, db(-29))
    birds(b, 0.2, db(-34))
    wind(b, db(-40), 700)
    kids(b, 0.1, db(-38))

def scene_party(b):
    babble(b, 2.8, db(-20), 2600)
    thump(b, db(-27), 118)
    cups(b, 0.7, db(-28))
    for t0 in (15, 36): place(b, crowd_cheer(1.0), t0, -0.2, db(-30))

def scene_nature(b):
    wind(b, db(-24), 600)
    birds(b, 0.3, db(-30))
    waves(b, db(-34))
    gulls(b, 0.05, db(-36))

def scene_kitchen(b):
    for t0 in (3, 22, 36): sizzle(b, db(-27), t0, float(rng.uniform(5, 9)), float(rng.uniform(-0.5, 0.5)))
    for t0 in (10, 18, 31, 42): chop(b, db(-28), t0, float(rng.uniform(-0.6, 0.6)))
    cups(b, 0.35, db(-28))
    hum(b, 50, db(-38), 0.5)
    babble(b, 0.5, db(-31), 2000)
    place(b, beep(1.0, 1319, 0.5), 28, 0.6, db(-33))

def scene_gym(b):
    thump(b, db(-27), 128)
    babble(b, 0.5, db(-31), 2200)
    cups(b, 0.2, db(-32))  # metal dos pesos
    hum(b, 60, db(-42))
    footsteps(b, db(-30))

def scene_studio(b):
    hum(b, 60, db(-40))
    place(b, lp(brown(N), 200).astype(np.float32), 0, 0, db(-38))
    babble(b, 0.6, db(-31), 1900)
    footsteps(b, db(-33))
    radio(b, db(-34))
    for t0 in (20,): place(b, crowd_cheer(1.0), t0, 0.0, db(-33))

SCENES = {k[6:]: v for k, v in globals().items() if k.startswith("scene_")}

def render(name):
    b = silence()
    SCENES[name](b)
    # emenda sem corte: o final (XF) entra suave sobre o começo
    xf = int(SR * XF)
    L = int(SR * DUR)
    head, tail = b[:xf].copy(), b[L:L + xf]
    ramp = np.linspace(0, 1, xf)[:, None]
    b[:xf] = head * ramp + tail * (1 - ramp)
    b = b[:L]
    # mesmo volume médio para todos os lugares (-26 dB), com os picos contidos
    rms = float(np.sqrt((b ** 2).mean())) + 1e-9
    b = np.tanh(b * (0.05 / rms) / 0.7) * 0.7
    os.makedirs(OUT, exist_ok=True)
    with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as t:
        sf.write(t.name, b, SR)
    out = f"{OUT}/{name}.mp3"
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", t.name, "-ac", "2", "-b:a", "96k", out], check=True)
    os.unlink(t.name)
    print(out, os.path.getsize(out) // 1024, "KB", flush=True)

if __name__ == "__main__":
    for name in sys.argv[1:] or SCENES:
        render(name)
