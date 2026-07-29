# hidden-resume — Zero Trust–inspired 履歷分享設計

> **定位**：identity-aware、least-privilege、可撤銷的履歷 portal。  
> **不是**：完整企業級 Zero Trust Architecture（不做 device posture、browser isolation、UEBA）。  
> **一句話**：不信任連結持有者；每次請求依「身分 × 資源 × 動作 × 期限」授權；原始履歷永不公開。

本文件把先前討論收斂成可落地規格，並對齊現況：

| 現況 | 問題 |
|------|------|
| `jimc1682000/resume` 完整 HTML／PDF 公開組裝進 `jimmychen.me/resume/` | 連結外洩＝永久可讀；無法撤銷、無法分人、無稽核 |
| 名片刻意不放電話／真 Gmail／公司名 | 但 `/resume/` 仍放完整年月、公司、量化成果、私人 Email |
| 主站已在 Cloudflare Pages | 受保護區應盡量沿用同一託管面，降低第二套 ops 負擔 |

---

## 1. 目標與非目標

### 1.1 目標

1. **預設拒絕**：未授權者無法瀏覽完整履歷或下載 PDF。
2. **身分中心**：授權綁定特定 Email（證明能控制該信箱／企業 IdP 帳號），不是共用密碼或永久連結。
3. **資源級最小權限**：HTML 瀏覽、聯絡資訊、PDF 下載、面試附錄分資源授權。
4. **有期限、可單獨撤銷**：每位收件者獨立 grant；撤銷 A 不影響 B。
5. **可稽核**：Allow／Deny／下載／撤銷有 event log。
6. **漸進揭露**：公開只放低敏感；完整內容與附錄分層。
7. **可維護**：個人規模、低流量、一個人能養；優先 free／既有 Cloudflare 面。

### 1.2 非目標（明確接受）

| 不做 | 理由 |
|------|------|
| Device trust／MDM／EDR | 外部招募者裝置不可管 |
| Browser isolation／VDI | 成本與 UX 不划算，且擋不了拍照 |
| Phishing-resistant MFA（對招募者） | 風險不值得要求陌生人註冊 Passkey |
| 禁止截圖／複製的 DRM | 技術上做不到；只做抑止與溯源 |
| 自動驗證「真的是某公司員工」 | 改人工核准 |
| 完整 SIEM／UEBA | 第一版只做規則型異常與一鍵撤銷 |
| 宣稱「完整 Zero Trust Architecture」 | 只宣稱 ZT-inspired resource portal |

### 1.3 威脅模型

**要擋的**

- 公開連結被轉寄、搜尋引擎索引、Wayback 抓取
- 共用密碼外流後無法分人撤銷
- 永久 PDF URL 長期外洩
- 未授權者探測管理介面或下載 API
- 授權過期後仍可存取

**擋不了、只降低意願／可溯源的**

- 螢幕截圖、手機拍攝、OCR、手動抄錄
- 已下載 PDF 的二次轉傳（靠具名浮水印溯源，非法防）

**成功判準**

> 每一次對特定履歷資源的請求，是否由明確政策根據即時身分、資源、動作與期限做決策，並由不可繞過的執行點強制落實，且能稽核與撤銷？

---

## 2. Zero Trust 原則 → 本系統對應

以 NIST 精神對照本 portal 的**實際落點**（不是口號）：

| 原則 | 本系統做法 | 刻意缺口 |
|------|------------|----------|
| 一切皆資源 | `public-profile`、`resume:full:view`、`resume:contact:view`、`resume:pdf:download`、`resume:appendix:view`、`admin:*` 分資源 | 不做更細到段落的 ABAC |
| 不因網路位置信任 | 無 VPN／內網捷徑；URL 本身不含權限 | 無 device posture |
| 每工作階段個別授權 | IdP session 短效；**每個 request** 仍查 grant | 非每頁重登 |
| 動態政策 | grant 的 subject／resource／action／expires／status | 無即時 risk score |
| 持續監控 | access_events + 簡單異常規則 + 一鍵撤銷 | 無 EDR 聯動 |
| 嚴格驗證與授權 | 身分（OIDC／magic link）≠ 授權（grant DB） | 招募者不用 Passkey |
| 遙測改善政策 | 記錄 decision／reason；IP 只存 salted hash | 無完整 SIEM |

