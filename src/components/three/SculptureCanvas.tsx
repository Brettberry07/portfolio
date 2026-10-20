"use client";

import { Suspense, useCallback, useEffect, useMemo, useRef, useState, type RefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer, useGLTF } from "@react-three/drei";
import { useReducedMotion } from "motion/react";
import { Box3, Group, Mesh, MeshStandardMaterial, Vector3 } from "three";

function Sculpture({ animate, onReady, pointer }: { animate: boolean; onReady: () => void; pointer: RefObject<{ x: number; y: number }> }) {
  const { scene } = useGLTF("/models/abstract-cubes.glb");
  const group = useRef<Group>(null);
  const aspect = useThree((state) => state.size.width / state.size.height);
  const object = useMemo(() => {
    // Supplied Andyleth sculpture, converted from FBX without changing its geometry.
    const source = scene.getObjectByName("Cube-04");
    if (!(source instanceof Mesh)) throw new Error("The supplied architectural sculpture is missing.");
    const clone = new Group();
    const sculpture = new Mesh(source.geometry, new MeshStandardMaterial({ color: "#242720", roughness: 0.82, metalness: 0.06 }));
    clone.add(sculpture);
    const box = new Box3().setFromObject(clone);
    const size = box.getSize(new Vector3());
    const center = box.getCenter(new Vector3());
    const scale = 4.4 / size.y;
    clone.scale.setScalar(scale);
    clone.position.copy(center.multiplyScalar(-scale));
    return clone;
  }, [scene]);
  useEffect(() => { onReady(); }, [onReady]);
  useFrame(({ clock }) => {
    if (!group.current || !animate) return;
    const t = clock.getElapsedTime();
    group.current.rotation.y = -0.22 + Math.sin(t * 0.15) * 0.065 + pointer.current.x * 0.055;
    group.current.rotation.x = 0.06 + pointer.current.y * 0.025;
    group.current.rotation.z = -0.12 + Math.sin(t * 0.22) * 0.018;
    group.current.position.y = Math.sin(t * 0.36) * 0.035;
  });
  return <group ref={group} scale={Math.min(1, aspect)} rotation={[0.06, -0.22, -0.12]}><primitive object={object} /></group>;
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
  const pointer = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const hero = document.getElementById("home");
    if (!hero || reduced || !matchMedia("(hover:hover) and (pointer:fine)").matches) return;
    // Listen on the semantic hero so the decorative canvas never intercepts links or touch.
    const move = (event: PointerEvent) => {
      const bounds = hero.getBoundingClientRect();
      pointer.current.x = Math.max(-1, Math.min(1, ((event.clientX - bounds.left) / bounds.width) * 2 - 1));
      pointer.current.y = Math.max(-1, Math.min(1, ((event.clientY - bounds.top) / bounds.height) * 2 - 1));
    };
    const reset = () => { pointer.current.x = 0; pointer.current.y = 0; };
    hero.addEventListener("pointermove", move, { passive: true });
    hero.addEventListener("pointerleave", reset);
    return () => { hero.removeEventListener("pointermove", move); hero.removeEventListener("pointerleave", reset); reset(); };
  }, [reduced]);
  const markReady = useCallback(() => setReady(true), []);
  if (!supported || lost) return null;
  return <div className={`sculpture-canvas ${ready ? "is-ready" : ""}`} data-testid="scene-host" data-renderer={ready ? "webgl" : "fallback"}>
    <Canvas aria-hidden="true" dpr={[1, 1.5]} camera={{ position: [4.4, 2.7, 7.3], fov: 35 }} frameloop={!visible || reduced ? "demand" : "always"} gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true }} onCreated={({ gl }) => {
      gl.domElement.addEventListener("webglcontextlost", () => setLost(true), { once: true });
    }}>
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 6, 5]} intensity={3.2} color="#fff6e9" />
      <directionalLight position={[-4, 2, -2]} intensity={1.4} color="#b6c3df" />
      <Suspense fallback={null}>
        <Environment resolution={128}>
          <Lightformer intensity={3} position={[0, 4, 3]} scale={[5, 5, 1]} />
          <Lightformer intensity={2} position={[-3, 1, 1]} rotation={[0, Math.PI / 2, 0]} scale={[3, 5, 1]} />
          <Lightformer intensity={1.5} position={[3, 0, -2]} rotation={[0, -Math.PI / 2, 0]} scale={[2, 4, 1]} />
        </Environment>
        <Sculpture animate={visible && !reduced} onReady={markReady} pointer={pointer} />
        <ContactShadows position={[0, -2.6, 0]} opacity={0.18} scale={10} blur={3} far={4} frames={1} resolution={256} />
      </Suspense>
    </Canvas>
  </div>;
}
