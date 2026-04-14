import { prisma } from '../lib/prisma';
import { parseWordTimestampsJson, buildLyricLinesFromWords } from '../routes/songs';

type TranscriptSegment = {
  text?: string;
  offset?: number;
  start?: number;
  startMs?: number;
  duration?: number;
  dur?: number;
  durationMs?: number;
  words?: Array<{ word?: string; start?: number; end?: number }>;
};

export type FlatWord = { word: string; start: number; end: number };

// Detecta se o maior timestamp do array sugere segundos (< 10000) ou ms (>= 10000)
// e devolve um divisor para normalizar tudo para segundos.
function detectSecondsDivisor(values: number[]): number {
  const max = values.reduce((m, v) => (v > m ? v : m), 0);
  return max >= 10000 ? 1000 : 1;
}

/**
 * Converte o transcript salvo em Transcript ([{text, offset, duration, words?}])
 * para o formato canônico usado por Song.wordTimestampsJson: [{word, start, end}]
 * em SEGUNDOS.
 *
 * Se um segmento tem `words`, usa o word-level timing direto. Se não, distribui
 * linearmente o tempo da linha entre as palavras do texto.
 */
export function transcriptToFlatWords(transcript: TranscriptSegment[]): FlatWord[] {
  if (!Array.isArray(transcript) || transcript.length === 0) return [];

  const allTimings: number[] = [];
  for (const seg of transcript) {
    const offset = Number(seg.offset ?? seg.start ?? seg.startMs ?? 0) || 0;
    const dur = Number(seg.duration ?? seg.dur ?? seg.durationMs ?? 0) || 0;
    allTimings.push(offset, offset + dur);
    if (Array.isArray(seg.words)) {
      for (const w of seg.words) {
        if (typeof w?.start === 'number') allTimings.push(w.start);
        if (typeof w?.end === 'number') allTimings.push(w.end);
      }
    }
  }
  const divisor = detectSecondsDivisor(allTimings);

  const out: FlatWord[] = [];
  for (const seg of transcript) {
    if (Array.isArray(seg.words) && seg.words.length > 0) {
      for (const w of seg.words) {
        const word = typeof w.word === 'string' ? w.word.trim() : '';
        if (!word) continue;
        const start = Number(w.start) || 0;
        const end = Number(w.end) || start;
        out.push({ word, start: start / divisor, end: end / divisor });
      }
      continue;
    }
    const text = typeof seg.text === 'string' ? seg.text.trim() : '';
    if (!text) continue;
    const parts = text.split(/\s+/).filter(Boolean);
    if (parts.length === 0) continue;
    const startRaw = Number(seg.offset ?? seg.start ?? seg.startMs ?? 0) || 0;
    const durRaw = Number(seg.duration ?? seg.dur ?? seg.durationMs ?? 0) || 0;
    const start = startRaw / divisor;
    const duration = durRaw > 0 ? durRaw / divisor : 3;
    const step = duration / parts.length;
    for (let i = 0; i < parts.length; i++) {
      out.push({ word: parts[i], start: start + i * step, end: start + (i + 1) * step });
    }
  }
  return out.sort((a, b) => a.start - b.start);
}

/**
 * Sincroniza um transcript recém-salvo em Transcript com a row correspondente
 * em Song (match por youtubeId), persistindo:
 *   - Song.wordTimestampsJson (formato canônico [{word,start,end}] em segundos)
 *   - SongLyricLine (linhas agrupadas)
 *   - SongWordTimestamp (timestamps word-level)
 *
 * Idempotente: apaga as tabelas normalizadas antes de re-popular.
 * Se não existir Song com esse youtubeId, é no-op.
 */
export async function syncTranscriptToSong(
  videoId: string,
  transcript: TranscriptSegment[],
  options: { force?: boolean } = {},
): Promise<{ songId: number; words: number; lines: number } | null> {
  const song = await prisma.song.findFirst({
    where: { youtubeId: videoId },
    select: { id: true, wordTimestampsJson: true },
  });
  if (!song) return null;

  // Short-circuit: já populado e sem force = nada a fazer.
  if (!options.force) {
    const existing = song.wordTimestampsJson;
    if (Array.isArray(existing) && existing.length > 0) return null;
  }

  const flatWords = transcriptToFlatWords(transcript);
  if (flatWords.length === 0) return null;

  const parsedWords = parseWordTimestampsJson(flatWords, song.id);
  const parsedLines = buildLyricLinesFromWords(parsedWords);

  await prisma.$transaction([
    prisma.songLyricLine.deleteMany({ where: { songId: song.id } }),
    prisma.songWordTimestamp.deleteMany({ where: { songId: song.id } }),
    (prisma as unknown as { song: { update: (args: unknown) => Promise<unknown> } }).song.update({
      where: { id: song.id },
      data: { wordTimestampsJson: flatWords },
    }) as unknown as ReturnType<typeof prisma.song.findFirst>,
    prisma.songLyricLine.createMany({
      data: parsedLines.map((line) => ({
        songId: song.id,
        lineIndex: line.lineIndex,
        startMs: line.startMs,
        endMs: line.endMs,
        text: line.text,
        translation: line.translation,
      })),
    }),
    prisma.songWordTimestamp.createMany({
      data: parsedWords.map((word) => ({
        songId: song.id,
        lineIndex: word.lineIndex,
        wordIndex: word.wordIndex,
        word: word.word,
        startMs: word.startMs,
        endMs: word.endMs,
      })),
    }),
  ]);

  console.log(
    `[song-lyrics-sync] songId=${song.id} videoId=${videoId} words=${parsedWords.length} lines=${parsedLines.length}`,
  );
  return { songId: song.id, words: parsedWords.length, lines: parsedLines.length };
}
