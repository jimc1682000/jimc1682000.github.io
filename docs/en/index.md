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
  - text: jimc1682000.blogspot.com
    href: https://jimc1682000.blogspot.com
  - text: Taipei / Tainan
pdf: /pdf/resume-ai-en.pdf
---

## Core Skills

<Skills />

## Impact Highlights

- Led the team coding-agent toolchain, shipping 5 shared skills (adopted org-wide in DevOps, bw rolling out to the Tech team)
- Self-hosted / open-weight LLM inference evaluation (open-weight MoE on AWS GPU EC2) + an LLM-as-judge eval loop (film-brain nDCG@5 0.93 → 0.96)
- Sole owner of the GitLab → Gitea migration: hundreds of repos, the whole engineering org, < 2h off-peak cutover
- Cloud cost optimization: EC2 RIs / Fargate Spot ~20% each, MediaLive Reservations ~50%

## AI / Agentic Engineering

- Built a knowledge-base automation pipeline (raw → digest → semantic search / NotebookLM) integrated with Jira / Notion; shared HITL practices publicly and open-sourced the ai-kb methodology
- Self-host and operate an AI platform (OpenClaw on VPS), bringing agentic workflows into production operations
- Business foundation × AI-agent governance: a management lens on multi-agent orchestration and ops decisions — guardrails ≈ accountability controls, scoped authorization ≈ delegation, harness / loop ≈ organizational design

## Experience

### Staff DevOps Engineer · CATCHPLAY @@ 2024.04 – Present
- Led the team's coding-agent toolchain (command → plugin → skill), shipping reusable knowledge-base and account & secrets management skills; co-built an EKS reference environment with AI-assisted guardrails (pre-commit secret scan, PR gates, layered secret scanning); member of the ai-squad (a Tech-Lead-formed AI initiative)
- Sole owner of the GitLab → Gitea migration (hundreds of repos, the whole engineering org, < 2h off-peak cutover); built Vaultwarden and rolled out Bitwarden; evaluated and adopted Bruno to replace Postman
- Built a multi-channel event-driven FAST monitoring platform (CloudWatch → SNS → Lambda → Slack / LINE, alert heatmaps, automated weekly reports, Terraform IaC); integrated AWS Elemental (MediaLive / MediaPackage / MediaTailor, DRM, Global Accelerator, SPEKE, IVS)
- Built reusable Serverless Lambda Terraform modules and Jenkins automation; developed Geo-block deployment automation in Go
- Re-architected the data layer: Aurora read replicas, MySQL / PostgreSQL parallel operation, RDS Proxy (absorbing bursts of thousands of simultaneous connections), Redis 5 → Valkey 7 upgrade (cost + EOL); led the Airflow 1.x → 2.0 upgrade (UAT + Production, many DAGs); built a DynamoDB monitoring dashboard + DevOps Guru
- Multi-cloud governance and security: GCP permission tightening and API-key cleanup; AI-assisted DRM / WAF / CVE audits; Akamai LDS → DataStream 2 IaC; audited and cleaned up idle EC2 snapshots; client-project environments and CDN network allowlists
- Used SQS for a major telco partner's high-volume orders; evaluated and rolled out AWS Bedrock, Secrets Manager, and Personalize; designed S3 + NAS hybrid storage and Akamai IaC CDN automation

### Senior SRE Engineer · TrendMicro @@ 2021.09 – 2024.03
- Multiple DR drills / maintenance windows + cross-service incident response; audited and decommissioned idle resources for cost, tuned data transfer and logging
- Drove the Opsworks → ASG / SSM migration; built E2E monitoring and a service readiness review process

### Senior DevOps Engineer · GoFreight @@ 2020.10 – 2021.09
- Built EKS for HA and rolling upgrades; containerized dev / stage environments with CI/CD unit tests; introduced ELK for centralized logging
- EC2 RIs / right-sizing for cost; MySQL 5.6 → 8.0 + DMS upgrade; autoscaling Jenkins workers integrated with GitHub

### Senior DevOps Engineer · CATCHPLAY @@ 2019.02 – 2020.10
- One-click CI/CD pipeline for multi-environment deploys; stress-test environment to locate bottlenecks; replaced cron jobs with Airflow, refactored ETL
- EC2 Spot / RIs for cost; Lambda log consolidation; ELK + Curator centralized logging; containerized component standardization

### Senior Java / DevOps Engineer · Groundhog Tech @@ 2017.11 – 2019.02
- Deployed DSP / DMP systems; introduced Kubernetes, Ansible, GitLab CI/CD for automation; audited firewall for security
- Maintained and extended the CovMo signal-optimization system; refactored code and tuned SQL queries

### Early Career @@ 2012 – 2017
- **Bank SinoPac · Senior Java Web Engineer** (2015 – 2017): built an investment-workflow system and RESTful web services from the ground up (Java backend)
- **Gping Construction / Gobooks Publishing · System Engineer** (2012 – 2015): firewall & network topology, Acronis backup, Windows AD / Exchange upgrades, VMware HA + P2V, WSUS

## Selected Projects

<Projects />

## Education, Certifications & Languages

- **Education**: Soochow University, B.A. (2007 – 2012) · Tainan First Senior High School (2004 – 2007)
- **Certifications**: RHCE · CEH · OCPJP7 · MCITP · CCNA
- **Languages**: Chinese (native) · English (professional working proficiency · TOEIC 845)
