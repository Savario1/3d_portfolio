import { about } from "../../config/content";
import SectionHeading from "../ui/SectionHeading";

export default function AboutSection({ sectionRef }) {
  return (
    <section id="about" ref={sectionRef} className="section about-pathway" aria-labelledby="about-heading">
      <div className="section-inner about-pathway__layout">
        <header className="about-pathway__intro">
          <SectionHeading eyebrow={about.eyebrow} heading={about.heading} id="about-heading" />
        </header>

        <div className="about-pathway__rail" aria-hidden="true" />

        <div className="about-pathway__stops">
          {about.paragraphs.map((paragraph, i) => (
            <p className={`about-pathway__stop${i === 1 ? " about-pathway__stop--offset" : ""}`} key={paragraph}>
              {paragraph}
            </p>
          ))}

          <aside className="about-pathway__discovery">
            <span className="about-pathway__discovery-label">{about.beyondTheCode.label}</span>
            <p>{about.beyondTheCode.text}</p>
          </aside>
        </div>
      </div>
    </section>
  );
}
