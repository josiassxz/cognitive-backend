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

export function createApp() {
  const app = express();
  const allowedOrigins = env.CORS_ORIGINS.split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
  const defaultLimiter = rateLimit({
    windowMs: env.RATE_LIMIT_WINDOW_MS,
    max: env.RATE_LIMIT_MAX,
    standardHeaders: true,
    legacyHeaders: false,
  });
  const authLimiter = rateLimit({
    windowMs: env.RATE_LIMIT_WINDOW_MS,
    max: env.AUTH_RATE_LIMIT_MAX,
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
  app.use('/api/user', authMiddleware, userRouter);
  app.use('/api/quiz', authMiddleware, quizRouter);
  app.use('/api/flashcards', authMiddleware, flashcardsRouter);
  app.use('/api/admin', authMiddleware, requireAdmin, adminRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
