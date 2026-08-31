import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
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
          DEFAULT: "#f4f4f0",
          dim: "rgba(244, 244, 240, 0.12)",
        },
        line: {
          DEFAULT: "rgba(244, 244, 240, 0.12)",
          strong: "rgba(244, 244, 240, 0.22)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "DM Sans", "Helvetica Neue", "Arial", "sans-serif"],
        display: ["var(--font-syne)", "Syne", "sans-serif"],
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
        "status-pulse": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.55" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.7s ease-out both",
        scan: "scan 8s linear infinite",
        "status-pulse": "status-pulse 2.2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
