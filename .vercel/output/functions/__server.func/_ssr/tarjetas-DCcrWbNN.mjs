import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as cn, S as Button, a as Page, c as useProgress, h as DOMAINS } from "./router-BQQnFXN4.mjs";
import { t as Badge } from "./badge-NTxGHNCN.mjs";
import { t as useHydrated } from "./use-hydrated-DmhOHHTH.mjs";
import { t as FLASHCARDS } from "./flashcards-Bb5JZWEV.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tarjetas-DCcrWbNN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Tarjetas() {
	const hydrated = useHydrated();
	const boxes = useProgress((s) => s.flashBoxes);
	const setBox = useProgress((s) => s.setCardBox);
	const [filter, setFilter] = (0, import_react.useState)("all");
	const [i, setI] = (0, import_react.useState)(0);
	const [flipped, setFlipped] = (0, import_react.useState)(false);
	const deck = (0, import_react.useMemo)(() => {
		return [...filter === "all" ? FLASHCARDS : FLASHCARDS.filter((c) => c.domain === filter)].sort((a, b) => {
			return (hydrated ? boxes[a.id] ?? 1 : 1) - (hydrated ? boxes[b.id] ?? 1 : 1);
		});
	}, [
		filter,
		boxes,
		hydrated
	]);
	const card = deck[i % Math.max(deck.length, 1)];
	function grade(up) {
		if (!card) return;
		const cur = boxes[card.id] ?? 1;
		const next = up ? Math.min(5, cur + 1) : 1;
		setBox(card.id, next);
		setFlipped(false);
		setI((n) => n + 1);
	}
	const mastered = hydrated ? FLASHCARDS.filter((c) => (boxes[c.id] ?? 1) >= 4).length : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, {
		className: "max-w-2xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs uppercase tracking-[0.2em] text-muted",
				children: "Memoria"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-4xl",
				children: "Tarjetas"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 text-muted",
				children: [FLASHCARDS.length, " fichas. Si fallas, vuelven a la caja 1. Si aciertas, suben. Priorizamos las cajas bajas."]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-sm text-subtle tabular-nums",
				children: [
					"Caja 4–5: ",
					mastered,
					"/",
					FLASHCARDS.length
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: filter === "all" ? "primary" : "secondary",
					onClick: () => {
						setFilter("all");
						setI(0);
						setFlipped(false);
					},
					children: "Todas"
				}), DOMAINS.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					variant: filter === d.id ? "primary" : "secondary",
					onClick: () => {
						setFilter(d.id);
						setI(0);
						setFlipped(false);
					},
					children: ["D", d.code]
				}, d.id))]
			}),
			card ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => setFlipped((v) => !v),
				className: cn("mt-8 flex min-h-64 w-full flex-col items-start rounded-2xl border border-border bg-surface p-6 text-left"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						tone: "muted",
						children: flipped ? "Reverso" : "Anverso"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 font-display text-2xl leading-snug",
						children: flipped ? card.back : card.front
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-auto pt-8 text-xs text-subtle",
						children: "Toca para voltear"
					})
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 grid grid-cols-2 gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					onClick: () => grade(false),
					children: "La fallé"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => grade(true),
					children: "La sabía"
				})]
			})
		]
	});
}
//#endregion
export { Tarjetas as component };
