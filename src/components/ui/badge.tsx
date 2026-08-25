import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export function Badge({
  className,
  tone = "muted",
  ...props
}: HTMLAttributes<HTMLSpanElement> & {
  tone?: "muted" | "accent" | "ok" | "warn" | "danger";
}) {
  const tones = {
    muted: "bg-elevated text-muted border-border",
    accent: "bg-accent/15 text-accent border-accent/20",
    ok: "bg-ok/12 text-ok border-ok/20",
    warn: "bg-warn/12 text-warn border-warn/20",
    danger: "bg-danger/12 text-danger border-danger/20",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium tracking-wide",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
