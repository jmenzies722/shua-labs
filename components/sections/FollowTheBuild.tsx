"use client";

import { motion, useReducedMotion } from "framer-motion";
import { social } from "@/content/social";
import { loadFade } from "@/lib/motion";

function SocialButton({
  channel,
}: {
  channel: (typeof social)[keyof typeof social];
}) {
  if (channel.live && channel.href) {
    return (
      <a href={channel.href} className="btn-primary" rel="noreferrer" target="_blank">
        {channel.label}
      </a>
    );
  }

  return (
    <span
      className="btn-secondary cursor-default opacity-55"
      title="Opening — founder creates account, then sets href + live in content/social.ts"
    >
      {channel.label} {channel.handle}
    </span>
  );
}

export function FollowTheBuild() {
  const reduced = useReducedMotion();

  return (
    <section id="follow" className="section-pad border-b border-line" aria-labelledby="follow-title">
      <div className="site-shell max-w-[640px]">
        <motion.p {...loadFade(reduced, 0)} className="label-text mb-3">
          Distribution
        </motion.p>
        <motion.h2 {...loadFade(reduced, 0.05)} id="follow-title" className="display-section mb-4">
          Follow the build.
        </motion.h2>
        <motion.p {...loadFade(reduced, 0.1)} className="body-lg mb-8">
          Research, experiments, architecture, launches, failures, and everything learned along the way.
        </motion.p>
        <motion.div {...loadFade(reduced, 0.16)} className="flex flex-wrap gap-3">
          <SocialButton channel={social.github} />
          {/* YouTube deferred — keep channel in content model, not live yet */}
          <SocialButton channel={social.instagram} />
        </motion.div>
        <motion.p {...loadFade(reduced, 0.22)} className="mt-5 text-[13px] text-fg-subtle">
          {social.instagram.live
            ? "GitHub and Instagram are live. YouTube opens later."
            : "GitHub is the public record. Instagram opens when the first stills ship. YouTube stays off for now — flip live + href in content/social.ts when ready."}
        </motion.p>
      </div>
    </section>
  );
}
