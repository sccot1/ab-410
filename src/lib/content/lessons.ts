import type { Lesson } from "./types";
import { INTRO_LESSONS } from "./lessons-intro";
import { D1_LESSONS } from "./lessons-d1";
import { D2_LESSONS } from "./lessons-d2";
import { D3_LESSONS } from "./lessons-d3";

export const LESSONS: Lesson[] = [
  ...INTRO_LESSONS,
  ...D1_LESSONS,
  ...D2_LESSONS,
  ...D3_LESSONS,
];

export function getLesson(id: string) {
  return LESSONS.find((l) => l.id === id);
}

export function lessonsForDomain(domain: string) {
  return LESSONS.filter((l) => l.domain === domain);
}

export function nextLesson(id: string) {
  const i = LESSONS.findIndex((l) => l.id === id);
  return i >= 0 ? LESSONS[i + 1] : undefined;
}

export function prevLesson(id: string) {
  const i = LESSONS.findIndex((l) => l.id === id);
  return i > 0 ? LESSONS[i - 1] : undefined;
}
