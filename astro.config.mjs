// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // canonical 目標為 Cloudflare Pages（jimmychen.pages.dev）。
  // 過渡期（CF 尚未上線前）site 指向現行 live 的 GitHub Pages，
  // 避免 canonical / RSS / sitemap 指向尚不存在的 pages.dev（404）。
  // CF 上線後改回 'https://jimmychen.pages.dev' 即可。
  site: 'https://jimc1682000.github.io',
  integrations: [sitemap()],
});
