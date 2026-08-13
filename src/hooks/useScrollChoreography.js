import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Drives the whole "one living system" scroll experience.
 *
 * - `progressRef` is a mutable ref (not React state) updated on every scroll tick with the
 *   0..1 progress through the full page. The 3D camera rig reads this directly inside
 *   useFrame so scrolling never triggers a React re-render.
 * - `activeSection` is React state that only changes when the dominant section changes,
 *   used for the section-dot navigation and lightweight per-section reveal animations.
 */
export function useScrollChoreography(sectionIds) {
  const shellRef = useRef(null);
  const sectionElsRef = useRef({});
  const progressRef = useRef(0);
  const [activeSection, setActiveSection] = useState(sectionIds[0]);

  const registerSection = useCallback((id) => (el) => {
    if (el) {
      sectionElsRef.current[id] = el;
    }
  }, []);

  useEffect(() => {
    if (!shellRef.current) return undefined;

    const triggers = [];

    triggers.push(
      ScrollTrigger.create({
        trigger: shellRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          progressRef.current = self.progress;
        },
      })
    );

    sectionIds.forEach((id) => {
      const el = sectionElsRef.current[id];
      if (!el) return;
      triggers.push(
        ScrollTrigger.create({
          trigger: el,
          start: "top 55%",
          end: "bottom 45%",
          onToggle: (self) => {
            if (self.isActive) setActiveSection(id);
          },
        })
      );
    });

    ScrollTrigger.refresh();

    return () => {
      triggers.forEach((trigger) => trigger.kill());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionIds.join(",")]);

  const scrollToSection = useCallback((id) => {
    const el = sectionElsRef.current[id];
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return { shellRef, registerSection, progressRef, activeSection, scrollToSection };
}
