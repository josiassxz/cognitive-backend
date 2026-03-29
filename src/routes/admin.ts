import { Router } from 'express';
import multer from 'multer';
import * as XLSX from 'xlsx';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import {
  assertContentType,
  ContentType,
  getTypeOrderBy,
  normalizeLimit,
  normalizePage,
} from '../services/content-service';
import { asyncHandler } from '../utils/async-handler';
import { HttpError } from '../utils/http-error';

const vocabularyCreateSchema = z.object({
  word: z.string().min(1),
  type: z.string().min(1),
  definition: z.string().min(1),
  example: z.string().default(''),
  month: z.number().int().min(1).max(6),
  level: z.string().default('basico'),
  category: z.string().default('geral'),
});

const phrasalVerbCreateSchema = z.object({
  phrasal: z.string().min(1),
  meaning: z.string().min(1),
  example: z.string().default(''),
  month: z.number().int().min(1).max(6),
});

const videoCreateSchema = z.object({
  title: z.string().min(1),
  youtubeId: z.string().min(1),
  channel: z.string().min(1),
  duration: z.string().default(''),
  description: z.string().default(''),
  month: z.number().int().min(1).max(6),
  category: z.string().min(1),
  level: z.string().min(1),
});

const grammarCreateSchema = z.object({
  title: z.string().min(1),
  explanation: z.string().min(1),
  examples: z.array(z.string()).default([]),
  month: z.number().int().min(1).max(6),
  category: z.string().default('geral'),
});

const podcastCreateSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  url: z.string().url(),
  level: z.string().min(1),
  month: z.number().int().min(1).max(6),
  category: z.string().default('geral'),
});

const expressionCreateSchema = z.object({
  expression: z.string().min(1),
  meaning: z.string().min(1),
  example: z.string().min(1),
  month: z.number().int().min(1).max(6),
  category: z.string().default('idiom'),
});

const songCreateSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  artist: z.string().min(1),
  youtubeId: z.string().min(1),
  level: z.string().min(1),
  themes: z.array(z.string()).default([]),
  learningNotes: z.string().default(''),
  month: z.number().int().min(1).max(6).default(1),
  keyPhrases: z.array(z.object({ en: z.string().min(1), pt: z.string().min(1) })).default([]),
  vocabHighlights: z.array(z.object({ word: z.string().min(1), meaning: z.string().min(1) })).default([]),
});

const songLyricLineCreateSchema = z.object({
  songId: z.number().int().positive(),
  lineIndex: z.number().int().min(0),
  startMs: z.number().int().min(0),
  endMs: z.number().int().positive(),
  text: z.string().min(1),
  translation: z.string().default(''),
});

const TEMPLATES: Record<ContentType, { headers: string[]; sampleRow: Record<string, unknown> }> = {
  vocabulary: {
    headers: ['word', 'type', 'definition', 'example', 'month', 'level', 'category'],
    sampleRow: {
      word: 'Hello',
      type: 'interjeicao',
      definition: 'Ola',
      example: 'Hello, how are you?',
      month: 1,
      level: 'basico',
      category: 'cotidiano',
    },
  },
  'phrasal-verbs': {
    headers: ['phrasal', 'meaning', 'example', 'month'],
    sampleRow: {
      phrasal: 'Give up',
      meaning: 'Desistir',
      example: 'Never give up on learning!',
      month: 1,
    },
  },
  videos: {
    headers: ['title', 'youtubeId', 'channel', 'duration', 'description', 'month', 'category', 'level'],
    sampleRow: {
      title: 'English Basics',
      youtubeId: 'abc123',
      channel: 'Learn English',
      duration: '10:00',
      description: 'Basico de ingles',
      month: 1,
      category: 'gramatica',
      level: 'iniciante',
    },
  },
  grammar: {
    headers: ['title', 'explanation', 'examples', 'month', 'category'],
    sampleRow: {
      title: 'Present Simple',
      explanation: 'Usado para habitos e fatos',
      examples: 'I study every day;She works here;They play soccer',
      month: 1,
      category: 'tempos verbais',
    },
  },
  podcasts: {
    headers: ['name', 'description', 'url', 'level', 'month', 'category'],
    sampleRow: {
      name: 'English Pod',
      description: 'Podcast para iniciantes',
      url: 'https://example.com/podcast',
      level: 'iniciante',
      month: 1,
      category: 'conversacao',
    },
  },
  expressions: {
    headers: ['expression', 'meaning', 'example', 'month', 'category'],
    sampleRow: {
      expression: 'Break a leg',
      meaning: 'Boa sorte',
      example: 'Break a leg on your test!',
      month: 1,
      category: 'idiom',
    },
  },
  songs: {
    headers: ['title', 'artist', 'youtubeId', 'level', 'themes', 'learningNotes', 'month', 'slug'],
    sampleRow: {
      title: 'Imagine',
      artist: 'John Lennon',
      youtubeId: 'YkgkThdzX-8',
      level: 'Intermediario',
      themes: 'Paz;Sonhos',
      learningNotes: 'Vocabulario sobre paz e utopia.',
      month: 1,
      slug: 'imagine-john-lennon',
    },
  },
  'song-lyrics': {
    headers: ['songId', 'lineIndex', 'startMs', 'endMs', 'text', 'translation'],
    sampleRow: {
      songId: 1,
      lineIndex: 0,
      startMs: 0,
      endMs: 1800,
      text: 'Imagine all the people',
      translation: 'Imagine todas as pessoas',
    },
  },
};

