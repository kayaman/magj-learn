---
title: Diagramas CI/CD Pipeline
description: Diagramas Mermaid para visualização de pipelines CI/CD
sidebar:
  order: 5
tableOfContents:
  minHeadingLevel: 2
  maxHeadingLevel: 4
---

## Diagramas CI/CD Pipeline

## Diagrama 1: GitFlow Strategy

```mermaid
gitGraph
    commit id: "Initial"
    branch develop
    checkout develop
    commit id: "Setup project"

    branch feature/user-auth
    checkout feature/user-auth
    commit id: "Add login"
    commit id: "Add tests"
    checkout develop
    merge feature/user-auth tag: "v0.1.0-dev"

    branch feature/dashboard
    checkout feature/dashboard
    commit id: "Create dashboard"
    commit id: "Add charts"
    checkout develop
    merge feature/dashboard

    branch release/v1.0.0
    checkout release/v1.0.0
    commit id: "Update version"
    commit id: "Fix bugs"

    checkout main
    merge release/v1.0.0 tag: "v1.0.0"

    checkout develop
    merge release/v1.0.0

    checkout main
    branch hotfix/critical-bug
    commit id: "Fix production issue"
    checkout main
    merge hotfix/critical-bug tag: "v1.0.1"

    checkout develop
    merge hotfix/critical-bug
```

---

## Diagrama 2: Pipeline Completo - Visão Geral

```mermaid
flowchart TD
    A[Developer Local] -->|git commit| B[Pre-commit Hooks]
    B -->|✅ Pass| C[git push]
    B -->|❌ Fail| A

    C -->|Create PR| D[CI Pipeline - PR Stage]

    D --> E[Static Analysis]
    D --> F[Build & Unit Tests]
    D --> G[Security Scan]

    E -->|✅| H{All Checks Pass?}
    F -->|✅| H
    G -->|✅| H

    E -->|❌| I[Block PR]
    F -->|❌| I
    G -->|❌| I

    H -->|Yes| J[Code Review]
    H -->|No| I

    J -->|Approved| K[Merge to develop]
    J -->|Changes Requested| A

    K --> L[Integration Tests]
    L -->|✅| M[Deploy to DEV]
    L -->|❌| N[Notify Team]

    M --> O{Ready for Release?}

    O -->|Yes| P[Create Release Branch]
    O -->|No| A

    P --> Q[Deploy to HML]
    Q --> R[E2E Tests]
    Q --> S[Performance Tests]
    Q --> T[Security Tests]

    R -->|✅| U{All Tests Pass?}
    S -->|✅| U
    T -->|✅| U

    U -->|Yes| V[Manual QA]
    U -->|No| N

    V -->|Approved| W[Merge to main]
    V -->|Rejected| A

    W --> X[Tag Release]
    X --> Y[Deploy to PRD]

    Y --> Z[Canary Deploy 10%]
    Z --> AA[Monitor Metrics]
    AA -->|Healthy| AB[Expand to 50%]
    AA -->|Unhealthy| AC[Auto Rollback]

    AB --> AD[Monitor Metrics]
    AD -->|Healthy| AE[Full Deploy 100%]
    AD -->|Unhealthy| AC

    AE --> AF[Post-Deploy Validation]
    AF -->|✅| AG[Success! 🎉]
    AF -->|❌| AC

    AC --> AH[Incident Response]

    style A fill:#e1f5ff
    style M fill:#c8e6c9
    style Q fill:#fff9c4
    style Y fill:#ffccbc
    style AG fill:#4caf50,color:#fff
    style AC fill:#f44336,color:#fff
```

---

## Diagrama 3: Pipeline Detalhado por Fase

