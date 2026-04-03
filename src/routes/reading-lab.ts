import { createHash } from 'node:crypto';
import { unlink } from 'node:fs/promises';
import { Router } from 'express';
import multer from 'multer';
import { z } from 'zod';
import { env } from '../config/env';
import { synthesizeWithAzure } from '../lib/azure-tts';
import { extractBookContentFromUpload, type ExtractedEpubReaderPayload } from '../lib/book-import';
import { synthesizeWithPolly } from '../lib/polly-tts';
import { prisma } from '../lib/prisma';
import { getPlayableStorageUrl, uploadToStorage } from '../lib/storage';
import { XP_CONFIG } from '../lib/xp';
import { authMiddleware } from '../middleware/auth';
import { asyncHandler } from '../utils/async-handler';
import { HttpError } from '../utils/http-error';

export const readingLabRouter = Router();
const readingBookUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 30 * 1024 * 1024 },
});

type CefrLevel = 'a1' | 'a2' | 'b1' | 'b2' | 'c1' | 'c2';

const cefrMap: Record<string, number> = {
  a1: 1,
  a2: 2,
  b1: 3,
  b2: 4,
  c1: 5,
  c2: 6,
};

type StoredReaderPayload = {
  kind: 'epub_reader_payload';
  version: 1;
  payload: ExtractedEpubReaderPayload;
};

function serializeReaderPayload(payload: ExtractedEpubReaderPayload): string {
  const wrapper: StoredReaderPayload = {
    kind: 'epub_reader_payload',
    version: 1,
    payload,
  };
  return JSON.stringify(wrapper);
}

function parseReaderPayload(rawValue: string): ExtractedEpubReaderPayload | null {
  if (!rawValue) return null;
  try {
    const parsed = JSON.parse(rawValue) as {
      kind?: unknown;
      version?: unknown;
      payload?: {
        format?: unknown;
        version?: unknown;
        documents?: unknown;
      };
    };
    if (parsed.kind !== 'epub_reader_payload' || parsed.version !== 1) return null;
    const payload = parsed.payload;
    if (!payload || payload.format !== 'epub' || payload.version !== 1 || !Array.isArray(payload.documents)) {
      return null;
    }
    const documents = payload.documents
      .map((document) => {
        if (!document || typeof document !== 'object') return null;
        const candidate = document as Record<string, unknown>;
        const id = typeof candidate.id === 'string' ? candidate.id.trim() : '';
        const href = typeof candidate.href === 'string' ? candidate.href.trim() : '';
        const title = typeof candidate.title === 'string' ? candidate.title.trim() : '';
        const html = typeof candidate.html === 'string' ? candidate.html : '';
        const text = typeof candidate.text === 'string' ? candidate.text : '';
        const chapterIndex =
          typeof candidate.chapterIndex === 'number' && Number.isFinite(candidate.chapterIndex)
            ? Math.max(0, Math.round(candidate.chapterIndex))
            : undefined;
        const sentenceStartIndex =
          typeof candidate.sentenceStartIndex === 'number' && Number.isFinite(candidate.sentenceStartIndex)
            ? Math.max(0, Math.round(candidate.sentenceStartIndex))
            : undefined;
        const sentenceEndIndex =
          typeof candidate.sentenceEndIndex === 'number' && Number.isFinite(candidate.sentenceEndIndex)
            ? Math.max(0, Math.round(candidate.sentenceEndIndex))
            : undefined;
        const audioStartMs =
          typeof candidate.audioStartMs === 'number' && Number.isFinite(candidate.audioStartMs)
            ? Math.max(0, Math.round(candidate.audioStartMs))
            : undefined;
        const audioEndMs =
          typeof candidate.audioEndMs === 'number' && Number.isFinite(candidate.audioEndMs)
            ? Math.max(0, Math.round(candidate.audioEndMs))
            : undefined;
        if (!id || !href || !html) return null;
        return {
          id,
          href,
          title: title || 'Chapter',
          html,
          text,
          ...(chapterIndex !== undefined ? { chapterIndex } : {}),
          ...(sentenceStartIndex !== undefined ? { sentenceStartIndex } : {}),
          ...(sentenceEndIndex !== undefined ? { sentenceEndIndex } : {}),
          ...(audioStartMs !== undefined ? { audioStartMs } : {}),
          ...(audioEndMs !== undefined ? { audioEndMs } : {}),
        };
      })
      .filter((document): document is ExtractedEpubReaderPayload['documents'][number] => Boolean(document));
    if (documents.length === 0) return null;
    return {
      format: 'epub',
      version: 1,
      documents,
    };
  } catch {
    return null;
  }
}

