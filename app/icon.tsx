import { ImageResponse } from "next/og";
import { loadMonoFont } from "@/lib/og-font";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default async function Icon() {
  const monoFont = await loadMonoFont(700);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#050505",
          border: "3px solid #f4f4f0",
        }}
      >
        <div
          style={{
            display: "flex",
            fontFamily: "mono",
            fontSize: 28,
            fontWeight: 700,
            color: "#f4f4f0",
            letterSpacing: -1,
          }}
        >
          SL
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "mono", data: monoFont, weight: 700 }] }
  );
}
