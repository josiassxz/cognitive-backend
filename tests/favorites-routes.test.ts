import request from 'supertest';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createApp } from '../src/app';
import { signAccessToken } from '../src/lib/jwt';

const mockPrisma = vi.hoisted(() => ({
  readingContent: { findUnique: vi.fn() },
  userFavoriteBook: { findMany: vi.fn(), upsert: vi.fn(), deleteMany: vi.fn() },
}));

vi.mock('../src/lib/prisma', () => ({ prisma: mockPrisma }));

const auth = () =>
  `Bearer ${signAccessToken({ id: 'user-1', email: 'john@doe.com', name: 'John', role: 'user' })}`;

const book = (overrides: Record<string, unknown> = {}) => ({
  id: 42, title: 'Book', sourceType: 'reconstructed_audio', isPublic: true, userId: null, ...overrides,
});

describe('favorite books routes', () => {
  // Estado em memória para exercitar a idempotência de ponta a ponta.
  let favorites: number[];
  const app = createApp();

  beforeEach(() => {
    vi.clearAllMocks();
    favorites = [];
    mockPrisma.readingContent.findUnique.mockResolvedValue(book());
    mockPrisma.userFavoriteBook.findMany.mockImplementation(async () => favorites.map((contentId) => ({ contentId })));
    mockPrisma.userFavoriteBook.upsert.mockImplementation(async ({ create }: { create: { contentId: number } }) => {
      if (!favorites.includes(create.contentId)) favorites.unshift(create.contentId);
      return create;
    });
    mockPrisma.userFavoriteBook.deleteMany.mockImplementation(async ({ where }: { where: { contentId: number } }) => {
      const before = favorites.length;
      favorites = favorites.filter((id) => id !== where.contentId);
      return { count: before - favorites.length };
    });
  });

  it('exige autenticação', async () => {
    expect((await request(app).get('/api/reading-lab/favorites')).status).toBe(401);
    expect((await request(app).put('/api/reading-lab/favorites/42').send({ favorite: true })).status).toBe(401);
    expect(mockPrisma.userFavoriteBook.upsert).not.toHaveBeenCalled();
  });

  it('lista só os favoritos do aluno, mais recentes primeiro', async () => {
    favorites = [7, 42];
    const response = await request(app).get('/api/reading-lab/favorites').set('Authorization', auth());
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ ids: [7, 42] });
    const args = mockPrisma.userFavoriteBook.findMany.mock.calls[0][0];
    expect(args.where.userId).toBe('user-1');
    expect(args.orderBy).toEqual({ createdAt: 'desc' });
  });

  it('marca um livro como favorito', async () => {
    const response = await request(app).put('/api/reading-lab/favorites/42').set('Authorization', auth()).send({ favorite: true });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ contentId: 42, favorite: true });
    expect(mockPrisma.userFavoriteBook.upsert).toHaveBeenCalledWith({
      where: { userId_contentId: { userId: 'user-1', contentId: 42 } },
      create: { userId: 'user-1', contentId: 42 },
      update: {},
    });
    const list = await request(app).get('/api/reading-lab/favorites').set('Authorization', auth());
    expect(list.body.ids).toEqual([42]);
  });

  it('desmarca um favorito', async () => {
    favorites = [42, 7];
    const response = await request(app).put('/api/reading-lab/favorites/42').set('Authorization', auth()).send({ favorite: false });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ contentId: 42, favorite: false });
    expect(mockPrisma.userFavoriteBook.deleteMany).toHaveBeenCalledWith({ where: { userId: 'user-1', contentId: 42 } });
    expect(favorites).toEqual([7]);
  });

  it('é idempotente ao marcar e ao desmarcar duas vezes', async () => {
    for (let i = 0; i < 2; i += 1) {
      const response = await request(app).put('/api/reading-lab/favorites/42').set('Authorization', auth()).send({ favorite: true });
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ contentId: 42, favorite: true });
    }
    expect(favorites).toEqual([42]);
    for (let i = 0; i < 2; i += 1) {
      const response = await request(app).put('/api/reading-lab/favorites/42').set('Authorization', auth()).send({ favorite: false });
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ contentId: 42, favorite: false });
    }
    expect(favorites).toEqual([]);
  });

  it('404 quando o livro não existe', async () => {
    mockPrisma.readingContent.findUnique.mockResolvedValue(null);
    const response = await request(app).put('/api/reading-lab/favorites/999').set('Authorization', auth()).send({ favorite: true });
    expect(response.status).toBe(404);
    expect(mockPrisma.userFavoriteBook.upsert).not.toHaveBeenCalled();
  });

  it('404 quando o livro é privado de outro aluno ou é um baralho', async () => {
    mockPrisma.readingContent.findUnique.mockResolvedValue(book({ isPublic: false, userId: 'user-2' }));
    const hidden = await request(app).put('/api/reading-lab/favorites/42').set('Authorization', auth()).send({ favorite: true });
    expect(hidden.status).toBe(404);
    mockPrisma.readingContent.findUnique.mockResolvedValue(book({ sourceType: 'custom-deck', isPublic: false, userId: 'user-1' }));
    const deck = await request(app).put('/api/reading-lab/favorites/42').set('Authorization', auth()).send({ favorite: false });
    expect(deck.status).toBe(404);
    expect(mockPrisma.userFavoriteBook.upsert).not.toHaveBeenCalled();
    expect(mockPrisma.userFavoriteBook.deleteMany).not.toHaveBeenCalled();
  });

  it('permite favoritar um livro privado do próprio aluno', async () => {
    mockPrisma.readingContent.findUnique.mockResolvedValue(book({ sourceType: 'user', isPublic: false, userId: 'user-1' }));
    const response = await request(app).put('/api/reading-lab/favorites/42').set('Authorization', auth()).send({ favorite: true });
    expect(response.status).toBe(200);
  });

  it('400 com corpo ou id inválidos', async () => {
    const badBody = await request(app).put('/api/reading-lab/favorites/42').set('Authorization', auth()).send({ favorite: 'yes' });
    expect(badBody.status).toBe(400);
    const badId = await request(app).put('/api/reading-lab/favorites/abc').set('Authorization', auth()).send({ favorite: true });
    expect(badId.status).toBe(400);
    expect(mockPrisma.readingContent.findUnique).not.toHaveBeenCalled();
  });
});
