"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { sampleColorStops, scrollColorStops } from "@/lib/colors";
import { useSmoothScroll } from "./SmoothScrollProvider";

export default function ScrollBackground() {
  const meshRef = useRef<HTMLDivElement>(null);
  const { reducedMotion } = useSmoothScroll();

  useEffect(() => {
    const root = document.documentElement;
    const mesh = meshRef.current;

    const applyProgress = (progress: number) => {
      const { bg, accent, accent2 } = sampleColorStops(scrollColorStops, progress);
      root.style.setProperty("--scroll-bg", bg);
      root.style.setProperty("--scroll-accent", accent);
      root.style.setProperty("--scroll-accent-2", accent2);
    };

    applyProgress(0);

    if (reducedMotion) return;

    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => applyProgress(self.progress),
    });

    let quickX: ((value: number) => void) | undefined;
    let quickY: ((value: number) => void) | undefined;
    if (mesh) {
      quickX = gsap.quickTo(mesh, "--mesh-x", { duration: 1.2, ease: "power3.out" });
      quickY = gsap.quickTo(mesh, "--mesh-y", { duration: 1.2, ease: "power3.out" });
    }

    const handlePointerMove = (e: PointerEvent) => {
      const xPct = (e.clientX / window.innerWidth) * 100;
      const yPct = (e.clientY / window.innerHeight) * 100;
      quickX?.(xPct);
      quickY?.(yPct);
    };
    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    return () => {
      trigger.kill();
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, [reducedMotion]);

  return (
    <div className="scroll-bg" aria-hidden="true">
      <div ref={meshRef} className="scroll-bg__mesh" />
      <div className="scroll-bg__grid" />
      <div className="scroll-bg__grain" />
    </div>
  );
}
