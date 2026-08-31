import { ImageResponse } from "next/og";
import { getBuildEntry } from "@/content/build-log";

export const runtime = "edge";
export const alt = "Shua Labs Build Log";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: { slug: string } }) {
  const entry = getBuildEntry(params.slug);
  const title = entry?.title ?? "Build log";
  const date = entry?.date?.replace(/-/g, ".") ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#050505",
          color: "#f4f4f0",
          padding: "64px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 28, fontWeight: 700 }}>
            Shua<span style={{ color: "#9a9a92" }}>Labs</span>
          </div>
          <div style={{ fontSize: 18, color: "#9a9a92", letterSpacing: "0.16em" }}>BUILD LOG</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 56, fontWeight: 700, lineHeight: 1.05, maxWidth: 980 }}>
            {title}
          </div>
          <div style={{ fontSize: 22, color: "#9a9a92", letterSpacing: "0.08em" }}>{date}</div>
        </div>
        <div style={{ fontSize: 18, color: "#6a6a64" }}>Building what’s next with AI.</div>
      </div>
    ),
    { ...size }
  );
}
