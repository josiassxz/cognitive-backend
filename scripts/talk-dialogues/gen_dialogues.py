"""Valida os diálogos (dialogues/*.json), gera os MP3 com Kokoro e escreve o arquivo de dados do backend.
Uso: uv run python gen_dialogues.py [--no-audio]"""
import glob, hashlib, json, sys, subprocess
YOU_VOICE = "am_adam"
OUT_MEDIA = "out/media"
TS_OUT = "../cognitive-backend/src/talk/dialogues.data.ts"

def key(slug, voice, text):
    h = hashlib.sha1(f"{voice}|{text}".encode()).hexdigest()[:12]
    return f"talk/dialogues/{slug}/{h}.mp3"

defs, jobs, errors = [], [], []
for f in sorted(glob.glob("dialogues/*.json")):
    for d in json.load(open(f)):
        slug, cast, nodes = d["slug"], d["cast"], d["nodes"]
        out = {}
        def line(voice, text):
            k = key(slug, voice, text)
            jobs.append({"out": f"{OUT_MEDIA}/{k}", "text": text.replace("...", ","), "voice": voice})
            return k
        for nid, n in nodes.items():
            sp, text, pt, nxt = n
            if sp not in cast: errors.append(f"{slug}/{nid}: speaker {sp}")
            voice = cast[sp][2]
            node = {"speaker": sp, "text": text, "pt": pt, "audio": line(voice, text)}
            if isinstance(nxt, list):
                opts, valid, wrong = [], 0, 0
                for o in nxt:
                    opt = {"text": o[0], "pt": o[1], "audio": line(YOU_VOICE, o[0]), "next": o[2]}
                    if o[2] is None:
                        wrong += 1
                        opt["react"] = {"text": o[3], "pt": o[4], "audio": line(voice, o[3])}
                    else:
                        valid += 1
                        if o[2] not in nodes: errors.append(f"{slug}/{nid}: next {o[2]}")
                    opts.append(opt)
                if not valid or not wrong: errors.append(f"{slug}/{nid}: valid={valid} wrong={wrong}")
                node["options"] = opts
            elif nxt is None:
                node["end"] = True
            else:
                if nxt not in nodes: errors.append(f"{slug}/{nid}: next {nxt}")
                node["next"] = nxt
            out[nid] = node
        # alcance, ciclos e decisões por caminho
        start = d["start"]
        seen = set()
        def walk(nid, stack):
            if nid in stack: errors.append(f"{slug}: ciclo em {nid}"); return (0, 0)
            seen.add(nid); n = out[nid]
            if n.get("end"): return (0, 0)
            nexts = [o["next"] for o in n["options"] if o["next"]] if "options" in n else [n["next"]]
            r = [walk(x, stack | {nid}) for x in nexts]
            add = 1 if "options" in n else 0
            return (min(a for a, _ in r) + add, max(b for _, b in r) + add)
        lo, hi = walk(start, frozenset())
        for nid in nodes:
            if nid not in seen: errors.append(f"{slug}: {nid} inalcançável")
        defs.append({"slug": slug, "title": d["title"], "level": d["level"], "description": d["description"], "intro": d["intro"],
                     "cast": {k: {"name": v[0], "role": v[1]} for k, v in cast.items()}, "start": start,
                     "decisions": [lo, hi], "nodes": out})
        print(f"{slug}: {len(nodes)} nós, decisões por caminho {lo}-{hi}")
if errors:
    print("\n".join(errors)); sys.exit(1)
uniq = {j["out"]: j for j in jobs}
print(f"{len(defs)} diálogos, {len(uniq)} áudios")
with open(TS_OUT, "w") as fh:
    fh.write("// GERADO por talk-tts/gen_dialogues.py a partir de talk-tts/dialogues/*.json. Não editar à mão.\n")
    fh.write("import type { TalkDialogueDef } from './types';\n\n")
    fh.write("export const TALK_DIALOGUES: TalkDialogueDef[] = " + json.dumps(defs, ensure_ascii=False, indent=1) + ";\n")
if "--no-audio" not in sys.argv:
    json.dump(list(uniq.values()), open("out/jobs.json", "w"))
    subprocess.run(["uv", "run", "python", "tts.py", "out/jobs.json"], check=True)
