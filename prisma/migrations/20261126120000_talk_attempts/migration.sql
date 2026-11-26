-- Módulo Talk: tentativas das histórias (escuta + pronúncia).
CREATE TABLE "TalkAttempt" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "storySlug" TEXT NOT NULL,
    "listening" DOUBLE PRECISION NOT NULL,
    "pronunciation" DOUBLE PRECISION,
    "score" DOUBLE PRECISION NOT NULL,
    "details" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "TalkAttempt_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "TalkAttempt_userId_storySlug_idx" ON "TalkAttempt"("userId", "storySlug");
