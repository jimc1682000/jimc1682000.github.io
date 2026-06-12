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

## Platform / Infrastructure Highlights

- **Virtualisation**: deployed a full OKD 4.4 (OpenShift upstream) cluster on two physical KVM/QEMU hosts, covering HAProxy / BIND / NFS / pfSense end-to-end; earlier built enterprise VMware vSphere HA environments and performed P2V migrations
- **HA architecture**: HAProxy multi-backend load balancing (API 6443 / MCS 22623 / Ingress 80/443); Kubernetes EKS rolling upgrades; multiple DR drills and resilience tests at TrendMicro; Aurora Read Replica + RDS Proxy HA at CATCHPLAY
- **Linux systems**: RHCE certified; ran a yum server for centralised RPM distribution (CATCHPLAY); Kubernetes node-level cgroup / namespace management (EKS); Fedora CoreOS (FCOS) ignition provisioning
- **Networking / Storage**: pfSense DHCP / NAT / firewall rules; BIND DNS forward/reverse zones; NFS persistent storage (OKD4 Image Registry PV); iptables / VPN

## Automation / IaC

- **Ansible**: DSP/DMP deployment at Groundhog; OKD4 node playbooks; Kubernetes + Gitea / Jenkins standardised deployments
- **Terraform**: serverless Lambda modules; EKS infra; Akamai DataStream 2 IaC; multiple AWS services
- **Go / Bash**: Jenkins Geo-block deploy automation; yum / RPM management scripts; OKD4 bootstrap automation

## Observability / Incident Response

- FAST-channel monitoring (LINE Bot / Slack; weekly reports + alert heatmaps); DynamoDB dashboard + DevOps Guru anomaly detection
- Cross-service incident response at TrendMicro; E2E monitoring; Service Readiness Review; centralised ELK logging

## Experience

### Staff DevOps Engineer · CATCHPLAY @@ 2024.04 – Present
- Built an EKS reference environment with Ansible + Terraform; deployed guardrails (pre-commit secret scan, PR gates, layered secret scanning)
- Built a FAST-channel monitoring platform (weekly reports, real-time alerts, heatmaps, LINE Bot / Slack notifications); added DynamoDB dashboard + DevOps Guru
- Re-architected HA database layer: Aurora read replicas, MySQL → PostgreSQL migration, RDS Proxy, Redis / Valkey 7 split migration; led Airflow 2.0 upgrade
- Sole owner of GitLab → Gitea migration; built serverless Lambda Terraform modules and Jenkins automation; developed Geo-block deployment in Go
- Used SQS to handle high-volume telco partner orders
- Integrated AWS Elemental streaming (DRM, Global Accelerator, SPEKE, IVS); migrated Akamai LDS → DataStream 2 via IaC
- Multi-cloud governance: GCP permission hardening, Secrets Manager cleanup, WAF / CVE audits; audited and removed idle EC2 snapshots

### Senior SRE Engineer · TrendMicro @@ 2021.09 – 2024.03
- Owned cross-service incident response; ran multiple DR drills / resilience tests and maintenance windows
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

### Senior Java Web Engineer · Bank SinoPac @@ 2015.04 – 2017.11
- Built an investment-workflow system and RESTful web services from scratch (Java backend)

### Senior System Engineer · Gping Construction @@ 2014.03 – 2015.04
- Designed and hardened enterprise firewall rules and network topology (routing, VLAN, NAT)
- Built backup/recovery with Acronis; managed Windows Server infrastructure

### System Engineer · Gobooks Publishing @@ 2012.09 – 2014.03
- Built VMware vSphere HA environment (VM clustering) and performed P2V migrations
- Upgraded Windows AD (2000 → 2008) and Exchange; deployed WSUS for centralised patch management

## Selected Projects

<Projects />

## Education, Certifications & Languages

- **Education**: Soochow University, B.A. (2007 – 2012) · Tainan First Senior High School (2004 – 2007)
- **Certifications**: RHCE · OCPJP7 · CEH · MCITP · CCNA
- **Languages**: Chinese (native) · English (professional working proficiency · TOEIC 845)
