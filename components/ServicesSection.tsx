"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import SplitText from "./SplitText";
import Reveal from "./Reveal";
import { services } from "@/lib/sections";
import { useSmoothScroll } from "./SmoothScrollProvider";

export default function ServicesSection() {
  const previewRef = useRef<HTMLDivElement>(null);
  const { isTouch, reducedMotion } = useSmoothScroll();

  const showPreview = (src: string, x: number, y: number) => {
    if (isTouch || reducedMotion) return;
    const preview = previewRef.current;
    if (!preview) return;
    preview.style.backgroundImage = `url(${src})`;
    gsap.set(preview, { x: x + 28, y: y - 140 });
    gsap.to(preview, { autoAlpha: 1, scale: 1, duration: 0.5, ease: "power3.out" });
  };

  const hidePreview = () => {
    if (isTouch || reducedMotion) return;
    gsap.to(previewRef.current, { autoAlpha: 0, scale: 0.92, duration: 0.4, ease: "power3.out" });
  };

  const movePreview = (e: React.MouseEvent) => {
    if (isTouch || reducedMotion) return;
    gsap.to(previewRef.current, {
      x: e.clientX + 28,
      y: e.clientY - 140,
      duration: 0.6,
      ease: "power3.out",
    });
  };

  return (
    <section id="services" className="section" onMouseMove={movePreview}>
      <Reveal className="section__heading" start="top 90%">
        <span className="section__eyebrow font-mono-label" data-reveal-item>
          Services
        </span>
        <h2 className="section__title" data-reveal-item>
          <SplitText text="Four ways we join the work." start="top 90%" />
        </h2>
      </Reveal>

      <Reveal as="ul" className="services__list" stagger={0.06} start="top 88%">
        {services.map((service) => (
          <li
            key={service.index}
            className="services__row"
            data-reveal-item
            onMouseEnter={(e) => showPreview(service.image.src, e.clientX, e.clientY)}
            onMouseLeave={hidePreview}
          >
            <span className="services__index font-mono-label">{service.index}</span>
            <div className="services__row-main">
              <h3 className="services__row-title">{service.title}</h3>
              <p className="services__row-desc">{service.description}</p>
              <div className="services__stack">
                {service.stack.map((tech) => (
                  <span key={tech} className="services__tag font-mono-label">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </li>
        ))}
      </Reveal>

      <div ref={previewRef} className="services__preview" aria-hidden="true" />
    </section>
  );
}
