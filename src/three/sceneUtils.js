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
  { id: "education", progress: 0.83, position: [-2.2, -2, 6.6], lookAt: [-1.8, -1.3, 1.4] },
  { id: "contact", progress: 1, position: [0, 0.35, 7.6], lookAt: [0, 0.15, 0.6] },
];

export const PROJECT_NODE_POSITIONS = {
  ai: new THREE.Vector3(-4.6, 1.3, -3.2),
  cloud: new THREE.Vector3(0, 2, -3.6),
  data: new THREE.Vector3(4.6, 1.3, -3.2),
};

/** Stage lighting stops: the world's key light drifts through these colors as the
 * visitor scrolls, so each stage of the journey has its own atmosphere. */
export const STAGE_LIGHT_STOPS = [
  { progress: 0, color: "#4fe3ff" },
  { progress: 0.16, color: "#8c7bff" },
  { progress: 0.32, color: "#4fe3ff" },
  { progress: 0.46, color: "#8c7bff" },
  { progress: 0.57, color: "#4fe3ff" },
  { progress: 0.68, color: "#5ff0d9" },
  { progress: 0.83, color: "#b7adff" },
  { progress: 1, color: "#ffd9a8" },
];

const colorA = new THREE.Color();
const colorB = new THREE.Color();

export function getStageColor(progress, outColor) {
  const clamped = THREE.MathUtils.clamp(progress, 0, 1);
  let start = STAGE_LIGHT_STOPS[0];
  let end = STAGE_LIGHT_STOPS[STAGE_LIGHT_STOPS.length - 1];

  for (let i = 0; i < STAGE_LIGHT_STOPS.length - 1; i += 1) {
    if (clamped >= STAGE_LIGHT_STOPS[i].progress && clamped <= STAGE_LIGHT_STOPS[i + 1].progress) {
      start = STAGE_LIGHT_STOPS[i];
      end = STAGE_LIGHT_STOPS[i + 1];
      break;
    }
  }

  const span = end.progress - start.progress || 1;
  const localT = smoothstep(THREE.MathUtils.clamp((clamped - start.progress) / span, 0, 1));

  colorA.set(start.color);
  colorB.set(end.color);
  outColor.copy(colorA).lerp(colorB, localT);
  return outColor;
}

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
