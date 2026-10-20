/**
 * Import Brett's authorized OBJ download; retain only the five architectural frames.
 * Source: Omer, CC BY 4.0. See public/models/ATTRIBUTION.md for attribution.
 * Usage: node scripts/import-geometric-frames.mjs /path/to/model.obj [output.glb]
 * Keeps supplied frame vertices/normals and relative placement. Removes two curved
 * polygon components plus the separate unsupported Rhino B-spline declaration.
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
const frames = sorted.slice(2);
const bounds = frames.reduce((box, frame) => box.union(frame.bounds), new Box3());
const center = bounds.getCenter(new Vector3());
const output = new Group();
output.name = "Architectural frames — Omer";
output.userData = {
  author: "Omer (utopiandigital)", license: "CC BY 4.0",
  source: "https://sketchfab.com/3d-models/complex-geometric-frames-and-curved-lines-model-287051b7796d4a94b5970f79cd4fc8e5",
  modifications: "Removed curved components and B-spline; centered frames; omitted source materials and UVs; assigned matte charcoal."
};
const material = new MeshStandardMaterial({ name: "Matte charcoal", color: "#252824", roughness: 0.82, metalness: 0.05 });
const statistics = [];
for (const [index, frame] of frames.entries()) {
  const vertexData = [], normalData = [];
  for (const triangle of frame.triangles) for (let vertex = triangle; vertex < triangle + 3; vertex++) {
    vertexData.push(positions.getX(vertex) - center.x, positions.getY(vertex) - center.y, positions.getZ(vertex) - center.z);
    normalData.push(normals.getX(vertex), normals.getY(vertex), normals.getZ(vertex));
  }
  const part = new BufferGeometry();
  part.setAttribute("position", new Float32BufferAttribute(vertexData, 3));
  part.setAttribute("normal", new Float32BufferAttribute(normalData, 3));
  const indexed = mergeVertices(part, 0.000001);
  const mesh = new Mesh(indexed, material);
  mesh.name = `Frame-${String(index + 1).padStart(2, "0")}`;
  output.add(mesh);
  statistics.push({ name: mesh.name, triangles: frame.triangles.length, vertices: indexed.getAttribute("position").count, dimensions: frame.bounds.getSize(new Vector3()).toArray(), center: frame.bounds.getCenter(new Vector3()).sub(center).toArray() });
}
globalThis.FileReader = class {
  readAsArrayBuffer(blob) { blob.arrayBuffer().then((result) => { this.result = result; this.onloadend?.(); }); }
};
const glb = await new GLTFExporter().parseAsync(output, { binary: true, onlyVisible: true });
fs.writeFileSync(outputPath, Buffer.from(glb));
console.log(JSON.stringify({ sourceBytes: Buffer.byteLength(input), glbBytes: glb.byteLength, sourceTriangles: positions.count / 3, retainedTriangles: statistics.reduce((total, frame) => total + frame.triangles, 0), dimensions: bounds.getSize(new Vector3()).toArray(), meshes: statistics }, null, 2));
