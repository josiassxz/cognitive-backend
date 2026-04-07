import { describe, expect, it } from 'vitest';
import { buildQuiz, calculateQuizResult } from '../src/services/quiz-service';

describe('quiz-service', () => {
  it('calcula resultado com bonus de quiz perfeito', () => {
    const result = calculateQuizResult([
      { questionId: 1, selectedAnswer: 'a', correctAnswer: 'a', isCorrect: true },
      { questionId: 2, selectedAnswer: 'b', correctAnswer: 'b', isCorrect: true },
    ]);

    expect(result).toEqual({
      totalQ: 2,
      correct: 2,
      isPerfect: true,
      xpEarned: 50,
    });
  });

  it('gera quiz de vocabulary com 4 opcoes', () => {
    const questions = buildQuiz({
      type: 'vocabulary',
      questionType: 'multiple_choice',
      count: 2,
      vocabulary: [
        { id: 1, word: 'hello', definition: 'olá', example: 'Hello there' },
        { id: 2, word: 'bye', definition: 'tchau', example: 'Bye now' },
        { id: 3, word: 'thanks', definition: 'obrigado', example: 'Thanks a lot' },
        { id: 4, word: 'please', definition: 'por favor', example: 'Please sit' },
      ],
      phrasalVerbs: [],
      expressions: [],
    });

    expect(questions).toHaveLength(2);
    for (const question of questions) {
      expect(question.options).toHaveLength(4);
      expect(question.options).toContain(question.correctAnswer);
    }
  });

  it('falha quando nao ha itens suficientes', () => {
    expect(() =>
      buildQuiz({
        type: 'expressions',
        questionType: 'multiple_choice',
        count: 5,
        vocabulary: [],
        phrasalVerbs: [],
        expressions: [
          { id: 1, expression: 'break a leg', meaning: 'boa sorte', example: 'Break a leg tonight' },
        ],
      }),
    ).toThrowError('Expressoes insuficientes');
  });
});
