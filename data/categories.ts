import type { Category } from "@/lib/types";

/**
 * Gallery categories — render order is preserved as-is.
 * Add a category by appending an object; assign projects to it via projects.ts.
 */
export const categories: Category[] = [
  {
    id: "ai-enablement",
    name: "AI Enablement",
    description:
      "Tools that make AI agents safe to deploy and easy to reason about in production.",
  },
  {
    id: "developer-tools",
    name: "Developer Tools",
    description:
      "Small, sharp utilities that compress the work between idea and shipped code.",
  },
  {
    id: "open-source",
    name: "Open Source",
    description:
      "Everything else built in the open — libraries, primitives, and experiments worth keeping.",
  },
];
