import { expect, test, type Page } from "@playwright/test";

function collectErrors(page: Page) {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
  return errors;
}

async function checkContent(page: Page) {
  await expect(page.getByRole("heading", { name: "BRETT BERRY" })).toBeVisible();
  await expect(page.getByText("Building what's next.", { exact: true })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
}

test("homepage, live WebGL, and scroll-linked Motion", async ({ page }, testInfo) => {
  const errors = collectErrors(page);
  await page.goto("/");
  await checkContent(page);
  await expect(page.getByTestId("motion-proof")).toBeVisible();
  const host = page.getByTestId("scene-host");
  await expect(host).toHaveAttribute("data-renderer", "webgl");
  await expect(host.locator("canvas")).toBeVisible();
  // Compare actual rendered frames to prove the scene draws and animates.
  const firstFrame = await host.locator("canvas").screenshot();
  await expect.poll(async () => (await host.locator("canvas").screenshot()).equals(firstFrame)).toBe(false);
  await page.screenshot({ path: testInfo.outputPath("homepage.png"), fullPage: true });
  const progress = page.getByTestId("scroll-progress");
  const before = await progress.evaluate((element) => getComputedStyle(element).transform);
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await expect.poll(() => progress.evaluate((element) => getComputedStyle(element).transform)).not.toBe(before);
  await expect(page.getByTestId("motion-proof")).toBeVisible();
  await page.evaluate(() => window.scrollTo(0, 0));
  await checkContent(page);
  expect(errors).toEqual([]);
});

test("reduced motion keeps the scene and scroll proof still", async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  const errors = collectErrors(page);
  await page.goto("/");
  await checkContent(page);
  await expect(page.getByTestId("scene-host")).toHaveAttribute("data-renderer", "webgl");
  const canvas = page.getByTestId("scene-host").locator("canvas");
  const frame = await canvas.screenshot();
  expect((await canvas.screenshot()).equals(frame)).toBe(true);
  await expect(page.getByTestId("scroll-progress")).toHaveCSS("transform", "none");
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await expect(page.getByTestId("scroll-progress")).toHaveCSS("transform", "none");
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: testInfo.outputPath("reduced-motion.png"), fullPage: true });
  expect(errors).toEqual([]);
});

test("WebGL unavailable shows the readable static fallback", async ({ page }, testInfo) => {
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
  await expect(page.getByTestId("scene-host")).toHaveAttribute("data-renderer", "fallback");
  await expect(page.getByTestId("scene-fallback")).toBeVisible();
  await expect(page.locator("canvas")).toHaveCount(0);
  await page.screenshot({ path: testInfo.outputPath("webgl-fallback.png"), fullPage: true });
  expect(errors).toEqual([]);
});

test("semantic content and static preview survive without JavaScript", async ({ browser }, testInfo) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: testInfo.project.use.viewport });
  const page = await context.newPage();
  await page.goto("/");
  await checkContent(page);
  await expect(page.getByTestId("motion-proof")).toBeVisible();
  await expect(page.getByTestId("scene-fallback")).toBeVisible();
  await context.close();
});
