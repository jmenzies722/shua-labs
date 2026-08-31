import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { WorkGrid } from "@/components/sections/WorkGrid";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Experiments, open source, research, and ventures under Shua Labs — honest status, no invented traction.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <PageShell>
      <WorkGrid />
    </PageShell>
  );
}
