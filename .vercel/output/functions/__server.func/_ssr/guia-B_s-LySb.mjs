import { b as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { S as Button, a as Page, c as useProgress, g as EXAM } from "./router-BQQnFXN4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/guia-B_s-LySb.js
var import_jsx_runtime = require_jsx_runtime();
function Guia() {
	const reset = useProgress((s) => s.resetAll);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, {
		className: "max-w-3xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs uppercase tracking-[0.2em] text-muted",
				children: "Día del examen"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-4xl",
				children: "Guía AB-410"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 text-muted",
				children: [
					EXAM.credential,
					". Examen ",
					EXAM.code,
					" · ",
					EXAM.name,
					"."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl",
					children: "Formato"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-3 list-disc space-y-2 pl-5 text-fg/85 marker:text-subtle",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
							"Duración: ",
							EXAM.durationMin,
							" minutos. Preguntas: ",
							EXAM.questionRange,
							"."
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
							"Aprobado: ",
							EXAM.passScore,
							" / ",
							EXAM.scaleMax,
							"."
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
							"Idioma base: ",
							EXAM.language,
							". 30 min extra si no está en tu idioma."
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
							"Precio de referencia: ",
							EXAM.priceUsd,
							" USD (varía por país). Pearson Vue, proctored."
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Microsoft Learn está disponible dentro del examen; el reloj no se detiene." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Escenarios con varias preguntas asociadas. Lee el caso una vez y responde el bloque." })
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl",
					children: "Checklist la semana previa"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
					className: "mt-3 list-decimal space-y-2 pl-5 text-fg/85 marker:text-subtle",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Dos simulacros en esta academia con ≥ 750. Revisa cada fallo en su lección." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Flashcards de cajas 1–2 a cero. Matriz de lógica (rule / BPF / flow / formula / prompt) de memoria." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Un lab real en un entorno Developer: tabla + prompt column + MDA + flujo de approval." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Repasa límites: 5 prompt columns, rollup asíncrono, delegación 500–2000, scope Entity." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Cuenta Pearson Vue, ID, prueba de hardware si es online proctored." })
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl",
					children: "Durante el examen"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-3 list-disc space-y-2 pl-5 text-fg/85 marker:text-subtle",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Primera pasada rápida. Marca las de escenario largo." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Cuando duden dos respuestas, elige el artefacto más específico y barato de mantener." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Learn: confirma un nombre de acción o un límite, no estudies un tema entero." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "No dejes en blanco: no hay penalización típica por fallo frente a omitir en este formato." })
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl",
					children: "Recursos oficiales"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-3 space-y-2 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							className: "text-accent hover:text-fg",
							href: "https://learn.microsoft.com/credentials/certifications/intelligent-applications-builder-associate/",
							target: "_blank",
							rel: "noreferrer",
							children: "Página de la certificación"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							className: "text-accent hover:text-fg",
							href: "https://learn.microsoft.com/credentials/certifications/resources/study-guides/ab-410",
							target: "_blank",
							rel: "noreferrer",
							children: "Study guide AB-410"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							className: "text-accent hover:text-fg",
							href: "https://learn.microsoft.com/training/courses/ab-410t00",
							target: "_blank",
							rel: "noreferrer",
							children: "Curso AB-410T00"
						}) })
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 flex flex-wrap gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/examen",
						children: "Lanzar simulacro"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					onClick: () => {
						if (confirm("Esto borra lecciones, quizzes y simulacros de este dispositivo.")) reset();
					},
					children: "Reiniciar progreso"
				})]
			})
		]
	});
}
//#endregion
export { Guia as component };
