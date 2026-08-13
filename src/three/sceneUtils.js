import * as THREE from "three";

/**
 * The camera's journey through the network, expressed as waypoints along the total
 * 0..1 scroll progress of the page. `getCameraTransform` interpolates smoothly between
 * neighboring waypoints, so the exact progress values only need to roughly match where
 * each section falls in the page — they don't need pixel-perfect alignment.
 */
export const CAMERA_WAYPOINTS = [
  { id: "hero", progress: 0, position: [0, 0.2, 9.5], lookAt: [0, 0, 0] },
  { id: "about", progress: 0.16, position: [-3.6, 0.9, 7.4], lookAt: [-0.8, 0.5, 1.6] },
  { id: "skills", progress: 0.32, position: [3.4, -0.5, 7.2], lookAt: [0.9, -0.1, 1.6] },
  { id: "projects-ai", progress: 0.46, position: [-5.8, 1.8, 2.2], lookAt: [-4.6, 1.3, -3.2] },
  { id: "projects-cloud", progress: 0.57, position: [0, 2.7, 2.7], lookAt: [0, 2, -3.6] },
  { id: "projects-data", progress: 0.68, position: [5.8, 1.8, 2.2], lookAt: [4.6, 1.3, -3.2] },
  { id: "education", progress: 0.83, position: [0, -2, 6.6], lookAt: [0, -1.3, 1.4] },
  { id: "contact", progress: 1, position: [0, 0.35, 7.6], lookAt: [0, 0.15, 0.6] },
];

export const PROJECT_NODE_POSITIONS = {
  ai: new THREE.Vector3(-4.6, 1.3, -3.2),
  cloud: new THREE.Vector3(0, 2, -3.6),
  data: new THREE.Vector3(4.6, 1.3, -3.2),
};

function smoothstep(t) {
  return t * t * (3 - 2 * t);
}

const tmpA = new THREE.Vector3();
const tmpB = new THREE.Vector3();

/** Returns { position: THREE.Vector3, lookAt: THREE.Vector3 } for a given 0..1 progress. */
export function getCameraTransform(progress, outPosition, outLookAt) {
  const clamped = THREE.MathUtils.clamp(progress, 0, 1);
  let segmentStart = CAMERA_WAYPOINTS[0];
  let segmentEnd = CAMERA_WAYPOINTS[CAMERA_WAYPOINTS.length - 1];

  for (let i = 0; i < CAMERA_WAYPOINTS.length - 1; i += 1) {
    if (clamped >= CAMERA_WAYPOINTS[i].progress && clamped <= CAMERA_WAYPOINTS[i + 1].progress) {
      segmentStart = CAMERA_WAYPOINTS[i];
      segmentEnd = CAMERA_WAYPOINTS[i + 1];
      break;
    }
  }

  const span = segmentEnd.progress - segmentStart.progress || 1;
  const localT = smoothstep(THREE.MathUtils.clamp((clamped - segmentStart.progress) / span, 0, 1));

  tmpA.set(...segmentStart.position);
  tmpB.set(...segmentEnd.position);
  outPosition.lerpVectors(tmpA, tmpB, localT);

  tmpA.set(...segmentStart.lookAt);
  tmpB.set(...segmentEnd.lookAt);
  outLookAt.lerpVectors(tmpA, tmpB, localT);

  return { position: outPosition, lookAt: outLookAt };
}

/** Deterministic pseudo-random point inside a sphere shell, used for particle placement. */
export function randomInSphere(radius, minRadius = 0) {
  const u = Math.random();
  const v = Math.random();
  const theta = 2 * Math.PI * u;
  const phi = Math.acos(2 * v - 1);
  const r = minRadius + (radius - minRadius) * Math.cbrt(Math.random());
  return [
    r * Math.sin(phi) * Math.cos(theta),
    r * Math.sin(phi) * Math.sin(theta),
    r * Math.cos(phi),
  ];
}
