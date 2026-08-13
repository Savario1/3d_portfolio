import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { getCameraTransform, PROJECT_NODE_POSITIONS } from "./sceneUtils";

const targetPosition = new THREE.Vector3();
const targetLookAt = new THREE.Vector3();
const currentLookAt = new THREE.Vector3(0, 0, 0);
const pointerOffset = new THREE.Vector3();
const focusOverride = new THREE.Vector3();

export default function CameraRig({ progressRef, activeProject, reduceMotion, allowParallax }) {
  const { camera } = useThree();
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!allowParallax) return undefined;
    const handlePointerMove = (event) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [allowParallax]);

  useFrame((state, delta) => {
    getCameraTransform(progressRef.current, targetPosition, targetLookAt);

    if (activeProject && PROJECT_NODE_POSITIONS[activeProject]) {
      focusOverride.copy(PROJECT_NODE_POSITIONS[activeProject]);
      targetLookAt.lerp(focusOverride, 0.6);
    }

    if (allowParallax) {
      const damp = Math.min(1, delta * 3);
      pointerOffset.x += (pointer.current.x * 0.35 - pointerOffset.x) * damp;
      pointerOffset.y += (-pointer.current.y * 0.22 - pointerOffset.y) * damp;
      targetPosition.x += pointerOffset.x;
      targetPosition.y += pointerOffset.y;
    }

    const positionDamp = reduceMotion ? 1 : Math.min(1, delta * 2.2);
    camera.position.lerp(targetPosition, positionDamp);

    const lookAtDamp = reduceMotion ? 1 : Math.min(1, delta * 2.2);
    currentLookAt.lerp(targetLookAt, lookAtDamp);
    camera.lookAt(currentLookAt);
  });

  return null;
}
