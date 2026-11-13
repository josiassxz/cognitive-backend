-- Sincroniza o histórico de migrações com o schema que vinha sendo aplicado via `prisma db push`.
-- Em bancos já existentes (criados por db push) NÃO execute: marque como aplicada com
--   npx prisma migrate resolve --applied 20261112190000_sync_schema_baseline
-- Os DROP abaixo só rodam em bancos novos, onde as tabelas de collocations estão vazias.

-- DropForeignKey
ALTER TABLE "CollocationExercise" DROP CONSTRAINT "CollocationExercise_collocationId_fkey";

-- DropForeignKey
ALTER TABLE "UserCollocationProgress" DROP CONSTRAINT "UserCollocationProgress_userId_fkey";

-- AlterTable
ALTER TABLE "Song" ADD COLUMN     "category" TEXT NOT NULL DEFAULT 'music';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "dailyGoalMinutes" INTEGER NOT NULL DEFAULT 30;

-- AlterTable
ALTER TABLE "UserReadingProgress" ADD COLUMN     "chapterIndex" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "paragraphIndex" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "totalChapters" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "UserStreak" ADD COLUMN     "freezesAvailable" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "lastFreezeGrantAt" TIMESTAMP(3),
ADD COLUMN     "lastFreezeUsedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "UserTimerSession" ADD COLUMN     "module" TEXT NOT NULL DEFAULT 'livre';

-- DropTable
DROP TABLE "Collocation";

-- DropTable
DROP TABLE "CollocationExercise";

-- DropTable
DROP TABLE "UserCollocationProgress";

-- CreateTable
CREATE TABLE "DailyMission" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "missionKey" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "xpReward" INTEGER NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DailyMission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserWordKnowledge" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "word" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'unknown',
    "lemma" TEXT,
    "definition" TEXT,
    "contextSentence" TEXT,
    "bookId" TEXT,
    "chapterIndex" INTEGER,
    "paragraphIndex" INTEGER,
    "addedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nextReviewAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "easeFactor" DOUBLE PRECISION NOT NULL DEFAULT 2.5,
    "interval" INTEGER NOT NULL DEFAULT 0,
    "repetitions" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserWordKnowledge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transcript" (
    "id" TEXT NOT NULL,
    "videoId" TEXT NOT NULL,
    "transcript" JSONB NOT NULL,
    "userId" TEXT,
    "source" TEXT NOT NULL DEFAULT 'client',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transcript_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserMediaItem" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "youtubeId" TEXT,
    "thumbnailUrl" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "durationMs" INTEGER NOT NULL DEFAULT 0,
    "isFavorite" BOOLEAN NOT NULL DEFAULT false,
    "addedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserMediaItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPlaylist" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "coverUrl" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserPlaylist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPlaylistItem" (
    "id" TEXT NOT NULL,
    "playlistId" TEXT NOT NULL,
    "mediaItemId" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "addedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserPlaylistItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "DailyMission_userId_date_idx" ON "DailyMission"("userId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "DailyMission_userId_date_missionKey_key" ON "DailyMission"("userId", "date", "missionKey");

-- CreateIndex
CREATE INDEX "UserWordKnowledge_userId_idx" ON "UserWordKnowledge"("userId");

-- CreateIndex
CREATE INDEX "UserWordKnowledge_userId_status_idx" ON "UserWordKnowledge"("userId", "status");

-- CreateIndex
CREATE INDEX "UserWordKnowledge_userId_nextReviewAt_idx" ON "UserWordKnowledge"("userId", "nextReviewAt");

-- CreateIndex
CREATE UNIQUE INDEX "UserWordKnowledge_userId_word_key" ON "UserWordKnowledge"("userId", "word");

-- CreateIndex
CREATE UNIQUE INDEX "Transcript_videoId_key" ON "Transcript"("videoId");

-- CreateIndex
CREATE INDEX "Transcript_videoId_idx" ON "Transcript"("videoId");

-- CreateIndex
CREATE INDEX "Transcript_userId_idx" ON "Transcript"("userId");

-- CreateIndex
CREATE INDEX "UserMediaItem_userId_idx" ON "UserMediaItem"("userId");

-- CreateIndex
CREATE INDEX "UserMediaItem_userId_type_idx" ON "UserMediaItem"("userId", "type");

-- CreateIndex
CREATE INDEX "UserMediaItem_userId_isFavorite_idx" ON "UserMediaItem"("userId", "isFavorite");

-- CreateIndex
CREATE INDEX "UserPlaylist_userId_idx" ON "UserPlaylist"("userId");

-- CreateIndex
CREATE INDEX "UserPlaylistItem_playlistId_idx" ON "UserPlaylistItem"("playlistId");

-- CreateIndex
CREATE UNIQUE INDEX "UserPlaylistItem_playlistId_mediaItemId_key" ON "UserPlaylistItem"("playlistId", "mediaItemId");

-- CreateIndex
CREATE INDEX "Song_category_idx" ON "Song"("category");

-- AddForeignKey
ALTER TABLE "DailyMission" ADD CONSTRAINT "DailyMission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserWordKnowledge" ADD CONSTRAINT "UserWordKnowledge_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transcript" ADD CONSTRAINT "Transcript_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserMediaItem" ADD CONSTRAINT "UserMediaItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPlaylist" ADD CONSTRAINT "UserPlaylist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPlaylistItem" ADD CONSTRAINT "UserPlaylistItem_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "UserPlaylist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPlaylistItem" ADD CONSTRAINT "UserPlaylistItem_mediaItemId_fkey" FOREIGN KEY ("mediaItemId") REFERENCES "UserMediaItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

