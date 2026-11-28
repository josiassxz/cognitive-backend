"""Valida os diálogos e a temporada do Tunely Town, gera os MP3 com Kokoro e escreve os dados do backend.

  dialogues/*.json  → cognitive-backend/src/talk/dialogues.data.ts  (situações avulsas)
  town/season.json + town/ep*.json → cognitive-backend/src/talk/town.data.ts (temporada contínua)

Formato de nó (lista):
  [speaker, text, pt, next]                 fala; next = id | null (fim) | [opções]
  [speaker, text, pt, next, {meta}]         meta: {"clue": id, "set": {flag: valor}}
  {"branch": [[cond, id], ..., [null, id]]} desvio pela memória (sem fala); cond = "flag" | "!flag" | "flag=valor"
Opção válida: [text, pt, next] ou [text, pt, next, {"set": {...}}]
Opção sem sentido: [text, pt, null, reactText, reactPt]

Uso: uv run python gen_dialogues.py [--no-audio] [--only town|dialogues]"""
import glob, hashlib, json, re, subprocess, sys

# Vozes do aluno: misturas (média dos estilos) das vozes mais naturais do Kokoro.
YOU_VOICES = {"m": "am_eric+am_michael", "f": "af_heart+af_bella"}
NARRATOR = "bf_emma"
# Voz que o Kokoro realmente usa para cada voz do roteiro. Algumas vozes do Kokoro soam robóticas
# (melodia achatada, sussurradas ou de qualidade baixa); misturá-las com uma voz de alta qualidade
# deixa a fala natural sem perder a identidade do personagem. O narrador (bf_emma) era a mais "reta".
TTS_VOICE = {
    "bf_emma": "bf_emma+af_heart",                  # narrador
    "bf_isabella": "bf_isabella*0.65+af_heart*0.35",
    "bf_alice": "bf_alice*0.65+af_heart*0.35",
    "bf_lily": "bf_lily*0.65+af_heart*0.35",
    "af_river": "af_river*0.6+af_heart*0.4",
    "af_nicole": "af_nicole*0.6+af_heart*0.4",
    "af_jessica": "af_jessica*0.65+af_heart*0.35",
    "am_onyx": "am_onyx*0.6+am_michael*0.4",
    "bm_lewis": "bm_lewis*0.6+bm_fable*0.4",
    "bm_daniel": "bm_daniel*0.65+bm_fable*0.35",
}
AMBIENCES = {"cafe", "street", "shop", "office", "police", "market", "pub", "festival", "airport", "station", "train",
             "restaurant", "hotel", "park", "beach", "home", "car", "clinic", "campus", "party", "nature", "kitchen", "gym", "studio"}
PLACE_ICONS = {"cafe", "street", "shop", "office", "police", "market", "pub", "festival", "airport", "station", "train",
               "restaurant", "hotel", "park", "beach", "home", "car", "clinic", "campus", "party", "nature", "kitchen",
               "gym", "studio", "phone", "bank", "museum", "boat", "stage", "court", "garage", "farm", "library"}
OUT_MEDIA = "out/media"
TS_DIALOGUES = "../cognitive-backend/src/talk/dialogues.data.ts"
TS_TOWN = "../cognitive-backend/src/talk/town.data.ts"
NUDGES = [("Take your time.", "Pode pensar com calma."), ("Sorry, did you hear me?", "Desculpe, você me ouviu?")]
COND = re.compile(r"^!?[a-z0-9_]+(=[a-z0-9_]+)?$")

jobs, errors = [], []


def key(prefix, voice, text):
    h = hashlib.sha1(f"{voice}|{text}".encode()).hexdigest()[:12]
    return f"talk/{prefix}/{h}.mp3"


ACRONYMS = {"TV", "ID", "HR", "OK", "UK", "US", "USA", "DJ", "PM", "AM", "ATM", "PIN", "SIM", "CV", "GP", "A", "I"}


def tts_text(text):
    # Kokoro faz pausa estranha em reticências. Palavras em MAIÚSCULAS (ênfase no texto: "I'M Emma's
    # brother") seriam soletradas: vão em minúsculas para a voz, o texto na tela continua igual.
    def fix(m):
        w = m.group(0)
        if w in ACRONYMS:
            return w
        return "I'" + w[2:].lower() if w.startswith("I'") else w.lower()
    text = re.sub(r"\bEr\b", "Uh", text)  # "Er, enjoy" virava "Errin Joy"
    return re.sub(r"\b[A-Z][A-Z']+\b", fix, text.replace("...", ","))


FIXES = json.load(open("tts_fixes.json"))


