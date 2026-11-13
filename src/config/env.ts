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
  DEEPL_API_KEY: z.string().default(''),
  GEMINI_API_KEY: z.string().default(''),
  GROQ_MODEL: z.string().default('allam-2-7b'),
  AWS_ACCESS_KEY_ID: z.string().default(''),
  AWS_SECRET_ACCESS_KEY: z.string().default(''),
  AWS_REGION: z.string().default('us-east-1'),
  AWS_S3_BUCKET: z.string().default('cognitive-nebula-audio'),
  OPENAI_API_KEY: z.string().default(''),
  AZURE_SPEECH_KEY: z.string().default(''),
  AZURE_SPEECH_REGION: z.string().default('eastus'),
  READING_TTS_POLLY_FALLBACK_ENABLED: z.coerce.boolean().default(false),
  CORS_ORIGINS: z.string().default('http://localhost:3000,http://localhost:8081,http://localhost:19006'),
  ADMIN_EMAILS: z.string().default(''),
  // --- storage / mídia ---
  // filesystem: arquivos em MEDIA_ROOT servidos por /media (dev e servidor próprio)
  // s3: bucket compatível com S3 e URLs assinadas (opcional)
  STORAGE_DRIVER: z.enum(['filesystem', 's3']).optional(),
  MEDIA_ROOT: z.string().default('./data/media'),
  // Origem pública da API (ex.: https://app.exemplo.com). Vazio = URLs relativas (/media/...).
  PUBLIC_BASE_URL: z.string().default(''),
  // Segredo das URLs temporárias de mídia. Vazio = derivado de JWT_SECRET.
  MEDIA_URL_SECRET: z.string().default(''),
  MEDIA_URL_TTL_SECONDS: z.coerce.number().int().min(60).default(6 * 60 * 60),
  // Token de máquina do worker para POST /api/admin/content-import (mín. 32 caracteres).
  IMPORT_API_TOKEN: z.string().default(''),
  // Cookies de sessão web. COOKIE_SECURE vazio = true em produção.
  COOKIE_SECURE: z.enum(['true', 'false']).optional(),
  COOKIE_DOMAIN: z.string().default(''),
  RATE_LIMIT_WINDOW_MS: z.coerce.number().default(60000),
  RATE_LIMIT_MAX: z.coerce.number().default(120),
  AUTH_RATE_LIMIT_MAX: z.coerce.number().default(20),
});

const parsedEnv = schema.parse(process.env);

if (parsedEnv.NODE_ENV === 'production' && parsedEnv.JWT_REFRESH_SECRET === 'dev_refresh_secret_change_me') {
  throw new Error('JWT_REFRESH_SECRET invalido para producao');
}

if (parsedEnv.IMPORT_API_TOKEN && parsedEnv.IMPORT_API_TOKEN.length < 32) {
  throw new Error('IMPORT_API_TOKEN deve ter pelo menos 32 caracteres');
}

const hasAwsCredentials = Boolean(parsedEnv.AWS_ACCESS_KEY_ID && parsedEnv.AWS_SECRET_ACCESS_KEY);

export const env = {
  ...parsedEnv,
  // Sem escolha explícita: S3 só quando há credenciais AWS; senão, filesystem.
  STORAGE_DRIVER: parsedEnv.STORAGE_DRIVER ?? (hasAwsCredentials ? ('s3' as const) : ('filesystem' as const)),
  COOKIE_SECURE: parsedEnv.COOKIE_SECURE ? parsedEnv.COOKIE_SECURE === 'true' : parsedEnv.NODE_ENV === 'production',
};
