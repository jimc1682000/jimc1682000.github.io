# DESIGN.md — 吉光聚斂，米粒成章 · 設計說明書

> repo 根目錄的品牌／視覺決策真相源。
> 人類、外包、AI agent 在做任何 UI／視覺決策前 **必讀本檔**；token 落地後以 `src/styles/global.css` 的 CSS variables 為 runtime 真相，本檔解釋「為什麼」並與之同步。
> 結構參考：[DESIGN.md：一份讓品牌說話的說明書（vista.tw）](https://www.vista.tw/blog/design-md-your-brand-spine)。
> 版面靈感：[antfu.me](https://antfu.me)（散文式自介、行內連結、透明 nav）；氣質取自中文散文集裝幀（水墨、宣紙、朱印、直式）。**皆為靈感，非抄襲**。

---

## 1. Product Context（產品脈絡）

| 項目 | 內容 |
|------|------|
| **是什麼** | 陳建豪 Jimmy Chen 的個人官方站：散文式 brand 首頁 + blog + 作品集 + 公開履歷摘要（L0） |
| **站名** | **吉光聚斂，米粒成章**（「吉米」拆入兩句；短牌用「吉光聚斂，米粒成章」，長標語見下） |
| **標語** | 微光聚斂處，粒粒皆文章 —— Jimmy 的技術與生活隨筆 |
| **給誰看** | 繁中為主的技術／DevOps／SRE／AI 工程同溫層；次要英文讀者 |
| **產品類型** | 個人 brand 樞紐 + 編輯型（散文型）blog；非 SaaS、非電商 |
| **內容範疇** | DevOps／SRE 維運、AI／agentic 工作流、電影觀後、生活雜記 |
| **託管** | canonical：自有 domain **`jimmychen.me`**（掛在 Cloudflare Pages）；`*.pages.dev` 與 **GitHub Pages** 為 mirror |
| **多語** | UI 雙語（`src/i18n/ui.ts`）；正文繁中為 source of truth；URL **A1**（裸根繁中，`/en/...` 英文） |
| **路徑地圖** | `/` 散文首頁 · `/blog/*` · `/blog/tags/[tag]` · `/blog/search` · `/works/` 作品集 · `/resume/`（L0 公開摘要） · `/film-brain/` · `/en/...` |

---

## 2. Aesthetic Direction（美學方向）

### 一句話

**東方水墨散文集 × 工程師個人站 × 深淺雙模** —— 像一本鋪在宣紙上、蓋著朱紅落款的散文集；版面走 antfu 那種散文式自介與克制留白，內容技術與生活並置。

### 情緒

- 安靜、有溫度、文氣；工程的精確 + 生活的手感
- 像讀一封信 / 一篇散文，而非瀏覽一份作品目錄
- 深色是夜讀的墨與紙，淺色是暖白宣紙、可長讀

### 明確要做的

| 特徵 | 做法 |
|------|------|
| **散文式首頁** | 首頁主體是一段段自我介紹（散文），非分區塊卡牆；近作以「引用/清單」嵌在文末 |
| **直式中文點綴** | 首頁右側「立軸」用 `writing-mode:vertical-rl` 直排姓名 + 標語 + 落款；**僅純中文短句用直式**，含英文的長內文一律橫排 |
| **落款印章 logo** | 一枚朱紅方印，刻「吉」字（`Seal.astro`）；置於 Header 左與文末落款 |
| **朱砂 accent** | 唯一品牌強調色＝印泥朱砂；只點在連結、標題記號、tag、印章、hover |
| **黑體標題 + 宋體散文** | 標題用自 host 思源黑體 TC（跨平台一致）；首頁散文、立軸、印章維持宋體的人文質感；blog 正文與 UI（nav/meta）用系統 sans |
| **antfu 式透明 nav** | Header 透明、無底色 bar、融進頁面；右上文字連結 + 小 icon 叢 |
| **深／淺雙模** | `data-theme` + localStorage；`<head>` inline no-flash |

### 反模式（不要做）

- ❌ AI slop：紫粉漸層、霓虹、三欄 icon feature grid、泡泡大圓角 CTA、滿版 emoji
- ❌ 把首頁做成卡牆式作品目錄（那是 `/works/` 的事；首頁走散文）
- ❌ 純黑 `#000` 底或純白配純黑高反差（改用墨色與宣紙暖色）
- ❌ 高飽和品牌彩（與 film-brain 橘區隔；主站只用**朱砂紅**一色）
- ❌ 把含英文術語的長內文硬做直式（英文轉向醜、手機難讀）；直式只留給純中文短句
- ❌ 在 token 外散落 magic hex

---

## 3. Color（色彩 token）

**程式只許用 token，禁止散落 magic hex。** runtime 以 `src/styles/global.css` 為準。

### 3.1 Light（`[data-theme="light"]`，暖紙白）

| Token | 值 | 用途 |
|-------|-----|------|
| `--color-bg` | `#f7f4ef` | 宣紙頁底 |
| `--color-bg-elevated` | `#fffdf9` | 卡片／抬升面 |
| `--color-bg-surface` | `#efeae0` | 次級表面、code 區塊底 |
| `--color-text` | `#1a1d20` | 主文字（黛墨，非純黑） |
| `--color-text-secondary` | `#666059` | 輔助（暖灰墨） |
| `--color-text-tertiary` | `#9a9186` | 細標、時間戳 |
| `--color-border` | `rgba(26,29,32,0.13)` | 主邊框 |
| `--color-border-subtle` | `rgba(26,29,32,0.07)` | 分隔 |
| `--color-seal` | `#c8392b` | 朱砂：accent／印章／連結底線／標題記號 |
| `--color-seal-tint` | `rgba(200,57,43,0.09)` | tag chip 底、印章暈 |

### 3.2 Dark（`:root` 預設，墨色）

| Token | 值 | 用途 |
|-------|-----|------|
| `--color-bg` | `#17191b` | 墨色頁底（暖黑，非純黑） |
| `--color-bg-elevated` | `#202325` | 卡片 |
| `--color-bg-surface` | `#282b2d` | 次級表面 |
| `--color-text` | `#ece6d9` | 宣紙色主文字 |
| `--color-text-secondary` | `rgba(236,230,217,0.60)` | 輔助 |
| `--color-text-tertiary` | `rgba(236,230,217,0.40)` | 細標 |
| `--color-border` | `rgba(236,230,217,0.12)` | 主邊框 |
| `--color-border-subtle` | `rgba(236,230,217,0.06)` | 分隔 |
| `--color-seal` | `#d6594c` | 朱砂（墨底稍亮） |
| `--color-seal-tint` | `rgba(210,74,59,0.16)` | tag chip 底 |

### 3.3 語意規則

- **連結（正文內）**：`--color-text` + **朱砂虛點底線**（`text-decoration: underline dotted`，`1.5px`／offset `0.25em`）；hover 文字與底線同轉朱砂。不用 `border-bottom`——斷行時它會沿整行拉出框線。
- **標題記號 / 年份標 / tag active**：朱砂。
- **Tag chip**：`--color-seal-tint` 底 + 朱砂字，藥丸形。
- **對比**：正文對底 WCAG AA 以上；tertiary 小字已調至可讀。

### 3.4 Why（色彩）

- 宣紙米白 + 墨字 + 朱砂，是中文散文集裝幀的原型；與「落款印章」「散文」定位一體。
- 朱砂同時呼應職涯最鮮明的一段（TrendMicro 紅），且與 film-brain 橘明確區隔。
- 不做多彩品牌色：讓文字與留白說話。

---

## 4. Typography（字體）

token 按**角色**命名，不按字族 —— 要換的永遠是某個角色的字。西文字型一律排在中文字型
**之前**（見下方「拉丁前置」）。

```text
--font-heading:
  "NotoSansTC Head", -apple-system, "PingFang TC",
  "Microsoft JhengHei", sans-serif;        /* 標題（自 host 思源黑體 TC subset） */

--font-body:
  -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial,
  "PingFang TC", "Microsoft JhengHei", "Noto Sans TC", sans-serif;   /* blog 正文 */

--font-prose:
  Georgia, "Times New Roman", "Songti TC", "PingFang TC", serif;  /* 散文、立軸、印章 */

--font-ui:
  -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial,
  "PingFang TC", "Microsoft JhengHei", "Noto Sans TC", sans-serif;  /* nav/meta/UI */

--font-mono:
  ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
```

| 角色 | token | 用在哪 | 換字型要動 |
|------|-------|--------|-----------|
| 標題 | `--font-heading` | `h1`–`h4`、`.brand`、`.pt`、`.item .t` | `global.css` token + `build-fonts.mjs` 的 `FONT` |
| blog 正文 | `--font-body` | `BlogPost.astro` 的 `.body`（唯一使用者）；~1.02rem、行高 ~2.1、首行縮排 2em | `global.css` token |
| 散文 | `--font-prose` | `body` 預設值 → 首頁自介、立軸、印章、各頁摘要小段（靠繼承） | `global.css` token |
| UI | `--font-ui` | nav、日期、tag、圖說、落款、朱砂 eyebrow 小標（×30） | `global.css` token |
| code | `--font-mono` | `code`／`pre` | `global.css` token |

`--font-body` 與 `--font-ui` 目前值相同但刻意分開：先前兩者共用一個 `--font-sans`，
於是「改正文」與「改 nav」分不開，31 處得一處處確認。

### 中文排版（zh-TW）依據

| 做法 | 為什麼 |
|------|--------|
| **拉丁前置** | 中文字型自帶的拉丁字形是為全形格線設計的，混排時字寬字重都不對；西文字型放前面 → 拉丁與數字由它出、漢字自然落到後面的中文字型（[漢字標準格式](https://github.com/ethantw/Han) 與 [clreq](https://www.w3.org/TR/clreq/) 的通則）。`--font-heading` 是刻意例外：那份 subset 自帶思源黑體同源的拉丁字形，讓系統西文先出反而各平台不一致 |
| **標點擠壓靠字型** | `text-spacing-trim` 的初始值 `normal` 就是要的行為，CSS 端不必宣告；但[字型缺 `chws`／`halt` 時瀏覽器直接停用它](https://developer.mozilla.org/en-US/docs/Web/CSS/text-spacing-trim) → subset 的 `--layout-features` 必須留 `halt`（實測原檔只有 `halt`，無 `chws`） |
| **中西自動間距不寫 CSS** | [`text-autospace` 的 `normal`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-autospace) 等同 `ideograph-alpha ideograph-numeric`（Baseline 2025-11），宣告出來是 no-op；也因此**不需要 pangu.js** 在 runtime 插空白字元 |
| **着重號不用斜體** | 漢字沒有斜體，瀏覽器的 CJK italic 是整體剪切傾斜。中文的強調傳統是着重號（點在字下方）→ 首頁 `.prose em` 用 `text-emphasis: filled dot`。**只收在首頁**：文章正文的斜體多是 *Tenet* 這類西文作品名，該保持 italic |
| **行高與字距** | 中文長讀行高 ~2.0–2.1、字距 +0.015em；`text-wrap: pretty`（正文）與 `balance`（標題）避免孤字 |
| 直式 | 立軸用 `--font-prose` + `text-orientation: upright`（漢字直立）；故標題 subset 不必帶 `vert`／`vrt2` |
| webfont 邊界 | `--font-heading` 只有 `global.css` 裡**一條**規則接，不寫進元件的 scoped style；那份清單必須是 `headingChars()` 掃到的**子集**（故止於 `h4`），多接就是靜默缺字，`check-fonts.mjs` 只查反向 |

---

## 5. Spacing、Layout、動效

- 8pt grid spacing token（`--spacing-xs`…）；section 間距寬鬆（散文呼吸感）。
- 版心：正文窄欄 `--max-width-narrow`（約 680–720px）；首頁/作品集約 1040–1080px。
- 圓角克制：chip/按鈕 8px、卡片/印章 16px；不做超大圓角。
- 動效短、功能性（theme、hover、連結底線）；尊重 `prefers-reduced-motion`。

---

## 6. Theme 行為

| 規則 | 內容 |
|------|------|
| 模式 | light / dark，手動切換 |
| 預設 | 無 localStorage 時跟 `prefers-color-scheme` |
| 持久化 | `localStorage.theme` |
| 無閃爍 | `<head>` 最前 inline script 設 `data-theme` |
| Giscus | 留言 widget 主題跟隨 `data-theme` 切換 |

---

## 7. 元件與頁面模式

### 7.1 落款印章（`Seal.astro`）

朱砂方塊、白字（預設「吉」）、雙層 inset box-shadow（內圈 seal 色、外圈 bg 色成邊框感）。props：`char`、`size`。用於 Header 左、首頁/單篇文末落款。

### 7.2 全域殼

- **Header**：antfu 式透明（absolute、無底色 bar）；左＝印章 + 站名（`--font-heading`）；右＝文字連結（Blog／履歷／作品集／語系）+ icon 叢（GitHub／RSS／theme）；當前頁 nav 標朱砂底線。
- **Footer**：極簡（版權、RSS、語系），sans。
- **Skip link**、可見 focus ring 保留。

### 7.3 首頁（散文式）

- 繁中 `/`：左＝散文自介（About 逐字）+「近作」最新 3 篇（引用式清單）+「Find me on」社群列；右＝直式立軸（陳建豪 + 標語 + 印章落款）。窄螢幕立軸退回橫排。
- 英文 `/en/`：**橫排**英文版（不做直式），同結構、自然英譯。

### 7.4 作品集 `/works/`

分類 editorial 清單（平台·基礎架構 / AI·Agentic / 自動化·工具 / 競賽·分享）；每項＝黑體標題（`.item .t`，接 `--font-heading`；`div` 不是 heading，`headingChars()` 有專門的 pattern 收它）+ 一句描述 + tag chip + 外連（Live／GitHub／Demo…）。資料在 `src/data/works.ts`（zh + en）。

### 7.5 Blog

- 列表 `/blog/`：**依年份分組**（年份朱砂小標），每篇黑體標題（`.pt`，接 `--font-heading`）+ 日期 + description + tag chip；工具列「搜尋／標籤／RSS」。
- 單篇：窄欄、標題與 h2／h3 黑體（`--font-heading`）、正文系統黑體 + 首行縮排、h2 朱砂左線、連結朱砂底線、blockquote 朱砂左線、code 區塊 surface 底 mono；文末印章落款「落款於臺灣 · <年>」；其後 Giscus 留言。
- Tags：`/blog/tags/[tag]`；chip 樣式一致。
- 搜尋：`/blog/search`（Pagefind，靜態索引）。

### 7.6 社群（`src/data/socials.ts`）

列出全部平台（GitHub、LinkedIn、X、Facebook、Instagram、Stack Overflow、Dribbble、Behance、Website、Blog、Email），**只 render 有 URL 的**（現：GitHub、LinkedIn），其餘留空待補、**不得出現死連結**。真線性 SVG icon + aria-label。

---

## 8. 內容與媒體

| 項目 | 規則 |
|------|------|
| 文章路徑 | `content/blog/YYYY/<slug>.md` → `/blog/<slug>`；英文 `content/blog/en/...` |
| 正文圖 | **一律固化為本地 WebP quality 92**（不外鏈）；用 `scripts/optimize-images.mjs` 產出至 `public/blog/img/`，以 `/blog/img/<name>.webp` 引用 |
| 封面 | 新文可用 `astro:assets`（`cover` frontmatter） |
| 圖說 | 有說明文字的圖用 `<figure>` + `<figcaption>`（不要另起一段當正文）；圖說內的連結寫成 `<a href>`，markdown 語法在 raw HTML 區塊內不解析 |
| 圖片標準 | **WebP q92**：來源多為已壓過的圖，q92 兼顧文字截圖銳利與 ~25% 瘦身；q95 以上對此類來源幾乎不省(見 Decisions Log) |
| 草稿 | 無 frontmatter draft；用 GitHub Draft PR |
| 語調 | 繁中為主、技術準確；長文可走 humanizer 去 AI 味 |

---

## 9. 無障礙與 SEO

- 可見 focus ring；對比 AA；一頁一 h1；`<html lang>` 隨語系。
- 圖片有意義 `alt`；裝飾圖空 alt。
- Analytics：採 **Cloudflare Web Analytics（無 cookie、隱私友善）**，token 存在才載入（見 Decisions Log）。
- **microformats2（P2-11）**：文章 `article.post.h-entry`（`p-name` 標題、`dt-published` 時間、`e-content` 正文、`p-category` 標籤、隱藏 `u-url` 與 `p-author h-card`）；首頁 `aside.scroll.h-card`（`p-name` + 隱藏 `u-url`）；社群連結帶 `rel="me"`。**這些是語意標記，不影響版面** —— 改版時務必保留 class，否則 webmention／Bridgy Fed 解析不到。
- 站外迴響（webmention）與站內留言（Giscus）分區並存：前者在上、後者在下，各自 `border-top` 分隔。

---

## 10. 給 AI／協作者的硬規則

```text
1. 任何視覺／UI 決策前讀本 DESIGN.md。
2. 顏色、字級、間距只用 token；禁 magic hex、禁紫漸層/霓虹/icon grid/AI slop。
3. 主色只有朱砂一色；標題黑體、blog 正文系統黑體、首頁散文與印章宋體。
4. 首頁走散文式，不要改成卡牆作品目錄。
5. 直式只用於純中文短句（立軸）；含英文長內文一律橫排。
6. 偏離本檔須使用者明確批准，並補一列 Decisions Log。
7. 改 token 先改 global.css，再回寫本檔表格保持同步。字型分兩種改法，別混：
   換字型檔 → build-fonts.mjs 的 FONT 物件 + global.css 的 token。
   改「哪些位置吃標題字」→ global.css 那條唯一接點規則 + site-chars.mjs 的 PATTERNS，
   兩份清單必須一致（gate 只查反向，多接就是靜默缺字）。
```

---

## 11. Decisions Log（決策記錄）

| 日期 | 決策 | 理由 |
|------|------|------|
| 2026-07-24 | 建立 Astro 殼、A1 URL、UI 雙語、light/dark + no-flash | 遷移骨架；繁中 source of truth |
| 2026-07-25 | **改版為「東方水墨散文集」方向**（取代原 Blake-like true-minimal 純黑白） | 使用者偏好 antfu 散文式 + 中文散文集氣質、更有個人溫度 |
| 2026-07-25 | **主色改朱砂 `#c8392b`／`#d6594c`**（原無彩色 accent） | 呼應落款印章與職涯紅；與 film-brain 橘區隔 |
| 2026-07-25 | **主字改宋體（Noto Serif TC）**，UI 用 sans | 散文集人文質感 |
| 2026-07-25 | **底色改宣紙米白／墨色**（棄純黑白） | 暖、可長讀、貼水墨裝幀 |
| 2026-07-25 | **落款印章「吉」為 logo**（取代手繪簽名） | 好做、文化貼合、天然提供朱砂 |
| 2026-07-25 | **首頁改散文式 + 右側直式立軸** | antfu 式自介 + 中文直排點綴；英文版橫排 |
| 2026-07-25 | **站名定為「吉光聚斂，米粒成章」** | 「吉米」拆入兩句；技術（吉光）× 生活（米粒）並置 |
| 2026-07-25 | **新增作品集 `/works/`；Film-brain 由 nav 收進作品集** | film-brain 為作品之一，集中呈現 |
| 2026-07-25 | **加搜尋（Pagefind）、留言（Giscus）** | v1 延後項，P2 補上；皆 gating |
| 2026-07-25 | **Analytics 由「v1 不做」改為 Cloudflare Web Analytics（無 cookie）** | 使用者要基本流量數據，選隱私友善方案不破壞原則 |
| 2026-07-25 | **全站文章英譯 37 篇 + AI 翻譯提示 banner** | 服務英文讀者；GEMBA-MQM 評估 0 Critical/0 Major |
| 2026-07-25 | **舊 Blogger 外鏈圖全數固化為本地 WebP q92**（`public/blog/img/`，工具 `scripts/optimize-images.mjs`） | 來源已壓過，q92 兼顧文字銳利與 ~25% 瘦身、q95+ 幾乎不省；優先用 Takeout Albums 全畫質原檔（dHash 比對）、無死連結 |
| 2026-07-25 | **canonical 改為自有 domain `jimmychen.me`** | 逃離主機綁定（`*.pages.dev` 與平台帳號一樣不屬於自己）；`site` 一處改，canonical／hreflang／og／RSS／sitemap 全跟著換 |
| 2026-07-25 | **加 microformats2 + webmention endpoint + 站外迴響區（P2-11）** | 讓自站成為 IndieWeb 節點：Bridgy Fed 只需 mf2 + 可發現 feed，即可讓 fediverse／Bluesky 使用者直接追蹤本站、回覆以 webmention 回流，**不需經營社群帳號**。標記無視覺副作用故不 gating；endpoint 與抓取由 `PUBLIC_WEBMENTION_DOMAIN` gating |
| 2026-07-25 | **迴響用「排程 + 先查」（每 6 小時查，有新迴響才 build）** | webmention.io webhook 無法帶 `Authorization` header，接不上需 PAT 的 `repository_dispatch`；即時需多一層 CF Worker 持有可寫 repo 的 PAT。改為 gate job 比對全網域最大 `wm-id` 與 `actions/cache` 上次值，無變化就 ~10 秒結束不 build——用一個**唯讀** token 換到同樣的低浪費。額度不是考量（public repo 的 Actions 分鐘免費、`wrangler pages deploy` direct upload 不計入 CF 的 500 builds/月），純粹是避免無意義的重建與 deploy 雜訊。已保留 `webmention` dispatch type 供日後升級 |
| 2026-07-25 | **自寫 `Webmentions.astro`，不用現成套件** | npm 上不存在 `astro-webmention`（當日直查 registry 為 Not found）；自寫約 80 行並包 try/catch 降級，避免 webmention.io 故障導致 CI 紅 |
| 2026-07-25 | **加 `og:image`（站台通用卡 `public/og.png`）、`og:type=article`、`twitter:card=summary_large_image`、JSON-LD** | 原本分享出去是**沒有預覽圖的裸連結**，文章頁的 `og:type` 也錯寫成 `website`。**刻意用單一張站台通用圖，不做每篇動態生成**：`ubuntu-latest` 沒有中文字型，在 CI 產圖會**靜默**產出方框或空白（本檔 PNG 於本機產出並 commit，並以像素斷言驗過「吉」與站名真的畫出來——同 `avatar.png` 的做法）。每篇差異由 `og:title`／`og:description` 表達。JSON-LD：文章頁 `BlogPosting`、其餘 `Person`；與首頁既有的 mf2 h-card 並存不衝突（前者給搜尋引擎、後者給 IndieWeb 解析器） |
| 2026-07-25 | **修 Lighthouse 抓到的兩個 a11y 問題：`--color-text-tertiary` 對比、Header brand 缺 accessible name** | **兩者都是 pa11y 七頁全 0 issue 卻被 Lighthouse 抓到的** —— 規則集不同，所以兩個工具都要留。① tertiary 用於 meta／時間／標籤等 13–14px 小字（屬 WCAG「一般文字」需 4.5:1）：亮色 `#9a9186` 僅 **2.83:1** → `#766d63`（色相 33°／飽和 9% 不變，亮度 56%→42%）**4.63:1**；暗色 `rgba(236,230,217,0.4)` 等效 `#6c6b67` 僅 3.31:1 → α **0.55**（等效 `#8c8a84`）**5.09:1**。② Header 的 `.brand` 連結在小螢幕會被 media query 把 `.brand-text` 設為 `display:none`，而印章是 `aria-hidden` → 屆時**整個連結沒有可讀名稱**（Lighthouse 用行動裝置模擬，故四頁都報 `link-name`）。補 `aria-label`，不受 CSS 影響。結果：Accessibility **90 → 100**，兩項失敗元素皆歸零 |
| 2026-07-25 | **加 stylelint／markdownlint／html-validate／knip，CI 另加 Lighthouse + pa11y（advisory）** | 一致套用「**linter 抓錯誤、formatter 管風格,兩者不重疊**」：stylelint 用 `config-recommended` 而非 `standard`（後者 165 個告警幾乎全是 `rule-empty-line-before` 這類排版）、markdownlint 關 `MD060`。**實際抓到的真問題**：`koding` 那篇匯入舊文有 Tomcat `server.xml` 片段**沒包 code fence**，被瀏覽器當成 `<host>`／`<valve>`／`<context>` 未知元素解析（已補 ```xml 並還原 `\_` 轉義）；`hidden="from-humans"` 不是合法的 HTML（`hidden` 是列舉屬性，Bridgy Fed 文件範例如此寫但它只認 class 與 href）；404 頁與名片頁的 `<nav>` 缺 accessible name。`valid-id` 放寬為 `relaxed`（HTML5 允許 id 以數字開頭，html-validate 預設沿用較嚴的舊規則，匯入舊文的數字標題會誤報）。Lighthouse 與 pa11y 皆 advisory：Lighthouse 的 best-practices **會扣 CSP 的分**（我們刻意含 `'unsafe-inline'`），設門檻只會逼人放寬 CSP。knip 也 advisory —— 它是清理機會而非正確性 gate |
| 2026-07-30 | **正文連結由朱砂實線底線改為朱砂虛點底線** | 使用者不喜歡實線底線的視覺重量。實作從 `border-bottom` 換成 `text-decoration: underline dotted`：`border-bottom` 在連結斷行時會沿整行拉出框線，`text-decoration` 只跟著字走。**虛點線同時是必要的 a11y 線索**——WCAG 1.4.1 規定連結若只靠顏色區分，需對周圍正文 ≥ 3:1（實測朱砂對正文：暗色 3.13:1、亮色 3.29:1，只是剛好及格），有非色彩線索就不吃這條限制。另需明確宣告 `.body a:hover`，否則會吃到 `global.css` 的 `a:hover`（把底線轉成 `--color-text`、蓋掉朱砂）——舊版用 `border-bottom` 時那條 hover 剛好無效，換成 `text-decoration` 後就會生效 |
| 2026-07-30 | **正文圖說改用 `<figure>` + `<figcaption>`**（原本是圖片下方另起一段正文） | 原寫法在語意上圖說跟正文同級，讀者與解析器都分不出哪句是圖說；字級也跟正文一樣重，視覺上搶戲。改用 `figcaption` 後沿用 `.signoff` 那套次要小字（`--font-size-sm` + `--color-text-tertiary` + `--font-sans`），不新增 token。`.body :global(figure img)` 把 `margin-block` 歸零，因為 `figure` 自己已有 margin，不歸零圖說會被圖片的下 margin 推開、貼不住圖。**圖說內的連結必須寫成 `<a href>`** —— CommonMark 對 block-level raw HTML 是原樣輸出，`[text](url)` 在 `<figure>` 裡不會被解析。舊文 22 篇有圖但全是 Blogger 匯入的 `[![](…)](…)`、沒有圖說文字，故無需 retrofit |
| 2026-07-25 | **暗色版朱砂 `#d24a3b` → `#d6594c`（WCAG AA）** | 原值對墨底 `#17191b` 只有 **4.01:1**，未達 AA 的 4.5 —— 而 §9 明訂「對比 AA」是硬規則，屬自我矛盾。新值只把 HSL 亮度 53% → **57%**，**色相 6° 與飽和 63% 不動**，是達標所需的**最小改動** → **4.53:1**。亮色版 `#c8392b` 為 4.70:1、次要文字 `#666059` 為 5.66:1、墨 `#17191b` 為 16.07:1，本來就合格，皆不動 |
| 2026-07-25 | **安全性 header 全面補上（`public/_worker.js`，單一出口）** | 原本只有 Cloudflare 預設給的 `x-content-type-options` 與 `referrer-policy`。新增 **CSP**、**HSTS**、`X-Frame-Options`、`Permissions-Policy`、`Cross-Origin-Opener-Policy`。**架構刻意重構為單一出口**（`route()` 決定回應、`fetch()` 統一套 header）：這裡有六種回應（兩種 301、兩類 302、`.vcf`、ASSETS 直通含 404），把 header 灑在各分支很容易變成「首頁有、404 與轉址沒有」，而只 curl `/` 的驗證抓不到。**CSP 的誠實限制**：`script-src` 含 `'unsafe-inline'`（no-flash 主題與 giscus 載入器是 `is:inline`，靜態輸出無法加 nonce）→ **拿不到真正的 XSS 防護**；價值在於限制 `frame-src`／`frame-ancestors`／`connect-src`／`object-src`／`base-uri`。必含 `'wasm-unsafe-eval'`（Pagefind 用 WebAssembly，漏了 `/blog/search` 會壞）；`img-src` 用 `https:` 而非白名單（webmention 頭像來自任意網域）。HSTS **刻意不加 `preload`**（單向門）與 **`includeSubDomains`**（會綁住不由我們控制的 `mirror.jimmychen.me`） |
| 2026-07-25 | **新增 404 頁（`src/pages/404.astro`）** | 缺這一頁時 Cloudflare Pages 用 SPA fallback 拿 index.html 頂上 → **任何打錯的網址都回 200 + 首頁內容（soft-404）**，Google 會把無限多垃圾網址當有效頁面索引、使用者也不知走錯。實測修復後亂打路徑回真 404。靜態站無法在伺服器端判斷語言，故單頁雙語（繁中為主、英文一行） |
| 2026-07-25 | **`/blog/` 加 h-feed** | 讓 IndieWeb reader 與 mf2 解析器能把列表頁當 microformats feed 消費（RSS 之外的另一條路）。每則為 h-entry，根元素是 `<a href>` 故 mf2 implied-url 規則自動提供 `u-url`。**副作用**：列表頁與 tag 頁從此也有 `dt-published`，webmention 發送器原本用它判定「是否為文章」會誤判（74 → 106），已改以 `e-content` 判定 |
| 2026-07-25 | **舊 Blogger 路徑 301（`public/_worker.js`）：regex + 3 筆例外，不搬 36 筆映射** | `url-map.json` 的 36 筆中有 33 筆是純機械規則 `/YYYY/MM/<slug>.html → /blog/<slug>`；例外只有 3 筆（Blogger 的 `blog-post` slug 跨年重複，匯入時加了數字後綴）。用 regex + 小例外表避免同一份映射存在兩個地方 |
| 2026-07-25 | **Bridgy Fed 即時聯邦：文章加 `u-bridgy-fed` 標記，只在繁中版** | 新文章原本要等 Bridgy Fed 輪詢 RSS 才聯邦；加此標記後由既有的 webmention 發送器在部署後通知 `fed.brid.gy`，立即聯邦。**只在繁中版輸出**——中文是內容真相源，英文版也放會讓同一篇聯邦兩次。⚠️ **取捨**：Bridgy Fed 文件明載「送過一次 webmention 後會停止讀 Atom/RSS feed，改為期待所有未來貼文都用 webmention」，即發送器壞掉時新文章會**安靜地不再聯邦**；要退回輪詢模式須移除該標記，且該切換可能不會立即回復 |
| 2026-07-25 | **明確不做：`u-syndication`／Micropub／Microsub／WebSub／post types** | `u-syndication` 需要「平台上的副本」可指，但 Bridgy Fed 是聯邦而非同步，沒有副本；Micropub 要一台代為 commit 的伺服器，價值取決於「git 發文摩擦是否真的擋住發文」；Microsub 是閱讀端且依賴 Micropub；WebSub 對個人站幾無感（RSS 輪詢本就 15–60 分鐘），而「即時」需求已由上一列的 Bridgy Fed webmention 解決；post types（note／reply／like／bookmark）綁在「要不要公開短隨筆」這個未決策上 |
| 2026-07-25 | **發送 webmention（`scripts/send-webmentions.mjs`），並加日期閘門** | 原本只「收」不「送」，IndieWeb 的互惠性只做一半。三個刻意限制：① 只掃 `e-content` 內的連結（header／footer 的社群連結每頁都有，一併送等於重複轟炸同一批網站）；② `--since` 預設 2026-01-01 —— 匯入的 2014–2017 舊文有 180 個外部連結、多已失效，回溯通知是噪音（實測閘門省掉 176 次無謂請求）；③ 已送的 `(source, target)` 記入 `actions/cache`，不重複送。**必須在 deploy 之後執行**：接收端會回抓 source URL 驗證，部署前送出必然驗證失敗。另需排除自家全部主機名，否則舊文提到的 `*.pages.dev` 會讓我們對自己送 webmention |
| 2026-07-25 | **宣告 `rel="authorization_endpoint"` 委派 indieauth.com；不宣告 `token_endpoint`** | 讓「用 `jimmychen.me` 登入第三方服務」被更多服務認得。靜態站無後端可自行簽發，委派是 IndieWeb 標準做法（tantek.com、adactio.com 皆如此）。`token_endpoint` 是給 Micropub 發 token 用的，本站沒有 Micropub → 宣告了無用途，日後加 Micropub 再補。**OpenID 不做**：OpenID 1.0/2.0 已死、OpenID Connect 是「當身分提供者」的協定，個人靜態站的對應需求就是 IndieAuth |
| 2026-07-25 | **電子名片 `/contact`（+ `/en/contact`）：h-card 為正本、vCard 3.0 為衍生匯出** | IndieWeb 的慣例是 h-card 即 vCard 的 HTML 版（hCard 1.0 原為 RFC 2426 的 1:1 對映），故頁面 h-card 是真相源、`.vcf` 由同一份 `src/data/contact.ts` 產生。**選 vCard 3.0 而非 4.0**：3.0 近乎全平台可匯入且是 Apple／Outlook 自身匯出的版本，4.0 在舊 Android／舊 Outlook／iOS 16 以下可能匯入失敗，而其新增屬性（KIND／MEMBER／GENDER／RELATED）對個人名片無用；名片唯一的工作是對方手機存得進去，而對方裝置不可控 → 相容性優先。中文亂碼與版本無關（來源是編碼與 Content-Type），故以 UTF-8 輸出、不寫 `CHARSET` 參數，並由 worker 補 `text/vcard; charset=utf-8` |
| 2026-07-25 | **名片刻意不放：電話、真實 Gmail、公司名／logo、地址** | 電話一律不放；只用自有網域別名（可撤銷、換信箱供應商不必改名片）；職稱已傳達「做什麼」，任職資訊住 `/resume/`，不提公司也就不需要「非公司官方頁面」免責句；地址只到城市層級 |
| 2026-07-25 | **QR 指向名片頁而非 `.vcf`；自行產生不用外部服務** | 指向頁面才能之後換內容而不必重印卡片／重寫 NFC。QR 由 `qrcode`（devDependency，僅 build 時執行）產生 inline SVG + 可下載 SVG，兩者同源必然一致；不打外部 QR 服務（CSP 與離線可用性） |
| 2026-07-25 | **Bridgy Fed 自訂 handle：`/.well-known/{host-meta*,webfinger*,atproto-did}` 302 → `fed.brid.gy`（`public/_worker.js`）** | 讓別人直接用 `@jimmychen.me` 追蹤本站。規格要求 302（對方端點可能變動）且 host-meta／webfinger 須保留 query（webfinger 靠 `?resource=`）；atproto-did 反之用固定 query 標明本站身分。與 pages.dev 轉址共用同一個 worker，不另加 dashboard 規則 |
| 2026-07-25 | **不輸出 `rel="pingback"`** | pingback 是 XML-RPC 舊協定、垃圾訊息重災區（webmention.io 自身也警告），已在該服務停用；宣告一個停用端點只會引來嘗試。僅保留 `rel="webmention"` |
| 2026-07-25 | **`jimmychen.pages.dev` 301 → `jimmychen.me`（`public/_worker.js`）；GitHub Pages mirror 不轉址** | pages.dev 與 canonical 同屬 Cloudflare，一起壞、無備援價值 → 收成單一入口。GH Pages 是唯一非 Cloudflare 副本，轉址會讓備援指向故障中的網域，故保留 serve 內容（SEO 已由 canonical 收斂）。用 `_worker.js` 而非 `functions/`：CI deploy job 只下載 dist、不 checkout repo |
| 2026-07-31 | **字型設定收成兩個入口，token 改按角色命名，並補上 zh-TW 排版慣例** | 改字型前得翻四處 CSS 加一支 build script，是前一列那些坑的溫床。三件事：① token 由字族名改角色名（`--font-sans` → `--font-body`／`--font-ui`，`--font-serif` → `--font-prose`）—— 舊的 `--font-sans` 同時是「blog 正文」與「UI 小字」的來源，所以「改正文」動不了而不順手動到 nav，31 處要一處處確認；② `--font-heading` 收成 `global.css` 一條規則（原本散在四個檔的 scoped style），註解直接指向 `site-chars.mjs` 的 `PATTERNS`，那兩份清單必須一致；③ 字型檔的選擇收進 `build-fonts.mjs` 的 `FONT` 物件，family 名寫進 `fonts.json` 由 `BaseHead` 讀，不再兩邊手抄。排版慣例照 [漢字標準格式](https://github.com/ethantw/Han)／[clreq](https://www.w3.org/TR/clreq/)／MDN 補：**拉丁字型前置**（中文字型的拉丁字形是為全形格線設計的）、subset 保留 `halt`（[缺 `chws`／`halt` 時 `text-spacing-trim` 直接停用](https://developer.mozilla.org/en-US/docs/Web/CSS/text-spacing-trim)）、首頁 `.prose em` 改**着重號**（漢字沒有斜體，CJK italic 是整體剪切傾斜；只收首頁，文章正文的斜體多是西文作品名）。`text-autospace`／`text-spacing-trim` 刻意**不宣告** —— 兩者 initial value `normal` 就是要的行為，寫了是 no-op，也因此不需要 pangu.js |
| 2026-07-31 | **字型重排：標題自 host 思源黑體 TC subset、blog 正文系統黑體、首頁散文與印章留宋體**（原本標題與正文都是宋體 `Noto Serif TC`／Songti） | 起因是**行內粗體看不出來**：思源宋體不是任何主流系統的內建字型，而各系統的宋體（macOS Songti、Windows 新細明體）粗體天生輕。正文改系統 sans（各平台都有真字重）；標題不能同樣交給系統 —— 版面最顯眼的地方在 PingFang 與微軟正黑之間長得不一樣，故自 host 思源黑體 TC，subset 只收標題用字（445 字、每字重約 66 KB；正文若也自 host 要 371 KB／字重，效能代價不成比例）。`font-display: optional` 而非 `swap`：中文 webfont 與系統字寬不同，換字會跳版（實測整站 webfont 方案首頁 CLS 0 → 0.155）。**兩個非顯而易見的坑**：① @font-face 的 family 名必須是 `'NotoSansTC Head'` 這種站內專用名，叫 `'Noto Sans TC'` 會蓋掉 `--font-sans` 裡的同名字型，讓正文也吃到只有標題字的 subset、段落中間出現兩種字面，而 `check-fonts.mjs` 只查「subset 缺字」這個方向，抓不到；② 因此 `body` 不再帶 webfont，`--font-heading` 只掛在 `headingChars()` 掃得到的位置（止於 `h4`）。`strong`／`b` 不再吃這個 face（正文已是系統黑體，有真粗體），字集仍收著它們，寬一點只多幾 KB |
| 2026-07-29 | **公開 `/resume/` 降為 L0；完整履歷不再組進公開 dist** | 完整 HTML／PDF 已長期公開，與 hidden-resume（身分授權、可撤銷、短效）矛盾。主站自建 L0 摘要頁（`/resume/`、`/en/resume/`）；CI 停止 checkout `jimc1682000/resume`；deploy 硬擋 `resume-*.pdf`。完整內容改 private 源 + 後續 git 歷史清洗（見 `docs/hidden-resume.md`） |

---

## 12. 變更流程

1. 改視覺前讀本檔與 Decisions Log。
2. 改 token：先改 `global.css`，再同步本檔 §3/§4 表格。
3. UI PR：對照本檔「反模式」與 token。
4. 大方向變更：新增 Decisions Log 列 + 使用者批准。

---

*本檔隨個人站設計演進維護。runtime token 以 `src/styles/global.css` 為準。*
