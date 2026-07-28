"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * The headline, revealed a word at a time.
 *
 * Each word rises through a clipping mask, so the line assembles rather than fades. It is the
 * first thing anyone sees and the only place on the site with choreography this deliberate —
 * spending the motion budget in one place is what keeps the rest feeling calm.
 *
 * Reduced motion renders the finished line with no animation at all.
 */
export function KineticHeadline({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const words = text.split(" ");

  if (reduced) return <h1 className={className}>{text}</h1>;

  return (
    <h1 className={className} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          aria-hidden
          // The mask: overflow-hidden on an inline-block, word rises into it.
          className="inline-block overflow-hidden align-bottom"
        >
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{
              duration: 0.7,
              delay: 0.12 + i * 0.055,
              ease: [0.22, 0.61, 0.36, 1],
            }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}
