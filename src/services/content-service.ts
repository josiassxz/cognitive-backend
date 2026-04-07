import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { HttpError } from '../utils/http-error';
import { toInt } from '../utils/pagination';

export const contentTypeSchema = z.enum([
  'vocabulary',
  'phrasal-verbs',
  'videos',
  'grammar',
  'podcasts',
  'expressions',
  'songs',
  'song-lyrics',
]);

export type ContentType = z.infer<typeof contentTypeSchema>;

export const CEFR_LEVELS = ['a1', 'a2', 'b1', 'b2', 'c1', 'c2'] as const;
export type CefrLevel = (typeof CEFR_LEVELS)[number];

export function normalizePage(input: unknown): number {
  return toInt(input, 1, { min: 1, max: 999999 });
}

export function normalizeLimit(input: unknown): number {
  return toInt(input, 50, { min: 1, max: 100 });
}

export function parseMonth(input: unknown): number | undefined {
  if (input === undefined || input === null || input === '') {
    return undefined;
  }
  const month = toInt(input, -1);
  if (month < 1 || month > 6) {
    throw new HttpError(400, 'month deve estar entre 1 e 6');
  }
  return month;
}

export function parseCefrLevel(input: unknown): CefrLevel | undefined {
  if (input === undefined || input === null || input === '') {
    return undefined;
  }
  const value = String(input).trim().toLowerCase();
  if (CEFR_LEVELS.includes(value as CefrLevel)) {
    return value as CefrLevel;
  }
  throw new HttpError(400, 'cefrLevel deve ser um destes valores: a1, a2, b1, b2, c1, c2');
}

export function mapCefrToMonth(cefrLevel: CefrLevel): number {
  switch (cefrLevel) {
    case 'a1':
      return 1;
    case 'a2':
      return 2;
    case 'b1':
      return 3;
    case 'b2':
      return 4;
    case 'c1':
      return 5;
    case 'c2':
      return 6;
  }
}

export function getTypeOrderBy(type: ContentType): Record<string, 'asc'>[] {
  switch (type) {
    case 'vocabulary':
      return [{ month: 'asc' }, { word: 'asc' }];
    case 'phrasal-verbs':
      return [{ month: 'asc' }, { phrasal: 'asc' }];
    case 'videos':
      return [{ month: 'asc' }, { title: 'asc' }];
    case 'grammar':
      return [{ month: 'asc' }, { title: 'asc' }];
    case 'podcasts':
      return [{ month: 'asc' }, { name: 'asc' }];
    case 'expressions':
      return [{ month: 'asc' }, { expression: 'asc' }];
    case 'songs':
      return [{ month: 'asc' }, { title: 'asc' }];
    case 'song-lyrics':
      return [{ songId: 'asc' }, { lineIndex: 'asc' }];
  }
}

export function assertContentType(value: unknown): ContentType {
  const parsed = contentTypeSchema.safeParse(value);
  if (!parsed.success) {
    throw new HttpError(400, 'Tipo invalido');
  }
  return parsed.data;
}

export async function getStats(prisma: PrismaClient) {
  const [
    vocabulary,
    phrasalVerbs,
    songs,
    videos,
    grammarTips,
    podcasts,
    expressions,
    oxfordWords,
    sentenceExercises,
  ] = await Promise.all([
    prisma.vocabulary.count(),
    prisma.phrasalVerb.count(),
    prisma.song.count(),
    prisma.video.count(),
    prisma.grammarTip.count(),
    prisma.podcast.count(),
    prisma.expression.count(),
    prisma.oxfordWord.count(),
    prisma.sentenceExercise.count(),
  ]);

  return {
    vocabulary,
    phrasalVerbs,
    songs,
    videos,
    grammarTips,
    podcasts,
    expressions,
    oxfordWords,
    sentenceExercises,
    total:
      vocabulary +
      phrasalVerbs +
      songs +
      videos +
      grammarTips +
      podcasts +
      expressions +
      oxfordWords +
      sentenceExercises,
  };
}
