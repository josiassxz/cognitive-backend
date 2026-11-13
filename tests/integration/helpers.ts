import { createHash, randomBytes } from 'node:crypto';
import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';

export const hasDatabase = Boolean(process.env.TEST_DATABASE_URL);

/** Cria uma raiz de mídia temporária com um "mp3" de bytes aleatórios e devolve seus dados. */
export function createMediaRoot() {
  const root = mkdtempSync(path.join(os.tmpdir(), 'cn-media-'));
  mkdirSync(path.join(root, 'reading'), { recursive: true });
  const bytes = randomBytes(4096);
  const storageKey = `reading/fixture-${randomBytes(4).toString('hex')}.mp3`;
  writeFileSync(path.join(root, storageKey), bytes);
  return { root, storageKey, bytes, sha256: createHash('sha256').update(bytes).digest('hex'), sizeBytes: bytes.length };
}

type Audio = { storageKey: string; sha256: string; sizeBytes: number };

/**
 * Pacote sintético coerente. `boundaries` define onde cada trecho termina (índice da última
 * palavra), permitindo simular uma nova segmentação do mesmo áudio.
 */
export function buildPackage(audio: Audio, boundaries: number[] = [3, 7, 11], overrides: Record<string, unknown> = {}) {
  const tokens = 'Once upon a time, there lived a little girl. She set out immediately.'.split(' ');
  const words = tokens.map((word, index) => ({
    id: `w${String(index + 1).padStart(6, '0')}`,
    word,
    startMs: 1000 + index * 400,
    endMs: 1000 + index * 400 + 300,
    timeSource: 'aligner' as const,
    score: 0.9,
  }));
  const contentKey = `sha256-${audio.sha256}`;
  let start = 0;
  const segments = boundaries.map((last, index) => {
    const segmentWords = words.slice(start, last + 1);
    start = last + 1;
    const id = `seg_${createHash('sha256').update(`${contentKey}:${segmentWords[0].id}:${segmentWords.at(-1)!.id}`).digest('hex').slice(0, 16)}`;
    const translation = `Tradução ${index + 1} partiu`;
    return {
      id,
      index,
      text: segmentWords.map((word) => word.word).join(' '),
      translation,
      startMs: segmentWords[0].startMs,
      endMs: segmentWords.at(-1)!.endMs,
      playStartMs: segmentWords[0].startMs - 50,
      playEndMs: segmentWords.at(-1)!.endMs + 50,
      quality: 'ok' as const,
      reviewReasons: [] as string[],
      highlights: [{ wordIds: [segmentWords[0].id], pt: { start: translation.indexOf('partiu'), end: translation.length, text: 'partiu' } }],
      words: segmentWords,
    };
  });
  const pkg = {
    schemaVersion: 1,
    contentKey,
    revision: 'pipeline-v1',
    source: 'reconstructed_audio',
    title: 'Fixture Story',
    titleConfirmed: false,
    author: 'Tester',
    authorConfirmed: false,
    language: 'en',
    audio: { ...audio, durationMs: 60_000, codec: 'mp3', channels: 1, sampleRate: 16000 },
    cover: { storageKey: null, confirmed: false },
    quality: { status: 'needs_review', auditoryValidation: 'pending', alignedRatio: 1 },
    translation: { status: 'complete', target: 'pt-BR', highlightOffsets: 'utf16' },
    provenance: { pipelineRevision: 'pipeline-v1' },
    segments,
    ...overrides,
  };
  const packageHash = createHash('sha256').update(JSON.stringify({ ...pkg, provenance: undefined })).digest('hex');
  return { ...pkg, packageHash };
}
