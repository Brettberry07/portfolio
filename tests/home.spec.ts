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
  // The overscan canvas extends outside the viewport. Element screenshots scroll
  // the page and include animated HTML overlays; compare actual WebGL pixels.
  const frames = await canvas.evaluate(async (element: HTMLCanvasElement) => {
    await new Promise(requestAnimationFrame);
    const first = element.toDataURL();
    await new Promise((resolve) => setTimeout(resolve, 250));
    return [first, element.toDataURL()];
  });
  expect(frames[1]).toBe(frames[0]);
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
  await expect(page.locator(".ways-controls")).toBeHidden();
  await expect(page.locator(".ways-panel")).toHaveCount(4);
  for (const panel of await page.locator(".ways-panel").all()) {
    await panel.scrollIntoViewIfNeeded();
    await expect(panel.getByRole("heading")).toBeInViewport();
  }
  await context.close();
});

test("Ways I Work scrolls horizontally, releases, reverses and supports keyboard routes", async ({ page }) => {
  const errors = collectErrors(page);
  await page.goto("/");
  const section = page.locator(".ways-work");
  await expect(section).toHaveAttribute("data-scroll", "true");
  // Begin at the native sticky entry, then use real wheel input through all four panels.
  await section.evaluate(el => window.scrollTo({ top: el.getBoundingClientRect().top + scrollY - 96, behavior: "instant" }));
  await expect.poll(() => page.locator(".ways-sticky").evaluate(el => Math.round(el.getBoundingClientRect().top))).toBe(96);
  const distance = await section.evaluate(el => (el.getBoundingClientRect().height - innerHeight + 96) * .79 / 3);
  await page.mouse.move(15, 400);
  for (const index of [1, 2, 3]) {
    await page.mouse.wheel(0, distance + (index === 1 ? distance * .06 / (.79 / 3) : 0));
    await expect(page.locator(".ways-controls button").nth(index)).toHaveAttribute("aria-current", "step");
    await expect.poll(() => page.locator(".ways-sticky").evaluate(el => Math.round(el.getBoundingClientRect().top))).toBe(96);
  }
  await page.mouse.wheel(0, 950);
  await expect.poll(() => page.locator(".ways-sticky").evaluate(el => el.getBoundingClientRect().top)).toBeLessThan(0);
  await page.locator(".ways-controls button").first().evaluate((el: HTMLButtonElement) => el.click());
  await expect(page.locator(".ways-controls button").first()).toHaveAttribute("aria-current", "step");
  const product = page.getByRole("button", { name: "02 Product development", exact: true });
  await product.click();
  await expect(product).toHaveAttribute("aria-current", "step");
  await product.press("ArrowRight");
  const systems = page.getByRole("button", { name: "03 Systems & automation", exact: true });
  await expect(systems).toBeFocused();
  await expect(systems).toHaveAttribute("aria-current", "step");
  await page.mouse.wheel(0, -distance);
  await expect(product).toHaveAttribute("aria-current", "step");
  await product.press("End");
  await expect(page.getByRole("button", { name: "04 Client collaboration", exact: true })).toBeFocused();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.locator("#way-panel-3").getByRole("link", { name: "City of Bentonville Traffic" }).click();
  await expect(page).toHaveURL(/\/projects\/city-of-bentonville-traffic$/);
  expect(errors).toEqual([]);
});

