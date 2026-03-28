import { XP_CONFIG } from '../lib/xp';

export function calculateFlashcardReview(params: {
  quality: number;
  ease?: number;
  interval?: number;
  repetitions?: number;
}) {
  let ease = params.ease ?? 2.5;
  let interval = params.interval ?? 1;
  let repetitions = params.repetitions ?? 0;

  if (params.quality < 1) {
    repetitions = 0;
    interval = 1;
  } else {
    repetitions += 1;
    if (repetitions === 1) interval = 1;
    else if (repetitions === 2) interval = 3;
    else interval = Math.round(interval * ease);

    ease = ease + (0.1 - (3 - params.quality) * (0.08 + (3 - params.quality) * 0.02));
    if (ease < 1.3) ease = 1.3;
  }

  const xpEarned =
    params.quality === 0
      ? XP_CONFIG.flashcard_review
      : params.quality >= 2
        ? XP_CONFIG.flashcard_easy
        : XP_CONFIG.flashcard_hard;

  return {
    ease,
    interval,
    repetitions,
    xpEarned,
  };
}
