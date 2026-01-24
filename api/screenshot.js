import puppeteer from 'puppeteer';
import middleware from './_common/middleware.js';

const screenshotHandler = async (targetUrl) => {
  if (!targetUrl) {
    throw new Error('URL is missing from queryStringParameters');
  }

  // middleware normalises, but keep this safe for direct calls too
  if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
    targetUrl = `https://${targetUrl}`;
  }

  try {
    new URL(targetUrl);
  } catch {
    throw new Error('URL provided is invalid');
  }

  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu'
    ]
  });

  try {
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(15000);

    await page.setViewport({ width: 1280, height: 720 });
    await page.goto(targetUrl, { waitUntil: 'domcontentloaded' });

    const screenshotBuffer = await page.screenshot({ type: 'png' });
    return { image: screenshotBuffer.toString('base64') };
  } finally {
    await browser.close();
  }
};

export const handler = middleware(screenshotHandler);
export default handler;
