// Editor administrativo de revisão (montado em /api/admin/reading, só admin).
//
// Toda alteração:
//   - exige `expectedVersion` (controle de concorrência otimista → 409 se outra pessoa salvou antes);
//   - grava em ReadingRevision os trechos afetados como estavam (permite desfazer);
//   - roda em uma transação.
// Regras: editar a tradução não mexe em tempos; editar o inglês invalida o alinhamento do
// trecho (palavras ficam "stale" ou são removidas) e o conteúdo volta para needs_review.
import { createHash } from 'node:crypto';
import { Prisma } from '@prisma/client';
import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { getPlayableStorageUrl } from '../lib/storage';
import { insertSegments, snapshotSegments, type SegmentSnapshot } from '../services/content-import';
import { asyncHandler } from '../utils/async-handler';
import { HttpError } from '../utils/http-error';

export const readingEditorRouter = Router();

const idParam = z.coerce.number().int().positive();
const keyParam = z.string().regex(/^seg_[0-9a-f]{16}$/, 'Só trechos de conteúdo reconstruído podem ser editados');
const versioned = z.object({ expectedVersion: z.number().int().min(0) });

function segmentKeyFor(contentKey: string, firstWordKey: string, lastWordKey: string): string {
  return `seg_${createHash('sha256').update(`${contentKey}:${firstWordKey}:${lastWordKey}`).digest('hex').slice(0, 16)}`;
}

async function renumber(tx: Prisma.TransactionClient, contentId: number): Promise<void> {
  // Duas fases para não violar a unicidade (contentId, sentenceIndex) durante a troca.
  await tx.$executeRaw`UPDATE "ReadingSentence" SET "sentenceIndex" = "sentenceIndex" + 1000000 WHERE "contentId" = ${contentId}`;
  await tx.$executeRaw`
    UPDATE "ReadingSentence" s SET "sentenceIndex" = r.rn - 1
    FROM (SELECT id, row_number() OVER (ORDER BY "startMs", id) AS rn FROM "ReadingSentence" WHERE "contentId" = ${contentId}) r
    WHERE s.id = r.id`;
}

/** Checks de trechos que não existem mais ficam órfãos; os que existem voltam a valer. */
async function reconcileProgress(tx: Prisma.TransactionClient, contentId: number): Promise<void> {
  const keys = (await tx.readingSentence.findMany({ where: { contentId, segmentKey: { not: null } }, select: { segmentKey: true } }))
    .map((row) => row.segmentKey as string);
  await tx.userSegmentProgress.updateMany({
    where: { contentId, segmentKey: { notIn: keys }, orphanedAt: null },
    data: { orphanedAt: new Date() },
  });
  await tx.userSegmentProgress.updateMany({
    where: { contentId, segmentKey: { in: keys }, orphanedAt: { not: null } },
    data: { orphanedAt: null },
  });
}

type MutationResult = { createdKeys: string[]; warnings?: string[]; markNeedsReview?: boolean };

/**
 * Executa uma alteração versionada. `affectedKeys` são os trechos cujo estado anterior
 * precisa ser guardado para desfazer.
 */
