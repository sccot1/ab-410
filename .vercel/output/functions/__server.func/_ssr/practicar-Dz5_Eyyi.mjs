import { b as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { S as Button, _ as LESSONS, a as Page, c as useProgress, f as questionsForDomain, h as DOMAINS, l as QUESTIONS, p as questionsForLesson } from "./router-BQQnFXN4.mjs";
import { t as Badge } from "./badge-NTxGHNCN.mjs";
import { t as useHydrated } from "./use-hydrated-DmhOHHTH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/practicar-Dz5_Eyyi.js
var import_jsx_runtime = require_jsx_runtime();
function Practicar() {
	const hydrated = useHydrated();
	const attempts = useProgress((s) => s.quizAttempts);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs uppercase tracking-[0.2em] text-muted",
			children: "Banco"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-2 font-display text-4xl",
			children: "Practicar"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-3 max-w-prose text-muted",
			children: [QUESTIONS.length, " preguntas de escenario, agrupadas como el study guide. En práctica ves la explicación al momento. El simulacro oculta el feedback hasta el final."]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/examen",
					children: "Simulacro completo"
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-10 grid gap-4 sm:grid-cols-3",
			children: DOMAINS.map((d) => {
				const qs = questionsForDomain(d.id);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/quiz/$id",
					params: { id: d.id },
					className: "rounded-2xl border border-border bg-surface p-5 hover:border-border-strong",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, { children: ["Dominio ", d.code] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-3 font-display text-xl leading-snug",
							children: d.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-sm text-muted",
							children: [qs.length, " preguntas"]
						})
					]
				}, d.id);
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-12 font-display text-2xl",
			children: "Por lección"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-4 divide-y divide-border rounded-2xl border border-border",
			children: LESSONS.filter((l) => questionsForLesson(l.id).length > 0).map((l) => {
				const n = questionsForLesson(l.id).length;
				const last = hydrated ? attempts.find((a) => a.quizId === l.id) : void 0;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/quiz/$id",
					params: { id: l.id },
					className: "flex items-center justify-between gap-3 px-4 py-3.5 hover:bg-elevated/50",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block text-sm font-medium",
						children: l.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-xs text-muted",
						children: [n, " preguntas"]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs tabular-nums text-subtle",
						children: last ? `${last.score}/${last.total}` : "Sin intentar"
					})]
				}) }, l.id);
			})
		})
	] });
}
//#endregion
export { Practicar as component };
