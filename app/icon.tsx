import { ImageResponse } from "next/og";
import { loadMonoFont } from "@/lib/og-font";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/**
 * Generated rather than a static file so the favicon can never drift from
 * the site's own palette — it's built from the same monospace font stack
 * and the same "$" prompt glyph the terminal components use, not a separate
 * asset someone has to remember to update.
 */
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
          background: "#000000",
          border: "3px solid #fafafa",
        }}
      >
        <div
          style={{
            display: "flex",
            fontFamily: "mono",
            fontSize: 34,
            fontWeight: 700,
            color: "#fafafa",
            letterSpacing: -2,
          }}
        >
          $_
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "mono", data: monoFont, weight: 700 }] }
  );
}
