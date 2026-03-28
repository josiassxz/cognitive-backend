import { describe, expect, it } from 'vitest';
import { calculateFlashcardReview } from '../src/services/flashcard-service';

describe('flashcard-service', () => {
  it('reseta repeticoes quando quality for 0', () => {
    const result = calculateFlashcardReview({
      quality: 0,
      ease: 2.5,
      interval: 7,
      repetitions: 3,
    });

    expect(result.interval).toBe(1);
    expect(result.repetitions).toBe(0);
    expect(result.xpEarned).toBe(3);
  });

  it('avanca repeticoes quando quality for boa', () => {
    const result = calculateFlashcardReview({
      quality: 3,
      ease: 2.5,
      interval: 3,
      repetitions: 2,
    });

    expect(result.repetitions).toBe(3);
    expect(result.interval).toBeGreaterThanOrEqual(3);
    expect(result.ease).toBeGreaterThanOrEqual(1.3);
    expect(result.xpEarned).toBe(1);
  });
});
