-- Biblioteca: livros favoritados pelo aluno (só aditiva).
CREATE TABLE "UserFavoriteBook" (
    "userId" TEXT NOT NULL,
    "contentId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "UserFavoriteBook_pkey" PRIMARY KEY ("userId", "contentId")
);
CREATE INDEX "UserFavoriteBook_userId_idx" ON "UserFavoriteBook"("userId");
ALTER TABLE "UserFavoriteBook" ADD CONSTRAINT "UserFavoriteBook_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "UserFavoriteBook" ADD CONSTRAINT "UserFavoriteBook_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "ReadingContent"("id") ON DELETE CASCADE ON UPDATE CASCADE;
