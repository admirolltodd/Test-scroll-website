"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import SplitText from "./SplitText";
import { useSmoothScroll } from "./SmoothScrollProvider";

export default function Hero() {
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const { reducedMotion } = useSmoothScroll();

  useEffect(() => {
    const targets = [eyebrowRef.current, subRef.current, ctaRef.current].filter(Boolean);
    if (targets.length === 0) return;

    if (reducedMotion) {
      gsap.set(targets, { opacity: 1, y: 0 });
      return;
    }

    gsap.set(targets, { opacity: 0, y: 18 });
    gsap.to(targets, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
      stagger: 0.12,
      delay: 0.5,
    });
  }, [reducedMotion]);

  return (
    <section className="hero">
      <div className="hero__inner">
        <div ref={eyebrowRef} className="hero__eyebrow font-mono-label">
          Actonaughts — Full-Stack Consulting Studio
        </div>

        <h1 className="hero__headline">
          <SplitText
            as="span"
            className="hero__line"
            mode="line"
            text="Strategy and engineering,"
            start="top 95%"
          />
          <SplitText
            as="span"
            className="hero__line hero__line--accent"
            mode="line"
            text="one crew, all hands on deck."
            start="top 95%"
            delay={0.12}
          />
        </h1>

        <p ref={subRef} className="hero__sub">
          Founded by Robert Slavens and Chello May Harrison, Actonaughts designs and builds
          full-stack products for companies who are done coordinating three vendors to
          ship one thing.
        </p>

        <div ref={ctaRef} className="hero__actions">
          <a href="#contact" className="btn btn--solid" data-magnetic>
            Start a project
          </a>
          <a href="/portfolio" className="btn btn--ghost" data-magnetic>
            See our work
          </a>
        </div>
      </div>

      <div className="hero__scrollcue" aria-hidden="true">
        <span className="hero__scrollcue-line">
          <span className="hero__scrollcue-dot" />
        </span>
        <span className="font-mono-label hero__scrollcue-label">Scroll</span>
      </div>
    </section>
  );
}
