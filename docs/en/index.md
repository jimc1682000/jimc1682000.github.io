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
- Built a ~30-channel event-driven FAST monitoring platform (Terraform IaC)

## AI / Agentic Engineering

- Led the team's coding-agent toolchain evolution (command → plugin → skill); built reusable knowledge-base and account & secrets management skills for DevOps / SRE operations
- Built a knowledge-base automation pipeline (raw → digest → semantic search / NotebookLM) integrated with Jira / Notion; shared HITL practices publicly and open-sourced the ai-kb methodology
- Self-host and operate an AI platform (OpenClaw on VPS), bringing agentic workflows into production operations
- Self-hosted / open-weight LLM inference evaluation: assessed larger open-weight MoE models (gemma-4-26B-A4B-it, Qwen3.6-35B-A3B) on AWS GPU EC2 as self-hosting candidates; separately ran query expansion + an LLM-as-judge eval pipeline via Ollama on no-GPU hardware (model selection MoE 35B → 8B dense @ NPU, with inference-infra fixes — streaming cancel, retry warmup, output budget)
- Business foundation × AI-agent governance: a management lens on multi-agent orchestration and ops decisions — guardrails ≈ accountability controls, scoped authorization ≈ delegation, harness / loop ≈ organizational design

## Experience

### Staff DevOps Engineer · CATCHPLAY @@ 2024.04 – Present
- Led the team's coding-agent toolchain (command → plugin → skill), shipping reusable knowledge-base and account & secrets management skills; co-built an EKS reference environment with AI-assisted guardrails (pre-commit secret scan, PR gates, layered secret scanning); member of the ai-squad (a Tech-Lead-formed AI initiative)
- Sole owner of the GitLab → Gitea migration (hundreds of repos, the whole engineering org, < 2h off-peak cutover); built Vaultwarden and rolled out Bitwarden; evaluated and adopted Bruno to replace Postman
- Built a ~30-channel event-driven FAST monitoring platform (CloudWatch → SNS → Lambda → Slack / LINE, alert heatmaps, automated weekly reports, Terraform IaC)
- Integrated AWS Elemental streaming (MediaLive / MediaPackage / MediaTailor, DRM, Global Accelerator, SPEKE, IVS)
- Built reusable Serverless Lambda Terraform modules and Jenkins automation; developed Jenkins deployment automation in Go (geo-block workflow)
- Re-architected the data layer: Aurora read replicas, MySQL / PostgreSQL parallel operation, RDS Proxy (absorbing bursts of thousands of simultaneous connections), Redis 5 → Valkey 7 upgrade (cost + EOL, some legacy systems retained); led the Airflow 1.x → 2.0 upgrade (UAT + Production, ~180 DAGs)
- Built a DynamoDB monitoring dashboard and adopted DevOps Guru
- Multi-cloud governance and security: GCP permission tightening and API-key cleanup; AI-assisted DRM / WAF / CVE audits; Akamai LDS → DataStream 2 IaC; audited and cleaned up idle EC2 snapshots; client-project environments and CDN network allowlists
- Used SQS to handle a major telco partner's high-volume orders
- Evaluated and rolled out AWS Bedrock, Secrets Manager, and Personalize; designed S3 + NAS hybrid storage and Akamai IaC CDN automation

### Senior SRE Engineer · TrendMicro @@ 2021.09 – 2024.03
- Ran multiple disaster-recovery drills and maintenance windows, and owned cross-service incident response
- Optimized cloud cost by auditing and decommissioning idle / low-utilization resources, and tuned data transfer and logging
- Drove the Opsworks → ASG / SSM migration, built end-to-end (E2E) monitoring, and established a service readiness review process

### Senior DevOps Engineer · GoFreight @@ 2020.10 – 2021.09
- Replaced dev / stage environments with containers and ran unit tests in the CI/CD pipeline to improve reliability
- Built EKS for high availability and rolling upgrades; introduced ELK for centralized log management
- Cut cost with EC2 RIs / right-sized instances; upgraded MySQL 5.6 to 8.0 and the DMS engine
- Added autoscaling Jenkins workers for peak load

### Senior DevOps Engineer · CATCHPLAY @@ 2019.02 – 2020.10
- Created a one-click CI/CD pipeline for multi-environment deployment; built a stress-test environment to locate performance bottlenecks
- Replaced cron jobs with Airflow scheduling; refactored part of the ETL automation
- Cut cloud cost with EC2 Spot / RIs; consolidated multi-source logs with Lambda
- Standardized components via containers; managed log parsing with ELK + Curator

### Senior Java / DevOps Engineer · Groundhog Tech @@ 2017.11 – 2019.02
- Deployed DSP / DMP systems and tuned performance; introduced Kubernetes, Ansible, and GitLab CI/CD to strengthen automation
- Audited firewall settings to improve system security
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
