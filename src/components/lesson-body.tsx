import type { LessonBlock } from "@/lib/content/types";
import { cn } from "@/lib/utils";

export function LessonBody({ blocks }: { blocks: LessonBlock[] }) {
  return (
    <div className="flex flex-col gap-5">
      {blocks.map((b, i) => (
        <Block key={i} block={b} />
      ))}
    </div>
  );
}

function Block({ block }: { block: LessonBlock }) {
  switch (block.type) {
    case "p":
      return <p className="max-w-prose text-[1.05rem] leading-relaxed text-fg/90">{block.text}</p>;
    case "h2":
      return (
        <h2 className="mt-4 font-display text-2xl text-fg">{block.text}</h2>
      );
    case "h3":
      return <h3 className="font-display text-xl text-fg">{block.text}</h3>;
    case "ul":
      return (
        <ul className="max-w-prose list-disc space-y-2 pl-5 text-[1.05rem] leading-relaxed text-fg/90 marker:text-subtle">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="max-w-prose list-decimal space-y-2 pl-5 text-[1.05rem] leading-relaxed text-fg/90 marker:text-subtle">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      );
    case "callout":
      return (
        <aside
          className={cn(
            "max-w-prose rounded-xl border px-4 py-3.5",
            block.kind === "exam" && "border-accent/25 bg-accent/8",
            block.kind === "tip" && "border-ok/25 bg-ok/8",
            block.kind === "warn" && "border-warn/25 bg-warn/8",
          )}
        >
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted">
            {block.kind === "exam" ? "Examen" : block.kind === "tip" ? "Consejo" : "Cuidado"}
          </p>
          <p className="mt-1 font-medium text-fg">{block.title}</p>
          <p className="mt-1 text-sm leading-relaxed text-fg/80">{block.text}</p>
        </aside>
      );
    case "table":
      return (
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[32rem] text-left text-sm">
            <thead className="bg-elevated text-muted">
              <tr>
                {block.headers.map((h) => (
                  <th key={h} className="px-3 py-2.5 font-medium">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, ri) => (
                <tr key={ri} className="border-t border-border align-top">
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-3 py-2.5 leading-relaxed text-fg/90">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "compare":
      return (
        <div className="grid gap-3 sm:grid-cols-2">
          {[block.left, block.right].map((side) => (
            <div
              key={side.title}
              className="rounded-xl border border-border bg-surface p-4"
            >
              <p className="font-medium text-fg">{side.title}</p>
              <ul className="mt-2 space-y-1.5 text-sm text-fg/80">
                {side.items.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 size-1 shrink-0 rounded-full bg-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      );
    case "steps":
      return (
        <ol className="flex flex-col gap-3">
          {block.items.map((s, i) => (
            <li
              key={s.title}
              className="flex gap-3 rounded-xl border border-border bg-surface p-4"
            >
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-elevated font-mono text-xs text-accent">
                {i + 1}
              </span>
              <div>
                <p className="font-medium">{s.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      );
    default:
      return null;
  }
}
