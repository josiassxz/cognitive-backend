import { Router } from 'express';
import { z } from 'zod';
import { cleanupTempFile, extractYoutubeAudio } from '../lib/youtube-audio';
import { uploadToStorage } from '../lib/storage';
import { transcribeWithWhisper } from '../lib/whisper';
import { XP_CONFIG } from '../lib/xp';
import { authMiddleware } from '../middleware/auth';
import { prisma } from '../lib/prisma';
import { asyncHandler } from '../utils/async-handler';
import { HttpError } from '../utils/http-error';

type TranscriptLine = { startMs: number; endMs: number; text: string };
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

function decodeXmlEntities(input: string): string {
  return input
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_, code: string) => String.fromCharCode(Number.parseInt(code, 10)));
}

async function fetchYoutubeTranscript(videoId: string): Promise<TranscriptLine[]> {
  const pageRes = await fetch(`https://www.youtube.com/watch?v=${videoId}`, {
    headers: {
      'User-Agent': 'Mozilla/5.0',
      'Accept-Language': 'en-US,en;q=0.9',
    },
  });
  const html = await pageRes.text();
  const tracksMatch = html.match(/"captionTracks":(\[[^\]]+\])/);
  if (!tracksMatch) {
    throw new HttpError(422, 'Este video nao possui legendas disponiveis');
  }

  const tracks = JSON.parse(tracksMatch[1]) as Array<{ languageCode?: string; kind?: string; baseUrl?: string }>;
  const selectedTrack =
    tracks.find((track) => track.languageCode === 'en' && !track.kind) ??
    tracks.find((track) => track.languageCode === 'en') ??
    tracks[0];

  if (!selectedTrack?.baseUrl) {
    throw new HttpError(422, 'Nao foi possivel acessar as legendas do video');
  }

  const captionRes = await fetch(selectedTrack.baseUrl);
  const xml = await captionRes.text();
  const lines: TranscriptLine[] = [];
  const regex = /<text start="([\d.]+)" dur="([\d.]+)"[^>]*>([\s\S]*?)<\/text>/g;
  let match: RegExpExecArray | null = regex.exec(xml);

  while (match) {
    const startSec = Number.parseFloat(match[1]);
    const durSec = Number.parseFloat(match[2]);
    const text = decodeXmlEntities(match[3]).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    if (text) {
      lines.push({
        startMs: Math.round(startSec * 1000),
        endMs: Math.round((startSec + durSec) * 1000),
        text,
      });
    }
    match = regex.exec(xml);
  }

  return lines;
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

async function listLyrics(songId: number): Promise<PersistedLyricLine[]> {
  return ((prisma as unknown as { songLyricLine: { findMany: (args: unknown) => Promise<PersistedLyricLine[]> } }).songLyricLine.findMany({
    where: { songId },
    orderBy: { lineIndex: 'asc' },
    select: { id: true, lineIndex: true, startMs: true, endMs: true, text: true, translation: true },
  })) as Promise<PersistedLyricLine[]>;
}

async function listWordTimestamps(songId: number): Promise<PersistedWordTimestamp[]> {
  return prisma.songWordTimestamp.findMany({
    where: { songId },
    orderBy: [{ lineIndex: 'asc' }, { wordIndex: 'asc' }],
    select: { id: true, lineIndex: true, wordIndex: true, word: true, startMs: true, endMs: true },
  });
}

mobileRouter.post(
  '/import-song',
  authMiddleware,
  asyncHandler(async (req, res) => {
    const userId = req.userId;
    if (!userId) throw new HttpError(401, 'Nao autorizado');

    const input = z
      .object({
        youtubeUrl: z.string().min(1),
      })
      .parse(req.body);

    const youtubeId = extractYoutubeId(input.youtubeUrl);
    if (!youtubeId) throw new HttpError(400, 'URL do YouTube invalida');

    let song = await prisma.song.findFirst({ where: { youtubeId } });

    let justCreated = false;
    if (!song) {
      const metadata = await fetchVideoMetadata(youtubeId);
      const title = metadata.title.trim() || 'Musica importada';
      const artist = metadata.artist.trim() || 'Desconhecido';
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '') || 'musica-importada';
      const existingSlug = await prisma.song.findFirst({ where: { slug } });
      if (existingSlug) {
        throw new HttpError(409, 'Ja existe musica com este titulo');
      }

      song = await prisma.song.create({
        data: {
          slug,
          title,
          artist,
          youtubeId,
          level: 'Intermediario',
          themes: ['imported'],
          month: 1,
        },
      });
      justCreated = true;
    }
    if (!song) throw new HttpError(404, 'Musica nao encontrada');
    const songId = song.id;
    let songLyrics = await listLyrics(songId);
    let wordTimestamps = await listWordTimestamps(songId);

    let lyricsImported = false;
    let importError: string | null = null;

    if (songLyrics.length === 0) {
      try {
        const transcript = await fetchYoutubeTranscript(youtubeId);
        if (transcript.length > 0) {
          await (
            prisma as unknown as {
              songLyricLine: { createMany: (args: unknown) => Promise<unknown> };
            }
          ).songLyricLine.createMany({
            data: transcript.map((line, index) => ({
              songId,
              lineIndex: index,
              startMs: line.startMs,
              endMs: line.endMs,
              text: line.text,
            })),
          });
          lyricsImported = true;
          songLyrics = await listLyrics(songId);
        } else {
          importError = 'Nenhuma legenda encontrada neste video';
        }
      } catch (error) {
        importError = error instanceof Error ? error.message : 'Erro ao extrair legendas';
      }
    }

    let audioImportError: string | null = null;
    if (!song.audioUrl) {
      try {
        const { localPath, durationMs } = await extractYoutubeAudio(youtubeId);
        const audioUrl = await uploadToStorage(localPath, `songs/${youtubeId}.mp3`);
        const whisperResult = await transcribeWithWhisper(localPath);
        await prisma.song.update({
          where: { id: songId },
          data: { audioUrl, audioDurationMs: durationMs },
        });
        song = { ...song, audioUrl, audioDurationMs: durationMs };
        if (whisperResult.segments.length > 0 && wordTimestamps.length === 0) {
          const data: Array<{ songId: number; lineIndex: number; wordIndex: number; word: string; startMs: number; endMs: number }> = [];
          for (const segment of whisperResult.segments) {
            for (const [wordIndex, word] of (segment.words ?? []).entries()) {
              const trimmed = word.word.trim();
              if (!trimmed) continue;
              data.push({
                songId,
                lineIndex: segment.id,
                wordIndex,
                word: trimmed,
                startMs: Math.round(word.start * 1000),
                endMs: Math.round(word.end * 1000),
              });
            }
          }
          if (data.length > 0) {
            await prisma.songWordTimestamp.createMany({
              data,
              skipDuplicates: true,
            });
          }
          wordTimestamps = await listWordTimestamps(songId);
        }
        await cleanupTempFile(localPath);
      } catch (error) {
        audioImportError = error instanceof Error ? error.message : 'Erro ao processar audio';
      }
    }

    if (justCreated) {
      await prisma.xpLog.create({
        data: {
          userId,
          amount: XP_CONFIG.song_imported ?? 10,
          source: 'lyrics',
          detail: `song_imported:${song.id}|${song.youtubeId}`,
        },
      });
    }

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
