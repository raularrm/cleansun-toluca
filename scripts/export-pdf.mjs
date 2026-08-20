import puppeteer from 'puppeteer-core';
import { PDFDocument } from 'pdf-lib';
import fs from 'node:fs/promises';
import path from 'node:path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE_URL = 'http://localhost:5183';
const OUT_DIR = path.resolve('pdf-export');

// Single-page site now: "/" holds every section (Inicio through Contacto)
// as one continuous scroll, only /privacidad is a separate route.
const PAGES = [
  { path: '/#/', name: '01-sitio' },
  { path: '/#/privacidad', name: '02-privacidad' },
];

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    defaultViewport: { width: 1440, height: 900 },
  });

  const merged = await PDFDocument.create();

  for (const p of PAGES) {
    const page = await browser.newPage();
    // Pre-accept the cookie notice so the banner never appears in the capture.
    await page.evaluateOnNewDocument(() => {
      const expires = new Date(Date.now() + 180 * 864e5).toUTCString();
      document.cookie = `cleansun_cookie_consent=accepted; expires=${expires}; path=/; SameSite=Lax`;
    });
    // The site skips Lenis and renders every scroll-reveal section already
    // visible when prefers-reduced-motion is set — capture in that mode so
    // sections below the fold aren't stuck at opacity:0 in a static PDF.
    await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
    await page.goto(BASE_URL + p.path, { waitUntil: 'networkidle0', timeout: 30000 });

    // Scroll all the way down in steps so every loading="lazy" image
    // actually gets triggered before we capture — a tall single-page site
    // like this one has images far below the initial viewport that
    // page.goto's networkidle0 never sees.
    await page.evaluate(async () => {
      const step = 600;
      let y = 0;
      const max = document.body.scrollHeight;
      while (y < max) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 120));
        y += step;
      }
      window.scrollTo(0, 0);
    });
    await page.waitForNetworkIdle({ idleTime: 300, timeout: 10000 }).catch(() => {});
    // Let images/fonts settle.
    await new Promise((r) => setTimeout(r, 800));

    const fullHeight = await page.evaluate(() => document.body.scrollHeight);

    const pdfBytes = await page.pdf({
      printBackground: true,
      width: '1440px',
      height: `${fullHeight}px`,
    });
    await fs.writeFile(path.join(OUT_DIR, `${p.name}.pdf`), pdfBytes);

    const pngPath = path.join(OUT_DIR, `${p.name}.png`);
    await page.screenshot({ path: pngPath, fullPage: true });

    const src = await PDFDocument.load(pdfBytes);
    const copiedPages = await merged.copyPages(src, src.getPageIndices());
    copiedPages.forEach((cp) => merged.addPage(cp));

    console.log('captured', p.path);
    await page.close();
  }

  await browser.close();

  const mergedBytes = await merged.save();
  await fs.writeFile(path.join(OUT_DIR, 'CleanSun-propuesta.pdf'), mergedBytes);
  console.log('DONE ->', path.join(OUT_DIR, 'CleanSun-propuesta.pdf'));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
