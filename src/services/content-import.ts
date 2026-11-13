// Importador idempotente de pacotes `content.import.json` gerados pelo audio-pipeline.
//
// Garantias:
//   - valida schema, coerência temporal, partição das palavras e (no driver filesystem)
//     existência/hash/tamanho do áudio antes de tocar no banco;
//   - uma transação por conteúdo;
//   - reimportar o mesmo pacote é no-op (não duplica conteúdo, progresso nem XP — importar
//     nunca gera XP);
//   - nova segmentação não apaga checks dos usuários: os trechos que continuam existindo
//     (mesmo segmentKey) mantêm o progresso; os que deixam de existir ficam `orphanedAt`
//     e voltam a valer se o trecho reaparecer. O relatório informa quantos foram afetados.
//   - conteúdo com edições manuais no editor não é sobrescrito sem `force`.
import { createHash } from 'node:crypto';
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { Prisma } from '@prisma/client';
import { z } from 'zod';
import { env } from '../config/env';
import { prisma } from '../lib/prisma';
import { mediaFileExists, mediaRef, normalizeStorageKey, resolveMediaPath } from '../lib/storage';
import { HttpError } from '../utils/http-error';

const storageKey = z
  .string()
  .min(1)
  .max(1024)
  .refine((value) => {
    try {
      normalizeStorageKey(value);
      return true;
    } catch {
      return false;
    }
  }, 'storageKey inválido');

const wordSchema = z.object({
  id: z.string().min(1),
  word: z.string().min(1),
  startMs: z.number().int().min(0),
  endMs: z.number().int().min(1),
  timeSource: z.enum(['aligner', 'asr', 'interpolated']),
  score: z.number().optional(),
});

const highlightSchema = z.object({
  wordIds: z.array(z.string().min(1)).min(1),
  pt: z.object({ start: z.number().int().min(0), end: z.number().int().min(1), text: z.string().min(1) }),
});

const segmentSchema = z.object({
  id: z.string().regex(/^seg_[0-9a-f]{16}$/),
  index: z.number().int().min(0),
  text: z.string().min(1),
  translation: z.string().nullable(),
  startMs: z.number().int().min(0),
  endMs: z.number().int().min(1),
  playStartMs: z.number().int().min(0),
  playEndMs: z.number().int().min(1),
  quality: z.enum(['ok', 'needs_review']),
  reviewReasons: z.array(z.string()),
  highlights: z.array(highlightSchema),
  words: z.array(wordSchema).min(1),
});

export const contentPackageSchema = z.object({
  schemaVersion: z.literal(1),
  contentKey: z.string().regex(/^sha256-[0-9a-f]{64}$/),
  revision: z.string().min(1),
  source: z.literal('reconstructed_audio'),
  title: z.string().min(1).max(300),
  titleConfirmed: z.boolean(),
  author: z.string().max(300).optional(),
  authorConfirmed: z.boolean().optional(),
  language: z.string().min(2).max(10),
  packageHash: z.string().regex(/^[0-9a-f]{64}$/),
  audio: z.object({
    storageKey,
    sha256: z.string().regex(/^[0-9a-f]{64}$/),
    sizeBytes: z.number().int().min(1),
    durationMs: z.number().int().min(1),
    codec: z.string().optional(),
    channels: z.number().int().optional(),
    sampleRate: z.number().int().optional(),
  }),
  cover: z.object({ storageKey: storageKey.nullable(), confirmed: z.boolean() }),
  quality: z
    .object({
      status: z.enum(['needs_review', 'ready']),
      auditoryValidation: z.enum(['pending', 'done']),
      alignedRatio: z.number().min(0).max(1),
    })
    .passthrough(),
  translation: z
    .object({
      status: z.enum(['complete', 'translation_pending']),
      target: z.literal('pt-BR'),
      highlightOffsets: z.literal('utf16'),
    })
    .passthrough(),
  provenance: z.record(z.unknown()),
  segments: z.array(segmentSchema).min(1),
});

export type ContentPackage = z.infer<typeof contentPackageSchema>;

