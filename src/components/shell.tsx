import { Link, useRouterState } from "@tanstack/react-router";
import {
  BookOpen,
  Boxes,
  ClipboardCheck,
  GraduationCap,
  Home,
  Layers,
  Menu,
  X,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { LESSONS } from "@/lib/content/lessons";
import { useProgress } from "@/lib/progress";

const NAV = [
  { to: "/", label: "Inicio", icon: Home },
  { to: "/aprender", label: "Aprender", icon: BookOpen },
  { to: "/practicar", label: "Practicar", icon: ClipboardCheck },
  { to: "/examen", label: "Examen", icon: GraduationCap },
  { to: "/tarjetas", label: "Tarjetas", icon: Layers },
  { to: "/labs", label: "Labs", icon: Boxes },
] as const;

export function Shell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const completed = useProgress((s) => s.completedLessons);
  const pct = LESSONS.length ? (completed.length / LESSONS.length) * 100 : 0;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div className="min-h-dvh bg-bg text-fg">
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-fg focus:px-3 focus:py-2 focus:text-bg"
      >
        Saltar al contenido
      </a>
      <header className="sticky top-0 z-40 border-b border-border bg-bg/90 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-4">
          <Link to="/" className="flex items-center gap-2.5">
            <Mark />
            <span className="font-display text-lg tracking-tight">Aether</span>
            <span className="hidden text-xs tracking-[0.18em] text-muted sm:inline">
              AB-410
            </span>
          </Link>
          <nav className="ml-6 hidden items-center gap-1 md:flex">
            {NAV.map((item) => (
              <NavLink key={item.to} {...item} pathname={pathname} />
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-3">
            <div className="hidden w-28 sm:block">
              <Progress value={pct} />
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
        {open ? (
          <nav className="border-t border-border px-3 py-2 md:hidden">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                {...item}
                pathname={pathname}
                className="flex h-11 w-full items-center justify-start gap-3 px-3"
              />
            ))}
            <Link
              to="/glosario"
              className="flex h-11 items-center px-3 text-sm text-muted"
            >
              Glosario
            </Link>
            <Link
              to="/guia"
              className="flex h-11 items-center px-3 text-sm text-muted"
            >
              Guía del examen
            </Link>
          </nav>
        ) : null}
      </header>
      <div id="contenido">{children}</div>
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-8 text-sm text-muted">
          <p>Aether · preparación AB-410. Progreso en este dispositivo.</p>
          <div className="flex gap-4">
            <Link to="/glosario" className="hover:text-fg">
              Glosario
            </Link>
            <Link to="/guia" className="hover:text-fg">
              Guía
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function NavLink({
  to,
  label,
  icon: Icon,
  pathname,
  className,
}: {
  to: string;
  label: string;
  icon: typeof Home;
  pathname: string;
  className?: string;
}) {
  const active =
    to === "/"
      ? pathname === "/"
      : pathname === to || pathname.startsWith(`${to}/`);
  return (
    <Link
      to={to}
      className={cn(
        "inline-flex h-9 items-center gap-2 rounded-[10px] px-3 text-sm text-muted transition-colors duration-150 hover:text-fg",
        active && "bg-elevated text-fg",
        className,
      )}
    >
      <Icon className="size-4" />
      {label}
    </Link>
  );
}

export function Mark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("size-6 text-accent", className)}
      aria-hidden
    >
      <path
        d="M12 2.5 20.5 12 12 21.5 3.5 12 12 2.5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M12 7.5 16.5 12 12 16.5 7.5 12 12 7.5Z"
        fill="currentColor"
        opacity="0.85"
      />
    </svg>
  );
}

export function Page({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <main className={cn("mx-auto w-full max-w-6xl px-4 py-8 sm:py-10", className)}>
      {children}
    </main>
  );
}
