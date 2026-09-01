import { Navigation } from "@/components/layout/Navigation";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Hero } from "@/components/sections/Hero";
import { CurrentlyBuilding } from "@/components/sections/CurrentlyBuilding";
import { LabLoop } from "@/components/sections/LabLoop";
import { WorkGrid } from "@/components/sections/WorkGrid";
import { BuildLogPreview } from "@/components/sections/BuildLogPreview";
import { FromTheLab } from "@/components/sections/FromTheLab";
import { FollowTheBuild } from "@/components/sections/FollowTheBuild";
import { getBuildFeed } from "@/lib/build-feed";

export const revalidate = 300;

export default async function HomePage() {
  const feed = await getBuildFeed(5);

  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <CurrentlyBuilding />
        <LabLoop />
        <WorkGrid limit={4} />
        <BuildLogPreview entries={feed} />
        <FromTheLab />
        <FollowTheBuild />
      </main>
      <SiteFooter />
    </>
  );
}
