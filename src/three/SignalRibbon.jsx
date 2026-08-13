import { useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec3 uColorBase;
  uniform vec3 uColorSignal;
  uniform float uSpeed;
  uniform float uDensity;
  uniform float uOpacity;
  varying vec2 vUv;

  void main() {
    float band = fract(vUv.x * uDensity - uTime * uSpeed);
    float pulse = smoothstep(0.86, 1.0, band) + smoothstep(0.14, 0.0, band);
    float edge = smoothstep(0.0, 0.2, vUv.y) * smoothstep(1.0, 0.8, vUv.y);
    vec3 color = mix(uColorBase, uColorSignal, clamp(pulse, 0.0, 1.0));
    float alpha = (0.32 + pulse * 0.68) * uOpacity * edge;
    gl_FragColor = vec4(color, alpha);
  }
`;

/**
 * A tube-geometry "signal ribbon": a thin translucent channel with a bright band of
 * light flowing along its length. Used everywhere a "living" connection is needed
 * (core veins, data paths, project-node branches) instead of a static line.
 */
export default function SignalRibbon({
  curve,
  radius = 0.018,
  radialSegments = 6,
  tubularSegments = 48,
  colorBase = "#1c2b4a",
  colorSignal = "#4fe3ff",
  speed = 0.35,
  density = 5,
  opacity = 1,
  reduceMotion = false,
}) {
  const geometry = useMemo(
    () => new THREE.TubeGeometry(curve, tubularSegments, radius, radialSegments, false),
    [curve, tubularSegments, radius, radialSegments]
  );

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uTime: { value: Math.random() * 10 },
          uColorBase: { value: new THREE.Color(colorBase) },
          uColorSignal: { value: new THREE.Color(colorSignal) },
          uSpeed: { value: speed },
          uDensity: { value: density },
          uOpacity: { value: opacity },
        },
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [colorBase, colorSignal, speed, density, opacity]
  );

  useFrame((state, delta) => {
    material.uniforms.uTime.value += reduceMotion ? delta * 0.2 : delta;
  });

  return <mesh geometry={geometry} material={material} />;
}