const upload = multer({ storage: multer.memoryStorage() });

function sanitizeText(value: unknown, fallback = ''): string {
  const text = String(value ?? fallback).trim();
  return text || fallback;
}

function parseMonthValue(value: unknown): number {
  const month = Number.parseInt(String(value ?? ''), 10);
  return Number.isNaN(month) ? 1 : Math.min(6, Math.max(1, month));
}

function splitBySemicolon(value: unknown): string[] {
  const text = String(value ?? '');
  if (!text) return [];
  if (!text.includes(';')) return text.trim() ? [text.trim()] : [];
  return text
    .split(';')
    .map((item) => item.trim())
    .filter(Boolean);
}

async function processUploadRows(contentType: ContentType, rows: Record<string, unknown>[]) {
  let processed = 0;
  const errors: string[] = [];

  for (const row of rows) {
    try {
      if (contentType === 'vocabulary') {
        const data = {
          word: sanitizeText(row.word),
          type: sanitizeText(row.type, 'substantivo'),
          definition: sanitizeText(row.definition),
          example: sanitizeText(row.example),
          month: parseMonthValue(row.month),
          level: sanitizeText(row.level, 'basico'),
          category: sanitizeText(row.category, 'geral'),
        };
        if (!data.word || !data.definition) {
          errors.push(`Linha sem word ou definition: ${JSON.stringify(row)}`);
          continue;
        }
        await prisma.vocabulary.upsert({
          where: { word_month: { word: data.word, month: data.month } },
          update: data,
          create: data,
        });
        processed += 1;
        continue;
      }

      if (contentType === 'phrasal-verbs') {
        const data = {
          phrasal: sanitizeText(row.phrasal),
          meaning: sanitizeText(row.meaning),
          example: sanitizeText(row.example),
          month: parseMonthValue(row.month),
        };
        if (!data.phrasal || !data.meaning) {
          errors.push(`Linha sem phrasal ou meaning: ${JSON.stringify(row)}`);
          continue;
        }
        await prisma.phrasalVerb.upsert({
          where: { phrasal_month: { phrasal: data.phrasal, month: data.month } },
          update: data,
          create: data,
        });
        processed += 1;
        continue;
      }

      if (contentType === 'videos') {
        const data = {
          title: sanitizeText(row.title),
          youtubeId: sanitizeText(row.youtubeId),
          channel: sanitizeText(row.channel),
          duration: sanitizeText(row.duration),
          description: sanitizeText(row.description),
          month: parseMonthValue(row.month),
          category: sanitizeText(row.category, 'gramatica'),
          level: sanitizeText(row.level, 'iniciante'),
        };
        if (!data.title || !data.youtubeId) {
          errors.push(`Linha sem title ou youtubeId: ${JSON.stringify(row)}`);
          continue;
        }
        await prisma.video.upsert({
          where: { youtubeId: data.youtubeId },
          update: data,
          create: data,
        });
        processed += 1;
        continue;
      }

      if (contentType === 'grammar') {
        const data = {
          title: sanitizeText(row.title),
          explanation: sanitizeText(row.explanation),
          examples: splitBySemicolon(row.examples),
          month: parseMonthValue(row.month),
          category: sanitizeText(row.category, 'geral'),
        };
        if (!data.title || !data.explanation) {
          errors.push(`Linha sem title ou explanation: ${JSON.stringify(row)}`);
          continue;
        }
        await prisma.grammarTip.upsert({
          where: { title_month: { title: data.title, month: data.month } },
          update: data,
          create: data,
        });
        processed += 1;
        continue;
      }

      if (contentType === 'podcasts') {
        const data = {
          name: sanitizeText(row.name),
          description: sanitizeText(row.description),
          url: sanitizeText(row.url),
          level: sanitizeText(row.level, 'iniciante'),
          month: parseMonthValue(row.month),
          category: sanitizeText(row.category, 'geral'),
        };
        if (!data.name || !data.url) {
          errors.push(`Linha sem name ou url: ${JSON.stringify(row)}`);
          continue;
        }
        await prisma.podcast.upsert({
          where: { name_month: { name: data.name, month: data.month } },
          update: data,
          create: data,
        });
        processed += 1;
        continue;
      }

      if (contentType === 'expressions') {
        const data = {
          expression: sanitizeText(row.expression),
          meaning: sanitizeText(row.meaning),
          example: sanitizeText(row.example),
          month: parseMonthValue(row.month),
          category: sanitizeText(row.category, 'idiom'),
        };
        if (!data.expression || !data.meaning) {
          errors.push(`Linha sem expression ou meaning: ${JSON.stringify(row)}`);
          continue;
        }
        await prisma.expression.upsert({
          where: { expression_month: { expression: data.expression, month: data.month } },
          update: data,
          create: data,
        });
        processed += 1;
        continue;
      }

      if (contentType === 'song-lyrics') {
        const data = {
          songId: Number.parseInt(String(row.songId ?? ''), 10),
          lineIndex: Number.parseInt(String(row.lineIndex ?? '0'), 10),
          startMs: Number.parseInt(String(row.startMs ?? '0'), 10),
          endMs: Number.parseInt(String(row.endMs ?? '0'), 10),
          text: sanitizeText(row.text),
          translation: sanitizeText(row.translation),
        };
        if (!data.songId || data.endMs <= data.startMs || !data.text) {
          errors.push(`Linha de legenda invalida: ${JSON.stringify(row)}`);
          continue;
        }
        await prisma.songLyricLine.upsert({
          where: {
            songId_lineIndex: {
              songId: data.songId,
              lineIndex: data.lineIndex,
            },
          },
          update: data,
          create: data,
        });
        processed += 1;
        continue;
      }

      const title = sanitizeText(row.title);
      const slug = sanitizeText(row.slug) || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const data = {
        slug,
        title,
        artist: sanitizeText(row.artist),
        youtubeId: sanitizeText(row.youtubeId),
        level: sanitizeText(row.level, 'Iniciante'),
        themes: splitBySemicolon(row.themes),
        learningNotes: sanitizeText(row.learningNotes),
        month: parseMonthValue(row.month),
      };
      if (!data.title || !data.youtubeId) {
        errors.push(`Linha sem title ou youtubeId: ${JSON.stringify(row)}`);
        continue;
      }
      await prisma.song.upsert({
        where: { slug: data.slug },
        update: data,
        create: data,
      });
      processed += 1;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro desconhecido';
      errors.push(`Erro: ${message.slice(0, 100)}`);
    }
  }

  return { processed, errors };
}