function withReaderPayload<T extends { fullText: string }>(
  content: T,
): T & { reader: ExtractedEpubReaderPayload | null } {
  return {
    ...content,
    reader: parseReaderPayload(content.fullText),
  };
}

function mapReadingLabProcessError(error: unknown): HttpError {
  const message = error instanceof Error ? error.message : String(error);
  const lower = message.toLowerCase();
  const details = env.NODE_ENV === 'development' ? ` | detalhe: ${message}` : '';
  if (lower.includes('azure speech credentials')) {
    return new HttpError(503, `Azure TTS nao configurado${details}`);
  }
  if (lower.includes('could not load credentials') || lower.includes('credential') || lower.includes('security token')) {
    return new HttpError(503, `AWS nao configurado para fallback TTS ou upload${details}`);
  }
  if (lower.includes('polly') || lower.includes('synthesizespeech')) {
    return new HttpError(503, `Falha no fallback TTS (Amazon Polly)${details}`);
  }
  if (lower.includes('s3') || lower.includes('putobject') || lower.includes('nosuchbucket') || lower.includes('accessdenied')) {
    return new HttpError(503, `Falha ao enviar audio para storage${details}`);
  }
  if (lower.includes('azure tts falhou') || lower.includes('azure tts error')) {
    return new HttpError(503, `Falha no provedor de TTS${details}`);
  }
  return new HttpError(500, `Falha ao processar texto para TTS${details}`);
}

function shouldFallbackToPolly(error: unknown): boolean {
  if (!env.READING_TTS_POLLY_FALLBACK_ENABLED) {
    return false;
  }
  const message = error instanceof Error ? error.message : String(error);
  const lower = message.toLowerCase();
  return lower.includes('azure');
}

function segmentIntoSentences(text: string) {
  const normalizedText = text.replace(/\r/g, '\n').trim();
  if (!normalizedText) return [];
  const blocks = normalizedText
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);
  const sentences: string[] = [];
  for (const block of blocks) {
    const line = block
      .split('\n')
      .map((item) => item.trim())
      .filter(Boolean)
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim();
    if (!line) continue;
    const isChapterHeading = /^(chapter|cap[ií]tulo)\s+([a-z0-9ivxlcdm-]+)$/i.test(line);
    const isEndHeading = /^-+\s*the end\s*-+$/i.test(line);
    const isLikelyShortHeading = !/[.!?]$/.test(line) && line.length <= 100 && line.split(/\s+/).length <= 10;
    if (isChapterHeading || isEndHeading || isLikelyShortHeading) {
      sentences.push(line);
      continue;
    }
    const parts = line
      .split(/(?<=[.!?])\s+/)
      .map((part) => part.trim())
      .filter(Boolean);
    if (parts.length === 0) {
      sentences.push(line);
      continue;
    }
    sentences.push(...parts);
  }
  return sentences;
}

