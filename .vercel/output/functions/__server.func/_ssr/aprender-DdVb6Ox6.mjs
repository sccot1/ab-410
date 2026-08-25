import { b as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as Check } from "../_libs/lucide-react.mjs";
import { C as cn, _ as LESSONS, a as Page, c as useProgress, h as DOMAINS, x as Progress } from "./router-BQQnFXN4.mjs";
import { t as Badge } from "./badge-NTxGHNCN.mjs";
import { t as useHydrated } from "./use-hydrated-DmhOHHTH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/aprender-DdVb6Ox6.js
var import_jsx_runtime = require_jsx_runtime();
function Aprender() {
	const hydrated = useHydrated();
	const completed = useProgress((s) => s.completedLessons);
	const intro = LESSONS.filter((l) => l.domain === "intro");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs uppercase tracking-[0.2em] text-muted",
			children: "Ruta"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-2 font-display text-4xl",
			children: "Aprender AB-410"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 max-w-prose text-muted",
			children: "Dieciséis lecciones en el orden del study guide. Marca cada una al terminar y pasa al quiz del tema."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
			className: "mt-10 flex flex-col gap-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl",
				children: "Antes de los dominios"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-4 flex flex-col gap-2",
				children: intro.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LessonRow, {
					id: l.id,
					title: l.title,
					minutes: l.minutes,
					summary: l.summary,
					done: hydrated && completed.includes(l.id)
				}, l.id))
			})] }), DOMAINS.map((d) => {
				const items = LESSONS.filter((l) => l.domain === d.id);
				const doneCount = hydrated ? items.filter((l) => completed.includes(l.id)).length : 0;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					id: d.id,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-end justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, { children: [
								"Dominio ",
								d.code,
								" · ",
								d.weight
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-3 font-display text-2xl",
								children: d.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 max-w-prose text-sm text-muted",
								children: d.blurb
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "w-40",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, { value: items.length ? doneCount / items.length * 100 : 0 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-xs tabular-nums text-subtle",
								children: [
									doneCount,
									"/",
									items.length
								]
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 flex flex-col gap-2",
						children: items.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LessonRow, {
							id: l.id,
							title: l.title,
							minutes: l.minutes,
							summary: l.summary,
							done: hydrated && completed.includes(l.id)
						}, l.id))
					})]
				}, d.id);
			})]
		})
	] });
}
function LessonRow({ id, title, minutes, summary, done }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/leccion/$id",
		params: { id },
		className: cn("flex gap-4 rounded-xl border border-border bg-surface px-4 py-3.5 transition-colors hover:border-border-strong", done && "border-ok/20"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn("mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border", done ? "border-ok/40 bg-ok/15 text-ok" : "border-border text-subtle"),
			children: done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5" }) : null
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "min-w-0 flex-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "flex flex-wrap items-baseline justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-medium",
					children: title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-xs tabular-nums text-subtle",
					children: [minutes, " min"]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mt-1 block text-sm text-muted",
				children: summary
			})]
		})]
	}) });
}
//#endregion
export { Aprender as component };
