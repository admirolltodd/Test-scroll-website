"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useSmoothScroll } from "./SmoothScrollProvider";

type SplitTextTag = "span" | "div" | "h1" | "h2" | "h3" | "p";

type SplitTextProps = {
  text: string;
  as?: SplitTextTag;
  className?: string;
  /** Split by "word" (default) or "line" (whole string treated as one masked line) */
  mode?: "word" | "line";
  delay?: number;
  start?: string;
};

export default function SplitText({
  text,
  as: Tag = "span",
  className,
  mode = "word",
  delay = 0,
  start = "top 85%",
}: SplitTextProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const { reducedMotion } = useSmoothScroll();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const pieces = container.querySelectorAll<HTMLElement>("[data-split-piece]");
    if (pieces.length === 0) return;

    if (reducedMotion) {
      gsap.set(pieces, { yPercent: 0, opacity: 1 });
      return;
    }

    gsap.set(pieces, { yPercent: 110 });

    const trigger = ScrollTrigger.create({
      trigger: container,
      start,
      onEnter: () => {
        gsap.to(pieces, {
          yPercent: 0,
          duration: 0.9,
          ease: "power4.out",
          stagger: 0.045,
          delay,
        });
      },
      once: true,
    });

    return () => trigger.kill();
  }, [reducedMotion, delay, start]);

  const units = mode === "word" ? text.split(" ") : [text];

  return (
    <Tag ref={containerRef as React.Ref<never>} className={className} aria-label={text}>
      {units.map((unit, i) => (
        <span className="split-mask" key={i} aria-hidden="true">
          <span className="split-piece" data-split-piece>
            {unit}
            {mode === "word" && i < units.length - 1 ? " " : ""}
          </span>
        </span>
      ))}
    </Tag>
  );
}
