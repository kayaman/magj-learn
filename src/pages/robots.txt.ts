import type { APIRoute } from 'astro';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const getRobotsTxt = (sitemapURL: URL) => `
# Algolia-Crawler-Verif: 2E99A640BDE7ED12

User-agent: *
Allow: /

Sitemap: ${sitemapURL.href}
`;

export const GET: APIRoute = ({ site }) => {
  const sitemapURL = new URL('sitemap-index.xml', site);
  return new Response(getRobotsTxt(sitemapURL));
};
