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

describe.skipIf(!hasDatabase)('catálogo e playlists compartilhados entre contas', () => {
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
  const zero = { new: 0, learning: 0, review: 0 };
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

  it('mostra baralhos de outra conta, inclusive vazios, sem copiar contagens', async () => {
    const before = await prisma.userStudyCard.count();
    for (const [token, canEdit] of [[ownerToken, true], [listenerToken, false]] as const) {
      const result = await request(app).get('/api/study/decks').auth(token, { type: 'bearer' });
      expect(result.status).toBe(200);
      expect(result.body.decks).toEqual(expect.arrayContaining([
        expect.objectContaining({ id: custom, custom: true, canEdit, counts: { ...zero, new: canEdit ? 1 : 0 } }),
        expect.objectContaining({ id: empty, custom: true, canEdit, counts: zero }),
        expect.objectContaining({ id: book, custom: false, canEdit: false, counts: zero }),
      ]));
      expect(result.body.decks.some((d: { id: number }) => d.id === unusedBook)).toBe(false);
    }
    expect(await prisma.userStudyCard.count()).toBe(before);
    const result = await request(app).get(`/api/study/${custom}/overview`).auth(listenerToken, { type: 'bearer' });
    expect(result.status).toBe(200);
    expect(result.body).toMatchObject({ totalLines: 3, counts: zero, cards: {} });
  });

  it('separa os flashcards de cada ouvinte e atualiza a playlist ao adicionar e remover', async () => {
    const url = `/api/study/${custom}`;
    const playlist = (token: string) => request(app).get(`${url}/playlist`).auth(token, { type: 'bearer' }).expect(200);
    const direct = (key: string) => request(app).get(`${url}/playlist/${prefix}-${key}/audio`).auth(listenerToken, { type: 'bearer' });
    const legacy = () => request(app).get(`/api/custom-decks/${custom}/cards`).auth(listenerToken, { type: 'bearer' }).expect(200);
    expect((await playlist(listenerToken)).body.cards).toEqual([]);
    expect((await legacy()).body.cards).toEqual([]);
    expect((await playlist(ownerToken)).body.cards.map((c: {front: string}) => c.front)).toEqual(['First']);
    await direct('first').expect(404);
    const choices = await request(app).get(`${url}/phrases`).auth(listenerToken, { type: 'bearer' }).expect(200);
    expect(choices.body.phrases).toHaveLength(3);
    expect(choices.body.phrases[0]).not.toHaveProperty('audioUrl');
    await request(app).post(`${url}/cards`).auth(listenerToken, { type: 'bearer' })
      .send({ segmentKeys: [`${prefix}-silent`, `${prefix}-second`] }).expect(200);
    const { cards } = (await playlist(listenerToken)).body;
    expect(cards.map((c: {front: string}) => c.front)).toEqual(['Second', 'No audio']);
    expect(cards[1]).toMatchObject({ hasAudio: false, audioUrl: '' });
    expect((await legacy()).body.cards).toHaveLength(2);
    await request(app).get(cards[0].audioUrl).set('Range', 'bytes=0-99').expect(206);
    await direct('silent').expect(404);
    await direct('first').expect(404);
    await request(app).delete(`${url}/cards/${prefix}-second`).auth(listenerToken, { type: 'bearer' }).expect(200);
    expect((await playlist(listenerToken)).body.cards).toHaveLength(1);
    await direct('second').expect(404);
    expect(await prisma.userStudyReview.count({ where: { userId: listener } })).toBe(0);
    await request(app).get(`/api/custom-decks/${custom}/cards?view=editor`).auth(listenerToken, {type:'bearer'}).expect(404);
    const editor = await request(app).get(`/api/custom-decks/${custom}/cards?view=editor`).auth(ownerToken, {type:'bearer'}).expect(200);
    expect(editor.body.cards).toHaveLength(3);
  });

  it('gera recorte de uma frase legada do livro depois de adicioná-la', async () => {
    const url = `/api/study/${book}`;
    const { body } = await request(app).get(`${url}/phrases`).auth(listenerToken, {type:'bearer'}).expect(200);
    const key = body.phrases[0].key;
    await request(app).get(`${url}/playlist/${key}/audio`).auth(listenerToken, {type:'bearer'}).expect(404);
    await request(app).post(`${url}/cards`).auth(listenerToken, {type:'bearer'}).send({segmentKeys:[key]}).expect(200);
    const result = await request(app).get(`${url}/playlist`).auth(listenerToken, {type:'bearer'}).expect(200);
    const [card] = result.body.cards;
    expect(card).toMatchObject({ hasAudio: true, audioUrl: '' });
    expect(card.key).toMatch(/^sent_/);
    const audio = await request(app).get(`/api/study/${book}/playlist/${card.key}/audio`).auth(listenerToken, { type: 'bearer' });
    expect(audio.status).toBe(200);
    expect(audio.body.audioUrl).toContain(`/cache/study-clips/${book}/`);
    const streamed = await request(app).get(audio.body.audioUrl).set('Range', 'bytes=0-99');
    expect(streamed.status).toBe(206);
    expect(streamed.headers['content-type']).toContain('audio/mpeg');
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
    const result = await request(app).get(`/api/study/${empty}/playlist`).auth(listenerToken, { type: 'bearer' });
    expect(result.status).toBe(200);
    expect(result.body.cards).toEqual([]);
    for (const key of [`${prefix}-silent`, 'missing']) {
      expect((await request(app).get(`/api/study/${custom}/playlist/${key}/audio`).auth(listenerToken, { type: 'bearer' })).status).toBe(404);
    }
  });
});
