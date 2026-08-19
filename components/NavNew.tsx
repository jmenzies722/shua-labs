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
        className="fixed inset-x-0 top-0 z-40 border-b border-line"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.86)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          paddingTop: "env(safe-area-inset-top)",
        }}
      >
        <div className="site-shell flex h-14 items-center justify-between">
          <Link
            href="/#top"
            className="text-[15px] font-semibold tracking-[-0.03em] text-fg"
            aria-label="Shua Labs — home"
          >
            Shua<span className="text-fg-muted">Labs</span>
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-[13px] font-medium text-fg-muted transition-colors duration-200 hover:text-fg"
              >
                {l.label}
              </Link>
            ))}
            <Link href="#contact" className="btn-primary h-8 px-3.5 text-[12px]">
              Get in touch
            </Link>
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
            backgroundColor: "#000000",
          }}
        >
          <div className="site-shell flex h-14 shrink-0 items-center justify-between">
            <span className="text-[15px] font-semibold tracking-[-0.03em] text-fg">
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
            className="site-shell flex min-h-0 flex-1 flex-col overflow-y-auto pt-4"
          >
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-line py-5 text-[1.75rem] font-semibold tracking-[-0.035em] text-fg"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="#contact"
              onClick={() => setOpen(false)}
              className="btn-primary mt-8 w-full"
            >
              Get in touch
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
