---
layout: resume
variant: ai
lang: en
compact: true
name: 陳建豪
nameEn: Jimmy Chen
role: AI Engineer · DevOps / SRE
summary: 13 years of cloud / DevOps / SRE foundations, recently focused on AI / agentic engineering — self-hosting an AI platform, building Claude Code skills and agentic workflows, and knowledge-base automation — bringing AI into production and operations on the back of deep AWS operations and automation experience.
contacts:
  - text: jimc1682000@gmail.com
    href: mailto:jimc1682000@gmail.com
  - text: github.com/jimc1682000
    href: https://github.com/jimc1682000
  - text: linkedin.com/in/594jimmychen
    href: https://www.linkedin.com/in/594jimmychen
  - text: Taipei, Taiwan
pdf: /pdf/resume-ai-en.pdf
---

## Core Skills

- **AI / Agentic**: Claude Code, skills / MCP, agentic workflows, RAG / knowledge-base automation, harness guardrails, AWS Bedrock
- **Cloud / Platform**: AWS (deep), GCP, Kubernetes, EKS, Docker, ECS
- **IaC / CI-CD**: Terraform, Ansible, Gitea, Jenkins, Go
- **Observability**: Prometheus, Grafana, ELK / EFK, CloudWatch, DevOps Guru
- **Languages**: Python, Java, JavaScript, Bash, Go
- **Databases**: MySQL, PostgreSQL, Aurora, DynamoDB, MongoDB, Redis

## AI / Agentic Engineering

- Led the team's coding-agent toolchain evolution (command → plugin → skill); built reusable knowledge-base and credential-management skills for DevOps / SRE operations
- Built a knowledge-base automation pipeline (raw → digest → semantic search / NotebookLM) integrated with Jira / Notion; shared HITL practices publicly and open-sourced the ai-kb methodology
- Self-host and operate an AI platform (OpenClaw on VPS), bringing agentic workflows into production operations

## Experience

### Staff DevOps Engineer · CATCHPLAY @@ 2024.04 – Present
- Led the team's coding-agent toolchain (command → plugin → skill), shipping reusable knowledge-base and credential skills; co-built an EKS reference environment with AI-assisted guardrails (pre-commit secret scan, PR gates, layered secret scanning)
- Sole owner of the GitLab → Gitea migration; built Vaultwarden and rolled out Bitwarden; evaluated and adopted Bruno to replace Postman
- Built a FAST-channel monitoring platform (weekly reports, real-time alerts, LINE Bot / Slack notifications); integrated AWS Elemental streaming (MediaLive / MediaPackage / MediaTailor, DRM, Global Accelerator, SPEKE, IVS)
- Built reusable Serverless Lambda Terraform modules and Jenkins automation; developed Jenkins deployment automation in Go (geo-block workflow)
- Re-architected the data layer: Aurora read replicas, MySQL → PostgreSQL migration, RDS Proxy, Redis / Valkey 7 split migration; led the Airflow 2.0 upgrade; built a DynamoDB monitoring dashboard and adopted DevOps Guru
- Multi-cloud governance and security: GCP permission tightening and API-key cleanup; AI-assisted DRM / WAF / CVE audits; Akamai LDS → DataStream 2 IaC; client-project environments and CDN network allowlists
- Evaluated and rolled out AWS Bedrock, Secrets Manager, and Personalize; used SQS for a major telco partner's high-volume orders; designed S3 + NAS hybrid storage and Akamai IaC CDN automation

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

### System Engineer · Gobooks Publishing @@ 2012.09 – 2014.03
- Upgraded Windows AD (2000 → 2008) and Exchange; built HA with VMware, ran P2V migrations for legacy systems, and set up a WSUS server

## Selected Projects

<Projects />

## Education, Certifications & Languages

- **Education**: Soochow University, B.A. (2007 – 2012) · Tainan First Senior High School (2004 – 2007)
- **Certifications**: OCPJP7 · CEH · RHCE · MCITP · CCNA
- **Languages**: Chinese (native) · English (professional working proficiency · TOEIC 845)
