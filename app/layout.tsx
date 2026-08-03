import type { Metadata, Viewport } from "next";
import "./globals.css";

const TITLE = "Shua Labs — infrastructure for agents, built in the open";
const DESCRIPTION =
  "Josh Menzies builds the layer underneath AI agents: gateways, sandboxes, controllers, and the measurement that tells you whether any of it works. Open source, with the unfinished parts shown honestly.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  metadataBase: new URL("https://shualabs.com"),
  openGraph: { title: TITLE, description: DESCRIPTION, type: "website" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
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
