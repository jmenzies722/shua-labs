import { ImageResponse } from "next/og";
import { getResearch } from "@/content/research";

export const runtime = "edge";
export const alt = "Shua Labs Research";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: { slug: string } }) {
  const entry = getResearch(params.slug);
  const title = entry?.title ?? "Research";
  const status = entry?.status ?? "NOTE";
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
          background: "#ffffff",
          color: "#37352f",
          padding: "64px",
          fontFamily: "sans-serif",
          border: "24px solid #f7f6f3",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 26, fontWeight: 600 }}>Shua Labs</div>
          <div style={{ fontSize: 16, color: "#9b9a97" }}>Research · {status}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 52, fontWeight: 700, lineHeight: 1.12, maxWidth: 980 }}>{title}</div>
          <div style={{ fontSize: 20, color: "#6f6e69" }}>{date}</div>
        </div>
        <div style={{ fontSize: 18, color: "#9b9a97" }}>Building what’s next with AI.</div>
      </div>
    ),
    { ...size }
  );
}