**正確名稱**：`Zero Trust-inspired, identity-aware, least-privilege resume portal`。

---

## 3. 內容分級（Progressive Disclosure）

### 3.1 四層

| 層級 | 誰看得到 | 內容 |
|------|----------|------|
| **L0 Public Profile** | 任何人 | 姓名／英文名、職稱定位、技能摘要、匿名化成果、GitHub／LinkedIn、申請表 |
| **L1 Verified Resume** | 有效 grant + 已驗證身分 | 完整經歷、年月、公司、技術成果、專案說明、教育 |
| **L2 Downloadable PDF** | L1 且 `action=download` | 具名浮水印 PDF；短效 signed URL |
| **L3 Sensitive Appendix** | 另開 grant（面試後） | 架構細節、成本數字原文、事故案例、推薦人 |

### 3.2 公開面（L0）**禁止**出現

- 私人 Email、手機
- 完整在職年月與可串起職涯時間線的細節（可保留「N 年經驗」）
- 可推測現職弱點的基礎設施細節
- 未脱敏的內部系統名／客戶名（若有）
- 任何 PDF 直連

### 3.3 與現有 `/resume/` 的關係（硬決策）

**現況完整公開履歷必須下架或改寫成 L0。** 否則 hidden-resume 形同虛設。

| 路徑 | 角色 |
|------|------|
| `https://jimmychen.me/resume/` | **只留 L0**（公開精簡 profile +「申請完整履歷」） |
| `https://cv.jimmychen.me/` | **L1–L3** 受保護 portal（本設計主體） |
| `jimc1682000/resume` repo | 改為「內容源」：L0 公開頁 + 私密完整變體（private branch／private content path，見 §8） |

鏡像站 `mirror.jimmychen.me` **不得**再 serve 完整履歷；組裝管線要停止把 L1 產物 copy 進公開 dist。

---

## 4. 使用者流程

### 4.1 對方主動申請

```
公開 L0（/resume/ 或首頁入口）
  → 填申請表（name / company / work email / LinkedIn / purpose）
  → status=pending（不授權）
  → 通知你（Email）
  → 你人工核准或拒絕
  → 核准：建立 grant（預設 7–14 天，resource=resume:full，action=view）
  → 寄出邀請信：請至 cv.jimmychen.me 以該 Email 登入
  → 對方 OIDC 或 magic link
  → PEP 驗證身分 → app 查 grant → 顯示具名浮水印 HTML
```

### 4.2 你主動投遞

```
管理介面直接建立 grant（email + 期限 + 資源）
  → 寄出同一組入口 URL（無共用密碼）
  → 對方必須控制該 Email 才能進
```

### 4.3 下載 PDF

```
已通過 L1
  → 若 grant 含 action=download
  → POST /api/pdf-token（server 再 authorize 一次）
  → 即時產生收件者專屬浮水印 PDF（或取預先 per-grant 產物）
  → 回傳 R2/S3 **15 分鐘** signed URL（每次重新簽）
  → bucket 保持 private；不存在永久 /pdf/*.pdf 公開路徑
```

### 4.4 撤銷／到期

```
status=revoked 或 now >= expires_at
  → 後續任何 request Deny
  → 既有 IdP session 下次打到 PEP/app 即失效（app 為最終裁決）
  → 已下載的 PDF 無法遠端刪除（接受）；浮水印可溯源
```

---

## 5. 架構

### 5.1 推薦拓撲（Cloudflare-native，低 ops）

沿用既有 Pages／zone，避免為履歷再養一組 Docker host。

```
Internet
   │
   ├─ jimmychen.me              Cloudflare Pages（主站 + L0 /resume/）
   │
   └─ cv.jimmychen.me           Cloudflare Access（PEP：身分閘）
           │
           ▼
        Pages / Worker（resume-app：PE 的 grant 裁決 + 內容）
           │
           ├─ D1          access_requests / access_grants / access_events
           ├─ R2          私有 PDF 物件
           └─ 通知        Email（Resend / CF Email Routing + Worker）或 Telegram
```