export type ImportReport = {
  dryRun: boolean;
  action: 'created' | 'updated' | 'noop';
  contentId: number | null;
  contentKey: string;
  revision: string;
  segments: number;
  words: number;
  translationStatus: string;
  publishStatus: string;
  progress: { kept: number; orphaned: number; restored: number };
  media: { driver: string; audioChecked: boolean; coverFound: boolean | null };
  warnings: string[];
};

/** Erros de coerência que o schema sozinho não pega. */
export function structuralErrors(pkg: ContentPackage): string[] {
  const errors: string[] = [];
  const duration = pkg.audio.durationMs;
  if (pkg.contentKey !== `sha256-${pkg.audio.sha256}`) {
    errors.push('contentKey não corresponde ao hash do áudio');
  }
  const segmentIds = new Set<string>();
  const wordIds = new Set<string>();
  let previousWordEnd = 0;
  pkg.segments.forEach((segment, position) => {
    const label = `${segment.id} (#${position})`;
    if (segmentIds.has(segment.id)) errors.push(`${label}: id de trecho repetido`);
    segmentIds.add(segment.id);
    if (segment.index !== position) errors.push(`${label}: index fora de sequência`);
    if (!(segment.startMs < segment.endMs && segment.endMs <= duration)) errors.push(`${label}: intervalo inválido`);
    if (!(segment.playStartMs <= segment.startMs && segment.endMs <= segment.playEndMs && segment.playEndMs <= duration)) {
      errors.push(`${label}: limites de reprodução não contêm o trecho`);
    }
    if (segment.playStartMs < previousWordEnd) errors.push(`${label}: playStartMs invade o trecho anterior`);
    const first = segment.words[0];
    const last = segment.words[segment.words.length - 1];
    if (segment.startMs !== first.startMs || segment.endMs !== last.endMs) {
      errors.push(`${label}: startMs/endMs não derivam das palavras`);
    }
    if (segment.text !== segment.words.map((word) => word.word).join(' ')) {
      errors.push(`${label}: texto difere das palavras`);
    }
    const ownIds = new Set(segment.words.map((word) => word.id));
    for (const word of segment.words) {
      if (wordIds.has(word.id)) errors.push(`${label}: palavra ${word.id} repetida`);
      wordIds.add(word.id);
      if (!(word.startMs < word.endMs && word.endMs <= duration)) errors.push(`${label}: ${word.id} com intervalo inválido`);
      if (word.startMs < previousWordEnd) errors.push(`${label}: ${word.id} fora de ordem`);
      previousWordEnd = Math.max(previousWordEnd, word.endMs);
    }
    const next = pkg.segments[position + 1];
    if (next && segment.playEndMs > next.words[0].startMs) errors.push(`${label}: playEndMs invade o trecho seguinte`);
    if (pkg.translation.status === 'complete' && !segment.translation?.trim()) {
      errors.push(`${label}: tradução ausente em pacote marcado como completo`);
    }
    for (const highlight of segment.highlights) {
      if (!highlight.wordIds.every((id) => ownIds.has(id))) errors.push(`${label}: destaque com palavra fora do trecho`);
      const translation = segment.translation ?? '';
      // Offsets em unidades UTF-16 = índices de string do JavaScript.
      if (translation.slice(highlight.pt.start, highlight.pt.end) !== highlight.pt.text) {
        errors.push(`${label}: destaque PT não corresponde ao texto`);
      }
    }
  });
  return errors.slice(0, 50);
}