async function mutate(
  contentId: number,
  expectedVersion: number,
  userId: string | undefined,
  kind: string,
  note: string,
  affectedKeys: string[],
  apply: (tx: Prisma.TransactionClient, content: { id: number; contentKey: string; audioDurationMs: number }) => Promise<MutationResult>,
) {
  return prisma.$transaction(
    async (tx) => {
      const bumped = await tx.readingContent.updateMany({
        where: { id: contentId, editVersion: expectedVersion, contentKey: { not: null } },
        data: { editVersion: { increment: 1 } },
      });
      if (bumped.count === 0) {
        const current = await tx.readingContent.findUnique({ where: { id: contentId }, select: { editVersion: true, contentKey: true } });
        if (!current) throw new HttpError(404, 'Conteúdo não encontrado');
        if (!current.contentKey) throw new HttpError(400, 'Só conteúdo reconstruído a partir de áudio pode ser editado aqui');
        throw new HttpError(409, `Conteúdo alterado por outra sessão (versão atual ${current.editVersion}). Recarregue e refaça a edição.`);
      }
      const content = await tx.readingContent.findUniqueOrThrow({
        where: { id: contentId },
        select: { id: true, contentKey: true, audioDurationMs: true, editVersion: true },
      });
      const before = affectedKeys.length ? await snapshotSegments(tx, contentId, affectedKeys) : [];
      if (before.length !== affectedKeys.length) throw new HttpError(404, 'Trecho não encontrado');
      const result = await apply(tx, { id: content.id, contentKey: content.contentKey as string, audioDurationMs: content.audioDurationMs });
      await tx.readingRevision.create({
        data: {
          contentId,
          userId: userId ?? null,
          kind,
          note,
          editVersion: content.editVersion,
          snapshot: { before, createdKeys: result.createdKeys } as unknown as Prisma.InputJsonValue,
        },
      });
      if (result.markNeedsReview) {
        await tx.readingContent.update({ where: { id: contentId }, data: { qualityStatus: 'needs_review' } });
      }
      return { editVersion: content.editVersion, warnings: result.warnings ?? [] };
    },
    { timeout: 60_000 },
  );
}

async function editorSegments(contentId: number, offset: number, limit: number) {
  const rows = await prisma.readingSentence.findMany({
    where: { contentId },
    orderBy: { sentenceIndex: 'asc' },
    skip: offset,
    take: limit,
    include: { wordTimestamps: { orderBy: { wordIndex: 'asc' } } },
  });
  return rows.map((row) => ({
    id: row.segmentKey ?? `sent_${row.id}`,
    index: row.sentenceIndex,
    text: row.text,
    translation: row.translation,
    startMs: row.startMs,
    endMs: row.endMs,
    playStartMs: row.playStartMs ?? row.startMs,
    playEndMs: row.playEndMs ?? row.endMs,
    quality: row.quality,
    reviewReasons: row.reviewReasons,
    note: row.note,
    words: row.wordTimestamps.map((word) => ({
      index: word.wordIndex, word: word.word, startMs: word.startMs, endMs: word.endMs, timeSource: word.timeSource, score: word.score,
    })),
  }));
}

// ----------------------------------------------------------------------------- leitura
readingEditorRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    const status = typeof req.query.status === 'string' ? req.query.status : undefined;
    const limit = z.coerce.number().int().min(1).max(200).default(50).parse(req.query.limit ?? 50);
    const offset = z.coerce.number().int().min(0).default(0).parse(req.query.offset ?? 0);
    const where = { contentKey: { not: null }, ...(status ? { publishStatus: status } : {}) };
    const [items, total, byStatus] = await Promise.all([
      prisma.readingContent.findMany({
        where,
        orderBy: [{ updatedAt: 'desc' }, { id: 'desc' }],
        skip: offset,
        take: limit,
        select: {
          id: true, title: true, author: true, audioDurationMs: true, wordCount: true, publishStatus: true, qualityStatus: true,
          translationStatus: true, editVersion: true, updatedAt: true, _count: { select: { sentences: true } },
        },
      }),
      prisma.readingContent.count({ where }),
      prisma.readingContent.groupBy({ by: ['publishStatus'], where: { contentKey: { not: null } }, _count: { _all: true } }),
    ]);
    const reviewCounts = await prisma.readingSentence.groupBy({
      by: ['contentId'],
      where: { contentId: { in: items.map((item) => item.id) }, quality: 'needs_review' },
      _count: { _all: true },
    });
    const reviewByContent = new Map(reviewCounts.map((row) => [row.contentId, row._count._all]));
    res.json({
      items: items.map(({ _count, ...item }) => ({ ...item, segments: _count.sentences, segmentsNeedingReview: reviewByContent.get(item.id) ?? 0 })),
      total,
      limit,
      offset,
      byStatus: Object.fromEntries(byStatus.map((row) => [row.publishStatus, row._count._all])),
    });
  }),
);

