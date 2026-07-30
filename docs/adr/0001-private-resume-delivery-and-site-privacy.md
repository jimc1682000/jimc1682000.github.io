# ADR-0001：最低成本的私密履歷交付與網站隱私架構

- 狀態：Accepted
- 日期：2026-07-30
- 決策者：Jimmy Chen
- 適用範圍：`jimc1682000.github.io`、private `jimc1682000/resume`、`resume.jimmychen.me`
- 取代：[舊版 hidden-resume 設計](../hidden-resume.md)

## Context

公開履歷方便招募者閱讀，但完整履歷一旦出現在公開 HTML、Git history 或永久 PDF URL，便無法逐人撤銷，也無法知道下載情形。另一方面，要求收到主動 invite link 的招募者再做 OTP，會增加不必要的摩擦。

本架構需要同時滿足以下條件：

1. 公開網站維持純靜態、低成本與低維運負擔。
2. 完整履歷不進公開 repository 或公開 build artifact。
3. HR 主動來信時驗證該信箱的控制權；本人主動提供的 invite link 則直接可用。
4. 每份可下載 PDF 有期限、可撤銷、可追蹤下載次數並具備溯源浮水印。
5. 個人資料蒐集最小化，網站預設不載入第三方留言與分析程式。
6. 第一版不架設常駐 server，也不依賴 OpenClaw VPS。

這是 `Zero Trust-inspired` 的資源保護設計，不宣稱為完整企業 Zero Trust Architecture。它沒有 device posture、受管裝置、browser isolation 或 phishing-resistant MFA，也無法阻止收件者截圖、OCR 或轉傳已下載的 PDF。

## Decision

### 1. 系統邊界與元件

採 Cloudflare-native serverless 架構，不新增常駐 server：

```text
Public visitor
  └─ jimmychen.me/resume/
       └─ L0 公開摘要 + mailto 入口

Inbound email
  └─ Cloudflare Email Routing / Email Worker
       ├─ DMARC 與 rate-limit 判斷
       ├─ 寫入 D1 的 request / grant / invite 狀態
       ├─ 觸發 private GitHub Actions
       └─ 即時回覆 pending link 或寄回 invite link

Private GitHub Actions（jimc1682000/resume）
  ├─ 取得 private 履歷 source
  ├─ 產生指定 variant / locale 的 PDF
  ├─ 加入 per-grant / per-invite 浮水印
  └─ 以簽章 callback 交回 Worker

resume.jimmychen.me
  ├─ /g/<token>    HR grant；Cloudflare Access Email OTP
  ├─ /i/<token>    主動 invite；bearer token，不做 OTP
  └─ Worker
       ├─ D1       授權、狀態與下載事件
       └─ private R2  浮水印 PDF
```

責任分界如下：

| 元件 | 責任 | 不負責 |
|------|------|--------|
| 公開 site repo | L0 摘要、mailto 入口、Privacy Notice、留言 UI | 完整履歷 source、PDF、grant secret |
| private `resume` repo | 四種履歷 source、PDF 產製、Worker／Email Worker、D1／R2／Access IaC | 公開網站文章內容 |
| Cloudflare Access | `/g/*` 的信箱 OTP 與 24 小時絕對 session | invite 驗證、resource authorization |
| Worker | token 驗證、授權、狀態、下載串流、callback 驗證 | 長期保存原始來信 |
| D1 | 最小必要 metadata 與下載事件 | 原始 email body、完整 IP、User-Agent |
| R2 | 私有浮水印 PDF | 公開物件 URL |
| GitHub Actions | 隔離建置與基本品質檢查 | 長期保存 PDF artifact |

公開摘要固定在 `https://jimmychen.me/resume/`，受保護入口固定使用 `https://resume.jimmychen.me/`。第一版受保護入口只提供 PDF，不另呈現完整 HTML 履歷。

### 2. HR 主動來信流程

公開頁面上的履歷按鈕以 `mailto:` 開啟使用者的郵件程式。只有對方實際寄出信件，才算進入 HR 來信流程。

