import * as React from "react";
import Link from "next/link";
import { TermLink } from "@/components/TermLink";
import { registryCounts } from "@/lib/registry";

const FOOTER_LINKS: { label: string; href: string }[] = [
  { label: "work", href: "/#work" },
  { label: "about", href: "/#about" },
  { label: "registry", href: "/registry" },
];

export function Footer() {
  const year = new Date().getFullYear();
  const c = registryCounts();

  return (
    <footer className="relative border-t border-line bg-black">
      <div className="container max-w-[1180px] py-14 md:py-20">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="flex max-w-sm flex-col gap-4">
            <span className="font-mono text-[13px] font-semibold tracking-[-0.02em] text-fg">
              shua labs
            </span>
            <p className="text-[12.5px] leading-[1.6] text-fg-subtle">
              Developer tools and AI infrastructure, built by Josh Menzies.
            </p>
            <TermLink
              href="https://github.com/jmenzies722/shua-labs"
              external
              className="font-mono text-[12.5px]"
            >
              github.com/jmenzies722/shua-labs
            </TermLink>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap gap-x-8 gap-y-3">
            {FOOTER_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="font-mono text-[12.5px] text-fg-muted transition-colors duration-200 hover:text-fg"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-8 font-mono text-[11px] tracking-[0.08em] text-fg-faint md:flex-row md:items-center md:justify-between">
          <p>&copy; {year} shua labs · MIT</p>
          <p>{c.open} public repos</p>
        </div>
      </div>
    </footer>
  );
}
