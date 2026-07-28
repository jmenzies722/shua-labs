"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/** Simple centred nav. Nothing clever — it should disappear and let the page work. */
export function SiteNav() {
  const pathname = usePathname();
  const links = [
    { href: "/", label: "Overview" },
    { href: "/catalog", label: "Catalog" },
    { href: "/registry", label: "Registry" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/80 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-[1120px] items-center gap-8 px-6">
        <Link href="/" className="text-[16px] font-semibold tracking-[-0.02em] text-fg">
          Shua Labs
        </Link>
        <ul className="ml-auto flex items-center gap-1">
          {links.map((l) => {
            const active = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`rounded-lg px-3.5 py-2 text-[14px] transition-colors ${
                    active ? "bg-bg-panel text-fg" : "text-fg-muted hover:bg-bg-panel hover:text-fg"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
