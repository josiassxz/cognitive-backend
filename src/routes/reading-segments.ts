// Trechos didáticos ("Linha a linha") e progresso individual por trecho.
//
//   GET  /api/reading-lab/:id/segments?offset=&limit=       trechos paginados + progresso
//   PUT  /api/reading-lab/:id/segments/:key/progress        marca/desmarca conclusão (idempotente)
//   GET  /api/reading-lab/:id/segments/:key/details         vocabulário e destaques do trecho
//   PUT  /api/reading-lab/:id/listening                     posição de escuta (retomar de onde parou)
//   GET  /api/reading-lab/continue-listening                últimos conteúdos em andamento do usuário
//
// Conteúdos antigos (TTS) não têm segmentKey; suas frases são servidas com a chave
// "sent_<id>" para que o mesmo player funcione com eles.
import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { getPlayableStorageUrl } from '../lib/storage';
import { XP_CONFIG } from '../lib/xp';
import { authMiddleware } from '../middleware/auth';
import { asyncHandler } from '../utils/async-handler';
import { HttpError } from '../utils/http-error';
import { CUSTOM_DECK_SOURCE } from '../lib/study/custom-decks';

// sourceType dos baralhos criados pelo próprio usuário (privados, fora da biblioteca).
export { CUSTOM_DECK_SOURCE };

export const readingSegmentsRouter = Router();

const LEGACY_PREFIX = 'sent_';

export function publicSegmentKey(row: { id: number; segmentKey: string | null }): string {
  return row.segmentKey ?? `${LEGACY_PREFIX}${row.id}`;
}

function sentenceWhere(contentId: number, key: string) {
  if (key.startsWith(LEGACY_PREFIX)) {
    const id = Number(key.slice(LEGACY_PREFIX.length));
    if (!Number.isInteger(id) || id <= 0) throw new HttpError(404, 'Trecho não encontrado');
    return { id, contentId, segmentKey: null };
  }
  return { contentId, segmentKey: key };
}

type HighlightRow = { wordKeys?: string[]; pt?: { start: number; end: number; text: string } };


/**
 * Conteúdo visível para o usuário: publicado, ou qualquer status para admin.
 * Baralhos criados pelo usuário só são visíveis ao dono, e só quando `userId` é informado
 * (rotas de estudo); nas rotas de leitura eles não existem.
 */
export async function loadVisibleContent(contentId: number, role: 'user' | 'admin' | undefined, userId?: string) {
  const content = await prisma.readingContent.findUnique({
    where: { id: contentId },
    select: {
      id: true, title: true, author: true, description: true, coverUrl: true, audioUrl: true, audioDurationMs: true,
      cefrLevel: true, wordCount: true, sourceType: true, language: true, publishStatus: true, qualityStatus: true,
      translationStatus: true, editVersion: true, contentKey: true, coverPalette: true, libraryMeta: true, userId: true,
    },
  });
  if (content?.sourceType === CUSTOM_DECK_SOURCE) {
    if (!userId || content.userId !== userId) throw new HttpError(404, 'Conteúdo não encontrado');
    return content;
  }
  if (!content || (content.publishStatus !== 'published' && role !== 'admin')) {
    throw new HttpError(404, 'Conteúdo não encontrado');
  }
  return content;
}

async function progressSummary(userId: string, contentId: number) {
  const [rows, legacyTotal] = await Promise.all([
    prisma.userSegmentProgress.findMany({
      where: { userId, contentId, orphanedAt: null },
      select: { segmentKey: true },
    }),
    prisma.readingSentence.count({ where: { contentId } }),
  ]);
  return { completedIds: rows.map((row) => row.segmentKey), completedCount: rows.length, total: legacyTotal };
}

readingSegmentsRouter.get(
  '/:id/segments',
  authMiddleware,
  asyncHandler(async (req, res) => {
    const contentId = z.coerce.number().int().positive().parse(req.params.id);
    const offset = z.coerce.number().int().min(0).default(0).parse(req.query.offset ?? 0);
    const limit = z.coerce.number().int().min(1).max(200).default(100).parse(req.query.limit ?? 100);
    const content = await loadVisibleContent(contentId, req.userRole);
    const [rows, progress, listening] = await Promise.all([
      prisma.readingSentence.findMany({
        where: { contentId },
        orderBy: { sentenceIndex: 'asc' },
        skip: offset,
        take: limit,
        include: { wordTimestamps: { orderBy: { wordIndex: 'asc' } } },
      }),
      progressSummary(req.userId as string, contentId),
      prisma.userReadingProgress.findUnique({
        where: { userId_contentId: { userId: req.userId as string, contentId } },
        select: { positionMs: true, timeSpentMs: true, lastOpenedAt: true },
      }),
    ]);
    const segments = rows.map((row) => {
      const wordIndexByKey = new Map(row.wordTimestamps.map((word, index) => [word.wordKey, index]));
      const highlights = (Array.isArray(row.highlights) ? (row.highlights as HighlightRow[]) : [])
        .map((highlight) => ({
          enWordIndexes: (highlight.wordKeys ?? [])
            .map((key) => wordIndexByKey.get(key))
            .filter((index): index is number => index !== undefined),
          pt: highlight.pt,
        }))
        .filter((highlight) => highlight.enWordIndexes.length > 0 && highlight.pt);
      return {
        id: publicSegmentKey(row),
        index: row.sentenceIndex,
        text: row.text,
        translation: row.translation,
        startMs: row.startMs,
        endMs: row.endMs,
        playStartMs: row.playStartMs ?? row.startMs,
        playEndMs: row.playEndMs ?? row.endMs,
        quality: row.quality,
        highlights,
        words: row.wordTimestamps.map((word) => ({
          word: word.word,
          startMs: word.startMs,
          endMs: word.endMs,
          // "stale" = texto editado depois do alinhamento; não usar para destaque sincronizado.
          synced: word.timeSource !== 'stale',
        })),
      };
    });
    res.json({
      content: {
        ...content,
        coverUrl: await getPlayableStorageUrl(content.coverUrl),
        audioUrl: await getPlayableStorageUrl(content.audioUrl),
      },
      total: progress.total,
      offset,
      limit,
      segments,
      progress,
      listening: listening ?? { positionMs: 0, timeSpentMs: 0, lastOpenedAt: null },
    });
  }),
);

