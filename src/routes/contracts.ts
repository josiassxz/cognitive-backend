import { Router } from 'express';

export const contractsRouter = Router();

contractsRouter.get('/', (_req, res) => {
  res.json({
    version: '2.0.0',
    auth: {
      signup: {
        method: 'POST',
        path: '/api/signup',
        body: { email: 'string', password: 'string>=6', name: 'string?' },
        response: { success: 'boolean', userId: 'string' },
        errors: ['VALIDATION_ERROR', 'HTTP_400'],
      },
      login: {
        method: 'POST',
        path: '/api/auth/login',
        body: { email: 'string', password: 'string' },
        response: {
          accessToken: 'string',
          refreshToken: 'string',
          user: { id: 'string', email: 'string', name: 'string|null', role: 'user|admin' },
        },
        errors: ['VALIDATION_ERROR', 'HTTP_401'],
      },
      refresh: {
        method: 'POST',
        path: '/api/auth/refresh',
        body: { refreshToken: 'string' },
        response: {
          accessToken: 'string',
          refreshToken: 'string',
          user: { id: 'string', email: 'string', name: 'string|null', role: 'user|admin' },
        },
        errors: ['VALIDATION_ERROR', 'HTTP_401'],
      },
      logout: {
        method: 'POST',
        path: '/api/auth/logout',
        body: { refreshToken: 'string' },
        response: { success: 'boolean' },
      },
    },
    oxfordWords: {
      list: {
        method: 'GET',
        path: '/api/oxford-words',
        auth: false,
        query: {
          search: 'string? — busca por prefixo no campo word',
          cefrLevel: 'string? — a1|a2|b1|b2|c1',
          ox3000: 'boolean? — filtra apenas Oxford 3000',
          ox5000: 'boolean? — filtra apenas Oxford 5000',
          page: 'number? (default 1)',
          limit: 'number? (default 50, max 100)',
        },
        response: {
          words: '[{ id, word, cefrLevel, ox3000, ox5000, partOfSpeech }]',
          total: 'number',
          page: 'number',
          limit: 'number',
          totalPages: 'number',
        },
      },
      levels: {
        method: 'GET',
        path: '/api/oxford-words/levels',
        auth: false,
        response: {
          levels: '[{ cefrLevel: string, _count: number }]',
        },
      },
      random: {
        method: 'GET',
        path: '/api/oxford-words/random',
        auth: false,
        query: {
          count: 'number? (default 10, max 50)',
          cefrLevel: 'string?',
        },
        response: {
          words: '[{ id, word, cefrLevel, ox3000, ox5000, partOfSpeech }]',
        },
      },
    },
    collocations: {
      browse: {
        method: 'GET',
        path: '/api/collocations',
        auth: false,
        query: {
          search: 'string? — busca no collocation ou exemplo',
          type: 'string? — tipo de colocação (adj+noun, verb+noun, etc)',
          page: 'number? (default 1)',
          limit: 'number? (default 30, max 100)',
        },
        response: {
          collocations: '[{ id, collocation, type, example, meaning }]',
          total: 'number',
          page: 'number',
          limit: 'number',
          totalPages: 'number',
        },
      },
      exercises: {
        method: 'GET',
        path: '/api/collocations/exercises',
        auth: false,
        query: {
          count: 'number? (default 10, max 30)',
          type: 'string? — filtra por tipo de colocação',
        },
        response: {
          exercises: '[{ id, sentence, options: string[], collocation: { collocation, type, example } }]',
          total: 'number',
          sessionId: 'string (UUID)',
        },
      },
      submit: {
        method: 'POST',
        path: '/api/collocations/exercises/submit',
        auth: true,
        body: {
          sessionId: 'string (UUID recebido do GET exercises)',
          answers: '[{ exerciseId: string, selectedOption: string }]',
        },
        response: {
          score: 'number',
          total: 'number',
          percentage: 'number',
          xpEarned: 'number',
          results: '[{ exerciseId, selectedOption, correctAnswer, isCorrect }]',
        },
        errors: ['HTTP_401', 'VALIDATION_ERROR', 'HTTP_409 (sessão já submetida)'],
      },
      progress: {
        method: 'GET',
        path: '/api/collocations/progress',
        auth: true,
        response: {
          mastered: 'number',
          attempted: 'number',
          totalExercises: 'number',
          recentAttempts: '[{ exerciseId, correct, attempts, mastered, updatedAt }]',
        },
      },
    },
    sentenceExercises: {
      list: {
        method: 'GET',
        path: '/api/sentence-exercises',
        auth: false,
        query: {
          count: 'number? (default 10, max 30)',
          cefrLevel: 'string? — a1|a2|b1|b2|c1',
          month: 'number? — 1-6',
        },
        response: {
          exercises: '[{ id, sentence, options: string[], cefrLevel, month }]',
          total: 'number',
          sessionId: 'string (UUID)',
        },
      },
      submit: {
        method: 'POST',
        path: '/api/sentence-exercises/submit',
        auth: true,
        body: {
          sessionId: 'string (UUID recebido do GET exercises)',
          answers: '[{ exerciseId: string, selectedOption: string }]',
        },
        response: {
          score: 'number',
          total: 'number',
          percentage: 'number',
          xpEarned: 'number',
          results: '[{ exerciseId, selectedOption, correctAnswer, isCorrect }]',
        },
        errors: ['HTTP_401', 'VALIDATION_ERROR', 'HTTP_409 (sessão já submetida)'],
      },
      progress: {
        method: 'GET',
        path: '/api/sentence-exercises/progress',
        auth: true,
        response: {
          mastered: 'number',
          attempted: 'number',
          totalExercises: 'number',
          recentAttempts: '[{ exerciseId, correct, attempts, mastered, updatedAt }]',
        },
      },
    },
    lyricsInterativo: {
      translate: {
        method: 'POST',
        path: '/api/translate',
        auth: false,
        body: {
          phrase: 'string',
          context: 'string',
        },
        response: {
          phrase: 'string',
          translation: 'string',
          explanation: 'string',
          partOfSpeech: 'string',
          fromCache: 'boolean',
        },
      },
      songLyrics: {
        method: 'GET',
        path: '/api/songs/:songId/lyrics',
        auth: false,
        response: {
          lines: '[{ id, songId, lineIndex, startMs, endMs, text, translation }]',
          total: 'number',
        },
      },
      importSong: {
        method: 'POST',
        path: '/api/songs/import',
        auth: true,
        body: {
          youtubeUrl: 'string',
          title: 'string?',
          artist: 'string?',
        },
      },
      importSongMobile: {
        method: 'POST',
        path: '/api/mobile/import-song',
        auth: true,
        body: {
          youtubeUrl: 'string',
        },
      },
      uploadSrt: {
        method: 'POST',
        path: '/api/songs/:songId/upload-srt',
        auth: true,
        body: {
          file: 'multipart/form-data (.srt/.vtt)',
        },
      },
      savedPhrases: {
        list: { method: 'GET', path: '/api/user/saved-phrases', auth: true },
        save: { method: 'POST', path: '/api/user/saved-phrases', auth: true },
        update: { method: 'PATCH', path: '/api/user/saved-phrases/:id', auth: true },
        remove: { method: 'DELETE', path: '/api/user/saved-phrases/:id', auth: true },
        toFlashcards: { method: 'POST', path: '/api/user/saved-phrases/to-flashcards', auth: true },
      },
    },
    errorShape: {
      error: 'string',
      code: 'string',
      details: 'object? (validation only)',
    },
  });
});
