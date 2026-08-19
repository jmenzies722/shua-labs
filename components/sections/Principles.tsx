import { principles } from "@/data/company";

export function Principles() {
  return <><section id="approach" className="section shell principles"><div><p className="eyebrow">How we work</p><h2>Patient about the destination.<br /><em>Restless about the work.</em></h2></div><ol>{principles.map((principle, index) => <li key={principle}><span>0{index + 1}</span>{principle}</li>)}</ol></section><section className="formation"><div className="shell"><p className="eyebrow">In formation</p><p>New ventures are taking shape.</p><span aria-hidden>✦</span></div></section></>;
}
