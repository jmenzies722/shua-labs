import type { Transition, Variants } from "framer-motion";

/**
 * Homepage motion tokens — extend the live whileInView fades.
 * One ease and one viewport so section reveals do not fight.
 *
 * Form: keep HeroNew's shipped ease, not Reveal.tsx's 28px / 900ms kit.
 */
export const EASE = [0.25, 0.1, 0.25, 1] as const;

export const DURATION_HERO = 0.55;
export const DURATION_REVEAL = 0.5;
export const DURATION_CHROME = 0.28;
export const DURATION_HOVER = 0.2;

export const Y_COPY = 12;
export const Y_CARD = 16;

export const STAGGER = 0.06;
export const STAGGER_FOUNDER = 0.08;
export const STAGGER_MENU = 0.04;

export const VIEWPORT = { once: true, margin: "-80px" } as const;

export function heroTransition(
  reduced: boolean | null,
  delay = 0
): Transition {
  return {
    duration: reduced ? 0 : DURATION_HERO,
    delay: reduced ? 0 : delay,
    ease: EASE,
  };
}

export function revealTransition(
  reduced: boolean | null,
  delay = 0
): Transition {
  return {
    duration: reduced ? 0 : DURATION_REVEAL,
    delay: reduced ? 0 : delay,
    ease: EASE,
  };
}

export function chromeTransition(
  reduced: boolean | null,
  delay = 0
): Transition {
  return {
    duration: reduced ? 0 : DURATION_CHROME,
    delay: reduced ? 0 : delay,
    ease: EASE,
  };
}

/** Hero / nav load. Reduced: duration 0, no transform, first paint is final. */
export function loadFade(reduced: boolean | null, delay = 0, y = Y_CARD) {
  if (reduced) {
    return {
      initial: false as const,
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0 },
    };
  }
  return {
    initial: { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: heroTransition(false, delay),
  };
}

export function staggerContainer(
  reduced: boolean | null,
  stagger = STAGGER
): Variants {
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduced ? 0 : stagger,
        delayChildren: 0,
      },
    },
  };
}

export function staggerItem(reduced: boolean | null, y: number): Variants {
  return {
    hidden: { opacity: reduced ? 1 : 0, y: reduced ? 0 : y },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduced ? 0 : DURATION_REVEAL,
        ease: EASE,
      },
    },
  };
}

export const sectionInView = {
  initial: "hidden" as const,
  whileInView: "visible" as const,
  viewport: VIEWPORT,
};
