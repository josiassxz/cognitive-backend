// Gera um pacote .apkg (formato "collection.anki2", schema 11) que o Anki desktop,
// AnkiDroid e AnkiMobile importam. Cada frase vira uma nota com inglês, tradução e áudio;
// o baralho leva junto uma predefinição de opções com as configurações do usuário.
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import JSZip from 'jszip';
import initSqlJs from 'sql.js';
import { legacyDeckConfig } from './anki-map';
import type { StudyConfig } from './config';

export interface ApkgNote {
  guidSource: string;
  english: string;
  portuguese: string;
  audioPath: string | null;
  audioName: string;
  line: number;
}

export interface ApkgInput {
  deckName: string;
  deckId: number;
  bookTitle: string;
  config: StudyConfig;
  presetName?: string;
  notes: ApkgNote[];
  now?: Date;
}

const SCHEMA = `
CREATE TABLE col (id integer primary key, crt integer not null, mod integer not null, scm integer not null,
  ver integer not null, dty integer not null, usn integer not null, ls integer not null, conf text not null,
  models text not null, decks text not null, dconf text not null, tags text not null);
CREATE TABLE notes (id integer primary key, guid text not null, mid integer not null, mod integer not null,
  usn integer not null, tags text not null, flds text not null, sfld integer not null, csum integer not null,
  flags integer not null, data text not null);
CREATE TABLE cards (id integer primary key, nid integer not null, did integer not null, ord integer not null,
  mod integer not null, usn integer not null, type integer not null, queue integer not null, due integer not null,
  ivl integer not null, factor integer not null, reps integer not null, lapses integer not null, left integer not null,
  odue integer not null, odid integer not null, flags integer not null, data text not null);
CREATE TABLE revlog (id integer primary key, cid integer not null, usn integer not null, ease integer not null,
  ivl integer not null, lastIvl integer not null, factor integer not null, time integer not null, type integer not null);
CREATE TABLE graves (usn integer not null, oid integer not null, type integer not null);
CREATE INDEX ix_notes_usn on notes (usn);
CREATE INDEX ix_cards_usn on cards (usn);
CREATE INDEX ix_revlog_usn on revlog (usn);
CREATE INDEX ix_cards_nid on cards (nid);
CREATE INDEX ix_cards_sched on cards (did, queue, due);
CREATE INDEX ix_revlog_cid on revlog (cid);
CREATE INDEX ix_notes_csum on notes (csum);
`;

// IDs fixos: reimportar atualiza as mesmas notas/tipo de nota em vez de duplicar.
const MODEL_IDS: Record<StudyConfig['cardType'], number> = {
  'en-pt': 1_731_500_000_101,
  'audio-first': 1_731_500_000_102,
  'pt-en': 1_731_500_000_103,
};
const DCONF_ID = 1_731_500_000_201;

const CSS = `.card { font-family: Georgia, "Iowan Old Style", serif; font-size: 24px; text-align: center;
  color: #1f1d1a; background: #fbf8f2; line-height: 1.45; padding: 12px; }
.nightMode.card, .night_mode .card { color: #ece7de; background: #1d1b18; }
.en { font-size: 26px; }
.pt { font-size: 21px; color: #5b5348; margin-top: 10px; }
.nightMode .pt, .night_mode .pt { color: #b8afa2; }
.hint { font-family: -apple-system, system-ui, sans-serif; font-size: 15px; color: #8a8174; margin-bottom: 8px; }
.src { font-family: -apple-system, system-ui, sans-serif; font-size: 12px; color: #9a9184; margin-top: 18px; }
hr#answer { border: 0; border-top: 1px solid #d9d1c3; margin: 16px 0; }`;

function templates(cardType: StudyConfig['cardType']) {
  const source = '<div class="src">{{Book}} · linha {{Line}}</div>';
  if (cardType === 'audio-first') {
    return {
      name: 'Tunely · Frase (áudio → texto)',
      req: [[0, 'any', [2]]],
      qfmt: '<div class="hint">Ouça e tente entender</div>{{Audio}}',
      afmt: `{{FrontSide}}<hr id=answer><div class="en">{{English}}</div><div class="pt">{{Portuguese}}</div>${source}`,
    };
  }
  if (cardType === 'pt-en') {
    return {
      name: 'Tunely · Frase (PT → EN)',
      req: [[0, 'any', [1]]],
      qfmt: '<div class="pt">{{Portuguese}}</div>',
      afmt: `{{FrontSide}}<hr id=answer><div class="en">{{English}}</div>{{Audio}}${source}`,
    };
  }
  return {
    name: 'Tunely · Frase (EN → PT)',
    req: [[0, 'any', [0]]],
    qfmt: '<div class="en">{{English}}</div>{{Audio}}',
    afmt: `{{FrontSide}}<hr id=answer><div class="pt">{{Portuguese}}</div>${source}`,
  };
}

