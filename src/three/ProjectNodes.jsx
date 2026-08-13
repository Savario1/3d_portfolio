import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { PROJECT_NODE_POSITIONS } from "./sceneUtils";
import { palette } from "./palette";

function useActivationBoost(isActive) {
  const boost = useRef(0);
  useFrame((state, delta) => {
    const target = isActive ? 1 : 0;
    boost.current += (target - boost.current) * Math.min(1, delta * 4);
  });
  return boost;
}

function useLinesGeometry(pairs) {
  return useMemo(() => {
    const positions = new Float32Array(pairs.length * 6);
    pairs.forEach(([a, b], i) => {
      positions.set([a.x, a.y, a.z, b.x, b.y, b.z], i * 6);
    });
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, [pairs]);
}

function AINode({ isActive, reduceMotion }) {
  const groupRef = useRef(null);
  const boost = useActivationBoost(isActive);

  const neurons = useMemo(() => {
    const points = [];
    const count = 9;
    for (let i = 0; i < count; i += 1) {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const r = 0.85;
      points.push(
        new THREE.Vector3(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta),
          r * Math.cos(phi)
        )
      );
    }
    return points;
  }, []);

  const pairs = useMemo(() => {
    const center = new THREE.Vector3(0, 0, 0);
    const spokes = neurons.map((n) => [center, n]);
    const links = [
      [neurons[0], neurons[2]],
      [neurons[1], neurons[4]],
      [neurons[3], neurons[6]],
      [neurons[5], neurons[8]],
      [neurons[2], neurons[7]],
    ];
    return [...spokes, ...links];
  }, [neurons]);

  const lineGeometry = useLinesGeometry(pairs);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * (reduceMotion ? 0.03 : 0.09);
    const scale = 1 + boost.current * 0.18;
    groupRef.current.scale.setScalar(scale);
  });

  return (
    <group ref={groupRef} position={PROJECT_NODE_POSITIONS.ai}>
      <mesh>
        <icosahedronGeometry args={[0.32, 1]} />
        <meshStandardMaterial
          color={palette.navy800}
          emissive={palette.violet}
          emissiveIntensity={0.85}
          roughness={0.4}
          metalness={0.3}
        />
      </mesh>
      {neurons.map((position, i) => (
        <mesh key={i} position={position}>
          <sphereGeometry args={[0.055, 12, 12]} />
          <meshStandardMaterial
            color={palette.navy700}
            emissive={palette.violetSoft}
            emissiveIntensity={0.7}
          />
        </mesh>
      ))}
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial color={palette.violetSoft} transparent opacity={0.45} />
      </lineSegments>
      <pointLight color={palette.violet} intensity={0.7 + boost.current * 1.4} distance={3.5} decay={2} />
    </group>
  );
}

function CloudNode({ isActive, reduceMotion }) {
  const groupRef = useRef(null);
  const boost = useActivationBoost(isActive);

  const layout = useMemo(
    () => ({
      top: new THREE.Vector3(0, 0.55, 0),
      mid: [
        new THREE.Vector3(-0.55, 0.05, 0.12),
        new THREE.Vector3(0, 0.05, 0.2),
        new THREE.Vector3(0.55, 0.05, 0.12),
      ],
      bottom: [
        new THREE.Vector3(-0.4, -0.5, -0.05),
        new THREE.Vector3(0, -0.55, 0),
        new THREE.Vector3(0.4, -0.5, -0.05),
      ],
    }),
    []
  );

  const pairs = useMemo(() => {
    const midLinks = layout.mid.map((m) => [layout.top, m]);
    const bottomLinks = layout.mid.map((m, i) => [m, layout.bottom[i]]);
    return [...midLinks, ...bottomLinks];
  }, [layout]);

  const lineGeometry = useLinesGeometry(pairs);
  const allNodes = useMemo(() => [layout.top, ...layout.mid, ...layout.bottom], [layout]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * (reduceMotion ? -0.02 : -0.06);
    const scale = 1 + boost.current * 0.18;
    groupRef.current.scale.setScalar(scale);
  });

  return (
    <group ref={groupRef} position={PROJECT_NODE_POSITIONS.cloud}>
      {allNodes.map((position, i) => (
        <RoundedBox key={i} args={[0.26, 0.26, 0.26]} radius={0.06} smoothness={3} position={position}>
          <meshStandardMaterial
            color={palette.navy800}
            emissive={palette.cyan}
            emissiveIntensity={i === 0 ? 0.8 : 0.5}
            roughness={0.3}
            metalness={0.5}
          />
        </RoundedBox>
      ))}
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial color={palette.cyanSoft} transparent opacity={0.4} />
      </lineSegments>
      <pointLight color={palette.cyan} intensity={0.7 + boost.current * 1.4} distance={3.5} decay={2} />
    </group>
  );
}

function DataNode({ isActive, reduceMotion }) {
  const groupRef = useRef(null);
  const ringRefs = useRef([]);
  const boost = useActivationBoost(isActive);

  const rings = useMemo(
    () => [
      { radius: 0.72, tube: 0.012, tilt: 0.3, speed: 0.25, color: palette.cyanSoft },
      { radius: 0.55, tube: 0.012, tilt: -0.5, speed: -0.35, color: palette.violetSoft },
      { radius: 0.38, tube: 0.012, tilt: 0.9, speed: 0.45, color: palette.cyan },
    ],
    []
  );

  const streamPositions = useMemo(() => {
    const count = 60;
    const array = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 0.3 + Math.random() * 0.55;
      const height = (Math.random() - 0.5) * 0.4;
      array.set([Math.cos(angle) * radius, height, Math.sin(angle) * radius], i * 3);
    }
    return array;
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    ringRefs.current.forEach((ring, i) => {
      if (!ring) return;
      ring.rotation.z += delta * rings[i].speed * (reduceMotion ? 0.3 : 1);
    });
    groupRef.current.rotation.y += delta * (reduceMotion ? 0.02 : 0.05);
    const scale = 1 + boost.current * 0.18;
    groupRef.current.scale.setScalar(scale);
  });

  return (
    <group ref={groupRef} position={PROJECT_NODE_POSITIONS.data}>
      <mesh>
        <sphereGeometry args={[0.16, 16, 16]} />
        <meshStandardMaterial
          color={palette.navy800}
          emissive={palette.cyan}
          emissiveIntensity={0.85}
        />
      </mesh>
      {rings.map((ring, i) => (
        <mesh
          key={i}
          ref={(el) => {
            ringRefs.current[i] = el;
          }}
          rotation={[ring.tilt, 0, 0]}
        >
          <torusGeometry args={[ring.radius, ring.tube, 8, 64]} />
          <meshBasicMaterial color={ring.color} transparent opacity={0.55} />
        </mesh>
      ))}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[streamPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color={palette.silver}
          size={0.022}
          sizeAttenuation
          transparent
          opacity={0.7}
          depthWrite={false}
        />
      </points>
      <pointLight color={palette.cyan} intensity={0.7 + boost.current * 1.4} distance={3.5} decay={2} />
    </group>
  );
}

export default function ProjectNodes({ activeProject, reduceMotion = false }) {
  return (
    <group>
      <AINode isActive={activeProject === "ai"} reduceMotion={reduceMotion} />
      <CloudNode isActive={activeProject === "cloud"} reduceMotion={reduceMotion} />
      <DataNode isActive={activeProject === "data"} reduceMotion={reduceMotion} />
    </group>
  );
}
