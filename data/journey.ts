import type { JourneyEntry } from "@/lib/types";

/**
 * Public-facing changelog. Newest first.
 * Only real, verifiable milestones. No fabricated dates, no "shipped" claims
 * for tools that are not actually public.
 */
export const journey: JourneyEntry[] = [
  {
    date: "2026-06-22",
    title: "Site live on Vercel",
    detail:
      "Apple-grade dark redesign, deployed and wired to auto-deploy from GitHub on every push.",
  },
  {
    date: "2026-06-22",
    title: "Locked the consulting practice",
    detail:
      "Three offers — Audit, Build, Fractional — with pricing pressure-tested against the 2026 market.",
  },
  {
    date: "2026-06-21",
    title: "Opened the repo",
    detail: "shua-labs went public under MIT.",
  },
  {
    date: "2026-06-21",
    title: "Drafted the brand thesis",
    detail:
      "Open by default · Production-grade · Built to enable. The filter for every project.",
  },
];
