// Baralhos criados pelo usuário (como "Criar baralho" + "Adicionar" no Anki desktop).
//
// Reaproveita o modelo dos livros para que estudo, agendador, offline e exportação funcionem
// sem código paralelo:
//   - baralho  = ReadingContent privado (sourceType "custom-deck", userId = dono, fora da biblioteca);
//   - cartão   = ReadingSentence (text = frente, translation = verso, audioKey = áudio próprio)
//                + UserStudyCard (entra direto como "novo").
// Os áudios enviados são convertidos para MP3 mono e guardados em MEDIA_ROOT/user-decks/<user>/<deck>/.
import { execFile } from 'node:child_process';
import { randomBytes } from 'node:crypto';
import { mkdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { promisify } from 'node:util';
import { prisma } from '../prisma';
import { resolveMediaPath } from '../storage';
import { HttpError } from '../../utils/http-error';

const run = promisify(execFile);
const FFMPEG = process.env.FFMPEG_PATH || 'ffmpeg';

export const CUSTOM_DECK_SOURCE = 'custom-deck';
export const MAX_AUDIO_BYTES = 15 * 1024 * 1024;

const randomId = (bytes = 6) => randomBytes(bytes).toString('hex');

/** Pasta (chave relativa a MEDIA_ROOT) dos áudios de um baralho. */
export function deckAudioDir(userId: string, deckId: number): string {
  const safeUser = userId.replace(/[^\w-]/g, '').slice(0, 64) || 'user';
  return `user-decks/${safeUser}/${deckId}`;
}

/** Converte o áudio enviado (mp3, m4a, wav, ogg, webm…) para MP3 e devolve a chave em MEDIA_ROOT. */
export async function storeCardAudio(userId: string, deckId: number, data: Buffer): Promise<string> {
  if (data.length === 0) throw new HttpError(400, 'Arquivo de áudio vazio');
  if (data.length > MAX_AUDIO_BYTES) throw new HttpError(413, 'Áudio muito grande (máximo 15 MB)');
  const key = `${deckAudioDir(userId, deckId)}/${randomId(8)}.mp3`;
  const target = resolveMediaPath(key);
  await mkdir(path.dirname(target), { recursive: true });
  const input = `${target}.upload`;
  await writeFile(input, data);
  try {
    await run(
      FFMPEG,
      ['-v', 'error', '-y', '-i', input, '-vn', '-ac', '1', '-ar', '44100', '-c:a', 'libmp3lame', '-b:a', '96k', '-t', '600', target],
      { timeout: 120_000 },
    );
  } catch {
    await rm(target, { force: true });
    throw new HttpError(400, 'Não consegui ler esse arquivo de áudio. Use MP3, M4A, WAV, OGG ou WEBM.');
  } finally {
    await rm(input, { force: true });
  }
  return key;
}

export async function removeAudioKey(key: string): Promise<void> {
  if (!key) return;
  await rm(resolveMediaPath(key), { force: true }).catch(() => undefined);
}

/** Baralho do usuário (404 se não existir ou for de outra pessoa). */
export async function loadOwnDeck(userId: string, deckId: number) {
  const deck = await prisma.readingContent.findUnique({ where: { id: deckId }, select: { id: true, title: true, userId: true, sourceType: true } });
  if (!deck || deck.sourceType !== CUSTOM_DECK_SOURCE || deck.userId !== userId) throw new HttpError(404, 'Baralho não encontrado');
  return deck;
}

export async function createCustomDeck(userId: string, name: string) {
  const title = name.trim();
  const deck = await prisma.readingContent.create({
    data: {
      title,
      slug: `deck-${randomId(10)}`,
      textHash: '',
      fullText: '',
      cefrLevel: '',
      sourceType: CUSTOM_DECK_SOURCE,
      userId,
      isPublic: false,
      publishStatus: 'private',
      category: 'custom-deck',
    },
    select: { id: true, title: true },
  });
  // Linha de opções do baralho: faz ele aparecer na lista mesmo vazio (usa o preset Default).
  await prisma.userStudyDeck.create({ data: { userId, contentId: deck.id } });
  return deck;
}

/** Remove o baralho inteiro: cartões, histórico, opções, textos e áudios. Devolve quantos cartões havia. */
export async function removeCustomDeck(userId: string, deckId: number): Promise<number> {
  await loadOwnDeck(userId, deckId);
  const [, removed] = await prisma.$transaction([
    prisma.userStudyReview.deleteMany({ where: { userId, contentId: deckId } }),
    prisma.userStudyCard.deleteMany({ where: { userId, contentId: deckId } }),
    prisma.userStudyDeck.deleteMany({ where: { userId, contentId: deckId } }),
    prisma.userSegmentProgress.deleteMany({ where: { userId, contentId: deckId } }),
    prisma.readingContent.delete({ where: { id: deckId } }),
  ]);
  await rm(resolveMediaPath(deckAudioDir(userId, deckId)), { recursive: true, force: true }).catch(() => undefined);
  return removed.count;
}

/** Cria um cartão (frente/verso/áudio) no fim do baralho; ele já entra como novo no estudo. */
export async function addCustomCard(userId: string, deckId: number, input: { front: string; back: string; audioKey?: string }) {
  const last = await prisma.readingSentence.findFirst({ where: { contentId: deckId }, orderBy: { sentenceIndex: 'desc' }, select: { sentenceIndex: true } });
  const sentenceIndex = (last?.sentenceIndex ?? -1) + 1;
  const segmentKey = `cd${deckId}-${randomId(8)}`;
  const [sentence] = await prisma.$transaction([
    prisma.readingSentence.create({
      data: {
        contentId: deckId, sentenceIndex, segmentKey, text: input.front, translation: input.back,
        startMs: 0, endMs: 0, audioKey: input.audioKey ?? '', quality: 'ok',
      },
    }),
    prisma.userStudyCard.create({ data: { userId, contentId: deckId, segmentKey, queue: 'new', manual: true, position: sentenceIndex } }),
  ]);
  return sentence;
}
