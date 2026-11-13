-- CreateTable
CREATE TABLE "UserStudySettings" (
    "userId" TEXT NOT NULL,
    "config" JSONB NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserStudySettings_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "UserStudyCard" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "contentId" INTEGER NOT NULL,
    "segmentKey" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'new',
    "queue" TEXT NOT NULL DEFAULT 'new',
    "position" INTEGER NOT NULL DEFAULT 0,
    "dueAt" TIMESTAMP(3),
    "dueDay" INTEGER,
    "interval" INTEGER NOT NULL DEFAULT 0,
    "ease" DOUBLE PRECISION NOT NULL DEFAULT 2.5,
    "reps" INTEGER NOT NULL DEFAULT 0,
    "lapses" INTEGER NOT NULL DEFAULT 0,
    "remainingSteps" INTEGER NOT NULL DEFAULT 0,
    "leech" BOOLEAN NOT NULL DEFAULT false,
    "fsrs" JSONB,
    "manual" BOOLEAN NOT NULL DEFAULT false,
    "introducedDay" INTEGER,
    "lastReviewDay" INTEGER,
    "lastReviewAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserStudyCard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserStudyReview" (
    "id" SERIAL NOT NULL,
    "cardId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "contentId" INTEGER NOT NULL,
    "answer" INTEGER NOT NULL,
    "kind" INTEGER NOT NULL,
    "interval" INTEGER NOT NULL,
    "lastInterval" INTEGER NOT NULL,
    "ease" DOUBLE PRECISION NOT NULL,
    "timeMs" INTEGER NOT NULL,
    "day" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserStudyReview_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "UserStudyCard_userId_contentId_queue_idx" ON "UserStudyCard"("userId", "contentId", "queue");

-- CreateIndex
CREATE UNIQUE INDEX "UserStudyCard_userId_segmentKey_key" ON "UserStudyCard"("userId", "segmentKey");

-- CreateIndex
CREATE INDEX "UserStudyReview_userId_contentId_day_idx" ON "UserStudyReview"("userId", "contentId", "day");

-- CreateIndex
CREATE INDEX "UserStudyReview_cardId_idx" ON "UserStudyReview"("cardId");

-- AddForeignKey
ALTER TABLE "UserStudySettings" ADD CONSTRAINT "UserStudySettings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserStudyCard" ADD CONSTRAINT "UserStudyCard_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserStudyCard" ADD CONSTRAINT "UserStudyCard_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "ReadingContent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserStudyReview" ADD CONSTRAINT "UserStudyReview_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "UserStudyCard"("id") ON DELETE CASCADE ON UPDATE CASCADE;

