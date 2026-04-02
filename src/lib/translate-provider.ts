import { env } from '../config/env';

const DEEPL_API_URL = 'https://api-free.deepl.com/v2/translate';
const GOOGLE_TRANSLATE_FALLBACK_URL = 'https://translate.googleapis.com/translate_a/single';

type TranslationResult = {
  translation: string;
  explanation: string;
  partOfSpeech: string;
  baseForm: string;
  contextTranslation: string;
  isInformal: boolean;
};

function summarizeText(text: string): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  return clean.length > 80 ? `${clean.slice(0, 80)}...` : clean;
}

function parseDeepLTranslation(payload: unknown): string {
  if (!payload || typeof payload !== 'object') return '';
  const record = payload as { translations?: Array<{ text?: unknown }> };
  const text = record.translations?.[0]?.text;
  return typeof text === 'string' ? text.trim() : '';
}

async function translateWithDeepL(text: string): Promise<string> {
  if (!env.DEEPL_API_KEY) {
    throw new Error('DEEPL_API_KEY nao configurada');
  }
  const authorizationHeader = env.DEEPL_API_KEY.startsWith('DeepL-Auth-Key ')
    ? env.DEEPL_API_KEY
    : `DeepL-Auth-Key ${env.DEEPL_API_KEY}`;

  const response = await fetch(DEEPL_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authorizationHeader,
    },
    body: JSON.stringify({
      text: [text],
      target_lang: 'PT-BR',
    }),
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`DeepL API error (${response.status}): ${details.slice(0, 400)}`);
  }

  const payload = (await response.json()) as unknown;
  const translated = parseDeepLTranslation(payload);
  if (!translated) {
    throw new Error('DeepL API error (502): traducao vazia');
  }
  return translated;
}

function parseGoogleTranslation(payload: unknown): string {
  if (!Array.isArray(payload)) return '';
  const main = payload[0];
  if (!Array.isArray(main)) return '';
  const translated = main
    .map((entry) => {
      if (!Array.isArray(entry)) return '';
      const piece = entry[0];
      return typeof piece === 'string' ? piece : '';
    })
    .join('')
    .trim();
  return translated;
}

async function translateWithGoogleFallback(text: string): Promise<string> {
  const query = new URLSearchParams({
    client: 'gtx',
    sl: 'auto',
    tl: 'pt',
    dt: 't',
    q: text,
  });
  const response = await fetch(`${GOOGLE_TRANSLATE_FALLBACK_URL}?${query.toString()}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json,text/plain,*/*',
    },
  });
  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Google API error (${response.status}): ${details.slice(0, 400)}`);
  }
  const payload = (await response.json()) as unknown;
  const translated = parseGoogleTranslation(payload);
  if (!translated) {
    throw new Error('Google API error (502): traducao vazia');
  }
  return translated;
}

function buildDidacticExplanation(phrase: string, context: string, translation: string, contextTranslation: string): string {
  return `A palavra “${phrase}” em inglês significa:\n\n“${phrase}” → significa “${translation}”\n\nExemplo:\n\n${context} → ${contextTranslation}`;
}

export async function translateWithContext(phrase: string, context: string): Promise<TranslationResult> {
  const phrasePreview = summarizeText(phrase);
  const contextPreview = summarizeText(context);
  let translation = '';
  let contextTranslation = '';
  console.info(`[translate-provider] DeepL attempt | phrase="${phrasePreview}" | context="${contextPreview}"`);
  try {
    [translation, contextTranslation] = await Promise.all([translateWithDeepL(phrase), translateWithDeepL(context)]);
    console.info(`[translate-provider] DeepL success | phrase="${phrasePreview}"`);
  } catch (deepLError) {
    const deepLMessage = deepLError instanceof Error ? deepLError.message : 'DeepL falhou';
    console.warn(`[translate-provider] DeepL failed | phrase="${phrasePreview}" | reason="${deepLMessage}"`);
    console.info(`[translate-provider] Google fallback attempt | phrase="${phrasePreview}"`);
    try {
      [translation, contextTranslation] = await Promise.all([
        translateWithGoogleFallback(phrase),
        translateWithGoogleFallback(context),
      ]);
      console.info(`[translate-provider] Google fallback success | phrase="${phrasePreview}"`);
    } catch (googleError) {
      const googleMessage = googleError instanceof Error ? googleError.message : 'Google falhou';
      console.error(
        `[translate-provider] Google fallback failed | phrase="${phrasePreview}" | deepL="${deepLMessage}" | google="${googleMessage}"`,
      );
      throw new Error(`DeepL failed: ${deepLMessage} | Google failed: ${googleMessage}`);
    }
  }

  return {
    translation,
    explanation: buildDidacticExplanation(phrase, context, translation, contextTranslation),
    partOfSpeech: '',
    baseForm: phrase,
    contextTranslation,
    isInformal: false,
  };
}
