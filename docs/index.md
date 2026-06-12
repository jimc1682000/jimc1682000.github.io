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
  - text: jimc1682000.blogspot.com
    href: https://jimc1682000.blogspot.com
  - text: Taipei / Tainan
pdf: /pdf/resume-ai-zh.pdf
---

## 核心技能

<Skills />

## 重點成果

- 主導團隊 coding-agent 工具鏈，產出 5 個共用 skill（全 DevOps 採用，bw 推展至 Tech team）
- 自託管 / 開源 LLM 推論評估（AWS GPU EC2 開源 MoE）+ LLM-as-judge eval 閉環（film-brain nDCG@5 0.93 → 0.96）
- 獨力完成 GitLab → Gitea 版控遷移：數百 repo、全工程團隊，< 2 小時離峰切換
- 雲成本優化：EC2 RI / Fargate Spot 各約降兩成、MediaLive Reservation 約降五成
- 建置 ~30 頻道 event-driven FAST 監控平台（Terraform IaC）

## AI / Agentic Engineering

- 主導團隊 coding agent 工具鏈演進（command → plugin → skill）；開發知識庫與帳密管理 skill，應用於 DevOps / SRE 維運場景
- 建置知識庫自動化管線（raw → digest → 語意檢索 / NotebookLM），整合 Jira / Notion 工作流；對外分享 HITL 實戰並開源 ai-kb 方法論
- 自建並維運自託管 AI 平台（OpenClaw on VPS），將 agentic workflow 落地於生產維運
- 自託管 / 開源 LLM 推論評估：於 AWS GPU EC2 評估較大開源 MoE 模型（gemma-4-26B-A4B-it、Qwen3.6-35B-A3B）作為自託管候選；另在無 GPU 環境以 Ollama 跑通查詢展開與 LLM-as-judge 自評管線（模型選型 MoE 35B → 8B dense @ NPU，含 streaming / 重試熱身 / 輸出預算等推論基建排錯）
- 商學底子 × AI agent 治理：以商管訓練的管理視角看待 multi-agent 編排與維運決策——guardrails ≈ 問責控制、scoped authorization ≈ 授權委派、harness / loop ≈ 組織設計

## 工作經歷

### Staff DevOps Engineer · CATCHPLAY @@ 2024.04 – 至今
- 主導團隊 coding agent 工具鏈（command → plugin → skill），產出知識庫 skill、帳密管理 skill 等共用資產；與同事協作、AI 輔助建置 EKS 參考環境並落地 guardrails（pre-commit secret scan、PR gate、多層 secret scanning）；ai-squad（Tech Lead 發起的 AI 專案小組）成員
- 獨力完成 GitLab → Gitea 版控遷移（數百 repo、全工程團隊，< 2 小時離峰切換）；建置 Vaultwarden 並導入 Bitwarden；評估並導入 Bruno 取代 Postman
- 建置 ~30 頻道 event-driven FAST 監控平台（CloudWatch → SNS → Lambda → Slack / LINE、告警熱力圖、自動週報，Terraform IaC）
- 整合 AWS Elemental 媒體串流（MediaLive / MediaPackage / MediaTailor、DRM、Global Accelerator、SPEKE、IVS）
- 建立 Serverless Lambda Terraform 模組與 Jenkins 自動化部署；以 Go 開發 Jenkins 部署自動化（Geo-block 流程）
- 重構資料庫架構：Aurora Read Replica、MySQL / PostgreSQL 併行維運、RDS Proxy 解瞬間數千級連線、Redis 5 → Valkey 7 升級（成本 + 汰役，部分舊系統續用）；主導 Airflow 1.x → 2.0 升級（UAT + Production，~180 DAG）
- 建置 DynamoDB 監控儀表板並導入 DevOps Guru
- 多雲治理與資安：GCP 權限限縮與 API key 治理；以 AI 協助 DRM / WAF / CVE 稽核；Akamai LDS → DataStream 2 IaC 化；盤點並清理閒置 EC2 snapshots；客戶專案環境建置與 CDN 網段白名單
- 以 SQS 設計解決電信合作夥伴高量訂單瓶頸
- 評估並導入 AWS Bedrock、Secrets Manager、Personalize；設計 S3 + NAS 混合儲存與 Akamai IaC CDN 自動化

### Senior SRE Engineer · TrendMicro @@ 2021.09 – 2024.03
- 執行多次災難復原演練（DR Drill）與維護視窗（Maintenance Window），負責跨服務事件處理（Incident Response）
- 透過盤點並下線閒置 / 低使用資源優化雲端成本，調整資料傳輸與日誌設定
- 推動 Opsworks → ASG / SSM 遷移、建立端對端（E2E）監控機制與服務上線審查（Service Readiness Review）流程

### Senior DevOps Engineer · GoFreight @@ 2020.10 – 2021.09
- 以容器化取代 dev / stage 環境，於 CI/CD 管線執行單元測試以提升可靠度
- 建置 EKS 達成高可用與滾動升級（rolling upgrade）；導入 ELK 集中化日誌管理
- EC2 RI / 最佳化機型降低雲端成本；將 MySQL 5.6 升至 8.0 並升級 DMS 引擎
- Jenkins worker 支援尖峰自動擴展並整合 GitHub

### Senior DevOps Engineer · CATCHPLAY @@ 2019.02 – 2020.10
- 打造一鍵式 CI/CD 管線供研發一鍵部署多環境；建立壓力測試環境定位系統效能瓶頸
- 以 Airflow 取代 cronjob 排程，重構部分 ETL 自動化流程
- 善用 EC2 Spot / RI 降低雲端成本；以 Lambda 整併多來源日誌
- 容器化標準化元件；以 ELK + Curator 集中化日誌管理

### Senior Java / DevOps Engineer · Groundhog Tech @@ 2017.11 – 2019.02
- 部署 DSP / DMP 系統並強化效能；導入 Kubernetes、Ansible 與 GitLab CI/CD 強化自動化
- 稽查防火牆設定，提升系統資安等級
- 維護 CovMo 訊號優化系統並開發新功能；重構程式碼、優化 SQL 查詢效能

### 早期經歷 @@ 2012 – 2017
- **Bank SinoPac · Senior Java Web Engineer**（2015 – 2017）：從零打造投信投資流程系統與 RESTful Web 服務（Java backend）
- **Gping Construction / Gobooks Publishing · System Engineer**（2012 – 2015）：防火牆與網路拓樸、Acronis 備援、Windows AD / Exchange 升級、VMware HA + P2V、WSUS

## 精選專案

<Projects />

## 學歷、認證 & 語言

- **學歷**：東吳大學 學士（2007 – 2012）· 國立臺南第一高級中學（2004 – 2007）
- **認證**：RHCE · CEH · OCPJP7 · MCITP · CCNA
- **語言**：中文（母語）· English（專業工作能力 · TOEIC 845）
