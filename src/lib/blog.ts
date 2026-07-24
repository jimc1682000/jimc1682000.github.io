import { getCollection, type CollectionEntry } from 'astro:content';

export type Locale = 'zh' | 'en';
export type BlogEntry = CollectionEntry<'blog'>;

/**
 * locale 判定：優先 frontmatter locale，其次由 entry id 前綴推導
 * （id 以 "en/" 開頭 → en，否則 zh）。
 */
export function localeOf(entry: BlogEntry): Locale {
  if (entry.data.locale) return entry.data.locale;
  return entry.id.startsWith('en/') ? 'en' : 'zh';
}

/**
 * slug 判定：取 id 的 basename（去掉 YYYY/ 目錄與 en/ 前綴）。
 * 例：id "2026/hello-site" → "hello-site"；"en/2026/foo" → "foo"。
 */
export function slugOf(entry: BlogEntry): string {
  return entry.id.split('/').pop() ?? entry.id;
}

/** 該篇文章在對應語系下的路徑（A1 路由）。 */
export function urlOf(entry: BlogEntry): string {
  const slug = slugOf(entry);
  return localeOf(entry) === 'en' ? `/en/blog/${slug}/` : `/blog/${slug}/`;
}

/** 取某語系的全部文章，時間新→舊排序。 */
export async function getPosts(locale: Locale): Promise<BlogEntry[]> {
  const all = await getCollection('blog');
  return all
    .filter((entry) => localeOf(entry) === locale)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

/** 依語系格式化日期（給列表與單篇共用）。 */
export function formatDate(date: Date, locale: Locale): string {
  const bcp47 = locale === 'en' ? 'en-US' : 'zh-Hant';
  return new Intl.DateTimeFormat(bcp47, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

/** 取某語系全部 tag（去重、依名稱排序）。 */
export async function getTags(locale: Locale): Promise<string[]> {
  const posts = await getPosts(locale);
  const set = new Set<string>();
  for (const post of posts) {
    for (const tag of post.data.tags) set.add(tag);
  }
  return [...set].sort((a, b) => a.localeCompare(b));
}

/** 取某語系 tag 與其文章數，依文章數多→少、同數依名稱排序。 */
export async function getTagCounts(
  locale: Locale,
): Promise<{ tag: string; count: number }[]> {
  const posts = await getPosts(locale);
  const counts = new Map<string, number>();
  for (const post of posts) {
    for (const tag of post.data.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

/** 取某語系、含指定 tag 的文章（已排序）。 */
export async function getPostsByTag(
  locale: Locale,
  tag: string,
): Promise<BlogEntry[]> {
  const posts = await getPosts(locale);
  return posts.filter((post) => post.data.tags.includes(tag));
}