```mermaid
flowchart TB
    subgraph LOCAL["🏠 LOCAL - Developer Machine"]
        L1[Write Code] --> L2[git add]
        L2 --> L3[Pre-commit Hook Triggered]
        L3 --> L4[Linting]
        L3 --> L5[Formatting]
        L3 --> L6[Type Check]
        L3 --> L7[Secret Scan]
        L4 --> L8{All Pass?}
        L5 --> L8
        L6 --> L8
        L7 --> L8
        L8 -->|Yes| L9[Commit Created]
        L8 -->|No| L10[Fix Issues]
        L10 --> L1
    end

    subgraph PR["📝 PULL REQUEST Stage"]
        P1[Push to Remote] --> P2[Create PR]
        P2 --> P3[Trigger CI]

        P3 --> P4[Static Analysis]
        P3 --> P5[Build]
        P3 --> P6[Unit Tests]
        P3 --> P7[Security SAST]
        P3 --> P8[Dependency Check]

        P4 --> P9{Quality Gates}
        P5 --> P9
        P6 --> P9
        P7 --> P9
        P8 --> P9

        P9 -->|✅ 80%+ coverage<br/>✅ No critical bugs<br/>✅ Build success| P10[Ready for Review]
        P9 -->|❌| P11[Fix Required]
    end

    subgraph DEV["🔧 DEV Environment"]
        D1[Merge to develop] --> D2[Integration Tests]
        D2 --> D3[Build Docker Image]
        D3 --> D4[Push to Registry]
        D4 --> D5[Deploy to K8s/ECS]
        D5 --> D6[Health Checks]
        D6 --> D7[Smoke Tests]
        D7 -->|✅| D8[Notify: Deploy Success]
        D7 -->|❌| D9[Rollback & Alert]
    end

    subgraph HML["✅ HML Environment"]
        H1[Create release/v*.*.*] --> H2[Deploy Infrastructure]
        H2 --> H3[Blue-Green Deploy]
        H3 --> H4[Database Migration]
        H4 --> H5[E2E Tests Suite]
        H5 --> H6[Performance Tests]
        H5 --> H7[Security DAST]
        H5 --> H8[Accuracy Tests AI/ML]

        H6 --> H9{All Tests Pass?}
        H7 --> H9
        H8 --> H9

        H9 -->|✅| H10[Manual QA]
        H9 -->|❌| H11[Debug & Fix]

        H10 -->|Approved| H12[Ready for Production]
        H10 -->|Rejected| H11
    end

    subgraph PRD["🚀 PRODUCTION Environment"]
        Pr1[Merge to main] --> Pr2[Create Git Tag]
        Pr2 --> Pr3[Generate Changelog]
        Pr3 --> Pr4[Build Production Image]
        Pr4 --> Pr5[Security Scan Image]
        Pr5 -->|✅| Pr6[Canary Deploy 10%]
        Pr5 -->|❌| Pr7[Block Deploy]

        Pr6 --> Pr8[Monitor 15min]
        Pr8 -->|Error rate OK<br/>Latency OK| Pr9[Expand to 50%]
        Pr8 -->|Metrics Bad| Pr10[Auto Rollback]

        Pr9 --> Pr11[Monitor 30min]
        Pr11 -->|Healthy| Pr12[Full Deploy 100%]
        Pr11 -->|Unhealthy| Pr10

        Pr12 --> Pr13[Synthetic Tests]
        Pr13 -->|✅| Pr14[Success!]
        Pr13 -->|❌| Pr10

        Pr10 --> Pr15[Incident & Post-Mortem]
    end

    L9 --> P1
    P10 --> D1
    D8 --> H1
    H12 --> Pr1

    style L9 fill:#81c784
    style P10 fill:#81c784
    style D8 fill:#81c784
    style H12 fill:#81c784
    style Pr14 fill:#4caf50,color:#fff
    style Pr10 fill:#f44336,color:#fff
```

---

## Diagrama 4: Estratégia de Deploy Progressivo