function escapeHtml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function checksum(field: string): number {
  const stripped = field.replace(/<[^>]*>/g, '');
  return parseInt(createHash('sha1').update(stripped).digest('hex').slice(0, 8), 16);
}

function guidFor(source: string): string {
  return createHash('sha256').update(`tunely:${source}`).digest('base64').replace(/[^A-Za-z0-9]/g, '').slice(0, 12);
}

export async function buildApkg(input: ApkgInput): Promise<Buffer> {
  const now = input.now ?? new Date();
  const nowMs = now.getTime();
  const nowSecs = Math.floor(nowMs / 1000);
  const tpl = templates(input.config.cardType);
  const modelId = MODEL_IDS[input.config.cardType];

  const model = {
    id: modelId,
    name: tpl.name,
    type: 0,
    mod: nowSecs,
    usn: -1,
    sortf: 0,
    did: input.deckId,
    tags: [],
    vers: [],
    req: tpl.req,
    latexPre: '\\documentclass[12pt]{article}\n\\special{papersize=3in,5in}\n\\usepackage{amssymb,amsmath}\n\\pagestyle{empty}\n\\setlength{\\parindent}{0in}\n\\begin{document}\n',
    latexPost: '\\end{document}',
    css: CSS,
    flds: ['English', 'Portuguese', 'Audio', 'Book', 'Line'].map((name, ord) => ({
      name, ord, sticky: false, rtl: false, font: 'Arial', size: 20, media: [],
    })),
    tmpls: [{ name: 'Cartão 1', ord: 0, qfmt: tpl.qfmt, afmt: tpl.afmt, did: null, bqfmt: '', bafmt: '' }],
  };
  const deckBase = { usn: -1, collapsed: false, browserCollapsed: false, newToday: [0, 0], revToday: [0, 0], lrnToday: [0, 0], timeToday: [0, 0], dyn: 0, extendNew: 0, extendRev: 0, mod: nowSecs };
  const decks = {
    1: { ...deckBase, id: 1, name: 'Default', conf: 1, desc: '' },
    [input.deckId]: { ...deckBase, id: input.deckId, name: input.deckName, conf: DCONF_ID, desc: `Frases de <b>${escapeHtml(input.bookTitle)}</b> com áudio e tradução — exportado do Tunely.` },
  };
  const dconf = { [DCONF_ID]: legacyDeckConfig(input.config, nowSecs, DCONF_ID, input.presetName ?? 'Tunely') };
  const conf = {
    activeDecks: [1], curDeck: 1, newSpread: 0, collapseTime: 1200, timeLim: 0, estTimes: true, dueCounts: true,
    curModel: modelId, nextPos: input.notes.length + 1, sortType: 'noteFld', sortBackwards: false, addToCur: true,
  };

  const SQL = await initSqlJs();
  const db = new SQL.Database();
  try {
    db.run(SCHEMA);
    db.run('INSERT INTO col VALUES (1, ?, ?, ?, 11, 0, 0, 0, ?, ?, ?, ?, ?)', [
      nowSecs - (nowSecs % 86_400), nowMs, nowMs, JSON.stringify(conf), JSON.stringify({ [modelId]: model }),
      JSON.stringify(decks), JSON.stringify(dconf), '{}',
    ]);
    const zip = new JSZip();
    const media: Record<string, string> = {};
    const insertNote = db.prepare('INSERT INTO notes VALUES (?, ?, ?, ?, -1, ?, ?, ?, ?, 0, \'\')');
    const insertCard = db.prepare('INSERT INTO cards VALUES (?, ?, ?, 0, ?, -1, 0, 0, ?, 0, 0, 0, 0, 0, 0, 0, 0, \'\')');
    let mediaIndex = 0;
    for (const [i, note] of input.notes.entries()) {
      let audioField = '';
      if (note.audioPath) {
        const slot = String(mediaIndex++);
        media[slot] = note.audioName;
        zip.file(slot, await readFile(note.audioPath));
        audioField = `[sound:${note.audioName}]`;
      }
      const english = escapeHtml(note.english);
      const fields = [english, escapeHtml(note.portuguese), audioField, escapeHtml(input.bookTitle), String(note.line)];
      const noteId = nowMs + i;
      insertNote.run([noteId, guidFor(note.guidSource), modelId, nowSecs, 'tunely', fields.join('\x1f'), english, checksum(english)]);
      insertCard.run([nowMs + i, noteId, input.deckId, nowSecs, i + 1]);
    }
    insertNote.free();
    insertCard.free();
    zip.file('collection.anki2', Buffer.from(db.export()));
    zip.file('media', JSON.stringify(media));
    return await zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' });
  } finally {
    db.close();
  }
}
