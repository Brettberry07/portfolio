import { expect, test, type Page } from "@playwright/test";

const slugs = ["querry-berry", "fig", "tariff-ninja", "potential-energy-tech", "amazeum", "still-on", "city-of-bentonville-traffic"];

function collectErrors(page: Page) {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
  return errors;
}
async function checkContent(page: Page) {
  await expect(page.getByRole("heading", { name: "BRETT BERRY." })).toBeVisible();
  await expect(page.locator(".hero-tagline")).toHaveText("Building what's next.");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
}

test("full portfolio, live sculpture, navigation and honest contact state", async ({ page }, testInfo) => {
  const errors = collectErrors(page);
  await page.goto("/");
  await checkContent(page);
  const scene = page.getByTestId("scene-host");
  await expect(scene).toHaveAttribute("data-renderer", "webgl");
  await expect(scene.locator("canvas")).toBeVisible();
  // Read the drawing buffer directly: element screenshots can scroll an oversized,
  // intentionally cropped canvas out of the hero and pause its offscreen renderer.
  const first = await scene.locator("canvas").evaluate((canvas: HTMLCanvasElement) => canvas.toDataURL());
  await expect.poll(() => scene.locator("canvas").evaluate((canvas: HTMLCanvasElement) => canvas.toDataURL())).not.toBe(first);
  await page.screenshot({ path: testInfo.outputPath("hero.png") });
  await page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "Contact" }).click();
  await expect(page.getByRole("heading", { name: "Have something in mind? Let’s build it." })).toBeInViewport();
  await expect(page.getByRole("button", { name: "Send a message" })).toBeDisabled();
  await expect(page.getByText("Email delivery is not connected yet.", { exact: false })).toBeVisible();
  await page.getByLabel("Your name", { exact: false }).fill("Portfolio visitor");
  await expect(page.getByLabel("Your name", { exact: false })).toHaveValue("Portfolio visitor");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  expect(errors).toEqual([]);
});

test("project selection supports click, keyboard and case-study navigation", async ({ page }) => {
  await page.goto("/#projects");
  await page.getByRole("button", { name: "03 Tariff Ninja", exact: true }).click();
  await expect(page.locator("#active-project-card h3")).toHaveText("Tariff Ninja");
  await page.getByRole("button", { name: "03 Tariff Ninja", exact: true }).press("ArrowRight");
  await expect(page.locator("#active-project-card h3")).toHaveText("Potential Energy Tech");
  await page.getByRole("button", { name: "Next project", exact: true }).click();
  await expect(page.locator("#active-project-card h3")).toHaveText("Amazeum");
  await page.getByRole("button", { name: "Previous project", exact: true }).click();
  await page.getByRole("link", { name: "View case study", exact: true }).click();
  await expect(page).toHaveURL(/\/projects\/potential-energy-tech$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Potential Energy Tech.");
  await expect(page.getByRole("link", { name: "Back to selected work" })).toBeVisible();
});

test("all seven case studies resolve with full editorial sections", async ({ page, request }, testInfo) => {
  for (const slug of slugs) {
    const response = await request.get(`/projects/${slug}`);
    expect(response.status()).toBe(200);
    expect(await response.text()).toContain("Behind the build.");
  }
  await page.goto("/projects/city-of-bentonville-traffic");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("City of Bentonville Traffic.");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({ path: testInfo.outputPath("case-study.png"), fullPage: true });
  expect((await request.get("/projects/not-a-project")).status()).toBe(404);
});

test("reduced motion keeps the sculpture still and anchors native", async ({ page }) => {
  const errors = collectErrors(page);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await checkContent(page);
  await expect(page.getByTestId("scene-host")).toHaveAttribute("data-renderer", "webgl");
  const canvas = page.getByTestId("scene-host").locator("canvas");
  const frame = await canvas.screenshot();
  expect((await canvas.screenshot()).equals(frame)).toBe(true);
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe("auto");
  await page.mouse.move(10, 420);
  await page.mouse.wheel(0, 250);
  await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(200);
  await page.getByRole("navigation").getByRole("link", { name: "Experience" }).click();
  await expect(page.getByRole("heading", { name: "Built on perspective." })).toBeInViewport();
  expect(errors).toEqual([]);
});

test("WebGL unavailable retains the real sculpture poster and content", async ({ page }, testInfo) => {
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (this: HTMLCanvasElement, type, ...args) {
      if (String(type).startsWith("webgl")) return null;
      return original.call(this, type, ...args);
    } as typeof original;
  });
  const errors = collectErrors(page);
  await page.goto("/");
  await checkContent(page);
  await expect(page.locator("canvas")).toHaveCount(0);
  await expect(page.getByTestId("scene-fallback")).toBeVisible();
  await expect(page.getByTestId("scene-fallback")).toHaveCSS("background-image", /hero-poster(?:-mobile|-tablet)?\.webp/);
  await page.screenshot({ path: testInfo.outputPath("webgl-fallback.png") });
  expect(errors).toEqual([]);
});

