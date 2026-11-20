import { expect, test, type Page } from "@playwright/test";

const projects = [
  ["tariff-ninja", "Tariff Ninja"],
  ["city-of-bentonville-traffic", "City of Bentonville Traffic"],
  ["still-on", "Still On"],
] as const;

function noBrowserErrors(page: Page) {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
  return () => expect(errors).toEqual([]);
}

async function scrollToPose(page: Page, id: string, progress: number) {
  await page.evaluate(({ id, progress }) => {
    const section = document.getElementById(id)!;
    const header = document.querySelector<HTMLElement>(".folio-header")!;
    scrollTo(0, scrollY + section.getBoundingClientRect().top - header.offsetHeight + progress * section.offsetHeight);
  }, { id, progress });
}

const monitorScale = (page: Page) => page.locator(".scene-device--monitor").evaluate(element =>
  new DOMMatrixReadOnly(getComputedStyle(element).transform).a,
);

test("the homepage and its featured anchors expose the work, résumé and email", async ({ page, request }) => {
  const checkErrors = noBrowserErrors(page);
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveAccessibleName("Brett Berry");
  await expect(page.getByText("Software Engineer", { exact: true })).toBeInViewport();

  const work = page.getByRole("link", { name: "View work" });
  await expect(work).toBeInViewport();
  await expect(work).toHaveCSS("color", "rgb(250, 246, 237)");
  await work.click();
  await expect(page).toHaveURL(/#projects$/);
  await expect(page.getByRole("heading", { name: "Tariff Ninja", exact: true })).toBeInViewport();

  const index = page.getByRole("navigation", { name: "Featured work" });
  for (const [slug, title] of projects) {
    await expect(index.getByRole("link", { name: title })).toHaveAttribute("href", `#${slug}`);
  }
  await page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "Contact" }).click();
  await expect(page.getByRole("heading", { name: "Let’s talk." })).toBeInViewport();
  const contact = page.locator("#contact");
  await expect(contact.getByRole("link", { name: "Email me" })).toHaveAttribute("href", "mailto:brettberry07@gmail.com");
  await expect(contact.getByRole("link", { name: "GitHub" })).toHaveAttribute("href", "https://github.com/Brettberry07");
  await expect(contact.getByRole("link", { name: "LinkedIn" })).toHaveAttribute("href", "https://www.linkedin.com/in/brett-berry-a81b29329/");
  const resume = await contact.getByRole("link", { name: "Résumé" }).getAttribute("href");
  const response = await request.get(resume!);
  expect(response.ok()).toBe(true);
  expect(response.headers()["content-type"]).toContain("application/pdf");
  checkErrors();
});

test("direct fragments, refresh and history preserve a readable project pose", async ({ page }) => {
  for (const [slug, title] of projects) {
    await page.goto(`/#${slug}`);
    const heading = page.getByRole("heading", { name: title, exact: true });
    await expect(heading).toBeInViewport();
    expect((await heading.boundingBox())!.y).toBeGreaterThanOrEqual(62);
    await page.reload();
    await expect(heading).toBeInViewport();
  }
  await page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "Contact" }).click();
  await page.goBack();
  await expect(page).toHaveURL(/#still-on$/);
  await expect(page.getByRole("heading", { name: "Still On", exact: true })).toBeInViewport();
  await page.goForward();
  await expect(page.getByRole("heading", { name: "Let’s talk." })).toBeInViewport();
});

test("the native meeting flow changes the screen and exposes its result", async ({ page }, testInfo) => {
  await page.goto("/#still-on");
  const group = page.getByRole("group", { name: "Try the meeting flow" });
  const reminder = group.getByRole("radio", { name: "Reminder" });
  await expect(reminder).toBeChecked();
  if (testInfo.project.name === "mobile") {
    await group.getByText("Check in", { exact: true }).tap();
    await group.getByText("New time", { exact: true }).tap();
  } else {
    await reminder.focus();
    await expect(group.locator('label:has(input[value="reminder"]) span')).toHaveCSS("outline-style", "solid");
    await reminder.press("ArrowRight");
    await expect(group.getByRole("radio", { name: "Check in" })).toBeChecked();
    await page.keyboard.press("ArrowRight");
  }
  await expect(group.getByRole("radio", { name: "New time" })).toBeChecked();
  await expect(group.getByText("Propose moving Design catch-up from 2:30 PM to 3:00 PM.")).toBeVisible();
  await expect(page.locator('.phone-visual .phone-phase--reschedule')).toContainText("Proposed time · 3:00 PM");
  await expect(page.locator('.phone-visual .phone-phase--reschedule')).toBeVisible();
});

