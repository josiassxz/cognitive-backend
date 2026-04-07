import { prisma } from '../lib/prisma';
import { mapCefrToMonth } from './content-service';
import { XP_CONFIG } from '../lib/xp';
import { HttpError } from '../utils/http-error';

export type QuizType = 'vocabulary' | 'phrasal-verbs' | 'expressions' | 'mixed';
export type QuizQuestionType = 'multiple_choice' | 'fill_blank' | 'listening';

export type QuizQuestion = {
  id: number;
  question: string;
  correctAnswer: string;
  options: string[] | null;
  hint: string;
  explanation?: string;
  questionType: QuizQuestionType;
  audioText?: string;
};

export type QuizAnswer = {
  questionId: number;
  selectedAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
};

type VocabularyItem = {
  id: number;
  word: string;
  definition: string;
  example: string;
};

type PhrasalVerbItem = {
  id: number;
  phrasal: string;
  meaning: string;
  example: string;
};

type ExpressionItem = {
  id: number;
  expression: string;
  meaning: string;
  example: string;
};

function shuffle<T>(array: T[]): T[] {
  const output = [...array];
  for (let i = output.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [output[i], output[j]] = [output[j], output[i]];
  }
  return output;
}

export function calculateQuizResult(answers: QuizAnswer[]) {
  const totalQ = answers.length;
  const correct = answers.filter((answer) => answer.isCorrect).length;
  const isPerfect = totalQ > 0 && correct === totalQ;
  let xpEarned = correct * XP_CONFIG.quiz_correct + XP_CONFIG.quiz_complete;
  if (isPerfect) xpEarned += XP_CONFIG.quiz_perfect_bonus;
  return { totalQ, correct, isPerfect, xpEarned };
}

function buildOptions(correct: string, distractors: string[]): string[] {
  return shuffle([correct, ...distractors.slice(0, 3)]);
}

function generateVocabQuiz(items: VocabularyItem[], count: number, questionType: QuizQuestionType): QuizQuestion[] {
  const selected = shuffle(items).slice(0, count);
  return selected.map((item) => {
    const isListening = questionType === 'listening';
    const correctAnswer = isListening ? item.word : item.definition;
    const distractors = shuffle(items.filter((x) => x.id !== item.id))
      .slice(0, 3)
      .map((x) => (isListening ? x.word : x.definition));

    return {
      id: item.id,
      question: isListening ? 'O que você ouviu?' : `Qual o significado de "${item.word}"?`,
      correctAnswer,
      options: questionType === 'fill_blank' ? null : buildOptions(correctAnswer, distractors),
      hint: item.example,
      explanation: item.example ? `Exemplo: "${item.example}"` : undefined,
      questionType,
      audioText: isListening ? item.word : undefined,
    };
  });
}

function generatePhrasalQuiz(items: PhrasalVerbItem[], count: number, questionType: QuizQuestionType): QuizQuestion[] {
  const selected = shuffle(items).slice(0, count);
  return selected.map((item) => {
    const isListening = questionType === 'listening';
    const correctAnswer = isListening ? item.phrasal : item.meaning;
    const distractors = shuffle(items.filter((x) => x.id !== item.id))
      .slice(0, 3)
      .map((x) => (isListening ? x.phrasal : x.meaning));

    return {
      id: item.id,
      question: isListening ? 'O que você ouviu?' : `O que significa "${item.phrasal}"?`,
      correctAnswer,
      options: questionType === 'fill_blank' ? null : buildOptions(correctAnswer, distractors),
      hint: item.example,
      explanation: item.example ? `Exemplo: "${item.example}"` : undefined,
      questionType,
      audioText: isListening ? item.phrasal : undefined,
    };
  });
}

