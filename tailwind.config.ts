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
          DEFAULT: "#ffffff",
          base: "#ffffff",
          panel: "#f7f6f3",
          raised: "#efeee9",
        },
        fg: {
          DEFAULT: "#37352f",
          muted: "#6f6e69",
          subtle: "#9b9a97",
        },
        signal: {
          DEFAULT: "#37352f",
          dim: "rgba(55, 53, 47, 0.08)",
        },
        line: {
          DEFAULT: "#e9e9e7",
          strong: "#d3d1cb",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "DM Sans", "Helvetica Neue", "Arial", "sans-serif"],
        display: ["var(--font-sans)", "DM Sans", "Helvetica Neue", "Arial", "sans-serif"],
        mono: ["var(--font-plex)", "IBM Plex Mono", "ui-monospace", "monospace"],
      },
      borderRadius: {
        none: "0px",
        sm: "4px",
        DEFAULT: "6px",
        md: "8px",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "status-pulse": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.4" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-out both",
        "status-pulse": "status-pulse 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
