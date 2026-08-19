import type { Config } from "tailwindcss";

/**
 * Shua Labs — A future-facing venture company.
 *
 * True black background. White and gray only. No tint, no glow.
 * Editorial typography with quiet motion, no terminal gimmicks.
 * Modern venture company aesthetic, not a portfolio or agency site.
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
        // True black / near-black surfaces
        bg: {
          DEFAULT: "#000000",
          base: "#000000",
          panel: "#0a0a0a",
          raised: "#111111",
          card: "#0a0a0a",
          hi: "#171717",
        },
        // White and gray only
        fg: {
          DEFAULT: "#ffffff",
          muted: "#a1a1a1",
          subtle: "#737373",
          faint: "#525252",
        },
        // Hairline gray borders
        line: {
          DEFAULT: "rgba(161, 161, 161, 0.22)",
          strong: "rgba(161, 161, 161, 0.35)",
          hi: "rgba(255, 255, 255, 0.28)",
        },
      },
      fontFamily: {
        // Editorial typography - modern, clean, readable
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Display",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        // Secondary mono for technical elements only
        mono: [
          "JetBrains Mono",
          "ui-monospace",
          "SF Mono",
          "Menlo",
          "Consolas",
          "monospace",
        ],
      },
      borderRadius: {
        // Modern venture company aesthetic with subtle rounding
        none: "0px",
        sm: "4px",
        DEFAULT: "8px",
        md: "12px",
        lg: "16px",
        xl: "20px",
        "2xl": "24px",
        "3xl": "32px",
        pill: "9999px",
      },
      boxShadow: {
        soft: "0 2px 8px rgba(0, 0, 0, 0.4)",
        medium: "0 4px 16px rgba(0, 0, 0, 0.5)",
        large: "0 8px 32px rgba(0, 0, 0, 0.6)",
      },
      keyframes: {
        // Quiet motion animations
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.6s ease-out both",
        "slide-up": "slide-up 0.8s ease-out both",
        "pulse-slow": "pulse-slow 4s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
      },
      transitionTimingFunction: {
        "ease-smooth": "cubic-bezier(0.4, 0, 0.2, 1)",
        "ease-natural": "cubic-bezier(0.25, 0.1, 0.25, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
