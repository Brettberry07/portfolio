"use client";

import { useEffect, useRef } from "react";
import { Device, MeetingNotification, PhoneDisplay, TariffDisplay } from "./DeviceArt";
import { createRoadRenderer, proposedTimingStart, roadHeight, roadWidth } from "./road-art";
import { lerp, smoothstep } from "./art-math";
import hardware from "./hardware.json";

type ReadingPose = { x: number; y: number; scale: number };
type Span = { start: number; length: number };

const monitor = hardware.monitor;
const handheld = hardware.handheld;
const glass = {
  width: monitor.topRight[0] - monitor.topLeft[0],
  height: monitor.bottomLeft[1] - monitor.topLeft[1],
  slope: (monitor.topRight[1] - monitor.topLeft[1]) / (monitor.topRight[0] - monitor.topLeft[0]),
  x: (monitor.topRight[0] + monitor.bottomLeft[0]) / 2,
  y: (monitor.topRight[1] + monitor.bottomLeft[1]) / 2,
};

function readSpan(section: HTMLElement, header: number): Span {
  return {
    start: window.scrollY + section.getBoundingClientRect().top - header,
    length: section.offsetHeight,
  };
}

function readPose(section: HTMLElement, viewport: DOMRect, model: { width: number; height: number }): ReadingPose {
  const inner = section.querySelector<HTMLElement>(".project-inner")!.getBoundingClientRect();
  const device = section.querySelector<HTMLElement>(".project-visual .device")!.getBoundingClientRect();
  return {
    x: device.left + device.width / 2 - viewport.left,
    y: device.top + device.height / 2 - inner.top,
    scale: Math.min(device.width / model.width, device.height / model.height),
  };
}

function place(element: HTMLElement, x: number, y: number, scale: number, pivotX: number, pivotY: number, tilt = 0) {
  element.style.transform = `translate3d(${x - pivotX * scale}px,${y - pivotY * scale}px,0) scale(${scale}) rotate(${tilt}deg)`;
}

