import type { Config } from "tailwindcss";

/**
 * Shua Labs v3 — Notion dark pass.
 *
 * Token NAMES are unchanged from v2 on purpose: /registry and every existing component styles
 * against `bg-bg-panel`, `text-fg-muted`, `border-line`. Swapping the values re-skins the whole
 * site without touching those files.
 *
 * These are Notion's real dark-mode values, not an inverted light theme:
 *   · #191919 page / #202020 rail — charcoal, never pure black. Pure #000 crushes the
 *     hairlines and the whole structure disappears.
 *   · text at rgba-white ~81%, not #fff — full white on charcoal is glare at body size
 *   · borders at ~9% white; structure comes from spacing, with hairlines as a last resort
 *   · small radii (3px), not pills — Notion is square-ish and calm
 *   · dark tag pairs: deep desaturated bg, luminous text of the same hue
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
          DEFAULT: "#191919",
          base: "#191919",
          deep: "#141414",
          // The rail and secondary surfaces sit *above* the page, Notion-style.
          panel: "#202020",
          raised: "#2c2c2c",
          card: "#202020",
          tile: "#202020",
        },
        fg: {
          // ~81% white. Full #fff at body size on charcoal is glare, not contrast.
          DEFAULT: "#d4d4d4",
          muted: "#9b9b9b",
          subtle: "#6f6f6f",
        },
        line: {
          DEFAULT: "#2f2f2f",
          strong: "#3d3d3d",
        },
        accent: {
          // Notion's dark-mode link blue — lifted for legibility on charcoal.
          DEFAULT: "#529cca",
          hi: "#6db3de",
          fill: "#2383e2",
          fillHover: "#3d94e8",
          soft: "#143a4e",
          ring: "rgba(82, 156, 202, 0.55)",
          glow: "rgba(82, 156, 202, 0.14)",
        },
        /**
         * Notion's tag palette — background/text pairs, all desaturated.
         * Deliberately quiet: a page of shouting tags is unreadable.
         */
        tag: {
          gray: "#373737",
          grayText: "#9b9b9b",
          brown: "#4a3228",
          brownText: "#b08268",
          orange: "#5c3b23",
          orangeText: "#d9884f",
          yellow: "#56452f",
          yellowText: "#cb912f",
          green: "#243d30",
          greenText: "#5fa97b",
          blue: "#143a4e",
          blueText: "#5aa8d6",
          purple: "#3c2d49",
          purpleText: "#a175e0",
          pink: "#4e2c3c",
          pinkText: "#e06fae",
          red: "#522e2a",
          redText: "#ff7369",
        },
        // Legacy tier dots — remapped onto the Notion palette so older components stay coherent.
        tier: {
          free: "#5fa97b",
          freemium: "#5aa8d6",
          paid: "#a175e0",
          wip: "#d9884f",
        },
      },
      fontFamily: {
        // Notion's actual stack — ui-sans-serif first so it inherits the OS UI face.
        sans: [
          "var(--font-display)",
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
        // Same family as body — weight and tracking do the differentiating, not a second face.
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
        // Notion is square-ish. Nothing is a pill unless it's a tag.
        "3xl": "8px",
        "2xl": "6px",
        xl: "5px",
        lg: "4px",
        md: "3px",
        sm: "3px",
        pill: "999px",
      },
      boxShadow: {
        ring: "0 0 0 1px rgba(82, 156, 202, 0.6)",
        "ring-soft": "0 0 0 1px rgba(82, 156, 202, 0.3)",
        hairline: "0 0 0 1px #2f2f2f",
        "hairline-hi": "0 0 0 1px #3d3d3d",
        // Notion's dark menu shadow — deeper, because there is no light to catch an edge.
        tile: "rgba(15, 15, 15, 0.1) 0px 0px 0px 1px, rgba(15, 15, 15, 0.2) 0px 3px 6px, rgba(15, 15, 15, 0.4) 0px 9px 24px",
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
