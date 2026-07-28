"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Route transition.
 *
 * A template re-mounts on every navigation (a layout does not), which is why it lives here.
 *
 * Same invariant as Reveal: **it must not put `opacity: 0` into server-rendered HTML.** This
 * wraps every route, so getting it wrong blanks the entire site until hydration — which is
 * exactly what happened. It renders plain until mount, then animates only on client-side
 * navigations, where JS is provably running and there is no SSR pass to poison.
 *
 * 220ms / 8px. A page transition you notice is one that is too long.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted || reduced) return <>{children}</>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: [0.22, 0.61, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
