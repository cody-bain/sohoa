# Southern Oaks Homeowners Association

The sohoa.org website. It is a static site: every page is a Markdown file,
Astro turns them into plain HTML, and the result in `dist/` can be uploaded to
any web host.

## Running it locally

```bash
npm install
npm run dev
```

Then open http://localhost:4321. The site rebuilds as you save.

| Command           | What it does                                  |
| ----------------- | --------------------------------------------- |
| `npm run dev`     | Local preview with live reload                |
| `npm run build`   | Builds the finished site into `dist/`         |
| `npm run preview` | Serves `dist/` so you can check the real build |
| `npm run check`   | Checks types and content frontmatter          |

## Where things live

```
src/
  content/pages/     Every page of the site, one Markdown file each
  data/
    navigation.ts    The sidebar / site map — add new pages here
    keyword-index.ts The A-Z keyword index
    site.ts          Association name, address and email
  components/        Header, sidebar, breadcrumbs, footer
  layouts/           The page shell shared by everything
  pages/             Routing, plus the search and keyword-index pages
  styles/global.css  All the styling, starting with the colour tokens
public/
  media/             The PDFs (forms, newsletters, paint matrix)
  images/            Photographs and diagrams
```

## Editing content

Each page is a Markdown file under `src/content/pages/`. The file's location
becomes its web address:

| File                                    | Address                      |
| --------------------------------------- | ---------------------------- |
| `pages/index.md`                        | `/`                          |
| `pages/contact.md`                      | `/contact`                   |
| `pages/guidelines/index.md`             | `/guidelines`                |
| `pages/guidelines/3-1-fences.md`        | `/guidelines/3-1-fences`     |

Every file starts with a small block of settings, then the text:

```markdown
---
title: "3.1 Fences"
description: "Optional one-line summary, used by search engines."
---

Ordinary paragraphs. **Bold** with two asterisks, *italic* with one.

A [link to another page](/board), a [link to a PDF](/media/form.pdf) and a
[link to another site](https://www.fairfaxcounty.gov/).

### 3.1.1 Design Criteria

> a. Indented sub-clauses start with `>`. Add another `>` for a deeper
> level, as the complaint procedures do.
```

`title` is what appears as the page heading and in the browser tab. Add
`hideTitle: true` when the Markdown already supplies its own heading — the
home page and the two section title pages do this.

### Adding a page

1. Create the Markdown file in the right folder under `src/content/pages/`.
2. Add it to `src/data/navigation.ts` so it appears in the sidebar. Its
   position in that file also sets its place in the breadcrumbs and the
   previous/next links at the foot of each page.

### Adding a newsletter or form

Drop the PDF into `public/media/`, then add an entry to the `Downloads`
section of `src/data/navigation.ts`. Anything in `public/` is served at the
matching address, so `public/media/form.pdf` is at `/media/form.pdf`.

### Changing the look

All the colours, spacing and fonts are defined as variables at the top of
`src/styles/global.css`. Change `--brand` and the header, active links and
highlights all follow.

## How the site fits together

- `src/data/navigation.ts` is the single source of truth for the site map.
  The sidebar, breadcrumbs, the "In this section" lists and the previous/next
  links are all built from it.
- `src/lib/nav.ts` holds the small helpers that read that file.
- Search is built at build time into `/search-index.json` and filtered in the
  browser, so there is no server or third-party service involved.

## Publishing

The site is hosted on Cloudflare Workers and deploys itself. Push to `main`
and Cloudflare rebuilds and publishes within a minute or two:

```bash
git add -A
git commit -m "Update the newsletter link"
git push
```

Pushing any other branch gets its own preview URL without touching the live
site.

- Repository: https://github.com/cody-bain/sohoa
- Live site: https://sohoa.codybain.com
- Build command: `npm run build`, deploy command: `npx wrangler deploy`
- `wrangler.jsonc` tells Cloudflare to serve the built `dist/` folder

### Changing the domain

Three places name the address. When the site moves to its final domain,
update all three:

1. `site` in `astro.config.mjs` — canonical tags and the sitemap
2. `Sitemap:` in `public/robots.txt`
3. The custom domain in the Cloudflare dashboard, under
   **Workers &amp; Pages → sohoa → Settings → Domains &amp; Routes**

For a one-off build against another address, set `SITE_URL` instead:
`SITE_URL=https://sohoa.org npm run build`.
