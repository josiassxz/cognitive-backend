import { XP_CONFIG } from '../lib/xp';
import { HttpError } from '../utils/http-error';

export type QuizType = 'vocabulary' | 'phrasal-verbs' | 'expressions';

export type QuizQuestion = {
  id: number;
  question: string;
  correctAnswer: string;
  options: string[];
  hint: string;
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

function generateVocabQuiz(items: VocabularyItem[], count: number): QuizQuestion[] {
  const selected = shuffle(items).slice(0, count);
  return selected.map((item) => {
    const wrongOptions = shuffle(items.filter((x) => x.id !== item.id))
      .slice(0, 3)
      .map((x) => x.definition);
    const options = shuffle([item.definition, ...wrongOptions]);
    return {
      id: item.id,
      question: `Qual o significado de "${item.word}"?`,
      correctAnswer: item.definition,
      options,
      hint: item.example,
    };
  });
}

function generatePhrasalQuiz(items: PhrasalVerbItem[], count: number): QuizQuestion[] {
  const selected = shuffle(items).slice(0, count);
  return selected.map((item) => {
    const wrongOptions = shuffle(items.filter((x) => x.id !== item.id))
      .slice(0, 3)
      .map((x) => x.meaning);
    const options = shuffle([item.meaning, ...wrongOptions]);
    return {
      id: item.id,
      question: `O que significa "${item.phrasal}"?`,
      correctAnswer: item.meaning,
      options,
      hint: item.example,
    };
  });
}

function generateExpressionQuiz(items: ExpressionItem[], count: number): QuizQuestion[] {
  const selected = shuffle(items).slice(0, count);
  return selected.map((item) => {
    const wrongOptions = shuffle(items.filter((x) => x.id !== item.id))
      .slice(0, 3)
      .map((x) => x.meaning);
    const options = shuffle([item.meaning, ...wrongOptions]);
    return {
      id: item.id,
      question: `O que significa "${item.expression}"?`,
      correctAnswer: item.meaning,
      options,
      hint: item.example,
    };
  });
}

export function buildQuiz(params: {
  type: QuizType;
  count: number;
  vocabulary: VocabularyItem[];
  phrasalVerbs: PhrasalVerbItem[];
  expressions: ExpressionItem[];
}): QuizQuestion[] {
  const count = Math.min(params.count, 20);

  if (params.type === 'vocabulary') {
    if (params.vocabulary.length < 4) throw new HttpError(400, 'Vocabulario insuficiente para quiz');
    return generateVocabQuiz(params.vocabulary, count);
  }

  if (params.type === 'phrasal-verbs') {
    if (params.phrasalVerbs.length < 4) throw new HttpError(400, 'Phrasal verbs insuficientes');
    return generatePhrasalQuiz(params.phrasalVerbs, count);
  }

  if (params.expressions.length < 4) throw new HttpError(400, 'Expressoes insuficientes');
  return generateExpressionQuiz(params.expressions, count);
}
