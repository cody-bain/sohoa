// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { rehypeTableScroll } from './src/plugins/rehype-table-scroll.mjs';

export default defineConfig({
  site: 'https://sohoa.org',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  integrations: [sitemap()],
  markdown: {
    // The source content already uses typographic quotes; leave them alone.
    smartypants: false,
    rehypePlugins: [rehypeTableScroll],
  },
});
