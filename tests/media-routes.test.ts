// Entrega de mídia: Range (206/416), HEAD, ETag, expiração de link, arquivo ausente e traversal.
import request from 'supertest';
import { beforeAll, describe, expect, it, vi } from 'vitest';

const media = vi.hoisted(() => {
  /* eslint-disable @typescript-eslint/no-require-imports */
  const fs = require('node:fs') as typeof import('node:fs');
  const os = require('node:os') as typeof import('node:os');
  const nodePath = require('node:path') as typeof import('node:path');
  const root = fs.mkdtempSync(nodePath.join(os.tmpdir(), 'cn-media-routes-'));
  fs.mkdirSync(nodePath.join(root, 'reading'), { recursive: true });
  const bytes = Buffer.from(Array.from({ length: 1000 }, (_, index) => index % 251));
  fs.writeFileSync(nodePath.join(root, 'reading', 'a b.mp3'), bytes);
  fs.writeFileSync(nodePath.join(root, 'reading', 'cover.jpg'), Buffer.from([1, 2, 3]));
  fs.writeFileSync(nodePath.join(root, 'reading', 'notes.txt'), 'segredo');
  fs.writeFileSync(nodePath.join(os.tmpdir(), 'cn-outside-secret.mp3'), 'fora da raiz');
  process.env.STORAGE_DRIVER = 'filesystem';
  process.env.MEDIA_ROOT = root;
  process.env.PUBLIC_BASE_URL = '';
  process.env.AWS_S3_BUCKET = 'cognitive-nebula-audio';
  return { root, bytes };
});

