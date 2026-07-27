import PinnedGallery from "./PinnedGallery";
import SplitText from "./SplitText";
import Reveal from "./Reveal";
import { founders } from "@/lib/sections";

export default function FoundersSection() {
  const images = founders.map((f) => f.image);
  const overlays = founders.map((founder) => (
    <div key={founder.name}>
      <span className="founders__overlay-role font-mono-label">{founder.role}</span>
      <h3 className="founders__overlay-name">{founder.name}</h3>
      <p className="founders__overlay-bio">{founder.bio}</p>
    </div>
  ));

  return (
    <section id="founders" className="section">
      <Reveal className="section__heading" start="top 90%">
        <span className="section__eyebrow font-mono-label" data-reveal-item>
          Founders
        </span>
        <h2 className="section__title" data-reveal-item>
          <SplitText text="Two disciplines, one signature." start="top 90%" />
        </h2>
      </Reveal>

      <PinnedGallery images={images} overlays={overlays} className="founders__gallery" />
    </section>
  );
}
