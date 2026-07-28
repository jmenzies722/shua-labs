"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Route transition.
 *
 * A template re-mounts on every navigation (a layout does not), which is what makes this the
 * right place for it. Short and small — 220ms, 8px — because a page transition you notice is a
 * page transition that is too long. It removes the hard cut between routes without ever making
 * you wait.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  if (reduced) return <>{children}</>;

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
