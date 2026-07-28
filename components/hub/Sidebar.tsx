"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  BarChart3,
  ChevronDown,
  LayoutGrid,
  Menu,
  Puzzle,
  User,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * Notion's left rail.
 *
 * The most identifiable part of the interface, and the reason these pages need no hero:
 * navigation is always present, so a page can open on content instead of orientation.
 *
 * Deliberately quiet — monochrome icons, no active-state fill beyond a subtle raise, hover and
 * focus as the only affordances.
 */

interface Item {
  label: string;
  href: string;
  icon: LucideIcon;
}

const SECTIONS: { title: string; items: Item[] }[] = [
  {
    title: "Shua Labs",
    items: [
      { label: "Overview", href: "/", icon: User },
      { label: "Catalog", href: "/catalog", icon: LayoutGrid },
      { label: "Registry", href: "/registry", icon: Puzzle },
    ],
  },
  {
    title: "Private",
    items: [{ label: "Dashboard", href: "/dashboard", icon: BarChart3 }],
  },
];

export function Sidebar() {
  const [open, setOpen] = useState(false);

  // Escape closes the mobile rail. A drawer you can only dismiss by aiming at a 24px X is a
  // drawer that traps keyboard users.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      {/* Mobile trigger — Notion collapses the rail below tablet. */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open navigation"
        className="fixed left-3 top-3 z-40 rounded-md p-2 text-fg-muted transition-colors hover:bg-bg-raised lg:hidden"
      >
        <Menu className="h-4 w-4" />
      </button>

      {open ? (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/20 lg:hidden"
        />
      ) : null}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[240px] flex-col border-r border-line bg-bg-panel transition-transform lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-3 py-3">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="flex min-w-0 items-center gap-2 rounded-md px-2 py-1.5 transition-colors hover:bg-bg-raised"
          >
            <span
              aria-hidden
              className="grid h-5 w-5 shrink-0 place-items-center rounded-[3px] bg-fg text-[11px] font-bold text-white"
            >
              S
            </span>
            <span className="truncate text-[14px] font-medium text-fg">Shua Labs</span>
            <ChevronDown className="h-3 w-3 shrink-0 text-fg-subtle" aria-hidden />
          </Link>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close navigation"
            className="rounded-md p-1.5 text-fg-muted transition-colors hover:bg-bg-raised lg:hidden"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-5 overflow-y-auto px-2 pb-6 pt-2">
          {SECTIONS.map((section) => (
            <div key={section.title}>
              <p className="px-3 pb-1 text-[11px] font-medium uppercase tracking-[0.04em] text-fg-subtle">
                {section.title}
              </p>
              <ul>
                {section.items.map((item) => (
                  <SidebarLink key={item.href} item={item} onNavigate={() => setOpen(false)} />
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="border-t border-line px-5 py-3">
          <a
            href="https://github.com/jmenzies722"
            className="text-[12px] text-fg-subtle transition-colors hover:text-fg-muted"
          >
            github.com/jmenzies722
          </a>
        </div>
      </aside>
    </>
  );
}

function SidebarLink({ item, onNavigate }: { item: Item; onNavigate: () => void }) {
  const pathname = usePathname();
  const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));

  return (
    <li>
      <Link
        href={item.href}
        onClick={onNavigate}
        className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-[14px] transition-colors ${
          active ? "bg-bg-raised font-medium text-fg" : "text-fg-muted hover:bg-bg-raised"
        }`}
      >
        <item.icon className="h-4 w-4 shrink-0" strokeWidth={1.75} aria-hidden />
        <span className="truncate">{item.label}</span>
      </Link>
    </li>
  );
}
