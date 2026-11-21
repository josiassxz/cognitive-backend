import sqlite3, json, re, html, shutil, sys, os, hashlib
col, media, out = sys.argv[1], sys.argv[2], sys.argv[3]
os.makedirs(os.path.join(out, 'audio'), exist_ok=True)
db = sqlite3.connect(col)
db.create_collation('unicase', lambda a, b: (a.lower() > b.lower()) - (a.lower() < b.lower()))
crt = db.execute('select crt from col').fetchone()[0]
TZ, ROLL = -180, 4
def day_of(ms):  # dayNumber do Tunely
    return (ms // 1000 + TZ * 60 - ROLL * 3600) // 86400
crt_day = day_of(crt * 1000)
SOUND = re.compile(r'\[sound:([^\]]+)\]')
def clean(s, multiline):
    s = SOUND.sub('', s)
    if multiline:
        s = re.sub(r'(?i)<\s*(br|/div|/li|/p)\s*/?>', '\n', s)
    s = re.sub(r'<[^>]+>', '', s)
    s = html.unescape(s).replace('\xa0', ' ')
    lines = [re.sub(r'[ \t]+', ' ', l).strip() for l in s.split('\n')]
    return '\n'.join(l for l in lines if l) if multiline else ' '.join(l for l in lines if l)
decks = []
for did, name in db.execute("select id, name from decks where id != 1 order by name"):
    cards = []
    rows = db.execute("""select c.id, c.type, c.queue, c.ivl, c.factor, c.reps, c.lapses, c.due, c.left, n.id, n.flds
                         from cards c join notes n on n.id = c.nid where c.did = ? order by n.id, c.ord""", (did,)).fetchall()
    for (cid, ctype, queue, ivl, factor, reps, lapses, due, left, nid, flds) in rows:
        f = flds.split('\x1f')
        sounds = SOUND.findall(flds)
        audio = ''
        if sounds:
            src = os.path.join(media, sounds[0])
            if os.path.exists(src):
                audio = hashlib.sha1(sounds[0].encode()).hexdigest()[:16] + '.mp3'
                shutil.copyfile(src, os.path.join(out, 'audio', audio))
            else:
                print('AUDIO AUSENTE', sounds[0], file=sys.stderr)
        revs = [dict(at=r[0], answer=r[1], kind=r[2], interval=r[3], lastInterval=r[4], ease=r[5] / 1000 if r[5] else 0, timeMs=r[6], day=day_of(r[0]))
                for r in db.execute('select id, ease, type, ivl, lastIvl, factor, time from revlog where cid = ? order by id', (cid,))]
        tmap = {0: 'new', 1: 'learning', 2: 'review', 3: 'relearning'}
        qmap = {0: 'new', 1: 'learning', 2: 'review', 3: 'learning', -1: 'suspended'}
        card = dict(front=clean(f[0], False), back=clean(f[1] if len(f) > 1 else '', True), audio=audio,
                    type=tmap.get(ctype, 'new'), queue=qmap.get(queue, 'new'), interval=ivl, ease=(factor or 2500) / 1000,
                    reps=reps, lapses=lapses, remainingSteps=left % 1000, reviews=revs)
        if ctype == 2 and queue == 2:
            card['dueDay'] = crt_day + due
        elif queue in (1, 3):
            card['dueAt'] = due * 1000 if queue == 1 else None
            if queue == 3: card['dueDay'] = crt_day + due
        if revs:
            card['lastReviewAt'] = revs[-1]['at']
            card['lastReviewDay'] = revs[-1]['day']
            card['introducedDay'] = revs[0]['day']
        cards.append(card)
    decks.append(dict(name=name, cards=cards))
json.dump(dict(source='anki-desktop', decks=decks), open(os.path.join(out, 'bundle.json'), 'w'), ensure_ascii=False, indent=1)
for d in decks:
    print(d['name'], len(d['cards']), 'cartões,', sum(1 for c in d['cards'] if c['audio']), 'com áudio,', sum(len(c['reviews']) for c in d['cards']), 'revisões, vence:', min(c.get('dueDay', 0) for c in d['cards']), '-', max(c.get('dueDay', 0) for c in d['cards']))
