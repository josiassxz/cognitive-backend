// Baralhos criados pelo usuário (como no Anki desktop: criar baralho, adicionar frente/verso/áudio).
// O estudo, as opções, o modo offline e a exportação usam as rotas normais de /api/study
// (o baralho tem um contentId como qualquer livro).
//
//   GET    /api/custom-decks                         baralhos do usuário
//   POST   /api/custom-decks                         { name } criar
//   PATCH  /api/custom-decks/:id                     { name } renomear
//   DELETE /api/custom-decks/:id                     excluir (cartões, histórico e áudios)
//   GET    /api/custom-decks/:id/cards               cartões (frente, verso, áudio, estado)
//   POST   /api/custom-decks/:id/cards               multipart: front, back, audio? → novo cartão
//   PATCH  /api/custom-decks/:id/cards/:key          multipart: front?, back?, audio?, removeAudio?
//   DELETE /api/custom-decks/:id/cards/:key          excluir cartão
//   POST   /api/custom-decks/:id/import              { text } uma linha por cartão: "frente ; verso" (ou TAB)
import { Router, type NextFunction, type Request, type Response } from 'express';
import multer from 'multer';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { signMediaUrl } from '../lib/storage';
import {
  addCustomCard, createCustomDeck, CUSTOM_DECK_SOURCE, loadOwnDeck, MAX_AUDIO_BYTES, removeAudioKey, removeCustomDeck, storeCardAudio,
} from '../lib/study/custom-decks';
import { asyncHandler } from '../utils/async-handler';
import { HttpError } from '../utils/http-error';

export const customDecksRouter = Router();

const multerAudio = multer({ storage: multer.memoryStorage(), limits: { fileSize: MAX_AUDIO_BYTES, files: 1 } }).single('audio');
/** Upload do campo "audio" com mensagens amigáveis (arquivo grande demais etc.). */
function audioUpload(req: Request, res: Response, next: NextFunction) {
  multerAudio(req, res, (error: unknown) => {
    if (!error) return next();
    if (error instanceof multer.MulterError && error.code === 'LIMIT_FILE_SIZE') return next(new HttpError(413, 'Áudio muito grande (máximo 15 MB)'));
    return next(new HttpError(400, 'Envio do áudio inválido'));
  });
}
const MAX_TEXT = 4000;
const MAX_IMPORT = 2000;

const nameSchema = z.object({ name: z.string().trim().min(1, 'Dê um nome ao baralho').max(120) });
const deckId = (req: Request) => z.coerce.number().int().positive().parse(req.params.id);
const cardKey = (req: Request) => z.string().min(1).max(64).parse(req.params.key);

function serializeCard(row: { segmentKey: string | null; sentenceIndex: number; text: string; translation: string; audioKey: string }, queue?: string, reps?: number) {
  return {
    key: row.segmentKey as string,
    index: row.sentenceIndex,
    front: row.text,
    back: row.translation,
    audioUrl: row.audioKey ? signMediaUrl(row.audioKey) : '',
    queue: queue ?? 'new',
    reps: reps ?? 0,
  };
}

async function loadCard(deck: number, key: string) {
  const row = await prisma.readingSentence.findFirst({
    where: { contentId: deck, segmentKey: key },
    select: { id: true, segmentKey: true, sentenceIndex: true, text: true, translation: true, audioKey: true },
  });
  if (!row) throw new HttpError(404, 'Cartão não encontrado');
  return row;
}

customDecksRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    const userId = req.userId as string;
    const decks = await prisma.readingContent.findMany({
      where: { userId, sourceType: CUSTOM_DECK_SOURCE },
      select: { id: true, title: true, createdAt: true, _count: { select: { sentences: true } } },
      orderBy: { title: 'asc' },
    });
    res.json({ decks: decks.map((d) => ({ id: d.id, title: d.title, cardCount: d._count.sentences, createdAt: d.createdAt })) });
  }),
);

customDecksRouter.post(
  '/',
  asyncHandler(async (req, res) => {
    const { name } = nameSchema.parse(req.body);
    res.status(201).json({ deck: await createCustomDeck(req.userId as string, name) });
  }),
);

customDecksRouter.patch(
  '/:id',
  asyncHandler(async (req, res) => {
    const id = deckId(req);
    await loadOwnDeck(req.userId as string, id);
    const { name } = nameSchema.parse(req.body);
    const deck = await prisma.readingContent.update({ where: { id }, data: { title: name }, select: { id: true, title: true } });
    res.json({ deck });
  }),
);

customDecksRouter.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    res.json({ deleted: await removeCustomDeck(req.userId as string, deckId(req)) });
  }),
);

