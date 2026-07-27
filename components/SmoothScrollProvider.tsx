"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

type ScrollContextValue = {
  getVelocity: () => number;
  reducedMotion: boolean;
  isTouch: boolean;
};

const ScrollContext = createContext<ScrollContextValue>({
  getVelocity: () => 0,
  reducedMotion: false,
  isTouch: false,
});

export function useSmoothScroll() {
  return useContext(ScrollContext);
}

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const velocityRef = useRef(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const touchQuery = window.matchMedia("(pointer: coarse)");

    const updateFlags = () => {
      setReducedMotion(motionQuery.matches);
      setIsTouch(touchQuery.matches);
    };
    updateFlags();
    motionQuery.addEventListener("change", updateFlags);
    touchQuery.addEventListener("change", updateFlags);

    let instance: Lenis | null = null;
    let rafId = 0;

    if (!motionQuery.matches) {
      instance = new Lenis({
        duration: 1.15,
        easing: (t: number) => Math.min(1, 1 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: touchQuery.matches ? 1.4 : 1,
      });

      instance.on("scroll", (e: { velocity: number }) => {
        velocityRef.current = e.velocity;
        ScrollTrigger.update();
      });

      const raf = (time: number) => {
        instance?.raf(time * 1000);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);

      gsap.ticker.lagSmoothing(0);
    }

    return () => {
      motionQuery.removeEventListener("change", updateFlags);
      touchQuery.removeEventListener("change", updateFlags);
      if (rafId) cancelAnimationFrame(rafId);
      instance?.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const value: ScrollContextValue = {
    getVelocity: () => velocityRef.current,
    reducedMotion,
    isTouch,
  };

  return <ScrollContext.Provider value={value}>{children}</ScrollContext.Provider>;
}
