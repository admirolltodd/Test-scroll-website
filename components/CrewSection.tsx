import PinnedGallery from "./PinnedGallery";
import SplitText from "./SplitText";
import Reveal from "./Reveal";
import MascotBadge from "./MascotBadge";
import { founders, mascot } from "@/lib/sections";

export default function CrewSection() {
  const images = founders.map((f) => f.image);
  const overlays = founders.map((founder) => (
    <div key={founder.name}>
      <span className="founders__overlay-role font-mono-label">{founder.role}</span>
      <h3 className="founders__overlay-name">{founder.name}</h3>
      <p className="founders__overlay-bio">{founder.bio}</p>
    </div>
  ));

  return (
    <section id="crew" className="section">
      <Reveal className="section__heading" start="top 90%">
        <span className="section__eyebrow font-mono-label" data-reveal-item>
          The Crew
        </span>
        <h2 className="section__title" data-reveal-item>
          <SplitText text="Two disciplines, one crew." start="top 90%" />
        </h2>
      </Reveal>

      <PinnedGallery images={images} overlays={overlays} className="founders__gallery" />

      <Reveal className="mascot-card" start="top 85%">
        <div className="mascot-card__badge-wrap" data-reveal-item>
          <MascotBadge size={220} className="mascot-card__badge" />
        </div>
        <div className="mascot-card__text" data-reveal-item>
          <span className="mascot-card__role font-mono-label">{mascot.role}</span>
          <h3 className="mascot-card__name">{mascot.name}</h3>
          <p className="mascot-card__bio">{mascot.bio}</p>
        </div>
      </Reveal>
    </section>
  );
}
