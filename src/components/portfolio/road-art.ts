import { clamp, lerp, seededRandom, smoothstep } from "./art-math";

export const roadWidth = 540;
export const roadHeight = 338;
export const proposedTimingStart = .32;
type Point = [x: number, y: number];
type GroundPoint = [distance: number, across: number, height?: number];
const junctions = [36, 171];

function project([distance, across, height = 0]: GroundPoint): Point {
  return [Math.round(272 + distance * 1.035 + across * .64), Math.round(176 - distance * .335 + across * .59 - height)];
}

function surface(ctx: CanvasRenderingContext2D, points: GroundPoint[], color: string) {
  ctx.fillStyle = color;
  ctx.beginPath();
  points.map(project).forEach(([x, y], index) => index ? ctx.lineTo(x, y) : ctx.moveTo(x, y));
  ctx.closePath();
  ctx.fill();
}

function slab(ctx: CanvasRenderingContext2D, x: number, z: number, w: number, d: number, color: string, h = 0) {
  surface(ctx, [[x, z, h], [x + w, z, h], [x + w, z + d, h], [x, z + d, h]], color);
}

function block(ctx: CanvasRenderingContext2D, x: number, z: number, w: number, d: number, h: number, colors: [string, string, string], base = 0) {
  surface(ctx, [[x, z + d, base], [x + w, z + d, base], [x + w, z + d, base + h], [x, z + d, base + h]], colors[1]);
  surface(ctx, [[x + w, z, base], [x + w, z + d, base], [x + w, z + d, base + h], [x + w, z, base + h]], colors[2]);
  slab(ctx, x, z, w, d, colors[0], base + h);
}

function pine(ctx: CanvasRenderingContext2D, x: number, z: number, size: number, light: boolean) {
  const [px, py] = project([x, z]);
  ctx.fillStyle = "#0a1810";
  ctx.fillRect(px - 4, py - 1, size + 4, 3);
  ctx.fillStyle = "#35543a";
  ctx.fillRect(px - 1, py - 3, 2, 4);

  for (let level = 0; level < 4; level++) {
    const width = Math.max(3, Math.round(size * (1 - level * .21)));
    const height = Math.round(size * .43 + level * size * .32);
    ctx.fillStyle = light ? ["#305635", "#416842", "#457748", "#548450"][level] : ["#203e27", "#29482c", "#315337", "#3b6040"][level];
    ctx.fillRect(px - Math.round(width / 2), py - height, width, Math.round(size / 2));
    ctx.fillStyle = "#172f20";
    ctx.fillRect(px + Math.round(width * .2), py - height + 1, Math.ceil(width * .25), Math.round(size * .35));
  }
}

function signal(ctx: CanvasRenderingContext2D, x: number, z: number, go: boolean) {
  const [px, py] = project([x, z]);
  ctx.fillStyle = "#74906c";
  ctx.fillRect(px, py - 26, 2, 27);
  ctx.fillStyle = "#324737";
  ctx.fillRect(px - 1, py - 27, 9, 17);
  ctx.fillStyle = "#070e0a";
  ctx.fillRect(px, py - 26, 7, 15);
  ctx.fillStyle = go ? "#514d2e" : "#c1a85c";
  ctx.fillRect(px + 2, py - 24, 3, 3);
  ctx.fillStyle = go ? "#ccf7a0" : "#364c32";
  ctx.fillRect(px + 2, py - 16, 3, 3);
  ctx.fillStyle = go ? "#8cce79" : "#9c884b";
  ctx.fillRect(px + 1, py - (go ? 16 : 24), 1, 3);
}

function vehicle(ctx: CanvasRenderingContext2D, x: number, z: number, featured: boolean) {
  const palette: [string, string, string] = featured ? ["#bbdf88", "#76934f", "#cfe9a1"] : ["#5d7b56", "#3d573d", "#89a176"];
  slab(ctx, x - 4, z - 2, 21, 13, "#101d14");
  slab(ctx, x - 1, z + 6, 3, 4, "#080f0b");
  slab(ctx, x + 11, z + 6, 3, 4, "#080f0b");
  block(ctx, x - 2, z, 20, 8, 4, palette, 1);
  block(ctx, x + 3, z + 1, 8, 6, 3, ["#d5eeb2", "#253f2d", "#36573a"], 5);
  slab(ctx, x + 17, z + 1, 2, 2, "#e9ffd8", 3);
  slab(ctx, x + 17, z + 6, 2, 2, "#e9ffd8", 3);
}

