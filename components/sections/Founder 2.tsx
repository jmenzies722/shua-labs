import { founder } from "@/data/company";

export function Founder() {
  return <section id="founder" className="section shell founder"><div><p className="eyebrow">The company</p><h2>Shua Labs is an independent venture company led by <em>{founder.name}.</em></h2></div><div><p>Working across product, engineering, and infrastructure to turn ambitious ideas into useful systems.</p><p className="location">{founder.location}</p></div><div id="contact" className="contact"><p className="eyebrow">A good place to start</p><h2>Have an idea worth building?</h2><a className="button button-light" href={founder.email}>Start a conversation <span>↗</span></a></div></section>;
}