async function sha256OfFile(absolutePath: string): Promise<string> {
  const hash = createHash('sha256');
  await new Promise<void>((resolve, reject) => {
    createReadStream(absolutePath)
      .on('data', (chunk) => hash.update(chunk))
      .on('end', () => resolve())
      .on('error', reject);
  });
  return hash.digest('hex');
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/** Estimativa heurística (mesma regra já usada no Reading Lab); não é nível confirmado. */
function estimateCefrLevel(text: string): string {
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

const CEFR_MONTH: Record<string, number> = { a1: 1, a2: 2, b1: 3, b2: 4, c1: 5, c2: 6 };

export type SegmentSnapshot = {
  segmentKey: string | null;
  sentenceIndex: number;
  text: string;
  translation: string;
  startMs: number;
  endMs: number;
  playStartMs: number | null;
  playEndMs: number | null;
  quality: string;
  reviewReasons: string[];
  highlights: Prisma.JsonValue | null;
  note: string;
  words: { wordIndex: number; word: string; startMs: number; endMs: number; wordKey: string; timeSource: string; score: number | null }[];
};

export async function snapshotSegments(
  tx: Prisma.TransactionClient,
  contentId: number,
  segmentKeys?: string[],
): Promise<SegmentSnapshot[]> {
  const rows = await tx.readingSentence.findMany({
    where: { contentId, ...(segmentKeys ? { segmentKey: { in: segmentKeys } } : {}) },
    orderBy: { sentenceIndex: 'asc' },
    include: { wordTimestamps: { orderBy: { wordIndex: 'asc' } } },
  });
  return rows.map((row) => ({
    segmentKey: row.segmentKey,
    sentenceIndex: row.sentenceIndex,
    text: row.text,
    translation: row.translation,
    startMs: row.startMs,
    endMs: row.endMs,
    playStartMs: row.playStartMs,
    playEndMs: row.playEndMs,
    quality: row.quality,
    reviewReasons: row.reviewReasons,
    highlights: row.highlights,
    note: row.note,
    words: row.wordTimestamps.map((word) => ({
      wordIndex: word.wordIndex,
      word: word.word,
      startMs: word.startMs,
      endMs: word.endMs,
      wordKey: word.wordKey,
      timeSource: word.timeSource,
      score: word.score,
    })),
  }));
}

export async function insertSegments(tx: Prisma.TransactionClient, contentId: number, segments: SegmentSnapshot[]): Promise<void> {
  for (const segment of segments) {
    const created = await tx.readingSentence.create({
      data: {
        contentId,
        sentenceIndex: segment.sentenceIndex,
        text: segment.text,
        translation: segment.translation,
        startMs: segment.startMs,
        endMs: segment.endMs,
        segmentKey: segment.segmentKey,
        playStartMs: segment.playStartMs,
        playEndMs: segment.playEndMs,
        quality: segment.quality,
        reviewReasons: segment.reviewReasons,
        highlights: segment.highlights === null ? Prisma.JsonNull : (segment.highlights as Prisma.InputJsonValue),
        note: segment.note,
      },
    });
    if (segment.words.length > 0) {
      await tx.readingWordTimestamp.createMany({
        data: segment.words.map((word) => ({ sentenceId: created.id, ...word })),
      });
    }
  }
}

function packageSegments(pkg: ContentPackage): SegmentSnapshot[] {
  return pkg.segments.map((segment) => ({
    segmentKey: segment.id,
    sentenceIndex: segment.index,
    text: segment.text,
    translation: segment.translation ?? '',
    startMs: segment.startMs,
    endMs: segment.endMs,
    playStartMs: segment.playStartMs,
    playEndMs: segment.playEndMs,
    quality: segment.quality,
    reviewReasons: segment.reviewReasons,
    highlights: segment.highlights.map((highlight) => ({ wordKeys: highlight.wordIds, pt: highlight.pt })),
    note: '',
    words: segment.words.map((word, wordIndex) => ({
      wordIndex,
      word: word.word,
      startMs: word.startMs,
      endMs: word.endMs,
      wordKey: word.id,
      timeSource: word.timeSource,
      score: word.score ?? null,
    })),
  }));
}

export async function importContentPackage(
  rawPackage: unknown,
  options: { dryRun?: boolean; force?: boolean; userId?: string | null } = {},
): Promise<ImportReport> {
  const pkg = contentPackageSchema.parse(rawPackage);
  const errors = structuralErrors(pkg);
  if (errors.length > 0) {
    throw new HttpError(422, `Pacote incoerente: ${errors.slice(0, 5).join('; ')}`);
  }
  const dryRun = Boolean(options.dryRun);
  const warnings: string[] = [];

  // --- mídia ---------------------------------------------------------------------------
  let audioChecked = false;
  let coverFound: boolean | null = null;
  if (env.STORAGE_DRIVER === 'filesystem') {
    if (!(await mediaFileExists(pkg.audio.storageKey))) {
      throw new HttpError(422, `Áudio não encontrado no storage: ${pkg.audio.storageKey}. Copie a mídia antes de importar.`);
    }
    const audioPath = resolveMediaPath(pkg.audio.storageKey);
    const info = await stat(audioPath);
    if (info.size !== pkg.audio.sizeBytes) {
      throw new HttpError(422, 'Tamanho do áudio no storage difere do pacote');
    }
    if ((await sha256OfFile(audioPath)) !== pkg.audio.sha256) {
      throw new HttpError(422, 'Hash do áudio no storage difere do pacote');
    }
    audioChecked = true;
    if (pkg.cover.storageKey) {
      coverFound = await mediaFileExists(pkg.cover.storageKey);
      if (!coverFound) warnings.push(`Capa sugerida não encontrada no storage: ${pkg.cover.storageKey}`);
    }
  } else {
    warnings.push('Driver S3: existência e hash do áudio não foram conferidos pelo servidor.');
  }
  // A duração real é medida pelo worker (ffprobe) e conferida por ele contra a raiz de mídia;
  // o servidor garante o mesmo arquivo pelo hash e que nenhum tempo ultrapassa a duração.
  if (!pkg.titleConfirmed) warnings.push('Título derivado do nome do arquivo; revise no editor.');
  if (pkg.translation.status !== 'complete') warnings.push('Tradução pendente (translation_pending).');

  const existing = await prisma.readingContent.findUnique({
    where: { contentKey: pkg.contentKey },
    select: { id: true, packageHash: true, editVersion: true, publishStatus: true, title: true },
  });
  const words = pkg.segments.reduce((sum, segment) => sum + segment.words.length, 0);
  const baseReport = {
    dryRun,
    contentKey: pkg.contentKey,
    revision: pkg.revision,
    segments: pkg.segments.length,
    words,
    translationStatus: pkg.translation.status,
    media: { driver: env.STORAGE_DRIVER, audioChecked, coverFound },
  };

  // --- idempotência ----------------------------------------------------------------------
  if (existing && existing.packageHash === pkg.packageHash) {
    const report: ImportReport = {
      ...baseReport,
      action: 'noop',
      contentId: existing.id,
      publishStatus: existing.publishStatus,
      progress: { kept: 0, orphaned: 0, restored: 0 },
      warnings: [...warnings, 'Pacote idêntico ao já importado; nada foi alterado.'],
    };
    if (!dryRun) {
      await prisma.contentImport.create({
        data: { contentKey: pkg.contentKey, revision: pkg.revision, packageHash: pkg.packageHash, status: 'noop', report },
      });
    }
    return report;
  }
  if (existing && existing.editVersion > 0 && !options.force) {
    throw new HttpError(
      409,
      'Este conteúdo tem edições manuais feitas no editor. Reimporte com force=1 para substituí-las (as edições ficam no histórico e podem ser desfeitas).',
    );
  }

  const newKeys = pkg.segments.map((segment) => segment.id);
  const fullText = pkg.segments.map((segment) => segment.text).join(' ');
  const cefrLevel = estimateCefrLevel(fullText);
  const coverKey = pkg.cover.storageKey && coverFound !== false ? pkg.cover.storageKey : '';
  const contentData = {
    fullText,
    textHash: createHash('sha256').update(fullText).digest('hex'),
    wordCount: words,
    estimatedTimeMs: pkg.audio.durationMs,
    audioUrl: mediaRef(pkg.audio.storageKey),
    audioDurationMs: pkg.audio.durationMs,
    audioStorageKey: pkg.audio.storageKey,
    audioSha256: pkg.audio.sha256,
    audioMeta: {
      sizeBytes: pkg.audio.sizeBytes,
      codec: pkg.audio.codec ?? null,
      channels: pkg.audio.channels ?? null,
      sampleRate: pkg.audio.sampleRate ?? null,
    },
    language: pkg.language,
    pipelineRevision: pkg.revision,
    packageHash: pkg.packageHash,
    qualityStatus: pkg.quality.status,
    qualityReport: {
      ...pkg.quality,
      provenance: pkg.provenance,
      translation: pkg.translation,
      titleConfirmed: pkg.titleConfirmed,
      authorConfirmed: pkg.authorConfirmed ?? false,
      coverConfirmed: pkg.cover.confirmed,
      cefrLevelSource: 'heuristic_estimate',
    } as Prisma.InputJsonValue,
    translationStatus: pkg.translation.status,
  };

  if (dryRun) {
    let kept = 0;
    let orphaned = 0;
    if (existing) {
      kept = await prisma.userSegmentProgress.count({ where: { contentId: existing.id, segmentKey: { in: newKeys } } });
      orphaned = await prisma.userSegmentProgress.count({
        where: { contentId: existing.id, segmentKey: { notIn: newKeys }, orphanedAt: null },
      });
    }
    return {
      ...baseReport,
      action: existing ? 'updated' : 'created',
      contentId: existing?.id ?? null,
      publishStatus: existing?.publishStatus ?? 'needs_review',
      progress: { kept, orphaned, restored: 0 },
      warnings,
    };
  }

  const report = await prisma.$transaction(
    async (tx) => {
      let contentId: number;
      let publishStatus: string;
      const progress = { kept: 0, orphaned: 0, restored: 0 };
      if (existing) {
        contentId = existing.id;
        publishStatus = existing.publishStatus;
        const before = await snapshotSegments(tx, contentId);
        const current = await tx.readingContent.update({
          where: { id: contentId },
          data: { ...contentData, editVersion: { increment: 1 } },
          select: { editVersion: true },
        });
        await tx.readingRevision.create({
          data: {
            contentId,
            userId: options.userId ?? null,
            kind: 'import',
            note: `Importação do pacote ${pkg.packageHash.slice(0, 12)} (${pkg.revision})`,
            editVersion: current.editVersion,
            snapshot: { before, createdKeys: newKeys } as unknown as Prisma.InputJsonValue,
          },
        });
        await tx.readingSentence.deleteMany({ where: { contentId } });
        // Política de progresso: nada é apagado.
        const orphanedNow = await tx.userSegmentProgress.updateMany({
          where: { contentId, segmentKey: { notIn: newKeys }, orphanedAt: null },
          data: { orphanedAt: new Date() },
        });
        const restored = await tx.userSegmentProgress.updateMany({
          where: { contentId, segmentKey: { in: newKeys }, orphanedAt: { not: null } },
          data: { orphanedAt: null },
        });
        progress.orphaned = orphanedNow.count;
        progress.restored = restored.count;
        progress.kept = await tx.userSegmentProgress.count({ where: { contentId, segmentKey: { in: newKeys } } });
      } else {
        // Publicação é separada do processamento: conteúdo novo nunca entra publicado.
        publishStatus = 'needs_review';
        const created = await tx.readingContent.create({
          data: {
            ...contentData,
            title: pkg.title,
            author: pkg.author ?? '',
            slug: `${slugify(pkg.title) || 'reading'}-${pkg.audio.sha256.slice(0, 8)}`,
            coverUrl: coverKey ? mediaRef(coverKey) : '',
            coverStorageKey: coverKey,
            cefrLevel,
            month: CEFR_MONTH[cefrLevel] ?? 3,
            category: 'general',
            sourceType: 'reconstructed_audio',
            // Áudio reconstruído não tem voz/provedor TTS conhecido: não herdar defaults antigos.
            ttsProvider: 'none',
            ttsVoice: '',
            contentKey: pkg.contentKey,
            publishStatus,
          },
          select: { id: true },
        });
        contentId = created.id;
      }
      await insertSegments(tx, contentId, packageSegments(pkg));
      const result: ImportReport = {
        ...baseReport,
        action: existing ? 'updated' : 'created',
        contentId,
        publishStatus,
        progress,
        warnings,
      };
      await tx.contentImport.create({
        data: { contentKey: pkg.contentKey, revision: pkg.revision, packageHash: pkg.packageHash, status: 'applied', report: result },
      });
      return result;
    },
    { timeout: 120_000, maxWait: 20_000 },
  );
  return report;
}
