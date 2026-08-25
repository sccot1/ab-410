import type { Lesson } from "./types";

export const D1_LESSONS: Lesson[] = [
  {
    id: "d1-diseno",
    domain: "d1",
    order: 1,
    title: "Diseñar la solución con herramientas de IA",
    minutes: 16,
    summary:
      "De requisitos a componentes: cuándo app, flujo, agente o prompt; extensibilidad y agentes built-in.",
    objectives: [
      "Descomponer un requisito en tablas, apps, flujos y agentes",
      "Elegir entre agente built-in, Copilot Studio y AI Hub",
      "Recomendar opciones de extensibilidad (conectores, PCF, APIs)",
    ],
    blocks: [
      {
        type: "p",
        text: "El primer skill del study guide es de arquitectura ligera: leer un requisito y decir qué piezas de Power Platform lo cubren, usando Copilot y lenguaje natural para acelerar, no para sustituir el diseño.",
      },
      {
        type: "h2",
        text: "Mapear requisitos a componentes",
      },
      {
        type: "table",
        headers: ["Si el negocio pide…", "Piensa primero en…", "No uses esto si…"],
        rows: [
          [
            "Capturar y consultar registros con seguridad y vistas",
            "Tabla Dataverse + model-driven app",
            "La UI debe ser pixel-perfect o móvil muy custom (canvas)",
          ],
          [
            "Formulario móvil / experiencia a medida",
            "Canvas app sobre Dataverse",
            "Necesitas grids avanzados, BPF y charts de MDA sin reinventarlos",
          ],
          [
            "Reacción a un evento o integración",
            "Cloud flow (automatizado o instantáneo)",
            "La lógica cabe en una business rule o columna fórmula",
          ],
          [
            "Conversación, Q&A sobre documentos, orquestación",
            "Agente (Copilot Studio) + knowledge",
            "Solo necesitas un resumen persistente de una fila (prompt column)",
          ],
          [
            "Clasificar, extraer, resumir y guardar el resultado",
            "Prompt o modelo de AI Hub, o prompt column",
            "El usuario solo quiere un chat puntual sin persistir",
          ],
        ],
      },
      {
        type: "h2",
        text: "Agentes built-in vs. agentes que tú construyes",
      },
      {
        type: "p",
        text: "Microsoft incluye agentes y experiencias Copilot en Power Apps, Power Automate, Power Pages y Dataverse. El examen espera que sepas cuándo reutilizarlos y cuándo crear uno en Copilot Studio.",
      },
      {
        type: "ul",
        items: [
          "Copilot en maker studio: genera tablas, apps, flujos y páginas a partir de lenguaje natural. Es una herramienta de construcción, no un agente de usuario final.",
          "Copilot en model-driven / canvas: ayuda al usuario a rellenar formularios, consultar datos o navegar. Se habilita a nivel de entorno y de app.",
          "Agentes de Copilot Studio: temas, respuestas generativas, knowledge (Dataverse, SharePoint, documentos), acciones (flujos, conectores). Se incrustan en apps y Power Pages.",
          "Desde una canvas app puedes crear un agente de Copilot Studio anclado a esa app y sus datos — skill explícito del dominio 2.",
        ],
      },
      {
        type: "callout",
        kind: "exam",
        title: "Trampa: Copilot para construir ≠ agente de negocio",
        text: "Si el escenario dice «los empleados preguntan por políticas y crean un caso», la respuesta es un agente con knowledge + acción, no «usar Copilot para generar la canvas app». El examen distingue maker-Copilot de runtime-agent.",
      },
      {
        type: "h2",
        text: "Extensibilidad: el orden correcto",
      },
      {
        type: "ol",
        items: [
          "Configuración y low-code: tablas, fórmulas, flujos, prompts.",
          "Conectores estándar / premium y connection references.",
          "Custom connector o API custom si el sistema externo no tiene conector.",
          "PCF (Power Apps component framework) cuando el control visual no existe.",
          "Plugins / código (pro-dev) cuando la lógica debe ser síncrona transaccional en Dataverse — suele ser territorio del developer, no el foco de AB-410, pero debes saber recomendarlo.",
        ],
      },
      {
        type: "callout",
        kind: "tip",
        title: "IA responsable",
        text: "Gobierno espera: no enviar PII innecesaria a modelos, revisar outputs, respetar DLP, documentar prompts, y no usar IA donde una regla determinista basta. Si el escenario menciona compliance, prioriza persistir en Dataverse con seguridad de roles, no un chat suelto.",
      },
    ],
  },
  {
    id: "d1-entornos-alm",
    domain: "d1",
    order: 2,
    title: "Entornos, soluciones y ALM",
    minutes: 18,
    summary:
      "Qué entorno usar, managed vs unmanaged, pipelines, variables de entorno y connection references.",
    objectives: [
      "Recomendar el tipo de entorno correcto",
      "Elegir solución managed o unmanaged",
      "Explicar pipelines, publisher y componentes de ALM",
    ],
    blocks: [
      {
        type: "h2",
        text: "Tipos de entorno",
      },
      {
        type: "table",
        headers: ["Tipo", "Para qué", "Cuidado"],
        rows: [
          [
            "Default",
            "Personal productivity del tenant. Uno por tenant.",
            "No lo uses para aplicaciones de negocio ni ALM serio. Capacidad y DLP limitados.",
          ],
          [
            "Developer",
            "Aprendizaje y desarrollo individual. Incluye Dataverse.",
            "No es de producción. Ideal para labs de AB-410.",
          ],
          [
            "Sandbox",
            "Dev/test. Se puede copiar y resetear.",
            "Copia (copy) para datos de prueba; reset para volver a cero.",
          ],
          [
            "Production",
            "Cargas reales de usuarios.",
            "Solo soluciones managed. Cambios por pipeline, no a mano.",
          ],
          [
            "Teams",
            "Apps embebidas en Teams, Dataverse for Teams.",
            "Límites de capacidad y de objetos. Escalar a Dataverse completo cuando crezcan.",
          ],
          [
            "Trial",
            "Evaluación temporal.",
            "Caduca. No bases un proyecto real aquí.",
          ],
        ],
      },
      {
        type: "callout",
        kind: "exam",
        title: "Pregunta clásica de entorno",
        text: "«Un maker quiere probar una app con Dataverse sin afectar producción» → Developer o Sandbox, nunca Default ni Production. Si dice «el equipo necesita copiar prod a test» → Sandbox con copy.",
      },
      {
        type: "h2",
        text: "Soluciones: el contenedor de ALM",
      },
      {
        type: "compare",
        left: {
          title: "Unmanaged",
          items: [
            "Se edita en DEV",
            "Capa no administrada",
            "Exportas como unmanaged (backup de fuente) o managed (para destinos)",
            "Nunca como destino de producción",
          ],
        },
        right: {
          title: "Managed",
          items: [
            "Se instala en TEST/PROD",
            "Bloquea edición directa",
            "Se actualiza / upgrade / patch",
            "Se desinstala limpiando componentes (según dependencias)",
          ],
        },
      },
      {
        type: "ul",
        items: [
          "Crea tu propia solución y un publisher con prefijo (p. ej. aet). Nunca trabajes en Default Solution.",
          "Añade componentes existentes a la solución; no los dupliques. Usa Add required components con criterio: no metas todo el sistema.",
          "Environment variables: URLs, keys de config, IDs que cambian entre DEV y PROD. Se rellenan en el deployment.",
          "Connection references: el flujo no lleva la conexión cruda; el destino enlaza su propia conexión.",
          "Pipelines in Power Platform: DEV → TEST → PROD con aprobaciones. Prefiérelo a export/import manual cuando el escenario es empresarial.",
        ],
      },
      {
        type: "h2",
        text: "Estrategia que el examen quiere oír",
      },
      {
        type: "ol",
        items: [
          "Un entorno DEV (sandbox o developer) con soluciones unmanaged.",
          "TEST sandbox, import managed, pruebas de seguridad y de IA (créditos, DLP).",
          "PROD production, solo managed vía pipeline.",
          "Solution checker antes de exportar. No incluir claves secretas en fórmulas: environment variables + Azure Key Vault si aplica.",
        ],
      },
      {
        type: "callout",
        kind: "warn",
        title: "Block unmanaged customizations",
        text: "Si el entorno tiene bloqueadas las personalizaciones unmanaged, no podrás crear o editar prompt columns ni otros objetos fuera de solución managed. En DEV debe estar permitido.",
      },
    ],
  },
  {
    id: "d1-dataverse",
    domain: "d1",
    order: 3,
    title: "Modelar Dataverse: tablas, columnas y relaciones",
    minutes: 22,
    summary:
      "El corazón del examen: tablas estándar vs custom, propiedades, columnas y comportamientos de relación.",
    objectives: [
      "Crear tablas y configurar propiedades",
      "Elegir el tipo de columna correcto",
      "Configurar relaciones y cascading",
    ],
    blocks: [
      {
        type: "p",
        text: "Dataverse es la plataforma de datos del examen. Casi todos los escenarios empiezan aquí. Trabajas en el data workspace de Power Apps: tablas, columnas, relaciones, vistas y formularios en un solo sitio, a menudo con Copilot («crea una tabla de incidencias con prioridad y cliente»).",
      },
      {
        type: "h2",
        text: "Tablas",
      },
      {
        type: "ul",
        items: [
          "Estándar (Account, Contact, User, etc.): reutilízalas. No clones Contact en una tabla «Persona».",
          "Custom: cuando el negocio no encaja. Define display name, plural, primary column (normalmente texto), ownership.",
          "Activity tables: para correos, tareas, citas. Aparecen en el timeline.",
          "Virtual tables: datos externos en tiempo real sin copiar. Útiles para integración; no para lógica pesada offline.",
          "Elastic tables: alto volumen, esquema flexible. Casos de telemetría, no de CRM clásico.",
        ],
      },
      {
        type: "h3",
        text: "Propiedades que caen en el examen",
      },
      {
        type: "table",
        headers: ["Propiedad", "Opciones", "Impacto"],
        rows: [
          [
            "Ownership",
            "User/Team vs Organization",
            "User/Team permite privilegios a nivel de usuario/BU. Organization es de toda la org (p. ej. una tabla de países).",
          ],
          [
            "Record image",
            "Sí / no",
            "Imagen primaria en formularios y vistas.",
          ],
          [
            "Duplicate detection",
            "Reglas",
            "No sustituye claves alternativas; es heurístico.",
          ],
          [
            "Change tracking",
            "On",
            "Necesario para sincronización incremental e integraciones.",
          ],
          [
            "Auditing",
            "Org + tabla + columna",
            "Hay que activarlo en los tres niveles para ver historial de un campo.",
          ],
        ],
      },
      {
        type: "h2",
        text: "Columnas",
      },
      {
        type: "ul",
        items: [
          "Texto, texto multilínea, entero, decimal, moneda, fecha/hora (time-zone independent vs user local), sí/no, choice (global vs local), choices (multi), lookup, customer (account o contact), file, image, autonumber.",
          "Choice global: reutilizable entre tablas (sí para «Prioridad»). Local: solo esa tabla.",
          "Alternate keys: unicidad de negocio (email, código). Imprescindibles para upsert en integraciones.",
          "Column security: campos sensibles (salario, NIF). Requiere perfiles de seguridad de columna, no solo el rol de tabla.",
        ],
      },
      {
        type: "h2",
        text: "Relaciones y cascading",
      },
      {
        type: "p",
        text: "1:N (un cliente, muchas incidencias), N:1 (la inversa), N:N (alumnos–cursos). En 1:N configuras el comportamiento de la relación parental.",
      },
      {
        type: "table",
        headers: ["Comportamiento", "Qué hace", "Cuándo"],
        rows: [
          [
            "Parental",
            "Cascada de assign, share, unshare, reparent, delete, merge",
            "Hijo que no tiene sentido sin el padre (líneas de pedido).",
          ],
          [
            "Referential",
            "Sin cascada de delete: puedes restringir o quitar el link",
            "Lookup suelto (incidencia → producto).",
          ],
          [
            "Referential, restrict delete",
            "No deja borrar el padre si hay hijos",
            "Cuando perder hijos sería un error de negocio.",
          ],
          [
            "Configurable cascading",
            "Elige por acción (assign, delete, share…)",
            "Cuando parental es demasiado y referential se queda corto.",
          ],
        ],
      },
      {
        type: "callout",
        kind: "exam",
        title: "Delete de hijos",
        text: "Si el escenario dice «al borrar el proyecto deben desaparecer las tareas» → parental o cascade delete. Si dice «no se puede borrar un cliente con pedidos» → restrict delete. Si dice «las tareas se quedan pero sin proyecto» → remove link.",
      },
      {
        type: "h2",
        text: "Vistas públicas y formularios principales",
      },
      {
        type: "p",
        text: "En el dominio 1 ya te piden configurar public views y main forms a nivel de tabla (el dominio 2 profundiza en la app). Una vista: columnas, filtros, sort, width. Quick find view alimenta la búsqueda. El main form es el de la ficha; también hay quick create, quick view y card forms.",
      },
      {
        type: "ul",
        items: [
          "No pongas 40 columnas en la vista activa: rendimiento y usabilidad.",
          "Quick create: alta rápida desde lookups. Actívalo en la tabla y diseña el form corto.",
          "Icono de tabla: se configura en la definición; aparece en la sitemap y grids.",
        ],
      },
    ],
  },
  {
    id: "d1-columnas-ia",
    domain: "d1",
    order: 4,
    title: "Prompt columns y row summaries",
    minutes: 16,
    summary:
      "IA persistida en la fila frente a resumen Copilot de registro. Límites, triggers y créditos.",
    objectives: [
      "Configurar una prompt column con inputs y filtros",
      "Distinguir prompt column de row summary",
      "Saber cuándo se regenera y cuándo no",
    ],
    blocks: [
      {
        type: "p",
        text: "Este es el tema «nuevo» que más distancia AB-410 de PL-200. Microsoft evalúa si sabes meter IA en el modelo de datos, no solo en el chat.",
      },
      {
        type: "h2",
        text: "Prompt column",
      },
      {
        type: "p",
        text: "Tipo de columna de Dataverse cuyo valor lo genera un modelo a partir de un prompt en lenguaje natural y de otras columnas de la misma fila. El resultado se guarda de forma persistente y lo consumen apps, flujos, informes y agentes.",
      },
      {
        type: "steps",
        items: [
          {
            title: "Crear la columna",
            text: "Tabla → Nueva columna → tipo Prompt. Nombre y descripción claros. Hasta 5 prompt columns por tabla.",
          },
          {
            title: "Escribir el prompt",
            text: "Instrucciones estructuradas. Referencia columnas de entrada. No uses como input: formula, file, image u otra prompt column.",
          },
          {
            title: "Filtros",
            text: "Condiciones para ejecutar solo cuando aplique (p. ej. Estado = Enviado). Ahorra créditos.",
          },
          {
            title: "Ejecución asíncrona",
            text: "Se crean columnas de Status y Details. Estados: NotStarted, InProgress, Completed, Failed. No bloquea la transacción de guardado.",
          },
        ],
      },
      {
        type: "ul",
        items: [
          "Se dispara al crear el registro o al actualizar una columna de input. No hay backfill masivo de históricos salvo que toques inputs.",
          "Cambiar el texto del prompt no regenera filas antiguas hasta que un input cambie.",
          "No se audita el valor generado como un campo normal de auditoría.",
          "Requisitos: AI Builder / Copilot habilitado, créditos, permisos sobre las columnas de input, y el entorno no debe bloquear customizations unmanaged en DEV.",
          "Puedes probar el prompt sin gastar créditos. El uso se ve en Automation Center → AI Builder activity.",
        ],
      },
      {
        type: "h2",
        text: "Row summary",
      },
      {
        type: "p",
        text: "Resumen Copilot de un registro en model-driven: un digest para el usuario que abre la ficha. Se configura a nivel de tabla (qué columnas alimentan el resumen). No es un tipo de columna persistida como la prompt column; es una experiencia de lectura.",
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
            "Clasificar, extraer, recomendar, redactar",
          ],
        },
        right: {
          title: "Row summary",
          items: [
            "Experiencia Copilot en la ficha",
            "No es un campo que filtres en una vista como cualquier otro",
            "Configuración de tabla",
            "Ayuda a entender el registro al abrirlo",
            "No sustituye un campo «Resumen ejecutivo» de negocio",
          ],
        },
      },
      {
        type: "callout",
        kind: "exam",
        title: "Elige el artefacto correcto",
        text: "«Necesitamos una categoría de sentimiento en cada caso, visible en la vista y que dispare un flujo si es negativo» → prompt column (o modelo de AI Hub + flujo). «Los agentes de mesa de ayuda quieren un resumen al abrir el caso» → row summary. «Un chatbot responde políticas» → agente, no columna.",
      },
    ],
  },
  {
    id: "d1-seguridad",
    domain: "d1",
    order: 5,
    title: "Seguridad de Dataverse y acceso a apps",
    minutes: 18,
    summary:
      "Roles, niveles de acceso, equipos, jerarquía, seguridad de columna y de formulario.",
    objectives: [
      "Diseñar un security role mínimo",
      "Distinguir owner teams y access teams",
      "Restringir tablas, filas, columnas, formularios y apps",
    ],
    blocks: [
      {
        type: "p",
        text: "El builder no es el admin de Entra ID, pero el examen espera que configures acceso: quién ve qué fila, qué campo, qué formulario y qué app.",
      },
      {
        type: "h2",
        text: "Security roles y privilegios",
      },
      {
        type: "p",
        text: "Un rol combina privilegios (Create, Read, Write, Delete, Append, Append To, Assign, Share) con un nivel de acceso por tabla.",
      },
      {
        type: "table",
        headers: ["Nivel", "Alcance"],
        rows: [
          ["None", "Sin acceso"],
          ["User", "Solo registros que el usuario posee"],
          ["Business Unit", "Registros de su unidad de negocio"],
          ["Parent: Child BU", "Su BU y las hijas"],
          ["Organization", "Toda la organización"],
        ],
      },
      {
        type: "ul",
        items: [
          "Append: asociar este registro a otro. Append To: permitir que otros se asocien a este. En lookups hacen falta los dos lados.",
          "Least privilege: clona un rol base (Basic User) y recorta. No uses System Administrator para usuarios de negocio.",
          "Los roles se asignan a usuarios o a equipos. El usuario necesita además la licencia y, para model-driven, estar en el app sharing / security roles de la app.",
        ],
      },
      {
        type: "h2",
        text: "Ownership, equipos y jerarquía",
      },
      {
        type: "ul",
        items: [
          "User-owned vs organization-owned (lo viste en la tabla). Organization-owned ignora owner: el nivel es none u org.",
          "Owner teams: el equipo posee el registro. Todos los miembros heredan acceso según el rol del equipo.",
          "Access teams: no poseen; se usa para compartir un registro concreto con un grupo ad-hoc (p. ej. un deal team).",
          "Entra ID groups pueden mapearse a equipos para automatizar membresía.",
          "Hierarchy security: manager hierarchy (jefe ve a sus reports) o positional. Se activa a nivel de organización y se limita por profundidad. Complementa, no sustituye, a los roles.",
        ],
      },
      {
        type: "h2",
        text: "Capas extra de restricción",
      },
      {
        type: "ul",
        items: [
          "Column security: campos sensibles. El rol de tabla no basta.",
          "Form security: qué roles ven un formulario. Útil para un form de RR. HH. vs uno de ventas sobre la misma tabla.",
          "View: las vistas públicas las ve quien tiene read; puedes restringir vistas personales/sistema según diseño, pero no es un muro de seguridad (el usuario podría leer por API si tiene privilegio).",
          "App access: en model-driven, roles asociados a la app. En canvas, sharing de la app + roles de Dataverse. Sin ambos, o no abre o no ve datos.",
          "Auditing: org + tabla + columnas. Retention configurable. Change tracking es distinto (sync, no compliance).",
        ],
      },
      {
        type: "callout",
        kind: "exam",
        title: "App vs datos",
        text: "«El usuario abre la app pero las filas salen vacías» → falta privilegio Read o el nivel es User y no posee registros. «No ve la app en el listado» → no está compartida / no tiene el rol de la app. Son fallos distintos.",
      },
    ],
  },
];
