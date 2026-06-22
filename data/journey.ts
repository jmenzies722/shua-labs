import type { JourneyEntry } from "@/lib/types";

/**
 * Public-facing changelog. Newest first.
 */
export const journey: JourneyEntry[] = [
  {
    date: "2026-06-22",
    title: "Shua Labs v2 — redesigned",
    detail:
      "Premium dark redesign. Category-organized gallery, project detail drawers, broadened to developer + AI enablement.",
  },
  {
    date: "2026-06-15",
    title: "Shipped AWS Read-Only MCP",
    detail: "Zero-write AWS query surface for agents — public on GitHub.",
  },
  {
    date: "2026-06-08",
    title: "Repo went public",
    detail: "shua-labs/* opened under MIT.",
  },
  {
    date: "2026-05-28",
    title: "Drafted the brand thesis",
    detail:
      "Open by default · Production-grade · Built to enable. The filter for every project.",
  },
];
