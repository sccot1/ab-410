import type { Lesson } from "./types";

export const D2_LESSONS: Lesson[] = [
  {
    id: "d2-model-driven",
    domain: "d2",
    order: 6,
    title: "Model-driven apps: formularios, vistas y composición",
    minutes: 20,
    summary:
      "Forms, views, sitemap, charts, dashboards y control de acceso a la app.",
    objectives: [
      "Diseñar main, quick create y quick view forms",
      "Componer una app con sitemap y áreas",
      "Configurar charts, dashboards y acceso",
    ],
    blocks: [
      {
        type: "p",
        text: "Una model-driven app no se «pinta»: se compone. Eliges tablas, formularios, vistas, charts y un sitemap. La UI sale del metadata de Dataverse, con seguridad incluida. Es la opción por defecto cuando el trabajo es gestionar registros.",
      },
      {
        type: "h2",
        text: "Formularios",
      },
      {
        type: "ul",
        items: [
          "Main: ficha completa. Pestañas, secciones, subgrids, timeline, BPF header, IFrames, components (PCF, canvas embebida, custom pages).",
          "Quick create: alta rápida. Hay que habilitarla en la tabla.",
          "Quick view: lectura embebida de un lookup (ver datos del cliente dentro del caso).",
          "Card: compacto para paneles y móviles.",
          "Form component control: reutiliza un form de otra tabla dentro de este.",
        ],
      },
      {
        type: "p",
        text: "Buenas prácticas: campos requeridos de negocio arriba, pestaña Resumen con lo que se usa el 80% del tiempo, subgrids con vistas específicas, no el Active genérico. Business rules y JavaScript (poco, AB-410 prefiere rules/flujos) para show/hide. Command bar: botones con Power Fx o comandos clásicos.",
      },
      {
        type: "h2",
        text: "Vistas en la app",
      },
      {
        type: "ul",
        items: [
          "Public views: las que empaquetas en la solución y expones en la app.",
          "Quick find, associated, lookup, advanced find: cada una alimenta un hueco distinto de la UI.",
          "En la composición de la app seleccionas qué vistas y forms están disponibles. Puedes tener un form de supervisor que no está en la app de agente.",
        ],
      },
      {
        type: "h2",
        text: "Componer la app",
      },
      {
        type: "steps",
        items: [
          {
            title: "Nueva model-driven app",
            text: "En una solución. Nombre, descripción, icono. Modern app designer.",
          },
          {
            title: "Páginas",
            text: "Añade tablas (views + forms), dashboards, custom pages o generative pages. Ordena el sitemap en áreas y grupos.",
          },
          {
            title: "Acceso",
            text: "Asocia security roles a la app. Comparte. Sin rol de app, no aparece; sin privilegios de tabla, aparece vacía.",
          },
          {
            title: "Play y publicar",
            text: "Publicar la app y los componentes. Un form no publicado no se ve.",
          },
        ],
      },
      {
        type: "h2",
        text: "Charts y dashboards",
      },
      {
        type: "p",
        text: "Charts se definen en la tabla (column chart, pie, tag, funnel) sobre una vista. Dashboards combinan charts, listas y IFrames. Hay dashboards de usuario y de sistema. En la app marcas cuáles se incluyen. Para analítica pesada, el examen acepta mencionar Power BI embebido, pero el skill medido es charts/dashboards nativos.",
      },
      {
        type: "callout",
        kind: "exam",
        title: "Custom page vs canvas standalone",
        text: "Custom page = pantalla canvas dentro de una model-driven (navegación unificada, Dataverse context). Úsala para un lienzo concreto (kanban, mapa) sin abandonar la MDA. Una canvas app aparte es otra app que hay que compartir y navegar.",
      },
    ],
  },
  {
    id: "d2-generative",
    domain: "d2",
    order: 7,
    title: "Páginas generativas y Copilot en model-driven",
    minutes: 12,
    summary:
      "Crear páginas con lenguaje natural e integrar Copilot y agentes en la experiencia MDA.",
    objectives: [
      "Generar una página a partir de un prompt",
      "Saber qué revisar después de generar",
      "Habilitar Copilot de usuario final",
    ],
    blocks: [
      {
        type: "p",
        text: "Generative pages permiten describir la pantalla («una galería de incidencias abiertas con filtro por prioridad y un formulario al lado») y obtener una custom page lista para iterar. El examen no te pide el prompt perfecto; te pide saber que existe, cuándo usarla y que el resultado se revisa y se mete en la solución.",
      },
      {
        type: "ul",
        items: [
          "Parte de una model-driven app en el designer moderno.",
          "Describe layout y datos. El generador usa las tablas a las que la app ya tiene acceso.",
          "Revisa controles, nombres, accesibilidad y delegación. Publica. Empaqueta en la solución.",
          "No es un sustituto del main form: es para experiencias que el form clásico no cubre.",
        ],
      },
      {
        type: "h2",
        text: "Copilot para el usuario de la app",
      },
      {
        type: "ul",
        items: [
          "Form fill assistance: sugiere valores. Se puede desactivar por columna (en prompt columns el study material indica desmarcar form fill assistance al crearlas).",
          "Preguntas en lenguaje natural sobre los datos de la app (si el admin lo habilita y el usuario tiene privilegios).",
          "Row summary en la ficha (dominio 1).",
          "Agentes incrustados: un agente de Copilot Studio en el side pane o en Power Pages para la misma solución.",
        ],
      },
      {
        type: "callout",
        kind: "warn",
        title: "Gobierno",
        text: "Copilot de runtime se habilita a nivel de tenant/entorno. Si el escenario dice que el departamento legal no quiere IA en una app, no basta con no usarla: hay que respetar la política del entorno y no incrustar agentes.",
      },
    ],
  },
  {
    id: "d2-canvas",
    domain: "d2",
    order: 8,
    title: "Canvas apps: datos, UX y rendimiento",
    minutes: 20,
    summary:
      "Conectar datos, diseñar para accesibilidad y responsive, y no romper la delegación.",
    objectives: [
      "Crear una canvas app a partir de datos",
      "Aplicar contenedores responsive y accesibilidad",
      "Reconocer límites de delegación y patrones de carga",
    ],
    blocks: [
      {
        type: "p",
        text: "Canvas te da el lienzo. Empieza desde datos (Dataverse, SharePoint, Excel — para AB-410, Dataverse es el default correcto) o en blanco. Copilot puede generar la primera versión; tú eres responsable de controles, fórmulas y publicación.",
      },
      {
        type: "h2",
        text: "Estructura de una app sólida",
      },
      {
        type: "ul",
        items: [
          "Contenedores layout (vertical/horizontal/experimental responsive) en lugar de X/Y absolutos. Así sobrevive a móvil y tablet.",
          "Un screen por tarea: Browse, Detail, Edit. O un patrón maestro-detalle con un contenedor.",
          "Galerías conectadas a Dataverse con Filter / Search delegables. Drop-downs con Distinct solo si el origen lo permite; si no, tabla de referencia.",
          "Formularios con data cards; OnSuccess para navegar y Notify.",
        ],
      },
      {
        type: "h2",
        text: "Accesibilidad, usabilidad, rendimiento",
      },
      {
        type: "table",
        headers: ["Eje", "Qué hacer"],
        rows: [
          [
            "Accesibilidad",
            "AccessibleLabel en todo control interactivo, TabIndex lógico, contraste, no información solo por color, AcceptsFocus.",
          ],
          [
            "Usabilidad",
            "Textos cortos, un CTA primario, estados vacíos, confirmación al borrar, modo offline solo si hay Dataverse offline profile.",
          ],
          [
            "Responsive",
            "App.Width / Height, contenedores, breakpoints. Evita hardcode 1366×768.",
          ],
          [
            "Rendimiento",
            "Delegación, Concurrent() en OnStart/OnVisible, no cargar 12 lookups en OnStart, StartScreen en vez de navegar desde OnStart, formula-level error handling.",
          ],
        ],
      },
      {
        type: "h2",
        text: "Delegación (cae siempre)",
      },
      {
        type: "p",
        text: "Power Apps solo empuja ciertas funciones al origen. Si no es delegable, trabaja con las primeras N filas (límite 500–2000). Síntoma: la galería «se come» registros viejos. Solución: Filter con columnas indexadas, evitar Len, Find, construcciones no delegables sobre Dataverse; mover lógica al servidor (vista, flujo, columna fórmula).",
      },
      {
        type: "callout",
        kind: "exam",
        title: "SharePoint vs Dataverse",
        text: "Si el escenario es una app de negocio con seguridad por fila, relaciones y ALM, la respuesta es Dataverse. SharePoint lists es trampa de PL-900. AB-410 asume Dataverse salvo que el enunciado lo impida.",
      },
    ],
  },
  {
    id: "d2-canvas-avanzado",
    domain: "d2",
    order: 9,
    title: "Canvas avanzado: variables, componentes y calidad",
    minutes: 18,
    summary:
      "Named formulas, UDFs, librerías, colecciones, errores, Monitor y llamadas a flujos.",
    objectives: [
      "Elegir el tipo de estado correcto",
      "Crear componentes reutilizables",
      "Probar con Monitor y manejar errores",
    ],
    blocks: [
      {
        type: "h2",
        text: "Estado: qué usar",
      },
      {
        type: "table",
        headers: ["Artefacto", "Scope", "Cómo", "Para qué"],
        rows: [
          [
            "Context variable",
            "Screen",
            "UpdateContext({ x: 1 })",
            "Popups, pestaña activa, estado local",
          ],
          [
            "Global variable",
            "App",
            "Set(gUser, User())",
            "Usuario, flags de sesión. No abuses.",
          ],
          [
            "Collection",
            "App (en memoria)",
            "ClearCollect, Collect, Patch, Remove",
            "Caché, carritos, buffers. No es la base de datos.",
          ],
          [
            "Named formula",
            "App, inmutable, reactiva",
            "App.Formulas: TaxRate = 0.21;",
            "Constantes y cálculos derivados. Preferible a Set para valores calculados.",
          ],
          [
            "User-defined function",
            "App o componente",
            "Función Power Fx con parámetros",
            "Reutilizar lógica (validar CIF, armar título).",
          ],
        ],
      },
      {
        type: "h2",
        text: "Componentes y librerías",
      },
      {
        type: "ul",
        items: [
          "Componentes in-app: header, nav, card. Custom properties de input/output. Access app scope solo si es imprescindible (rompe reutilización).",
          "Component library: se publica y se referencia desde varias apps. Actualizas la librería y las apps toman la versión.",
          "PCF: cuando el control no existe (firma, mapa avanzado). Se empaqueta como solución. AB-410 pide saber cuándo recomendarlo, no escribirlo.",
        ],
      },
      {
        type: "h2",
        text: "Flujos desde canvas",
      },
      {
        type: "p",
        text: "Power Automate se llama como un conector: FlowName.Run(args). Devuelve valores si el flujo tiene Respond to a PowerApp or flow. Usa para aprobaciones, email, sistemas externos. No uses un flujo para un Patch que la app puede hacer sola.",
      },
      {
        type: "h2",
        text: "Errores y Monitor",
      },
      {
        type: "ul",
        items: [
          "IfError / IsError / App.OnError: maneja fallos de Patch y de conectores sin romper la sesión.",
          "Notify(texto, error) para el usuario; no tragues el error en silencio.",
          "Monitor: sesión en vivo de fórmulas, timings, filas delegadas o no, llamadas de red. Es la herramienta de test que nombra el study guide.",
          "Test Studio / tests manuales: casos de aceptación. El examen se conforma con Monitor + pruebas de maker.",
        ],
      },
      {
        type: "callout",
        kind: "tip",
        title: "Named formulas > OnStart inflado",
        text: "Si ves un OnStart de 80 líneas con Set de constantes, la respuesta moderna es named formulas. OnStart se reserva para lo que debe ocurrir una vez (prefetch controlado).",
      },
    ],
  },
  {
    id: "d2-agentes",
    domain: "d2",
    order: 10,
    title: "Agentes desde canvas y Copilot Studio",
    minutes: 14,
    summary:
      "Crear un agente anclado a la app, knowledge, acciones y publicación en Power Pages.",
    objectives: [
      "Crear un agente desde una canvas app",
      "Conectar knowledge y acciones",
      "Saber dónde se publica (app, Teams, Power Pages)",
    ],
    blocks: [
      {
        type: "p",
        text: "El study guide pide explícitamente: create a Copilot Studio agent from a canvas app. El patrón: la app resuelve la tarea estructurada; el agente cubre la conversación, el «cómo hago X» y las acciones que no merecen un botón más.",
      },
      {
        type: "steps",
        items: [
          {
            title: "Partir de la canvas",
            text: "En el studio, opción de crear agente. Hereda contexto de tablas y de la app.",
          },
          {
            title: "Knowledge",
            text: "Dataverse (las mismas tablas), SharePoint, archivos, sitios. Define el alcance: no mezcles RH y Finanzas en el mismo agente sin necesidad.",
          },
          {
            title: "Acciones y temas",
            text: "Temas clásicos para diálogos deterministas. Acciones = flujos o conectores (crear incidencia, consultar pedido). Generative orchestration cuando el agente elige la acción.",
          },
          {
            title: "Publicar y autenticar",
            text: "Canales: la propia app, Teams, Power Pages. Autenticación Entra ID para datos protegidos. El agente respeta Dataverse security si las acciones corren en contexto de usuario.",
          },
        ],
      },
      {
        type: "h2",
        text: "Power Pages",
      },
      {
        type: "p",
        text: "El rol también integra Copilot/agentes en sitios Power Pages (portales externos o internos). Dataverse table permissions del sitio son independientes de los security roles de apps internas: un usuario anónimo no ve lo mismo que un maker. El examen puede preguntar «exponer consultas de pedido a clientes» → Power Pages + table permissions + agente opcional, no una canvas interna compartida a 4.000 clientes.",
      },
      {
        type: "callout",
        kind: "exam",
        title: "Agente vs flujo vs app",
        text: "Chat y knowledge → agente. Botón «Enviar a SAP» determinista → flujo. Captura masiva de datos → app. Si el escenario mezcla los tres, la solución completa es la que orquesta: app para el trabajo, flujo para el sistema, agente para la ayuda.",
      },
    ],
  },
];
