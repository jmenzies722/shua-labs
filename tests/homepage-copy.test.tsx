import { render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import { siteMeta, labLoop } from "@/content/social";
import { featuredBuild } from "@/content/projects";
import { buildLog } from "@/content/build-log";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

vi.mock("@/lib/build-feed", () => ({
  getBuildFeed: async () =>
    buildLog.slice(0, 3).map((e) => ({ ...e, source: "manual" as const })),
}));

const REQUIRED = [
  siteMeta.name,
  siteMeta.tagline,
  siteMeta.supporting,
  "Currently building",
  featuredBuild.name,
  "The lab",
  labLoop[0].title,
  "Build log",
  buildLog[0].title,
  "From the lab",
  "Follow the build.",
];

test("homepage sentences match the master lab positioning", async () => {
  const HomePage = (await import("@/app/page")).default;
  render(await HomePage());
  for (const sentence of REQUIRED) {
    expect(screen.getAllByText(sentence).length).toBeGreaterThan(0);
  }
});
