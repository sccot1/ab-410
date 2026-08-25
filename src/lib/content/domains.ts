import type { Domain } from "./types";

export const DOMAINS: Domain[] = [
  {
    id: "d1",
    code: "1",
    weight: "25–30%",
    weightMin: 25,
    weightMax: 30,
    title: "Cimientos de aplicaciones inteligentes",
    blurb:
      "Diseñar la solución con Copilot, modelar Dataverse, entornos, ALM y seguridad.",
  },
  {
    id: "d2",
    code: "2",
    weight: "25–30%",
    weightMin: 25,
    weightMax: 30,
    title: "Crear aplicaciones inteligentes",
    blurb:
      "Model-driven, canvas, páginas generativas, Copilot y agentes en las apps.",
  },
  {
    id: "d3",
    code: "3",
    weight: "40–45%",
    weightMin: 40,
    weightMax: 45,
    title: "Lógica de negocio y automatización",
    blurb:
      "Cloud flows, AI Hub, reglas, BPF y columnas calculadas, rollup y fórmula.",
  },
];

export const EXAM = {
  code: "AB-410",
  name: "Building Intelligent Applications",
  credential: "Microsoft Certified: Intelligent Applications Builder Associate",
  durationMin: 120,
  questionRange: "40–60",
  passScore: 700,
  scaleMax: 1000,
  priceUsd: 165,
  language: "Inglés (otras localizaciones según Pearson Vue)",
  successorOf: "PL-200",
};