readingEditorRouter.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const contentId = idParam.parse(req.params.id);
    const offset = z.coerce.number().int().min(0).default(0).parse(req.query.offset ?? 0);
    const limit = z.coerce.number().int().min(1).max(200).default(100).parse(req.query.limit ?? 100);
    const content = await prisma.readingContent.findUnique({
      where: { id: contentId },
      select: {
        id: true, title: true, author: true, description: true, cefrLevel: true, category: true, coverUrl: true, audioUrl: true,
        audioDurationMs: true, contentKey: true, publishStatus: true, qualityStatus: true, translationStatus: true,
        qualityReport: true, pipelineRevision: true, editVersion: true, updatedAt: true,
      },
    });
    if (!content) throw new HttpError(404, 'Conteúdo não encontrado');
    const [segments, total, needsReview, lastRevision] = await Promise.all([
      editorSegments(contentId, offset, limit),
      prisma.readingSentence.count({ where: { contentId } }),
      prisma.readingSentence.count({ where: { contentId, quality: 'needs_review' } }),
      prisma.readingRevision.findFirst({
        where: { contentId, undoneAt: null },
        orderBy: { id: 'desc' },
        select: { id: true, kind: true, note: true, createdAt: true },
      }),
    ]);
    res.json({
      content: {
        ...content,
        coverUrl: await getPlayableStorageUrl(content.coverUrl),
        audioUrl: await getPlayableStorageUrl(content.audioUrl),
      },
      total,
      offset,
      limit,
      segmentsNeedingReview: needsReview,
      canUndo: lastRevision,
      segments,
    });
  }),
);

readingEditorRouter.get(
  '/:id/revisions',
  asyncHandler(async (req, res) => {
    const contentId = idParam.parse(req.params.id);
    const items = await prisma.readingRevision.findMany({
      where: { contentId },
      orderBy: { id: 'desc' },
      take: 100,
      select: { id: true, kind: true, note: true, userId: true, editVersion: true, undoneAt: true, createdAt: true },
    });
    res.json({ items });
  }),
);

// ----------------------------------------------------------------------------- metadados
readingEditorRouter.patch(
  '/:id',
  asyncHandler(async (req, res) => {
    const contentId = idParam.parse(req.params.id);
    const input = versioned
      .extend({
        title: z.string().trim().min(1).max(300).optional(),
        author: z.string().trim().max(300).optional(),
        description: z.string().max(5000).optional(),
        cefrLevel: z.enum(['a1', 'a2', 'b1', 'b2', 'c1', 'c2']).optional(),
        category: z.string().trim().min(1).max(50).optional(),
      })
      .parse(req.body);
    const { expectedVersion, ...fields } = input;
    const monthByLevel: Record<string, number> = { a1: 1, a2: 2, b1: 3, b2: 4, c1: 5, c2: 6 };
    const result = await mutate(contentId, expectedVersion, req.userId, 'meta', 'Metadados editados', [], async (tx) => {
      const current = await tx.readingContent.findUniqueOrThrow({ where: { id: contentId }, select: { qualityReport: true } });
      const report = { ...((current.qualityReport as Record<string, unknown> | null) ?? {}) };
      if (fields.title !== undefined) report.titleConfirmed = true;
      if (fields.author !== undefined) report.authorConfirmed = true;
      if (fields.cefrLevel !== undefined) report.cefrLevelSource = 'editor';
      await tx.readingContent.update({
        where: { id: contentId },
        data: {
          ...fields,
          ...(fields.cefrLevel ? { month: monthByLevel[fields.cefrLevel] } : {}),
          qualityReport: report as Prisma.InputJsonValue,
        },
      });
      return { createdKeys: [] };
    });
    res.json(result);
  }),
);

