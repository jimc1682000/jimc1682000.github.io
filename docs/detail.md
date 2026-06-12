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
  - text: jimc1682000.blogspot.com
    href: https://jimc1682000.blogspot.com
  - text: Taipei / Tainan
pdf: /pdf/resume-detail-zh.pdf
---

## 核心技能

<Skills />

## 近期專注

- Agentic Workflow · 自託管 LLM 推論 · RAG / LLM eval · EKS · Terraform

## AI / 跨域技術定位

- **AI 協作落地維運（agent-native + AIOps）**：以 AI 為共同開發者，把零散需求收斂成可被他人重用的 coding-agent skill 生態與安全護欄（CI 自動 gate、context / 帳密邊界），而非一次性腳本——重點在「能否被重用、邊界是否清楚」；並將 AI 落地維運：協助 DRM / WAF / CVE 稽核與 GCP 權限治理，與團隊協作多語精靈翻譯模型生命週期（GPT-4-turbo → GPT-5.4、UAT → Prod、prod GPU 根因排查）
- **自託管 AI 平台與開源 LLM 推論**：自建並維運自託管 AI 平台（OpenClaw on VPS）落地生產 agentic workflow；於 AWS GPU EC2 評估較大開源 MoE 模型（gemma-4-26B-A4B-it、Qwen3.6-35B-A3B）作為自託管候選；另以 Ollama 在無 GPU 環境跑通查詢展開與 LLM-as-judge 自評管線（模型選型 MoE 35B → 8B dense @ NPU，含 streaming / 重試熱身 / 輸出預算等推論基建排錯）
- **知識沉澱與方法論**：建置 raw → digest → 語意檢索 / NotebookLM 管線並整合 Jira / Notion，把個人 PoC 與踩坑轉成團隊可查用的共享記憶（降低重複試錯與理解債）並開源為 ai-kb；探索 Harness → Loop（從「人設計 harness、agent 籠內協作」到「人設計 loop、專注驗證閉環」），於 Tech team 分享 HITL 實戰（「我與 Claude Code 的一天」）
- **商學底子 × 工程決策**：以商管訓練的管理視角分析維運與團隊決策——曾以數據與成本 / ROI 框架駁回低效提案，改以 span of control、bounded rationality 設計 forcing-function escalation（把無法 team 內解的問題用 data + automation 推到能解的人面前）；同一套思維延伸為 AI agent 治理的類比框架：guardrails ≈ 問責控制、scoped authorization ≈ 授權委派、harness / loop ≈ 組織設計
- **雲端規模與可靠度（SRE）**：AWS 大規模維運與多雲治理；高併發架構（RDS Proxy 連線池、SQS 高量訂單削峰）；可靠度工程（TrendMicro 多次 DR / 韌性演練、E2E 監控、服務上線審查）；可觀測性（Prometheus / Grafana / ELK / CloudWatch）；Aurora Read Replica + RDS Proxy 高可用資料庫；Linux 底層 cgroup / namespace、FCOS ignition
- **虛擬化與自建平台**：以 KVM/QEMU 於兩台實體機部署 OKD 4.4（OpenShift upstream）完整叢集，涵蓋 HAProxy / BIND / NFS / pfSense 全流程；早期以 VMware vSphere 建置企業 HA 環境並執行 P2V 遷移

## 工作經歷

