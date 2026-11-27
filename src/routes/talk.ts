// Módulo Talk (separado do resto do estudo): histórias com o áudio dos livros e pontos de
// decisão. O aluno ouve o contexto, escolhe a continuação certa entre 4 opções lendo em voz
// alta (reconhecimento de fala no navegador) e o narrador confirma com a frase real.
//
//   GET  /api/talk/stories                 lista + melhor nota e última tentativa do aluno
//   GET  /api/talk/stories/:slug           passos resolvidos (texto, tradução, áudio e tempos)
//   POST /api/talk/stories/:slug/attempts  { listening, pronunciation?, details? } → salva tentativa
//   GET  /api/talk/dialogues               diálogos ramificados (cenas) + melhor nota
//   GET  /api/talk/dialogues/:slug         árvore completa com URLs de áudio assinadas
//   POST /api/talk/dialogues/:slug/attempts  idem às histórias (slug salvo como "dlg:<slug>")
//   GET  /api/talk/town                    temporada: episódios, desbloqueio, memória e pistas do aluno
//   GET  /api/talk/town/:slug              episódio com áudio assinado + memória na entrada
//   POST /api/talk/town/:slug/attempts     salva a tentativa com as memórias/pistas (slug "town:<slug>")
import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { getPlayableStorageUrl, signMediaUrl } from '../lib/storage';
import { TALK_DIALOGUES } from '../talk/dialogues.data';
import { TALK_STORIES } from '../talk/stories.data';
import { TALK_TOWN } from '../talk/town.data';
import type { TalkDialogueDef, TalkDialogueLine, TalkFlags, TalkRef, TalkStoryDef } from '../talk/types';
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

async function saveAttempt(userId: string, storySlug: string, raw: unknown) {
  const body = attemptSchema.parse(raw);
    const pron = body.pronunciation ?? null;
    // Nota geral: média de escuta e pronúncia (ou só escuta, se respondeu tocando).
    const score = Math.round((pron === null ? body.listening : (body.listening + pron) / 2) * 10) / 10;
    const details = JSON.parse(JSON.stringify(body.details ?? null).slice(0, 200_000) || 'null');
    const attempt = await prisma.talkAttempt.create({
      data: { userId, storySlug, listening: body.listening, pronunciation: pron, score, details },
      select: { id: true, score: true, createdAt: true },
    });
  return attempt;
}

talkRouter.post(
  '/stories/:slug/attempts',
  asyncHandler(async (req, res) => {
    const story = bySlug.get(String(req.params.slug));
    if (!story) throw new HttpError(404, 'História não encontrada');
    res.status(201).json({ attempt: await saveAttempt(req.userId as string, story.slug, req.body) });
  }),
);

// ---- Diálogos ramificados ----
const dialogueBySlug = new Map(TALK_DIALOGUES.map((d) => [d.slug, d]));
const DLG = 'dlg:';

talkRouter.get(
  '/dialogues',
  asyncHandler(async (req, res) => {
    const attempts = await prisma.talkAttempt.findMany({
      where: { userId: req.userId as string, storySlug: { startsWith: DLG } },
      select: { storySlug: true, score: true, createdAt: true },
      orderBy: { createdAt: 'desc' },
    });
    res.json({
      dialogues: TALK_DIALOGUES.map((d) => {
        const mine = attempts.filter((a) => a.storySlug === DLG + d.slug);
        return {
          slug: d.slug, title: d.title, level: d.level, description: d.description,
          cast: Object.values(d.cast), decisions: d.decisions,
          best: mine.length ? Math.max(...mine.map((a) => a.score)) : null,
          last: mine[0] ? { score: mine[0].score, at: mine[0].createdAt } : null,
          attempts: mine.length,
        };
      }),
    });
  }),
);

const AMBIENCE = (name: string | undefined) => (name ? signMediaUrl(`talk/ambience/${name}.mp3`) : null);

/** Troca as chaves de mídia por URLs assinadas (falas, opções nas duas vozes, reações e "nudges"). */
function signDialogue(d: TalkDialogueDef) {
  const sign = <T extends TalkDialogueLine>(l: T): T => ({ ...l, audio: signMediaUrl(l.audio) });
  const nodes = Object.fromEntries(
    Object.entries(d.nodes).map(([id, n]) => [
      id,
      'branch' in n
        ? n
        : {
            ...sign(n),
            options: n.options?.map((o) => ({
              ...sign(o),
              audioF: o.audioF ? signMediaUrl(o.audioF) : undefined,
              react: o.react ? sign(o.react) : undefined,
            })),
          },
    ]),
  );
  const nudges = Object.fromEntries(Object.entries(d.nudges ?? {}).map(([k, list]) => [k, list.map(sign)]));
  return { ...d, nodes, nudges, ambienceUrl: AMBIENCE(d.ambience) };
}

talkRouter.get(
  '/dialogues/:slug',
  asyncHandler(async (req, res) => {
    const d = dialogueBySlug.get(String(req.params.slug));
    if (!d) throw new HttpError(404, 'Diálogo não encontrado');
    res.json({ dialogue: signDialogue(d) });
  }),
);

talkRouter.post(
  '/dialogues/:slug/attempts',
  asyncHandler(async (req, res) => {
    const d = dialogueBySlug.get(String(req.params.slug));
    if (!d) throw new HttpError(404, 'Diálogo não encontrado');
    res.status(201).json({ attempt: await saveAttempt(req.userId as string, DLG + d.slug, req.body) });
  }),
);

