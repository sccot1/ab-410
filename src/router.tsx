import { createRouter } from "@tanstack/react-router";
import { AppErrorComponent } from "@/lib/error-component";
import { routeTree } from "./routeTree.gen";

function NotFound() {
  return (
    <main className="mx-auto max-w-lg px-4 py-20 text-center">
      <p className="text-xs uppercase tracking-[0.2em] text-muted">404</p>
      <h1 className="mt-2 font-display text-3xl">No está en el temario</h1>
      <p className="mt-2 text-muted">Esa ruta no existe. Vuelve al inicio o a la ruta de estudio.</p>
      <a href="/" className="mt-6 inline-block text-sm text-accent">
        Ir al inicio
      </a>
    </main>
  );
}

export function getRouter() {
  return createRouter({
    routeTree,
    defaultErrorComponent: AppErrorComponent,
    defaultNotFoundComponent: NotFound,
  });
}
