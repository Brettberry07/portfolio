export function SceneFallback() {
  return (
    <div className="scene-fallback" data-testid="scene-fallback">
      <span className="static-frame" aria-hidden="true" />
      <span className="fallback-label">Static frame preview</span>
    </div>
  );
}
