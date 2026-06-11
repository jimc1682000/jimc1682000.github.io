---
layout: resume
variant: platform
lang: zh
name: 陳建豪
nameEn: Jimmy Chen
role: SRE / Platform Engineer
summary: 13 年 IT 基礎架構與後端開發經驗，5+ 年專注 DevOps / SRE，聚焦 Kubernetes 平台全生命週期、可觀測性與系統可靠度。兼具後端開發（Java / Python）與大型雲端平台架構與維運能力，熟悉 Incident Response、災難復原 / 韌性演練與服務上線審查（Design / Readiness Review），並將 AI / Agentic 工作流導入維運自動化。
contacts:
  - text: jimc1682000@gmail.com
    href: mailto:jimc1682000@gmail.com
  - text: github.com/jimc1682000
    href: https://github.com/jimc1682000
  - text: linkedin.com/in/594jimmychen
    href: https://www.linkedin.com/in/594jimmychen
  - text: Taipei, Taiwan（可遷台南）
pdf: /pdf/resume-platform-zh.pdf
otherLang: /en/platform
otherLangLabel: EN
otherVariant: /
otherVariantLabel: 通用版
---

## 核心技能

- **Kubernetes / 平台**：Kubernetes（Networking / Storage / Controller 實務）、EKS、Docker、ECS
- **可觀測性**：Prometheus、Grafana、ELK、CloudWatch、AWS DevOps Guru
- **可靠度 / SRE**：Incident Response、DR / 韌性演練、Service Readiness Review、高併發優化
- **CI/CD / IaC**：GitLab CI、Jenkins、Terraform、Ansible
- **後端 / 語言**：Java、Python、JavaScript、Bash
- **資料庫**：MySQL、PostgreSQL、Aurora、DynamoDB、Redis、MongoDB
- **AI / Agentic**：AWS Bedrock、Claude Code、Agentic Workflow、知識庫自動化

## 平台 / 可靠度亮點

- **Kubernetes 平台**：建置 EKS 高可用叢集與滾動升級（rolling upgrade）；以 Kubernetes、Ansible、GitLab CI/CD 標準化部署
- **可觀測性**：DynamoDB 監控儀表板 + AWS DevOps Guru 異常偵測、ELK 集中化日誌、端對端（E2E）監控
- **可靠度 / SRE**：跨服務 Incident Response、多次 DR / 韌性演練、服務上線審查（Readiness Review）
- **高併發 / 規模**：RDS Proxy 解高併發連線、Aurora Read Replica 分流、SQS 處理 Telkomsel 高量訂單

## AI / Agentic for Operations

- 自建並維運自託管 AI 平台（OpenClaw on VPS）；開發 Claude Code skills 與 agentic workflow，應用於 DevOps / SRE 維運自動化
- 建置知識庫自動化管線（精煉、發布、語意檢索），整合 Slack / Jira / Notion，加速事件分析與文件產出

## 工作經歷

### Staff DevOps Engineer · CATCHPLAY @@ 2024.04 – 至今
- 建置 DynamoDB 監控儀表板並導入 AWS DevOps Guru 自動偵測 RDS 異常，強化系統可觀測性與可靠度
- 重構資料庫架構：Aurora MySQL Read Replica 分流、MySQL → PostgreSQL 遷移、以 RDS Proxy 解決高併發連線瓶頸
- 升級 Airflow 至 2.0 並橫跨 UAT / Production 雙環境；以 SQS 解決 Telkomsel 高量訂單處理瓶頸
- 其他雲端維運（廣度）：AWS Bedrock AI 工具與 Secrets Manager、AWS Personalize 推薦環境、Elemental 媒體串流（DRM）、S3 + NAS 混合儲存與 Akamai IaC CDN

### Senior SRE Engineer · TrendMicro @@ 2021.09 – 2024.03
- 負責跨服務 Incident Response；執行多次災難復原演練（DR Drill / 韌性測試）與維護視窗（Maintenance Window）
- 建立端對端（E2E）監控機制與服務上線審查（Service Readiness Review）流程
- 推動 Opsworks → ASG / SSM 遷移；盤點並下線閒置資源優化雲端成本與日誌設定

### Senior DevOps Engineer · GoFreight @@ 2020.10 – 2021.09
- 建置 EKS（Kubernetes）達成高可用與滾動升級（rolling upgrade），容器化取代 dev / stage 環境
- 導入 ELK 集中化日誌管理；於 CI/CD 管線執行單元測試以提升可靠度
- 以 EC2 RI / 最佳化機型與 DMS 遷移降低成本，將 MySQL 由 5.6 升級至 8.0；Jenkins worker 支援尖峰自動擴展

### Senior DevOps Engineer · CATCHPLAY @@ 2019.02 – 2020.10
- 建立壓力測試環境定位系統瓶頸；打造一鍵式 CI/CD 管線供研發部署多環境
- 以 Airflow 取代 cronjob 與 ETL；容器化標準化元件，並以 ELK + Curator 管理與解析日誌
- 善用 EC2 Spot / RI 降低成本；以 Lambda 整併日誌

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
