// Integração real: Postgres com migrações aplicadas + storage filesystem temporário.
// Rode com: TEST_DATABASE_URL=postgresql://... npm run test:integration
import request from 'supertest';
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { buildPackage, createMediaRoot, hasDatabase } from './helpers';

const media = vi.hoisted(() => {
  /* eslint-disable @typescript-eslint/no-require-imports */
  const fs = require('node:fs') as typeof import('node:fs');
  const os = require('node:os') as typeof import('node:os');
  const nodePath = require('node:path') as typeof import('node:path');
  const crypto = require('node:crypto') as typeof import('node:crypto');
  const root = fs.mkdtempSync(nodePath.join(os.tmpdir(), 'cn-media-'));
  fs.mkdirSync(nodePath.join(root, 'reading'), { recursive: true });
  const bytes = crypto.randomBytes(4096);
  const storageKey = `reading/fixture-${crypto.randomBytes(4).toString('hex')}.mp3`;
  fs.writeFileSync(nodePath.join(root, storageKey), bytes);
  process.env.STORAGE_DRIVER = 'filesystem';
  process.env.MEDIA_ROOT = root;
  process.env.IMPORT_API_TOKEN = 'test-import-token-0123456789abcdef0123456789';
  process.env.PUBLIC_BASE_URL = '';
  return { root, storageKey, sizeBytes: bytes.length, sha256: crypto.createHash('sha256').update(bytes).digest('hex') };
});

const IMPORT_TOKEN = 'test-import-token-0123456789abcdef0123456789';

