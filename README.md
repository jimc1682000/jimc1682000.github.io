# jimc personal site

陳建豪 Jimmy Chen 的個人站：brand 首頁 + blog，之後組裝履歷與 film-brain 子站。以 [Astro 5](https://astro.build/) 建置，純 `.astro` + CSS，無 UI 框架。

視覺與品牌決策的真相源是 [`DESIGN.md`](./DESIGN.md)；任何 UI 變更前先讀它。發文規則見 [`AGENTS.md`](./AGENTS.md)。

## 託管與 canonical

| 角色 | 位置 |
|------|------|
| **Canonical（主）** | 自有 domain — `https://jimmychen.me`（掛在 Cloudflare Pages） |
| **Mirror** | `https://mirror.jimmychen.me`（GitHub Pages）— 不主推，**刻意保留 serve 內容作為 Cloudflare Pages 故障時的備援**；canonical 仍指裸網域 |
| ~~`jimmychen.pages.dev`~~ | **301 → `jimmychen.me`**（`public/_worker.js`）。與 canonical 同屬 Cloudflare，無備援價值，故收為單一入口；預覽網址 `<hash>.jimmychen.pages.dev` 不受影響 |
| ~~`www.jimmychen.me`~~ | **301 → `jimmychen.me`**（zone Redirect Rule）。註：www 也必須加為 Pages custom domain 才有憑證，否則 TLS 握手先失敗、走不到規則 |
| ~~`jimc1682000.github.io`~~ | **301 → `mirror.jimmychen.me`**（GitHub 依 `public/CNAME` 自動轉址） |
| `jimmychen.me/.well-known/{host-meta*,webfinger*,atproto-did}` | **302 → `fed.brid.gy`**（`public/_worker.js`）。讓 fediverse／Bluesky 使用者能直接以 `@jimmychen.me` 追蹤本站，而非 `@jimmychen.me@web.brid.gy`。須為 302 且保留 query |

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
| 電子名片 | `/contact` | `/en/contact` |
| 履歷（公開 L0） | `/resume/` | `/en/resume/` |

名片相關產物（皆由 `src/data/contact.ts` 這個單一資料源產生）：

| 路徑 | 用途 |
|------|------|
| `/contact.vcf` | vCard **3.0** + UTF-8，供手機一鍵存入通訊錄。Content-Type 由 `public/_worker.js` 補上 |
| `/contact-qr.svg` | 名片 QR 的可下載 SVG（供印刷／NFC 卡面）。指向 `/contact` 而非 `.vcf`，換內容不必重印卡片 |
| `/avatar.png`、`/avatar.svg` | h-card `u-photo` 與 vCard `PHOTO`。**路徑固定，換圖只換檔案內容** —— 路徑一變 fediverse 頭像會斷到下次重新解析 |

`/film-brain/` 仍為靜態組裝的子樹（見 `DESIGN.md` §7.4）。公開 `/resume/` 改為主站 L0 摘要頁，**不再**從 `jimc1682000/resume` 組裝完整履歷或 PDF。

### hidden-resume

完整履歷改走 **Zero Trust–inspired** 分享：公開只留 L0；完整內容經身分驗證 + 可撤銷 grant 後提供（目標 `cv.jimmychen.me`）。內容源 `jimc1682000/resume` 改 private，並規劃清洗 public git 歷史。見 [`docs/hidden-resume.md`](./docs/hidden-resume.md)。

## 內容結構

文章以 Astro Content Layer 的 glob loader 從 repo 根的 `content/` 載入：

```text
content/blog/YYYY/<slug>.md      # 繁中，route /blog/<slug>
content/blog/en/YYYY/<slug>.md   # 英文，route /en/blog/<slug>
```

- **locale 判定**：frontmatter `locale` 優先；否則 entry id 以 `en/` 開頭 → `en`，其餘 → `zh`。
- **slug 判定**：檔名 basename（去掉 `YYYY/` 目錄、`en/` 前綴與副檔名）。

Collection schema 定義在 `src/content.config.ts`：`title`、`pubDate`、`description` 必填；`tags`、`locale`、`translationOf`、`cover` 選填。

## 專案結構

```text
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

字型與分享圖是**本機專用**產物流程（CI 沒有中文字型，在 CI 產會靜默產出方框／空白），
產物 commit 進 repo：

```bash
npm run build:fonts  # 標題字型 subset（需先 build 出 dist/，見 scripts/build-fonts.mjs）
npm run build:og     # og.png / avatar.png（從 public/*.svg 產出，含像素斷言）
```

## Theme

深淺雙模、手動切換，預設跟隨 `prefers-color-scheme`，選擇存於 `localStorage.theme`。`<head>` 最前的 inline script 於樣式套用前設定 `data-theme`，避免閃爍。token 以 `src/styles/global.css` 為準（dark 為 `:root`，light 為 `[data-theme="light"]`）。

## 發文

流程與 frontmatter 規則見 [`AGENTS.md`](./AGENTS.md)。草稿走 GitHub Draft PR，不用 frontmatter draft 欄位。