readingSegmentsRouter.put(
  '/:id/segments/:key/progress',
  authMiddleware,
  asyncHandler(async (req, res) => {
    const userId = req.userId as string;
    const contentId = z.coerce.number().int().positive().parse(req.params.id);
    const key = z.string().min(1).max(64).parse(req.params.key);
    const { completed } = z.object({ completed: z.boolean() }).parse(req.body);
    await loadVisibleContent(contentId, req.userRole);
    const sentence = await prisma.readingSentence.findFirst({
      where: sentenceWhere(contentId, key),
      select: { id: true, sentenceIndex: true },
    });
    if (!sentence) throw new HttpError(404, 'Trecho não encontrado');

    if (completed) {
      // Idempotente: marcar duas vezes (ou em dois dispositivos) não duplica nada.
      await prisma.userSegmentProgress.upsert({
        where: { userId_segmentKey: { userId, segmentKey: key } },
        create: { userId, contentId, segmentKey: key },
        update: { orphanedAt: null },
      });
      // Frase concluída vira cartão no baralho (única forma de entrar no baralho).
      await prisma.userStudyCard.upsert({
        where: { userId_segmentKey: { userId, segmentKey: key } },
        create: { userId, contentId, segmentKey: key, queue: 'new', manual: true, position: sentence.sentenceIndex },
        update: {},
      });
    } else {
      await prisma.userSegmentProgress.deleteMany({ where: { userId, segmentKey: key } });
      // Desmarcou antes de estudar o cartão: sai do baralho. Já estudado: mantém o histórico.
      await prisma.userStudyCard.deleteMany({ where: { userId, segmentKey: key, reps: 0, queue: 'new' } });
    }
    const progress = await progressSummary(userId, contentId);

    // Compatibilidade com UserReadingProgress (progresso geral usado pelo catálogo).
    const allDone = progress.total > 0 && progress.completedCount >= progress.total;
    const previous = await prisma.userReadingProgress.findUnique({
      where: { userId_contentId: { userId, contentId } },
      select: { completed: true, lastSentence: true },
    });
    await prisma.userReadingProgress.upsert({
      where: { userId_contentId: { userId, contentId } },
      create: {
        userId,
        contentId,
        lastSentence: completed ? sentence.sentenceIndex : 0,
        completed: allDone,
        completedAt: allDone ? new Date() : null,
      },
      update: {
        lastSentence: completed ? Math.max(previous?.lastSentence ?? 0, sentence.sentenceIndex) : undefined,
        // Uma vez concluído, permanece concluído (desmarcar uma linha não revoga XP já dado).
        completed: previous?.completed ? true : allDone,
        completedAt: allDone && !previous?.completed ? new Date() : undefined,
      },
    });
    if (allDone && !previous?.completed) {
      // XP de conclusão só uma vez por conteúdo.
      const detail = `reading_complete:${contentId}`;
      const already = await prisma.xpLog.findFirst({ where: { userId, source: 'reading', detail }, select: { id: true } });
      if (!already) {
        await prisma.xpLog.create({ data: { userId, amount: XP_CONFIG.reading_complete, source: 'reading', detail } });
      }
    }
    res.json({ segmentId: key, completed, progress });
  }),
);

