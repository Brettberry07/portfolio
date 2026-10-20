"""Strip embedded texture maps from the acquired CC0 loop GLB; retain mesh geometry.
Usage: python3 scripts/optimize-sculpture.py source.glb public/models/hero-architecture.glb
Original: https://www.innerscene.com/tools/library/3d-parts/abstract-loop-sculpture-6a4b97e1
"""
import json
import struct
import sys

source = open(sys.argv[1], "rb").read()
json_length = struct.unpack_from("<I", source, 12)[0]
data = json.loads(source[20:20 + json_length])
binary_start = 20 + json_length + 8
original_binary = source[binary_start:]
image_views = {image["bufferView"] for image in data.get("images", [])}
views, binary, remap = [], bytearray(), {}
for index, view in enumerate(data["bufferViews"]):
    if index in image_views:
        continue
    while len(binary) % 4:
        binary.append(0)
    remap[index] = len(views)
    start = view.get("byteOffset", 0)
    views.append({**view, "byteOffset": len(binary)})
    binary.extend(original_binary[start:start + view["byteLength"]])
for accessor in data["accessors"]:
    accessor["bufferView"] = remap[accessor["bufferView"]]
data["bufferViews"] = views
data["buffers"] = [{"byteLength": len(binary)}]
for field in ("images", "textures", "samplers", "extensionsUsed", "extensionsRequired"):
    data.pop(field, None)
data["materials"] = [{"name": "Neutral studio finish", "pbrMetallicRoughness": {"baseColorFactor": [.65, .65, .62, 1], "metallicFactor": .7, "roughnessFactor": .3}}]
for mesh in data["meshes"]:
    for primitive in mesh["primitives"]:
        primitive["material"] = 0
encoded = json.dumps(data, separators=(",", ":")).encode()
encoded += b" " * (-len(encoded) % 4)
binary += b"\0" * (-len(binary) % 4)
result = struct.pack("<III", 0x46546c67, 2, 28 + len(encoded) + len(binary)) + struct.pack("<II", len(encoded), 0x4e4f534a) + encoded + struct.pack("<II", len(binary), 0x004e4942) + binary
open(sys.argv[2], "wb").write(result)
print(f"Optimized GLB: {len(source):,} → {len(result):,} bytes; geometry unchanged.")
