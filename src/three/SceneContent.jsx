import CoreActivation from "./CoreActivation";
import ParticleField from "./ParticleField";
import DataPaths from "./DataPaths";
import ProjectNodes from "./ProjectNodes";
import CameraRig from "./CameraRig";
import StageLighting from "./StageLighting";
import { palette } from "./palette";

export default function SceneContent({
  progressRef,
  activeProject,
  reduceMotion,
  allowParallax,
  particleCount,
}) {
  return (
    <>
      <color attach="background" args={[palette.void]} />
      <fogExp2 attach="fog" args={[palette.void, 0.035]} />

      <ambientLight color={palette.navy700} intensity={0.32} />
      <directionalLight position={[-5, -3, -4]} color={palette.violet} intensity={0.16} />
      <StageLighting progressRef={progressRef} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.6, 0]}>
        <circleGeometry args={[6, 48]} />
        <meshPhysicalMaterial
          color={palette.navy900}
          transparent
          opacity={0.4}
          roughness={0.15}
          metalness={0.1}
          transmission={0.55}
          thickness={0.6}
          ior={1.2}
        />
      </mesh>

      <ParticleField
        count={Math.round(particleCount * 0.65)}
        radius={19}
        minRadius={9}
        baseSize={0.04}
        speed={0.035}
        amplitude={0.08}
        color={palette.silver}
        targetOpacity={0.4}
        reduceMotion={reduceMotion}
      />
      <ParticleField
        count={Math.round(particleCount * 0.35)}
        radius={8}
        minRadius={2.5}
        baseSize={0.065}
        speed={0.08}
        amplitude={0.18}
        color={palette.cyanSoft}
        targetOpacity={0.5}
        reduceMotion={reduceMotion}
      />
      <CoreActivation reduceMotion={reduceMotion} />
      <DataPaths reduceMotion={reduceMotion} />
      <ProjectNodes activeProject={activeProject} reduceMotion={reduceMotion} />

      <CameraRig
        progressRef={progressRef}
        activeProject={activeProject}
        reduceMotion={reduceMotion}
        allowParallax={allowParallax}
      />
    </>
  );
}
