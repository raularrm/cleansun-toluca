import puppeteer from 'puppeteer-core';
import fs from 'node:fs/promises';
import path from 'node:path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE_URL = 'http://localhost:5183';
const OUT_DIR = path.resolve('pdf-export/theme-check');

const PAGES = [
  { path: '/', name: 'inicio' },
  { path: '/servicios', name: 'servicios' },
  { path: '/calculadora', name: 'calculadora' },
  { path: '/resenas', name: 'resenas' },
  { path: '/contacto', name: 'contacto' },
  { path: '/privacidad', name: 'privacidad' },
];

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    defaultViewport: { width: 1280, height: 900 },
  });

  for (const theme of ['dark', 'light']) {
    for (const p of PAGES) {
      const page = await browser.newPage();
      await page.evaluateOnNewDocument((t) => {
        const expires = new Date(Date.now() + 180 * 864e5).toUTCString();
        document.cookie = `cleansun_cookie_consent=accepted; expires=${expires}; path=/; SameSite=Lax`;
        localStorage.setItem('cleansun-theme', t);
      }, theme);
      await page.goto(BASE_URL + p.path, { waitUntil: 'networkidle0', timeout: 30000 });
      await new Promise((r) => setTimeout(r, 1000));
      await page.screenshot({ path: path.join(OUT_DIR, `${theme}-${p.name}.png`), fullPage: true });
      console.log(theme, p.path);
      await page.close();
    }
  }

  await browser.close();
  console.log('DONE');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