export const adminRouter = Router();

adminRouter.get(
  '/content',
  asyncHandler(async (req, res) => {
    const type = assertContentType(req.query.type ?? 'vocabulary');
    const page = normalizePage(req.query.page);
    const limit = normalizeLimit(req.query.limit);
    const skip = (page - 1) * limit;

    let items: unknown[] = [];
    let total = 0;

    switch (type) {
      case 'vocabulary':
        [items, total] = await Promise.all([
          prisma.vocabulary.findMany({ skip, take: limit, orderBy: getTypeOrderBy(type) }),
          prisma.vocabulary.count(),
        ]);
        break;
      case 'phrasal-verbs':
        [items, total] = await Promise.all([
          prisma.phrasalVerb.findMany({ skip, take: limit, orderBy: getTypeOrderBy(type) }),
          prisma.phrasalVerb.count(),
        ]);
        break;
      case 'videos':
        [items, total] = await Promise.all([
          prisma.video.findMany({ skip, take: limit, orderBy: getTypeOrderBy(type) }),
          prisma.video.count(),
        ]);
        break;
      case 'grammar':
        [items, total] = await Promise.all([
          prisma.grammarTip.findMany({ skip, take: limit, orderBy: getTypeOrderBy(type) }),
          prisma.grammarTip.count(),
        ]);
        break;
      case 'podcasts':
        [items, total] = await Promise.all([
          prisma.podcast.findMany({ skip, take: limit, orderBy: getTypeOrderBy(type) }),
          prisma.podcast.count(),
        ]);
        break;
      case 'expressions':
        [items, total] = await Promise.all([
          prisma.expression.findMany({ skip, take: limit, orderBy: getTypeOrderBy(type) }),
          prisma.expression.count(),
        ]);
        break;
      case 'songs':
        [items, total] = await Promise.all([
          prisma.song.findMany({
            skip,
            take: limit,
            orderBy: getTypeOrderBy(type),
            include: { keyPhrases: true, vocabHighlights: true },
          }),
          prisma.song.count(),
        ]);
        break;
      case 'song-lyrics':
        [items, total] = await Promise.all([
          prisma.songLyricLine.findMany({
            skip,
            take: limit,
            orderBy: getTypeOrderBy(type),
          }),
          prisma.songLyricLine.count(),
        ]);
        break;
    }

    res.json({
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  }),
);

adminRouter.post(
  '/content',
  asyncHandler(async (req, res) => {
    const type = assertContentType(req.body?.type);
    const payload = req.body?.payload;

    switch (type) {
      case 'vocabulary': {
        const data = vocabularyCreateSchema.parse(payload);
        const created = await prisma.vocabulary.create({ data });
        res.status(201).json({ success: true, item: created });
        return;
      }
      case 'phrasal-verbs': {
        const data = phrasalVerbCreateSchema.parse(payload);
        const created = await prisma.phrasalVerb.create({ data });
        res.status(201).json({ success: true, item: created });
        return;
      }
      case 'videos': {
        const data = videoCreateSchema.parse(payload);
        const created = await prisma.video.create({ data });
        res.status(201).json({ success: true, item: created });
        return;
      }
      case 'grammar': {
        const data = grammarCreateSchema.parse(payload);
        const created = await prisma.grammarTip.create({ data });
        res.status(201).json({ success: true, item: created });
        return;
      }
      case 'podcasts': {
        const data = podcastCreateSchema.parse(payload);
        const created = await prisma.podcast.create({ data });
        res.status(201).json({ success: true, item: created });
        return;
      }
      case 'expressions': {
        const data = expressionCreateSchema.parse(payload);
        const created = await prisma.expression.create({ data });
        res.status(201).json({ success: true, item: created });
        return;
      }
      case 'songs': {
        const data = songCreateSchema.parse(payload);
        const created = await prisma.song.create({
          data: {
            slug: data.slug,
            title: data.title,
            artist: data.artist,
            youtubeId: data.youtubeId,
            level: data.level,
            themes: data.themes,
            learningNotes: data.learningNotes,
            month: data.month,
            keyPhrases: { create: data.keyPhrases },
            vocabHighlights: { create: data.vocabHighlights },
          },
          include: { keyPhrases: true, vocabHighlights: true },
        });
        res.status(201).json({ success: true, item: created });
        return;
      }
      case 'song-lyrics': {
        const data = songLyricLineCreateSchema.parse(payload);
        if (data.endMs <= data.startMs) {
          throw new HttpError(400, 'endMs deve ser maior que startMs');
        }
        const created = await prisma.songLyricLine.create({ data });
        res.status(201).json({ success: true, item: created });
        return;
      }
    }
  }),
);

adminRouter.delete(
  '/content',
  asyncHandler(async (req, res) => {
    const type = assertContentType(req.body?.type);
    const id = z.coerce.number().int().positive().parse(req.body?.id);

    switch (type) {
      case 'vocabulary':
        await prisma.vocabulary.delete({ where: { id } });
        break;
      case 'phrasal-verbs':
        await prisma.phrasalVerb.delete({ where: { id } });
        break;
      case 'videos':
        await prisma.video.delete({ where: { id } });
        break;
      case 'grammar':
        await prisma.grammarTip.delete({ where: { id } });
        break;
      case 'podcasts':
        await prisma.podcast.delete({ where: { id } });
        break;
      case 'expressions':
        await prisma.expression.delete({ where: { id } });
        break;
      case 'songs':
        await prisma.song.delete({ where: { id } });
        break;
      case 'song-lyrics':
        await prisma.songLyricLine.delete({ where: { id } });
        break;
      default:
        throw new HttpError(400, 'Tipo invalido');
    }

    res.json({ success: true });
  }),
);

adminRouter.get(
  '/template',
  asyncHandler(async (req, res) => {
    const type = assertContentType(req.query.type);
    const template = TEMPLATES[type];
    const workbook = XLSX.utils.book_new();
    const sheet = XLSX.utils.json_to_sheet([template.sampleRow], { header: template.headers });
    XLSX.utils.book_append_sheet(workbook, sheet, 'Template');
    const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename=template-${type}.xlsx`);
    res.send(buffer);
  }),
);

adminRouter.post(
  '/upload',
  upload.single('file'),
  asyncHandler(async (req, res) => {
    const contentType = assertContentType(req.body?.type ?? req.query.type);
    const fileBuffer = req.file?.buffer;
    if (!fileBuffer) {
      throw new HttpError(400, 'Arquivo e tipo de conteudo sao obrigatorios');
    }

    const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    if (!sheetName) throw new HttpError(400, 'Planilha vazia');

    const sheet = workbook.Sheets[sheetName];
    const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet);
    if (rows.length === 0) throw new HttpError(400, 'Planilha vazia');

    const result = await processUploadRows(contentType, rows);

    res.json({
      success: true,
      message: `Upload concluido! ${result.processed} itens processados.`,
      created: result.processed,
      errors: result.errors.length > 0 ? result.errors.slice(0, 10) : undefined,
    });
  }),
);
