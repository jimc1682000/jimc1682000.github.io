---
layout: resume
variant: platform
lang: en
compact: true
name: 陳建豪
nameEn: Jimmy Chen
role: SRE / Platform Engineer
summary: 13 years across IT infrastructure and backend development, 5+ years focused on DevOps / SRE, centered on the Kubernetes platform lifecycle, observability, and system reliability. I combine backend development (Java / Python) with large-scale cloud platform architecture and operations, and am experienced in incident response, disaster-recovery / resilience drills, and design / readiness reviews — while bringing AI / agentic workflows into operational automation.
contacts:
  - text: jimc1682000@gmail.com
    href: mailto:jimc1682000@gmail.com
  - text: github.com/jimc1682000
    href: https://github.com/jimc1682000
  - text: linkedin.com/in/594jimmychen
    href: https://www.linkedin.com/in/594jimmychen
  - text: New Taipei, Taiwan (open to relocation)
pdf: /pdf/resume-platform-en.pdf
otherLang: /platform
otherLangLabel: 中文
otherVariant: /en/
otherVariantLabel: General
---

## Core Skills

- **Kubernetes / Platform**: Kubernetes (hands-on networking / storage / controllers), EKS, Docker, ECS
- **Observability**: Prometheus, Grafana, ELK, CloudWatch, AWS DevOps Guru
- **Reliability / SRE**: incident response, DR / resilience drills, service readiness review, high-concurrency tuning
- **CI/CD / IaC**: GitLab CI, Jenkins, Terraform, Ansible
- **Backend / Languages**: Java, Python, JavaScript, Bash
- **Databases**: MySQL, PostgreSQL, Aurora, DynamoDB, Redis, MongoDB
- **AI / Agentic**: AWS Bedrock, Claude Code, agentic workflows, knowledge-base automation

## AI / Agentic for Operations

- Self-host and operate an AI platform (OpenClaw on VPS); build Claude Code skills and agentic workflows for DevOps / SRE automation
- Built a knowledge-base automation pipeline (distill, publish, semantic search) integrated with Slack / Jira / Notion to speed up incident analysis and documentation

## Experience

### Staff DevOps Engineer · CATCHPLAY @@ 2024.04 – Present
- Strengthened observability and reliability: built a DynamoDB monitoring dashboard and adopted AWS DevOps Guru to detect RDS anomalies
- Re-architected the data layer: Aurora MySQL read replicas, MySQL → PostgreSQL migration, and RDS Proxy to resolve high-concurrency connection bottlenecks
- Upgraded Airflow to 2.0 across UAT and Production; used SQS to relieve Telkomsel high-volume order processing
- Evaluated and rolled out AWS Bedrock AI tooling and Secrets Manager; stood up an AWS Personalize environment for BI / Backend teams
- Built an AWS Elemental media pipeline with DRM; designed an S3 + NAS hybrid store and Akamai IaC CDN automation

### Senior SRE Engineer · TrendMicro @@ 2021.09 – 2024.03
- Owned cross-service incident response; ran multiple disaster-recovery drills (resilience testing) and maintenance windows
- Built end-to-end (E2E) monitoring and established a service readiness review process
- Drove the Opsworks → ASG / SSM migration; audited and decommissioned idle resources to cut cloud cost and tune logging

### Senior DevOps Engineer · GoFreight @@ 2020.10 – 2021.09
- Built EKS (Kubernetes) for high availability and rolling upgrades; replaced dev / stage environments with containers
- Introduced ELK for centralized logging; ran unit tests in the CI/CD pipeline to improve reliability
- Cut cost with EC2 RIs / right-sizing and DMS migrations; upgraded MySQL 5.6 → 8.0; added autoscaling Jenkins workers

### Senior DevOps Engineer · CATCHPLAY @@ 2019.02 – 2020.10
- Built a stress-test environment to locate bottlenecks; created a one-click CI/CD pipeline for multi-environment deployment
- Replaced cron jobs and ETL with Airflow; standardized components via containers and managed log parsing with ELK + Curator
- Used EC2 Spot / RIs to cut cost; consolidated logs with Lambda

### Senior Java / DevOps Engineer · Groundhog Tech @@ 2017.11 – 2019.02
- Introduced Kubernetes, Ansible, and GitLab CI/CD; deployed DSP / DMP systems with improved performance and security
- Maintained and extended the CovMo signal-optimization system; refactored code and tuned SQL queries

### Senior Java Web Engineer · Bank SinoPac @@ 2015.04 – 2017.11
- Gathered user requirements and built an investment-workflow system and RESTful web services from scratch (Java backend)

### Earlier Experience @@ 2012 – 2015
- **Gping Construction · Senior System Engineer** (2014.03 – 2015.04): hardened firewall and network topology; built backup with Acronis
- **Global Publishing · System Engineer** (2012.09 – 2014.03): upgraded Windows AD / Exchange; built HA with VMware

## Selected Projects

<Projects />

## Education, Certifications & Languages

- **Education**: Soochow University, B.A. (2007 – 2012) · Tainan First Senior High School (2004 – 2007)
- **Certifications**: OCPJP7 · CEH · RHCE · MCITP · CCNA
- **Languages**: Chinese (native) · English (professional working proficiency · TOEIC 845)
