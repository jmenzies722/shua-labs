"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const NAV_LINKS: { label: string; href: string }[] = [
  { label: "What we build", href: "#what-we-build" },
  { label: "How we work", href: "#how-we-work" },
  { label: "Founder", href: "#founder" },
  { label: "Contact", href: "#contact" },
];

/**
 * Navigation - Clean, modern nav for venture company.
 */
export function NavNew() {
  const [open, setOpen] = React.useState(false);

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
        className="fixed inset-x-0 top-0 z-40 border-b border-line/50 backdrop-blur-xl"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          paddingTop: "env(safe-area-inset-top)",
        }}
      >
        <div className="container flex h-16 max-w-[1400px] items-center justify-between">
          <Link
            href="/#top"
            className="font-sans text-xl font-semibold tracking-tight text-fg"
            aria-label="Shua Labs — home"
          >
            Shua<span className="text-fg-muted">Labs</span>
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-fg-muted transition-colors duration-200 hover:text-fg"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            className="-mr-2 inline-flex h-10 w-10 items-center justify-center text-fg-muted hover:text-fg md:hidden"
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
          className="fixed inset-0 z-50 flex flex-col md:hidden"
          style={{
            paddingTop: "env(safe-area-inset-top)",
            paddingBottom: "env(safe-area-inset-bottom)",
            backgroundColor: "rgba(0, 0, 0, 0.98)",
            backdropFilter: "blur(16px)",
          }}
        >
          <div className="container flex h-16 shrink-0 items-center justify-between">
            <span className="font-sans text-xl font-semibold text-fg">
              Shua<span className="text-fg-muted">Labs</span>
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="-mr-2 inline-flex h-10 w-10 items-center justify-center text-fg-muted hover:text-fg"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav
            aria-label="Mobile"
            className="container flex min-h-0 flex-1 flex-col overflow-y-auto pt-8"
          >
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-line/30 py-6 font-sans text-2xl font-semibold tracking-tight text-fg"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}