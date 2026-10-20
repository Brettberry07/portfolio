"use client";

import dynamic from "next/dynamic";
import { Component, type ReactNode } from "react";
import { SceneFallback } from "./SceneFallback";

const TestScene = dynamic(() => import("./TestScene"), {
  ssr: false,
  loading: () => <SceneFallback />,
});

class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? <SceneFallback /> : this.props.children; }
}

export function ScenePreview() {
  return (
    <div className="scene-stage" role="img" aria-label="Decorative architectural frame study, with a static preview when 3D is unavailable">
      <SceneBoundary><TestScene /></SceneBoundary>
    </div>
  );
}
