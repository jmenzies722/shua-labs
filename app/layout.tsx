import type { Metadata, Viewport } from "next";
import { Syne, IBM_Plex_Mono, DM_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { siteMeta } from "@/content/social";
import "./globals.css";

const display = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
  weight: ["600", "700", "800"],
});

const sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600"],
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-plex",
  display: "swap",
  weight: ["400", "500"],
});

const TITLE = `${siteMeta.name} — ${siteMeta.tagline}`;
const DESCRIPTION = siteMeta.supporting;

export const metadata: Metadata = {
  title: {
    default: TITLE,
    template: `%s — ${siteMeta.name}`,
  },
  description: DESCRIPTION,
  metadataBase: new URL(siteMeta.url),
  openGraph: { title: TITLE, description: DESCRIPTION, type: "website", url: siteMeta.url },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
  robots: { index: true, follow: true },
  alternates: { canonical: siteMeta.url },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteMeta.name,
    url: siteMeta.url,
    description: DESCRIPTION,
    foundingDate: siteMeta.established,
    address: { "@type": "PostalAddress", addressLocality: siteMeta.location },
  };

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
