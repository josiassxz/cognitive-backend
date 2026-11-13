-- Conteúdo reconstruído a partir de áudio: identidade por hash, trechos didáticos,
-- progresso por trecho, histórico de revisões e registro de importações.
-- Migração apenas aditiva (a única remoção é a unicidade de textHash, que vira índice comum).

-- DropIndex
DROP INDEX IF EXISTS "ReadingContent_textHash_key";

-- AlterTable
ALTER TABLE "ReadingContent" ADD COLUMN     "audioMeta" JSONB,
ADD COLUMN     "audioSha256" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "audioStorageKey" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "contentKey" TEXT,
ADD COLUMN     "coverStorageKey" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "editVersion" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "language" TEXT NOT NULL DEFAULT 'en',
ADD COLUMN     "packageHash" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "pipelineRevision" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "publishStatus" TEXT NOT NULL DEFAULT 'published',
ADD COLUMN     "qualityReport" JSONB,
ADD COLUMN     "qualityStatus" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "translationStatus" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "ReadingSentence" ADD COLUMN     "highlights" JSONB,
ADD COLUMN     "note" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "playEndMs" INTEGER,
ADD COLUMN     "playStartMs" INTEGER,
ADD COLUMN     "quality" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "reviewReasons" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "segmentKey" TEXT;

-- AlterTable
ALTER TABLE "ReadingWordTimestamp" ADD COLUMN     "score" DOUBLE PRECISION,
ADD COLUMN     "timeSource" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "wordKey" TEXT NOT NULL DEFAULT '';

-- CreateTable
CREATE TABLE "UserSegmentProgress" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "contentId" INTEGER NOT NULL,
    "segmentKey" TEXT NOT NULL,
    "completedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "orphanedAt" TIMESTAMP(3),

    CONSTRAINT "UserSegmentProgress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReadingRevision" (
    "id" SERIAL NOT NULL,
    "contentId" INTEGER NOT NULL,
    "userId" TEXT,
    "kind" TEXT NOT NULL,
    "note" TEXT NOT NULL DEFAULT '',
    "editVersion" INTEGER NOT NULL,
    "snapshot" JSONB NOT NULL,
    "undoneAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ReadingRevision_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContentImport" (
    "id" SERIAL NOT NULL,
    "contentKey" TEXT NOT NULL,
    "revision" TEXT NOT NULL,
    "packageHash" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "report" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ContentImport_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "UserSegmentProgress_userId_contentId_idx" ON "UserSegmentProgress"("userId", "contentId");

-- CreateIndex
CREATE INDEX "UserSegmentProgress_contentId_segmentKey_idx" ON "UserSegmentProgress"("contentId", "segmentKey");

-- CreateIndex
CREATE UNIQUE INDEX "UserSegmentProgress_userId_segmentKey_key" ON "UserSegmentProgress"("userId", "segmentKey");

-- CreateIndex
CREATE INDEX "ReadingRevision_contentId_createdAt_idx" ON "ReadingRevision"("contentId", "createdAt");

-- CreateIndex
CREATE INDEX "ContentImport_contentKey_createdAt_idx" ON "ContentImport"("contentKey", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "ReadingContent_contentKey_key" ON "ReadingContent"("contentKey");

-- CreateIndex
CREATE INDEX "ReadingContent_textHash_idx" ON "ReadingContent"("textHash");

-- CreateIndex
CREATE INDEX "ReadingContent_publishStatus_idx" ON "ReadingContent"("publishStatus");

-- CreateIndex
CREATE UNIQUE INDEX "ReadingSentence_segmentKey_key" ON "ReadingSentence"("segmentKey");

-- AddForeignKey
ALTER TABLE "UserSegmentProgress" ADD CONSTRAINT "UserSegmentProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSegmentProgress" ADD CONSTRAINT "UserSegmentProgress_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "ReadingContent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReadingRevision" ADD CONSTRAINT "ReadingRevision_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "ReadingContent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

