const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

async function capture() {
  const out = "/tmp/hero-frames";
  fs.mkdirSync(out, { recursive: true });
  const trace = {
    desktopToMobile: [],
    mobileToDesktop: [],
  };

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1400, height: 1100 } });

  await page.goto("http://127.0.0.1:5173/", { waitUntil: "networkidle" });
  await page.waitForTimeout(500);
  await page.evaluate(() => {
    window.__heroTransitionTrace = [];
  });

  for (let i = 0; i < 4; i += 1) {
    await page.screenshot({ path: `${out}/d0-${i}.png` });
    await page.waitForTimeout(80);
  }

  await page.setViewportSize({ width: 820, height: 1180 });
  for (let i = 0; i < 120; i += 1) {
    await page.screenshot({ path: `${out}/dm-${String(i).padStart(2, "0")}.png` });
    const frameState = await page.evaluate(() => {
      const overlayMainRoot = document.querySelector(".hero-motion-overlay-main");
      const overlayWaveRoot = document.querySelector(".hero-motion-overlay-wave");
      const overlayMain = overlayMainRoot?.querySelector(".hero-motion-main");
      const realMain = document.querySelector(".hero-main-visual");
      const node = overlayMain || realMain;
      const rect = node ? node.getBoundingClientRect() : null;
      return {
        overlayClass: [overlayMainRoot?.className ?? "", overlayWaveRoot?.className ?? ""]
          .filter(Boolean)
          .join(" || "),
        overlayPresent: Boolean(overlayMainRoot || overlayWaveRoot),
        rect: rect
          ? {
              left: Math.round(rect.left),
              top: Math.round(rect.top),
              width: Math.round(rect.width),
              height: Math.round(rect.height),
            }
          : null,
      };
    });
    trace.desktopToMobile.push({ frame: i, ...frameState });
    await page.waitForTimeout(8);
  }

  await page.waitForTimeout(300);

  await page.setViewportSize({ width: 1400, height: 1100 });
  for (let i = 0; i < 120; i += 1) {
    await page.screenshot({ path: `${out}/md-${String(i).padStart(2, "0")}.png` });
    const frameState = await page.evaluate(() => {
      const overlayMainRoot = document.querySelector(".hero-motion-overlay-main");
      const overlayWaveRoot = document.querySelector(".hero-motion-overlay-wave");
      const overlayMain = overlayMainRoot?.querySelector(".hero-motion-main");
      const realMain = document.querySelector(".hero-main-visual");
      const node = overlayMain || realMain;
      const rect = node ? node.getBoundingClientRect() : null;
      return {
        overlayClass: [overlayMainRoot?.className ?? "", overlayWaveRoot?.className ?? ""]
          .filter(Boolean)
          .join(" || "),
        overlayPresent: Boolean(overlayMainRoot || overlayWaveRoot),
        rect: rect
          ? {
              left: Math.round(rect.left),
              top: Math.round(rect.top),
              width: Math.round(rect.width),
              height: Math.round(rect.height),
            }
          : null,
      };
    });
    trace.mobileToDesktop.push({ frame: i, ...frameState });
    await page.waitForTimeout(8);
  }

  fs.writeFileSync(path.join(out, "trace.json"), JSON.stringify(trace, null, 2), "utf-8");
  const transitionTrace = await page.evaluate(() => window.__heroTransitionTrace ?? []);
  fs.writeFileSync(path.join(out, "transition-trace.json"), JSON.stringify(transitionTrace, null, 2), "utf-8");
  await browser.close();
  // eslint-disable-next-line no-console
  console.log(out);
}

capture().catch((error) => {
  // eslint-disable-next-line no-console
  console.error(error);
  process.exit(1);
});
