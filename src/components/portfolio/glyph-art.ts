import { clamp, seededRandom } from "./art-math";

export const cloudWidth = 880;
export const cloudHeight = 710;
const glyphs = [".", ":", "-", "+", "*", "/", "x", "0", "1", "#", "@"];
const colors = ["#24362b", "#304c39", "#4d5f43", "#64764e", "#86916a", "#a2aa7e"];
const wakeColor = "#3b832d";
const cell = 18;
const atlasCell = cell * 2;

function makeParticles() {
  const random = seededRandom(72817);

  return Array.from({ length: 8400 }, () => {
    const angle = random() * Math.PI * 2;
    const wrap = random() * Math.PI * 2;
    const fringe = random() > .87;
    const shell = .41 + .123 * Math.sin(3 * angle + .42) + .108 * Math.sin(angle - .25);
    const thickness = shell * (fringe ? 1 + random() * .75 : .2 + Math.sqrt(random()) * .83);
    const ring = .94 + .125 * Math.sin(3 * angle - .8) + .105 * Math.cos(5 * angle + .8);
    const radius = ring + thickness * Math.cos(wrap);
    const fold = .29 * Math.sin(2 * angle - .24) + .17 * Math.cos(3 * angle + wrap);
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    const depth = Math.sin(wrap) * thickness + fold;
    // Rotating the warped volume exposes overlapping front and back folds.
    const incline = .55 * y + depth * .84;
    const tilted = .84 * y - depth * .55;
    const positionX = x * .94 + tilted * .34;
    const positionY = tilted * .94 - x * .34;
    const front = clamp((incline + 1.05) / 2.1);
    const tone = Math.min(colors.length - 1, Math.floor(random() * 4.5 + (1 - front) * 1.8));
    const exposed = Math.max(0, Math.sin(wrap - .4));
    const alpha = fringe ? .13 + front * .34 : .34 + front * .54 + random() * .13;
    const size = (fringe ? .65 : .78) + front * .27 + random() * .23;

    return {
      x: 439 + positionX * 255 + (random() - .5) * (fringe ? 24 : 7),
      y: 353 + positionY * 233 + (random() - .5) * (fringe ? 21 : 7),
      depth: incline,
      alpha,
      size,
      glyph: Math.min(glyphs.length - 1, Math.floor(random() * (5 + exposed * 6))),
      tone,
      dx: 0,
      dy: 0,
    };
  }).sort((a, b) => a.depth - b.depth);
}

function makeAtlas() {
  const atlas = document.createElement("canvas");
  atlas.width = glyphs.length * atlasCell;
  atlas.height = (colors.length + 1) * atlasCell;
  const context = atlas.getContext("2d");
  if (!context) return null;

  context.font = '25px "Courier New", monospace';
  context.textAlign = "center";
  context.textBaseline = "middle";
  [...colors, wakeColor].forEach((color, row) => {
    context.fillStyle = color;
    glyphs.forEach((glyph, column) => {
      context.fillText(glyph, column * atlasCell + atlasCell / 2, row * atlasCell + atlasCell / 2);
    });
  });
  return atlas;
}

export function createGlyphRenderer(canvas: HTMLCanvasElement) {
  const context = canvas.getContext("2d");
  const atlas = makeAtlas();
  if (!context || !atlas) return null;

  const particles = makeParticles();
  let pointer: { x: number; y: number; dx: number; dy: number } | undefined;

  function point(x: number, y: number) {
    const previous = pointer;
    pointer = {
      x, y,
      dx: clamp((previous?.dx ?? 0) + (previous ? x - previous.x : 0), -44, 44),
      dy: clamp((previous?.dy ?? 0) + (previous ? y - previous.y : 0), -44, 44),
    };
  }

  function draw(time: number, elapsed = 1 / 30) {
    if (!context || !atlas) return;
    const damping = Math.exp(-elapsed * 4.2);
    const drift = Math.sin(time * .00065);
    context.setTransform(canvas.width / cloudWidth, 0, 0, canvas.height / cloudHeight, 0, 0);
    context.clearRect(0, 0, cloudWidth, cloudHeight);

    for (const particle of particles) {
      const { x, y, depth, size, alpha, glyph, tone } = particle;
      particle.dx *= damping;
      particle.dy *= damping;
      if (pointer) {
        const offsetX = x - pointer.x;
        const offsetY = y - pointer.y;
        const squared = offsetX * offsetX + offsetY * offsetY;
        if (squared < 112 * 112) {
          const pressure = Math.pow(1 - Math.sqrt(squared) / 112, 1.7);
          particle.dx += pressure * (pointer.dx * .58 - offsetY * Math.abs(pointer.dy) * .011);
          particle.dy += pressure * (pointer.dy * .58 + offsetX * Math.abs(pointer.dx) * .011);
        }
      }
      const wake = Math.abs(particle.dx) + Math.abs(particle.dy);
      const scale = cell * size;
      context.globalAlpha = Math.min(1, alpha + wake * .004);
      context.drawImage(
        atlas, glyph * atlasCell, (wake > 7 ? colors.length : tone) * atlasCell, atlasCell, atlasCell,
        x + particle.dx + depth * drift * 3 - scale / 2,
        y + particle.dy + depth * drift * 1.7 - scale / 2, scale, scale,
      );
    }
    context.globalAlpha = 1;
    if (pointer) {
      pointer.dx = 0;
      pointer.dy = 0;
    }
  }

  return { draw, point, release: () => { pointer = undefined; } };
}
