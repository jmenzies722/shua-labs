import * as React from "react";
import { GATE_ARTIFACTS, type ShipGate as Gate } from "@/lib/types";
import { gateScore } from "@/lib/platform-stats";
import { cn } from "@/lib/utils";

const LABELS: Record<(typeof GATE_ARTIFACTS)[number], string> = {
  repo: "public repo",
  diagram: "architecture diagram",
  demo: "working demo",
  writeup: "written post",
};

/**
 * The ship gate meter.
 *
 * Four filled-or-empty boxes. The empty ones are the entire point of this
 * component — a ledger that renders only what passed is a brochure, so the
 * gaps get the same visual weight as the wins and the blocker text is shown
 * rather than tucked into a tooltip.
 */
export function ShipGateMeter({
  gate,
  className,
}: {
  gate: Gate;
  className?: string;
}) {
  const score = gateScore(gate);

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="flex items-center gap-1" aria-hidden>
        {GATE_ARTIFACTS.map((k) => (
          <span
            key={k}
            className={cn(
              "block h-[9px] w-[9px] border",
              gate[k].done
                ? "border-fg bg-fg"
                : "border-line-strong bg-transparent"
            )}
          />
        ))}
      </div>
      <span className="font-mono text-[11px] tracking-[0.1em] text-fg-subtle">
        gate {score}/{GATE_ARTIFACTS.length}
      </span>
      <span className="sr-only">
        Ship gate: {score} of {GATE_ARTIFACTS.length} artifacts public.
      </span>
    </div>
  );
}

/** Expanded gate — every artifact with its link or its real blocker. */
export function ShipGateDetail({
  gate,
  className,
}: {
  gate: Gate;
  className?: string;
}) {
  return (
    <ul className={cn("flex flex-col", className)}>
      {GATE_ARTIFACTS.map((k) => {
        const item = gate[k];
        return (
          <li
            key={k}
            className="flex gap-3 border-t border-line py-3 first:border-t-0 first:pt-0"
          >
            <span
              aria-hidden
              className={cn(
                "mt-[6px] block h-[9px] w-[9px] shrink-0 border",
                item.done ? "border-fg bg-fg" : "border-line-strong"
              )}
            />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-baseline gap-x-2.5">
                <span
                  className={cn(
                    "font-mono text-[12.5px]",
                    item.done ? "text-fg" : "text-fg-muted"
                  )}
                >
                  {LABELS[k]}
                </span>
                <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-fg-faint">
                  {item.done ? "public" : "not yet"}
                </span>
              </div>

              {item.done && item.href && (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="term-link mt-1 font-mono text-[12px]"
                >
                  open
                  <span className="arrow" aria-hidden>
                    →
                  </span>
                </a>
              )}

              {!item.done && item.blocker && (
                <p className="mt-1 text-[12.5px] leading-[1.55] text-fg-subtle">
                  {item.blocker}
                </p>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
