"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useSmoothScroll } from "./SmoothScrollProvider";

type RevealTag = "div" | "section" | "ul" | "ol" | "article" | "header";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  as?: RevealTag;
  stagger?: number;
  start?: string;
};

export default function Reveal({
  children,
  className = "",
  as: Tag = "div",
  stagger = 0.08,
  start = "top 82%",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const { reducedMotion } = useSmoothScroll();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const items = el.querySelectorAll<HTMLElement>("[data-reveal-item]");
    const targets = items.length > 0 ? Array.from(items) : [el];

    if (reducedMotion) {
      gsap.set(targets, { opacity: 1, y: 0 });
      return;
    }

    gsap.set(targets, { opacity: 0, y: 32 });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start,
      once: true,
      onEnter: () => {
        gsap.to(targets, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger });
      },
    });

    return () => trigger.kill();
  }, [reducedMotion, stagger, start]);

  return (
    <Tag ref={ref as React.Ref<never>} className={className}>
      {children}
    </Tag>
  );
}
