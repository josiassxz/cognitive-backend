import { createHash } from 'node:crypto';
import { unlink } from 'node:fs/promises';
import { Router } from 'express';
import { z } from 'zod';
import { synthesizeWithAzure } from '../lib/azure-tts';
import { synthesizeWithPolly } from '../lib/polly-tts';
import { prisma } from '../lib/prisma';
import { uploadToStorage } from '../lib/storage';
import { XP_CONFIG } from '../lib/xp';
import { authMiddleware } from '../middleware/auth';
import { asyncHandler } from '../utils/async-handler';
import { HttpError } from '../utils/http-error';

export const readingLabRouter = Router();

const cefrMap: Record<string, number> = {
  a1: 1,
  a2: 2,
  b1: 3,
  b2: 4,
  c1: 5,
};

function mapReadingLabProcessError(error: unknown): HttpError {
  const message = error instanceof Error ? error.message : String(error);
  const lower = message.toLowerCase();
  if (lower.includes('azure speech credentials')) {
    return new HttpError(503, 'Azure TTS nao configurado');
  }
  if (lower.includes('could not load credentials') || lower.includes('credential') || lower.includes('security token')) {
    return new HttpError(503, 'AWS nao configurado para fallback TTS ou upload');
  }
  if (lower.includes('s3') || lower.includes('putobject') || lower.includes('nosuchbucket') || lower.includes('accessdenied')) {
    return new HttpError(503, 'Falha ao enviar audio para storage');
  }
  if (lower.includes('azure tts falhou') || lower.includes('azure tts error')) {
    return new HttpError(503, 'Falha no provedor de TTS');
  }
  return new HttpError(500, 'Falha ao processar texto para TTS');
}

function segmentIntoSentences(text: string) {
  return text
    .replace(/\r/g, ' ')
    .replace(/\n+/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/([.!?])\s+/g, '$1\n')
    .split('\n')
    .map((part) => part.trim())
    .filter(Boolean);
}

async function detectCefrLevel(text: string): Promise<'a1' | 'a2' | 'b1' | 'b2' | 'c1'> {
  const words = text.split(/\s+/).filter(Boolean);
  const wordCount = words.length || 1;
  const avgWordLength = words.reduce((sum, word) => sum + word.length, 0) / wordCount;
  const sentenceCount = (text.match(/[.!?]/g) || []).length || 1;
  const avgSentenceLength = wordCount / sentenceCount;
  if (avgWordLength < 4.5 && avgSentenceLength < 10) return 'a1';
  if (avgWordLength < 5.0 && avgSentenceLength < 14) return 'a2';
  if (avgWordLength < 5.5 && avgSentenceLength < 18) return 'b1';
  if (avgWordLength < 6.0 && avgSentenceLength < 22) return 'b2';
  return 'c1';
}

readingLabRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    const cefrLevel = typeof req.query.cefrLevel === 'string' ? req.query.cefrLevel : undefined;
    const month = req.query.month ? z.coerce.number().int().min(1).max(12).parse(req.query.month) : undefined;
    const category = typeof req.query.category === 'string' ? req.query.category : undefined;
    const limit = z.coerce.number().int().min(1).max(100).default(20).parse(req.query.limit ?? 20);
    const offset = z.coerce.number().int().min(0).default(0).parse(req.query.offset ?? 0);
    const where: Record<string, unknown> = { isPublic: true };
    if (cefrLevel) where.cefrLevel = cefrLevel;
    if (month) where.month = month;
    if (category) where.category = category;
    const [items, total] = await Promise.all([
      prisma.readingContent.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: offset,
        take: limit,
        select: {
          id: true,
          title: true,
          slug: true,
          cefrLevel: true,
          wordCount: true,
          estimatedTimeMs: true,
          audioUrl: true,
          audioDurationMs: true,
          category: true,
          month: true,
          sourceType: true,
          createdAt: true,
        },
      }),
      prisma.readingContent.count({ where }),
    ]);
    res.json({ items, total, limit, offset });
  }),
);

readingLabRouter.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const id = z.coerce.number().int().positive().parse(req.params.id);
    const content = await prisma.readingContent.findUnique({
      where: { id },
      include: {
        sentences: {
          orderBy: { sentenceIndex: 'asc' },
          include: { wordTimestamps: { orderBy: { wordIndex: 'asc' } } },
        },
      },
    });
    if (!content) throw new HttpError(404, 'Conteúdo não encontrado');
    res.json(content);
  }),
);

