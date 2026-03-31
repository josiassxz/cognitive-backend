import multer from 'multer';
import { Router } from 'express';
import { z } from 'zod';
import { XP_CONFIG } from '../lib/xp';
import { authMiddleware } from '../middleware/auth';
import { prisma } from '../lib/prisma';
import { parseMonth } from '../services/content-service';
import { asyncHandler } from '../utils/async-handler';
import { HttpError } from '../utils/http-error';

export const songsRouter = Router();
const upload = multer({ storage: multer.memoryStorage() });

function extractYoutubeId(input: string): string | null {
  const patterns = [
    /youtu\.be\/([a-zA-Z0-9_-]{11})/,
    /[?&]v=([a-zA-Z0-9_-]{11})/,
    /embed\/([a-zA-Z0-9_-]{11})/,
    /shorts\/([a-zA-Z0-9_-]{11})/,
    /^([a-zA-Z0-9_-]{11})$/,
  ];

  for (const pattern of patterns) {
    const match = input.match(pattern);
    if (match) return match[1];
  }

  return null;
}

function decodeXmlEntities(input: string): string {
  return input
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_, code: string) => String.fromCharCode(Number.parseInt(code, 10)));
}

async function fetchYoutubeTranscript(videoId: string): Promise<Array<{ startMs: number; endMs: number; text: string }>> {
  const pageResponse = await fetch(`https://www.youtube.com/watch?v=${videoId}`, {
    headers: { 'Accept-Language': 'en-US,en;q=0.9' },
  });
  const html = await pageResponse.text();
  const tracksMatch = html.match(/"captionTracks":(\[[^\]]+\])/);
  if (!tracksMatch) {
    throw new HttpError(422, 'Nenhuma legenda encontrada para este video');
  }

  const tracks = JSON.parse(tracksMatch[1]) as Array<{ languageCode?: string; kind?: string; baseUrl?: string }>;
  const selectedTrack =
    tracks.find((track) => track.languageCode === 'en' && !track.kind) ??
    tracks.find((track) => track.languageCode === 'en') ??
    tracks[0];

  if (!selectedTrack?.baseUrl) {
    throw new HttpError(422, 'Caption track nao encontrado');
  }

  const captionResponse = await fetch(selectedTrack.baseUrl);
  const xml = await captionResponse.text();
  const lines: Array<{ startMs: number; endMs: number; text: string }> = [];
  const regex = /<text start="([\d.]+)" dur="([\d.]+)"[^>]*>([\s\S]*?)<\/text>/g;
  let match: RegExpExecArray | null = regex.exec(xml);

  while (match) {
    const startSec = Number.parseFloat(match[1]);
    const durationSec = Number.parseFloat(match[2]);
    const text = decodeXmlEntities(match[3]).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

    if (text) {
      lines.push({
        startMs: Math.round(startSec * 1000),
        endMs: Math.round((startSec + durationSec) * 1000),
        text,
      });
    }
    match = regex.exec(xml);
  }

  return lines;
}

function srtTimeToMs(input: string): number {
  const match = input.trim().match(/(\d{1,2}):(\d{2}):(\d{2})[,.](\d{1,3})/);
  if (!match) return -1;
  const [, hours, minutes, seconds, milliseconds] = match;
  const paddedMs = milliseconds.padEnd(3, '0');
  return (
    (Number.parseInt(hours, 10) * 3600 + Number.parseInt(minutes, 10) * 60 + Number.parseInt(seconds, 10)) * 1000 +
    Number.parseInt(paddedMs, 10)
  );
}

function parseSubtitleContent(content: string): Array<{ startMs: number; endMs: number; text: string }> {
  const normalized = content.replace(/\r/g, '').trim();
  if (!normalized) return [];
  const blocks = normalized.split(/\n\n+/);
  const lines: Array<{ startMs: number; endMs: number; text: string }> = [];

  for (const block of blocks) {
    const parts = block
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);

    if (parts.length < 2) continue;
    const timestampLine = parts.find((line) => line.includes('-->'));
    if (!timestampLine) continue;

    const [startRaw, endRaw] = timestampLine.split('-->');
    if (!startRaw || !endRaw) continue;
    const startMs = srtTimeToMs(startRaw);
    const endMs = srtTimeToMs(endRaw);
    if (startMs < 0 || endMs <= startMs) continue;

    const timestampIndex = parts.indexOf(timestampLine);
    const text = parts
      .slice(timestampIndex + 1)
      .join(' ')
      .replace(/<[^>]+>/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    if (!text) continue;
    lines.push({ startMs, endMs, text });
  }

  return lines;
}

songsRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    const month = parseMonth(req.query.month);
    const slug = typeof req.query.slug === 'string' ? req.query.slug : undefined;

    if (slug) {
      const item = await prisma.song.findUnique({
        where: { slug },
        include: { keyPhrases: true, vocabHighlights: true },
      });
      if (!item) {
        res.status(404).json({ error: 'Musica nao encontrada', code: 'HTTP_404' });
        return;
      }
      const lyricCount = await prisma.songLyricLine.count({ where: { songId: item.id } });
      res.json({ ...item, hasLyrics: lyricCount > 0, linesCount: lyricCount });
      return;
    }

    const where: Record<string, unknown> = {};
    if (month) where.month = month;

    const items = await prisma.song.findMany({
      where,
      include: { keyPhrases: true, vocabHighlights: true },
      orderBy: [{ month: 'asc' }, { title: 'asc' }],
    });
    const lyricCounts = await prisma.songLyricLine.groupBy({
      by: ['songId'],
      _count: { songId: true },
      where: { songId: { in: items.map((song: { id: number }) => song.id) } },
    });
    const countBySongId = new Map<number, number>(
      lyricCounts.map((item: { songId: number; _count: { songId: number } }) => [item.songId, item._count.songId]),
    );
    res.json(
      items.map((song: { id: number }) => {
        const linesCount = countBySongId.get(song.id) ?? 0;
        return { ...song, hasLyrics: linesCount > 0, linesCount };
      }),
    );
  }),
);

songsRouter.get(
  '/:songId/lyrics',
  asyncHandler(async (req, res) => {
    const songId = z.coerce.number().int().positive().parse(req.params.songId);
    const song = await prisma.song.findUnique({
      where: { id: songId },
      select: { id: true, title: true, artist: true, youtubeId: true },
    });
    if (!song) throw new HttpError(404, 'Musica nao encontrada');
    const lines = await prisma.songLyricLine.findMany({
      where: { songId },
      orderBy: { lineIndex: 'asc' },
    });
    res.json({ song, lines, total: lines.length });
  }),
);

songsRouter.get(
  '/:songId/word-timestamps',
  asyncHandler(async (req, res) => {
    const songId = z.coerce.number().int().positive().parse(req.params.songId);
    const words = await prisma.songWordTimestamp.findMany({
      where: { songId },
      orderBy: [{ lineIndex: 'asc' }, { wordIndex: 'asc' }],
    });
    res.json({ songId, words, total: words.length });
  }),
);

songsRouter.post(
  '/import',
  authMiddleware,
  asyncHandler(async (req, res) => {
    if (!req.userId) throw new HttpError(401, 'Nao autorizado');
    const input = z
      .object({
        youtubeUrl: z.string().min(1),
        title: z.string().optional(),
        artist: z.string().optional(),
      })
      .parse(req.body);

    const youtubeId = extractYoutubeId(input.youtubeUrl);
    if (!youtubeId) throw new HttpError(400, 'URL do YouTube invalida');

    let song = await prisma.song.findFirst({ where: { youtubeId } });
    let justCreated = false;
    if (!song) {
      const slugBase = (input.title || youtubeId)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      song = await prisma.song.create({
        data: {
          slug: `${slugBase}-${Date.now().toString(36)}`,
          title: input.title || 'Musica importada',
          artist: input.artist || 'Desconhecido',
          youtubeId,
          level: 'Intermediario',
          themes: ['imported'],
          month: 1,
        },
      });
      justCreated = true;
    }
    if (justCreated) {
      await prisma.xpLog.create({
        data: {
          userId: req.userId,
          amount: XP_CONFIG.song_imported,
          source: 'lyrics',
          detail: `song_imported:${song.id}|${song.youtubeId}`,
        },
      });
    }

    const existingLines = await prisma.songLyricLine.count({ where: { songId: song.id } });
    if (existingLines > 0) {
      res.json({
        success: true,
        message: 'Musica ja possui legendas',
        songId: song.id,
        linesCount: existingLines,
      });
      return;
    }

    const transcript = await fetchYoutubeTranscript(youtubeId);
    if (transcript.length === 0) {
      throw new HttpError(422, 'Nao foi possivel extrair legendas deste video');
    }

    await prisma.songLyricLine.createMany({
      data: transcript.map((line, index) => ({
        songId: song.id,
        lineIndex: index,
        startMs: line.startMs,
        endMs: line.endMs,
        text: line.text,
      })),
    });

    res.json({
      success: true,
      songId: song.id,
      linesCount: transcript.length,
      message: `${transcript.length} linhas de legenda importadas com sucesso`,
    });
  }),
);

songsRouter.post(
  '/:songId/upload-srt',
  authMiddleware,
  upload.single('file'),
  asyncHandler(async (req, res) => {
    if (!req.userId) throw new HttpError(401, 'Nao autorizado');
    const songId = z.coerce.number().int().positive().parse(req.params.songId);
    const file = req.file;
    if (!file) throw new HttpError(400, 'Arquivo obrigatorio');

    const song = await prisma.song.findUnique({ where: { id: songId } });
    if (!song) throw new HttpError(404, 'Musica nao encontrada');

    const lines = parseSubtitleContent(file.buffer.toString('utf8'));
    if (lines.length === 0) {
      throw new HttpError(422, 'Nenhuma legenda valida encontrada no arquivo');
    }

    await prisma.songLyricLine.deleteMany({ where: { songId } });
    await prisma.songLyricLine.createMany({
      data: lines.map((line, index) => ({
        songId,
        lineIndex: index,
        startMs: line.startMs,
        endMs: line.endMs,
        text: line.text,
      })),
    });

    res.json({
      success: true,
      linesCount: lines.length,
      message: `${lines.length} linhas importadas com sucesso`,
    });
  }),
);
