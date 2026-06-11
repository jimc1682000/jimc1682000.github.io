---
layout: resume
variant: detail
lang: en
name: 陳建豪
nameEn: Jimmy Chen
role: DevOps / SRE / AI Engineer
summary: A 13-year IT career spanning systems engineering, backend development, and DevOps / SRE. Starting in network and server operations, moving through Java web backend development, and in recent years specializing in large-scale cloud platform operations and automation. Experienced in AWS at scale, Kubernetes, observability, CI/CD, and information security (CEH), and bringing AI / agentic workflows into operations. Full history below.
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
pdf: /pdf/resume-detail-en.pdf
---

## Core Skills

<Skills />

## AI / Agentic Engineering

- Led the team's coding-agent toolchain evolution (command → plugin → skill); built reusable knowledge-base and account & secrets management skills for DevOps / SRE operations
- Built a knowledge-base automation pipeline (raw → distill → semantic search / NotebookLM) integrated with Jira / Notion; shared HITL practices publicly and open-sourced the ai-kb methodology
- Self-host and operate an AI platform (OpenClaw on VPS), bringing agentic workflows into production operations

## Infrastructure / Systems Platform

- **Virtualisation**: deployed a full OKD 4.4 (OpenShift upstream) cluster on two physical KVM/QEMU hosts, covering HAProxy / BIND / NFS / pfSense end-to-end; earlier built enterprise VMware vSphere HA environments and ran P2V migrations
- **HA architecture**: HAProxy multi-backend load balancing (API 6443 / MCS 22623 / Ingress 80/443); multiple DR drills / resilience tests at TrendMicro; Aurora Read Replica + RDS Proxy HA at CATCHPLAY
- **Linux systems**: RHCE certified; ran a yum server for centralised RPM distribution (CATCHPLAY); Kubernetes node-level cgroup / namespace management; FCOS ignition provisioning
- **Networking / Storage**: pfSense DHCP / NAT / Firewall; BIND DNS forward/reverse zones; NFS persistent storage (OKD4 registry PV); iptables / VPN

## Experience

### Staff DevOps Engineer · CATCHPLAY @@ 2024.04 – Present
- **AI collaboration & DevOps toolchain**: led the coding-agent toolchain (command → plugin → skill), shipping reusable knowledge-base and account & secrets management skills; co-built an EKS reference environment with guardrails (pre-commit secret scan, PR gates, layered secret scanning); shared HITL practices and the ai-kb methodology publicly
- **Streaming media & FAST channel**: built a FAST-channel monitoring platform (weekly reports, real-time alerts, alert heatmaps, LINE Bot / Slack notifications); integrated AWS Elemental (MediaLive / MediaPackage / MediaTailor), DRM, Global Accelerator, SPEKE, IVS, and Elemental Link; managed MediaLive reservation purchasing and cost
- **Platform modernization & service migration**: sole owner of the GitLab → Gitea migration; built Vaultwarden and rolled out Bitwarden; evaluated and adopted Bruno to replace Postman; fixed the Akamai log server and completed LDS → DataStream 2 IaC; built Serverless Lambda Terraform modules and Jenkins automation
- **Database, cache & deployment automation**: Aurora read replicas, VCS-platform database MySQL → PostgreSQL migration, RDS Proxy for high-concurrency connections, Redis / Valkey 7 split migration; led the Airflow 2.0 upgrade (UAT / Production); developed Jenkins deployment automation in Go (geo-block workflow); designed high-traffic order processing with SQS
- **Cloud governance, security & client projects**: GCP permission tightening and API-key cleanup; client-project environments and CDN network allowlists (Akamai / CloudFront); AI-assisted DRM / WAF / CVE audits; credential cleanup (Secrets Manager); audited and cleaned up idle EC2 snapshots; introduced AWS Personalize, DynamoDB, Secrets Manager, and Bedrock
- **System integration & architecture**: built S3 / NAS hybrid storage for video content and S3 lifecycle auto-cleanup; developed Akamai IaC for automated CDN cache management; built a short-link service; optimized portal deployment (build once, deploy anywhere); built a DynamoDB monitoring dashboard and deployed DevOps Guru
- *Tools: AWS (Elemental / EKS / Aurora / RDS Proxy / DynamoDB / SQS / IVS / Personalize / Bedrock / Secrets Manager / DevOps Guru), GCP, Airflow, Gitea, Vaultwarden, Akamai DataStream, Claude Code / skills / MCP, Bruno, Terraform, Kubernetes, Go, PostgreSQL*

### Senior SRE Engineer · TrendMicro @@ 2021.09 – 2024.03
- Performed multiple disaster-recovery drills and maintenance windows, and responded to a range of incidents (incident response)
- Optimized cloud cost by identifying and removing unused / low-utilization resources, tuning data transfer, and adjusting logging
- Strengthened operations: Opsworks → ASG / SSM migration, end-to-end (E2E) monitoring, and a service readiness review process
- *Tools: AWS (Opsworks / ASG / SSM / CloudWatch)*