// ----------------------------------------------------------------------------- trecho
readingEditorRouter.patch(
  '/:id/segments/:key',
  asyncHandler(async (req, res) => {
    const contentId = idParam.parse(req.params.id);
    const key = keyParam.parse(req.params.key);
    const input = versioned
      .extend({
        translation: z.string().max(4000).optional(),
        text: z.string().trim().min(1).max(4000).optional(),
        playStartMs: z.number().int().min(0).optional(),
        playEndMs: z.number().int().min(1).optional(),
        note: z.string().max(2000).optional(),
        reviewed: z.boolean().optional(),
      })
      .parse(req.body);
    const result = await mutate(contentId, input.expectedVersion, req.userId, 'segment_edit', `Trecho ${key} editado`, [key], async (tx, content) => {
      const row = await tx.readingSentence.findFirstOrThrow({
        where: { contentId, segmentKey: key },
        include: { wordTimestamps: { orderBy: { wordIndex: 'asc' } } },
      });
      const warnings: string[] = [];
      const reasons = new Set(row.reviewReasons);
      const data: Prisma.ReadingSentenceUpdateInput = {};
      let markNeedsReview = false;

      if (input.translation !== undefined && input.translation !== row.translation) {
        // Só o texto em português muda; tempos intactos. Destaques cujo trecho PT sumiu são descartados.
        data.translation = input.translation;
        const kept = (Array.isArray(row.highlights) ? (row.highlights as { pt?: { start: number; end: number; text: string } }[]) : [])
          .filter((highlight) => highlight.pt && input.translation!.slice(highlight.pt.start, highlight.pt.end) === highlight.pt.text);
        data.highlights = kept as unknown as Prisma.InputJsonValue;
      }

      if (input.text !== undefined && input.text !== row.text) {
        const tokens = input.text.split(/\s+/).filter(Boolean);
        data.text = tokens.join(' ');
        data.highlights = [] as unknown as Prisma.InputJsonValue;
        if (tokens.length === row.wordTimestamps.length) {
          // Mesma quantidade de palavras: os tempos ficam como referência, mas marcados como desatualizados.
          for (const [index, word] of row.wordTimestamps.entries()) {
            if (word.word !== tokens[index]) {
              await tx.readingWordTimestamp.update({ where: { id: word.id }, data: { word: tokens[index], timeSource: 'stale', score: null } });
            }
          }
        } else {
          // Quantidade diferente: não há como atribuir tempos sem realinhar. Nada é estimado.
          await tx.readingWordTimestamp.deleteMany({ where: { sentenceId: row.id } });
        }
        reasons.add('text_edited_needs_realign');
        warnings.push('Inglês alterado: o alinhamento deste trecho foi invalidado. Reprocesse no pipeline para realinhar.');
        markNeedsReview = true;
      }

      if (input.playStartMs !== undefined || input.playEndMs !== undefined) {
        const playStart = input.playStartMs ?? row.playStartMs ?? row.startMs;
        const playEnd = input.playEndMs ?? row.playEndMs ?? row.endMs;
        if (playEnd - playStart < 200) throw new HttpError(400, 'O trecho precisa ter pelo menos 200 ms');
        if (playEnd > content.audioDurationMs) throw new HttpError(400, 'Fim além da duração do áudio');
        const [previous, next] = await Promise.all([
          tx.readingSentence.findFirst({ where: { contentId, sentenceIndex: row.sentenceIndex - 1 }, select: { endMs: true, playStartMs: true, startMs: true } }),
          tx.readingSentence.findFirst({ where: { contentId, sentenceIndex: row.sentenceIndex + 1 }, select: { startMs: true, playEndMs: true, endMs: true } }),
        ]);
        if (previous && playStart <= (previous.playStartMs ?? previous.startMs)) throw new HttpError(400, 'Início antes do trecho anterior');
        if (next && playEnd >= (next.playEndMs ?? next.endMs)) throw new HttpError(400, 'Fim depois do trecho seguinte');
        if (previous && playStart < previous.endMs) warnings.push('O início entra no trecho anterior.');
        if (next && playEnd > next.startMs) warnings.push('O fim entra no trecho seguinte.');
        data.playStartMs = playStart;
        data.playEndMs = playEnd;
        reasons.add('bounds_edited');
      }

      if (input.note !== undefined) data.note = input.note;
      if (input.reviewed === true) {
        // Revisão humana do trecho: limpa pendências, exceto a de realinhamento.
        const keep = [...reasons].filter((reason) => reason === 'text_edited_needs_realign');
        data.reviewReasons = keep;
        data.quality = keep.length ? 'needs_review' : 'ok';
      } else {
        data.reviewReasons = [...reasons];
        if (input.reviewed === false || reasons.has('text_edited_needs_realign')) data.quality = 'needs_review';
      }
      await tx.readingSentence.update({ where: { id: row.id }, data });
      return { createdKeys: [key], warnings, markNeedsReview };
    });
    res.json(result);
  }),
);

