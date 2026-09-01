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
      className="btn-secondary cursor-default opacity-60"
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
        <motion.p {...loadFade(reduced, 0)} className="label-text mb-2">
          Distribution
        </motion.p>
        <motion.h2 {...loadFade(reduced, 0.04)} id="follow-title" className="display-section mb-3">
          Follow the build.
        </motion.h2>
        <motion.p {...loadFade(reduced, 0.08)} className="body-lg mb-6">
          Research, experiments, architecture, launches, failures, and everything learned along the way.
        </motion.p>
        <motion.div {...loadFade(reduced, 0.12)} className="flex flex-wrap gap-2">
          <SocialButton channel={social.github} />
          <SocialButton channel={social.youtube} />
          <SocialButton channel={social.instagram} />
        </motion.div>
        <motion.p {...loadFade(reduced, 0.16)} className="mt-4 text-[13px] text-fg-subtle">
          {social.youtube.live && social.instagram.live
            ? "GitHub, YouTube, and Instagram are live."
            : "YouTube and Instagram open when the first episode and stills ship. Until then, GitHub is the public record. Flip live + href in content/social.ts."}
        </motion.p>
      </div>
    </section>
  );
}
