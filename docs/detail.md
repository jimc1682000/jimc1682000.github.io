---
layout: resume
variant: detail
lang: zh
name: 陳建豪
nameEn: Jimmy Chen
role: DevOps / SRE / AI Engineer
summary: 13 年 IT 職涯橫跨系統工程、後端開發與 DevOps / SRE。從網路與伺服器維運起步，歷經 Java Web 後端開發，近年深耕大型雲端平台維運與自動化。具備 AWS 大規模維運、Kubernetes、可觀測性、CI/CD 與資訊安全（CEH）實務，並將 AI / Agentic 工作流導入維運場景。以下為完整經歷。
contacts:
  - text: jimc1682000@gmail.com
    href: mailto:jimc1682000@gmail.com
  - text: github.com/jimc1682000
    href: https://github.com/jimc1682000
  - text: linkedin.com/in/594jimmychen
    href: https://www.linkedin.com/in/594jimmychen
  - text: Taipei, Taiwan
pdf: /pdf/resume-detail-zh.pdf
---

## 核心技能

- **雲端 / AWS**：EC2、S3、Lambda、RDS / Aurora、DynamoDB、Route 53、ECS、EKS、SQS、Bedrock、Personalize、Elemental、Secrets Manager、DevOps Guru
- **容器 / 編排**：Docker、Kubernetes、EKS、ECS、Vagrant
- **IaC / CI-CD**：Terraform、Ansible、GitLab CI/CD、Jenkins、GitHub
- **可觀測性 / 日誌**：Prometheus、Grafana、ELK（Elasticsearch / Logstash / Kibana / Filebeat / Curator）、CloudWatch
- **訊息 / 串流**：Kafka、Zookeeper、ActiveMQ、RabbitMQ、SQS
- **資料庫**：MySQL、PostgreSQL、Aurora、MSSQL、MongoDB、Redis、DynamoDB
- **後端 / 語言**：Java、Python、JavaScript / Node.js、Bash、Spring、Hibernate、ZK、GWT、Django、JMS、GSON、RESTful
- **系統 / 網路 / 資安**：Linux、Windows Server、VMware、Hyper-V、AD、Exchange、WSUS、UTM、TCP/IP、VLAN、VPN、iptables、IIS、IPS、Ethical Hacking / 滲透測試（CEH）
- **測試 / 壓測**：JMeter、Locust
- **AI / Agentic**：AWS Bedrock、Claude Code、Agentic Workflow、RAG / 知識庫自動化

## AI / Agentic Engineering

- 自建並維運自託管 AI 平台（OpenClaw on VPS）；開發 Claude Code skills 與 agentic workflow，應用於 DevOps / SRE 維運場景
- 建置知識庫自動化管線（精煉、發布、語意檢索），整合 Slack / Jira / Notion 工作流

## 工作經歷

### Staff DevOps Engineer · CATCHPLAY @@ 2024.04 – 至今
- **串流媒體基礎建設**：整合 AWS Elemental（MediaLive / MediaPackage / MediaTailor）、串接 DRM 確保內容安全、協調跨部門整合優化串流架構
- **資料庫優化與遷移**：Aurora Read Replica 分散負載、GitLab 資料庫由 MySQL 遷移至 PostgreSQL、導入 RDS Proxy 解決高併發連線、Airflow 資料庫優化並遷至 Replica
- **DevOps 與監控**：建立 DynamoDB 監控儀表板提升可觀測性、部署 DevOps Guru 實現 RDS 智能異常偵測、主導 Airflow 2.0 升級（UAT / Production）、開發 Akamai IaC 自動化 CDN 快取管理
- **雲端服務導入**：引入 AWS Personalize 個人化推薦、導入 DynamoDB 協助開發 新一代平台、推動 AWS Secrets Manager 強化資安、向團隊導入 AWS Bedrock AI 服務
- **系統整合與架構**：以 SQS 設計高流量訂單處理方案、建置 S3 / NAS 混合儲存優化影音內容、實作 S3 生命週期自動清理、優化部署流程協助團隊整合 S3
- *Tools：AWS（Elemental / Aurora / RDS Proxy / DynamoDB / SQS / Personalize / Bedrock / Secrets Manager / DevOps Guru）、Airflow、Akamai、S3 / NAS、Terraform、PostgreSQL*

### Senior SRE Engineer · TrendMicro（趨勢科技） @@ 2021.09 – 2024.03
- 執行多次災難復原演練（DR Drill）與維護視窗（Maintenance Window），並負責各類事件處理（Incident Response）
- 優化雲端成本：盤點並移除閒置 / 低使用資源、優化資料傳輸、調整日誌設定
- 維運強化：Opsworks → ASG / SSM 遷移、建立端對端（E2E）監控機制、服務上線審查（Readiness Review）流程
- *Tools：AWS（Opsworks / ASG / SSM / CloudWatch）*

