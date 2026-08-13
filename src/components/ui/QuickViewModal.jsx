import { useEffect, useRef } from "react";
import { siteConfig } from "../../config/site";
import { about, skills, education } from "../../config/content";
import { projects } from "../../config/projects";
import Button from "./Button";

export default function QuickViewModal({ onClose }) {
  const closeButtonRef = useRef(null);
  const overlayRef = useRef(null);

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

  const handleOverlayClick = (event) => {
    if (event.target === overlayRef.current) onClose();
  };

  const allSkills = skills.groups.flatMap((group) => group.items);

  return (
    <div
      className="modal-overlay"
      ref={overlayRef}
      onMouseDown={handleOverlayClick}
      role="presentation"
    >
      <div
        className="modal-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="quick-view-heading"
      >
        <button
          type="button"
          className="icon-btn modal-panel__close"
          ref={closeButtonRef}
          onClick={onClose}
          aria-label="Close quick view"
        >
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>

        <p className="eyebrow modal-panel__eyebrow">Recruiter Quick View</p>
        <h2 id="quick-view-heading">{siteConfig.person.name}</h2>
        <p className="section-intro">{siteConfig.person.role}</p>

        <section className="modal-panel__section">
          <h3>About</h3>
          <p>{about.paragraphs[0]}</p>
        </section>

        <section className="modal-panel__section">
          <h3>Skills</h3>
          <ul className="modal-panel__list">
            {allSkills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </section>

        <section className="modal-panel__section">
          <h3>Education &amp; Certifications</h3>
          <div>
            {education.items.map((item) => (
              <div className="modal-panel__row" key={item.credential}>
                <span className="modal-panel__row-label">{item.credential}</span>
                <span className="modal-panel__row-meta">{item.status}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="modal-panel__section">
          <h3>Project Status</h3>
          <div>
            {projects.map((project) => (
              <div className="modal-panel__row" key={project.id}>
                <span className="modal-panel__row-label">{project.title}</span>
                <span className="modal-panel__row-meta">{project.status}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="modal-panel__section">
          <h3>Contact</h3>
          <p>
            <a href={`mailto:${siteConfig.person.email}`}>{siteConfig.person.email}</a>
          </p>
          <div className="btn-row" style={{ marginTop: "1rem" }}>
            <Button href={siteConfig.links.github} external disabled={!siteConfig.links.github} small>
              GitHub
            </Button>
            <Button href={siteConfig.links.linkedin} external disabled={!siteConfig.links.linkedin} small>
              LinkedIn
            </Button>
            <Button href={siteConfig.assets.resume} variant="primary" small external>
              Download Résumé
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
