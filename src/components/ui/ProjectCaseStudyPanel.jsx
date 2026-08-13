import { useEffect, useRef } from "react";
import Button from "./Button";

const FIELD_LABELS = [
  ["overview", "Project Overview"],
  ["problem", "Problem"],
  ["architecture", "Architecture"],
  ["process", "Development Process"],
  ["challenges", "Challenges"],
  ["results", "Results"],
  ["learned", "What I Learned"],
];

export default function ProjectCaseStudyPanel({ project, onClose }) {
  const closeButtonRef = useRef(null);

  useEffect(() => {
    closeButtonRef.current?.focus();
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const { caseStudy } = project;

  return (
    <>
      <div className="case-panel-overlay" onClick={onClose} role="presentation" />
      <aside
        className="case-panel"
        data-scene={project.sceneRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-panel-heading"
      >
        <button
          type="button"
          className="icon-btn case-panel__close"
          ref={closeButtonRef}
          onClick={onClose}
          aria-label="Close project details"
        >
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>

        <p className="eyebrow case-panel__eyebrow">{project.category}</p>
        <h2 id="case-panel-heading">{project.title}</h2>
        <p className="case-panel__summary">{project.summary}</p>
        <span className="badge">{project.status}</span>

        {FIELD_LABELS.map(([key, label]) => (
          <div className="case-panel__field" key={key}>
            <h3>{label}</h3>
            <p>{caseStudy[key]}</p>
          </div>
        ))}

        <div className="case-panel__field">
          <h3>Technologies</h3>
          {caseStudy.technologies.length > 0 ? (
            <ul className="modal-panel__list">
              {caseStudy.technologies.map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
          ) : (
            <p>Details coming soon.</p>
          )}
        </div>

        <div className="case-panel__field">
          <h3>Screenshots</h3>
          <p>{caseStudy.screenshots.length > 0 ? "" : "Details coming soon."}</p>
        </div>

        <div className="case-panel__links">
          <Button href={project.github} external disabled={!project.github} small>
            GitHub Repository
          </Button>
          <Button href={project.demo} external disabled={!project.demo} small comingSoonLabel="Coming Soon">
            Live Demonstration
          </Button>
        </div>
      </aside>
    </>
  );
}
