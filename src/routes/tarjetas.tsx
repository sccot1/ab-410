import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Page } from "@/components/shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FLASHCARDS } from "@/lib/content/flashcards";
import { DOMAINS } from "@/lib/content/domains";
import { useProgress, type CardBox } from "@/lib/progress";
import { useHydrated } from "@/lib/use-hydrated";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/tarjetas")({ component: Tarjetas });

function Tarjetas() {
  const hydrated = useHydrated();
  const boxes = useProgress((s) => s.flashBoxes);
  const setBox = useProgress((s) => s.setCardBox);
  const [filter, setFilter] = useState<"all" | "d1" | "d2" | "d3">("all");
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const deck = useMemo(() => {
    const list =
      filter === "all" ? FLASHCARDS : FLASHCARDS.filter((c) => c.domain === filter);
    return [...list].sort((a, b) => {
      const ba = hydrated ? (boxes[a.id] ?? 1) : 1;
      const bb = hydrated ? (boxes[b.id] ?? 1) : 1;
      return ba - bb;
    });
  }, [filter, boxes, hydrated]);

  const card = deck[i % Math.max(deck.length, 1)];

  function grade(up: boolean) {
    if (!card) return;
    const cur = (boxes[card.id] ?? 1) as CardBox;
    const next = (up ? Math.min(5, cur + 1) : 1) as CardBox;
    setBox(card.id, next);
    setFlipped(false);
    setI((n) => n + 1);
  }

  const mastered = hydrated
    ? FLASHCARDS.filter((c) => (boxes[c.id] ?? 1) >= 4).length
    : 0;

  return (
    <Page className="max-w-2xl">
      <p className="text-xs uppercase tracking-[0.2em] text-muted">Memoria</p>
      <h1 className="mt-2 font-display text-4xl">Tarjetas</h1>
      <p className="mt-3 text-muted">
        {FLASHCARDS.length} fichas. Si fallas, vuelven a la caja 1. Si aciertas,
        suben. Priorizamos las cajas bajas.
      </p>
      <p className="mt-2 text-sm text-subtle tabular-nums">
        Caja 4–5: {mastered}/{FLASHCARDS.length}
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        <Button
          size="sm"
          variant={filter === "all" ? "primary" : "secondary"}
          onClick={() => {
            setFilter("all");
            setI(0);
            setFlipped(false);
          }}
        >
          Todas
        </Button>
        {DOMAINS.map((d) => (
          <Button
            key={d.id}
            size="sm"
            variant={filter === d.id ? "primary" : "secondary"}
            onClick={() => {
              setFilter(d.id);
              setI(0);
              setFlipped(false);
            }}
          >
            D{d.code}
          </Button>
        ))}
      </div>

      {card ? (
        <button
          type="button"
          onClick={() => setFlipped((v) => !v)}
          className={cn(
            "mt-8 flex min-h-64 w-full flex-col items-start rounded-2xl border border-border bg-surface p-6 text-left",
          )}
        >
          <Badge tone="muted">{flipped ? "Reverso" : "Anverso"}</Badge>
          <p className="mt-6 font-display text-2xl leading-snug">
            {flipped ? card.back : card.front}
          </p>
          <p className="mt-auto pt-8 text-xs text-subtle">Toca para voltear</p>
        </button>
      ) : null}

      <div className="mt-5 grid grid-cols-2 gap-3">
        <Button variant="secondary" onClick={() => grade(false)}>
          La fallé
        </Button>
        <Button onClick={() => grade(true)}>La sabía</Button>
      </div>
    </Page>
  );
}
