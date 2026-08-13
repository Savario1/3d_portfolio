import { education } from "../../config/content";
import SectionHeading from "../ui/SectionHeading";

const ICON = (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M12 4L3 8.5 12 13l9-4.5L12 4z"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
    <path d="M6 10.8V16c0 1.4 2.7 3 6 3s6-1.6 6-3v-5.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

export default function EducationSection({ sectionRef }) {
  return (
    <section id="education" ref={sectionRef} className="section" aria-labelledby="education-heading">
      <div className="section-inner glass-panel">
        <SectionHeading
          eyebrow={education.eyebrow}
          heading={education.heading}
          intro={education.intro}
          id="education-heading"
        />
        <div className="connected-list">
          {education.items.map((item) => (
            <div className="connected-row" key={item.credential}>
              <div className="connected-row__node">{ICON}</div>
              <div className="connected-row__body">
                <div className="connected-row__top">
                  <span className="connected-row__title">{item.credential}</span>
                  <span className="badge">{item.status}</span>
                </div>
                <p className="connected-row__note">{item.note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
