// Multi-stop color interpolation used to drive the reactive scroll background.
// Colors are plain hex strings; interpolation happens in RGB space.

export type ColorStop = {
  /** 0..1 position along total document scroll progress */
  at: number;
  bg: string;
  accent: string;
  accent2: string;
};

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace("#", "");
  const bigint = parseInt(clean, 16);
  return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
}

function rgbToCss([r, g, b]: [number, number, number]): string {
  return `${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}`;
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function lerpColor(hexA: string, hexB: string, t: number): [number, number, number] {
  const a = hexToRgb(hexA);
  const b = hexToRgb(hexB);
  return [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];
}

/**
 * Given the global scroll stops and a progress value 0..1, return the
 * interpolated "rgb, rgb, rgb" triples ready to drop into a CSS variable.
 */
export function sampleColorStops(stops: ColorStop[], progress: number) {
  const clamped = Math.min(1, Math.max(0, progress));

  let lower = stops[0];
  let upper = stops[stops.length - 1];

  for (let i = 0; i < stops.length - 1; i++) {
    if (clamped >= stops[i].at && clamped <= stops[i + 1].at) {
      lower = stops[i];
      upper = stops[i + 1];
      break;
    }
  }

  const span = upper.at - lower.at || 1;
  const t = (clamped - lower.at) / span;

  return {
    bg: rgbToCss(lerpColor(lower.bg, upper.bg, t)),
    accent: rgbToCss(lerpColor(lower.accent, upper.accent, t)),
    accent2: rgbToCss(lerpColor(lower.accent2, upper.accent2, t)),
  };
}

export const scrollColorStops: ColorStop[] = [
  { at: 0, bg: "#08090c", accent: "#5b6eff", accent2: "#2f3699" },
  { at: 0.22, bg: "#0b0907", accent: "#ff9d5c", accent2: "#c2571f" },
  { at: 0.48, bg: "#070c0b", accent: "#2dd4bf", accent2: "#0d7d70" },
  { at: 0.72, bg: "#0b0810", accent: "#a78bfa", accent2: "#5b3ec9" },
  { at: 1, bg: "#0c0709", accent: "#ff6b81", accent2: "#c23a52" },
];