| 角色 | 元件 | 說明 |
|------|------|------|
| 公開站 | 既有 Astro Pages | L0、申請表可在主站或 cv 未登入頁 |
| PEP（閘） | Cloudflare Access | 預設拒絕；僅 allowlist／IdP 群組；短 session |
| 身分 | Access：Google／Microsoft OIDC + One-time PIN（Email） | 對招募者夠用；不強迫 Passkey |
| PE／授權 | Worker 內 `authorize()` + D1 grants | **真正的 least privilege 在這裡**，不交給 Access  alone |
| 內容 | 受保護靜態 HTML 或 SSR／Worker 組出 | 每頁帶浮水印 |
| PDF | R2 private + 短效 signed URL | 無公開 PDF |
| 管理 | `/admin` 同域，Access 僅允許你的 Email + Passkey／硬金鑰（若 Access 支援）或 TOTP | 與招募者政策分離 |
| 稽核 | D1 `access_events` + Access logs | 見 §7 |

**為什麼 Access  alone 不夠、但 Access + app grant 夠當 MVP**

- Access 只回答：「這個 session 的身分是誰、過沒過入口」。
- App grant 回答：「這個身分現在能不能對 `resume:pdf:download` 做事、是否過期、是否被撤銷」。
- 兩者缺一：只有 Access → 所有進得去的人看到同一整包；只有 app 密碼牆 → 易變成共用 secret。

### 5.2 備選拓撲（全開源 self-hosted，作品展示向）

若要以作品展示 identity-aware proxy 全鏈：

```
Caddy
  ├─ resume.jimmychen.me → L0 static
  ├─ cv.jimmychen.me     → Pomerium → resume-app
  └─ auth.jimmychen.me   → Authentik (+ Postgres + Redis)
```

| 職責 | 元件 |
|------|------|
| IdP | Authentik（Google／MS OIDC + magic link；你自己的 admin 用 WebAuthn） |
| PEP | Pomerium |
| App | 自建 resume-app（grant 裁決與浮水印） |
| DB | Postgres |
| PDF | 本機 private volume 或 MinIO |

**第一版不建議同時做兩套。** 預設走 §5.1；若之後要脫離 CF 或當 portfolio lab，再遷 §5.2，app 的 grant 模型保持不變。

### 5.3 明確不做的元件（v1）

OPA、Istio、SPIFFE／SPIRE、Browser isolation、EDR、完整 Loki／Grafana 全家桶、MinIO（R2 已夠）。

---

## 6. 授權模型

### 6.1 資料表

```sql
-- 申請（未授權）
CREATE TABLE access_requests (
  id            TEXT PRIMARY KEY,          -- uuid
  email         TEXT NOT NULL,
  name          TEXT,
  company       TEXT,
  linkedin_url  TEXT,
  purpose       TEXT,
  status        TEXT NOT NULL,            -- pending | approved | rejected
  created_at    TEXT NOT NULL,            -- ISO-8601
  decided_at    TEXT,
  decided_by    TEXT
);

-- 授權（可多筆：同一人可有 view 與 download 不同到期）
CREATE TABLE access_grants (
  id              TEXT PRIMARY KEY,
  subject_email   TEXT NOT NULL,
  resource        TEXT NOT NULL,          -- resume:full | resume:contact | resume:pdf | resume:appendix
  action          TEXT NOT NULL,          -- view | download | admin
  starts_at       TEXT NOT NULL,
  expires_at      TEXT NOT NULL,
  status          TEXT NOT NULL,          -- active | suspended | revoked | expired
  watermark_id    TEXT NOT NULL,          -- 如 CV-7F3A92
  variant         TEXT,                   -- ai | sre | platform | detail
  locale          TEXT,                   -- zh | en
  note            TEXT,                   -- 內部備註（公司名等）
  created_at      TEXT NOT NULL
);

CREATE INDEX idx_grants_subject ON access_grants(subject_email);
CREATE INDEX idx_grants_status  ON access_grants(status);

-- 稽核（IP 只存 salted hash）
CREATE TABLE access_events (
  id             TEXT PRIMARY KEY,
  subject_email  TEXT,
  resource       TEXT NOT NULL,
  action         TEXT NOT NULL,
  decision       TEXT NOT NULL,           -- allow | deny
  reason         TEXT,                    -- expired | revoked | no_grant | ok | rate_limited
  ip_hash        TEXT,
  user_agent     TEXT,
  created_at     TEXT NOT NULL
);
```

