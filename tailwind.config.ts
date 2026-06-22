import type { Config } from "tailwindcss";

/**
 * Shua Labs v2.1 — Apple Fidelity Pass.
 * San Francisco system stack, Apple's exact dark palette, bento tiles, chevron links.
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
        // Apple's exact dark palette.
        bg: {
          DEFAULT: "#000000",
          base: "#000000",
          deep: "#000000",
          panel: "#1d1d1f", // Apple's signature dark tile.
          raised: "#161617", // Slightly lighter elevated surface.
          card: "#1d1d1f",
          tile: "#1d1d1f",
        },
        fg: {
          DEFAULT: "#f5f5f7", // Apple primary text.
          muted: "#86868b", // Apple secondary text.
          subtle: "#6e6e73", // Apple tertiary text.
        },
        line: {
          DEFAULT: "rgba(255,255,255,0.12)", // Apple hairline.
          strong: "rgba(255,255,255,0.2)",
        },
        // Apple blue — dark mode link color + primary fill.
        accent: {
          DEFAULT: "#2997ff", // Apple dark-mode link blue.
          hi: "#2997ff",
          fill: "#0071e3", // Apple primary button fill.
          fillHover: "#0077ed",
          soft: "rgba(41, 151, 255, 0.10)",
          ring: "rgba(41, 151, 255, 0.5)",
          glow: "rgba(41, 151, 255, 0.2)",
        },
        // Quiet tier dots — kept for the meta pills.
        tier: {
          free: "#34d399",
          freemium: "#60a5fa",
          paid: "#a78bfa",
          wip: "#f59e0b",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Display",
          "SF Pro Text",
          "Helvetica Neue",
          "Helvetica",
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
      letterSpacing: {
        "apple-tight": "-0.015em",
        "apple-section": "-0.01em",
        "apple-body": "-0.022em",
        "apple-sub": "-0.012em",
      },
      borderRadius: {
        "3xl": "28px",
        "2xl": "20px",
        xl: "18px",
        lg: "14px",
        md: "10px",
        sm: "8px",
        pill: "980px",
      },
      boxShadow: {
        // Toned-down "glow" — actually just a tasteful accent ring now.
        ring: "0 0 0 1px rgba(41, 151, 255, 0.55)",
        "ring-soft": "0 0 0 1px rgba(41, 151, 255, 0.3)",
        hairline: "0 0 0 1px rgba(255, 255, 255, 0.12)",
        "hairline-hi": "0 0 0 1px rgba(255, 255, 255, 0.2)",
        tile: "0 8px 24px -12px rgba(0,0,0,0.5)",
      },
      backgroundImage: {
        "tile-grad":
          "linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.00) 100%)",
      },
      keyframes: {
        "drawer-in": {
          "0%": { transform: "translateY(12px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "sheet-in": {
          "0%": { transform: "translateY(24px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "drawer-in": "drawer-in 360ms cubic-bezier(0.28,0.11,0.32,1) both",
        "sheet-in": "sheet-in 360ms cubic-bezier(0.28,0.11,0.32,1) both",
        "fade-in": "fade-in 240ms ease-out both",
      },
      transitionTimingFunction: {
        apple: "cubic-bezier(0.28, 0.11, 0.32, 1)",
        premium: "cubic-bezier(0.28, 0.11, 0.32, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
