import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import HomePage from "@/app/page";
import { copy, episodes } from "@/data/site";

const HOMEPAGE_SENTENCES = [
  copy.hero,
  copy.heroSub,
  copy.edgeTitle,
  copy.edgeBody,
  copy.systemTitle,
  copy.logTitle,
  copy.watchTitle,
  copy.founderBlurb,
  "Company OS v0 accepted",
  episodes[0].title,
];

test("homepage sentences match the lab positioning", () => {
  render(<HomePage />);
  for (const sentence of HOMEPAGE_SENTENCES) {
    expect(screen.getAllByText(sentence).length).toBeGreaterThan(0);
  }
  expect(screen.getByRole("heading", { name: /josh menzies/i })).toBeInTheDocument();
});
