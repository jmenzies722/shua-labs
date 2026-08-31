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
          background: "#ffffff",
          fontFamily: "mono",
          padding: 64,
          border: "24px solid #f7f6f3",
        }}
      >
        <div style={{ display: "flex", fontSize: 22, color: "#9b9a97" }}>
          Shua Labs · New York · Est. 2026
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 60,
              fontWeight: 700,
              color: "#37352f",
              lineHeight: 1.15,
              letterSpacing: -1.5,
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
            borderTop: "1px solid #e9e9e7",
            paddingTop: 28,
            fontSize: 20,
            color: "#6f6e69",
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
