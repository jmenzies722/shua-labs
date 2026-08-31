import type { ResearchEntry } from "./types";

/** Scaffold notes only. Do not invent market reports. */
export const research: ResearchEntry[] = [
  {
    id: "research-foundry",
    slug: "foundry-operating-model",
    title: "Foundry operating model",
    category: "Process",
    date: "2026-08-31",
    readingTime: "4 min",
    status: "NOTE",
    summary:
      "How a signal becomes EXPLORE / TEST / HOLD / KILL before Venture 001 exists.",
    body: [
      "Foundry is the selection machine. It is not a product.",
      "Pipeline: Signal → Opportunity → Vector → Forge → Pulse → Ledger → Oracle → Venture Council.",
      "KILL with evidence is success. Ghost customers are rejected.",
    ],
  },
  {
    id: "research-public-edge",
    slug: "building-in-the-open-edge",
    title: "Building in the open as the edge",
    category: "Brand",
    date: "2026-08-31",
    readingTime: "3 min",
    status: "EXPLORATION",
    summary:
      "Most AI companies announce a product. Publishing the operating system first is the distribution hook.",
    body: [
      "The show is the process: named owners, approval gates, dated work.",
      "Social platforms distribute. GitHub proves. The website organizes.",
      "Empty is honest. Invented traction is not.",
    ],
  },
  {
    id: "research-venture-placeholder",
    slug: "venture-001-intake",
    title: "Venture 001 intake (empty)",
    category: "Venture",
    date: "2026-08-31",
    readingTime: "1 min",
    status: "NOTE",
    summary: "PLACEHOLDER — waiting for a real painful problem worth testing.",
    body: [
      "Do not invent an ICP to fill this page.",
      "Next action: record a sourced signal in Company OS opportunities/.",
    ],
    placeholder: true,
  },
];

export function getResearch(slug: string) {
  return research.find((r) => r.slug === slug);
}
