"use client";

import * as React from "react";
import Link from "next/link";
import { Github, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Console, useConsoleHotkey } from "@/components/Console";
import { platformStats } from "@/lib/platform-stats";

/**
 * Root-relative, not bare hashes. A bare "#roadmap" resolves against the CURRENT
 * route, so from /registry it would scroll nowhere instead of returning home.
 */
const NAV_LINKS: { label: string; href: string }[] = [
  { label: "work", href: "/#shipped" },
  { label: "registry", href: "/registry" },
  { label: "enablement", href: "/#enablement" },
  { label: "architecture", href: "/#stack" },
  { label: "roadmap", href: "/#roadmap" },
  { label: "changelog", href: "/#journey" },
  { label: "about", href: "/#about" },
];

/**
 * Sticky nav.
 *
 * Carries the live gate count on the right. It is the one number that should
 * follow you down the page — a nav that shows only links lets you forget what
 * the site is actually keeping score of.
 */
export function Nav() {
  const [open, setOpen] = React.useState(false);
  const [consoleOpen, setConsoleOpen] = React.useState(false);
  const s = platformStats();

  useConsoleHotkey(React.useCallback(() => setConsoleOpen(true), []));

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
      <Console open={consoleOpen} onClose={() => setConsoleOpen(false)} />

      <header
        className="fixed inset-x-0 top-0 z-40 border-b border-line"
        style={{
          backgroundColor: "rgba(0,0,0,0.82)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
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
              gate {s.artifactsDone}/{s.artifactsTotal}
            </span>
            <button
              type="button"
              onClick={() => setConsoleOpen(true)}
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

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            className="inline-flex h-9 w-9 items-center justify-center text-fg-muted hover:text-fg md:hidden"
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
          className="fixed inset-0 z-50 animate-fade-in bg-black md:hidden"
        >
          <div className="container flex h-14 items-center justify-between">
            <span className="font-mono text-[13px] font-semibold text-fg">
              shua<span className="text-fg-subtle">labs</span>
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="inline-flex h-9 w-9 items-center justify-center text-fg-muted hover:text-fg"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav aria-label="Mobile" className="container flex flex-col pt-8">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-line py-5 font-mono text-2xl font-semibold tracking-[-0.03em] text-fg"
              >
                {l.label}
              </Link>
            ))}

            <p className="mt-10 font-mono text-[11px] tracking-[0.1em] text-fg-faint">
              gate artifacts public: {s.artifactsDone}/{s.artifactsTotal}
            </p>

            <Link
              href="https://github.com/jmenzies722/shua-labs"
              target="_blank"
              rel="noreferrer noopener"
              onClick={() => setOpen(false)}
              className="mt-6"
            >
              <Button size="lg" variant="outline" className="w-full">
                <Github className="h-4 w-4" /> github
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