收件地址使用 plus addressing：

```text
resume+<variant>-<locale>@jimmychen.me
```

流程如下：

1. Email Worker 只在 `DMARC=pass` 時接受自動處理。
2. 解析收件地址決定 `variant` 與 `locale`，不解析或保存信件正文中的姓名、公司、職缺或用途。
3. 原始信件只轉寄至 owner mailbox，不寫入 D1 或 R2。
4. 建立 email-bound grant，觸發 private GitHub Actions，並立即以原 thread 回覆 pending link。
5. HR 開啟 `/g/<token>` 後，由 Access 對相同信箱執行 Email OTP；Worker 仍會再次檢查 grant 狀態。
6. pending 頁每 5 秒查詢狀態，最多自動查詢 10 分鐘；之後停止並顯示「重新檢查」。
7. PDF 完成後，同一頁自動顯示下載按鈕，不再寄第二封 HR 通知信。

HR grant 的絕對有效期為建立後 30 天。Cloudflare Access session 設為 24 小時**絕對期限**；Access 沒有 inactivity timeout，因此不得在 UI 或文件中稱為「閒置 1 天後失效」。若 account-level session 設定會影響其他 Access applications，上線前必須先盤點影響。

DMARC 未通過時：

- 不建立 grant。
- 不轉寄原信。
- 不通知 owner。
- 回覆通用 SMTP reject：`550 5.7.1 Message not eligible for automated processing`。

此流程只證明寄件者能控制該信箱，不證明其姓名、公司、職稱或 HR 身分。任何 DMARC 通過的信箱皆可申請，不強制公司網域。

防濫用規則：

- 同一正規化 email 每 24 小時最多觸發 1 次。
- 全站每天最多接受 10 個新 email requests。
- 過濾常見 autoresponder／bounce，避免 mail loop。
- 超過限制時不觸發建置。

### 3. 主動 invite 流程

Owner 寄信至：

```text
invite-link+<variant>-<locale>@jimmychen.me
```

第一行可選填公司／職缺標籤。第一版只允許完全相符的 `jimc1682000@gmail.com`，不接受 Gmail `+tag` 變體；寄件者也必須 `DMARC=pass`。

Email Worker 建立 7 天 bearer invite，將完整 URL 回寄 owner。收到該 URL 的外部使用者直接進入 `/i/<token>`，不再做 OTP，因為這是 owner 主動發出的 capability link。

Invite 行為：

- 7 天絕對到期。
- 記錄下載次數，但不設硬性下載上限。
- 公司／職缺標籤為 optional，只用於 owner 管理與浮水印，不聲稱已驗證收件者身分。
- 可在到期前撤銷。
- D1 只保存 token hash，不保存 bearer token 原文或完整 URL。

Owner 可透過 email 命令管理：

| 命令 | 行為 |
|------|------|
| `LIST` | 列出有效項目與基本狀態，不回傳 bearer URL |
| `STATUS <id>` | 查 variant、locale、狀態、到期時間、下載數、最後下載時間與遮罩 email |
| `REVOKE <invite-id>` | 撤銷 invite；成功信提供預填回覆格式 |

不提供 `RESEND`。完整 URL 遺失時，撤銷原 invite 並建立新 invite。

### 4. 變體與語系

UI 與內部識別字統一為：

- `ai`
- `sre`
- `platform`
- `detailed`

支援 `zh` 與 `en`。無效或缺少 variant 時固定 fallback 為 `detailed`；無效或缺少 locale 時固定 fallback 為 `en`。不得依 `Accept-Language` 或其他推測改寫 fallback。

### 5. Resource authorization 與下載

身分驗證與資源授權分離：

- `/g/*`：Access 證明信箱控制權，Worker 再依 grant、期限、狀態與 document ID 授權。
- `/i/*`：bearer token 是 capability，Worker 驗證 token hash、期限與狀態。
- grant 與 invite 使用分開的下載 API／middleware，避免把 Access JWT 與 bearer token 的安全假設混在同一條路徑。

