import { ImageResponse } from "next/og";
import { loadMonoFont } from "@/lib/og-font";
import { siteMeta } from "@/content/social";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${siteMeta.name} — ${siteMeta.tagline}`;

export default async function OpengraphImage() {
  const monoFont = await loadMonoFont(700);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#050505",
          fontFamily: "mono",
          padding: 56,
        }}
      >
        <div style={{ display: "flex", fontSize: 22, color: "#9a9a92", letterSpacing: 4 }}>
          SHUA LABS · NEW YORK · EST. 2026
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 64,
              fontWeight: 700,
              color: "#f4f4f0",
              lineHeight: 1.05,
              letterSpacing: -2,
              maxWidth: 980,
            }}
          >
            <span>Building what’s next</span>
            <span>with AI.</span>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(244,244,240,0.16)",
            paddingTop: 28,
            fontSize: 22,
            color: "#9a9a92",
          }}
        >
          <span>Independent AI lab · building in public</span>
          <span>shua-labs.vercel.app</span>
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "mono", data: monoFont, weight: 700 }] }
  );
}
