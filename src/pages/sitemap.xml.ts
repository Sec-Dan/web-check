import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const base = (site?.href || process.env.SITE_URL || 'https://webcheck.dansec.red').replace(/\/$/, '');

  // Keep this intentionally small: only real, stable routes (no /check/<target>).
  const paths = [
    '/',
    '/check',
    '/self-hosted-setup',
    '/web-check-api',
    '/web-check-api/spec',
    '/account'
  ];

  const lastmod = new Date().toISOString();

  const body =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    paths
      .map((p) => {
        const loc = `${base}${p === '/' ? '' : p}`;
        return `  <url><loc>${loc}</loc><lastmod>${lastmod}</lastmod></url>`;
      })
      .join('\n') +
    `\n</urlset>\n`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=300'
    }
  });
};
