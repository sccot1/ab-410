import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as Flag, r as Pause } from "../_libs/lucide-react.mjs";
import { C as cn, S as Button, a as Page, c as useProgress, d as pickExamQuestions, g as EXAM, m as scaledScore, u as isCorrect } from "./router-BQQnFXN4.mjs";
import { t as Badge } from "./badge-NTxGHNCN.mjs";
import { t as useHydrated } from "./use-hydrated-DmhOHHTH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/examen-ZdTmG24x.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var DURATION = EXAM.durationMin * 60;
var COUNT = 50;
function ExamenPage() {
	const hydrated = useHydrated();
	const attempts = useProgress((s) => s.examAttempts);
	const add = useProgress((s) => s.addExamAttempt);
	const [phase, setPhase] = (0, import_react.useState)("idle");
	const [seed] = (0, import_react.useState)(() => Date.now());
	const questions = (0, import_react.useMemo)(() => pickExamQuestions(COUNT, seed), [seed]);
	const [index, setIndex] = (0, import_react.useState)(0);
	const [answers, setAnswers] = (0, import_react.useState)({});
	const [flagged, setFlagged] = (0, import_react.useState)([]);
	const [left, setLeft] = (0, import_react.useState)(DURATION);
	const [startedAt, setStartedAt] = (0, import_react.useState)(0);
	const answersRef = (0, import_react.useRef)(answers);
	answersRef.current = answers;
	const phaseRef = (0, import_react.useRef)(phase);
	phaseRef.current = phase;
	(0, import_react.useEffect)(() => {
		if (phase !== "live") return;
		const t = window.setInterval(() => {
			setLeft((s) => {
				if (s <= 1) {
					window.clearInterval(t);
					return 0;
				}
				return s - 1;
			});
		}, 1e3);
		return () => window.clearInterval(t);
	}, [phase]);
	(0, import_react.useEffect)(() => {
		if (phase === "live" && left === 0) finish();
	}, [left, phase]);
	const q = questions[index];
	function start() {
		setPhase("live");
		setStartedAt(Date.now());
		setIndex(0);
		setAnswers({});
		setFlagged([]);
		setLeft(DURATION);
	}
	function finish() {
		if (phaseRef.current === "done") return;
		const ans = answersRef.current;
		let hits = 0;
		for (const item of questions) if (isCorrect(item, ans[item.id] ?? [])) hits += 1;
		const scaled = scaledScore(hits, questions.length);
		add({
			id: String(seed),
			score: hits,
			scaled,
			passed: scaled >= EXAM.passScore,
			total: questions.length,
			correct: hits,
			flagged,
			answers: ans,
			questionIds: questions.map((x) => x.id),
			at: Date.now(),
			durationSec: Math.round((Date.now() - startedAt) / 1e3)
		});
		setPhase("done");
	}
	if (phase === "idle") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, {
		className: "max-w-2xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs uppercase tracking-[0.2em] text-muted",
				children: "Simulacro"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-4xl",
				children: "Examen AB-410"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 text-muted",
				children: [
					COUNT,
					" preguntas ponderadas (≈28% dominio 1, 28% dominio 2, 44% dominio 3). ",
					EXAM.durationMin,
					" minutos. Sin pistas hasta el final. Corte ",
					EXAM.passScore,
					"/",
					EXAM.scaleMax,
					"."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "mt-6 space-y-2 text-sm text-fg/85",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Puedes marcar para revisar y navegar libremente." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Al agotarse el tiempo se entrega solo." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Microsoft Learn no está aquí: entrena a decidir sin buscar." })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "mt-8",
				onClick: start,
				children: "Empezar cronómetro"
			}),
			hydrated && attempts.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl",
					children: "Intentos"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 divide-y divide-border rounded-xl border border-border",
					children: attempts.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex justify-between px-4 py-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: new Date(a.at).toLocaleString("es") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "tabular-nums",
							children: [
								a.scaled,
								" · ",
								a.passed ? "apto" : "no apto"
							]
						})]
					}, a.id + a.at))
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-8 text-sm text-muted",
				children: ["¿Prefieres un bloque? ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/practicar",
					className: "text-accent",
					children: "Práctica por tema"
				})]
			})
		]
	});
	if (phase === "done") {
		const last = attempts[0];
		const scaled = last?.scaled ?? 0;
		const passed = scaled >= EXAM.passScore;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, {
			className: "max-w-3xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs uppercase tracking-[0.2em] text-muted",
					children: "Resultado"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "mt-2 font-display text-5xl tabular-nums",
					children: [scaled, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-2xl text-muted",
						children: [" / ", EXAM.scaleMax]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					tone: passed ? "ok" : "warn",
					className: "mt-3",
					children: passed ? "Corte 700 superado" : "Por debajo de 700"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-4 text-muted",
					children: [
						last?.correct,
						" / ",
						last?.total,
						" aciertos. Esto es una escala lineal de práctica; el scoring real de Microsoft no es público."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReviewList, {
					questions,
					answers
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 flex gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: () => window.location.reload(),
						children: "Otro intento"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/aprender",
							children: "Volver a la ruta"
						})
					})]
				})
			]
		});
	}
	const selected = answers[q.id] ?? [];
	const multi = q.correct.length > 1;
	const mm = String(Math.floor(left / 60)).padStart(2, "0");
	const ss = String(left % 60).padStart(2, "0");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, {
		className: "max-w-3xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: cn("font-mono text-sm tabular-nums", left < 300 && "text-danger"),
						children: [
							mm,
							":",
							ss
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted tabular-nums",
						children: [
							index + 1,
							" / ",
							questions.length
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "ghost",
							size: "sm",
							onClick: () => setFlagged((f) => f.includes(q.id) ? f.filter((x) => x !== q.id) : [...f, q.id]),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flag, { className: flagged.includes(q.id) ? "text-warn" : "" }), "Marcar"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							size: "sm",
							onClick: finish,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, {}), " Entregar"]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 flex flex-wrap gap-1",
				children: questions.map((item, i) => {
					const answered = (answers[item.id] ?? []).length > 0;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setIndex(i),
						className: cn("size-8 rounded-md text-xs tabular-nums", i === index && "bg-fg text-bg", i !== index && answered && "bg-elevated text-fg", i !== index && !answered && "bg-transparent text-muted", flagged.includes(item.id) && i !== index && "ring-1 ring-warn/50"),
						children: i + 1
					}, item.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-8 font-display text-2xl leading-snug",
				children: q.stem
			}),
			multi ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: "Selecciona todas las que apliquen."
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-6 flex flex-col gap-2",
				children: q.choices.map((c, i) => {
					const on = selected.includes(i);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => {
							setAnswers((prev) => {
								const cur = prev[q.id] ?? [];
								const next = multi ? cur.includes(i) ? cur.filter((x) => x !== i) : [...cur, i] : [i];
								return {
									...prev,
									[q.id]: next
								};
							});
						},
						className: cn("flex min-h-12 w-full items-start gap-3 rounded-xl border px-4 py-3 text-left text-sm", on ? "border-accent/50 bg-accent/10" : "border-border bg-surface hover:border-border-strong"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-xs text-muted",
							children: String.fromCharCode(65 + i)
						}), c]
					}) }, c);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					disabled: index === 0,
					onClick: () => setIndex((i) => i - 1),
					children: "Anterior"
				}), index + 1 < questions.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => setIndex((i) => i + 1),
					children: "Siguiente"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: finish,
					children: "Entregar examen"
				})]
			})
		]
	});
}
function ReviewList({ questions, answers }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "mt-8 space-y-3",
		children: questions.map((item, i) => {
			const ok = isCorrect(item, answers[item.id] ?? []);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "rounded-xl border border-border p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted tabular-nums",
						children: [
							i + 1,
							" · ",
							ok ? "Acierto" : "Fallo",
							" · ",
							item.topic
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm",
						children: item.stem
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: item.explanation
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/leccion/$id",
						params: { id: item.lessonId },
						className: "mt-2 inline-block text-xs text-accent",
						children: "Ir a la lección"
					})
				]
			}, item.id);
		})
	});
}
//#endregion
export { ExamenPage as component };
