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
  - text: Taipei, Taiwan
pdf: /pdf/resume-detail-en.pdf
---

## Core Skills

- **Cloud / AWS**: EC2, S3, Lambda, RDS / Aurora, DynamoDB, Route 53, ECS, EKS, SQS, Bedrock, Personalize, Elemental, Secrets Manager, DevOps Guru
- **Containers / Orchestration**: Docker, Kubernetes, EKS, ECS, Vagrant
- **IaC / CI-CD**: Terraform, Ansible, GitLab CI/CD, Jenkins, GitHub
- **Observability / Logging**: Prometheus, Grafana, ELK (Elasticsearch / Logstash / Kibana / Filebeat / Curator), CloudWatch
- **Messaging / Streaming**: Kafka, Zookeeper, ActiveMQ, RabbitMQ, SQS
- **Databases**: MySQL, PostgreSQL, Aurora, MSSQL, MongoDB, Redis, DynamoDB
- **Backend / Languages**: Java, Python, JavaScript / Node.js, Bash, Spring, Hibernate, ZK, GWT, Django, JMS, GSON, RESTful
- **Systems / Network / Security**: Linux, Windows Server, VMware, Hyper-V, AD, Exchange, WSUS, UTM, TCP/IP, ethical hacking / penetration testing (CEH)
- **Testing / Load**: JMeter, Locust
- **AI / Agentic**: AWS Bedrock, Claude Code, agentic workflows, RAG / knowledge-base automation

## AI / Agentic Engineering

- Self-host and operate an AI platform (OpenClaw on VPS); build Claude Code skills and agentic workflows applied to DevOps / SRE operations
- Built a knowledge-base automation pipeline (distill, publish, semantic search) integrated with Slack / Jira / Notion

## Experience

### Staff DevOps Engineer · CATCHPLAY @@ 2024.04 – Present
- **Streaming media infrastructure**: integrated AWS Elemental (MediaLive / MediaPackage / MediaTailor), wired up DRM for content security, and coordinated cross-team integration to optimize the streaming architecture
- **Database optimization & migration**: deployed Aurora read replicas to distribute load, migrated the GitLab database from MySQL to PostgreSQL, adopted RDS Proxy for high-concurrency connections, and optimized & migrated the Airflow database to a replica
- **DevOps & monitoring**: built a DynamoDB monitoring dashboard for observability, deployed DevOps Guru for RDS anomaly detection, led the Airflow 2.0 upgrade (UAT / Production), and developed Akamai IaC for automated CDN cache management
- **Cloud services adoption**: introduced AWS Personalize for recommendations, brought in DynamoDB for the next-gen platform, promoted AWS Secrets Manager for security, and introduced AWS Bedrock AI services to the team
- **System integration & architecture**: designed high-traffic order processing with SQS, built S3 / NAS hybrid storage for video content, implemented S3 lifecycle auto-cleanup, and optimized the deployment pipeline for S3 integration
- *Tools: AWS (Elemental / Aurora / RDS Proxy / DynamoDB / SQS / Personalize / Bedrock / Secrets Manager / DevOps Guru), Airflow, Akamai, S3 / NAS, Terraform, PostgreSQL*

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

### DevOps Automation Engineer · Groundhog Technologies @@ 2018.08 – 2019.02
- Deployed DSP / DMP systems to customer environments; built connectivity-monitoring tools between servers; improved performance by removing redundant components / tuning settings
- Introduced Kubernetes, GitLab CI/CD, and Ansible to increase automation; hardened firewall settings and fixed vulnerabilities to raise the security level
- *Tools: Docker, Kafka, Zookeeper, ELK, Grafana, Prometheus, Kubernetes, Ansible, GitLab CI/CD, GCP, MongoDB, Redis*

### Senior Java Web Engineer · Groundhog Technologies @@ 2017.11 – 2018.09
- Maintained and built new features for the CovMo (cellphone signal optimization) system; refactored code for readability; tuned SQL queries for performance
- *Tools: Java, JavaScript, GWT, Spring, Tomcat, MySQL*

### Senior Java Web Engineer · Bank SinoPac @@ 2015.04 – 2017.11
- Gathered user requirements and built an investment-process system from the ground up; built multiple services with ZK, Hibernate, JMS, and GSON, many of them RESTful web services
- *Tools: Java, ZK, Hibernate, JMS, GSON, Tomcat, ActiveMQ, MSSQL*

### Senior System Engineer · Gping Construction @@ 2014.03 – 2015.04
- Hardened firewall settings and upgraded network topology; built a backup server with Acronis
- *Tools: Windows Server, Acronis, Network Administration*

### System Engineer · Gobooks Publishing @@ 2012.09 – 2014.03
- Upgraded Windows AD (2000 → 2008) and Exchange (2000 → 2007); ran P2V migrations for legacy systems and built HA with VMware; upgraded UTM and set up a WSUS server
- *Tools: Windows Server, VMware, Hyper-V, Exchange, AD, WSUS, UTM, ERP*

## Selected Projects

<Projects />

## Certifications

- CCNA (640-802) · MCITP Windows Server 2008 R2 (70-646 / 640 / 642) · RHCE (EX200 / EX300) · CEH (312-50) · ENSA (312-38) · CCNSP · MOS Master · OCPJP7 (1Z0-803 / 804)

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
