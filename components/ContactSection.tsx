"use client";

import { useState } from "react";
import SplitText from "./SplitText";
import Reveal from "./Reveal";

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="section section--contact">
      <Reveal className="section__heading" start="top 90%">
        <span className="section__eyebrow font-mono-label" data-reveal-item>
          Contact
        </span>
        <h2 className="section__title" data-reveal-item>
          <SplitText text="Tell us what you're building." start="top 90%" />
        </h2>
      </Reveal>

      <div className="contact__grid">
        <Reveal className="contact__info" stagger={0.08} start="top 85%">
          <div data-reveal-item className="contact__info-block">
            <span className="font-mono-label contact__label">General inquiries</span>
            <a href="mailto:hello@actonaughts.co" className="contact__link" data-magnetic>
              hello@actonaughts.co
            </a>
          </div>
          <div data-reveal-item className="contact__info-block">
            <span className="font-mono-label contact__label">Founders</span>
            <p className="contact__founder">Robert Slavens — Engineering</p>
            <p className="contact__founder">Chello May Harrison — Strategy</p>
          </div>
        </Reveal>

        <Reveal start="top 85%">
          {submitted ? (
            <div className="contact__success" data-reveal-item>
              <p>Thanks — we&apos;ll be in touch within one business day.</p>
            </div>
          ) : (
            <form className="contact__form" onSubmit={handleSubmit} data-reveal-item>
              <label>
                <span className="font-mono-label">Name</span>
                <input type="text" name="name" required />
              </label>
              <label>
                <span className="font-mono-label">Email</span>
                <input type="email" name="email" required />
              </label>
              <label>
                <span className="font-mono-label">What are you building?</span>
                <textarea name="message" rows={4} required />
              </label>
              <button type="submit" className="btn btn--solid" data-magnetic>
                Send message
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
