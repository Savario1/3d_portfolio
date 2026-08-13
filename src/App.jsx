import { Suspense, lazy, useCallback, useEffect, useMemo, useState } from "react";
import { siteConfig } from "./config/site";
import { getProjectById } from "./config/projects";
import { useScrollChoreography } from "./hooks/useScrollChoreography";
import { useWebGLSupport } from "./hooks/useWebGLSupport";
import { useAmbientAudio } from "./hooks/useAmbientAudio";

import SkipLink from "./components/layout/SkipLink";
import TopBar from "./components/layout/TopBar";
import SectionNavDots from "./components/layout/SectionNavDots";
import LoadingScreen from "./components/layout/LoadingScreen";
import StaticFallback from "./components/layout/StaticFallback";

import HeroSection from "./components/sections/HeroSection";
import AboutSection from "./components/sections/AboutSection";
import SkillsSection from "./components/sections/SkillsSection";
import ProjectsSection from "./components/sections/ProjectsSection";
import EducationSection from "./components/sections/EducationSection";
import ContactSection from "./components/sections/ContactSection";

import QuickViewModal from "./components/ui/QuickViewModal";
import ProjectCaseStudyPanel from "./components/ui/ProjectCaseStudyPanel";
import TerminalEasterEgg from "./components/ui/TerminalEasterEgg";

const Experience = lazy(() => import("./three/Experience"));

const SECTION_IDS = ["hero", "about", "skills", "projects", "education", "contact"];

export default function App() {
  const { shellRef, registerSection, progressRef, activeSection, scrollToSection } =
    useScrollChoreography(SECTION_IDS);

  const webGLSupported = useWebGLSupport();
  const { isPlaying: isAudioPlaying, toggle: toggleAudio } = useAmbientAudio();

  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [loadProgress, setLoadProgress] = useState(6);
  const [experienceReady, setExperienceReady] = useState(false);

  const selectedProject = useMemo(
    () => (selectedProjectId ? getProjectById(selectedProjectId) : null),
    [selectedProjectId]
  );

  const shouldMountExperience = webGLSupported === true;
  const isStillDetecting = webGLSupported === null;

  useEffect(() => {
    if (!shouldMountExperience) return undefined;
    if (experienceReady) return undefined;

    const interval = setInterval(() => {
      setLoadProgress((prev) => (prev >= 90 ? prev : prev + Math.random() * 12));
    }, 220);

    return () => clearInterval(interval);
  }, [shouldMountExperience, experienceReady]);

  useEffect(() => {
    if (webGLSupported === false) {
      setLoadProgress(100);
      setExperienceReady(true);
    }
  }, [webGLSupported]);

  const handleExperienceReady = useCallback(() => {
    setLoadProgress(100);
    setTimeout(() => setExperienceReady(true), 350);
  }, []);

  const activeSceneProject = selectedProject?.sceneRef ?? null;

  return (
    <>
      <SkipLink />

      {!isStillDetecting && (
        <div className="canvas-layer" aria-hidden="true">
          {shouldMountExperience ? (
            <Suspense fallback={null}>
              <Experience
                progressRef={progressRef}
                activeProject={activeSceneProject}
                onReady={handleExperienceReady}
              />
            </Suspense>
          ) : (
            <StaticFallback />
          )}
        </div>
      )}

      <LoadingScreen progress={loadProgress} isReady={experienceReady} />

      <TopBar
        name={siteConfig.person.shortName}
        onOpenQuickView={() => setIsQuickViewOpen(true)}
        isAudioPlaying={isAudioPlaying}
        onToggleAudio={toggleAudio}
      />

      <SectionNavDots
        sectionIds={SECTION_IDS}
        activeSection={activeSection}
        onNavigate={scrollToSection}
      />

      <div className="site-shell" ref={shellRef}>
        <main id="main-content">
          <HeroSection
            sectionRef={registerSection("hero")}
            onOpenQuickView={() => setIsQuickViewOpen(true)}
            onNavigate={scrollToSection}
          />
          <AboutSection sectionRef={registerSection("about")} />
          <SkillsSection sectionRef={registerSection("skills")} />
          <ProjectsSection
            sectionRef={registerSection("projects")}
            onSelectProject={setSelectedProjectId}
          />
          <EducationSection sectionRef={registerSection("education")} />
          <ContactSection sectionRef={registerSection("contact")} />
        </main>

        <footer className="site-footer">
          <p>
            © {new Date().getFullYear()} {siteConfig.person.name}. Built with React, Three.js, and
            GSAP. <a href="#hero">Back to top</a>.
          </p>
        </footer>
      </div>

      {isQuickViewOpen && <QuickViewModal onClose={() => setIsQuickViewOpen(false)} />}

      {selectedProject && (
        <ProjectCaseStudyPanel project={selectedProject} onClose={() => setSelectedProjectId(null)} />
      )}

      <button
        type="button"
        className="icon-btn terminal-toggle"
        onClick={() => setIsTerminalOpen((open) => !open)}
        aria-pressed={isTerminalOpen}
        aria-label={isTerminalOpen ? "Close terminal" : "Open terminal easter egg"}
      >
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M7 9l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 15h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      {isTerminalOpen && <TerminalEasterEgg onClose={() => setIsTerminalOpen(false)} />}
    </>
  );
}
