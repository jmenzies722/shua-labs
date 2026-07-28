import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";

import { profile } from "@/data/profile";
import "./globals.css";

/**
 * Type system — the APE stack.
 *
 *   Space Grotesk  display. Technical-but-crafted; the slightly odd terminals are what stop
 *                  the brand reading as another neutral-sans startup page.
 *   Inter          body. Invisible on purpose at 16px — the display face carries personality,
 *                  running text should just be legible.
 *   JetBrains Mono labels, statuses, prices, metrics. Deliberate infrastructure texture, and
 *                  real tabular figures for the dashboard.
 *
 * next/font self-hosts all three at build time — no runtime request, no layout shift.
 *
 * next/font self-hosts both at build time — no runtime request, no layout shift.
 */
const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body",
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
  themeColor: "#06070d",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
