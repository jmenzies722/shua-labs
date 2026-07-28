import { ImageResponse } from "next/og";

import { profile } from "@/data/profile";

/**
 * The share card.
 *
 * Employers paste links into Slack and email. Without this every share renders as a grey box
 * with a URL, which is the single cheapest credibility leak on the whole site.
 *
 * Rendered at build time from the same profile data as the page, so the two can never drift.
 */
export const runtime = "edge";
export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#191919",
          padding: "72px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 6,
              border: "1px solid #3d3d3d",
              background: "#202020",
              color: "#9b9b9b",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 17,
            }}
          >
            S
          </div>
          <div style={{ color: "#9b9b9b", fontSize: 26 }}>Shua Labs</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: "#d4d4d4",
              fontSize: 68,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              maxWidth: 900,
            }}
          >
            {profile.positioning}
          </div>
          <div style={{ display: "flex", marginTop: 34, gap: 18, alignItems: "center" }}>
            <div style={{ color: "#529cca", fontSize: 28 }}>{profile.name}</div>
            <div style={{ color: "#6f6f6f", fontSize: 28 }}>·</div>
            <div style={{ color: "#9b9b9b", fontSize: 28 }}>{profile.role}</div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
