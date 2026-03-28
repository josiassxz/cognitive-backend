import { describe, expect, it } from 'vitest';
import {
  assertContentType,
  getStats,
  getTypeOrderBy,
  normalizeLimit,
  normalizePage,
  parseMonth,
} from '../src/services/content-service';

describe('content-service', () => {
  it('normaliza paginacao corretamente', () => {
    expect(normalizePage(undefined)).toBe(1);
    expect(normalizePage('0')).toBe(1);
    expect(normalizePage('3')).toBe(3);

    expect(normalizeLimit(undefined)).toBe(50);
    expect(normalizeLimit('0')).toBe(1);
    expect(normalizeLimit('300')).toBe(100);
    expect(normalizeLimit('25')).toBe(25);
  });

  it('valida mes entre 1 e 6', () => {
    expect(parseMonth(undefined)).toBeUndefined();
    expect(parseMonth('1')).toBe(1);
    expect(parseMonth('6')).toBe(6);
    expect(() => parseMonth('0')).toThrowError('month deve estar entre 1 e 6');
    expect(() => parseMonth('7')).toThrowError('month deve estar entre 1 e 6');
  });

  it('valida tipo de conteudo', () => {
    expect(assertContentType('videos')).toBe('videos');
    expect(() => assertContentType('invalid')).toThrowError('Tipo invalido');
  });

  it('retorna orderBy esperado por tipo', () => {
    expect(getTypeOrderBy('vocabulary')).toEqual([{ month: 'asc' }, { word: 'asc' }]);
    expect(getTypeOrderBy('songs')).toEqual([{ month: 'asc' }, { title: 'asc' }]);
  });

  it('calcula stats consolidados', async () => {
    const prisma = {
      vocabulary: { count: async () => 10 },
      phrasalVerb: { count: async () => 5 },
      song: { count: async () => 4 },
      video: { count: async () => 8 },
      grammarTip: { count: async () => 6 },
      podcast: { count: async () => 7 },
      expression: { count: async () => 9 },
    };

    const stats = await getStats(prisma as any);

    expect(stats).toEqual({
      vocabulary: 10,
      phrasalVerbs: 5,
      songs: 4,
      videos: 8,
      grammarTips: 6,
      podcasts: 7,
      expressions: 9,
      total: 49,
    });
  });
});
