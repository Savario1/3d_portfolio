import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";

/**
 * Deliberately restrained postprocessing: a soft, high-threshold bloom that only
 * catches genuinely bright emissive signals (not a wash of glow over everything),
 * plus a light vignette for depth framing. Skipped entirely on mobile/low-power
 * devices — see Experience.jsx.
 */
export default function PostFX() {
  return (
    <EffectComposer multisampling={0} enableNormalPass={false}>
      <Bloom
        mipmapBlur
        luminanceThreshold={0.4}
        luminanceSmoothing={0.85}
        intensity={0.45}
        radius={0.5}
      />
      <Vignette eskil={false} offset={0.28} darkness={0.55} />
    </EffectComposer>
  );
}
