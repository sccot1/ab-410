import { b as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { h as ArrowRight, l as ClipboardCheck, m as BookOpen, s as GraduationCap } from "../_libs/lucide-react.mjs";
import { S as Button, _ as LESSONS, a as Page, c as useProgress, g as EXAM, h as DOMAINS, l as QUESTIONS, o as domainMastery, s as readinessScore, x as Progress } from "./router-BQQnFXN4.mjs";
import { t as Badge } from "./badge-NTxGHNCN.mjs";
import { t as useHydrated } from "./use-hydrated-DmhOHHTH.mjs";
import { t as LABS } from "./labs-DB0IHoVw.mjs";
import { t as FLASHCARDS } from "./flashcards-Bb5JZWEV.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CocJVbUP.js
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	const hydrated = useHydrated();
	const completed = useProgress((s) => s.completedLessons);
	const last = useProgress((s) => s.lastLessonId);
	const exams = useProgress((s) => s.examAttempts);
	const continueLesson = LESSONS.find((l) => l.id === last) ?? LESSONS.find((l) => !completed.includes(l.id)) ?? LESSONS[0];
	const ready = hydrated ? readinessScore() : 0;
	const lessonPct = LESSONS.length ? completed.length / LESSONS.length * 100 : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs uppercase tracking-[0.22em] text-muted",
					children: ["Microsoft · ", EXAM.code]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 max-w-xl font-display text-4xl leading-[1.08] sm:text-5xl",
					children: "Aprueba Intelligent Applications Builder."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-4 max-w-prose text-muted",
					children: [
						"Academia completa para ",
						EXAM.credential,
						". Lecciones alineadas al study guide, laboratorios, tarjetas y simulacros con corte 700/1000."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/leccion/$id",
							params: { id: continueLesson.id },
							children: [hydrated && last ? "Continuar" : "Empezar", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/examen",
							children: "Simulacro"
						})
					})]
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border border-border bg-surface p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-baseline justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: "Listo para el examen"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-3xl tabular-nums",
							children: ready
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
						value: ready / 10,
						className: "mt-3"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-xs text-subtle",
						children: "Combina lecciones, quizzes y el último simulacro. 700 es el corte oficial."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "mt-5 grid grid-cols-3 gap-3 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "Lecciones",
								value: `${hydrated ? completed.length : 0}/${LESSONS.length}`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "Preguntas",
								value: `${QUESTIONS.length}`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "Labs",
								value: `${LABS.length}`
							})
						]
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mt-14 grid gap-4 sm:grid-cols-3",
			children: DOMAINS.map((d) => {
				const m = hydrated ? domainMastery(d.id) : { score: 0 };
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/aprender",
					hash: d.id,
					className: "rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-border-strong",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, { children: ["Dominio ", d.code] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs tabular-nums text-muted",
								children: d.weight
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-4 font-display text-xl leading-snug",
							children: d.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted",
							children: d.blurb
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
							value: m.score * 100,
							className: "mt-4"
						})
					]
				}, d.id);
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-14 grid gap-4 md:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionCard, {
					icon: BookOpen,
					title: "Ruta de estudio",
					text: `${LESSONS.length} lecciones. Empieza por el mapa del examen y sigue el peso oficial.`,
					to: "/aprender",
					cta: "Abrir ruta"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionCard, {
					icon: ClipboardCheck,
					title: "Práctica por tema",
					text: `${QUESTIONS.length} preguntas de escenario. Feedback inmediato y explicación.`,
					to: "/practicar",
					cta: "Practicar"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionCard, {
					icon: GraduationCap,
					title: "Simulacro 120 min",
					text: "50 preguntas ponderadas por dominio. Puntuación 1000. Revisión al terminar.",
					to: "/examen",
					cta: "Lanzar examen"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-14 rounded-2xl border border-border bg-surface p-6 sm:p-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-end justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl",
						children: "El examen, en cifras"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: "Datos oficiales y de experiencia de beta. Úsalos para planificar, no para relajarte."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/guia",
							children: "Guía del día"
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Duración",
							value: `${EXAM.durationMin} min`,
							align: "left"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Preguntas",
							value: EXAM.questionRange,
							align: "left"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Aprobado",
							value: `${EXAM.passScore}+`,
							align: "left"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Tarjetas",
							value: `${FLASHCARDS.length}`,
							align: "left"
						})
					]
				}),
				hydrated && exams[0] ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-6 text-sm text-muted",
					children: [
						"Último simulacro: ",
						exams[0].scaled,
						" puntos ·",
						" ",
						exams[0].passed ? "corte superado" : "por debajo de 700",
						" ·",
						" ",
						new Date(exams[0].at).toLocaleDateString("es")
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-6 text-sm text-muted",
					children: [
						"Progreso de lecciones: ",
						hydrated ? Math.round(lessonPct) : 0,
						"%. Aún no hay simulacros."
					]
				})
			]
		})
	] });
}
function Stat({ label, value, align = "center" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: align === "center" ? "text-center" : "",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-xs uppercase tracking-[0.14em] text-subtle",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "mt-1 font-display text-xl tabular-nums",
			children: value
		})]
	});
}
function ActionCard({ icon: Icon, title, text, to, cta }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col rounded-2xl border border-border bg-surface p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5 text-accent" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-4 font-display text-xl",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 flex-1 text-sm text-muted",
				children: text
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to,
				className: "mt-4 text-sm text-accent hover:text-fg",
				children: [cta, " →"]
			})
		]
	});
}
//#endregion
export { Home as component };
