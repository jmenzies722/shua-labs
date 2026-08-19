import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import HomePage from "@/app/page";

test("states the live venture-company homepage purpose", () => {
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
    screen.getByRole("heading", { name: /josh menzies/i })
  ).toBeInTheDocument();
});

test("wires the founder photo and a contact path; does not publish the retired catalogue", () => {
  render(<HomePage />);

  expect(screen.getByRole("img", { name: /josh menzies/i })).toHaveAttribute(
    "src",
    "/static/josh-menzies.jpg"
  );
  expect(
    screen.getAllByRole("link", { name: /start a conversation|get in touch/i })
  ).not.toHaveLength(0);
  expect(
    screen.queryByText(/browse the registry|public repos|mcp-sync|claude-max/i)
  ).not.toBeInTheDocument();
});
