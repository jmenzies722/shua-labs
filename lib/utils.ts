import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a YYYY-MM-DD ISO date as a calm, mono-friendly stamp
 * (e.g. "2026.06.22"). Stable across SSR and client — uses string ops only.
 */
export function formatDateStamp(iso: string): string {
  // Defensive: only swap "-" → "." if shape looks ISO.
  if (/^\d{4}-\d{2}-\d{2}$/.test(iso)) {
    return iso.replace(/-/g, ".");
  }
  return iso;
}
