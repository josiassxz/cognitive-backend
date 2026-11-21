-- Baralhos criados pelo usuário: cada cartão pode ter o próprio áudio.
ALTER TABLE "ReadingSentence" ADD COLUMN "audioKey" TEXT NOT NULL DEFAULT '';
