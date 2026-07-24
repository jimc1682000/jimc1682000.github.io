# DESIGN.md — 吉光聚斂，米粒成章 · 設計說明書

> repo 根目錄的品牌／視覺決策真相源。
> 人類、外包、AI agent 在做任何 UI／視覺決策前 **必讀本檔**；token 落地後以 `src/styles/global.css` 的 CSS variables 為 runtime 真相，本檔解釋「為什麼」並與之同步。
> 結構參考：[DESIGN.md：一份讓品牌說話的說明書（vista.tw）](https://www.vista.tw/blog/design-md-your-brand-spine)。
> 版面靈感：[antfu.me](https://antfu.me)（散文式自介、行內連結、透明 nav）；氣質取自中文散文集裝幀（水墨、宣紙、朱印、直式）。**皆為靈感，非抄襲**。

---

## 1. Product Context（產品脈絡）

| 項目 | 內容 |
|------|------|
| **是什麼** | 陳建豪 Jimmy Chen 的個人官方站：散文式 brand 首頁 + blog + 作品集 + 組裝進來的履歷 |
| **站名** | **吉光聚斂，米粒成章**（「吉米」拆入兩句；短牌用「吉光聚斂，米粒成章」，長標語見下） |
| **標語** | 微光聚斂處，粒粒皆文章 —— Jimmy 的技術與生活隨筆 |
| **給誰看** | 繁中為主的技術／DevOps／SRE／AI 工程同溫層；次要英文讀者 |
| **產品類型** | 個人 brand 樞紐 + 編輯型（散文型）blog；非 SaaS、非電商 |
| **內容範疇** | DevOps／SRE 維運、AI／agentic 工作流、電影觀後、生活雜記 |
| **託管** | canonical：**Cloudflare Pages**（`jimmychen.pages.dev`）；**GitHub Pages** 為 mirror |
| **多語** | UI 雙語（`src/i18n/ui.ts`）；正文繁中為 source of truth；URL **A1**（裸根繁中，`/en/...` 英文） |
| **路徑地圖** | `/` 散文首頁 · `/blog/*` · `/blog/tags/[tag]` · `/blog/search` · `/works/` 作品集 · `/resume/` · `/film-brain/` · `/en/...` |

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
| **宋體為主** | 標題與內文用 Noto Serif TC／Songti，拉出散文集人文質感；UI（nav/meta）用 sans |
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
| `--color-seal` | `#d24a3b` | 朱砂（墨底稍亮） |
| `--color-seal-tint` | `rgba(210,74,59,0.16)` | tag chip 底 |

### 3.3 語意規則

- **連結（正文內）**：`--color-text` + 朱砂底線（`border-bottom`）；hover 轉朱砂色。
- **標題記號 / 年份標 / tag active**：朱砂。
- **Tag chip**：`--color-seal-tint` 底 + 朱砂字，藥丸形。
- **對比**：正文對底 WCAG AA 以上；tertiary 小字已調至可讀。

### 3.4 Why（色彩）

- 宣紙米白 + 墨字 + 朱砂，是中文散文集裝幀的原型；與「落款印章」「散文」定位一體。
- 朱砂同時呼應職涯最鮮明的一段（TrendMicro 紅），且與 film-brain 橘明確區隔。
- 不做多彩品牌色：讓文字與留白說話。

---

## 4. Typography（字體）

```text
--font-serif:
  "Noto Serif TC", "Songti TC", Georgia, "PingFang TC", serif;   /* 標題 + 內文主字 */

--font-sans:
  -apple-system, BlinkMacSystemFont, "PingFang TC", "Noto Sans TC",
  "Segoe UI", sans-serif;                                        /* nav / meta / UI */

--font-mono:
  ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
```

| 規則 | 說明 |
|------|------|
| 主字 | **宋體（serif）** 為散文質感主角；標題、內文、印章字皆 serif |
| UI | nav、日期、tag、footer 等用 **sans**，維持介面清爽 |
| 中文 | 必含 TC serif 後備（Noto Serif TC / Songti） |
| 正文 | blog 內文 ~1.1rem、行高 ~2.0（中文長讀舒適） |
| 直式 | 立軸用 serif + `text-orientation:upright`（漢字直立） |

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

- **Header**：antfu 式透明（absolute、無底色 bar）；左＝印章 + 站名（serif）；右＝文字連結（Blog／履歷／作品集／語系）+ icon 叢（GitHub／RSS／theme）；當前頁 nav 標朱砂底線。
- **Footer**：極簡（版權、RSS、語系），sans。
- **Skip link**、可見 focus ring 保留。

### 7.3 首頁（散文式）

- 繁中 `/`：左＝散文自介（About 逐字）+「近作」最新 3 篇（引用式清單）+「Find me on」社群列；右＝直式立軸（陳建豪 + 標語 + 印章落款）。窄螢幕立軸退回橫排。
- 英文 `/en/`：**橫排**英文版（不做直式），同結構、自然英譯。

### 7.4 作品集 `/works/`

分類 editorial 清單（平台·基礎架構 / AI·Agentic / 自動化·工具 / 競賽·分享）；每項＝serif 標題 + 一句描述 + tag chip + 外連（Live／GitHub／Demo…）。資料在 `src/data/works.ts`（zh + en）。

### 7.5 Blog

- 列表 `/blog/`：**依年份分組**（年份朱砂小標），每篇 serif 標題 + 日期 + description + tag chip；工具列「搜尋／標籤／RSS」。
- 單篇：窄欄 serif、h2 朱砂左線、連結朱砂底線、blockquote 朱砂左線、code 區塊 surface 底 mono；文末印章落款「落款於臺灣 · <年>」；其後 Giscus 留言。
- Tags：`/blog/tags/[tag]`；chip 樣式一致。
- 搜尋：`/blog/search`（Pagefind，靜態索引）。

### 7.6 社群（`src/data/socials.ts`）

列出全部平台（GitHub、LinkedIn、X、Facebook、Instagram、Stack Overflow、Dribbble、Behance、Website、Blog、Email），**只 render 有 URL 的**（現：GitHub、LinkedIn），其餘留空待補、**不得出現死連結**。真線性 SVG icon + aria-label。

---

## 8. 內容與媒體

| 項目 | 規則 |
|------|------|
| 文章路徑 | `content/blog/YYYY/<slug>.md` → `/blog/<slug>`；英文 `content/blog/en/...` |
| 封面 | 新文 `astro:assets`；正文圖 `public/blog/...`；舊 Blogger 圖暫外鏈 |
| 草稿 | 無 frontmatter draft；用 GitHub Draft PR |
| 語調 | 繁中為主、技術準確；長文可走 humanizer 去 AI 味 |

---

## 9. 無障礙與 SEO

- 可見 focus ring；對比 AA；一頁一 h1；`<html lang>` 隨語系。
- 圖片有意義 `alt`；裝飾圖空 alt。
- Analytics：採 **Cloudflare Web Analytics（無 cookie、隱私友善）**，token 存在才載入（見 Decisions Log）。

---

## 10. 給 AI／協作者的硬規則

```text
1. 任何視覺／UI 決策前讀本 DESIGN.md。
2. 顏色、字級、間距只用 token；禁 magic hex、禁紫漸層/霓虹/icon grid/AI slop。
3. 主色只有朱砂一色；主字為宋體。
4. 首頁走散文式，不要改成卡牆作品目錄。
5. 直式只用於純中文短句（立軸）；含英文長內文一律橫排。
6. 偏離本檔須使用者明確批准，並補一列 Decisions Log。
7. 改 token 先改 global.css，再回寫本檔表格保持同步。
```

---

## 11. Decisions Log（決策記錄）

| 日期 | 決策 | 理由 |
|------|------|------|
| 2026-07-24 | 建立 Astro 殼、A1 URL、UI 雙語、light/dark + no-flash | 遷移骨架；繁中 source of truth |
| 2026-07-25 | **改版為「東方水墨散文集」方向**（取代原 Blake-like true-minimal 純黑白） | 使用者偏好 antfu 散文式 + 中文散文集氣質、更有個人溫度 |
| 2026-07-25 | **主色改朱砂 `#c8392b`／`#d24a3b`**（原無彩色 accent） | 呼應落款印章與職涯紅；與 film-brain 橘區隔 |
| 2026-07-25 | **主字改宋體（Noto Serif TC）**，UI 用 sans | 散文集人文質感 |
| 2026-07-25 | **底色改宣紙米白／墨色**（棄純黑白） | 暖、可長讀、貼水墨裝幀 |
| 2026-07-25 | **落款印章「吉」為 logo**（取代手繪簽名） | 好做、文化貼合、天然提供朱砂 |
| 2026-07-25 | **首頁改散文式 + 右側直式立軸** | antfu 式自介 + 中文直排點綴；英文版橫排 |
| 2026-07-25 | **站名定為「吉光聚斂，米粒成章」** | 「吉米」拆入兩句；技術（吉光）× 生活（米粒）並置 |
| 2026-07-25 | **新增作品集 `/works/`；Film-brain 由 nav 收進作品集** | film-brain 為作品之一，集中呈現 |
| 2026-07-25 | **加搜尋（Pagefind）、留言（Giscus）** | v1 延後項，P2 補上；皆 gating |
| 2026-07-25 | **Analytics 由「v1 不做」改為 Cloudflare Web Analytics（無 cookie）** | 使用者要基本流量數據，選隱私友善方案不破壞原則 |

---

## 12. 變更流程

1. 改視覺前讀本檔與 Decisions Log。
2. 改 token：先改 `global.css`，再同步本檔 §3/§4 表格。
3. UI PR：對照本檔「反模式」與 token。
4. 大方向變更：新增 Decisions Log 列 + 使用者批准。

---

*本檔隨個人站設計演進維護。runtime token 以 `src/styles/global.css` 為準。*
