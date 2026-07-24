// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // canonical = Cloudflare Pages（CF 已上線，四路徑綠）。
  // GitHub Pages 為 mirror。若之後綁自有 domain，改此處並更新 DESIGN.md。
  site: 'https://jimmychen.pages.dev',
  integrations: [sitemap()],
});
