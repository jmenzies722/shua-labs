import type { Metadata, Viewport } from "next";
import "./globals.css";
const TITLE = "Shua Labs — Building what comes next";
const DESCRIPTION = "Shua Labs creates ventures, products, and systems for an AI-native world.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  // Was pointed at shualabs.com — a domain that was never actually bought
  // and doesn't resolve, which silently broke every relative OG/canonical
  // URL Next.js generated from it. This is the domain that's actually live.
  metadataBase: new URL("https://shua-labs.vercel.app"),
  openGraph: { title: TITLE, description: DESCRIPTION, type: "website" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
  // viewportFit: "cover" lets the page paint under the notch/Dynamic Island
  // instead of leaving a white-free but unstyled gap, so the fixed header and
  // full-screen console can extend their background under it and pad their
  // content back in with env(safe-area-inset-*) instead of just stopping short.
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
