import { skills } from "../../config/content";
import SectionHeading from "../ui/SectionHeading";

export default function SkillsSection({ sectionRef }) {
  return (
    <section id="skills" ref={sectionRef} className="section" aria-labelledby="skills-heading">
      <div className="section-inner glass-panel">
        <SectionHeading
          eyebrow={skills.eyebrow}
          heading={skills.heading}
          intro={skills.intro}
          id="skills-heading"
        />
        <div className="skills__groups">
          {skills.groups.map((group) => (
            <div key={group.label}>
              <span className="skill-group__label">{group.label}</span>
              <div className="skill-group__nodes">
                {group.items.map((item) => (
                  <span className="skill-node" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
