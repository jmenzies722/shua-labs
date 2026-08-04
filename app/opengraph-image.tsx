import { ImageResponse } from "next/og";
import { registryCounts } from "@/lib/registry";
import { loadMonoFont } from "@/lib/og-font";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Shua Labs — AI platform engineering, built in the open";

/**
 * Generated from live data rather than a static design file, same reason as
 * the rest of the site: the "5 public" line pulled into a link preview has
 * to be true the day someone actually clicks it, not just the day this was
 * designed.
 */
export default async function OpengraphImage() {
  const c = registryCounts();
  const monoFont = await loadMonoFont(700);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#000000",
          fontFamily: "mono",
          padding: 56,
        }}
      >
        {/* Title bar, matching the on-site terminal component */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: 16,
                height: 16,
                borderRadius: 999,
                border: "2px solid #3a3a3a",
              }}
            />
          ))}
          <div style={{ marginLeft: 8, fontSize: 22, color: "#7a7a7a" }}>
            shua@labs
          </div>
        </div>

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div style={{ display: "flex", fontSize: 26, color: "#7a7a7a", marginBottom: 20 }}>
            SHUA LABS
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 88,
              fontWeight: 700,
              color: "#fafafa",
              lineHeight: 1.05,
              letterSpacing: -3,
            }}
          >
            <span>AI platform</span>
            <span style={{ color: "#626262" }}>engineering.</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #262626",
            paddingTop: 28,
            fontSize: 26,
          }}
        >
          <div style={{ display: "flex", color: "#8a8a8a" }}>
            Josh Menzies — New York
          </div>
          <div style={{ display: "flex", color: "#fafafa" }}>
            {c.open} public · {c.total} catalogued
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "mono", data: monoFont, weight: 700 }] }
  );
}
