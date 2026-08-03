// Cloudflare Pages advanced mode。三件事：
//   1. 把 *.pages.dev 的生產網址 301 到 canonical 自有 domain，避免兩個對外入口。
//   2. fediverse／atproto 探測路徑轉給 Bridgy Fed；舊 Blogger 路徑 301 到新文章。
//   3. 為**所有**回應補上安全性 header。
//
// 為何用 _worker.js 而非 functions/_middleware.js：
//   CI 的 deploy-cloudflare job 只下載 dist artifact、不 checkout repo，wrangler 找不到
//   repo 根的 functions/。_worker.js 放 public/ 會隨 Astro build 進 dist，workflow 零改動。
//
// **架構：單一出口。** route() 只負責決定回應，fetch() 統一套一次 withSecurityHeaders()。
// 這是刻意的：這裡有六種回應（pages.dev 301、Blogger 301、兩類 .well-known 302、
// .vcf、ASSETS 直通含 404）。若把 header 灑在各分支，很容易變成「首頁有、404 與
// 轉址沒有」，而只 curl `/` 的驗證抓不到。
//
// 注意事項：
//   1. advanced mode 會停用 _redirects / _headers —— 這正是安全性 header 必須由本檔
//      負責的原因。
//   2. pages.dev 只比對「完全等於」生產 host，不用 endsWith：預覽部署是
//      <hash>.jimmychen.pages.dev，若一併轉走就無法預覽。
//   3. Bridgy Fed 轉址規格：須 302（非 301，對方端點可能變動），且 host-meta／
//      webfinger 必須保留 query（webfinger 靠 ?resource=）。atproto-did 相反：用固定
//      query 標明本站身分，不轉發來源 query。
//   4. GitHub Pages mirror 用同一份 dist 但不執行此 worker，故 mirror 沒有這些 header。
//      canonical 是 CF、mirror 僅為故障備援，可接受。
const CANONICAL = 'https://jimmychen.me';
const PAGES_DEV_HOST = 'jimmychen.pages.dev';
const BRIDGY_FED = 'https://fed.brid.gy';
const DOMAIN = 'jimmychen.me';

// 舊 Blogger 路徑 301（migrations/blogger/url-map.json 的 36 筆映射）。
// 33/36 是純機械規則 /YYYY/MM/<slug>.html → /blog/<slug>，故用 regex 而非搬 36 筆進來。
// 例外只有 3 筆：Blogger 的 blog-post 這個 slug 跨年重複，匯入時被加了數字後綴。
// 註：不存在的 /YYYY/MM/*.html 會被導到一個 404 的 /blog/<slug>——該路徑型態幾乎
// 只可能來自舊 Blogger，導向後由 404 頁承接，仍優於直接吐 404。
const BLOGGER_PATH = /^\/\d{4}\/\d{2}\/(.+)\.html$/;
const BLOGGER_OVERRIDES = {
  '/2014/05/blog-post.html': '/blog/blog-post-2',
  '/2016/01/blog-post.html': '/blog/blog-post-3',
  '/2014/06/blog-post.html': '/blog/blog-post-4',
};

// ---- 安全性 header ----
//
// CSP 的誠實說明：script-src 含 'unsafe-inline'。本站有兩段 is:inline script
//（no-flash 主題切換、giscus 載入器），靜態輸出無法為它們加 nonce，所以**拿不到
// 真正的 XSS 防護**。但這份 CSP 仍有實質價值：限制 frame-src／frame-ancestors／
// connect-src／object-src／base-uri，可阻止點擊劫持、資料外送到未知端點、
// <base> 注入等一整類問題。
//
// 'wasm-unsafe-eval'：Pagefind 搜尋用 WebAssembly（/pagefind/wasm.unknown.pagefind），
// 少了它 /blog/search 會壞掉。這是最容易漏的一項。
//
// img-src 用 https: 而非白名單：webmention 頭像來自任意第三方網域，無法預先列舉。
//
// font-src 只放行 'self' 就夠：標題的思源黑體 subset 自 host（public/fonts/），
// 其餘位置用系統字型，沒有任何外部字型來源。
const CSP = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  "script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval' https://giscus.app https://static.cloudflareinsights.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https:",
  "font-src 'self'",
  "connect-src 'self' https://cloudflareinsights.com https://static.cloudflareinsights.com",
  'frame-src https://giscus.app',
  "manifest-src 'self'",
  'upgrade-insecure-requests',
].join('; ');

