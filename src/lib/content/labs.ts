import type { Lab } from "./types";

export const LABS: Lab[] = [
  {
    id: "lab-modelo",
    domain: "d1",
    title: "Modelo de incidencias con IA persistida",
    minutes: 25,
    scenario:
      "Fabrikam Support quiere registrar incidencias de clientes, asignarlas a agentes y ver en la vista un sentimiento y un resumen ejecutivo generados por IA. Al borrar un cliente no deben desaparecer las incidencias: debe bloquearse el borrado.",
    goal: "Diseñar tablas, relación, prompt columns y seguridad mínima como lo harías en el data workspace.",
    steps: [
      {
        title: "Reutilizar Account/Contact",
        detail:
          "No clones Cliente. Usa Account (u organización) y Contact. Crea la tabla custom Incidencia (user-owned) con primary column Título.",
        why: "El examen penaliza tablas duplicadas de estándar.",
      },
      {
        title: "Columnas de negocio",
        detail:
          "Prioridad (choice global Alta/Media/Baja), Estado (choice: Nueva, En curso, Esperando, Cerrada), Descripción (multilínea), Fecha límite (fecha), Canal (choice).",
        why: "Choice global de Prioridad se reutilizará en Tarea si crece el modelo.",
      },
      {
        title: "Relación Account 1:N Incidencia",
        detail:
          "Comportamiento referential, restrict delete. Lookup obligatorio en el main form.",
        why: "«No borrar cliente con incidencias» = restrict, no parental.",
      },
      {
        title: "Prompt columns",
        detail:
          "Sentimiento (input: Descripción) con filtro Estado ≠ Cerrada. Resumen ejecutivo (inputs: Título, Descripción, Prioridad). Máximo 5. Desmarca form fill assistance. Publica.",
        why: "Deben persistir para la vista y para un flujo posterior si Sentimiento = negativo.",
      },
      {
        title: "Vistas y form",
        detail:
          "Vista Activas: Título, Prioridad, Sentimiento, Account, Owner. Main form con pestaña Resumen y pestaña Detalle. Quick create con Título, Account, Prioridad.",
        why: "Dominio 1 pide public views y main forms a nivel de tabla.",
      },
      {
        title: "Seguridad",
        detail:
          "Rol Agente: Read/Write User en Incidencia, Read Org en Account. Rol Supervisor: Read BU. App todavía no: eso es el siguiente lab.",
        why: "Least privilege y niveles de acceso.",
      },
    ],
    examAngle:
      "Si el enunciado pide un campo de IA en la vista, no contestes row summary. Si pide proteger el padre, no contestes cascade delete.",
  },
  {
    id: "lab-mda",
    domain: "d2",
    title: "Componer la app de mesa de ayuda",
    minutes: 20,
    scenario:
      "Los agentes viven en una model-driven. Los supervisores necesitan un dashboard y un formulario con campos de SLA que el agente no debe ver. Quieren un kanban generado con lenguaje natural.",
    goal: "Una MDA con sitemap, dos forms, dashboard y una generative page.",
    steps: [
      {
        title: "Solución y app",
        detail:
          "En DEV, solución unmanaged FabrikamSupport. Nueva model-driven app. Añade Account, Contact, Incidencia.",
        why: "Nunca Default Solution.",
      },
      {
        title: "Forms por rol",
        detail:
          "Form Agente (sin SLA interno) y form Supervisor (con SLA). Form security + en cada app/role eliges el form. Quick view de Account en el form de Incidencia.",
        why: "Composición de app y form access son skills explícitos.",
      },
      {
        title: "Dashboard",
        detail:
          "Chart de incidencias por prioridad (tabla Incidencia) + lista de Activas. Dashboard de sistema incluido en la app.",
        why: "Charts y dashboards del dominio 2.",
      },
      {
        title: "Generative page kanban",
        detail:
          "Prompt: «tablero por Estado con tarjetas de Título y Prioridad, filtro por owner». Revisa accesibilidad, publícala, añádela al sitemap en el grupo Trabajo.",
        why: "Create generative pages by using natural language.",
      },
      {
        title: "Acceso",
        detail:
          "Asocia rol Agente y Supervisor a la app. Comparte. Prueba con un usuario que tenga rol de datos pero no de app (no debe verla) y al revés (app vacía).",
        why: "La trampa app vs datos.",
      },
    ],
    examAngle:
      "Custom/generative page vive DENTRO de la MDA. No hace falta una segunda canvas para un kanban interno.",
  },
  {
    id: "lab-canvas",
    domain: "d2",
    title: "Canvas de campo + agente",
    minutes: 22,
    scenario:
      "Técnicos en tablet cierran incidencias in situ, adjuntan notas y piden a un copiloto «¿cuál es el procedimiento de gas?» creando una subtarea.",
    goal: "Canvas responsive sobre Dataverse, flujo instantáneo y agente desde la app.",
    steps: [
      {
        title: "App from data",
        detail:
          "Canvas a partir de Incidencia. Tres pantallas o un layout maestro-detalle. Contenedores, no X/Y. AccessibleLabel en iconos.",
        why: "Create a canvas app using data + accessibility/responsive.",
      },
      {
        title: "Estado y fórmulas",
        detail:
          "Named formula StatusColor. Context var para el popup de confirmación. UDF para armar el título de subtarea. Patch con IfError + Notify.",
        why: "Named formulas, UDFs, error handling.",
      },
      {
        title: "Flujo desde botón",
        detail:
          "Instant flow «Crear subtarea»: trigger Power Apps, crea fila, Respond con el ID. Botón: Set(ticket, Flujo.Run(...)).",
        why: "Automate business processes from canvas apps.",
      },
      {
        title: "Monitor",
        detail:
          "Abre Monitor, filtra la galería, confirma que Filter es delegable. Si usaste Search no delegable, cámbialo.",
        why: "Test canvas apps, including using Monitor.",
      },
      {
        title: "Agente",
        detail:
          "Create Copilot Studio agent from the canvas. Knowledge: tabla Procedimiento + Incidencia. Acción: el flujo de subtarea. Autenticación de usuario.",
        why: "Skill literal del study guide.",
      },
    ],
    examAngle:
      "El agente no sustituye el Patch del técnico; lo complementa. El flujo no se usa para hide/show campos.",
  },
  {
    id: "lab-flujo",
    domain: "d3",
    title: "Alta prioridad: Teams, aprobación y SAP",
    minutes: 20,
    scenario:
      "Si una incidencia pasa a Prioridad Alta, avisar a Teams, esperar aprobación del supervisor y, si aprueba, llamar a un API interno. Si el email/Teams falla, crear una tarea de seguimiento.",
    goal: "Automated cloud flow con trigger filtrado, approval, run after y connection reference.",
    steps: [
      {
        title: "Trigger",
        detail:
          "Dataverse when a row is modified, tabla Incidencia, select columns: Prioridad. Trigger condition: Prioridad = Alta. Concurrency 1.",
        why: "Recommend triggers + no disparar en cada cambio de descripción.",
      },
      {
        title: "Estado Pendiente",
        detail:
          "Update row EstadoAprobacion = Pendiente. Luego Start and wait for an approval (first to respond al supervisor).",
        why: "La app debe reflejar la espera.",
      },
      {
        title: "Rama Outcome",
        detail:
          "Si Approve: HTTP o custom connector al API (premium consciente). Update Aprobada. Si Reject: Update Rechazada y Notify.",
        why: "Evaluate connectors. Custom connector si no hay estándar.",
      },
      {
        title: "Run after",
        detail:
          "Scope de notificación. Si falla, acción Crear tarea con run after has failed.",
        why: "Test and troubleshoot + control.",
      },
      {
        title: "ALM",
        detail:
          "El flujo en la solución, connection references, environment variable de la URL del API. Export managed a TEST.",
        why: "Un flujo «que funciona en DEV» no es un flujo de examen si no viaja.",
      },
    ],
    examAngle:
      "Recurrence cada 5 minutos es la trampa. Approvals nativo, no un Excel de Sí/No.",
  },
  {
    id: "lab-aihub",
    domain: "d3",
    title: "Prompt de cierre y modelo de facturas",
    minutes: 16,
    scenario:
      "Al cerrar, el agente pulsa «Redactar cierre» (revisable). Otro equipo sube PDF de facturas de proveedores y necesita total y CIF extraídos.",
    goal: "Un prompt de AI Hub consumido en app y flujo, y un modelo prebuilt de invoices.",
    steps: [
      {
        title: "Prompt Cierre",
        detail:
          "Plantilla de redactar. Inputs: Título, Descripción, Resolución. Knowledge: guía de tono. Temperatura baja. Output: JSON {cierre, siguientesPasos}.",
        why: "Build prompts, inputs, knowledge, settings.",
      },
      {
        title: "Consumo en canvas",
        detail:
          "Botón llama al prompt, rellena un text input editable, el usuario confirma y Patch.",
        why: "Consume a prompt in apps — humano en el loop.",
      },
      {
        title: "Consumo en flujo",
        detail:
          "Opcional: al cambiar Estado a Cerrada, si Cierre está vacío, Run a prompt y Update. No pises si el humano ya escribió.",
        why: "Consume a prompt in cloud flows.",
      },
      {
        title: "Facturas",
        detail:
          "Modelo prebuilt invoice processing. Flujo: archivo llega a SharePoint/Dataverse file → extrae campos → crea fila Factura.",
        why: "Consume an AI model. Prebuilt gana a un prompt genérico en documentos conocidos.",
      },
    ],
    examAngle:
      "Botón revisable ≠ prompt column automática. PDF de factura ≠ GPT en blanco.",
  },
  {
    id: "lab-bpf",
    domain: "d3",
    title: "BPF de resolución + reglas + rollup",
    minutes: 18,
    scenario:
      "Toda incidencia debe pasar por Triage → En curso → Resolución. Si Prioridad = Alta, hay etapa Extra de Escalado. El campo Causa raíz se oculta hasta Resolución. El Account debe mostrar recuento de incidencias abiertas.",
    goal: "BPF con rama, business rule de scope correcto, rollup y disparo de flujo.",
    steps: [
      {
        title: "BPF",
        detail:
          "Tabla Incidencia. Etapas con data steps. Branch: Prioridad Alta → Escalado. Roles que pueden usar el proceso. Inclúyelo en la MDA.",
        why: "Configure business process flows.",
      },
      {
        title: "Flujo de etapa",
        detail:
          "Al entrar en Escalado, el flujo de aprobación del lab anterior (o child flow).",
        why: "BPF dispara automatización; no la sustituye.",
      },
      {
        title: "Business rule",
        detail:
          "Si Estado/etapa no es Resolución, hide Causa raíz. Scope: All forms si es solo UX; Entity si además debe validarse en API.",
        why: "Configure business rules — el scope es la pregunta.",
      },
      {
        title: "Rollup en Account",
        detail:
          "IncidenciasAbiertas = COUNT de Incidencia where Estado ≠ Cerrada. Acepta asincronía o documenta recálculo.",
        why: "Rollup, no un flujo que +1/−1 a mano.",
      },
    ],
    examAngle:
      "Tres artefactos, tres jobs. Un flujo gigante que oculta campos y cuenta hijos es la respuesta incorrecta.",
  },
];
