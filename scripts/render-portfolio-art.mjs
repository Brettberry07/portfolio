import { readFile, writeFile, mkdir } from "node:fs/promises";
import { chromium } from "@playwright/test";
import ts from "typescript";

const root = new URL("../", import.meta.url);
const images = new URL("public/images/portfolio/", root);
const source = new URL("src/components/portfolio/", root);
await mkdir(images, { recursive: true });

const toModule = async (file, mathModule) => {
  const input = await readFile(new URL(file, source), "utf8");
  const { outputText } = ts.transpileModule(input, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
  });
  const code = mathModule ? outputText.replace('"./art-math"', JSON.stringify(mathModule)) : outputText;
  return `data:text/javascript;base64,${Buffer.from(code).toString("base64")}`;
};

const math = await toModule("art-math.ts");
const [glyphModule, roadModule] = await Promise.all([
  toModule("glyph-art.ts", math), toModule("road-art.ts", math),
]);

const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
  const posters = await page.evaluate(async ({ glyphModule, roadModule, math }) => {
    const { cloudWidth, cloudHeight, createGlyphRenderer } = await import(glyphModule);
    const { roadWidth, roadHeight, createRoadRenderer } = await import(roadModule);
    const canvas = document.createElement("canvas");
    canvas.width = cloudWidth;
    canvas.height = cloudHeight;
    createGlyphRenderer(canvas).draw(0);
    const cloud = canvas.toDataURL("image/webp", .88);
    canvas.width = roadWidth;
    canvas.height = roadHeight;
    const road = createRoadRenderer(canvas);
    road(.16);
    const existing = canvas.toDataURL("image/webp", .92);
    road(.67);
    const proposed = canvas.toDataURL("image/webp", .92);
    canvas.width = canvas.height = 144;
    const context = canvas.getContext("2d");
    const data = context.createImageData(144, 144);
    const { seededRandom } = await import(math);
    const next = seededRandom(64821);
    for (let index = 0; index < data.data.length; index += 4) {
      const tone = next() > .44 ? 50 : 255;
      data.data[index] = tone;
      data.data[index + 1] = tone;
      data.data[index + 2] = tone;
      data.data[index + 3] = next() * 8;
    }
    context.putImageData(data, 0, 0);
    return { cloud, "traffic-existing": existing, "traffic-proposed": proposed, "paper-grain": canvas.toDataURL("image/webp", .94) };
  }, { glyphModule, roadModule, math });

  await Promise.all(Object.entries(posters).map(([name, data]) => (
    writeFile(new URL(`${name}.webp`, images), Buffer.from(data.split(",")[1], "base64"))
  )));

  const [display, mono] = await Promise.all([
    readFile(new URL("public/fonts/inter-tight-latin.woff2", root), "base64"),
    readFile(new URL("public/fonts/dm-mono-latin.woff2", root), "base64"),
  ]);
  await page.setContent(`<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Brett Berry</title><style>
    @font-face{font-family:Display;src:url(data:font/woff2;base64,${display});font-weight:400 700}
    @font-face{font-family:Mono;src:url(data:font/woff2;base64,${mono})}
    *{box-sizing:border-box}body{margin:0;color:#171b16;background:#f2ede2 url(${posters["paper-grain"]})}
    main{width:1200px;height:630px;padding:62px 70px;position:relative;border:1px solid #cac4b7}
    .frame{position:absolute;inset:31px;border:1px solid #c7c5b8;pointer-events:none}
    img{position:absolute;width:699px;height:auto;right:15px;top:28px}
    .copy{position:relative;z-index:1;top:50px}
    p{font:19px Mono,monospace;letter-spacing:.13em;color:#28513a;margin:12px 0 23px;text-transform:uppercase}
    h1{font:600 143px/.85 Display,sans-serif;letter-spacing:-.053em;margin:0}
    span{color:#28513a}
    footer{position:absolute;bottom:55px;left:70px;font:17px Mono;color:#3e4b3d;letter-spacing:.04em}
  </style></head><body><main><div class="frame"></div><img src="${posters.cloud}" alt=""><div class="copy"><p>Software engineer</p><h1>Brett<br>Berry<span>.</span></h1></div><footer>brettberry.dev</footer></main></body></html>`);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: new URL("src/app/opengraph-image.jpg", root).pathname, quality: 88 });
} finally {
  await browser.close();
}
