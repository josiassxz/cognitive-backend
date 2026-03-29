-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'user',
    "currentMonth" INTEGER NOT NULL DEFAULT 1,
    "level" TEXT NOT NULL DEFAULT 'iniciante',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RefreshToken" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "revokedAt" TIMESTAMP(3),
    "replacedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RefreshToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "XpLog" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "source" TEXT NOT NULL,
    "detail" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "XpLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Badge" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "color" TEXT NOT NULL DEFAULT '#a078c0',
    "xpReward" INTEGER NOT NULL DEFAULT 0,
    "condition" TEXT NOT NULL,

    CONSTRAINT "Badge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserBadge" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "badgeId" INTEGER NOT NULL,
    "earnedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserBadge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserStreak" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "current" INTEGER NOT NULL DEFAULT 0,
    "longest" INTEGER NOT NULL DEFAULT 0,
    "lastActiveAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserStreak_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserChecklist" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "tasks" TEXT NOT NULL,

    CONSTRAINT "UserChecklist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserTimerSession" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "completedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "xpEarned" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "UserTimerSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserMonthProgress" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "month" INTEGER NOT NULL,
    "progress" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "UserMonthProgress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuizAttempt" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "quizType" TEXT NOT NULL,
    "totalQ" INTEGER NOT NULL,
    "correct" INTEGER NOT NULL,
    "xpEarned" INTEGER NOT NULL DEFAULT 0,
    "month" INTEGER NOT NULL,
    "completedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "QuizAttempt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FlashcardProgress" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "vocabularyId" INTEGER NOT NULL,
    "ease" DOUBLE PRECISION NOT NULL DEFAULT 2.5,
    "interval" INTEGER NOT NULL DEFAULT 1,
    "repetitions" INTEGER NOT NULL DEFAULT 0,
    "nextReviewAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastReviewedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FlashcardProgress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vocabulary" (
    "id" SERIAL NOT NULL,
    "word" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "definition" TEXT NOT NULL,
    "example" TEXT NOT NULL DEFAULT '',
    "month" INTEGER NOT NULL,
    "level" TEXT NOT NULL DEFAULT 'basico',
    "category" TEXT NOT NULL DEFAULT 'geral',

    CONSTRAINT "Vocabulary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PhrasalVerb" (
    "id" SERIAL NOT NULL,
    "phrasal" TEXT NOT NULL,
    "meaning" TEXT NOT NULL,
    "example" TEXT NOT NULL,
    "month" INTEGER NOT NULL,

    CONSTRAINT "PhrasalVerb_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Song" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "artist" TEXT NOT NULL,
    "youtubeId" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "themes" TEXT[],
    "learningNotes" TEXT NOT NULL DEFAULT '',
    "month" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "Song_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KeyPhrase" (
    "id" SERIAL NOT NULL,
    "en" TEXT NOT NULL,
    "pt" TEXT NOT NULL,
    "songId" INTEGER NOT NULL,

    CONSTRAINT "KeyPhrase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SongVocab" (
    "id" SERIAL NOT NULL,
    "word" TEXT NOT NULL,
    "meaning" TEXT NOT NULL,
    "songId" INTEGER NOT NULL,

    CONSTRAINT "SongVocab_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Video" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "youtubeId" TEXT NOT NULL,
    "channel" TEXT NOT NULL,
    "duration" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "month" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "level" TEXT NOT NULL,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GrammarTip" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "explanation" TEXT NOT NULL,
    "examples" TEXT[],
    "month" INTEGER NOT NULL,
    "category" TEXT NOT NULL DEFAULT 'geral',

    CONSTRAINT "GrammarTip_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Podcast" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "month" INTEGER NOT NULL,
    "category" TEXT NOT NULL DEFAULT 'geral',

    CONSTRAINT "Podcast_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Expression" (
    "id" SERIAL NOT NULL,
    "expression" TEXT NOT NULL,
    "meaning" TEXT NOT NULL,
    "example" TEXT NOT NULL,
    "month" INTEGER NOT NULL,
    "category" TEXT NOT NULL DEFAULT 'idiom',

    CONSTRAINT "Expression_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OxfordWord" (
    "id" SERIAL NOT NULL,
    "word" TEXT NOT NULL,
    "pos" TEXT NOT NULL,
    "cefrLevel" TEXT NOT NULL,
    "isOxford3000" BOOLEAN NOT NULL DEFAULT false,
    "frequencyRank" INTEGER,
    "definitionUrl" TEXT NOT NULL DEFAULT '',
    "audioUrl" TEXT NOT NULL DEFAULT '',
    "exampleSentence" TEXT NOT NULL DEFAULT '',
    "month" INTEGER NOT NULL,

    CONSTRAINT "OxfordWord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Collocation" (
    "id" SERIAL NOT NULL,
    "phrase" TEXT NOT NULL,
    "baseWord" TEXT NOT NULL,
    "collocate" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "meaning" TEXT NOT NULL DEFAULT '',
    "example" TEXT NOT NULL DEFAULT '',
    "cefrLevel" TEXT NOT NULL,
    "month" INTEGER NOT NULL,
    "audioUrl" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Collocation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CollocationExercise" (
    "id" SERIAL NOT NULL,
    "collocationId" INTEGER NOT NULL,
    "promptType" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "correctAnswer" TEXT NOT NULL,
    "distractors" TEXT[],
    "cefrLevel" TEXT NOT NULL,
    "month" INTEGER NOT NULL,

    CONSTRAINT "CollocationExercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SentenceExercise" (
    "id" SERIAL NOT NULL,
    "sentence" TEXT NOT NULL,
    "correctAnswer" TEXT NOT NULL,
    "distractors" TEXT[],
    "grammarFocus" TEXT NOT NULL DEFAULT 'geral',
    "cefrLevel" TEXT NOT NULL,
    "month" INTEGER NOT NULL,
    "explanation" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "SentenceExercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserCollocationProgress" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "collocationId" INTEGER NOT NULL,
    "correct" INTEGER NOT NULL DEFAULT 0,
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "mastered" BOOLEAN NOT NULL DEFAULT false,
    "lastAttemptAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserCollocationProgress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserSentenceProgress" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "exerciseId" INTEGER NOT NULL,
    "correct" INTEGER NOT NULL DEFAULT 0,
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "mastered" BOOLEAN NOT NULL DEFAULT false,
    "lastAttemptAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserSentenceProgress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_tokenHash_key" ON "RefreshToken"("tokenHash");

-- CreateIndex
CREATE INDEX "RefreshToken_userId_idx" ON "RefreshToken"("userId");

-- CreateIndex
CREATE INDEX "RefreshToken_expiresAt_idx" ON "RefreshToken"("expiresAt");

-- CreateIndex
CREATE INDEX "XpLog_userId_idx" ON "XpLog"("userId");

-- CreateIndex
CREATE INDEX "XpLog_createdAt_idx" ON "XpLog"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Badge_slug_key" ON "Badge"("slug");

-- CreateIndex
CREATE INDEX "UserBadge_userId_idx" ON "UserBadge"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserBadge_userId_badgeId_key" ON "UserBadge"("userId", "badgeId");

-- CreateIndex
CREATE UNIQUE INDEX "UserStreak_userId_key" ON "UserStreak"("userId");

-- CreateIndex
CREATE INDEX "UserChecklist_userId_idx" ON "UserChecklist"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserChecklist_userId_date_key" ON "UserChecklist"("userId", "date");

-- CreateIndex
CREATE INDEX "UserTimerSession_userId_idx" ON "UserTimerSession"("userId");

-- CreateIndex
CREATE INDEX "UserTimerSession_completedAt_idx" ON "UserTimerSession"("completedAt");

-- CreateIndex
CREATE INDEX "UserMonthProgress_userId_idx" ON "UserMonthProgress"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserMonthProgress_userId_month_key" ON "UserMonthProgress"("userId", "month");

-- CreateIndex
CREATE INDEX "QuizAttempt_userId_idx" ON "QuizAttempt"("userId");

-- CreateIndex
CREATE INDEX "QuizAttempt_completedAt_idx" ON "QuizAttempt"("completedAt");

-- CreateIndex
CREATE INDEX "FlashcardProgress_userId_nextReviewAt_idx" ON "FlashcardProgress"("userId", "nextReviewAt");

-- CreateIndex
CREATE UNIQUE INDEX "FlashcardProgress_userId_vocabularyId_key" ON "FlashcardProgress"("userId", "vocabularyId");

-- CreateIndex
CREATE INDEX "Vocabulary_month_idx" ON "Vocabulary"("month");

-- CreateIndex
CREATE INDEX "Vocabulary_level_idx" ON "Vocabulary"("level");

-- CreateIndex
CREATE INDEX "Vocabulary_category_idx" ON "Vocabulary"("category");

-- CreateIndex
CREATE UNIQUE INDEX "Vocabulary_word_month_key" ON "Vocabulary"("word", "month");

-- CreateIndex
CREATE INDEX "PhrasalVerb_month_idx" ON "PhrasalVerb"("month");

-- CreateIndex
CREATE UNIQUE INDEX "PhrasalVerb_phrasal_month_key" ON "PhrasalVerb"("phrasal", "month");

-- CreateIndex
CREATE UNIQUE INDEX "Song_slug_key" ON "Song"("slug");

-- CreateIndex
CREATE INDEX "Song_month_idx" ON "Song"("month");

-- CreateIndex
CREATE INDEX "Song_level_idx" ON "Song"("level");

-- CreateIndex
CREATE INDEX "KeyPhrase_songId_idx" ON "KeyPhrase"("songId");

-- CreateIndex
CREATE INDEX "SongVocab_songId_idx" ON "SongVocab"("songId");

-- CreateIndex
CREATE UNIQUE INDEX "Video_youtubeId_key" ON "Video"("youtubeId");

-- CreateIndex
CREATE INDEX "Video_month_idx" ON "Video"("month");

-- CreateIndex
CREATE INDEX "Video_category_idx" ON "Video"("category");

-- CreateIndex
CREATE INDEX "Video_level_idx" ON "Video"("level");

-- CreateIndex
CREATE INDEX "GrammarTip_month_idx" ON "GrammarTip"("month");

-- CreateIndex
CREATE UNIQUE INDEX "GrammarTip_title_month_key" ON "GrammarTip"("title", "month");

-- CreateIndex
CREATE INDEX "Podcast_month_idx" ON "Podcast"("month");

-- CreateIndex
CREATE UNIQUE INDEX "Podcast_name_month_key" ON "Podcast"("name", "month");

-- CreateIndex
CREATE INDEX "Expression_month_idx" ON "Expression"("month");

-- CreateIndex
CREATE INDEX "Expression_category_idx" ON "Expression"("category");

-- CreateIndex
CREATE UNIQUE INDEX "Expression_expression_month_key" ON "Expression"("expression", "month");

-- CreateIndex
CREATE INDEX "OxfordWord_cefrLevel_idx" ON "OxfordWord"("cefrLevel");

-- CreateIndex
CREATE INDEX "OxfordWord_month_idx" ON "OxfordWord"("month");

-- CreateIndex
CREATE INDEX "OxfordWord_frequencyRank_idx" ON "OxfordWord"("frequencyRank");

-- CreateIndex
CREATE INDEX "OxfordWord_pos_idx" ON "OxfordWord"("pos");

-- CreateIndex
CREATE UNIQUE INDEX "OxfordWord_word_pos_key" ON "OxfordWord"("word", "pos");

-- CreateIndex
CREATE INDEX "Collocation_cefrLevel_idx" ON "Collocation"("cefrLevel");

-- CreateIndex
CREATE INDEX "Collocation_month_idx" ON "Collocation"("month");

-- CreateIndex
CREATE INDEX "Collocation_baseWord_idx" ON "Collocation"("baseWord");

-- CreateIndex
CREATE INDEX "Collocation_type_idx" ON "Collocation"("type");

-- CreateIndex
CREATE UNIQUE INDEX "Collocation_phrase_type_key" ON "Collocation"("phrase", "type");

-- CreateIndex
CREATE INDEX "CollocationExercise_collocationId_idx" ON "CollocationExercise"("collocationId");

-- CreateIndex
CREATE INDEX "CollocationExercise_cefrLevel_idx" ON "CollocationExercise"("cefrLevel");

-- CreateIndex
CREATE INDEX "CollocationExercise_month_idx" ON "CollocationExercise"("month");

-- CreateIndex
CREATE INDEX "CollocationExercise_promptType_idx" ON "CollocationExercise"("promptType");

-- CreateIndex
CREATE INDEX "SentenceExercise_cefrLevel_idx" ON "SentenceExercise"("cefrLevel");

-- CreateIndex
CREATE INDEX "SentenceExercise_month_idx" ON "SentenceExercise"("month");

-- CreateIndex
CREATE INDEX "SentenceExercise_grammarFocus_idx" ON "SentenceExercise"("grammarFocus");

-- CreateIndex
CREATE INDEX "UserCollocationProgress_userId_idx" ON "UserCollocationProgress"("userId");

-- CreateIndex
CREATE INDEX "UserCollocationProgress_userId_mastered_idx" ON "UserCollocationProgress"("userId", "mastered");

-- CreateIndex
CREATE UNIQUE INDEX "UserCollocationProgress_userId_collocationId_key" ON "UserCollocationProgress"("userId", "collocationId");

-- CreateIndex
CREATE INDEX "UserSentenceProgress_userId_idx" ON "UserSentenceProgress"("userId");

-- CreateIndex
CREATE INDEX "UserSentenceProgress_userId_mastered_idx" ON "UserSentenceProgress"("userId", "mastered");

-- CreateIndex
CREATE UNIQUE INDEX "UserSentenceProgress_userId_exerciseId_key" ON "UserSentenceProgress"("userId", "exerciseId");

-- AddForeignKey
ALTER TABLE "RefreshToken" ADD CONSTRAINT "RefreshToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "XpLog" ADD CONSTRAINT "XpLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBadge" ADD CONSTRAINT "UserBadge_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBadge" ADD CONSTRAINT "UserBadge_badgeId_fkey" FOREIGN KEY ("badgeId") REFERENCES "Badge"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserStreak" ADD CONSTRAINT "UserStreak_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserChecklist" ADD CONSTRAINT "UserChecklist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTimerSession" ADD CONSTRAINT "UserTimerSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserMonthProgress" ADD CONSTRAINT "UserMonthProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizAttempt" ADD CONSTRAINT "QuizAttempt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FlashcardProgress" ADD CONSTRAINT "FlashcardProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KeyPhrase" ADD CONSTRAINT "KeyPhrase_songId_fkey" FOREIGN KEY ("songId") REFERENCES "Song"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SongVocab" ADD CONSTRAINT "SongVocab_songId_fkey" FOREIGN KEY ("songId") REFERENCES "Song"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollocationExercise" ADD CONSTRAINT "CollocationExercise_collocationId_fkey" FOREIGN KEY ("collocationId") REFERENCES "Collocation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCollocationProgress" ADD CONSTRAINT "UserCollocationProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSentenceProgress" ADD CONSTRAINT "UserSentenceProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
