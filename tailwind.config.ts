import type { Config } from "tailwindcss";

/**
 * Shua Labs v2 — Dark & Premium.
 * Apple Pro / Pro Display XDR / Linear vibe.
 * Near-black surfaces, Apple off-white type, one luminous Apple-blue accent used as glow.
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
        "2xl": "1240px",
      },
    },
    extend: {
      colors: {
        // Layered near-black surfaces
        bg: {
          DEFAULT: "#06060A",
          base: "#06060A",
          deep: "#000000",
          panel: "#0E0E11",
          raised: "#141418",
          card: "#101014",
        },
        // Apple off-white + muted gray
        fg: {
          DEFAULT: "#F5F5F7",
          muted: "#86868B",
          subtle: "#6E6E73",
        },
        line: {
          DEFAULT: "rgba(255,255,255,0.08)",
          strong: "rgba(255,255,255,0.14)",
        },
        // One accent — Apple blue, used as glow
        accent: {
          DEFAULT: "#0A84FF",
          hi: "#409CFF",
          soft: "rgba(10, 132, 255, 0.14)",
          ring: "rgba(10, 132, 255, 0.55)",
          glow: "rgba(10, 132, 255, 0.35)",
        },
        // Tier dots — muted, not loud (used at low opacity)
        tier: {
          free: "#34D399",
          freemium: "#60A5FA",
          paid: "#A78BFA",
          wip: "#F59E0B",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-sans)",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "SF Pro Display",
          "sans-serif",
        ],
        mono: [
          "var(--font-mono)",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "monospace",
        ],
      },
      letterSpacing: {
        tightest: "-0.045em",
        tighter: "-0.03em",
      },
      borderRadius: {
        "2xl": "20px",
        xl: "16px",
        lg: "14px",
        md: "10px",
        sm: "8px",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(10, 132, 255, 0.35), 0 24px 64px -24px rgba(10, 132, 255, 0.45)",
        "glow-sm":
          "0 0 0 1px rgba(10, 132, 255, 0.28), 0 12px 32px -16px rgba(10, 132, 255, 0.35)",
        hairline: "0 0 0 1px rgba(255, 255, 255, 0.08)",
        "hairline-hi": "0 0 0 1px rgba(255, 255, 255, 0.14)",
      },
      backgroundImage: {
        "panel-grad":
          "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.00) 100%)",
        "card-grad":
          "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.00) 60%)",
      },
      keyframes: {
        "slow-pulse": {
          "0%, 100%": { opacity: "0.55", transform: "scale(1)" },
          "50%": { opacity: "0.85", transform: "scale(1.03)" },
        },
        "drawer-in": {
          "0%": { transform: "translateX(24px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
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
        "slow-pulse": "slow-pulse 9s ease-in-out infinite",
        "drawer-in": "drawer-in 360ms cubic-bezier(0.16,1,0.3,1) both",
        "sheet-in": "sheet-in 360ms cubic-bezier(0.16,1,0.3,1) both",
        "fade-in": "fade-in 240ms ease-out both",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
