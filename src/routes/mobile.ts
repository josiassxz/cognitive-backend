import { Router } from 'express';
import { z } from 'zod';
import { XP_CONFIG } from '../lib/xp';
import { authMiddleware } from '../middleware/auth';
import { prisma } from '../lib/prisma';
import { asyncHandler } from '../utils/async-handler';
import { HttpError } from '../utils/http-error';

type PersistedLyricLine = { id: number; lineIndex: number; startMs: number; endMs: number; text: string; translation: string };
type PersistedWordTimestamp = { id: number; lineIndex: number; wordIndex: number; word: string; startMs: number; endMs: number };

export const mobileRouter = Router();

function extractYoutubeId(input: string): string | null {
  const patterns = [
    /youtu\.be\/([a-zA-Z0-9_-]{11})/,
    /[?&]v=([a-zA-Z0-9_-]{11})/,
    /embed\/([a-zA-Z0-9_-]{11})/,
    /shorts\/([a-zA-Z0-9_-]{11})/,
    /^([a-zA-Z0-9_-]{11})$/,
  ];

  for (const pattern of patterns) {
    const match = input.trim().match(pattern);
    if (match) return match[1];
  }

  return null;
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

function parseWordTimestampsJson(rawJson: unknown): PersistedWordTimestamp[] {
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

  const words: PersistedWordTimestamp[] = [];
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

function buildLyricLinesFromWords(words: PersistedWordTimestamp[]): PersistedLyricLine[] {
  if (words.length === 0) return [];
  const byLine = new Map<number, PersistedWordTimestamp[]>();
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
      lineIndex,
      startMs: ordered[0].startMs,
      endMs: ordered[ordered.length - 1].endMs,
      text: ordered.map((item) => item.word).join(' '),
      translation: '',
    } satisfies PersistedLyricLine;
  });
}

async function listWordTimestamps(songId: number, rawJson: unknown): Promise<PersistedWordTimestamp[]> {
  const persisted = await prisma.songWordTimestamp.findMany({
    where: { songId },
    orderBy: [{ lineIndex: 'asc' }, { wordIndex: 'asc' }],
    select: { id: true, lineIndex: true, wordIndex: true, word: true, startMs: true, endMs: true },
  });
  if (persisted.length > 0) return persisted;
  return parseWordTimestampsJson(rawJson);
}

async function listLyrics(songId: number, rawJson: unknown): Promise<PersistedLyricLine[]> {
  const persisted = await ((prisma as unknown as { songLyricLine: { findMany: (args: unknown) => Promise<PersistedLyricLine[]> } }).songLyricLine.findMany({
    where: { songId },
    orderBy: { lineIndex: 'asc' },
    select: { id: true, lineIndex: true, startMs: true, endMs: true, text: true, translation: true },
  })) as PersistedLyricLine[];
  if (persisted.length > 0) return persisted;
  const words = parseWordTimestampsJson(rawJson);
  return buildLyricLinesFromWords(words);
}

mobileRouter.post(
  '/import-song',
  authMiddleware,
  asyncHandler(async (req, res) => {
    res.set("Deprecation", "true");
    res.set("Sunset", "2026-12-31");
    res.set("Link", "</api/library/items>; rel=\"successor-version\"");

    const userId = req.userId;
    if (!userId) throw new HttpError(401, 'Nao autorizado');

    const input = z
      .object({
        youtubeUrl: z.string().min(1),
      })
      .parse(req.body);

    const youtubeId = extractYoutubeId(input.youtubeUrl);
    if (!youtubeId) throw new HttpError(400, 'URL do YouTube invalida');
    console.log(`[mobile.importSong] start userId=${userId} youtubeId=${youtubeId}`);

    let song = await prisma.song.findFirst({ where: { youtubeId } });

    let justCreated = false;
    if (!song) {
      const metadata = await fetchVideoMetadata(youtubeId);
      const title = metadata.title.trim() || 'Musica importada';
      const artist = metadata.artist.trim() || 'Desconhecido';
      const slugBase = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '') || 'musica-importada';
      const slug = `${slugBase}-${Date.now().toString(36)}`;

      song = await prisma.song.create({
        data: {
          slug,
          title,
          artist,
          youtubeId,
          level: 'A1',
          themes: ['imported'],
          month: 1,
        },
      });
      justCreated = true;
      console.log(`[mobile.importSong] created songId=${song.id} youtubeId=${youtubeId} slug=${song.slug}`);
    } else {
      console.log(`[mobile.importSong] found songId=${song.id} youtubeId=${youtubeId}`);
    }
    if (!song) throw new HttpError(404, 'Musica nao encontrada');
    const songId = song.id;
    const songWordsJson = (song as unknown as { wordTimestampsJson?: unknown }).wordTimestampsJson ?? null;
    let songLyrics = await listLyrics(songId, songWordsJson);
    let wordTimestamps = await listWordTimestamps(songId, songWordsJson);
    console.log(
      `[mobile.importSong] existing data songId=${songId} lyrics=${songLyrics.length} words=${wordTimestamps.length} jsonWords=${songWordsJson ? 'yes' : 'no'}`,
    );

    const lyricsImported = false;
    const importError = null;
    const audioImportError = null;

    if (justCreated) {
      await prisma.xpLog.create({
        data: {
          userId,
          amount: XP_CONFIG.song_imported ?? 10,
          source: 'lyrics',
          detail: `song_imported:${song.id}|${song.youtubeId}`,
        },
      });
      console.log(`[mobile.importSong] xp granted userId=${userId} songId=${songId}`);
    }
    console.log(
      `[mobile.importSong] done songId=${songId} justCreated=${justCreated} lyrics=${songLyrics.length} words=${wordTimestamps.length} lyricsImported=${lyricsImported} importError=${importError ?? 'none'} audioImportError=${audioImportError ?? 'none'}`,
    );

    res.json({
      success: true,
      justCreated,
      lyricsImported,
      importError,
      song: {
        id: song.id,
        slug: song.slug,
        title: song.title,
        artist: song.artist,
        youtubeId: song.youtubeId,
        level: song.level,
        audioUrl: song.audioUrl || null,
        audioDurationMs: song.audioDurationMs || 0,
        hasLyrics: songLyrics.length > 0,
        linesCount: songLyrics.length,
        lines: songLyrics,
        wordTimestamps,
      },
      audioImportError,
    });
  }),
);
