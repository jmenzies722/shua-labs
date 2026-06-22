import type { PrincipleEntry } from "@/lib/types";

/**
 * The three brand principles. Editorial — not a rigid card grid.
 */
export const principles: PrincipleEntry[] = [
  {
    id: "Open by default",
    definition:
      "Shipped in the open under MIT. Forkable, readable, and built to be extended.",
    icon: "Github",
  },
  {
    id: "Production-grade",
    definition:
      "Observability, guardrails, and cost-awareness baked in. Not demos — software that survives real traffic.",
    icon: "Shield",
  },
  {
    id: "Built to enable",
    definition:
      "Every project makes a developer or a team measurably more capable. Nothing here is decorative.",
    icon: "Sparkles",
  },
];
