/**
 * Who this is. The one file to edit when the story changes.
 *
 * This page gets read by three different people and they arrive with different questions:
 *   · an employer  — can he do the job, and is there proof
 *   · a buyer      — what can I get from him today
 *   · Josh         — what's stuck
 *
 * The brand page answers the first. It leads with capability and evidence, not with a shelf.
 *
 * HONESTY RULE, same as everywhere else: nothing here may claim something that isn't true and
 * checkable. No invented metrics, no "10x", no logos he hasn't worked with. An employer who
 * catches one inflated line discounts the whole page.
 */

export interface FocusArea {
  title: string;
  detail: string;
}

export interface ProfileLink {
  label: string;
  href: string;
  /** Shown as the visible text; the href can be longer. */
  display: string;
}

export interface Profile {
  name: string;
  /**
   * What you build — NOT a job title.
   *
   * A brand page is not a résumé. "DevOps Engineer" is checkable and accurate, but it slots you
   * into a box the rest of this page argues against, and it undersells work that is squarely
   * platform and AI-infrastructure. A descriptor of the work is both honest and stronger: it
   * claims no title you don't hold, and it is what someone actually needs to know.
   *
   * Your literal employment title belongs on the résumé, where its precision matters.
   */
  role: string;
  location: string;
  /** The positioning line. One sentence, first person, no adjectives you can't defend. */
  positioning: string;
  /** 2–3 short paragraphs. Written as prose, not bullets. */
  about: string[];
  focus: FocusArea[];
  stack: string[];
  links: ProfileLink[];
  /** Set false while job-hunting is private. Controls whether the availability line renders. */
  openTo: string | null;
}

export const profile: Profile = {
  name: "Josh Menzies",
  role: "Platform & AI infrastructure",
  location: "New York, NY",
  positioning:
    "I build the platforms AI agents actually run on — and I show my work.",
  about: [
    "Most AI agent demos fall over the moment they meet real traffic. There's no cost ceiling, no way to see what the agent actually did, and no path from a laptop to production that anyone would sign off on. That gap is the work I care about.",
    "I come at it from infrastructure rather than from prompting: AWS, Terraform, containers, CI/CD — the boring parts that decide whether a system survives its first bad week. Everything I build starts as something I needed, which is why the tooling here is opinionated rather than general.",
    "I publish the reasoning as well as the code. If a design has a limit, the write-up says where it breaks.",
  ],
  focus: [
    {
      title: "Agent infrastructure",
      detail:
        "Runtimes, gateways, and spend controls for AI agents — the layer between a model and a production system.",
    },
    {
      title: "Platform engineering",
      detail:
        "Internal tooling and paved paths that make the correct thing the easy thing for other engineers.",
    },
    {
      title: "Cloud and IaC",
      detail:
        "AWS architecture as code, least-privilege by default, with the cost consequences made visible up front.",
    },
  ],
  stack: [
    "AWS",
    "Terraform",
    "Docker",
    "Kubernetes",
    "Python",
    "Go",
    "TypeScript",
    "GitHub Actions",
    "Claude API",
  ],
  links: [
    {
      label: "GitHub",
      href: "https://github.com/jmenzies722",
      display: "github.com/jmenzies722",
    },
    {
      label: "Email",
      href: "mailto:jmenzies722@gmail.com",
      display: "jmenzies722@gmail.com",
    },
  ],
  // e.g. "Open to Platform / AI Infrastructure roles" — null hides the line entirely.
  openTo: null,
};
