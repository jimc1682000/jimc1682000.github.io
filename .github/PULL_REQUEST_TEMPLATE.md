<!--
發文 PR 請以 Draft 起頭（草稿階段）；完稿後標成 Ready 才進入自動合併判斷。
只動 content/blog/** 或 public/blog/** 的 Ready PR 會通過 build gate 後自動 squash-merge。
含其他檔案的 PR 不會自動合併，需人工 review。
-->

## 這是什麼

- [ ] 新文章 / 編輯文章（只動 `content/blog/**`、`public/blog/**`）
- [ ] 骨架變更（版型 / token / 路由 / 設定 / workflow）— 需人工 review

## 檢查清單（發文）

- [ ] 檔案在 `content/blog/YYYY/<slug>.md`（英文：`content/blog/en/YYYY/<slug>.md`）
- [ ] frontmatter 齊全：`title` / `pubDate` / `description`（`tags` 選填）
- [ ] slug 同語系唯一（取檔名 basename）
- [ ] 本機 `npm run check` 與 `npm run build` 綠
- [ ] 動到視覺才需：已讀 `DESIGN.md`、只用 token

## 備註
