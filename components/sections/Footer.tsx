import * as React from "react";
import Link from "next/link";
import { Github } from "lucide-react";

const FOOTER_LINKS: { label: string; href: string }[] = [
  { label: "Work", href: "#work" },
  { label: "Consulting", href: "#consulting" },
  { label: "Journey", href: "#journey" },
  { label: "About", href: "#about" },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-line bg-bg-deep">
      <div className="container py-16 md:py-20">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col gap-4 max-w-sm">
            <span className="text-[15px] font-semibold tracking-tight text-fg">
              Shua Labs
            </span>
            <p className="text-sm text-fg-muted leading-relaxed">
              Open-source products and tools for developer and AI enablement.
              Built in the open by Josh Menzies.
            </p>
            <Link
              href="https://github.com/jmenzies722/shua-labs"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 text-sm text-fg-muted hover:text-fg transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ring rounded-sm w-fit"
            >
              <Github className="h-4 w-4" aria-hidden="true" />
              github.com/jmenzies722/shua-labs
            </Link>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap gap-x-8 gap-y-3">
            {FOOTER_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm text-fg-muted hover:text-fg transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ring rounded-sm"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-12 pt-8 border-t border-line flex flex-col gap-3 md:flex-row md:items-center md:justify-between text-xs text-fg-subtle">
          <p>
            &copy; {year} Shua Labs. All work shipped under{" "}
            <span className="font-mono">MIT</span>.
          </p>
          <p className="font-mono uppercase tracking-[0.18em]">
            Built in the open.
          </p>
        </div>
      </div>
    </footer>
  );
}
