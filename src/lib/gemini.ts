import { env } from '../config/env';

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

type TranslationResult = {
  translation: string;
  explanation: string;
  partOfSpeech: string;
  baseForm: string;
  contextTranslation: string;
  isInformal: boolean;
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
    return {
      translation: data.trim(),
      explanation: '',
      partOfSpeech: '',
      baseForm: '',
      contextTranslation: '',
      isInformal: false,
    };
  }
  if (!data || typeof data !== 'object') {
    return {
      translation: '',
      explanation: '',
      partOfSpeech: '',
      baseForm: '',
      contextTranslation: '',
      isInformal: false,
    };
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
  const baseForm =
    asNonEmptyString(result.baseForm) ||
    asNonEmptyString(result.fullForm) ||
    asNonEmptyString(result.expandedForm) ||
    asNonEmptyString(result.canonicalForm) ||
    '';
  const contextTranslation =
    asNonEmptyString(result.contextTranslation) ||
    asNonEmptyString(result.exampleTranslation) ||
    asNonEmptyString(result.translationOfContext) ||
    '';
  const isInformal = (() => {
    if (typeof result.isInformal === 'boolean') return result.isInformal;
    if (typeof result.informal === 'boolean') return result.informal;
    const hint = `${asNonEmptyString(result.register)} ${asNonEmptyString(result.style)} ${asNonEmptyString(result.explanation)}`.toLowerCase();
    return hint.includes('informal') || hint.includes('slang') || hint.includes('gíria') || hint.includes('giria');
  })();

  return {
    translation,
    explanation,
    partOfSpeech,
    baseForm,
    contextTranslation,
    isInformal,
  };
}

function buildDidacticExplanation(
  phrase: string,
  context: string,
  data: { translation: string; baseForm: string; contextTranslation: string; isInformal: boolean; partOfSpeech: string },
): string {
  const base = data.baseForm || phrase;
  const contextPt = data.contextTranslation || data.translation;
  const firstLine = data.isInformal
    ? `A palavra “${phrase}” em inglês é uma forma informal (gíria) de:`
    : data.partOfSpeech
      ? `A palavra “${phrase}” em inglês é ${data.partOfSpeech} e significa:`
      : `A palavra “${phrase}” em inglês significa:`;
  return `${firstLine}\n\n“${base}” → significa “${data.translation}”\n\nExemplo:\n\n${context} → ${contextPt}`;
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

Regras:
- Responda APENAS em JSON válido, sem markdown.
- Use poucas palavras e linguagem simples.
- "translation" deve ser curta em PT-BR.
- "baseForm" deve conter a forma completa/base (ex.: cuz -> because).
- "contextTranslation" deve traduzir a frase completa do contexto para PT-BR.
- "isInformal" deve ser true para gíria/abreviação informal.
- "partOfSpeech" com noun/verb/adj/adv/phrase/idiom quando aplicável.

Formato obrigatório:
{
  "translation": "tradução em PT-BR considerando o contexto",
  "baseForm": "forma completa/base em inglês",
  "contextTranslation": "tradução da frase completa do contexto para PT-BR",
  "isInformal": true,
  "partOfSpeech": "classe gramatical (noun/verb/adj/adv/phrase/idiom)",
  "explanation": "opcional"
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
      max_tokens: 260,
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

  return {
    translation: normalized.translation,
    explanation: buildDidacticExplanation(phrase, context, normalized),
    partOfSpeech: normalized.partOfSpeech,
    baseForm: normalized.baseForm,
    contextTranslation: normalized.contextTranslation,
    isInformal: normalized.isInformal,
  };
}
