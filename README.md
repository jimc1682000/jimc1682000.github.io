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

完整履歷改走 **Zero Trust–inspired** 分享：公開只留 L0；HR 來信使用 Email OTP grant，主動 invite 使用 7 天 bearer link；PDF 由 Worker 授權後從 private R2 串流。完整架構與隱私決策見 [`ADR-0001`](./docs/adr/0001-private-resume-delivery-and-site-privacy.md)；舊版設計保留於 [`docs/hidden-resume.md`](./docs/hidden-resume.md) 供追溯。

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

### Dev Container（可選）

開發環境使用 `.devcontainer/Dockerfile`，固定 Node **22.23.4** 與 multi-platform image digest，對齊 CI 的 Node 22 major，並滿足目前 Astro 的最低版本。支援的 image 架構包含 Linux ARM64 與 AMD64；Mac 仍由 Podman machine／Docker 的 Linux VM 執行。這是開發工具 image，沒有打包網站或部署憑證。

需要可用的 Podman／Docker 與 Dev Containers CLI（文件以 **0.90.0** 為基準），或 VS Code Dev Containers extension。VS Code 使用 Podman 時將使用者設定 `dev.containers.dockerPath` 設為 `podman`，再選 **Reopen in Container**；不將個人的引擎路徑寫進 repo。

Linux AMD64／rootless Docker 的實測結果與未驗證項目見 [Dev Container 驗證紀錄](docs/devcontainer-validation.md)。Mac／Podman／ARM64 仍需另外實測。

建議透過 repo 的操作腳本使用（宿主需有 Node／npm 及可用的 container engine）：

```bash
./scripts/devcontainer.sh build       # 單獨建置 Dockerfile
./scripts/devcontainer.sh up          # 建立或啟動開發環境
./scripts/devcontainer.sh validate    # 容器內完整驗證
./scripts/devcontainer.sh dev         # 啟動 Astro；Ctrl-C 結束
./scripts/devcontainer.sh exec sh     # 進入容器 shell
./scripts/devcontainer.sh rebuild     # Dockerfile／設定更新後重建
```

腳本固定使用 Dev Containers CLI 0.90.0（npm exec 首次會下載至宿主 npm cache），會依實際 Docker daemon 自動選擇 rootless 的 `root` 或一般 Docker 的 `node`，不必手動 export。明確設定 `SITE_CONTAINER_USER` 時會優先採用該值；切換 engine 前請清除不適用的覆寫。腳本可從其他目錄呼叫，仍操作這份 repo。`validate`／`dev`／`exec` 需要先完成 `up`；不會暗中重建容器。Podman 可指定 `CONTAINER_ENGINE=podman`，但相容性尚未實測。

若直接使用 Dev Containers CLI／VS Code，而非上述腳本：本 VPS 已使用 rootless Docker，先確認 `docker context show` 與 `docker info` 的 Security Options 包含 `rootless`，再設定：

```bash
export SITE_CONTAINER_USER=root
```

此選項讓容器 UID 0 對應宿主的登入使用者，解決 rootless Docker 的 bind mount 寫入權限；不需要宿主 sudo，也不更改 source 擁有者。**只在已確認的 rootless Docker 使用這個設定**。一般 rootful Docker／Docker Desktop 保持變數未設定，預設為 `node`。切換此選項後必須重建既有容器。VS Code 必須從帶有該環境變數的工作階段啟動，並確認終端中的 `id` 與 workspace 寫入測試成功；此輪未驗證 VS Code Remote SSH 的環境變數傳遞。

Linux VPS 使用現有 Docker；Mac Podman 使用者將下列 `docker` 換成 `podman`，其 UID 映射與相容性仍需實測：

```bash
devcontainer up --docker-path docker --workspace-folder .
devcontainer exec --docker-path docker --workspace-folder . npm run validate
devcontainer exec --docker-path docker --workspace-folder . npm run dev -- --host 0.0.0.0
```

建立完成會執行 `npm ci`，成功後才算環境就緒；單純重啟不重裝。更新 `package-lock.json` 後，在容器內再跑 `npm ci`。開發伺服器不會自動啟動，避免背景工作與驗證流程互相干擾。

原始碼 bind mount 在 `/workspaces/site`；`node_modules` 與 npm cache 各自使用帶有 `devcontainerId` 的 named volume，不使用 Mac 的 native dependencies，不與其他 workspace 共用可寫 `node_modules`。容器預設以 `node` 執行，rootless Docker 使用上述覆寫；npm cache 固定在 `/home/node/.npm`。初始化只調整這兩個 volume 的擁有者，不遞迴改寫原始碼權限。此環境提供容器內 sudo 以處理 volume 權限，適用可信專案開發，不是執行陌生 repo 的安全 sandbox。

VS Code 可直接使用轉送的 4321 port。無頭 CLI 另將容器 4321 發布到宿主 loopback 的隨機 port，使用 `up` 輸出的 container ID 查詢：

```bash
docker port <container-id> 4321/tcp
```

Dockerfile 可獨立建置；build context 限定 `.devcontainer/`，其 `.dockerignore` 僅允許 Dockerfile、post-create.sh 與 ignore 檔，不傳送 `.env` 或網站內容：

```bash
docker build -t jimc-site-dev .devcontainer
```

容器重建沿用相同 workspace 的依賴 volume；`npm ci` 會依 lockfile 重建依賴。不同 clone 有不同 workspace ID。Git worktree 的 `.git` 可能指向掛載範圍外：第一版建議用一般 clone；使用 worktree 時需另外確認 Git common directory 在容器內可達，不要掛載整個宿主 HOME 解決。

停止容器不刪除 source、volume 或成果。回收時先保留需要的修改與 `dist/`，記下該容器 `inspect` 中的兩個 named volume 名稱，再停止／刪除該容器，最後只刪這兩個 volume；不要使用全域 prune。source 中可能保留空的 `node_modules/` 掛載點，實際依賴在引擎管理的 volume 內。

本機原有 npm 開發路徑仍可使用。字型子集與 OG 圖生成尚未納入此基本 image：它們仍依下方專用流程，需要字型來源、uv 與對應字型環境；一般 check／lint／build 使用 repo 已提交的產物。若需要完整部署時組裝的其他子站，仍依現有 deploy workflow，這個容器只處理本 repo 的網站。

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