R2 bucket 永遠 private。Worker 授權後直接 stream PDF，不產生 presigned URL，也不把 R2 object URL 暴露給 browser。

下載計數定義為：通過授權的 `POST` 開始回傳 PDF response 時增加一次。回應開始後，即使 browser 中斷或只收到部分內容，仍計為一次下載。

每個 grant／invite 只產生一份 PDF，後續下載重用該物件。第一次下載成功開始時通知 owner；後續下載只記錄，不逐次通知。通知失敗不得阻擋下載：標記 `notification_pending`，約 5 分鐘、1 小時、24 小時重試，仍失敗則標記 `notification_failed`，並可由 `STATUS` 查詢。

### 6. 浮水印

每頁頁尾加入 7.5～8 pt、中性灰色、可讀但不干擾正文的浮水印：

- HR grant：遮罩後的已驗證 email、document ID、產製日期。
- Invite：optional 公司／職缺標籤、document ID、產製日期。

浮水印的法律與安全定位是「建立合理的溯源與嚇阻證據」，不是 DRM，也沒有單一字級、位置或文字即可保證法律效力。Document ID 必須能在保留期內對應到系統紀錄；invite 標籤不代表系統驗證了公司或收件者身分。

### 7. PDF 產製與 GitHub Actions

Private `resume` repo 的 workflow 接收 request ID、variant、locale 與 opaque callback context，不接收 bearer token。成功後以 HMAC-signed callback 回報 Worker；簽章包含 timestamp 與 nonce，Worker 驗證時效並拒絕 nonce replay。

執行政策：

- 使用 GitHub-hosted `ubuntu` runner。
- 不上傳含履歷的 GitHub Actions artifact。
- 單一 concurrency queue，`cancel-in-progress: false`，依序產製。
- 一次 job 一般約 60～90 秒；離群情況約 2～3 分鐘，排隊時間另計。
- timeout、GitHub 或 Cloudflare 暫時性錯誤自動重試 1 次；內容驗證或 PDF 產製錯誤不重試。
- 最終失敗只通知 owner；外部頁面只顯示通用錯誤，不揭露 build log。
- 設定付費用量 hard stop；達到 included quota 後不允許自動產生付費 Actions usage。

Email Worker 以 fine-grained PAT 呼叫 `workflow_dispatch`。PAT 只允許 private `resume` repo，repository permission 只給 `Actions: write`，並存為 Cloudflare Worker secret。這是第一版的最低複雜度選擇；GitHub App 與短效 installation token 留待後續評估。

部署政策：

- 合併到 `main` 後，測試與安全檢查通過即自動部署 Worker／Email Worker。
- D1 schema migration、R2／Access／DNS／Email Routing 與其他 IaC 變更必須手動批准。
- rollback 由 owner 手動重跑指定 Git commit。
- local development 使用 `wrangler dev`；第一版不維護持久 staging environment。

### 8. 資料最小化與保留

| 資料 | 保留政策 |
|------|----------|
| 原始 HR email body | 不落 D1／R2；DMARC pass 時只轉寄 owner mailbox |
| bearer token | 永不保存原文，只保存 hash |
| token hash | grant／invite 到期或撤銷時立即刪除 |
| 浮水印 PDF | grant 30 天到期時刪除；invite 7 天到期或撤銷時刪除 |
| grant／invite metadata | 到期或撤銷後再保留 365 天，之後刪除或匿名化 |
| 個別下載事件 | 365 天，之後移除可識別連結，只保留匿名 aggregate |
| IP／User-Agent | 不自行保存；不建立 salted IP hash |
| Cloudflare raw logs | 不啟用 Logpush 或另建 raw request database |

資料刪除要求可提前移除可識別資料；若存在進行中的濫用調查、安全事件或法律請求，只限制保留處理該事件所必要的資料。

