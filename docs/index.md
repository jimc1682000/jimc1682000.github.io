---
layout: resume
variant: ai
lang: zh
name: 陳建豪
nameEn: Jimmy Chen
role: AI Engineer · DevOps / SRE
summary: 具 13 年雲端 / DevOps / SRE 底子，近年聚焦 AI / Agentic Engineering：自建自託管 AI 平台、開發 Claude Code skills 與 agentic workflow、建置知識庫自動化，並以深厚 AWS 維運與自動化能力，將 AI 落地於生產與維運場景。
contacts:
  - text: jimc1682000@gmail.com
    href: mailto:jimc1682000@gmail.com
  - text: github.com/jimc1682000
    href: https://github.com/jimc1682000
  - text: linkedin.com/in/594jimmychen
    href: https://www.linkedin.com/in/594jimmychen
  - text: Taipei, Taiwan
pdf: /pdf/resume-ai-zh.pdf
---

## 核心技能

<Skills />

## AI / Agentic Engineering

- 主導團隊 coding agent 工具鏈演進（command → plugin → skill）；開發知識庫與帳密管理 skill，應用於 DevOps / SRE 維運場景
- 建置知識庫自動化管線（raw → digest → 語意檢索 / NotebookLM），整合 Jira / Notion 工作流；對外分享 HITL 實戰並開源 ai-kb 方法論
- 自建並維運自託管 AI 平台（OpenClaw on VPS），將 agentic workflow 落地於生產維運

## 工作經歷

### Staff DevOps Engineer · CATCHPLAY @@ 2024.04 – 至今
- 主導團隊 coding agent 工具鏈（command → plugin → skill），產出知識庫 skill、帳密管理 skill 等共用資產；以 AI 協作建置 EKS 參考環境並落地 guardrails（pre-commit secret scan、PR gate、多層 secret scanning）
- 獨力完成 GitLab → Gitea 版控遷移；建置 Vaultwarden 並導入 Bitwarden；評估並導入 Bruno 取代 Postman
- 建置 FAST 頻道監控平台（週報、即時告警、告警熱力圖、LINE Bot / Slack 通知）；整合 AWS Elemental 媒體串流（MediaLive / MediaPackage / MediaTailor、DRM、Global Accelerator、SPEKE、IVS、Elemental Link）
- 建立 Serverless Lambda Terraform 模組與 Jenkins 自動化部署；以 Go 開發 Jenkins 部署自動化（Geo-block 流程）
- 重構資料庫架構：Aurora Read Replica、MySQL → PostgreSQL 遷移、RDS Proxy、Redis / Valkey 7 切分遷移；主導 Airflow 2.0 升級；建置 DynamoDB 監控儀表板並導入 DevOps Guru
- 多雲治理與資安：GCP 權限限縮與 API key 治理；以 AI 協助 DRM / WAF / CVE 稽核；Akamai LDS → DataStream 2 IaC 化；盤點並清理閒置 EC2 snapshots；客戶專案環境建置與 CDN 網段白名單
- 評估並導入 AWS Bedrock、Secrets Manager、Personalize；以 SQS 解決電信合作夥伴高量訂單瓶頸；設計 S3 + NAS 混合儲存與 Akamai IaC CDN 自動化

### Senior SRE Engineer · TrendMicro @@ 2021.09 – 2024.03
- 執行多次災難復原演練（DR Drill）與維護視窗（Maintenance Window），負責跨服務事件處理（Incident Response）
- 透過盤點並下線閒置 / 低使用資源優化雲端成本，調整資料傳輸與日誌設定
- 推動 Opsworks → ASG / SSM 遷移、建立端對端（E2E）監控機制與服務上線審查（Service Readiness Review）流程

### Senior DevOps Engineer · GoFreight @@ 2020.10 – 2021.09
- 以容器化取代 dev / stage 環境，於 CI/CD 管線執行單元測試以提升可靠度
- 建置 EKS 達成高可用與滾動升級（rolling upgrade）；導入 ELK 集中化日誌管理
- 以 EC2 RI / 最佳化機型與 DMS 遷移降低成本，將 MySQL 由 5.6 升級至 8.0；Jenkins worker 支援尖峰自動擴展

### Senior DevOps Engineer · CATCHPLAY @@ 2019.02 – 2020.10
- 建立壓力測試環境定位系統瓶頸；打造一鍵式 CI/CD 管線供研發部署多環境
- 以 Airflow 取代 cronjob 與 ETL；善用 EC2 Spot / RI 降低成本；以 Lambda 整併日誌
- 容器化標準化元件，並以 ELK + Curator 管理與解析日誌

### Senior Java / DevOps Engineer · Groundhog Tech @@ 2017.11 – 2019.02
- 部署 DSP / DMP 系統並強化效能與安全性；導入 Kubernetes、Ansible 與 GitLab CI/CD
- 維護 CovMo 訊號優化系統並開發新功能；重構程式碼、優化 SQL 查詢效能

### Senior Java Web Engineer · Bank SinoPac @@ 2015.04 – 2017.11
- 訪談使用者釐清需求，從零打造投資流程系統與 RESTful Web 服務

### Senior System Engineer · Gping Construction @@ 2014.03 – 2015.04
- 強化防火牆設定與網路拓樸；以 Acronis 建置備援伺服器

### System Engineer · Gobooks Publishing @@ 2012.09 – 2014.03
- 升級 Windows AD（2000 → 2008）與 Exchange；以 VMware 建置 HA、P2V 遷移老舊系統、建置 WSUS

## 精選專案

<Projects />

## 學歷、認證 & 語言

- **學歷**：東吳大學 學士（2007 – 2012）· 國立臺南第一高級中學（2004 – 2007）
- **認證**：OCPJP7 · CEH · RHCE · MCITP · CCNA
- **語言**：中文（母語）· English（專業工作能力 · TOEIC 845）
