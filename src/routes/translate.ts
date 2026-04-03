import { createHash } from 'crypto';
import { Router } from 'express';
import { z } from 'zod';
import { translateWithContext } from '../lib/translate-provider';
import { prisma } from '../lib/prisma';
import { asyncHandler } from '../utils/async-handler';
import { HttpError } from '../utils/http-error';

const translateBodySchema = z.object({
  phrase: z.string().min(1),
  context: z.string().min(1),
});

export const translateRouter = Router();
const WORD_ONLY_CONTEXT_HASH = '__word_only__';
const WORD_ONLY_CONTEXT = '__word_only__';

function shouldReuseCachedExplanation(explanation: string): boolean {
  const clean = explanation.trim();
  if (clean.length < 40) return false;
  const wordCount = clean.split(/\s+/).filter(Boolean).length;
  if (wordCount < 8) return false;
  const firstLine = clean.split('\n')[0]?.trim() ?? '';
  if (!/^A palavra “.+” em inglês significa:$/.test(firstLine)) return false;
  if (!clean.includes('Exemplo:')) return false;
  if (!clean.includes('→')) return false;
  return true;
}

function mapTranslateErrorToHttp(error: unknown): HttpError {
  const message = error instanceof Error ? error.message : '';
  const lowerMessage = message.toLowerCase();
  if (message.includes('DEEPL_API_KEY nao configurada')) {
    return new HttpError(503, 'Servico de traducao nao configurado');
  }

  const providerStatusMatch = message.match(/(DeepL|Google) API error \((\d+)\)/i);
  const providerStatus = providerStatusMatch ? Number(providerStatusMatch[2]) : NaN;
  if (!Number.isNaN(providerStatus)) {
    if (providerStatus === 400) {
      if (lowerMessage.includes('authorization') || lowerMessage.includes('auth') || lowerMessage.includes('credential')) {
        return new HttpError(502, 'Falha de autenticacao no servico de traducao');
      }
      if (lowerMessage.includes('invalid argument') || lowerMessage.includes('request contains an invalid argument')) {
        return new HttpError(400, 'Falha ao traduzir: frase ou contexto invalidos');
      }
      return new HttpError(502, 'Falha na configuracao da chamada ao servico de traducao');
    }
    if (providerStatus === 401 || providerStatus === 403) {
      return new HttpError(502, 'Falha de autenticacao no servico de traducao');
    }
    if (providerStatus === 456) {
      return new HttpError(503, 'Limite da conta de traducao atingido');
    }
    if (providerStatus === 429) {
      return new HttpError(503, 'Servico de traducao temporariamente indisponivel');
    }
    if (providerStatus >= 500) {
      return new HttpError(503, 'Servico de traducao indisponivel no momento');
    }
    return new HttpError(502, 'Falha ao consultar servico de traducao');
  }

  return new HttpError(502, 'Falha ao traduzir no servico externo');
}

function buildWordOnlyExplanation(phrase: string, translation: string, partOfSpeech: string): string {
  const pos = partOfSpeech.trim();
  if (pos) {
    return `Tradução comum de “${phrase}”: ${translation} (${pos}).`;
  }
  return `Tradução comum de “${phrase}”: ${translation}.`;
}

translateRouter.post(
  '/',
  asyncHandler(async (req, res) => {
    const { phrase, context } = translateBodySchema.parse(req.body);
    const normalizedPhrase = phrase.trim().toLowerCase();
    const normalizedContext = context.trim();
    const contextHash = createHash('sha256').update(normalizedContext).digest('hex');

    const cached = await prisma.translationCache.findUnique({
      where: {
        phrase_contextHash: {
          phrase: normalizedPhrase,
          contextHash,
        },
      },
    });

    if (cached && cached.translation.trim().length > 0 && shouldReuseCachedExplanation(cached.explanation)) {
      console.info(`[translate-route] cache hit | phrase="${normalizedPhrase}"`);
      prisma.translationCache
        .update({
          where: { id: cached.id },
          data: { hitCount: { increment: 1 } },
        })
        .catch(() => undefined);

      res.json({
        phrase: cached.phrase,
        translation: cached.translation,
        explanation: cached.explanation,
        partOfSpeech: cached.partOfSpeech,
        fromCache: true,
      });
      return;
    }

    if (cached && cached.translation.trim().length === 0) {
      console.info(`[translate-route] cache cleanup empty translation | phrase="${normalizedPhrase}"`);
      prisma.translationCache
        .delete({ where: { id: cached.id } })
        .catch(() => undefined);
    }

    const wordOnlyCached = await prisma.translationCache.findUnique({
      where: {
        phrase_contextHash: {
          phrase: normalizedPhrase,
          contextHash: WORD_ONLY_CONTEXT_HASH,
        },
      },
    });
    if (wordOnlyCached && wordOnlyCached.translation.trim().length > 0) {
      console.info(`[translate-route] word cache hit | phrase="${normalizedPhrase}"`);
      prisma.translationCache
        .update({
          where: { id: wordOnlyCached.id },
          data: { hitCount: { increment: 1 } },
        })
        .catch(() => undefined);

      res.json({
        phrase: wordOnlyCached.phrase,
        translation: wordOnlyCached.translation,
        explanation: wordOnlyCached.explanation,
        partOfSpeech: wordOnlyCached.partOfSpeech,
        fromCache: true,
      });
      return;
    }

    console.info(`[translate-route] cache miss | phrase="${normalizedPhrase}"`);
    let result: { translation: string; explanation: string; partOfSpeech: string };
    try {
      result = await translateWithContext(normalizedPhrase, normalizedContext);
    } catch (error) {
      throw mapTranslateErrorToHttp(error);
    }

    if (cached) {
      prisma.translationCache
        .update({
          where: { id: cached.id },
          data: {
            context: normalizedContext,
            translation: result.translation,
            explanation: result.explanation,
            partOfSpeech: result.partOfSpeech,
            hitCount: { increment: 1 },
          },
        })
        .catch(() => undefined);
    } else {
      prisma.translationCache
        .create({
          data: {
            phrase: normalizedPhrase,
            contextHash,
            context: normalizedContext,
            translation: result.translation,
            explanation: result.explanation,
            partOfSpeech: result.partOfSpeech,
          },
        })
        .catch(() => undefined);
    }

    const wordOnlyExplanation = buildWordOnlyExplanation(normalizedPhrase, result.translation, result.partOfSpeech);
    if (wordOnlyCached) {
      prisma.translationCache
        .update({
          where: { id: wordOnlyCached.id },
          data: {
            context: WORD_ONLY_CONTEXT,
            translation: result.translation,
            explanation: wordOnlyExplanation,
            partOfSpeech: result.partOfSpeech,
            hitCount: { increment: 1 },
          },
        })
        .catch(() => undefined);
    } else {
      prisma.translationCache
        .create({
          data: {
            phrase: normalizedPhrase,
            contextHash: WORD_ONLY_CONTEXT_HASH,
            context: WORD_ONLY_CONTEXT,
            translation: result.translation,
            explanation: wordOnlyExplanation,
            partOfSpeech: result.partOfSpeech,
          },
        })
        .catch(() => undefined);
    }

    res.json({
      phrase: normalizedPhrase,
      translation: result.translation,
      explanation: result.explanation,
      partOfSpeech: result.partOfSpeech,
      fromCache: false,
    });
  }),
);
