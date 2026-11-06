# Dev Container 驗證紀錄

日期：2026-11-06。狀態：**Linux AMD64／rootless Docker 的 CLI 開發流程通過**。

網站基準 commit：`883a222`。新增 `.devcontainer/`、`scripts/devcontainer.sh`、README 操作說明與本紀錄，未變更網站內容、依賴或部署流程。

## 執行環境與版本

- Hostinger VPS：Linux x86_64；宿主使用者 `t3`，UID 1001。
- Docker client／daemon：29.2.1，context 為 `rootless`，socket 為 `/run/user/1001/docker.sock`；`docker info` 確認 rootless。
- Dev Containers CLI：0.90.0；宿主執行 CLI 的 Node 為 24.22.1。
- 容器 Node：22.23.4，符合 lockfile 中 Astro 7.4.2 的最低要求。
- Base image：`node:22.23.4-bookworm-slim@sha256:4b150b48b4116e2a22f2c39cc27025fbf4f153e2078fd3b14d159fdb5c7279da`。Registry index 包含 AMD64／ARM64；本次只實跑 AMD64。
- Node base image 已固定 digest，但 apt repository 的套件仍隨更新變動；不宣稱整個 image 可逐位元重現。

## Rootless 權限修正

原先檢查的是無權存取的 rootful `/var/run/docker.sock`；現已確認可用的 rootless endpoint，不需要管理員開通 rootful socket。

初次以 `node` 使用者啟動時，workspace 在容器內屬於 UID 0，`node` 無法寫入。設定 `SITE_CONTAINER_USER=root` 後，容器 UID 0 對應宿主 `t3`；實際產生的 `dist/` 檔案仍屬於宿主 UID 1001。沒有對原始碼執行 chown，也沒有改宿主群組或 sudo 設定。

一般 rootful Docker／Docker Desktop 預設仍為 `node`。獨立 image 的預設使用者為 node UID 1000；完整 rootful Dev Container 流程尚未實跑。rootless 覆寫用法及 VS Code 的環境變數限制見 README。

## 通過的檢查

1. **獨立建置**：`docker build -t jimc-site-dev .devcontainer` 成功；image 內 Node 22.23.4、預設 node 使用者及 npm cache 路徑正確。
2. **設定與初始化**：CLI `read-configuration`、`up` 成功解析 rootless 使用者；postCreate 的 `npm ci --no-audit --no-fund` 安裝 574 packages。npm cache 固定使用 `/home/node/.npm` volume。
3. **完整容器驗證**：以 CLI `exec` 執行 `npm run validate`，exit 0。Astro check 為 0 errors／0 warnings／10 個既有 deprecation hints；ESLint、CSS／Markdown lint、Prettier 通過；Webmention tests 8/8；build 125 頁；Pagefind 索引 78 頁；字型涵蓋 451 字、2 faces；microformats 25/25；HTML lint 通過。
4. **開發伺服器**：第二份獨立 source clone 在容器內以 `npm run dev -- --host 0.0.0.0` 啟動；宿主 loopback 隨機 port 的 `/`、`/en/`、`/blog/` 均 HTTP 200。
5. **掛載與變更通知**：宿主修改暫存 clone 的 `index.astro`，Vite WebSocket 收到 `full-reload`，後續 HTTP 回應包含測試標記；修改已還原。這驗證檔案事件與 WebSocket 協定，沒有執行實際瀏覽器或 VS Code 的畫面驗收。
6. **重建**：同一 workspace 使用 `up --remove-existing-container`；container ID 改變，兩個 volume 名稱不變；source 與 npm cache 的測試檔保留，node_modules 的測試檔由 `npm ci` 清除，依賴重新安裝成功。加入寫入權限 preflight 後再次重建成功。
7. **初始化失敗路徑**：以預設 node 身分掛載 rootless workspace 執行 postCreate，立即 exit 1 並提示 rootless 設定，不再等到 build 才出現權限錯誤。
8. **工作空間隔離與回收**：第二份 clone 的 node_modules／npm cache volume 名稱與主 workspace 完全不同。其容器、兩個 volume 和暫存 clone 已移除；逐一 inspect 確認資源不存在。回收前兩個 volume 內資料約 397 MiB／136 MiB；共享 image 與 build cache 保留，不能將此數字當成宿主磁碟精確回收量。
9. **成果保留**：`dist/` 位於宿主 workspace，回收其他測試資源不影響它；`dist/index.html` 的 SHA-256 為 `c4067ff8c973288217e245b3f90264b2aec7a00f562671b8ca37eea1da7b98ce`。

