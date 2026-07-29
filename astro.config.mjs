// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // canonical = 自有 domain jimmychen.me（掛在 Cloudflare Pages 上）。
  // GitHub Pages 與 *.pages.dev 為 mirror；canonical/hreflang/RSS/sitemap 皆以此為準。
  site: 'https://jimmychen.me',
  integrations: [sitemap()],
});
