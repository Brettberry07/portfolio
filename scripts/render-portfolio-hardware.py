"""Build original portfolio hardware in Blender.

Run from the repository root with Blender and Pillow available to its Python:
    blender --background --python-exit-code 1 --python scripts/render-portfolio-hardware.py
The GLBs contain the reusable geometry. The transparent renders and projected
screen coordinates let the site composite live screens without a WebGL context.
"""
import json
from pathlib import Path

import bpy
from bpy_extras.object_utils import world_to_camera_view
from mathutils import Vector
from PIL import Image, ImageChops

ROOT = Path(__file__).resolve().parents[1]
IMAGES = ROOT / "public/images/portfolio"
MODELS = ROOT / "public/models/portfolio"
SCREENS = ROOT / "src/components/portfolio/hardware.json"
CORNERS = {}


def material(name, color, roughness=.65, metallic=0):
    result = bpy.data.materials.new(name)
    result.diffuse_color = (*color, 1)
    result.use_nodes = True
    shader = result.node_tree.nodes.get("Principled BSDF")
    shader.inputs["Base Color"].default_value = (*color, 1)
    shader.inputs["Roughness"].default_value = roughness
    shader.inputs["Metallic"].default_value = metallic
    return result


def box(name, location, size, finish, rounding=.035):
    bpy.ops.mesh.primitive_cube_add(size=1, location=location)
    obj = bpy.context.object
    obj.name = name
    obj.dimensions = size
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    obj.data.materials.append(finish)
    bevel = obj.modifiers.new("Molded edges", "BEVEL")
    bevel.width = rounding
    bevel.segments = 4
    normals = obj.modifiers.new("Weighted normals", "WEIGHTED_NORMAL")
    normals.keep_sharp = True
    return obj


def indicator(name, location, radius, finish):
    bpy.ops.mesh.primitive_uv_sphere_add(segments=16, ring_count=8, radius=radius, location=location)
    obj = bpy.context.object
    obj.name = name
    obj.scale.y = .45
    obj.data.materials.append(finish)
    for polygon in obj.data.polygons:
        polygon.use_smooth = True


def make_monitor():
    cream = material("Warm ivory ABS", (.53, .48, .36))
    light = material("Front bezel · ivory ABS", (.69, .64, .50))
    shell = material("Rear housing · warm grey", (.40, .38, .29))
    edge = material("Rubber feet and seams", (.061, .063, .049))
    inset = material("Inset · smoked olive", (.16, .17, .133))
    glass = material("CRT glass", (.025, .046, .031), .24)
    cap = material("Keyboard caps · parchment", (.53, .52, .43))
    dark_cap = material("Keyboard caps · moss", (.23, .285, .197))
    led = material("Phosphor status lamp", (.28, .62, .15), .32)

    box("CRT rear housing", (0, .41, 2.79), (4.05, 2.12, 3.23), shell, .22)
    box("CRT upper clamshell", (0, -.25, 2.82), (4.4, 1.85, 3.41), cream, .21)
    box("Front casing seam", (0, -1.00, 2.82), (4.37, .13, 3.36), inset, .12)
    box("CRT front bezel", (0, -1.102, 2.83), (4.42, .245, 3.36), light, .16)
    box("CRT chamfer border", (0, -1.238, 3.015), (4.02, .115, 2.61), cream, .115)
    box("CRT shadow border", (0, -1.301, 3.012), (3.88, .095, 2.46), inset, .09)
    box("CRT interior gasket", (0, -1.357, 3.012), (3.765, .052, 2.349), edge, .052)
    box("CRT screen", (0, -1.39, 3.012), (3.685, .041, 2.271), glass, .036)

    box("Pedestal arm", (0, .03, .83), (2.42, 1.56, .85), inset, .14)
    box("Desk plinth", (0, -.05, .285), (4.27, 2.31, .46), cream, .125)
    box("Desk plinth foot", (0, -.02, .105), (4.1, 2.15, .13), edge, .04)
    for n in range(9):
        box("Side ventilation slot", (2.191, .012 + n * .114, 3.61), (.036, .054, .58), inset, .022)
    for n in range(8):
        box("Speaker grille", (-1.97 + n * .115, -1.23, 1.447), (.067, .026, .051), inset, .012)
    box("Power switch", (1.75, -1.24, 1.447), (.22, .067, .153), cream, .037)
    indicator("Power indicator", (1.51, -1.249, 1.447), .034, led)

    box("Keyboard base", (.075, -2.34, .125), (4.72, 1.28, .21), inset, .085)
    box("Keyboard upper panel", (.075, -2.34, .241), (4.75, 1.31, .18), cream, .085)
    caps = {}
    for row in range(4):
        for col in range(16):
            location = (-2.04 + col * .277, -1.914 - row * .211, .356 - row * .013)
            finish = dark_cap if col == 0 or col >= 14 else cap
            if finish.name not in caps:
                key = box("Keycap", location, (.231, .158, .105), finish, .022)
                for modifier in list(key.modifiers):
                    bpy.ops.object.modifier_apply(modifier=modifier.name)
                caps[finish.name] = key.data
            else:
                key = bpy.data.objects.new("Keycap", caps[finish.name])
                key.location = location
                bpy.context.collection.objects.link(key)
    for center, width in [(-1.85, .57), (-1.29, .42), (.02, 2.07), (1.29, .36), (1.72, .37), (2.13, .36)]:
        box("Bottom row key", (center, -2.78, .302), (width, .154, .108),
            cap if width > 1 else dark_cap, .025)

    # The web screen is just ahead of the dark physical glass.
    return (-1.819, 1.819, -1.414, 1.906, 4.118)


