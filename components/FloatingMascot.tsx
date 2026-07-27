"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useSmoothScroll } from "./SmoothScrollProvider";
import MascotBadge from "./MascotBadge";

export default function FloatingMascot() {
  const wrapRef = useRef<HTMLAnchorElement>(null);
  const { reducedMotion } = useSmoothScroll();

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    if (reducedMotion) {
      gsap.set(el, { autoAlpha: 1 });
      return;
    }

    gsap.set(el, { autoAlpha: 0 });

    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: () => `top -${window.innerHeight * 0.8}`,
      onEnter: () => gsap.to(el, { autoAlpha: 1, duration: 0.6, ease: "power2.out" }),
      onLeaveBack: () => gsap.to(el, { autoAlpha: 0, duration: 0.4, ease: "power2.out" }),
    });

    return () => trigger.kill();
  }, [reducedMotion]);

  return (
    <Link ref={wrapRef} href="/#crew" className="floating-mascot" data-magnetic aria-label="Meet the crew">
      <div className="floating-mascot__inner">
        <MascotBadge size={68} className="floating-mascot__badge" />
        <span className="floating-mascot__tip font-mono-label">Ahoy — meet the crew</span>
      </div>
    </Link>
  );
}
