import type { Config } from "tailwindcss";

/**
 * Shua Labs v6 — clean.
 *
 * Token NAMES are unchanged from v2 on purpose: /registry and every existing component styles
 * against `bg-bg-panel`, `text-fg-muted`, `border-line`. Swapping the values re-skins the whole
 * site without touching those files.
 *
 * Black and white, with room to breathe.
 *
 * The previous versions were dense and hairline-heavy — editorial, and consistently not what
 * was wanted. "Clean and modern" in ordinary usage means the opposite: centred, generous
 * whitespace, soft raised cards with real corner radius, and large clear type. Structure comes
 * from grouped surfaces rather than from rules between things.
 *
 * The APE violet system is Shua Labs' documented default, and it was the wrong call here —
 * Josh asked for Notion's monochrome twice. Claude Design also returned monochrome
 * independently. A colourless palette is a real position, not an absence of one: with no hue
 * doing the work, hierarchy has to come from weight, spacing, and alpha, which is harder to
 * fake and reads as considered.
 *
 *   · #000 page. Every surface is white at a low alpha, so depth is one variable.
 *   · text is white stepped down by alpha — 100 / 82 / 62 / 45%
 *   · interactive elements are WHITE, distinguished by underline and opacity, never by colour
 *   · status pills differ by alpha and label, not by hue
 *   · no gradient, no glow, no backdrop-filter
 */
const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        md: "2rem",
        lg: "3rem",
      },
      screens: {
        "2xl": "1100px",
      },
    },
    extend: {
      colors: {
        bg: {
          // Not pure #000 — a hair of lift stops cards from looking like holes.
          DEFAULT: "#0a0a0a",
          base: "#0a0a0a",
          deep: "#000000",
          panel: "#131313",
          raised: "#1a1a1a",
          card: "#131313",
          tile: "#131313",
        },
        fg: {
          DEFAULT: "#ffffff",
          body: "rgba(255,255,255,0.82)",
          muted: "rgba(255,255,255,0.62)",
          subtle: "rgba(255,255,255,0.45)",
        },
        line: {
          DEFAULT: "rgba(255,255,255,0.08)",
          strong: "rgba(255,255,255,0.16)",
        },
        // "Accent" is white. Links read as links via underline and opacity, not hue.
        accent: {
          DEFAULT: "#ffffff",
          hi: "#ffffff",
          sky: "#ffffff",
          fill: "#ffffff",
          fillHover: "rgba(255,255,255,0.88)",
          soft: "rgba(255,255,255,0.08)",
          ring: "rgba(255,255,255,0.55)",
          glow: "rgba(255,255,255,0.12)",
        },
        /**
         * Notion's tag palette — background/text pairs, all desaturated.
         * Deliberately quiet: a page of shouting tags is unreadable.
         */
        tag: {
          gray: "rgba(255,255,255,0.06)",
          grayText: "rgba(255,255,255,0.62)",
          brown: "rgba(255,255,255,0.06)",
          brownText: "rgba(255,255,255,0.62)",
          orange: "rgba(255,255,255,0.06)",
          orangeText: "rgba(255,255,255,0.62)",
          yellow: "rgba(255,255,255,0.06)",
          yellowText: "rgba(255,255,255,0.62)",
          green: "rgba(255,255,255,0.12)",
          greenText: "#ffffff",
          blue: "rgba(255,255,255,0.06)",
          blueText: "rgba(255,255,255,0.62)",
          purple: "rgba(255,255,255,0.06)",
          purpleText: "rgba(255,255,255,0.62)",
          pink: "rgba(255,255,255,0.06)",
          pinkText: "rgba(255,255,255,0.62)",
          red: "rgba(255,255,255,0.06)",
          redText: "rgba(255,255,255,0.62)",
        },
        // Legacy tier dots — remapped onto the Notion palette so older components stay coherent.
        tier: {
          free: "#ffffff",
          freemium: "rgba(255,255,255,0.62)",
          paid: "rgba(255,255,255,0.62)",
          wip: "rgba(255,255,255,0.45)",
        },
      },
      fontFamily: {
        // Notion's actual stack — ui-sans-serif first so it inherits the OS UI face.
        sans: [
          "var(--font-body)",
          "ui-sans-serif",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
        mono: [
          "var(--font-mono-brand)",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "monospace",
        ],
        // Space Grotesk — the technical-but-crafted display face of the APE system.
        display: ["var(--font-display)", "ui-sans-serif", "-apple-system", "sans-serif"],
        serif: ["var(--font-display)", "ui-sans-serif", "sans-serif"],
      },
      letterSpacing: {
        "apple-tight": "-0.015em",
        "apple-section": "-0.01em",
        "apple-body": "-0.011em",
        "apple-sub": "-0.008em",
      },
      borderRadius: {
        // Generous. Small radii read as utilitarian; this is the single clearest "modern" signal.
        "3xl": "28px",
        "2xl": "20px",
        xl: "16px",
        lg: "12px",
        md: "10px",
        sm: "8px",
        pill: "999px",
      },
      boxShadow: {
        ring: "0 0 0 1px rgba(255,255,255,0.6)",
        "ring-soft": "0 0 0 1px rgba(255,255,255,0.3)",
        hairline: "0 0 0 1px rgba(255,255,255,0.09)",
        "hairline-hi": "0 0 0 1px rgba(255,255,255,0.16)",
        // Depth is a hairline plus a black drop. No colour, no backdrop-filter — the returned
        // design stacked 24 of them and the compositor could not render a single frame.
        tile: "0 0 0 1px rgba(255,255,255,0.11), 0 18px 48px -24px rgba(0,0,0,0.9)",
      },
      backgroundImage: {
        "tile-grad": "none",
      },
      keyframes: {
        "drawer-in": {
          "0%": { transform: "translateY(8px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "sheet-in": {
          "0%": { transform: "translateY(16px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "drawer-in": "drawer-in 200ms ease-out both",
        "sheet-in": "sheet-in 200ms ease-out both",
        "fade-in": "fade-in 160ms ease-out both",
      },
      transitionTimingFunction: {
        apple: "ease-out",
        premium: "ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
