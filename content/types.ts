export type ProjectCategory =
  | "VENTURE"
  | "EXPERIMENT"
  | "OPEN SOURCE"
  | "RESEARCH"
  | "INTERNAL";

export type ProjectStatus =
  | "RESEARCHING"
  | "PROTOTYPING"
  | "BUILDING"
  | "LIVE"
  | "OPEN SOURCE"
  | "ARCHIVED";

export type BuildStatus =
  | "Research"
  | "Prototype"
  | "Building"
  | "Testing"
  | "Shipping";

export type ResearchKind = "NOTE" | "EXPLORATION" | "REPORT" | "THESIS";

export type MediaKind =
  | "YouTube"
  | "Instagram"
  | "Build Log"
  | "Research"
  | "GitHub";

export type BuildFeedSource = "manual" | "github";

export interface Project {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: ProjectCategory;
  status: ProjectStatus;
  year: number;
  technologies: string[];
  featured: boolean;
  links: { label: string; href: string }[];
  github?: string;
  createdAt: string;
  updatedAt: string;
  /** True when this row is scaffold data, not a shipped venture. */
  placeholder?: boolean;
}

export interface FeaturedBuild {
  projectSlug: string;
  name: string;
  status: BuildStatus;
  description: string;
  milestone: string;
  lastUpdate: string;
  links: { label: string; href: string }[];
}

export interface BuildLogEntry {
  id: string;
  slug: string;
  date: string;
  title: string;
  summary: string;
  project?: string;
  tags: string[];
  body: string[];
  github?: string;
  youtube?: string;
  instagram?: string;
}

export interface BuildFeedItem extends BuildLogEntry {
  source: BuildFeedSource;
  sha?: string;
  commitUrl?: string;
}

export interface ResearchEntry {
  id: string;
  slug: string;
  title: string;
  category: string;
  date: string;
  readingTime: string;
  status: ResearchKind;
  summary: string;
  body: string[];
  placeholder?: boolean;
}

export interface MediaItem {
  id: string;
  kind: MediaKind;
  title: string;
  href: string | null;
  date: string;
  meta: string;
  live: boolean;
}