test("Ways I Work shows every panel with reduced motion, including live changes", async ({ page }) => {
  await page.goto("/");
  await page.emulateMedia({ reducedMotion: "reduce" });
  const section = page.locator(".ways-work");
  await expect(section).toHaveAttribute("data-scroll", "false");
  await expect(page.locator(".ways-sticky")).toHaveCSS("position", "relative");
  await expect(page.locator(".ways-track")).toHaveCSS("transform", "none");
  for (const panel of await page.locator(".ways-panel").all()) {
    await panel.scrollIntoViewIfNeeded();
    await expect(panel.getByRole("heading")).toBeInViewport();
    await expect(panel.getByRole("link").first()).toBeInViewport();
  }
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect(section).toHaveAttribute("data-scroll", "true");
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
      // Keep the stop/settling window on slow software WebGL too: waiting for
      // 48 frames at 7fps made this otherwise passing check exceed its timeout.
      const started = performance.now();
      for (let frame = 0; frame < 48 && (frame < 6 || performance.now() - started < 1200); frame++) {
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
      const p = current.progress;
      const expectedScale = p <= 0.4 ? 1 + p * 0.1 : p <= 0.75 ? 1.04 - (p - 0.4) * (0.03 / 0.35) : 1.01 - (p - 0.75) * 0.12;
      expect(current.targetScale).toBeCloseTo(expectedScale, 6);
      if (index) expect(Math.abs(current.scale[0] - frames[index - 1].scale[0])).toBeLessThan(base * 0.005);
    }
    const stopped = frames.at(-1)!;
    const afterStop = await sample();
    expect(Math.abs(stopped.scale[0] - afterStop.scale[0])).toBeLessThan(base * 0.001);
    results.push({ delta, frames });
  }
  expect((await sample()).progress).toBeCloseTo(0, 2);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect.poll(async () => (await sample()).targetScale).toBe(1);
  await page.mouse.wheel(0, 60);
  await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(40);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.mouse.wheel(0, 60);
  await expect.poll(async () => (await sample()).targetScale).toBeGreaterThan(1.005);
  await page.waitForTimeout(800); // Let the preceding wheel input finish before the larger stage checks.
  for (const progress of [0.4, 0.75, 0.95, 0.75, 0.4, 0]) {
    const target = await page.locator("#home").evaluate((hero, p) => hero.getBoundingClientRect().height * p, progress);
    await page.mouse.wheel(0, target - await page.evaluate(() => scrollY));
    await expect.poll(async () => (await sample()).progress).toBeCloseTo(progress, 2);
    const snapshot = await sample();
    expect(snapshot.targetScale).toBeLessThanOrEqual(1.04);
    expect(snapshot.width).toBe(initial.width);
    expect(snapshot.height).toBe(initial.height);
    const bounds = await page.evaluate(() => ({
      heroBottom: document.querySelector("#home")!.getBoundingClientRect().bottom,
      aboutTop: document.querySelector("#about-title")!.getBoundingClientRect().top,
      clipping: getComputedStyle(document.querySelector(".hero-scene-boundary")!).overflow,
    }));
    expect(bounds.clipping).toBe("clip");
    expect(bounds.heroBottom).toBeLessThan(bounds.aboutTop);
  }
  await testInfo.attach("scroll-transform-frames.json", { body: JSON.stringify(results), contentType: "application/json" });
  expect(errors).toEqual([]);
});

test("entrances wait for the reading area and progress without a backward jump", async ({ page }, testInfo) => {
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await expect(page.getByTestId("scene-host")).toHaveAttribute("data-renderer", "webgl");
  // Let the initial shader compilation/render finish before timing an entrance.
  // Software WebGL can block JS sampling while a compositor animation continues.
  await page.locator("canvas").evaluate(async () => {
    await new Promise(requestAnimationFrame);
    await new Promise(requestAnimationFrame);
  });
  const sequence = page.locator(".about-copy .entrance-sequence");
  const lines = page.locator(".about-heading-line > span");
  const height = page.viewportSize()!.height;
  const top = await sequence.evaluate((element) => element.getBoundingClientRect().top + scrollY);
  const poses = () => lines.evaluateAll((elements) => elements.map((element) => new DOMMatrixReadOnly(getComputedStyle(element).transform).m42));

  // Content is already readable at the bottom, but has not spent its entrance.
  await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), top - height * 0.8);
  await expect.poll(poses).toEqual([18, 18]);
  await page.waitForTimeout(200);
  expect(await poses()).toEqual([18, 18]);

  // Both lines share one stationary cue; the second follows the first.
  // Start recording in the same browser task as the trigger; a protocol round
  // trip can miss an entire compositor animation under software-WebGL load.
  const frames = await lines.first().evaluate(async (element, target) => {
    const lines = element.closest("h2")!.querySelectorAll(".entrance");
    const frames: { time: number; y: number[] }[] = [];
    const start = performance.now();
    window.scrollTo({ top: target, behavior: "instant" });
    while (performance.now() - start < 1800) {
      await new Promise(requestAnimationFrame);
      frames.push({ time: performance.now() - start, y: Array.from(lines, (line) => new DOMMatrixReadOnly(getComputedStyle(line).transform).m42) });
    }
    return frames;
  }, top - height * 0.43);
  await testInfo.attach("entrance-frames.json", { body: JSON.stringify(frames), contentType: "application/json" });
  let previous = [18, 18];
  for (const frame of frames) {
    for (let line = 0; line < 2; line++) {
      expect(frame.y[line]).toBeGreaterThanOrEqual(-0.05);
      expect(frame.y[line]).toBeLessThanOrEqual(previous[line] + 0.05);
    }
    expect(frame.y[0]).toBeLessThanOrEqual(frame.y[1] + 0.05);
    previous = frame.y;
  }
  expect(frames.some((frame) => frame.y[1] - frame.y[0] > 1)).toBe(true);
  await expect.poll(poses).toEqual([0, 0]);
  await page.screenshot({ path: testInfo.outputPath("reading-area.png") });
  // Once is intentional: returning to a section must not reset visible text.
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), top - height * 0.43);
  expect(await poses()).toEqual([0, 0]);
});
