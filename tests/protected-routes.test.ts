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
    count: vi.fn(),
  },
  badge: {
    findUnique: vi.fn(),
  },
  vocabulary: {
    findMany: vi.fn(),
  },
  phrasalVerb: {
    findMany: vi.fn(),
  },
  expression: {
    findMany: vi.fn(),
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
    mockPrisma.userChecklist.count.mockResolvedValue(0);
    mockPrisma.badge.findUnique.mockResolvedValue(null);
    mockPrisma.vocabulary.findMany.mockResolvedValue([]);
    mockPrisma.phrasalVerb.findMany.mockResolvedValue([]);
    mockPrisma.expression.findMany.mockResolvedValue([]);
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
    expect(response.body.stats).toEqual({ quizzes: 2, flashcards: 3, timerSessions: 2 });
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

  it('retorna checklist vazio e alterna task valida', async () => {
    const app = createApp();
    const token = makeToken();
    const getResponse = await request(app).get('/api/user/checklist').set('Authorization', `Bearer ${token}`);
    const postResponse = await request(app)
      .post('/api/user/checklist')
      .set('Authorization', `Bearer ${token}`)
      .send({ taskId: 'focused-study' });
    expect(getResponse.status).toBe(200);
    expect(getResponse.body.tasks).toEqual({});
    expect(postResponse.status).toBe(200);
    expect(postResponse.body.tasks['focused-study']).toBe(true);
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
});
