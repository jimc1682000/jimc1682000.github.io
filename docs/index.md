---
layout: resume
variant: ai
lang: zh
name: 陳建豪
nameEn: Jimmy Chen
role: AI Engineer · DevOps / SRE
summary: 13+ 年 IT 職涯、7+ 年 DevOps / SRE 底子，近年聚焦 AI / Agentic Engineering：自建自託管 AI 平台、開發 Claude Code skills 與 agentic workflow、建置知識庫自動化，並以深厚 AWS 維運與自動化能力，將 AI 落地於生產與維運場景。
contacts:
  - text: jimc1682000@gmail.com
    href: mailto:jimc1682000@gmail.com
  - text: github.com/jimc1682000
    href: https://github.com/jimc1682000
  - text: linkedin.com/in/594jimmychen
    href: https://www.linkedin.com/in/594jimmychen
  - text: jimc1682000.blogspot.com
    href: https://jimc1682000.blogspot.com
  - text: Taipei / Tainan
pdf: /pdf/resume-ai-zh.pdf
---

## 核心技能

<Skills />

## 重點成果

- 主導團隊 coding-agent 工具鏈，產出 5 個共用 skill（全 DevOps 採用，帳密管理 skill（Bitwarden）推展至 Tech team）
- 自託管 / 開源 LLM 推論評估（AWS GPU EC2 開源 MoE）+ LLM-as-judge eval 閉環（film-brain nDCG@5 0.93 → 0.96）
- 獨力完成 GitLab → Gitea 版控遷移：數百 repo、全工程團隊，< 2 小時離峰切換
- 雲成本優化：EC2 RI / Fargate Spot 各約降兩成、MediaLive Reservation 約降五成

## AI / Agentic Engineering

- 建置知識庫自動化管線（raw → digest → 語意檢索 / NotebookLM），整合 Jira / Notion 工作流；對外分享 HITL 實戰並開源 ai-kb 方法論
- 自建並維運自託管 AI 平台（OpenClaw on VPS），將 agentic workflow 落地於生產維運
- 商學底子 × AI agent 治理：以商管訓練的管理視角看待 multi-agent 編排與維運決策——guardrails ≈ 問責控制、scoped authorization ≈ 授權委派、harness / loop ≈ 組織設計

## 工作經歷

### Staff DevOps Engineer · CATCHPLAY @@ 2024.04 – 至今
- 主導團隊 coding agent 工具鏈（command → plugin → skill），產出知識庫 skill、帳密管理 skill 等共用資產；ai-squad（Tech Lead 發起的 AI 專案小組）成員
- 評估並導入 AWS Bedrock 與 Personalize；以 AI 協助 DRM / WAF / CVE 稽核
- 與同事協作、AI 輔助建置 EKS 參考環境並落地 guardrails（pre-commit secret scan、PR gate、多層 secret scanning）
- 獨力完成 GitLab → Gitea 版控遷移（數百 repo、全工程團隊，< 2 小時離峰切換）；建置 Vaultwarden 並導入 Bitwarden；評估並導入 Bruno 取代 Postman
- 建置 多頻道 event-driven FAST 監控平台（CloudWatch → SNS → Lambda → Slack / LINE、熱力圖、週報，Terraform IaC）；整合 AWS Elemental（MediaLive / MediaPackage / MediaTailor、DRM、Global Accelerator、SPEKE、IVS）；建置 DynamoDB 監控儀表板 + DevOps Guru
- 重構資料庫架構：Aurora Read Replica、MySQL / PostgreSQL 併行維運、RDS Proxy 解瞬間數千級連線、Redis 5 → Valkey 7 升級（成本 + 汰役）；主導 Airflow 1.x → 2.0 升級（UAT + Production，大量 DAG）；以 SQS 解決電信夥伴高量訂單瓶頸
- 自動化與多雲治理：Serverless Lambda Terraform 模組 + Jenkins 自動化部署、Go Geo-block 部署自動化、Akamai IaC CDN 與 LDS → DataStream 2、S3 + NAS 混合儲存；GCP 權限與 API key 治理、導入 Secrets Manager、清理閒置 EC2 snapshots、客戶專案環境與 CDN 網段白名單

### Senior SRE Engineer · Trend Micro @@ 2021.09 – 2024.03
- 多次 DR Drill / 維護視窗、跨服務 Incident Response；盤點下線閒置資源，優化雲成本與資料傳輸 / 日誌
- 推動 Opsworks → ASG / SSM 遷移；建立 E2E 監控與服務上線審查（Readiness Review）流程

### Senior DevOps Engineer · GoFreight @@ 2020.10 – 2021.09
- EKS 高可用 / 滾動升級；容器化 + CI/CD 單元測試；ELK 日誌；EC2 RI 降成本；MySQL 5.6 → 8.0

### Senior DevOps Engineer · CATCHPLAY @@ 2019.02 – 2020.10
- 一鍵式 CI/CD 多環境部署 + 壓測定位瓶頸；Airflow 取代 cronjob；ELK + Curator 日誌；EC2 Spot / RI 降成本

### Senior Java / DevOps Engineer · Groundhog Tech @@ 2017.11 – 2019.02
- 部署 DSP/DMP；導入 Kubernetes / Ansible / GitLab CI/CD；防火牆稽查；維護 CovMo 訊號優化系統

### 早期經歷 @@ 2012 – 2017
- **Bank SinoPac**（Java Web，2015 – 2017）投信流程系統 + RESTful 服務；**Gping / Gobooks**（System Eng，2012 – 2015）防火牆 / 網路、VMware HA + P2V、Windows AD / Exchange、WSUS

## 精選專案

<Projects />

## 學歷、認證 & 語言

- **學歷**：東吳大學 學士（2007 – 2012）· 國立臺南第一高級中學（2004 – 2007）
- **近期焦點**：Agentic Workflow · EKS · Terraform · AWS Bedrock · 自託管 LLM 推論
- **認證**：RHCE · CEH · OCPJP7 · MCITP · CCNA
- **語言**：中文（母語）· English（專業工作能力 · TOEIC 845）
