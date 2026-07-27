# Actonaughts

Marketing site for Actonaughts, a full-stack consulting studio founded by Robert Slavens and
Chello May Harrison (and ship's cat Morris). A scroll-driven, single-page experience with
pinned photo transitions, a reactive orange-toned background that morphs with scroll
position, and a separate `/portfolio` page.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS v4
- GSAP + ScrollTrigger for scroll-pinned animation and scrubbed transitions
- Lenis for smooth scrolling
- Fraunces (display), Sora (body), JetBrains Mono (labels)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run lint    # eslint
```

## Structure

- `app/page.tsx` — homepage (hero, crew, services, process, contact)
- `app/portfolio/page.tsx` — case studies page
- `components/` — section and motion components (`PinnedGallery`, `ScrollBackground`,
  `SmoothScrollProvider`, `SplitText`, `Reveal`, `MagneticCursor`, `ScrollProgress`,
  `MascotBadge`, `FloatingMascot`)
- `lib/sections.ts` — typed content config (founders, mascot, services, process, case studies)
- `lib/colors.ts` — scroll-driven background color-stop interpolation

Complex spatial transitions and the custom cursor are disabled under
`prefers-reduced-motion` and on touch/mobile viewports in favor of simpler CSS transitions.
