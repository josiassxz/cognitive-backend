import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import { hasDatabase } from './helpers';

const media = vi.hoisted(() => {
  const fs = require('node:fs') as typeof import('node:fs');
  const os = require('node:os') as typeof import('node:os');
  const path = require('node:path') as typeof import('node:path');
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'deck-playlists-'));
  process.env.STORAGE_DRIVER = 'filesystem';
  process.env.MEDIA_ROOT = root;
  process.env.PUBLIC_BASE_URL = '';
  return { root };
});

describe.skipIf(!hasDatabase)('baralhos e playlists pessoais', () => {
  let app: import('express').Express;
  let prisma: typeof import('../../src/lib/prisma').prisma;
  let owner: string;
  let listener: string;
  let ownerToken: string;
  let listenerToken: string;
  let custom: number;
  let empty: number;
  let book: number;
  let privateBook: number;
  let unusedBook: number;
  const prefix = `playlist-${Date.now()}`;

  beforeAll(async () => {
    const { execFileSync } = await import('node:child_process');
    execFileSync('ffmpeg', ['-v', 'error', '-f', 'lavfi', '-i', 'sine=frequency=440:duration=3', '-y', `${media.root}/fixture.mp3`]);
    ({ prisma } = await import('../../src/lib/prisma'));
    const { signAccessToken } = await import('../../src/lib/jwt');
    app = (await import('../../src/app')).createApp();
    const makeUser = async (name: string) => {
      const u = await prisma.user.create({ data: { email: `${prefix}-${name}@playlists.test`, name, passwordHash: 'unused' } });
      return { id: u.id, token: signAccessToken({ id: u.id, email: u.email, name, role: 'user' }) };
    };
    const a = await makeUser('owner');
    const b = await makeUser('listener');
    owner = a.id; ownerToken = a.token;
    listener = b.id; listenerToken = b.token;
    const content = async (name: string, sourceType: string, isPublic: boolean, audioUrl = '') => {
      const row = await prisma.readingContent.create({ data: {
        title: name, slug: `${prefix}-${name}`, sourceType, isPublic, userId: owner,
        textHash: '', fullText: '', cefrLevel: '', audioUrl,
      } });
      return row.id;
    };
    custom = await content('custom', 'custom-deck', false);
    empty = await content('empty', 'custom-deck', false);
    book = await content('book', 'reconstructed_audio', true, 'media://fixture.mp3');
    privateBook = await content('private', 'reconstructed_audio', false, 'media://fixture.mp3');
    unusedBook = await content('library-only', 'reconstructed_audio', true);
    await prisma.readingSentence.createMany({ data: [
      { contentId: custom, sentenceIndex: 2, segmentKey: `${prefix}-silent`, text: 'No audio', startMs: 0, endMs: 0 },
      { contentId: custom, sentenceIndex: 0, segmentKey: `${prefix}-first`, text: 'First', translation: 'Primeira', startMs: 0, endMs: 0, audioKey: 'fixture.mp3' },
      { contentId: custom, sentenceIndex: 1, segmentKey: `${prefix}-second`, text: 'Second', translation: 'Segunda', startMs: 0, endMs: 0, audioKey: 'fixture.mp3' },
      // Frase legada, sem segmentKey, também precisa tocar.
      { contentId: book, sentenceIndex: 0, text: 'Book clip', translation: 'Trecho', startMs: 1000, endMs: 1600 },
    ] });
    await prisma.userStudyCard.create({ data: { userId: owner, contentId: custom, segmentKey: `${prefix}-first`, queue: 'new' } });
    await prisma.userStudyDeck.createMany({ data: [{ userId: owner, contentId: book }, { userId: owner, contentId: privateBook }] });
  });

  afterAll(async () => {
    if (prisma) {
      await prisma.readingContent.deleteMany({ where: { slug: { startsWith: prefix } } });
      await prisma.user.deleteMany({ where: { id: { in: [owner, listener].filter(Boolean) } } });
      await prisma.$disconnect();
    }
    const { rmSync } = await import('node:fs');
    rmSync(media.root, { recursive: true, force: true });
  });

  const auth = (token: string) => ({ Authorization: `Bearer ${token}` });

  it('lista só os baralhos pessoais e impede acessar o personalizado de outra conta', async () => {
    const mine = await request(app).get('/api/study/decks').set(auth(ownerToken)).expect(200);
    const ids = mine.body.decks.map((d: { id: number }) => d.id);
    expect(ids).toEqual(expect.arrayContaining([custom, empty, book, privateBook]));
    expect(ids).not.toContain(unusedBook);
    const other = await request(app).get('/api/study/decks').set(auth(listenerToken)).expect(200);
    expect(other.body.decks).toEqual([]);
    for (const path of [`/study/${custom}/overview`, `/study/${custom}/playlist`, `/study/${custom}/playlist/${prefix}-first/audio`, `/custom-decks/${custom}/cards`]) {
      await request(app).get('/api' + path).set(auth(listenerToken)).expect(404);
    }
    await request(app).post(`/api/study/${custom}/cards`).set(auth(listenerToken)).send({segmentKeys:[`${prefix}-first`]}).expect(404);
  });

  it('preserva a playlist e o editor do dono dos cartões personalizados', async () => {
    const result = await request(app).get(`/api/study/${custom}/playlist`).set(auth(ownerToken)).expect(200);
    expect(result.body.cards.map((c: { front: string }) => c.front)).toEqual(['First']);
    await request(app).get(result.body.cards[0].audioUrl).set('Range', 'bytes=0-99').expect(206);
    const editor = await request(app).get(`/api/custom-decks/${custom}/cards?view=editor`).set(auth(ownerToken)).expect(200);
    expect(editor.body.cards).toHaveLength(3);
  });

  it('acompanha o check pessoal da frase, inclusive ao desmarcar após estudar', async () => {
    const sentence = await prisma.readingSentence.findFirstOrThrow({where:{contentId:book}});
    const key = `sent_${sentence.id}`;
    const playlist = (token: string) => request(app).get(`/api/study/${book}/playlist`).set(auth(token)).expect(200);
    const clip = () => request(app).get(`/api/study/${book}/playlist/${key}/audio`).set(auth(listenerToken));
    const check = (completed: boolean) => request(app).put(`/api/reading-lab/${book}/segments/${key}/progress`).set(auth(listenerToken)).send({completed}).expect(200);
    expect((await playlist(listenerToken)).body.cards).toEqual([]);
    await clip().expect(404);
    await check(true);
    await check(true);
    const list = await request(app).get('/api/study/decks').set(auth(listenerToken)).expect(200);
    expect(list.body.decks.map((d: {id: number}) => d.id)).toEqual([book]);
    expect((await playlist(listenerToken)).body.cards.map((c: {key:string}) => c.key)).toEqual([key]);
    expect((await playlist(ownerToken)).body.cards).toEqual([]);
    const audio = await clip().expect(200);
    await request(app).get(audio.body.audioUrl).set('Range', 'bytes=0-99').expect(206);
    await prisma.userStudyCard.update({where:{userId_segmentKey:{userId:listener,segmentKey:key}}, data:{reps:1}});
    await check(false);
    expect(await prisma.userStudyCard.count({where:{userId:listener,segmentKey:key}})).toBe(1);
    expect((await playlist(listenerToken)).body.cards).toEqual([]);
    await clip().expect(404);
    await check(true);
    expect((await playlist(listenerToken)).body.cards).toHaveLength(1);
  });

  it('mantém edição e exclusão exclusivas do dono', async () => {
    expect((await request(app).get(`/api/custom-decks/${custom}/cards`).auth(ownerToken, { type: 'bearer' })).status).toBe(200);
    const attempts = [
      request(app).patch(`/api/custom-decks/${custom}`).send({ name: 'Forbidden' }),
      request(app).post(`/api/custom-decks/${custom}/cards`).field('front', 'Forbidden'),
      request(app).patch(`/api/custom-decks/${custom}/cards/${prefix}-first`).field('front', 'Forbidden'),
      request(app).delete(`/api/custom-decks/${custom}/cards/${prefix}-first`),
      request(app).delete(`/api/custom-decks/${custom}`),
      request(app).delete(`/api/study/${custom}`),
    ];
    for (const attempt of attempts) expect((await attempt.auth(listenerToken, { type: 'bearer' })).status).toBe(404);
    expect(await prisma.readingSentence.count({ where: { contentId: custom } })).toBe(3);
    expect((await prisma.readingContent.findUniqueOrThrow({ where: { id: custom } })).title).toBe('custom');
  });

  it('exige login e preserva livros pessoais fora do catálogo compartilhado', async () => {
    expect((await request(app).get('/api/study/decks')).status).toBe(401);
    expect((await request(app).get(`/api/study/${custom}/playlist`)).status).toBe(401);
    expect((await request(app).get(`/api/study/${custom}/playlist/${prefix}-first/audio`)).status).toBe(401);
    const list = await request(app).get('/api/study/decks').auth(listenerToken, { type: 'bearer' });
    expect(list.body.decks.some((d: { id: number }) => d.id === privateBook)).toBe(false);
    expect((await request(app).get(`/api/study/${privateBook}/playlist`).auth(listenerToken, { type: 'bearer' })).status).toBe(404);
  });

  it('trata baralho vazio, cartão ausente e cartão sem áudio', async () => {
    const result = await request(app).get(`/api/study/${empty}/playlist`).auth(ownerToken, { type: 'bearer' });
    expect(result.status).toBe(200);
    expect(result.body.cards).toEqual([]);
    for (const key of [`${prefix}-silent`, 'missing']) {
      expect((await request(app).get(`/api/study/${custom}/playlist/${key}/audio`).auth(listenerToken, { type: 'bearer' })).status).toBe(404);
    }
  });
});
