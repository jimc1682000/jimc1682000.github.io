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

## Platform / Reliability Highlights

- **Kubernetes platform**: built an EKS reference environment with rolling upgrades; standardized deployment with Kubernetes, Ansible, Gitea / Jenkins
- **Observability**: FAST-channel monitoring platform, DynamoDB dashboard + DevOps Guru anomaly detection, centralized ELK logging, end-to-end (E2E) monitoring
- **Reliability / SRE**: cross-service incident response, multiple DR / resilience drills, service readiness reviews; pre-commit / PR-gate guardrails in production workflows
- **High concurrency / scale**: RDS Proxy for connection bottlenecks, Aurora read replicas, Redis / Valkey 7 migration, SQS for a major telco partner's high-volume orders

## AI / Agentic for Operations

- Led the team's coding-agent toolchain evolution (command → plugin → skill); built knowledge-base and account & secrets management skills for DevOps / SRE automation
- Built a knowledge-base automation pipeline (raw → distill → semantic search) integrated with Jira / Notion to speed up incident analysis and documentation

## Experience

### Staff DevOps Engineer · CATCHPLAY @@ 2024.04 – Present
- Built a FAST-channel monitoring platform (weekly reports, real-time alerts, alert heatmaps, LINE Bot / Slack notifications); strengthened observability with a DynamoDB dashboard and DevOps Guru
- Co-built an EKS reference environment with AI-assisted guardrails (pre-commit secret scan, PR gates, layered secret scanning)
- Re-architected the data layer: Aurora read replicas, MySQL → PostgreSQL migration, RDS Proxy, Redis / Valkey 7 split migration; led the Airflow 2.0 upgrade (UAT / Production)
- Sole owner of the GitLab → Gitea migration; built Serverless Lambda Terraform modules and Jenkins automation; developed geo-block deployment automation in Go
- Used SQS to handle a major telco partner's high-volume order throughput
- Integrated AWS Elemental streaming (DRM, Global Accelerator, SPEKE, IVS); migrated Akamai LDS → DataStream 2 via IaC
- Multi-cloud governance and security: GCP permission tightening, Secrets Manager credential cleanup, DRM / WAF / CVE audits; audited and cleaned up idle EC2 snapshots; client-project environments and CDN network allowlists

### Senior SRE Engineer · TrendMicro @@ 2021.09 – 2024.03
- Owned cross-service incident response; ran multiple disaster-recovery drills (resilience testing) and maintenance windows
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

### Senior Java Web Engineer · Bank SinoPac @@ 2015.04 – 2017.11
- Gathered user requirements and built an investment-workflow system and RESTful web services from scratch (Java backend)

### Earlier Experience @@ 2012 – 2015
- **Gping Construction · Senior System Engineer** (2014.03 – 2015.04): hardened firewall and network topology; built backup with Acronis
- **Gobooks Publishing · System Engineer** (2012.09 – 2014.03): upgraded Windows AD / Exchange; built HA with VMware

## Selected Projects

<Projects />

## Education, Certifications & Languages

- **Education**: Soochow University, B.A. (2007 – 2012) · Tainan First Senior High School (2004 – 2007)
- **Certifications**: OCPJP7 · CEH · RHCE · MCITP · CCNA
- **Languages**: Chinese (native) · English (professional working proficiency · TOEIC 845)
