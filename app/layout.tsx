import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shua Labs — Build. In the open.",
  description:
    "Open-source products and tools for developer and AI enablement — and the expertise to put them to work. Built in the open by Josh Menzies.",
  metadataBase: new URL("https://shualabs.com"),
  openGraph: {
    title: "Shua Labs — Build. In the open.",
    description:
      "Open-source products and tools for developer and AI enablement — and the expertise to put them to work.",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#06060A",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <body>{children}</body>
    </html>
  );
}
