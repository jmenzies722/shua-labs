import { Nav } from "@/components/Nav";
import { Footer } from "@/components/sections/Footer";
import { Founder } from "@/components/sections/Founder";
import { Hero } from "@/components/sections/Hero";
import { Principles } from "@/components/sections/Principles";
import { Signals } from "@/components/sections/Signals";
import { VentureAreas } from "@/components/sections/VentureAreas";

export default function HomePage() { return <><Nav /><main><Hero /><VentureAreas /><Principles /><Signals /><Founder /></main><Footer /></>; }
