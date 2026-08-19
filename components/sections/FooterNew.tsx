"use client";

import * as React from "react";

/**
 * Footer - Simple, clean footer for the venture company.
 */
export function FooterNew() {
  return (
    <footer className="border-t border-line py-12" style={{ backgroundColor: "rgba(10, 10, 10, 0.5)" }}>
      <div className="container max-w-[1400px]">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="heading-medium mb-2">Shua Labs</p>
            <p className="body-text text-sm">
              Building what comes next.
            </p>
          </div>

          <div className="flex gap-6">
            <a
              href="https://github.com/jmenzies722"
              target="_blank"
              rel="noopener noreferrer"
              className="text-fg-muted hover:text-fg transition-colors text-sm"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/josh-m01/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-fg-muted hover:text-fg transition-colors text-sm"
            >
              LinkedIn
            </a>
            <a
              href="mailto:jmenzies722@gmail.com"
              className="text-fg-muted hover:text-fg transition-colors text-sm"
            >
              Email
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-line text-center">
          <p className="text-fg-faint text-sm">
            © {new Date().getFullYear()} Shua Labs. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}