function buildFromWords(
  contentKey: string,
  base: SegmentSnapshot,
  words: SegmentSnapshot['words'],
  translation: string,
  play: { start: number; end: number },
  reason: string,
): SegmentSnapshot {
  return {
    segmentKey: segmentKeyFor(contentKey, words[0].wordKey, words[words.length - 1].wordKey),
    sentenceIndex: 0, // renumerado depois
    text: words.map((word) => word.word).join(' '),
    translation,
    startMs: words[0].startMs,
    endMs: words[words.length - 1].endMs,
    playStartMs: play.start,
    playEndMs: play.end,
    quality: 'needs_review',
    reviewReasons: [...new Set([...base.reviewReasons, reason])],
    highlights: [],
    note: base.note,
    words: words.map((word, wordIndex) => ({ ...word, wordIndex })),
  };
}

readingEditorRouter.post(
  '/:id/segments/:key/split',
  asyncHandler(async (req, res) => {
    const contentId = idParam.parse(req.params.id);
    const key = keyParam.parse(req.params.key);
    const input = versioned
      .extend({
        // quebra DEPOIS da palavra de índice `afterWordIndex` (0 = depois da primeira)
        afterWordIndex: z.number().int().min(0),
        translationLeft: z.string().max(4000).optional(),
        translationRight: z.string().max(4000).optional(),
      })
      .parse(req.body);
    let created: string[] = [];
    const result = await mutate(contentId, input.expectedVersion, req.userId, 'split', `Trecho ${key} dividido`, [key], async (tx, content) => {
      const [segment] = await snapshotSegments(tx, contentId, [key]);
      if (segment.words.some((word) => !word.wordKey || word.timeSource === 'stale')) {
        throw new HttpError(400, 'Trecho sem alinhamento válido por palavra; realinhe antes de dividir');
      }
      if (input.afterWordIndex >= segment.words.length - 1) throw new HttpError(400, 'Ponto de divisão inválido');
      const leftWords = segment.words.slice(0, input.afterWordIndex + 1);
      const rightWords = segment.words.slice(input.afterWordIndex + 1);
      // A fronteira nova fica no espaço entre as duas palavras (tempos medidos, nada estimado).
      const gapStart = leftWords[leftWords.length - 1].endMs;
      const gapEnd = rightWords[0].startMs;
      const left = buildFromWords(content.contentKey, segment, leftWords, input.translationLeft ?? segment.translation,
        { start: segment.playStartMs ?? segment.startMs, end: Math.max(gapStart, Math.min(gapStart + 160, gapEnd - 20)) }, 'split_by_editor');
      const right = buildFromWords(content.contentKey, segment, rightWords, input.translationRight ?? '',
        { start: Math.min(gapEnd, Math.max(gapEnd - 80, gapStart + 20)), end: segment.playEndMs ?? segment.endMs }, 'split_by_editor');
      created = [left.segmentKey as string, right.segmentKey as string];
      await tx.readingSentence.deleteMany({ where: { contentId, segmentKey: key } });
      // índices provisórios fora da faixa; renumber() corrige pela ordem temporal
      left.sentenceIndex = 2_000_000 + 1;
      right.sentenceIndex = 2_000_000 + 2;
      await insertSegments(tx, contentId, [left, right]);
      await renumber(tx, contentId);
      // Política: quem tinha concluído o trecho inteiro mantém concluídas as duas metades.
      const done = await tx.userSegmentProgress.findMany({ where: { contentId, segmentKey: key }, select: { userId: true, completedAt: true } });
      for (const row of done) {
        for (const newKey of created) {
          await tx.userSegmentProgress.upsert({
            where: { userId_segmentKey: { userId: row.userId, segmentKey: newKey } },
            create: { userId: row.userId, contentId, segmentKey: newKey, completedAt: row.completedAt },
            update: { orphanedAt: null },
          });
        }
      }
      await reconcileProgress(tx, contentId);
      return { createdKeys: created, markNeedsReview: true };
    });
    res.json({ ...result, created });
  }),
);

