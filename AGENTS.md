# AGENTS.md — 發文與協作規則

給人與 AI agent 的操作規則。動 UI／視覺前，另讀 `DESIGN.md`（品牌真相源）。

## Design System

- 任何視覺／UI 決策前先讀 `DESIGN.md`。
- 顏色、字級、間距、圓角、動效只用 `src/styles/global.css` 的 token；禁止散落 magic hex、禁止紫粉漸層／霓虹／三欄 icon grid 等 `DESIGN.md` §2 反模式。
- token 以 CSS 檔為 runtime 真相源；改 token 時同步回寫 `DESIGN.md` 表格。
- 偏離 `DESIGN.md` 須使用者明確批准，並補一列 Decisions Log。

## Agent 預設作業範圍

**agent 預設只動 `content/blog/**`**（新增／編輯文章）。要改版型、token、路由、設定等骨架檔，須明確任務指示。

## 發文流程

1. 文章放 `content/blog/YYYY/<slug>.md`（繁中）；英文譯文放 `content/blog/en/YYYY/<slug>.md`。
2. `<slug>` 用小寫、連字號分隔（kebab-case），對應產出的 `/blog/<slug>`。slug 取檔名 basename（忽略 `YYYY/` 目錄），故 **同語系內 slug 必須唯一**（例：`2025/foo.md` 與 `2026/foo.md` 會撞路由並中斷 build）。
3. 起頭以 **GitHub Draft PR** 進行；**不要**用 frontmatter draft 欄位（本站無此機制）。
4. 完稿後把 PR 標成 **Ready for review**，即進入自動合併判斷。

## 自動合併管線（`.github/workflows/auto-merge.yml`）

| 條件 | 行為 |
|------|------|
| PR 還是 **Draft** | 不動作（草稿階段） |
| Ready + **只動 `content/blog/**` 或 `public/blog/**`** | 跑 `astro build` gate，綠則自動 squash-merge，並觸發部署 |
| Ready + 含**其他檔案**（版型／token／路由／設定／workflow） | **不自動合併**，留言提示需人工 review |

- 自動合併用 `GITHUB_TOKEN`，其 push 不會自動觸發 deploy，故合併後 workflow 會顯式 `workflow_dispatch` 觸發 `deploy.yml`。
- 合併後子站與 brand 一併重新組裝、部署到 CF（canonical）與 GH Pages（mirror）。

## Frontmatter

必填：

```yaml
---
title: 文章標題          # string
pubDate: 2026-07-24      # date（YYYY-MM-DD）
description: 一句話描述  # string，用於列表與 RSS/SEO
---
```

選填：

- `tags`: string 陣列（省略視為 `[]`）。
- `locale`: `zh` | `en`。省略時由路徑推導（`content/blog/en/...` → `en`，其餘 → `zh`），一般不必手填。
- `translationOf`: 對應另一語系文章的 slug（供日後 hreflang 互指）。
- `cover`: 封面圖，用 `astro:assets` 的 `image()`；放相對於該 md 的路徑。

## 圖片規則

**壓縮標準：WebP quality 92**（見 DESIGN.md §8）。所有正文圖固化為本地 WebP q92，不外鏈。

- **正文圖（標準流程）**：把原圖丟一個資料夾，跑
  `node scripts/optimize-images.mjs <srcDir>`
  → 產出 WebP q92 到 `public/blog/img/`，在 md 以 `/blog/img/<name>.webp` 引用。
  這是**唯一保證 q92 一致**的路（agent 發新文一律走此工具,勿自行選別的 quality/格式）。
- **封面**：新文可用 `astro:assets`（`cover` frontmatter，Astro build 時最佳化）。
- **外部/大量匯入圖**（如 Blogger 遷移）：`node scripts/optimize-images.mjs --internalize`
  會掃 `content/blog/**` 外部圖 URL、優先用本地原檔（感知雜湊比對）、轉 WebP q92、改寫 zh+en md。
- **不要**在正文留外部圖 URL（googleusercontent 等）；一律先過上面的工具固化。
- 圖片必有有意義 `alt`；純裝飾圖用空 `alt=""`。

## 語調

繁中為 source of truth，技術內容力求準確。避免 AI 空話；長文可另走 humanizer 流程再交付。

## 驗證

送 PR 前本機至少跑：

```bash
npm run check     # 0 error
npm run build     # 綠
```
