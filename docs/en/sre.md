---
layout: resume
variant: sre
lang: en
compact: true
name: 陳建豪
nameEn: Jimmy Chen
role: SRE / DevOps Engineer
summary: 13 years across IT infrastructure and backend development, 5+ years focused on DevOps / SRE, centered on the Kubernetes platform lifecycle, observability, and system reliability. I combine backend development (Java / Python) with large-scale cloud platform architecture and operations, and am experienced in incident response, disaster-recovery / resilience drills, and design / readiness reviews — while bringing AI / agentic workflows into operational automation.
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
pdf: /pdf/resume-sre-en.pdf
---

## Core Skills

<Skills />

## Impact Highlights

- Regular DR / resilience drills at TrendMicro (every six months to quarterly, 5–6+ over tenure) across multiple core services
- Led the Airflow 1.x → 2.0 upgrade (UAT + Production, carrying many DAGs)
- Built a multi-channel event-driven FAST monitoring platform (CloudWatch → SNS → Lambda → Slack / LINE, Terraform IaC)
- High concurrency / scale: RDS Proxy absorbing bursts of thousands of connections, Aurora read replicas, SQS for high-volume orders
- Cloud cost optimization: EC2 RIs / Fargate Spot ~20% each, MediaLive Reservations ~50%

## SRE / Reliability Core Competencies

- **Kubernetes platform**: built an EKS reference environment with rolling upgrades; standardized deployment with Kubernetes, Ansible, Gitea / Jenkins
- **Observability**: FAST-channel monitoring platform, DynamoDB dashboard + DevOps Guru anomaly detection, centralized ELK logging, end-to-end (E2E) monitoring
- **Reliability / SRE**: cross-service incident response, multiple DR / resilience drills, service readiness reviews; pre-commit / PR-gate guardrails in production workflows
- **High concurrency / scale**: RDS Proxy absorbing bursts of thousands of connections, Aurora read replicas, Redis 5 → Valkey 7 upgrade, SQS for a major telco partner's high-volume orders
- Led the team's coding-agent toolchain evolution (command → plugin → skill); built knowledge-base and account & secrets management skills for DevOps / SRE automation
- Built a knowledge-base automation pipeline (raw → distill → semantic search) integrated with Jira / Notion to speed up incident analysis and documentation

## Experience

### Staff DevOps Engineer · CATCHPLAY @@ 2024.04 – Present
- Built a multi-channel event-driven FAST monitoring platform (CloudWatch → SNS → Lambda → Slack / LINE, alert heatmaps, automated weekly reports, Terraform IaC); strengthened observability with a DynamoDB dashboard and DevOps Guru
- Co-built an EKS reference environment with AI-assisted guardrails (pre-commit secret scan, PR gates, layered secret scanning)
- Re-architected the data layer: Aurora read replicas, MySQL / PostgreSQL parallel operation, RDS Proxy (bursts of thousands of connections), Redis 5 → Valkey 7 upgrade (cost + EOL, some legacy systems retained); led the Airflow 1.x → 2.0 upgrade (UAT + Production, many DAGs)
- Sole owner of the GitLab → Gitea migration (hundreds of repos, the whole engineering org, < 2h off-peak cutover); built Serverless Lambda Terraform modules and Jenkins automation; developed geo-block deployment automation in Go
- Used SQS to handle a major telco partner's high-volume order throughput
- Integrated AWS Elemental streaming (DRM, Global Accelerator, SPEKE, IVS); migrated Akamai LDS → DataStream 2 via IaC
- Multi-cloud governance and security: GCP permission tightening, Secrets Manager credential cleanup, DRM / WAF / CVE audits; audited and cleaned up idle EC2 snapshots; client-project environments and CDN network allowlists

### Senior SRE Engineer · TrendMicro @@ 2021.09 – 2024.03
- Owned cross-service incident response; ran regular disaster-recovery drills (resilience testing, every six months to quarterly, 5–6+ over tenure across multiple core services) and maintenance windows
- Built end-to-end (E2E) monitoring and established a service readiness review process
- Drove the Opsworks → ASG / SSM migration; audited and decommissioned idle resources to cut cloud cost and tune logging

### Senior DevOps Engineer · GoFreight @@ 2020.10 – 2021.09
- Built EKS (Kubernetes) for high availability and rolling upgrades; replaced dev / stage environments with containers
- Introduced ELK for centralized logging; ran unit tests in the CI/CD pipeline to improve reliability
- Cut cost with EC2 RIs / right-sizing; upgraded MySQL 5.6 → 8.0 and upgraded the DMS engine
- Added autoscaling Jenkins workers for peak load

### Senior DevOps Engineer · CATCHPLAY @@ 2019.02 – 2020.10
- Created a one-click CI/CD pipeline for multi-environment deployment; built a stress-test environment (Locust / JMeter) to locate performance bottlenecks
- Replaced cron jobs with Airflow scheduling; refactored part of the ETL automation
- Standardized components via containers (multi-layer images)
- Centralized log management with ELK + Curator; tuned Logstash parsing rules
- Cut cloud cost with EC2 Spot / RIs; consolidated multi-source logs with Lambda

### Senior Java / DevOps Engineer · Groundhog Tech @@ 2017.11 – 2019.02
- Introduced Kubernetes, Ansible, and GitLab CI/CD; deployed DSP / DMP systems with improved performance and security
- Maintained and extended the CovMo signal-optimization system; refactored code and tuned SQL queries

### Early Career @@ 2012 – 2017
- **Bank SinoPac · Senior Java Web Engineer** (2015 – 2017): built an investment-workflow system and RESTful web services from scratch (Java backend)
- **Gping / Gobooks · System Engineer** (2012 – 2015): firewall & network topology, Acronis backup, Windows AD / Exchange, VMware HA + P2V

## Selected Projects

<Projects />

## Education, Certifications & Languages

- **Education**: Soochow University, B.A. (2007 – 2012) · Tainan First Senior High School (2004 – 2007)
- **Certifications**: RHCE · CEH · OCPJP7 · MCITP · CCNA
- **Languages**: Chinese (native) · English (professional working proficiency · TOEIC 845)
