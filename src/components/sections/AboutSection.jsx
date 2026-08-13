import { about } from "../../config/content";
import SectionHeading from "../ui/SectionHeading";

export default function AboutSection({ sectionRef }) {
  return (
    <section id="about" ref={sectionRef} className="section" aria-labelledby="about-heading">
      <div className="section-inner about__grid">
        <div className="glass-panel about__copy">
          <SectionHeading eyebrow={about.eyebrow} heading={about.heading} id="about-heading" />
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <aside className="beyond-code glass-panel">
          <span className="beyond-code__label">{about.beyondTheCode.label}</span>
          <p className="beyond-code__text">{about.beyondTheCode.text}</p>
        </aside>
      </div>
    </section>
  );
}
