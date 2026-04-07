import { Router } from 'express';
import { prisma } from '../lib/prisma';
import { asyncHandler } from '../utils/async-handler';
import { HttpError } from '../utils/http-error';

export const missionsRouter = Router();

const MISSION_POOL = [
  { key: 'complete_song', title: 'Analise 1 música', description: 'Ouça e interaja com uma música no player', xpReward: 20 },
  { key: 'review_flashcards_10', title: 'Revise 10 flashcards', description: 'Complete uma sessão de revisão com pelo menos 10 cards', xpReward: 15 },
  { key: 'complete_quiz', title: 'Complete 1 quiz', description: 'Finalize um quiz de vocabulário ou phrasal verbs', xpReward: 20 },
  { key: 'read_5min', title: 'Leia por 5 minutos', description: 'Passe 5 minutos no módulo de leitura', xpReward: 15 },
  { key: 'save_3_words', title: 'Salve 3 palavras', description: 'Salve 3 palavras ou frases durante a leitura ou músicas', xpReward: 10 },
  { key: 'perfect_quiz', title: 'Quiz perfeito', description: 'Acerte todas as perguntas de um quiz', xpReward: 30 },
];

function getTodayDate(): string {
  return new Date().toISOString().split('T')[0];
}

function selectMissionsForDay(userId: string, date: string): typeof MISSION_POOL {
  // Deterministic seed based on userId + date
  let seed = 0;
  for (let i = 0; i < userId.length; i++) seed = (seed * 31 + userId.charCodeAt(i)) >>> 0;
  for (let i = 0; i < date.length; i++) seed = (seed * 31 + date.charCodeAt(i)) >>> 0;

  const shuffled = [...MISSION_POOL];
  for (let i = shuffled.length - 1; i > 0; i--) {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    const j = seed % (i + 1);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, 3);
}

missionsRouter.get(
  '/daily',
  asyncHandler(async (req, res) => {
    const userId = req.userId;
    if (!userId) throw new HttpError(401, 'Nao autorizado');

    const today = getTodayDate();

    let missions = await prisma.dailyMission.findMany({
      where: { userId, date: today },
      orderBy: { id: 'asc' },
    });

    if (missions.length === 0) {
      const selected = selectMissionsForDay(userId, today);
      missions = await Promise.all(
        selected.map((m) =>
          prisma.dailyMission.create({
            data: {
              userId,
              date: today,
              missionKey: m.key,
              title: m.title,
              description: m.description,
              xpReward: m.xpReward,
            },
          })
        )
      );
    }

    const completedCount = missions.filter((m) => m.completed).length;

    res.json({ missions, date: today, completedCount, totalCount: missions.length });
  }),
);

missionsRouter.post(
  '/daily/:missionKey/complete',
  asyncHandler(async (req, res) => {
    const userId = req.userId;
    if (!userId) throw new HttpError(401, 'Nao autorizado');

    const missionKey = String(req.params.missionKey);
    const today = getTodayDate();

    const mission = await prisma.dailyMission.findFirst({
      where: { userId, date: today, missionKey },
    });

    if (!mission) throw new HttpError(404, 'Missão não encontrada');
    if (mission.completed) {
      return res.json({ success: true, alreadyCompleted: true, xpEarned: 0 });
    }

    await prisma.dailyMission.update({
      where: { id: mission.id },
      data: { completed: true, completedAt: new Date() },
    });

    await prisma.xpLog.create({
      data: { userId, amount: mission.xpReward, source: 'daily_mission', detail: `Mission: ${mission.title}` },
    });

    res.json({ success: true, alreadyCompleted: false, xpEarned: mission.xpReward });
  }),
);
