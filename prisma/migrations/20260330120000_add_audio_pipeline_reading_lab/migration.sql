-- AlterTable
ALTER TABLE "Song"
ADD COLUMN "audioUrl" TEXT NOT NULL DEFAULT '',
ADD COLUMN "audioDurationMs" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN "lyricsOffsetMs" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "SongWordTimestamp" (
    "id" SERIAL NOT NULL,
    "songId" INTEGER NOT NULL,
    "lineIndex" INTEGER NOT NULL,
    "wordIndex" INTEGER NOT NULL,
    "word" TEXT NOT NULL,
    "startMs" INTEGER NOT NULL,
    "endMs" INTEGER NOT NULL,
    CONSTRAINT "SongWordTimestamp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReadingContent" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "textHash" TEXT NOT NULL,
    "fullText" TEXT NOT NULL,
    "cefrLevel" TEXT NOT NULL,
    "wordCount" INTEGER NOT NULL DEFAULT 0,
    "estimatedTimeMs" INTEGER NOT NULL DEFAULT 0,
    "audioUrl" TEXT NOT NULL DEFAULT '',
    "audioDurationMs" INTEGER NOT NULL DEFAULT 0,
    "ttsProvider" TEXT NOT NULL DEFAULT 'azure',
    "ttsVoice" TEXT NOT NULL DEFAULT 'en-US-JennyNeural',
    "sourceType" TEXT NOT NULL DEFAULT 'curated',
    "userId" TEXT,
    "month" INTEGER NOT NULL DEFAULT 1,
    "category" TEXT NOT NULL DEFAULT 'general',
    "isPublic" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ReadingContent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReadingSentence" (
    "id" SERIAL NOT NULL,
    "contentId" INTEGER NOT NULL,
    "sentenceIndex" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "translation" TEXT NOT NULL DEFAULT '',
    "startMs" INTEGER NOT NULL,
    "endMs" INTEGER NOT NULL,
    CONSTRAINT "ReadingSentence_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReadingWordTimestamp" (
    "id" SERIAL NOT NULL,
    "sentenceId" INTEGER NOT NULL,
    "wordIndex" INTEGER NOT NULL,
    "word" TEXT NOT NULL,
    "startMs" INTEGER NOT NULL,
    "endMs" INTEGER NOT NULL,
    CONSTRAINT "ReadingWordTimestamp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserReadingProgress" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "contentId" INTEGER NOT NULL,
    "lastSentence" INTEGER NOT NULL DEFAULT 0,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "completedAt" TIMESTAMP(3),
    "timeSpentMs" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "UserReadingProgress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SongWordTimestamp_songId_idx" ON "SongWordTimestamp"("songId");

-- CreateIndex
CREATE INDEX "SongWordTimestamp_songId_lineIndex_idx" ON "SongWordTimestamp"("songId", "lineIndex");

-- CreateIndex
CREATE UNIQUE INDEX "SongWordTimestamp_songId_lineIndex_wordIndex_key" ON "SongWordTimestamp"("songId", "lineIndex", "wordIndex");

-- CreateIndex
CREATE UNIQUE INDEX "ReadingContent_slug_key" ON "ReadingContent"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "ReadingContent_textHash_key" ON "ReadingContent"("textHash");

-- CreateIndex
CREATE INDEX "ReadingContent_cefrLevel_idx" ON "ReadingContent"("cefrLevel");

-- CreateIndex
CREATE INDEX "ReadingContent_month_idx" ON "ReadingContent"("month");

-- CreateIndex
CREATE INDEX "ReadingContent_userId_idx" ON "ReadingContent"("userId");

-- CreateIndex
CREATE INDEX "ReadingContent_sourceType_idx" ON "ReadingContent"("sourceType");

-- CreateIndex
CREATE INDEX "ReadingContent_category_idx" ON "ReadingContent"("category");

-- CreateIndex
CREATE UNIQUE INDEX "ReadingSentence_contentId_sentenceIndex_key" ON "ReadingSentence"("contentId", "sentenceIndex");

-- CreateIndex
CREATE INDEX "ReadingSentence_contentId_idx" ON "ReadingSentence"("contentId");

-- CreateIndex
CREATE INDEX "ReadingWordTimestamp_sentenceId_idx" ON "ReadingWordTimestamp"("sentenceId");

-- CreateIndex
CREATE UNIQUE INDEX "ReadingWordTimestamp_sentenceId_wordIndex_key" ON "ReadingWordTimestamp"("sentenceId", "wordIndex");

-- CreateIndex
CREATE UNIQUE INDEX "UserReadingProgress_userId_contentId_key" ON "UserReadingProgress"("userId", "contentId");

-- CreateIndex
CREATE INDEX "UserReadingProgress_userId_idx" ON "UserReadingProgress"("userId");

-- CreateIndex
CREATE INDEX "UserReadingProgress_userId_completed_idx" ON "UserReadingProgress"("userId", "completed");

-- AddForeignKey
ALTER TABLE "SongWordTimestamp" ADD CONSTRAINT "SongWordTimestamp_songId_fkey" FOREIGN KEY ("songId") REFERENCES "Song"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReadingContent" ADD CONSTRAINT "ReadingContent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReadingSentence" ADD CONSTRAINT "ReadingSentence_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "ReadingContent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReadingWordTimestamp" ADD CONSTRAINT "ReadingWordTimestamp_sentenceId_fkey" FOREIGN KEY ("sentenceId") REFERENCES "ReadingSentence"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserReadingProgress" ADD CONSTRAINT "UserReadingProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
