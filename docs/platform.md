---
layout: resume
variant: platform
lang: zh
compact: true
name: 陳建豪
nameEn: Jimmy Chen
role: Senior Platform Engineer
summary: 13 年 IT 基礎架構與雲端平台經驗。Linux 系統管理（RHCE 認證）、KVM/VMware 虛擬化、HAProxy HA 架構設計，延伸至大規模 Kubernetes/EKS 平台工程。以 Ansible / Terraform / Go 落地自動化，具備 Incident Response、多次 DR 演練、Prometheus/Grafana/ELK 可觀測性等完整 SRE 實戰背景。
contacts:
  - text: jimc1682000@gmail.com
    href: mailto:jimc1682000@gmail.com
  - text: github.com/jimc1682000
    href: https://github.com/jimc1682000
  - text: linkedin.com/in/594jimmychen
    href: https://www.linkedin.com/in/594jimmychen
  - text: Taipei / Tainan
pdf: /pdf/resume-sre-zh.pdf
---

## 核心技能

<Skills />

## 平台 / 基礎架構亮點

- **虛擬化**：以 KVM/QEMU 於兩台實體機部署 OKD 4.4（OpenShift upstream）完整叢集，涵蓋 HAProxy / BIND / NFS / pfSense 全流程；早期以 VMware vSphere 建置企業 HA 環境並執行 P2V 遷移
- **HA 架構**：HAProxy 多 backend 負載均衡（API 6443 / MCS 22623 / Ingress 80/443 分流）；Kubernetes EKS 滾動升級；TrendMicro 多次 DR Drill / 韌性演練；CATCHPLAY Aurora Read Replica + RDS Proxy 高可用資料庫架構
- **Linux 系統**：RHCE 認證；yum server 集中管理 RPM 套件（CATCHPLAY）；Kubernetes node 層 cgroup / namespace 管理（EKS）；FCOS（Fedora CoreOS）ignition 配置
- **網路 / 儲存**：pfSense DHCP/NAT/Firewall 規則管理；BIND DNS 正/反向 zone；NFS persistent storage（OKD4 registry PV / Image Registry）；iptables / VPN

## 自動化 / IaC

- **Ansible**：Groundhog DSP/DMP 系統部署自動化；OKD4 節點 Playbook；Kubernetes + Gitea / Jenkins 標準化部署
- **Terraform**：Serverless Lambda 模組；EKS infra；Akamai DataStream 2 IaC 化；多個 AWS 服務 IaC 化
- **Go / Bash**：Jenkins Geo-block 部署自動化；yum / RPM 管理腳本；OKD4 bootstrap 自動化腳本

## 可觀測性 / Incident Response

- FAST 頻道監控平台（LINE Bot / Slack；週報 + 告警熱力圖）；DynamoDB 儀表板 + DevOps Guru 異常偵測
- TrendMicro 跨服務 Incident Response；端對端（E2E）監控；Service Readiness Review 流程；ELK 集中化日誌（GoFreight / CATCHPLAY）

## 工作經歷

### Staff DevOps Engineer · CATCHPLAY @@ 2024.04 – 至今
- 以 Ansible + Terraform 建置 EKS 參考環境，落地 guardrails（pre-commit secret scan、PR gate、多層 secret scanning）
- 建置 FAST 頻道監控平台（週報、即時告警、告警熱力圖、LINE Bot / Slack 通知）；建置 DynamoDB 儀表板並導入 DevOps Guru
- 重構資料庫 HA 架構：Aurora Read Replica、MySQL → PostgreSQL 遷移、RDS Proxy、Redis / Valkey 7 切分遷移；主導 Airflow 2.0 升級（UAT / Production）
- 獨力完成 GitLab → Gitea 版控遷移；建立 Serverless Lambda Terraform 模組與 Jenkins 自動化部署；以 Go 開發 Geo-block 部署自動化
- 以 SQS 解決電信合作夥伴高量訂單瓶頸；整合 Elemental 媒體串流（DRM、Global Accelerator、SPEKE、IVS）；Akamai LDS → DataStream 2 IaC 化
- 多雲治理：GCP 權限限縮、Secrets Manager 憑證整頓、WAF / CVE 稽核；盤點清理閒置 EC2 snapshots

### Senior SRE Engineer · TrendMicro @@ 2021.09 – 2024.03
- 負責跨服務 Incident Response；執行多次 DR Drill / 韌性演練與 Maintenance Window
- 建立端對端（E2E）監控與 Service Readiness Review 流程
- 推動 Opsworks → ASG / SSM 遷移；盤點下線閒置資源優化雲端成本

### Senior DevOps Engineer · GoFreight @@ 2020.10 – 2021.09
- 建置 EKS 達成高可用（HA）與滾動升級；以容器化取代 dev / stage 環境
- 導入 ELK 集中化日誌；Jenkins worker 支援尖峰自動擴展
- EC2 RI / 機型優化 + DMS 遷移降低成本；MySQL 5.6 → 8.0 升級

### Senior DevOps Engineer · CATCHPLAY @@ 2019.02 – 2020.10
- 打造一鍵式 CI/CD 管線供研發部署多環境；建立壓力測試環境定位系統瓶頸
- 以 Airflow 取代 cronjob 與 ETL；以 ELK + Curator 集中化日誌

### Senior Java / DevOps Engineer · Groundhog Tech @@ 2017.11 – 2019.02
- 以 Ansible 部署並管理 DSP / DMP container image 至客戶 Linux 系統
- 導入 Kubernetes 與 GitLab CI/CD；強化效能調校與系統安全設定

### Senior Java Web Engineer · Bank SinoPac @@ 2015.04 – 2017.11
- 從零打造投資流程系統與 RESTful Web 服務（Java backend）

### Senior System Engineer · Gping Construction @@ 2014.03 – 2015.04
- 規劃並強化企業防火牆設定與網路拓樸（routing、VLAN、NAT）
- 以 Acronis 建置備援伺服器；管理 Windows Server 基礎架構

### System Engineer · Gobooks Publishing @@ 2012.09 – 2014.03
- 以 VMware vSphere 建置 HA 環境（VM clustering）並執行 P2V 遷移
- 升級 Windows AD（2000 → 2008）與 Exchange；建置 WSUS 補丁集中管理

## 精選專案

<Projects />

## 學歷、認證 & 語言

- **學歷**：東吳大學 學士（2007 – 2012）· 國立臺南第一高級中學（2004 – 2007）
- **認證**：RHCE · OCPJP7 · CEH · MCITP · CCNA
- **語言**：中文（母語）· English（專業工作能力 · TOEIC 845）