test("one CRT surface carries the two signal timings through the bezel and the reminder", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "The cinematic composition is for a large fine-pointer viewport");
  const checkErrors = noBrowserErrors(page);
  await page.goto("/#tariff-ninja");
  await expect(page.locator(".project-run")).toHaveAttribute("data-cinematic", "ready");
  const scene = page.locator(".shared-scene");
  const road = scene.locator(".crt-road");
  await road.evaluate(element => { element.dataset.qaSurface = "original"; });
  await expect(scene).toHaveAttribute("data-surface", "tariff");
  const restingScale = await monitorScale(page);

  await scrollToPose(page, "tariff-ninja", .74);
  await expect(scene).toHaveAttribute("data-surface", "road");
  await expect.poll(() => monitorScale(page)).toBeGreaterThan(restingScale + .22);
  await scrollToPose(page, "tariff-ninja", .94);
  await expect.poll(() => monitorScale(page)).toBeGreaterThan(restingScale * 2.7);
  await expect.poll(async () => {
    const before = await monitorScale(page);
    await page.evaluate(() => new Promise<void>(resolve => setTimeout(resolve, 65)));
    return Math.abs(await monitorScale(page) - before);
  }).toBeLessThan(.006);

  await scrollToPose(page, "city-of-bentonville-traffic", 0);
  await expect(scene).toHaveAttribute("data-timing", "existing");
  await expect(page.getByRole("heading", { name: "Simulated results" })).toBeInViewport();
  const stoppedFrame = await road.evaluate((element: HTMLCanvasElement) => element.toDataURL());

  for (const progress of [.43, .08, .52]) {
    await scrollToPose(page, "city-of-bentonville-traffic", progress);
    await expect(scene).toHaveAttribute("data-timing", progress > .3 ? "proposed" : "existing");
    await expect(road).toHaveAttribute("data-qa-surface", "original");
  }
  expect(await road.evaluate((element: HTMLCanvasElement) => element.toDataURL())).not.toBe(stoppedFrame);

  await scrollToPose(page, "still-on", -.118);
  const notification = scene.locator(".monitor-notification");
  await expect(notification).toContainText("Design catch-up");
  await expect.poll(async () => Number(await notification.evaluate(element => getComputedStyle(element).opacity))).toBeGreaterThan(.9);
  await expect.poll(() => monitorScale(page)).toBeCloseTo(restingScale, 1);

  await scrollToPose(page, "still-on", .06);
  await expect(scene.locator(".scene-device--phone")).toHaveCSS("opacity", "1");
  await expect(notification).toHaveCSS("opacity", "0");
  await expect(scene.locator(".phone-meeting-name")).toHaveText("Design catch-up");
  await page.setViewportSize({ width: 1280, height: 800 });
  await expect(page.getByRole("heading", { name: "Still On", exact: true })).toBeInViewport();
  await scrollToPose(page, "tariff-ninja", 0);
  await expect(scene).toHaveAttribute("data-surface", "tariff");
  await expect(notification).toHaveCount(1);
  checkErrors();
});

test("pointer motion adds phosphor locally and the cloud settles on exit", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "The fine-pointer cloud is a desktop enhancement");
  await page.goto("/");
  await expect(page.locator(".glyph-volume")).toHaveAttribute("data-glyphs-live", "");
  const canvas = page.locator(".glyph-canvas");
  const box = (await canvas.boundingBox())!;

  const accentCount = () => canvas.evaluate((element: HTMLCanvasElement) => {
    const context = element.getContext("2d")!;
    const rgba = context.getImageData(element.width * .52, element.height * .27, element.width * .43, element.height * .5).data;
    let cellCount = 0;
    for (let index = 0; index < rgba.length; index += 4) {
      if (rgba[index + 3] > 32 && rgba[index + 1] - rgba[index] > 48 && rgba[index + 1] - rgba[index + 2] > 48) cellCount++;
    }
    return cellCount;
  });

  expect(await accentCount()).toBe(0);
  await page.mouse.move(box.x + box.width * .58, box.y + box.height * .50);
  const move = async () => {
    for (const x of [.88, .66, .87]) {
      await page.mouse.move(box.x + box.width * x, box.y + box.height * .46, { steps: 7 });
    }
  };
  await Promise.all([
    move(),
    expect.poll(accentCount, { timeout: 3500, intervals: [25, 60, 100] }).toBeGreaterThan(15),
  ]);
  await page.mouse.move(21, 85);
  await expect.poll(accentCount).toBe(0);
});

