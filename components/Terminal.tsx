"use client";

import * as React from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTypewriter, type TypedLine } from "@/lib/useTypewriter";

interface TerminalProps {
  lines: TypedLine[];
  /** Shown in the title bar. */
  title?: string;
  className?: string;
}

/**
 * The boot sequence.
 *
 * A framed shell that types a command and prints its output. The frame is a
 * hairline box with three hollow dots — hollow rather than the usual red/amber/
 * green, because this palette has no colour and a traffic-light dot cluster is
 * the one place people expect it.
 *
 * The block cursor keeps blinking after the sequence finishes. A terminal that
 * stops blinking looks crashed.
 */
export function Terminal({ lines, title = "shua@labs", className }: TerminalProps) {
  const reduced = useReducedMotion();
  const { visible, done } = useTypewriter(lines, { instant: !!reduced });

  return (
    <div
      className={cn(
        "term-scanlines relative overflow-hidden border border-line bg-bg-panel",
        className
      )}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-line px-3.5 py-2.5">
        <div className="flex items-center gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full border border-line-strong" />
          <span className="h-2.5 w-2.5 rounded-full border border-line-strong" />
          <span className="h-2.5 w-2.5 rounded-full border border-line-strong" />
        </div>
        <span className="ml-1 font-mono text-[11px] tracking-[0.1em] text-fg-subtle">
          {title}
        </span>
      </div>

      {/* Output */}
      <div className="px-4 py-4 sm:px-5 sm:py-5">
        <pre
          aria-live="polite"
          className="overflow-x-auto whitespace-pre font-mono text-[12.5px] leading-[1.85] sm:text-[13.5px]"
        >
          {visible.map((l, i) => (
            <div
              key={i}
              className={cn(
                "animate-boot-line",
                l.dim ? "text-fg-subtle" : "text-fg"
              )}
            >
              {l.prompt && <span className="text-fg-faint">$ </span>}
              {/* A truly empty div collapses to zero height and eats the blank
                  line the sequence is spacing with — hold it open with nbsp. */}
              <span>{l.text === "" ? " " : l.text}</span>
              {/* Cursor rides the last line while typing, then parks on its own. */}
              {!done && i === visible.length - 1 && (
                <span className="term-cursor" aria-hidden />
              )}
            </div>
          ))}
          {done && (
            <div aria-hidden>
              <span className="text-fg-faint">$ </span>
              <span className="term-cursor" />
            </div>
          )}
        </pre>
      </div>
    </div>
  );
}
