import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import HomePage from "@/app/page";
import { copy, site, specialists } from "@/data/site";

test("states the public lab positioning without invented traction", () => {
  render(<HomePage />);
  expect(screen.getByRole("heading", { name: copy.hero })).toBeInTheDocument();
  expect(screen.getByText(copy.heroSub)).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: copy.systemTitle })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /josh menzies/i })).toBeInTheDocument();
  expect(screen.getByText(/no invented traction/i)).toBeInTheDocument();
});

test("renders the specialist board and founder photo", () => {
  render(<HomePage />);
  for (const s of specialists) {
    expect(screen.getAllByText(s.name, { selector: "p" }).length).toBeGreaterThan(0);
  }
  const photos = screen.getAllByRole("img", { name: /josh menzies/i });
  expect(photos[0]).toHaveAttribute("src", site.founder.photo);
  expect(screen.getAllByRole("link", { name: /get in touch/i }).length).toBeGreaterThan(0);
  expect(screen.queryByText(/browse the registry|mcp-sync|claude-max/i)).not.toBeInTheDocument();
});

test("watch section does not claim live social channels", () => {
  render(<HomePage />);
  expect(screen.getAllByRole("heading", { name: copy.watchTitle }).length).toBeGreaterThan(0);
  expect(screen.getAllByText("@shualabs").length).toBeGreaterThan(0);
  expect(screen.getAllByText(/opening/i).length).toBeGreaterThan(0);
  expect(screen.queryByText(/creates ventures, products, and systems for an ai-native world/i)).not.toBeInTheDocument();
});
