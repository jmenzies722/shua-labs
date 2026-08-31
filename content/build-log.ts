import type { BuildLogEntry } from "./types";

export const buildLog: BuildLogEntry[] = [
  {
    id: "2026-08-31-public-lab",
    slug: "public-lab-v1",
    date: "2026-08-31",
    title: "Shua Labs website v1",
    summary:
      "Public lab surface redesigned and shipped. Phosphor brand, honest copy, social channels designed not invented.",
    project: "public-lab",
    tags: ["website", "brand", "ship"],
    body: [
      "Rebuilt the public site as a building-in-the-open lab home.",
      "No invented traction. YouTube and Instagram handles reserved in content, marked not live.",
      "Production: shua-labs.vercel.app",
    ],
    github: "https://github.com/jmenzies722/shua-labs",
  },
  {
    id: "2026-08-31-company-os-tree",
    slug: "company-os-scaffold",
    date: "2026-08-31",
    title: "Company OS tree scaffolded",
    summary:
      "Canonical directories committed — policies, agents, councils, workflows, empty ventures.",
    project: "company-os",
    tags: ["company-os", "process"],
    body: [
      "Phase 0 of Company OS: the handbook lives in private GitHub.",
      "Foundry workflow activated as process docs only.",
    ],
  },
  {
    id: "2026-08-30-company-os-v0",
    slug: "company-os-v0-accepted",
    date: "2026-08-30",
    title: "Company OS v0 accepted",
    summary:
      "Action risk L0–L4 separated from founder-reserved strategic decisions.",
    project: "company-os",
    tags: ["company-os", "policy"],
    body: [
      "Spec accepted as Cursor bootstrap input.",
      "BUILD / SCALE / KILL remain founder-reserved regardless of operational risk.",
    ],
  },
];

export function getBuildEntry(slug: string) {
  return buildLog.find((e) => e.slug === slug);
}