### 6.2 授權函式（每個受保護 request 必經）

```ts
function authorize(input: {
  email: string;
  resource: string;
  action: string;
  now: Date;
}): { allow: boolean; grant?: Grant; reason: string } {
  const grant = findActiveGrant(input.email, input.resource, input.action);
  if (!grant) return { allow: false, reason: 'no_grant' };
  if (grant.status === 'revoked') return { allow: false, reason: 'revoked' };
  if (grant.status === 'suspended') return { allow: false, reason: 'suspended' };
  if (input.now < new Date(grant.starts_at)) return { allow: false, reason: 'not_started' };
  if (input.now >= new Date(grant.expires_at)) return { allow: false, reason: 'expired' };
  return { allow: true, grant, reason: 'ok' };
}
```

Access／Pomerium 過了只代表「有身分」；**沒過 `authorize()` 一律 403**。

### 6.3 資源對 endpoint

| Endpoint | resource | action |
|----------|----------|--------|
| `GET /`（完整履歷 HTML） | `resume:full` | `view` |
| `GET /contact-block` | `resume:contact` | `view` |
| `POST /api/pdf-token` | `resume:pdf` | `download` |
| `GET /appendix` | `resume:appendix` | `view` |
| `GET/POST /admin/*` | `admin` | `admin` |

預設核准只給 `resume:full` + `view`。PDF 與 appendix 需你另開或勾選。

### 6.4 預設政策值

| 項目 | 預設 |
|------|------|
| grant 期限 | 14 天 |
| Access session | ≤ 24h（可更短） |
| PDF signed URL | 15 分鐘 |
| 同一 grant PDF 簽發 | 軟上限 5 次／天（超限 suspended + 通知你） |
| 並發合理範圍 | 不強制單 session；異常多 IP 再 suspended |

---

## 7. 身分與政策分層

### 7.1 招募者（外部）

優先序：

1. **Google / Microsoft OIDC**（公司 Workspace／M365 時體驗最好）
2. **Email one-time PIN / magic link**（相容性最高）

不要求 Passkey。身分保證強度 =「能收該信箱的信／能登該企業帳號」，與履歷敏感度匹配。

### 7.2 你自己（admin）

- 僅你的 Email 可進 `/admin`
- 盡量 phishing-resistant（Access 硬金鑰／TOTP；self-hosted 則 Authentik WebAuthn）
- 短 session；管理操作全寫 audit

### 7.3 Access 政策（示意）

```yaml
# 概念示意，非 CF 匯出格式
app: cv.jimmychen.me
session_duration: 24h
policies:
  - name: admin
    include:
      - email: you@jimmychen.me   # 或你的主登入 Email
    paths: ["/admin", "/admin/*"]
    # 另要求較強 MFA（若方案支援）
  - name: grantees
    include:
      - email_list: managed-by-api   # 核准時寫入；或 Access Group 同步
    paths: ["/", "/api/*"]
  - name: default
    decision: deny
```

**重點**：Access allowlist 與 D1 grant **雙寫或以 grant 為源同步**。  
實務建議：**D1 grant 為真相源**；核准／撤銷時 Worker 呼叫 Access API 增刪 identity，或改為「Access 只驗證『有登入』、授權全交 app」（較簡，但未登入者會先看到 Access 登入頁再 403——可接受）。

v1 採：**Access 允許「已登入的任何通過 OTP／OIDC 的人」會太寬** → 不可。  
正確 v1：

- **方案 A（較簡）**：Access 用可 API 管理的 allowlist；app 再查 grant（雙重）。
- **方案 B**：Access 綁一組「已核准」IdP group；Authentik／自建流程管 group。

Cloudflare-native v1 採 **方案 A**：Worker 管理 grant，核准時把 Email 加入 Access policy group（API），撤銷時移除。

---

## 8. 內容與 repo 邊界

### 8.1 建議 repo 分工

