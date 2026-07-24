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
    'nav.works': '作品集',
    'nav.skip': '跳至內容',
    'lang.switch': 'EN',
    'lang.label': '語言',
    'theme.toggle': '切換深淺色主題',
    'footer.rss': 'RSS',
    'footer.rights': '版權所有',
    'blog.title': '文章',
    'blog.subtitle': '技術、維運、AI 協作，偶爾生活。',
    'blog.tags': '標籤',
    'blog.allTags': '所有標籤',
    'blog.publishedOn': '發表於',
    'blog.empty': '暫無文章',
    'blog.taggedWith': '標籤',
    'blog.backToList': '回文章',
    'blog.postCount': '篇',
    'home.recent': '近作',
    'home.findMe': 'Find me on',
    'works.title': '作品集',
    'works.subtitle': '維運、AI、自動化，與一些帶著玩心的軌跡。',
    'works.cat.platform': '平台 · 基礎架構',
    'works.cat.ai': 'AI · Agentic',
    'works.cat.automation': '自動化 · 工具',
    'works.cat.showcase': '競賽 · 分享',
    'post.signoff': '落款於臺灣',
    'post.aiTranslatedNotice': '本文為原繁中文章的 AI 翻譯版本，可能有不精準之處。',
    'post.readOriginal': '閱讀中文原文',
    'search.title': '搜尋',
    'search.description': '搜尋站上文章。',
    'search.placeholder': '搜尋文章…',
    'search.clear': '清除',
    'search.zeroResults': '找不到符合的結果',
  },
  en: {
    'nav.blog': 'Blog',
    'nav.resume': 'Resume',
    'nav.works': 'Works',
    'nav.skip': 'Skip to content',
    'lang.switch': '中',
    'lang.label': 'Language',
    'theme.toggle': 'Toggle light / dark theme',
    'footer.rss': 'RSS',
    'footer.rights': 'All rights reserved',
    'blog.title': 'Posts',
    'blog.subtitle': 'Engineering, ops, AI collaboration — and the occasional slice of life.',
    'blog.tags': 'Tags',
    'blog.allTags': 'All tags',
    'blog.publishedOn': 'Published on',
    'blog.empty': 'No posts yet',
    'blog.taggedWith': 'Tagged',
    'blog.backToList': 'Back to posts',
    'blog.postCount': 'posts',
    'home.recent': 'Recent posts',
    'home.findMe': 'Find me on',
    'works.title': 'Works',
    'works.subtitle': 'Operations, AI, automation — and a few tracks made with a sense of play.',
    'works.cat.platform': 'Platform · Infrastructure',
    'works.cat.ai': 'AI · Agentic',
    'works.cat.automation': 'Automation · Tools',
    'works.cat.showcase': 'Competitions · Talks',
    'post.signoff': 'Signed in Taiwan',
    'post.aiTranslatedNotice': 'This is an AI-generated translation of the original Chinese post and may contain inaccuracies.',
    'post.readOriginal': 'Read the original (中文)',
    'search.title': 'Search',
    'search.description': 'Search posts on this site.',
    'search.placeholder': 'Search posts…',
    'search.clear': 'Clear',
    'search.zeroResults': 'No results found',
  },
} as const;

export type UIKey = keyof (typeof ui)['zh'];

export function useTranslations(lang: Lang) {
  return function t(key: UIKey): string {
    return ui[lang][key] ?? ui.zh[key];
  };
}
