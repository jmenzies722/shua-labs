import type { Config } from "tailwindcss";

/**
 * Shua Labs — A future-facing venture company.
 *
 * Rich near-black background with restrained electric-blue light.
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
        // Rich near-black background palette
        bg: {
          DEFAULT: "#0a0a0f", // Deep near-black
          base: "#08080c", // Very dark base
          panel: "#0f0f14", // Slightly lighter panel
          raised: "#14141a", // Raised surface
          card: "#121218", // Card background
          hi: "#1a1a22", // Highlight surface
        },
        // Electric blue accent palette (restrained)
        blue: {
          DEFAULT: "#3b82f6", // Electric blue
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
          950: "#172554",
        },
        // Foreground palette with subtle blue tint
        fg: {
          DEFAULT: "#f8fafc", // Cool white
          muted: "#94a3b8", // Slate gray
          subtle: "#64748b", // Muted slate
          faint: "#475569", // Dark slate
        },
        // Border palette
        line: {
          DEFAULT: "rgba(148, 163, 184, 0.15)",
          strong: "rgba(148, 163, 184, 0.25)",
          hi: "rgba(59, 130, 246, 0.4)", // Electric blue highlight
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
        // Modern, subtle shadows with electric blue accents
        soft: "0 2px 8px rgba(0, 0, 0, 0.4)",
        medium: "0 4px 16px rgba(0, 0, 0, 0.5)",
        large: "0 8px 32px rgba(0, 0, 0, 0.6)",
        "blue-glow": "0 0 20px rgba(59, 130, 246, 0.15)",
        "blue-glow-strong": "0 0 30px rgba(59, 130, 246, 0.25)",
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
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(59, 130, 246, 0.15)" },
          "50%": { boxShadow: "0 0 30px rgba(59, 130, 246, 0.25)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.6s ease-out both",
        "slide-up": "slide-up 0.8s ease-out both",
        "pulse-slow": "pulse-slow 4s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
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
