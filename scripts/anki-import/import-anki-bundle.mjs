// Importa baralhos do Anki desktop (bundle.json + áudios) como baralhos próprios do usuário,
// preservando agendamento (intervalo, facilidade, vencimento) e o histórico de revisões.
// Uso (dentro do container da API, cwd /app): node import-anki-bundle.mjs <pasta-do-bundle> <email>
// Reexecutar substitui baralhos próprios com o mesmo nome (idempotente).
import { randomBytes } from 'node:crypto';
import { copyFile, mkdir, readFile, rm } from 'node:fs/promises';
import path from 'node:path';
import { createRequire } from 'node:module';
const require = createRequire(path.join(process.cwd(), 'package.json'));
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const [dir, email] = process.argv.slice(2);
const MEDIA_ROOT = path.resolve(process.env.MEDIA_ROOT || './data/media');
const rid = (n = 6) => randomBytes(n).toString('hex');
const bundle = JSON.parse(await readFile(path.join(dir, 'bundle.json'), 'utf8'));
const user = await prisma.user.findFirst({ where: { email: { equals: email, mode: 'insensitive' } }, select: { id: true } });
if (!user) throw new Error('usuário não encontrado');
const userId = user.id;
const safeUser = userId.replace(/[^\w-]/g, '').slice(0, 64);
for (const deck of bundle.decks) {
  const old = await prisma.readingContent.findMany({ where: { userId, sourceType: 'custom-deck', title: deck.name }, select: { id: true } });
  for (const o of old) {
    await prisma.$transaction([
      prisma.userStudyReview.deleteMany({ where: { userId, contentId: o.id } }),
      prisma.userStudyCard.deleteMany({ where: { userId, contentId: o.id } }),
      prisma.userStudyDeck.deleteMany({ where: { userId, contentId: o.id } }),
      prisma.readingContent.delete({ where: { id: o.id } }),
    ]);
    await rm(path.join(MEDIA_ROOT, 'user-decks', safeUser, String(o.id)), { recursive: true, force: true });
    console.log(`substituído baralho antigo ${o.id}`);
  }
  const content = await prisma.readingContent.create({
    data: { title: deck.name, slug: `deck-${rid(10)}`, textHash: '', fullText: '', cefrLevel: '', sourceType: 'custom-deck', userId, isPublic: false, publishStatus: 'private', category: 'custom-deck' },
  });
  await prisma.userStudyDeck.create({ data: { userId, contentId: content.id } });
  const audioDir = path.join('user-decks', safeUser, String(content.id));
  await mkdir(path.join(MEDIA_ROOT, audioDir), { recursive: true });
  let reviews = 0;
  for (const [i, c] of deck.cards.entries()) {
    let audioKey = '';
    if (c.audio) {
      audioKey = `${audioDir}/${c.audio}`;
      await copyFile(path.join(dir, 'audio', c.audio), path.join(MEDIA_ROOT, audioKey));
    }
    const segmentKey = `cd${content.id}-${rid(8)}`;
    await prisma.readingSentence.create({
      data: { contentId: content.id, sentenceIndex: i, segmentKey, text: c.front, translation: c.back, startMs: 0, endMs: 0, audioKey, quality: 'ok' },
    });
    const card = await prisma.userStudyCard.create({
      data: {
        userId, contentId: content.id, segmentKey, manual: true, position: i,
        type: c.type, queue: c.queue, interval: c.interval, ease: c.ease, reps: c.reps, lapses: c.lapses, remainingSteps: c.remainingSteps ?? 0,
        dueDay: c.dueDay ?? null, dueAt: c.dueAt ? new Date(c.dueAt) : null,
        introducedDay: c.introducedDay ?? null, lastReviewDay: c.lastReviewDay ?? null, lastReviewAt: c.lastReviewAt ? new Date(c.lastReviewAt) : null,
      },
    });
    if (c.reviews.length) {
      await prisma.userStudyReview.createMany({
        data: c.reviews.map((r) => ({
          cardId: card.id, userId, contentId: content.id, answer: r.answer, kind: r.kind, interval: r.interval, lastInterval: r.lastInterval,
          ease: r.ease, timeMs: Math.min(r.timeMs, 2_147_000_000), day: r.day, createdAt: new Date(r.at),
        })),
      });
      reviews += c.reviews.length;
    }
  }
  console.log(`${deck.name}: baralho ${content.id}, ${deck.cards.length} cartões, ${reviews} revisões`);
}
await prisma.$disconnect();
