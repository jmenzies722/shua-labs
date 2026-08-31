"use client";

import { motion, useReducedMotion } from "framer-motion";
import { copy, episodes, instagramSeries, social } from "@/data/site";
import { loadFade } from "@/lib/motion";

export function Watch() {
  const reduced = useReducedMotion();

  return (
    <section id="watch" className="section-pad border-b border-line" aria-labelledby="watch-title">
      <div className="site-shell">
        <motion.p {...loadFade(reduced, 0)} className="label-text mb-4">Channels</motion.p>
        <motion.h2 {...loadFade(reduced, 0.05)} id="watch-title" className="display-section mb-4">{copy.watchTitle}</motion.h2>
        <motion.p {...loadFade(reduced, 0.1)} className="body-lg mb-12">{copy.watchBody}</motion.p>
        <div className="grid gap-px bg-line md:grid-cols-2">
          <article className="bg-bg p-6 sm:p-8">
            <p className="label-text">YouTube</p>
            <h3 className="mt-4 font-display text-2xl font-bold">{social.youtube.handle}</h3>
            <p className="mt-2 text-sm text-fg-muted">
              {social.youtube.live ? "Long-form. The actual work." : "Opening. First episode ships when the founder records it — not before."}
            </p>
            <ul className="mt-8 space-y-4">
              {episodes.map((ep) => (
                <li key={ep.n} className="flex gap-4">
                  <span className="font-mono text-[11px] text-signal">{ep.n}</span>
                  <div>
                    <p className="text-[15px]">{ep.title}</p>
                    <p className="text-[12px] text-fg-subtle">{ep.format} · {ep.status}</p>
                  </div>
                </li>
              ))}
            </ul>
          </article>
          <article className="bg-bg p-6 sm:p-8">
            <p className="label-text">Instagram</p>
            <h3 className="mt-4 font-display text-2xl font-bold">{social.instagram.handle}</h3>
            <p className="mt-2 text-sm text-fg-muted">
              {social.instagram.live ? "Stills of the system." : "Opening. A stills series of the org — no fake follower counts."}
            </p>
            <ul className="mt-8 space-y-4">
              {instagramSeries.map((item) => (
                <li key={item.n} className="flex gap-4">
                  <span className="font-mono text-[11px] text-signal">{item.n}</span>
                  <p className="text-[15px]">{item.title}</p>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
