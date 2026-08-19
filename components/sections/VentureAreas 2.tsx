import { ventureAreas } from "@/data/company";

export function VentureAreas() {
  return <section id="focus" className="section shell"><p className="eyebrow">What we build</p><h2>Built for a world<br />that won&apos;t sit still.</h2><div className="areas">{ventureAreas.map((area) => <article key={area.number} className="area"><span>{area.number}</span><h3>{area.title}</h3><p>{area.description}</p></article>)}</div></section>;
}
