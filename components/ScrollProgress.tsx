"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useSmoothScroll } from "./SmoothScrollProvider";

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const { reducedMotion } = useSmoothScroll();

  useEffect(() => {
    const bar = barRef.current;
    const counter = counterRef.current;
    if (!bar || !counter) return;

    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const pct = Math.round(self.progress * 100);
        gsap.set(bar, { scaleY: self.progress });
        counter.textContent = String(pct).padStart(2, "0");
      },
    });

    return () => trigger.kill();
  }, [reducedMotion]);

  return (
    <div className="scroll-progress" aria-hidden="true">
      <div className="scroll-progress__track">
        <div ref={barRef} className="scroll-progress__bar" />
      </div>
      <span className="scroll-progress__counter">
        <span ref={counterRef}>00</span>
        <span className="scroll-progress__counter-max">/100</span>
      </span>
    </div>
  );
}
