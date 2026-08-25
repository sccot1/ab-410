import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Check } from "lucide-react";
import { Page } from "@/components/shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LABS } from "@/lib/content/labs";
import { DOMAINS } from "@/lib/content/domains";
import { useProgress } from "@/lib/progress";
import { useHydrated } from "@/lib/use-hydrated";

export const Route = createFileRoute("/lab/$id")({ component: LabPage });

function LabPage() {
  const { id } = Route.useParams();
  const lab = LABS.find((l) => l.id === id);
  if (!lab) throw notFound();
  const domain = DOMAINS.find((d) => d.id === lab.domain);
  const hydrated = useHydrated();
  const done = useProgress((s) => s.completedLabs);
  const mark = useProgress((s) => s.markLab);
  const complete = hydrated && done.includes(lab.id);

  return (
    <Page className="max-w-3xl">
      <Link
        to="/labs"
        className="inline-flex items-center gap-2 text-sm text-muted hover:text-fg"
      >
        <ArrowLeft className="size-4" /> Labs
      </Link>
      <div className="mt-5 flex flex-wrap gap-2">
        <Badge>Dominio {domain?.code}</Badge>
        <Badge tone="muted">{lab.minutes} min</Badge>
      </div>
      <h1 className="mt-4 font-display text-4xl">{lab.title}</h1>
      <p className="mt-4 text-[1.05rem] leading-relaxed text-fg/90">{lab.scenario}</p>
      <div className="mt-6 rounded-xl border border-border bg-surface p-4">
        <p className="text-xs uppercase tracking-[0.16em] text-muted">Objetivo</p>
        <p className="mt-1 text-sm">{lab.goal}</p>
      </div>
      <ol className="mt-8 flex flex-col gap-4">
        {lab.steps.map((s, i) => (
          <li key={s.title} className="rounded-xl border border-border p-5">
            <p className="font-mono text-xs text-accent">Paso {i + 1}</p>
            <h2 className="mt-1 font-display text-xl">{s.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-fg/85">{s.detail}</p>
            <p className="mt-3 text-sm text-muted">
              <span className="text-subtle">Por qué cae: </span>
              {s.why}
            </p>
          </li>
        ))}
      </ol>
      <aside className="mt-6 rounded-xl border border-accent/25 bg-accent/8 p-4">
        <p className="text-xs uppercase tracking-[0.16em] text-muted">Ángulo de examen</p>
        <p className="mt-1 text-sm leading-relaxed">{lab.examAngle}</p>
      </aside>
      <Button className="mt-8" variant={complete ? "secondary" : "primary"} onClick={() => mark(lab.id)}>
        <Check />
        {complete ? "Completado" : "Marcar laboratorio hecho"}
      </Button>
    </Page>
  );
}