### Senior DevOps Engineer · GoFreight（聖學科技） @@ 2020.10 – 2021.09
- 容器化：取代 VM 的 dev / stage 環境、於 CI/CD 管線執行單元測試、提升管線效能與可靠度
- 建置 Kubernetes（EKS）達成高可用與滾動升級；建置 ELK 作為集中化日誌管理方案
- 成本：EC2 最佳化機型 + RI；部署 / 排障客戶 GoFreight FMS 系統
- 將 MySQL 升至 8.0、升級 DMS 引擎並修復 DMS 任務、升級 UTM；Jenkins worker 支援尖峰擴展並整合 GitHub
- *Tools：Ansible、Terraform、Docker、Node.js、Nginx、ELK、Filebeat、GitHub、Jenkins、AWS、EKS、Redis、Django、Vagrant*

### Senior DevOps Engineer · CATCHPLAY @@ 2019.02 – 2020.10
- 建立壓力測試環境定位系統瓶頸；打造一鍵式 CI/CD 管線供 RD 一鍵部署多環境；以 Airflow 取代 cronjob 與部分 ETL
- 善用 EC2 Spot 與 RI 降低成本；撰寫監控腳本 + Slack 告警；以 Lambda 整併日誌並校準負載平衡設定
- 容器化標準化元件（多層映像檔）；以 Curator 維護 Elasticsearch、調整 Logstash 解析規則
- *Tools：Ansible、Terraform、Docker、ELK、GitLab、Jenkins、AWS、Airflow、RabbitMQ、ECS、Lambda、Locust、JMeter*

### DevOps Automation Engineer · Groundhog Technologies（現觀科技） @@ 2018.09 – 2019.02
- 部署 DSP / DMP 系統至客戶環境；開發伺服器間連線監控工具；移除冗餘元件 / 調整服務設定提升效能
- 導入 Kubernetes、GitLab CI/CD、Ansible 強化自動化；檢查防火牆設定、修補弱點提升資安等級
- *Tools：Docker、Kafka、Zookeeper、ELK、Grafana、Prometheus、Kubernetes、Ansible、GitLab CI/CD、GCP、MongoDB、Redis*

### Senior Java Web Engineer · Groundhog Technologies @@ 2017.11 – 2018.09
- 維護並開發 CovMo（手機訊號優化）系統新功能；重構程式碼提升可讀性；優化 SQL 查詢效能
- *Tools：Java、JavaScript、GWT、Spring、Tomcat、MySQL*

### Senior Java Web Engineer · Bank SinoPac（永豐） @@ 2015.04 – 2017.11
- 訪談使用者釐清需求，從零打造投資流程系統；以 ZK、Hibernate、JMS、GSON 建置多項服務，多為 RESTful Web 服務
- *Tools：Java、ZK、Hibernate、JMS、GSON、Tomcat、ActiveMQ、MSSQL*

### Senior System Engineer · Gping Construction（集品建設） @@ 2014.03 – 2015.04
- 強化防火牆設定、升級網路拓樸；以 Acronis 建置備援伺服器
- *Tools：Windows Server、Acronis、Network Administration*

### System Engineer · Gobooks Publishing（高寶出版） @@ 2012.09 – 2014.03
- 升級 Windows AD（2000 → 2008）與 Exchange（2000 → 2007）；以 P2V 遷移老舊系統、VMware 建置 HA；升級 UTM、建置 WSUS
- *Tools：Windows Server、VMware、Hyper-V、Exchange、AD、WSUS、UTM、ERP*

## 精選專案

<Projects />

## 認證

- **Red Hat**：RHCA · RHCE（EX200 / EX300）
- **資安 / 網路**：CEH（312-50）· ENSA（312-38）· CCNSP · CCNA（640-802）
- **Microsoft**：MCITP（Windows Server 2008 R2：70-646 / 640 / 642）· MCSA · MCTS · MOS Master
- **Java**：OCPJP7（1Z0-803 / 804）· SCJP
- **其他**：國際貿易大會考 · 人身保險業務員（壽險公會）

## 專業訓練

- **恆逸資訊**「網路系統整合工程師就業認證養成班」（2012.02 – 07）：正課 516 小時 / 總時數 626 小時，結業成績全班第三名
- **恆逸資訊**「EC-Council CEH 駭客技術專家認證課程」（2013，40 小時）
- **巨匠電腦**「Android APP 培訓課程（含 OCPJP）」（2013 – 14，264 小時）
- **巨匠電腦**「OCPJWCD（原 SCWCD）」（2014，48 小時）

## 學歷

- **東吳大學** 工商管理學士（BBA）· 國貿系（2007 – 2012）— 機動車輛研究社 副社長、合氣道社、青年領袖學堂 小組長
- **國立臺南第一高級中學** 第三類組（2004 – 2007）— 資訊社

## 語言

- 中文（母語）· 台語（流利）· English（專業工作能力 · TOEIC 845）· 日語（基礎）
