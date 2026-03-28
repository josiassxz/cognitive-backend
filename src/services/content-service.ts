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
]);

export type ContentType = z.infer<typeof contentTypeSchema>;

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
  const [vocabulary, phrasalVerbs, songs, videos, grammarTips, podcasts, expressions] = await Promise.all([
    prisma.vocabulary.count(),
    prisma.phrasalVerb.count(),
    prisma.song.count(),
    prisma.video.count(),
    prisma.grammarTip.count(),
    prisma.podcast.count(),
    prisma.expression.count(),
  ]);

  return {
    vocabulary,
    phrasalVerbs,
    songs,
    videos,
    grammarTips,
    podcasts,
    expressions,
    total: vocabulary + phrasalVerbs + songs + videos + grammarTips + podcasts + expressions,
  };
}
