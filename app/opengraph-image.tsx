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
          background: "#0b0b0a",
          fontFamily: "mono",
          padding: 64,
          border: "24px solid #121211",
        }}
      >
        <div style={{ display: "flex", fontSize: 22, color: "#6e6b63" }}>
          {siteMeta.name} · {siteMeta.location} · Est. {siteMeta.established}
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div
            style={{
              display: "flex",
              fontSize: 72,
              fontWeight: 700,
              color: "#f2f0ea",
              lineHeight: 1.05,
              letterSpacing: -2,
              maxWidth: 980,
            }}
          >
            {siteMeta.name}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 20,
              fontSize: 32,
              fontWeight: 500,
              color: "#a8a59c",
              lineHeight: 1.3,
              maxWidth: 860,
            }}
          >
            {siteMeta.tagline}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(242,240,234,0.1)",
            paddingTop: 28,
            fontSize: 20,
            color: "#6e6b63",
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
