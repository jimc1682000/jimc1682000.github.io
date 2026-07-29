---
title: 你好，新站上線
pubDate: 2026-07-24
description: 個人站從 VitePress 遷到 Astro 5 的第一篇：說明架構、路由與發文方式。
locale: zh
tags: [網站]
---

這是新站的第一篇文章，用來驗證骨架：排版層級、程式碼區塊、連結與標籤都在這裡示範一遍。

## 為什麼遷到 Astro

舊站用 VitePress，適合文件但不適合「brand 首頁 + blog + 組裝子站」的形狀。Astro 5 的 Content Layer 讓內容來源更彈性，SSG 輸出也乾淨。

### 幾個重點

- 繁中裸根、英文 `/en/` 前綴（A1 路由）。
- 深淺雙模、手動切換、無閃爍初始化。
- 顏色與間距全部走 `DESIGN.md` 的 token，不散落 magic hex。

## 發文長怎樣

文章放在 `content/blog/YYYY/<slug>.md`，frontmatter 至少要有 `title`、`pubDate`、`description`：

```yaml
---
title: 標題
pubDate: 2026-07-24
description: 一句話描述
tags:
  - example
---
```

內文支援標準 Markdown，包含行內 `code` 與區塊：

```ts
export function slugOf(id: string): string {
  return id.split('/').pop() ?? id;
}
```

## 下一步

之後會把 [Blogger 的舊文](https://jimmychen.pages.dev/) 逐步匯入，並補上履歷與 film-brain 子站的連結。先讓骨架站穩。