describe('GET/HEAD /media', () => {
  let app: import('express').Express;
  let storage: typeof import('../src/lib/storage');
  let token = '';

  beforeAll(async () => {
    storage = await import('../src/lib/storage');
    const { signAccessToken } = await import('../src/lib/jwt');
    token = signAccessToken({ id: 'u1', email: 'u@test', name: 'u', role: 'user' });
    app = (await import('../src/app')).createApp();
  });

  const signed = (key = 'reading/a b.mp3', ttl?: number) => storage.signMediaUrl(key, ttl);

  it('recusa acesso anônimo e assinatura adulterada', async () => {
    expect((await request(app).get('/media/reading/a%20b.mp3')).status).toBe(401);
    const url = signed().replace(/sig=.{4}/, 'sig=AAAA');
    expect((await request(app).get(url)).status).toBe(401);
    // assinatura de um arquivo não vale para outro
    const other = signed('reading/cover.jpg').replace('cover.jpg', 'a%20b.mp3');
    expect((await request(app).get(other)).status).toBe(401);
  });

  it('link expirado responde 403 com código específico', async () => {
    const response = await request(app).get(signed('reading/a b.mp3', -10));
    expect(response.status).toBe(403);
    expect(response.body.code).toBe('MEDIA_URL_EXPIRED');
  });

  it('entrega o arquivo inteiro com cabeçalhos corretos', async () => {
    const response = await request(app).get(signed()).buffer(true).parse((res, done) => {
      const chunks: Buffer[] = [];
      res.on('data', (chunk: Buffer) => chunks.push(chunk));
      res.on('end', () => done(null, Buffer.concat(chunks)));
    });
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toBe('audio/mpeg');
    expect(response.headers['content-length']).toBe('1000');
    expect(response.headers['accept-ranges']).toBe('bytes');
    expect(response.headers.etag).toMatch(/^"[0-9a-f]+-[0-9a-f]+"$/);
    expect(Buffer.compare(response.body as Buffer, media.bytes)).toBe(0);
  });

  it('atende Range com 206 e bytes exatos', async () => {
    const collect = (range: string) =>
      request(app).get(signed()).set('Range', range).buffer(true).parse((res, done) => {
        const chunks: Buffer[] = [];
        res.on('data', (chunk: Buffer) => chunks.push(chunk));
        res.on('end', () => done(null, Buffer.concat(chunks)));
      });
    const middle = await collect('bytes=100-199');
    expect(middle.status).toBe(206);
    expect(middle.headers['content-range']).toBe('bytes 100-199/1000');
    expect(middle.headers['content-length']).toBe('100');
    expect(Buffer.compare(middle.body as Buffer, media.bytes.subarray(100, 200))).toBe(0);
    const open = await collect('bytes=990-');
    expect(open.headers['content-range']).toBe('bytes 990-999/1000');
    const suffix = await collect('bytes=-10');
    expect(suffix.headers['content-range']).toBe('bytes 990-999/1000');
    const clamped = await collect('bytes=500-99999');
    expect(clamped.headers['content-range']).toBe('bytes 500-999/1000');
  });

  it('faixa impossível responde 416 com o tamanho', async () => {
    for (const range of ['bytes=1000-', 'bytes=5000-6000', 'bytes=200-100', 'itens=0-1']) {
      const response = await request(app).get(signed()).set('Range', range);
      expect(response.status, range).toBe(416);
      expect(response.headers['content-range']).toBe('bytes */1000');
    }
  });

  it('HEAD devolve cabeçalhos sem corpo; ETag permite 304', async () => {
    const head = await request(app).head(signed());
    expect(head.status).toBe(200);
    expect(head.headers['content-length']).toBe('1000');
    expect(head.text ?? '').toBe('');
    const cached = await request(app).get(signed()).set('If-None-Match', head.headers.etag);
    expect(cached.status).toBe(304);
  });

  it('aceita sessão válida (Bearer ou cookie) sem assinatura', async () => {
    expect((await request(app).get('/media/reading/cover.jpg').set('Authorization', `Bearer ${token}`)).status).toBe(200);
    expect((await request(app).get('/media/reading/cover.jpg').set('Cookie', `cn_access=${token}`)).status).toBe(200);
    expect((await request(app).get('/media/reading/cover.jpg').set('Cookie', 'cn_access=lixo')).status).toBe(401);
  });

  it('arquivo ausente, tipo não permitido e diretório respondem 404', async () => {
    const auth = { Authorization: `Bearer ${token}` };
    expect((await request(app).get('/media/reading/nao-existe.mp3').set(auth)).status).toBe(404);
    expect((await request(app).get('/media/reading/notes.txt').set(auth)).status).toBe(404);
    expect((await request(app).get('/media/reading').set(auth)).status).toBe(404);
  });

  it('bloqueia traversal para fora da raiz', async () => {
    const auth = { Authorization: `Bearer ${token}` };
    for (const path of [
      '/media/..%2Fcn-outside-secret.mp3',
      '/media/reading/..%2F..%2Fcn-outside-secret.mp3',
      '/media/%2E%2E/cn-outside-secret.mp3',
      '/media/reading%5C..%5C..%5Ccn-outside-secret.mp3',
      '/media//etc/passwd',
    ]) {
      const response = await request(app).get(path).set(auth);
      expect([400, 404], path).toContain(response.status);
      expect(response.text).not.toContain('fora da raiz');
    }
    expect(() => storage.resolveMediaPath('../x.mp3')).toThrow();
    expect(() => storage.resolveMediaPath('/etc/passwd')).toThrow();
    expect(() => storage.normalizeStorageKey('a/./b.mp3')).toThrow();
  });

  it('valores gravados no banco viram URL tocável conforme o ambiente', async () => {
    expect(await storage.getPlayableStorageUrl('')).toBe('');
    expect(await storage.getPlayableStorageUrl('media://reading/cover.jpg')).toMatch(/^\/media\/reading\/cover\.jpg\?exp=\d+&sig=/);
    expect(await storage.getPlayableStorageUrl('media://reading/sumiu.mp3')).toBe('');
    // URL antiga do bucket: servida do backup local quando o arquivo existe em MEDIA_ROOT
    const legacy = 'https://cognitive-nebula-audio.s3.us-east-1.amazonaws.com/reading/cover.jpg';
    expect(await storage.getPlayableStorageUrl(legacy)).toMatch(/^\/media\/reading\/cover\.jpg\?/);
    const external = 'https://exemplo.com/capa.jpg';
    expect(await storage.getPlayableStorageUrl(external)).toBe(external);
  });
});
