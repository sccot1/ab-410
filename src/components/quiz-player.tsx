import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Check, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Question } from "@/lib/content/types";
import { isCorrect, scaledScore } from "@/lib/content/questions";
import { useProgress } from "@/lib/progress";
import { cn } from "@/lib/utils";

export function QuizPlayer({
  quizId,
  title,
  questions,
  examMode = false,
}: {
  quizId: string;
  title: string;
  questions: Question[];
  examMode?: boolean;
}) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number[]>([]);
  const [revealed, setRevealed] = useState(false);
  const [answers, setAnswers] = useState<Record<string, number[]>>({});
  const [done, setDone] = useState(false);
  const addQuiz = useProgress((s) => s.addQuizAttempt);

  const q = questions[index];
  const multi = (q?.correct.length ?? 0) > 1;

  const result = useMemo(() => {
    if (!done) return null;
    let correct = 0;
    const correctIds: string[] = [];
    const missedIds: string[] = [];
    for (const item of questions) {
      const sel = answers[item.id] ?? [];
      if (isCorrect(item, sel)) {
        correct += 1;
        correctIds.push(item.id);
      } else missedIds.push(item.id);
    }
    return {
      correct,
      total: questions.length,
      scaled: scaledScore(correct, questions.length),
      correctIds,
      missedIds,
    };
  }, [done, answers, questions]);

  if (!q && !done) {
    return (
      <p className="text-muted">
        No hay preguntas en este bloque todavía.
      </p>
    );
  }

  if (done && result) {
    const passed = result.scaled >= 700;
    return (
      <div className="mx-auto max-w-2xl">
        <p className="text-xs uppercase tracking-[0.18em] text-muted">{title}</p>
        <h1 className="mt-2 font-display text-4xl">
          {result.scaled}
          <span className="text-xl text-muted"> / 1000</span>
        </h1>
        <p className="mt-2 text-muted">
          {result.correct} de {result.total} correctas.{" "}
          {passed ? "Por encima del corte 700." : "Por debajo de 700. Repasa los fallos."}
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          <Badge tone={passed ? "ok" : "warn"}>
            {passed ? "Aprobado (simulado)" : "A reforzar"}
          </Badge>
          <Badge>{Math.round((result.correct / result.total) * 100)}%</Badge>
        </div>
        <ul className="mt-8 space-y-3">
          {questions.map((item) => {
            const ok = result.correctIds.includes(item.id);
            return (
              <li
                key={item.id}
                className="rounded-xl border border-border bg-surface p-4"
              >
                <div className="flex items-start gap-2">
                  {ok ? (
                    <Check className="mt-0.5 size-4 text-ok" />
                  ) : (
                    <X className="mt-0.5 size-4 text-danger" />
                  )}
                  <div>
                    <p className="text-sm leading-relaxed">{item.stem}</p>
                    <p className="mt-2 text-sm text-muted">{item.explanation}</p>
                    <p className="mt-2 text-xs text-subtle">
                      Correcta: {item.correct.map((i) => item.choices[i]).join(" · ")}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button
            onClick={() => {
              setIndex(0);
              setSelected([]);
              setRevealed(false);
              setAnswers({});
              setDone(false);
            }}
          >
            Repetir
          </Button>
          <Button variant="secondary" asChild>
            <Link to="/practicar">Más práctica</Link>
          </Button>
        </div>
      </div>
    );
  }

  function toggle(i: number) {
    if (revealed) return;
    if (multi) {
      setSelected((prev) =>
        prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i],
      );
    } else {
      setSelected([i]);
    }
  }

  function commit() {
    if (!q || selected.length === 0) return;
    const nextAnswers = { ...answers, [q.id]: selected };
    setAnswers(nextAnswers);
    if (!examMode) {
      setRevealed(true);
      return;
    }
    goNext(nextAnswers);
  }

  function goNext(ans = answers) {
    if (index + 1 >= questions.length) {
      finish(ans);
      return;
    }
    setIndex((n) => n + 1);
    setSelected([]);
    setRevealed(false);
  }

  function finish(ans: Record<string, number[]>) {
    const correctIds: string[] = [];
    const missedIds: string[] = [];
    let hits = 0;
    for (const item of questions) {
      const sel = ans[item.id] ?? [];
      if (isCorrect(item, sel)) {
        hits += 1;
        correctIds.push(item.id);
      } else missedIds.push(item.id);
    }
    addQuiz({
      quizId,
      score: hits,
      total: questions.length,
      correctIds,
      missedIds,
      at: Date.now(),
    });
    setDone(true);
  }

  const okNow = q ? isCorrect(q, selected) : false;

  return (
    <div className="mx-auto max-w-2xl">
      <div className="flex items-center justify-between gap-3 text-sm text-muted">
        <p className="uppercase tracking-[0.16em]">{title}</p>
        <p className="tabular-nums">
          {index + 1} / {questions.length}
        </p>
      </div>
      <div className="mt-3 h-1 overflow-hidden rounded-full bg-elevated">
        <div
          className="h-full bg-accent transition-[width] duration-300"
          style={{ width: `${((index + (revealed ? 1 : 0)) / questions.length) * 100}%` }}
        />
      </div>
      <h1 className="mt-6 font-display text-2xl leading-snug sm:text-3xl">{q.stem}</h1>
      {multi ? (
        <p className="mt-2 text-sm text-muted">Puede haber más de una respuesta correcta.</p>
      ) : null}
      <ul className="mt-6 flex flex-col gap-2">
        {q.choices.map((choice, i) => {
          const on = selected.includes(i);
          const isRight = q.correct.includes(i);
          const show = revealed;
          return (
            <li key={choice}>
              <button
                type="button"
                onClick={() => toggle(i)}
                className={cn(
                  "flex min-h-12 w-full items-start gap-3 rounded-xl border px-4 py-3 text-left text-sm leading-relaxed transition-colors duration-150",
                  "border-border bg-surface hover:border-border-strong",
                  on && !show && "border-accent/50 bg-accent/10",
                  show && isRight && "border-ok/40 bg-ok/10",
                  show && on && !isRight && "border-danger/40 bg-danger/10",
                )}
              >
                <span className="mt-0.5 font-mono text-xs text-muted">
                  {String.fromCharCode(65 + i)}
                </span>
                <span>{choice}</span>
              </button>
            </li>
          );
        })}
      </ul>
      {revealed ? (
        <div className="mt-5 rounded-xl border border-border bg-elevated/60 p-4">
          <p className={cn("text-sm font-medium", okNow ? "text-ok" : "text-danger")}>
            {okNow ? "Correcto" : "Incorrecto"}
          </p>
          <p className="mt-1 text-sm leading-relaxed text-fg/80">{q.explanation}</p>
        </div>
      ) : null}
      <div className="mt-6 flex gap-3">
        {!revealed ? (
          <Button onClick={commit} disabled={selected.length === 0}>
            {examMode ? "Siguiente" : "Comprobar"}
          </Button>
        ) : (
          <Button onClick={() => goNext()}>
            {index + 1 >= questions.length ? "Ver resultado" : "Siguiente"}
            <ChevronRight />
          </Button>
        )}
      </div>
    </div>
  );
}
