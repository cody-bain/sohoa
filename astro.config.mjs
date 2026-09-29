// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { rehypeTableScroll } from './src/plugins/rehype-table-scroll.mjs';

export default defineConfig({
  // The address the site is served from, used for canonical tags and the
  // sitemap. Netlify sets URL to the live domain during its builds; SITE_URL
  // overrides both for a one-off build against some other address.
  site: process.env.SITE_URL ?? process.env.URL ?? 'https://sohoa.codybain.com',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  integrations: [sitemap()],
  markdown: {
    // The source content already uses typographic quotes; leave them alone.
    smartypants: false,
    rehypePlugins: [rehypeTableScroll],
  },
});
