import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Page } from "@/components/shell";
import { GLOSSARY } from "@/lib/content/glossary";

export const Route = createFileRoute("/glosario")({ component: Glosario });

function Glosario() {
  const [q, setQ] = useState("");
  const items = useMemo(() => {
    const n = q.trim().toLowerCase();
    const list = n
      ? GLOSSARY.filter(
          (g) =>
            g.term.toLowerCase().includes(n) ||
            g.definition.toLowerCase().includes(n),
        )
      : GLOSSARY;
    return [...list].sort((a, b) => a.term.localeCompare(b.term, "es"));
  }, [q]);

  return (
    <Page className="max-w-3xl">
      <p className="text-xs uppercase tracking-[0.2em] text-muted">Referencia</p>
      <h1 className="mt-2 font-display text-4xl">Glosario</h1>
      <label className="mt-6 block">
        <span className="sr-only">Buscar término</span>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar término…"
          className="h-11 w-full rounded-xl border border-border bg-surface px-4 text-sm outline-none ring-ring/60 placeholder:text-subtle focus:ring-2"
        />
      </label>
      <ul className="mt-8 divide-y divide-border rounded-2xl border border-border">
        {items.map((g) => (
          <li key={g.id} className="px-4 py-4">
            <p className="font-medium">{g.term}</p>
            <p className="mt-1 text-sm leading-relaxed text-muted">{g.definition}</p>
          </li>
        ))}
      </ul>
    </Page>
  );
}
