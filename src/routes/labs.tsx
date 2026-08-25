import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { Page } from "@/components/shell";
import { Badge } from "@/components/ui/badge";
import { LABS } from "@/lib/content/labs";
import { DOMAINS } from "@/lib/content/domains";
import { useProgress } from "@/lib/progress";
import { useHydrated } from "@/lib/use-hydrated";

export const Route = createFileRoute("/labs")({ component: LabsPage });

function LabsPage() {
  const hydrated = useHydrated();
  const done = useProgress((s) => s.completedLabs);

  return (
    <Page>
      <p className="text-xs uppercase tracking-[0.2em] text-muted">Escenarios</p>
      <h1 className="mt-2 font-display text-4xl">Laboratorios</h1>
      <p className="mt-3 max-w-prose text-muted">
        Seis casos de negocio como los del examen. No se conectan a tu tenant:
        son guías para replicar en un entorno Developer. Cada paso dice qué
        harías y por qué cae en AB-410.
      </p>
      <ul className="mt-8 grid gap-4 md:grid-cols-2">
        {LABS.map((lab) => {
          const domain = DOMAINS.find((d) => d.id === lab.domain);
          const complete = hydrated && done.includes(lab.id);
          return (
            <li key={lab.id}>
              <Link
                to="/lab/$id"
                params={{ id: lab.id }}
                className="flex h-full flex-col rounded-2xl border border-border bg-surface p-5 hover:border-border-strong"
              >
                <div className="flex items-center justify-between gap-2">
                  <Badge>Dominio {domain?.code}</Badge>
                  {complete ? (
                    <span className="flex items-center gap-1 text-xs text-ok">
                      <Check className="size-3.5" /> Hecho
                    </span>
                  ) : (
                    <span className="text-xs tabular-nums text-subtle">
                      {lab.minutes} min
                    </span>
                  )}
                </div>
                <h2 className="mt-3 font-display text-xl leading-snug">{lab.title}</h2>
                <p className="mt-2 line-clamp-3 text-sm text-muted">{lab.scenario}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </Page>
  );
}
