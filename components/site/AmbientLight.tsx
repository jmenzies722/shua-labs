"use client";

import { useEffect, useRef } from "react";

/**
 * A soft light that follows the cursor, well behind the content.
 *
 * Replaces the schematic. A diagram explains; this just makes the surface feel alive, which is
 * what "fluid" actually asks for. It reads as depth rather than decoration because it never
 * resolves into a shape you could name.
 *
 * Three rules keep it from being tacky:
 *   · it lags the cursor (~7% per frame) so it drifts rather than snaps
 *   · it is enormous and very low opacity — you feel it, you don't look at it
 *   · it does nothing at all under prefers-reduced-motion, and never on touch
 */
export function AmbientLight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Pointer-follow is meaningless without a pointer.
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight * 0.3;
    let x = targetX;
    let y = targetY;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const tick = () => {
      x += (targetX - x) * 0.07;
      y += (targetY - y) * 0.07;
      node.style.transform = `translate3d(${x - 400}px, ${y - 400}px, 0)`;
      raf = window.requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = window.requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div
        ref={ref}
        className="h-[800px] w-[800px] rounded-full opacity-[0.55] blur-[120px] will-change-transform"
        style={{
          background:
            "radial-gradient(circle, rgba(82,156,202,0.10) 0%, rgba(82,156,202,0.04) 40%, transparent 70%)",
        }}
      />
    </div>
  );
}
