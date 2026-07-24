# jimc personal site

陳建豪 Jimmy Chen 的個人站：brand 首頁 + blog，之後組裝履歷與 film-brain 子站。以 [Astro 5](https://astro.build/) 建置，純 `.astro` + CSS，無 UI 框架。

視覺與品牌決策的真相源是 [`DESIGN.md`](./DESIGN.md)；任何 UI 變更前先讀它。發文規則見 [`AGENTS.md`](./AGENTS.md)。

## 託管與 canonical

| 角色 | 位置 |
|------|------|
| **Canonical（主）** | Cloudflare Pages — `https://jimmychen.pages.dev`（之後接自有 domain） |
| **Mirror** | GitHub Pages（`jimc1682000.github.io`）— 不主推 |

`astro.config.mjs` 的 `site` 設為 canonical URL，canonical link 與 sitemap 皆以此為基準。

## 路徑地圖（URL 方案 A1）

繁中裸根、英文 `/en/` 前綴：

| 頁面 | 繁中 | 英文 |
|------|------|------|
| 首頁 | `/` | `/en/` |
| Blog 列表 | `/blog/` | `/en/blog/` |
| 單篇 | `/blog/<slug>` | `/en/blog/<slug>` |
| 標籤總覽 | `/blog/tags/` | `/en/blog/tags/` |
| 單一標籤 | `/blog/tags/<tag>` | `/en/blog/tags/<tag>` |
| RSS | `/rss.xml` | `/en/rss.xml` |

子站 `/resume/`、`/film-brain/` 為靜態組裝的真實子樹，自帶導覽與語系，主站只連進去（見 `DESIGN.md` §7.4）。

## 內容結構

文章以 Astro Content Layer 的 glob loader 從 repo 根的 `content/` 載入：

```
content/blog/YYYY/<slug>.md      # 繁中，route /blog/<slug>
content/blog/en/YYYY/<slug>.md   # 英文，route /en/blog/<slug>
```

- **locale 判定**：frontmatter `locale` 優先；否則 entry id 以 `en/` 開頭 → `en`，其餘 → `zh`。
- **slug 判定**：檔名 basename（去掉 `YYYY/` 目錄、`en/` 前綴與副檔名）。

Collection schema 定義在 `src/content.config.ts`：`title`、`pubDate`、`description` 必填；`tags`、`locale`、`translationOf`、`cover` 選填。

## 專案結構

```
content/blog/          # 文章來源（版本化，非 src/ 內）
migrations/blogger/    # 舊 Blogger 匯入暫存
public/                # 靜態資產（favicon 等）
src/
  components/          # BaseHead / Header / Footer / ThemeToggle / PostList / TagCloud / Home
  i18n/ui.ts           # 雙語小字典 + useTranslations
  layouts/             # BaseLayout（殼）/ BlogPost（單篇）
  lib/blog.ts          # locale / slug / 排序 / tag 等 helper
  pages/               # 路由（見上方路徑地圖）
  styles/global.css    # DESIGN token（runtime 真相源）+ reset
```

## 本機開發

```bash
npm install
npm run dev       # 本機開發伺服器
npm run check     # astro check（型別）
npm run build     # 產出 dist/
npm run preview   # 預覽 build 結果
```

## Theme

深淺雙模、手動切換，預設跟隨 `prefers-color-scheme`，選擇存於 `localStorage.theme`。`<head>` 最前的 inline script 於樣式套用前設定 `data-theme`，避免閃爍。token 以 `src/styles/global.css` 為準（dark 為 `:root`，light 為 `[data-theme="light"]`）。

## 發文

流程與 frontmatter 規則見 [`AGENTS.md`](./AGENTS.md)。草稿走 GitHub Draft PR，不用 frontmatter draft 欄位。
