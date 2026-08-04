"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface Node {
  id: string;
  label: string;
  sub?: string;
  x: number;
  y: number;
  w: number;
  /** Trust zone. `untrusted` gets a dashed border — the boundary is the point. */
  zone: "untrusted" | "boundary" | "provider";
  detail: string;
}

interface Edge {
  from: string;
  to: string;
  label?: string;
  /** Dashed for "credential attached here", not a request path. */
  dashed?: boolean;
}

const NODES: Node[] = [
  {
    id: "client",
    label: "your app",
    sub: "X-Gateway-Key",
    x: 20,
    y: 108,
    w: 150,
    zone: "untrusted",
    detail:
      "Untrusted. Holds a key you issued and can revoke at any time. It never sees the provider credential, so a leaked client key costs you one revocation rather than a rotation across every consumer.",
  },
  {
    id: "auth",
    label: "auth middleware",
    sub: "key → tenant",
    x: 250,
    y: 30,
    w: 170,
    zone: "boundary",
    detail:
      "401 by default. A request with no valid key never reaches the proxy, which means the deny path is the shortest path through the system rather than an afterthought bolted on at the end.",
  },
  {
    id: "proxy",
    label: "pass-through proxy",
    sub: "body forwarded unchanged",
    x: 250,
    y: 186,
    w: 170,
    zone: "boundary",
    detail:
      "Deliberately dumb. It peeks at `model` and `stream` and forwards the rest of the body untouched — never parsing it means new API fields work on day one instead of after a gateway release.",
  },
  {
    id: "env",
    label: "ANTHROPIC_API_KEY",
    sub: "container env only",
    x: 250,
    y: 108,
    w: 170,
    zone: "boundary",
    detail:
      "Attached at the proxy and nowhere earlier. This is the whole trust boundary in one line: the provider credential exists inside the container and has no path to a client.",
  },
  {
    id: "provider",
    label: "Anthropic",
    sub: "POST /v1/messages",
    x: 500,
    y: 108,
    w: 150,
    zone: "provider",
    detail:
      "Responses relay back unbuffered. Token accounting happens on bytes in flight — buffering to count them would add latency the client can feel, which is the hard part of this service.",
  },
];

const EDGES: Edge[] = [
  { from: "client", to: "auth" },
  { from: "auth", to: "proxy" },
  { from: "env", to: "proxy", label: "attached here", dashed: true },
  { from: "proxy", to: "provider", label: "x-api-key" },
];

const NODE_H = 46;

function center(n: Node) {
  return { cx: n.x + n.w / 2, cy: n.y + NODE_H / 2 };
}

/**
 * Interactive topology for shua-gateway.
 *
 * Hand-authored SVG rather than a graph library: five nodes do not justify a
 * dependency, and the layout is meaningful (the boundary column is literally a
 * column) in a way an auto-layout would destroy.
 */
export function Topology({ className }: { className?: string }) {
  const [active, setActive] = React.useState<string>("env");
  const node = NODES.find((n) => n.id === active);

  return (
    <div className={cn("grid gap-8 lg:grid-cols-[1fr_300px]", className)}>
      <div className="term-box overflow-x-auto p-4">
        <svg
          viewBox="0 0 670 260"
          className="h-auto w-full min-w-[560px]"
          role="img"
          aria-label="shua-gateway trust boundary topology"
        >
          {/* Boundary zone */}
          <rect
            x={232}
            y={12}
            width={206}
            height={236}
            fill="rgba(255,255,255,0.02)"
            stroke="rgba(255,255,255,0.20)"
            strokeDasharray="3 3"
          />
          <text
            x={335}
            y={244}
            textAnchor="middle"
            className="fill-[#626262] font-mono text-[9px] uppercase"
            style={{ letterSpacing: "0.14em" }}
          >
            gateway container
          </text>

          {EDGES.map((e) => {
            const a = NODES.find((n) => n.id === e.from)!;
            const b = NODES.find((n) => n.id === e.to)!;
            const p1 = center(a);
            const p2 = center(b);
            const on = active === e.from || active === e.to;
            return (
              <g key={`${e.from}-${e.to}`}>
                <line
                  x1={p1.cx}
                  y1={p1.cy}
                  x2={p2.cx}
                  y2={p2.cy}
                  stroke={on ? "#fafafa" : "rgba(255,255,255,0.22)"}
                  strokeWidth={on ? 1.5 : 1}
                  strokeDasharray={e.dashed ? "4 4" : undefined}
                />
                {e.label && (
                  <text
                    x={(p1.cx + p2.cx) / 2}
                    y={(p1.cy + p2.cy) / 2 - 6}
                    textAnchor="middle"
                    className={cn(
                      "font-mono text-[9px]",
                      on ? "fill-[#fafafa]" : "fill-[#626262]"
                    )}
                  >
                    {e.label}
                  </text>
                )}
              </g>
            );
          })}

          {NODES.map((n) => {
            const on = active === n.id;
            return (
              <g
                key={n.id}
                onMouseEnter={() => setActive(n.id)}
                onFocus={() => setActive(n.id)}
                onClick={() => setActive(n.id)}
                tabIndex={0}
                role="button"
                aria-label={n.label}
                className="cursor-pointer outline-none"
              >
                <rect
                  x={n.x}
                  y={n.y}
                  width={n.w}
                  height={NODE_H}
                  fill={on ? "#fafafa" : "#0c0c0c"}
                  stroke={on ? "#fafafa" : "rgba(255,255,255,0.28)"}
                  strokeDasharray={n.zone === "untrusted" ? "4 3" : undefined}
                />
                <text
                  x={n.x + n.w / 2}
                  y={n.y + 19}
                  textAnchor="middle"
                  className={cn(
                    "font-mono text-[11px] font-semibold",
                    on ? "fill-[#000]" : "fill-[#fafafa]"
                  )}
                >
                  {n.label}
                </text>
                {n.sub && (
                  <text
                    x={n.x + n.w / 2}
                    y={n.y + 33}
                    textAnchor="middle"
                    className={cn(
                      "font-mono text-[9px]",
                      on ? "fill-[#3a3a3a]" : "fill-[#7a7a7a]"
                    )}
                  >
                    {n.sub}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      <div>
        <div className="term-label mb-3">{node?.label}</div>
        <p className="term-prose text-[14px]">{node?.detail}</p>
        <p className="mt-5 font-mono text-[11px] text-fg-faint">
          <span className="sm:hidden">tap a node · scroll to see the rest</span>
          <span className="hidden sm:inline">hover or click a node</span>
        </p>
      </div>
    </div>
  );
}
