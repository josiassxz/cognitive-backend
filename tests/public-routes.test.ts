import request from 'supertest';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createApp } from '../src/app';

const mockTranslateWithContext = vi.hoisted(() => vi.fn());

const mockPrisma = vi.hoisted(() => ({
  vocabulary: {
    findMany: vi.fn(),
    count: vi.fn(),
  },
  phrasalVerb: {
    findMany: vi.fn(),
    count: vi.fn(),
  },
  song: {
    findMany: vi.fn(),
    findUnique: vi.fn(),
    count: vi.fn(),
  },
  songLyricLine: {
    count: vi.fn(),
    groupBy: vi.fn(),
    findMany: vi.fn(),
  },
  translationCache: {
    findUnique: vi.fn(),
    update: vi.fn(),
    create: vi.fn(),
  },
  video: {
    findMany: vi.fn(),
    count: vi.fn(),
  },
  grammarTip: {
    findMany: vi.fn(),
    count: vi.fn(),
  },
  podcast: {
    findMany: vi.fn(),
    count: vi.fn(),
  },
  expression: {
    findMany: vi.fn(),
    count: vi.fn(),
  },
  oxfordWord: {
    count: vi.fn(),
  },
  collocation: {
    count: vi.fn(),
  },
  collocationExercise: {
    count: vi.fn(),
  },
  sentenceExercise: {
    count: vi.fn(),
  },
}));

vi.mock('../src/lib/prisma', () => ({
  prisma: mockPrisma,
}));

vi.mock('../src/lib/gemini', () => ({
  translateWithContext: mockTranslateWithContext,
}));

