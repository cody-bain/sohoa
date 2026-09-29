import type { APIRoute } from 'astro';

/**
 * Generated rather than kept in `public/` so the sitemap line always names
 * the domain the site was actually built for.
 */
export const GET: APIRoute = ({ site }) => {
  const body = `User-agent: *
Allow: /

Sitemap: ${new URL('sitemap-index.xml', site)}
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain' } });
};