```mermaid
flowchart LR
    subgraph Phase1["Phase 1: Canary - 10% Traffic"]
        P1A[Deploy v2.0<br/>to 10% pods] --> P1B[Route 10%<br/>traffic]
        P1B --> P1C{Monitor<br/>15 min}
        P1C -->|"Error rate: 0.1%<br/>Latency: normal<br/>CPU: normal"| P1D[✅ Healthy]
        P1C -->|"Error rate: >1%<br/>or Latency spike"| P1E[❌ Rollback]
    end

    subgraph Phase2["Phase 2: Expansion - 50% Traffic"]
        P2A[Deploy v2.0<br/>to 50% pods] --> P2B[Route 50%<br/>traffic]
        P2B --> P2C{Monitor<br/>30 min}
        P2C -->|"All metrics OK<br/>No errors"| P2D[✅ Healthy]
        P2C -->|"Issues detected"| P2E[❌ Rollback]
    end

    subgraph Phase3["Phase 3: Full Deploy - 100% Traffic"]
        P3A[Deploy v2.0<br/>to 100% pods] --> P3B[Route 100%<br/>traffic]
        P3B --> P3C{Final<br/>Validation}
        P3C -->|"Production stable"| P3D[✅ Complete]
        P3C -->|"Critical issue"| P3E[❌ Rollback]
    end

    subgraph Monitoring["Continuous Monitoring"]
        M1[Prometheus Metrics]
        M2[Error Rate]
        M3[Latency p50/p99]
        M4[CPU/Memory]
        M5[Business KPIs]
        M6[Synthetic Tests]

        M1 --> M7[Grafana Dashboard]
        M2 --> M7
        M3 --> M7
        M4 --> M7
        M5 --> M7
        M6 --> M7

        M7 --> M8{Auto-trigger<br/>Rollback?}
    end

    Start([Deploy Initiated]) --> P1A
    P1D --> P2A
    P2D --> P3A

    P1E --> Rollback[Restore v1.9]
    P2E --> Rollback
    P3E --> Rollback
    M8 -->|Yes| Rollback

    Rollback --> Incident[Incident<br/>Investigation]
    P3D --> Success([Deploy Success 🎉])

    P1C -.Monitor.-> M7
    P2C -.Monitor.-> M7
    P3C -.Monitor.-> M7

    style Start fill:#2196f3,color:#fff
    style Success fill:#4caf50,color:#fff
    style Rollback fill:#f44336,color:#fff
    style P1D fill:#81c784
    style P2D fill:#81c784
    style P3D fill:#4caf50,color:#fff
    style P1E fill:#ef5350,color:#fff
    style P2E fill:#ef5350,color:#fff
    style P3E fill:#ef5350,color:#fff
```

---

## Diagrama 5: Fluxo de Hotfix Emergencial

```mermaid
flowchart TD
    A[🔥 Critical Bug<br/>Detected in PRD] --> B{Severity?}

    B -->|P0 - Critical| C[Create hotfix/<br/>from main]
    B -->|P1/P2| D[Normal Flow<br/>via develop]

    C --> E[Implement Fix]
    E --> F[Unit Tests]
    F --> G{Tests Pass?}

    G -->|No| E
    G -->|Yes| H[Create PR]

    H --> I[Fast-track Review<br/>1 Approver Only]
    I --> J[Emergency CI<br/>Unit + Critical Tests]

    J --> K{CI Pass?}
    K -->|No| E
    K -->|Yes| L[Deploy to HML]

    L --> M[Quick E2E<br/>Critical Flows Only]
    M --> N{Tests Pass?}

    N -->|No| E
    N -->|Yes| O[Manual Validation<br/>by On-call]

    O -->|Approved| P[Merge to main]
    O -->|Rejected| E

    P --> Q[Direct Deploy PRD<br/>Skip Canary]

    Q --> R[Monitor Closely<br/>15 minutes]
    R --> S{Production<br/>Stable?}

    S -->|Yes| T[Backport to develop]
    S -->|No| U[Immediate Rollback]

    T --> V[Create Post-Mortem]
    U --> W[Debug & Retry]

    V --> X[Document Incident]
    X --> Y[Update Runbooks]

    style A fill:#ff5252,color:#fff
    style C fill:#ffa726,color:#fff
    style Q fill:#ff9800,color:#fff
    style T fill:#4caf50,color:#fff
    style U fill:#f44336,color:#fff

    classDef urgent fill:#ff5252,color:#fff
    classDef warning fill:#ffa726
    classDef success fill:#4caf50,color:#fff
```

---

## Diagrama 6: Ambientes e Fluxo de Dados

