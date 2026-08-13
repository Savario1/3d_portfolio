import { siteConfig } from "../../config/site";
import Button from "../ui/Button";
import ContactPortrait from "../ui/ContactPortrait";

export default function ContactSection({ sectionRef }) {
  return (
    <section id="contact" ref={sectionRef} className="section" aria-labelledby="contact-heading">
      <div className="section-inner contact__grid">
        <ContactPortrait
          src={siteConfig.assets.contactPortrait}
          alt={`Portrait of ${siteConfig.person.name}`}
        />
        <div className="glass-panel contact__copy">
          <p className="eyebrow">Contact</p>
          <h2 className="section-heading" id="contact-heading">
            Let's build what's next.
          </h2>
          <p className="section-intro">
            Open to internships, entry-level opportunities, collaborations, and conversations
            about software, AI, cloud, and data.
          </p>
          <a className="contact__email" href={`mailto:${siteConfig.person.email}`}>
            {siteConfig.person.email}
          </a>
          <div className="btn-row contact__actions">
            <Button variant="primary" href={`mailto:${siteConfig.person.email}`}>
              Email
            </Button>
            <Button
              variant="secondary"
              href={siteConfig.links.github}
              external
              disabled={!siteConfig.links.github}
            >
              GitHub
            </Button>
            <Button
              variant="secondary"
              href={siteConfig.links.linkedin}
              external
              disabled={!siteConfig.links.linkedin}
            >
              LinkedIn
            </Button>
            <Button variant="secondary" href={siteConfig.assets.resume} external>
              Download Résumé
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