test("no JavaScript retains semantic content, poster, anchors and safe form", async ({ browser }, testInfo) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: testInfo.project.use.viewport });
  const page = await context.newPage();
  await page.goto("/");
  await checkContent(page);
  await expect(page.getByTestId("scene-fallback")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Selected work." })).toBeVisible();
  await expect(page.getByRole("button", { name: "Send a message" })).toBeHidden();
  await expect(page.locator(".contact-form")).toHaveAttribute("method", "post");
  await context.close();
});

test("Ways I Work supports selection, keyboard movement and contextual routes", async ({ page }) => {
  await page.goto("/#about");
  const product = page.getByRole("tab", { name: "02 Product development" });
  await product.click();
  await expect(product).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("tabpanel")).toContainText("Taking ideas from early discovery");
  await product.press("ArrowRight");
  await expect(page.getByRole("tabpanel")).toContainText("Finding inefficiencies");
  await page.getByRole("tab", { name: "03 Systems & automation" }).press("End");
  const collaboration = page.getByRole("tab", { name: "04 Client collaboration" });
  await expect(collaboration).toBeFocused();
  await expect(collaboration).toHaveAttribute("aria-selected", "true");
  await page.getByRole("tabpanel").getByRole("link", { name: "City of Bentonville Traffic" }).click();
  await expect(page).toHaveURL(/\/projects\/city-of-bentonville-traffic$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("City of Bentonville Traffic.");
});

test("hero transforms stay continuous through wheel stops and direction reversals", async ({ page }, testInfo) => {
  test.setTimeout(60_000);
  type Snapshot = { progress: number; targetScale: number; scale: number[]; position: number[]; rotation: number[]; camera: number[]; aspect: number; width: number; height: number };
  const errors = collectErrors(page);
  await page.goto("/");
  await expect(page.getByTestId("scene-host")).toHaveAttribute("data-renderer", "webgl");
  await expect(page.locator("html")).toHaveClass(/lenis/);
  const sample = () => page.locator("canvas").evaluate((canvas) => (canvas as HTMLCanvasElement & { sculptureSnapshot: () => Snapshot }).sculptureSnapshot());
  const initial = await sample();
  const base = initial.scale[0];
  const results = [];
  await page.mouse.move(10, 420);
  for (const delta of [70, 70, 70, -50, -50, -50, -60]) {
    await page.mouse.wheel(0, delta);
    // Sample the actual Three transform every frame, including the delayed
    // measurement window that previously changed camera aspect after a stop.
    const frames = await page.locator("canvas").evaluate(async (canvas) => {
      const element = canvas as HTMLCanvasElement & { sculptureSnapshot: () => Snapshot };
      const frames: Snapshot[] = [];
      for (let frame = 0; frame < 48; frame++) {
        await new Promise(requestAnimationFrame);
        frames.push(element.sculptureSnapshot());
      }
      return frames;
    });
    for (let index = 0; index < frames.length; index++) {
      const current = frames[index];
      expect(current.width).toBe(initial.width);
      expect(current.height).toBe(initial.height);
      expect(current.aspect).toBeCloseTo(initial.aspect, 8);
      expect(current.camera).toEqual(initial.camera);
      expect(Math.abs(current.scale[0] / base - current.targetScale)).toBeLessThan(0.002);
      expect(current.targetScale).toBeCloseTo(1 + current.progress * 0.16, 6);
      if (index) expect(Math.abs(current.scale[0] - frames[index - 1].scale[0])).toBeLessThan(base * 0.005);
    }
    const stopped = frames.at(-1)!;
    const afterStop = await sample();
    expect(Math.abs(stopped.scale[0] - afterStop.scale[0])).toBeLessThan(base * 0.001);
    results.push({ delta, frames });
  }
  expect((await sample()).progress).toBeCloseTo(0, 2);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.mouse.wheel(0, 60);
  await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(40);
  await expect.poll(async () => (await sample()).targetScale).toBe(1);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.mouse.wheel(0, 60);
  await expect.poll(async () => (await sample()).targetScale).toBeGreaterThan(1.01);
  await testInfo.attach("scroll-transform-frames.json", { body: JSON.stringify(results), contentType: "application/json" });
  expect(errors).toEqual([]);
});
