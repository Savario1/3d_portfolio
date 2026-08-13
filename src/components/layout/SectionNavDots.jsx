const LABELS = {
  hero: "Home",
  about: "About",
  skills: "Skills",
  projects: "Projects",
  education: "Education",
  contact: "Contact",
};

export default function SectionNavDots({ sectionIds, activeSection, onNavigate }) {
  return (
    <nav className="section-nav" aria-label="Section navigation">
      {sectionIds.map((id) => (
        <button
          key={id}
          type="button"
          className="section-nav__item"
          data-label={LABELS[id] ?? id}
          aria-label={`Go to ${LABELS[id] ?? id} section`}
          aria-current={activeSection === id}
          onClick={() => onNavigate(id)}
        />
      ))}
    </nav>
  );
}
