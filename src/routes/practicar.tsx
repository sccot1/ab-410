import { createFileRoute, Link } from "@tanstack/react-router";
import { Page } from "@/components/shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DOMAINS } from "@/lib/content/domains";
import { LESSONS } from "@/lib/content/lessons";
import { QUESTIONS, questionsForDomain, questionsForLesson } from "@/lib/content/questions";
import { useProgress } from "@/lib/progress";
import { useHydrated } from "@/lib/use-hydrated";

export const Route = createFileRoute("/practicar")({ component: Practicar });

function Practicar() {
  const hydrated = useHydrated();
  const attempts = useProgress((s) => s.quizAttempts);

  return (
    <Page>
      <p className="text-xs uppercase tracking-[0.2em] text-muted">Banco</p>
      <h1 className="mt-2 font-display text-4xl">Practicar</h1>
      <p className="mt-3 max-w-prose text-muted">
        {QUESTIONS.length} preguntas de escenario, agrupadas como el study
        guide. En práctica ves la explicación al momento. El simulacro oculta
        el feedback hasta el final.
      </p>
      <div className="mt-6">
        <Button asChild>
          <Link to="/examen">Simulacro completo</Link>
        </Button>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {DOMAINS.map((d) => {
          const qs = questionsForDomain(d.id);
          return (
            <Link
              key={d.id}
              to="/quiz/$id"
              params={{ id: d.id }}
              className="rounded-2xl border border-border bg-surface p-5 hover:border-border-strong"
            >
              <Badge>Dominio {d.code}</Badge>
              <h2 className="mt-3 font-display text-xl leading-snug">{d.title}</h2>
              <p className="mt-2 text-sm text-muted">{qs.length} preguntas</p>
            </Link>
          );
        })}
      </div>

      <h2 className="mt-12 font-display text-2xl">Por lección</h2>
      <ul className="mt-4 divide-y divide-border rounded-2xl border border-border">
        {LESSONS.filter((l) => questionsForLesson(l.id).length > 0).map((l) => {
          const n = questionsForLesson(l.id).length;
          const last = hydrated
            ? attempts.find((a) => a.quizId === l.id)
            : undefined;
          return (
            <li key={l.id}>
              <Link
                to="/quiz/$id"
                params={{ id: l.id }}
                className="flex items-center justify-between gap-3 px-4 py-3.5 hover:bg-elevated/50"
              >
                <span>
                  <span className="block text-sm font-medium">{l.title}</span>
                  <span className="text-xs text-muted">{n} preguntas</span>
                </span>
                <span className="text-xs tabular-nums text-subtle">
                  {last
                    ? `${last.score}/${last.total}`
                    : "Sin intentar"}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </Page>
  );
}
