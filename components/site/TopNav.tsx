"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * The public nav.
 *
 * A sidebar is an app pattern — many destinations, repeat visitors, muscle memory. A brand site
 * has three pages and mostly first-time visitors, so the rail costs 240px and signals "internal
 * tool". This is the opposite: slim, out of the way, and it hides when you scroll down so the
 * content owns the screen. It comes back the moment you scroll up, because that gesture means
 * "I want to navigate".
 */
export function TopNav() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    let frame = 0;

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 8);
        // Ignore tiny jitters; only commit on a deliberate 6px+ move.
        if (Math.abs(y - last) > 6) {
          setHidden(y > last && y > 120);
          last = y;
        }
        frame = 0;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const links = [
    { href: "/", label: "Overview" },
    { href: "/catalog", label: "Catalog" },
    { href: "/registry", label: "Registry" },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-transform duration-300 ease-out ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div
        className={`transition-colors duration-300 ${
          scrolled ? "border-b border-line bg-bg/85 backdrop-blur-md" : "border-b border-transparent"
        }`}
      >
        <nav className="mx-auto flex h-14 max-w-[1080px] items-center gap-6 px-6 lg:px-10">
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2 text-[15px] tracking-[-0.01em] text-fg"
          >
            <span
              aria-hidden
              className="grid h-[22px] w-[22px] place-items-center rounded-[4px] border border-line bg-bg-panel font-mono text-[11px] text-fg-muted"
            >
              S
            </span>
            <span className="font-display text-[15px] font-bold tracking-[-0.02em] leading-none">Shua Labs</span>
          </Link>

          <ul className="ml-auto flex items-center gap-1">
            {links.map((link) => {
              const active =
                link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`rounded-md px-3 py-1.5 text-[14px] transition-colors ${
                      active ? "text-fg" : "text-fg-muted hover:text-fg"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
