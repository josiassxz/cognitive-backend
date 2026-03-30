import { env } from '../config/env';

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

type TranslationResult = {
  translation: string;
  explanation: string;
  partOfSpeech: string;
};

function asNonEmptyString(value: unknown): string {
  if (typeof value === 'string') {
    return value.trim();
  }
  if (value && typeof value === 'object') {
    const record = value as Record<string, unknown>;
    const nestedText = record.text ?? record.value ?? record.content;
    if (typeof nestedText === 'string') {
      return nestedText.trim();
    }
  }
  return '';
}

function normalizeResult(data: unknown): TranslationResult {
  if (typeof data === 'string') {
    return { translation: data.trim(), explanation: '', partOfSpeech: '' };
  }
  if (!data || typeof data !== 'object') {
    return { translation: '', explanation: '', partOfSpeech: '' };
  }

  const result = data as Record<string, unknown>;
  const translation =
    asNonEmptyString(result.translation) ||
    asNonEmptyString(result.translatedText) ||
    asNonEmptyString(result.meaning) ||
    asNonEmptyString(result.significado) ||
    Object.values(result).map(asNonEmptyString).find((value) => value.length > 0) ||
    '';
  const explanation =
    asNonEmptyString(result.explanation) ||
    asNonEmptyString(result.note) ||
    asNonEmptyString(result.explicacao) ||
    '';
  const partOfSpeech =
    asNonEmptyString(result.partOfSpeech) ||
    asNonEmptyString(result.pos) ||
    asNonEmptyString(result.classeGramatical) ||
    '';

  return {
    translation,
    explanation,
    partOfSpeech,
  };
}

export async function translateWithContext(phrase: string, context: string): Promise<TranslationResult> {
  if (!env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY nao configurada');
  }
  const authorizationHeader = env.GEMINI_API_KEY.startsWith('Bearer ')
    ? env.GEMINI_API_KEY
    : `Bearer ${env.GEMINI_API_KEY}`;

  const prompt = `Você é um professor de inglês para estudantes brasileiros.

Palavra/expressão: "${phrase}"
Contexto (frase completa): "${context}"

Responda APENAS em JSON válido, sem markdown e de forma curta/sucinta para aluno:
{
  "translation": "tradução em PT-BR considerando o contexto",
  "explanation": "explicação curta para aluno (máximo 12 palavras)",
  "partOfSpeech": "classe gramatical (noun/verb/adj/adv/phrase/idiom)"
}`;

  const response = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authorizationHeader,
    },
    body: JSON.stringify({
      model: env.GROQ_MODEL,
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.1,
      max_tokens: 180,
      response_format: { type: 'json_object' },
    }),
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Groq API error (${response.status}): ${details.slice(0, 400)}`);
  }

  const payload = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const text = payload.choices?.[0]?.message?.content ?? '{}';
  const cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

  const normalized = (() => {
    try {
      return normalizeResult(JSON.parse(cleaned));
    } catch {
      return normalizeResult(text);
    }
  })();

  if (!normalized.translation) {
    throw new Error('Groq response error: traducao vazia');
  }

  return normalized;
}
