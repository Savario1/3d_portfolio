import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { PROJECT_NODE_POSITIONS } from "./sceneUtils";
import { palette } from "./palette";

const ORIGIN = new THREE.Vector3(0, 0, 0);

function buildCurve(target, liftY) {
  const mid = new THREE.Vector3().lerpVectors(ORIGIN, target, 0.5);
  mid.y += liftY;
  return new THREE.QuadraticBezierCurve3(ORIGIN, mid, target);
}

const PATHS = [
  { id: "ai", target: PROJECT_NODE_POSITIONS.ai, lift: 0.9, color: palette.violetSoft },
  { id: "cloud", target: PROJECT_NODE_POSITIONS.cloud, lift: 1.3, color: palette.cyanSoft },
  { id: "data", target: PROJECT_NODE_POSITIONS.data, lift: 0.9, color: palette.violetSoft },
];

function SignalPulse({ curve, speed, color, reduceMotion }) {
  const ref = useRef(null);
  const offset = useMemo(() => Math.random(), []);

  useFrame((state) => {
    if (!ref.current || reduceMotion) return;
    const t = (state.clock.elapsedTime * speed + offset) % 1;
    const point = curve.getPointAt(t);
    ref.current.position.copy(point);
    const fade = Math.sin(t * Math.PI);
    ref.current.material.opacity = fade;
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshBasicMaterial color={color} transparent opacity={0} blending={THREE.AdditiveBlending} />
    </mesh>
  );
}

export default function DataPaths({ reduceMotion = false }) {
  const tubes = useMemo(
    () =>
      PATHS.map((path) => {
        const curve = buildCurve(path.target, path.lift);
        const geometry = new THREE.TubeGeometry(curve, 48, 0.012, 6, false);
        return { ...path, curve, geometry };
      }),
    []
  );

  return (
    <group>
      {tubes.map((path) => (
        <group key={path.id}>
          <mesh geometry={path.geometry}>
            <meshBasicMaterial color={path.color} transparent opacity={0.28} />
          </mesh>
          {!reduceMotion && (
            <>
              <SignalPulse curve={path.curve} speed={0.12} color={path.color} reduceMotion={reduceMotion} />
              <SignalPulse curve={path.curve} speed={0.09} color={path.color} reduceMotion={reduceMotion} />
            </>
          )}
        </group>
      ))}
    </group>
  );
}
