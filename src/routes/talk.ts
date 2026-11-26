// Módulo Talk (separado do resto do estudo): histórias com o áudio dos livros e pontos de
// decisão. O aluno ouve o contexto, escolhe a continuação certa entre 4 opções lendo em voz
// alta (reconhecimento de fala no navegador) e o narrador confirma com a frase real.
//
//   GET  /api/talk/stories                 lista + melhor nota e última tentativa do aluno
//   GET  /api/talk/stories/:slug           passos resolvidos (texto, tradução, áudio e tempos)
//   POST /api/talk/stories/:slug/attempts  { listening, pronunciation?, details? } → salva tentativa
import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { getPlayableStorageUrl } from '../lib/storage';
import { TALK_STORIES } from '../talk/stories.data';
import type { TalkRef, TalkStoryDef } from '../talk/types';
import { asyncHandler } from '../utils/async-handler';
import { HttpError } from '../utils/http-error';
import { loadVisibleContent } from './reading-segments';

export const talkRouter = Router();

const bySlug = new Map(TALK_STORIES.map((s) => [s.slug, s]));
const choiceCount = (s: TalkStoryDef) => s.steps.filter((x) => x.type === 'choice').length;

/** A história só aparece se todos os livros que ela usa forem visíveis para o aluno. */
async function visible(story: TalkStoryDef, userId: string, role: 'user' | 'admin' | undefined): Promise<boolean> {
  const ids = new Set<number>([story.cover]);
  for (const step of story.steps) {
    if (step.type === 'line') ids.add(step.c);
    else step.options.forEach((o) => ids.add(o.c));
  }
  try {
    for (const id of ids) await loadVisibleContent(id, role, userId);
    return true;
  } catch {
    return false;
  }
}

talkRouter.get(
  '/stories',
  asyncHandler(async (req, res) => {
    const userId = req.userId as string;
    const covers = await prisma.readingContent.findMany({
      where: { id: { in: TALK_STORIES.map((s) => s.cover) } },
      select: { id: true, coverUrl: true, coverPalette: true, audioDurationMs: true },
    });
    const coverOf = new Map(covers.map((c) => [c.id, c]));
    const attempts = await prisma.talkAttempt.findMany({
      where: { userId },
      select: { storySlug: true, score: true, createdAt: true },
      orderBy: { createdAt: 'desc' },
    });
    const out = [];
    for (const story of TALK_STORIES) {
      if (!(await visible(story, userId, req.userRole))) continue;
      const mine = attempts.filter((a) => a.storySlug === story.slug);
      const cover = coverOf.get(story.cover);
      out.push({
        slug: story.slug, title: story.title, level: story.level, description: story.description, kind: story.kind,
        decisions: choiceCount(story), lines: story.steps.length,
        coverUrl: cover ? await getPlayableStorageUrl(cover.coverUrl) : '', coverPalette: cover?.coverPalette ?? null,
        durationMs: cover?.audioDurationMs ?? 0,
        best: mine.length ? Math.max(...mine.map((a) => a.score)) : null,
        last: mine[0] ? { score: mine[0].score, at: mine[0].createdAt } : null,
        attempts: mine.length,
      });
    }
    res.json({ stories: out });
  }),
);

talkRouter.get(
  '/stories/:slug',
  asyncHandler(async (req, res) => {
    const userId = req.userId as string;
    const story = bySlug.get(String(req.params.slug));
    if (!story || !(await visible(story, userId, req.userRole))) throw new HttpError(404, 'História não encontrada');
    const refs: TalkRef[] = story.steps.flatMap((s) => (s.type === 'line' ? [s] : s.options));
    const contentIds = [...new Set(refs.map((r) => r.c))];
    const [contents, rows] = await Promise.all([
      prisma.readingContent.findMany({ where: { id: { in: contentIds } }, select: { id: true, audioUrl: true } }),
      prisma.readingSentence.findMany({
        where: { contentId: { in: contentIds }, segmentKey: { in: refs.map((r) => r.k) } },
        select: { contentId: true, segmentKey: true, text: true, translation: true, startMs: true, endMs: true, playStartMs: true, playEndMs: true },
      }),
    ]);
    const sources: Record<number, string> = {};
    for (const c of contents) sources[c.id] = await getPlayableStorageUrl(c.audioUrl);
    const rowOf = new Map(rows.map((r) => [`${r.contentId}:${r.segmentKey}`, r]));
    const phrase = (r: TalkRef) => {
      const row = rowOf.get(`${r.c}:${r.k}`);
      if (!row) return null;
      return { src: r.c, text: row.text, pt: row.translation, startMs: row.playStartMs ?? row.startMs, endMs: row.playEndMs ?? row.endMs };
    };
    const steps = story.steps
      .map((s) => {
        if (s.type === 'line') {
          const p = phrase(s);
          return p ? { type: 'line' as const, ...p } : null;
        }
        const options = s.options.map(phrase);
        if (options.some((o) => !o)) return null;
        return { type: 'choice' as const, options, correct: s.correct };
      })
      .filter((s): s is NonNullable<typeof s> => s !== null);
    res.json({
      story: { slug: story.slug, title: story.title, level: story.level, description: story.description },
      sources,
      steps,
    });
  }),
);

const attemptSchema = z.object({
  listening: z.number().min(0).max(100),
  pronunciation: z.number().min(0).max(100).nullable().optional(),
  details: z.unknown().optional(),
});

talkRouter.post(
  '/stories/:slug/attempts',
  asyncHandler(async (req, res) => {
    const userId = req.userId as string;
    const story = bySlug.get(String(req.params.slug));
    if (!story) throw new HttpError(404, 'História não encontrada');
    const body = attemptSchema.parse(req.body);
    const pron = body.pronunciation ?? null;
    // Nota geral: média de escuta e pronúncia (ou só escuta, se respondeu tocando).
    const score = Math.round((pron === null ? body.listening : (body.listening + pron) / 2) * 10) / 10;
    const details = JSON.parse(JSON.stringify(body.details ?? null).slice(0, 200_000) || 'null');
    const attempt = await prisma.talkAttempt.create({
      data: { userId, storySlug: story.slug, listening: body.listening, pronunciation: pron, score, details },
      select: { id: true, score: true, createdAt: true },
    });
    res.status(201).json({ attempt });
  }),
);
