import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Bookmark, Check } from "lucide-react";
import { useEffect } from "react";
import { LessonBody } from "@/components/lesson-body";
import { Page } from "@/components/shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getLesson, nextLesson, prevLesson } from "@/lib/content/lessons";
import { questionsForLesson } from "@/lib/content/questions";
import { DOMAINS } from "@/lib/content/domains";
import { useProgress } from "@/lib/progress";
import { useHydrated } from "@/lib/use-hydrated";

export const Route = createFileRoute("/leccion/$id")({
  component: LeccionPage,
});

function LeccionPage() {
  const { id } = Route.useParams();
  const lesson = getLesson(id);
  if (!lesson) throw notFound();

  const hydrated = useHydrated();
  const completed = useProgress((s) => s.completedLessons);
  const mark = useProgress((s) => s.markLesson);
  const unmark = useProgress((s) => s.unmarkLesson);
  const setLast = useProgress((s) => s.setLastLesson);
  const bookmarks = useProgress((s) => s.bookmarks);
  const toggleBookmark = useProgress((s) => s.toggleBookmark);
  const done = hydrated && completed.includes(lesson.id);
  const bookmarked = hydrated && bookmarks.includes(lesson.id);
  const prev = prevLesson(lesson.id);
  const next = nextLesson(lesson.id);
  const quizCount = questionsForLesson(lesson.id).length;
  const domain = DOMAINS.find((d) => d.id === lesson.domain);

  useEffect(() => {
    setLast(lesson.id);
  }, [lesson.id, setLast]);

  return (
    <Page className="max-w-3xl">
      <Link
        to="/aprender"
        className="inline-flex items-center gap-2 text-sm text-muted hover:text-fg"
      >
        <ArrowLeft className="size-4" /> Ruta
      </Link>
      <div className="mt-5 flex flex-wrap gap-2">
        <Badge>{domain ? `Dominio ${domain.code}` : "Introducción"}</Badge>
        <Badge tone="muted">{lesson.minutes} min</Badge>
        {done ? <Badge tone="ok">Completada</Badge> : null}
      </div>
      <h1 className="mt-4 font-display text-4xl">{lesson.title}</h1>
      <p className="mt-3 text-muted">{lesson.summary}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        <Button
          variant={done ? "secondary" : "primary"}
          onClick={() => (done ? unmark(lesson.id) : mark(lesson.id))}
        >
          <Check className="size-4" />
          {done ? "Completada" : "Marcar como hecha"}
        </Button>
        <Button variant="ghost" onClick={() => toggleBookmark(lesson.id)}>
          <Bookmark className={bookmarked ? "fill-accent text-accent" : ""} />
          {bookmarked ? "Guardada" : "Guardar"}
        </Button>
      </div>

      <section className="mt-8 rounded-xl border border-border bg-surface p-5">
        <h2 className="text-xs uppercase tracking-[0.16em] text-muted">
          Al terminar sabrás
        </h2>
        <ul className="mt-3 space-y-2 text-sm text-fg/85">
          {lesson.objectives.map((o) => (
            <li key={o} className="flex gap-2">
              <span className="mt-2 size-1 shrink-0 rounded-full bg-accent" />
              {o}
            </li>
          ))}
        </ul>
      </section>

      <article className="mt-10">
        <LessonBody blocks={lesson.blocks} />
      </article>

      <div className="mt-12 flex flex-col gap-3 rounded-2xl border border-border bg-surface p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-medium">Ponlo a prueba</p>
          <p className="text-sm text-muted">
            {quizCount
              ? `${quizCount} preguntas de este tema, con explicación.`
              : "Pasa al quiz del dominio cuando termines el bloque."}
          </p>
        </div>
        {quizCount ? (
          <Button asChild>
            <Link to="/quiz/$id" params={{ id: lesson.id }}>
              Quiz del tema
            </Link>
          </Button>
        ) : (
          <Button asChild>
            <Link to="/practicar">Practicar</Link>
          </Button>
        )}
      </div>

      <nav className="mt-8 flex items-stretch justify-between gap-3">
        {prev ? (
          <Link
            to="/leccion/$id"
            params={{ id: prev.id }}
            className="flex-1 rounded-xl border border-border p-4 hover:border-border-strong"
          >
            <span className="flex items-center gap-1 text-xs text-muted">
              <ArrowLeft className="size-3.5" /> Anterior
            </span>
            <span className="mt-1 block text-sm">{prev.title}</span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            to="/leccion/$id"
            params={{ id: next.id }}
            className="flex-1 rounded-xl border border-border p-4 text-right hover:border-border-strong"
          >
            <span className="flex items-center justify-end gap-1 text-xs text-muted">
              Siguiente <ArrowRight className="size-3.5" />
            </span>
            <span className="mt-1 block text-sm">{next.title}</span>
          </Link>
        ) : null}
      </nav>
    </Page>
  );
}
