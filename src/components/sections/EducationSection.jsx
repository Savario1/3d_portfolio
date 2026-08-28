import { useEffect, useRef, useState } from "react";
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
  const itemRefs = useRef([]);
  const [activeSet, setActiveSet] = useState(() => new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setActiveSet((prev) => {
          const next = new Set(prev);
          let changed = false;
          entries.forEach((entry) => {
            const index = Number(entry.target.dataset.index);
            if (entry.isIntersecting && !next.has(index)) {
              next.add(index);
              changed = true;
            }
          });
          return changed ? next : prev;
        });
      },
      { threshold: 0.5 }
    );

    itemRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="education" ref={sectionRef} className="section education-path" aria-labelledby="education-heading">
      <div className="section-inner">
        <SectionHeading
          eyebrow={education.eyebrow}
          heading={education.heading}
          intro={education.intro}
          id="education-heading"
          surface
        />
        <ol className="education-path__list">
          {education.items.map((item, i) => (
            <li
              className={`education-path__item${activeSet.has(i) ? " is-active" : ""}`}
              key={item.credential}
              data-index={i}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
            >
              <span className="education-path__node">{ICON}</span>
              <div className="education-path__body">
                <div className="education-path__top">
                  <span className="education-path__title">{item.credential}</span>
                  <span className="badge">{item.status}</span>
                </div>
                {(item.institution || item.expected) && (
                  <p className="education-path__meta">
                    {[item.institution, item.expected].filter(Boolean).join(" · ")}
                  </p>
                )}
                <p className="education-path__note">{item.note}</p>
                {item.supportingNote && (
                  <p className="education-path__supporting-note">{item.supportingNote}</p>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
