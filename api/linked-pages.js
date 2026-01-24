import axios from 'axios';
import * as cheerio from 'cheerio';
import middleware from './_common/middleware.js';

const linkedPagesHandler = async (url) => {
  const response = await axios.get(url);
  const html = response.data;
  const $ = cheerio.load(html);

  const baseUrl = new URL(url);
  const internalLinksMap = new Map();
  const externalLinksMap = new Map();

  $('a[href]').each((_, link) => {
    const href = $(link).attr('href');
    if (!href) return;

    // Only count http/https links (ignore mailto:, javascript:, tel:, etc)
    let absoluteUrl;
    try {
      absoluteUrl = new URL(href, baseUrl).toString();
    } catch {
      return;
    }

    if (!absoluteUrl.startsWith('http://') && !absoluteUrl.startsWith('https://')) return;

    let isInternal = false;
    try {
      isInternal = new URL(absoluteUrl).hostname === baseUrl.hostname;
    } catch {
      return;
    }

    if (isInternal) {
      const count = internalLinksMap.get(absoluteUrl) || 0;
      internalLinksMap.set(absoluteUrl, count + 1);
    } else {
      const count = externalLinksMap.get(absoluteUrl) || 0;
      externalLinksMap.set(absoluteUrl, count + 1);
    }
  });

  const internalLinks = [...internalLinksMap.entries()]
    .sort((a, b) => b[1] - a[1])
    .map((entry) => entry[0]);

  const externalLinks = [...externalLinksMap.entries()]
    .sort((a, b) => b[1] - a[1])
    .map((entry) => entry[0]);

  if (internalLinks.length === 0 && externalLinks.length === 0) {
    return {
      statusCode: 400,
      body: {
        skipped:
          'No internal or external links found. ' +
          'This may be due to the website being dynamically rendered, using a client-side framework (like React), and without SSR enabled. ' +
          "That would mean that the static HTML returned from the HTTP request doesn't contain any meaningful content for DanSec Web-Check to analyse. " +
          'You can rectify this by using a headless browser to render the page instead.'
      }
    };
  }

  return { internal: internalLinks, external: externalLinks };
};

export const handler = middleware(linkedPagesHandler);
export default handler;
