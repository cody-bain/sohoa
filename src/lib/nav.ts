import { navigation, communityLinks, type NavItem } from '../data/navigation';

/** A page's position in the site map, used for breadcrumbs and prev/next. */
export type NavEntry = {
  label: string;
  href: string;
  /** Ancestors, outermost first. Excludes the page itself. */
  ancestors: NavItem[];
};

const isInternal = (href?: string): href is string =>
  !!href && href.startsWith('/') && !href.startsWith('//') && !/\.[a-z0-9]+$/i.test(href);

/** Every internal page, in sidebar order. */
function flatten(items: NavItem[], ancestors: NavItem[] = []): NavEntry[] {
  return items.flatMap((item) => {
    const self = isInternal(item.href) ? [{ label: item.label, href: item.href, ancestors }] : [];
    const kids = item.children ? flatten(item.children, [...ancestors, item]) : [];
    return [...self, ...kids];
  });
}

export const pageOrder: NavEntry[] = flatten(navigation);

const byHref = new Map(pageOrder.map((entry) => [entry.href, entry]));

export const findEntry = (href: string): NavEntry | undefined => byHref.get(normalize(href));

/** Trims a trailing slash so `/contact/` and `/contact` are the same page. */
export function normalize(href: string): string {
  const path = href.split('#')[0].split('?')[0];
  return path.length > 1 ? path.replace(/\/+$/, '') : '/';
}

/** The pages either side of `href` in sidebar order. */
export function siblings(href: string) {
  const index = pageOrder.findIndex((entry) => entry.href === normalize(href));
  return {
    previous: index > 0 ? pageOrder[index - 1] : undefined,
    next: index >= 0 && index < pageOrder.length - 1 ? pageOrder[index + 1] : undefined,
  };
}

/** Breadcrumb trail for `href`, starting at Home and ending at the page itself. */
export function breadcrumbs(href: string): NavItem[] {
  const entry = findEntry(href);
  if (!entry || entry.href === '/') return [];
  const trail = entry.ancestors.filter((item) => item.label !== 'Home');
  return [{ label: 'Home', href: '/' }, ...trail, { label: entry.label, href: entry.href }];
}

/** Direct child pages of `href`, used for the "In this section" lists. */
export function childrenOf(href: string): NavItem[] {
  const target = normalize(href);
  const walk = (items: NavItem[]): NavItem[] | undefined => {
    for (const item of items) {
      if (item.href && normalize(item.href) === target) return item.children ?? [];
      const found = item.children && walk(item.children);
      if (found) return found;
    }
    return undefined;
  };
  return walk(navigation) ?? [];
}

/** True when `href` is the current page or one of its ancestors. */
export function isActiveTrail(href: string | undefined, current: string): boolean {
  if (!href) return false;
  const entry = findEntry(current);
  if (!entry) return false;
  const target = normalize(href);
  return target === entry.href || entry.ancestors.some((a) => a.href && normalize(a.href) === target);
}

export { navigation, communityLinks, type NavItem };
