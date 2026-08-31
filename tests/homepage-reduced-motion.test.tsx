import { render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import { siteMeta } from "@/content/social";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

vi.mock("framer-motion", async (importOriginal) => {
  const actual = await importOriginal<typeof import("framer-motion")>();
  return {
    ...actual,
    useReducedMotion: () => true,
  };
});

test("reduced-motion users still get a complete homepage", async () => {
  const { default: HomePage } = await import("@/app/page");
  render(<HomePage />);
  expect(screen.getByRole("heading", { name: siteMeta.tagline })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /currently building/i })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /^the lab$/i })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /^build log$/i })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /follow the build/i })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /from the lab/i })).toBeInTheDocument();
});
