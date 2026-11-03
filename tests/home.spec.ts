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

test("work-first portfolio keeps the live sculpture and contact routes accessible", async ({ page }, testInfo) => {
  const errors = collectErrors(page);
  await page.goto("/");
  await checkContent(page);
  const scene = page.getByTestId("scene-host");
  await expect(scene).toHaveAttribute("data-renderer", "webgl");
  const first = await scene.locator("canvas").evaluate((canvas: HTMLCanvasElement) => canvas.toDataURL());
  await expect.poll(() => scene.locator("canvas").evaluate((canvas: HTMLCanvasElement) => canvas.toDataURL())).not.toBe(first);
  expect(await page.locator("main > section").evaluateAll((sections) => sections.map(section => section.id))).toEqual(["home", "projects", "about", "experience", "education", "toolkit", "contact"]);
  const gap = await page.evaluate(() => document.querySelector("#projects")!.getBoundingClientRect().top - document.querySelector("#home")!.getBoundingClientRect().bottom);
  expect(Math.abs(gap)).toBeLessThan(1);
  await page.screenshot({ path: testInfo.outputPath("hero.png") });
  if (testInfo.project.name === "mobile") await page.locator(".mobile-navigation summary").click();
  await page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "Contact" }).click();
  await expect(page.getByRole("heading", { name: "Have something in mind? Let’s build it." })).toBeInViewport();
  await expect(page.locator("#contact").getByRole("link", { name: "brettberry07@gmail.com" })).toHaveAttribute("href", "mailto:brettberry07@gmail.com");
  await expect(page.getByLabel("Organization", { exact: false })).toHaveCount(0);
  expect(errors).toEqual([]);
});

