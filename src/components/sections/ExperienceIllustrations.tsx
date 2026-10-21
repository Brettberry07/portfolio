import { useId } from "react";

// An orthographic sketch: original, deliberately simplified coastlines.
const radians = Math.PI / 180;
function project(longitude: number, latitude: number) {
  const lon = (longitude + 28) * radians;
  const lat = latitude * radians;
  const tilt = 12 * radians;
  return {
    x: Math.round((200 + 132 * Math.cos(lat) * Math.sin(lon)) * 10) / 10,
    y: Math.round((175 - 132 * (Math.cos(tilt) * Math.sin(lat) - Math.sin(tilt) * Math.cos(lat) * Math.cos(lon))) * 10) / 10,
    visible: Math.sin(tilt) * Math.sin(lat) + Math.cos(tilt) * Math.cos(lat) * Math.cos(lon) >= 0,
  };
}
function globeLine(points: number[][], close = false) {
  let drawing = false;
  return points.map(([lon, lat]) => {
    const point = project(lon, lat);
    if (!point.visible) { drawing = false; return ""; }
    const command = drawing ? "L" : "M";
    drawing = true;
    return `${command}${point.x.toFixed(1)},${point.y.toFixed(1)}`;
  }).join(" ") + (close ? " Z" : "");
}
const coastlines = [
  [[-112, 61], [-100, 69], [-83, 73], [-63, 67], [-60, 55], [-53, 50], [-63, 46], [-67, 44], [-75, 35], [-81, 25], [-84, 30], [-91, 29], [-97, 23], [-89, 21], [-83, 10], [-79, 9], [-87, 16], [-100, 18], [-106, 25], [-114, 32], [-112, 45], [-112, 61]],
  [[-73, 60], [-49, 61], [-24, 73], [-35, 82], [-53, 81], [-64, 72], [-73, 60]],
  [[-81, 10], [-70, 12], [-61, 7], [-51, 4], [-35, -6], [-40, -20], [-48, -29], [-55, -35], [-66, -55], [-72, -50], [-74, -34], [-80, -15], [-81, 10]],
  [[-17, 15], [-16, 28], [-6, 36], [10, 37], [23, 32], [32, 31], [35, 23], [43, 12], [51, 11], [43, -2], [40, -15], [33, -26], [19, -35], [12, -25], [10, -7], [0, 5], [-12, 5], [-17, 15]],
  [[-10, 36], [-9, 43], [-1, 44], [-4, 49], [7, 54], [10, 58], [7, 62], [17, 71], [29, 70], [23, 60], [31, 60], [43, 66], [55, 65], [57, 51], [52, 44], [42, 42], [36, 36], [28, 40], [23, 38], [22, 42], [16, 46], [18, 40], [12, 43], [8, 44], [3, 41], [-1, 37], [-10, 36]],
  [[-7, 50], [-5, 54], [-6, 58], [-3, 59], [0, 52], [-7, 50]],
  [[49, -13], [50, -18], [46, -25], [44, -23], [46, -16], [49, -13]],
];
const globeGrid = [
  ...[-60, -30, 0, 30, 60].map((lat) => globeLine(Array.from({ length: 61 }, (_, i) => [i * 6 - 180, lat]))),
  ...[-118, -88, -58, -28, 2, 32, 62].map((lon) => globeLine(Array.from({ length: 31 }, (_, i) => [lon, i * 6 - 90]))),
];
const landPaths = coastlines.map((points) => globeLine(points, true));
const routes = [
  { from: [-96, 38], to: [4, 51], bend: -37 },
  { from: [-96, 38], to: [-47, -23], bend: -24 },
  { from: [4, 51], to: [31, 30], bend: -23 },
  { from: [31, 30], to: [-4, 7], bend: 28 },
];

export function TradeGlobeIllustration() {
  const clipId = useId();
  return (
    <svg viewBox="0 0 400 350" fill="none" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <defs><clipPath id={clipId}><circle cx="200" cy="175" r="132" /></clipPath></defs>
      <g transform="rotate(-38 200 175)">
        <circle cx="200" cy="175" r="132" />
        <g clipPath={`url(#${clipId})`}>
          <g opacity=".35" strokeWidth=".8">
            {globeGrid.map((d, i) => <path key={i} d={d} />)}
          </g>
          <g strokeWidth="1.1">{landPaths.map((d, i) => <path key={i} d={d} />)}</g>
          <g className="exp-illustration-accent" strokeWidth="1.7">
            {routes.map(({ from, to, bend }, i) => {
              const a = project(from[0], from[1]);
              const b = project(to[0], to[1]);
              return <path className="exp-draw-line" key={i} pathLength="1" style={{ animationDelay: `${i * 100}ms` }} d={`M${a.x},${a.y} Q${(a.x + b.x) / 2 + bend},${(a.y + b.y) / 2 - 35} ${b.x},${b.y}`} />;
            })}
            {[[-96, 38], [4, 51], [-47, -23], [31, 30], [-4, 7]].map(([lon, lat], i) => {
              const { x, y } = project(lon, lat);
              return <g className="exp-route-node" key={i} style={{ animationDelay: `${200 + i * 90}ms` }}><circle className="exp-node-halo" cx={x} cy={y} r="4.7" strokeWidth="3.5" /><circle cx={x} cy={y} r="3.2" fill="var(--orange)" strokeWidth="1" /></g>;
            })}
          </g>
        </g>
        <path d="M200 27v9m0 278v9M52 175h9m278 0h9" strokeWidth=".8" />
      </g>
    </svg>
  );
}

export function DoubleAABatteryIllustration() {
  const battery = (x: number, y: number) => (
    <g transform={`translate(${x} ${y})`}>
      <path d="M-14 0v-12c0-7 28-7 28 0V0" />
      <ellipse cx="0" cy="0" rx="35" ry="12" />
      <path d="M-35 0v170c0 17 70 17 70 0V0" />
      <path d="M-35 154c0 17 70 17 70 0M-35 166c0 17 70 17 70 0" opacity=".4" strokeWidth=".8" />
      <path d="M-35 31c0 17 70 17 70 0" className="exp-illustration-accent exp-draw-line" pathLength="1" strokeWidth="1.7" />
      <path d="M-7 58H7M0 51v14M-7 138H7" />
      <path d="M-23 53v75" opacity=".3" strokeWidth=".8" />
    </g>
  );
  return (
    <svg viewBox="0 0 400 350" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <g transform="rotate(24 200 175)">
        {battery(246, 67)}
        {battery(150, 111)}
      </g>
      <path d="M66 266h41l10-13 12 26 13-40 12 27h31m88-156h59" className="exp-illustration-accent exp-draw-line" pathLength="1" strokeWidth="1.7" />
      <g opacity=".35" strokeWidth=".8"><path d="M76 92v127m-5-127h10m-10 127h10M211 296h105m-105-5v10m105-10v10" /></g>
      <circle className="exp-illustration-accent exp-route-node" cx="332" cy="110" r="3" />
    </svg>
  );
}