export default function SharedScene() {
  const scene = useRef<HTMLDivElement>(null);
  const rig = useRef<HTMLDivElement>(null);
  const phone = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const stage = scene.current;
    const monitorRig = rig.current;
    const phoneRig = phone.current;
    const roadCanvas = canvas.current;
    const run = stage?.closest<HTMLElement>(".project-run");
    const header = stage?.closest(".portfolio")?.querySelector<HTMLElement>(".folio-header");
    if (!stage || !monitorRig || !phoneRig || !roadCanvas || !run || !header) return;
    const [tariff, traffic, stillOn] = Array.from(run.querySelectorAll<HTMLElement>("[data-scene]"));
    if (!tariff || !traffic || !stillOn) return;

    let road: ReturnType<typeof createRoadRenderer>;
    try {
      road = createRoadRenderer(roadCanvas);
    } catch {
      return;
    }
    if (!road) return;

    let width = 0;
    let height = 0;
    let reading: { monitor: ReadingPose; phone: ReadingPose };
    let spans: Span[];
    let frame = 0;
    let last = 0;
    let current = window.scrollY;
    let viewportScroll = current;
    let live = false;
    let disposed = false;
    let resize: ResizeObserver | undefined;

    function render(scroll: number) {
      if (!stage || !monitorRig || !phoneRig || !run || !road || !reading) return;
      const [tTariff, tTraffic, tStillOn] = spans.map(({ start, length }) => (scroll - start) / length);
      const enter = smoothstep(-.52, 0, tTariff);
      const approach = smoothstep(.52, .78, tTariff);
      const cross = smoothstep(.66, .99, tTariff);
      const emerge = smoothstep(.62, .84, tTraffic);
      const push = cross * (1 - emerge);
      const tradeToRoad = smoothstep(.55, .69, tTariff);
      const night = smoothstep(.57, .93, tTariff) * (1 - smoothstep(.65, .83, tTraffic));
      const notification = smoothstep(-.175, -.127, tStillOn) * (1 - smoothstep(-.071, -.012, tStillOn));
      const lift = smoothstep(-.105, 0, tStillOn);
      const phoneArrive = smoothstep(-.15, -.095, tStillOn);
      const phoneExit = smoothstep(.74, 1, tStillOn);
      const monitorExit = smoothstep(-.067, -.002, tStillOn);

      const monitorStartScale = Math.min(width * .78 / monitor.width, height * 1.24 / monitor.height);
      const monitorScale = lerp(monitorStartScale, reading.monitor.scale, enter);
      const turn = approach * (1 - emerge);
      const roadScale = Math.max(width / glass.width, (height + width * Math.abs(glass.slope)) / glass.height) * 1.065;

      place(
        monitorRig,
        lerp(lerp(lerp(width * .54, reading.monitor.x, enter), width * .56, turn), width / 2, push) - monitorExit * width * .12,
        lerp(lerp(lerp(height * .61, reading.monitor.y, enter), height * .52, turn), height / 2, push),
        lerp(lerp(monitorScale, monitorStartScale, turn), roadScale, push),
        lerp(monitor.width / 2, glass.x, push),
        lerp(monitor.height / 2, glass.y, push),
      );
      monitorRig.style.opacity = String(1 - monitorExit);

      place(
        phoneRig,
        lerp(width * .635, reading.phone.x, lift) + phoneExit * width * .065,
        lerp(height * .765, reading.phone.y, lift) + phoneExit * height * .08,
        lerp(reading.phone.scale * .40, reading.phone.scale, lift) * (1 - phoneExit * .10),
        handheld.width / 2,
        handheld.height / 2,
        -5 * (1 - lift),
      );
      phoneRig.style.opacity = String(phoneArrive * (1 - phoneExit));

      const comparison = tTraffic < 0
        ? lerp(0, .13, cross)
        : lerp(.13, .60, smoothstep(0, .34, tTraffic)) + .40 * smoothstep(.34, 1, tTraffic);
      if (tradeToRoad > 0 && monitorExit < 1) road(comparison);
      stage.dataset.timing = comparison >= proposedTimingStart ? "proposed" : "existing";
      stage.dataset.surface = tradeToRoad < .5 ? "tariff" : "road";
      stage.style.setProperty("--road-mix", String(tradeToRoad));
      stage.style.setProperty("--night", String(night));
      stage.style.setProperty("--notification", String(notification));
      stage.style.setProperty("--screen-result", String(smoothstep(-.32, -.055, tTariff)));
      stage.style.setProperty("--road-legend", String(smoothstep(.89, .99, tTariff) * (1 - smoothstep(.58, .675, tTraffic))));
      run.style.setProperty("--tariff-copy-alpha", String(1 - smoothstep(.54, .68, tTariff)));
      run.style.setProperty("--traffic-copy-alpha", String(smoothstep(-.27, -.05, tTraffic) * (1 - smoothstep(.62, .76, tTraffic))));
      run.style.setProperty("--phone-copy-alpha", String(smoothstep(-.032, -.005, tStillOn)));
    }

    function snap() {
      cancelAnimationFrame(frame);
      frame = 0;
      last = 0;
      current = viewportScroll = window.scrollY;
      if (live && !document.hidden) render(current);
    }

    function measure() {
      if (!stage || !header) return;
      const bounds = stage.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return;
      const resized = width !== bounds.width || height !== bounds.height;
      const activeSection = resized && spans
        ? spans.findIndex(span => viewportScroll >= span.start && viewportScroll < span.start + span.length)
        : -1;
      const previous = spans?.[activeSection];
      const progress = previous ? (viewportScroll - previous.start) / previous.length : 0;
      width = bounds.width;
      height = bounds.height;
      const headerHeight = header.offsetHeight;
      reading = {
        monitor: readPose(tariff, bounds, monitor),
        phone: readPose(stillOn, bounds, handheld),
      };
      spans = [tariff, traffic, stillOn].map(section => readSpan(section, headerHeight));
      if (activeSection !== -1) {
        const span = spans[activeSection];
        // Preserve the reading position when the stage and preceding sections resize.
        window.scrollTo(0, span.start + span.length * progress);
      }
      snap();
    }

    function animate(now: number) {
      frame = 0;
      if (!live || document.hidden || !width || !height) return;
      const goal = viewportScroll = window.scrollY;
      const distance = goal - current;
      const elapsed = Math.min(.05, last ? (now - last) / 1000 : 1 / 60);
      last = now;
      // Jump directly to distant destinations. Small movements retain a short,
      // frame-rate independent settle that works in both scroll directions.
      if (Math.abs(distance) < .65 || Math.abs(distance) > height * 1.13) {
        current = goal;
        last = 0;
      } else {
        current = lerp(current, goal, 1 - Math.exp(-elapsed * 14));
        frame = requestAnimationFrame(animate);
      }
      render(current);
    }

    function onScroll() {
      if (live && !document.hidden && !frame) frame = requestAnimationFrame(animate);
    }

    const mediaReady = Promise.all(Array.from(stage.querySelectorAll("img"), image => image.decode()));
    void mediaReady.then(() => {
      if (disposed) return;
      live = true;
      measure();
      run.dataset.cinematic = "ready";
      resize = new ResizeObserver(measure);
      [stage, tariff, traffic, stillOn, header].forEach(element => resize?.observe(element));
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", measure);
      window.addEventListener("hashchange", snap);
      window.addEventListener("popstate", snap);
      window.addEventListener("pageshow", snap);
      document.addEventListener("visibilitychange", snap);
    }).catch(() => {
      // Leave the in-flow compositions in place if a device image fails.
    });

    return () => {
      disposed = true;
      if (!live) return;
      live = false;
      delete run.dataset.cinematic;
      ["--tariff-copy-alpha", "--traffic-copy-alpha", "--phone-copy-alpha"].forEach(name => run.style.removeProperty(name));
      cancelAnimationFrame(frame);
      resize?.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      window.removeEventListener("hashchange", snap);
      window.removeEventListener("popstate", snap);
      window.removeEventListener("pageshow", snap);
      document.removeEventListener("visibilitychange", snap);
    };
  }, []);

  return (
    <div className="shared-scene" ref={scene}>
      <div className="scene-desk" />
      <div className="scene-dark" />
      <div className="scene-device scene-device--monitor" ref={rig} style={{ width: monitor.width }}>
        <Device kind="monitor" eager>
          <TariffDisplay />
          <canvas className="crt-road" ref={canvas} width={roadWidth} height={roadHeight} />
          <MeetingNotification />
        </Device>
      </div>
      <div className="scene-scrim" />
      <div className="scene-device scene-device--phone" ref={phone} style={{ width: handheld.width }}>
        <Device kind="handheld" eager><PhoneDisplay /></Device>
      </div>
      <div className="scene-road-legend">
        <span className="folio-label">Highway 102 · Illustrated corridor</span>
        <div className="scene-road-timing">
          <span className="scene-phase scene-phase--existing">Existing timing <small>Car waits at the signal</small></span>
          <span className="scene-phase scene-phase--proposed">Proposed timing <small>Car proceeds sooner</small></span>
        </div>
      </div>
    </div>
  );
}
