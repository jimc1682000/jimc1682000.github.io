# DESIGN.md — Jimmy Chen 個人站設計說明書

> 放在 repo 根目錄的品牌／視覺決策真相源。  
> 人類、外包、AI agent 在做任何 UI／視覺決策前 **必讀本檔**；token 實作後以 CSS variables 為準，本檔解釋「為什麼」。  
> 結構參考：[DESIGN.md：一份讓品牌說話的說明書（vista.tw）](https://www.vista.tw/blog/design-md-your-brand-spine)。  
> 視覺靈感：[Blake Crosley /zh-Hant](https://blakecrosley.com/zh-Hant/)（**靈感，非抄襲**；不复制其文案、圖資、程式）。

---

## 1. Product Context（產品脈絡）

| 項目 | 內容 |
|------|------|
| **是什麼** | 陳建豪 Jimmy Chen 的個人官方站：brand 首頁 + blog + 組裝進來的履歷與作品集 |
| **給誰看** | 繁中為主的技術／DevOps／SRE／AI 工程同溫層；次要為英文讀者（履歷、作品、可選譯文） |
| **產品類型** | 個人 brand 樞紐 + 編輯型 blog（非 SaaS、非電商） |
| **空間** | 工程實踐 × AI／agentic 工作流 × 維運可靠度 × 公開作品 |
| **託管** | 主：**Cloudflare Pages**；**GitHub Pages** 僅 mirror、不主推 |
| **多語** | UI 雙語（小字典）；正文繁中為 source of truth；英文可選譯文；URL **A1**（裸根繁中，`/en/...` 英文） |
| **對外主 URL（過渡）** | `jimmychen.pages.dev`（之後自有 domain 指 CF） |
| **路徑地圖** | `/` brand · `/blog/*` · `/blog/tags/[tag]` · `/resume/` · `/film-brain/` · `/en/...` 對應英文殼 |

**v1 產品邊界（薄）：** 可讀、可導覽、可發文、可組裝子站。  
**非 v1：** 留言、搜尋、analytics、聯絡表單、完整作品牆、Blogger 全量（骨架後 phase）、自有 domain redirect。

---

## 2. Aesthetic Direction（美學方向）

### 一句話

**True minimal 編輯感 × 工程師個人站 × 深淺雙模** — 像 Blake Crosley 站的克制排版與層級，但資訊量 v1 偏薄、中文閱讀優先。

### 情緒

- 安靜、清楚、有份量，不浮誇  
- 專業但不冷漠；留白是功能，不是裝飾癖  
- 深色預設有「工作室／作品集」感；淺色是暖紙白、可長讀  

### 裝飾層級

- **Typography 與層級為主角**  
- 圖：新文封面可走 `astro:assets`；正文圖克制  
- 動效：短、功能性（theme、hover），不做粉絲向大動畫  

### 明確對齊 Blake 的（要學的）

| 特徵 | 做法 |
|------|------|
| 深／淺色雙模 | `data-theme` + localStorage；無 flash 初始化 |
| 系統字體栈 | SF / 系統 UI sans + **繁中後備** |
| 大英雄標題 + 短 bio | 首頁有「你好／我是…」層級，但區塊少 |
| 頂欄 | 半透明 + 底邊 border；語系與 theme 切換同區 |
| 卡片／區塊 | elevated surface、細 border、寬鬆 section 間距 |
| 閱讀寬 | 正文窄欄（約 65–75ch／`--max-width-narrow`） |
| 極簡 accent | 主交互用高對比（近白／近黑），**不用**高飽和品牌彩虹 |

### 反模式（不要做）

- ❌ AI slop：紫粉漸層、三欄 icon feature grid、泡泡大圓角 CTA、滿版 emoji  
- ❌ 霓虹／賽博／玻璃擬態堆疊（與 film-brain 專案站可區隔；**主站不走那套**）  
- ❌ 抄 Blake 的文案、照片、專案卡內容或直接 hotlink 其 CSS  
- ❌ 為了「像」而把 v1 首頁做成超厚作品宇宙（加厚走 phase 2）  
- ❌ URL 改成他的 `/zh-Hant/` 全前綴（我們鎖 **A1 裸根繁中**）  
- ❌ 同 URL 靠 JS 切整站語言（SEO 與 SSG 不友好）  
- ❌ 正文區過窄或過寬到中文難讀；或純裝飾性巨大 display 字卻無內容  
- ❌ 在 DESIGN.md／token 外隨意寫死 hex  

---

## 3. Color（色彩 token）

靈感來自 Blake 的 monochrome + warm light；名稱供實作映射。  
**程式只許用 token，禁止散落 magic hex。**

### 3.1 Dark（`:root` 預設，`color-scheme: dark`）

| Token | 值 | 用途 |
|-------|-----|------|
| `--color-bg` | `#000000` | 頁面底 |
| `--color-bg-elevated` | `#111111` | 卡片／抬升面 |
| `--color-bg-surface` | `#1a1a1a` | 次級表面、code 區塊底 |
| `--color-text` | `#ffffff` | 主文字 |
| `--color-text-secondary` | `rgba(255,255,255,0.65)` | 導覽、輔助 |
| `--color-text-tertiary` | `rgba(255,255,255,0.40)` | 細標、時間戳 |
| `--color-border` | `rgba(255,255,255,0.10)` | 主邊框 |
| `--color-border-subtle` | `rgba(255,255,255,0.05)` | 分隔 |
| `--color-border-hover` | `rgba(255,255,255,0.20)` | hover 邊 |
| `--color-header-bg` | `rgba(0,0,0,0.72)` | 頂欄（可 backdrop-blur） |
| `--color-accent` | `#ffffff` | CTA／關鍵連結（極簡反白） |
| `--color-accent-hover` | `rgba(255,255,255,0.85)` | accent hover |
| `--color-overlay` | `rgba(0,0,0,0.80)` | modal／遮罩 |
| `--color-focus-ring` | 同 `--color-text` | 鍵盤 focus 輪廓 |

### 3.2 Light（`[data-theme="light"]`）

| Token | 值 | 用途 |
|-------|-----|------|
| `--color-bg` | `#faf9f7` | 暖紙白頁底 |
| `--color-bg-elevated` | `#ffffff` | 卡片 |
| `--color-bg-surface` | `#f0eeea` | 次級表面 |
| `--color-text` | `#1a1a1a` | 主文字（略軟於純黑） |
| `--color-text-secondary` | `rgba(0,0,0,0.64)` | 輔助 |
| `--color-text-tertiary` | `rgba(0,0,0,0.58)` | 細標（需滿足小字對比） |
| `--color-border` | `rgba(0,0,0,0.12)` | 主邊框 |
| `--color-border-subtle` | `rgba(0,0,0,0.07)` | 分隔 |
| `--color-border-hover` | `rgba(0,0,0,0.22)` | hover |
| `--color-header-bg` | `rgba(250,249,247,0.72)` | 頂欄 |
| `--color-accent` | `#1a1a1a` | CTA 反轉為近黑 |
| `--color-accent-hover` | `rgba(0,0,0,0.82)` | |
| `--color-overlay` | `rgba(0,0,0,0.50)` | |

### 3.3 語意規則

- **連結（正文內）**：沿用 `--color-text` + underline／underline-offset；hover 提高對比，避免突然冒出高飽和藍（除非日後 Decisions Log 另定「連結藍」）。  
- **Tag chip**：surface + border + secondary text；active 用 inverted accent。  
- **狀態色**（成功／錯誤）：僅表單／系統訊息需要時再加 token；v1 無表單可暫緩。  
- **對比**：正文與 bg 目標 WCAG AA 以上；小字 tertiary 在 light 已刻意加深。

### 3.4 Why（色彩）

- 對齊參考站的 **true minimal**，讓作品截圖與文字自己說話。  
- 深色適合工程 portfolio 第一印象；淺色適合長文。  
- **不做品牌高飽和主色**，避免與 film-brain 橙／專案站搶識別，也減少 AI 亂加漸層。

---

## 4. Typography（字體）

### 字族

```text
--font-sans:
  -apple-system, BlinkMacSystemFont,
  "SF Pro Text", "SF Pro Display",
  "Segoe UI", "Helvetica Neue", Arial,
  "PingFang TC", "Noto Sans TC", "Microsoft JhengHei",
  sans-serif;

--font-mono:
  ui-monospace, SFMono-Regular, "SF Mono",
  Menlo, Consolas, "Liberation Mono", monospace;
```

| 規則 | 說明 |
|------|------|
| 載入 | **系統字優先**，v1 不強制自架 webfont（減請求、貼 Blake） |
| 中文 | 必須有 TC 後備；勿只寫英文字族導致中文回落混亂 |
| 字重 | 400 body · 500/600 導覽與小標 · 700 標題；少用 900 |
| 正文 | blog 內文建議 `--font-size-lg`（18px）級，行高 ~1.7（中文長文） |
| 標題 | 層級清楚；首頁 hero 可用 display 級，內頁克制 |

### Type scale（1.2 比，對齊參考站精神）

| Token | rem | 約 px | 用途 |
|-------|-----|-------|------|
| `--font-size-xs` | 0.75 | 12 | 細標、極小 label |
| `--font-size-sm` | 0.875 | 14 | 導覽、caption、tag |
| `--font-size-base` | 1 | 16 | UI |
| `--font-size-lg` | 1.125 | 18 | 正文 |
| `--font-size-xl` | 1.3125 | 21 | 強調正文 |
| `--font-size-2xl` | 1.5625 | 25 | 小標 |
| `--font-size-3xl` | 1.875 | 30 | section 標題 |
| `--font-size-4xl` | 2.25 | 36 | 頁標題 |
| `--font-size-5xl` | 2.7 | 43 | 大標 |
| `--font-size-6xl` | 3.25 | 52 | 大區塊 |
| `--font-size-7xl` | 3.875 | 62 | hero |
| `--font-size-display` | 5 | 80 | **僅**首頁主標可選 |

---

## 5. Spacing & Layout（間距與版面）

### 間距（8pt grid）

| Token | 值 |
|-------|-----|
| `--spacing-xs` | 0.5rem（8px） |
| `--spacing-sm` | 1rem（16px） |
| `--spacing-md` | 1.5rem（24px） |
| `--spacing-lg` | 2rem（32px） |
| `--spacing-xl` | 3rem（48px） |
| `--spacing-2xl` | 4rem（64px） |
| `--spacing-3xl` | 6rem（96px） |
| `--spacing-4xl` | 8rem（128px） |

### 版心

| Token | 值 | 用途 |
|-------|-----|------|
| `--max-width` | 1400px | 全寬 section 外殼 |
| `--max-width-narrow` | 800px | 文章、about 短文 |
| `--max-width-wide` | 1600px | 極寬展示（慎用） |
| `--gutter` | clamp(1rem, 4vw, 3rem) | 左右頁邊（實作可近似 48px desktop） |

### 圓角

| Token | 值 | 用途 |
|-------|-----|------|
| `--radius-sm` | 8px | 按鈕、chip |
| `--radius-md` | 16px | 卡片 |
| `--radius-lg` | 32px | 大圖容器（可選） |
| `--radius-xl` | 48px | 少用 |

**原則：** 圓角克制；不要全站「藥丸按鈕 + 超大圓角卡片」堆成消費 App 風。

### 動效

| Token | 值 |
|-------|-----|
| `--transition-fast` | 150ms ease |
| `--transition-base` | 300ms cubic-bezier(0.4, 0, 0.2, 1) |
| `--transition-slow` | 600ms cubic-bezier(0.4, 0, 0.2, 1) |

尊重 `prefers-reduced-motion: reduce`：可停用非必要 transition。

---

## 6. Theme 行為（已決：A）

| 規則 | 內容 |
|------|------|
| 模式 | **light / dark**，手動切換 |
| 預設 | 無 localStorage 時跟 `prefers-color-scheme` |
| 持久化 | `localStorage.theme` = `light` \| `dark` |
| 無閃爍 | `<head>` 最前 inline script 設 `data-theme`（參考 Blake no-flash 模式） |
| 標記 | `<html data-theme="light">` 或省略／`dark` 與 CSS 約定一致 |
| UI | 頂欄 theme toggle；mobile 選單可重複入口 |
| 禁止 | 僅 CSS 變數不夠、還在元件寫死兩套不共享 token 的顏色 |

---

## 7. 元件與頁面模式

### 7.1 全域殼

- **Header**：sticky／fixed 可；半透明 bg + blur 可選；底 border  
- **Nav**：Blog、Resume、Film-brain；（英文）語系切換；theme  
- **Footer**：極簡（版權、RSS 連結、語系）；無重型 CTA 牆  
- **Skip link**：「跳至內容」可及性保留  

### 7.2 首頁（v1 薄 + Blake 層級）

**要有：**

1. Hero：稱呼 + 一句定位 + 短 bio（可 2–4 句）  
2. 主連結列：Blog · Resume · Film-brain（之後可加 GitHub／LinkedIn）  
3. 可選：最近 3 篇（時間序）  

**v1 不要硬做齊（phase 2／P2-19）：**

- 合作 logo 大海  
- 完整近期作品卡瀑布  
- 指南 terminal `$ ls` 區  
- 聯絡表單  
- 多段「系列」編輯牆  

視覺上仍用 **同樣 type scale、section 間距、surface**，讓以後加厚不違和。

### 7.3 Blog

| 元素 | 規則 |
|------|------|
| 列表 `/blog/` | 標題、日期、description；可顯示 tags；時間新→舊 |
| 單篇 | 窄欄、清晰 h1–h3、程式碼區塊 surface、圖片不溢出 |
| Tags | `/blog/tags/[tag]`（及英文前綴對應）；chip 樣式一致 |
| 封面 | 新文：`astro:assets`；列表可小圖或純文字（v1 可純文字） |
| RSS | 頁腳或 nav 可發現：`/rss.xml`、`/en/rss.xml` |

### 7.4 組裝子站

- `/resume/`、`/film-brain/` 為 **iframe 以外的真實子樹**（靜態組裝）。  
- 主站 header 是否包住子站：v1 建議 **子站自帶導覽**（現況如此），主站只連進去；避免雙 header 打架。  
- 子站內部語系（resume/film-brain 自有 `/en/`）不由主站 i18n 字典接管。

### 7.5 語系 UI

- 小字典 `src/i18n/ui.ts`（或同等）：nav、按鈕、空狀態。  
- 切語系：連到對應 path（A1），**整頁導航**，非 client 只換字串。  

---

## 8. 內容與媒體（與架構決策對齊）

| 項目 | 規則 |
|------|------|
| 文章路徑 | `content/blog/YYYY/<slug>.md` → `/blog/<slug>` |
| 英文譯 | 可選 `content/blog/en/YYYY/<slug>.md` → `/en/blog/<slug>` |
| 封面 | 新文 `astro:assets` |
| 正文圖 | `public/blog/YYYY/slug/…` |
| 舊 Blogger 圖 | 暫外鏈 |
| 草稿 | **無** frontmatter draft；用 GitHub **Draft PR** |
| 語調 | 繁中為主；技術文準確；避免 AI 空話（長文可另走 humanizer 流程） |

---

## 9. 無障礙與 SEO（設計相關）

- 可見 focus ring；對比 AA  
- 圖片必有有意義 `alt`（裝飾圖可空 alt）  
- 一頁一 h1  
- `hreflang`：有譯文才互指；`x-default` → 繁中  
- `lang`：`zh-Hant` / `en` 隨頁  
- v1 **不做** analytics 埋碼（不因「統計」塞第三方 script）  

---

## 10. 給 AI／協作者的硬規則

```text
1. 任何視覺／UI 決策前讀本 DESIGN.md。
2. 顏色、字級、間距只用 token；禁止紫漸層、霓虹、AI slop 版型。
3. 偏離本檔須使用者明確批准，並寫入 Decisions Log。
4. 靈感可對齊 Blake 的層級與極簡，但禁止复制其品牌資產。
5. v1 首頁保持薄；不要擅自加厚成完整作品宇宙。
6. 實作 token 的權威檔案建立後（例如 src/styles/global.css），
   以該檔數值為準，並回寫本檔表格。
```

建議在 `CLAUDE.md` / `AGENTS.md` 加入：

```markdown
## Design System
Always read `DESIGN.md` before any visual or UI decisions.
Do not deviate without explicit user approval.
When tokens exist in CSS, treat that file as the runtime source of truth and keep DESIGN.md in sync.
```

---

## 11. Decisions Log（決策記錄）

| 日期 | 決策 | 理由 |
|------|------|------|
| 2026-07-24 | 視覺靈感對齊 blakecrosley.com（非抄襲） | 要編輯感、深淺雙模、極簡 monochrome，避免 AI 預設醜站 |
| 2026-07-24 | Theme = light/dark + 手動切換 + no-flash | 最貼參考站；token 化一次做對 |
| 2026-07-24 | 首頁 v1 薄、風格可像 Blake 層級 | 遷移與組裝優先；加厚 P2-19 |
| 2026-07-24 | URL A1、UI 字典雙語、blog 非對稱目錄 | 與 resume／film-brain 心智一致；繁中 source of truth |
| 2026-07-24 | 主色不做高飽和品牌色 | true minimal；減少風格漂移與 AI slop |
| 2026-07-24 | 系統字 + PingFang/Noto TC 後備 | 中英混排；v1 少 webfont 請求 |
| 2026-07-24 | 建立本 DESIGN.md（vista.tw 結構） | 給人與 agent 的品牌脊柱；跟 repo 版本化 |

（之後每次重要視覺決策加一列，不必回補史前史。）

---

## 12. Phase 2 與本檔的關係（設計向 backlog）

完整工程 backlog 另見遷移文件；與 **視覺**相關的包括：

| ID | 項目 |
|----|------|
| P2-19 | 首頁加厚（作品卡、精選專案，仍守本檔 token） |
| P2-21 | 在 Blake-like 骨架上加深細節（動效、系列編排、封面網格） |
| P2-09 | 留言（若加，widget 樣式須服從 token，不可自帶紫皮） |
| P2-11 | 搜尋 UI |
| P2-13 | OG 圖風格與封面一致 |
| P2-04 | 自有 domain 後的 brand 一致性（canonical、分享圖） |

---

## 13. 變更流程

1. 改視覺前更新／閱讀本檔與 Decisions Log。  
2. 改 token：先改 CSS variables，再同步本檔表格。  
3. PR 若動 UI：reviewer／agent 對照本檔「反模式」與 token。  
4. 大方向變更（例如引入品牌紅）：必須新 Decisions Log 列 + 使用者批准。  

---

*本檔隨個人站 grill 決策建立。Astro 落地後請把 runtime token 路徑補進 §10，並視需要加截圖連結（仍用 repo 內 assets，勿外鏈參考站圖）。*