describe('public api routes', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockPrisma.vocabulary.findMany.mockResolvedValue([]);
    mockPrisma.phrasalVerb.findMany.mockResolvedValue([]);
    mockPrisma.song.findMany.mockResolvedValue([]);
    mockPrisma.song.findUnique.mockResolvedValue(null);
    mockPrisma.songLyricLine.count.mockResolvedValue(0);
    mockPrisma.songLyricLine.groupBy.mockResolvedValue([]);
    mockPrisma.songLyricLine.findMany.mockResolvedValue([]);
    mockPrisma.translationCache.findUnique.mockResolvedValue(null);
    mockPrisma.translationCache.update.mockResolvedValue(undefined);
    mockPrisma.translationCache.create.mockResolvedValue(undefined);
    mockPrisma.video.findMany.mockResolvedValue([]);
    mockPrisma.grammarTip.findMany.mockResolvedValue([]);
    mockPrisma.podcast.findMany.mockResolvedValue([]);
    mockPrisma.expression.findMany.mockResolvedValue([]);
    mockPrisma.oxfordWord.count.mockResolvedValue(1);
    mockPrisma.collocation.count.mockResolvedValue(1);
    mockPrisma.collocationExercise.count.mockResolvedValue(1);
    mockPrisma.sentenceExercise.count.mockResolvedValue(1);
    mockTranslateWithContext.mockResolvedValue({
      translation: 'teste',
      explanation: 'explicacao',
      partOfSpeech: 'noun',
    });
    mockPrisma.vocabulary.count.mockResolvedValue(1);
    mockPrisma.phrasalVerb.count.mockResolvedValue(2);
    mockPrisma.song.count.mockResolvedValue(3);
    mockPrisma.video.count.mockResolvedValue(4);
    mockPrisma.grammarTip.count.mockResolvedValue(5);
    mockPrisma.podcast.count.mockResolvedValue(6);
    mockPrisma.expression.count.mockResolvedValue(7);
  });

  it('retorna healthcheck', async () => {
    const app = createApp();
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ ok: true });
  });

  it('retorna contrato da api', async () => {
    const app = createApp();
    const response = await request(app).get('/api/contracts');
    expect(response.status).toBe(200);
    expect(response.body.version).toBe('2.0.0');
    expect(response.body.auth.login.path).toBe('/api/auth/login');
  });

  it('lista vocabulary com filtros', async () => {
    mockPrisma.vocabulary.findMany.mockResolvedValue([{ id: 1, word: 'hello' }]);
    const app = createApp();
    const response = await request(app).get('/api/vocabulary?month=1&level=basico&category=cotidiano&search=ola');
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(mockPrisma.vocabulary.findMany).toHaveBeenCalledWith({
      where: {
        month: 1,
        level: 'basico',
        category: 'cotidiano',
        OR: [
          { word: { contains: 'ola', mode: 'insensitive' } },
          { definition: { contains: 'ola', mode: 'insensitive' } },
        ],
      },
      orderBy: [{ month: 'asc' }, { word: 'asc' }],
    });
  });

  it('lista phrasal verbs', async () => {
    mockPrisma.phrasalVerb.findMany.mockResolvedValue([{ id: 1, phrasal: 'get up' }]);
    const app = createApp();
    const response = await request(app).get('/api/phrasal-verbs?month=2');
    expect(response.status).toBe(200);
    expect(response.body[0].phrasal).toBe('get up');
  });

  it('lista songs e busca por slug', async () => {
    mockPrisma.song.findMany.mockResolvedValue([{ id: 1, title: 'Song A' }]);
    mockPrisma.song.findUnique.mockResolvedValue({ id: 2, slug: 'song-b' });
    mockPrisma.songLyricLine.groupBy.mockResolvedValue([{ songId: 1, _count: { songId: 3 } }]);
    mockPrisma.songLyricLine.count.mockResolvedValue(3);
    const app = createApp();
    const listResponse = await request(app).get('/api/songs?month=1');
    const slugResponse = await request(app).get('/api/songs?slug=song-b');
    expect(listResponse.status).toBe(200);
    expect(slugResponse.status).toBe(200);
    expect(slugResponse.body.slug).toBe('song-b');
    expect(listResponse.body[0].hasLyrics).toBe(true);
  });

  it('retorna lyrics por musica', async () => {
    mockPrisma.song.findUnique.mockResolvedValue({ id: 1, title: 'Song A', artist: 'Artist A', youtubeId: 'abc123xyz00' });
    mockPrisma.songLyricLine.findMany.mockResolvedValue([
      { id: 1, lineIndex: 0, startMs: 0, endMs: 1500, text: 'Hello', translation: '' },
    ]);
    const app = createApp();
    const response = await request(app).get('/api/songs/1/lyrics');
    expect(response.status).toBe(200);
    expect(response.body.song.id).toBe(1);
    expect(response.body.total).toBe(1);
  });

  it('traduz frase com cache miss', async () => {
    const app = createApp();
    const response = await request(app).post('/api/translate').send({
      phrase: 'love',
      context: 'I love you',
    });
    expect(response.status).toBe(200);
    expect(response.body.fromCache).toBe(false);
    expect(mockTranslateWithContext).toHaveBeenCalledTimes(1);
  });

  it('lista videos, grammar, podcasts e expressions', async () => {
    mockPrisma.video.findMany.mockResolvedValue([{ id: 1, title: 'Video' }]);
    mockPrisma.grammarTip.findMany.mockResolvedValue([{ id: 1, title: 'Tip' }]);
    mockPrisma.podcast.findMany.mockResolvedValue([{ id: 1, name: 'Podcast' }]);
    mockPrisma.expression.findMany.mockResolvedValue([{ id: 1, expression: 'piece of cake' }]);
    const app = createApp();
    const [videos, grammar, podcasts, expressions] = await Promise.all([
      request(app).get('/api/videos?month=1&category=business&level=intermediario'),
      request(app).get('/api/grammar?month=1&category=verbs'),
      request(app).get('/api/podcasts?month=1&level=basico'),
      request(app).get('/api/expressions?month=1&category=daily'),
    ]);
    expect(videos.status).toBe(200);
    expect(grammar.status).toBe(200);
    expect(podcasts.status).toBe(200);
    expect(expressions.status).toBe(200);
  });

  it('retorna stats agregados', async () => {
    const app = createApp();
    const response = await request(app).get('/api/stats');
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      vocabulary: 1,
      phrasalVerbs: 2,
      songs: 3,
      videos: 4,
      grammarTips: 5,
      podcasts: 6,
      expressions: 7,
      oxfordWords: 1,
      collocations: 1,
      collocationExercises: 1,
      sentenceExercises: 1,
      total: 32,
    });
  });

  it('retorna erro para month invalido', async () => {
    const app = createApp();
    const response = await request(app).get('/api/videos?month=9');
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'month deve estar entre 1 e 6', code: 'HTTP_400' });
  });
});