### Staff DevOps Engineer · CATCHPLAY @@ 2024.04 – 至今
- **AI 協作與 DevOps 工具鏈**：主導團隊 coding agent 工具鏈（command → plugin → skill），產出知識庫 skill、帳密管理 skill 等共用資產；與同事協作、AI 輔助建置 EKS 參考環境並落地 guardrails（pre-commit secret scan、PR gate、多層 secret scanning）；對外分享 HITL 實戰與 ai-kb 方法論
- **串流媒體與 FAST 頻道**：建置 FAST 頻道監控平台（週報、即時告警、告警熱力圖、LINE Bot / Slack 通知）；整合 AWS Elemental（MediaLive / MediaPackage / MediaTailor）、DRM、Global Accelerator、SPEKE、IVS、Elemental Link；MediaLive Reservations 採購與成本管理
- **平台現代化與服務遷移**：獨力完成 GitLab → Gitea 版控遷移；建置 Vaultwarden 並導入 Bitwarden；評估並導入 Bruno 取代 Postman；修復 Akamai log server 並完成 LDS → DataStream 2 IaC 化；建立 Serverless Lambda Terraform 模組與 Jenkins 自動化部署
- **資料庫、快取與部署自動化**：Aurora Read Replica 分散負載、版控平台資料庫 MySQL / PostgreSQL 併行維運、導入 RDS Proxy 解決高併發連線、Redis → Valkey 7 升級（部分舊系統續用 Redis）；主導 Airflow 2.0 升級（UAT / Production）；以 Go 開發 Jenkins 部署自動化（Geo-block 流程）；以 SQS 設計高流量訂單處理方案
- **雲端治理、資安與客戶專案**：GCP 權限限縮與 API key 治理；客戶專案環境建置與 CDN 網段白名單（Akamai / CloudFront）；以 AI 協助 DRM / WAF / CVE 稽核；憑證帳號整頓（Secrets Manager）；盤點並清理閒置 EC2 snapshots；引入 AWS Personalize、DynamoDB、Secrets Manager、Bedrock
- **系統整合與架構**：建置 S3 / NAS 混合儲存優化影音內容、實作 S3 生命週期自動清理；開發 Akamai IaC 自動化 CDN 快取管理；建置短網址服務；優化入口平台部署流程（build once, deploy anywhere）；建立 DynamoDB 監控儀表板並部署 DevOps Guru
- *Tools：AWS（Elemental / EKS / Aurora / RDS Proxy / DynamoDB / SQS / IVS / Personalize / Bedrock / Secrets Manager / DevOps Guru）、GCP、Airflow、Gitea、Vaultwarden、Akamai DataStream、Claude Code / Skills / MCP、Bruno、Terraform、Kubernetes、Go、PostgreSQL*

### Senior SRE Engineer · TrendMicro（趨勢科技） @@ 2021.09 – 2024.03
- 執行多次災難復原演練（DR Drill）與維護視窗（Maintenance Window），並負責各類事件處理（Incident Response）
- 優化雲端成本：盤點並移除閒置 / 低使用資源、優化資料傳輸、調整日誌設定
- 維運強化：Opsworks → ASG / SSM 遷移、建立端對端（E2E）監控機制、服務上線審查（Readiness Review）流程
- *Tools：AWS（Opsworks / ASG / SSM / CloudWatch）、Chef*

### Senior DevOps Engineer · GoFreight（聖學科技） @@ 2020.10 – 2021.09
- 容器化取代 VM dev / stage 環境；於 CI/CD 管線執行單元測試，提升管線效能與可靠度
- 建置 Kubernetes（EKS）達成高可用架構與滾動升級
- 建置 ELK 集中化日誌管理；導入 Filebeat 蒐集各服務日誌
- EC2 最佳化機型 + RI 降低雲端成本
- 將 MySQL 5.6 升至 8.0、升級 DMS 引擎並修復 DMS 任務；升級 UTM
- Jenkins worker 支援尖峰自動擴展並整合 GitHub
- 部署並排障客戶 GoFreight FMS 系統
- *Tools：Ansible、Terraform、Docker、Node.js、Nginx、ELK、Filebeat、GitHub、Jenkins、AWS、EKS、Redis、Django、Vagrant*

### Senior DevOps Engineer · CATCHPLAY @@ 2019.02 – 2020.10
- 打造一鍵式 CI/CD 管線供 RD 一鍵部署多環境
- 建立壓力測試環境（Locust / JMeter）定位系統效能瓶頸；校準 AWS 負載平衡設定
- 以 Airflow 取代 cronjob 排程，重構部分 ETL 自動化流程
- 善用 EC2 Spot + RI 降低雲端成本
- 撰寫監控腳本 + Slack 告警；以 Lambda 整併多來源日誌
- 容器化標準化元件（多層映像檔）
- 以 Curator 維護 Elasticsearch 索引生命週期；調整 Logstash 解析規則優化日誌入庫
- *Tools：Ansible、Terraform、Docker、ELK、GitLab、Jenkins、AWS、Airflow、RabbitMQ、ECS、Lambda、Locust、JMeter*

