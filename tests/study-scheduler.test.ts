import { describe, expect, it } from 'vitest';
import { fromLegacyDeckConfig, legacyDeckConfig } from '../src/lib/study/anki-map';
import { dayNumber, dayStart, DEFAULT_STUDY_CONFIG, resolveStudyConfig, weekdayIndex } from '../src/lib/study/config';
import { answerCard, constrainedFuzzBounds, fuzzedWithEasyDays, Steps, type CardSched } from '../src/lib/study/scheduler';

const now = new Date('2026-11-13T15:00:00Z');
const config = { ...DEFAULT_STUDY_CONFIG };

function card(over: Partial<CardSched> = {}): CardSched {
  return { id: 42, type: 'new', remainingSteps: 0, interval: 0, ease: 2.5, reps: 0, lapses: 0, leech: false, lastReviewDay: null, lastReviewAt: null, fsrs: null, ...over };
}

describe('passos de aprendizado (mesmos casos de steps.rs do Anki)', () => {
  const cases: [number[], number, number | null, number | null, number | null][] = [
    [[10], 1, 600, 900, null],
    [[1, 10], 2, 60, 330, 600],
    [[1, 10], 1, 60, 600, null],
    [[1, 10, 100], 3, 60, 330, 600],
    [[1, 10, 100], 2, 60, 600, 6000],
    [[1, 10, 100], 1, 60, 6000, null],
    [[3 * 1440], 1, 3 * 86400, 4 * 86400, null],
  ];
  it.each(cases)('steps %j remaining %i', (steps, remaining, again, hard, good) => {
    const s = new Steps(steps);
    expect(s.againDelay()).toBe(again);
    expect(s.hardDelay(remaining)).toBe(hard);
    expect(s.goodDelay(remaining)).toBe(good);
  });
});

describe('cartão novo', () => {
  it('Bom → 10 min, depois Bom → gradua em 1 dia; Fácil → 4 dias', () => {
    const first = answerCard(card(), 3, config, now, 100);
    expect(first).toMatchObject({ type: 'learning', delay: { secs: 600 }, remainingSteps: 1 });
    const second = answerCard(card({ type: 'learning', remainingSteps: 1 }), 3, config, now, 100);
    expect(second).toMatchObject({ type: 'review', interval: 1, ease: 2.5 });
    const easy = answerCard(card(), 4, config, now, 100);
    expect(easy.type).toBe('review');
    expect(easy.interval).toBeGreaterThanOrEqual(3); // 4 dias com fuzz (3–5), como no Anki
    expect(easy.interval).toBeLessThanOrEqual(5);
    expect(answerCard(card(), 1, config, now, 100)).toMatchObject({ type: 'learning', delay: { secs: 60 } });
    expect(answerCard(card(), 2, config, now, 100)).toMatchObject({ type: 'learning', delay: { secs: 330 } });
  });

  it('sem passos de aprendizado gradua direto', () => {
    expect(answerCard(card(), 3, { ...config, learnSteps: [] }, now, 100)).toMatchObject({ type: 'review', interval: 1 });
  });
});

describe('revisão (SM-2 do Anki)', () => {
  const review = card({ type: 'review', interval: 10, ease: 2.5, lastReviewDay: 90, reps: 5 });

  it('intervalos crescem Difícil < Bom < Fácil, dentro da faixa de fuzz', () => {
    const hard = answerCard(review, 2, config, now, 100);
    const good = answerCard(review, 3, config, now, 100);
    const easy = answerCard(review, 4, config, now, 100);
    const [gl, gu] = constrainedFuzzBounds(25, 1, 36500);
    expect(good.interval).toBeGreaterThanOrEqual(gl);
    expect(good.interval).toBeLessThanOrEqual(gu);
    expect(hard.interval).toBeLessThan(good.interval);
    expect(easy.interval).toBeGreaterThan(good.interval);
    expect(hard.ease).toBeCloseTo(2.35);
    expect(easy.ease).toBeCloseTo(2.65);
    expect(good.ease).toBeCloseTo(2.5);
  });

  it('Errei → reaprendizado de 10 min, facilidade −20%, lapso contado', () => {
    // Novo intervalo 0 (padrão do Anki): o intervalo volta para o mínimo.
    const again = answerCard(review, 1, { ...config, newInterval: 0 }, now, 100);
    expect(again).toMatchObject({ type: 'relearning', delay: { secs: 600 }, lapses: 1, interval: 1 });
    expect(again.ease).toBeCloseTo(2.3);
    const back = answerCard(card({ ...review, type: 'relearning', interval: 1, remainingSteps: 1, lapses: 1, ease: 2.3 }), 3, config, now, 100);
    expect(back).toMatchObject({ type: 'review', interval: 1 });
  });

  it('novo intervalo 0,50 (padrão do Tunely): errar mantém metade do intervalo', () => {
    const big = card({ ...review, interval: 20, lastReviewDay: 80 });
    const interval = answerCard(big, 1, { ...config, newInterval: 0.5 }, now, 100).interval;
    expect(interval).toBeGreaterThanOrEqual(9); // 10 dias ± fuzz
    expect(interval).toBeLessThanOrEqual(11);
  });

  it('respeita o intervalo máximo', () => {
    const big = card({ type: 'review', interval: 300, ease: 2.5, lastReviewDay: -200 });
    expect(answerCard(big, 4, { ...config, maximumInterval: 365 }, now, 100).interval).toBeLessThanOrEqual(365);
  });

  it('sanguessuga no limite de lapsos (e a cada metade depois)', () => {
    expect(answerCard(card({ ...review, lapses: 7 }), 1, config, now, 100)).toMatchObject({ becameLeech: true, leech: true });
    expect(answerCard(card({ ...review, lapses: 8 }), 1, config, now, 100).becameLeech).toBe(false);
    expect(answerCard(card({ ...review, lapses: 11 }), 1, config, now, 100).becameLeech).toBe(true);
  });
});

