import { projects } from "../../config/projects";
import SectionHeading from "../ui/SectionHeading";
import Button from "../ui/Button";

const ICONS = {
  ai: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="2.4" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="5" cy="6" r="1.6" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="19" cy="6" r="1.6" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="5" cy="18" r="1.6" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="19" cy="18" r="1.6" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M10.3 10.7L6.2 7.2M13.7 10.7l4.1-3.5M10.3 13.3l-4.1 3.5M13.7 13.3l4.1 3.5"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  ),
  cloud: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7 17h10a3.5 3.5 0 0 0 .5-6.96A5 5 0 0 0 8 8.6 4 4 0 0 0 7 17z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  ),
  data: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 19V9M10 19V5M16 19v-7M21 19H3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

export default function ProjectsSection({ sectionRef, onSelectProject }) {
  return (
    <section id="projects" ref={sectionRef} className="section" aria-labelledby="projects-heading">
      <div className="section-inner glass-panel">
        <SectionHeading
          eyebrow="Projects in Development"
          heading="Three destinations, one network"
          intro="Each project below lives inside the same connected system. All three are actively in progress — select one to preview the case-study structure that will fill in as each build develops."
          id="projects-heading"
        />
        <div className="connected-list">
          {projects.map((project) => (
            <div className="connected-row" key={project.id}>
              <div className="connected-row__node">{ICONS[project.sceneRef]}</div>
              <div className="connected-row__body">
                <div className="connected-row__top">
                  <span className="connected-row__title">{project.title}</span>
                  <span className="badge">{project.status}</span>
                </div>
                <p className="connected-row__category">{project.category}</p>
                <p className="connected-row__summary">{project.summary}</p>
                <Button variant="secondary" small onClick={() => onSelectProject(project.id)}>
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