新增 `privacy@jimmychen.me`，轉寄至既有 owner mailbox。第一版人工處理 privacy request，不做 self-service portal。要求存取或刪除 grant 資料時，以既有 Email OTP 驗證信箱控制權，不要求身分證件；原則上於一個月內回覆。

### 9. Site-wide Privacy Notice 與 Cookie

公開網站採 site-wide、layered Privacy Notice，至少說明：

- controller／聯絡方式。
- 蒐集資料、目的、處理方式與保留期。
- Cloudflare、GitHub、OpenAI 與使用者主動載入的 Giscus 等 processors／第三方服務。
- Webmention 公開回覆、avatar 本地化與 moderation 流程。
- privacy request 管道與合理驗證方式。
- 這是參考 GDPR 原則的個人網站政策，不宣稱已取得「GDPR certified」或保證適用所有司法管轄區。

第一版不顯示 Cookie banner。公開頁面載入時不設定非必要 cookie、不載入 client-side analytics，也不主動連線 Giscus／GitHub。Access 在 `resume.jimmychen.me` 使用的 authentication cookie 屬提供受保護功能所必要，應在 Privacy Notice 說明。

分析資料只使用 Cloudflare edge／server-side aggregate。接受不具備完整 client-side RUM、跨頁 session journey、browser feature 與精細互動事件等資料，以換取較低的隱私負擔。

### 10. IndieWeb、留言與第三方載入

文章留言區採 tab UI：

1. 預設顯示 `Fediverse／Bluesky`。
2. 有 article-specific bridged URL 時直接提供；尚未取得時，提供 bridged profile／搜尋指引，下一次 build 再補齊。
3. 使用者點擊 `GitHub` tab 時才載入 Giscus；點擊本身視為 informed activation，不再多放一次確認按鈕。
4. 第一版不記住 tab 選擇，因此不為此設定 cookie 或 local storage。

不採 Disqus。既有 IndieWeb microformats2、Bridgy Fed 與 Webmention 標記必須保留。

Webmention 只顯示 `in-reply-to`；一般 `mention-of` 第一版不顯示。留言畫面最多呈現前 200 個 Unicode characters，超過時加省略符號與 source link；moderation 仍檢查完整文字。

### 11. Webmention avatar 與 moderation

不讓 visitor browser 直接請求任意 `author.photo` 主機。Build-time localization 流程：

1. 只接受 HTTPS。
2. DNS resolution 與所有 redirect 均拒絕 private／reserved address，防止 SSRF。
3. 驗證 MIME type、檔案大小與 pixel dimensions。
4. 拒絕 SVG。
5. 解碼後重新輸出為靜態 WebP，移除 metadata；失敗則使用 initials fallback。

Webmention moderation 使用兩層：

- 決定性結構檢查：verified、`in-reply-to`、HTTP(S)、plain text、raw-length bound、de-duplication，以及 repo-local 單一 `allow`／`deny` 設定檔。
- OpenAI `omni-moderation-latest`：只送出 reply text，不傳 avatar、姓名、email、IP 或其他 visitor metadata。

`deny` precedence 高於 `allow`。被判定有問題時，只隱藏該單則留言；其他內容與 build 繼續。OpenAI Moderation API 無法使用時採 fail-open，留言仍可發布，並在 Actions summary 記錄 moderation unavailable。

Actions summary 只記 `wm-id`、source URL 與 moderation category，不記完整留言文字。Owner 以 `wm-id` 管理 allow／deny override，不建立 moderation database。

同步策略：每 6 小時用新 ID gate 判斷是否需要 build，另每天無條件 full build，以收斂 `since_id` 看不到的編輯與刪除；目標是在 24 小時內反映來源刪除或更新。

### 12. 靜態部署的舊版本

Cloudflare Pages 的舊 deployment URL 在刪除前仍可公開存取，因此每次新的 production deployment 成功後，刪除同一專案的所有舊 deployments，只保留剛成功的 production deployment。Rollback 不依賴保留舊 deployment，而是重新部署指定 Git commit。

