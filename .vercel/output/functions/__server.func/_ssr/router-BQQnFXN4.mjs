import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { _ as createRootRoute, b as require_jsx_runtime, d as useRouterState, g as createFileRoute, h as lazyRouteComponent, l as Scripts, m as Outlet, p as createRouter, u as HeadContent, v as Link, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Layers, f as Boxes, i as Menu, l as ClipboardCheck, m as BookOpen, n as TriangleAlert, o as House, s as GraduationCap, t as X } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-BQQnFXN4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: error.message || "An unexpected error occurred. Try reloading the page."
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	if (typeof window === "undefined") return () => {};
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	const parentOrigin = resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		if (envelope.data.type === "hello") {
			if (!HelloSchema.safeParse(event.data).success) return;
			announce();
			return;
		}
		if (envelope.data.type === "navigate") {
			const parsed = NavigateSchema.safeParse(event.data);
			if (!parsed.success) return;
			navigate(parsed.data.path);
			queueMicrotask(reportLocation);
			return;
		}
		if (envelope.data.type === "history") {
			const parsed = HistorySchema.safeParse(event.data);
			if (!parsed.success) return;
			if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
			window.history.go(parsed.data.delta);
		}
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-[opacity,transform,background-color,color,border-color] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70 focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-40 active:scale-[0.98] [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			primary: "bg-fg text-bg hover:opacity-90",
			secondary: "bg-elevated text-fg border border-border hover:border-border-strong",
			ghost: "bg-transparent text-fg hover:bg-elevated",
			outline: "bg-transparent text-fg border border-border hover:bg-elevated",
			danger: "bg-danger/15 text-danger hover:bg-danger/25"
		},
		size: {
			sm: "h-9 px-3 text-sm rounded-[10px]",
			md: "h-11 px-4 text-sm rounded-md",
			lg: "h-12 px-5 text-base rounded-lg",
			icon: "size-11 rounded-md"
		}
	},
	defaultVariants: {
		variant: "primary",
		size: "md"
	}
});
function Button({ className, variant, size, asChild, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		...props
	});
}
function Progress({ value, className }) {
	const clamped = Math.max(0, Math.min(100, value));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("h-1.5 w-full overflow-hidden rounded-full bg-elevated", className),
		role: "progressbar",
		"aria-valuenow": Math.round(clamped),
		"aria-valuemin": 0,
		"aria-valuemax": 100,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-full rounded-full bg-accent transition-[width] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
			style: { width: `${clamped}%` }
		})
	});
}
var INTRO_LESSONS = [{
	id: "intro",
	domain: "intro",
	order: 0,
	title: "Qué es AB-410 y cómo se aprueba",
	minutes: 12,
	summary: "El mapa del examen, el rol que Microsoft evalúa y una estrategia de estudio alineada a los pesos oficiales.",
	objectives: [
		"Identificar el rol Intelligent Applications Builder Associate",
		"Memorizar los tres dominios y sus pesos",
		"Elegir una estrategia de estudio de 2–4 semanas",
		"Conocer formato, puntuación y trampas típicas"
	],
	blocks: [
		{
			type: "p",
			text: "AB-410 (Building Intelligent Applications) es el examen de la certificación Microsoft Certified: Intelligent Applications Builder Associate. Sustituye de facto a PL-200: el centro ya no es el consultor funcional, sino quien construye soluciones de Power Platform con IA incrustada — Copilot, prompts, agentes, AI Hub — sobre Dataverse, apps y flujos."
		},
		{
			type: "h2",
			text: "Qué espera Microsoft de ti"
		},
		{
			type: "p",
			text: "El candidato diseña y construye soluciones con Copilot, lenguaje natural y low-code. Crea modelos de datos, model-driven apps, canvas apps, flujos y lógica de negocio. Integra agentes y funciones Copilot en canvas, model-driven y Power Pages. Colabora con administradores de entorno, gobierno (IA responsable, ALM) y stakeholders."
		},
		{
			type: "ul",
			items: [
				"Experiencia previa esperada: Dataverse, Power Apps, cloud flows, Power Fx, Copilot en maker studio, nociones de Copilot Studio y AI Hub.",
				"No es un examen de código C# ni de administración pura (eso es de otros roles). Sí pregunta seguridad, entornos y ALM lo suficiente para construir bien.",
				"La IA no se estudia aparte: se estudia cómo se añade a una solución que ya tiene tablas, apps y flujos."
			]
		},
		{
			type: "h2",
			text: "Dominios y pesos (study guide oficial)"
		},
		{
			type: "table",
			headers: [
				"Dominio",
				"Peso",
				"Qué cae"
			],
			rows: [
				[
					"1. Cimientos",
					"25–30%",
					"Requisitos, agentes built-in, extensibilidad, tipos de entorno, ALM, tablas, columnas, relaciones, prompt columns, row summaries, vistas, formularios, seguridad"
				],
				[
					"2. Aplicaciones inteligentes",
					"25–30%",
					"Model-driven (forms, views, generative pages, charts, acceso), canvas (datos, accesibilidad, componentes, variables, errores, Monitor, agente desde canvas)"
				],
				[
					"3. Lógica y automatización",
					"40–45%",
					"Cloud flows, aprobaciones, AI Hub (prompts y modelos), business rules, BPF, columnas calculated / rollup / formula"
				]
			]
		},
		{
			type: "callout",
			kind: "exam",
			title: "El dominio 3 pesa casi la mitad",
			text: "Quien solo estudia apps y se salta flujos, BPF y AI Hub llega al 55–60% y no cruza 700. Reserva al menos el 40% de tu tiempo a automatización y lógica."
		},
		{
			type: "h2",
			text: "Formato del día del examen"
		},
		{
			type: "ul",
			items: [
				"Duración típica: 120 minutos. 40–60 preguntas. Aprobado: 700 / 1000.",
				"Tipos: opción múltiple, varias correctas, escenarios con varias preguntas asociadas, a veces componentes interactivos.",
				"Microsoft Learn está disponible dentro del examen, pero el reloj no se detiene. Úsalo para confirmar un detalle (nombre de acción, límite), no para aprender un tema.",
				"Idioma: inglés de base. Si no está en tu idioma, puedes pedir 30 minutos extra.",
				"Precio de referencia: 165 USD (varía por país). Pearson Vue, proctored."
			]
		},
		{
			type: "h2",
			text: "Cómo se diferencia de PL-200 y PL-900"
		},
		{
			type: "compare",
			left: {
				title: "PL-200 (legado)",
				items: [
					"Persona: functional consultant",
					"Fuerte en Dataverse, MDA, BPF, reglas",
					"IA era un extra (AI Builder clásico)",
					"Menos énfasis en canvas avanzado y agentes"
				]
			},
			right: {
				title: "AB-410 (actual)",
				items: [
					"Persona: app builder con IA",
					"Mantiene el núcleo de Dataverse/apps/flujos",
					"Prompt columns, AI Hub, Copilot Studio, generative pages",
					"La IA se evalúa como capa sobre soluciones reales"
				]
			}
		},
		{
			type: "p",
			text: "Si vienes de cero, PL-900 sigue siendo un buen calentamiento. Si ya pasaste PL-200, no empieces de cero: refuerza Dataverse y BPF, y dedica bloques enteros a prompt columns, AI Hub, agentes y generative pages."
		},
		{
			type: "h2",
			text: "Estrategia de 3 semanas (esta academia)"
		},
		{
			type: "steps",
			items: [
				{
					title: "Semana 1 — Cimientos",
					text: "Lecciones del dominio 1 + laboratorio de modelo de datos. Quiz de cada lección hasta ≥80%. Flashcards de tablas, relaciones y seguridad cada día."
				},
				{
					title: "Semana 2 — Apps + automatización",
					text: "Dominios 2 y 3. Un lab de model-driven, uno de canvas y uno de flujo con aprobación y prompt. No pases de lección sin el quiz."
				},
				{
					title: "Semana 3 — Simulacros",
					text: "Dos o tres exámenes cronometrados de 50 preguntas. Revisa cada fallo con la lección. El objetivo no es memorizar la pregunta, es cerrar el hueco."
				}
			]
		},
		{
			type: "callout",
			kind: "tip",
			title: "Cómo piensa el examen",
			text: "Casi siempre hay un escenario de negocio. La respuesta correcta es la que usa el componente con el menor coste de mantenimiento y el scope correcto: regla de negocio si es un campo en formulario, flujo si hay conector o aprobación, BPF si hay etapas humanas, prompt column si el insight debe persistir en la fila."
		},
		{
			type: "h2",
			text: "Lo que esta app cubre — y lo que no"
		},
		{
			type: "p",
			text: "Aquí tienes el temario completo del study guide, preguntas al estilo del examen, flashcards, laboratorios guiados (simulados: no se conectan a tu tenant) y simulacros con puntuación 700/1000. No sustituye un tenant de desarrollador: si puedes, replica cada lab en make.powerapps.com. El progreso se guarda en este dispositivo."
		}
	]
}];
var D1_LESSONS = [
	{
		id: "d1-diseno",
		domain: "d1",
		order: 1,
		title: "Diseñar la solución con herramientas de IA",
		minutes: 16,
		summary: "De requisitos a componentes: cuándo app, flujo, agente o prompt; extensibilidad y agentes built-in.",
		objectives: [
			"Descomponer un requisito en tablas, apps, flujos y agentes",
			"Elegir entre agente built-in, Copilot Studio y AI Hub",
			"Recomendar opciones de extensibilidad (conectores, PCF, APIs)"
		],
		blocks: [
			{
				type: "p",
				text: "El primer skill del study guide es de arquitectura ligera: leer un requisito y decir qué piezas de Power Platform lo cubren, usando Copilot y lenguaje natural para acelerar, no para sustituir el diseño."
			},
			{
				type: "h2",
				text: "Mapear requisitos a componentes"
			},
			{
				type: "table",
				headers: [
					"Si el negocio pide…",
					"Piensa primero en…",
					"No uses esto si…"
				],
				rows: [
					[
						"Capturar y consultar registros con seguridad y vistas",
						"Tabla Dataverse + model-driven app",
						"La UI debe ser pixel-perfect o móvil muy custom (canvas)"
					],
					[
						"Formulario móvil / experiencia a medida",
						"Canvas app sobre Dataverse",
						"Necesitas grids avanzados, BPF y charts de MDA sin reinventarlos"
					],
					[
						"Reacción a un evento o integración",
						"Cloud flow (automatizado o instantáneo)",
						"La lógica cabe en una business rule o columna fórmula"
					],
					[
						"Conversación, Q&A sobre documentos, orquestación",
						"Agente (Copilot Studio) + knowledge",
						"Solo necesitas un resumen persistente de una fila (prompt column)"
					],
					[
						"Clasificar, extraer, resumir y guardar el resultado",
						"Prompt o modelo de AI Hub, o prompt column",
						"El usuario solo quiere un chat puntual sin persistir"
					]
				]
			},
			{
				type: "h2",
				text: "Agentes built-in vs. agentes que tú construyes"
			},
			{
				type: "p",
				text: "Microsoft incluye agentes y experiencias Copilot en Power Apps, Power Automate, Power Pages y Dataverse. El examen espera que sepas cuándo reutilizarlos y cuándo crear uno en Copilot Studio."
			},
			{
				type: "ul",
				items: [
					"Copilot en maker studio: genera tablas, apps, flujos y páginas a partir de lenguaje natural. Es una herramienta de construcción, no un agente de usuario final.",
					"Copilot en model-driven / canvas: ayuda al usuario a rellenar formularios, consultar datos o navegar. Se habilita a nivel de entorno y de app.",
					"Agentes de Copilot Studio: temas, respuestas generativas, knowledge (Dataverse, SharePoint, documentos), acciones (flujos, conectores). Se incrustan en apps y Power Pages.",
					"Desde una canvas app puedes crear un agente de Copilot Studio anclado a esa app y sus datos — skill explícito del dominio 2."
				]
			},
			{
				type: "callout",
				kind: "exam",
				title: "Trampa: Copilot para construir ≠ agente de negocio",
				text: "Si el escenario dice «los empleados preguntan por políticas y crean un caso», la respuesta es un agente con knowledge + acción, no «usar Copilot para generar la canvas app». El examen distingue maker-Copilot de runtime-agent."
			},
			{
				type: "h2",
				text: "Extensibilidad: el orden correcto"
			},
			{
				type: "ol",
				items: [
					"Configuración y low-code: tablas, fórmulas, flujos, prompts.",
					"Conectores estándar / premium y connection references.",
					"Custom connector o API custom si el sistema externo no tiene conector.",
					"PCF (Power Apps component framework) cuando el control visual no existe.",
					"Plugins / código (pro-dev) cuando la lógica debe ser síncrona transaccional en Dataverse — suele ser territorio del developer, no el foco de AB-410, pero debes saber recomendarlo."
				]
			},
			{
				type: "callout",
				kind: "tip",
				title: "IA responsable",
				text: "Gobierno espera: no enviar PII innecesaria a modelos, revisar outputs, respetar DLP, documentar prompts, y no usar IA donde una regla determinista basta. Si el escenario menciona compliance, prioriza persistir en Dataverse con seguridad de roles, no un chat suelto."
			}
		]
	},
	{
		id: "d1-entornos-alm",
		domain: "d1",
		order: 2,
		title: "Entornos, soluciones y ALM",
		minutes: 18,
		summary: "Qué entorno usar, managed vs unmanaged, pipelines, variables de entorno y connection references.",
		objectives: [
			"Recomendar el tipo de entorno correcto",
			"Elegir solución managed o unmanaged",
			"Explicar pipelines, publisher y componentes de ALM"
		],
		blocks: [
			{
				type: "h2",
				text: "Tipos de entorno"
			},
			{
				type: "table",
				headers: [
					"Tipo",
					"Para qué",
					"Cuidado"
				],
				rows: [
					[
						"Default",
						"Personal productivity del tenant. Uno por tenant.",
						"No lo uses para aplicaciones de negocio ni ALM serio. Capacidad y DLP limitados."
					],
					[
						"Developer",
						"Aprendizaje y desarrollo individual. Incluye Dataverse.",
						"No es de producción. Ideal para labs de AB-410."
					],
					[
						"Sandbox",
						"Dev/test. Se puede copiar y resetear.",
						"Copia (copy) para datos de prueba; reset para volver a cero."
					],
					[
						"Production",
						"Cargas reales de usuarios.",
						"Solo soluciones managed. Cambios por pipeline, no a mano."
					],
					[
						"Teams",
						"Apps embebidas en Teams, Dataverse for Teams.",
						"Límites de capacidad y de objetos. Escalar a Dataverse completo cuando crezcan."
					],
					[
						"Trial",
						"Evaluación temporal.",
						"Caduca. No bases un proyecto real aquí."
					]
				]
			},
			{
				type: "callout",
				kind: "exam",
				title: "Pregunta clásica de entorno",
				text: "«Un maker quiere probar una app con Dataverse sin afectar producción» → Developer o Sandbox, nunca Default ni Production. Si dice «el equipo necesita copiar prod a test» → Sandbox con copy."
			},
			{
				type: "h2",
				text: "Soluciones: el contenedor de ALM"
			},
			{
				type: "compare",
				left: {
					title: "Unmanaged",
					items: [
						"Se edita en DEV",
						"Capa no administrada",
						"Exportas como unmanaged (backup de fuente) o managed (para destinos)",
						"Nunca como destino de producción"
					]
				},
				right: {
					title: "Managed",
					items: [
						"Se instala en TEST/PROD",
						"Bloquea edición directa",
						"Se actualiza / upgrade / patch",
						"Se desinstala limpiando componentes (según dependencias)"
					]
				}
			},
			{
				type: "ul",
				items: [
					"Crea tu propia solución y un publisher con prefijo (p. ej. aet). Nunca trabajes en Default Solution.",
					"Añade componentes existentes a la solución; no los dupliques. Usa Add required components con criterio: no metas todo el sistema.",
					"Environment variables: URLs, keys de config, IDs que cambian entre DEV y PROD. Se rellenan en el deployment.",
					"Connection references: el flujo no lleva la conexión cruda; el destino enlaza su propia conexión.",
					"Pipelines in Power Platform: DEV → TEST → PROD con aprobaciones. Prefiérelo a export/import manual cuando el escenario es empresarial."
				]
			},
			{
				type: "h2",
				text: "Estrategia que el examen quiere oír"
			},
			{
				type: "ol",
				items: [
					"Un entorno DEV (sandbox o developer) con soluciones unmanaged.",
					"TEST sandbox, import managed, pruebas de seguridad y de IA (créditos, DLP).",
					"PROD production, solo managed vía pipeline.",
					"Solution checker antes de exportar. No incluir claves secretas en fórmulas: environment variables + Azure Key Vault si aplica."
				]
			},
			{
				type: "callout",
				kind: "warn",
				title: "Block unmanaged customizations",
				text: "Si el entorno tiene bloqueadas las personalizaciones unmanaged, no podrás crear o editar prompt columns ni otros objetos fuera de solución managed. En DEV debe estar permitido."
			}
		]
	},
	{
		id: "d1-dataverse",
		domain: "d1",
		order: 3,
		title: "Modelar Dataverse: tablas, columnas y relaciones",
		minutes: 22,
		summary: "El corazón del examen: tablas estándar vs custom, propiedades, columnas y comportamientos de relación.",
		objectives: [
			"Crear tablas y configurar propiedades",
			"Elegir el tipo de columna correcto",
			"Configurar relaciones y cascading"
		],
		blocks: [
			{
				type: "p",
				text: "Dataverse es la plataforma de datos del examen. Casi todos los escenarios empiezan aquí. Trabajas en el data workspace de Power Apps: tablas, columnas, relaciones, vistas y formularios en un solo sitio, a menudo con Copilot («crea una tabla de incidencias con prioridad y cliente»)."
			},
			{
				type: "h2",
				text: "Tablas"
			},
			{
				type: "ul",
				items: [
					"Estándar (Account, Contact, User, etc.): reutilízalas. No clones Contact en una tabla «Persona».",
					"Custom: cuando el negocio no encaja. Define display name, plural, primary column (normalmente texto), ownership.",
					"Activity tables: para correos, tareas, citas. Aparecen en el timeline.",
					"Virtual tables: datos externos en tiempo real sin copiar. Útiles para integración; no para lógica pesada offline.",
					"Elastic tables: alto volumen, esquema flexible. Casos de telemetría, no de CRM clásico."
				]
			},
			{
				type: "h3",
				text: "Propiedades que caen en el examen"
			},
			{
				type: "table",
				headers: [
					"Propiedad",
					"Opciones",
					"Impacto"
				],
				rows: [
					[
						"Ownership",
						"User/Team vs Organization",
						"User/Team permite privilegios a nivel de usuario/BU. Organization es de toda la org (p. ej. una tabla de países)."
					],
					[
						"Record image",
						"Sí / no",
						"Imagen primaria en formularios y vistas."
					],
					[
						"Duplicate detection",
						"Reglas",
						"No sustituye claves alternativas; es heurístico."
					],
					[
						"Change tracking",
						"On",
						"Necesario para sincronización incremental e integraciones."
					],
					[
						"Auditing",
						"Org + tabla + columna",
						"Hay que activarlo en los tres niveles para ver historial de un campo."
					]
				]
			},
			{
				type: "h2",
				text: "Columnas"
			},
			{
				type: "ul",
				items: [
					"Texto, texto multilínea, entero, decimal, moneda, fecha/hora (time-zone independent vs user local), sí/no, choice (global vs local), choices (multi), lookup, customer (account o contact), file, image, autonumber.",
					"Choice global: reutilizable entre tablas (sí para «Prioridad»). Local: solo esa tabla.",
					"Alternate keys: unicidad de negocio (email, código). Imprescindibles para upsert en integraciones.",
					"Column security: campos sensibles (salario, NIF). Requiere perfiles de seguridad de columna, no solo el rol de tabla."
				]
			},
			{
				type: "h2",
				text: "Relaciones y cascading"
			},
			{
				type: "p",
				text: "1:N (un cliente, muchas incidencias), N:1 (la inversa), N:N (alumnos–cursos). En 1:N configuras el comportamiento de la relación parental."
			},
			{
				type: "table",
				headers: [
					"Comportamiento",
					"Qué hace",
					"Cuándo"
				],
				rows: [
					[
						"Parental",
						"Cascada de assign, share, unshare, reparent, delete, merge",
						"Hijo que no tiene sentido sin el padre (líneas de pedido)."
					],
					[
						"Referential",
						"Sin cascada de delete: puedes restringir o quitar el link",
						"Lookup suelto (incidencia → producto)."
					],
					[
						"Referential, restrict delete",
						"No deja borrar el padre si hay hijos",
						"Cuando perder hijos sería un error de negocio."
					],
					[
						"Configurable cascading",
						"Elige por acción (assign, delete, share…)",
						"Cuando parental es demasiado y referential se queda corto."
					]
				]
			},
			{
				type: "callout",
				kind: "exam",
				title: "Delete de hijos",
				text: "Si el escenario dice «al borrar el proyecto deben desaparecer las tareas» → parental o cascade delete. Si dice «no se puede borrar un cliente con pedidos» → restrict delete. Si dice «las tareas se quedan pero sin proyecto» → remove link."
			},
			{
				type: "h2",
				text: "Vistas públicas y formularios principales"
			},
			{
				type: "p",
				text: "En el dominio 1 ya te piden configurar public views y main forms a nivel de tabla (el dominio 2 profundiza en la app). Una vista: columnas, filtros, sort, width. Quick find view alimenta la búsqueda. El main form es el de la ficha; también hay quick create, quick view y card forms."
			},
			{
				type: "ul",
				items: [
					"No pongas 40 columnas en la vista activa: rendimiento y usabilidad.",
					"Quick create: alta rápida desde lookups. Actívalo en la tabla y diseña el form corto.",
					"Icono de tabla: se configura en la definición; aparece en la sitemap y grids."
				]
			}
		]
	},
	{
		id: "d1-columnas-ia",
		domain: "d1",
		order: 4,
		title: "Prompt columns y row summaries",
		minutes: 16,
		summary: "IA persistida en la fila frente a resumen Copilot de registro. Límites, triggers y créditos.",
		objectives: [
			"Configurar una prompt column con inputs y filtros",
			"Distinguir prompt column de row summary",
			"Saber cuándo se regenera y cuándo no"
		],
		blocks: [
			{
				type: "p",
				text: "Este es el tema «nuevo» que más distancia AB-410 de PL-200. Microsoft evalúa si sabes meter IA en el modelo de datos, no solo en el chat."
			},
			{
				type: "h2",
				text: "Prompt column"
			},
			{
				type: "p",
				text: "Tipo de columna de Dataverse cuyo valor lo genera un modelo a partir de un prompt en lenguaje natural y de otras columnas de la misma fila. El resultado se guarda de forma persistente y lo consumen apps, flujos, informes y agentes."
			},
			{
				type: "steps",
				items: [
					{
						title: "Crear la columna",
						text: "Tabla → Nueva columna → tipo Prompt. Nombre y descripción claros. Hasta 5 prompt columns por tabla."
					},
					{
						title: "Escribir el prompt",
						text: "Instrucciones estructuradas. Referencia columnas de entrada. No uses como input: formula, file, image u otra prompt column."
					},
					{
						title: "Filtros",
						text: "Condiciones para ejecutar solo cuando aplique (p. ej. Estado = Enviado). Ahorra créditos."
					},
					{
						title: "Ejecución asíncrona",
						text: "Se crean columnas de Status y Details. Estados: NotStarted, InProgress, Completed, Failed. No bloquea la transacción de guardado."
					}
				]
			},
			{
				type: "ul",
				items: [
					"Se dispara al crear el registro o al actualizar una columna de input. No hay backfill masivo de históricos salvo que toques inputs.",
					"Cambiar el texto del prompt no regenera filas antiguas hasta que un input cambie.",
					"No se audita el valor generado como un campo normal de auditoría.",
					"Requisitos: AI Builder / Copilot habilitado, créditos, permisos sobre las columnas de input, y el entorno no debe bloquear customizations unmanaged en DEV.",
					"Puedes probar el prompt sin gastar créditos. El uso se ve en Automation Center → AI Builder activity."
				]
			},
			{
				type: "h2",
				text: "Row summary"
			},
			{
				type: "p",
				text: "Resumen Copilot de un registro en model-driven: un digest para el usuario que abre la ficha. Se configura a nivel de tabla (qué columnas alimentan el resumen). No es un tipo de columna persistida como la prompt column; es una experiencia de lectura."
			},
			{
				type: "compare",
				left: {
					title: "Prompt column",
					items: [
						"Valor persistido en Dataverse",
						"Usable en vistas, flujos, reportes",
						"Hasta 5 por tabla",
						"Trigger: create/update de inputs",
						"Clasificar, extraer, recomendar, redactar"
					]
				},
				right: {
					title: "Row summary",
					items: [
						"Experiencia Copilot en la ficha",
						"No es un campo que filtres en una vista como cualquier otro",
						"Configuración de tabla",
						"Ayuda a entender el registro al abrirlo",
						"No sustituye un campo «Resumen ejecutivo» de negocio"
					]
				}
			},
			{
				type: "callout",
				kind: "exam",
				title: "Elige el artefacto correcto",
				text: "«Necesitamos una categoría de sentimiento en cada caso, visible en la vista y que dispare un flujo si es negativo» → prompt column (o modelo de AI Hub + flujo). «Los agentes de mesa de ayuda quieren un resumen al abrir el caso» → row summary. «Un chatbot responde políticas» → agente, no columna."
			}
		]
	},
	{
		id: "d1-seguridad",
		domain: "d1",
		order: 5,
		title: "Seguridad de Dataverse y acceso a apps",
		minutes: 18,
		summary: "Roles, niveles de acceso, equipos, jerarquía, seguridad de columna y de formulario.",
		objectives: [
			"Diseñar un security role mínimo",
			"Distinguir owner teams y access teams",
			"Restringir tablas, filas, columnas, formularios y apps"
		],
		blocks: [
			{
				type: "p",
				text: "El builder no es el admin de Entra ID, pero el examen espera que configures acceso: quién ve qué fila, qué campo, qué formulario y qué app."
			},
			{
				type: "h2",
				text: "Security roles y privilegios"
			},
			{
				type: "p",
				text: "Un rol combina privilegios (Create, Read, Write, Delete, Append, Append To, Assign, Share) con un nivel de acceso por tabla."
			},
			{
				type: "table",
				headers: ["Nivel", "Alcance"],
				rows: [
					["None", "Sin acceso"],
					["User", "Solo registros que el usuario posee"],
					["Business Unit", "Registros de su unidad de negocio"],
					["Parent: Child BU", "Su BU y las hijas"],
					["Organization", "Toda la organización"]
				]
			},
			{
				type: "ul",
				items: [
					"Append: asociar este registro a otro. Append To: permitir que otros se asocien a este. En lookups hacen falta los dos lados.",
					"Least privilege: clona un rol base (Basic User) y recorta. No uses System Administrator para usuarios de negocio.",
					"Los roles se asignan a usuarios o a equipos. El usuario necesita además la licencia y, para model-driven, estar en el app sharing / security roles de la app."
				]
			},
			{
				type: "h2",
				text: "Ownership, equipos y jerarquía"
			},
			{
				type: "ul",
				items: [
					"User-owned vs organization-owned (lo viste en la tabla). Organization-owned ignora owner: el nivel es none u org.",
					"Owner teams: el equipo posee el registro. Todos los miembros heredan acceso según el rol del equipo.",
					"Access teams: no poseen; se usa para compartir un registro concreto con un grupo ad-hoc (p. ej. un deal team).",
					"Entra ID groups pueden mapearse a equipos para automatizar membresía.",
					"Hierarchy security: manager hierarchy (jefe ve a sus reports) o positional. Se activa a nivel de organización y se limita por profundidad. Complementa, no sustituye, a los roles."
				]
			},
			{
				type: "h2",
				text: "Capas extra de restricción"
			},
			{
				type: "ul",
				items: [
					"Column security: campos sensibles. El rol de tabla no basta.",
					"Form security: qué roles ven un formulario. Útil para un form de RR. HH. vs uno de ventas sobre la misma tabla.",
					"View: las vistas públicas las ve quien tiene read; puedes restringir vistas personales/sistema según diseño, pero no es un muro de seguridad (el usuario podría leer por API si tiene privilegio).",
					"App access: en model-driven, roles asociados a la app. En canvas, sharing de la app + roles de Dataverse. Sin ambos, o no abre o no ve datos.",
					"Auditing: org + tabla + columnas. Retention configurable. Change tracking es distinto (sync, no compliance)."
				]
			},
			{
				type: "callout",
				kind: "exam",
				title: "App vs datos",
				text: "«El usuario abre la app pero las filas salen vacías» → falta privilegio Read o el nivel es User y no posee registros. «No ve la app en el listado» → no está compartida / no tiene el rol de la app. Son fallos distintos."
			}
		]
	}
];
var D2_LESSONS = [
	{
		id: "d2-model-driven",
		domain: "d2",
		order: 6,
		title: "Model-driven apps: formularios, vistas y composición",
		minutes: 20,
		summary: "Forms, views, sitemap, charts, dashboards y control de acceso a la app.",
		objectives: [
			"Diseñar main, quick create y quick view forms",
			"Componer una app con sitemap y áreas",
			"Configurar charts, dashboards y acceso"
		],
		blocks: [
			{
				type: "p",
				text: "Una model-driven app no se «pinta»: se compone. Eliges tablas, formularios, vistas, charts y un sitemap. La UI sale del metadata de Dataverse, con seguridad incluida. Es la opción por defecto cuando el trabajo es gestionar registros."
			},
			{
				type: "h2",
				text: "Formularios"
			},
			{
				type: "ul",
				items: [
					"Main: ficha completa. Pestañas, secciones, subgrids, timeline, BPF header, IFrames, components (PCF, canvas embebida, custom pages).",
					"Quick create: alta rápida. Hay que habilitarla en la tabla.",
					"Quick view: lectura embebida de un lookup (ver datos del cliente dentro del caso).",
					"Card: compacto para paneles y móviles.",
					"Form component control: reutiliza un form de otra tabla dentro de este."
				]
			},
			{
				type: "p",
				text: "Buenas prácticas: campos requeridos de negocio arriba, pestaña Resumen con lo que se usa el 80% del tiempo, subgrids con vistas específicas, no el Active genérico. Business rules y JavaScript (poco, AB-410 prefiere rules/flujos) para show/hide. Command bar: botones con Power Fx o comandos clásicos."
			},
			{
				type: "h2",
				text: "Vistas en la app"
			},
			{
				type: "ul",
				items: [
					"Public views: las que empaquetas en la solución y expones en la app.",
					"Quick find, associated, lookup, advanced find: cada una alimenta un hueco distinto de la UI.",
					"En la composición de la app seleccionas qué vistas y forms están disponibles. Puedes tener un form de supervisor que no está en la app de agente."
				]
			},
			{
				type: "h2",
				text: "Componer la app"
			},
			{
				type: "steps",
				items: [
					{
						title: "Nueva model-driven app",
						text: "En una solución. Nombre, descripción, icono. Modern app designer."
					},
					{
						title: "Páginas",
						text: "Añade tablas (views + forms), dashboards, custom pages o generative pages. Ordena el sitemap en áreas y grupos."
					},
					{
						title: "Acceso",
						text: "Asocia security roles a la app. Comparte. Sin rol de app, no aparece; sin privilegios de tabla, aparece vacía."
					},
					{
						title: "Play y publicar",
						text: "Publicar la app y los componentes. Un form no publicado no se ve."
					}
				]
			},
			{
				type: "h2",
				text: "Charts y dashboards"
			},
			{
				type: "p",
				text: "Charts se definen en la tabla (column chart, pie, tag, funnel) sobre una vista. Dashboards combinan charts, listas y IFrames. Hay dashboards de usuario y de sistema. En la app marcas cuáles se incluyen. Para analítica pesada, el examen acepta mencionar Power BI embebido, pero el skill medido es charts/dashboards nativos."
			},
			{
				type: "callout",
				kind: "exam",
				title: "Custom page vs canvas standalone",
				text: "Custom page = pantalla canvas dentro de una model-driven (navegación unificada, Dataverse context). Úsala para un lienzo concreto (kanban, mapa) sin abandonar la MDA. Una canvas app aparte es otra app que hay que compartir y navegar."
			}
		]
	},
	{
		id: "d2-generative",
		domain: "d2",
		order: 7,
		title: "Páginas generativas y Copilot en model-driven",
		minutes: 12,
		summary: "Crear páginas con lenguaje natural e integrar Copilot y agentes en la experiencia MDA.",
		objectives: [
			"Generar una página a partir de un prompt",
			"Saber qué revisar después de generar",
			"Habilitar Copilot de usuario final"
		],
		blocks: [
			{
				type: "p",
				text: "Generative pages permiten describir la pantalla («una galería de incidencias abiertas con filtro por prioridad y un formulario al lado») y obtener una custom page lista para iterar. El examen no te pide el prompt perfecto; te pide saber que existe, cuándo usarla y que el resultado se revisa y se mete en la solución."
			},
			{
				type: "ul",
				items: [
					"Parte de una model-driven app en el designer moderno.",
					"Describe layout y datos. El generador usa las tablas a las que la app ya tiene acceso.",
					"Revisa controles, nombres, accesibilidad y delegación. Publica. Empaqueta en la solución.",
					"No es un sustituto del main form: es para experiencias que el form clásico no cubre."
				]
			},
			{
				type: "h2",
				text: "Copilot para el usuario de la app"
			},
			{
				type: "ul",
				items: [
					"Form fill assistance: sugiere valores. Se puede desactivar por columna (en prompt columns el study material indica desmarcar form fill assistance al crearlas).",
					"Preguntas en lenguaje natural sobre los datos de la app (si el admin lo habilita y el usuario tiene privilegios).",
					"Row summary en la ficha (dominio 1).",
					"Agentes incrustados: un agente de Copilot Studio en el side pane o en Power Pages para la misma solución."
				]
			},
			{
				type: "callout",
				kind: "warn",
				title: "Gobierno",
				text: "Copilot de runtime se habilita a nivel de tenant/entorno. Si el escenario dice que el departamento legal no quiere IA en una app, no basta con no usarla: hay que respetar la política del entorno y no incrustar agentes."
			}
		]
	},
	{
		id: "d2-canvas",
		domain: "d2",
		order: 8,
		title: "Canvas apps: datos, UX y rendimiento",
		minutes: 20,
		summary: "Conectar datos, diseñar para accesibilidad y responsive, y no romper la delegación.",
		objectives: [
			"Crear una canvas app a partir de datos",
			"Aplicar contenedores responsive y accesibilidad",
			"Reconocer límites de delegación y patrones de carga"
		],
		blocks: [
			{
				type: "p",
				text: "Canvas te da el lienzo. Empieza desde datos (Dataverse, SharePoint, Excel — para AB-410, Dataverse es el default correcto) o en blanco. Copilot puede generar la primera versión; tú eres responsable de controles, fórmulas y publicación."
			},
			{
				type: "h2",
				text: "Estructura de una app sólida"
			},
			{
				type: "ul",
				items: [
					"Contenedores layout (vertical/horizontal/experimental responsive) en lugar de X/Y absolutos. Así sobrevive a móvil y tablet.",
					"Un screen por tarea: Browse, Detail, Edit. O un patrón maestro-detalle con un contenedor.",
					"Galerías conectadas a Dataverse con Filter / Search delegables. Drop-downs con Distinct solo si el origen lo permite; si no, tabla de referencia.",
					"Formularios con data cards; OnSuccess para navegar y Notify."
				]
			},
			{
				type: "h2",
				text: "Accesibilidad, usabilidad, rendimiento"
			},
			{
				type: "table",
				headers: ["Eje", "Qué hacer"],
				rows: [
					["Accesibilidad", "AccessibleLabel en todo control interactivo, TabIndex lógico, contraste, no información solo por color, AcceptsFocus."],
					["Usabilidad", "Textos cortos, un CTA primario, estados vacíos, confirmación al borrar, modo offline solo si hay Dataverse offline profile."],
					["Responsive", "App.Width / Height, contenedores, breakpoints. Evita hardcode 1366×768."],
					["Rendimiento", "Delegación, Concurrent() en OnStart/OnVisible, no cargar 12 lookups en OnStart, StartScreen en vez de navegar desde OnStart, formula-level error handling."]
				]
			},
			{
				type: "h2",
				text: "Delegación (cae siempre)"
			},
			{
				type: "p",
				text: "Power Apps solo empuja ciertas funciones al origen. Si no es delegable, trabaja con las primeras N filas (límite 500–2000). Síntoma: la galería «se come» registros viejos. Solución: Filter con columnas indexadas, evitar Len, Find, construcciones no delegables sobre Dataverse; mover lógica al servidor (vista, flujo, columna fórmula)."
			},
			{
				type: "callout",
				kind: "exam",
				title: "SharePoint vs Dataverse",
				text: "Si el escenario es una app de negocio con seguridad por fila, relaciones y ALM, la respuesta es Dataverse. SharePoint lists es trampa de PL-900. AB-410 asume Dataverse salvo que el enunciado lo impida."
			}
		]
	},
	{
		id: "d2-canvas-avanzado",
		domain: "d2",
		order: 9,
		title: "Canvas avanzado: variables, componentes y calidad",
		minutes: 18,
		summary: "Named formulas, UDFs, librerías, colecciones, errores, Monitor y llamadas a flujos.",
		objectives: [
			"Elegir el tipo de estado correcto",
			"Crear componentes reutilizables",
			"Probar con Monitor y manejar errores"
		],
		blocks: [
			{
				type: "h2",
				text: "Estado: qué usar"
			},
			{
				type: "table",
				headers: [
					"Artefacto",
					"Scope",
					"Cómo",
					"Para qué"
				],
				rows: [
					[
						"Context variable",
						"Screen",
						"UpdateContext({ x: 1 })",
						"Popups, pestaña activa, estado local"
					],
					[
						"Global variable",
						"App",
						"Set(gUser, User())",
						"Usuario, flags de sesión. No abuses."
					],
					[
						"Collection",
						"App (en memoria)",
						"ClearCollect, Collect, Patch, Remove",
						"Caché, carritos, buffers. No es la base de datos."
					],
					[
						"Named formula",
						"App, inmutable, reactiva",
						"App.Formulas: TaxRate = 0.21;",
						"Constantes y cálculos derivados. Preferible a Set para valores calculados."
					],
					[
						"User-defined function",
						"App o componente",
						"Función Power Fx con parámetros",
						"Reutilizar lógica (validar CIF, armar título)."
					]
				]
			},
			{
				type: "h2",
				text: "Componentes y librerías"
			},
			{
				type: "ul",
				items: [
					"Componentes in-app: header, nav, card. Custom properties de input/output. Access app scope solo si es imprescindible (rompe reutilización).",
					"Component library: se publica y se referencia desde varias apps. Actualizas la librería y las apps toman la versión.",
					"PCF: cuando el control no existe (firma, mapa avanzado). Se empaqueta como solución. AB-410 pide saber cuándo recomendarlo, no escribirlo."
				]
			},
			{
				type: "h2",
				text: "Flujos desde canvas"
			},
			{
				type: "p",
				text: "Power Automate se llama como un conector: FlowName.Run(args). Devuelve valores si el flujo tiene Respond to a PowerApp or flow. Usa para aprobaciones, email, sistemas externos. No uses un flujo para un Patch que la app puede hacer sola."
			},
			{
				type: "h2",
				text: "Errores y Monitor"
			},
			{
				type: "ul",
				items: [
					"IfError / IsError / App.OnError: maneja fallos de Patch y de conectores sin romper la sesión.",
					"Notify(texto, error) para el usuario; no tragues el error en silencio.",
					"Monitor: sesión en vivo de fórmulas, timings, filas delegadas o no, llamadas de red. Es la herramienta de test que nombra el study guide.",
					"Test Studio / tests manuales: casos de aceptación. El examen se conforma con Monitor + pruebas de maker."
				]
			},
			{
				type: "callout",
				kind: "tip",
				title: "Named formulas > OnStart inflado",
				text: "Si ves un OnStart de 80 líneas con Set de constantes, la respuesta moderna es named formulas. OnStart se reserva para lo que debe ocurrir una vez (prefetch controlado)."
			}
		]
	},
	{
		id: "d2-agentes",
		domain: "d2",
		order: 10,
		title: "Agentes desde canvas y Copilot Studio",
		minutes: 14,
		summary: "Crear un agente anclado a la app, knowledge, acciones y publicación en Power Pages.",
		objectives: [
			"Crear un agente desde una canvas app",
			"Conectar knowledge y acciones",
			"Saber dónde se publica (app, Teams, Power Pages)"
		],
		blocks: [
			{
				type: "p",
				text: "El study guide pide explícitamente: create a Copilot Studio agent from a canvas app. El patrón: la app resuelve la tarea estructurada; el agente cubre la conversación, el «cómo hago X» y las acciones que no merecen un botón más."
			},
			{
				type: "steps",
				items: [
					{
						title: "Partir de la canvas",
						text: "En el studio, opción de crear agente. Hereda contexto de tablas y de la app."
					},
					{
						title: "Knowledge",
						text: "Dataverse (las mismas tablas), SharePoint, archivos, sitios. Define el alcance: no mezcles RH y Finanzas en el mismo agente sin necesidad."
					},
					{
						title: "Acciones y temas",
						text: "Temas clásicos para diálogos deterministas. Acciones = flujos o conectores (crear incidencia, consultar pedido). Generative orchestration cuando el agente elige la acción."
					},
					{
						title: "Publicar y autenticar",
						text: "Canales: la propia app, Teams, Power Pages. Autenticación Entra ID para datos protegidos. El agente respeta Dataverse security si las acciones corren en contexto de usuario."
					}
				]
			},
			{
				type: "h2",
				text: "Power Pages"
			},
			{
				type: "p",
				text: "El rol también integra Copilot/agentes en sitios Power Pages (portales externos o internos). Dataverse table permissions del sitio son independientes de los security roles de apps internas: un usuario anónimo no ve lo mismo que un maker. El examen puede preguntar «exponer consultas de pedido a clientes» → Power Pages + table permissions + agente opcional, no una canvas interna compartida a 4.000 clientes."
			},
			{
				type: "callout",
				kind: "exam",
				title: "Agente vs flujo vs app",
				text: "Chat y knowledge → agente. Botón «Enviar a SAP» determinista → flujo. Captura masiva de datos → app. Si el escenario mezcla los tres, la solución completa es la que orquesta: app para el trabajo, flujo para el sistema, agente para la ayuda."
			}
		]
	}
];
var D3_LESSONS = [
	{
		id: "d3-flows",
		domain: "d3",
		order: 11,
		title: "Cloud flows: triggers, conectores y control",
		minutes: 22,
		summary: "El bloque más pesado del examen: diseñar flujos que no se rompan en producción.",
		objectives: [
			"Elegir el trigger correcto",
			"Evaluar conectores estándar vs premium",
			"Usar condiciones, loops, run after y concurrencia"
		],
		blocks: [
			{
				type: "p",
				text: "Dominio 3 vale 40–45%. Si dominas flujos, ya has ganado una franja enorme. Un cloud flow es: trigger → acciones → control de errores. Vive en una solución, usa connection references y se prueba con datos reales."
			},
			{
				type: "h2",
				text: "Tipos de trigger — recomendar"
			},
			{
				type: "table",
				headers: [
					"Trigger",
					"Cuándo",
					"Notas de examen"
				],
				rows: [
					[
						"Automated: Dataverse (added, modified, deleted, selected)",
						"Reaccionar a datos",
						"Filtra por tabla y atributos. Trigger conditions para no disparar de más."
					],
					[
						"Automated: conector (email, SharePoint, HTTP)",
						"Evento externo",
						"Premium si el conector lo es. DLP puede bloquearlo."
					],
					[
						"Instant: botón / Power Apps / Copilot / HTTP request",
						"El usuario o un agente lo lanza",
						"Power Apps trigger si la canvas debe esperar respuesta."
					],
					[
						"Scheduled (recurrence)",
						"Cada N minutos/horas/días",
						"No lo uses para «cuando se cree un registro». Time zone del flujo."
					],
					[
						"Business process / stage change",
						"BPF avanza",
						"Mejor que sondear la etapa con recurrence."
					]
				]
			},
			{
				type: "h2",
				text: "Conectores"
			},
			{
				type: "ul",
				items: [
					"Estándar: Dataverse, Office 365 Outlook, SharePoint, Teams, Notifications… según el plan.",
					"Premium: SQL, HTTP con Azure AD, Salesforce, muchos SaaS. El escenario «sin premium» te obliga a estándar o a custom connector aprobado.",
					"Custom connector: OpenAPI para APIs internas. Se empaqueta en la solución.",
					"Connection references: ALM. Nunca dejes conexiones «de tu usuario» hardwired en PROD."
				]
			},
			{
				type: "h2",
				text: "Acciones y control de flujo"
			},
			{
				type: "ul",
				items: [
					"Condiciones y switch: ramifica. Prefiere expresiones claras y Compose para valores intermedios.",
					"Apply to each: itera. Concurrencia configurable (1 = secuencial; >1 = paralelo). Cuidado con límites de API y con escribir el mismo registro.",
					"Do until: espera un estado. Pon límite de conteo y timeout. Sin eso, bucle infinito de examen.",
					"Scope + Configure run after: patrón try/catch (éxito / fallo / omitido / timeout).",
					"Child flows: reutilización y límites de 500 acciones. El padre llama al hijo con Run a child flow (solución).",
					"Filter array / Select: transforma sin aplicar a cada uno cuando ya tienes el array en memoria."
				]
			},
			{
				type: "h2",
				text: "Probar y diagnosticar"
			},
			{
				type: "ul",
				items: [
					"Run history: inputs/outputs por acción. El 80% de los fallos se ven aquí.",
					"Peak / flow checker: avisos de diseño.",
					"Trigger no dispara: filtros, columnas no incluidas en «select columns», usuario sin privilegio, flujo off, DLP.",
					"Timeouts y reintentos: políticas por acción. Idempotencia: un reintento no debe duplicar un pedido.",
					"Concurrency control en el trigger Dataverse: para serializar por registro (evita dos updates paralelos)."
				]
			},
			{
				type: "callout",
				kind: "exam",
				title: "Run after",
				text: "«Si el email falla, crea una tarea; si no, no hagas nada» → la acción Crear tarea con run after: has failed (y el email no termina el flujo). No pongas un if que compruebe un boolean inventado."
			}
		]
	},
	{
		id: "d3-approvals",
		domain: "d3",
		order: 12,
		title: "Aprobaciones y patrones de negocio en flujos",
		minutes: 12,
		summary: "Start and wait for an approval, tipos, reasignación y qué no hacer con un bucle.",
		objectives: [
			"Elegir el tipo de aprobación",
			"Combinar aprobación con Dataverse",
			"Evitar anti-patrones de espera"
		],
		blocks: [
			{
				type: "p",
				text: "Approvals es un skill propio en el study guide. El conector Approvals crea una solicitud que el usuario ve en Teams, Power Automate y el centro de aprobaciones."
			},
			{
				type: "table",
				headers: ["Tipo", "Comportamiento"],
				rows: [
					["Approve / Reject – First to respond", "El primero decide. Rápido para guardias."],
					["Approve / Reject – Everyone must approve", "Todos deben aprobar. Un rechazo corta."],
					["Custom responses", "Opciones más allá de approve/reject (Pedir info, Escalar)."],
					["Sequential", "Cadena: manager, luego finanzas. Se modela con varios pasos o con un array de aprobadores y un apply to each sequential."]
				]
			},
			{
				type: "ul",
				items: [
					"Start and wait for an approval: el flujo se pausa (no consume un Do until de 30 días a lo bruto; el motor hiberna).",
					"Actualiza el registro Dataverse (estado = Pendiente / Aprobado) antes y después. La app debe reflejarlo.",
					"Asigna a un usuario o a un equipo. Piensa en out-of-office: reassignment.",
					"No uses un scheduled flow que «mira si alguien escribió Sí en un Excel». Eso es la trampa."
				]
			},
			{
				type: "callout",
				kind: "tip",
				title: "Aprobación + BPF",
				text: "Patrón elegante: BPF en etapa «Aprobación», el flujo se dispara al entrar, espera el approval y mueve la etapa. El usuario ve progreso en la ficha y la decisión en Teams."
			}
		]
	},
	{
		id: "d3-ai-hub",
		domain: "d3",
		order: 13,
		title: "AI Hub: prompts y modelos",
		minutes: 20,
		summary: "Construir prompts, añadir knowledge e inputs, y consumirlos en apps y flujos.",
		objectives: [
			"Crear un prompt desde plantilla o en blanco",
			"Añadir inputs, knowledge y ajustes de modelo",
			"Llamarlo desde canvas, model-driven y cloud flow"
		],
		blocks: [
			{
				type: "p",
				text: "AI Hub (AI Builder / prompts en Power Platform) es el taller de IA reutilizable. Un prompt es un artefacto de solución: se versiona, se comparte y se llama desde varios sitios. Un modelo puede ser prebuilt (facturas, recibos, DNI, sentimiento, clasificación, extracción) o custom entrenado."
			},
			{
				type: "h2",
				text: "Prompts"
			},
			{
				type: "steps",
				items: [
					{
						title: "Crear",
						text: "Desde plantilla (resumir, extraer, clasificar, redactar) o blank. Nombre, descripción, solución."
					},
					{
						title: "Inputs",
						text: "Parámetros tipados (texto, número, datos). La app o el flujo los rellena. Sin inputs, el prompt no es reutilizable."
					},
					{
						title: "Knowledge",
						text: "Añade documentos o datos para grounding. Reduce alucinaciones en políticas y catálogos."
					},
					{
						title: "Settings",
						text: "Modelo (GPT family según el entorno), temperatura, instrucciones de sistema. Baja temperatura para clasificación; más alta para brainstorming (raro en enterprise)."
					},
					{
						title: "Probar",
						text: "Casos límite: vacío, otro idioma, PII. Luego publicar."
					}
				]
			},
			{
				type: "h2",
				text: "Consumir un prompt"
			},
			{
				type: "ul",
				items: [
					"Canvas: función / conector de AI que recibe los inputs y devuelve texto o JSON. Úsalo en un botón «Redactar respuesta» y deja que el usuario edite antes de Patch.",
					"Cloud flow: acción de AI Builder / Run a prompt. Encadena: Dataverse trigger → prompt → Patch o email.",
					"Model-driven: command bar o columna. Si el resultado debe vivir en la fila de forma continua, valora prompt column (dominio 1) en vez de un botón."
				]
			},
			{
				type: "h2",
				text: "Modelos (AI models)"
			},
			{
				type: "ul",
				items: [
					"Prebuilt: invoice processing, receipt, business card, ID reader, sentiment, category classification, entity extraction, text translation, prediction.",
					"Custom: entrenas con tus documentos o tu tabla (clasificación de casos, predicción de win).",
					"Consumo: igual que prompts — acción en flujo o componente en app. El output es estructurado (campos, confianza).",
					"El examen puede preguntar «extraer total y proveedor de un PDF de factura» → modelo de facturas, no un prompt genérico, porque el prebuilt ya está entrenado para ese documento."
				]
			},
			{
				type: "compare",
				left: {
					title: "Prompt (GPT)",
					items: [
						"Flexible, lenguaje natural",
						"Bueno para redactar, resumir, extraer ad-hoc",
						"Grounding con knowledge",
						"Output a veces libre → pide JSON en las instrucciones"
					]
				},
				right: {
					title: "Modelo prebuilt / custom",
					items: [
						"Esquema de salida estable",
						"Documentos (factura, recibo) y predicción",
						"Confianza por campo",
						"Mejor cuando el tipo de documento es conocido"
					]
				}
			},
			{
				type: "callout",
				kind: "exam",
				title: "Prompt column vs prompt de AI Hub",
				text: "Prompt column: vive en la tabla, se autoejecuta al cambiar inputs, persistido. Prompt de AI Hub: artefacto llamable, lo invocas cuando quieres (botón, flujo, agente). «Cada vez que se guarda el caso, rellenar Resumen» → prompt column. «El agente pulsa Generar oferta» → prompt de AI Hub."
			}
		]
	},
	{
		id: "d3-rules-bpf",
		domain: "d3",
		order: 14,
		title: "Business rules y business process flows",
		minutes: 18,
		summary: "Lógica de formulario/servidor frente a guía por etapas. Scope, acciones y saltos a flujos.",
		objectives: [
			"Elegir el scope de una business rule",
			"Diseñar un BPF con ramas y flujos",
			"Saber qué no puede hacer una rule"
		],
		blocks: [
			{
				type: "h2",
				text: "Business rules"
			},
			{
				type: "p",
				text: "Lógica declarativa: si condición, entonces acción. Se diseñan en el editor de la tabla. No sustituyen a un flujo ni a un plugin."
			},
			{
				type: "table",
				headers: [
					"Scope",
					"Dónde corre",
					"Efecto"
				],
				rows: [
					[
						"Entity (tabla)",
						"Servidor y todos los clientes",
						"Aplica también a API, importaciones y flujos que crean filas. Usa esto para validación real."
					],
					[
						"All forms",
						"Cualquier form model-driven",
						"UX: show/hide, required. No protege la API."
					],
					[
						"Specific form",
						"Un form",
						"Solo esa experiencia. El resto de forms y la API ignoran la rule."
					]
				]
			},
			{
				type: "p",
				text: "Acciones: set value, set default, set required / optional, show / hide, lock / unlock, set recommendation (bombilla de consejo, no bloquea), set business required. Condiciones sobre columnas de la tabla (y a veces related en límites)."
			},
			{
				type: "ul",
				items: [
					"No hay bucles, no hay conectores, no hay espera, no hay multi-tabla rica.",
					"Recommendation ≠ required. El usuario puede ignorar una recommendation.",
					"Si debe cumplirse aunque el registro entre por integración, scope Entity."
				]
			},
			{
				type: "h2",
				text: "Business process flows"
			},
			{
				type: "p",
				text: "Una guía de etapas sobre uno o varios tables. Cada etapa tiene pasos (campos a completar), steps de acción (flujo) y, si aplica, condicionales. El usuario ve el recorredor en la cabecera del form."
			},
			{
				type: "ul",
				items: [
					"Se habilita en la tabla y se incluye en la app. Security roles del BPF: quién puede usarlo.",
					"Branching: si Importe > 10.000, etapa de Dirección. Si no, etapa de Cierre.",
					"Puede cruzar tablas (Lead → Opportunity → Quote) en un proceso de varios entities.",
					"On stage change / on process complete: dispara cloud flows. Ahí encajas aprobaciones y sistemas externos.",
					"Data steps vs workflows clásicos: en AB-410, prefiere cloud flow."
				]
			},
			{
				type: "callout",
				kind: "exam",
				title: "Rule vs BPF vs flow",
				text: "Ocultar un campo si Tipo = Interno → business rule. Obligar a pasar por Cualificar → Propuesta → Cierre → BPF. Avisar a SAP y esperar aprobación del director → cloud flow (quizá disparado por el BPF). Mezclarlos es correcto; usar un flujo para hide/show un campo no lo es."
			}
		]
	},
	{
		id: "d3-columnas-logica",
		domain: "d3",
		order: 15,
		title: "Columnas fórmula, calculated y rollup",
		minutes: 14,
		summary: "Dónde vive la lógica de cálculo y cuándo NO usar un flujo para sumar.",
		objectives: [
			"Elegir formula vs calculated vs rollup",
			"Conocer límites de rollup",
			"Evaluar el use case de lógica de negocio"
		],
		blocks: [
			{
				type: "table",
				headers: [
					"Tipo",
					"Lenguaje",
					"Cuándo",
					"Límites"
				],
				rows: [
					[
						"Formula column",
						"Power Fx",
						"Cálculo en tiempo de lectura, moderno, rico",
						"No todo Power Fx de canvas. No sustituye rollup de hijos agregados en todos los casos."
					],
					[
						"Calculated (clásico)",
						"Editor de calculated fields",
						"Legado. Suma, if, fechas en la misma fila o related N:1",
						"Microsoft empuja a formula. Sigue apareciendo en exámenes por bases instaladas."
					],
					[
						"Rollup",
						"Agregación",
						"SUM, COUNT, MIN, MAX, AVG de hijos 1:N",
						"Asíncrono (hasta 12 h, o CalculateRollupField). Filtros en hijos. No en tiempo real estricto."
					]
				]
			},
			{
				type: "h2",
				text: "Ejemplos que caen"
			},
			{
				type: "ul",
				items: [
					"«Días abierto» = DiffInDays(created, now) → formula / calculated.",
					"«Total de líneas de pedido» → rollup SUM de hijos, no un flujo en cada Patch.",
					"«Número de casos activos del cliente» → rollup COUNT filtrado.",
					"«Si el rollup debe ser inmediato para un KPI en pantalla» → o aceptas asincronía, o calculas en la app (Sum de una relación) asumiendo delegación, o un flujo que actualiza un campo estático (más frágil)."
				]
			},
			{
				type: "h2",
				text: "Matriz de decisión de lógica (cierra el dominio 3)"
			},
			{
				type: "table",
				headers: ["Necesidad", "Artefacto"],
				rows: [
					["Validar / mostrar / requerir un campo", "Business rule"],
					["Guía por etapas humanas", "BPF"],
					["Cálculo en la misma fila", "Formula column"],
					["Agregar hijos", "Rollup"],
					["Insight de IA persistido", "Prompt column"],
					["Insight de IA a demanda", "Prompt AI Hub"],
					["Conector, email, espera, aprobación", "Cloud flow"],
					["Conversación y knowledge", "Agente"],
					["Transacción compleja síncrona", "Plugin (recomendar a pro-dev)"]
				]
			},
			{
				type: "callout",
				kind: "tip",
				title: "La pregunta más rentable del examen",
				text: "Te dan un párrafo de negocio y cuatro letras que son rule, BPF, flow y formula. Elige el más específico y barato de mantener. Si hay espera o sistema externo, flow. Si hay etapas, BPF. Si es un campo, rule o formula. Si es IA, prompt."
			}
		]
	}
];
var LESSONS = [
	...INTRO_LESSONS,
	...D1_LESSONS,
	...D2_LESSONS,
	...D3_LESSONS
];
function getLesson(id) {
	return LESSONS.find((l) => l.id === id);
}
function nextLesson(id) {
	const i = LESSONS.findIndex((l) => l.id === id);
	return i >= 0 ? LESSONS[i + 1] : void 0;
}
function prevLesson(id) {
	const i = LESSONS.findIndex((l) => l.id === id);
	return i > 0 ? LESSONS[i - 1] : void 0;
}
var DOMAINS = [
	{
		id: "d1",
		code: "1",
		weight: "25–30%",
		weightMin: 25,
		weightMax: 30,
		title: "Cimientos de aplicaciones inteligentes",
		blurb: "Diseñar la solución con Copilot, modelar Dataverse, entornos, ALM y seguridad."
	},
	{
		id: "d2",
		code: "2",
		weight: "25–30%",
		weightMin: 25,
		weightMax: 30,
		title: "Crear aplicaciones inteligentes",
		blurb: "Model-driven, canvas, páginas generativas, Copilot y agentes en las apps."
	},
	{
		id: "d3",
		code: "3",
		weight: "40–45%",
		weightMin: 40,
		weightMax: 45,
		title: "Lógica de negocio y automatización",
		blurb: "Cloud flows, AI Hub, reglas, BPF y columnas calculadas, rollup y fórmula."
	}
];
var EXAM = {
	code: "AB-410",
	name: "Building Intelligent Applications",
	credential: "Microsoft Certified: Intelligent Applications Builder Associate",
	durationMin: 120,
	questionRange: "40–60",
	passScore: 700,
	scaleMax: 1e3,
	priceUsd: 165,
	language: "Inglés (otras localizaciones según Pearson Vue)",
	successorOf: "PL-200"
};
var Q_D1 = [
	{
		id: "q1",
		domain: "d1",
		topic: "Diseño",
		lessonId: "d1-diseno",
		difficulty: "medium",
		stem: "Contoso quiere que los empleados pregunten en lenguaje natural por políticas de gastos y, si aplica, abran un caso de reembolso en Dataverse. ¿Qué componente debes recomendar como pieza central?",
		choices: [
			"Una prompt column en la tabla Caso que redacte la política",
			"Un agente de Copilot Studio con knowledge de políticas y una acción que cree el caso",
			"Copilot del maker studio para generar una canvas app",
			"Un business process flow con una etapa por cada política"
		],
		correct: [1],
		explanation: "Es un escenario de conversación + knowledge + acción. Eso es un agente. La prompt column persiste un insight de fila; el maker Copilot construye, no atiende empleados; un BPF no responde preguntas."
	},
	{
		id: "q2",
		domain: "d1",
		topic: "Diseño",
		lessonId: "d1-diseno",
		difficulty: "easy",
		stem: "Un equipo necesita una ficha de cliente con vistas, gráficos, BPF y seguridad por unidad de negocio. ¿Qué tipo de app encaja primero?",
		choices: [
			"Canvas app en blanco",
			"Power Pages público",
			"Model-driven app sobre Dataverse",
			"Dashboard de Power BI solo"
		],
		correct: [2],
		explanation: "Gestión de registros con seguridad, vistas, charts y BPF es el caso canónico de model-driven."
	},
	{
		id: "q3",
		domain: "d1",
		topic: "Extensibilidad",
		lessonId: "d1-diseno",
		difficulty: "medium",
		stem: "La canvas necesita un control de firma manuscrita que no existe en los controles estándar. ¿Qué recomiendas?",
		choices: [
			"Una business rule que bloquee el campo Firma",
			"Un PCF empaquetado en la solución",
			"Una prompt column que describa la firma",
			"Un BPF con etapa Firma"
		],
		correct: [1],
		explanation: "Cuando el control visual no existe, el siguiente escalón es PCF. El resto no pinta un canvas de firma."
	},
	{
		id: "q4",
		domain: "d1",
		topic: "Entornos",
		lessonId: "d1-entornos-alm",
		difficulty: "easy",
		stem: "Un maker quiere practicar Dataverse y Copilot sin tocar las apps de producción de la empresa. ¿Qué entorno es el más adecuado?",
		choices: [
			"Default environment",
			"Production",
			"Developer environment",
			"El entorno de Teams de toda la compañía"
		],
		correct: [2],
		explanation: "Developer incluye Dataverse y está pensado para uso individual. Default no es para desarrollo serio; Production está fuera de juego."
	},
	{
		id: "q5",
		domain: "d1",
		topic: "Entornos",
		lessonId: "d1-entornos-alm",
		difficulty: "medium",
		stem: "El equipo de QA necesita una copia de producción con datos enmascarados que se pueda resetear. ¿Qué tipo de entorno y operación encajan?",
		choices: [
			"Sandbox con copy desde production, y reset cuando convenga",
			"Developer con export unmanaged",
			"Trial renovado cada 30 días",
			"Default environment con una solución managed"
		],
		correct: [0],
		explanation: "Sandbox soporta copy y reset. Es el entorno de test clásico en ALM de Power Platform."
	},
	{
		id: "q6",
		domain: "d1",
		topic: "ALM",
		lessonId: "d1-entornos-alm",
		difficulty: "easy",
		stem: "¿Dónde debes editar componentes día a día y cómo se despliegan a producción?",
		choices: [
			"Editar en production como unmanaged",
			"Editar en DEV unmanaged y desplegar managed a TEST/PROD",
			"Editar managed en DEV y unmanaged en PROD",
			"Trabajar siempre en Default Solution"
		],
		correct: [1],
		explanation: "DEV unmanaged (fuente). TEST/PROD managed (bloqueado). Nunca Default Solution ni unmanaged en prod."
	},
	{
		id: "q7",
		domain: "d1",
		topic: "ALM",
		lessonId: "d1-entornos-alm",
		difficulty: "medium",
		stem: "Un flujo usa una URL de API distinta en DEV y en PROD. ¿Qué artefacto de ALM debes usar?",
		choices: [
			"Una variable global de canvas Set(url, …) en OnStart",
			"Environment variable",
			"Una business rule de scope Entity",
			"El campo Description de la solución"
		],
		correct: [1],
		explanation: "Environment variables existen precisamente para config que cambia por entorno. Se rellenan en el deployment."
	},
	{
		id: "q8",
		domain: "d1",
		topic: "ALM",
		lessonId: "d1-entornos-alm",
		difficulty: "hard",
		stem: "Tras importar a TEST, los flujos fallan con error de conexión aunque en DEV iban bien. ¿Cuál es la causa más probable?",
		choices: [
			"Las prompt columns no se exportan",
			"Faltan connection references enlazadas a conexiones de TEST",
			"El publisher prefix cambió solo",
			"Solution checker no se ejecutó, y eso bloquea el runtime"
		],
		correct: [1],
		explanation: "Las conexiones no viajan. Connection references deben re-enlazarse en el destino. Solution checker es calidad, no runtime."
	},
	{
		id: "q9",
		domain: "d1",
		topic: "Dataverse",
		lessonId: "d1-dataverse",
		difficulty: "easy",
		stem: "Necesitas una tabla de «País» de solo lectura para toda la organización, sin dueño individual. ¿Qué ownership configuras?",
		choices: [
			"User or team",
			"Organization",
			"Business unit",
			"Access team"
		],
		correct: [1],
		explanation: "Organization-owned: no hay owner por fila; el acceso es none u organization. Ideal para catálogos."
	},
	{
		id: "q10",
		domain: "d1",
		topic: "Dataverse",
		lessonId: "d1-dataverse",
		difficulty: "medium",
		stem: "Al borrar un Proyecto deben borrarse sus Tareas. Si se borra un Cliente, no deben borrarse sus Pedidos: debe impedirse el borrado. ¿Qué comportamientos de relación usas?",
		choices: [
			"Ambas parental",
			"Proyecto→Tarea parental; Cliente→Pedido referential restrict delete",
			"Ambas referential remove link",
			"Proyecto→Tarea restrict; Cliente→Pedido parental"
		],
		correct: [1],
		explanation: "Hijos dependientes: parental (cascade delete). Hijos que protegen al padre: restrict delete."
	},
	{
		id: "q11",
		domain: "d1",
		topic: "Dataverse",
		lessonId: "d1-dataverse",
		difficulty: "medium",
		stem: "Quieres evitar dos cuentas con el mismo CIF al integrar desde un ERP. ¿Qué configuras?",
		choices: [
			"Duplicate detection solo",
			"Alternate key en CIF",
			"Una vista filtrada",
			"Row summary"
		],
		correct: [1],
		explanation: "Alternate key = unicidad real y upsert. Duplicate detection es heurístico y no bloquea como una clave."
	},
	{
		id: "q12",
		domain: "d1",
		topic: "Dataverse",
		lessonId: "d1-dataverse",
		difficulty: "easy",
		stem: "Prioridad (Alta/Media/Baja) se reutiliza en Caso, Tarea y Proyecto. ¿Qué tipo de choice?",
		choices: [
			"Choice local en cada tabla",
			"Choice global",
			"Yes/No",
			"Autonumber"
		],
		correct: [1],
		explanation: "Choice global se comparte entre tablas. Local quedaría desincronizado."
	},
	{
		id: "q13",
		domain: "d1",
		topic: "Prompt columns",
		lessonId: "d1-columnas-ia",
		difficulty: "medium",
		stem: "Quieres un campo Sentimiento persistido en cada Caso, visible en la vista y que un flujo pueda leer. ¿Qué usas?",
		choices: [
			"Row summary",
			"Prompt column",
			"Un chart de model-driven",
			"Una named formula de canvas"
		],
		correct: [1],
		explanation: "Prompt column persiste el resultado en Dataverse. Row summary es un digest de ficha, no un campo de vista/flujo."
	},
	{
		id: "q14",
		domain: "d1",
		topic: "Prompt columns",
		lessonId: "d1-columnas-ia",
		difficulty: "hard",
		stem: "Cambias el texto del prompt de una prompt column. Las filas antiguas no se actualizan. ¿Por qué?",
		choices: [
			"Las prompt columns nunca se recalculan",
			"Solo se regeneran al crear el registro o al cambiar una columna de input",
			"Falta publicar la model-driven app",
			"Hay que cambiar el ownership a Organization"
		],
		correct: [1],
		explanation: "No hay backfill al editar el prompt. Hay que tocar un input (o crear filas nuevas). Es un límite de examen."
	},
	{
		id: "q15",
		domain: "d1",
		topic: "Prompt columns",
		lessonId: "d1-columnas-ia",
		difficulty: "medium",
		stem: "¿Cuál NO puede usarse como input de una prompt column?",
		choices: [
			"Una columna de texto",
			"Una columna choice",
			"Otra prompt column",
			"Una columna de número"
		],
		correct: [2],
		explanation: "No se permiten como input: formula, file, image u otra prompt column."
	},
	{
		id: "q16",
		domain: "d1",
		topic: "Row summary",
		lessonId: "d1-columnas-ia",
		difficulty: "easy",
		stem: "Los agentes de mesa de ayuda quieren un resumen Copilot al abrir la ficha del caso, sin necesitar ese texto en reportes. ¿Qué configuras?",
		choices: [
			"Row summary de la tabla",
			"Cinco prompt columns",
			"Un rollup",
			"Auditing a nivel de organización"
		],
		correct: [0],
		explanation: "Row summary es exactamente esa experiencia de lectura en la ficha."
	},
	{
		id: "q17",
		domain: "d1",
		topic: "Seguridad",
		lessonId: "d1-seguridad",
		difficulty: "medium",
		stem: "Un comercial debe ver solo sus oportunidades, no las de la BU. ¿Qué nivel de Read en Opportunity?",
		choices: [
			"Organization",
			"Business Unit",
			"User",
			"Parent: Child Business Units"
		],
		correct: [2],
		explanation: "User = registros que posee. BU ya le enseñaría las de sus compañeros de unidad."
	},
	{
		id: "q18",
		domain: "d1",
		topic: "Seguridad",
		lessonId: "d1-seguridad",
		difficulty: "hard",
		stem: "Un usuario abre la model-driven app pero el grid de Casos está vacío, aunque en otra app sí ve casos. ¿Qué falta lo más probable?",
		choices: [
			"Privilegio Read de Caso o el rol no está asociado a ESTA app",
			"Una prompt column en estado Failed",
			"El entorno es Developer",
			"Falta un chart"
		],
		correct: [0],
		explanation: "App access y privilegios de tabla son independientes. Puede tener la app compartida sin Read, o un rol de otra app."
	},
	{
		id: "q19",
		domain: "d1",
		topic: "Seguridad",
		lessonId: "d1-seguridad",
		difficulty: "medium",
		stem: "El salario de un empleado debe verse solo por RR. HH. aunque otros tengan Read de la tabla Empleado. ¿Qué usas?",
		choices: [
			"Ocultar el campo con una business rule de un form",
			"Column security profile",
			"Una vista sin la columna, y nada más",
			"Organization ownership"
		],
		correct: [1],
		explanation: "Business rule y vistas no son seguridad (la API seguiría leyendo). Column security sí."
	},
	{
		id: "q20",
		domain: "d1",
		topic: "Seguridad",
		lessonId: "d1-seguridad",
		difficulty: "medium",
		stem: "Un deal team ad-hoc debe trabajar un único registro de Oportunidad sin poseerlo. ¿Qué patrón?",
		choices: [
			"Owner team que posea todas las oportunidades",
			"Access team en ese registro",
			"Cambiar ownership de la tabla a Organization",
			"Compartir la app canvas"
		],
		correct: [1],
		explanation: "Access teams son para compartir un registro concreto. Owner team implica posesión."
	},
	{
		id: "q21",
		domain: "d1",
		topic: "Auditoría",
		lessonId: "d1-seguridad",
		difficulty: "hard",
		stem: "Activaste auditing en la organización pero no ves historial del campo Teléfono. ¿Qué falta?",
		choices: [
			"Habilitar auditing también en la tabla y en la columna",
			"Un rollup sobre Teléfono",
			"Change tracking",
			"Un BPF"
		],
		correct: [0],
		explanation: "Auditoría es org + tabla + columna. Change tracking es para sync, no para compliance."
	},
	{
		id: "q22",
		domain: "d1",
		topic: "Diseño",
		lessonId: "d1-diseno",
		difficulty: "medium",
		stem: "¿Cuál es el orden de extensibilidad más alineado con AB-410?",
		choices: [
			"Plugin → PCF → flujo → configuración",
			"Configuración y low-code → conectores → custom connector / PCF → código",
			"Power Pages → Excel → plugin",
			"Siempre Copilot Studio primero"
		],
		correct: [1],
		explanation: "Se empieza por lo low-code y se escala. El examen premia la opción más simple que cumple."
	},
	{
		id: "q23",
		domain: "d1",
		topic: "ALM",
		lessonId: "d1-entornos-alm",
		difficulty: "easy",
		stem: "¿Por qué no debes desarrollar en Default Solution?",
		choices: [
			"No admite tablas",
			"Mezcla todos los componentes del sistema y no es desplegable de forma limpia",
			"Solo funciona en Teams",
			"Está siempre managed"
		],
		correct: [1],
		explanation: "Default Solution es el cajón de todo el entorno. Crea tu solución y publisher."
	},
	{
		id: "q24",
		domain: "d1",
		topic: "Dataverse",
		lessonId: "d1-dataverse",
		difficulty: "medium",
		stem: "Necesitas sincronizar incrementalmente cambios de la tabla Pedido hacia un data lake. ¿Qué propiedad de tabla habilitas?",
		choices: [
			"Auditing",
			"Change tracking",
			"Duplicate detection",
			"Row summary"
		],
		correct: [1],
		explanation: "Change tracking habilita sync incremental. Auditing es historial de usuario."
	},
	{
		id: "q25",
		domain: "d1",
		topic: "Prompt columns",
		lessonId: "d1-columnas-ia",
		difficulty: "medium",
		stem: "¿Cuál es un límite documentado de prompt columns por tabla?",
		choices: [
			"1",
			"5",
			"12",
			"Ilimitadas"
		],
		correct: [1],
		explanation: "Hasta 5 prompt columns por tabla. Dato típico de examen."
	}
];
var Q_D2 = [
	{
		id: "q26",
		domain: "d2",
		topic: "Model-driven",
		lessonId: "d2-model-driven",
		difficulty: "easy",
		stem: "Quieres que, al crear un Caso desde un lookup, aparezca un formulario corto. ¿Qué form y qué ajuste de tabla?",
		choices: [
			"Main form y auditing",
			"Quick create form y quick create habilitado en la tabla",
			"Card form y change tracking",
			"Dashboard de sistema"
		],
		correct: [1],
		explanation: "Quick create requiere el form y la opción de tabla. Es un clásico de MDA."
	},
	{
		id: "q27",
		domain: "d2",
		topic: "Model-driven",
		lessonId: "d2-model-driven",
		difficulty: "medium",
		stem: "En la app de Agentes no debe aparecer el formulario de Supervisor de la tabla Caso, pero sí en la app de Supervisores. ¿Cómo lo modelas?",
		choices: [
			"Dos tablas Caso distintas",
			"En cada app seleccionas los forms que incluye",
			"Una business rule que borra el form",
			"Organization ownership"
		],
		correct: [1],
		explanation: "La composición de la app elige forms y views. Además puedes usar form security por rol."
	},
	{
		id: "q28",
		domain: "d2",
		topic: "Model-driven",
		lessonId: "d2-model-driven",
		difficulty: "medium",
		stem: "Necesitas un kanban de casos dentro de la model-driven, sin publicar una segunda app. ¿Qué usas?",
		choices: [
			"Custom page (o generative page) en el sitemap",
			"Power Pages anónimo",
			"Un rollup",
			"Excel Online"
		],
		correct: [0],
		explanation: "Custom page = canvas dentro de la MDA. Generative pages producen ese tipo de pantalla."
	},
	{
		id: "q29",
		domain: "d2",
		topic: "Model-driven",
		lessonId: "d2-model-driven",
		difficulty: "easy",
		stem: "Un usuario tiene privilegios de Caso pero no ve la app en el lanzador. ¿Qué falta?",
		choices: [
			"Asociar su security role a la app / compartir la app",
			"Una prompt column",
			"Habilitar auditing",
			"Crear un chart"
		],
		correct: [0],
		explanation: "Ver datos ≠ ver la app. Falta app access."
	},
	{
		id: "q30",
		domain: "d2",
		topic: "Generative pages",
		lessonId: "d2-generative",
		difficulty: "easy",
		stem: "¿Qué debes hacer después de generar una página con lenguaje natural?",
		choices: [
			"Nada: se publica sola a producción",
			"Revisar controles, datos y accesibilidad, publicar y añadirla a la solución",
			"Convertirla en plugin",
			"Borrar las tablas origen"
		],
		correct: [1],
		explanation: "Generar es el 40%. Revisar, publicar y empaquetar es el trabajo del builder."
	},
	{
		id: "q31",
		domain: "d2",
		topic: "Canvas",
		lessonId: "d2-canvas",
		difficulty: "medium",
		stem: "Una galería de Dataverse no muestra pedidos antiguos. Filter usa una función no delegable. ¿Cuál es el diagnóstico?",
		choices: [
			"Falta un BPF",
			"La app está trabajando solo con las primeras N filas por el límite de delegación",
			"El ownership es Organization",
			"Monitor no está instalado en el tenant"
		],
		correct: [1],
		explanation: "Delegación: si no se empuja al servidor, solo ves el data row limit (500–2000)."
	},
	{
		id: "q32",
		domain: "d2",
		topic: "Canvas",
		lessonId: "d2-canvas",
		difficulty: "easy",
		stem: "Para que un lector de pantalla anuncie un icono-botón, ¿qué propiedad es esencial?",
		choices: [
			"Fill",
			"AccessibleLabel",
			"BorderRadius",
			"DelayOutput"
		],
		correct: [1],
		explanation: "AccessibleLabel es el skill de accesibilidad más preguntado."
	},
	{
		id: "q33",
		domain: "d2",
		topic: "Canvas",
		lessonId: "d2-canvas",
		difficulty: "medium",
		stem: "La app se diseñó a 1366×768 con controles en X/Y fijos y en el teléfono se solapan. ¿Qué enfoque es el correcto?",
		choices: [
			"Pedir a los usuarios que usen zoom",
			"Contenedores responsive y tamaños relativos a App.Width / Height",
			"Duplicar la app por cada resolución a mano sin contenedores",
			"Pasar todo a Power Pages"
		],
		correct: [1],
		explanation: "El study guide cita responsiveness. Contenedores, no coordenadas mágicas."
	},
	{
		id: "q34",
		domain: "d2",
		topic: "Canvas avanzado",
		lessonId: "d2-canvas-avanzado",
		difficulty: "easy",
		stem: "Necesitas un flag local para mostrar un popup solo en la pantalla actual. ¿Qué usas?",
		choices: [
			"ClearCollect",
			"UpdateContext",
			"Un rollup",
			"Environment variable"
		],
		correct: [1],
		explanation: "Context variable = scope de pantalla. Set sería global; collection es un conjunto."
	},
	{
		id: "q35",
		domain: "d2",
		topic: "Canvas avanzado",
		lessonId: "d2-canvas-avanzado",
		difficulty: "medium",
		stem: "Varias canvas apps comparten el mismo header. ¿Cómo lo reutilizas con versionado?",
		choices: [
			"Copiar y pegar controles",
			"Component library",
			"Una business rule",
			"Un chart"
		],
		correct: [1],
		explanation: "Component libraries se publican y referencian. Es el skill de reusable components."
	},
	{
		id: "q36",
		domain: "d2",
		topic: "Canvas avanzado",
		lessonId: "d2-canvas-avanzado",
		difficulty: "medium",
		stem: "Tienes constantes y cálculos derivados (IVA, URL de ayuda) que no deben ser Set en OnStart. ¿Qué feature moderna usas?",
		choices: [
			"Named formulas (App.Formulas)",
			"Access teams",
			"Do until",
			"Quick view form"
		],
		correct: [0],
		explanation: "Named formulas son reactivas e inmutables. El examen las nombra explícitamente."
	},
	{
		id: "q37",
		domain: "d2",
		topic: "Canvas avanzado",
		lessonId: "d2-canvas-avanzado",
		difficulty: "medium",
		stem: "Un Patch falla a veces y la app no dice nada. ¿Qué debes implementar?",
		choices: [
			"IfError / App.OnError y Notify",
			"Parental relationship",
			"Un dashboard",
			"Change tracking"
		],
		correct: [0],
		explanation: "Error handling es skill de canvas. Monitor ayuda a verlo en diseño."
	},
	{
		id: "q38",
		domain: "d2",
		topic: "Canvas avanzado",
		lessonId: "d2-canvas-avanzado",
		difficulty: "easy",
		stem: "¿Qué herramienta usas para ver en vivo si una fórmula se delega y cuánto tarda?",
		choices: [
			"Solution checker solo",
			"Monitor",
			"Power BI Desktop",
			"Auditing de Dataverse"
		],
		correct: [1],
		explanation: "Monitor es el nombre que pone el study guide."
	},
	{
		id: "q39",
		domain: "d2",
		topic: "Agentes",
		lessonId: "d2-agentes",
		difficulty: "medium",
		stem: "Tienes una canvas de inventario y quieres un copiloto que responda «¿cuántas unidades quedan de SKU-12?» y cree un movimiento. ¿Qué haces?",
		choices: [
			"Crear un agente de Copilot Studio desde la canvas, con knowledge de las tablas y una acción de flujo",
			"Una prompt column por SKU y nada más",
			"Un BPF de 12 etapas",
			"Compartir el Excel subyacente"
		],
		correct: [0],
		explanation: "Skill literal: create a Copilot Studio agent from a canvas app. Knowledge + acciones."
	},
	{
		id: "q40",
		domain: "d2",
		topic: "Power Pages",
		lessonId: "d2-agentes",
		difficulty: "medium",
		stem: "Clientes externos deben consultar el estado de sus pedidos sin usuario interno de Power Apps. ¿Qué plataforma?",
		choices: [
			"Compartir la canvas con «Everyone»",
			"Power Pages con table permissions",
			"Default environment",
			"Un owner team"
		],
		correct: [1],
		explanation: "Portales externos = Power Pages + table permissions. No se comparte una canvas interna a internet."
	},
	{
		id: "q41",
		domain: "d2",
		topic: "Canvas",
		lessonId: "d2-canvas-avanzado",
		difficulty: "medium",
		stem: "Un botón debe lanzar un flujo y esperar un número de ticket. ¿Qué patrón?",
		choices: [
			"Flow.Run(...) con Respond to a PowerApp or flow en el flujo",
			"Un scheduled flow cada 1 minuto",
			"Business rule scope Entity",
			"Row summary"
		],
		correct: [0],
		explanation: "Instant flow llamado desde canvas, con respuesta. Automate business processes from canvas apps."
	},
	{
		id: "q42",
		domain: "d2",
		topic: "Model-driven",
		lessonId: "d2-model-driven",
		difficulty: "easy",
		stem: "Quieres un gráfico de barras de casos por prioridad en la app. ¿Dónde se define el chart?",
		choices: [
			"En la tabla Caso y luego se incluye en la app / dashboard",
			"Solo en Power BI, obligatorio",
			"En una environment variable",
			"En el publisher"
		],
		correct: [0],
		explanation: "Charts de MDA viven en la tabla y se exponen en la app."
	},
	{
		id: "q43",
		domain: "d2",
		topic: "Canvas avanzado",
		lessonId: "d2-canvas-avanzado",
		difficulty: "hard",
		stem: "¿Cuál es una buena razón para una user-defined function en Power Fx?",
		choices: [
			"Sustituir Dataverse",
			"Encapsular una validación o transformación reutilizada en varios controles",
			"Crear security roles",
			"Habilitar auditing"
		],
		correct: [1],
		explanation: "UDFs = lógica reutilizable. El study guide las lista junto a named formulas y libraries."
	},
	{
		id: "q44",
		domain: "d2",
		topic: "Model-driven",
		lessonId: "d2-model-driven",
		difficulty: "medium",
		stem: "El lookup de Cliente dentro del Caso debe mostrar teléfono y segmento sin abrir el registro. ¿Qué form?",
		choices: [
			"Quick view form",
			"Dashboard de usuario",
			"Receipt model de AI Hub",
			"Quick find view solo"
		],
		correct: [0],
		explanation: "Quick view se incrusta en el form padre para leer el related."
	},
	{
		id: "q45",
		domain: "d2",
		topic: "Generative pages",
		lessonId: "d2-generative",
		difficulty: "medium",
		stem: "Legal prohíbe Copilot de usuario final en el entorno de nómina. ¿Qué haces en la model-driven de RR. HH.?",
		choices: [
			"Igual incrustas un agente porque el study guide lo pide siempre",
			"Respetas la política del entorno y no habilitas Copilot/agentes en esa app",
			"Mueves la app al Default environment",
			"Conviertes salarios en prompt columns"
		],
		correct: [1],
		explanation: "Gobierno e IA responsable. El builder no fuerza Copilot donde la política lo bloquea."
	}
];
var Q_D3 = [
	{
		id: "q46",
		domain: "d3",
		topic: "Flujos",
		lessonId: "d3-flows",
		difficulty: "easy",
		stem: "Cuando se crea un Caso con Prioridad = Alta debe avisarse a un canal de Teams. ¿Qué trigger?",
		choices: [
			"Scheduled recurrence cada 5 minutos",
			"Dataverse When a row is added, con filtro de tabla Caso y condición de prioridad",
			"Manual button que el usuario no usará",
			"Power Apps instant sin app"
		],
		correct: [1],
		explanation: "Evento de datos = automated Dataverse trigger + filtro. Recurrence es un anti-patrón."
	},
	{
		id: "q47",
		domain: "d3",
		topic: "Flujos",
		lessonId: "d3-flows",
		difficulty: "medium",
		stem: "El flujo no se dispara al actualizar Descripción. Sí se dispara al cambiar Estado. ¿Causa típica?",
		choices: [
			"El trigger tiene «select columns» / filtro de atributos que no incluye Descripción",
			"Dataverse no soporta updates",
			"Falta un chart",
			"La app es canvas"
		],
		correct: [0],
		explanation: "Filtering attributes del trigger Dataverse. Si no está la columna, no hay run."
	},
	{
		id: "q48",
		domain: "d3",
		topic: "Flujos",
		lessonId: "d3-flows",
		difficulty: "medium",
		stem: "Si falla el envío de email, debe crearse una tarea; si el email va bien, no. ¿Cómo se configura la tarea?",
		choices: [
			"Apply to each con concurrencia 50",
			"Configure run after: has failed sobre la acción de email",
			"Do until true",
			"Un BPF"
		],
		correct: [1],
		explanation: "Run after es el patrón de compensación. Skill de troubleshooting/control."
	},
	{
		id: "q49",
		domain: "d3",
		topic: "Flujos",
		lessonId: "d3-flows",
		difficulty: "hard",
		stem: "Dos actualizaciones simultáneas del mismo pedido lanzan el flujo dos veces y duplican el envío a SAP. ¿Qué mitiga mejor?",
		choices: [
			"Concurrency control del trigger (grado 1) e idempotencia en la acción",
			"Quitar Dataverse",
			"Usar una canvas en lugar del flujo",
			"Row summary"
		],
		correct: [0],
		explanation: "Serializar por trigger y hacer la acción idempotente. Clásico de producción."
	},
	{
		id: "q50",
		domain: "d3",
		topic: "Conectores",
		lessonId: "d3-flows",
		difficulty: "easy",
		stem: "El cliente no tiene conectores premium y necesita leer un buzón de Office 365. ¿Qué tipo de conector?",
		choices: [
			"SQL Server premium",
			"Conector estándar de Office 365 Outlook",
			"HTTP con Azure AD (premium) obligatorio",
			"Custom connector aunque exista el estándar"
		],
		correct: [1],
		explanation: "Evaluar conectores: usa estándar si cubre el escenario."
	},
	{
		id: "q51",
		domain: "d3",
		topic: "Aprobaciones",
		lessonId: "d3-approvals",
		difficulty: "easy",
		stem: "Un gasto > 500 € debe ser aprobado por el manager en Teams antes de continuar. ¿Qué acción?",
		choices: [
			"Start and wait for an approval",
			"Una named formula",
			"Duplicate detection",
			"Quick create"
		],
		correct: [0],
		explanation: "Approvals nativo. El flujo hiberna hasta la respuesta."
	},
	{
		id: "q52",
		domain: "d3",
		topic: "Aprobaciones",
		lessonId: "d3-approvals",
		difficulty: "medium",
		stem: "Finanzas y Compliance deben aprobar ambos; si uno rechaza, se cancela. ¿Qué tipo?",
		choices: [
			"First to respond",
			"Everyone must approve",
			"Scheduled recurrence",
			"Row summary"
		],
		correct: [1],
		explanation: "Everyone must approve encaja con «ambos». First to respond bastaría con uno."
	},
	{
		id: "q53",
		domain: "d3",
		topic: "AI Hub",
		lessonId: "d3-ai-hub",
		difficulty: "medium",
		stem: "Los usuarios pulsan un botón «Redactar respuesta» en canvas y editan el texto antes de guardar. ¿Qué artefacto?",
		choices: [
			"Prompt column (se ejecuta sola al guardar)",
			"Prompt de AI Hub consumido desde la app",
			"Rollup",
			"Access team"
		],
		correct: [1],
		explanation: "A demanda + revisión humana = prompt de AI Hub llamado por la app. Prompt column es automática y persistida."
	},
	{
		id: "q54",
		domain: "d3",
		topic: "AI Hub",
		lessonId: "d3-ai-hub",
		difficulty: "easy",
		stem: "Hay que extraer total, fecha y proveedor de PDFs de factura con esquema estable. ¿La mejor primera opción?",
		choices: [
			"Modelo prebuilt de invoices",
			"Un BPF",
			"Choice global",
			"Hierarchy security"
		],
		correct: [0],
		explanation: "Documentos conocidos → modelo prebuilt, no un prompt genérico ni lógica de app."
	},
	{
		id: "q55",
		domain: "d3",
		topic: "AI Hub",
		lessonId: "d3-ai-hub",
		difficulty: "medium",
		stem: "Un prompt de AI Hub debe clasificar con categorías fijas y poco «creativo». ¿Qué ajuste?",
		choices: [
			"Subir al máximo la temperatura",
			"Bajar la temperatura y pedir JSON / etiqueta cerrada",
			"Quitar los inputs",
			"Mover el prompt a Default Solution"
		],
		correct: [1],
		explanation: "Customize prompt settings: temperatura baja + formato de salida."
	},
	{
		id: "q56",
		domain: "d3",
		topic: "AI Hub",
		lessonId: "d3-ai-hub",
		difficulty: "medium",
		stem: "El prompt alucina cláusulas que no están en la política interna. ¿Qué le añades?",
		choices: [
			"Knowledge (documentos/datos de grounding)",
			"Un chart",
			"Parental cascade",
			"Monitor de canvas"
		],
		correct: [0],
		explanation: "Add knowledge to a prompt. Skill literal del study guide."
	},
	{
		id: "q57",
		domain: "d3",
		topic: "AI Hub",
		lessonId: "d3-ai-hub",
		difficulty: "easy",
		stem: "Un flujo debe resumir la descripción del caso y escribir el resumen en Dataverse. ¿Dónde se consume el prompt?",
		choices: [
			"Solo en Power BI",
			"Acción de cloud flow (Run a prompt) y luego Update row",
			"En el publisher prefix",
			"En una vista pública"
		],
		correct: [1],
		explanation: "Consume a prompt in cloud flows: acción + Patch/Update."
	},
	{
		id: "q58",
		domain: "d3",
		topic: "Business rules",
		lessonId: "d3-rules-bpf",
		difficulty: "medium",
		stem: "El campo Motivo debe ser obligatorio siempre, incluso si el registro entra por API. ¿Scope de la business rule?",
		choices: [
			"Specific form",
			"All forms",
			"Entity (tabla)",
			"Canvas only"
		],
		correct: [2],
		explanation: "Solo Entity corre en servidor y cubre API. All forms es solo UX model-driven."
	},
	{
		id: "q59",
		domain: "d3",
		topic: "Business rules",
		lessonId: "d3-rules-bpf",
		difficulty: "easy",
		stem: "Quieres sugerir un valor de Producto sin bloquear al usuario. ¿Qué acción de rule?",
		choices: [
			"Set business required",
			"Set recommendation",
			"Lock field y hide",
			"Delete row"
		],
		correct: [1],
		explanation: "Recommendation = bombilla, no obliga. Required sí bloquea."
	},
	{
		id: "q60",
		domain: "d3",
		topic: "Business rules",
		lessonId: "d3-rules-bpf",
		difficulty: "medium",
		stem: "¿Qué NO puede hacer una business rule?",
		choices: [
			"Ocultar un campo en un form",
			"Llamar a SAP y esperar 2 días una aprobación",
			"Poner un valor por defecto",
			"Bloquear un campo"
		],
		correct: [1],
		explanation: "Sin conectores ni espera. Eso es cloud flow + approvals."
	},
	{
		id: "q61",
		domain: "d3",
		topic: "BPF",
		lessonId: "d3-rules-bpf",
		difficulty: "easy",
		stem: "Ventas debe pasar por Cualificar → Propuesta → Cierre, con campos distintos en cada etapa. ¿Qué usas?",
		choices: [
			"Business process flow",
			"Prompt column",
			"Component library",
			"Alternate key"
		],
		correct: [0],
		explanation: "BPF = guía por etapas humanas. Skill central y a menudo subestimado."
	},
	{
		id: "q62",
		domain: "d3",
		topic: "BPF",
		lessonId: "d3-rules-bpf",
		difficulty: "medium",
		stem: "Si el importe supera 10.000, el BPF debe ir a una etapa de Dirección. ¿Qué feature?",
		choices: [
			"Branching condicional del BPF",
			"Hierarchy security",
			"Quick find view",
			"Named formula"
		],
		correct: [0],
		explanation: "BPF soporta ramas condicionales. No hace falta un segundo proceso."
	},
	{
		id: "q63",
		domain: "d3",
		topic: "BPF",
		lessonId: "d3-rules-bpf",
		difficulty: "medium",
		stem: "Al entrar en la etapa Aprobación debe lanzarse un flujo de approval. ¿Cómo se enlaza?",
		choices: [
			"Cloud flow disparado por cambio de etapa / Dataverse del proceso",
			"Una vista pública",
			"El publisher",
			"Un PCF obligatorio"
		],
		correct: [0],
		explanation: "BPF + flow es el patrón. El study guide habla de triggering flows on process/stage."
	},
	{
		id: "q64",
		domain: "d3",
		topic: "Columnas lógica",
		lessonId: "d3-columnas-logica",
		difficulty: "easy",
		stem: "Quieres la suma de Importes de las líneas de un Pedido en la cabecera. ¿Qué columna?",
		choices: [
			"Rollup SUM",
			"Choice global",
			"File column",
			"Access team"
		],
		correct: [0],
		explanation: "Agregar hijos 1:N = rollup. Un flujo que suma en cada Patch es frágil."
	},
	{
		id: "q65",
		domain: "d3",
		topic: "Columnas lógica",
		lessonId: "d3-columnas-logica",
		difficulty: "medium",
		stem: "Un KPI de cabecera tarda horas en actualizarse tras crear líneas. ¿Por qué es esperable en un rollup?",
		choices: [
			"Los rollups son asíncronos (trabajo periódico) salvo recálculo forzado",
			"Dataverse no guarda números",
			"Falta Power Pages",
			"El rollup solo funciona en canvas"
		],
		correct: [0],
		explanation: "Límite clave: asincronía. Si el escenario exige tiempo real estricto, hay que decirlo."
	},
	{
		id: "q66",
		domain: "d3",
		topic: "Columnas lógica",
		lessonId: "d3-columnas-logica",
		difficulty: "easy",
		stem: "«Días abierto» a partir de Created On, en la misma fila. ¿La opción moderna?",
		choices: [
			"Formula column (Power Fx)",
			"Everyone must approve",
			"Virtual table",
			"PCF"
		],
		correct: [0],
		explanation: "Cálculo intra-fila = formula (o calculated legado). No rollup."
	},
	{
		id: "q67",
		domain: "d3",
		topic: "Decisión de lógica",
		lessonId: "d3-columnas-logica",
		difficulty: "hard",
		stem: "Hay que ocultar el campo Interno si Tipo = Público, guiar al agente por 4 etapas, y avisar a SAP al cerrar. ¿Combinación correcta?",
		choices: [
			"Un único flujo que hace las tres cosas",
			"Business rule + BPF + cloud flow",
			"Tres prompt columns",
			"Solo canvas variables"
		],
		correct: [1],
		explanation: "La matriz de decisión: UX de campo = rule, etapas = BPF, sistema externo = flow."
	},
	{
		id: "q68",
		domain: "d3",
		topic: "Flujos",
		lessonId: "d3-flows",
		difficulty: "medium",
		stem: "Un flujo supera el límite de acciones y se reutiliza desde tres procesos. ¿Qué haces?",
		choices: [
			"Child flow en una solución",
			"Pegar las acciones 3 veces",
			"Pasar a Excel",
			"Desactivar ALM"
		],
		correct: [0],
		explanation: "Child flows = reutilización y límites. Deben vivir en solución."
	},
	{
		id: "q69",
		domain: "d3",
		topic: "Flujos",
		lessonId: "d3-flows",
		difficulty: "medium",
		stem: "Apply to each actualiza 200 filas y a veces se pisan. ¿Qué configuras?",
		choices: [
			"Concurrencia del bucle (p. ej. 1 para secuencial) y evitar escrituras cruzadas",
			"Quitar Dataverse security",
			"Usar Default Solution",
			"Row summary en cada fila"
		],
		correct: [0],
		explanation: "Concurrency del apply to each. Skill de control de flujo."
	},
	{
		id: "q70",
		domain: "d3",
		topic: "AI Hub",
		lessonId: "d3-ai-hub",
		difficulty: "hard",
		stem: "¿Cuándo prefieres un modelo custom de clasificación frente a un prompt GPT?",
		choices: [
			"Cuando hay un conjunto etiquetado de casos y quieres un esquema de salida estable con confianza",
			"Cuando el usuario quiere un poema",
			"Cuando no hay datos",
			"Siempre, los prompts están prohibidos"
		],
		correct: [0],
		explanation: "Custom model: entrenamiento y confianza. Prompt: flexibilidad. El examen espera el matiz."
	},
	{
		id: "q71",
		domain: "d3",
		topic: "Aprobaciones",
		lessonId: "d3-approvals",
		difficulty: "medium",
		stem: "El registro debe mostrar Estado = Pendiente mientras Teams espera al manager. ¿Dónde actualizas el estado?",
		choices: [
			"En el flujo, antes del wait y después según Outcome",
			"Solo en una named formula",
			"No se puede",
			"En el favicon"
		],
		correct: [0],
		explanation: "La app lee Dataverse. El flujo mantiene el campo de estado alrededor del approval."
	},
	{
		id: "q72",
		domain: "d3",
		topic: "Decisión de lógica",
		lessonId: "d3-columnas-logica",
		difficulty: "hard",
		stem: "«Cada vez que se guarda el caso, rellenar un Resumen ejecutivo usable en vistas y Power BI». ¿La mejor pieza?",
		choices: [
			"Prompt column",
			"Row summary",
			"Un popup de canvas sin Patch",
			"First to respond approval"
		],
		correct: [0],
		explanation: "Persistido + vistas + reportes = prompt column, no row summary (solo ficha Copilot)."
	},
	{
		id: "q73",
		domain: "d3",
		topic: "Flujos",
		lessonId: "d3-flows",
		difficulty: "easy",
		stem: "Un usuario pulsa un botón en una canvas para enviar un recordatorio ahora. ¿Tipo de flujo?",
		choices: [
			"Instant (Power Apps trigger)",
			"Recurrence cada 24 h sin botón",
			"Business rule",
			"Virtual table"
		],
		correct: [0],
		explanation: "Instant / Power Apps. Recommend cloud flow triggers."
	},
	{
		id: "q74",
		domain: "d3",
		topic: "Business rules",
		lessonId: "d3-rules-bpf",
		difficulty: "medium",
		stem: "Una rule de All forms oculta Descuento, pero la importación de Excel sigue metiendo descuentos. ¿Por qué?",
		choices: [
			"All forms no corre en servidor; hace falta scope Entity (o impedir el privilegio)",
			"Excel ignora Dataverse",
			"Falta un chart",
			"Las rules no se publican nunca"
		],
		correct: [0],
		explanation: "Scope es la trampa más rentable de business rules."
	},
	{
		id: "q75",
		domain: "d3",
		topic: "BPF",
		lessonId: "d3-rules-bpf",
		difficulty: "hard",
		stem: "El proceso de onboarding cruza Candidato y Empleado (dos tablas). ¿Puede un BPF?",
		choices: [
			"Sí, un BPF puede abarcar varias tablas en etapas sucesivas",
			"No, un BPF es de una sola tabla siempre",
			"Solo si ambas son Organization-owned",
			"Solo en Power Pages"
		],
		correct: [0],
		explanation: "BPF multi-table (Lead→Opportunity, etc.). Dato de PL-200 que sigue vivo en AB-410."
	}
];
var QUESTIONS = [
	...Q_D1,
	...Q_D2,
	...Q_D3
];
function questionsForLesson(lessonId) {
	return QUESTIONS.filter((q) => q.lessonId === lessonId);
}
function questionsForDomain(domain) {
	return QUESTIONS.filter((q) => q.domain === domain);
}
/** Deterministic shuffle from a seed so a mock exam is stable if resumed. */
function pickExamQuestions(count = 50, seed = Date.now()) {
	const rng = mulberry32(seed);
	const byDomain = {
		d1: questionsForDomain("d1"),
		d2: questionsForDomain("d2"),
		d3: questionsForDomain("d3")
	};
	const target = {
		d1: Math.round(count * .28),
		d2: Math.round(count * .28),
		d3: 0
	};
	target.d3 = count - target.d1 - target.d2;
	const picked = [];
	[
		"d1",
		"d2",
		"d3"
	].forEach((d) => {
		const pool = shuffle([...byDomain[d]], rng);
		picked.push(...pool.slice(0, Math.min(target[d], pool.length)));
	});
	const leftover = QUESTIONS.filter((q) => !picked.includes(q));
	const need = count - picked.length;
	if (need > 0) picked.push(...shuffle(leftover, rng).slice(0, need));
	return shuffle(picked, rng).slice(0, count);
}
function mulberry32(a) {
	return function() {
		a |= 0;
		a = a + 1831565813 | 0;
		let t = Math.imul(a ^ a >>> 15, 1 | a);
		t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
		return ((t ^ t >>> 14) >>> 0) / 4294967296;
	};
}
function shuffle(arr, rng) {
	const a = [...arr];
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(rng() * (i + 1));
		[a[i], a[j]] = [a[j], a[i]];
	}
	return a;
}
function isCorrect(q, selected) {
	if (selected.length !== q.correct.length) return false;
	const a = [...selected].sort();
	const b = [...q.correct].sort();
	return a.every((v, i) => v === b[i]);
}
function scaledScore(correct, total) {
	if (total <= 0) return 0;
	return Math.round(correct / total * 1e3);
}
var empty = {
	completedLessons: [],
	lastLessonId: null,
	quizAttempts: [],
	examAttempts: [],
	flashBoxes: {},
	completedLabs: [],
	bookmarks: []
};
var useProgress = create()(persist((set, get) => ({
	...empty,
	markLesson: (id) => set({
		completedLessons: Array.from(/* @__PURE__ */ new Set([...get().completedLessons, id])),
		lastLessonId: id
	}),
	unmarkLesson: (id) => set({ completedLessons: get().completedLessons.filter((x) => x !== id) }),
	setLastLesson: (id) => set({ lastLessonId: id }),
	addQuizAttempt: (attempt) => set({ quizAttempts: [attempt, ...get().quizAttempts].slice(0, 80) }),
	addExamAttempt: (attempt) => set({ examAttempts: [attempt, ...get().examAttempts].slice(0, 20) }),
	setCardBox: (id, box) => set({ flashBoxes: {
		...get().flashBoxes,
		[id]: box
	} }),
	markLab: (id) => set({ completedLabs: Array.from(/* @__PURE__ */ new Set([...get().completedLabs, id])) }),
	toggleBookmark: (id) => {
		set({ bookmarks: get().bookmarks.includes(id) ? get().bookmarks.filter((x) => x !== id) : [...get().bookmarks, id] });
	},
	resetAll: () => set(empty)
}), { name: "aether-ab410-progress" }));
function domainMastery(domainId) {
	const lessons = LESSONS.filter((l) => l.domain === domainId);
	const done = useProgress.getState().completedLessons;
	const lessonPct = lessons.length ? lessons.filter((l) => done.includes(l.id)).length / lessons.length : 0;
	const qIds = new Set(QUESTIONS.filter((q) => q.domain === domainId).map((q) => q.id));
	const attempts = useProgress.getState().quizAttempts;
	let hits = 0;
	let seen = 0;
	const latestByQ = /* @__PURE__ */ new Map();
	for (const a of [...attempts].reverse()) {
		for (const id of a.correctIds) if (qIds.has(id)) latestByQ.set(id, true);
		for (const id of a.missedIds) if (qIds.has(id)) latestByQ.set(id, false);
	}
	for (const v of latestByQ.values()) {
		seen += 1;
		if (v) hits += 1;
	}
	const quizPct = seen ? hits / seen : 0;
	return {
		lessonPct,
		quizPct,
		score: lessonPct * .45 + quizPct * .55,
		seen
	};
}
function readinessScore() {
	const weights = {
		d1: .275,
		d2: .275,
		d3: .45
	};
	let acc = 0;
	for (const d of DOMAINS) acc += domainMastery(d.id).score * (weights[d.id] ?? 0);
	const exams = useProgress.getState().examAttempts;
	const lastExamBoost = exams[0] ? Math.min(exams[0].scaled / 1e3, 1) * .12 : 0;
	const base = acc * (exams[0] ? .88 : 1);
	return Math.round((base + lastExamBoost) * 1e3);
}
var NAV = [
	{
		to: "/",
		label: "Inicio",
		icon: House
	},
	{
		to: "/aprender",
		label: "Aprender",
		icon: BookOpen
	},
	{
		to: "/practicar",
		label: "Practicar",
		icon: ClipboardCheck
	},
	{
		to: "/examen",
		label: "Examen",
		icon: GraduationCap
	},
	{
		to: "/tarjetas",
		label: "Tarjetas",
		icon: Layers
	},
	{
		to: "/labs",
		label: "Labs",
		icon: Boxes
	}
];
function Shell({ children }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const completed = useProgress((s) => s.completedLessons);
	const pct = LESSONS.length ? completed.length / LESSONS.length * 100 : 0;
	const [open, setOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setOpen(false);
	}, [pathname]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "#contenido",
				className: "sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-fg focus:px-3 focus:py-2 focus:text-bg",
				children: "Saltar al contenido"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "sticky top-0 z-40 border-b border-border bg-bg/90 backdrop-blur-md",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex h-14 max-w-6xl items-center gap-3 px-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/",
							className: "flex items-center gap-2.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-display text-lg tracking-tight",
									children: "Aether"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "hidden text-xs tracking-[0.18em] text-muted sm:inline",
									children: "AB-410"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
							className: "ml-6 hidden items-center gap-1 md:flex",
							children: NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
								...item,
								pathname
							}, item.to))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "ml-auto flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "hidden w-28 sm:block",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, { value: pct })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								className: "md:hidden",
								"aria-label": open ? "Cerrar menú" : "Abrir menú",
								onClick: () => setOpen((v) => !v),
								children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, {})
							})]
						})
					]
				}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "border-t border-border px-3 py-2 md:hidden",
					children: [
						NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
							...item,
							pathname,
							className: "flex h-11 w-full items-center justify-start gap-3 px-3"
						}, item.to)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/glosario",
							className: "flex h-11 items-center px-3 text-sm text-muted",
							children: "Glosario"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/guia",
							className: "flex h-11 items-center px-3 text-sm text-muted",
							children: "Guía del examen"
						})
					]
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				id: "contenido",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "border-t border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-8 text-sm text-muted",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Aether · preparación AB-410. Progreso en este dispositivo." }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/glosario",
							className: "hover:text-fg",
							children: "Glosario"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/guia",
							className: "hover:text-fg",
							children: "Guía"
						})]
					})]
				})
			})
		]
	});
}
function NavLink({ to, label, icon: Icon, pathname, className }) {
	const active = to === "/" ? pathname === "/" : pathname === to || pathname.startsWith(`${to}/`);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to,
		className: cn("inline-flex h-9 items-center gap-2 rounded-[10px] px-3 text-sm text-muted transition-colors duration-150 hover:text-fg", active && "bg-elevated text-fg", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }), label]
	});
}
function Mark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 24 24",
		className: cn("size-6 text-accent", className),
		"aria-hidden": true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M12 2.5 20.5 12 12 21.5 3.5 12 12 2.5Z",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "1.4"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M12 7.5 16.5 12 12 16.5 7.5 12 12 7.5Z",
			fill: "currentColor",
			opacity: "0.85"
		})]
	});
}
function Page({ children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: cn("mx-auto w-full max-w-6xl px-4 py-8 sm:py-10", className),
		children
	});
}
var styles_default = "/assets/styles-DNjC4Kns.css";
var APP_NAME = "Aether · AB-410";
var Route$11 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "description",
				content: "Academia para el examen Microsoft AB-410: Intelligent Applications Builder Associate. Lecciones, labs, tarjetas y simulacros."
			},
			{
				name: "theme-color",
				content: "#0B0C0E"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Fraunces:opsz,wght@9..144,500;9..144,600&family=IBM+Plex+Mono:wght@400;500&display=swap"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "es",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	})
});
var $$splitComponentImporter$10 = () => import("./routes-CocJVbUP.mjs");
var Route$10 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
var $$splitComponentImporter$9 = () => import("./aprender-DdVb6Ox6.mjs");
var Route$9 = createFileRoute("/aprender")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./examen-ZdTmG24x.mjs");
var Route$8 = createFileRoute("/examen")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./glosario-CxVTU_nJ.mjs");
var Route$7 = createFileRoute("/glosario")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./guia-B_s-LySb.mjs");
var Route$6 = createFileRoute("/guia")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./labs-CPj6eQoR.mjs");
var Route$5 = createFileRoute("/labs")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./practicar-Dz5_Eyyi.mjs");
var Route$4 = createFileRoute("/practicar")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./tarjetas-DCcrWbNN.mjs");
var Route$3 = createFileRoute("/tarjetas")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./lab._id-CmwR3NNt.mjs");
var Route$2 = createFileRoute("/lab/$id")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./leccion._id-w24dWgPT.mjs");
var Route$1 = createFileRoute("/leccion/$id")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./quiz._id-B0_dhffi.mjs");
var Route = createFileRoute("/quiz/$id")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var rootRouteChildren = {
	IndexRoute: Route$10.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$11
	}),
	AprenderRoute: Route$9.update({
		id: "/aprender",
		path: "/aprender",
		getParentRoute: () => Route$11
	}),
	ExamenRoute: Route$8.update({
		id: "/examen",
		path: "/examen",
		getParentRoute: () => Route$11
	}),
	GlosarioRoute: Route$7.update({
		id: "/glosario",
		path: "/glosario",
		getParentRoute: () => Route$11
	}),
	GuiaRoute: Route$6.update({
		id: "/guia",
		path: "/guia",
		getParentRoute: () => Route$11
	}),
	LabsRoute: Route$5.update({
		id: "/labs",
		path: "/labs",
		getParentRoute: () => Route$11
	}),
	PracticarRoute: Route$4.update({
		id: "/practicar",
		path: "/practicar",
		getParentRoute: () => Route$11
	}),
	TarjetasRoute: Route$3.update({
		id: "/tarjetas",
		path: "/tarjetas",
		getParentRoute: () => Route$11
	}),
	LabIdRoute: Route$2.update({
		id: "/lab/$id",
		path: "/lab/$id",
		getParentRoute: () => Route$11
	}),
	LeccionIdRoute: Route$1.update({
		id: "/leccion/$id",
		path: "/leccion/$id",
		getParentRoute: () => Route$11
	}),
	QuizIdRoute: Route.update({
		id: "/quiz/$id",
		path: "/quiz/$id",
		getParentRoute: () => Route$11
	})
};
var routeTree = Route$11._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function NotFound() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-lg px-4 py-20 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs uppercase tracking-[0.2em] text-muted",
				children: "404"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-3xl",
				children: "No está en el temario"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-muted",
				children: "Esa ruta no existe. Vuelve al inicio o a la ruta de estudio."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "/",
				className: "mt-6 inline-block text-sm text-accent",
				children: "Ir al inicio"
			})
		]
	});
}
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent,
		defaultNotFoundComponent: NotFound
	});
}
//#endregion
export { cn as C, Button as S, LESSONS as _, Page as a, prevLesson as b, useProgress as c, pickExamQuestions as d, questionsForDomain as f, EXAM as g, DOMAINS as h, Route$2 as i, QUESTIONS as l, scaledScore as m, Route as n, domainMastery as o, questionsForLesson as p, Route$1 as r, readinessScore as s, router_exports as t, isCorrect as u, getLesson as v, Progress as x, nextLesson as y };
