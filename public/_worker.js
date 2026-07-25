// Cloudflare Pages advanced mode。唯一用途：把 *.pages.dev 的生產網址 301 到 canonical
// 自有 domain（jimmychen.me），避免同一份內容有兩個對外入口。其餘請求原樣交還靜態資源。
//
// 為何用 _worker.js 而非 functions/_middleware.js：
//   CI 的 deploy-cloudflare job 只下載 dist artifact、不 checkout repo，wrangler 找不到
//   repo 根的 functions/。_worker.js 放 public/ 會隨 Astro build 進 dist，workflow 零改動。
//
// 注意事項：
//   1. advanced mode 會停用 _redirects / _headers 處理（本站兩者皆未使用）。
//   2. 只比對「完全等於」生產 host，不用 endsWith：預覽部署是 <hash>.jimmychen.pages.dev，
//      若一併轉走就無法預覽。
//   3. GitHub Pages mirror 用同一份 dist，故此檔也會被靜態 serve；它在 GH Pages 上不執行、
//      無副作用（mirror 刻意保留供 Cloudflare 故障時使用，因此不轉址）。
const CANONICAL = 'https://jimmychen.me';
const PAGES_DEV_HOST = 'jimmychen.pages.dev';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.hostname === PAGES_DEV_HOST) {
      return Response.redirect(`${CANONICAL}${url.pathname}${url.search}`, 301);
    }
    return env.ASSETS.fetch(request);
  },
};
