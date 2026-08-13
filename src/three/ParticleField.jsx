import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { randomInSphere } from "./sceneUtils";
import { palette } from "./palette";

const vertexShader = `
  uniform float uTime;
  uniform float uSpeed;
  uniform float uAmplitude;
  uniform float uPixelRatio;
  uniform float uBaseSize;
  attribute float aSeed;
  attribute float aSize;
  varying float vSeed;

  void main() {
    vSeed = aSeed;
    vec3 pos = position;

    // Gentle quasi-orbital drift: each particle swings around a personal axis
    // instead of jittering randomly, which reads as purposeful rather than noisy.
    vec3 axis = normalize(vec3(sin(aSeed * 6.283), cos(aSeed * 4.1), sin(aSeed * 2.7)));
    float angle = sin(uTime * uSpeed + aSeed * 6.283) * uAmplitude;
    float s = sin(angle);
    float c = cos(angle);
    pos = pos * c + cross(axis, pos) * s + axis * dot(axis, pos) * (1.0 - c);

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = uBaseSize * aSize * uPixelRatio * (300.0 / -mvPosition.z);
  }
`;

const fragmentShader = `
  uniform vec3 uColor;
  uniform float uOpacity;
  varying float vSeed;

  void main() {
    vec2 centered = gl_PointCoord - 0.5;
    float dist = length(centered);
    float falloff = smoothstep(0.5, 0.0, dist);
    gl_FragColor = vec4(uColor, falloff * uOpacity);
  }
`;

export default function ParticleField({
  count = 900,
  radius = 16,
  minRadius = 3,
  baseSize = 0.05,
  speed = 0.05,
  amplitude = 0.12,
  color = palette.silver,
  targetOpacity = 0.55,
  reduceMotion = false,
}) {
  const pointsRef = useRef(null);
  const activation = useRef(0);

  const { positions, seeds, sizes } = useMemo(() => {
    const positionsArr = new Float32Array(count * 3);
    const seedsArr = new Float32Array(count);
    const sizesArr = new Float32Array(count);
    for (let i = 0; i < count; i += 1) {
      const [x, y, z] = randomInSphere(radius, minRadius);
      positionsArr.set([x, y, z], i * 3);
      seedsArr[i] = Math.random();
      sizesArr[i] = 0.5 + Math.random() * 0.9;
    }
    return { positions: positionsArr, seeds: seedsArr, sizes: sizesArr };
  }, [count, radius, minRadius]);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uTime: { value: 0 },
          uSpeed: { value: speed },
          uAmplitude: { value: reduceMotion ? amplitude * 0.25 : amplitude },
          uPixelRatio: { value: typeof window !== "undefined" ? window.devicePixelRatio : 1 },
          uBaseSize: { value: baseSize },
          uColor: { value: new THREE.Color(color) },
          uOpacity: { value: 0 },
        },
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [speed, amplitude, baseSize, color, reduceMotion]
  );

  useFrame((state, delta) => {
    if (activation.current < 1) {
      activation.current = Math.min(1, activation.current + delta * 0.3);
      material.uniforms.uOpacity.value = activation.current * targetOpacity;
    }
    material.uniforms.uTime.value += reduceMotion ? delta * 0.3 : delta;

    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * (reduceMotion ? 0.004 : 0.012);
    }
  });

  return (
    <points ref={pointsRef} material={material}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aSeed" args={[seeds, 1]} />
        <bufferAttribute attach="attributes-aSize" args={[sizes, 1]} />
      </bufferGeometry>
    </points>
  );
}