test("project selection is deliberate, keyboard and touch accessible, and opens stable routes", async ({ page }, testInfo) => {
  await page.goto("/#projects");
  await expect(page.locator("#active-project-card h3")).toHaveText("Tariff Ninja");
  if (testInfo.project.name === "mobile") {
    await page.getByRole("combobox", { name: "SELECT A PROJECT" }).selectOption("1");
  } else {
    const first = page.getByRole("button", { name: /^01 Tariff Ninja/ });
    await first.click();
    await first.press("ArrowRight");
    await expect(page.getByRole("button", { name: /^02 Potential Energy Tech/ })).toBeFocused();
    await first.hover();
  }
  await expect(page.locator("#active-project-card h3")).toHaveText("Potential Energy Tech");
  await page.getByRole("button", { name: "Next project", exact: true }).click();
  await expect(page.locator("#active-project-card h3")).toHaveText("Querry Berry");
  await page.getByRole("button", { name: "Previous project", exact: true }).click();
  await page.locator("#active-project-card").getByRole("link", { name: "View case study", exact: true }).click();
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

test("reduced motion keeps the sculpture still and anchors native", async ({ page }, testInfo) => {
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
  if (testInfo.project.name === "mobile") await page.locator(".mobile-navigation summary").click();
  await page.getByRole("navigation").getByRole("link", { name: "Experience" }).click();
  await expect(page.getByRole("heading", { name: "Built through experience." })).toBeInViewport();
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

test("no JavaScript retains every project, supporting content, anchors and safe form", async ({ browser }, testInfo) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: testInfo.project.use.viewport });
  const page = await context.newPage();
  await page.goto("/");
  await checkContent(page);
  await expect(page.getByTestId("scene-fallback")).toBeVisible();
  await expect(page.locator(".project-noscript a")).toHaveCount(7);
  await expect(page.locator(".project-interactive")).toBeHidden();
  await expect(page.getByRole("button", { name: "Send a message" })).toBeHidden();
  await expect(page.locator(".contact-form")).toHaveAttribute("method", "post");
  await expect(page.locator(".toolkit-group")).toHaveCount(4);
  await expect(page.getByRole("heading", { name: "Teams & activities" })).toBeVisible();
  await page.locator(".project-noscript a").nth(4).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("McMillon Innovation Studios & The Amazeum.");
  await context.close();
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

test("entrances stay readable, settle monotonically and do not replay", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  const heading = page.locator(".about-layout > .entrance").first();
  const height = page.viewportSize()!.height;
  const top = await heading.evaluate(element => element.getBoundingClientRect().top + scrollY - 18);
  const pose = () => heading.evaluate(element => new DOMMatrixReadOnly(getComputedStyle(element).transform).m42);
  await page.evaluate(y => window.scrollTo({ top: y, behavior: "instant" }), top - height * .8);
  await expect.poll(pose).toBe(18);
  const frames = await heading.evaluate(async (element, target) => {
    const frames: number[] = [];
    window.scrollTo({ top: target, behavior: "instant" });
    const start = performance.now();
    while (performance.now() - start < 1600) {
      await new Promise(requestAnimationFrame);
      frames.push(new DOMMatrixReadOnly(getComputedStyle(element).transform).m42);
    }
    return frames;
  }, top - height * .45);
  let previous = 18;
  for (const value of frames) {
    expect(value).toBeGreaterThanOrEqual(-.05);
    expect(value).toBeLessThanOrEqual(previous + .05);
    previous = value;
  }
  await expect.poll(pose).toBe(0);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.evaluate(y => window.scrollTo({ top: y, behavior: "instant" }), top - height * .45);
  expect(await pose()).toBe(0);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(heading).toHaveCSS("transform", "none");
});

test("mobile menu supports keyboard dismissal, outside tap and native no-JS navigation", async ({ page, browser }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "Mobile disclosure only");
  await page.goto("/");
  const menu = page.locator(".mobile-navigation");
  const toggle = menu.locator("summary");
  await expect(page.locator(".navigation")).toBeHidden();
  await toggle.focus();
  await page.keyboard.press("Enter");
  await expect(menu).toHaveAttribute("open", "");
  await expect(menu.getByRole("link")).toHaveCount(4);
  await page.keyboard.press("Tab");
  await expect(menu.getByRole("link", { name: "Home", exact: true })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(menu).not.toHaveAttribute("open");
  await expect(toggle).toBeFocused();
  await toggle.click();
  await page.locator("#hero-title").click({ force: true });
  await expect(menu).not.toHaveAttribute("open");
  await toggle.click();
  await menu.getByRole("link", { name: "Projects", exact: true }).click();
  await expect(menu).not.toHaveAttribute("open");
  await expect(page).toHaveURL(/#projects$/);
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const nativePage = await context.newPage();
  await nativePage.goto("/");
  await nativePage.locator(".mobile-navigation summary").click();
  await nativePage.getByRole("navigation").getByRole("link", { name: "Contact" }).click();
  await expect(nativePage).toHaveURL(/#contact$/);
  await context.close();
});


test("supporting sections remain compact and navigation follows the new reading order", async ({ page }, testInfo) => {
  await page.goto("/");
  for (const [id, destination] of [["about", "Projects"], ["education", "Experience"], ["toolkit", "Experience"], ["contact", "Contact"]]) {
    await page.locator(`#${id}`).evaluate(element => window.scrollTo({ top: element.getBoundingClientRect().top + scrollY - 110, behavior: "instant" }));
    await expect(page.locator(`.navigation a[href="#${destination.toLowerCase()}"]`)).toHaveAttribute("aria-current", "location");
  }
  expect(await page.locator(".toolkit").evaluate(element => getComputedStyle(element).position)).toBe("static");
  await expect(page.locator(".toolkit-group")).toHaveCount(4);
  await expect(page.locator(".education-activities li")).toHaveCount(5);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  const baseline = testInfo.project.name === "mobile" ? 9741 : 12052;
  expect(await page.evaluate(() => document.documentElement.scrollHeight)).toBeLessThan(baseline * .7);
  await page.locator(".toolkit").evaluate(element => window.scrollTo({ top: element.getBoundingClientRect().top + scrollY - 110, behavior: "instant" }));
  const before = await page.evaluate(() => scrollY);
  await page.mouse.move(10, 420);
  await page.mouse.wheel(0, 400);
  await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(before + 300);
});

// Two production builds exercise the real enabled prop without modifying account
// credentials. Configured requests are intercepted before they reach the API.
test("unconfigured contact is explicit and cannot submit", async ({ page }) => {
  test.skip(process.env.CONTACT_TEST_STATE !== "unconfigured", "Requires a build with empty provider environment variables");
  await page.goto("/#contact");
  await expect(page.getByRole("button", { name: "Send a message" })).toBeDisabled();
  await expect(page.getByText("Email delivery is not connected yet.", { exact: false })).toBeVisible();
});

test("configured contact validates, focuses errors, sends once and handles provider failures", async ({ page }) => {
  test.skip(process.env.CONTACT_TEST_STATE !== "configured", "Requires a build with test provider environment variables");
  let calls = 0;
  let release: (() => void) | undefined;
  let mode = "pending";
  await page.route("**/api/contact", async (route) => {
    calls++;
    if (mode === "network") return route.abort();
    if (mode === "pending") await new Promise<void>(resolve => { release = resolve; });
    if (mode === "field") return route.fulfill({ status: 400, json: { message: "Please check your email.", fields: { email: "Use a valid email address." } } });
    if (mode === "unconfigured") return route.fulfill({ status: 503, json: { message: "Email delivery is not connected yet. Your message has not been sent." } });
    if (mode === "limited") return route.fulfill({ status: 429, json: { message: "Too many attempts. Please try again in 15 minutes." } });
    return route.fulfill({ status: 200, json: { message: "Your message is on its way. Thanks for reaching out." } });
  });
  await page.goto("/#contact");
  const submit = page.getByRole("button", { name: "Send a message", exact: true });
  await expect(submit).toBeEnabled();
  await submit.click();
  await expect(page.getByLabel("Your name", { exact: false })).toBeFocused();
  expect(calls).toBe(0);
  const fill = async () => {
    await page.getByLabel("Your name", { exact: false }).fill("Portfolio visitor");
    await page.getByLabel("Email address", { exact: false }).fill("visitor@example.com");
    await page.getByLabel("What are you thinking?", { exact: false }).fill("I would like to discuss an engineering project with you.");
  };
  await fill();
  await submit.click();
  await expect(page.getByRole("button", { name: "Sending message…" })).toBeDisabled();
  await expect(page.locator(".contact-form")).toHaveAttribute("aria-busy", "true");
  await expect.poll(() => Boolean(release)).toBe(true);
  release!();
  await expect(page.getByRole("status")).toContainText("Your message is on its way.");
  await expect(page.getByLabel("Your name", { exact: false })).toBeEmpty();
  expect(calls).toBe(1);
  await fill();
  mode = "field";
  await submit.click();
  await expect(page.getByLabel("Email address", { exact: false })).toBeFocused();
  await expect(page.getByLabel("Email address", { exact: false })).toHaveAttribute("aria-invalid", "true");
  for (const [failure, message] of [["network", "We couldn’t reach the email service"], ["unconfigured", "Your message has not been sent"], ["limited", "Too many attempts"]]) {
    mode = failure;
    await submit.click();
    await expect(page.getByRole("status")).toContainText(message);
    await expect(page.getByLabel("Your name", { exact: false })).toHaveValue("Portfolio visitor");
    await expect(submit).toBeEnabled();
  }
});


test("toolkit links use the supplied project technologies", async ({ page }) => {
  await page.goto("/#toolkit");
  for (const [tool, slug] of [["Ruby", "tariff-ninja"], ["Ruby on Rails", "tariff-ninja"], ["SQL", "tariff-ninja"], ["Python", "city-of-bentonville-traffic"], ["Jupyter", "city-of-bentonville-traffic"], ["Tailwind CSS", "querry-berry"], ["React", "amazeum"], ["JavaScript", "amazeum"]]) {
    await expect(page.locator("#toolkit").getByRole("link", { name: new RegExp(`^${tool} —`) })).toHaveAttribute("href", `/projects/${slug}`);
  }
});
