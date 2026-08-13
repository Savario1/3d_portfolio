import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import SceneContent from "./SceneContent";
import PostFX from "./PostFX";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { useViewportProfile } from "../hooks/useViewportProfile";

export default function Experience({ progressRef, activeProject, onReady }) {
  const reduceMotion = usePrefersReducedMotion();
  const { isMobile, isCoarsePointer, dpr } = useViewportProfile();
  const [isTabVisible, setIsTabVisible] = useState(true);

  useEffect(() => {
    const handleVisibility = () => setIsTabVisible(!document.hidden);
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  return (
    <Canvas
      dpr={[1, dpr]}
      gl={{
        antialias: true,
        powerPreference: "high-performance",
        alpha: false,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1,
      }}
      camera={{ fov: 45, near: 0.1, far: 60, position: [0, 0.2, 9.5] }}
      frameloop={isTabVisible ? "always" : "never"}
      onCreated={() => onReady?.()}
    >
      <SceneContent
        progressRef={progressRef}
        activeProject={activeProject}
        reduceMotion={reduceMotion}
        allowParallax={!reduceMotion && !isCoarsePointer}
        particleCount={isMobile ? 320 : 900}
      />
      {!isMobile && !isCoarsePointer && <PostFX />}
    </Canvas>
  );
}
