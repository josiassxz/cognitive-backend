import request from 'supertest';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createApp } from '../src/app';
import { signAccessToken } from '../src/lib/jwt';

const mockPrisma = vi.hoisted(() => ({
  user: {
    findUnique: vi.fn(),
  },
  xpLog: {
    aggregate: vi.fn(),
    create: vi.fn(),
    findMany: vi.fn(),
    findFirst: vi.fn(),
  },
  userStreak: {
    findUnique: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
  },
  userBadge: {
    findUnique: vi.fn(),
    findMany: vi.fn(),
    create: vi.fn(),
  },
  quizAttempt: {
    count: vi.fn(),
    create: vi.fn(),
  },
  flashcardProgress: {
    count: vi.fn(),
    findMany: vi.fn(),
    findUnique: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    upsert: vi.fn(),
  },
  userTimerSession: {
    count: vi.fn(),
    findMany: vi.fn(),
    create: vi.fn(),
  },
  userChecklist: {
    findUnique: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    upsert: vi.fn(),
    delete: vi.fn(),
    count: vi.fn(),
  },
  badge: {
    findUnique: vi.fn(),
  },
  userCollocationProgress: {
    count: vi.fn(),
  },
  userSentenceProgress: {
    count: vi.fn(),
  },
  userSavedPhrase: {
    findMany: vi.fn(),
    count: vi.fn(),
    findFirst: vi.fn(),
    create: vi.fn(),
    deleteMany: vi.fn(),
    update: vi.fn(),
    updateMany: vi.fn(),
  },
  vocabulary: {
    findMany: vi.fn(),
    upsert: vi.fn(),
  },
  phrasalVerb: {
    findMany: vi.fn(),
  },
  expression: {
    findMany: vi.fn(),
  },
  song: {
    findFirst: vi.fn(),
    create: vi.fn(),
  },
  songLyricLine: {
    findMany: vi.fn(),
    createMany: vi.fn(),
  },
}));

vi.mock('../src/lib/prisma', () => ({
  prisma: mockPrisma,
}));

function makeToken() {
  return signAccessToken({
    id: 'user-1',
    email: 'john@doe.com',
    name: 'John',
    role: 'user',
  });
}

