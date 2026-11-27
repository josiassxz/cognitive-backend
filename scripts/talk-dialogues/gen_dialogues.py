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

YOU_VOICES = {"m": "am_adam", "f": "af_heart"}
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
    return re.sub(r"\b[A-Z][A-Z']+\b", fix, text.replace("...", ","))


def build(d, prefix, known_flags=None, clues=None):
    """Converte um diálogo do JSON para o formato servido pela API. known_flags: flags já definidas
    em episódios anteriores (temporada); clues: pistas válidas da temporada."""
    slug, cast, nodes = d["slug"], d["cast"], d["nodes"]
    known_flags = set(known_flags or ())
    set_here, used_here = set(), set()

    def line(voice, text):
        k = key(prefix, voice, text)
        jobs.append({"out": f"{OUT_MEDIA}/{k}", "text": tts_text(text), "voice": voice, **({"force": True} if "--force-caps" in sys.argv and tts_text(text) != text.replace("...", ",") else {})})
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
    for extra in ("ambience", "place", "time", "episode"):
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
    season = json.load(open("town/season.json"))
    clues = season["clues"]
    flags, eps = set(), []
    for f in sorted(glob.glob("town/ep*.json")):
        d = json.load(open(f))
        built, s = build(d, f"town/{d['slug']}", flags, clues)
        flags |= s
        eps.append(built)
    eps.sort(key=lambda e: e["episode"])
    if not errors:
        write_ts(TS_TOWN, "import type { TalkTownSeason } from './types';", "TalkTownSeason", "TALK_TOWN",
                 {**{k: v for k, v in season.items() if k != "episodes"}, "episodes": eps})
        print(f"temporada: {len(eps)} episódios, {len(clues)} pistas")

if errors:
    print("\n".join(errors))
    sys.exit(1)
uniq = {j["out"]: j for j in jobs}
print(f"{len(uniq)} áudios")
if "--no-audio" not in sys.argv:
    json.dump(list(uniq.values()), open("out/jobs.json", "w"))
    subprocess.run(["uv", "run", "python", "tts.py", "out/jobs.json"], check=True)
