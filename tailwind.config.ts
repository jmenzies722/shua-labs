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
          DEFAULT: "#0b0b0a",
          base: "#0b0b0a",
          panel: "#121211",
          raised: "#1a1a18",
          elevated: "#222220",
        },
        fg: {
          DEFAULT: "#f2f0ea",
          muted: "#a8a59c",
          subtle: "#6e6b63",
        },
        signal: {
          DEFAULT: "#f2f0ea",
          dim: "rgba(242, 240, 234, 0.08)",
        },
        line: {
          DEFAULT: "rgba(242, 240, 234, 0.08)",
          strong: "rgba(242, 240, 234, 0.14)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "DM Sans", "Helvetica Neue", "Arial", "sans-serif"],
        display: ["var(--font-syne)", "Syne", "DM Sans", "sans-serif"],
        mono: ["var(--font-plex)", "IBM Plex Mono", "ui-monospace", "monospace"],
      },
      borderRadius: {
        none: "0px",
        sm: "6px",
        DEFAULT: "10px",
        md: "14px",
        lg: "16px",
        xl: "20px",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "status-pulse": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.35" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.75s cubic-bezier(0.22, 1, 0.36, 1) both",
        "status-pulse": "status-pulse 2.8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
