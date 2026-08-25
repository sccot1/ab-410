import { createFileRoute, Link } from "@tanstack/react-router";
import { Page } from "@/components/shell";
import { Button } from "@/components/ui/button";
import { EXAM } from "@/lib/content/domains";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/guia")({ component: Guia });

function Guia() {
  const reset = useProgress((s) => s.resetAll);

  return (
    <Page className="max-w-3xl">
      <p className="text-xs uppercase tracking-[0.2em] text-muted">Día del examen</p>
      <h1 className="mt-2 font-display text-4xl">Guía AB-410</h1>
      <p className="mt-3 text-muted">
        {EXAM.credential}. Examen {EXAM.code} · {EXAM.name}.
      </p>

      <section className="mt-10">
        <h2 className="font-display text-2xl">Formato</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-fg/85 marker:text-subtle">
          <li>Duración: {EXAM.durationMin} minutos. Preguntas: {EXAM.questionRange}.</li>
          <li>Aprobado: {EXAM.passScore} / {EXAM.scaleMax}.</li>
          <li>Idioma base: {EXAM.language}. 30 min extra si no está en tu idioma.</li>
          <li>Precio de referencia: {EXAM.priceUsd} USD (varía por país). Pearson Vue, proctored.</li>
          <li>Microsoft Learn está disponible dentro del examen; el reloj no se detiene.</li>
          <li>Escenarios con varias preguntas asociadas. Lee el caso una vez y responde el bloque.</li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl">Checklist la semana previa</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-fg/85 marker:text-subtle">
          <li>Dos simulacros en esta academia con ≥ 750. Revisa cada fallo en su lección.</li>
          <li>Flashcards de cajas 1–2 a cero. Matriz de lógica (rule / BPF / flow / formula / prompt) de memoria.</li>
          <li>Un lab real en un entorno Developer: tabla + prompt column + MDA + flujo de approval.</li>
          <li>Repasa límites: 5 prompt columns, rollup asíncrono, delegación 500–2000, scope Entity.</li>
          <li>Cuenta Pearson Vue, ID, prueba de hardware si es online proctored.</li>
        </ol>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl">Durante el examen</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-fg/85 marker:text-subtle">
          <li>Primera pasada rápida. Marca las de escenario largo.</li>
          <li>Cuando duden dos respuestas, elige el artefacto más específico y barato de mantener.</li>
          <li>Learn: confirma un nombre de acción o un límite, no estudies un tema entero.</li>
          <li>No dejes en blanco: no hay penalización típica por fallo frente a omitir en este formato.</li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl">Recursos oficiales</h2>
        <ul className="mt-3 space-y-2 text-sm">
          <li>
            <a className="text-accent hover:text-fg" href="https://learn.microsoft.com/credentials/certifications/intelligent-applications-builder-associate/" target="_blank" rel="noreferrer">
              Página de la certificación
            </a>
          </li>
          <li>
            <a className="text-accent hover:text-fg" href="https://learn.microsoft.com/credentials/certifications/resources/study-guides/ab-410" target="_blank" rel="noreferrer">
              Study guide AB-410
            </a>
          </li>
          <li>
            <a className="text-accent hover:text-fg" href="https://learn.microsoft.com/training/courses/ab-410t00" target="_blank" rel="noreferrer">
              Curso AB-410T00
            </a>
          </li>
        </ul>
      </section>

      <div className="mt-10 flex flex-wrap gap-3">
        <Button asChild>
          <Link to="/examen">Lanzar simulacro</Link>
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            if (confirm("Esto borra lecciones, quizzes y simulacros de este dispositivo.")) {
              reset();
            }
          }}
        >
          Reiniciar progreso
        </Button>
      </div>
    </Page>
  );
}