| Repo / 路徑 | 可見性 | 內容 |
|-------------|--------|------|
| `jimc1682000.github.io`（本站） | public | L0 入口、申請表 UI、文件（本檔）、組裝時**不再**嵌入完整 resume |
| `jimc1682000/resume` | public 可留 L0 源；**完整 Markdown／PDF 源改 private 或移出** | 變體內容、Typst 產 PDF |
| `hidden-resume` app（可为本站 `functions/`／獨立 Worker 專案） | public 程式、無履歷正文 | authorize、admin、signed URL、浮水印組裝 |

**完整履歷正文不得再出現在 public git 歷史的新 commit。**  
既有 public 歷史已外洩過的內容：接受「曾經公開」；重點是停止持續公開與提供可撤銷的未來存取。必要時：

1. 完整內容遷到 private repo（例如 `resume-private`）。
2. 公開 `resume` 只留 L0 精簡頁。
3. CI 用 fine-grained PAT checkout private 內容，建置產物只部署到 **受保護的 cv 專案**，不進主站公開 dist。

### 8.2 浮水印

HTML 與 PDF 皆注入：

```text
Provided to recruiter@example.com
Access granted: 2026-07-29
Document ID: CV-7F3A92
```

- 頁面半透明斜向重複（難裁切）
- PDF metadata / 不可見文字層同 ID
- `watermark_id` 與 grant 1:1，外流可對到收件者

### 8.3 變體

既有 ai／sre／platform／detail × zh／en 保留。grant 可指定 `variant` + `locale`；未指定則預設 ai + 依 Accept-Language 或手動切換（仍不超出已授權資源）。

---

## 9. 稽核與異常（精簡版）

### 9.1 必記事件

- request created / approved / rejected
- login success／failure（能拿到的範圍）
- authorize allow／deny + reason
- pdf-token issued
- grant revoked／suspended／expired（expired 可惰性標記）

### 9.2 v1 異常規則

```yaml
rules:
  - pdf_token_requests > 5 / day / subject → suspend
  - deny_no_grant storm from same ip_hash → rate limit
  - admin_login from new country → notify only
```

處理：`status=suspended` → 通知你 → 人工恢復或撤銷。  
不做即時風險評分引擎。

### 9.3 個資最小化

- 不存完整 IP，只存 `HMAC(ip, server_salt)`
- 申請表欄位僅審核所需；拒絕後可在 N 天後刪 pending
- 日誌保留期建議 90 天

---

## 10. 與主站 UX 整合

### 10.1 導覽

- Header「履歷」仍指 `/resume/`（L0）。
- L0 主 CTA：「申請查看完整履歷」→ 表單。
- 次 CTA（你投遞時用）：「已有授權？前往 cv.jimmychen.me」。

### 10.2 申請表欄位

| 欄位 | 必填 |
|------|------|
| 姓名 | 是 |
| 公司 | 是 |
| 公司 Email | 是 |
| LinkedIn | 建議 |
| 用途／職缺 | 是 |
| 訊息 | 否 |

Bot 防護：Turnstile（主站已在 CF 生態）。

### 10.3 通知你

v1 最低：Worker 發信到 `hi@jimmychen.me`（或 Telegram bot）。  
核准連結帶單次 admin token 或直接請你開 `/admin`。

---

## 11. 分期落地

### Phase 0 — 止血（先於任何 portal）

1. 公開 `/resume/` 改 L0（去掉完整經歷、私人 Email、PDF 連結）。
2. 主站組裝停止把完整 VitePress dist／`public/pdf/*` 送上公開站。
3. 完整內容改 private 存放。
4. 過渡期：完整履歷改手動寄出（email 附件）或暫時 Google Drive 指定 Email——**僅過渡**。

**驗收**：未登入訪客無法在 jimmychen.me 取得完整履歷或 PDF。

### Phase 1 — MVP portal（建議 1–2 週級）

1. `cv.jimmychen.me` + Cloudflare Access（預設 deny）。
2. Worker + D1：requests／grants／events。
3. Admin：核准、撤銷、列期限。
4. 受保護 HTML 履歷（單一變體即可）+ 浮水印。
5. 申請表 + 通知。
6. 無 PDF 也可上線（PDF 仍手動）。

**驗收**

- 未在 allowlist → 進不去。
- 核准 Email OTP／OIDC 後可看 L1。
- 撤銷後同一人立刻 403。
- 到期後 403。
- 每次存取有 event。

### Phase 2 — PDF 與完整變體

