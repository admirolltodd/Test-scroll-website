"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import SplitText from "./SplitText";
import Reveal from "./Reveal";
import { processSteps } from "@/lib/sections";
import { useSmoothScroll } from "./SmoothScrollProvider";

export default function ProcessSection() {
  const listRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const { reducedMotion } = useSmoothScroll();

  useEffect(() => {
    const list = listRef.current;
    const fill = fillRef.current;
    if (!list || !fill) return;

    if (reducedMotion) {
      gsap.set(fill, { scaleY: 1 });
      return;
    }

    gsap.set(fill, { scaleY: 0 });

    const trigger = ScrollTrigger.create({
      trigger: list,
      start: "top 65%",
      end: "bottom 60%",
      scrub: 0.5,
      onUpdate: (self) => gsap.set(fill, { scaleY: self.progress }),
    });

    return () => trigger.kill();
  }, [reducedMotion]);

  return (
    <section id="process" className="section">
      <Reveal className="section__heading" start="top 90%">
        <span className="section__eyebrow font-mono-label" data-reveal-item>
          Process
        </span>
        <h2 className="section__title" data-reveal-item>
          <SplitText text="Four phases. No black boxes." start="top 90%" />
        </h2>
      </Reveal>

      <div className="process">
        <div className="process__track">
          <div ref={fillRef} className="process__track-fill" />
        </div>

        <div ref={listRef}>
          <Reveal as="ol" className="process__list" stagger={0.12} start="top 85%">
            {processSteps.map((step) => (
              <li key={step.index} className="process__step" data-reveal-item>
                <span className="process__step-index font-mono-label">{step.index}</span>
                <h3 className="process__step-title">{step.title}</h3>
                <p className="process__step-desc">{step.description}</p>
              </li>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