describe('protected api routes', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockPrisma.user.findUnique.mockResolvedValue({
      id: 'user-1',
      name: 'John',
      email: 'john@doe.com',
      currentMonth: 1,
      createdAt: new Date(),
    });
    mockPrisma.xpLog.aggregate.mockResolvedValue({ _sum: { amount: 120 } });
    mockPrisma.xpLog.create.mockResolvedValue(undefined);
    mockPrisma.xpLog.findMany.mockResolvedValue([]);
    mockPrisma.xpLog.findFirst.mockResolvedValue(null);
    mockPrisma.userStreak.findUnique.mockResolvedValue({ current: 2, longest: 4, lastActiveAt: new Date() });
    mockPrisma.userStreak.create.mockResolvedValue({
      userId: 'user-1',
      current: 1,
      longest: 1,
      lastActiveAt: new Date(),
    });
    mockPrisma.userStreak.update.mockResolvedValue({
      userId: 'user-1',
      current: 3,
      longest: 4,
      lastActiveAt: new Date(),
    });
    mockPrisma.userBadge.findMany.mockResolvedValue([]);
    mockPrisma.userBadge.findUnique.mockResolvedValue(null);
    mockPrisma.userBadge.create.mockResolvedValue(undefined);
    mockPrisma.quizAttempt.count.mockResolvedValue(2);
    mockPrisma.quizAttempt.create.mockResolvedValue(undefined);
    mockPrisma.flashcardProgress.count.mockResolvedValue(3);
    mockPrisma.flashcardProgress.findMany.mockResolvedValue([]);
    mockPrisma.flashcardProgress.findUnique.mockResolvedValue(null);
    mockPrisma.flashcardProgress.create.mockResolvedValue(undefined);
    mockPrisma.flashcardProgress.update.mockResolvedValue(undefined);
    mockPrisma.userTimerSession.count.mockResolvedValue(2);
    mockPrisma.userTimerSession.findMany.mockResolvedValue([]);
    mockPrisma.userTimerSession.create.mockResolvedValue(undefined);
    mockPrisma.userChecklist.findUnique.mockResolvedValue(null);
    mockPrisma.userChecklist.create.mockResolvedValue(undefined);
    mockPrisma.userChecklist.update.mockResolvedValue(undefined);
    mockPrisma.userChecklist.upsert.mockResolvedValue(undefined);
    mockPrisma.userChecklist.delete.mockResolvedValue(undefined);
    mockPrisma.userChecklist.count.mockResolvedValue(0);
    mockPrisma.badge.findUnique.mockResolvedValue(null);
    mockPrisma.userCollocationProgress.count.mockResolvedValue(0);
    mockPrisma.userSentenceProgress.count.mockResolvedValue(0);
    mockPrisma.userSavedPhrase.findMany.mockResolvedValue([]);
    mockPrisma.userSavedPhrase.count.mockResolvedValue(0);
    mockPrisma.userSavedPhrase.findFirst.mockResolvedValue(null);
    mockPrisma.userSavedPhrase.create.mockResolvedValue({ id: 1, phrase: 'hello' });
    mockPrisma.userSavedPhrase.deleteMany.mockResolvedValue(undefined);
    mockPrisma.userSavedPhrase.update.mockResolvedValue(undefined);
    mockPrisma.userSavedPhrase.updateMany.mockResolvedValue(undefined);
    mockPrisma.vocabulary.findMany.mockResolvedValue([]);
    mockPrisma.vocabulary.upsert.mockResolvedValue({ id: 1 });
    mockPrisma.phrasalVerb.findMany.mockResolvedValue([]);
    mockPrisma.expression.findMany.mockResolvedValue([]);
    mockPrisma.flashcardProgress.upsert.mockResolvedValue(undefined);
    mockPrisma.song.findFirst.mockResolvedValue(null);
    mockPrisma.song.create.mockResolvedValue({
      id: 11,
      slug: 'song-importada-xyz',
      title: 'Song Importada',
      artist: 'Canal',
      youtubeId: 'dQw4w9WgXcQ',
      level: 'Intermediario',
      themes: ['imported'],
      month: 1,
    });
    mockPrisma.songLyricLine.findMany.mockResolvedValue([]);
    mockPrisma.songLyricLine.createMany.mockResolvedValue(undefined);
  });

  it('bloqueia rota protegida sem bearer token', async () => {
    const app = createApp();
    const response = await request(app).get('/api/user/profile');
    expect(response.status).toBe(401);
    expect(response.body.code).toBe('UNAUTHORIZED');
  });

  it('retorna profile do usuario', async () => {
    const app = createApp();
    const token = makeToken();
    const response = await request(app).get('/api/user/profile').set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body.user.email).toBe('john@doe.com');
    expect(response.body.stats).toEqual({
      quizzes: 2,
      flashcards: 3,
      timerSessions: 2,
      collocations: { mastered: 0, attempted: 0 },
      sentences: { mastered: 0, attempted: 0 },
    });
  });

  it('atualiza streak', async () => {
    mockPrisma.userStreak.findUnique.mockResolvedValue(null);
    const app = createApp();
    const token = makeToken();
    const response = await request(app).post('/api/user/streak').set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body.isNewDay).toBe(true);
    expect(response.body.streak.current).toBe(1);
  });

  it('retorna checklist vazio e alterna task valida para marcar e desmarcar', async () => {
    mockPrisma.userChecklist.findUnique
      .mockResolvedValueOnce(null)
      .mockResolvedValueOnce(null)
      .mockResolvedValueOnce({ id: 1, tasks: '{"focused-study":true}' });
    const app = createApp();
    const token = makeToken();
    const getResponse = await request(app).get('/api/user/checklist').set('Authorization', `Bearer ${token}`);
    const markResponse = await request(app)
      .post('/api/user/checklist')
      .set('Authorization', `Bearer ${token}`)
      .send({ taskId: 'focused-study' });
    const unmarkResponse = await request(app)
      .post('/api/user/checklist')
      .set('Authorization', `Bearer ${token}`)
      .send({ taskId: 'focused-study' });
    expect(getResponse.status).toBe(200);
    expect(getResponse.body.tasks).toEqual({});
    expect(markResponse.status).toBe(200);
    expect(markResponse.body.tasks['focused-study']).toBe(true);
    expect(markResponse.body.toggledTo).toBe(true);
    expect(unmarkResponse.status).toBe(200);
    expect(unmarkResponse.body.tasks['focused-study']).toBeUndefined();
    expect(unmarkResponse.body.toggledTo).toBe(false);
    expect(mockPrisma.userChecklist.upsert).toHaveBeenCalledTimes(1);
    expect(mockPrisma.userChecklist.delete).toHaveBeenCalledTimes(1);
  });

  it('retorna erro para taskId invalido', async () => {
    const app = createApp();
    const token = makeToken();
    const response = await request(app)
      .post('/api/user/checklist')
      .set('Authorization', `Bearer ${token}`)
      .send({ taskId: 'invalida' });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'taskId invalido', code: 'HTTP_400' });
  });

  it('retorna sessoes de timer e registra nova sessao', async () => {
    mockPrisma.userTimerSession.findMany.mockResolvedValue([{ id: 's1', duration: 1200 }]);
    mockPrisma.userTimerSession.count.mockResolvedValue(5);
    const app = createApp();
    const token = makeToken();
    const getResponse = await request(app).get('/api/user/timer').set('Authorization', `Bearer ${token}`);
    const postResponse = await request(app)
      .post('/api/user/timer')
      .set('Authorization', `Bearer ${token}`)
      .send({ duration: 1200, sessionId: 'timer-session-1' });
    expect(getResponse.status).toBe(200);
    expect(getResponse.body.sessions).toHaveLength(1);
    expect(postResponse.status).toBe(200);
    expect(postResponse.body.totalSessions).toBe(5);
  });

  it('retorna resumo de xp', async () => {
    mockPrisma.xpLog.aggregate.mockResolvedValue({ _sum: { amount: 300 } });
    mockPrisma.xpLog.findMany.mockResolvedValue([{ id: 'x1', amount: 50 }]);
    const app = createApp();
    const token = makeToken();
    const response = await request(app).get('/api/user/xp').set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body.totalXp).toBe(300);
    expect(response.body.recent).toHaveLength(1);
  });

  it('gera quiz de vocabulary', async () => {
    mockPrisma.vocabulary.findMany.mockResolvedValue([
      { id: 1, word: 'hello', definition: 'ola', example: 'hello there' },
      { id: 2, word: 'goodbye', definition: 'tchau', example: 'goodbye now' },
      { id: 3, word: 'house', definition: 'casa', example: 'my house' },
      { id: 4, word: 'car', definition: 'carro', example: 'my car' },
    ]);
    const app = createApp();
    const token = makeToken();
    const response = await request(app)
      .get('/api/quiz/generate?month=1&type=vocabulary&count=3')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body.type).toBe('vocabulary');
    expect(response.body.questions).toHaveLength(3);
  });

  it('submete quiz e retorna resultado', async () => {
    mockPrisma.quizAttempt.count.mockResolvedValue(1);
    const app = createApp();
    const token = makeToken();
    const response = await request(app)
      .post('/api/quiz/submit')
      .set('Authorization', `Bearer ${token}`)
      .send({
        type: 'vocabulary',
        month: 1,
        sessionId: 'quiz-session-1',
        answers: [
          { questionId: 1, selectedAnswer: 'ola', correctAnswer: 'ola', isCorrect: true },
          { questionId: 2, selectedAnswer: 'casa', correctAnswer: 'casa', isCorrect: true },
        ],
      });
    expect(response.status).toBe(200);
    expect(response.body.totalQ).toBe(2);
    expect(response.body.correct).toBe(2);
    expect(mockPrisma.quizAttempt.create).toHaveBeenCalledTimes(1);
  });

  it('retorna flashcards com due e novos', async () => {
    mockPrisma.flashcardProgress.findMany
      .mockResolvedValueOnce([{ vocabularyId: 10, nextReviewAt: new Date(), repetitions: 1, interval: 2 }])
      .mockResolvedValueOnce([{ vocabularyId: 10 }]);
    mockPrisma.vocabulary.findMany.mockResolvedValueOnce([{ id: 20, word: 'new', definition: 'novo' }]).mockResolvedValueOnce([
      { id: 10, word: 'due', definition: 'devido' },
    ]);

    const app = createApp();
    const token = makeToken();
    const response = await request(app).get('/api/flashcards?month=1&limit=10').set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body.dueCount).toBe(1);
    expect(response.body.newCount).toBe(1);
    expect(response.body.cards).toHaveLength(2);
  });

  it('registra revisao de flashcard', async () => {
    mockPrisma.flashcardProgress.findUnique.mockResolvedValue(null);
    mockPrisma.flashcardProgress.count.mockResolvedValue(10);
    const app = createApp();
    const token = makeToken();
    const response = await request(app)
      .post('/api/flashcards/review')
      .set('Authorization', `Bearer ${token}`)
      .send({ vocabularyId: 1, quality: 3, reviewId: 'flashcard-review-1' });
    expect(response.status).toBe(200);
    expect(typeof response.body.xpEarned).toBe('number');
    expect(mockPrisma.flashcardProgress.create).toHaveBeenCalledTimes(1);
  });

  it('salva e lista frases do usuario', async () => {
    mockPrisma.userSavedPhrase.findMany.mockResolvedValue([{ id: 1, phrase: 'love' }]);
    mockPrisma.userSavedPhrase.count.mockResolvedValue(1);
    const app = createApp();
    const token = makeToken();
    const postResponse = await request(app)
      .post('/api/user/saved-phrases')
      .set('Authorization', `Bearer ${token}`)
      .send({ phrase: 'love', translation: 'amor', context: 'I love music' });
    const getResponse = await request(app).get('/api/user/saved-phrases').set('Authorization', `Bearer ${token}`);
    expect(postResponse.status).toBe(200);
    expect(postResponse.body.success).toBe(true);
    expect(getResponse.status).toBe(200);
    expect(getResponse.body.total).toBe(1);
  });

  it('converte frases salvas em flashcards', async () => {
    mockPrisma.userSavedPhrase.findMany.mockResolvedValue([
      { id: 10, phrase: 'piece of cake', translation: 'moleza', context: 'This is a piece of cake' },
    ]);
    const app = createApp();
    const token = makeToken();
    const response = await request(app)
      .post('/api/user/saved-phrases/to-flashcards')
      .set('Authorization', `Bearer ${token}`)
      .send({ phraseIds: [10] });
    expect(response.status).toBe(200);
    expect(response.body.converted).toBe(1);
    expect(mockPrisma.vocabulary.upsert).toHaveBeenCalledTimes(1);
    expect(mockPrisma.flashcardProgress.upsert).toHaveBeenCalledTimes(1);
  });

  it('atualiza status e remove frase salva', async () => {
    mockPrisma.userSavedPhrase.findFirst.mockResolvedValue({ id: 1, userId: 'user-1', status: 'saved' });
    const app = createApp();
    const token = makeToken();

    const patchResponse = await request(app)
      .patch('/api/user/saved-phrases/1')
      .set('Authorization', `Bearer ${token}`)
      .send({ status: 'learning' });

    const deleteResponse = await request(app).delete('/api/user/saved-phrases/1').set('Authorization', `Bearer ${token}`);

    expect(patchResponse.status).toBe(200);
    expect(patchResponse.body.success).toBe(true);
    expect(deleteResponse.status).toBe(200);
    expect(deleteResponse.body.success).toBe(true);
  });

  it('importa musica via rota mobile unificada', async () => {
    mockPrisma.song.findFirst.mockResolvedValue({
      id: 20,
      slug: 'song-a',
      title: 'Song A',
      artist: 'Artist A',
      youtubeId: 'dQw4w9WgXcQ',
      level: 'Intermediario',
      themes: ['imported'],
      month: 1,
    });
    mockPrisma.songLyricLine.findMany.mockResolvedValue([
      { id: 1, lineIndex: 0, startMs: 0, endMs: 900, text: 'Hello', translation: '' },
    ]);

    const app = createApp();
    const token = makeToken();
    const response = await request(app)
      .post('/api/mobile/import-song')
      .set('Authorization', `Bearer ${token}`)
      .send({ youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.song.hasLyrics).toBe(true);
    expect(response.body.song.linesCount).toBe(1);
  });

  it('usa metadata do video para definir title, artist e slug ao criar musica via rota mobile', async () => {
    mockPrisma.song.findFirst.mockResolvedValueOnce(null).mockResolvedValueOnce(null);
    mockPrisma.song.create.mockResolvedValue({
      id: 21,
      slug: 'my-song-from-youtube',
      title: 'My Song From Youtube',
      artist: 'Canal Oficial',
      youtubeId: 'dQw4w9WgXcQ',
      level: 'Intermediario',
      themes: ['imported'],
      month: 1,
    });
    mockPrisma.songLyricLine.findMany.mockResolvedValue([{ id: 1, lineIndex: 0, startMs: 0, endMs: 1000, text: 'Hello', translation: '' }]);
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({ title: 'Canal Oficial - My Song From Youtube', author_name: 'Canal Oficial' }),
    } as Response);
    const app = createApp();
    const token = makeToken();
    const response = await request(app)
      .post('/api/mobile/import-song')
      .set('Authorization', `Bearer ${token}`)
      .send({ youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' });

    expect(response.status).toBe(200);
    expect(mockPrisma.song.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          slug: 'my-song-from-youtube',
          title: 'My Song From Youtube',
          artist: 'Canal Oficial',
        }),
      }),
    );
    fetchSpy.mockRestore();
  });
});
