---
name: verify-film-brain-publish
description: 驗證 Film Brain 在發布前的 Pages Worker CSP 下可操作，以及部署後主站和鏡像的手機導覽。
---

從主站 repo 根目錄執行。測試需要 Node.js 22.23.4 或以上、鎖檔中的依賴及 Chromium。

1. 執行 `npm ci` 與 `npx playwright install chromium`。無瀏覽器系統依賴的 Linux runner 使用 `npx playwright install --with-deps chromium`。
2. 若驗發布前行為，依 `.github/workflows/deploy.yml` 的 `build` job 建置 Astro 和 Film Brain，組裝 `dist/film-brain/`。確認 `dist/_worker.js` 和 `dist/film-brain/index.html` 都存在。
3. 依 [feature map](features/README.md) 選擇本機 Worker、主站或鏡像。Playwright 會啟停自己在 loopback 上的 Worker。若連接埠已被占用，先確認該程序的歸屬。
4. 保存 Playwright 結果。失敗時 `test-results/` 有 trace 和截圖，CI 將它們收進 run 的 artifacts。保留要追查的證據再重跑。
