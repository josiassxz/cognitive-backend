import { createHash } from 'crypto';
import { Router } from 'express';
import { z } from 'zod';
import { translateWithContext } from '../lib/gemini';
import { prisma } from '../lib/prisma';
import { asyncHandler } from '../utils/async-handler';
import { HttpError } from '../utils/http-error';

const translateBodySchema = z.object({
  phrase: z.string().min(1),
  context: z.string().min(1),
});

export const translateRouter = Router();

function mapTranslateErrorToHttp(error: unknown): HttpError {
  const message = error instanceof Error ? error.message : '';
  const lowerMessage = message.toLowerCase();
  if (message.includes('GEMINI_API_KEY nao configurada')) {
    return new HttpError(503, 'Servico de traducao nao configurado');
  }

  const providerStatusMatch = message.match(/API error \((\d+)\)/);
  const providerStatus = providerStatusMatch ? Number(providerStatusMatch[1]) : NaN;
  if (!Number.isNaN(providerStatus)) {
    if (providerStatus === 400) {
      if (
        lowerMessage.includes('api key not valid') ||
        lowerMessage.includes('api_key_invalid') ||
        lowerMessage.includes('permission_denied') ||
        lowerMessage.includes('credential')
      ) {
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

    if (cached && cached.translation.trim().length > 0) {
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
      prisma.translationCache
        .delete({ where: { id: cached.id } })
        .catch(() => undefined);
    }

    let result: { translation: string; explanation: string; partOfSpeech: string };
    try {
      result = await translateWithContext(normalizedPhrase, normalizedContext);
    } catch (error) {
      throw mapTranslateErrorToHttp(error);
    }

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

    res.json({
      phrase: normalizedPhrase,
      translation: result.translation,
      explanation: result.explanation,
      partOfSpeech: result.partOfSpeech,
      fromCache: false,
    });
  }),
);
