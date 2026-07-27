"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useSmoothScroll } from "./SmoothScrollProvider";

const MAGNETIC_SELECTOR = "[data-magnetic]";

export default function MagneticCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const { reducedMotion, isTouch } = useSmoothScroll();

  useEffect(() => {
    if (reducedMotion || isTouch) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const setDotX = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power3.out" });
    const setDotY = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power3.out" });
    const setRingX = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3.out" });
    const setRingY = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3.out" });

    let ringScale = 1;
    const setRingScale = gsap.quickTo(ring, "scale", { duration: 0.35, ease: "power3.out" });

    const handleMove = (e: PointerEvent) => {
      setDotX(e.clientX);
      setDotY(e.clientY);
      setRingX(e.clientX);
      setRingY(e.clientY);
    };

    const handleEnter = () => {
      ringScale = 2.2;
      setRingScale(ringScale);
      ring.classList.add("cursor-ring--active");
    };
    const handleLeave = () => {
      ringScale = 1;
      setRingScale(ringScale);
      ring.classList.remove("cursor-ring--active");
    };

    const attachTargets = () => {
      document.querySelectorAll(MAGNETIC_SELECTOR).forEach((el) => {
        el.addEventListener("pointerenter", handleEnter);
        el.addEventListener("pointerleave", handleLeave);
      });
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    attachTargets();

    const observer = new MutationObserver(attachTargets);
    observer.observe(document.body, { childList: true, subtree: true });

    document.body.classList.add("has-custom-cursor");

    return () => {
      window.removeEventListener("pointermove", handleMove);
      observer.disconnect();
      document.body.classList.remove("has-custom-cursor");
      document.querySelectorAll(MAGNETIC_SELECTOR).forEach((el) => {
        el.removeEventListener("pointerenter", handleEnter);
        el.removeEventListener("pointerleave", handleLeave);
      });
    };
  }, [reducedMotion, isTouch]);

  if (reducedMotion || isTouch) return null;

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}
