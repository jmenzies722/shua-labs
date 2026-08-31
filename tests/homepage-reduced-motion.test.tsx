import { render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import { copy, site } from "@/data/site";

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
  expect(screen.getByRole("heading", { name: copy.hero })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: copy.systemTitle })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: copy.logTitle })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: copy.watchTitle })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /josh menzies/i })).toBeInTheDocument();
  const photos = screen.getAllByRole("img", { name: /josh menzies/i });
  expect(photos[0]).toHaveAttribute("src", site.founder.photo);
  expect(screen.getAllByRole("link", { name: /get in touch/i }).length).toBeGreaterThan(0);
});
