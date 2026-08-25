import type { Question } from "./types";
import { Q_D1 } from "./questions-d1";
import { Q_D2 } from "./questions-d2";
import { Q_D3 } from "./questions-d3";

export const QUESTIONS: Question[] = [...Q_D1, ...Q_D2, ...Q_D3];

export function questionsForLesson(lessonId: string) {
  return QUESTIONS.filter((q) => q.lessonId === lessonId);
}

export function questionsForDomain(domain: string) {
  return QUESTIONS.filter((q) => q.domain === domain);
}

export function getQuestion(id: string) {
  return QUESTIONS.find((q) => q.id === id);
}

/** Deterministic shuffle from a seed so a mock exam is stable if resumed. */
export function pickExamQuestions(count = 50, seed = Date.now()) {
  const rng = mulberry32(seed);
  const byDomain = {
    d1: questionsForDomain("d1"),
    d2: questionsForDomain("d2"),
    d3: questionsForDomain("d3"),
  };
  const target = {
    d1: Math.round(count * 0.28),
    d2: Math.round(count * 0.28),
    d3: 0,
  };
  target.d3 = count - target.d1 - target.d2;

  const picked: Question[] = [];
  (["d1", "d2", "d3"] as const).forEach((d) => {
    const pool = shuffle([...byDomain[d]], rng);
    picked.push(...pool.slice(0, Math.min(target[d], pool.length)));
  });
  const leftover = QUESTIONS.filter((q) => !picked.includes(q));
  const need = count - picked.length;
  if (need > 0) picked.push(...shuffle(leftover, rng).slice(0, need));
  return shuffle(picked, rng).slice(0, count);
}

function mulberry32(a: number) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle<T>(arr: T[], rng: () => number) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function isCorrect(q: Question, selected: number[]) {
  if (selected.length !== q.correct.length) return false;
  const a = [...selected].sort();
  const b = [...q.correct].sort();
  return a.every((v, i) => v === b[i]);
}

export function scaledScore(correct: number, total: number) {
  if (total <= 0) return 0;
  return Math.round((correct / total) * 1000);
}
