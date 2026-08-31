import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { expect, test } from "vitest";
import {
  DURATION_REVEAL,
  EASE,
  Y_CARD,
  Y_COPY,
  heroTransition,
  loadFade,
  revealTransition,
  staggerItem,
} from "@/lib/motion";

const MOTION_FILES = [
  "components/sections/HeroLab.tsx",
  "components/sections/Edge.tsx",
  "components/sections/SystemBoard.tsx",
  "components/sections/LabLog.tsx",
  "components/sections/Watch.tsx",
  "components/sections/FounderLab.tsx",
  "app/globals.css",
];

test("reduced-motion helpers use duration 0 and no transform travel", () => {
  expect(EASE).toEqual([0.25, 0.1, 0.25, 1]);
  expect(heroTransition(true).duration).toBe(0);
  expect(revealTransition(true).duration).toBe(0);
  expect(heroTransition(true).delay).toBe(0);
  const load = loadFade(true, 0.18);
  expect(load.initial).toBe(false);
  expect(load.transition.duration).toBe(0);
  const item = staggerItem(true, Y_CARD);
  expect(item.hidden).toMatchObject({ opacity: 1, y: 0 });
  expect(item.visible).toMatchObject({ opacity: 1, y: 0, transition: { duration: 0 } });
  const motionItem = staggerItem(false, Y_COPY);
  expect(motionItem.hidden).toMatchObject({ opacity: 0, y: Y_COPY });
  const visible = motionItem.visible;
  expect(visible).toMatchObject({
    opacity: 1,
    y: 0,
    transition: { duration: DURATION_REVEAL, ease: EASE },
  });
});

test("homepage motion files honor reduced-motion and keep the founder photo path", () => {
  for (const file of MOTION_FILES) {
    const src = readFileSync(resolve(file), "utf8");
    if (file.endsWith(".css")) {
      expect(src).toMatch(/prefers-reduced-motion:\s*reduce/);
      expect(src).toMatch(/transform:\s*none\s*!important/);
      continue;
    }
    expect(src).toMatch(/useReducedMotion/);
  }
  const siteData = readFileSync(resolve("data/site.ts"), "utf8");
  expect(siteData).toContain("/static/josh-menzies.jpg");
});
