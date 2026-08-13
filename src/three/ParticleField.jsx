import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { randomInSphere } from "./sceneUtils";
import { palette } from "./palette";

export default function ParticleField({ count = 900, radius = 16, reduceMotion = false }) {
  const pointsRef = useRef(null);
  const materialRef = useRef(null);

  const positions = useMemo(() => {
    const array = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const [x, y, z] = randomInSphere(radius, 3);
      array.set([x, y, z], i * 3);
    }
    return array;
  }, [count, radius]);

  const activation = useRef(0);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    if (activation.current < 1) {
      activation.current = Math.min(1, activation.current + delta * 0.35);
      if (materialRef.current) {
        materialRef.current.opacity = activation.current * 0.55;
      }
    }

    const speed = reduceMotion ? 0.008 : 0.02;
    pointsRef.current.rotation.y += delta * speed;
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        ref={materialRef}
        color={palette.silver}
        size={0.028}
        sizeAttenuation
        transparent
        opacity={0}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
