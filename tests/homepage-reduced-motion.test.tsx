import { render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";

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

  expect(
    screen.getByRole("heading", { name: /building what comes next/i })
  ).toBeInTheDocument();
  expect(
    screen.getByText(
      /creates ventures, products, and systems for an ai-native world/i
    )
  ).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: /three focus areas, high conviction/i })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: /our operating thesis/i })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: /new ventures are underway/i })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: /what we're thinking about/i })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: /josh menzies/i })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: /let's build something together/i })
  ).toBeInTheDocument();

  const photos = screen.getAllByRole("img", { name: /josh menzies/i });
  expect(photos[0]).toHaveAttribute("src", "/static/josh-menzies.jpg");
  expect(
    screen.getAllByRole("link", { name: /start a conversation|get in touch/i })
  ).not.toHaveLength(0);
});