async function detectCefrLevel(text: string): Promise<'a1' | 'a2' | 'b1' | 'b2' | 'c1' | 'c2'> {
  const words = text.split(/\s+/).filter(Boolean);
  const wordCount = words.length || 1;
  const avgWordLength = words.reduce((sum, word) => sum + word.length, 0) / wordCount;
  const sentenceCount = (text.match(/[.!?]/g) || []).length || 1;
  const avgSentenceLength = wordCount / sentenceCount;
  if (avgWordLength < 4.5 && avgSentenceLength < 10) return 'a1';
  if (avgWordLength < 5.0 && avgSentenceLength < 14) return 'a2';
  if (avgWordLength < 5.5 && avgSentenceLength < 18) return 'b1';
  if (avgWordLength < 6.0 && avgSentenceLength < 22) return 'b2';
  if (avgWordLength < 6.8 && avgSentenceLength < 28) return 'c1';
  return 'c2';
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function normalizeTags(value: unknown): string[] {
  if (!value) return [];
  const raw =
    Array.isArray(value) ? value : typeof value === 'string' ? value : String(value);
  if (Array.isArray(raw)) {
    return raw.map((item) => String(item).trim()).filter(Boolean);
  }
  const text = raw.trim();
  if (!text) return [];
  const fromJson = text.startsWith('[') && text.endsWith(']');
  if (fromJson) {
    try {
      const parsed = JSON.parse(text);
      if (Array.isArray(parsed)) {
        return parsed.map((item) => String(item).trim()).filter(Boolean);
      }
    } catch {}
  }
  return text
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

const importedBookTailPatterns: RegExp[] = [
  /-\s*the\s+end\s*-/i,
  /hope\s+you\s+have\s+enjoyed\s+the\s+reading!?/i,
  /come\s+back\s+to\s*[`'"“”]?\s*https?:\/\/english-e-books\.net\/?\s*[`'"“”]?\s*to\s+find\s+more\s+fascinating\s+and\s+exciting\s+stories!?/i,
  /\bexcerpt\s+from\b/i,
  /this\s+material\s+may\s+be\s+protected\s+by\s+copyright\.?/i,
];

function sanitizeImportedBookText(rawText: string): { text: string; truncated: boolean } {
  const normalized = rawText.replace(/\r/g, '\n');
  let cutIndex = Number.POSITIVE_INFINITY;
  for (const pattern of importedBookTailPatterns) {
    const match = pattern.exec(normalized);
    if (match && typeof match.index === 'number' && match.index >= 0) {
      cutIndex = Math.min(cutIndex, match.index);
    }
  }
  if (!Number.isFinite(cutIndex)) {
    return { text: normalized.trim(), truncated: false };
  }
  return {
    text: normalized.slice(0, cutIndex).trim(),
    truncated: true,
  };
}

function hasReadableBookContent(text: string): boolean {
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  const letterCount = (text.match(/[a-zA-ZÀ-ÿ]/g) ?? []).length;
  return wordCount >= 5 && letterCount >= 20;
}

async function createReadingContentFromText(params: {
  userId: string;
  text: string;
  title: string;
  cefrLevel?: CefrLevel;
  category?: string;
  voice?: string;
  sourceType: string;
  author?: string;
  description?: string;
  coverUrl?: string;
  tags?: string[];
  sourceFileType?: string;
  sourceFileName?: string;
}) {
  const normalizedText = params.text.trim();
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
    return {
      ...cached,
      reader: null,
      coverUrl: await getPlayableStorageUrl(cached.coverUrl),
      audioUrl: await getPlayableStorageUrl(cached.audioUrl),
      fromCache: true,
    };
  }
  const cefrLevel = params.cefrLevel ?? (await detectCefrLevel(normalizedText));
  const month = cefrMap[cefrLevel] ?? 3;
  const sentences = segmentIntoSentences(normalizedText);
  if (sentences.length === 0) {
    throw new HttpError(400, 'Texto vazio ou inválido');
  }
  const slugBase = slugify(params.title);
  const slug = `${slugBase || 'reading'}-${Date.now().toString(36)}`;
  const tmpAudioPath = `/tmp/reading-${slug}.mp3`;
  const selectedVoice = params.voice?.trim() || 'en-US-AvaMultilingualNeural';
  try {
    let ttsProvider: 'azure' | 'polly' = 'azure';
    let ttsResult;
    try {
      ttsResult = await synthesizeWithAzure(sentences, tmpAudioPath, selectedVoice);
    } catch (azureError) {
      if (!shouldFallbackToPolly(azureError)) {
        throw azureError;
      }
      ttsResult = await synthesizeWithPolly(sentences, tmpAudioPath);
      ttsProvider = 'polly';
    }
    const audioUrl = await uploadToStorage(tmpAudioPath, `reading/${slug}.mp3`);
    const content = await prisma.readingContent.create({
      data: {
        title: params.title,
        author: params.author ?? '',
        description: params.description ?? '',
        coverUrl: params.coverUrl ?? '',
        tags: params.tags ?? [],
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
        sourceType: params.sourceType,
        sourceFileType: params.sourceFileType ?? '',
        sourceFileName: params.sourceFileName ?? '',
        userId: params.userId,
        month,
        category: params.category ?? 'general',
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
        userId: params.userId,
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
    if (!result) {
      throw new HttpError(500, 'Falha ao buscar conteudo processado');
    }
    return {
      ...result,
      reader: null,
      coverUrl: await getPlayableStorageUrl(result.coverUrl),
      audioUrl: await getPlayableStorageUrl(result.audioUrl),
      fromCache: false,
    };
  } catch (error) {
    throw mapReadingLabProcessError(error);
  } finally {
    await unlink(tmpAudioPath).catch(() => undefined);
  }
}

async function createReadingContentFromEpubReader(params: {
  userId: string;
  text: string;
  title: string;
  cefrLevel?: CefrLevel;
  category?: string;
  voice?: string;
  sourceType: string;
  author?: string;
  description?: string;
  coverUrl?: string;
  tags?: string[];
  sourceFileType?: string;
  sourceFileName?: string;
  readerPayload: ExtractedEpubReaderPayload;
}) {
  const normalizedText = params.text.trim();
  const selectedVoice = params.voice?.trim() || 'en-US-AvaMultilingualNeural';
  const textHash = createHash('sha256')
    .update(`${normalizedText}\n${JSON.stringify(params.readerPayload)}\n${selectedVoice}`)
    .digest('hex');
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
    return {
      ...withReaderPayload(cached),
      coverUrl: await getPlayableStorageUrl(cached.coverUrl),
      audioUrl: await getPlayableStorageUrl(cached.audioUrl),
      fromCache: true,
    };
  }
  const documents = params.readerPayload.documents;
  if (documents.length === 0) {
    throw new HttpError(400, 'EPUB sem capítulos válidos para leitura');
  }
  const chapterPlans = documents.map((document, chapterIndex) => {
    const sourceText = document.text.trim();
    const chapterSentences = segmentIntoSentences(sourceText);
    const sentences = chapterSentences.length > 0 ? chapterSentences : [document.title || `Chapter ${chapterIndex + 1}`];
    return {
      chapterIndex,
      document,
      sentences,
    };
  });
  const ttsInputSentences = chapterPlans.flatMap((item) => item.sentences);
  if (ttsInputSentences.length === 0) {
    throw new HttpError(400, 'EPUB sem sentenças válidas para síntese');
  }
  const cefrLevel = params.cefrLevel ?? (await detectCefrLevel(normalizedText));
  const month = cefrMap[cefrLevel] ?? 3;
  const slugBase = slugify(params.title);
  const slug = `${slugBase || 'reading'}-${Date.now().toString(36)}`;
  const tmpAudioPath = `/tmp/reading-epub-${slug}.mp3`;
  try {
    let ttsProvider: 'azure' | 'polly' = 'azure';
    let ttsResult;
    try {
      ttsResult = await synthesizeWithAzure(ttsInputSentences, tmpAudioPath, selectedVoice);
    } catch (azureError) {
      if (!shouldFallbackToPolly(azureError)) {
        throw azureError;
      }
      ttsResult = await synthesizeWithPolly(ttsInputSentences, tmpAudioPath);
      ttsProvider = 'polly';
    }
    const chapterTimedDocuments: ExtractedEpubReaderPayload['documents'] = [];
    let runningSentenceIndex = 0;
    for (const plan of chapterPlans) {
      const sentenceStartIndex = runningSentenceIndex;
      const sentenceEndIndex = runningSentenceIndex + plan.sentences.length - 1;
      const firstSentence = ttsResult.sentences[sentenceStartIndex];
      const lastSentence = ttsResult.sentences[sentenceEndIndex];
      chapterTimedDocuments.push({
        ...plan.document,
        chapterIndex: plan.chapterIndex,
        sentenceStartIndex,
        sentenceEndIndex,
        audioStartMs: firstSentence?.startMs ?? 0,
        audioEndMs: lastSentence?.endMs ?? (firstSentence?.endMs ?? 0),
      });
      runningSentenceIndex = sentenceEndIndex + 1;
    }
    const readerPayloadWithTiming: ExtractedEpubReaderPayload = {
      format: 'epub',
      version: 1,
      documents: chapterTimedDocuments,
    };
    const serializedReader = serializeReaderPayload(readerPayloadWithTiming);
    const audioUrl = await uploadToStorage(tmpAudioPath, `reading/${slug}.mp3`);
    const wordCount = normalizedText.split(/\s+/).filter(Boolean).length;
    const content = await prisma.readingContent.create({
      data: {
        title: params.title,
        author: params.author ?? '',
        description: params.description ?? '',
        coverUrl: params.coverUrl ?? '',
        tags: params.tags ?? [],
        slug,
        textHash,
        fullText: serializedReader,
        cefrLevel,
        wordCount,
        estimatedTimeMs: ttsResult.durationMs,
        audioUrl,
        audioDurationMs: ttsResult.durationMs,
        ttsProvider,
        ttsVoice: selectedVoice,
        sourceType: params.sourceType,
        sourceFileType: params.sourceFileType ?? '',
        sourceFileName: params.sourceFileName ?? '',
        userId: params.userId,
        month,
        category: params.category ?? 'general',
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
        userId: params.userId,
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
    if (!result) {
      throw new HttpError(500, 'Falha ao buscar livro importado');
    }
    return {
      ...withReaderPayload(result),
      coverUrl: await getPlayableStorageUrl(result.coverUrl),
      audioUrl: await getPlayableStorageUrl(result.audioUrl),
      fromCache: false,
    };
  } catch (error) {
    throw mapReadingLabProcessError(error);
  } finally {
    await unlink(tmpAudioPath).catch(() => undefined);
  }
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
          author: true,
          description: true,
          coverUrl: true,
          tags: true,
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
    const itemsWithPlayableUrl = await Promise.all(
      items.map(async (item) => ({
        ...item,
        coverUrl: await getPlayableStorageUrl(item.coverUrl),
        audioUrl: await getPlayableStorageUrl(item.audioUrl),
      })),
    );
    res.json({ items: itemsWithPlayableUrl, total, limit, offset });
  }),
);

readingLabRouter.get(
  '/progress',
  authMiddleware,
  asyncHandler(async (req, res) => {
    const userId = req.userId;
    if (!userId) throw new HttpError(401, 'Não autorizado');
    const rawContentIds = typeof req.query.contentIds === 'string' ? req.query.contentIds : '';
    const ids = rawContentIds
      .split(',')
      .map((value) => Number(value.trim()))
      .filter((value) => Number.isInteger(value) && value > 0);
    if (ids.length === 0) {
      res.json({ items: [] });
      return;
    }
    const [items, sentenceCounts] = await Promise.all([
      prisma.userReadingProgress.findMany({
        where: {
          userId,
          contentId: { in: ids },
        },
        select: {
          contentId: true,
          lastSentence: true,
          completed: true,
          timeSpentMs: true,
        },
      }),
      prisma.readingSentence.groupBy({
        by: ['contentId'],
        where: { contentId: { in: ids } },
        _count: { _all: true },
      }),
    ]);
    const countsByContent = new Map(sentenceCounts.map((item) => [item.contentId, item._count._all]));
    const itemsWithPercent = items.map((item) => {
      const totalSentences = Math.max(1, countsByContent.get(item.contentId) ?? 1);
      const progressPercent = item.completed ? 100 : Math.min(100, Math.max(0, ((item.lastSentence + 1) / totalSentences) * 100));
      return {
        ...item,
        totalSentences,
        progressPercent,
      };
    });
    res.json({ items: itemsWithPercent });
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
    res.json({
      ...withReaderPayload(content),
      coverUrl: await getPlayableStorageUrl(content.coverUrl),
      audioUrl: await getPlayableStorageUrl(content.audioUrl),
    });
  }),
);

readingLabRouter.get(
  '/:id/progress',
  authMiddleware,
  asyncHandler(async (req, res) => {
    const userId = req.userId;
    if (!userId) throw new HttpError(401, 'Não autorizado');
    const contentId = z.coerce.number().int().positive().parse(req.params.id);
    const progress = await prisma.userReadingProgress.findUnique({
      where: { userId_contentId: { userId, contentId } },
      select: {
        id: true,
        userId: true,
        contentId: true,
        lastSentence: true,
        completed: true,
        timeSpentMs: true,
      },
    });
    if (!progress) {
      res.json({ progress: null });
      return;
    }
    const totalSentences = Math.max(
      1,
      await prisma.readingSentence.count({
        where: { contentId },
      }),
    );
    const progressPercent = progress.completed ? 100 : Math.min(100, Math.max(0, ((progress.lastSentence + 1) / totalSentences) * 100));
    res.json({
      progress: {
        ...progress,
        totalSentences,
        progressPercent,
      },
    });
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
        text: z.string().min(10).max(120000),
        title: z.string().min(1).max(200),
        cefrLevel: z.enum(['a1', 'a2', 'b1', 'b2', 'c1', 'c2']).optional(),
        category: z.string().min(1).max(50).optional(),
        voice: z.string().min(1).max(120).optional(),
        author: z.string().max(200).optional(),
        description: z.string().max(5000).optional(),
        coverUrl: z.string().max(1000).optional(),
        tags: z.array(z.string().min(1).max(50)).max(40).optional(),
      })
      .parse(req.body);
    const result = await createReadingContentFromText({
      userId,
      text: input.text,
      title: input.title,
      cefrLevel: input.cefrLevel,
      category: input.category,
      voice: input.voice,
      sourceType: 'user_import',
      author: input.author,
      description: input.description,
      coverUrl: input.coverUrl,
      tags: input.tags,
    });
    res.json(result);
  }),
);

readingLabRouter.post(
  '/selection-tts',
  authMiddleware,
  asyncHandler(async (req, res) => {
    const userId = req.userId;
    if (!userId) throw new HttpError(401, 'Não autorizado');
    const input = z
      .object({
        text: z.string().min(2).max(20000),
        voice: z.string().min(1).max(120).optional(),
      })
      .parse(req.body);
    const normalizedText = input.text.replace(/\s+/g, ' ').trim();
    if (!normalizedText) {
      throw new HttpError(400, 'Texto inválido para síntese');
    }
    const selectedVoice = input.voice?.trim() || 'en-US-AvaMultilingualNeural';
    const snippetHash = createHash('sha256').update(`${normalizedText}\n${selectedVoice}`).digest('hex').slice(0, 24);
    const tempSuffix = `${snippetHash}-${Date.now().toString(36)}`;
    const tempAudioPath = `/tmp/reading-selection-${tempSuffix}.mp3`;
    const snippetSentences = segmentIntoSentences(normalizedText);
    const synthesisInput = snippetSentences.length > 0 ? snippetSentences : [normalizedText];
    try {
      let ttsProvider: 'azure' | 'polly' = 'azure';
      let ttsResult;
      try {
        ttsResult = await synthesizeWithAzure(synthesisInput, tempAudioPath, selectedVoice);
      } catch (azureError) {
        if (!shouldFallbackToPolly(azureError)) {
          throw azureError;
        }
        ttsResult = await synthesizeWithPolly(synthesisInput, tempAudioPath);
        ttsProvider = 'polly';
      }
      const storagePath = `reading/snippets/${snippetHash}.mp3`;
      const storedAudioPath = await uploadToStorage(tempAudioPath, storagePath);
      res.json({
        audioUrl: await getPlayableStorageUrl(storedAudioPath),
        durationMs: ttsResult.durationMs,
        ttsProvider,
        voice: selectedVoice,
      });
    } catch (error) {
      throw mapReadingLabProcessError(error);
    } finally {
      await unlink(tempAudioPath).catch(() => undefined);
    }
  }),
);

readingLabRouter.post(
  '/import-book',
  authMiddleware,
  readingBookUpload.single('file'),
  asyncHandler(async (req, res) => {
    const userId = req.userId;
    if (!userId) throw new HttpError(401, 'Não autorizado');
    const file = req.file;
    if (!file) {
      throw new HttpError(400, 'Arquivo é obrigatório');
    }
    const rawInput = z
      .object({
        title: z.string().max(200).optional(),
        description: z.string().max(5000).optional(),
        author: z.string().max(200).optional(),
        coverUrl: z.string().max(1000).optional(),
        tags: z.union([z.string(), z.array(z.string())]).optional(),
        cefrLevel: z.enum(['a1', 'a2', 'b1', 'b2', 'c1', 'c2']).optional(),
        category: z.string().min(1).max(50).optional(),
        voice: z.string().min(1).max(120).optional(),
      })
      .parse(req.body);
    const extracted = await extractBookContentFromUpload({
      buffer: file.buffer,
      originalName: file.originalname,
      mimeType: file.mimetype,
    });
    const extractedText = typeof extracted.text === 'string' ? extracted.text : String(extracted.text ?? '');
    const shouldUseEpubReader = extracted.type === 'epub' && Boolean(extracted.readerPayload?.documents?.length);
    const sanitized = shouldUseEpubReader ? { text: extractedText.trim(), truncated: false } : sanitizeImportedBookText(extractedText);
    const cleanedText = sanitized.text;
    if (cleanedText.length < 10) {
      throw new HttpError(400, 'Não foi possível extrair texto suficiente do arquivo');
    }
    if (!hasReadableBookContent(cleanedText)) {
      throw new HttpError(400, 'O arquivo não contém texto legível suficiente para importação');
    }
    if (!shouldUseEpubReader && sanitized.truncated && cleanedText.length < 100) {
      throw new HttpError(400, 'Texto removido por marcador de finalização deixou conteúdo insuficiente para processar');
    }
    if (!shouldUseEpubReader && cleanedText.length > 120000) {
      throw new HttpError(400, 'Livro muito grande para importação direta. Limite de 120000 caracteres');
    }
    const fallbackTitle = file.originalname.replace(/\.[^/.]+$/, '');
    const title = (rawInput.title ?? extracted.title ?? fallbackTitle).trim();
    if (!title) {
      throw new HttpError(400, 'Título é obrigatório');
    }
    const normalizedAuthor = (rawInput.author ?? extracted.author ?? '').trim();
    const normalizedDescription = (rawInput.description ?? '').trim();
    const normalizedCoverUrl = (rawInput.coverUrl ?? '').trim();
    const normalizedTags = normalizeTags(rawInput.tags);
    const result =
      shouldUseEpubReader && extracted.readerPayload
        ? await createReadingContentFromEpubReader({
            userId,
            text: cleanedText,
            title,
            cefrLevel: rawInput.cefrLevel,
            category: rawInput.category,
            voice: rawInput.voice,
            sourceType: 'ebook_upload',
            author: normalizedAuthor,
            description: normalizedDescription,
            coverUrl: normalizedCoverUrl,
            tags: normalizedTags,
            sourceFileType: extracted.type,
            sourceFileName: file.originalname,
            readerPayload: extracted.readerPayload,
          })
        : await createReadingContentFromText({
            userId,
            text: cleanedText,
            title,
            cefrLevel: rawInput.cefrLevel,
            category: rawInput.category,
            voice: rawInput.voice,
            sourceType: 'ebook_upload',
            author: normalizedAuthor,
            description: normalizedDescription,
            coverUrl: normalizedCoverUrl,
            tags: normalizedTags,
            sourceFileType: extracted.type,
            sourceFileName: file.originalname,
          });
    res.json(result);
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