customDecksRouter.get(
  '/:id/cards',
  asyncHandler(async (req, res) => {
    const userId = req.userId as string;
    const id = deckId(req);
    const deck = await loadOwnDeck(userId, id);
    const [rows, cards] = await Promise.all([
      prisma.readingSentence.findMany({
        where: { contentId: id },
        select: { segmentKey: true, sentenceIndex: true, text: true, translation: true, audioKey: true },
        orderBy: { sentenceIndex: 'asc' },
      }),
      prisma.userStudyCard.findMany({ where: { userId, contentId: id }, select: { segmentKey: true, queue: true, reps: true } }),
    ]);
    const state = new Map(cards.map((c) => [c.segmentKey, c]));
    res.json({
      deck: { id: deck.id, title: deck.title },
      cards: rows.map((row) => serializeCard(row, state.get(row.segmentKey as string)?.queue, state.get(row.segmentKey as string)?.reps)),
    });
  }),
);

const cardFields = z.object({
  front: z.string().trim().max(MAX_TEXT).optional(),
  back: z.string().trim().max(MAX_TEXT).optional(),
  removeAudio: z.enum(['true', 'false', '1', '0']).optional(),
});

customDecksRouter.post(
  '/:id/cards',
  audioUpload,
  asyncHandler(async (req, res) => {
    const userId = req.userId as string;
    const id = deckId(req);
    await loadOwnDeck(userId, id);
    const body = cardFields.parse(req.body ?? {});
    const front = body.front ?? '';
    const back = body.back ?? '';
    if (!front && !req.file) throw new HttpError(400, 'Preencha a frente do cartão (ou envie um áudio)');
    const audioKey = req.file ? await storeCardAudio(userId, id, req.file.buffer) : '';
    const row = await addCustomCard(userId, id, { front, back, audioKey });
    res.status(201).json({ card: serializeCard(row) });
  }),
);

customDecksRouter.patch(
  '/:id/cards/:key',
  audioUpload,
  asyncHandler(async (req, res) => {
    const userId = req.userId as string;
    const id = deckId(req);
    await loadOwnDeck(userId, id);
    const row = await loadCard(id, cardKey(req));
    const body = cardFields.parse(req.body ?? {});
    let audioKey = row.audioKey;
    if (req.file) audioKey = await storeCardAudio(userId, id, req.file.buffer);
    else if (body.removeAudio === 'true' || body.removeAudio === '1') audioKey = '';
    const front = body.front ?? row.text;
    if (!front && !audioKey) throw new HttpError(400, 'O cartão precisa de frente ou áudio');
    const updated = await prisma.readingSentence.update({
      where: { id: row.id },
      data: { text: front, translation: body.back ?? row.translation, audioKey },
      select: { segmentKey: true, sentenceIndex: true, text: true, translation: true, audioKey: true },
    });
    if (audioKey !== row.audioKey) await removeAudioKey(row.audioKey);
    const card = await prisma.userStudyCard.findUnique({ where: { userId_segmentKey: { userId, segmentKey: row.segmentKey as string } }, select: { queue: true, reps: true } });
    res.json({ card: serializeCard(updated, card?.queue, card?.reps) });
  }),
);

customDecksRouter.delete(
  '/:id/cards/:key',
  asyncHandler(async (req, res) => {
    const userId = req.userId as string;
    const id = deckId(req);
    await loadOwnDeck(userId, id);
    const row = await loadCard(id, cardKey(req));
    const key = row.segmentKey as string;
    const cards = await prisma.userStudyCard.findMany({ where: { userId, segmentKey: key }, select: { id: true } });
    await prisma.$transaction([
      prisma.userStudyReview.deleteMany({ where: { userId, cardId: { in: cards.map((c) => c.id) } } }),
      prisma.userStudyCard.deleteMany({ where: { userId, segmentKey: key } }),
      prisma.readingSentence.delete({ where: { id: row.id } }),
    ]);
    await removeAudioKey(row.audioKey);
    res.json({ deleted: true });
  }),
);

customDecksRouter.post(
  '/:id/import',
  asyncHandler(async (req, res) => {
    const userId = req.userId as string;
    const id = deckId(req);
    await loadOwnDeck(userId, id);
    const { text } = z.object({ text: z.string().max(MAX_IMPORT * MAX_TEXT) }).parse(req.body);
    const lines = text.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
    if (lines.length === 0) throw new HttpError(400, 'Cole pelo menos uma linha no formato: frente ; verso');
    if (lines.length > MAX_IMPORT) throw new HttpError(400, `No máximo ${MAX_IMPORT} cartões por vez`);
    let added = 0;
    for (const line of lines) {
      const parts = line.includes('\t') ? line.split('\t') : line.split(';');
      const front = (parts[0] ?? '').trim().slice(0, MAX_TEXT);
      const back = parts.slice(1).join(';').trim().slice(0, MAX_TEXT);
      if (!front) continue;
      await addCustomCard(userId, id, { front, back });
      added++;
    }
    res.status(201).json({ added });
  }),
);
