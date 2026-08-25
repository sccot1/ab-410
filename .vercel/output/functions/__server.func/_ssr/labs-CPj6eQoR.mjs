import { b as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as Check } from "../_libs/lucide-react.mjs";
import { a as Page, c as useProgress, h as DOMAINS } from "./router-BQQnFXN4.mjs";
import { t as Badge } from "./badge-NTxGHNCN.mjs";
import { t as useHydrated } from "./use-hydrated-DmhOHHTH.mjs";
import { t as LABS } from "./labs-DB0IHoVw.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/labs-CPj6eQoR.js
var import_jsx_runtime = require_jsx_runtime();
function LabsPage() {
	const hydrated = useHydrated();
	const done = useProgress((s) => s.completedLabs);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs uppercase tracking-[0.2em] text-muted",
			children: "Escenarios"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-2 font-display text-4xl",
			children: "Laboratorios"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 max-w-prose text-muted",
			children: "Seis casos de negocio como los del examen. No se conectan a tu tenant: son guías para replicar en un entorno Developer. Cada paso dice qué harías y por qué cae en AB-410."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-8 grid gap-4 md:grid-cols-2",
			children: LABS.map((lab) => {
				const domain = DOMAINS.find((d) => d.id === lab.domain);
				const complete = hydrated && done.includes(lab.id);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/lab/$id",
					params: { id: lab.id },
					className: "flex h-full flex-col rounded-2xl border border-border bg-surface p-5 hover:border-border-strong",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, { children: ["Dominio ", domain?.code] }), complete ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1 text-xs text-ok",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5" }), " Hecho"]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs tabular-nums text-subtle",
								children: [lab.minutes, " min"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-3 font-display text-xl leading-snug",
							children: lab.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 line-clamp-3 text-sm text-muted",
							children: lab.scenario
						})
					]
				}) }, lab.id);
			})
		})
	] });
}
//#endregion
export { LabsPage as component };
