import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DOMAINS } from "@/lib/content/domains";
import { LESSONS } from "@/lib/content/lessons";
import { QUESTIONS } from "@/lib/content/questions";

export type QuizAttempt = {
  quizId: string;
  score: number;
  total: number;
  correctIds: string[];
  missedIds: string[];
  at: number;
};

export type ExamAttempt = {
  id: string;
  score: number;
  scaled: number;
  passed: boolean;
  total: number;
  correct: number;
  flagged: string[];
  answers: Record<string, number[]>;
  questionIds: string[];
  at: number;
  durationSec: number;
};

export type CardBox = 1 | 2 | 3 | 4 | 5;

type ProgressState = {
  completedLessons: string[];
  lastLessonId: string | null;
  quizAttempts: QuizAttempt[];
  examAttempts: ExamAttempt[];
  flashBoxes: Record<string, CardBox>;
  completedLabs: string[];
  bookmarks: string[];
  markLesson: (id: string) => void;
  unmarkLesson: (id: string) => void;
  setLastLesson: (id: string) => void;
  addQuizAttempt: (attempt: QuizAttempt) => void;
  addExamAttempt: (attempt: ExamAttempt) => void;
  setCardBox: (id: string, box: CardBox) => void;
  markLab: (id: string) => void;
  toggleBookmark: (id: string) => void;
  resetAll: () => void;
};

const empty = {
  completedLessons: [] as string[],
  lastLessonId: null as string | null,
  quizAttempts: [] as QuizAttempt[],
  examAttempts: [] as ExamAttempt[],
  flashBoxes: {} as Record<string, CardBox>,
  completedLabs: [] as string[],
  bookmarks: [] as string[],
};

export const useProgress = create<ProgressState>()(
  persist(
    (set, get) => ({
      ...empty,
      markLesson: (id) =>
        set({
          completedLessons: Array.from(new Set([...get().completedLessons, id])),
          lastLessonId: id,
        }),
      unmarkLesson: (id) =>
        set({
          completedLessons: get().completedLessons.filter((x) => x !== id),
        }),
      setLastLesson: (id) => set({ lastLessonId: id }),
      addQuizAttempt: (attempt) =>
        set({ quizAttempts: [attempt, ...get().quizAttempts].slice(0, 80) }),
      addExamAttempt: (attempt) =>
        set({ examAttempts: [attempt, ...get().examAttempts].slice(0, 20) }),
      setCardBox: (id, box) =>
        set({ flashBoxes: { ...get().flashBoxes, [id]: box } }),
      markLab: (id) =>
        set({
          completedLabs: Array.from(new Set([...get().completedLabs, id])),
        }),
      toggleBookmark: (id) => {
        const has = get().bookmarks.includes(id);
        set({
          bookmarks: has
            ? get().bookmarks.filter((x) => x !== id)
            : [...get().bookmarks, id],
        });
      },
      resetAll: () => set(empty),
    }),
    { name: "aether-ab410-progress" },
  ),
);

export function lessonCompletion() {
  const done = useProgress.getState().completedLessons;
  const total = LESSONS.length;
  return { done: done.length, total, pct: total ? (done.length / total) * 100 : 0 };
}

export function domainMastery(domainId: string) {
  const lessons = LESSONS.filter((l) => l.domain === domainId);
  const done = useProgress.getState().completedLessons;
  const lessonPct = lessons.length
    ? lessons.filter((l) => done.includes(l.id)).length / lessons.length
    : 0;

  const qIds = new Set(
    QUESTIONS.filter((q) => q.domain === domainId).map((q) => q.id),
  );
  const attempts = useProgress.getState().quizAttempts;
  let hits = 0;
  let seen = 0;
  const latestByQ = new Map<string, boolean>();
  for (const a of [...attempts].reverse()) {
    for (const id of a.correctIds) {
      if (qIds.has(id)) latestByQ.set(id, true);
    }
    for (const id of a.missedIds) {
      if (qIds.has(id)) latestByQ.set(id, false);
    }
  }
  for (const v of latestByQ.values()) {
    seen += 1;
    if (v) hits += 1;
  }
  const quizPct = seen ? hits / seen : 0;
  const score = lessonPct * 0.45 + quizPct * 0.55;
  return { lessonPct, quizPct, score, seen };
}

export function readinessScore() {
  const weights: Record<string, number> = { d1: 0.275, d2: 0.275, d3: 0.45 };
  let acc = 0;
  for (const d of DOMAINS) {
    acc += domainMastery(d.id).score * (weights[d.id] ?? 0);
  }
  const exams = useProgress.getState().examAttempts;
  const lastExamBoost = exams[0] ? Math.min(exams[0].scaled / 1000, 1) * 0.12 : 0;
  const base = acc * (exams[0] ? 0.88 : 1);
  return Math.round((base + lastExamBoost) * 1000);
}
