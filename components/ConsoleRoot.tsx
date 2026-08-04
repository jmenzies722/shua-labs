"use client";

import * as React from "react";
import { Console } from "@/components/Console";
import { onConsoleOpenRequest } from "@/lib/consoleBus";

/**
 * Mounted once in the root layout so the console survives route changes and
 * every trigger — the nav button, the hero hint, the `~` key — shares one
 * instance instead of each route growing its own.
 */
export function ConsoleRoot() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => onConsoleOpenRequest(() => setOpen(true)), []);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = document.activeElement;
      const typing =
        el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement;
      if (typing) return;
      if (e.key === "~" || e.key === "`") {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return <Console open={open} onClose={() => setOpen(false)} />;
}
