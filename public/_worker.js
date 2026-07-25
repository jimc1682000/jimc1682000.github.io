// Cloudflare Pages advanced mode。兩件事：
//   1. 把 *.pages.dev 的生產網址 301 到 canonical 自有 domain，避免兩個對外入口。
//   2. 把 fediverse / atproto 的探測路徑轉給 Bridgy Fed，讓別人能直接用 @jimmychen.me
//      追蹤本站（而非 @jimmychen.me@web.brid.gy）。
// 其餘請求原樣交還靜態資源。
//
// 為何用 _worker.js 而非 functions/_middleware.js：
//   CI 的 deploy-cloudflare job 只下載 dist artifact、不 checkout repo，wrangler 找不到
//   repo 根的 functions/。_worker.js 放 public/ 會隨 Astro build 進 dist，workflow 零改動。
//
// 注意事項：
//   1. advanced mode 會停用 _redirects / _headers 處理（本站兩者皆未使用）。
//   2. pages.dev 只比對「完全等於」生產 host，不用 endsWith：預覽部署是
//      <hash>.jimmychen.pages.dev，若一併轉走就無法預覽。
//   3. Bridgy Fed 的轉址規格：狀態碼須為 **302**（非 301，對方端點可能變動），且
//      host-meta / webfinger **必須保留 query string**（webfinger 靠 ?resource= 查詢）。
//      atproto-did 相反：用固定 query 標明本站身分，不轉發來源 query。
//   4. GitHub Pages mirror 用同一份 dist 但不執行此 worker；Bridgy Fed 探測的是 canonical
//      網域，故不影響（mirror 刻意保留供 Cloudflare 故障時使用）。
const CANONICAL = 'https://jimmychen.me';
const PAGES_DEV_HOST = 'jimmychen.pages.dev';
const BRIDGY_FED = 'https://fed.brid.gy';
const DOMAIN = 'jimmychen.me';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.hostname === PAGES_DEV_HOST) {
      return Response.redirect(`${CANONICAL}${url.pathname}${url.search}`, 301);
    }

    const path = url.pathname;

    // fediverse 自訂 handle：host-meta 與 webfinger 連同 query 一起轉給 Bridgy Fed。
    // 用 startsWith 因為規格為 host-meta* / webfinger*（會有 .json、.xrd 等變體）。
    if (path.startsWith('/.well-known/host-meta') || path.startsWith('/.well-known/webfinger')) {
      return Response.redirect(`${BRIDGY_FED}${path}${url.search}`, 302);
    }

    // Bluesky 自訂 handle：以固定 query 告知 Bridgy Fed 這是哪個 web 站。
    if (path === '/.well-known/atproto-did') {
      return Response.redirect(
        `${BRIDGY_FED}/.well-known/atproto-did?protocol=web&id=${DOMAIN}`,
        302,
      );
    }

    // 電子名片的 vCard：手機要認得出「可加入通訊錄」就得靠正確的 Content-Type。
    // 靜態輸出下 Astro endpoint 的 header 不會被保留，且 advanced mode 停用 _headers，
    // 所以在這裡補。同理處理 QR 的 SVG。
    if (path === '/contact.vcf') {
      const res = await env.ASSETS.fetch(request);
      const headers = new Headers(res.headers);
      headers.set('Content-Type', 'text/vcard; charset=utf-8');
      headers.set('Content-Disposition', 'attachment; filename="jimmy-chen.vcf"');
      return new Response(res.body, { status: res.status, headers });
    }

    return env.ASSETS.fetch(request);
  },
};
