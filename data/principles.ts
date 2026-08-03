import type { PrincipleEntry } from "@/lib/types";

/**
 * The rules the ladder runs on. These are not brand values — they are the
 * operating constraints from the CONTROL PLANE charter, stated plainly.
 */
export const principles: PrincipleEntry[] = [
  {
    id: "One service at a time",
    definition:
      "Service N+1 does not begin until service N passes its gate. No parallel starts. Breadth is how you end up with eight abandoned repos and zero credentials.",
    icon: "Layers",
  },
  {
    id: "Code alone is not evidence",
    definition:
      "A gate is four things: a public repo, a README with an architecture diagram, a demo someone else can open, and one post explaining the hard part. Three out of four is zero.",
    icon: "Shield",
  },
  {
    id: "An honest parked beats a fake building",
    definition:
      "If a service stalls three weeks it gets marked parked, with the reason written down. Nothing here claims a status it has not earned.",
    icon: "Wrench",
  },
];