def build(d, prefix, known_flags=None, clues=None):
    """Converte um diálogo do JSON para o formato servido pela API. known_flags: flags já definidas
    em episódios anteriores (temporada); clues: pistas válidas da temporada."""
    slug, cast, nodes = d["slug"], d["cast"], d["nodes"]
    known_flags = set(known_flags or ())
    set_here, used_here = set(), set()

    def line(voice, text):
        voice = TTS_VOICE.get(voice, voice)
        k = key(prefix, voice, text)
        fix = FIXES.get(text, {})
        say = fix.get("say") or tts_text(text)
        job = {"out": f"{OUT_MEDIA}/{k}", "text": say, "voice": voice}
        if "speed" in fix:
            job["speed"] = fix["speed"]
        if "--force-fixes" in sys.argv and (text in FIXES or re.search(r"\bEr\b", text)):
            job["force"] = True
        jobs.append(job)
        return k

    def you(text):
        return {"audio": line(YOU_VOICES["m"], text), "audioF": line(YOU_VOICES["f"], text)}

    def check_set(where, s):
        if not isinstance(s, dict):
            errors.append(f"{slug}/{where}: set inválido")
            return
        for f, v in s.items():
            if not re.match(r"^[a-z0-9_]+$", f) or not re.match(r"^[a-z0-9_]+$", str(v)):
                errors.append(f"{slug}/{where}: flag inválida {f}={v}")
            set_here.add(f)

    out = {}
    for nid, n in nodes.items():
        if isinstance(n, dict):
            br = n.get("branch")
            if not br or br[-1][0] is not None:
                errors.append(f"{slug}/{nid}: branch precisa terminar com [null, id]")
                continue
            for cond, nxt in br:
                if cond is not None:
                    if not COND.match(cond):
                        errors.append(f"{slug}/{nid}: condição inválida {cond}")
                    used_here.add(cond.lstrip("!").split("=")[0])
                if nxt not in nodes:
                    errors.append(f"{slug}/{nid}: branch → {nxt} não existe")
            out[nid] = {"branch": [{"if": c, "next": x} for c, x in br]}
            continue
        if len(n) not in (4, 5):
            errors.append(f"{slug}/{nid}: nó com {len(n)} campos")
            continue
        sp, text, pt, nxt = n[:4]
        meta = n[4] if len(n) == 5 else {}
        if sp not in cast:
            errors.append(f"{slug}/{nid}: speaker {sp}")
            continue
        voice = cast[sp][2]
        node = {"speaker": sp, "text": text, "pt": pt, "audio": line(voice, text)}
        if meta.get("clue"):
            if clues is None or meta["clue"] not in clues:
                errors.append(f"{slug}/{nid}: pista desconhecida {meta['clue']}")
            node["clue"] = meta["clue"]
            set_here.add("clue_" + meta["clue"])
        if meta.get("set"):
            check_set(nid, meta["set"])
            node["set"] = meta["set"]
        if isinstance(nxt, list):
            opts, valid, wrong = [], 0, 0
            for i, o in enumerate(nxt):
                opt = {"text": o[0], "pt": o[1], **you(o[0]), "next": o[2]}
                if o[2] is None:
                    wrong += 1
                    if len(o) < 5:
                        errors.append(f"{slug}/{nid}: opção sem sentido sem reação")
                        continue
                    opt["react"] = {"text": o[3], "pt": o[4], "audio": line(voice, o[3])}
                else:
                    valid += 1
                    if o[2] not in nodes:
                        errors.append(f"{slug}/{nid}: next {o[2]}")
                    if len(o) == 4:
                        check_set(f"{nid}#{i}", o[3].get("set", {}))
                        opt["set"] = o[3].get("set", {})
                opts.append(opt)
            if not valid or not wrong:
                errors.append(f"{slug}/{nid}: valid={valid} wrong={wrong}")
            node["options"] = opts
        elif nxt is None:
            node["end"] = True
        else:
            if nxt not in nodes:
                errors.append(f"{slug}/{nid}: next {nxt}")
            node["next"] = nxt
        out[nid] = node

    # flags lidas precisam existir antes (episódio anterior ou este)
    for f in used_here - set_here - known_flags:
        errors.append(f"{slug}: condição usa flag '{f}' que nunca foi definida antes")

    # alcance, ciclos e decisões por caminho
    start = d["start"]
    seen = set()

    def walk(nid, stack):
        if nid not in out:
            return (0, 0)
        if nid in stack:
            errors.append(f"{slug}: ciclo em {nid}")
            return (0, 0)
        seen.add(nid)
        n = out[nid]
        if n.get("end"):
            return (0, 0)
        if "branch" in n:
            nexts, add = [b["next"] for b in n["branch"]], 0
        elif "options" in n:
            nexts, add = [o["next"] for o in n["options"] if o["next"]], 1
        else:
            nexts, add = [n["next"]], 0
        r = [walk(x, stack | {nid}) for x in nexts]
        return (min(a for a, _ in r) + add, max(b for _, b in r) + add)

    lo, hi = walk(start, frozenset())
    for nid in nodes:
        if nid not in seen:
            errors.append(f"{slug}: {nid} inalcançável")

    nudges = {}
    for k, c in cast.items():
        if k == "n":
            continue
        nudges[k] = [{"text": t, "pt": p, "audio": line(c[2], t)} for t, p in NUDGES]

    res = {
        "slug": slug, "title": d["title"], "level": d["level"], "description": d["description"], "intro": d["intro"],
        "cast": {k: {"name": v[0], "role": v[1], **({"side": v[3]} if len(v) > 3 else {})} for k, v in cast.items()},
        "start": start, "decisions": [lo, hi], "nodes": out, "nudges": nudges,
    }
    for extra in ("ambience", "place", "placeLabel", "time", "episode"):
        if extra in d:
            res[extra] = d[extra]
    print(f"{slug}: {len(nodes)} nós, decisões {lo}-{hi}")
    return res, set_here


