import { useMemo } from "react";
import * as THREE from "three";
import { PROJECT_NODE_POSITIONS } from "./sceneUtils";
import SignalRibbon from "./SignalRibbon";

const ORIGIN = new THREE.Vector3(0, 0, 0);

function buildCurve(target, liftY) {
  const mid = new THREE.Vector3().lerpVectors(ORIGIN, target, 0.5);
  mid.y += liftY;
  return new THREE.QuadraticBezierCurve3(ORIGIN, mid, target);
}

const PATHS = [
  { id: "ai", target: PROJECT_NODE_POSITIONS.ai, lift: 1.4, colorSignal: "#c1b8ff" },
  { id: "cloud", target: PROJECT_NODE_POSITIONS.cloud, lift: 2, colorSignal: "#9df3ff" },
  { id: "data", target: PROJECT_NODE_POSITIONS.data, lift: 1.4, colorSignal: "#5ff0d9" },
];

export default function DataPaths({ reduceMotion = false }) {
  const paths = useMemo(
    () => PATHS.map((path) => ({ ...path, curve: buildCurve(path.target, path.lift) })),
    []
  );

  return (
    <group>
      {paths.map((path) => (
        <SignalRibbon
          key={path.id}
          curve={path.curve}
          radius={0.02}
          colorBase={"#101a30"}
          colorSignal={path.colorSignal}
          speed={0.28}
          density={7}
          opacity={0.85}
          reduceMotion={reduceMotion}
        />
      ))}
    </group>
  );
}
