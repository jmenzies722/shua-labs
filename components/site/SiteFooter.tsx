import Link from "next/link";

import { profile } from "@/data/profile";

/** One footer for every tab. Quiet, and the same everywhere. */
export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-[1120px] flex-col gap-4 px-6 py-10 sm:flex-row sm:items-center">
        <p className="text-[14px] text-fg-subtle">
          {profile.name} — {profile.role}
        </p>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 sm:ml-auto">
          {[
            { href: "/", label: "Overview" },
            { href: "/catalog", label: "Catalog" },
            { href: "/registry", label: "Registry" },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[14px] text-fg-muted transition-colors hover:text-fg"
            >
              {l.label}
            </Link>
          ))}
          {profile.links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-[14px] text-fg-muted transition-colors hover:text-fg"
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
