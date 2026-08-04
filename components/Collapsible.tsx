"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CollapsibleProps {
  id: string;
  /** Shown on the toggle when collapsed, e.g. "7 services". */
  label: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
  className?: string;
}

/**
 * Section-level disclosure — same "[ + open ] / [ − close ]" affordance the
 * roadmap rows already use, one level up. A homepage that unfolds seven
 * detailed roadmap rows, a topology diagram, and a full changelog by default
 * reads as a wall of text before anyone has decided they want that much
 * detail; this lets the heading and one-line summary stay visible while the
 * heavy body waits for an actual click.
 */
export function Collapsible({
  id,
  label,
  defaultOpen = false,
  children,
  className,
}: CollapsibleProps) {
  const [open, setOpen] = React.useState(defaultOpen);
  const reduced = useReducedMotion();

  return (
    <div className={className}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={id}
        className="group inline-flex items-center gap-2 border border-line px-3.5 py-2 font-mono text-[12px] text-fg-muted transition-colors duration-200 hover:border-line-hi hover:text-fg"
      >
        <span aria-hidden>{open ? "−" : "+"}</span>
        {open ? "hide" : `show ${label}`}
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            initial={reduced ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduced ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.3, ease: [0.2, 0.7, 0.3, 1] }}
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
