# Film Brain 手機選單

## Sub-features

390px 手機選單展開，點「產品 → 運作原理」，在同一站抵達 `/film-brain/brief` 並看到標題。

## How to get to it (user POV)

開啟 `/film-brain/`。主站是 `https://jimmychen.me`，鏡像是 `https://mirror.jimmychen.me`。

## Driving it with Playwright

```sh
npm run test:film-brain
FILM_BRAIN_SITE_URL=https://jimmychen.me npm run test:film-brain
FILM_BRAIN_SITE_URL=https://mirror.jimmychen.me FILM_BRAIN_REQUIRE_CSP=0 npm run test:film-brain
```

## Gotchas

本機與主站的文件回應必須有 `script-src`，且排除執行字串的 `'unsafe-eval'`。鏡像從 GitHub Pages 提供內容，瀏覽器照實際標頭執行。Playwright 測試會保留失敗畫面和 trace。