const SECURITY_HEADERS = {
  'Content-Security-Policy': CSP,
  // 刻意不加 preload：那是提交進瀏覽器內建清單的單向門。
  // 也刻意不加 includeSubDomains：它會一併綁住 mirror.jimmychen.me（GitHub Pages），
  // 那是兩年期承諾且該主機不由我們控制。
  'Strict-Transport-Security': 'max-age=31536000',
  // 與 CSP frame-ancestors 重複，但舊瀏覽器只認這個
  'X-Frame-Options': 'SAMEORIGIN',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  // 關掉本站完全不使用的瀏覽器能力
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
  'Cross-Origin-Opener-Policy': 'same-origin',
};

/** 在既有回應上疊加安全性 header（回應可能不可變，故重建） */
function withSecurityHeaders(res) {
  const headers = new Headers(res.headers);
  for (const [k, v] of Object.entries(SECURITY_HEADERS)) headers.set(k, v);
  return new Response(res.body, { status: res.status, statusText: res.statusText, headers });
}

/** 手動建轉址而非用 Response.redirect()：後者的 headers 不可變，無法疊加 */
function redirect(location, status) {
  return new Response(null, { status, headers: { Location: location } });
}

async function route(request, env) {
  const url = new URL(request.url);

  if (url.hostname === PAGES_DEV_HOST) {
    return redirect(`${CANONICAL}${url.pathname}${url.search}`, 301);
  }

  const path = url.pathname;

  // 完整履歷 PDF 已下架：硬擋路徑，避免 CDN 舊產物或誤組裝再被讀到。
  // 公開面只留 L0 HTML（見 docs/hidden-resume.md）。
  if (
    path.startsWith('/resume/pdf/') ||
    path.startsWith('/en/resume/pdf/') ||
    /^\/resume\/.*\.pdf$/i.test(path) ||
    /^\/en\/resume\/.*\.pdf$/i.test(path)
  ) {
    return new Response('Not Found', {
      status: 404,
      headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' },
    });
  }

  // 舊 Blogger 路徑 → 新文章（cool URIs don't change）
  const bloggerTarget =
    BLOGGER_OVERRIDES[path] ??
    (BLOGGER_PATH.test(path) ? `/blog/${path.match(BLOGGER_PATH)[1]}` : null);
  if (bloggerTarget) {
    return redirect(`${CANONICAL}${bloggerTarget}/${url.search}`, 301);
  }

  // fediverse 自訂 handle：host-meta 與 webfinger 連同 query 一起轉給 Bridgy Fed。
  // 用 startsWith 因為規格為 host-meta* / webfinger*（會有 .json、.xrd 等變體）。
  if (path.startsWith('/.well-known/host-meta') || path.startsWith('/.well-known/webfinger')) {
    return redirect(`${BRIDGY_FED}${path}${url.search}`, 302);
  }

  // Bluesky 自訂 handle：以固定 query 告知 Bridgy Fed 這是哪個 web 站。
  if (path === '/.well-known/atproto-did') {
    return redirect(`${BRIDGY_FED}/.well-known/atproto-did?protocol=web&id=${DOMAIN}`, 302);
  }

  const res = await env.ASSETS.fetch(request);

  // 電子名片的 vCard：手機要認得出「可加入通訊錄」就得靠正確的 Content-Type。
  // 靜態輸出下 Astro endpoint 的 header 不會被保留，且 advanced mode 停用 _headers。
  if (path === '/contact.vcf') {
    const headers = new Headers(res.headers);
    headers.set('Content-Type', 'text/vcard; charset=utf-8');
    headers.set('Content-Disposition', 'attachment; filename="jimmy-chen.vcf"');
    return new Response(res.body, { status: res.status, headers });
  }

  return res;
}

export default {
  async fetch(request, env) {
    return withSecurityHeaders(await route(request, env));
  },
};
