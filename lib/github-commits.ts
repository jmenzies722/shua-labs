import type { BuildFeedItem } from "@/content/types";

export const GITHUB_LAB_REPO = {
  owner: "jmenzies722",
  repo: "shua-labs",
} as const;

type GithubCommitApi = {
  sha: string;
  html_url: string;
  commit: {
    message: string;
    author: { date: string; name?: string };
  };
};

function toDate(iso: string): string {
  return iso.slice(0, 10);
}

function splitMessage(message: string): { title: string; summary: string; body: string[] } {
  const lines = message
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  const title = lines[0] ?? "Commit";
  const rest = lines.slice(1);
  const summary = rest[0] ?? "Shipped via GitHub.";
  return { title, summary, body: rest.length ? rest : [summary] };
}

/**
 * Fetch recent public commits. No token required for public repos.
 * Falls back to [] on network/API failure so the site never blanks.
 */
export async function fetchGithubCommits(
  limit = 12,
  repo = GITHUB_LAB_REPO
): Promise<BuildFeedItem[]> {
  const url = `https://api.github.com/repos/${repo.owner}/${repo.repo}/commits?per_page=${limit}`;

  try {
    const res = await fetch(url, {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "shua-labs-build-log",
      },
      next: { revalidate: 300 },
    });

    if (!res.ok) return [];

    const data = (await res.json()) as GithubCommitApi[];
    return data.map((c) => {
      const { title, summary, body } = splitMessage(c.commit.message);
      const sha = c.sha.slice(0, 7);
      return {
        id: `gh-${c.sha}`,
        slug: `commit-${sha}`,
        date: toDate(c.commit.author.date),
        title,
        summary,
        project: "public-lab",
        tags: ["github", "commit"],
        body,
        github: c.html_url,
        source: "github" as const,
        sha,
        commitUrl: c.html_url,
      };
    });
  } catch {
    return [];
  }
}