def write_ts(path, header, typename, const, value):
    with open(path, "w") as fh:
        fh.write(f"// GERADO por talk-tts/gen_dialogues.py. Não editar à mão.\n{header}\n\n")
        fh.write(f"export const {const}: {typename} = " + json.dumps(value, ensure_ascii=False, indent=1) + ";\n")


only = sys.argv[sys.argv.index("--only") + 1] if "--only" in sys.argv else None

if only in (None, "dialogues"):
    defs = []
    for f in sorted(glob.glob("dialogues/*.json")):
        for d in json.load(open(f)):
            defs.append(build(d, f"dialogues/{d['slug']}")[0])
    if not errors:
        write_ts(TS_DIALOGUES, "import type { TalkDialogueDef } from './types';", "TalkDialogueDef[]", "TALK_DIALOGUES", defs)
        print(f"{len(defs)} diálogos avulsos")

if only in (None, "town"):
    # cada temporada em town/sNN/: season.json + epNN.json (+ BIBLE.md)
    only_season = sys.argv[sys.argv.index("--season") + 1] if "--season" in sys.argv else None
    seasons = []
    for sf in sorted(glob.glob("town/s*/season.json")):
        sid = sf.split("/")[1]
        if only_season and sid != only_season:
            continue
        season = json.load(open(sf))
        clues = season["clues"]
        for cond in season.get("memories", {}):
            if not COND.match(cond):
                errors.append(f"{sid}: memories com condição inválida '{cond}'")
        for need in ("season", "title", "subtitle", "level", "genre", "memories"):
            if need not in season:
                errors.append(f"{sid}: season.json sem '{need}'")
        flags, eps, slugs = set(), [], set()
        for f in sorted(glob.glob(f"town/{sid}/ep*.json")):
            d = json.load(open(f))
            where = f"{sid}/{d.get('slug')}"
            if sid != "s01" and not str(d.get("slug", "")).startswith(sid + "-"):
                errors.append(f"{where}: slug precisa começar com '{sid}-'")
            if d.get("slug") in slugs:
                errors.append(f"{where}: slug repetido")
            slugs.add(d.get("slug"))
            if d.get("ambience") not in AMBIENCES:
                errors.append(f"{where}: ambience '{d.get('ambience')}' não existe (use: {sorted(AMBIENCES)})")
            if d.get("place") not in PLACE_ICONS:
                errors.append(f"{where}: place '{d.get('place')}' não existe (use: {sorted(PLACE_ICONS)})")
            if sid != "s01" and not d.get("placeLabel"):
                errors.append(f"{where}: falta placeLabel")
            if "n" in d["cast"] and d["cast"]["n"][2] != NARRATOR:
                errors.append(f"{where}: narrador deve usar a voz {NARRATOR}")
            for k, c in d["cast"].items():
                if len(c) < 4 or c[3] not in ("left", "right", "center"):
                    errors.append(f"{where}: personagem {k} sem lado (left/right/center)")
                if "+" in c[2] or c[2] in ("am_adam", "am_santa", "af_heart"):
                    errors.append(f"{where}: voz {c[2]} não pode ser usada por personagem")
            before = len(errors)
            built, st = build(d, f"town/{d['slug']}", flags, clues)
            flags |= st
            eps.append(built)
        eps.sort(key=lambda e: e["episode"])
        if [e["episode"] for e in eps] != list(range(1, len(eps) + 1)):
            errors.append(f"{sid}: episódios devem ser numerados 1..N sem buracos")
        given = {n.get("clue") for e in eps for n in e["nodes"].values() if isinstance(n, dict)}
        for c in clues:
            if c not in given:
                errors.append(f"{sid}: pista '{c}' nunca é revelada")
        seasons.append({**{k: v for k, v in season.items() if k != "episodes"}, "id": sid, "episodes": eps})
        print(f"{sid}: {len(eps)} episódios, {len(clues)} pistas, {sum(len(e['nodes']) for e in eps)} nós")
    seasons.sort(key=lambda x: x["season"])
    if not errors and not only_season:
        write_ts(TS_TOWN, "import type { TalkTownSeason } from './types';", "TalkTownSeason[]", "TALK_SEASONS", seasons)

if errors:
    print("\n".join(errors))
    sys.exit(1)
uniq = {j["out"]: j for j in jobs}
print(f"{len(uniq)} áudios")
if "--no-audio" not in sys.argv:
    if "--force-all" in sys.argv:
        for j in uniq.values():
            j["force"] = True
    json.dump(list(uniq.values()), open("out/jobs.json", "w"))
    subprocess.run(["uv", "run", "python", "tts.py", "out/jobs.json"], check=True)
