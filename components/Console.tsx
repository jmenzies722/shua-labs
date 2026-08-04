"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  complete,
  runCommand,
  type ConsoleLine,
} from "@/lib/console-commands";

const BANNER: ConsoleLine[] = [
  { text: "shua labs console", tone: "strong" },
  { text: "every answer here is read from the same data the page renders.", tone: "dim" },
  { text: "type `help` to start.", tone: "dim" },
  { text: "" },
];

interface Block {
  input?: string;
  lines: ConsoleLine[];
}

/**
 * Full-screen console.
 *
 * Opens on `~`, the nav button, or the hero hint; closes on Escape. Commands
 * resolve through lib/console-commands against live data — this is a second
 * view of the site's own dataset rather than a scripted demo.
 *
 * The input is a separate, non-scrolling bar pinned to the bottom rather than
 * the last line of scrolling output. On iOS, the keyboard resizes the visual
 * viewport and a fixed bottom bar stays glued above it; an input living inside
 * the scroll flow would need to be scrolled back into view by hand every time
 * the keyboard opens.
 */
export function Console({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const [blocks, setBlocks] = React.useState<Block[]>([{ lines: BANNER }]);
  const [value, setValue] = React.useState("");
  const [history, setHistory] = React.useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = React.useState<number | null>(null);

  const inputRef = React.useRef<HTMLInputElement>(null);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  // Focus on open; lock the page behind it. requestAnimationFrame rather than
  // a fixed setTimeout keeps the call as close as possible to the triggering
  // tap — iOS Safari only pops the keyboard for a focus() call it can still
  // trace back to a user gesture, and an arbitrary delay risks losing that.
  React.useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const raf = requestAnimationFrame(() => inputRef.current?.focus());
    return () => {
      document.body.style.overflow = prev;
      cancelAnimationFrame(raf);
    };
  }, [open]);

  // Keep the newest output in view.
  React.useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [blocks]);

  const submit = React.useCallback(() => {
    const input = value;
    if (!input.trim()) return;
    const result = runCommand(input);

    if (result.clear) {
      setBlocks([]);
    } else {
      setBlocks((b) => [...b, { input, lines: result.lines }]);
    }

    setHistory((h) => [...h, input.trim()]);
    setHistoryIndex(null);
    setValue("");
    inputRef.current?.focus();

    if (result.close) onClose();
    if (result.navigate) {
      onClose();
      router.push(result.navigate);
    }
  }, [value, onClose, router]);

  const onKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        submit();
        return;
      }
      if (e.key === "Tab") {
        e.preventDefault();
        setValue((v) => complete(v));
        return;
      }
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        if (history.length === 0) return;
        const next =
          historyIndex === null ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(next);
        setValue(history[next]);
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        if (historyIndex === null) return;
        const next = historyIndex + 1;
        if (next >= history.length) {
          setHistoryIndex(null);
          setValue("");
        } else {
          setHistoryIndex(next);
          setValue(history[next]);
        }
      }
    },
    [submit, history, historyIndex, onClose]
  );

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Console"
      className="term-scanlines fixed inset-0 z-[60] flex flex-col bg-black/97 animate-fade-in backdrop-blur-sm"
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <div className="flex shrink-0 items-center justify-between border-b border-line px-4 py-3">
        <span className="font-mono text-[11px] tracking-[0.12em] text-fg-subtle">
          shua@labs — console
        </span>
        <button
          type="button"
          onClick={onClose}
          className="-m-2 p-2 font-mono text-[11px] text-fg-subtle transition-colors hover:text-fg"
        >
          [ esc to close ]
        </button>
      </div>

      <div
        ref={scrollRef}
        onClick={() => inputRef.current?.focus()}
        className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-5 sm:px-6"
      >
        <div className="mx-auto max-w-4xl">
          {blocks.map((b, i) => (
            <div key={i} className="mb-4 last:mb-0">
              {b.input !== undefined && (
                <div className="font-mono text-[13px] text-fg">
                  <span className="text-fg-faint">$ </span>
                  {b.input}
                </div>
              )}
              {b.lines.map((l, j) => (
                <pre
                  key={j}
                  className={cn(
                    "whitespace-pre-wrap font-mono text-[13px] leading-[1.75]",
                    l.tone === "dim" && "text-fg-subtle",
                    l.tone === "strong" && "font-semibold text-fg",
                    !l.tone && "text-fg-muted"
                  )}
                >
                  {l.text === "" ? " " : l.text}
                </pre>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Pinned input bar — stays above the iOS keyboard instead of living in
          the scroll flow, and its own row never needs to be scrolled into view. */}
      <div
        className="shrink-0 border-t border-line bg-black px-4 pt-3 sm:px-6"
        style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
      >
        <div className="mx-auto flex max-w-4xl items-center gap-3">
          <span className="font-mono text-[13px] text-fg-faint">$</span>
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            spellCheck={false}
            autoComplete="off"
            autoCapitalize="none"
            autoCorrect="off"
            enterKeyHint="go"
            aria-label="Console input"
            // text-base (16px) on mobile stops iOS Safari auto-zooming the
            // page on focus; it steps back down to 13px from sm: up, where
            // that bug does not apply.
            className="min-w-0 flex-1 bg-transparent py-2 font-mono text-base text-fg caret-fg outline-none sm:text-[13px]"
          />
          <button
            type="button"
            onClick={submit}
            aria-label="Run command"
            className="-mr-1 inline-flex h-9 w-9 shrink-0 items-center justify-center text-fg-subtle transition-colors hover:text-fg sm:hidden"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
