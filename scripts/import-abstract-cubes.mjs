/**
 * Convert Brett's legitimately downloaded FBX into five individually selectable GLB meshes.
 * Source: Abstract Cubes by Andyleth, CC BY 4.0. See public/models/ATTRIBUTION.md.
 * Usage: node scripts/import-abstract-cubes.mjs /path/to/modeloss.fbx [output.glb]
 * Geometry is preserved. Only textures/UVs are omitted and vertices indexed for the matte finish.
 */
import fs from "node:fs";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter.js";
import { mergeVertices } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { Box3, BufferGeometry, Float32BufferAttribute, Group, Mesh, MeshStandardMaterial, Texture, TextureLoader, Vector3 } from "three";

const sourcePath = process.argv[2];
if (!sourcePath) throw new Error("Supply the downloaded modeloss.fbx path.");
const outputPath = process.argv[3] || "public/models/abstract-cubes.glb";
const selection = process.argv[4] || "Cube-04";
// No source textures are loaded: the site applies a new physically based charcoal finish.
TextureLoader.prototype.load = function () { return new Texture(); };
globalThis.FileReader = class {
  readAsArrayBuffer(blob) { blob.arrayBuffer().then((result) => { this.result = result; this.onloadend?.(); }); }
};
const bytes = fs.readFileSync(sourcePath);
const imported = new FBXLoader().parse(bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength), "");
const meshes = [];
imported.updateMatrixWorld(true);
imported.traverse((node) => { if (node.isMesh) meshes.push(node); });
if (meshes.length !== 1) throw new Error("Expected the source's single combined mesh; inspect changed input before converting.");
const geometry = meshes[0].geometry.clone().applyMatrix4(meshes[0].matrixWorld);
const positions = geometry.getAttribute("position");
const normals = geometry.getAttribute("normal");
const parent = Array.from({ length: positions.count }, (_, index) => index);
const find = (index) => parent[index] === index ? index : parent[index] = find(parent[index]);
const join = (a, b) => { parent[find(a)] = find(b); };
const welded = new Map();
for (let index = 0; index < positions.count; index++) {
  const key = [positions.getX(index), positions.getY(index), positions.getZ(index)].map((value) => value.toFixed(5)).join(",");
  const previous = welded.get(key);
  if (previous !== undefined) join(index, previous);
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
const cubes = sorted.slice(0, 5);
if (cubes.some((cube) => cube.triangles.length < 100)) throw new Error("Expected five substantial source sculptures.");
// Four tiny disconnected source triangles belong to the fifth cube; retain them with its geometry.
for (const fragment of sorted.slice(5)) {
  const center = fragment.bounds.getCenter(new Vector3());
  const nearest = cubes.toSorted((a, b) => a.bounds.distanceToPoint(center) - b.bounds.distanceToPoint(center))[0];
  nearest.triangles.push(...fragment.triangles);
}
const output = new Group();
output.name = "Abstract Cubes — Andyleth";
output.userData = { author: "Andyleth", license: "CC BY 4.0", source: "https://sketchfab.com/3d-models/abstract-cubes-134b55951b9545898009732180ff8ceb", modifications: "Separated and centered supplied sculptures; omitted textures; applied charcoal material." };
const material = new MeshStandardMaterial({ name: "Matte charcoal", color: "#252822", roughness: 0.84, metalness: 0.06 });
const statistics = [];
for (const [index, cube] of cubes.entries()) {
  const center = cube.bounds.getCenter(new Vector3());
  const vertexData = [], normalData = [];
  for (const triangle of cube.triangles) for (let vertex = triangle; vertex < triangle + 3; vertex++) {
    vertexData.push(positions.getX(vertex) - center.x, positions.getY(vertex) - center.y, positions.getZ(vertex) - center.z);
    normalData.push(normals.getX(vertex), normals.getY(vertex), normals.getZ(vertex));
  }
  const part = new BufferGeometry();
  part.setAttribute("position", new Float32BufferAttribute(vertexData, 3));
  part.setAttribute("normal", new Float32BufferAttribute(normalData, 3));
  const indexed = mergeVertices(part, 0.000001);
  const mesh = new Mesh(indexed, material);
  mesh.name = `Cube-${String(index + 1).padStart(2, "0")}`;
  mesh.userData.sourceCenter = center.toArray();
  if (selection === "all" || selection.split(",").includes(mesh.name)) output.add(mesh);
  statistics.push({ name: mesh.name, triangles: cube.triangles.length, vertices: indexed.getAttribute("position").count, dimensions: cube.bounds.getSize(new Vector3()).toArray() });
}
const glb = await new GLTFExporter().parseAsync(output, { binary: true, onlyVisible: true });
fs.writeFileSync(outputPath, Buffer.from(glb));
console.log(JSON.stringify({ sourceBytes: bytes.length, glbBytes: glb.byteLength, sourceTriangles: statistics.reduce((total, cube) => total + cube.triangles, 0), selectedMeshes: output.children.map((mesh) => mesh.name), meshes: statistics }, null, 2));
