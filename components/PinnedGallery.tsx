"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useSmoothScroll } from "./SmoothScrollProvider";
import type { GalleryImage } from "@/lib/sections";

type PinnedGalleryProps = {
  images: GalleryImage[];
  /** Optional per-frame overlay content, animates in lockstep with its image. */
  overlays?: React.ReactNode[];
  className?: string;
};

export default function PinnedGallery({ images, overlays, className = "" }: PinnedGalleryProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const frameRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const labelRef = useRef<HTMLSpanElement>(null);
  const scrollCtx = useSmoothScroll();

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const frames = frameRefs.current.filter(Boolean) as HTMLDivElement[];
    const imgs = imgRefs.current.filter(Boolean) as HTMLDivElement[];
    if (frames.length === 0) return;

    const { reducedMotion, isTouch } = scrollCtx;

    if (reducedMotion) {
      frames.forEach((f, i) => gsap.set(f, { autoAlpha: i === 0 ? 1 : 0 }));
      return;
    }

    gsap.set(frames, { autoAlpha: 0, clipPath: "inset(0% 0% 100% 0%)" });
    gsap.set(frames[0], { autoAlpha: 1, clipPath: "inset(0% 0% 0% 0%)" });
    gsap.set(imgs, { scale: 1.18 });
    gsap.set(imgs[0], { scale: 1 });

    let currentIndex = 0;

    const setActive = (index: number) => {
      if (index === currentIndex) return;
      const dir = index > currentIndex ? 1 : -1;
      const outgoing = frames[currentIndex];
      const incoming = frames[index];
      const incomingImg = imgRefs.current[index];

      gsap.set(incoming, {
        autoAlpha: 1,
        clipPath: dir > 0 ? "inset(0% 0% 100% 0%)" : "inset(100% 0% 0% 0%)",
      });
      gsap.to(incoming, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, ease: "power4.out" });
      if (incomingImg) gsap.to(incomingImg, { scale: 1, duration: 1.15, ease: "power3.out" });

      gsap.to(outgoing, {
        clipPath: dir > 0 ? "inset(100% 0% 0% 0%)" : "inset(0% 0% 100% 0%)",
        duration: 0.9,
        ease: "power4.out",
        onComplete: () => gsap.set(outgoing, { autoAlpha: 0 }),
      });

      currentIndex = index;
      if (labelRef.current) labelRef.current.textContent = images[index].caption;
    };

    const trigger = ScrollTrigger.create({
      trigger: wrapper,
      start: "top top",
      end: () => `+=${(isTouch ? 70 : 100) * frames.length}%`,
      pin: !isTouch,
      pinSpacing: true,
      anticipatePin: 1,
      scrub: 0.6,
      onUpdate: (self) => {
        const scaled = self.progress * (frames.length - 1);
        const index = Math.round(scaled);
        setActive(Math.min(frames.length - 1, Math.max(0, index)));
      },
    });

    // Scroll-velocity driven distortion: fast scrolling skews the active
    // image; the skew relaxes back to zero as the scroll settles.
    let skew = 0;
    const clampSkew = gsap.utils.clamp(-9, 9);
    const tick = () => {
      const targetSkew = clampSkew(-scrollCtx.getVelocity() * 0.55);
      skew += (targetSkew - skew) * 0.12;
      const activeImg = imgRefs.current[currentIndex];
      if (activeImg && Math.abs(skew) > 0.01) {
        gsap.set(activeImg, { skewY: skew });
      }
    };
    gsap.ticker.add(tick);

    return () => {
      trigger.kill();
      gsap.ticker.remove(tick);
    };
  }, [scrollCtx, images]);

  return (
    <div ref={wrapperRef} className={`pinned-gallery ${className}`}>
      <div className="pinned-gallery__stage">
        {images.map((image, i) => (
          <div
            key={image.src}
            ref={(el) => {
              frameRefs.current[i] = el;
            }}
            className="pinned-gallery__frame"
          >
            <div
              ref={(el) => {
                imgRefs.current[i] = el;
              }}
              className="pinned-gallery__image"
              style={{ backgroundImage: `url(${image.src})` }}
              role="img"
              aria-label={image.alt}
            />
            <div className="pinned-gallery__vignette" />
            {overlays?.[i] && <div className="pinned-gallery__overlay">{overlays[i]}</div>}
          </div>
        ))}
      </div>
      {!overlays && (
        <div className="pinned-gallery__caption font-mono-label">
          <span aria-hidden="true">◆</span>
          <span ref={labelRef}>{images[0]?.caption}</span>
        </div>
      )}
    </div>
  );
}