describe.skipIf(!hasDatabase)('conteúdo reconstruído: importação, trechos, progresso e editor', () => {
  let app: import('express').Express;
  let prisma: typeof import('../../src/lib/prisma').prisma;
  let signAccessToken: typeof import('../../src/lib/jwt').signAccessToken;
  const audio = { storageKey: media.storageKey, sha256: media.sha256, sizeBytes: media.sizeBytes };
  let userToken = '';
  let user2Token = '';
  let adminToken = '';
  let userId = '';

  const importPackage = (pkg: unknown, query = '') =>
    request(app).post(`/api/admin/content-import${query}`).set('X-Import-Token', IMPORT_TOKEN).send(pkg as object);

  beforeAll(async () => {
    ({ prisma } = await import('../../src/lib/prisma'));
    ({ signAccessToken } = await import('../../src/lib/jwt'));
    app = (await import('../../src/app')).createApp();
  });

  beforeEach(async () => {
    await prisma.contentImport.deleteMany();
    await prisma.readingContent.deleteMany();
    await prisma.xpLog.deleteMany();
    await prisma.user.deleteMany({ where: { email: { endsWith: '@segments.test' } } });
    const make = async (name: string, role: 'user' | 'admin') => {
      const created = await prisma.user.create({ data: { email: `${name}@segments.test`, passwordHash: 'x', name, role } });
      return { id: created.id, token: signAccessToken({ id: created.id, email: created.email, name, role }) };
    };
    const [u1, u2, admin] = await Promise.all([make('u1', 'user'), make('u2', 'user'), make('admin', 'admin')]);
    userId = u1.id;
    userToken = u1.token;
    user2Token = u2.token;
    adminToken = admin.token;
  });

  afterAll(async () => {
    await prisma?.$disconnect();
  });

  async function importAndPublish(pkg = buildPackage(audio)) {
    const imported = await importPackage(pkg);
    expect(imported.status).toBe(201);
    const id = imported.body.contentId as number;
    const editor = await request(app).get(`/api/admin/reading/${id}`).set('Authorization', `Bearer ${adminToken}`);
    const published = await request(app)
      .post(`/api/admin/reading/${id}/publish`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ expectedVersion: editor.body.content.editVersion, status: 'published', auditoryValidation: true });
    expect(published.status).toBe(200);
    return id;
  }

  // ------------------------------------------------------------------ importação
  it('exige token de máquina ou admin', async () => {
    const pkg = buildPackage(audio);
    expect((await request(app).post('/api/admin/content-import').send(pkg)).status).toBe(401);
    expect((await request(app).post('/api/admin/content-import').set('X-Import-Token', 'x'.repeat(44)).send(pkg)).status).toBe(401);
    expect((await request(app).post('/api/admin/content-import').set('Authorization', `Bearer ${userToken}`).send(pkg)).status).toBe(403);
    expect((await request(app).post('/api/admin/content-import').set('Authorization', `Bearer ${adminToken}`).send(pkg)).status).toBe(201);
  });

  it('dry-run valida sem gravar', async () => {
    const response = await importPackage(buildPackage(audio), '?dryRun=1');
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({ dryRun: true, action: 'created', segments: 3, media: { audioChecked: true } });
    expect(await prisma.readingContent.count()).toBe(0);
    expect(await prisma.contentImport.count()).toBe(0);
  });

  it('importa uma vez e a reimportação do mesmo pacote é no-op', async () => {
    const pkg = buildPackage(audio);
    const first = await importPackage(pkg);
    expect(first.body).toMatchObject({ action: 'created', publishStatus: 'needs_review' });
    const second = await importPackage(pkg);
    expect(second.status).toBe(200);
    expect(second.body.action).toBe('noop');
    expect(await prisma.readingContent.count()).toBe(1);
    expect(await prisma.readingSentence.count()).toBe(3);
    expect(await prisma.readingWordTimestamp.count()).toBe(12);
    expect(await prisma.xpLog.count()).toBe(0); // importar nunca gera XP
    const content = await prisma.readingContent.findFirstOrThrow();
    expect(content).toMatchObject({ sourceType: 'reconstructed_audio', ttsProvider: 'none', ttsVoice: '', audioUrl: `media://${audio.storageKey}` });
  });

  it('rejeita áudio ausente, hash divergente e pacote incoerente', async () => {
    const missing = buildPackage({ ...audio, storageKey: 'reading/nao-existe.mp3' });
    expect((await importPackage(missing)).status).toBe(422);
    const wrongHash = buildPackage({ ...audio, sha256: 'a'.repeat(64) });
    expect((await importPackage(wrongHash)).status).toBe(422);
    const broken = buildPackage(audio);
    broken.segments[1].words[0].startMs = 0; // fora de ordem
    expect((await importPackage(broken)).status).toBe(422);
    const traversal = buildPackage(audio);
    (traversal.audio as { storageKey: string }).storageKey = '../etc/passwd';
    expect((await importPackage(traversal)).status).toBe(400);
    expect(await prisma.readingContent.count()).toBe(0);
  });

  it('textos iguais em gravações diferentes não colidem (textHash não é identidade)', async () => {
    const other = createMediaRoot();
    // mesma raiz de mídia do app: copia o segundo áudio para lá
    const fs = await import('node:fs');
    fs.copyFileSync(`${other.root}/${other.storageKey}`, `${media.root}/${other.storageKey}`);
    await importPackage(buildPackage(audio));
    const second = await importPackage(buildPackage({ storageKey: other.storageKey, sha256: other.sha256, sizeBytes: other.sizeBytes }));
    expect(second.status).toBe(201);
    expect(await prisma.readingContent.count()).toBe(2);
  });

  // ------------------------------------------------------------------ visibilidade
  it.each(['draft', 'needs_review', 'ready', 'published'])('livros com status %s aparecem e abrem para todos os usuários', async (publishStatus) => {
    const imported = await importPackage(buildPackage(audio));
    const id = imported.body.contentId;
    await prisma.readingContent.update({ where: { id }, data: { publishStatus } });
    for (const token of [userToken, user2Token, adminToken]) {
      const auth = { Authorization: `Bearer ${token}` };
      const list = await request(app).get('/api/reading-lab').set(auth);
      expect(list.status).toBe(200);
      expect(list.body.total).toBe(1);
      expect(list.body.items).toEqual([expect.objectContaining({ id, publishStatus })]);
      expect((await request(app).get('/api/reading-lab?status=all').set(auth)).body.total).toBe(1);
      expect((await request(app).get(`/api/reading-lab?status=${publishStatus}`).set(auth)).body.total).toBe(1);
      const detail = await request(app).get(`/api/reading-lab/${id}`).set(auth);
      expect(detail.status).toBe(200);
      expect(detail.body.audioUrl).toMatch(/^\/media\//);
      const segments = await request(app).get(`/api/reading-lab/${id}/segments`).set(auth);
      expect(segments.status).toBe(200);
      expect(segments.body.total).toBe(3);
      const listening = await request(app).put(`/api/reading-lab/${id}/listening`).set(auth).send({ positionMs: 1500 });
      expect(listening.status).toBe(200);
      const resume = await request(app).get('/api/reading-lab/continue-listening').set(auth);
      expect(resume.status).toBe(200);
      expect(resume.body.items).toEqual([expect.objectContaining({ id, positionMs: 1500 })]);
    }
    expect((await request(app).get(`/api/reading-lab/${id}/segments`)).status).toBe(401);
  });

  it('preserva a privacidade dos livros pessoais ao liberar os status de revisão', async () => {
    const imported = await importPackage(buildPackage(audio));
    const id = imported.body.contentId;
    await prisma.readingContent.update({ where: { id }, data: { isPublic: false, userId } });
    expect((await request(app).get(`/api/reading-lab/${id}/segments`).set('Authorization', `Bearer ${userToken}`)).status).toBe(200);
    for (const token of [user2Token, adminToken]) {
      const auth = { Authorization: `Bearer ${token}` };
      expect((await request(app).get('/api/reading-lab?status=all').set(auth)).body.total).toBe(0);
      expect((await request(app).get(`/api/reading-lab/${id}`).set(auth)).status).toBe(404);
      expect((await request(app).get(`/api/reading-lab/${id}/segments`).set(auth)).status).toBe(404);
    }
  });

  it('não publica sem validação auditiva declarada', async () => {
    const imported = await importPackage(buildPackage(audio));
    const id = imported.body.contentId;
    const refused = await request(app)
      .post(`/api/admin/reading/${id}/publish`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ expectedVersion: 0, status: 'published' });
    expect(refused.status).toBe(400);
    expect((await prisma.readingContent.findUniqueOrThrow({ where: { id } })).publishStatus).toBe('needs_review');
  });

  // ------------------------------------------------------------------ trechos e progresso
  it('entrega trechos com tempos, destaques e URL de áudio assinada', async () => {
    const id = await importAndPublish();
    const response = await request(app).get(`/api/reading-lab/${id}/segments`).set('Authorization', `Bearer ${userToken}`);
    expect(response.status).toBe(200);
    expect(response.body.total).toBe(3);
    const [first] = response.body.segments;
    expect(first).toMatchObject({ index: 0, text: 'Once upon a time,', startMs: 1000, endMs: 2500, playStartMs: 950, playEndMs: 2550 });
    expect(first.highlights[0]).toMatchObject({ enWordIndexes: [0], pt: { text: 'partiu' } });
    expect(first.words).toHaveLength(4);
    expect(response.body.content.audioUrl).toMatch(/^\/media\/reading\/fixture-[0-9a-f]+\.mp3\?exp=\d+&sig=/);
    // a URL assinada toca sem cabeçalho de autenticação
    const audioResponse = await request(app).get(response.body.content.audioUrl).set('Range', 'bytes=0-99');
    expect(audioResponse.status).toBe(206);
    expect(audioResponse.headers['content-range']).toBe(`bytes 0-99/${media.sizeBytes}`);
  });

  it('progresso por trecho é idempotente, por usuário e visível em outro dispositivo', async () => {
    const id = await importAndPublish();
    const list = await request(app).get(`/api/reading-lab/${id}/segments`).set('Authorization', `Bearer ${userToken}`);
    const keys = list.body.segments.map((segment: { id: string }) => segment.id) as string[];
    const mark = (token: string, key: string, completed: boolean) =>
      request(app).put(`/api/reading-lab/${id}/segments/${key}/progress`).set('Authorization', `Bearer ${token}`).send({ completed });

    expect((await mark(userToken, keys[0], true)).body.progress).toMatchObject({ completedCount: 1, total: 3 });
    expect((await mark(userToken, keys[0], true)).body.progress.completedCount).toBe(1); // repetido não duplica
    expect(await prisma.userSegmentProgress.count()).toBe(1);
    // "outro dispositivo" = outra sessão do mesmo usuário
    const otherDeviceToken = signAccessToken({ id: userId, email: 'u1@segments.test', name: 'u1', role: 'user' });
    const seen = await request(app).get(`/api/reading-lab/${id}/segments`).set('Authorization', `Bearer ${otherDeviceToken}`);
    expect(seen.body.progress.completedIds).toEqual([keys[0]]);
    // outro usuário não vê
    const other = await request(app).get(`/api/reading-lab/${id}/segments`).set('Authorization', `Bearer ${user2Token}`);
    expect(other.body.progress.completedCount).toBe(0);
    // desmarcar
    expect((await mark(userToken, keys[0], false)).body.progress.completedCount).toBe(0);
    expect((await mark(userToken, 'seg_0000000000000000', true)).status).toBe(404);
  });

  it('concluir todos os trechos conclui o conteúdo e dá XP uma única vez', async () => {
    const id = await importAndPublish();
    const list = await request(app).get(`/api/reading-lab/${id}/segments`).set('Authorization', `Bearer ${userToken}`);
    for (const segment of list.body.segments) {
      await request(app).put(`/api/reading-lab/${id}/segments/${segment.id}/progress`).set('Authorization', `Bearer ${userToken}`).send({ completed: true });
    }
    const general = await prisma.userReadingProgress.findUniqueOrThrow({ where: { userId_contentId: { userId, contentId: id } } });
    expect(general.completed).toBe(true);
    // desmarca e marca de novo: sem XP duplicado
    const last = list.body.segments[2].id;
    for (const completed of [false, true]) {
      await request(app).put(`/api/reading-lab/${id}/segments/${last}/progress`).set('Authorization', `Bearer ${userToken}`).send({ completed });
    }
    expect(await prisma.xpLog.count({ where: { userId, detail: `reading_complete:${id}` } })).toBe(1);
  });

  it('nova segmentação preserva checks dos trechos que continuam e não apaga os demais', async () => {
    const id = await importAndPublish(buildPackage(audio, [3, 7, 11]));
    const list = await request(app).get(`/api/reading-lab/${id}/segments`).set('Authorization', `Bearer ${userToken}`);
    for (const segment of list.body.segments.slice(0, 2)) {
      await request(app).put(`/api/reading-lab/${id}/segments/${segment.id}/progress`).set('Authorization', `Bearer ${userToken}`).send({ completed: true });
    }
    // revisão: 1º trecho igual; 2º e 3º viram um só
    const editor = await request(app).get(`/api/admin/reading/${id}`).set('Authorization', `Bearer ${adminToken}`);
    expect(editor.body.content.editVersion).toBeGreaterThan(0); // publicar contou como edição
    const blocked = await importPackage(buildPackage(audio, [3, 11]));
    expect(blocked.status).toBe(409); // há alterações manuais → exige force
    const dry = await importPackage(buildPackage(audio, [3, 11]), '?dryRun=1&force=1');
    expect(dry.body).toMatchObject({ action: 'updated', progress: { kept: 1, orphaned: 1 } });
    const reimport = await importPackage(buildPackage(audio, [3, 11]), '?force=1');
    expect(reimport.body).toMatchObject({ action: 'updated', segments: 2, progress: { kept: 1, orphaned: 1 } });
    const after = await request(app).get(`/api/reading-lab/${id}/segments`).set('Authorization', `Bearer ${userToken}`);
    expect(after.body.progress).toMatchObject({ completedCount: 1, total: 2 });
    expect(await prisma.userSegmentProgress.count()).toBe(2); // nada foi apagado silenciosamente
    // voltar à segmentação original restaura o check órfão
    const back = await importPackage(buildPackage(audio, [3, 7, 11]), '?force=1');
    expect(back.body.progress).toMatchObject({ kept: 2, restored: 1 });
  });

  // ------------------------------------------------------------------ editor
  describe('editor de revisão', () => {
    const admin = () => ({ Authorization: `Bearer ${adminToken}` });
    async function setup() {
      const imported = await importPackage(buildPackage(audio));
      const id = imported.body.contentId as number;
      const editor = await request(app).get(`/api/admin/reading/${id}`).set(admin());
      return { id, version: editor.body.content.editVersion as number, segments: editor.body.segments as { id: string; startMs: number; endMs: number; playStartMs: number; playEndMs: number; text: string }[] };
    }

    it('é restrito a admin', async () => {
      const { id } = await setup();
      expect((await request(app).get(`/api/admin/reading/${id}`).set('Authorization', `Bearer ${userToken}`)).status).toBe(403);
    });

    it('editar tradução não altera tempos; versão antiga gera 409', async () => {
      const { id, version, segments } = await setup();
      const key = segments[0].id;
      const ok = await request(app).patch(`/api/admin/reading/${id}/segments/${key}`).set(admin()).send({ expectedVersion: version, translation: 'Era uma vez,' });
      expect(ok.status).toBe(200);
      const row = await prisma.readingSentence.findFirstOrThrow({ where: { segmentKey: key }, include: { wordTimestamps: true } });
      expect(row).toMatchObject({ translation: 'Era uma vez,', startMs: segments[0].startMs, endMs: segments[0].endMs, playStartMs: segments[0].playStartMs });
      expect(row.wordTimestamps.every((word) => word.timeSource === 'aligner')).toBe(true);
      const stale = await request(app).patch(`/api/admin/reading/${id}/segments/${key}`).set(admin()).send({ expectedVersion: version, translation: 'conflito' });
      expect(stale.status).toBe(409);
      expect((await prisma.readingSentence.findFirstOrThrow({ where: { segmentKey: key } })).translation).toBe('Era uma vez,');
    });

    it('editar o inglês invalida o alinhamento do trecho', async () => {
      const { id, version, segments } = await setup();
      const key = segments[0].id;
      const same = await request(app).patch(`/api/admin/reading/${id}/segments/${key}`).set(admin()).send({ expectedVersion: version, text: 'Once upon a day,' });
      expect(same.status).toBe(200);
      let row = await prisma.readingSentence.findFirstOrThrow({ where: { segmentKey: key }, include: { wordTimestamps: { orderBy: { wordIndex: 'asc' } } } });
      expect(row.quality).toBe('needs_review');
      expect(row.reviewReasons).toContain('text_edited_needs_realign');
      expect(row.wordTimestamps.map((word) => word.timeSource)).toEqual(['aligner', 'aligner', 'aligner', 'stale']);
      const different = await request(app).patch(`/api/admin/reading/${id}/segments/${key}`).set(admin()).send({ expectedVersion: same.body.editVersion, text: 'Once upon a very long day,' });
      expect(different.status).toBe(200);
      row = await prisma.readingSentence.findFirstOrThrow({ where: { segmentKey: key }, include: { wordTimestamps: true } });
      expect(row.wordTimestamps).toHaveLength(0); // nenhum tempo inventado
      expect((await prisma.readingContent.findUniqueOrThrow({ where: { id } })).qualityStatus).toBe('needs_review');
    });

    it('ajusta limites de reprodução com validação', async () => {
      const { id, version, segments } = await setup();
      const key = segments[1].id;
      const ok = await request(app).patch(`/api/admin/reading/${id}/segments/${key}`).set(admin()).send({ expectedVersion: version, playStartMs: segments[1].startMs - 20, playEndMs: segments[1].endMs + 30 });
      expect(ok.status).toBe(200);
      const tooLong = await request(app).patch(`/api/admin/reading/${id}/segments/${key}`).set(admin()).send({ expectedVersion: ok.body.editVersion, playEndMs: 999_999 });
      expect(tooLong.status).toBe(400);
      const tooShort = await request(app).patch(`/api/admin/reading/${id}/segments/${key}`).set(admin()).send({ expectedVersion: ok.body.editVersion, playStartMs: segments[1].endMs, playEndMs: segments[1].endMs + 30 });
      expect(tooShort.status).toBe(400);
    });

    it('divide, une e desfaz mantendo a partição e o progresso', async () => {
      const { id, version, segments } = await setup();
      const key = segments[0].id; // 4 palavras
      await prisma.userSegmentProgress.create({ data: { userId, contentId: id, segmentKey: key } });
      const split = await request(app).post(`/api/admin/reading/${id}/segments/${key}/split`).set(admin()).send({ expectedVersion: version, afterWordIndex: 1, translationLeft: 'Era uma', translationRight: 'vez,' });
      expect(split.status).toBe(200);
      let rows = await prisma.readingSentence.findMany({ where: { contentId: id }, orderBy: { sentenceIndex: 'asc' }, include: { wordTimestamps: true } });
      expect(rows.map((row) => row.text)).toEqual(['Once upon', 'a time,', 'there lived a little', 'girl. She set out immediately.'].slice(0, 2).concat(rows.slice(2).map((row) => row.text)));
      expect(rows.map((row) => row.sentenceIndex)).toEqual([0, 1, 2, 3]);
      expect(rows[0].endMs).toBe(1000 + 400 + 300);
      expect(rows[1].startMs).toBe(1000 + 800);
      expect(rows[0].playEndMs!).toBeLessThanOrEqual(rows[1].startMs); // não invade a outra metade
      expect(rows.reduce((sum, row) => sum + row.wordTimestamps.length, 0)).toBe(12); // nenhuma palavra perdida/duplicada
      // quem tinha concluído o trecho inteiro mantém as duas metades
      expect(await prisma.userSegmentProgress.count({ where: { userId, orphanedAt: null } })).toBe(2);

      const merge = await request(app).post(`/api/admin/reading/${id}/segments/${split.body.created[0]}/merge-next`).set(admin()).send({ expectedVersion: split.body.editVersion });
      expect(merge.status).toBe(200);
      expect(merge.body.created[0]).toBe(key); // mesmo intervalo de palavras → mesma identidade estável
      rows = await prisma.readingSentence.findMany({ where: { contentId: id }, orderBy: { sentenceIndex: 'asc' } });
      expect(rows).toHaveLength(3);
      expect(rows[0]).toMatchObject({ text: 'Once upon a time,', translation: 'Era uma vez,' });
      expect(await prisma.userSegmentProgress.count({ where: { userId, segmentKey: key, orphanedAt: null } })).toBe(1);

      const undo = await request(app).post(`/api/admin/reading/${id}/undo`).set(admin()).send({ expectedVersion: merge.body.editVersion });
      expect(undo.status).toBe(200);
      expect(undo.body.undone.kind).toBe('merge');
      rows = await prisma.readingSentence.findMany({ where: { contentId: id }, orderBy: { sentenceIndex: 'asc' } });
      expect(rows.map((row) => row.text).slice(0, 2)).toEqual(['Once upon', 'a time,']);
      const undo2 = await request(app).post(`/api/admin/reading/${id}/undo`).set(admin()).send({ expectedVersion: undo.body.editVersion });
      expect(undo2.body.undone.kind).toBe('split');
      rows = await prisma.readingSentence.findMany({ where: { contentId: id }, orderBy: { sentenceIndex: 'asc' } });
      expect(rows.map((row) => row.segmentKey)).toEqual(segments.map((segment) => segment.id));
      const history = await request(app).get(`/api/admin/reading/${id}/revisions`).set(admin());
      expect(history.body.items.filter((item: { undoneAt: string | null }) => item.undoneAt).length).toBe(2);
    });
  });
});
