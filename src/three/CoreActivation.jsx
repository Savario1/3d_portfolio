import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { gsap } from "gsap";
import * as THREE from "three";
import { palette } from "./palette";

export default function CoreActivation({ reduceMotion = false }) {
  const groupRef = useRef(null);
  const coreMaterialRef = useRef(null);
  const wireMaterialRef = useRef(null);
  const glowRef = useRef(null);
  const activationState = useRef({ value: 0 });

  useEffect(() => {
    const tween = gsap.to(activationState.current, {
      value: 1,
      duration: reduceMotion ? 0.6 : 2.4,
      delay: reduceMotion ? 0 : 0.5,
      ease: "power2.out",
    });
    return () => tween.kill();
  }, [reduceMotion]);

  const icosahedronGeometry = useMemo(() => new THREE.IcosahedronGeometry(0.6, 3), []);

  useFrame((state, delta) => {
    const activation = activationState.current.value;
    if (coreMaterialRef.current) {
      coreMaterialRef.current.emissiveIntensity = activation * 1.1;
    }
    if (wireMaterialRef.current) {
      wireMaterialRef.current.opacity = activation * 0.4;
    }
    if (glowRef.current) {
      const pulse = reduceMotion ? 1 : 1 + Math.sin(state.clock.elapsedTime * 1.4) * 0.06;
      glowRef.current.scale.setScalar(activation * pulse * 1.25);
      glowRef.current.material.opacity = activation * 0.2;
    }
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * (reduceMotion ? 0.02 : 0.06);
      groupRef.current.rotation.x += delta * (reduceMotion ? 0.005 : 0.015);
      const breathe = reduceMotion ? 1 : 1 + Math.sin(state.clock.elapsedTime * 0.8) * 0.03;
      groupRef.current.scale.setScalar(activation * breathe);
    }
  });

  return (
    <group ref={groupRef} scale={0}>
      <mesh geometry={icosahedronGeometry}>
        <meshStandardMaterial
          ref={coreMaterialRef}
          color={palette.navy800}
          emissive={palette.cyan}
          emissiveIntensity={0}
          roughness={0.35}
          metalness={0.4}
        />
      </mesh>
      <mesh geometry={icosahedronGeometry} scale={1.02}>
        <meshBasicMaterial
          ref={wireMaterialRef}
          color={palette.cyanSoft}
          wireframe
          transparent
          opacity={0}
        />
      </mesh>
      <mesh ref={glowRef}>
        <sphereGeometry args={[1, 24, 24]} />
        <meshBasicMaterial
          color={palette.violet}
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <pointLight color={palette.cyan} intensity={1.4} distance={6} decay={2} />
    </group>
  );
}
