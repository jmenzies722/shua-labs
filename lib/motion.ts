import type { Transition, Variants } from "framer-motion";

/**
 * Public-site motion — smooth, deliberate, not snappy Notion fades.
 * Soft ease-out + longer travel so depth reads in motion as well as color.
 */
export const EASE = [0.22, 1, 0.36, 1] as const;

export const DURATION_HERO = 0.85;
export const DURATION_REVEAL = 0.7;
export const DURATION_CHROME = 0.4;
export const DURATION_HOVER = 0.28;

export const Y_COPY = 18;
export const Y_CARD = 24;

export const STAGGER = 0.08;
export const STAGGER_FOUNDER = 0.1;
export const STAGGER_MENU = 0.05;

export const VIEWPORT = { once: true, margin: "-10% 0px -8% 0px" } as const;

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
        delayChildren: reduced ? 0 : 0.06,
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