readingEditorRouter.post(
  '/:id/segments/:key/merge-next',
  asyncHandler(async (req, res) => {
    const contentId = idParam.parse(req.params.id);
    const key = keyParam.parse(req.params.key);
    const input = versioned.extend({ translation: z.string().max(4000).optional() }).parse(req.body);
    const current = await prisma.readingSentence.findFirst({ where: { contentId, segmentKey: key }, select: { sentenceIndex: true } });
    if (!current) throw new HttpError(404, 'Trecho não encontrado');
    const nextRow = await prisma.readingSentence.findFirst({
      where: { contentId, sentenceIndex: current.sentenceIndex + 1 },
      select: { segmentKey: true },
    });
    if (!nextRow?.segmentKey) throw new HttpError(400, 'Não há trecho seguinte para unir');
    const nextKey = nextRow.segmentKey;
    let createdKey = '';
    const result = await mutate(contentId, input.expectedVersion, req.userId, 'merge', `Trechos ${key} + ${nextKey} unidos`, [key, nextKey], async (tx, content) => {
      const pair = await snapshotSegments(tx, contentId, [key, nextKey]);
      const [first, second] = pair;
      if (second.sentenceIndex !== first.sentenceIndex + 1) throw new HttpError(409, 'Os trechos deixaram de ser vizinhos; recarregue');
      const words = [...first.words, ...second.words];
      if (words.some((word) => !word.wordKey)) throw new HttpError(400, 'Trechos sem alinhamento por palavra não podem ser unidos');
      const merged = buildFromWords(content.contentKey, first, words,
        input.translation ?? [first.translation, second.translation].filter(Boolean).join(' '),
        { start: first.playStartMs ?? first.startMs, end: second.playEndMs ?? second.endMs }, 'merged_by_editor');
      merged.reviewReasons = [...new Set([...merged.reviewReasons, ...second.reviewReasons])];
      createdKey = merged.segmentKey as string;
      await tx.readingSentence.deleteMany({ where: { contentId, segmentKey: { in: [key, nextKey] } } });
      merged.sentenceIndex = 2_000_000 + 1;
      await insertSegments(tx, contentId, [merged]);
      await renumber(tx, contentId);
      // Política: o trecho unido só nasce concluído para quem tinha concluído as duas partes.
      const done = await tx.userSegmentProgress.groupBy({
        by: ['userId'],
        where: { contentId, segmentKey: { in: [key, nextKey] }, orphanedAt: null },
        _count: { _all: true },
      });
      for (const row of done.filter((item) => item._count._all === 2)) {
        await tx.userSegmentProgress.upsert({
          where: { userId_segmentKey: { userId: row.userId, segmentKey: createdKey } },
          create: { userId: row.userId, contentId, segmentKey: createdKey },
          update: { orphanedAt: null },
        });
      }
      await reconcileProgress(tx, contentId);
      return { createdKeys: [createdKey], markNeedsReview: true };
    });
    res.json({ ...result, created: [createdKey] });
  }),
);

