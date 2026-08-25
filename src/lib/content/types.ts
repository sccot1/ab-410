export type DomainId = "d1" | "d2" | "d3";

export type LessonBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | {
      type: "callout";
      kind: "tip" | "exam" | "warn";
      title: string;
      text: string;
    }
  | { type: "table"; headers: string[]; rows: string[][] }
  | {
      type: "compare";
      left: { title: string; items: string[] };
      right: { title: string; items: string[] };
    }
  | { type: "steps"; items: { title: string; text: string }[] };

export type Lesson = {
  id: string;
  domain: DomainId | "intro";
  order: number;
  title: string;
  minutes: number;
  summary: string;
  objectives: string[];
  blocks: LessonBlock[];
};

export type Question = {
  id: string;
  domain: DomainId;
  topic: string;
  lessonId: string;
  difficulty: "easy" | "medium" | "hard";
  stem: string;
  choices: string[];
  correct: number[];
  explanation: string;
};

export type Flashcard = {
  id: string;
  domain: DomainId;
  front: string;
  back: string;
};

export type LabStep = {
  title: string;
  detail: string;
  why: string;
};

export type Lab = {
  id: string;
  domain: DomainId;
  title: string;
  minutes: number;
  scenario: string;
  goal: string;
  steps: LabStep[];
  examAngle: string;
};

export type GlossaryTerm = {
  id: string;
  term: string;
  definition: string;
  domain: DomainId | "intro";
};

export type Domain = {
  id: DomainId;
  code: string;
  weight: string;
  weightMin: number;
  weightMax: number;
  title: string;
  blurb: string;
};
