"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const links = [{ label: "Focus", href: "/#focus" }, { label: "Approach", href: "/#approach" }, { label: "Founder", href: "/#founder" }];

export function Nav() { const [open, setOpen] = useState(false); return <header className="nav"><div className="shell nav-inner"><Link href="/#top" className="wordmark" aria-label="Shua Labs home">Shua Labs</Link><nav aria-label="Primary">{links.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}</nav><a className="nav-contact" href="#contact">Contact</a><button className="menu" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button></div>{open && <nav className="mobile-nav" aria-label="Mobile">{links.map((link) => <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</Link>)}<a href="#contact" onClick={() => setOpen(false)}>Contact</a></nav>}</header>; }