// ----------------------------------------------------------------------------- desfazer
readingEditorRouter.post(
  '/:id/undo',
  asyncHandler(async (req, res) => {
    const contentId = idParam.parse(req.params.id);
    const { expectedVersion } = versioned.parse(req.body);
    const result = await prisma.$transaction(
      async (tx) => {
        const bumped = await tx.readingContent.updateMany({
          where: { id: contentId, editVersion: expectedVersion },
          data: { editVersion: { increment: 1 } },
        });
        if (bumped.count === 0) throw new HttpError(409, 'Conteúdo alterado por outra sessão. Recarregue e tente de novo.');
        const revision = await tx.readingRevision.findFirst({
          where: { contentId, undoneAt: null, kind: { in: ['segment_edit', 'split', 'merge', 'import'] } },
          orderBy: { id: 'desc' },
        });
        if (!revision) throw new HttpError(400, 'Nada para desfazer');
        const snapshot = revision.snapshot as unknown as { before: SegmentSnapshot[]; createdKeys: string[] };
        if (revision.kind === 'import') {
          await tx.readingSentence.deleteMany({ where: { contentId } });
        } else {
          await tx.readingSentence.deleteMany({ where: { contentId, segmentKey: { in: snapshot.createdKeys } } });
        }
        await tx.$executeRaw`UPDATE "ReadingSentence" SET "sentenceIndex" = "sentenceIndex" + 1000000 WHERE "contentId" = ${contentId}`;
        await insertSegments(tx, contentId, snapshot.before.map((segment, index) => ({ ...segment, sentenceIndex: 3_000_000 + index })));
        await renumber(tx, contentId);
        await reconcileProgress(tx, contentId);
        await tx.readingRevision.update({ where: { id: revision.id }, data: { undoneAt: new Date() } });
        const content = await tx.readingContent.findUniqueOrThrow({ where: { id: contentId }, select: { editVersion: true } });
        return { editVersion: content.editVersion, undone: { id: revision.id, kind: revision.kind, note: revision.note } };
      },
      { timeout: 120_000 },
    );
    res.json(result);
  }),
);

// ----------------------------------------------------------------------------- publicação
readingEditorRouter.post(
  '/:id/publish',
  asyncHandler(async (req, res) => {
    const contentId = idParam.parse(req.params.id);
    const input = versioned
      .extend({
        status: z.enum(['draft', 'needs_review', 'ready', 'published']),
        // Declaração explícita de quem revisou: ouviu os trechos antes de liberar.
        auditoryValidation: z.boolean().optional(),
      })
      .parse(req.body);
    const releasing = input.status === 'ready' || input.status === 'published';
    const result = await mutate(contentId, input.expectedVersion, req.userId, 'publish', `Status → ${input.status}`, [], async (tx) => {
      const content = await tx.readingContent.findUniqueOrThrow({
        where: { id: contentId },
        select: { qualityReport: true, translationStatus: true },
      });
      const report = { ...((content.qualityReport as Record<string, unknown> | null) ?? {}) };
      if (releasing) {
        const pending = await tx.readingSentence.count({ where: { contentId, quality: 'needs_review' } });
        if (pending > 0) throw new HttpError(400, `Ainda há ${pending} trecho(s) marcados para revisão`);
        if (report.auditoryValidation !== 'done' && input.auditoryValidation !== true) {
          throw new HttpError(400, 'Confirme a validação auditiva (auditoryValidation=true) antes de liberar o conteúdo');
        }
        if (content.translationStatus !== 'complete') {
          throw new HttpError(400, 'Tradução pendente; conclua a tradução antes de publicar');
        }
        if (input.auditoryValidation === true) {
          report.auditoryValidation = 'done';
          report.auditoryValidatedBy = req.userId ?? null;
          report.auditoryValidatedAt = new Date().toISOString();
        }
      }
      await tx.readingContent.update({
        where: { id: contentId },
        data: {
          publishStatus: input.status,
          qualityStatus: releasing ? 'ready' : undefined,
          qualityReport: report as Prisma.InputJsonValue,
        },
      });
      return { createdKeys: [] };
    });
    res.json({ ...result, status: input.status });
  }),
);
