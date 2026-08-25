import { createFileRoute, Link } from "@tanstack/react-router";
import { Flag, Pause } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Page } from "@/components/shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EXAM } from "@/lib/content/domains";
import {
  isCorrect,
  pickExamQuestions,
  scaledScore,
} from "@/lib/content/questions";
import type { Question } from "@/lib/content/types";
import { useProgress } from "@/lib/progress";
import { useHydrated } from "@/lib/use-hydrated";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/examen")({ component: ExamenPage });

const DURATION = EXAM.durationMin * 60;
const COUNT = 50;

function ExamenPage() {
  const hydrated = useHydrated();
  const attempts = useProgress((s) => s.examAttempts);
  const add = useProgress((s) => s.addExamAttempt);
  const [phase, setPhase] = useState<"idle" | "live" | "done">("idle");
  const [seed] = useState(() => Date.now());
  const questions = useMemo(() => pickExamQuestions(COUNT, seed), [seed]);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number[]>>({});
  const [flagged, setFlagged] = useState<string[]>([]);
  const [left, setLeft] = useState(DURATION);
  const [startedAt, setStartedAt] = useState(0);
  const answersRef = useRef(answers);
  answersRef.current = answers;
  const phaseRef = useRef(phase);
  phaseRef.current = phase;

  useEffect(() => {
    if (phase !== "live") return;
    const t = window.setInterval(() => {
      setLeft((s) => {
        if (s <= 1) {
          window.clearInterval(t);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => window.clearInterval(t);
  }, [phase]);

  useEffect(() => {
    if (phase === "live" && left === 0) {
      finish();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [left, phase]);

  const q = questions[index];

  function start() {
    setPhase("live");
    setStartedAt(Date.now());
    setIndex(0);
    setAnswers({});
    setFlagged([]);
    setLeft(DURATION);
  }

  function finish() {
    if (phaseRef.current === "done") return;
    const ans = answersRef.current;
    let hits = 0;
    for (const item of questions) {
      if (isCorrect(item, ans[item.id] ?? [])) hits += 1;
    }
    const scaled = scaledScore(hits, questions.length);
    add({
      id: String(seed),
      score: hits,
      scaled,
      passed: scaled >= EXAM.passScore,
      total: questions.length,
      correct: hits,
      flagged,
      answers: ans,
      questionIds: questions.map((x) => x.id),
      at: Date.now(),
      durationSec: Math.round((Date.now() - startedAt) / 1000),
    });
    setPhase("done");
  }

  if (phase === "idle") {
    return (
      <Page className="max-w-2xl">
        <p className="text-xs uppercase tracking-[0.2em] text-muted">Simulacro</p>
        <h1 className="mt-2 font-display text-4xl">Examen AB-410</h1>
        <p className="mt-3 text-muted">
          {COUNT} preguntas ponderadas (≈28% dominio 1, 28% dominio 2, 44%
          dominio 3). {EXAM.durationMin} minutos. Sin pistas hasta el final.
          Corte {EXAM.passScore}/{EXAM.scaleMax}.
        </p>
        <ul className="mt-6 space-y-2 text-sm text-fg/85">
          <li>Puedes marcar para revisar y navegar libremente.</li>
          <li>Al agotarse el tiempo se entrega solo.</li>
          <li>Microsoft Learn no está aquí: entrena a decidir sin buscar.</li>
        </ul>
        <Button className="mt-8" onClick={start}>
          Empezar cronómetro
        </Button>
        {hydrated && attempts.length ? (
          <section className="mt-12">
            <h2 className="font-display text-2xl">Intentos</h2>
            <ul className="mt-4 divide-y divide-border rounded-xl border border-border">
              {attempts.map((a) => (
                <li key={a.id + a.at} className="flex justify-between px-4 py-3 text-sm">
                  <span>{new Date(a.at).toLocaleString("es")}</span>
                  <span className="tabular-nums">
                    {a.scaled} · {a.passed ? "apto" : "no apto"}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
        <p className="mt-8 text-sm text-muted">
          ¿Prefieres un bloque? <Link to="/practicar" className="text-accent">Práctica por tema</Link>
        </p>
      </Page>
    );
  }

  if (phase === "done") {
    const last = attempts[0];
    const scaled = last?.scaled ?? 0;
    const passed = scaled >= EXAM.passScore;
    return (
      <Page className="max-w-3xl">
        <p className="text-xs uppercase tracking-[0.2em] text-muted">Resultado</p>
        <h1 className="mt-2 font-display text-5xl tabular-nums">
          {scaled}
          <span className="text-2xl text-muted"> / {EXAM.scaleMax}</span>
        </h1>
        <Badge tone={passed ? "ok" : "warn"} className="mt-3">
          {passed ? "Corte 700 superado" : "Por debajo de 700"}
        </Badge>
        <p className="mt-4 text-muted">
          {last?.correct} / {last?.total} aciertos. Esto es una escala lineal de
          práctica; el scoring real de Microsoft no es público.
        </p>
        <ReviewList questions={questions} answers={answers} />
        <div className="mt-8 flex gap-3">
          <Button onClick={() => window.location.reload()}>Otro intento</Button>
          <Button variant="secondary" asChild>
            <Link to="/aprender">Volver a la ruta</Link>
          </Button>
        </div>
      </Page>
    );
  }

  const selected = answers[q.id] ?? [];
  const multi = q.correct.length > 1;
  const mm = String(Math.floor(left / 60)).padStart(2, "0");
  const ss = String(left % 60).padStart(2, "0");
  const urgent = left < 5 * 60;

  return (
    <Page className="max-w-3xl">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className={cn("font-mono text-sm tabular-nums", urgent && "text-danger")}>
          {mm}:{ss}
        </p>
        <p className="text-sm text-muted tabular-nums">
          {index + 1} / {questions.length}
        </p>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              setFlagged((f) =>
                f.includes(q.id) ? f.filter((x) => x !== q.id) : [...f, q.id],
              )
            }
          >
            <Flag className={flagged.includes(q.id) ? "text-warn" : ""} />
            Marcar
          </Button>
          <Button variant="outline" size="sm" onClick={finish}>
            <Pause /> Entregar
          </Button>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-1">
        {questions.map((item, i) => {
          const answered = (answers[item.id] ?? []).length > 0;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setIndex(i)}
              className={cn(
                "size-8 rounded-md text-xs tabular-nums",
                i === index && "bg-fg text-bg",
                i !== index && answered && "bg-elevated text-fg",
                i !== index && !answered && "bg-transparent text-muted",
                flagged.includes(item.id) && i !== index && "ring-1 ring-warn/50",
              )}
            >
              {i + 1}
            </button>
          );
        })}
      </div>
      <h1 className="mt-8 font-display text-2xl leading-snug">{q.stem}</h1>
      {multi ? (
        <p className="mt-2 text-sm text-muted">Selecciona todas las que apliquen.</p>
      ) : null}
      <ul className="mt-6 flex flex-col gap-2">
        {q.choices.map((c, i) => {
          const on = selected.includes(i);
          return (
            <li key={c}>
              <button
                type="button"
                onClick={() => {
                  setAnswers((prev) => {
                    const cur = prev[q.id] ?? [];
                    const next = multi
                      ? cur.includes(i)
                        ? cur.filter((x) => x !== i)
                        : [...cur, i]
                      : [i];
                    return { ...prev, [q.id]: next };
                  });
                }}
                className={cn(
                  "flex min-h-12 w-full items-start gap-3 rounded-xl border px-4 py-3 text-left text-sm",
                  on
                    ? "border-accent/50 bg-accent/10"
                    : "border-border bg-surface hover:border-border-strong",
                )}
              >
                <span className="font-mono text-xs text-muted">
                  {String.fromCharCode(65 + i)}
                </span>
                {c}
              </button>
            </li>
          );
        })}
      </ul>
      <div className="mt-6 flex justify-between">
        <Button
          variant="secondary"
          disabled={index === 0}
          onClick={() => setIndex((i) => i - 1)}
        >
          Anterior
        </Button>
        {index + 1 < questions.length ? (
          <Button onClick={() => setIndex((i) => i + 1)}>Siguiente</Button>
        ) : (
          <Button onClick={finish}>Entregar examen</Button>
        )}
      </div>
    </Page>
  );
}

function ReviewList({
  questions,
  answers,
}: {
  questions: Question[];
  answers: Record<string, number[]>;
}) {
  return (
    <ul className="mt-8 space-y-3">
      {questions.map((item, i) => {
        const ok = isCorrect(item, answers[item.id] ?? []);
        return (
          <li key={item.id} className="rounded-xl border border-border p-4">
            <p className="text-xs text-muted tabular-nums">
              {i + 1} · {ok ? "Acierto" : "Fallo"} · {item.topic}
            </p>
            <p className="mt-1 text-sm">{item.stem}</p>
            <p className="mt-2 text-sm text-muted">{item.explanation}</p>
            <Link
              to="/leccion/$id"
              params={{ id: item.lessonId }}
              className="mt-2 inline-block text-xs text-accent"
            >
              Ir a la lección
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
