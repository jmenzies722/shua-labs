import type { Config } from "tailwindcss";

/**
 * Shua Labs v3 — the ledger.
 *
 * Monochrome by constraint, not by taste. There is no accent colour in this
 * palette and adding one is a regression: the only emphasis available is
 * inversion (white ground, black ink), which is why emphasis stays rare and
 * therefore still means something.
 *
 * Mono is the interface voice — labels, status, data, structure. The sans stack
 * is reserved for prose that is actually meant to be read at length.
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
      padding: { DEFAULT: "1.25rem", md: "2rem", lg: "3rem" },
      screens: { "2xl": "1180px" },
    },
    extend: {
      colors: {
        bg: {
          DEFAULT: "#000000",
          base: "#000000",
          panel: "#0a0a0a",
          raised: "#111111",
          card: "#0c0c0c",
          hi: "#161616",
        },
        // Contrast-checked against #000. `subtle` clears 4.5:1 because it carries
        // real body copy; `faint` clears 3:1 and is only ever used for meta text
        // that repeats information available elsewhere.
        fg: {
          DEFAULT: "#fafafa", // 20.1:1
          muted: "#8a8a8a", //  5.6:1
          subtle: "#7a7a7a", //  4.6:1
          faint: "#626262", //  3.1:1
        },
        line: {
          DEFAULT: "rgba(255,255,255,0.10)",
          strong: "rgba(255,255,255,0.20)",
          hi: "rgba(255,255,255,0.34)",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Text",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        mono: [
          "ui-monospace",
          "SF Mono",
          "JetBrains Mono",
          "Menlo",
          "Consolas",
          "monospace",
        ],
      },
      borderRadius: {
        // Terminals do not have rounded corners. Nothing here exceeds 4px.
        none: "0px",
        sm: "2px",
        DEFAULT: "2px",
        md: "3px",
        lg: "4px",
        xl: "4px",
        "2xl": "4px",
        "3xl": "4px",
        pill: "980px",
      },
      boxShadow: {
        hairline: "0 0 0 1px rgba(255,255,255,0.10)",
        "hairline-hi": "0 0 0 1px rgba(255,255,255,0.34)",
        invert: "0 0 0 1px #ffffff",
      },
      keyframes: {
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "boot-line": {
          "0%": { opacity: "0", transform: "translateY(4px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "sheet-in": {
          "0%": { transform: "translateY(16px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "drawer-in": {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
      },
      animation: {
        blink: "blink 1.05s step-end infinite",
        "fade-in": "fade-in 220ms ease-out both",
        "boot-line": "boot-line 260ms ease-out both",
        "sheet-in": "sheet-in 260ms cubic-bezier(0.2,0.7,0.3,1) both",
        "drawer-in": "drawer-in 240ms cubic-bezier(0.2,0.7,0.3,1) both",
        scan: "scan 7s linear infinite",
      },
      transitionTimingFunction: {
        term: "cubic-bezier(0.2, 0.7, 0.3, 1)",
        apple: "cubic-bezier(0.2, 0.7, 0.3, 1)",
        premium: "cubic-bezier(0.2, 0.7, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
