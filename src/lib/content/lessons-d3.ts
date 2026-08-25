import type { Lesson } from "./types";

export const D3_LESSONS: Lesson[] = [
  {
    id: "d3-flows",
    domain: "d3",
    order: 11,
    title: "Cloud flows: triggers, conectores y control",
    minutes: 22,
    summary:
      "El bloque más pesado del examen: diseñar flujos que no se rompan en producción.",
    objectives: [
      "Elegir el trigger correcto",
      "Evaluar conectores estándar vs premium",
      "Usar condiciones, loops, run after y concurrencia",
    ],
    blocks: [
      {
        type: "p",
        text: "Dominio 3 vale 40–45%. Si dominas flujos, ya has ganado una franja enorme. Un cloud flow es: trigger → acciones → control de errores. Vive en una solución, usa connection references y se prueba con datos reales.",
      },
      {
        type: "h2",
        text: "Tipos de trigger — recomendar",
      },
      {
        type: "table",
        headers: ["Trigger", "Cuándo", "Notas de examen"],
        rows: [
          [
            "Automated: Dataverse (added, modified, deleted, selected)",
            "Reaccionar a datos",
            "Filtra por tabla y atributos. Trigger conditions para no disparar de más.",
          ],
          [
            "Automated: conector (email, SharePoint, HTTP)",
            "Evento externo",
            "Premium si el conector lo es. DLP puede bloquearlo.",
          ],
          [
            "Instant: botón / Power Apps / Copilot / HTTP request",
            "El usuario o un agente lo lanza",
            "Power Apps trigger si la canvas debe esperar respuesta.",
          ],
          [
            "Scheduled (recurrence)",
            "Cada N minutos/horas/días",
            "No lo uses para «cuando se cree un registro». Time zone del flujo.",
          ],
          [
            "Business process / stage change",
            "BPF avanza",
            "Mejor que sondear la etapa con recurrence.",
          ],
        ],
      },
      {
        type: "h2",
        text: "Conectores",
      },
      {
        type: "ul",
        items: [
          "Estándar: Dataverse, Office 365 Outlook, SharePoint, Teams, Notifications… según el plan.",
          "Premium: SQL, HTTP con Azure AD, Salesforce, muchos SaaS. El escenario «sin premium» te obliga a estándar o a custom connector aprobado.",
          "Custom connector: OpenAPI para APIs internas. Se empaqueta en la solución.",
          "Connection references: ALM. Nunca dejes conexiones «de tu usuario» hardwired en PROD.",
        ],
      },
      {
        type: "h2",
        text: "Acciones y control de flujo",
      },
      {
        type: "ul",
        items: [
          "Condiciones y switch: ramifica. Prefiere expresiones claras y Compose para valores intermedios.",
          "Apply to each: itera. Concurrencia configurable (1 = secuencial; >1 = paralelo). Cuidado con límites de API y con escribir el mismo registro.",
          "Do until: espera un estado. Pon límite de conteo y timeout. Sin eso, bucle infinito de examen.",
          "Scope + Configure run after: patrón try/catch (éxito / fallo / omitido / timeout).",
          "Child flows: reutilización y límites de 500 acciones. El padre llama al hijo con Run a child flow (solución).",
          "Filter array / Select: transforma sin aplicar a cada uno cuando ya tienes el array en memoria.",
        ],
      },
      {
        type: "h2",
        text: "Probar y diagnosticar",
      },
      {
        type: "ul",
        items: [
          "Run history: inputs/outputs por acción. El 80% de los fallos se ven aquí.",
          "Peak / flow checker: avisos de diseño.",
          "Trigger no dispara: filtros, columnas no incluidas en «select columns», usuario sin privilegio, flujo off, DLP.",
          "Timeouts y reintentos: políticas por acción. Idempotencia: un reintento no debe duplicar un pedido.",
          "Concurrency control en el trigger Dataverse: para serializar por registro (evita dos updates paralelos).",
        ],
      },
      {
        type: "callout",
        kind: "exam",
        title: "Run after",
        text: "«Si el email falla, crea una tarea; si no, no hagas nada» → la acción Crear tarea con run after: has failed (y el email no termina el flujo). No pongas un if que compruebe un boolean inventado.",
      },
    ],
  },
  {
    id: "d3-approvals",
    domain: "d3",
    order: 12,
    title: "Aprobaciones y patrones de negocio en flujos",
    minutes: 12,
    summary:
      "Start and wait for an approval, tipos, reasignación y qué no hacer con un bucle.",
    objectives: [
      "Elegir el tipo de aprobación",
      "Combinar aprobación con Dataverse",
      "Evitar anti-patrones de espera",
    ],
    blocks: [
      {
        type: "p",
        text: "Approvals es un skill propio en el study guide. El conector Approvals crea una solicitud que el usuario ve en Teams, Power Automate y el centro de aprobaciones.",
      },
      {
        type: "table",
        headers: ["Tipo", "Comportamiento"],
        rows: [
          ["Approve / Reject – First to respond", "El primero decide. Rápido para guardias."],
          ["Approve / Reject – Everyone must approve", "Todos deben aprobar. Un rechazo corta."],
          ["Custom responses", "Opciones más allá de approve/reject (Pedir info, Escalar)."],
          ["Sequential", "Cadena: manager, luego finanzas. Se modela con varios pasos o con un array de aprobadores y un apply to each sequential."],
        ],
      },
      {
        type: "ul",
        items: [
          "Start and wait for an approval: el flujo se pausa (no consume un Do until de 30 días a lo bruto; el motor hiberna).",
          "Actualiza el registro Dataverse (estado = Pendiente / Aprobado) antes y después. La app debe reflejarlo.",
          "Asigna a un usuario o a un equipo. Piensa en out-of-office: reassignment.",
          "No uses un scheduled flow que «mira si alguien escribió Sí en un Excel». Eso es la trampa.",
        ],
      },
      {
        type: "callout",
        kind: "tip",
        title: "Aprobación + BPF",
        text: "Patrón elegante: BPF en etapa «Aprobación», el flujo se dispara al entrar, espera el approval y mueve la etapa. El usuario ve progreso en la ficha y la decisión en Teams.",
      },
    ],
  },
  {
    id: "d3-ai-hub",
    domain: "d3",
    order: 13,
    title: "AI Hub: prompts y modelos",
    minutes: 20,
    summary:
      "Construir prompts, añadir knowledge e inputs, y consumirlos en apps y flujos.",
    objectives: [
      "Crear un prompt desde plantilla o en blanco",
      "Añadir inputs, knowledge y ajustes de modelo",
      "Llamarlo desde canvas, model-driven y cloud flow",
    ],
    blocks: [
      {
        type: "p",
        text: "AI Hub (AI Builder / prompts en Power Platform) es el taller de IA reutilizable. Un prompt es un artefacto de solución: se versiona, se comparte y se llama desde varios sitios. Un modelo puede ser prebuilt (facturas, recibos, DNI, sentimiento, clasificación, extracción) o custom entrenado.",
      },
      {
        type: "h2",
        text: "Prompts",
      },
      {
        type: "steps",
        items: [
          {
            title: "Crear",
            text: "Desde plantilla (resumir, extraer, clasificar, redactar) o blank. Nombre, descripción, solución.",
          },
          {
            title: "Inputs",
            text: "Parámetros tipados (texto, número, datos). La app o el flujo los rellena. Sin inputs, el prompt no es reutilizable.",
          },
          {
            title: "Knowledge",
            text: "Añade documentos o datos para grounding. Reduce alucinaciones en políticas y catálogos.",
          },
          {
            title: "Settings",
            text: "Modelo (GPT family según el entorno), temperatura, instrucciones de sistema. Baja temperatura para clasificación; más alta para brainstorming (raro en enterprise).",
          },
          {
            title: "Probar",
            text: "Casos límite: vacío, otro idioma, PII. Luego publicar.",
          },
        ],
      },
      {
        type: "h2",
        text: "Consumir un prompt",
      },
      {
        type: "ul",
        items: [
          "Canvas: función / conector de AI que recibe los inputs y devuelve texto o JSON. Úsalo en un botón «Redactar respuesta» y deja que el usuario edite antes de Patch.",
          "Cloud flow: acción de AI Builder / Run a prompt. Encadena: Dataverse trigger → prompt → Patch o email.",
          "Model-driven: command bar o columna. Si el resultado debe vivir en la fila de forma continua, valora prompt column (dominio 1) en vez de un botón.",
        ],
      },
      {
        type: "h2",
        text: "Modelos (AI models)",
      },
      {
        type: "ul",
        items: [
          "Prebuilt: invoice processing, receipt, business card, ID reader, sentiment, category classification, entity extraction, text translation, prediction.",
          "Custom: entrenas con tus documentos o tu tabla (clasificación de casos, predicción de win).",
          "Consumo: igual que prompts — acción en flujo o componente en app. El output es estructurado (campos, confianza).",
          "El examen puede preguntar «extraer total y proveedor de un PDF de factura» → modelo de facturas, no un prompt genérico, porque el prebuilt ya está entrenado para ese documento.",
        ],
      },
      {
        type: "compare",
        left: {
          title: "Prompt (GPT)",
          items: [
            "Flexible, lenguaje natural",
            "Bueno para redactar, resumir, extraer ad-hoc",
            "Grounding con knowledge",
            "Output a veces libre → pide JSON en las instrucciones",
          ],
        },
        right: {
          title: "Modelo prebuilt / custom",
          items: [
            "Esquema de salida estable",
            "Documentos (factura, recibo) y predicción",
            "Confianza por campo",
            "Mejor cuando el tipo de documento es conocido",
          ],
        },
      },
      {
        type: "callout",
        kind: "exam",
        title: "Prompt column vs prompt de AI Hub",
        text: "Prompt column: vive en la tabla, se autoejecuta al cambiar inputs, persistido. Prompt de AI Hub: artefacto llamable, lo invocas cuando quieres (botón, flujo, agente). «Cada vez que se guarda el caso, rellenar Resumen» → prompt column. «El agente pulsa Generar oferta» → prompt de AI Hub.",
      },
    ],
  },
  {
    id: "d3-rules-bpf",
    domain: "d3",
    order: 14,
    title: "Business rules y business process flows",
    minutes: 18,
    summary:
      "Lógica de formulario/servidor frente a guía por etapas. Scope, acciones y saltos a flujos.",
    objectives: [
      "Elegir el scope de una business rule",
      "Diseñar un BPF con ramas y flujos",
      "Saber qué no puede hacer una rule",
    ],
    blocks: [
      {
        type: "h2",
        text: "Business rules",
      },
      {
        type: "p",
        text: "Lógica declarativa: si condición, entonces acción. Se diseñan en el editor de la tabla. No sustituyen a un flujo ni a un plugin.",
      },
      {
        type: "table",
        headers: ["Scope", "Dónde corre", "Efecto"],
        rows: [
          [
            "Entity (tabla)",
            "Servidor y todos los clientes",
            "Aplica también a API, importaciones y flujos que crean filas. Usa esto para validación real.",
          ],
          [
            "All forms",
            "Cualquier form model-driven",
            "UX: show/hide, required. No protege la API.",
          ],
          [
            "Specific form",
            "Un form",
            "Solo esa experiencia. El resto de forms y la API ignoran la rule.",
          ],
        ],
      },
      {
        type: "p",
        text: "Acciones: set value, set default, set required / optional, show / hide, lock / unlock, set recommendation (bombilla de consejo, no bloquea), set business required. Condiciones sobre columnas de la tabla (y a veces related en límites).",
      },
      {
        type: "ul",
        items: [
          "No hay bucles, no hay conectores, no hay espera, no hay multi-tabla rica.",
          "Recommendation ≠ required. El usuario puede ignorar una recommendation.",
          "Si debe cumplirse aunque el registro entre por integración, scope Entity.",
        ],
      },
      {
        type: "h2",
        text: "Business process flows",
      },
      {
        type: "p",
        text: "Una guía de etapas sobre uno o varios tables. Cada etapa tiene pasos (campos a completar), steps de acción (flujo) y, si aplica, condicionales. El usuario ve el recorredor en la cabecera del form.",
      },
      {
        type: "ul",
        items: [
          "Se habilita en la tabla y se incluye en la app. Security roles del BPF: quién puede usarlo.",
          "Branching: si Importe > 10.000, etapa de Dirección. Si no, etapa de Cierre.",
          "Puede cruzar tablas (Lead → Opportunity → Quote) en un proceso de varios entities.",
          "On stage change / on process complete: dispara cloud flows. Ahí encajas aprobaciones y sistemas externos.",
          "Data steps vs workflows clásicos: en AB-410, prefiere cloud flow.",
        ],
      },
      {
        type: "callout",
        kind: "exam",
        title: "Rule vs BPF vs flow",
        text: "Ocultar un campo si Tipo = Interno → business rule. Obligar a pasar por Cualificar → Propuesta → Cierre → BPF. Avisar a SAP y esperar aprobación del director → cloud flow (quizá disparado por el BPF). Mezclarlos es correcto; usar un flujo para hide/show un campo no lo es.",
      },
    ],
  },
  {
    id: "d3-columnas-logica",
    domain: "d3",
    order: 15,
    title: "Columnas fórmula, calculated y rollup",
    minutes: 14,
    summary:
      "Dónde vive la lógica de cálculo y cuándo NO usar un flujo para sumar.",
    objectives: [
      "Elegir formula vs calculated vs rollup",
      "Conocer límites de rollup",
      "Evaluar el use case de lógica de negocio",
    ],
    blocks: [
      {
        type: "table",
        headers: ["Tipo", "Lenguaje", "Cuándo", "Límites"],
        rows: [
          [
            "Formula column",
            "Power Fx",
            "Cálculo en tiempo de lectura, moderno, rico",
            "No todo Power Fx de canvas. No sustituye rollup de hijos agregados en todos los casos.",
          ],
          [
            "Calculated (clásico)",
            "Editor de calculated fields",
            "Legado. Suma, if, fechas en la misma fila o related N:1",
            "Microsoft empuja a formula. Sigue apareciendo en exámenes por bases instaladas.",
          ],
          [
            "Rollup",
            "Agregación",
            "SUM, COUNT, MIN, MAX, AVG de hijos 1:N",
            "Asíncrono (hasta 12 h, o CalculateRollupField). Filtros en hijos. No en tiempo real estricto.",
          ],
        ],
      },
      {
        type: "h2",
        text: "Ejemplos que caen",
      },
      {
        type: "ul",
        items: [
          "«Días abierto» = DiffInDays(created, now) → formula / calculated.",
          "«Total de líneas de pedido» → rollup SUM de hijos, no un flujo en cada Patch.",
          "«Número de casos activos del cliente» → rollup COUNT filtrado.",
          "«Si el rollup debe ser inmediato para un KPI en pantalla» → o aceptas asincronía, o calculas en la app (Sum de una relación) asumiendo delegación, o un flujo que actualiza un campo estático (más frágil).",
        ],
      },
      {
        type: "h2",
        text: "Matriz de decisión de lógica (cierra el dominio 3)",
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
          ["Transacción compleja síncrona", "Plugin (recomendar a pro-dev)"],
        ],
      },
      {
        type: "callout",
        kind: "tip",
        title: "La pregunta más rentable del examen",
        text: "Te dan un párrafo de negocio y cuatro letras que son rule, BPF, flow y formula. Elige el más específico y barato de mantener. Si hay espera o sistema externo, flow. Si hay etapas, BPF. Si es un campo, rule o formula. Si es IA, prompt.",
      },
    ],
  },
];
