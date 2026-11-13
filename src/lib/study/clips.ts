// Recorta o áudio de uma frase (playStartMs..playEndMs) do MP3 do livro com ffmpeg.
// Os recortes ficam em cache em MEDIA_ROOT/cache/study-clips e servem tanto ao estudo
// no app (URL assinada de /media) quanto à exportação para o Anki.
import { execFile } from 'node:child_process';
import { createHash } from 'node:crypto';
import { mkdir, rename, stat } from 'node:fs/promises';
import path from 'node:path';
import { promisify } from 'node:util';
import { getPlayableStorageUrl, resolveMediaPath, signMediaUrl } from '../storage';

const run = promisify(execFile);
const MEDIA_SCHEME = 'media://';
const FFMPEG = process.env.FFMPEG_PATH || 'ffmpeg';

export interface ClipSource {
  contentId: number;
  audioUrl: string;
}

export interface ClipSegment {
  segmentKey: string;
  startMs: number;
  endMs: number;
}

export function clipStorageKey(contentId: number, segment: ClipSegment): string {
  const hash = createHash('sha1').update(`${segment.segmentKey}:${segment.startMs}:${segment.endMs}`).digest('hex').slice(0, 20);
  return `cache/study-clips/${contentId}/${hash}.mp3`;
}

async function exists(file: string): Promise<boolean> {
  try {
    return (await stat(file)).size > 0;
  } catch {
    return false;
  }
}

async function resolveSource(audioUrl: string): Promise<string> {
  if (audioUrl.startsWith(MEDIA_SCHEME)) return resolveMediaPath(audioUrl.slice(MEDIA_SCHEME.length));
  const url = await getPlayableStorageUrl(audioUrl);
  if (!/^https?:\/\//.test(url)) throw new Error('áudio do conteúdo indisponível para recorte');
  return url;
}

const inflight = new Map<string, Promise<string>>();

/** Caminho local do recorte (gera se ainda não existe). */
export function ensureClip(source: ClipSource, segment: ClipSegment): Promise<string> {
  const key = clipStorageKey(source.contentId, segment);
  const pending = inflight.get(key);
  if (pending) return pending;
  const job = (async () => {
    const target = resolveMediaPath(key);
    if (await exists(target)) return target;
    await mkdir(path.dirname(target), { recursive: true });
    const input = await resolveSource(source.audioUrl);
    const start = Math.max(segment.startMs, 0) / 1000;
    const duration = Math.max(segment.endMs - segment.startMs, 200) / 1000;
    const tmp = `${target}.${process.pid}.tmp.mp3`;
    await run(
      FFMPEG,
      ['-v', 'error', '-y', '-ss', start.toFixed(3), '-t', duration.toFixed(3), '-i', input,
        '-vn', '-ac', '1', '-ar', '44100', '-c:a', 'libmp3lame', '-b:a', '64k', tmp],
      { timeout: 60_000 },
    );
    await rename(tmp, target);
    return target;
  })().finally(() => inflight.delete(key));
  inflight.set(key, job);
  return job;
}

/** URL assinada (de /media) do recorte, para tocar no app. */
export async function clipUrl(source: ClipSource, segment: ClipSegment): Promise<string> {
  await ensureClip(source, segment);
  return signMediaUrl(clipStorageKey(source.contentId, segment));
}

/** Executa tarefas com concorrência limitada, preservando a ordem dos resultados. */
export async function mapLimit<T, R>(items: T[], limit: number, fn: (item: T, index: number) => Promise<R>): Promise<R[]> {
  const results = new Array<R>(items.length);
  let next = 0;
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (next < items.length) {
      const index = next++;
      results[index] = await fn(items[index], index);
    }
  });
  await Promise.all(workers);
  return results;
}
