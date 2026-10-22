/**
 * Import Brett's authorized OBJ download; retain all five frames and both winding polygon components.
 * Source: Omer, CC BY 4.0. See public/models/ATTRIBUTION.md for attribution.
 * Usage: node scripts/import-geometric-frames.mjs /path/to/model.obj [output.glb]
 * Keeps supplied vertices/normals and relative placement. Only the independent
 * unsupported Rhino B-spline declaration is omitted; its polygon surfaces remain.
 */
import fs from "node:fs";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter.js";
import { mergeVertices } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { Box3, BufferGeometry, Float32BufferAttribute, Group, Mesh, MeshStandardMaterial, Vector3 } from "three";

const sourcePath = process.argv[2];
if (!sourcePath) throw new Error("Supply the downloaded Complex Geometric Frames OBJ path.");
const outputPath = process.argv[3] || "public/models/geometric-frames.glb";
const input = fs.readFileSync(sourcePath, "utf8");
// The file's final `parm` line is free-form curve metadata, not a point primitive.
// OBJLoader otherwise mistakes it for points and turns the entire surface into Points.
const polygonSource = input.split(/\r?\n/).filter((line) => !/^(cstype|deg|curv|parm|end)\b/.test(line)).join("\n");
const imported = new OBJLoader().parse(polygonSource);
if (imported.children.length !== 1 || !imported.children[0].isMesh) throw new Error("Inspect changed source structure before conversion.");
const geometry = imported.children[0].geometry;
const positions = geometry.getAttribute("position");
const normals = geometry.getAttribute("normal");
const parent = Array.from({ length: positions.count }, (_, index) => index);
const find = (index) => parent[index] === index ? index : parent[index] = find(parent[index]);
const join = (a, b) => { parent[find(a)] = find(b); };
const welded = new Map();
for (let index = 0; index < positions.count; index++) {
  const key = [positions.getX(index), positions.getY(index), positions.getZ(index)].map((value) => value.toFixed(4)).join(",");
  if (welded.has(key)) join(index, welded.get(key));
  else welded.set(key, index);
}
for (let index = 0; index < positions.count; index += 3) { join(index, index + 1); join(index, index + 2); }
const components = new Map();
for (let index = 0; index < positions.count; index += 3) {
  const root = find(index);
  if (!components.has(root)) components.set(root, { triangles: [], bounds: new Box3() });
  const component = components.get(root);
  component.triangles.push(index);
  for (let vertex = index; vertex < index + 3; vertex++) component.bounds.expandByPoint(new Vector3().fromBufferAttribute(positions, vertex));
}
const sorted = [...components.values()].sort((a, b) => b.triangles.length - a.triangles.length);
if (sorted.length !== 7 || sorted[0].triangles.length !== 13760 || sorted[1].triangles.length !== 12468) throw new Error("Expected five frames and two curved components; inspect changed input.");
// Alternate by physical depth, rather than connected-component triangle count.
const frames = sorted.slice(2).sort((a, b) => b.bounds.min.z - a.bounds.min.z);
const parts = [...sorted.slice(0, 2), ...frames];
const bounds = parts.reduce((box, frame) => box.union(frame.bounds), new Box3());
const center = bounds.getCenter(new Vector3());
const output = new Group();
output.name = "Architectural frames and winding line — Omer";
output.userData = {
  author: "Omer (utopiandigital)", license: "CC BY 4.0",
  source: "https://sketchfab.com/3d-models/complex-geometric-frames-and-curved-lines-model-287051b7796d4a94b5970f79cd4fc8e5",
  modifications: "Retained all polygon components and source arrangement; centered; omitted independent B-spline and unused UVs; assigned alternating porcelain/orange frames and charcoal curves."
};
const frameMaterial = new MeshStandardMaterial({ name: "Porcelain frames", color: "#f4f8f8", roughness: 0.48, metalness: 0.04 });
// Studio-compensated orange renders close to the site accent (#ffac42).
const orangeMaterial = new MeshStandardMaterial({ name: "Accent orange frames", color: "#ff8f28", roughness: 0.48, metalness: 0.04 });
const curveMaterial = new MeshStandardMaterial({ name: "Charcoal winding line", color: "#171b1b", roughness: 0.6, metalness: 0.08 });
const statistics = [];
for (const [index, frame] of parts.entries()) {
  const vertexData = [], normalData = [];
  for (const triangle of frame.triangles) for (let vertex = triangle; vertex < triangle + 3; vertex++) {
    vertexData.push(positions.getX(vertex) - center.x, positions.getY(vertex) - center.y, positions.getZ(vertex) - center.z);
    normalData.push(normals.getX(vertex), normals.getY(vertex), normals.getZ(vertex));
  }
  const part = new BufferGeometry();
  part.setAttribute("position", new Float32BufferAttribute(vertexData, 3));
  part.setAttribute("normal", new Float32BufferAttribute(normalData, 3));
  const indexed = mergeVertices(part, 0.000001);
  const curve = index < 2;
  const mesh = new Mesh(indexed, curve ? curveMaterial : (index - 2) % 2 === 1 ? orangeMaterial : frameMaterial);
  mesh.name = curve ? `Curve-${index + 1}` : `Frame-${String(index - 1).padStart(2, "0")}`;
  output.add(mesh);
  statistics.push({ name: mesh.name, triangles: frame.triangles.length, vertices: indexed.getAttribute("position").count, dimensions: frame.bounds.getSize(new Vector3()).toArray(), center: frame.bounds.getCenter(new Vector3()).sub(center).toArray() });
}
globalThis.FileReader = class {
  readAsArrayBuffer(blob) { blob.arrayBuffer().then((result) => { this.result = result; this.onloadend?.(); }); }
};
const glb = await new GLTFExporter().parseAsync(output, { binary: true, onlyVisible: true });
fs.writeFileSync(outputPath, Buffer.from(glb));
console.log(JSON.stringify({ sourceBytes: Buffer.byteLength(input), glbBytes: glb.byteLength, sourceTriangles: positions.count / 3, retainedTriangles: statistics.reduce((total, frame) => total + frame.triangles, 0), dimensions: bounds.getSize(new Vector3()).toArray(), meshes: statistics }, null, 2));
