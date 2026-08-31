"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { social } from "@/content/social";
import { cn } from "@/lib/utils";

const links = [
  { href: "/work", label: "Work" },
  { href: "/build", label: "Build Log" },
  { href: "/research", label: "Research" },
  { href: "/about", label: "About" },
];

export function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-bg/85 backdrop-blur-md">
      <div className="site-shell flex h-14 items-center justify-between">
        <Link href="/" className="font-display text-[15px] font-bold tracking-tight">
          Shua<span className="text-fg-muted">Labs</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "text-[13px] text-fg-muted transition-colors hover:text-fg",
                pathname.startsWith(l.href) && "text-fg"
              )}
            >
              {l.label}
            </Link>
          ))}
          <a
            href={social.github.href}
            className="text-[13px] text-fg-muted hover:text-fg"
            rel="noreferrer"
            target="_blank"
          >
            GitHub
          </a>
          <Link href="/#follow" className="btn-primary !min-h-9 !px-3 !py-1.5 text-[12px]">
            Follow the Build
          </Link>
        </nav>

        <button
          type="button"
          className="min-h-11 min-w-11 text-[13px] text-fg-muted md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          className="site-shell flex flex-col gap-4 border-t border-line py-5 md:hidden"
          aria-label="Mobile"
        >
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="py-1 text-lg">
              {l.label}
            </Link>
          ))}
          <a href={social.github.href} rel="noreferrer" target="_blank" className="py-1 text-lg">
            GitHub
          </a>
          <Link href="/#follow" className="btn-primary w-fit">
            Follow the Build
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
