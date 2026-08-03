import type { PhaseGroup } from "@/lib/types";

/**
 * The four phases the ladder climbs through. Render order is preserved as-is.
 * These replaced the old marketing categories (AI Enablement / Developer Tools /
 * Open Source) on 2026-08-02 — the gallery is keyed to what the work proves,
 * not to what it could be sold as.
 */
export const phases: PhaseGroup[] = [
  {
    id: "1 Foundation",
    description:
      "Terraform module design, deployment strategy, multi-account governance. The floor everything else stands on.",
  },
  {
    id: "2 AI Core",
    description:
      "Agent design patterns, Claude API depth, and the CI/CD lever that actually changes how a team behaves.",
  },
  {
    id: "3 Platform",
    description:
      "Cost engineering, observability for AI systems, and extending Kubernetes rather than using it.",
  },
  {
    id: "4 Architecture",
    description:
      "Security and policy-as-code, system design at scale, and the writing that makes any of it legible to someone else.",
  },
];