```mermaid
graph TB
    subgraph Developer["👨‍💻 Developer"]
        Dev[Local Machine]
    end

    subgraph VCS["📦 Version Control"]
        Git[Git Repository<br/>GitHub/GitLab]
        PR[Pull Requests]
    end

    subgraph CI["⚙️ CI/CD Platform"]
        Actions[GitHub Actions /<br/>GitLab CI]
        Runners[Self-hosted<br/>Runners]
    end

    subgraph Registry["📦 Artifact Storage"]
        Docker[Docker Registry<br/>ECR / ACR]
        Artifacts[Build Artifacts<br/>S3 / Blob]
    end

    subgraph Envs["🌐 Environments"]
        subgraph DEV_ENV["DEV"]
            DEV_K8s[Kubernetes<br/>Namespace: dev]
            DEV_DB[(Database<br/>dev)]
            DEV_Cache[(Redis<br/>dev)]
        end

        subgraph HML_ENV["HML"]
            HML_K8s[Kubernetes<br/>Namespace: staging]
            HML_DB[(Database<br/>staging)]
            HML_Cache[(Redis<br/>staging)]
        end

        subgraph PRD_ENV["PRD"]
            PRD_K8s[Kubernetes<br/>Namespace: prod]
            PRD_DB[(Database<br/>production)]
            PRD_Cache[(Redis<br/>production)]
            PRD_CDN[CDN<br/>CloudFront]
        end
    end

    subgraph Security["🔒 Security & Compliance"]
        Vault[HashiCorp Vault<br/>Secrets Management]
        SAST[SAST Scanner<br/>Semgrep]
        DAST[DAST Scanner<br/>OWASP ZAP]
        Container[Container Scan<br/>Trivy]
    end

    subgraph Monitoring["📊 Observability"]
        APM[APM<br/>Datadog/New Relic]
        Logs[Log Aggregation<br/>ELK Stack]
        Metrics[Metrics<br/>Prometheus]
        Alerts[Alerting<br/>PagerDuty]
    end

    Dev -->|git push| Git
    Git -->|webhook| Actions
    Actions -->|run on| Runners

    Runners -->|security scan| SAST
    Runners -->|security scan| Container
    Runners -->|build & push| Docker
    Runners -->|upload| Artifacts

    Docker -->|pull image| DEV_K8s
    Docker -->|pull image| HML_K8s
    Docker -->|pull image| PRD_K8s

    Actions -->|deploy| DEV_K8s
    Actions -->|deploy| HML_K8s
    Actions -->|deploy| PRD_K8s

    Vault -.secrets.-> DEV_K8s
    Vault -.secrets.-> HML_K8s
    Vault -.secrets.-> PRD_K8s

    HML_K8s -->|scan| DAST

    DEV_K8s -->|metrics| APM
    HML_K8s -->|metrics| APM
    PRD_K8s -->|metrics| APM

    DEV_K8s -->|logs| Logs
    HML_K8s -->|logs| Logs
    PRD_K8s -->|logs| Logs

    PRD_K8s -->|serves| PRD_CDN

    APM -->|alert| Alerts
    Metrics -->|alert| Alerts

    style DEV_ENV fill:#c8e6c9
    style HML_ENV fill:#fff9c4
    style PRD_ENV fill:#ffccbc
    style Security fill:#e1bee7
    style Monitoring fill:#b3e5fc
```

---

## Diagrama 7: Testing Strategy - Pirâmide de Testes

```mermaid
graph TD
    subgraph Pyramid["🔺 Testing Pyramid"]
        direction TB
        E2E["E2E Tests<br/>⏱️ Slow | 🎯 Few<br/>💰 Expensive<br/>---<br/>Critical User Flows<br/>5-10% of tests"]
        INT["Integration Tests<br/>⏱️ Medium | 🎯 Some<br/>💰 Moderate<br/>---<br/>API + DB + Services<br/>20-30% of tests"]
        UNIT["Unit Tests<br/>⏱️ Fast | 🎯 Many<br/>💰 Cheap<br/>---<br/>Business Logic<br/>60-70% of tests"]
    end

    subgraph When["📅 When to Run"]
        W1["Pre-commit:<br/>Fast Unit Tests<br/>< 30 seconds"]
        W2["PR Stage:<br/>All Unit Tests<br/>< 5 minutes"]
        W3["Post-merge:<br/>Integration Tests<br/>< 15 minutes"]
        W4["Pre-release:<br/>Full E2E Suite<br/>< 60 minutes"]
    end

    subgraph Types["🧪 Test Types"]
        T1["Unit Tests<br/>✅ Jest/Pytest<br/>✅ Fast Feedback<br/>✅ 80%+ Coverage"]
        T2["Integration Tests<br/>✅ API Tests<br/>✅ DB Tests<br/>✅ Service Mocking"]
        T3["E2E Tests<br/>✅ Cypress/Playwright<br/>✅ Real Browsers<br/>✅ Critical Paths"]
        T4["Performance Tests<br/>✅ Load Testing<br/>✅ Stress Testing<br/>✅ k6/JMeter"]
        T5["Security Tests<br/>✅ SAST<br/>✅ DAST<br/>✅ Penetration"]
    end

    subgraph AI_ML["🤖 AI/ML Specific"]
        ML1["Model Tests<br/>✅ Accuracy > 90%<br/>✅ Inference Speed<br/>✅ Resource Usage"]
        ML2["Data Tests<br/>✅ Data Drift<br/>✅ Schema Validation<br/>✅ Quality Checks"]
        ML3["A/B Tests<br/>✅ Champion/Challenger<br/>✅ Business Metrics<br/>✅ User Feedback"]
    end

    E2E -.runs in.-> W4
    INT -.runs in.-> W3
    UNIT -.runs in.-> W1
    UNIT -.runs in.-> W2

    UNIT --- T1
    INT --- T2
    E2E --- T3

    T2 -.also.-> T4
    T3 -.also.-> T5

    T1 -.for AI/ML.-> ML1
    T2 -.for AI/ML.-> ML2
    T3 -.for AI/ML.-> ML3

    style E2E fill:#ff9800,color:#fff
    style INT fill:#ffc107
    style UNIT fill:#4caf50,color:#fff
    style AI_ML fill:#9c27b0,color:#fff
```

