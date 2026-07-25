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

- `tags`: string 陣列（見下「Tag 受控詞彙」）。
- `locale`: `zh` | `en`。省略時由路徑推導（`content/blog/en/...` → `en`，其餘 → `zh`），一般不必手填。
- `translationOf`: 對應另一語系文章的 slug（hreflang 與語系切換用）。
- `aiTranslated`: `true` 時英文版顯示「AI 翻譯」提示 banner（連回中文原文）。
- `cover`: 封面圖，用 `astro:assets` 的 `image()`；放相對於該 md 的路徑。

## Tag 受控詞彙（controlled vocabulary）

**只用下列 tag，勿自創同義詞；每篇 ≤ 3 個、寧少勿多。** zh 文章用中文名、en 文章用英文名。

| 主題 | zh | en |
|------|----|----|
| 開箱/評測（umbrella） | 評測 | Reviews |
| 影視/看的內容（umbrella） | 影視 | Screen |
| 音響耳機 | 音響 | Audio |
| 機械鍵盤 | 鍵盤 | Keyboards |
| 電影 | 電影 | Film |
| 動畫 | 動畫 | Anime |
| 讀書 | 閱讀 | Reading |
| 生活隨筆 | 生活 | Life |
| Linux/系統 | Linux | Linux |
| 雲端開發環境 | 雲端開發 | Cloud Dev |
| Java | Java | Java |
| 演算法 | 演算法 | Algorithms |
| 測試/重構/設計 | 軟體工程 | Software Engineering |
| 網路/資安 | 資訊安全 | Security |
| AI/agentic | AI | AI |
| DevOps/SRE | 維運 | DevOps |
| 站務/公告 | 網站 | Meta |

**規則**：
- **評測類**：`評測` + 品類（音響/鍵盤/…）。品類是新產品類型（如 `3C`、`遊戲`）時可新增一個品類 tag。
- **看的內容**：`影視` + 品類（電影/動畫/…）；YouTube 影片等也歸 `影視`。
- **擴充**：新 tag 只在「某主題重複出現」時才加入本表（同時更新此表）；不要一次性冷門 tag。

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

## microformats2（改版時勿刪）

本站是 IndieWeb 節點：Bridgy Fed 靠 microformats2 標記 + 可發現的 RSS 讓 fediverse／Bluesky 追蹤本站，回覆以 webmention 回流。**以下 class 是語意標記、對版面無影響，改 UI 時必須保留**：

| 位置 | class |
|---|---|
| `src/layouts/BlogPost.astro` `<article>` | `h-entry`（內含 `p-name`／`dt-published`／`e-content`／`p-category`，及隱藏的 `u-url`、`p-author h-card`） |
| `src/components/Home.astro` `<aside>` | `h-card`（內含 `p-name`、隱藏 `u-url` 與 `u-photo`） |
| `src/components/PostListGrouped.astro` | `h-feed` 包住列表，每則 `h-entry`（`p-name`／`dt-published`／`p-summary`／`p-category`） |
| `src/components/Contact.astro` | `h-card`（名片頁，另含 `p-job-title`／`u-email`／`p-locality`／`u-photo`） |
| `src/components/SocialLinks.astro` | `rel="me noopener noreferrer"` |

`e-content` 與 Pagefind 的 `data-pagefind-body` 共存於同一元素，兩者互不干擾，改動時別誤刪任一。

**判定「是否為單篇文章」請用 `e-content` 而非 `dt-published`** —— 列表頁與 tag 頁加了 h-feed 後也有 `dt-published`（`scripts/send-webmentions.mjs` 曾因此誤判）。

文章的 `u-bridgy-fed` 標記**只在繁中版輸出**：它會觸發 Bridgy Fed 立即聯邦，英文版也放會讓同一篇聯邦兩次。

## 語調

繁中為 source of truth，技術內容力求準確。避免 AI 空話；長文可另走 humanizer 流程再交付。

## 驗證

送 PR 前本機至少跑：

```bash
npm run check     # 0 error
npm run build     # 綠
```
