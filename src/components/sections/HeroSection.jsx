import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { siteConfig } from "../../config/site";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import Button from "../ui/Button";

export default function HeroSection({ sectionRef, onOpenQuickView, onNavigate }) {
  const innerRef = useRef(null);
  const reduceMotion = usePrefersReducedMotion();

  useLayoutEffect(() => {
    if (reduceMotion || !innerRef.current) return undefined;

    // Only single-line elements (eyebrow, name) are mask-revealed via translateY —
    // that transform is a percentage of the element's own height, which multi-line
    // text can quietly redefine if it reflows (e.g. a web font swapping in), leaving
    // the transform at a stale offset. Everything else uses a plain fade + rise.
    const masks = innerRef.current.querySelectorAll(".reveal-mask__inner");
    const fades = innerRef.current.querySelectorAll(".reveal-fade");

    const tl = gsap.timeline({ delay: 0.4 });
    tl.fromTo(
      masks,
      { yPercent: 115 },
      { yPercent: 0, duration: 0.9, ease: "power4.out", stagger: 0.1, clearProps: "transform" }
    );
    tl.fromTo(
      fades,
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", stagger: 0.08, clearProps: "transform" },
      "-=0.55"
    );

    return () => tl.kill();
  }, [reduceMotion]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="section hero"
      aria-labelledby="hero-heading"
    >
      <div className="section-inner hero__inner" ref={innerRef}>
        <p className="eyebrow">
          <span className="reveal-mask">
            <span className="reveal-mask__inner">System Online</span>
          </span>
        </p>
        <h1 id="hero-heading" className="hero__name-mask">
          <span className="hero__name reveal-mask__inner">{siteConfig.person.name}</span>
        </h1>
        <p className="hero__role reveal-fade">{siteConfig.person.role}</p>
        <p className="hero__tagline reveal-fade">{siteConfig.person.tagline}</p>

        <div className="btn-row hero__actions reveal-fade">
          <Button variant="primary" magnetic onClick={() => onNavigate("projects")}>
            Explore My Work
          </Button>
          <Button variant="secondary" magnetic onClick={onOpenQuickView}>
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
