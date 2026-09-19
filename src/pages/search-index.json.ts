import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { breadcrumbs, findEntry } from '../lib/nav';

/** Strips Markdown and HTML down to the plain words the search box matches on. */
function toPlainText(markdown: string): string {
  return markdown
    .replace(/<[^>]+>/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[#>*_`|\\-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export const GET: APIRoute = async () => {
  const pages = await getCollection('pages');

  const entries = pages.map((page) => {
    const href = '/' + page.id.replace(/(^|\/)index$/, '').replace(/\/$/, '');
    const path = href === '/' ? '/' : href;
    const trail = breadcrumbs(path)
      .slice(0, -1)
      .map((item) => item.label);

    return {
      title: findEntry(path)?.label ?? page.data.title,
      href: path,
      breadcrumb: trail.join(' › ') || 'Southern Oaks HOA',
      body: toPlainText(page.body ?? ''),
    };
  });

  return new Response(JSON.stringify(entries), {
    headers: { 'Content-Type': 'application/json' },
  });
};
