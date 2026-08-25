import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as require_jsx_runtime, v as Link, z as notFound } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as Check, g as ArrowLeft, h as ArrowRight, p as Bookmark } from "../_libs/lucide-react.mjs";
import { C as cn, S as Button, a as Page, b as prevLesson, c as useProgress, h as DOMAINS, p as questionsForLesson, r as Route$1, v as getLesson, y as nextLesson } from "./router-BQQnFXN4.mjs";
import { t as Badge } from "./badge-NTxGHNCN.mjs";
import { t as useHydrated } from "./use-hydrated-DmhOHHTH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/leccion._id-w24dWgPT.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LessonBody({ blocks }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-col gap-5",
		children: blocks.map((b, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Block, { block: b }, i))
	});
}
function Block({ block }) {
	switch (block.type) {
		case "p": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "max-w-prose text-[1.05rem] leading-relaxed text-fg/90",
			children: block.text
		});
		case "h2": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-4 font-display text-2xl text-fg",
			children: block.text
		});
		case "h3": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "font-display text-xl text-fg",
			children: block.text
		});
		case "ul": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "max-w-prose list-disc space-y-2 pl-5 text-[1.05rem] leading-relaxed text-fg/90 marker:text-subtle",
			children: block.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: item }, item))
		});
		case "ol": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "max-w-prose list-decimal space-y-2 pl-5 text-[1.05rem] leading-relaxed text-fg/90 marker:text-subtle",
			children: block.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: item }, item))
		});
		case "callout": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: cn("max-w-prose rounded-xl border px-4 py-3.5", block.kind === "exam" && "border-accent/25 bg-accent/8", block.kind === "tip" && "border-ok/25 bg-ok/8", block.kind === "warn" && "border-warn/25 bg-warn/8"),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium uppercase tracking-[0.16em] text-muted",
					children: block.kind === "exam" ? "Examen" : block.kind === "tip" ? "Consejo" : "Cuidado"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 font-medium text-fg",
					children: block.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm leading-relaxed text-fg/80",
					children: block.text
				})
			]
		});
		case "table": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-x-auto rounded-xl border border-border",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full min-w-[32rem] text-left text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
					className: "bg-elevated text-muted",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: block.headers.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "px-3 py-2.5 font-medium",
						children: h
					}, h)) })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: block.rows.map((row, ri) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
					className: "border-t border-border align-top",
					children: row.map((cell, ci) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-3 py-2.5 leading-relaxed text-fg/90",
						children: cell
					}, ci))
				}, ri)) })]
			})
		});
		case "compare": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-3 sm:grid-cols-2",
			children: [block.left, block.right].map((side) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-border bg-surface p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-medium text-fg",
					children: side.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-2 space-y-1.5 text-sm text-fg/80",
					children: side.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-2 size-1 shrink-0 rounded-full bg-accent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item })]
					}, item))
				})]
			}, side.title))
		});
		case "steps": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "flex flex-col gap-3",
			children: block.items.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex gap-3 rounded-xl border border-border bg-surface p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex size-7 shrink-0 items-center justify-center rounded-full bg-elevated font-mono text-xs text-accent",
					children: i + 1
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-medium",
					children: s.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm leading-relaxed text-muted",
					children: s.text
				})] })]
			}, s.title))
		});
		default: return null;
	}
}
function LeccionPage() {
	const { id } = Route$1.useParams();
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
	(0, import_react.useEffect)(() => {
		setLast(lesson.id);
	}, [lesson.id, setLast]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, {
		className: "max-w-3xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/aprender",
				className: "inline-flex items-center gap-2 text-sm text-muted hover:text-fg",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), " Ruta"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: domain ? `Dominio ${domain.code}` : "Introducción" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
						tone: "muted",
						children: [lesson.minutes, " min"]
					}),
					done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						tone: "ok",
						children: "Completada"
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-4 font-display text-4xl",
				children: lesson.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-muted",
				children: lesson.summary
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: done ? "secondary" : "primary",
					onClick: () => done ? unmark(lesson.id) : mark(lesson.id),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" }), done ? "Completada" : "Marcar como hecha"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "ghost",
					onClick: () => toggleBookmark(lesson.id),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, { className: bookmarked ? "fill-accent text-accent" : "" }), bookmarked ? "Guardada" : "Guardar"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8 rounded-xl border border-border bg-surface p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xs uppercase tracking-[0.16em] text-muted",
					children: "Al terminar sabrás"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 space-y-2 text-sm text-fg/85",
					children: lesson.objectives.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-2 size-1 shrink-0 rounded-full bg-accent" }), o]
					}, o))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
				className: "mt-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LessonBody, { blocks: lesson.blocks })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-12 flex flex-col gap-3 rounded-2xl border border-border bg-surface p-5 sm:flex-row sm:items-center sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-medium",
					children: "Ponlo a prueba"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: quizCount ? `${quizCount} preguntas de este tema, con explicación.` : "Pasa al quiz del dominio cuando termines el bloque."
				})] }), quizCount ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/quiz/$id",
						params: { id: lesson.id },
						children: "Quiz del tema"
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/practicar",
						children: "Practicar"
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "mt-8 flex items-stretch justify-between gap-3",
				children: [prev ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/leccion/$id",
					params: { id: prev.id },
					className: "flex-1 rounded-xl border border-border p-4 hover:border-border-strong",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1 text-xs text-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-3.5" }), " Anterior"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-1 block text-sm",
						children: prev.title
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}), next ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/leccion/$id",
					params: { id: next.id },
					className: "flex-1 rounded-xl border border-border p-4 text-right hover:border-border-strong",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center justify-end gap-1 text-xs text-muted",
						children: ["Siguiente ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3.5" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-1 block text-sm",
						children: next.title
					})]
				}) : null]
			})
		]
	});
}
//#endregion
export { LeccionPage as component };
