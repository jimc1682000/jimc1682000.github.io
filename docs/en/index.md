---
layout: resume
variant: general
lang: en
compact: true
name: 陳建豪
nameEn: Jimmy Chen
role: DevOps / SRE / AI Engineer
summary: 13 years across IT infrastructure and software engineering, with 5+ years focused on DevOps / SRE. I combine backend development (Java / Python) with large-scale cloud platform operations, and improve reliability through IaC, observability, and automation — recently bringing AI / agentic workflows into operations.
contacts:
  - text: jimc1682000@gmail.com
    href: mailto:jimc1682000@gmail.com
  - text: github.com/jimc1682000
    href: https://github.com/jimc1682000
  - text: linkedin.com/in/594jimmychen
    href: https://www.linkedin.com/in/594jimmychen
  - text: New Taipei, Taiwan
pdf: /pdf/resume-general-en.pdf
otherLang: /
otherLangLabel: 中文
otherVariant: /en/platform
otherVariantLabel: Platform / SRE Focus
---

## Core Skills

- **Cloud / Platform**: AWS (deep), GCP, Kubernetes, EKS, Docker, ECS
- **IaC / CI-CD**: Terraform, Ansible, GitLab CI, Jenkins
- **Observability**: Prometheus, Grafana, ELK / EFK, CloudWatch, DevOps Guru
- **Languages**: Java, Python, JavaScript, Bash
- **Databases**: MySQL, PostgreSQL, Aurora, DynamoDB, MongoDB, Redis
- **AI / Agentic**: AWS Bedrock, Claude Code, agentic workflows, RAG / knowledge-base automation

## AI / Agentic Engineering

- Self-host and operate an AI platform (OpenClaw on VPS); build Claude Code skills and agentic workflows applied to DevOps / SRE operations
- Built a knowledge-base automation pipeline (distill, publish, semantic search) integrated with Slack / Jira / Notion

## Experience

### Staff DevOps Engineer · CATCHPLAY @@ 2024.04 – Present
- Re-architected the data layer: introduced Aurora MySQL read replicas for load distribution, migrated MySQL to PostgreSQL, and adopted RDS Proxy to resolve high-concurrency connection bottlenecks
- Built an AWS Elemental media streaming pipeline (MediaLive / MediaPackage / MediaTailor) integrated with DRM content protection
- Upgraded Airflow to 2.0 across UAT and Production; built a DynamoDB monitoring dashboard and adopted AWS DevOps Guru to detect RDS anomalies
- Evaluated and rolled out AWS Bedrock AI tooling and Secrets Manager; used SQS to relieve Telkomsel high-volume order-processing bottlenecks
- Stood up an AWS Personalize environment and delivered recommendation features to BI / Backend teams; introduced DynamoDB for the CP4.0 platform
- Designed an S3 + NAS hybrid storage architecture and Akamai IaC CDN automation; redesigned the partner upload flow and lifecycle management

### Senior SRE Engineer · TrendMicro @@ 2021.09 – 2024.03
- Ran multiple disaster-recovery drills and maintenance windows, and owned cross-service incident response
- Optimized cloud cost by auditing and decommissioning idle / low-utilization resources, and tuned data transfer and logging
- Drove the Opsworks → ASG / SSM migration, built end-to-end (E2E) monitoring, and established a service readiness review process

### Senior DevOps Engineer · GoFreight @@ 2020.10 – 2021.09
- Replaced dev / stage environments with containers and ran unit tests in the CI/CD pipeline to improve reliability
- Built EKS for high availability and rolling upgrades; introduced ELK for centralized log management
- Cut cost with EC2 RIs / right-sized instances and DMS migrations; upgraded MySQL from 5.6 to 8.0; added autoscaling Jenkins workers for peak load

### Senior DevOps Engineer · CATCHPLAY @@ 2019.02 – 2020.10
- Built a stress-test environment to locate system bottlenecks; created a one-click CI/CD pipeline for multi-environment deployment
- Replaced cron jobs and ETL with Airflow; used EC2 Spot / RIs to cut cost; consolidated logs with Lambda
- Standardized components via containers and managed log parsing with ELK + Curator

### Senior Java / DevOps Engineer · Groundhog Tech @@ 2017.11 – 2019.02
- Deployed DSP / DMP systems with improved performance and security; introduced Kubernetes, Ansible, and GitLab CI/CD
- Maintained and extended the CovMo signal-optimization system; refactored code and tuned SQL queries

### Senior Java Web Engineer · Bank SinoPac @@ 2015.04 – 2017.11
- Gathered requirements from users and built an investment-workflow system and RESTful web services from the ground up

### Senior System Engineer · Gping Construction @@ 2014.03 – 2015.04
- Hardened firewall and network topology; built a backup server with Acronis

### System Engineer · Global Publishing @@ 2012.09 – 2014.03
- Upgraded Windows AD (2000 → 2008) and Exchange; built HA with VMware, ran P2V migrations for legacy systems, and set up a WSUS server

## Selected Projects

<Projects />

## Education, Certifications & Languages

- **Education**: Soochow University, B.A. (2007 – 2012) · Tainan First Senior High School (2004 – 2007)
- **Certifications**: OCPJP7 · CEH · RHCE · MCITP · CCNA
- **Languages**: Chinese (native) · English (professional working proficiency · TOEIC 845)
