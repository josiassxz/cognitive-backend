// Sessão web por cookie HttpOnly + compatibilidade do fluxo mobile (Bearer).
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { hasDatabase } from './helpers';

function cookieValue(setCookie: string[] | undefined, name: string): string | null {
  const line = (setCookie ?? []).find((value) => value.startsWith(`${name}=`));
  return line ? line.split(';')[0] : null;
}

describe.skipIf(!hasDatabase)('autenticação: cookie (web) e bearer (mobile)', () => {
  let app: import('express').Express;
  let prisma: typeof import('../../src/lib/prisma').prisma;
  const email = `web-${Date.now()}@session.test`;
  const password = 'senha-forte-123';

  beforeAll(async () => {
    ({ prisma } = await import('../../src/lib/prisma'));
    app = (await import('../../src/app')).createApp();
    await prisma.user.deleteMany({ where: { email: { endsWith: '@session.test' } } });
    const signup = await request(app).post('/api/signup').send({ email, password, name: 'Web' });
    expect(signup.status).toBe(201);
  });

  afterAll(async () => {
    await prisma.user.deleteMany({ where: { email: { endsWith: '@session.test' } } });
    await prisma.$disconnect();
  });

  it('mobile continua recebendo tokens no corpo e sem cookies', async () => {
    const login = await request(app).post('/api/auth/login').send({ email, password });
    expect(login.status).toBe(200);
    expect(login.body.accessToken).toBeTruthy();
    expect(login.body.refreshToken).toBeTruthy();
    expect(login.headers['set-cookie']).toBeUndefined();
    const session = await request(app).get('/api/auth/session').set('Authorization', `Bearer ${login.body.accessToken}`);
    expect(session.body.user.email).toBe(email);
    const refreshed = await request(app).post('/api/auth/refresh').send({ refreshToken: login.body.refreshToken });
    expect(refreshed.body.accessToken).toBeTruthy();
  });

  it('web recebe só cookies HttpOnly; o corpo não traz tokens', async () => {
    const login = await request(app).post('/api/auth/login').set('X-Auth-Mode', 'cookie').send({ email, password });
    expect(login.status).toBe(200);
    expect(login.body).toEqual({ user: expect.objectContaining({ email }) });
    const cookies = login.headers['set-cookie'] as unknown as string[];
    const access = cookies.find((value) => value.startsWith('cn_access='))!;
    const refresh = cookies.find((value) => value.startsWith('cn_refresh='))!;
    expect(access).toMatch(/HttpOnly/i);
    expect(access).toMatch(/SameSite=Lax/i);
    expect(access).toMatch(/Path=\//);
    expect(refresh).toMatch(/HttpOnly/i);
    expect(refresh).toMatch(/Path=\/api\/auth/);
  });

  it('reload: /auth/session restaura o usuário pelo cookie; sem cookie é 401', async () => {
    const login = await request(app).post('/api/auth/login').set('X-Auth-Mode', 'cookie').send({ email, password });
    const access = cookieValue(login.headers['set-cookie'] as unknown as string[], 'cn_access')!;
    const session = await request(app).get('/api/auth/session').set('Cookie', access);
    expect(session.status).toBe(200);
    expect(session.body.user.email).toBe(email);
    expect((await request(app).get('/api/auth/session')).status).toBe(401);
  });

  it('requisição que altera estado por cookie exige o cabeçalho anti-CSRF', async () => {
    const login = await request(app).post('/api/auth/login').set('X-Auth-Mode', 'cookie').send({ email, password });
    const access = cookieValue(login.headers['set-cookie'] as unknown as string[], 'cn_access')!;
    const blocked = await request(app).put('/api/reading-lab/1/segments/seg_0000000000000000/progress').set('Cookie', access).send({ completed: true });
    expect(blocked.status).toBe(403);
    expect(blocked.body.code).toBe('CSRF_REJECTED');
    const allowed = await request(app)
      .put('/api/reading-lab/1/segments/seg_0000000000000000/progress')
      .set('Cookie', access)
      .set('X-Requested-With', 'tunely-web')
      .send({ completed: true });
    expect(allowed.status).toBe(404); // passou pela autenticação; o conteúdo é que não existe
  });

  it('refresh e logout por cookie rotacionam e encerram a sessão', async () => {
    const login = await request(app).post('/api/auth/login').set('X-Auth-Mode', 'cookie').send({ email, password });
    const refresh = cookieValue(login.headers['set-cookie'] as unknown as string[], 'cn_refresh')!;
    const refreshed = await request(app).post('/api/auth/refresh').set('X-Auth-Mode', 'cookie').set('Cookie', refresh).send({});
    expect(refreshed.status).toBe(200);
    expect(refreshed.body).toEqual({ user: expect.objectContaining({ email }) });
    const rotated = cookieValue(refreshed.headers['set-cookie'] as unknown as string[], 'cn_refresh')!;
    expect(rotated).not.toBe(refresh);
    // o refresh antigo foi revogado
    const reused = await request(app).post('/api/auth/refresh').set('X-Auth-Mode', 'cookie').set('Cookie', refresh).send({});
    expect(reused.status).toBe(401);
    // sem cookie de refresh: sessão expirada
    expect((await request(app).post('/api/auth/refresh').set('X-Auth-Mode', 'cookie').send({})).status).toBe(401);
    const logout = await request(app).post('/api/auth/logout').set('X-Auth-Mode', 'cookie').set('Cookie', rotated).send({});
    expect(logout.status).toBe(200);
    expect((logout.headers['set-cookie'] as unknown as string[]).some((value) => /^cn_access=;/.test(value))).toBe(true);
    const afterLogout = await request(app).post('/api/auth/refresh').set('X-Auth-Mode', 'cookie').set('Cookie', rotated).send({});
    expect(afterLogout.status).toBe(401);
  });
});
