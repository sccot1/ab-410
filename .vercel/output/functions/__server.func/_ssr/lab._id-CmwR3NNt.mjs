import { b as require_jsx_runtime, v as Link, z as notFound } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as Check, g as ArrowLeft } from "../_libs/lucide-react.mjs";
import { S as Button, a as Page, c as useProgress, h as DOMAINS, i as Route$2 } from "./router-BQQnFXN4.mjs";
import { t as Badge } from "./badge-NTxGHNCN.mjs";
import { t as useHydrated } from "./use-hydrated-DmhOHHTH.mjs";
import { t as LABS } from "./labs-DB0IHoVw.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/lab._id-CmwR3NNt.js
var import_jsx_runtime = require_jsx_runtime();
function LabPage() {
	const { id } = Route$2.useParams();
	const lab = LABS.find((l) => l.id === id);
	if (!lab) throw notFound();
	const domain = DOMAINS.find((d) => d.id === lab.domain);
	const hydrated = useHydrated();
	const done = useProgress((s) => s.completedLabs);
	const mark = useProgress((s) => s.markLab);
	const complete = hydrated && done.includes(lab.id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, {
		className: "max-w-3xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/labs",
				className: "inline-flex items-center gap-2 text-sm text-muted hover:text-fg",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), " Labs"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, { children: ["Dominio ", domain?.code] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
					tone: "muted",
					children: [lab.minutes, " min"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-4 font-display text-4xl",
				children: lab.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-[1.05rem] leading-relaxed text-fg/90",
				children: lab.scenario
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 rounded-xl border border-border bg-surface p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs uppercase tracking-[0.16em] text-muted",
					children: "Objetivo"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm",
					children: lab.goal
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mt-8 flex flex-col gap-4",
				children: lab.steps.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-xl border border-border p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-mono text-xs text-accent",
							children: ["Paso ", i + 1]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-1 font-display text-xl",
							children: s.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm leading-relaxed text-fg/85",
							children: s.detail
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 text-sm text-muted",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-subtle",
								children: "Por qué cae: "
							}), s.why]
						})
					]
				}, s.title))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "mt-6 rounded-xl border border-accent/25 bg-accent/8 p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs uppercase tracking-[0.16em] text-muted",
					children: "Ángulo de examen"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm leading-relaxed",
					children: lab.examAngle
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				className: "mt-8",
				variant: complete ? "secondary" : "primary",
				onClick: () => mark(lab.id),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {}), complete ? "Completado" : "Marcar laboratorio hecho"]
			})
		]
	});
}
//#endregion
export { LabPage as component };