---

## Diagrama 8: Matriz de Responsabilidades (RACI)

```mermaid
flowchart TD
    subgraph Roles["👥 Roles & Responsibilities"]
        DEV["Developer<br/>💻"]
        QA["QA Engineer<br/>🧪"]
        OPS["DevOps/SRE<br/>⚙️"]
        SEC["Security Team<br/>🔒"]
        PM["Product Manager<br/>📊"]
    end

    subgraph Activities["📋 Activities"]
        A1["Code Development<br/>R: DEV | A: DEV | C: QA | I: PM"]
        A2["Unit Testing<br/>R: DEV | A: DEV | C: QA"]
        A3["Code Review<br/>R: DEV | A: DEV | C: QA,OPS"]
        A4["Integration Tests<br/>R: QA | A: DEV | C: OPS"]
        A5["Security Scan<br/>R: SEC | A: SEC | C: DEV,OPS | I: ALL"]
        A6["E2E Testing<br/>R: QA | A: QA | C: DEV,PM"]
        A7["Deploy to DEV<br/>R: OPS | A: DEV | C: QA"]
        A8["Deploy to HML<br/>R: OPS | A: OPS | C: QA,PM"]
        A9["Production Deploy<br/>R: OPS | A: PM | C: DEV,QA,SEC"]
        A10["Monitoring<br/>R: OPS | A: OPS | C: DEV | I: ALL"]
        A11["Incident Response<br/>R: OPS | A: OPS | C: DEV,SEC | I: PM"]
    end

    DEV -.responsible.-> A1
    DEV -.responsible.-> A2
    DEV -.responsible.-> A3

    QA -.responsible.-> A4
    QA -.responsible.-> A6

    SEC -.responsible.-> A5

    OPS -.responsible.-> A7
    OPS -.responsible.-> A8
    OPS -.responsible.-> A9
    OPS -.responsible.-> A10
    OPS -.responsible.-> A11

    PM -.accountable.-> A9

    style DEV fill:#64b5f6
    style QA fill:#81c784
    style OPS fill:#ff9800,color:#fff
    style SEC fill:#e91e63,color:#fff
    style PM fill:#9c27b0,color:#fff

    style A9 fill:#f44336,color:#fff
```

---

## Como Usar Estes Diagramas

### No GitHub/GitLab

Os diagramas Mermaid são renderizados automaticamente em:

- README.md
- Pull Requests
- Issues
- Wiki pages

### Em Apresentações

1. **Copie o código Mermaid** para ferramentas como:

   - [Mermaid Live Editor](https://mermaid.live)
   - Draw.io (com plugin Mermaid)
   - VS Code (com extensão Mermaid)

2. **Exporte como imagem** (PNG/SVG) para PowerPoint/Google Slides

### Em Documentação

- Confluence suporta Mermaid via plugin
- Notion suporta blocos de código Mermaid
- Docusaurus/MkDocs renderizam Mermaid nativamente

---

## Legenda de Cores

- 🟢 **Verde** (#4caf50): Sucesso, aprovação, estado saudável
- 🔵 **Azul** (#2196f3): Processos normais, informação
- 🟡 **Amarelo** (#ffc107): Atenção, staging, validação
- 🟠 **Laranja** (#ff9800): Deploy, mudanças, cuidado
- 🔴 **Vermelho** (#f44336): Erro, rollback, crítico
- 🟣 **Roxo** (#9c27b0): Especializado (AI/ML, PM)
- 🟤 **Marrom** (#795548): Infraestrutura, dados
