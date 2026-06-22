"use client";

import * as React from "react";
import Link from "next/link";
import { Github, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV_LINKS: { label: string; href: string }[] = [
  { label: "Work", href: "#work" },
  { label: "Consulting", href: "#consulting" },
  { label: "Journey", href: "#journey" },
  { label: "About", href: "#about" },
];

/**
 * Apple-exact sticky nav.
 *
 * - Height ~48px.
 * - backdrop-filter: blur(20px) saturate(180%); bg rgba(0,0,0,0.8).
 * - Links 12-14px, opacity ~80% → 100% on hover, very tight spacing.
 * - Wordmark left.
 * - Full-screen overlay menu on mobile.
 */
export function Nav() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
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
        className={cn(
          "fixed inset-x-0 top-0 z-40",
          "border-b border-line"
        )}
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
        }}
      >
        <div className="container flex h-12 items-center justify-between">
          <Link
            href="#top"
            className="text-[14px] font-semibold tracking-tight text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ring rounded-sm"
            aria-label="Shua Labs — home"
          >
            Shua Labs
          </Link>

          <nav
            aria-label="Primary"
            className="hidden md:flex items-center gap-7"
          >
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-[12px] text-fg/80 transition-colors duration-200 hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ring rounded-sm"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Link
              href="https://github.com/jmenzies722/shua-labs"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="GitHub"
              className="text-fg/80 transition-colors duration-200 hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ring rounded-sm"
            >
              <Github className="h-[14px] w-[14px]" />
            </Link>
            <Link href="#consulting">
              <Button size="sm" variant="primary">
                Let&apos;s talk
              </Button>
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            className="md:hidden inline-flex h-9 w-9 items-center justify-center text-fg/80 hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ring rounded-sm"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* Mobile full-screen overlay menu. */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl animate-fade-in md:hidden"
        >
          <div className="container flex h-12 items-center justify-between">
            <span className="text-[14px] font-semibold tracking-tight text-fg">
              Shua Labs
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="inline-flex h-9 w-9 items-center justify-center text-fg/80 hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ring rounded-sm"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav
            aria-label="Mobile"
            className="container flex flex-col gap-1 pt-10"
          >
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-4 text-3xl font-semibold tracking-tight text-fg border-b border-line"
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-10 flex flex-col gap-3">
              <Link href="#consulting" onClick={() => setOpen(false)}>
                <Button size="lg" variant="primary" className="w-full">
                  Let&apos;s talk
                </Button>
              </Link>
              <Link
                href="https://github.com/jmenzies722/shua-labs"
                target="_blank"
                rel="noreferrer noopener"
                onClick={() => setOpen(false)}
              >
                <Button size="lg" variant="outline" className="w-full">
                  <Github className="h-4 w-4" /> GitHub
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
