import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import HomePage from "@/app/page";

/** Live homepage sentences from master — motion must not rewrite them. */
const HOMEPAGE_SENTENCES = [
  "Building what comes next.",
  "Shua Labs creates ventures, products, and systems for an AI-native world.",
  "Three focus areas, high conviction.",
  "AI-native ventures",
  "Building companies and products that are native to the AI era—systems that leverage AI as a core capability rather than an add-on.",
  "Developer systems",
  "Creating tools and infrastructure that make AI-assisted engineering safer, more observable, and more productive for teams.",
  "Digital infrastructure",
  "Designing the foundational systems and platforms that enable the next generation of AI-native applications and services.",
  "Our operating thesis.",
  "Start close to the problem",
  "We begin with real problems, not abstract opportunities. Understanding the actual pain points and constraints comes before any solution.",
  "Build real things",
  "We ship working software and systems, not slide decks. Code running in production is the only proof that matters.",
  "Compound what works",
  "When something works, we double down. We build systems that get stronger with use, not weaker.",
  "Share selectively",
  "We publish what's useful and keep what's sensitive. Not everything needs to be public, but nothing should be hidden without reason.",
  "New ventures are underway.",
  "Technology should increase human agency.",
  "Useful systems earn trust through use, not theater.",
  "The next company starts with a problem worth staying close to.",
  "Read the thesis",
  "A platform engineer in New York building the infrastructure and developer experience layer for AI-assisted engineering teams.",
  'I focus on the systems that make AI reliable at scale—gateways, governance, observability, and the tools that turn "the agent helped" into something you can actually measure. Previously worked on developer tooling and infrastructure across multiple organizations.',
  "Let's build something together.",
  "Whether you're looking to collaborate, partner, or just have a conversation about the future of AI-native systems, we'd love to hear from you.",
  "Start a conversation",
  "jmenzies722@gmail.com",
];

test("homepage sentences are unchanged from the live venture-company page", () => {
  render(<HomePage />);

  for (const sentence of HOMEPAGE_SENTENCES) {
    expect(screen.getAllByText(sentence).length).toBeGreaterThan(0);
  }

  expect(
    screen.getByText(
      /We're building the next generation of AI-native systems and companies/i
    )
  ).toBeInTheDocument();
  expect(
    screen.getByText(/When there's something to show, we'll show it/i)
  ).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: /josh menzies/i })
  ).toBeInTheDocument();
});