function generateExpressionQuiz(items: ExpressionItem[], count: number, questionType: QuizQuestionType): QuizQuestion[] {
  const selected = shuffle(items).slice(0, count);
  return selected.map((item) => {
    const isListening = questionType === 'listening';
    const correctAnswer = isListening ? item.expression : item.meaning;
    const distractors = shuffle(items.filter((x) => x.id !== item.id))
      .slice(0, 3)
      .map((x) => (isListening ? x.expression : x.meaning));

    return {
      id: item.id,
      question: isListening ? 'O que você ouviu?' : `O que significa "${item.expression}"?`,
      correctAnswer,
      options: questionType === 'fill_blank' ? null : buildOptions(correctAnswer, distractors),
      hint: item.example,
      explanation: item.example ? `Exemplo: "${item.example}"` : undefined,
      questionType,
      audioText: isListening ? item.expression : undefined,
    };
  });
}

export function buildQuiz(params: {
  type: QuizType;
  questionType: QuizQuestionType;
  count: number;
  vocabulary: VocabularyItem[];
  phrasalVerbs: PhrasalVerbItem[];
  expressions: ExpressionItem[];
}): QuizQuestion[] {
  const count = Math.min(params.count, 20);
  const qt = params.questionType;

  if (params.type === 'vocabulary') {
    if (params.vocabulary.length < 4) throw new HttpError(400, 'Vocabulario insuficiente para quiz');
    return generateVocabQuiz(params.vocabulary, count, qt);
  }

  if (params.type === 'phrasal-verbs') {
    if (params.phrasalVerbs.length < 4) throw new HttpError(400, 'Phrasal verbs insuficientes');
    return generatePhrasalQuiz(params.phrasalVerbs, count, qt);
  }

  if (params.type === 'mixed') {
    // Spec 06 — distribuição equilibrada entre os buckets disponíveis: pega
    // ceil(count/n) de cada bucket, embaralha e fatia, garantindo presença
    // dos 3 tipos quando possível.
    const buckets: QuizQuestion[][] = [];
    const perBucket = Math.ceil(count / 3);
    if (params.vocabulary.length >= 4) buckets.push(generateVocabQuiz(params.vocabulary, perBucket, qt));
    if (params.phrasalVerbs.length >= 4) buckets.push(generatePhrasalQuiz(params.phrasalVerbs, perBucket, qt));
    if (params.expressions.length >= 4) buckets.push(generateExpressionQuiz(params.expressions, perBucket, qt));
    if (buckets.length === 0) throw new HttpError(400, 'Conteudo insuficiente para quiz misto');
    return shuffle(buckets.flat()).slice(0, count);
  }

  if (params.expressions.length < 4) throw new HttpError(400, 'Expressoes insuficientes');
  return generateExpressionQuiz(params.expressions, count, qt);
}

// Placement test: 2 questions per CEFR level = 12 questions total
export async function generatePlacementTest(): Promise<QuizQuestion[]> {
  const levels = ['a1', 'a2', 'b1', 'b2', 'c1', 'c2'];
  const perLevel = 2;

  const vocabByLevel = await Promise.all(
    levels.map((level) =>
      prisma.vocabulary.findMany({
        where: { month: mapCefrToMonth(level as Parameters<typeof mapCefrToMonth>[0]) },
        take: perLevel + 3,
        orderBy: { id: 'asc' },
      }),
    ),
  );

  const questions: QuizQuestion[] = [];

  for (let i = 0; i < levels.length; i++) {
    const levelItems = vocabByLevel[i];
    if (levelItems.length < 2) continue;

    const selected = levelItems.slice(0, perLevel);
    const allItems = vocabByLevel.flat();

    for (const item of selected) {
      const distractors = shuffle(allItems.filter((x) => x.id !== item.id))
        .slice(0, 3)
        .map((x) => x.definition);

      questions.push({
        id: item.id,
        question: `Qual o significado de "${item.word}"?`,
        correctAnswer: item.definition,
        options: buildOptions(item.definition, distractors),
        hint: item.example ?? '',
        explanation: item.example ? `Exemplo: "${item.example}"` : undefined,
        questionType: 'multiple_choice',
        audioText: undefined,
      });
    }
  }

  return questions;
}
