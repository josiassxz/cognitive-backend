-- AlterTable
ALTER TABLE "UserStudyCard" ADD COLUMN     "buriedDay" INTEGER;

-- CreateTable
CREATE TABLE "UserStudyPreset" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "config" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserStudyPreset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserStudyDeck" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "contentId" INTEGER NOT NULL,
    "presetId" INTEGER,
    "newLimit" INTEGER,
    "reviewLimit" INTEGER,
    "newLimitToday" JSONB,
    "reviewLimitToday" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserStudyDeck_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserStudyPreset_userId_name_key" ON "UserStudyPreset"("userId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "UserStudyDeck_userId_contentId_key" ON "UserStudyDeck"("userId", "contentId");

-- AddForeignKey
ALTER TABLE "UserStudyPreset" ADD CONSTRAINT "UserStudyPreset_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserStudyDeck" ADD CONSTRAINT "UserStudyDeck_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserStudyDeck" ADD CONSTRAINT "UserStudyDeck_presetId_fkey" FOREIGN KEY ("presetId") REFERENCES "UserStudyPreset"("id") ON DELETE SET NULL ON UPDATE CASCADE;

