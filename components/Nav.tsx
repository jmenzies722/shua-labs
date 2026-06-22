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
 * Sticky glassy nav.
 * - Picks up a blurred dark backdrop + hairline border after a few px of scroll.
 * - Collapses to a full-screen overlay menu on mobile.
 */
export function Nav() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close overlay on hash navigation, and lock body scroll while open.
  React.useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  // Close mobile overlay on Esc.
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
          "fixed inset-x-0 top-0 z-40 transition-all duration-300 ease-premium",
          scrolled
            ? "bg-bg/70 backdrop-blur-xl border-b border-line"
            : "bg-transparent border-b border-transparent"
        )}
      >
        <div className="container flex h-16 items-center justify-between">
          <Link
            href="#top"
            className="text-[15px] font-semibold tracking-tight text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ring rounded-sm"
            aria-label="Shua Labs — home"
          >
            Shua Labs
          </Link>

          <nav
            aria-label="Primary"
            className="hidden md:flex items-center gap-1"
          >
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="px-3 py-2 text-sm text-fg-muted transition-colors duration-200 hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ring rounded-md"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <Link
              href="https://github.com/jmenzies722/shua-labs"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="GitHub"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white/[0.02] text-fg-muted transition-colors duration-200 hover:text-fg hover:border-line-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ring"
            >
              <Github className="h-4 w-4" />
            </Link>
            <Link href="#consulting">
              <Button size="md" variant="primary">
                Let&apos;s talk
              </Button>
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-fg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ring"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* Mobile full-screen overlay menu */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-50 bg-bg/95 backdrop-blur-xl animate-fade-in md:hidden"
        >
          <div className="container flex h-16 items-center justify-between">
            <span className="text-[15px] font-semibold tracking-tight text-fg">
              Shua Labs
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-fg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ring"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav
            aria-label="Mobile"
            className="container flex flex-col gap-2 pt-10"
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
            <div className="mt-8 flex flex-col gap-3">
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
