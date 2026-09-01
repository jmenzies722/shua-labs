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
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background,border-color,backdrop-filter] duration-500 ease-smooth",
        scrolled
          ? "border-b border-line bg-bg/75 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="site-shell flex h-14 items-center justify-between">
        <Link
          href="/"
          className="font-display text-[17px] font-semibold tracking-tight text-fg"
        >
          Shua Labs
        </Link>

        <nav className="hidden items-center gap-0.5 md:flex" aria-label="Primary">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "rounded-full px-3 py-1.5 text-[13px] text-fg-muted transition-colors duration-300 hover:bg-bg-raised hover:text-fg",
                pathname.startsWith(l.href) && "bg-bg-raised text-fg"
              )}
            >
              {l.label}
            </Link>
          ))}
          <a
            href={social.github.href}
            className="rounded-full px-3 py-1.5 text-[13px] text-fg-muted transition-colors duration-300 hover:bg-bg-raised hover:text-fg"
            rel="noreferrer"
            target="_blank"
          >
            GitHub
          </a>
          <Link href="/#follow" className="btn-primary ml-2 !min-h-9 !px-3.5 !py-1.5 text-[12px]">
            Follow the Build
          </Link>
        </nav>

        <button
          type="button"
          className="min-h-10 min-w-10 text-[13px] text-fg-muted md:hidden"
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
          className="site-shell flex flex-col gap-1 border-t border-line bg-bg/95 py-3 backdrop-blur-xl md:hidden"
          aria-label="Mobile"
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-lg px-2 py-2.5 text-[15px] hover:bg-bg-raised"
            >
              {l.label}
            </Link>
          ))}
          <a
            href={social.github.href}
            rel="noreferrer"
            target="_blank"
            className="rounded-lg px-2 py-2.5 text-[15px] hover:bg-bg-raised"
          >
            GitHub
          </a>
          <Link href="/#follow" className="btn-primary mt-2 w-fit">
            Follow the Build
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
