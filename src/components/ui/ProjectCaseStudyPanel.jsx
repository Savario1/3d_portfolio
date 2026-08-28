import { useEffect, useRef } from "react";
import Button from "./Button";

const LEGACY_FIELD_LABELS = [
  ["architecture", "Architecture"],
  ["results", "Results"],
  ["challenges", "Challenges"],
  ["learned", "What I Learned"],
];

function ListField({ label, items, emptyLabel }) {
  return (
    <div className="case-panel__field">
      <h3>{label}</h3>
      {items.length > 0 ? (
        <ul className="modal-panel__list">
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : (
        <p>{emptyLabel}</p>
      )}
    </div>
  );
}

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

  const { development, caseStudy } = project;

  // The legacy case-study fields (architecture, results, challenges, what-I-learned,
  // screenshots) stay in the data model for later, but only render once real content
  // exists — never as empty "coming soon" placeholders.
  const filledLegacyFields = LEGACY_FIELD_LABELS.filter(([key]) => caseStudy[key]);
  const hasScreenshots = caseStudy.screenshots.length > 0;

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

        <div className="case-panel__field">
          <h3>Project Goal</h3>
          <p className="case-panel__prose">{development.goal}</p>
        </div>

        <ListField
          label="Planned Capabilities"
          items={development.plannedCapabilities}
          emptyLabel="Not yet defined."
        />

        <ListField
          label="Confirmed Technologies"
          items={development.confirmedTechnologies}
          emptyLabel="Not yet selected."
        />

        <ListField
          label="Current Learning Focus"
          items={development.currentLearningFocus}
          emptyLabel="Not yet defined."
        />

        <div className="case-panel__field">
          <h3>Next Milestone</h3>
          <p className="case-panel__prose">{development.nextMilestone}</p>
        </div>

        {filledLegacyFields.map(([key, label]) => (
          <div className="case-panel__field" key={key}>
            <h3>{label}</h3>
            <p className="case-panel__prose">{caseStudy[key]}</p>
          </div>
        ))}

        {hasScreenshots && (
          <div className="case-panel__field">
            <h3>Screenshots</h3>
            <ul className="modal-panel__list">
              {caseStudy.screenshots.map((src) => (
                <li key={src}>{src}</li>
              ))}
            </ul>
          </div>
        )}

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
