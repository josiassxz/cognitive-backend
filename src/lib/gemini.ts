import { env } from '../config/env';

const GEMINI_API_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

type TranslationResult = {
  translation: string;
  explanation: string;
  partOfSpeech: string;
};

function normalizeGeminiResult(data: unknown): TranslationResult {
  if (!data || typeof data !== 'object') {
    return { translation: '', explanation: '', partOfSpeech: '' };
  }

  const result = data as Record<string, unknown>;
  return {
    translation: String(result.translation ?? '').trim(),
    explanation: String(result.explanation ?? '').trim(),
    partOfSpeech: String(result.partOfSpeech ?? '').trim(),
  };
}

export async function translateWithContext(phrase: string, context: string): Promise<TranslationResult> {
  if (!env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY nao configurada');
  }

  const prompt = `Você é um professor de inglês para brasileiros.

Palavra/expressão: "${phrase}"
Contexto (frase completa): "${context}"

Responda APENAS em JSON válido, sem markdown:
{
  "translation": "tradução em PT-BR considerando o contexto",
  "explanation": "explicação breve de por que essa tradução se aplica nesse contexto (max 1 frase)",
  "partOfSpeech": "classe gramatical (noun/verb/adj/adv/phrase/idiom)"
}`;

  const response = await fetch(`${GEMINI_API_URL}?key=${env.GEMINI_API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.1,
        maxOutputTokens: 200,
      },
    }),
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Gemini API error (${response.status}): ${details.slice(0, 300)}`);
  }

  const payload = (await response.json()) as {
    candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
  };
  const text = payload.candidates?.[0]?.content?.parts?.[0]?.text ?? '{}';
  const cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

  try {
    return normalizeGeminiResult(JSON.parse(cleaned));
  } catch {
    return normalizeGeminiResult({ translation: text, explanation: '', partOfSpeech: '' });
  }
}
