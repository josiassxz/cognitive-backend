import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const schema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().default(3333),
  JWT_SECRET: z.string().min(1, 'JWT_SECRET obrigatorio'),
  JWT_REFRESH_SECRET: z.string().default('dev_refresh_secret_change_me'),
  DATABASE_URL: z.string().min(1, 'DATABASE_URL obrigatorio'),
  ACCESS_TOKEN_TTL: z.string().default('15m'),
  REFRESH_TOKEN_TTL: z.string().default('30d'),
  CORS_ORIGINS: z.string().default('http://localhost:3000,http://localhost:8081,http://localhost:19006'),
  ADMIN_EMAILS: z.string().default(''),
  RATE_LIMIT_WINDOW_MS: z.coerce.number().default(60000),
  RATE_LIMIT_MAX: z.coerce.number().default(120),
  AUTH_RATE_LIMIT_MAX: z.coerce.number().default(20),
});

const parsedEnv = schema.parse(process.env);

if (parsedEnv.NODE_ENV === 'production' && parsedEnv.JWT_REFRESH_SECRET === 'dev_refresh_secret_change_me') {
  throw new Error('JWT_REFRESH_SECRET invalido para producao');
}

export const env = parsedEnv;
