/**
 * Fetches a real monospace font file for use with next/og's ImageResponse.
 *
 * Satori (what ImageResponse renders with) has no access to system fonts or
 * generic CSS keywords — `fontFamily: "monospace"` silently falls back to its
 * default serif with no error. It needs actual font bytes registered by name.
 *
 * Google Fonts serves woff2 to modern browsers by default; Satori only reads
 * ttf/otf. Requesting with an old-IE user agent is the documented way to get
 * Google to serve truetype instead — this is Vercel's own pattern for
 * next/og, not a hack specific to this project.
 */
export async function loadMonoFont(weight: 400 | 700 = 400): Promise<ArrayBuffer> {
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@${weight}`,
    { headers: { "User-Agent": "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/534.34" } }
  ).then((res) => res.text());

  const match = css.match(/src: url\(([^)]+)\) format\('(?:opentype|truetype)'\)/);
  if (!match) throw new Error("loadMonoFont: could not find a truetype source in Google Fonts CSS");

  const res = await fetch(match[1]);
  if (!res.ok) throw new Error(`loadMonoFont: font fetch failed (${res.status})`);
  return res.arrayBuffer();
}
