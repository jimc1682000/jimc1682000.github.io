# Phase 2+ Backlog（v1 不做，勿忘）

實作時複製到主站 `docs/TODO-phase2.md`。

## 內容與遷移

| ID | 項目 | 說明 |
|----|------|------|
| P2-01 | Blogger 全量匯入 | 若 M6 blocked，延續此處 |
| P2-02 | `migrations/blogger/url-map.json` | 舊 URL ↔ slug |
| P2-03 | 舊圖外鏈 → public 固化 | 可選第二波 |
| P2-04 | 自有 domain → CF | |
| P2-05 | map → 301 redirects | 依賴 P2-02+P2-04 |
| P2-06 | 英文譯文內容 | 架構已留 |
| P2-07 | 譯文自動化 Draft PR | |
| P2-08 | Blogger labels 清洗 | |

## 功能

| ID | 項目 |
|----|------|
| P2-09 | **留言** — 已完成 Fediverse／Bluesky 預設 + Giscus click-to-load |
| P2-10 | **Analytics** — 僅保留 Cloudflare edge／server-side aggregate |
| P2-11 | **搜尋**（Pagefind 等）— v1 不做、要補 |
| P2-12 | Blog 列表分頁 |
| P2-13 | OG 圖自動化 |
| P2-14 | 多語 sitemap / hreflang 強化 |
| P2-15 | EN RSS 有文再宣傳 |

## 託管

| ID | 項目 |
|----|------|
| P2-16 | GH mirror 監控 |
| P2-17 | dispatch 文件化與告警 |
| P2-18 | 自有域下子站 canonical |

## Brand

| ID | 項目 |
|----|------|
| P2-19 | 首頁加厚（Blake 作品卡級） |
| P2-20 | About 頁 |
| P2-21 | DESIGN 細節加深 |
| P2-22 | UI 第 3 語 |

## Agent／工程

| ID | 項目 |
|----|------|
| P2-23 | CF Deploy Preview |
| P2-24 | content-only 規則再收緊 |
| P2-25 | 譯文 stale 偵測 |

## private resume（見 `docs/adr/0001-private-resume-delivery-and-site-privacy.md`）

| ID | 項目 |
|----|------|
| HR-0 | 公開 `/resume/` 降為 L0；完整內容與 PDF 離開公開 dist／公開 git |
| HR-1 | `resume.jimmychen.me` + Email Worker + Access／Worker／D1 grant 與 invite MVP |
| HR-2 | Private R2 + Worker 串流 + per-grant／invite 浮水印 PDF + 下載計數 |
| HR-3 | Privacy Notice、資料保留／刪除、build-time avatar 與 Webmention moderation |