readingSegmentsRouter.get(
  '/:id/segments/:key/details',
  authMiddleware,
  asyncHandler(async (req, res) => {
    const contentId = z.coerce.number().int().positive().parse(req.params.id);
    const key = z.string().min(1).max(64).parse(req.params.key);
    await loadVisibleContent(contentId, req.userRole);
    const row = await prisma.readingSentence.findFirst({
      where: sentenceWhere(contentId, key),
      include: { wordTimestamps: { orderBy: { wordIndex: 'asc' } } },
    });
    if (!row) throw new HttpError(404, 'Trecho não encontrado');

    const normalized = row.wordTimestamps.map((word) => word.word.toLowerCase().replace(/[^a-z'-]/g, ''));
    const lookup = [...new Set(normalized.filter((word) => word.length > 2))];
    const oxford = lookup.length
      ? await prisma.oxfordWord.findMany({
          where: { word: { in: lookup } },
          select: { word: true, pos: true, cefrLevel: true, exampleSentence: true },
          orderBy: [{ word: 'asc' }, { pos: 'asc' }],
        })
      : [];
    const byWord = new Map<string, { pos: string[]; cefrLevel: string; example: string }>();
    for (const entry of oxford) {
      const current = byWord.get(entry.word);
      if (current) current.pos.push(entry.pos);
      else byWord.set(entry.word, { pos: [entry.pos], cefrLevel: entry.cefrLevel, example: entry.exampleSentence });
    }
    const wordKeyIndex = new Map(row.wordTimestamps.map((word, index) => [word.wordKey, index]));
    const expressions = (Array.isArray(row.highlights) ? (row.highlights as HighlightRow[]) : [])
      .map((highlight) => {
        const indexes = (highlight.wordKeys ?? [])
          .map((wordKey) => wordKeyIndex.get(wordKey))
          .filter((index): index is number => index !== undefined);
        return {
          en: indexes.map((index) => row.wordTimestamps[index].word).join(' ').replace(/[.,;:!?"]+$/g, ''),
          pt: highlight.pt?.text ?? '',
        };
      })
      .filter((item) => item.en && item.pt);
    const seen = new Set<string>();
    const vocabulary = normalized
      .filter((word) => byWord.has(word) && !seen.has(word) && seen.add(word))
      .map((word) => ({ word, ...byWord.get(word)! }));
    res.json({
      id: key,
      text: row.text,
      translation: row.translation,
      expressions,
      // Palavras do trecho que constam na lista Oxford (nível CEFR da palavra, não do texto).
      vocabulary,
      words: row.wordTimestamps.map((word) => ({ word: word.word, startMs: word.startMs, endMs: word.endMs })),
      note: row.note,
    });
  }),
);

readingSegmentsRouter.put(
  '/:id/listening',
  authMiddleware,
  asyncHandler(async (req, res) => {
    const userId = req.userId as string;
    const contentId = z.coerce.number().int().positive().parse(req.params.id);
    const input = z
      .object({
        positionMs: z.number().int().min(0),
        segmentIndex: z.number().int().min(0).optional(),
        // Tempo efetivamente ouvido desde o último envio (limitado para não inflar estatística).
        listenedMs: z.number().int().min(0).max(120_000).default(0),
      })
      .parse(req.body);
    const content = await loadVisibleContent(contentId, req.userRole);
    const positionMs = Math.min(input.positionMs, content.audioDurationMs || input.positionMs);
    const now = new Date();
    const progress = await prisma.userReadingProgress.upsert({
      where: { userId_contentId: { userId, contentId } },
      create: {
        userId,
        contentId,
        positionMs,
        lastOpenedAt: now,
        lastSentence: input.segmentIndex ?? 0,
        timeSpentMs: input.listenedMs,
      },
      update: {
        positionMs,
        lastOpenedAt: now,
        ...(input.segmentIndex !== undefined ? { lastSentence: input.segmentIndex } : {}),
        timeSpentMs: { increment: input.listenedMs },
      },
      select: { positionMs: true, timeSpentMs: true, completed: true },
    });
    res.json(progress);
  }),
);

readingSegmentsRouter.get(
  '/continue-listening',
  authMiddleware,
  asyncHandler(async (req, res) => {
    const userId = req.userId as string;
    const limit = z.coerce.number().int().min(1).max(20).default(8).parse(req.query.limit ?? 8);
    const rows = await prisma.userReadingProgress.findMany({
      where: { userId, lastOpenedAt: { not: null } },
      orderBy: { lastOpenedAt: 'desc' },
      take: limit * 2,
      select: { contentId: true, positionMs: true, completed: true, lastOpenedAt: true, timeSpentMs: true },
    });
    const contents = await prisma.readingContent.findMany({
      where: {
        id: { in: rows.map((row) => row.contentId) },
        sourceType: 'reconstructed_audio',
        ...(req.userRole === 'admin' ? {} : { publishStatus: 'published' }),
      },
      select: {
        id: true, title: true, author: true, coverUrl: true, audioDurationMs: true, cefrLevel: true,
        coverPalette: true, publishStatus: true, translationStatus: true,
      },
    });
    const byId = new Map(contents.map((content) => [content.id, content]));
    const items = [];
    for (const row of rows) {
      const content = byId.get(row.contentId);
      if (!content) continue;
      const duration = content.audioDurationMs || 1;
      items.push({
        ...content,
        coverUrl: await getPlayableStorageUrl(content.coverUrl),
        positionMs: row.positionMs,
        progressPercent: row.completed ? 100 : Math.min(100, Math.round((row.positionMs / duration) * 100)),
        completed: row.completed,
        lastOpenedAt: row.lastOpenedAt,
      });
      if (items.length >= limit) break;
    }
    res.json({ items });
  }),
);
