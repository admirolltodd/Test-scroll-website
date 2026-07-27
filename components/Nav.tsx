"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ScrollTrigger } from "@/lib/gsap";

export default function Nav() {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: "top -80",
      toggleClass: { targets: nav, className: "nav--scrolled" },
    });

    return () => trigger.kill();
  }, []);

  return (
    <header ref={navRef} className="nav">
      <div className="nav__inner">
        <Link href="/" className="nav__mark" data-magnetic>
          <span className="nav__mark-glyph">A</span>
          <span className="nav__mark-word">Actonaughts</span>
        </Link>

        <nav className="nav__links">
          <Link href="/#services" data-magnetic>
            Services
          </Link>
          <Link href="/#process" data-magnetic>
            Process
          </Link>
          <Link href="/portfolio" data-magnetic>
            Work
          </Link>
          <Link href="/#crew" data-magnetic>
            Crew
          </Link>
        </nav>

        <Link href="/#contact" className="nav__cta" data-magnetic>
          Start a project
        </Link>
      </div>
    </header>
  );
}