### Senior DevOps Engineer · GoFreight @@ 2020.10 – 2021.09
- Containerization: replaced VM dev / stage environments, ran unit tests in the CI/CD pipeline, and improved pipeline performance and reliability
- Built Kubernetes (EKS) for HA and rolling upgrades; built an ELK stack for centralized log management
- Cost: right-sized EC2 instances + RIs; deployed / troubleshot the GoFreight FMS system for customers
- Upgraded MySQL to 8.0, upgraded the DMS engine and fixed DMS tasks, upgraded UTM; added autoscaling Jenkins workers and integrated GitHub
- *Tools: Ansible, Terraform, Docker, Node.js, Nginx, ELK, Filebeat, GitHub, Jenkins, AWS, EKS, Redis, Django, Vagrant*

### Senior DevOps Engineer · CATCHPLAY @@ 2019.02 – 2020.10
- Built a stress-test environment to find system bottlenecks; created a one-click CI/CD pipeline for RDs to deploy across environments; replaced cron jobs and some ETL with Airflow
- Used EC2 Spot and RIs to cut cost; wrote monitoring scripts with Slack alerts; used Lambda to consolidate logs and align load-balancer settings
- Standardized components via containers (multi-layer images); maintained Elasticsearch with Curator and tuned Logstash parsing rules
- *Tools: Ansible, Terraform, Docker, ELK, GitLab, Jenkins, AWS, Airflow, RabbitMQ, ECS, Lambda, Locust, JMeter*

### DevOps Automation Engineer · Groundhog Technologies @@ 2018.09 – 2019.02
- Deployed DSP / DMP (real-time ad bidding) container images to customer Linux environments; built connectivity-monitoring tools; removed redundant components and tuned settings for performance
- Introduced Kubernetes, GitLab CI/CD, and Ansible to increase automation; hardened firewall settings and fixed vulnerabilities
- *Tools: Docker, Kafka, Zookeeper, ELK, Grafana, Prometheus, Kubernetes, Ansible, GitLab CI/CD, GCP, MongoDB, Redis*

### Senior Java Web Engineer · Groundhog Technologies @@ 2017.11 – 2018.09
- Maintained and built new features for the CovMo (cellphone signal optimization) system; refactored code for readability; tuned SQL queries for performance
- *Tools: Java, JavaScript, GWT, Spring, Tomcat, MySQL*

### Senior Java Web Engineer · Bank SinoPac @@ 2015.04 – 2017.11
- Gathered user requirements and built, from the ground up, a system digitizing the four core investment-trust workflows (analysis reports, sign-off, order placement & trading, risk control (pre / real-time / post), performance analysis, audit trail); built multiple RESTful web services with ZK, Hibernate, JMS, and GSON
- *Tools: Java, ZK, Hibernate, JMS, GSON, Tomcat, ActiveMQ, MSSQL*

### Senior System Engineer · Gping Construction @@ 2014.03 – 2015.04
- Hardened firewall settings and upgraded network topology; built a backup server with Acronis
- *Tools: Windows Server, Acronis, Network Administration*

### System Engineer · Gobooks Publishing @@ 2012.09 – 2014.03
- Upgraded Windows AD (2000 → 2008) and Exchange (2000 → 2007); ran P2V migrations for legacy systems, built HA with VMware, and set up backup / DR
- Migrated Fortigate → Cyberoam UTM, deployed a Sophos antivirus console, set up WSUS; mitigated a denial-of-service (DoS) attack incident
- *Tools: Windows Server, VMware, Hyper-V, Exchange, AD, WSUS, UTM, ERP*

## Selected Projects

<Projects />

## Certifications

- **Red Hat**: RHCE (EX200 / EX300)
- **Security / Network**: CEH (312-50) · ENSA (312-38) · CCNSP · CCNA (640-802)
- **Microsoft**: MCITP (Windows Server 2008 R2: 70-646 / 640 / 642) · MCSA · MCTS · MOS Master
- **Java**: OCPJP7 (1Z0-803 / 804) · SCJP
- **SRE / Incident**: PagerDuty Incident Responder
- **Other**: International Trade Proficiency Exam · Life Insurance Agent (LIA-ROC)

## Professional Training

- **Uniforce** "Network Systems Integration Engineer certification program" (2012.02 – 07): 516 core hours / 626 total hours, graduated 3rd in class
- **Uniforce** "EC-Council CEH ethical hacking course" (2013, 40 hours)
- **PCSCHOOL** "Android app training (incl. OCPJP)" (2013 – 14, 264 hours)
- **PCSCHOOL** "OCPJWCD (formerly SCWCD)" (2014, 48 hours)

## Education

- **Soochow University** — B.B.A., International Trade (2007 – 2012); VP of the Motor Vehicle Club, Aikido Club, group leader in the Young Leaders program
- **Tainan First Senior High School** — Science track (2004 – 2007); Computer Club

## Languages

- Chinese (native) · Taiwanese (fluent) · English (professional working proficiency · TOEIC 845) · Japanese (basic)