readingLabRouter.post(
  '/process',
  authMiddleware,
  asyncHandler(async (req, res) => {
    const userId = req.userId;
    if (!userId) throw new HttpError(401, 'Não autorizado');
    const input = z
      .object({
        text: z.string().min(10).max(50000),
        title: z.string().min(1).max(200),
        cefrLevel: z.enum(['a1', 'a2', 'b1', 'b2', 'c1']).optional(),
        category: z.string().min(1).max(50).optional(),
        voice: z.string().min(1).max(120).optional(),
      })
      .parse(req.body);
    const normalizedText = input.text.trim();
    const textHash = createHash('sha256').update(normalizedText).digest('hex');
    const cached = await prisma.readingContent.findUnique({
      where: { textHash },
      include: {
        sentences: {
          orderBy: { sentenceIndex: 'asc' },
          include: { wordTimestamps: { orderBy: { wordIndex: 'asc' } } },
        },
      },
    });
    if (cached) {
      res.json({ ...cached, fromCache: true });
      return;
    }
    const cefrLevel = input.cefrLevel ?? (await detectCefrLevel(normalizedText));
    const month = cefrMap[cefrLevel] ?? 3;
    const sentences = segmentIntoSentences(normalizedText);
    if (sentences.length === 0) {
      throw new HttpError(400, 'Texto vazio ou inválido');
    }
    const slugBase = input.title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    const slug = `${slugBase || 'reading'}-${Date.now().toString(36)}`;
    const tmpAudioPath = `/tmp/reading-${slug}.mp3`;
    const selectedVoice = input.voice ?? 'en-US-JennyNeural';
    try {
      let ttsProvider: 'azure' | 'polly' = 'azure';
      let ttsResult;
      try {
        ttsResult = await synthesizeWithAzure(sentences, tmpAudioPath, selectedVoice);
      } catch {
        ttsResult = await synthesizeWithPolly(sentences, tmpAudioPath);
        ttsProvider = 'polly';
      }
      const audioUrl = await uploadToStorage(tmpAudioPath, `reading/${slug}.mp3`);
      const content = await prisma.readingContent.create({
        data: {
          title: input.title,
          slug,
          textHash,
          fullText: normalizedText,
          cefrLevel,
          wordCount: normalizedText.split(/\s+/).filter(Boolean).length,
          estimatedTimeMs: ttsResult.durationMs,
          audioUrl,
          audioDurationMs: ttsResult.durationMs,
          ttsProvider,
          ttsVoice: selectedVoice,
          sourceType: 'user_import',
          userId,
          month,
          category: input.category ?? 'general',
        },
      });
      for (const sentence of ttsResult.sentences) {
        const savedSentence = await prisma.readingSentence.create({
          data: {
            contentId: content.id,
            sentenceIndex: sentence.sentenceIndex,
            text: sentence.text,
            startMs: sentence.startMs,
            endMs: sentence.endMs,
          },
        });
        if (sentence.words.length > 0) {
          await prisma.readingWordTimestamp.createMany({
            data: sentence.words.map((word, wordIndex) => ({
              sentenceId: savedSentence.id,
              wordIndex,
              word: word.word,
              startMs: word.startMs,
              endMs: word.endMs,
            })),
          });
        }
      }
      await prisma.xpLog.create({
        data: {
          userId,
          amount: XP_CONFIG.reading_text_imported,
          source: 'reading',
          detail: `reading_imported:${content.id}`,
        },
      });
      const result = await prisma.readingContent.findUnique({
        where: { id: content.id },
        include: {
          sentences: {
            orderBy: { sentenceIndex: 'asc' },
            include: { wordTimestamps: { orderBy: { wordIndex: 'asc' } } },
          },
        },
      });
      res.json({ ...result, fromCache: false });
    } catch (error) {
      throw mapReadingLabProcessError(error);
    } finally {
      await unlink(tmpAudioPath).catch(() => undefined);
    }
  }),
);

readingLabRouter.post(
  '/:id/progress',
  authMiddleware,
  asyncHandler(async (req, res) => {
    const userId = req.userId;
    if (!userId) throw new HttpError(401, 'Não autorizado');
    const contentId = z.coerce.number().int().positive().parse(req.params.id);
    const input = z
      .object({
        lastSentence: z.number().int().min(0),
        completed: z.boolean().optional(),
        timeSpentMs: z.number().int().min(0).optional(),
      })
      .parse(req.body);
    const progress = await prisma.userReadingProgress.upsert({
      where: { userId_contentId: { userId, contentId } },
      create: {
        userId,
        contentId,
        lastSentence: input.lastSentence,
        completed: input.completed ?? false,
        completedAt: input.completed ? new Date() : null,
        timeSpentMs: input.timeSpentMs ?? 0,
      },
      update: {
        lastSentence: input.lastSentence,
        completed: input.completed ?? undefined,
        completedAt: input.completed ? new Date() : undefined,
        timeSpentMs: input.timeSpentMs ? { increment: input.timeSpentMs } : undefined,
      },
    });
    if (input.completed) {
      await prisma.xpLog.create({
        data: {
          userId,
          amount: XP_CONFIG.reading_complete,
          source: 'reading',
          detail: `reading_complete:${contentId}`,
        },
      });
    }
    res.json({ success: true, progress });
  }),
);
