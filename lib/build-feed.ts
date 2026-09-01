import { buildLog } from "@/content/build-log";
import type { BuildFeedItem } from "@/content/types";
import { fetchGithubCommits } from "@/lib/github-commits";

function normalizeTitle(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

/**
 * Merge curated Build Log entries with recent GitHub commits.
 * Manual entries win on title/date collisions.
 */
export function mergeBuildFeed(
  manual: typeof buildLog,
  commits: BuildFeedItem[]
): BuildFeedItem[] {
  const manualItems: BuildFeedItem[] = manual.map((e) => ({
    ...e,
    source: "manual",
  }));

  const manualKeys = new Set(
    manualItems.map((e) => `${e.date}:${normalizeTitle(e.title)}`)
  );

  const githubOnly = commits.filter((c) => {
    const key = `${c.date}:${normalizeTitle(c.title)}`;
    return !manualKeys.has(key);
  });

  return [...manualItems, ...githubOnly].sort((a, b) =>
    a.date === b.date
      ? a.source === "manual"
        ? -1
        : 1
      : b.date.localeCompare(a.date)
  );
}

export async function getBuildFeed(limit?: number): Promise<BuildFeedItem[]> {
  const commits = await fetchGithubCommits(20);
  const merged = mergeBuildFeed(buildLog, commits);
  return typeof limit === "number" ? merged.slice(0, limit) : merged;
}
