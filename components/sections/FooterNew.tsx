"use client";

import * as React from "react";

/**
 * Footer - Simple, clean footer for the venture company.
 */
export function FooterNew() {
  return (
    <footer className="section-rule py-8">
      <div className="site-shell">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <p className="text-[15px] font-semibold tracking-[-0.03em] text-fg">
              Shua Labs
            </p>
            <p className="body-text mt-1 text-[13px]">
              Building what comes next.
            </p>
          </div>

          <div className="flex gap-5">
            <a
              href="https://github.com/jmenzies722"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] text-fg-muted transition-colors hover:text-fg"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/josh-m01/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] text-fg-muted transition-colors hover:text-fg"
            >
              LinkedIn
            </a>
            <a
              href="mailto:jmenzies722@gmail.com"
              className="text-[13px] text-fg-muted transition-colors hover:text-fg"
            >
              Email
            </a>
          </div>
        </div>

        <p className="mt-6 text-[12px] text-fg-faint">
          © {new Date().getFullYear()} Shua Labs. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
