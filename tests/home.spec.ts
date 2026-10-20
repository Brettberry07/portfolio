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
  const first = await scene.locator("canvas").screenshot();
  await expect.poll(async () => (await scene.locator("canvas").screenshot()).equals(first)).toBe(false);
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
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await checkContent(page);
  await expect(page.getByTestId("scene-host")).toHaveAttribute("data-renderer", "webgl");
  const canvas = page.getByTestId("scene-host").locator("canvas");
  const frame = await canvas.screenshot();
  expect((await canvas.screenshot()).equals(frame)).toBe(true);
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe("auto");
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
  await expect(page.getByTestId("scene-fallback")).toHaveCSS("background-image", /hero-poster.webp/);
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
