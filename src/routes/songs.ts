import { Router } from 'express';
import { z } from 'zod';
import { XP_CONFIG } from '../lib/xp';
import { authMiddleware } from '../middleware/auth';
import { prisma } from '../lib/prisma';
import { parseCefrLevel, parseMonth, mapCefrToMonth } from '../services/content-service';
import { asyncHandler } from '../utils/async-handler';
import { HttpError } from '../utils/http-error';

export const songsRouter = Router();
type SongWordItem = { id: number; songId: number; lineIndex: number; wordIndex: number; word: string; startMs: number; endMs: number };
type SongLyricItem = { id: number; songId: number; lineIndex: number; startMs: number; endMs: number; text: string; translation: string };

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

function parseWordTimestampsJson(rawJson: unknown, songId: number): SongWordItem[] {
  if (!Array.isArray(rawJson)) return [];
  const normalized = rawJson
    .map((item, index) => {
      if (!item || typeof item !== 'object') return null;
      const record = item as Record<string, unknown>;
      const word = typeof record.word === 'string' ? record.word.trim() : '';
      const start = typeof record.start === 'number' ? record.start : Number.NaN;
      const end = typeof record.end === 'number' ? record.end : Number.NaN;
      if (!word || !Number.isFinite(start) || !Number.isFinite(end)) return null;
      return { word, startMs: Math.max(0, Math.round(start * 1000)), endMs: Math.max(0, Math.round(end * 1000)), idx: index };
    })
    .filter((item): item is { word: string; startMs: number; endMs: number; idx: number } => item !== null)
    .sort((a, b) => a.startMs - b.startMs || a.idx - b.idx);

  const words: SongWordItem[] = [];
  let lineIndex = 0;
  let wordIndex = 0;
  let lastEndMs = -1;
  for (const item of normalized) {
    const shouldBreakLine = words.length > 0 && (wordIndex >= 8 || item.startMs - lastEndMs > 1200);
    if (shouldBreakLine) {
      lineIndex += 1;
      wordIndex = 0;
    }
    words.push({
      id: -(item.idx + 1),
      songId,
      lineIndex,
      wordIndex,
      word: item.word,
      startMs: item.startMs,
      endMs: item.endMs >= item.startMs ? item.endMs : item.startMs,
    });
    wordIndex += 1;
    lastEndMs = item.endMs;
  }
  return words;
}

function buildLyricLinesFromWords(words: SongWordItem[]): SongLyricItem[] {
  if (words.length === 0) return [];
  const byLine = new Map<number, SongWordItem[]>();
  for (const word of words) {
    const current = byLine.get(word.lineIndex);
    if (current) current.push(word);
    else byLine.set(word.lineIndex, [word]);
  }
  const entries = [...byLine.entries()].sort((a, b) => a[0] - b[0]);
  return entries.map(([lineIndex, lineWords]) => {
    const ordered = [...lineWords].sort((a, b) => a.wordIndex - b.wordIndex);
    return {
      id: -(lineIndex + 1),
      songId: ordered[0].songId,
      lineIndex,
      startMs: ordered[0].startMs,
      endMs: ordered[ordered.length - 1].endMs,
      text: ordered.map((item) => item.word).join(' '),
      translation: '',
    };
  });
}

