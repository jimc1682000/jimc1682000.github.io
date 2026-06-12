---
layout: resume
variant: platform
lang: en
compact: true
name: 陳建豪
nameEn: Jimmy Chen
role: Senior Platform Engineer
summary: 13 years across IT infrastructure and cloud platforms. Linux systems administration (RHCE), KVM/VMware virtualisation, and HAProxy HA architecture — extending into large-scale Kubernetes/EKS platform engineering. Deploys infrastructure automation with Ansible / Terraform / Go, and brings hands-on SRE depth in incident response, DR drills, and full-stack observability with Prometheus / Grafana / ELK.
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
pdf: /pdf/resume-platform-en.pdf
---

## Core Skills

<Skills />

## Impact Highlights

- Self-built a full OKD 4.4 (OpenShift upstream) cluster (two physical KVM/QEMU hosts, HAProxy / BIND / NFS / pfSense end-to-end)
- Sole owner of the GitLab → Gitea migration: hundreds of repos, the whole engineering org, < 2h off-peak cutover
- Built a multi-channel event-driven FAST monitoring platform (CloudWatch → SNS → Lambda, Terraform IaC)
- Led the Airflow 1.x → 2.0 upgrade (UAT + Production, carrying many DAGs)
- Cloud cost optimization: EC2 RIs / Fargate Spot ~20% each, MediaLive Reservations ~50%

## Platform Engineering Core Competencies

- **Virtualisation / HA**: KVM/QEMU OKD 4.4 full cluster (HAProxy / BIND / NFS / pfSense); VMware vSphere HA + P2V migrations; HAProxy multi-backend load balancing; EKS rolling upgrades; Aurora Read Replica + RDS Proxy HA; multiple DR drills at TrendMicro
- **Linux / Networking / Storage**: RHCE certified; yum server for centralised RPM; Kubernetes node-level cgroup / namespace; FCOS ignition; pfSense DHCP/NAT/Firewall; BIND DNS; NFS persistent storage; iptables / VPN
- **Automation / IaC**: Ansible (DSP/DMP deployments, OKD4 playbooks, Kubernetes + Gitea / Jenkins); Terraform (Lambda modules, EKS infra, Akamai DataStream 2, multiple AWS services); Go / Bash (Geo-block automation, yum/RPM scripts, OKD4 bootstrap)
- **Observability**: FAST-channel monitoring (LINE Bot / Slack; weekly reports + alert heatmaps); DynamoDB dashboard + DevOps Guru anomaly detection; centralised ELK logging; end-to-end (E2E) monitoring
- **Incident Response / SRE**: cross-service incident response at TrendMicro; Service Readiness Review; multiple DR drills / resilience tests; pre-commit / PR-gate guardrails

## Experience

### Staff DevOps Engineer · CATCHPLAY @@ 2024.04 – Present
- Built an EKS reference environment with Ansible + Terraform; deployed guardrails (pre-commit secret scan, PR gates, layered secret scanning)
- Built a multi-channel event-driven FAST monitoring platform (CloudWatch → SNS → Lambda → Slack / LINE, heatmaps, automated weekly reports, Terraform IaC); added DynamoDB dashboard + DevOps Guru
- Re-architected HA database layer: Aurora read replicas, MySQL / PostgreSQL parallel operation, RDS Proxy (bursts of thousands of connections), Redis 5 → Valkey 7 upgrade (cost + EOL, some legacy systems retained); led Airflow 1.x → 2.0 upgrade (UAT + Production, many DAGs)
- Sole owner of GitLab → Gitea migration (hundreds of repos, the whole engineering org, < 2h off-peak cutover); built serverless Lambda Terraform modules and Jenkins automation; developed Geo-block deployment in Go
- Used SQS to handle high-volume telco partner orders
- Integrated AWS Elemental streaming (DRM, Global Accelerator, SPEKE, IVS); migrated Akamai LDS → DataStream 2 via IaC
- Multi-cloud governance: GCP permission hardening, Secrets Manager cleanup, WAF / CVE audits; audited and removed idle EC2 snapshots

### Senior SRE Engineer · TrendMicro @@ 2021.09 – 2024.03
- Owned cross-service incident response; ran regular DR drills / resilience tests (every six months to quarterly, 5–6+ over tenure) and maintenance windows
- Built end-to-end (E2E) monitoring and a Service Readiness Review process
- Drove Opsworks → ASG / SSM migration; audited and decommissioned idle resources

### Senior DevOps Engineer · GoFreight @@ 2020.10 – 2021.09
- Built EKS for high availability and rolling upgrades; replaced dev / stage environments with containers
- Introduced centralised ELK logging; added autoscaling Jenkins workers for peak load
- Cut cost with EC2 RIs / right-sizing; upgraded MySQL 5.6 → 8.0 and the DMS engine

### Senior DevOps Engineer · CATCHPLAY @@ 2019.02 – 2020.10
- Built a one-click CI/CD pipeline for multi-environment deployment
- Set up load-test environments (Locust / JMeter) to locate performance bottlenecks
- Replaced cron jobs with Airflow scheduling; refactored part of the ETL automation
- Centralised log management with ELK + Curator; tuned Logstash parsing rules

### Senior Java / DevOps Engineer · Groundhog Tech @@ 2017.11 – 2019.02
- Deployed DSP / DMP container images to customer Linux environments with Ansible
- Introduced Kubernetes and GitLab CI/CD; hardened system performance and security

### Early Career @@ 2012 – 2017
- **Bank SinoPac · Senior Java Web Engineer** (2015 – 2017): investment-workflow system and RESTful web services from scratch (Java backend)
- **Gping / Gobooks · System Engineer** (2012 – 2015): firewall & network topology (routing / VLAN / NAT), Acronis backup, VMware vSphere HA + P2V, Windows AD / Exchange, WSUS

## Selected Projects

<Projects />

## Education, Certifications & Languages

- **Education**: Soochow University, B.A. (2007 – 2012) · Tainan First Senior High School (2004 – 2007)
- **Certifications**: RHCE · CEH · OCPJP7 · MCITP · CCNA
- **Languages**: Chinese (native) · English (professional working proficiency · TOEIC 845)
