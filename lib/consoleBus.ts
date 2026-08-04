/**
 * Console open/close as a window event rather than React context.
 *
 * The console's trigger buttons live in two places that are not otherwise
 * related — Nav (every route) and Hero (home only) — and Nav gets remounted
 * on every route change since each route owns its own layout. A tiny event
 * bus avoids wiring a context provider through every layout just to let two
 * unrelated buttons open one overlay.
 */
const OPEN_EVENT = "shua:console:open";

export function openConsole(): void {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export function onConsoleOpenRequest(handler: () => void): () => void {
  window.addEventListener(OPEN_EVENT, handler);
  return () => window.removeEventListener(OPEN_EVENT, handler);
}