## 統一操作腳本的追加驗證

同日新增 `scripts/devcontainer.sh`，固定 CLI 版本，依 Docker daemon 自動選擇 rootless 使用者。`.devcontainer/.dockerignore` 限定 build context 只納入 Dockerfile、post-create.sh 與 ignore 檔。

- `build`：獨立 image 建置成功。
- `rebuild`：從 `/tmp` 呼叫腳本、移除 `SITE_CONTAINER_USER` 後，仍找到正確 workspace，自動選用 root，重建及 `npm ci` 成功。
- `up`：沿用剛建立的容器，沒有再次執行 postCreate。
- `exec`：實際確認 UID 0、工作目錄 `/workspaces/site`，以及含空白／literal `$` 的命令參數完整傳入。
- `validate`：以新腳本重新執行完整驗證，exit 0；仍為 8/8 tests、125 頁 build、25/25 microformats，所有 lint 通過。
- `dev`：三個測試路徑均 HTTP 200；Ctrl-C 結束後，容器內沒有殘留 Astro／npm 程序。
- 缺少 exec 命令、未知子命令及不支援的額外參數均 exit 2；shell 語法檢查通過。

腳本的 rootful／Podman 分支仍未實機驗證；VS Code 直接開啟容器不會經過這個腳本，仍需依 README 處理 rootless 設定。

主要開發容器驗收後停止，保留本 workspace 的兩個 volume 與 image；再次 `up` 即可使用。沒有執行全域 prune，沒有部署網站、push 或修改 dotfiles。

## 驗證證據

本次 VPS session 的暫存記錄如下；`/tmp` 可能被系統清除，長期結論以本文件為準：

- `/tmp/site-docker-build.log`：最後版本 Dockerfile 建置。
- `/tmp/site-devcontainer-rootless-up.log`：rootless 初始化。
- `/tmp/site-container-validate.log`：容器內完整 validate。
- `/tmp/site-rebuild.log`、`/tmp/site-rebuild-final.log`：重建與 postCreate。
- `/tmp/site-isolation-up.log`、`/tmp/site-hmr-check.log`：第二工作空間與 HTTP／WebSocket。
- `/tmp/site-validation-state.json`：本次 container／volume 識別資料與成果 hash；第二工作空間已回收。
- `/tmp/site-helper-build.log`、`/tmp/site-helper-rebuild.log`、`/tmp/site-helper-up.log`、`/tmp/site-helper-validate.log`：統一操作腳本的追加驗證。

## 未驗證範圍

- Mac／Podman／ARM64 原生流程，以及完整 rootful Docker 流程；不能由 VPS 結果推定。
- VS Code extension／Remote SSH 的環境變數傳遞與實際瀏覽器互動。
- 外部 Webmention API：未設定 `PUBLIC_WEBMENTION_DOMAIN`，原腳本按設計略過 endpoint 檢查。
- 字型來源、uv 與 OG 產圖字型未納入基本 image；相關生成命令依 README 保留既有專用環境。一般 build 使用 repo 已提交的產物。
- 正式部署、其他子站組裝、主機重啟恢復，以及強制取消／控制器 crash 復原。此處是開發環境驗收，尚非先前 sandbox runner 的完整故障試驗。
