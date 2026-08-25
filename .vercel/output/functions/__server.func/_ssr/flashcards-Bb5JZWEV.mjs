//#region node_modules/.nitro/vite/services/ssr/assets/flashcards-Bb5JZWEV.js
var FLASHCARDS = [
	{
		id: "f1",
		domain: "d1",
		front: "¿Qué certificación da el examen AB-410?",
		back: "Microsoft Certified: Intelligent Applications Builder Associate. Sustituye el espacio de PL-200, con capa de IA."
	},
	{
		id: "f2",
		domain: "d1",
		front: "Pesos oficiales de los 3 dominios",
		back: "Cimientos 25–30%. Apps inteligentes 25–30%. Lógica y automatización 40–45%."
	},
	{
		id: "f3",
		domain: "d1",
		front: "Puntuación de aprobado",
		back: "700 / 1000. Duración típica 120 min. 40–60 preguntas."
	},
	{
		id: "f4",
		domain: "d1",
		front: "Default environment: ¿producción?",
		back: "No. Uno por tenant, productividad personal. No ALM serio ni apps de negocio."
	},
	{
		id: "f5",
		domain: "d1",
		front: "Sandbox vs Developer",
		back: "Developer: individual, incluye Dataverse. Sandbox: equipo, copy/reset, test."
	},
	{
		id: "f6",
		domain: "d1",
		front: "Unmanaged vs managed",
		back: "Unmanaged = se edita en DEV. Managed = se instala en TEST/PROD y no se edita a mano."
	},
	{
		id: "f7",
		domain: "d1",
		front: "¿Para qué sirve una environment variable?",
		back: "Config que cambia entre entornos (URLs, IDs). Se rellena en el deployment."
	},
	{
		id: "f8",
		domain: "d1",
		front: "Connection reference",
		back: "Puntero a una conexión. El destino enlaza su propia conexión; las conexiones no viajan en la solución."
	},
	{
		id: "f9",
		domain: "d1",
		front: "Ownership User/Team vs Organization",
		back: "User/Team: hay dueño y niveles User/BU/Org. Organization: catálogo, acceso none u org."
	},
	{
		id: "f10",
		domain: "d1",
		front: "Relación parental",
		back: "Cascada de assign, share, delete, reparent… Hijos que no viven sin el padre."
	},
	{
		id: "f11",
		domain: "d1",
		front: "Restrict delete",
		back: "No deja borrar el padre si hay hijos. Típico Cliente→Pedidos."
	},
	{
		id: "f12",
		domain: "d1",
		front: "Alternate key",
		back: "Unicidad de negocio e upsert de integración. No es lo mismo que duplicate detection."
	},
	{
		id: "f13",
		domain: "d1",
		front: "Choice global vs local",
		back: "Global: reutilizable entre tablas. Local: solo esa tabla."
	},
	{
		id: "f14",
		domain: "d1",
		front: "Prompt column",
		back: "Columna IA persistida. Prompt + inputs de la fila. Hasta 5/tabla. Asíncrona. Trigger: create/update de inputs."
	},
	{
		id: "f15",
		domain: "d1",
		front: "¿Qué no puede ser input de prompt column?",
		back: "Formula, file, image u otra prompt column."
	},
	{
		id: "f16",
		domain: "d1",
		front: "Row summary vs prompt column",
		back: "Row summary: digest Copilot en la ficha. Prompt column: valor persistido usable en vistas, flujos, reportes."
	},
	{
		id: "f17",
		domain: "d1",
		front: "Niveles de acceso de un privilegio",
		back: "None, User, Business Unit, Parent: Child BU, Organization."
	},
	{
		id: "f18",
		domain: "d1",
		front: "Append vs Append To",
		back: "Append: asociar ESTE registro a otro. Append To: permitir que otros se asocien a ESTE. En lookups hacen falta ambos."
	},
	{
		id: "f19",
		domain: "d1",
		front: "Owner team vs access team",
		back: "Owner: el equipo posee el registro. Access: compartir un registro ad-hoc sin poseerlo."
	},
	{
		id: "f20",
		domain: "d1",
		front: "Column security",
		back: "Protege un campo aunque haya Read de tabla. Las vistas y business rules NO son seguridad."
	},
	{
		id: "f21",
		domain: "d1",
		front: "Auditing: tres niveles",
		back: "Organización + tabla + columna. Sin los tres, no hay historial de ese campo."
	},
	{
		id: "f22",
		domain: "d1",
		front: "Change tracking",
		back: "Sync incremental / integraciones. No es auditing de compliance."
	},
	{
		id: "f23",
		domain: "d1",
		front: "Maker Copilot vs agente de negocio",
		back: "Maker: genera tablas/apps/flujos. Agente: conversación, knowledge y acciones para el usuario final."
	},
	{
		id: "f24",
		domain: "d1",
		front: "Orden de extensibilidad",
		back: "Config/low-code → conectores → custom connector/PCF → código (plugin)."
	},
	{
		id: "f25",
		domain: "d2",
		front: "Quick create",
		back: "Form corto + opción de tabla habilitada. Altas desde lookups."
	},
	{
		id: "f26",
		domain: "d2",
		front: "Quick view form",
		back: "Lectura embebida de un registro related dentro del form padre."
	},
	{
		id: "f27",
		domain: "d2",
		front: "Custom page",
		back: "Pantalla canvas dentro de una model-driven. Kanban, mapas, UI libre sin segunda app."
	},
	{
		id: "f28",
		domain: "d2",
		front: "Generative pages",
		back: "Crear esa custom page con lenguaje natural. Luego se revisa, publica y empaqueta."
	},
	{
		id: "f29",
		domain: "d2",
		front: "App access vs data access",
		back: "Sin rol de app: no ves la app. Sin privilegio de tabla: la ves vacía."
	},
	{
		id: "f30",
		domain: "d2",
		front: "Delegación en canvas",
		back: "Si la función no se ejecuta en el origen, solo procesas las primeras N filas (500–2000)."
	},
	{
		id: "f31",
		domain: "d2",
		front: "AccessibleLabel",
		back: "Texto que lee el lector de pantalla. Obligatorio en iconos-botón."
	},
	{
		id: "f32",
		domain: "d2",
		front: "UpdateContext vs Set vs ClearCollect",
		back: "Context = pantalla. Set = global. Collection = conjunto en memoria, no es la BD."
	},
	{
		id: "f33",
		domain: "d2",
		front: "Named formulas",
		back: "App.Formulas. Constantes y cálculos reactivos. Mejor que inflar OnStart con Set."
	},
	{
		id: "f34",
		domain: "d2",
		front: "User-defined function (Power Fx)",
		back: "Función con parámetros para reutilizar lógica en la app o componente."
	},
	{
		id: "f35",
		domain: "d2",
		front: "Component library",
		back: "Componentes versionados reutilizables entre canvas apps."
	},
	{
		id: "f36",
		domain: "d2",
		front: "Monitor",
		back: "Traza en vivo de fórmulas, delegación y red. Herramienta de test del study guide."
	},
	{
		id: "f37",
		domain: "d2",
		front: "IfError / App.OnError",
		back: "Manejo de errores de Patch y conectores. Avisa con Notify; no tragues el fallo."
	},
	{
		id: "f38",
		domain: "d2",
		front: "Llamar un flujo desde canvas",
		back: "Flow.Run(args). El flujo usa trigger Power Apps y puede Respond to a PowerApp."
	},
	{
		id: "f39",
		domain: "d2",
		front: "Agente desde canvas",
		back: "Crear Copilot Studio agent anclado a la app: knowledge de tablas + acciones (flujos)."
	},
	{
		id: "f40",
		domain: "d2",
		front: "Power Pages vs canvas compartida",
		back: "Externos/clientes: Pages + table permissions. Canvas interna no es un portal."
	},
	{
		id: "f41",
		domain: "d3",
		front: "Trigger Dataverse vs recurrence",
		back: "Evento de fila = Dataverse trigger. Recurrence no sustituye un «when created»."
	},
	{
		id: "f42",
		domain: "d3",
		front: "Select columns en el trigger",
		back: "Si la columna no está en el filtro de atributos, el update no dispara el flujo."
	},
	{
		id: "f43",
		domain: "d3",
		front: "Configure run after",
		back: "Ejecutar una acción si la anterior failed / succeeded / skipped / timed out. Patrón try/catch."
	},
	{
		id: "f44",
		domain: "d3",
		front: "Concurrency control del trigger",
		back: "Serializa ejecuciones (p. ej. grado 1) para no pisar el mismo registro."
	},
	{
		id: "f45",
		domain: "d3",
		front: "Child flow",
		back: "Reutilización y para no superar límites de acciones. Vive en una solución."
	},
	{
		id: "f46",
		domain: "d3",
		front: "First to respond vs Everyone must approve",
		back: "El primero decide vs todos deben aprobar (un rechazo corta)."
	},
	{
		id: "f47",
		domain: "d3",
		front: "Start and wait for an approval",
		back: "El flujo hiberna hasta la respuesta de Teams / centro de aprobaciones."
	},
	{
		id: "f48",
		domain: "d3",
		front: "Prompt AI Hub vs prompt column",
		back: "AI Hub: llamable a demanda (botón, flujo, agente). Column: auto al cambiar inputs, persistida."
	},
	{
		id: "f49",
		domain: "d3",
		front: "Knowledge en un prompt",
		back: "Grounding con documentos/datos para reducir alucinaciones."
	},
	{
		id: "f50",
		domain: "d3",
		front: "Temperatura baja",
		back: "Clasificación y extracción determinista. Alta = más creativo, peor para etiquetas."
	},
	{
		id: "f51",
		domain: "d3",
		front: "Invoice prebuilt vs prompt GPT",
		back: "PDF de factura con esquema conocido → modelo de invoices. Prompt genérico es plan B."
	},
	{
		id: "f52",
		domain: "d3",
		front: "Business rule scope Entity",
		back: "Corre en servidor: forms, API, importaciones. All forms = solo UX."
	},
	{
		id: "f53",
		domain: "d3",
		front: "Set recommendation",
		back: "Sugiere, no obliga. Distinct de Set business required."
	},
	{
		id: "f54",
		domain: "d3",
		front: "BPF",
		back: "Guía por etapas (pasos, ramas, multi-tabla). Puede disparar flujos al cambiar de etapa."
	},
	{
		id: "f55",
		domain: "d3",
		front: "Formula column vs rollup",
		back: "Formula: cálculo en la fila (Power Fx). Rollup: SUM/COUNT/MIN/MAX/AVG de hijos, asíncrono."
	},
	{
		id: "f56",
		domain: "d3",
		front: "Límite del rollup",
		back: "Asíncrono (hasta ~12 h) salvo recálculo. No es KPI en tiempo real estricto."
	},
	{
		id: "f57",
		domain: "d3",
		front: "Matriz rápida de lógica",
		back: "Campo UX → rule. Etapas → BPF. Cálculo fila → formula. Hijos → rollup. IA persistida → prompt column. IA a demanda → AI Hub. Conector/espera → flow. Chat → agente."
	},
	{
		id: "f58",
		domain: "d3",
		front: "Do until sin límites",
		back: "Anti-patrón. Siempre tope de conteo y timeout."
	},
	{
		id: "f59",
		domain: "d1",
		front: "Pipelines in Power Platform",
		back: "Despliegue DEV→TEST→PROD con aprobaciones. Preferible a export/import manual en empresa."
	},
	{
		id: "f60",
		domain: "d1",
		front: "Least privilege",
		back: "Clona Basic User y recorta. Nunca System Administrator para usuarios de negocio."
	},
	{
		id: "f61",
		domain: "d2",
		front: "Concurrent() en canvas",
		back: "Lanza varias llamadas de datos en paralelo (OnStart/OnVisible) para recortar espera."
	},
	{
		id: "f62",
		domain: "d3",
		front: "DLP (data loss prevention)",
		back: "Políticas de admin que bloquean mezclar conectores de negocio y personales. Un flujo «correcto» puede estar bloqueado."
	},
	{
		id: "f63",
		domain: "d1",
		front: "Virtual table",
		back: "Datos externos en tiempo real sin copiar a Dataverse. No para lógica offline pesada."
	},
	{
		id: "f64",
		domain: "d2",
		front: "Form fill assistance",
		back: "Copilot sugiere valores en el form. Se puede desactivar por columna."
	},
	{
		id: "f65",
		domain: "d3",
		front: "Respond to a PowerApp or flow",
		back: "Acción que devuelve valores al instant flow llamado desde canvas."
	}
];
//#endregion
export { FLASHCARDS as t };
