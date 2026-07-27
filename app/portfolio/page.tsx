import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SplitText from "@/components/SplitText";
import Reveal from "@/components/Reveal";
import CaseStudyCard from "@/components/CaseStudyCard";
import FloatingMascot from "@/components/FloatingMascot";
import { caseStudies } from "@/lib/sections";

export const metadata: Metadata = {
  title: "Work — Actonaughts",
  description: "Selected full-stack engagements from Actonaughts, led by Robert Slavens and Chello May Harrison.",
};

export default function PortfolioPage() {
  return (
    <>
      <Nav />
      <main>
        <section className="portfolio-hero">
          <div className="portfolio-hero__inner">
            <span className="font-mono-label portfolio-hero__eyebrow">Selected Work</span>
            <h1 className="portfolio-hero__title">
              <SplitText text="Systems, charted and shipped." start="top 95%" />
            </h1>
            <Reveal className="portfolio-hero__sub-wrap" start="top 95%">
              <p className="portfolio-hero__sub" data-reveal-item>
                A sample of the products, platforms, and rebuilds Actonaughts has shipped —
                each one built by one accountable team from architecture to launch.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="section case-list">
          {caseStudies.map((study, i) => (
            <CaseStudyCard key={study.index} study={study} reverse={i % 2 === 1} />
          ))}
        </section>
      </main>
      <Footer />
      <FloatingMascot />
    </>
  );
}
