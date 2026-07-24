// 小字典：繁中為 source of truth，英文對應。
// 用法：const t = useTranslations(lang); t('nav.blog')

export type Lang = 'zh' | 'en';

/** HTML lang 屬性值（DESIGN §9）。 */
export const htmlLang: Record<Lang, string> = {
  zh: 'zh-Hant',
  en: 'en',
};

export const ui = {
  zh: {
    'nav.blog': 'Blog',
    'nav.resume': '履歷',
    'nav.filmBrain': 'Film-brain',
    'nav.skip': '跳至內容',
    'lang.switch': 'English',
    'lang.label': '語言',
    'theme.toggle': '切換深淺色主題',
    'footer.rss': 'RSS',
    'footer.rights': '版權所有',
    'blog.title': '文章',
    'blog.tags': '標籤',
    'blog.allTags': '所有標籤',
    'blog.publishedOn': '發表於',
    'blog.empty': '暫無文章',
    'blog.taggedWith': '標籤',
    'blog.backToList': '回文章列表',
    'blog.postCount': '篇',
  },
  en: {
    'nav.blog': 'Blog',
    'nav.resume': 'Resume',
    'nav.filmBrain': 'Film-brain',
    'nav.skip': 'Skip to content',
    'lang.switch': '繁體中文',
    'lang.label': 'Language',
    'theme.toggle': 'Toggle light / dark theme',
    'footer.rss': 'RSS',
    'footer.rights': 'All rights reserved',
    'blog.title': 'Posts',
    'blog.tags': 'Tags',
    'blog.allTags': 'All tags',
    'blog.publishedOn': 'Published on',
    'blog.empty': 'No posts yet',
    'blog.taggedWith': 'Tagged',
    'blog.backToList': 'Back to all posts',
    'blog.postCount': 'posts',
  },
} as const;

export type UIKey = keyof (typeof ui)['zh'];

export function useTranslations(lang: Lang) {
  return function t(key: UIKey): string {
    return ui[lang][key] ?? ui.zh[key];
  };
}
