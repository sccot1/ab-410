import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, ClipboardCheck, GraduationCap } from "lucide-react";
import { Page } from "@/components/shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { DOMAINS, EXAM } from "@/lib/content/domains";
import { LESSONS } from "@/lib/content/lessons";
import { QUESTIONS } from "@/lib/content/questions";
import { LABS } from "@/lib/content/labs";
import { FLASHCARDS } from "@/lib/content/flashcards";
import { domainMastery, readinessScore, useProgress } from "@/lib/progress";
import { useHydrated } from "@/lib/use-hydrated";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const hydrated = useHydrated();
  const completed = useProgress((s) => s.completedLessons);
  const last = useProgress((s) => s.lastLessonId);
  const exams = useProgress((s) => s.examAttempts);
  const continueLesson =
    LESSONS.find((l) => l.id === last) ??
    LESSONS.find((l) => !completed.includes(l.id)) ??
    LESSONS[0];
  const ready = hydrated ? readinessScore() : 0;
  const lessonPct = LESSONS.length
    ? (completed.length / LESSONS.length) * 100
    : 0;

  return (
    <Page>
      <section className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-muted">
            Microsoft · {EXAM.code}
          </p>
          <h1 className="mt-3 max-w-xl font-display text-4xl leading-[1.08] sm:text-5xl">
            Aprueba Intelligent Applications Builder.
          </h1>
          <p className="mt-4 max-w-prose text-muted">
            Academia completa para {EXAM.credential}. Lecciones alineadas al
            study guide, laboratorios, tarjetas y simulacros con corte 700/1000.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild>
              <Link to="/leccion/$id" params={{ id: continueLesson.id }}>
                {hydrated && last ? "Continuar" : "Empezar"}
                <ArrowRight />
              </Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link to="/examen">Simulacro</Link>
            </Button>
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-surface p-5">
          <div className="flex items-baseline justify-between">
            <p className="text-sm text-muted">Listo para el examen</p>
            <p className="font-display text-3xl tabular-nums">{ready}</p>
          </div>
          <Progress value={ready / 10} className="mt-3" />
          <p className="mt-3 text-xs text-subtle">
            Combina lecciones, quizzes y el último simulacro. 700 es el corte
            oficial.
          </p>
          <dl className="mt-5 grid grid-cols-3 gap-3 text-center">
            <Stat label="Lecciones" value={`${hydrated ? completed.length : 0}/${LESSONS.length}`} />
            <Stat label="Preguntas" value={`${QUESTIONS.length}`} />
            <Stat label="Labs" value={`${LABS.length}`} />
          </dl>
        </div>
      </section>

      <section className="mt-14 grid gap-4 sm:grid-cols-3">
        {DOMAINS.map((d) => {
          const m = hydrated ? domainMastery(d.id) : { score: 0 };
          return (
            <Link
              key={d.id}
              to="/aprender"
              hash={d.id}
              className="rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-border-strong"
            >
              <div className="flex items-center justify-between">
                <Badge>Dominio {d.code}</Badge>
                <span className="text-xs tabular-nums text-muted">{d.weight}</span>
              </div>
              <h2 className="mt-4 font-display text-xl leading-snug">{d.title}</h2>
              <p className="mt-2 text-sm text-muted">{d.blurb}</p>
              <Progress value={m.score * 100} className="mt-4" />
            </Link>
          );
        })}
      </section>

      <section className="mt-14 grid gap-4 md:grid-cols-3">
        <ActionCard
          icon={BookOpen}
          title="Ruta de estudio"
          text={`${LESSONS.length} lecciones. Empieza por el mapa del examen y sigue el peso oficial.`}
          to="/aprender"
          cta="Abrir ruta"
        />
        <ActionCard
          icon={ClipboardCheck}
          title="Práctica por tema"
          text={`${QUESTIONS.length} preguntas de escenario. Feedback inmediato y explicación.`}
          to="/practicar"
          cta="Practicar"
        />
        <ActionCard
          icon={GraduationCap}
          title="Simulacro 120 min"
          text="50 preguntas ponderadas por dominio. Puntuación 1000. Revisión al terminar."
          to="/examen"
          cta="Lanzar examen"
        />
      </section>

      <section className="mt-14 rounded-2xl border border-border bg-surface p-6 sm:p-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl">El examen, en cifras</h2>
            <p className="mt-1 text-sm text-muted">
              Datos oficiales y de experiencia de beta. Úsalos para planificar, no para relajarte.
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/guia">Guía del día</Link>
          </Button>
        </div>
        <dl className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <Stat label="Duración" value={`${EXAM.durationMin} min`} align="left" />
          <Stat label="Preguntas" value={EXAM.questionRange} align="left" />
          <Stat label="Aprobado" value={`${EXAM.passScore}+`} align="left" />
          <Stat label="Tarjetas" value={`${FLASHCARDS.length}`} align="left" />
        </dl>
        {hydrated && exams[0] ? (
          <p className="mt-6 text-sm text-muted">
            Último simulacro: {exams[0].scaled} puntos ·{" "}
            {exams[0].passed ? "corte superado" : "por debajo de 700"} ·{" "}
            {new Date(exams[0].at).toLocaleDateString("es")}
          </p>
        ) : (
          <p className="mt-6 text-sm text-muted">
            Progreso de lecciones: {hydrated ? Math.round(lessonPct) : 0}%. Aún no hay simulacros.
          </p>
        )}
      </section>
    </Page>
  );
}

function Stat({
  label,
  value,
  align = "center",
}: {
  label: string;
  value: string;
  align?: "center" | "left";
}) {
  return (
    <div className={align === "center" ? "text-center" : ""}>
      <dt className="text-xs uppercase tracking-[0.14em] text-subtle">{label}</dt>
      <dd className="mt-1 font-display text-xl tabular-nums">{value}</dd>
    </div>
  );
}

function ActionCard({
  icon: Icon,
  title,
  text,
  to,
  cta,
}: {
  icon: typeof BookOpen;
  title: string;
  text: string;
  to: string;
  cta: string;
}) {
  return (
    <div className="flex flex-col rounded-2xl border border-border bg-surface p-5">
      <Icon className="size-5 text-accent" />
      <h2 className="mt-4 font-display text-xl">{title}</h2>
      <p className="mt-2 flex-1 text-sm text-muted">{text}</p>
      <Link to={to} className="mt-4 text-sm text-accent hover:text-fg">
        {cta} →
      </Link>
    </div>
  );
}
