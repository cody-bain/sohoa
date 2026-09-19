// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { rehypeTableScroll } from './src/plugins/rehype-table-scroll.mjs';

export default defineConfig({
  // The address the site is served from, used for canonical tags and the
  // sitemap. Override it with SITE_URL when building for another domain.
  site: process.env.SITE_URL ?? 'https://sohoa.codybain.com',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  integrations: [sitemap()],
  markdown: {
    // The source content already uses typographic quotes; leave them alone.
    smartypants: false,
    rehypePlugins: [rehypeTableScroll],
  },
});