async function fetchVideoMetadata(videoId: string): Promise<{ title: string; artist: string }> {
  try {
    const res = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`);
    if (!res.ok) {
      return { title: 'Musica importada', artist: 'Desconhecido' };
    }
    const data = (await res.json()) as { title?: string; author_name?: string };
    const fullTitle = (data.title ?? '').trim();
    const authorName = (data.author_name ?? '').trim();
    const dashSplit = fullTitle.split(/\s*[-–—]\s*/);
    if (dashSplit.length >= 2) {
      return { artist: dashSplit[0].trim(), title: dashSplit.slice(1).join(' - ').trim() };
    }
    if (fullTitle) {
      return { title: fullTitle, artist: authorName || 'Desconhecido' };
    }
    return { title: 'Musica importada', artist: authorName || 'Desconhecido' };
  } catch {
    return { title: 'Musica importada', artist: 'Desconhecido' };
  }
}

songsRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    const cefrLevel = parseCefrLevel(req.query.cefrLevel);
    const month = parseMonth(req.query.month);
    const slug = typeof req.query.slug === 'string' ? req.query.slug : undefined;
    const search = typeof req.query.search === 'string' ? req.query.search.trim() : '';

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
    if (cefrLevel) {
      const legacyMonth = mapCefrToMonth(cefrLevel);
      where.OR = [
        { level: { equals: cefrLevel.toUpperCase(), mode: 'insensitive' } },
        { level: { contains: cefrLevel, mode: 'insensitive' } },
        { month: legacyMonth },
      ];
    } else if (month) {
      where.month = month;
    }
    if (search) {
      const searchFilters = [
        { title: { contains: search, mode: 'insensitive' } },
        { artist: { contains: search, mode: 'insensitive' } },
        { youtubeId: { contains: search, mode: 'insensitive' } },
      ];
      if (where.OR && Array.isArray(where.OR)) {
        where.AND = [{ OR: where.OR }, { OR: searchFilters }];
        delete where.OR;
      } else {
        where.OR = searchFilters;
      }
    }

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
    });
    if (!song) throw new HttpError(404, 'Musica nao encontrada');
    const songWordsJson = (song as unknown as { wordTimestampsJson?: unknown }).wordTimestampsJson ?? null;
    let lines = await prisma.songLyricLine.findMany({
      where: { songId },
      orderBy: { lineIndex: 'asc' },
    });
    if (lines.length === 0) {
      const fallbackWords = parseWordTimestampsJson(songWordsJson, songId);
      lines = buildLyricLinesFromWords(fallbackWords);
    }
    console.log(`[songs.lyrics] songId=${songId} lines=${lines.length}`);
    res.json({
      song: { id: song.id, title: song.title, artist: song.artist, youtubeId: song.youtubeId },
      lines,
      total: lines.length,
    });
  }),
);

songsRouter.get(
  '/:songId/word-timestamps',
  asyncHandler(async (req, res) => {
    const songId = z.coerce.number().int().positive().parse(req.params.songId);
    const song = await prisma.song.findUnique({ where: { id: songId } });
    if (!song) throw new HttpError(404, 'Musica nao encontrada');
    const songWordsJson = (song as unknown as { wordTimestampsJson?: unknown }).wordTimestampsJson ?? null;
    let words = await prisma.songWordTimestamp.findMany({
      where: { songId },
      orderBy: [{ lineIndex: 'asc' }, { wordIndex: 'asc' }],
    });
    if (words.length === 0) {
      words = parseWordTimestampsJson(songWordsJson, songId);
    }
    console.log(`[songs.wordTimestamps] songId=${songId} words=${words.length}`);
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
    console.log(`[songs.import] start userId=${req.userId} youtubeId=${youtubeId}`);

    let song = await prisma.song.findFirst({ where: { youtubeId } });
    let justCreated = false;
    if (!song) {
      const metadata = await fetchVideoMetadata(youtubeId);
      const resolvedTitle = (input.title || metadata.title || youtubeId).trim();
      const resolvedArtist = (input.artist || metadata.artist || 'Desconhecido').trim();
      const slugBase = resolvedTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      song = await prisma.song.create({
        data: {
          slug: `${slugBase}-${Date.now().toString(36)}`,
          title: resolvedTitle || 'Musica importada',
          artist: resolvedArtist || 'Desconhecido',
          youtubeId,
          level: 'A1',
          themes: ['imported'],
          month: 1,
        },
      });
      justCreated = true;
      console.log(`[songs.import] created songId=${song.id} youtubeId=${youtubeId}`);
    } else {
      console.log(`[songs.import] found songId=${song.id} youtubeId=${youtubeId}`);
    }
    if (!song) throw new HttpError(404, 'Musica nao encontrada');
    const songData = song;
    const songId = songData.id;
    if (justCreated) {
      await prisma.xpLog.create({
        data: {
          userId: req.userId,
          amount: XP_CONFIG.song_imported,
          source: 'lyrics',
          detail: `song_imported:${songData.id}|${songData.youtubeId}`,
        },
      });
    }

    const lyricsImported = false;
    const importError = null;
    const audioImportError = null;

    const linesCount = await prisma.songLyricLine.count({ where: { songId } });
    const wordCount = await prisma.songWordTimestamp.count({ where: { songId } });
    console.log(
      `[songs.import] done songId=${songId} justCreated=${justCreated} lines=${linesCount} words=${wordCount} lyricsImported=${lyricsImported} importError=${importError ?? 'none'} audioImportError=${audioImportError ?? 'none'}`,
    );

    res.json({
      success: true,
      justCreated,
      songId,
      linesCount,
      wordTimestampsCount: wordCount,
      message: 'Musica importada com sucesso',
      lyricsImported,
      importError,
      audioImportError,
      song: {
        id: songData.id,
        slug: songData.slug,
        title: songData.title,
        artist: songData.artist,
        youtubeId: songData.youtubeId,
        level: songData.level,
        audioUrl: songData.audioUrl || null,
        audioDurationMs: songData.audioDurationMs || 0,
      },
    });
  }),
);

songsRouter.patch(
  '/:songId/word-timestamps-json',
  authMiddleware,
  asyncHandler(async (req, res) => {
    if (!req.userId) throw new HttpError(401, 'Nao autorizado');
    const songId = z.coerce.number().int().positive().parse(req.params.songId);
    const payload = z
      .object({
        words: z.array(
          z.object({
            word: z.string().min(1),
            start: z.number(),
            end: z.number(),
          }),
        ),
      })
      .parse(req.body);

    const existing = await prisma.song.findUnique({ where: { id: songId }, select: { id: true } });
    if (!existing) throw new HttpError(404, 'Musica nao encontrada');

    await prisma.$transaction([prisma.songLyricLine.deleteMany({ where: { songId } }), prisma.songWordTimestamp.deleteMany({ where: { songId } })]);
    await (prisma as unknown as { song: { update: (args: unknown) => Promise<unknown> } }).song.update({
      where: { id: songId },
      data: { wordTimestampsJson: payload.words },
    });

    const parsedWords = parseWordTimestampsJson(payload.words, songId);
    const parsedLines = buildLyricLinesFromWords(parsedWords);

    res.json({
      success: true,
      songId,
      wordsCount: parsedWords.length,
      linesCount: parsedLines.length,
      message: 'Timestamps JSON salvos com sucesso',
    });
  }),
);
