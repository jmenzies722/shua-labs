import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#050505",
          base: "#050505",
          panel: "#0b0b0b",
          raised: "#111111",
        },
        fg: {
          DEFAULT: "#f4f4f0",
          muted: "#9a9a92",
          subtle: "#6a6a64",
        },
        signal: {
          DEFAULT: "#c6ff3a",
          dim: "rgba(198, 255, 58, 0.14)",
        },
        line: {
          DEFAULT: "rgba(198, 255, 58, 0.12)",
          strong: "rgba(244, 244, 240, 0.16)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "Helvetica Neue", "Arial", "sans-serif"],
        display: ["var(--font-syne)", "Syne", "Inter", "sans-serif"],
        mono: ["var(--font-plex)", "IBM Plex Mono", "ui-monospace", "monospace"],
      },
      borderRadius: {
        none: "0px",
        sm: "2px",
        DEFAULT: "4px",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.7s ease-out both",
        scan: "scan 8s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
