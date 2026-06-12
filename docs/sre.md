---
layout: resume
variant: sre
lang: zh
compact: true
name: 陳建豪
nameEn: Jimmy Chen
role: SRE / DevOps Engineer
summary: 13 年 IT 基礎架構與後端開發經驗，5+ 年專注 DevOps / SRE，聚焦 Kubernetes 平台全生命週期、可觀測性與系統可靠度。兼具後端開發（Java / Python）與大型雲端平台架構與維運能力，熟悉 Incident Response、災難復原 / 韌性演練與服務上線審查（Design / Readiness Review），並將 AI / Agentic 工作流導入維運自動化。
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
pdf: /pdf/resume-sre-zh.pdf
---

## 核心技能

<Skills />

## SRE / 可靠度核心能力

- **Kubernetes 平台**：建置 EKS 參考環境與滾動升級（rolling upgrade）；以 Kubernetes、Ansible、Gitea / Jenkins 標準化部署
- **可觀測性**：FAST 頻道監控平台、DynamoDB 監控儀表板 + DevOps Guru 異常偵測、ELK 集中化日誌、端對端（E2E）監控
- **可靠度 / SRE**：跨服務 Incident Response、多次 DR / 韌性演練、服務上線審查（Readiness Review）；落地 pre-commit / PR gate guardrails
- **高併發 / 規模**：RDS Proxy 解高併發連線、Aurora Read Replica 分流、Redis / Valkey 7 遷移、SQS 處理電信合作夥伴高量訂單
- 主導團隊 coding agent 工具鏈演進（command → plugin → skill）；開發知識庫與帳密管理 skill，應用於 DevOps / SRE 維運自動化
- 建置知識庫自動化管線（raw → digest → 語意檢索），整合 Jira / Notion，加速事件分析與文件產出

## 工作經歷

### Staff DevOps Engineer · CATCHPLAY @@ 2024.04 – 至今
- 建置 FAST 頻道監控平台（週報、即時告警、告警熱力圖、LINE Bot / Slack 通知）；建置 DynamoDB 監控儀表板並導入 DevOps Guru，強化可觀測性與可靠度
- 以 AI 協作建置 EKS 參考環境並落地 guardrails（pre-commit secret scan、PR gate、多層 secret scanning）
- 重構資料庫架構：Aurora Read Replica、MySQL → PostgreSQL 遷移、RDS Proxy、Redis / Valkey 7 切分遷移；主導 Airflow 2.0 升級（UAT / Production）
- 獨力完成 GitLab → Gitea 版控遷移；建立 Serverless Lambda Terraform 模組與 Jenkins 自動化部署；以 Go 開發 Geo-block 部署自動化
- 以 SQS 設計解決電信合作夥伴高量訂單瓶頸
- 整合 AWS Elemental 媒體串流（DRM、Global Accelerator、SPEKE、IVS）；完成 Akamai LDS → DataStream 2 IaC 化
- 多雲治理與資安：GCP 權限限縮、Secrets Manager 憑證整頓、DRM / WAF / CVE 稽核；盤點並清理閒置 EC2 snapshots；客戶專案環境建置與 CDN 網段白名單

### Senior SRE Engineer · TrendMicro @@ 2021.09 – 2024.03
- 負責跨服務 Incident Response；執行多次災難復原演練（DR Drill / 韌性測試）與維護視窗（Maintenance Window）
- 建立端對端（E2E）監控機制與服務上線審查（Service Readiness Review）流程
- 推動 Opsworks → ASG / SSM 遷移；盤點並下線閒置資源優化雲端成本與日誌設定

### Senior DevOps Engineer · GoFreight @@ 2020.10 – 2021.09
- 建置 EKS（Kubernetes）達成高可用與滾動升級（rolling upgrade），容器化取代 dev / stage 環境
- 導入 ELK 集中化日誌管理；於 CI/CD 管線執行單元測試以提升可靠度
- EC2 RI / 最佳化機型降低雲端成本；將 MySQL 5.6 升至 8.0 並升級 DMS 引擎
- Jenkins worker 支援尖峰自動擴展並整合 GitHub

### Senior DevOps Engineer · CATCHPLAY @@ 2019.02 – 2020.10
- 打造一鍵式 CI/CD 管線供研發一鍵部署多環境；建立壓力測試環境（Locust / JMeter）定位效能瓶頸
- 以 Airflow 取代 cronjob 排程，重構部分 ETL 自動化流程
- 容器化標準化元件（多層映像檔）
- 以 ELK + Curator 集中化日誌管理；調整 Logstash 解析規則
- 善用 EC2 Spot / RI 降低雲端成本；以 Lambda 整併多來源日誌

### Senior Java / DevOps Engineer · Groundhog Tech @@ 2017.11 – 2019.02
- 導入 Kubernetes、Ansible 與 GitLab CI/CD；部署 DSP / DMP 系統並強化效能與安全性
- 維護 CovMo 訊號優化系統並開發新功能；重構程式碼、優化 SQL 查詢效能

### Senior Java Web Engineer · Bank SinoPac @@ 2015.04 – 2017.11
- 訪談使用者釐清需求，從零打造投資流程系統與 RESTful Web 服務（後端 Java）

### 早期經歷 @@ 2012 – 2015
- **Gping Construction · Senior System Engineer**（2014.03 – 2015.04）：強化防火牆與網路拓樸、以 Acronis 建置備援
- **Gobooks Publishing · System Engineer**（2012.09 – 2014.03）：升級 Windows AD / Exchange，以 VMware 建置 HA

## 精選專案

<Projects />

## 學歷、認證 & 語言

- **學歷**：東吳大學 學士（2007 – 2012）· 國立臺南第一高級中學（2004 – 2007）
- **認證**：OCPJP7 · CEH · RHCE · MCITP · CCNA
- **語言**：中文（母語）· English（專業工作能力 · TOEIC 845）
