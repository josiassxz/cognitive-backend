import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import morgan from 'morgan';
import { env } from './config/env';
import { authMiddleware, requireAdmin } from './middleware/auth';
import { errorHandler, notFoundHandler } from './middleware/error-handler';
import { adminRouter } from './routes/admin';
import { authRouter } from './routes/auth';
import { contractsRouter } from './routes/contracts';
import { expressionsRouter } from './routes/expressions';
import { flashcardsRouter } from './routes/flashcards';
import { grammarRouter } from './routes/grammar';
import { phrasalVerbsRouter } from './routes/phrasal-verbs';
import { podcastsRouter } from './routes/podcasts';
import { quizRouter } from './routes/quiz';
import { songsRouter } from './routes/songs';
import { statsRouter } from './routes/stats';
import { userRouter } from './routes/user';
import { videosRouter } from './routes/videos';
import { vocabularyRouter } from './routes/vocabulary';
import { oxfordWordsRouter } from './routes/oxford-words';
import { sentenceExercisesRouter } from './routes/sentence-exercises';
import { translateRouter } from './routes/translate';
import { mobileRouter } from './routes/mobile';
import { readingLabRouter } from './routes/reading-lab';
import { missionsRouter } from './routes/missions';
import { vocabularySrsRouter } from './routes/vocabulary-srs';
import transcriptRouter from './routes/transcript';
import libraryRouter from './routes/library';

export function createApp() {
  const app = express();
  app.set('trust proxy', env.NODE_ENV === 'production' ? 1 : false);
  const isDevelopment = env.NODE_ENV === 'development';
  const defaultLimitMax = isDevelopment ? Math.max(env.RATE_LIMIT_MAX, 1000) : env.RATE_LIMIT_MAX;
  const authLimitMax = isDevelopment ? Math.max(env.AUTH_RATE_LIMIT_MAX, 120) : env.AUTH_RATE_LIMIT_MAX;
  const allowedOrigins = env.CORS_ORIGINS.split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
  const defaultLimiter = rateLimit({
    windowMs: env.RATE_LIMIT_WINDOW_MS,
    max: defaultLimitMax,
    standardHeaders: true,
    legacyHeaders: false,
  });
  const authLimiter = rateLimit({
    windowMs: env.RATE_LIMIT_WINDOW_MS,
    max: authLimitMax,
    standardHeaders: true,
    legacyHeaders: false,
  });

  app.use(helmet());
  app.use(
    cors({
      origin(origin, callback) {
        if (!origin) {
          callback(null, true);
          return;
        }
        if (allowedOrigins.includes(origin)) {
          callback(null, true);
          return;
        }
        callback(null, false);
      },
    }),
  );
  app.use(express.json({ limit: '1mb' }));
  app.use(morgan('dev'));
  app.use(defaultLimiter);

  app.get('/health', (_req, res) => {
    res.json({ ok: true });
  });

  app.use('/api', authLimiter, authRouter);
  app.use('/api/contracts', contractsRouter);
  app.use('/api/vocabulary', vocabularyRouter);
  app.use('/api/videos', videosRouter);
  app.use('/api/podcasts', podcastsRouter);
  app.use('/api/expressions', expressionsRouter);
  app.use('/api/phrasal-verbs', phrasalVerbsRouter);
  app.use('/api/songs', songsRouter);
  app.use('/api/grammar', grammarRouter);
  app.use('/api/stats', statsRouter);
  app.use('/api/oxford-words', oxfordWordsRouter);
  app.use('/api/sentence-exercises', sentenceExercisesRouter);
  app.use('/api/translate', translateRouter);
  app.use('/api/mobile', mobileRouter);
  app.use('/api/reading-lab', readingLabRouter);
  // Spec 06 — collocations descontinuado. Mantém-se as tabelas no Prisma,
  // mas qualquer chamada a /api/collocations responde 410 Gone.
  app.all(/^\/api\/collocations(\/.*)?$/, (_req, res) => {
    res.status(410).json({
      error: 'gone',
      message: 'O módulo de collocations foi descontinuado.',
    });
  });
  app.use('/api/v1/transcript', transcriptRouter);
  app.use('/api/library', authMiddleware, libraryRouter);
  app.use('/api/missions', authMiddleware, missionsRouter);
  app.use('/api/vocabulary-srs', authMiddleware, vocabularySrsRouter);
  app.use('/api/user', authMiddleware, userRouter);
  app.use('/api/quiz', authMiddleware, quizRouter);
  app.use('/api/flashcards', authMiddleware, flashcardsRouter);
  app.use('/api/admin', authMiddleware, requireAdmin, adminRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
