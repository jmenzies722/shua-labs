import { expect, test } from "vitest";
import { buildLog } from "@/content/build-log";
import type { BuildFeedItem } from "@/content/types";
import { mergeBuildFeed } from "@/lib/build-feed";

test("merge prefers manual lab notes over same-day github titles", () => {
  const commits: BuildFeedItem[] = [
    {
      id: "gh-1",
      slug: "commit-abc1234",
      date: buildLog[0].date,
      title: buildLog[0].title,
      summary: "dup",
      tags: ["github"],
      body: ["dup"],
      source: "github",
      sha: "abc1234",
      commitUrl: "https://github.com/example/commit/abc",
    },
    {
      id: "gh-2",
      slug: "commit-def5678",
      date: "2099-01-01",
      title: "Brand new commit only on GitHub",
      summary: "fresh",
      tags: ["github"],
      body: ["fresh"],
      source: "github",
      sha: "def5678",
      commitUrl: "https://github.com/example/commit/def",
    },
  ];

  const merged = mergeBuildFeed(buildLog, commits);
  const titles = merged.map((e) => e.title);

  expect(titles).toContain(buildLog[0].title);
  expect(titles).toContain("Brand new commit only on GitHub");
  expect(merged.filter((e) => e.title === buildLog[0].title)).toHaveLength(1);
  expect(merged[0].date >= merged[merged.length - 1].date).toBe(true);
});

test("manual entries are tagged as manual in the feed", () => {
  const merged = mergeBuildFeed(buildLog, []);
  expect(merged.every((e) => e.source === "manual")).toBe(true);
  expect(merged.length).toBe(buildLog.length);
});
