import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { Page } from "@/components/shell";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { DOMAINS } from "@/lib/content/domains";
import { LESSONS } from "@/lib/content/lessons";
import { useProgress } from "@/lib/progress";
import { useHydrated } from "@/lib/use-hydrated";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/aprender")({ component: Aprender });

function Aprender() {
  const hydrated = useHydrated();
  const completed = useProgress((s) => s.completedLessons);
  const intro = LESSONS.filter((l) => l.domain === "intro");

  return (
    <Page>
      <p className="text-xs uppercase tracking-[0.2em] text-muted">Ruta</p>
      <h1 className="mt-2 font-display text-4xl">Aprender AB-410</h1>
      <p className="mt-3 max-w-prose text-muted">
        Dieciséis lecciones en el orden del study guide. Marca cada una al
        terminar y pasa al quiz del tema.
      </p>

      <ol className="mt-10 flex flex-col gap-10">
        <li>
          <h2 className="font-display text-2xl">Antes de los dominios</h2>
          <ul className="mt-4 flex flex-col gap-2">
            {intro.map((l) => (
              <LessonRow
                key={l.id}
                id={l.id}
                title={l.title}
                minutes={l.minutes}
                summary={l.summary}
                done={hydrated && completed.includes(l.id)}
              />
            ))}
          </ul>
        </li>
        {DOMAINS.map((d) => {
          const items = LESSONS.filter((l) => l.domain === d.id);
          const doneCount = hydrated
            ? items.filter((l) => completed.includes(l.id)).length
            : 0;
          return (
            <li key={d.id} id={d.id}>
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <Badge>Dominio {d.code} · {d.weight}</Badge>
                  <h2 className="mt-3 font-display text-2xl">{d.title}</h2>
                  <p className="mt-1 max-w-prose text-sm text-muted">{d.blurb}</p>
                </div>
                <div className="w-40">
                  <Progress value={items.length ? (doneCount / items.length) * 100 : 0} />
                  <p className="mt-1 text-xs tabular-nums text-subtle">
                    {doneCount}/{items.length}
                  </p>
                </div>
              </div>
              <ul className="mt-4 flex flex-col gap-2">
                {items.map((l) => (
                  <LessonRow
                    key={l.id}
                    id={l.id}
                    title={l.title}
                    minutes={l.minutes}
                    summary={l.summary}
                    done={hydrated && completed.includes(l.id)}
                  />
                ))}
              </ul>
            </li>
          );
        })}
      </ol>
    </Page>
  );
}

function LessonRow({
  id,
  title,
  minutes,
  summary,
  done,
}: {
  id: string;
  title: string;
  minutes: number;
  summary: string;
  done: boolean;
}) {
  return (
    <li>
      <Link
        to="/leccion/$id"
        params={{ id }}
        className={cn(
          "flex gap-4 rounded-xl border border-border bg-surface px-4 py-3.5 transition-colors hover:border-border-strong",
          done && "border-ok/20",
        )}
      >
        <span
          className={cn(
            "mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border",
            done ? "border-ok/40 bg-ok/15 text-ok" : "border-border text-subtle",
          )}
        >
          {done ? <Check className="size-3.5" /> : null}
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-baseline justify-between gap-2">
            <span className="font-medium">{title}</span>
            <span className="text-xs tabular-nums text-subtle">{minutes} min</span>
          </span>
          <span className="mt-1 block text-sm text-muted">{summary}</span>
        </span>
      </Link>
    </li>
  );
}
