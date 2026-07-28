import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Manrope } from "next/font/google";

import { profile } from "@/data/profile";
import "./globals.css";

/**
 * Type system — Manrope and JetBrains Mono.
 *
 * Manrope does display AND body. It is a modern geometric sans with slightly closed apertures
 * and genuinely good numerals, so it holds up tight-tracked at 5rem and still reads cleanly at
 * 16px. Weight and tracking do the differentiating rather than a second face — that single-voice
 * discipline is what makes an interface read as robust instead of assembled.
 *
 * JetBrains Mono for data, labels, and prices: real tabular figures, engineered rather than
 * decorative, and it sits alongside Manrope without arguing with it.
 *
 * Deliberately not Inter or Space Grotesk — those are the defaults everything already uses,
 * so they signal nothing.
 *
 * (Geist was the first choice; Next 14's bundled Google Fonts list predates it.)
 *
 * next/font self-hosts both at build time — no runtime request, no layout shift.
 */
const display = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono-brand",
  display: "swap",
});

const title = `${profile.name} — ${profile.role}`;

export const metadata: Metadata = {
  title: {
    default: title,
    template: "%s · Shua Labs",
  },
  description: profile.positioning,
  metadataBase: new URL("https://shualabs.com"),
  openGraph: {
    title,
    description: profile.positioning,
    type: "website",
    siteName: "Shua Labs",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: profile.positioning,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  // Matches the page surface so mobile browser chrome blends instead of banding.
  themeColor: "#191919",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${mono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