這項自動刪除只可在新 production 已驗證成功後執行；實作 workflow 前仍須依 destructive-action 規則確認精確 Cloudflare project 與排除目前 deployment。

GitHub Pages mirror 不提供公開可用的 per-deployment preview URL。`actions/upload-pages-artifact` 明確設定 `retention-days: 1`，避免依賴 action 預設；網站只呈現目前 deployment。

## Security properties

本決策提供：

- 公開 URL 與完整履歷分離。
- HR grant 綁定已驗證 email；轉寄 grant URL 不足以通過 Access OTP。
- 主動 invite 是短效、可撤銷的 capability，而不是身分驗證。
- 每次下載均由 Worker 即時授權，R2 永不公開。
- 每筆 grant／invite 有獨立 document ID、期限與下載事件。
- token database 外洩時不直接暴露 bearer token。
- 過期與撤銷可停止未來下載，但無法收回已下載的 PDF。

## Cost decision

目標是第一版維持零增量月費，但不把免費額度當成永久承諾：

- 公開站使用既有靜態 hosting。
- Worker、D1、R2、Access 與 Email Routing 優先使用當期 free allowance。
- HR 即時回覆使用 Email Worker `message.reply()`；owner 通知只寄 verified destination，第一版不導入額外 SMTP provider。
- PDF build 使用 private GitHub Actions 的 included minutes，並以 hard stop 防止自動產生付費用量。
- 不使用 OpenClaw VPS、常駐 application server、Disqus、client-side analytics 或 Logpush。

超出供應商免費額度、產品定價變更或要對任意地址主動寄送第二封信時，必須重新做成本決策。

## Consequences

### Positive

- 不需要維護常駐 server，系統故障面與固定成本較低。
- HR 來信與 owner invite 分成兩種符合情境的信任模型，避免不必要 OTP。
- PDF 不經公開 artifact 或永久 URL，且可查詢下載狀態。
- 資料保留、第三方載入與留言 moderation 有明確邊界。
- Git commit 是部署與 rollback 的可重現真相源。

### Negative

- Email OTP 只證明信箱控制權，不能證明真實 HR 身分。
- Invite link 被轉寄時，持有者可在 7 天內下載；浮水印只提供溯源與嚇阻。
- 單一 GitHub Actions queue 在同時有多筆 request 時會增加等待時間。
- Build-time Webmention 與 avatar 會有最長約 24 小時的更新／刪除延遲。
- OpenAI moderation fail-open 代表服務中斷時可能短暫發布不當留言。
- 清除舊 Cloudflare deployments 後，rollback 需要重新 build／deploy。
- 多個 serverless provider 與 callback 仍需要 secrets rotation、監控與故障排查。

## Rejected alternatives

| 選項 | 不採用原因 |
|------|------------|
| OpenClaw VPS／自建 server | 增加 patching、availability 與 secret 管理，不符合最低成本 v1 |
| 所有 invite 都要求 OTP | owner 已主動交付 capability，額外 OTP 摩擦大於收益 |
| 所有連結都不驗證身分 | HR 來信流程會退化成可任意轉寄的 bearer link |
| 公開／presigned R2 URL | browser 可繞過 Worker，難以一致計數與撤銷 |
| 人工批准每封 HR request | 延遲回覆且不符合自動化目標 |
| 每次完成後再寄 HR 通知 | 引入任意收件地址的 outbound email 成本與退信處理 |
| GitHub App | short-lived token 較佳，但第一版的 App 與簽章邏輯成本過高 |
| 平行 PDF builds | 低流量下收益有限，增加 race condition 與 Actions usage |
| Runtime avatar proxy | 每次請求都需 SSRF、cache 與內容安全處理，複雜度高 |
| Disqus／預載 Giscus | 增加初始第三方連線、追蹤與 consent 負擔 |
| 保存完整 IP／User-Agent | 不符合個人網站的必要性與資料最小化 |
| 完整企業 Zero Trust 宣稱 | 缺少 device trust、managed endpoint 與持續風險評分 |