1. R2 private + 15 分鐘 signed URL。
2. 每 grant 浮水印 PDF（Typst 管線接到 private）。
3. 多變體／語系依 grant。
4. 下載次數軟上限。

### Phase 3 — 硬化（可選）

1. Appendix 資源層。
2. Access API 與 grant 自動同步。
3. 異常規則自動 suspended。
4. 若要作品化 self-hosted：Pomerium + Authentik 替換 Access（app 授權模型不變）。

---

## 12. 成功指標

| 指標 | 目標 |
|------|------|
| 公開面是否還有完整履歷／PDF | 否 |
| 授權是否 per-email、可撤銷、有期限 | 是 |
| 是否每次受保護請求都跑 `authorize()` | 是 |
| 轉寄 cv URL 給未授權者 | 無法讀取內容 |
| 你是否能在 1 分鐘內撤銷某人 | 是 |
| 招募者是否需裝 client／註冊 Passkey | 否 |
| 維運是否可單人、以 CF free 額度為主 | 是 |

---

## 13. 決策紀錄

| 決策 | 選擇 | 理由 |
|------|------|------|
| 產品定位 | ZT-inspired resource portal，不稱完整 ZTA | 誠實對應威脅模型與外部使用者限制 |
| 預設平台 | Cloudflare Access + Worker + D1 + R2 | 已有 CF、低 ops、free 額度夠個人使用 |
| 開源備選 | Authentik + Pomerium | 可攜、作品展示；app 模型相同，可後遷 |
| 招募者認證 | OIDC 優先，Email OTP 後備 | UX 與保證強度平衡 |
| Admin 認證 | 強 MFA／Passkey | 管理面風險高 |
| 公開 `/resume/` | 降級為 L0 | 否則 hidden 無意義 |
| PDF | 私有物件 + 短效 URL + 浮水印 | 無永久連結 |
| 企業身分自動驗證 | 不做，人工核准 | 成本與誤判不划算 |
| Browser isolation | 不做 | 擋不了拍照、傷害閱讀率 |
| Device posture | 不做（外部） | 不可管 |
| 政策引擎 | 應用內 `authorize()`，不上 OPA | 單一 app 足夠 |
| 公開暴露處置 | **方案 2 + 3**：線上下架 + `resume` 改 private + **兩邊 filter-repo force push** | 2 擋持續外流；3 降低「git clone 挖歷史」；不宣稱能收回 Wayback／已下載複本 |
| 完整內容落點 | `jimc1682000/resume` 改 **private**（正文與 PDF 仍在此維護） | 主站 public 只留 L0；完整源不進公開 dist |
| 主站歷史清洗 | 自 public history 移除舊 VitePress 履歷路徑與 `resume-*.pdf` blob | `master` 現為 public 且 branch protection 禁 force push，執行前須暫關 `allow_force_pushes` |

---

## 14. 實作檢查清單（給實作 PR 用）

### 文件與內容

- [ ] 本設計定稿（本檔）
- [ ] `README.md` 補 hidden-resume／cv 子域說明
- [ ] `jimc1682000/resume` 公開面改 L0
- [ ] 完整內容遷 private 或移出公開 git

### 平台

- [ ] DNS：`cv.jimmychen.me`
- [ ] Cloudflare Access application + 預設 deny
- [ ] D1 schema migrate
- [ ] R2 bucket private（Phase 2）
- [ ] Admin Email allow policy

### App

- [ ] 申請 API + Turnstile
- [ ] 核准／撤銷 admin API
- [ ] `authorize()` middleware
- [ ] 浮水印 HTML
- [ ] access_events 寫入
- [ ] PDF token + signed URL（Phase 2）

### 驗證

- [ ] 未授權 403／Access 擋下
- [ ] 授權可讀、撤銷不可讀
- [ ] 過期不可讀
- [ ] 公開站無 PDF／完整 HTML
- [ ] 日誌看得到 allow／deny

---

## 15. 一句收斂

**公開只給 L0；完整履歷只存在私有儲存與受保護入口；入口驗證身分，應用驗證 grant；grant 有期限、可撤銷、可稽核、可浮水印；不假裝能防截圖。**

這就是符合 Zero Trust **原則**、又對招募者與單人維運都可行的 hidden-resume。
