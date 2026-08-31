import { ImageResponse } from "next/og";
import { loadMonoFont } from "@/lib/og-font";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Shua Labs — Ten specialists. One founder.";

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
        <div style={{ display: "flex", fontSize: 22, color: "#c6ff3a", letterSpacing: 4 }}>
          SHUA LABS · NEW YORK
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 72, fontWeight: 700, color: "#f4f4f0", lineHeight: 1.05, letterSpacing: -3 }}>
            <span>Ten specialists.</span>
            <span>One founder.</span>
            <span style={{ color: "#c6ff3a" }}>No product yet.</span>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid rgba(198,255,58,0.2)", paddingTop: 28, fontSize: 24, color: "#9a9a92" }}>
          <span>Building in the open</span>
          <span>Josh Menzies</span>
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "mono", data: monoFont, weight: 700 }] }
  );
}