## Implementation defaults

以下是可在不改變 ADR 核心信任模型下調整的實作預設；修改時應留下設定與測試，不必逐項新增 ADR：

- pending polling interval：5 秒。
- pending automatic polling window：10 分鐘。
- temporary build retry：1 次。
- owner notification retry：約 5 分鐘、1 小時、24 小時。
- watermark size：7.5～8 pt。
- displayed Webmention length：200 Unicode characters。
- Webmention incremental check：每 6 小時；full build：每日。

以下變更會改變信任模型、成本或資料處理，必須更新本 ADR 或新增 ADR：

- invite 改為強制 OTP 或永久 bearer link。
- R2 改成 public／presigned direct download。
- 新增 client-side analytics、預載第三方留言或跨站 tracking。
- 延長 token／可識別事件保留期。
- 將完整履歷或 PDF 放回 public repo／artifact／site build。
- 改由常駐 VPS 或其他 application server 承載核心流程。

## Rollout order

1. 在 private `resume` repo 建立 PDF build、Worker、D1／R2 schema 與 local `wrangler dev` 測試。
2. 手動建立 Cloudflare infrastructure，驗證 `/g/*` 與 `/i/*` 的隔離。
3. 串接 Email Worker、DMARC／rate limit 與 GitHub `workflow_dispatch`。
4. 更新公開 `/resume/` mailto 入口、Privacy Notice 與留言 lazy-loading。
5. 驗證資料刪除、grant／invite revoke、下載計數、舊 deployment cleanup 與 rollback。

## Verification criteria

- 未通過 OTP 的 HR grant 無法下載；把 `/g/*` URL 轉寄給其他信箱也無法下載。
- 有效 `/i/*` bearer invite 不要求 OTP，到期或撤銷後立即拒絕。
- D1／log／Actions artifact 均找不到 bearer token 原文與完整履歷 PDF。
- 每次成功開始回傳 PDF 恰好增加一次下載次數。
- grant／invite 到期後 token hash 與 R2 PDF 被刪除，metadata 依保留政策處理。
- DMARC fail 不轉寄、不通知、不建置，只回 generic SMTP reject。
- 公開文章載入時不連線 Giscus／GitHub；點 GitHub tab 後才載入。
- browser 不直接向 Webmention `author.photo` host 請求圖片。
- Webmention override 的 `deny` 高於 `allow`，單則隱藏不影響其他留言或 build。
- 新 production 上線後，舊 Cloudflare Pages deployment URL 不再可用。

## References

- [NIST SP 800-207：Zero Trust Architecture](https://csrc.nist.gov/pubs/sp/800/207/final)
- [Cloudflare Access session management](https://developers.cloudflare.com/cloudflare-one/access-controls/access-settings/session-management/)
- [Cloudflare Email Worker handler API](https://developers.cloudflare.com/email-service/api/route-emails/email-handler/)
- [Cloudflare Email Service pricing](https://developers.cloudflare.com/email-service/platform/pricing/)
- [Cloudflare Pages preview deployments](https://developers.cloudflare.com/pages/configuration/preview-deployments/)
- [Cloudflare Pages deployment delete API](https://developers.cloudflare.com/api/resources/pages/subresources/projects/subresources/deployments/methods/delete/)
- [GitHub Actions workflow dispatch API](https://docs.github.com/en/rest/actions/workflows#create-a-workflow-dispatch-event)
- [GitHub Pages artifact action](https://github.com/actions/upload-pages-artifact)
- [OpenAI omni-moderation-latest](https://developers.openai.com/api/docs/models/omni-moderation-latest)
- [OpenAI API data controls by endpoint](https://platform.openai.com/docs/models/default-usage-policies-by-endpoint)
- [W3C Webmention Recommendation](https://www.w3.org/TR/webmention/)
- [GDPR consolidated text](https://eur-lex.europa.eu/eli/reg/2016/679/oj)
