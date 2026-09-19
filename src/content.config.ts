import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Every page of the site is one Markdown file under `src/content/pages/`.
 * The file's path becomes its URL:
 *   pages/index.md                    -> /
 *   pages/contact.md                  -> /contact
 *   pages/guidelines/index.md         -> /guidelines
 *   pages/guidelines/3-1-fences.md    -> /guidelines/3-1-fences
 */
const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    /** Page heading and the label used for the browser tab. */
    title: z.string(),
    /** Optional one-line summary used for SEO and search results. */
    description: z.string().optional(),
    /** Set when the Markdown already supplies its own top-level heading. */
    hideTitle: z.boolean().default(false),
  }),
});

export const collections = { pages };
