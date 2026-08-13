import { useState } from "react";
import { skills } from "../../config/content";
import SectionHeading from "../ui/SectionHeading";

export default function SkillsSection({ sectionRef }) {
  const [activeNode, setActiveNode] = useState(null);

  return (
    <section id="skills" ref={sectionRef} className="section skills-circuit" aria-labelledby="skills-heading">
      <div className="section-inner">
        <SectionHeading
          eyebrow={skills.eyebrow}
          heading={skills.heading}
          intro={skills.intro}
          id="skills-heading"
          surface
        />
        <div className="skills-circuit__board">
          {skills.groups.map((group, groupIndex) => {
            const activeIndex =
              activeNode && activeNode.groupIndex === groupIndex ? activeNode.itemIndex : null;
            const pulsePosition =
              activeIndex !== null && group.items.length > 1
                ? (activeIndex / (group.items.length - 1)) * 100
                : 50;

            return (
              <div className="skills-circuit__group" key={group.label}>
                <span className="skills-circuit__group-label">{group.label}</span>
                <div className={`skills-circuit__rail${activeIndex !== null ? " is-active" : ""}`}>
                  <span
                    className="skills-circuit__pulse"
                    aria-hidden="true"
                    style={{ left: `${pulsePosition}%`, opacity: activeIndex !== null ? 1 : 0 }}
                  />
                  {group.items.map((item, itemIndex) => (
                    <button
                      type="button"
                      className="skills-circuit__node"
                      key={item}
                      onMouseEnter={() => setActiveNode({ groupIndex, itemIndex })}
                      onMouseLeave={() => setActiveNode(null)}
                      onFocus={() => setActiveNode({ groupIndex, itemIndex })}
                      onBlur={() => setActiveNode(null)}
                    >
                      <span className="skills-circuit__node-dot" aria-hidden="true" />
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
