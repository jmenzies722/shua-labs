"use client";

import * as React from "react";
import Link from "next/link";
import { Github, Menu, X, TerminalSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { openConsole } from "@/lib/consoleBus";
import { registryCounts } from "@/lib/registry";

/**
 * Root-relative, not bare hashes. A bare "#work" resolves against the CURRENT
 * route, so from /registry it would scroll nowhere instead of returning home.
 */
const NAV_LINKS: { label: string; href: string }[] = [
  { label: "work", href: "/#work" },
  { label: "about", href: "/#about" },
  { label: "registry", href: "/registry" },
];

/**
 * Sticky nav. The header stat is what's actually real and usable — public
 * repos and the full catalogue count — nothing speculative.
 */
export function Nav() {
  const [open, setOpen] = React.useState(false);
  const c = registryCounts();

  React.useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-40 border-b border-line"
        style={{
          backgroundColor: "rgba(0,0,0,0.82)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          paddingTop: "env(safe-area-inset-top)",
        }}
      >
        <div className="container flex h-14 max-w-[1180px] items-center justify-between">
          <Link
            href="/#top"
            className="font-mono text-[13px] font-semibold tracking-[-0.02em] text-fg"
            aria-label="Shua Labs — home"
          >
            shua<span className="text-fg-subtle">labs</span>
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="font-mono text-[12px] text-fg-muted transition-colors duration-200 hover:text-fg"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-5 md:flex">
            <span className="font-mono text-[11px] tracking-[0.1em] text-fg-faint">
              {c.open} public · {c.total} catalogued
            </span>
            <button
              type="button"
              onClick={openConsole}
              className="border border-line px-2.5 py-1 font-mono text-[11px] text-fg-muted transition-colors duration-200 hover:border-line-hi hover:text-fg"
              aria-label="Open console"
            >
              console <span className="text-fg-faint">~</span>
            </button>
            <Link
              href="https://github.com/jmenzies722/shua-labs"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="GitHub"
              className="text-fg-muted transition-colors duration-200 hover:text-fg"
            >
              <Github className="h-[15px] w-[15px]" />
            </Link>
          </div>

          {/* 44px hit target — the visible glyph stays 20px, the tap area does not. */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            className="-mr-2.5 inline-flex h-11 w-11 items-center justify-center text-fg-muted hover:text-fg md:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-50 flex animate-fade-in flex-col bg-black md:hidden"
          style={{
            paddingTop: "env(safe-area-inset-top)",
            paddingBottom: "env(safe-area-inset-bottom)",
          }}
        >
          <div className="container flex h-14 shrink-0 items-center justify-between">
            <span className="font-mono text-[13px] font-semibold text-fg">
              shua<span className="text-fg-subtle">labs</span>
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="-mr-2.5 inline-flex h-11 w-11 items-center justify-center text-fg-muted hover:text-fg"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav
            aria-label="Mobile"
            className="container flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain pt-4"
          >
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-line py-4 font-mono text-2xl font-semibold tracking-[-0.03em] text-fg"
              >
                {l.label}
              </Link>
            ))}

            <p className="mt-8 font-mono text-[11px] tracking-[0.1em] text-fg-faint">
              {c.open} public · {c.total} catalogued
            </p>

            <div className="mt-6 flex flex-col gap-3 pb-6">
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  // Let the menu overlay finish unmounting before the console
                  // mounts and grabs focus — otherwise two fixed overlays
                  // fight for the same scroll lock in the same frame.
                  window.setTimeout(openConsole, 0);
                }}
                className="inline-flex h-12 w-full items-center justify-center gap-2 border border-line font-mono text-[13px] uppercase tracking-[0.1em] text-fg transition-colors hover:border-line-hi"
              >
                <TerminalSquare className="h-4 w-4" aria-hidden />
                open console
              </button>

              <Link
                href="https://github.com/jmenzies722/shua-labs"
                target="_blank"
                rel="noreferrer noopener"
                onClick={() => setOpen(false)}
              >
                <Button size="lg" variant="outline" className="w-full">
                  <Github className="h-4 w-4" /> github
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
