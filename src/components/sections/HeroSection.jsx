import { siteConfig } from "../../config/site";
import Button from "../ui/Button";

export default function HeroSection({ sectionRef, onOpenQuickView, onNavigate }) {
  return (
    <section
      id="hero"
      ref={sectionRef}
      className="section hero"
      aria-labelledby="hero-heading"
    >
      <div className="section-inner hero__inner">
        <p className="eyebrow">System Online</p>
        <h1 id="hero-heading" className="hero__name">
          {siteConfig.person.name}
        </h1>
        <p className="hero__role">{siteConfig.person.role}</p>
        <p className="hero__tagline">{siteConfig.person.tagline}</p>

        <div className="btn-row hero__actions">
          <Button variant="primary" onClick={() => onNavigate("projects")}>
            Explore My Work
          </Button>
          <Button variant="secondary" onClick={onOpenQuickView}>
            Quick View for Recruiters
          </Button>
          <Button
            variant="secondary"
            href={siteConfig.links.github}
            external
            disabled={!siteConfig.links.github}
          >
            GitHub
          </Button>
          <Button variant="secondary" href={siteConfig.assets.resume} external>
            Download Résumé
          </Button>
          <Button variant="ghost" onClick={() => onNavigate("contact")}>
            Contact
          </Button>
        </div>
      </div>

      <div className="hero__scroll-cue" aria-hidden="true">
        <span />
        Scroll
      </div>
    </section>
  );
}