function makeTerrain() {
  const layer = document.createElement("canvas");
  layer.width = roadWidth;
  layer.height = roadHeight;
  const ctx = layer.getContext("2d");
  if (!ctx) return null;
  const random = seededRandom(102925);
  const grass = ["#16291c", "#1a2e20", "#192b20", "#213326", "#14251a"];
  const particles = ["#2e4530", "#395036", "#253b2a", "#4a6140"];

  ctx.fillStyle = "#15271b";
  ctx.fillRect(0, 0, roadWidth, roadHeight);
  for (let x = -405; x < 410; x += 22) {
    for (let z = -370; z < 365; z += 22) {
      slab(ctx, x, z, 22.4, 22.4, grass[Math.floor(random() * grass.length)]);
    }
  }
  for (let index = 0; index < 3800; index++) {
    ctx.fillStyle = particles[Math.floor(random() * particles.length)];
    ctx.globalAlpha = .22 + random() * .5;
    ctx.fillRect(random() * roadWidth, random() * roadHeight, random() < .18 ? 3 : 1, 1);
  }
  ctx.globalAlpha = 1;

  for (const crossing of junctions) {
    slab(ctx, crossing - 24, -355, 48, 720, "#344b36");
    slab(ctx, crossing - 18, -355, 36, 720, "#22372a");
    for (let z = -345; z < 355; z += 25) slab(ctx, crossing - .8, z, 1.6, 11, "#708360");
  }

  slab(ctx, -420, -50, 850, 100, "#374e3b");
  slab(ctx, -420, -43, 850, 86, "#1e3026");
  slab(ctx, -420, -40, 850, 80, "#213629");
  for (const edge of [-39, 38]) slab(ctx, -420, edge, 850, 1, "#668365");
  for (let x = -415; x < 427; x += 22) {
    if (junctions.some(junction => Math.abs(x - junction) < 32)) continue;
    slab(ctx, x, -2, 12, 1.8, "#758565");
    slab(ctx, x, -20, 10, 1, "#405b43");
    slab(ctx, x, 20, 10, 1, "#405b43");
  }

  for (const crossing of junctions) {
    for (let z = -35; z < 38; z += 5) {
      slab(ctx, crossing - 22, z, 4, 2.3, "#7f9873");
      slab(ctx, crossing + 18, z, 4, 2.3, "#7f9873");
    }
    slab(ctx, crossing - 28, 3, 1.5, 34, "#97b58b");
  }

  for (let index = 0; index < 310; index++) {
    const x = -350 + random() * 720;
    const z = -270 + random() * 550;
    const size = 4 + Math.round(random() * 11);
    if (Math.abs(z) < 58 || junctions.some(junction => Math.abs(x - junction) < 35)) continue;
    pine(ctx, x, z, size, random() > .58);
  }
  for (const [x, z, width, depth, height] of [[-42, -112, 36, 25, 12], [87, 91, 29, 19, 11], [234, 79, 50, 25, 14], [107, -115, 35, 22, 11], [270, -83, 30, 26, 9]]) {
    slab(ctx, x - 6, z - 5, width + 12, depth + 11, "#2a4231");
    block(ctx, x, z, width, depth, height, ["#47644d", "#304a38", "#354f3c"]);
    slab(ctx, x + 3, z + 4, width - 7, 1.6, "#57765a", height);
  }

  const vignette = ctx.createRadialGradient(320, 153, 45, 283, 165, 315);
  vignette.addColorStop(0, "#09130d00");
  vignette.addColorStop(.68, "#09130d28");
  vignette.addColorStop(1, "#09130de0");
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, roadWidth, roadHeight);
  return layer;
}

export function createRoadRenderer(canvas: HTMLCanvasElement) {
  const context = canvas.getContext("2d");
  const terrain = makeTerrain();
  if (!context || !terrain) return null;
  let last = -1;

  return (progress: number) => {
    const position = Math.round(clamp(progress) * 900) / 900;
    if (position === last) return;
    last = position;
    context.drawImage(terrain, 0, 0);
    const waiting = lerp(-110, -12, smoothstep(0, .14, position));
    const travel = lerp(-12, 303, smoothstep(proposedTimingStart, 1, position));
    vehicle(context, position < proposedTimingStart ? waiting : travel, 12, true);
    vehicle(context, lerp(285, -158, position), -27, false);
    vehicle(context, lerp(-218, -91, position), 15, false);
    junctions.forEach(x => {
      signal(context, x - 27, 44, position >= proposedTimingStart);
      signal(context, x + 21, -45, position < proposedTimingStart);
    });
    const scan = "#090f0b11";
    context.fillStyle = scan;
    for (let y = 1; y < roadHeight; y += 3) context.fillRect(0, y, roadWidth, 1);
  };
}
