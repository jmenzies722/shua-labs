import { expect, test } from "vitest";
import { projects, featuredBuild } from "@/content/projects";
import { buildLog, getBuildEntry } from "@/content/build-log";
import { research, getResearch } from "@/content/research";
import { social } from "@/content/social";

test("projects mark placeholders and never invent live ventures", () => {
  expect(projects.length).toBeGreaterThan(0);
  const placeholders = projects.filter((p) => p.placeholder);
  expect(placeholders.every((p) => /placeholder/i.test(p.description))).toBe(true);
  expect(featuredBuild.name).toBeTruthy();
});

test("build log entries resolve by slug", () => {
  expect(buildLog.length).toBeGreaterThan(0);
  const first = buildLog[0];
  expect(getBuildEntry(first.slug)?.id).toBe(first.id);
});

test("research entries resolve by slug", () => {
  expect(research.length).toBeGreaterThan(0);
  const first = research[0];
  expect(getResearch(first.slug)?.id).toBe(first.id);
});

test("youtube and instagram stay offline until founder opens them", () => {
  expect(social.youtube.live).toBe(false);
  expect(social.youtube.href).toBeNull();
  expect(social.instagram.live).toBe(false);
  expect(social.instagram.href).toBeNull();
  expect(social.github.live).toBe(true);
});
