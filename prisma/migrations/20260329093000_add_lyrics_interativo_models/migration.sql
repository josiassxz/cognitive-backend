-- CreateTable
CREATE TABLE "SongLyricLine" (
    "id" SERIAL NOT NULL,
    "songId" INTEGER NOT NULL,
    "lineIndex" INTEGER NOT NULL,
    "startMs" INTEGER NOT NULL,
    "endMs" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "translation" TEXT NOT NULL DEFAULT '',
    CONSTRAINT "SongLyricLine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TranslationCache" (
    "id" SERIAL NOT NULL,
    "phrase" TEXT NOT NULL,
    "contextHash" TEXT NOT NULL,
    "context" TEXT NOT NULL,
    "translation" TEXT NOT NULL,
    "explanation" TEXT NOT NULL DEFAULT '',
    "partOfSpeech" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "hitCount" INTEGER NOT NULL DEFAULT 1,
    CONSTRAINT "TranslationCache_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserSavedPhrase" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "songId" INTEGER,
    "phrase" TEXT NOT NULL,
    "translation" TEXT NOT NULL,
    "context" TEXT NOT NULL,
    "sourceType" TEXT NOT NULL DEFAULT 'lyric_click',
    "status" TEXT NOT NULL DEFAULT 'saved',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "UserSavedPhrase_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SongLyricLine_songId_lineIndex_key" ON "SongLyricLine"("songId", "lineIndex");

-- CreateIndex
CREATE INDEX "SongLyricLine_songId_idx" ON "SongLyricLine"("songId");

-- CreateIndex
CREATE INDEX "SongLyricLine_songId_startMs_idx" ON "SongLyricLine"("songId", "startMs");

-- CreateIndex
CREATE UNIQUE INDEX "TranslationCache_phrase_contextHash_key" ON "TranslationCache"("phrase", "contextHash");

-- CreateIndex
CREATE INDEX "TranslationCache_phrase_idx" ON "TranslationCache"("phrase");

-- CreateIndex
CREATE INDEX "TranslationCache_contextHash_idx" ON "TranslationCache"("contextHash");

-- CreateIndex
CREATE INDEX "TranslationCache_hitCount_idx" ON "TranslationCache"("hitCount" DESC);

-- CreateIndex
CREATE INDEX "UserSavedPhrase_userId_idx" ON "UserSavedPhrase"("userId");

-- CreateIndex
CREATE INDEX "UserSavedPhrase_userId_status_idx" ON "UserSavedPhrase"("userId", "status");

-- CreateIndex
CREATE INDEX "UserSavedPhrase_userId_songId_idx" ON "UserSavedPhrase"("userId", "songId");

-- AddForeignKey
ALTER TABLE "SongLyricLine" ADD CONSTRAINT "SongLyricLine_songId_fkey" FOREIGN KEY ("songId") REFERENCES "Song"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSavedPhrase" ADD CONSTRAINT "UserSavedPhrase_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSavedPhrase" ADD CONSTRAINT "UserSavedPhrase_songId_fkey" FOREIGN KEY ("songId") REFERENCES "Song"("id") ON DELETE SET NULL ON UPDATE CASCADE;
