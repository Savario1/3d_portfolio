import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { PROJECT_NODE_POSITIONS } from "./sceneUtils";
import { palette } from "./palette";
import SignalRibbon from "./SignalRibbon";

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

function fibonacciSphere(count, radius) {
  const points = [];
  for (let i = 0; i < count; i += 1) {
    const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;
    points.push(
      new THREE.Vector3(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi)
      )
    );
  }
  return points;
}

/* ------------------------------------------------------------------ */
/* AI Engineering — an evolving neural lattice: two nested shells of    */
/* neurons, branching signal ribbons, and nodes that flicker as if      */
/* thinking.                                                            */
/* ------------------------------------------------------------------ */
function AINode({ isActive, reduceMotion }) {
  const groupRef = useRef(null);
  const neuronRefs = useRef([]);
  const boost = useActivationBoost(isActive);

  const innerNeurons = useMemo(() => fibonacciSphere(6, 0.42), []);
  const outerNeurons = useMemo(() => fibonacciSphere(11, 0.82), []);
  const allNeurons = useMemo(() => [...innerNeurons, ...outerNeurons], [innerNeurons, outerNeurons]);

  const phases = useMemo(() => allNeurons.map(() => Math.random() * Math.PI * 2), [allNeurons]);

  const branchCurves = useMemo(() => {
    const center = new THREE.Vector3(0, 0, 0);
    return [0, 2, 4, 7, 9].map((idx, i) => {
      const inner = innerNeurons[idx % innerNeurons.length];
      const outer = outerNeurons[idx % outerNeurons.length];
      const start = i % 2 === 0 ? center : inner;
      const end = i % 2 === 0 ? inner : outer;
      const mid = start.clone().add(end).multiplyScalar(0.5);
      mid.add(new THREE.Vector3(end.y, -end.x, end.z * 0.5).normalize().multiplyScalar(0.18));
      return new THREE.QuadraticBezierCurve3(start, mid, end);
    });
  }, [innerNeurons, outerNeurons]);

  const minorPairs = useMemo(() => {
    const pairs = [];
    innerNeurons.forEach((n, i) => {
      pairs.push([n, outerNeurons[(i * 2) % outerNeurons.length]]);
    });
    for (let i = 0; i < outerNeurons.length; i += 1) {
      pairs.push([outerNeurons[i], outerNeurons[(i + 3) % outerNeurons.length]]);
    }
    return pairs;
  }, [innerNeurons, outerNeurons]);

  const lineGeometry = useLinesGeometry(minorPairs);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * (reduceMotion ? 0.025 : 0.08);
      groupRef.current.rotation.z += delta * (reduceMotion ? 0.006 : 0.02);
      groupRef.current.scale.setScalar(1 + boost.current * 0.18);
    }
    const t = state.clock.elapsedTime;
    neuronRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const flicker = reduceMotion ? 0.7 : 0.6 + Math.sin(t * 1.6 + phases[i]) * 0.4;
      mesh.material.emissiveIntensity = 0.55 + flicker * 0.6;
    });
  });

  return (
    <group ref={groupRef} position={PROJECT_NODE_POSITIONS.ai}>
      <mesh>
        <icosahedronGeometry args={[0.24, 1]} />
        <meshStandardMaterial
          color={palette.navy800}
          emissive={palette.violet}
          emissiveIntensity={1}
          roughness={0.4}
          metalness={0.3}
        />
      </mesh>

      {allNeurons.map((position, i) => (
        <mesh
          key={i}
          position={position}
          ref={(el) => {
            neuronRefs.current[i] = el;
          }}
        >
          <sphereGeometry args={[i < innerNeurons.length ? 0.06 : 0.045, 12, 12]} />
          <meshStandardMaterial color={palette.navy700} emissive={palette.violetSoft} emissiveIntensity={0.7} />
        </mesh>
      ))}

      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial color={palette.violetSoft} transparent opacity={0.22} />
      </lineSegments>

      {branchCurves.map((curve, i) => (
        <SignalRibbon
          key={i}
          curve={curve}
          radius={0.01}
          colorBase="#1a1440"
          colorSignal={i % 2 === 0 ? "#c1b8ff" : "#9df3ff"}
          speed={0.6 + i * 0.08}
          density={4}
          opacity={0.85}
          reduceMotion={reduceMotion}
        />
      ))}

      <pointLight color={palette.violet} intensity={0.7 + boost.current * 1.4} distance={3.5} decay={2} />
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* AWS Cloud — floating architectural platforms at varied heights,      */
/* gently bobbing, linked by curved traffic-carrying pathways. No       */
/* logos or claimed services — purely an abstract distributed system.   */
/* ------------------------------------------------------------------ */
function CloudNode({ isActive, reduceMotion }) {
  const groupRef = useRef(null);
  const platformRefs = useRef([]);
  const boost = useActivationBoost(isActive);

  const platforms = useMemo(
    () => [
      { pos: new THREE.Vector3(0, 0.62, 0), size: [0.5, 0.05, 0.32], phase: 0 },
      { pos: new THREE.Vector3(-0.68, 0.12, 0.22), size: [0.34, 0.045, 0.26], phase: 1.1 },
      { pos: new THREE.Vector3(0.6, 0.02, -0.18), size: [0.4, 0.045, 0.3], phase: 2.3 },
      { pos: new THREE.Vector3(-0.32, -0.42, -0.3), size: [0.3, 0.04, 0.22], phase: 3.6 },
      { pos: new THREE.Vector3(0.36, -0.58, 0.14), size: [0.32, 0.04, 0.24], phase: 4.4 },
    ],
    []
  );

  const arcs = useMemo(() => {
    const top = platforms[0].pos;
    return platforms.slice(1).map((p) => {
      const mid = top.clone().add(p.pos).multiplyScalar(0.5);
      mid.y += 0.22;
      return new THREE.QuadraticBezierCurve3(top, mid, p.pos);
    });
  }, [platforms]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * (reduceMotion ? -0.015 : -0.05);
      groupRef.current.scale.setScalar(1 + boost.current * 0.16);
    }
    const t = state.clock.elapsedTime;
    platformRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const bob = reduceMotion ? 0 : Math.sin(t * 0.6 + platforms[i].phase) * 0.035;
      mesh.position.y = platforms[i].pos.y + bob;
    });
  });

  return (
    <group ref={groupRef} position={PROJECT_NODE_POSITIONS.cloud}>
      {platforms.map((platform, i) => (
        <RoundedBox
          key={i}
          args={platform.size}
          radius={0.02}
          smoothness={3}
          position={platform.pos}
          ref={(el) => {
            platformRefs.current[i] = el;
          }}
        >
          <meshPhysicalMaterial
            color={palette.navy800}
            emissive={palette.cyan}
            emissiveIntensity={i === 0 ? 0.7 : 0.4}
            roughness={0.2}
            metalness={0.2}
            transmission={0.4}
            thickness={0.3}
            ior={1.3}
          />
        </RoundedBox>
      ))}

      {arcs.map((curve, i) => (
        <SignalRibbon
          key={i}
          curve={curve}
          radius={0.009}
          colorBase="#0d2436"
          colorSignal="#9df3ff"
          speed={0.4 + i * 0.12}
          density={5}
          opacity={0.8}
          reduceMotion={reduceMotion}
        />
      ))}

      <pointLight color={palette.cyan} intensity={0.7 + boost.current * 1.4} distance={3.5} decay={2} />
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Data Analytics — a data observatory: an illuminated wave-grid        */
/* (GPU-displaced, oscilloscope-like) with flowing ribbon arcs above    */
/* it. A completely flat, horizontal silhouette unlike the other two.   */
/* ------------------------------------------------------------------ */
const waveVertexShader = `
  uniform float uTime;
  varying float vHeight;
  void main() {
    vec3 pos = position;
    float h = sin(pos.x * 3.1 + uTime * 0.6) * 0.07 + cos(pos.y * 2.4 - uTime * 0.45) * 0.05;
    pos.z += h;
    vHeight = h;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const waveFragmentShader = `
  uniform vec3 uColorLow;
  uniform vec3 uColorHigh;
  uniform float uOpacity;
  varying float vHeight;
  void main() {
    vec3 color = mix(uColorLow, uColorHigh, smoothstep(-0.07, 0.12, vHeight));
    gl_FragColor = vec4(color, uOpacity);
  }
`;

function DataNode({ isActive, reduceMotion }) {
  const groupRef = useRef(null);
  const boost = useActivationBoost(isActive);

  const waveGeometry = useMemo(() => new THREE.PlaneGeometry(2.1, 1.5, 28, 20), []);
  const waveMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: waveVertexShader,
        fragmentShader: waveFragmentShader,
        wireframe: true,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uTime: { value: 0 },
          uColorLow: { value: new THREE.Color(palette.navy700) },
          uColorHigh: { value: new THREE.Color(palette.cyanSoft) },
          uOpacity: { value: 0.55 },
        },
      }),
    []
  );

  const arcs = useMemo(() => {
    const a = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(-0.7, 0.1, -0.5),
      new THREE.Vector3(0, 0.55, 0),
      new THREE.Vector3(0.7, 0.1, 0.5)
    );
    const b = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(-0.55, 0.3, 0.45),
      new THREE.Vector3(0.1, 0.42, 0),
      new THREE.Vector3(0.6, 0.28, -0.4)
    );
    return [a, b];
  }, []);

  useFrame((state, delta) => {
    waveMaterial.uniforms.uTime.value += reduceMotion ? delta * 0.25 : delta;
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * (reduceMotion ? 0.015 : 0.045);
      groupRef.current.scale.setScalar(1 + boost.current * 0.16);
    }
  });

  return (
    <group ref={groupRef} position={PROJECT_NODE_POSITIONS.data} rotation={[-1.05, 0.2, 0]}>
      <mesh geometry={waveGeometry} material={waveMaterial} />

      <mesh position={[0, 0.02, 0]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color={palette.navy800} emissive={palette.cyan} emissiveIntensity={0.9} />
      </mesh>

      {arcs.map((curve, i) => (
        <SignalRibbon
          key={i}
          curve={curve}
          radius={0.012}
          colorBase="#0d2436"
          colorSignal={i === 0 ? "#5ff0d9" : "#9df3ff"}
          speed={0.32 + i * 0.1}
          density={5}
          opacity={0.85}
          reduceMotion={reduceMotion}
        />
      ))}

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
