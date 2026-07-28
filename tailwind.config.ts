import type { Config } from "tailwindcss";

/**
 * Shua Labs v4 — APE.
 *
 * Token NAMES are unchanged from v2 on purpose: /registry and every existing component styles
 * against `bg-bg-panel`, `text-fg-muted`, `border-line`. Swapping the values re-skins the whole
 * site without touching those files.
 *
 * This is the canonical Shua Labs system (`~/.claude/skills/design/design-tokens.md`),
 * confirmed 2026-07-06 and shipped in platform-eng-lab. The site previously ran its own
 * "Apple" identity, then briefly a Notion one; both were drift. This is the decided language.
 *
 *   · #06070d deep blue-black page; surfaces are white-alpha steps, not lighter greys
 *   · violet #7c6cff for EVERYTHING interactive — links, buttons, active nav, focus ring
 *   · --grad-brand appears exactly ONCE per page (the hero headline). It is a brand signal,
 *     not decoration. Put it on a button and it stops meaning anything.
 *   · depth = surface alpha + accent glow. Never hard shadows, never backdrop-filter stacks.
 *   · text never pure white — #f2f3fb headings, #e7e9f3 prose, #8b93b8 meta
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
          DEFAULT: "#06070d",
          base: "#06070d",
          deep: "#04050a",
          // Surfaces are alpha over the page, so they stay coherent on any band.
          panel: "rgba(255,255,255,0.02)",
          raised: "rgba(255,255,255,0.05)",
          card: "rgba(255,255,255,0.05)",
          tile: "rgba(255,255,255,0.02)",
        },
        fg: {
          DEFAULT: "#f2f3fb",
          body: "#e7e9f3",
          muted: "#c8cce4",
          subtle: "#8b93b8",
        },
        line: {
          DEFAULT: "rgba(255,255,255,0.09)",
          strong: "rgba(255,255,255,0.16)",
        },
        accent: {
          DEFAULT: "#7c6cff",
          hi: "#a78bfa",
          sky: "#38bdf8",
          fill: "#7c6cff",
          fillHover: "#6a58ff",
          soft: "rgba(124,108,255,0.12)",
          ring: "rgba(124,108,255,0.55)",
          glow: "rgba(124,108,255,0.5)",
        },
        /**
         * Notion's tag palette — background/text pairs, all desaturated.
         * Deliberately quiet: a page of shouting tags is unreadable.
         */
        tag: {
          gray: "rgba(255,255,255,0.06)",
          grayText: "#8b93b8",
          brown: "rgba(255,255,255,0.06)",
          brownText: "#c8cce4",
          orange: "rgba(255,180,84,0.10)",
          orangeText: "#ffb454",
          yellow: "rgba(255,214,102,0.10)",
          yellowText: "#ffd666",
          green: "rgba(52,211,153,0.12)",
          greenText: "#34d399",
          blue: "rgba(56,189,248,0.12)",
          blueText: "#38bdf8",
          purple: "rgba(124,108,255,0.14)",
          purpleText: "#a78bfa",
          pink: "rgba(179,166,255,0.12)",
          pinkText: "#b3a6ff",
          red: "rgba(255,138,128,0.12)",
          redText: "#ff8a80",
        },
        // Legacy tier dots — remapped onto the Notion palette so older components stay coherent.
        tier: {
          free: "#34d399",
          freemium: "#38bdf8",
          paid: "#a78bfa",
          wip: "#ffb454",
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
        // Lifted from the Claude Design composition — larger, calmer corners than Notion's 3px.
        "3xl": "18px",
        "2xl": "14px",
        xl: "11px",
        lg: "8px",
        md: "7px",
        sm: "6px",
        pill: "999px",
      },
      boxShadow: {
        ring: "0 0 0 1px rgba(124,108,255,0.6)",
        "ring-soft": "0 0 0 1px rgba(124,108,255,0.3)",
        hairline: "0 0 0 1px rgba(255,255,255,0.09)",
        "hairline-hi": "0 0 0 1px rgba(255,255,255,0.16)",
        // Depth is accent glow, not a drop shadow. No backdrop-filter anywhere — the returned
        // design stacked 24 of them and the compositor could not render a single frame.
        tile: "0 0 0 1px rgba(255,255,255,0.09), 0 18px 48px -24px rgba(124,108,255,0.28)",
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
