import { render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import { siteMeta } from "@/content/social";
import { buildLog } from "@/content/build-log";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

vi.mock("@/lib/build-feed", () => ({
  getBuildFeed: async () =>
    buildLog.slice(0, 3).map((e) => ({ ...e, source: "manual" as const })),
}));

test("states the lab positioning without invented traction", async () => {
  const HomePage = (await import("@/app/page")).default;
  render(await HomePage());
  expect(screen.getByRole("heading", { name: siteMeta.tagline })).toBeInTheDocument();
  expect(screen.getByText(siteMeta.supporting)).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /currently building/i })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /follow the build/i })).toBeInTheDocument();
  expect(screen.getAllByText(/@shualabs/).length).toBeGreaterThan(0);
});

test("exposes primary nav destinations", async () => {
  const HomePage = (await import("@/app/page")).default;
  render(await HomePage());
  expect(screen.getAllByRole("link", { name: /^work$/i }).length).toBeGreaterThan(0);
  expect(screen.getAllByRole("link", { name: /build log/i }).length).toBeGreaterThan(0);
  expect(screen.getAllByRole("link", { name: /^research$/i }).length).toBeGreaterThan(0);
  expect(screen.getAllByRole("link", { name: /^about$/i }).length).toBeGreaterThan(0);
});

test("does not claim live YouTube or Instagram URLs", async () => {
  const HomePage = (await import("@/app/page")).default;
  render(await HomePage());
  expect(screen.getAllByText(/opening|not live|draft|flip live/i).length).toBeGreaterThan(0);
  expect(screen.queryByRole("link", { name: /^youtube$/i })).not.toBeInTheDocument();
  expect(screen.queryByRole("link", { name: /^instagram$/i })).not.toBeInTheDocument();
});
