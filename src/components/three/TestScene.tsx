"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Center } from "@react-three/drei";
import { useReducedMotion } from "motion/react";
import type { Group } from "three";
import { SceneFallback } from "./SceneFallback";

function FrameStudy({ animate }: { animate: boolean }) {
  const group = useRef<Group>(null);
  useFrame((_, delta) => {
    if (group.current && animate) group.current.rotation.y += Math.min(delta, 0.05) * 0.16;
  });

  return (
    <Center>
      <group ref={group} rotation={[0.12, -0.45, 0.05]}>
        {[-0.45, 0, 0.45].map((z, index) => (
          <group key={z} position={[0, 0, z]}>
            {([-1, 1] as const).map((side) => (
              <mesh key={`pillar-${side}`} position={[side * 0.8, 0, 0]}>
                <boxGeometry args={[0.16, 2.2, 0.16]} />
                <meshStandardMaterial color={index === 1 ? "#ffac42" : "#333333"} roughness={0.65} />
              </mesh>
            ))}
            {([-1, 1] as const).map((side) => (
              <mesh key={`beam-${side}`} position={[0, side * 1.02, 0]}>
                <boxGeometry args={[1.6, 0.16, 0.16]} />
                <meshStandardMaterial color={index === 1 ? "#ffac42" : "#333333"} roughness={0.65} />
              </mesh>
            ))}
          </group>
        ))}
      </group>
    </Center>
  );
}

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("webgl2");
    if (!context) return false;
    context.getExtension("WEBGL_lose_context")?.loseContext();
    return true;
  } catch { return false; }
}

export default function TestScene() {
  // This component is only loaded through the ssr:false boundary.
  const [supported] = useState(supportsWebGL);
  const [ready, setReady] = useState(false);
  const [contextLost, setContextLost] = useState(false);
  const [visible, setVisible] = useState(false);
  const host = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    if (host.current) observer.observe(host.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={host} className="scene-canvas" data-testid="scene-host" data-renderer={ready && !contextLost ? "webgl" : "fallback"}>
      {(!ready || !supported || contextLost) && <SceneFallback />}
      {supported && !contextLost && (
        <Canvas
          aria-hidden="true"
          dpr={[1, 1.5]}
          camera={{ position: [3, 2.1, 5], fov: 38 }}
          frameloop={reduceMotion || !visible ? "demand" : "always"}
          fallback={<SceneFallback />}
          onCreated={({ gl }) => {
            gl.domElement.addEventListener("webglcontextlost", () => setContextLost(true), { once: true });
            setReady(true);
          }}
        >
          <color attach="background" args={["#eeeee8"]} />
          <ambientLight intensity={1.6} />
          <directionalLight position={[3, 5, 4]} intensity={3} />
          <FrameStudy animate={!reduceMotion && visible} />
        </Canvas>
      )}
    </div>
  );
}
