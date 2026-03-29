export const XP_CONFIG = {
  quiz_correct: 10,
  quiz_complete: 5,
  quiz_perfect_bonus: 25,
  flashcard_review: 3,
  flashcard_easy: 1,
  flashcard_hard: 5,
  timer_session: 15,
  checklist_complete: 20,
  streak_bonus_multiplier: 2,
  daily_login: 5,
  // Collocation exercises
  collocation_correct: 8,
  collocation_complete: 5,
  collocation_perfect_bonus: 20,
  // Sentence completion exercises
  sentence_correct: 8,
  sentence_complete: 5,
  sentence_perfect_bonus: 20,
};

export const LEVELS = [
  { level: 1, name: 'Iniciante', minXp: 0, color: '#94a3b8' },
  { level: 2, name: 'Aprendiz', minXp: 100, color: '#a078c0' },
  { level: 3, name: 'Estudante', minXp: 300, color: '#7c9fdb' },
  { level: 4, name: 'Praticante', minXp: 600, color: '#6bc5a0' },
  { level: 5, name: 'Dedicado', minXp: 1000, color: '#e0a458' },
  { level: 6, name: 'Avançado', minXp: 1500, color: '#d47a8f' },
  { level: 7, name: 'Expert', minXp: 2500, color: '#8b7ec8' },
  { level: 8, name: 'Mestre', minXp: 4000, color: '#e0a458' },
  { level: 9, name: 'Guru', minXp: 6000, color: '#a078c0' },
  { level: 10, name: 'Lenda', minXp: 10000, color: '#ffd700' },
];

export function getLevelForXp(totalXp: number) {
  let current = LEVELS[0];
  for (const level of LEVELS) {
    if (totalXp >= level.minXp) current = level;
    else break;
  }
  const nextLevel = LEVELS.find((level) => level.minXp > totalXp);
  const xpForNext = nextLevel ? nextLevel.minXp - totalXp : 0;
  const progressToNext = nextLevel
    ? ((totalXp - current.minXp) / (nextLevel.minXp - current.minXp)) * 100
    : 100;

  return {
    ...current,
    totalXp,
    xpForNext,
    progressToNext: Math.min(100, progressToNext),
    nextLevel,
  };
}
