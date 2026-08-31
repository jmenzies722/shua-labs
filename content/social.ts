import type { MediaItem } from "./types";

export const siteMeta = {
  name: "Shua Labs",
  url: "https://shua-labs.vercel.app",
  tagline: "Building what’s next with AI.",
  supporting:
    "An independent AI lab building software, systems, and companies in public.",
  location: "New York",
  established: "2026",
  email: "jmenzies722@gmail.com",
  founder: {
    name: "Josh Menzies",
    role: "Founder",
    photo: "/static/josh-menzies.jpg",
    blurb:
      "Platform engineer in New York. Writes the company before the product — named owners, written rules, small verified increments.",
  },
} as const;

export const social = {
  github: {
    label: "GitHub",
    handle: "jmenzies722",
    href: "https://github.com/jmenzies722",
    live: true as const,
  },
  youtube: {
    label: "YouTube",
    handle: "@shualabs",
    href: null as string | null,
    live: false as const,
  },
  instagram: {
    label: "Instagram",
    handle: "@shualabs",
    href: null as string | null,
    live: false as const,
  },
} as const;

export const labLoop = [
  {
    n: "01",
    title: "Research",
    body: "Find important problems. Evidence before investment.",
  },
  {
    n: "02",
    title: "Build",
    body: "Turn validated ideas into working systems.",
  },
  {
    n: "03",
    title: "Ship",
    body: "Put software in front of real users — when one exists.",
  },
  {
    n: "04",
    title: "Learn",
    body: "Measure what happens. Kill with evidence is success.",
  },
  {
    n: "05",
    title: "Repeat",
    body: "Compound what works. Archive what doesn’t.",
  },
] as const;

/** Manual content pack — no API required for v1. */
export const media: MediaItem[] = [
  {
    id: "m1",
    kind: "Build Log",
    title: "Shua Labs website v1",
    href: "/build/public-lab-v1",
    date: "2026-08-31",
    meta: "Shipped",
    live: true,
  },
  {
    id: "m2",
    kind: "GitHub",
    title: "jmenzies722/shua-labs",
    href: "https://github.com/jmenzies722/shua-labs",
    date: "2026-08-31",
    meta: "Public repo",
    live: true,
  },
  {
    id: "m3",
    kind: "YouTube",
    title: "I wrote a company before I wrote a product",
    href: null,
    date: "2026-08-31",
    meta: "Draft · not live",
    live: false,
  },
  {
    id: "m4",
    kind: "Instagram",
    title: "The board — 11 roles, one frame",
    href: null,
    date: "2026-08-31",
    meta: "Draft · not live",
    live: false,
  },
  {
    id: "m5",
    kind: "Research",
    title: "Foundry operating model",
    href: "/research/foundry-operating-model",
    date: "2026-08-31",
    meta: "Note",
    live: true,
  },
];

export const youtubeEpisodes = [
  { n: "01", title: "Building Shua Labs From Zero", status: "draft" },
  { n: "02", title: "I Built an AI Company OS", status: "draft" },
  { n: "03", title: "Building an Agent Team", status: "draft" },
  { n: "04", title: "Can AI Run a Startup?", status: "draft" },
] as const;

export const instagramFormats = [
  "BUILD UPDATE",
  "ARCHITECTURE",
  "WHAT I LEARNED",
  "SHIPPED",
  "RESEARCH NOTE",
  "BEHIND THE BUILD",
] as const;
