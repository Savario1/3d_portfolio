import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { getStageColor } from "./sceneUtils";

/**
 * A key light whose color drifts through the journey's stage palette, plus a fixed
 * cool fill light, so each stage of the scroll has its own atmosphere without any
 * section looking visually identical to the last.
 */
export default function StageLighting({ progressRef }) {
  const keyLightRef = useRef(null);
  const colorRef = useRef(new THREE.Color());

  useFrame(() => {
    if (!keyLightRef.current) return;
    getStageColor(progressRef.current, colorRef.current);
    keyLightRef.current.color.copy(colorRef.current);
  });

  return (
    <>
      <directionalLight ref={keyLightRef} position={[3, 5, 3]} intensity={0.4} />
      <hemisphereLight args={["#1c2748", "#04050a", 0.35]} />
    </>
  );
}