def make_phone():
    shell = material("Handheld · mineral plastic", (.255, .286, .225), .55)
    seam = material("Handheld case seam", (.083, .102, .075))
    front = material("Handheld face · sage aluminum", (.50, .535, .435), .42, .16)
    black = material("Handheld glass surround", (.022, .035, .028), .27)
    glass = material("Handheld display", (.048, .063, .050), .22)
    key = material("Handheld keys", (.16, .19, .145), .53)

    box("Rear housing", (0, .088, 2.30), (2.30, .49, 4.55), shell, .22)
    box("Side seam", (0, -.164, 2.30), (2.315, .11, 4.55), seam, .095)
    box("Front plate", (0, -.219, 2.30), (2.30, .203, 4.53), front, .10)
    box("Display surround", (0, -.325, 2.48), (2.065, .083, 3.67), black, .041)
    box("Display glass", (0, -.371, 2.49), (1.96, .055, 3.511), glass, .026)
    box("Earpiece", (0, -.327, 4.40), (.46, .028, .056), seam, .014)
    for row in range(2):
        for col in range(6):
            box("Speaker perforation", (.635 + col * .052, -.329, .273 + row * .056), (.023, .024, .024), seam, .009)
    box("Home key", (0, -.325, .335), (.58, .08, .177), shell, .040)
    box("Volume rocker", (-1.17, .029, 3.38), (.09, .225, .59), key, .043)
    box("Side key", (-1.171, .029, 2.91), (.09, .185, .24), key, .038)
    return (-.966, .966, -.406, .762, 4.215)


def area_light(name, location, target, power, size, color):
    bpy.ops.object.light_add(type="AREA", location=location)
    obj = bpy.context.object
    obj.name = name
    obj.data.energy = power
    obj.data.shape = "DISK"
    obj.data.size = size
    obj.data.color = color
    obj.rotation_euler = (Vector(target) - obj.location).to_track_quat("-Z", "Y").to_euler()


def fade_shadow_edges(image):
    # Feather the outer shadow catcher so the render blends into the paper stage.
    width, height = image.size
    mask = Image.new("L", image.size)
    x_weights = [min(1., x / 90, (width - 1 - x) / 90) for x in range(width)]
    y_weights = [min(1., y / 32, (height - 1 - y) / 72) for y in range(height)]
    mask.putdata([round(255 * x * y) for y in y_weights for x in x_weights])
    image.putalpha(ImageChops.multiply(image.getchannel("A"), mask))
    return image


def render(name, size, scale, target, direction, make, samples=96):
    bpy.ops.wm.read_factory_settings(use_empty=True)
    left, right, front, bottom, top = make()
    bpy.ops.export_scene.gltf(
        filepath=str(MODELS / f"{name}.glb"),
        export_format="GLB", export_apply=True,
    )

    scene = bpy.context.scene
    scene.render.engine = "CYCLES"
    scene.cycles.samples = samples
    scene.cycles.use_denoising = False
    scene.render.threads_mode = "FIXED"
    scene.render.threads = 8
    scene.render.film_transparent = True
    scene.render.image_settings.color_mode = "RGBA"
    scene.render.resolution_x, scene.render.resolution_y = size
    scene.render.resolution_percentage = 100
    scene.view_settings.view_transform = "AgX"

    bpy.ops.mesh.primitive_plane_add(size=200)
    bpy.context.object.is_shadow_catcher = True
    scene.world = bpy.data.worlds.new("Paper studio")
    scene.world.use_nodes = True
    scene.world.node_tree.nodes.get("Background").inputs[0].default_value = (.59, .60, .47, 1)
    scene.world.node_tree.nodes.get("Background").inputs[1].default_value = .46
    area_light("Soft key", (-4, -5, 8.5), target, 1150, 5.0, (1.0, .935, .82))
    area_light("Bounce", (4, -4, 5), target, 330, 6.0, (.84, .91, 1.0))
    area_light("Edge light", (1.5, 4, 7.5), target, 700, 4.0, (1.0, .96, .86))

    bpy.ops.object.camera_add(location=Vector(target) + Vector(direction))
    camera = bpy.context.object
    camera.rotation_euler = (Vector(target) - camera.location).to_track_quat("-Z", "Y").to_euler()
    camera.data.type = "ORTHO"
    camera.data.ortho_scale = scale
    scene.camera = camera
    bpy.context.view_layer.update()

    def project(x, z):
        point = world_to_camera_view(scene, camera, Vector((x, front, z)))
        return [round(point.x * size[0], 4), round((1 - point.y) * size[1], 4)]

    CORNERS[name] = {
        "width": size[0], "height": size[1],
        "topLeft": project(left, top), "topRight": project(right, top), "bottomLeft": project(left, bottom),
    }
    png = Path(bpy.app.tempdir) / f"portfolio-{name}.png"
    scene.render.filepath = str(png)
    bpy.ops.render.render(write_still=True)
    with Image.open(png) as image:
        fade_shadow_edges(image).save(IMAGES / f"{name}.webp", quality=89, method=6)
    png.unlink()


IMAGES.mkdir(parents=True, exist_ok=True)
MODELS.mkdir(parents=True, exist_ok=True)
render("monitor", (1080, 920), 6.77, (0, -.79, 2.21), (2.36, -10.7, 2.87), make_monitor)
render("handheld", (562, 920), 5.60, (0, -.10, 2.28), (-1.24, -9.0, 1.28), make_phone)
SCREENS.write_text(json.dumps(CORNERS, indent=2) + "\n")
