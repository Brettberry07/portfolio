"use client";

import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer, useGLTF } from "@react-three/drei";
import { useReducedMotion } from "motion/react";
import { Box3, Group, Mesh, MeshStandardMaterial, Vector3 } from "three";

function Sculpture({ animate, onReady }: { animate: boolean; onReady: () => void }) {
  const { scene } = useGLTF("/models/hero-architecture.glb");
  const group = useRef<Group>(null);
  const aspect = useThree((state) => state.size.width / state.size.height);
  const object = useMemo(() => {
    let source: Mesh | undefined;
    scene.traverse((node) => { if (node instanceof Mesh && /loop/i.test(node.name) && !/footing/i.test(node.name)) source = node; });
    const clone = new Group();
    if (!source) return clone;
    const geometry = source.geometry.clone();
    geometry.center();
    // A spatial composition of the acquired CC0 mesh, sharing geometry across twelve ribs.
    for (let index = 0; index < 12; index++) {
      const rib = new Mesh(geometry, new MeshStandardMaterial({ color: index === 5 ? "#797e85" : "#b3b3a9", roughness: 0.29, metalness: 0.78 }));
      rib.scale.z = 0.27;
      rib.position.z = (index - 5.5) * 0.06;
      rib.rotation.z = (index - 5.5) * 0.035;
      clone.add(rib);
    }
    const box = new Box3().setFromObject(clone);
    const size = box.getSize(new Vector3());
    const center = box.getCenter(new Vector3());
    const scale = 3.7 / size.y;
    clone.scale.setScalar(scale);
    clone.position.copy(center.multiplyScalar(-scale));
    return clone;
  }, [scene]);
  useEffect(() => { onReady(); }, [onReady]);
  useFrame(({ clock, pointer }) => {
    if (!group.current || !animate) return;
    const t = clock.getElapsedTime();
    group.current.rotation.y = -0.72 + Math.sin(t * 0.19) * 0.1 + pointer.x * 0.07;
    group.current.rotation.z = -0.48 + Math.sin(t * 0.22) * 0.018;
    group.current.position.y = Math.sin(t * 0.36) * 0.035;
  });
  return <group ref={group} scale={Math.min(1, aspect)} rotation={[0.22, -0.72, -0.48]}><primitive object={object} /></group>;
}
function supportsWebGL() {
  try {
    const context = document.createElement("canvas").getContext("webgl2");
    if (!context) return false;
    context.getExtension("WEBGL_lose_context")?.loseContext();
    return true;
  } catch { return false; }
}
export default function SculptureCanvas({ visible }: { visible: boolean }) {
  const [supported] = useState(supportsWebGL);
  const [ready, setReady] = useState(false);
  const [lost, setLost] = useState(false);
  const reduced = useReducedMotion();
  const markReady = useCallback(() => setReady(true), []);
  if (!supported || lost) return null;
  return <div className={`sculpture-canvas ${ready ? "is-ready" : ""}`} data-testid="scene-host" data-renderer={ready ? "webgl" : "fallback"}>
    <Canvas aria-hidden="true" dpr={[1, 1.5]} camera={{ position: [3.7, 2.2, 7], fov: 35 }} frameloop={!visible || reduced ? "demand" : "always"} gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true }} onCreated={({ gl }) => {
      gl.domElement.addEventListener("webglcontextlost", () => setLost(true), { once: true });
    }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 6, 5]} intensity={3} color="#fff6e9" />
      <directionalLight position={[-4, 2, -2]} intensity={2} color="#b6c3df" />
      <Suspense fallback={null}>
        <Environment resolution={128}>
          <Lightformer intensity={3} position={[0, 4, 3]} scale={[5, 5, 1]} />
          <Lightformer intensity={2} position={[-3, 1, 1]} rotation={[0, Math.PI / 2, 0]} scale={[3, 5, 1]} />
          <Lightformer intensity={1.5} position={[3, 0, -2]} rotation={[0, -Math.PI / 2, 0]} scale={[2, 4, 1]} />
        </Environment>
        <Sculpture animate={visible && !reduced} onReady={markReady} />
        <ContactShadows position={[0, -2.05, 0]} opacity={0.28} scale={10} blur={3} far={4} frames={1} resolution={256} />
      </Suspense>
    </Canvas>
  </div>;
}
