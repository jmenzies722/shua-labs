import type { FeaturedBuild, Project } from "./types";

/**
 * Real work only + clearly marked placeholders.
 * Do not invent ventures, customers, or traction.
 */
export const projects: Project[] = [
  {
    id: "company-os",
    slug: "company-os",
    name: "Company OS",
    description:
      "Private GitHub constitution for Shua Labs — agents, policies, councils, and decision records. Canonical truth over bot memory.",
    category: "INTERNAL",
    status: "BUILDING",
    year: 2026,
    technologies: ["Markdown", "GitHub", "Agent contracts"],
    featured: true,
    links: [{ label: "Private repo", href: "https://github.com/jmenzies722" }],
    createdAt: "2026-08-30",
    updatedAt: "2026-08-31",
  },
  {
    id: "public-lab",
    slug: "public-lab",
    name: "Public lab surface",
    description:
      "This site. Building-in-the-open brand home for YouTube, Instagram, and GitHub distribution.",
    category: "EXPERIMENT",
    status: "LIVE",
    year: 2026,
    technologies: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
    featured: true,
    links: [
      { label: "Live", href: "https://shua-labs.vercel.app" },
      { label: "GitHub", href: "https://github.com/jmenzies722/shua-labs" },
    ],
    github: "https://github.com/jmenzies722/shua-labs",
    createdAt: "2026-08-31",
    updatedAt: "2026-08-31",
  },
  {
    id: "registry",
    slug: "registry",
    name: "Agent registry",
    description:
      "Catalogue of agents, MCP servers, and harness tools with validation on every push.",
    category: "OPEN SOURCE",
    status: "OPEN SOURCE",
    year: 2026,
    technologies: ["Next.js", "TypeScript", "YAML"],
    featured: false,
    links: [{ label: "Registry", href: "/registry" }],
    github: "https://github.com/jmenzies722/shua-labs",
    createdAt: "2026-08-01",
    updatedAt: "2026-08-31",
  },
  {
    id: "venture-001",
    slug: "venture-001",
    name: "Venture 001",
    description:
      "PLACEHOLDER — first real venture after Foundry produces an OBSERVED opportunity. Not invented.",
    category: "VENTURE",
    status: "RESEARCHING",
    year: 2026,
    technologies: [],
    featured: false,
    links: [],
    createdAt: "2026-08-31",
    updatedAt: "2026-08-31",
    placeholder: true,
  },
];

export const featuredBuild: FeaturedBuild = {
  projectSlug: "public-lab",
  name: "Public lab surface",
  status: "Shipping",
  description:
    "Canonical public home for Shua Labs — brand, build log, and social-ready visual system.",
  milestone: "v1 live on shua-labs.vercel.app",
  lastUpdate: "2026-08-31",
  links: [
    { label: "View Build", href: "/" },
    { label: "GitHub", href: "https://github.com/jmenzies722/shua-labs" },
    { label: "Build Log", href: "/build" },
  ],
};

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function featuredProjects() {
  return projects.filter((p) => p.featured && !p.placeholder);
}