### DevOps Automation Engineer · Groundhog Technologies（現觀科技） @@ 2018.09 – 2019.02
- 部署 DSP / DMP（線上即時廣告競標）container image 至客戶 Linux 環境
- 移除冗餘元件、調整服務設定，提升系統效能
- 開發伺服器間連線監控工具，主動偵測節點異常
- 導入 Kubernetes、GitLab CI/CD、Ansible 強化部署自動化
- 稽查防火牆設定、修補安全弱點，提升資安等級
- *Tools：Docker、Kafka、Zookeeper、ELK、Grafana、Prometheus、Kubernetes、Ansible、GitLab CI/CD、GCP、MongoDB、Redis*

### Senior Java Web Engineer · Groundhog Technologies（現觀科技） @@ 2017.11 – 2018.09
- 維護並開發 CovMo（手機訊號優化）系統新功能；重構程式碼提升可讀性；優化 SQL 查詢效能
- *Tools：Java、JavaScript、GWT、Spring、Tomcat、MySQL*

### Senior Java Web Engineer · Bank SinoPac（永豐） @@ 2015.04 – 2017.11
- 訪談使用者釐清需求，從零打造投信四大流程電子化系統（投資報告、簽核流程、開單交易、風控（事前 / 即時 / 事後）、績效分析、軌跡紀錄）；以 ZK、Hibernate、JMS、GSON 建置多項 RESTful Web 服務
- *Tools：Java、ZK、Hibernate、JMS、GSON、Tomcat、ActiveMQ、MSSQL*

### Senior System Engineer · Gping Construction（集品建設） @@ 2014.03 – 2015.04
- 強化防火牆設定、升級網路拓樸（routing、VLAN、NAT）
- 以 Acronis 建置備援伺服器
- *Tools：Windows Server、Acronis、Network Administration*

### System Engineer · Gobooks Publishing（高寶出版） @@ 2012.09 – 2014.03
- 升級 Windows AD（2000 → 2008）與 Exchange（2000 → 2007）；以 P2V 遷移老舊系統、VMware 建置 HA、建置備援與資料備份
- 汰換 Fortigate → Cyberoam UTM；導入 Sophos 防毒中控台；建置 WSUS 補丁集中管理
- 成功處置一次阻斷服務（DoS）攻擊事件
- *Tools：Windows Server、VMware、Hyper-V、Exchange、AD、WSUS、UTM、ERP*

## 精選專案

<Projects />

## 認證

- **Red Hat**：RHCE（EX200 / EX300）
- **資安 / 網路**：CEH（312-50）· ENSA（312-38）· CCNSP · CCNA（640-802）
- **Microsoft**：MCITP（Windows Server 2008 R2：70-646 / 640 / 642）· MCSA · MCTS · MOS Master
- **Java**：OCPJP7（1Z0-803 / 804）· SCJP
- **SRE / 事件管理**：PagerDuty Incident Responder
- **其他**：國際貿易大會考 · 人身保險業務員（壽險公會）

## 專業訓練

- **恆逸資訊**「網路系統整合工程師就業認證養成班」（2012.02 – 07）：正課 516 小時 / 總時數 626 小時，結業成績全班第三名
- **恆逸資訊**「EC-Council CEH 駭客技術專家認證課程」（2013，40 小時）
- **巨匠電腦**「Android APP 培訓課程（含 OCPJP）」（2013 – 14，264 小時）
- **巨匠電腦**「OCPJWCD（原 SCWCD）」（2014，48 小時）
- **多奇教育訓練**「企業級 LLM 叢集部署實戰 — 以推論 DeepSeek-R1 671B 滿血版模型為例」（2025.03，實作認證）

## 學歷

- **東吳大學** 工商管理學士（BBA）· 國貿系（2007 – 2012）— 機動車輛研究社 副社長、合氣道社、青年領袖學堂 小組長
- **國立臺南第一高級中學** 第三類組（2004 – 2007）— 資訊社

## 語言

- 中文（母語）· 台語（流利）· English（專業工作能力 · TOEIC 845）· 日語（基礎）
