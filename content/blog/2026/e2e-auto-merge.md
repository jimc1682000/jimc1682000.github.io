---
title: E2E 測試：自動發文管線
pubDate: 2026-07-24
description: 驗證 Draft PR → Ready → content-only 自動合併 → 部署到站上的端到端流程。
tags:
  - meta
  - ci
---

## 這篇是什麼

這是 agent 發文管線的端到端測試文，用來驗證整條流程可運作：

1. 以 **Draft PR** 起頭（草稿階段不會自動合併）。
2. 標成 **Ready**，且只動 `content/blog/**`。
3. `auto-merge` workflow 跑 `astro build` gate，綠後 squash-merge。
4. 合併後觸發部署，文章出現在 CF canonical 與 GH mirror。

驗證完成後這篇可保留或刪除。
