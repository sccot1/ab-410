import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as require_jsx_runtime, v as Link, z as notFound } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as Check, t as X, u as ChevronRight } from "../_libs/lucide-react.mjs";
import { C as cn, S as Button, a as Page, c as useProgress, f as questionsForDomain, h as DOMAINS, l as QUESTIONS, m as scaledScore, n as Route, p as questionsForLesson, u as isCorrect, v as getLesson } from "./router-BQQnFXN4.mjs";
import { t as Badge } from "./badge-NTxGHNCN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/quiz._id-B0_dhffi.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function QuizPlayer({ quizId, title, questions, examMode = false }) {
	const [index, setIndex] = (0, import_react.useState)(0);
	const [selected, setSelected] = (0, import_react.useState)([]);
	const [revealed, setRevealed] = (0, import_react.useState)(false);
	const [answers, setAnswers] = (0, import_react.useState)({});
	const [done, setDone] = (0, import_react.useState)(false);
	const addQuiz = useProgress((s) => s.addQuizAttempt);
	const q = questions[index];
	const multi = (q?.correct.length ?? 0) > 1;
	const result = (0, import_react.useMemo)(() => {
		if (!done) return null;
		let correct = 0;
		const correctIds = [];
		const missedIds = [];
		for (const item of questions) {
			const sel = answers[item.id] ?? [];
			if (isCorrect(item, sel)) {
				correct += 1;
				correctIds.push(item.id);
			} else missedIds.push(item.id);
		}
		return {
			correct,
			total: questions.length,
			scaled: scaledScore(correct, questions.length),
			correctIds,
			missedIds
		};
	}, [
		done,
		answers,
		questions
	]);
	if (!q && !done) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-muted",
		children: "No hay preguntas en este bloque todavía."
	});
	if (done && result) {
		const passed = result.scaled >= 700;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs uppercase tracking-[0.18em] text-muted",
					children: title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "mt-2 font-display text-4xl",
					children: [result.scaled, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xl text-muted",
						children: " / 1000"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-muted",
					children: [
						result.correct,
						" de ",
						result.total,
						" correctas.",
						" ",
						passed ? "Por encima del corte 700." : "Por debajo de 700. Repasa los fallos."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						tone: passed ? "ok" : "warn",
						children: passed ? "Aprobado (simulado)" : "A reforzar"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, { children: [Math.round(result.correct / result.total * 100), "%"] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-8 space-y-3",
					children: questions.map((item) => {
						const ok = result.correctIds.includes(item.id);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "rounded-xl border border-border bg-surface p-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start gap-2",
								children: [ok ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mt-0.5 size-4 text-ok" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "mt-0.5 size-4 text-danger" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm leading-relaxed",
										children: item.stem
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-sm text-muted",
										children: item.explanation
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-2 text-xs text-subtle",
										children: ["Correcta: ", item.correct.map((i) => item.choices[i]).join(" · ")]
									})
								] })]
							})
						}, item.id);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 flex flex-wrap gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: () => {
							setIndex(0);
							setSelected([]);
							setRevealed(false);
							setAnswers({});
							setDone(false);
						},
						children: "Repetir"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/practicar",
							children: "Más práctica"
						})
					})]
				})
			]
		});
	}
	function toggle(i) {
		if (revealed) return;
		if (multi) setSelected((prev) => prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]);
		else setSelected([i]);
	}
	function commit() {
		if (!q || selected.length === 0) return;
		const nextAnswers = {
			...answers,
			[q.id]: selected
		};
		setAnswers(nextAnswers);
		if (!examMode) {
			setRevealed(true);
			return;
		}
		goNext(nextAnswers);
	}
	function goNext(ans = answers) {
		if (index + 1 >= questions.length) {
			finish(ans);
			return;
		}
		setIndex((n) => n + 1);
		setSelected([]);
		setRevealed(false);
	}
	function finish(ans) {
		const correctIds = [];
		const missedIds = [];
		let hits = 0;
		for (const item of questions) {
			const sel = ans[item.id] ?? [];
			if (isCorrect(item, sel)) {
				hits += 1;
				correctIds.push(item.id);
			} else missedIds.push(item.id);
		}
		addQuiz({
			quizId,
			score: hits,
			total: questions.length,
			correctIds,
			missedIds,
			at: Date.now()
		});
		setDone(true);
	}
	const okNow = q ? isCorrect(q, selected) : false;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-2xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-3 text-sm text-muted",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "uppercase tracking-[0.16em]",
					children: title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "tabular-nums",
					children: [
						index + 1,
						" / ",
						questions.length
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 h-1 overflow-hidden rounded-full bg-elevated",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-full bg-accent transition-[width] duration-300",
					style: { width: `${(index + (revealed ? 1 : 0)) / questions.length * 100}%` }
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-6 font-display text-2xl leading-snug sm:text-3xl",
				children: q.stem
			}),
			multi ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: "Puede haber más de una respuesta correcta."
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-6 flex flex-col gap-2",
				children: q.choices.map((choice, i) => {
					const on = selected.includes(i);
					const isRight = q.correct.includes(i);
					const show = revealed;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => toggle(i),
						className: cn("flex min-h-12 w-full items-start gap-3 rounded-xl border px-4 py-3 text-left text-sm leading-relaxed transition-colors duration-150", "border-border bg-surface hover:border-border-strong", on && !show && "border-accent/50 bg-accent/10", show && isRight && "border-ok/40 bg-ok/10", show && on && !isRight && "border-danger/40 bg-danger/10"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-0.5 font-mono text-xs text-muted",
							children: String.fromCharCode(65 + i)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: choice })]
					}) }, choice);
				})
			}),
			revealed ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 rounded-xl border border-border bg-elevated/60 p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: cn("text-sm font-medium", okNow ? "text-ok" : "text-danger"),
					children: okNow ? "Correcto" : "Incorrecto"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm leading-relaxed text-fg/80",
					children: q.explanation
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 flex gap-3",
				children: !revealed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: commit,
					disabled: selected.length === 0,
					children: examMode ? "Siguiente" : "Comprobar"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: () => goNext(),
					children: [index + 1 >= questions.length ? "Ver resultado" : "Siguiente", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {})]
				})
			})
		]
	});
}
function QuizPage() {
	const { id } = Route.useParams();
	const lesson = getLesson(id);
	const domain = DOMAINS.find((d) => d.id === id);
	let questions = questionsForLesson(id);
	let title = lesson?.title ?? "";
	if (domain) {
		questions = questionsForDomain(id);
		title = `Dominio ${domain.code}`;
	}
	if (id === "all") {
		questions = QUESTIONS;
		title = "Banco completo";
	}
	if (!questions.length && !lesson && !domain && id !== "all") throw notFound();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/practicar",
		className: "text-sm text-muted hover:text-fg",
		children: "← Practicar"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuizPlayer, {
			quizId: id,
			title,
			questions
		})
	})] });
}
//#endregion
export { QuizPage as component };