describe('FSRS', () => {
  it('agenda com ts-fsrs e guarda o estado de memória', () => {
    const fsrsConfig = { ...config, fsrs: true };
    const first = answerCard(card(), 3, fsrsConfig, now, 100);
    expect(first.fsrs).not.toBeNull();
    expect(first.type).toBe('learning');
    const easy = answerCard(card(), 4, fsrsConfig, now, 100);
    expect(easy.type).toBe('review');
    expect('days' in easy.delay && easy.delay.days).toBeGreaterThanOrEqual(1);
  });
});

describe('dia de estudo', () => {
  it('vira às 4h no fuso do usuário', () => {
    const cfg = { tzOffsetMinutes: -180, nextDayStartsAt: 4 };
    const before = dayNumber(new Date('2026-11-14T06:59:00Z'), cfg); // 03:59 em Brasília
    const after = dayNumber(new Date('2026-11-14T07:00:00Z'), cfg); // 04:00 em Brasília
    expect(after).toBe(before + 1);
    expect(dayStart(after, cfg).toISOString()).toBe('2026-11-14T07:00:00.000Z');
  });

  it('opções inválidas caem no padrão campo a campo', () => {
    const resolved = resolveStudyConfig({ newPerDay: 30, learnSteps: 'x', bogus: 1 });
    expect(resolved.newPerDay).toBe(30);
    expect(resolved.learnSteps).toEqual([1, 10]);
  });
});

describe('Dias de Descanso (easy days)', () => {
  it('evita os dias marcados como Mínimo dentro da faixa de fuzz', () => {
    // segunda..domingo; zera sábado e domingo
    const easyDays = [1, 1, 1, 1, 1, 0, 0];
    for (let seed = 0; seed < 50; seed++) {
      const fuzz = seed / 50;
      const days = fuzzedWithEasyDays(fuzz, 20, 1, 36500, 100, easyDays);
      expect([5, 6]).not.toContain(weekdayIndex(100 + days));
    }
  });
});

describe('formato de preset do Anki (schema 11)', () => {
  it('ida e volta preserva as opções', () => {
    const config = {
      ...DEFAULT_STUDY_CONFIG,
      newPerDay: 30, learnSteps: [1, 10, 60], newInterval: 0.5, leechAction: 'suspend' as const,
      reviewOrder: 'relativeOverdueness' as const, newGatherPriority: 'randomCards' as const, newReviewMix: 'newFirst' as const,
      answerAction: 'answerGood' as const, easyDays: [1, 1, 1, 1, 1, 0.5, 0], disableAutoplay: true,
    };
    const back = fromLegacyDeckConfig(legacyDeckConfig(config, 0));
    expect(back).toMatchObject({
      newPerDay: 30, learnSteps: [1, 10, 60], newInterval: 0.5, leechAction: 'suspend', reviewOrder: 'relativeOverdueness',
      newGatherPriority: 'randomCards', newReviewMix: 'newFirst', answerAction: 'answerGood', easyDays: [1, 1, 1, 1, 1, 0.5, 0],
      disableAutoplay: true,
    });
  });
});
