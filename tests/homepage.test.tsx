import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import HomePage from "@/app/page";

test("states Shua Labs' parent-company purpose", () => {
  render(<HomePage />);

  expect(
    screen.getByRole("heading", { name: /building what\s*comes next/i })
  ).toBeInTheDocument();
  expect(
    screen.getByText(
      /creates ventures, products, and systems for an ai-native world/i
    )
  ).toBeInTheDocument();
});

test("offers a contact path and does not publish the retired catalogue", () => {
  render(<HomePage />);

  expect(
    screen.getAllByRole("link", { name: /start a conversation|contact/i })
  ).not.toHaveLength(0);
  expect(
    screen.queryByText(/browse the registry|public repos|mcp-sync|claude-max/i)
  ).not.toBeInTheDocument();
});
