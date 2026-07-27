import Image from "next/image";

type MascotBadgeProps = {
  size?: number;
  className?: string;
};

/**
 * Morris (the ship's cat) with a CSS/SVG-drawn tricorn hat and eyepatch
 * layered on top of his photo. Percentages are tuned to the specific crop
 * of /mascot/morris-crew.jpg used here (object-position below), so this
 * component always renders that one photo.
 */
export default function MascotBadge({ size = 320, className = "" }: MascotBadgeProps) {
  return (
    <div className={`mascot-badge ${className}`} style={{ width: size, height: size }}>
      <Image
        src="/mascot/morris-crew.jpg"
        alt="Morris, the Actonaughts ship's cat, dressed as a pirate captain"
        fill
        sizes={`${size}px`}
        style={{ objectFit: "cover", objectPosition: "50% 47%" }}
      />
      <svg className="mascot-badge__gear" viewBox="0 0 100 100" aria-hidden="true">
        <ellipse cx="50" cy="11" rx="22" ry="9" fill="#18120d" />
        <path d="M 8 21 Q 50 35 92 21 Q 50 27 8 21 Z" fill="#18120d" />
        <path
          d="M 8 21 Q 50 35 92 21"
          fill="none"
          stroke="rgb(var(--scroll-accent))"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <circle cx="50" cy="10" r="2.2" fill="rgb(var(--scroll-accent))" />

        <circle cx="28" cy="37" r="2.6" fill="none" stroke="rgb(var(--scroll-accent))" strokeWidth="1.3" />

        <line x1="57" y1="43" x2="15" y2="31" stroke="#14100c" strokeWidth="2" strokeLinecap="round" />
        <line x1="59" y1="44" x2="87" y2="34" stroke="#14100c" strokeWidth="2" strokeLinecap="round" />
        <ellipse cx="58" cy="45" rx="9" ry="10.5" fill="#14100c" />
      </svg>
    </div>
  );
}