test("reduced motion and unavailable canvas preserve all resting compositions", async ({ page, browser, baseURL }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#city-of-bentonville-traffic");
  await expect(page.getByRole("heading", { name: "Simulated results" })).toBeInViewport();
  await expect(page.locator(".project-run")).not.toHaveAttribute("data-cinematic", "ready");
  for (const art of ["Existing timing", "Proposed timing"]) {
    await expect(page.locator(".traffic-stills").getByText(art, { exact: true })).toBeVisible();
  }
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe("auto");

  const unavailable = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  try {
    await unavailable.addInitScript(() => {
      const original = HTMLCanvasElement.prototype.getContext;
      HTMLCanvasElement.prototype.getContext = function (this: HTMLCanvasElement, type, ...args) {
        if (type === "2d" || type.startsWith("webgl")) return null;
        return original.call(this, type, ...args);
      } as typeof original;
    });
    await unavailable.goto(baseURL!);
    await expect(unavailable.locator(".glyph-volume .cloud-poster")).toBeVisible();
    await expect(unavailable.locator(".glyph-volume")).not.toHaveAttribute("data-glyphs-live", "");
    await unavailable.getByRole("link", { name: "View work" }).click();
    await expect(unavailable.getByRole("heading", { name: "Tariff Ninja", exact: true })).toBeInViewport();
    await expect(unavailable.locator(".project-run")).not.toHaveAttribute("data-cinematic", "ready");
    await expect(unavailable.locator(".tariff-visual img")).toBeVisible();
  } finally {
    await unavailable.close();
  }
});

test("the project story and demo work without JavaScript", async ({ browser, baseURL, viewport }) => {
  const noJs = await browser.newPage({ javaScriptEnabled: false, viewport: viewport ?? undefined });
  try {
    await noJs.goto(baseURL!);
    await expect(noJs.locator(".glyph-volume img")).toBeVisible();
    await noJs.keyboard.press("Tab");
    await expect(noJs.getByRole("link", { name: "Skip to content" })).toBeFocused();
    await noJs.keyboard.press("Enter");
    await expect(noJs.locator("#main")).toBeFocused();
    await noJs.getByRole("navigation", { name: "Featured work" }).getByRole("link", { name: "Still On" }).click();
    await expect(noJs.getByRole("heading", { name: "Still On", exact: true })).toBeInViewport();
    await noJs.locator(".meeting-options").getByText("New time", { exact: true }).click();
    await expect(noJs.locator(".phone-visual .phone-phase--reschedule")).toBeVisible();
    await noJs.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "Contact" }).click();
    await expect(noJs.getByRole("link", { name: "Email me" })).toBeInViewport();
  } finally {
    await noJs.close();
  }
});

test("slow or missing hardware art leaves the project readable", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Checks the enhanced scene's asset gate");
  let release!: () => void;
  const stalled = new Promise<void>(resolve => { release = resolve; });
  await page.route("**/images/portfolio/monitor.webp", async route => {
    await stalled;
    await route.abort("failed");
  });
  try {
    await page.goto("/#tariff-ninja", { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("heading", { name: "Tariff Ninja", exact: true })).toBeInViewport();
    await expect(page.locator(".project-run")).not.toHaveAttribute("data-cinematic", "ready");
    release();
    await expect(page.locator(".tariff-visual img")).toHaveJSProperty("complete", true);
    await expect(page.getByRole("link", { name: "Tariff Ninja case study" })).toBeInViewport();
    await expect(page.locator(".project-run")).not.toHaveAttribute("data-cinematic", "ready");
  } finally {
    release();
  }
});

test("all supported layouts keep content within the viewport", async ({ page }) => {
  await page.goto("/");
  for (const [width, height] of [[1440, 900], [768, 1024], [390, 844], [320, 640], [1280, 600], [1100, 680]]) {
    await page.setViewportSize({ width, height });
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(width);
    await expect(page.getByRole("link", { name: "View work" })).toBeInViewport();
  }
});

test("existing case studies, résumé metadata and sitemap routes resolve", async ({ page, request }) => {
  const slugs = [...projects.map(([slug]) => slug), "querry-berry", "fig", "potential-energy-tech", "amazeum"];
  for (const slug of slugs) {
    const response = await request.get(`/projects/${slug}`);
    expect(response.status()).toBe(200);
    expect(await response.text()).toContain("Behind the build.");
  }
  await page.goto("/projects/city-of-bentonville-traffic");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("City of Bentonville Traffic.");
  await expect(page.locator("link[rel=canonical]")).toHaveAttribute("href", "https://brettberry.dev/projects/city-of-bentonville-traffic");
  await page.getByRole("link", { name: "Back to selected work" }).click();
  await expect(page.getByRole("heading", { name: "Tariff Ninja", exact: true })).toBeInViewport();
  const sitemap = await request.get("/sitemap.xml");
  expect(await sitemap.text()).toContain("https://brettberry.dev/projects/still-on");
  expect((await request.get("/opengraph-image.jpg")).headers()["content-type"]).toContain("image/jpeg");
  expect((await request.get("/projects/not-a-project")).status()).toBe(404);
});