// ---- Tunely Town: temporada contínua ----
// Sem tabela nova: a "memória" do aluno é derivada da ÚLTIMA tentativa de cada episódio, na ordem
// da temporada. Refazer um episódio troca a contribuição dele (e o que vem depois reage a isso).
const TOWN = 'town:';
const townBySlug = new Map(TALK_TOWN.episodes.map((e) => [e.slug, e]));
const FLAG = /^[a-z0-9_]{1,40}$/;

const townDetails = z.object({
  flags: z.record(z.string().regex(FLAG), z.string().regex(FLAG)).default({}),
  clues: z.array(z.string()).default([]),
});

type TownProgress = {
  /** por episódio: melhor nota, tentativas e o que a última tentativa registrou */
  byEpisode: Map<string, { best: number; attempts: number; flags: TalkFlags; clues: string[] }>;
};

async function townProgress(userId: string): Promise<TownProgress> {
  const attempts = await prisma.talkAttempt.findMany({
    where: { userId, storySlug: { startsWith: TOWN } },
    select: { storySlug: true, score: true, details: true },
    orderBy: { createdAt: 'desc' },
  });
  const byEpisode: TownProgress['byEpisode'] = new Map();
  for (const a of attempts) {
    const slug = a.storySlug.slice(TOWN.length);
    const parsed = townDetails.safeParse(a.details ?? {});
    const d = parsed.success ? parsed.data : { flags: {}, clues: [] };
    const clues = d.clues.filter((c) => c in TALK_TOWN.clues);
    const cur = byEpisode.get(slug);
    if (cur) {
      // tentativas mais antigas: a memória (flags) é a da última, mas pista achada não se perde
      cur.best = Math.max(cur.best, a.score);
      cur.attempts += 1;
      cur.clues = [...new Set([...cur.clues, ...clues])];
      continue;
    }
    byEpisode.set(slug, { best: a.score, attempts: 1, flags: d.flags, clues });
  }
  return { byEpisode };
}

/** Memória acumulada pelos episódios ANTERIORES a `uptoEpisode` (ou todos, se omitido). */
function townMemory(p: TownProgress, uptoEpisode = Infinity) {
  const flags: TalkFlags = {};
  const clues = new Set<string>();
  for (const e of TALK_TOWN.episodes) {
    if ((e.episode ?? 0) >= uptoEpisode) break;
    const done = p.byEpisode.get(e.slug);
    if (!done) continue;
    Object.assign(flags, done.flags);
    done.clues.forEach((c) => clues.add(c));
  }
  return { flags, clues: [...clues] };
}

const unlocked = (p: TownProgress, index: number) => index === 0 || p.byEpisode.has(TALK_TOWN.episodes[index - 1].slug);

talkRouter.get(
  '/town',
  asyncHandler(async (req, res) => {
    const p = await townProgress(req.userId as string);
    const memory = townMemory(p);
    res.json({
      season: TALK_TOWN.season,
      title: TALK_TOWN.title,
      subtitle: TALK_TOWN.subtitle,
      totalClues: Object.keys(TALK_TOWN.clues).length,
      // só as pistas já encontradas viajam para o cliente (sem spoiler)
      clues: memory.clues.map((id) => ({ id, ...TALK_TOWN.clues[id] })),
      flags: memory.flags,
      episodes: TALK_TOWN.episodes.map((e, i) => {
        const done = p.byEpisode.get(e.slug);
        return {
          slug: e.slug, episode: e.episode, title: e.title, level: e.level, description: e.description,
          place: e.place, time: e.time, decisions: e.decisions,
          cast: Object.entries(e.cast).filter(([k]) => k !== 'n').map(([, c]) => c.name),
          best: done?.best ?? null, attempts: done?.attempts ?? 0, clues: done?.clues.length ?? 0,
          unlocked: unlocked(p, i),
        };
      }),
    });
  }),
);

talkRouter.get(
  '/town/:slug',
  asyncHandler(async (req, res) => {
    const e = townBySlug.get(String(req.params.slug));
    if (!e) throw new HttpError(404, 'Episódio não encontrado');
    const p = await townProgress(req.userId as string);
    if (!unlocked(p, TALK_TOWN.episodes.indexOf(e))) throw new HttpError(403, 'Termine o episódio anterior primeiro');
    const memory = townMemory(p, e.episode);
    const clueIds = new Set<string>();
    for (const n of Object.values(e.nodes)) if (!('branch' in n) && n.clue) clueIds.add(n.clue);
    res.json({
      dialogue: signDialogue(e),
      memory,
      // só as pistas que este episódio pode revelar
      clues: Object.fromEntries([...clueIds].map((id) => [id, TALK_TOWN.clues[id]])),
      next: TALK_TOWN.episodes[TALK_TOWN.episodes.indexOf(e) + 1]?.slug ?? null,
    });
  }),
);

talkRouter.post(
  '/town/:slug/attempts',
  asyncHandler(async (req, res) => {
    const e = townBySlug.get(String(req.params.slug));
    if (!e) throw new HttpError(404, 'Episódio não encontrado');
    const p = await townProgress(req.userId as string);
    if (!unlocked(p, TALK_TOWN.episodes.indexOf(e))) throw new HttpError(403, 'Termine o episódio anterior primeiro');
    res.status(201).json({ attempt: await saveAttempt(req.userId as string, TOWN + e.slug, req.body) });
  }),
);
