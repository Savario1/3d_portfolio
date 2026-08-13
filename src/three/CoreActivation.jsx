import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { gsap } from "gsap";
import * as THREE from "three";
import { palette } from "./palette";
import SignalRibbon from "./SignalRibbon";

function OrbitRing({ tilt, radius, tube, color, ringSpeed, pulseSpeed, activationRef, reduceMotion }) {
  const ringRef = useRef(null);
  const orbitRef = useRef(null);
  const materialRef = useRef(null);

  useFrame((state, delta) => {
    const activation = activationRef.current.value;
    if (ringRef.current) ringRef.current.rotation.z += delta * ringSpeed * (reduceMotion ? 0.3 : 1);
    if (orbitRef.current) orbitRef.current.rotation.z += delta * pulseSpeed * (reduceMotion ? 0.3 : 1);
    if (materialRef.current) materialRef.current.opacity = activation * 0.55;
  });

  return (
    <group rotation={tilt}>
      <mesh ref={ringRef}>
        <torusGeometry args={[radius, tube, 8, 96]} />
        <meshBasicMaterial ref={materialRef} color={color} transparent opacity={0} />
      </mesh>
      <group ref={orbitRef}>
        <mesh position={[radius, 0, 0]}>
          <sphereGeometry args={[0.028, 10, 10]} />
          <meshBasicMaterial color={color} />
        </mesh>
      </group>
    </group>
  );
}

export default function CoreActivation({ reduceMotion = false }) {
  const groupRef = useRef(null);
  const coreMaterialRef = useRef(null);
  const wireMaterialRef = useRef(null);
  const glassMaterialRef = useRef(null);
  const glowRef = useRef(null);
  const activationState = useRef({ value: 0 });

  useEffect(() => {
    const tween = gsap.to(activationState.current, {
      value: 1,
      duration: reduceMotion ? 0.6 : 2.6,
      delay: reduceMotion ? 0 : 0.4,
      ease: "power2.out",
    });
    return () => tween.kill();
  }, [reduceMotion]);

  const innerGeometry = useMemo(() => new THREE.IcosahedronGeometry(0.38, 3), []);
  const outerGeometry = useMemo(() => new THREE.IcosahedronGeometry(1.05, 1), []);
  const glassGeometry = useMemo(() => new THREE.DodecahedronGeometry(0.78, 0), []);

  const veins = useMemo(() => {
    const dirs = [
      new THREE.Vector3(1, 0.6, 0.2),
      new THREE.Vector3(-0.8, -0.4, 0.7),
      new THREE.Vector3(0.2, -0.8, -0.6),
    ];
    return dirs.map((dir) => {
      const start = dir.clone().normalize().multiplyScalar(0.42);
      const end = dir.clone().normalize().multiplyScalar(0.92);
      const mid = start.clone().add(end).multiplyScalar(0.5);
      mid.add(new THREE.Vector3(dir.y, dir.z, dir.x).normalize().multiplyScalar(0.35));
      return new THREE.QuadraticBezierCurve3(start, mid, end);
    });
  }, []);

  useFrame((state, delta) => {
    const activation = activationState.current.value;
    if (coreMaterialRef.current) {
      coreMaterialRef.current.emissiveIntensity = activation * 1.3;
    }
    if (wireMaterialRef.current) {
      wireMaterialRef.current.opacity = activation * 0.35;
    }
    if (glassMaterialRef.current) {
      glassMaterialRef.current.opacity = activation * 0.5;
    }
    if (glowRef.current) {
      const pulse = reduceMotion ? 1 : 1 + Math.sin(state.clock.elapsedTime * 1.4) * 0.06;
      glowRef.current.scale.setScalar(activation * pulse * 1.15);
      glowRef.current.material.opacity = activation * 0.18;
    }
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * (reduceMotion ? 0.02 : 0.05);
      groupRef.current.rotation.x += delta * (reduceMotion ? 0.004 : 0.012);
      const breathe = reduceMotion ? 1 : 1 + Math.sin(state.clock.elapsedTime * 0.8) * 0.025;
      groupRef.current.scale.setScalar(activation * breathe);
    }
  });

  return (
    <group ref={groupRef} scale={0}>
      <mesh geometry={innerGeometry}>
        <meshStandardMaterial
          ref={coreMaterialRef}
          color={palette.navy800}
          emissive={palette.cyan}
          emissiveIntensity={0}
          roughness={0.3}
          metalness={0.4}
        />
      </mesh>

      <mesh geometry={glassGeometry} rotation={[0.4, 0.3, 0]}>
        <meshPhysicalMaterial
          ref={glassMaterialRef}
          color={palette.navy700}
          transparent
          opacity={0}
          roughness={0.1}
          metalness={0}
          transmission={0.75}
          thickness={0.5}
          ior={1.35}
          clearcoat={0.6}
        />
      </mesh>

      <mesh geometry={outerGeometry}>
        <meshBasicMaterial ref={wireMaterialRef} color={palette.cyanSoft} wireframe transparent opacity={0} />
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

      {veins.map((curve, i) => (
        <SignalRibbon
          key={i}
          curve={curve}
          radius={0.012}
          colorBase="#132038"
          colorSignal={i % 2 === 0 ? "#9df3ff" : "#c1b8ff"}
          speed={0.5 + i * 0.1}
          density={4}
          opacity={0.9}
          reduceMotion={reduceMotion}
        />
      ))}

      <OrbitRing
        tilt={[0.5, 0.2, 0.1]}
        radius={0.98}
        tube={0.007}
        color={palette.cyanSoft}
        ringSpeed={reduceMotion ? 0.02 : 0.12}
        pulseSpeed={reduceMotion ? 0.05 : 0.6}
        activationRef={activationState}
        reduceMotion={reduceMotion}
      />
      <OrbitRing
        tilt={[-0.35, 0.6, -0.2]}
        radius={1.18}
        tube={0.006}
        color={palette.violetSoft}
        ringSpeed={reduceMotion ? -0.015 : -0.09}
        pulseSpeed={reduceMotion ? -0.04 : -0.45}
        activationRef={activationState}
        reduceMotion={reduceMotion}
      />

      <pointLight color={palette.cyan} intensity={1.5} distance={6} decay={2} />
    </group>
  );
}
