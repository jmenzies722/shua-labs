export const site = {
  name: "Shua Labs",
  url: "https://shua-labs.vercel.app",
  founder: {
    name: "Josh Menzies",
    location: "New York",
    role: "Founder",
    email: "jmenzies722@gmail.com",
    photo: "/static/josh-menzies.jpg",
    github: "https://github.com/jmenzies722",
  },
  githubOrgHint: "jmenzies722/shua-labs",
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
    href: null,
    live: false as const,
  },
  instagram: {
    label: "Instagram",
    handle: "@shualabs",
    href: null,
    live: false as const,
  },
} as const;

export const copy = {
  eyebrow: "Shua Labs · New York",
  hero: "Ten specialists. One founder. No product yet.",
  heroSub:
    "A company operating system on GitHub. AI specialists with jobs, not a chatbot with a logo. Building in the open — before there is anything to sell.",
  edgeTitle: "The edge is the process.",
  edgeBody:
    "Most AI companies announce a product. We published a constitution first: who owns what, what needs founder approval, and how an idea dies. That is the show.",
  systemTitle: "The org.",
  systemBody:
    "Shua coordinates. Nine specialists own a domain. Councils are rooms, not a second boss. GitHub is the system of record. Memory is a cache.",
  logTitle: "Lab log.",
  logBody: "Only dated work. Empty is honest. Invented traction is not.",
  watchTitle: "Watch the build.",
  watchBody:
    "YouTube for the long cut. Instagram for the stills. Until those channels go live, GitHub is the public record.",
  founderBlurb:
    "Platform engineer in New York. Building an AI-native company the same way he builds software: named owners, written rules, small verified increments.",
} as const;

export const specialists = [
  { code: "00", name: "Josh", title: "Founder", owns: "Thesis, L3–L4, BUILD / KILL" },
  { code: "01", name: "Shua", title: "Chief of Staff", owns: "Coordination, briefs, state" },
  { code: "02", name: "Vector", title: "Intelligence", owns: "Evidence, markets, truth" },
  { code: "03", name: "Forge", title: "Product", owns: "Problem, ICP, MVP" },
  { code: "04", name: "Atlas", title: "Architecture", owns: "ADRs, portability" },
  { code: "05", name: "Kernel", title: "Engineering", owns: "Delivery, PRs, harness" },
  { code: "06", name: "Sentinel", title: "Security", owns: "Risk, reliability" },
  { code: "07", name: "Pulse", title: "Growth", owns: "GTM experiments" },
  { code: "08", name: "Signal", title: "Media", owns: "Brand, narrative" },
  { code: "09", name: "Ledger", title: "Finance", owns: "Economics, kill math" },
  { code: "10", name: "Oracle", title: "Evaluation", owns: "Evals, process quality" },
] as const;

/** FACT only. Do not add undated or invented traction. */
export const labLog = [
  {
    date: "2026-08-30",
    title: "Company OS v0 accepted",
    body: "Action risk (L0–L4) separated from founder-reserved strategic decisions. Spec committed as canonical truth.",
  },
  {
    date: "2026-08-31",
    title: "Canonical tree scaffolded",
    body: "Policies, agents, councils, workflows, and empty ventures. No invented customers.",
  },
  {
    date: "2026-08-31",
    title: "Public lab surface rebuilt",
    body: "This site. Futuristic, minimal, honest. Social channels designed; not posted until the first real episode.",
  },
] as const;

export const episodes = [
  {
    n: "01",
    title: "I wrote a company before I wrote a product",
    format: "YouTube · 8–12 min",
    status: "draft",
  },
  {
    n: "02",
    title: "Ten specialists, zero employees",
    format: "YouTube · 8–12 min",
    status: "draft",
  },
  {
    n: "03",
    title: "The kill rule",
    format: "YouTube · 6–9 min",
    status: "draft",
  },
] as const;

export const instagramSeries = [
  { n: "01", title: "The board — 11 roles, one frame" },
  { n: "02", title: "L0 to L4 — what I won't let an agent do" },
  { n: "03", title: "Empty ventures folder" },
  { n: "04", title: "Founder brief, not a Slack dump" },
  { n: "05", title: "Building in the open, keeping the OS private" },
] as const;
