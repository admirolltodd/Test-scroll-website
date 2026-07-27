"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useSmoothScroll } from "./SmoothScrollProvider";
import type { CaseStudy } from "@/lib/sections";

export default function CaseStudyCard({ study, reverse = false }: { study: CaseStudy; reverse?: boolean }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const { reducedMotion } = useSmoothScroll();

  useEffect(() => {
    const frame = frameRef.current;
    const img = imgRef.current;
    const text = textRef.current;
    if (!frame || !img || !text) return;

    if (reducedMotion) {
      gsap.set([frame, text], { clipPath: "inset(0% 0% 0% 0%)", opacity: 1, y: 0 });
      return;
    }

    gsap.set(frame, { clipPath: "inset(0% 0% 100% 0%)" });
    gsap.set(img, { scale: 1.2 });
    gsap.set(text, { opacity: 0, y: 24 });

    const trigger = ScrollTrigger.create({
      trigger: frame,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(frame, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: "power4.out" });
        gsap.to(img, { scale: 1, duration: 1.4, ease: "power3.out" });
        gsap.to(text, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", delay: 0.2 });
      },
    });

    return () => trigger.kill();
  }, [reducedMotion]);

  return (
    <article className={`case-card ${reverse ? "case-card--reverse" : ""}`}>
      <div ref={frameRef} className="case-card__frame">
        <div
          ref={imgRef}
          className="case-card__image"
          style={{ backgroundImage: `url(${study.image.src})` }}
          role="img"
          aria-label={study.image.alt}
        />
      </div>
      <div ref={textRef} className="case-card__text">
        <span className="case-card__index font-mono-label">{study.index}</span>
        <span className="case-card__client font-mono-label">{study.client}</span>
        <h3 className="case-card__title">{study.title}</h3>
        <p className="case-card__summary">{study.summary}</p>
        <div className="case-card__tags">
          {study.tags.map((tag) => (
            <span key={tag} className="services__tag font-mono-label">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
