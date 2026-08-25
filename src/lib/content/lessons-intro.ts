import type { Lesson } from "./types";

export const INTRO_LESSONS: Lesson[] = [
  {
    id: "intro",
    domain: "intro",
    order: 0,
    title: "Qué es AB-410 y cómo se aprueba",
    minutes: 12,
    summary:
      "El mapa del examen, el rol que Microsoft evalúa y una estrategia de estudio alineada a los pesos oficiales.",
    objectives: [
      "Identificar el rol Intelligent Applications Builder Associate",
      "Memorizar los tres dominios y sus pesos",
      "Elegir una estrategia de estudio de 2–4 semanas",
      "Conocer formato, puntuación y trampas típicas",
    ],
    blocks: [
      {
        type: "p",
        text: "AB-410 (Building Intelligent Applications) es el examen de la certificación Microsoft Certified: Intelligent Applications Builder Associate. Sustituye de facto a PL-200: el centro ya no es el consultor funcional, sino quien construye soluciones de Power Platform con IA incrustada — Copilot, prompts, agentes, AI Hub — sobre Dataverse, apps y flujos.",
      },
      {
        type: "h2",
        text: "Qué espera Microsoft de ti",
      },
      {
        type: "p",
        text: "El candidato diseña y construye soluciones con Copilot, lenguaje natural y low-code. Crea modelos de datos, model-driven apps, canvas apps, flujos y lógica de negocio. Integra agentes y funciones Copilot en canvas, model-driven y Power Pages. Colabora con administradores de entorno, gobierno (IA responsable, ALM) y stakeholders.",
      },
      {
        type: "ul",
        items: [
          "Experiencia previa esperada: Dataverse, Power Apps, cloud flows, Power Fx, Copilot en maker studio, nociones de Copilot Studio y AI Hub.",
          "No es un examen de código C# ni de administración pura (eso es de otros roles). Sí pregunta seguridad, entornos y ALM lo suficiente para construir bien.",
          "La IA no se estudia aparte: se estudia cómo se añade a una solución que ya tiene tablas, apps y flujos.",
        ],
      },
      {
        type: "h2",
        text: "Dominios y pesos (study guide oficial)",
      },
      {
        type: "table",
        headers: ["Dominio", "Peso", "Qué cae"],
        rows: [
          [
            "1. Cimientos",
            "25–30%",
            "Requisitos, agentes built-in, extensibilidad, tipos de entorno, ALM, tablas, columnas, relaciones, prompt columns, row summaries, vistas, formularios, seguridad",
          ],
          [
            "2. Aplicaciones inteligentes",
            "25–30%",
            "Model-driven (forms, views, generative pages, charts, acceso), canvas (datos, accesibilidad, componentes, variables, errores, Monitor, agente desde canvas)",
          ],
          [
            "3. Lógica y automatización",
            "40–45%",
            "Cloud flows, aprobaciones, AI Hub (prompts y modelos), business rules, BPF, columnas calculated / rollup / formula",
          ],
        ],
      },
      {
        type: "callout",
        kind: "exam",
        title: "El dominio 3 pesa casi la mitad",
        text: "Quien solo estudia apps y se salta flujos, BPF y AI Hub llega al 55–60% y no cruza 700. Reserva al menos el 40% de tu tiempo a automatización y lógica.",
      },
      {
        type: "h2",
        text: "Formato del día del examen",
      },
      {
        type: "ul",
        items: [
          "Duración típica: 120 minutos. 40–60 preguntas. Aprobado: 700 / 1000.",
          "Tipos: opción múltiple, varias correctas, escenarios con varias preguntas asociadas, a veces componentes interactivos.",
          "Microsoft Learn está disponible dentro del examen, pero el reloj no se detiene. Úsalo para confirmar un detalle (nombre de acción, límite), no para aprender un tema.",
          "Idioma: inglés de base. Si no está en tu idioma, puedes pedir 30 minutos extra.",
          "Precio de referencia: 165 USD (varía por país). Pearson Vue, proctored.",
        ],
      },
      {
        type: "h2",
        text: "Cómo se diferencia de PL-200 y PL-900",
      },
      {
        type: "compare",
        left: {
          title: "PL-200 (legado)",
          items: [
            "Persona: functional consultant",
            "Fuerte en Dataverse, MDA, BPF, reglas",
            "IA era un extra (AI Builder clásico)",
            "Menos énfasis en canvas avanzado y agentes",
          ],
        },
        right: {
          title: "AB-410 (actual)",
          items: [
            "Persona: app builder con IA",
            "Mantiene el núcleo de Dataverse/apps/flujos",
            "Prompt columns, AI Hub, Copilot Studio, generative pages",
            "La IA se evalúa como capa sobre soluciones reales",
          ],
        },
      },
      {
        type: "p",
        text: "Si vienes de cero, PL-900 sigue siendo un buen calentamiento. Si ya pasaste PL-200, no empieces de cero: refuerza Dataverse y BPF, y dedica bloques enteros a prompt columns, AI Hub, agentes y generative pages.",
      },
      {
        type: "h2",
        text: "Estrategia de 3 semanas (esta academia)",
      },
      {
        type: "steps",
        items: [
          {
            title: "Semana 1 — Cimientos",
            text: "Lecciones del dominio 1 + laboratorio de modelo de datos. Quiz de cada lección hasta ≥80%. Flashcards de tablas, relaciones y seguridad cada día.",
          },
          {
            title: "Semana 2 — Apps + automatización",
            text: "Dominios 2 y 3. Un lab de model-driven, uno de canvas y uno de flujo con aprobación y prompt. No pases de lección sin el quiz.",
          },
          {
            title: "Semana 3 — Simulacros",
            text: "Dos o tres exámenes cronometrados de 50 preguntas. Revisa cada fallo con la lección. El objetivo no es memorizar la pregunta, es cerrar el hueco.",
          },
        ],
      },
      {
        type: "callout",
        kind: "tip",
        title: "Cómo piensa el examen",
        text: "Casi siempre hay un escenario de negocio. La respuesta correcta es la que usa el componente con el menor coste de mantenimiento y el scope correcto: regla de negocio si es un campo en formulario, flujo si hay conector o aprobación, BPF si hay etapas humanas, prompt column si el insight debe persistir en la fila.",
      },
      {
        type: "h2",
        text: "Lo que esta app cubre — y lo que no",
      },
      {
        type: "p",
        text: "Aquí tienes el temario completo del study guide, preguntas al estilo del examen, flashcards, laboratorios guiados (simulados: no se conectan a tu tenant) y simulacros con puntuación 700/1000. No sustituye un tenant de desarrollador: si puedes, replica cada lab en make.powerapps.com. El progreso se guarda en este dispositivo.",
      },
    ],
  },
];
