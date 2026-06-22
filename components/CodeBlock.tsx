"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  language?: string;
  caption?: string;
  className?: string;
}

/**
 * Dark mono code block with a copy button. No syntax highlighting —
 * deliberately quiet so it reads as a snippet, not a feature.
 */
export function CodeBlock({ code, language, caption, className }: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false);

  const onCopy = React.useCallback(async () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(code);
      } else {
        // Fallback for non-secure contexts.
        const ta = document.createElement("textarea");
        ta.value = code;
        ta.setAttribute("readonly", "");
        ta.style.position = "absolute";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // Silently fail — copy is non-critical.
    }
  }, [code]);

  return (
    <figure className={cn("group/codeblock", className)}>
      {caption && (
        <figcaption className="mb-2 flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.16em] text-fg-subtle">
          {language && (
            <span className="rounded-sm border border-line bg-white/[0.03] px-1.5 py-0.5">
              {language}
            </span>
          )}
          <span>{caption}</span>
        </figcaption>
      )}
      <div className="relative overflow-hidden rounded-xl border border-line bg-black/60">
        <button
          type="button"
          onClick={onCopy}
          aria-label={copied ? "Copied" : "Copy code"}
          className="absolute right-3 top-3 inline-flex h-8 items-center gap-1.5 rounded-full border border-line bg-bg-panel/80 px-3 text-[11px] font-medium text-fg-muted backdrop-blur-sm transition-colors duration-200 hover:border-line-strong hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ring"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5" aria-hidden="true" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" aria-hidden="true" />
              Copy
            </>
          )}
        </button>
        <pre className="overflow-x-auto p-5 pr-20 text-[13px] leading-relaxed font-mono text-fg/90">
          <code>{code}</code>
        </pre>
      </div>
    </figure>
  );
}
