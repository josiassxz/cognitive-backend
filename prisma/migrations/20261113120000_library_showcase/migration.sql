-- Vitrine da biblioteca: paleta da capa e metadados de dificuldade (aditivo, sem perda).
ALTER TABLE "ReadingContent" ADD COLUMN IF NOT EXISTS "coverPalette" JSONB;
ALTER TABLE "ReadingContent" ADD COLUMN IF NOT EXISTS "libraryMeta" JSONB;
ALTER TABLE "UserReadingProgress" ADD COLUMN IF NOT EXISTS "positionMs" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "UserReadingProgress" ADD COLUMN IF NOT EXISTS "lastOpenedAt" TIMESTAMP(3);
