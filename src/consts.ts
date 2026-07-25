// 站台設定：從環境變數讀取的第三方整合設定（P2-09 留言、P2-10 analytics）。
// 值來自 PUBLIC_* 環境變數（build 時注入、可被 client 讀取）。
// 未設定時對應 feature 不渲染（gating），站台照常運作。

// ---- Giscus 留言（P2-09） ----
// 四個值從 giscus.app 取得（見 .env.example）。任一為空 → 不渲染留言區。
export const giscus = {
  repo: import.meta.env.PUBLIC_GISCUS_REPO,
  repoId: import.meta.env.PUBLIC_GISCUS_REPO_ID,
  category: import.meta.env.PUBLIC_GISCUS_CATEGORY,
  categoryId: import.meta.env.PUBLIC_GISCUS_CATEGORY_ID,
} as const;

export const giscusEnabled = Boolean(
  giscus.repo && giscus.repoId && giscus.category && giscus.categoryId,
);

// ---- Cloudflare Web Analytics（P2-10，無 cookie、隱私友善） ----
// token 從 Cloudflare dashboard 取得。為空 → 不輸出 beacon。
export const cfBeaconToken = import.meta.env.PUBLIC_CF_BEACON_TOKEN;
export const analyticsEnabled = Boolean(cfBeaconToken);

// ---- Webmention / IndieWeb（P2-11） ----
// 在 webmention.io 註冊的網域（如 jimmychen.me）。為空 → 不輸出 endpoint、不抓留言。
// microformats2 標記（h-entry / h-card / rel=me）不受此 gating，永遠輸出：它們無副作用，
// 且 Bridgy Fed 只靠標記 + feed 就能橋接。
export const webmentionDomain = import.meta.env.PUBLIC_WEBMENTION_DOMAIN;
export const webmentionEnabled = Boolean(webmentionDomain);
