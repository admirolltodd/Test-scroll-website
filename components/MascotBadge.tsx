import Image from "next/image";

type MascotBadgeProps = {
  size?: number;
  className?: string;
};

/** Morris, illustrated as the ship's captain — used at a few different sizes. */
export default function MascotBadge({ size = 320, className = "" }: MascotBadgeProps) {
  return (
    <div className={`mascot-badge ${className}`} style={{ width: size, height: size }}>
      <Image
        src="/mascot/captain-bust.png"
        alt="Morris, the Actonaughts ship's cat, illustrated as a pirate captain"
        fill
        sizes={`${size}px`}
        style={{ objectFit: "cover" }}
      />
    </div>
  );
}
