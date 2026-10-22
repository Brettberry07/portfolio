"use client";

import { Suspense, useCallback, useEffect, useMemo, useRef, useState, type RefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, PerspectiveCamera as StudioCamera, useGLTF } from "@react-three/drei";
import { type MotionValue } from "motion/react";
import { Box3, Group, Mesh, MeshStandardMaterial, PerspectiveCamera, Vector3 } from "three";
import { useMotionPreference } from "@/components/motion/useMotionPreference";

export type SculptureTransforms = Record<"progress" | "scale" | "rotationX" | "rotationY" | "x" | "y" | "z", MotionValue<number>>;

function ResponsiveCamera() {
  const canvasWidth = useThree((state) => state.size.width);
  const width = Math.min(canvasWidth, window.innerWidth);
  const position: [number, number, number] = width <= 600 ? [6.7, 4.2, 9.7] : width <= 1000 ? [6.3, 3.8, 9.4] : [5.8, 3.6, 8.2];
  // Overscan adds vertical drawing room without enlarging or clipping the model.
  const fov = width <= 600 ? 34 : width <= 1000 ? 43.2053 : 40.4751;
  return <StudioCamera makeDefault position={position} fov={fov} onUpdate={(camera) => camera.lookAt(0, 0, 0)} />;
}

function Sculpture({ animate, reduced, onReady, pointer, transforms }: { animate: boolean; reduced: boolean; onReady: () => void; pointer: RefObject<{ x: number; y: number }>; transforms: SculptureTransforms }) {
  const { scene } = useGLTF("/models/geometric-frames.glb");
  const group = useRef<Group>(null);
  const { size, camera, gl } = useThree();
  const layoutWidth = Math.min(size.width, window.innerWidth);
  const mobile = layoutWidth <= 600;
  const tablet = layoutWidth > 600 && layoutWidth <= 1000;
  const object = useMemo(() => {
    // Preserve the supplied parallel frames and the full winding line between them.
    const assembly = scene.clone(true);
    const bounds = new Box3().setFromObject(assembly);
    const center = bounds.getCenter(new Vector3());
    const normalization = 3.5 / bounds.getSize(new Vector3()).y;
    assembly.traverse((child) => {
      if (!(child instanceof Mesh)) return;
      child.geometry = child.geometry.clone();
      child.geometry.translate(-center.x, -center.y, -center.z);
      child.geometry.scale(normalization, normalization, normalization);
      child.material = (child.material as MeshStandardMaterial).clone();
    });
    return assembly;
  }, [scene]);

  useEffect(() => () => object.traverse((child) => {
    if (child instanceof Mesh) { child.geometry.dispose(); (child.material as MeshStandardMaterial).dispose(); }
  }), [object]);

  useEffect(() => { onReady(); }, [onReady]);
  useEffect(() => {
    // Read-only inspection hook: tests sample actual Three transforms without
    // React renders or per-frame DOM writes. Also catches accidental camera resize.
    const canvas = gl.domElement as HTMLCanvasElement & { sculptureSnapshot?: () => unknown };
    Object.defineProperty(canvas, "sculptureSnapshot", { configurable: true, value: () => ({
      progress: transforms.progress.get(),
      targetScale: reduced ? 1 : transforms.scale.get(),
      scale: group.current?.scale.toArray(),
      rotation: group.current?.rotation.toArray().slice(0, 3),
      position: group.current?.position.toArray(),
      camera: camera.position.toArray(),
      aspect: camera instanceof PerspectiveCamera ? camera.aspect : null,
      width: canvas.width, height: canvas.height,
    }) });
    return () => { Reflect.deleteProperty(canvas, "sculptureSnapshot"); };
  }, [camera, gl, reduced, transforms]);

  useFrame(({ clock }) => {
    if (!group.current) return;
    const scroll = reduced ? 0 : transforms.progress.get();
    const base = mobile ? 0.6864 : tablet ? 0.528 : 0.704;
    group.current.scale.setScalar(base * (reduced ? 1 : transforms.scale.get()));
    group.current.rotation.x = reduced ? 0.06 : 0.06 + (transforms.rotationX.get() - 0.06) * (mobile ? 0.5 : 1) + pointer.current.y * 0.012;
    group.current.rotation.y = reduced ? -0.19 : -0.19 + (transforms.rotationY.get() + 0.19) * (mobile ? 0.5 : 1) + pointer.current.x * 0.02;
    // Idle motion has no scale component and fades out as the hero exits.
    group.current.rotation.z = animate ? Math.sin(clock.getElapsedTime() * 0.18) * 0.009 * (1 - scroll) : 0;
    group.current.position.set(reduced ? 0 : transforms.x.get(), reduced ? 0 : transforms.y.get(), reduced ? 0 : transforms.z.get());
  });
  return <group ref={group} rotation={[0.06, -0.19, 0]}><primitive object={object} /></group>;
}

function supportsWebGL() {
  try {
    const context = document.createElement("canvas").getContext("webgl2");
    if (!context) return false;
    context.getExtension("WEBGL_lose_context")?.loseContext();
    return true;
  } catch { return false; }
}

export default function SculptureCanvas({ visible, transforms }: { visible: boolean; transforms: SculptureTransforms }) {
  const [supported] = useState(supportsWebGL);
  const [ready, setReady] = useState(false);
  const [lost, setLost] = useState(false);
  const reduced = useMotionPreference();
  const pointer = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const hero = document.getElementById("home");
    if (!hero || reduced || !matchMedia("(hover:hover) and (pointer:fine)").matches) return;
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
    <Canvas aria-hidden="true" dpr={[1, 1.5]} camera={{ position: [5.8, 3.6, 8.2], fov: 40.4751 }} resize={{ scroll: false, offsetSize: true, debounce: 0 }} frameloop={!visible || reduced ? "demand" : "always"} gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true }} onCreated={({ gl }) => {
      gl.domElement.addEventListener("webglcontextlost", () => setLost(true), { once: true });
    }}>
      <ambientLight intensity={0.7} />
      <ResponsiveCamera />
      <directionalLight position={[4, 6, 5]} intensity={3.6} color="#fff6e9" />
      <directionalLight position={[-4, 2, -2]} intensity={1.8} color="#dce2e8" />
      <Suspense fallback={null}>
        <Environment resolution={128}>
          <Lightformer intensity={3} position={[0, 4, 3]} scale={[5, 5, 1]} />
          <Lightformer intensity={2} position={[-3, 1, 1]} rotation={[0, Math.PI / 2, 0]} scale={[3, 5, 1]} />
          <Lightformer intensity={1.5} position={[3, 0, -2]} rotation={[0, -Math.PI / 2, 0]} scale={[2, 4, 1]} />
        </Environment>
        <Sculpture animate={visible && !reduced} reduced={Boolean(reduced)} onReady={markReady} pointer={pointer} transforms={transforms} />
      </Suspense>
    </Canvas>
  </div>;
}
