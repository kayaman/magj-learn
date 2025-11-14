---
title: Exemplos Práticos de Configuração CI/CD
description: Exemplos de código e configurações prontas para uso
sidebar:
  order: 4
tableOfContents:
  minHeadingLevel: 2
  maxHeadingLevel: 4
---

## Exemplos Práticos de Configuração CI/CD

## 1. GitHub Actions - Pipeline Completo

### `.github/workflows/ci-pr.yml` - Pipeline de Pull Request

```yaml
name: CI - Pull Request

on:
  pull_request:
    branches: [develop, main]
    types: [opened, synchronize, reopened]

env:
  NODE_VERSION: '20'
  PYTHON_VERSION: '3.11'

jobs:
  # Job 1: Lint e Formatação
  lint-and-format:
    name: 🔍 Lint & Format Check
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run ESLint
        run: npm run lint

      - name: Run Prettier
        run: npm run format:check

      - name: Check commit messages
        run: npx commitlint --from ${{ github.event.pull_request.base.sha }} --to HEAD

  # Job 2: Security Scan
  security-scan:
    name: 🔒 Security Analysis
    runs-on: ubuntu-latest
    permissions:
      security-events: write
      contents: read
    steps:
      - uses: actions/checkout@v4

      - name: Run Trivy vulnerability scanner
        uses: aquasecurity/trivy-action@master
        with:
          scan-type: 'fs'
          scan-ref: '.'
          format: 'sarif'
          output: 'trivy-results.sarif'
          severity: 'CRITICAL,HIGH'

      - name: Upload Trivy results to GitHub Security
        uses: github/codeql-action/upload-sarif@v3
        with:
          sarif_file: 'trivy-results.sarif'

      - name: Run Snyk Security Scan
        uses: snyk/actions/node@master
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
        with:
          args: --severity-threshold=high --fail-on=all

      - name: Detect Secrets
        uses: trufflesecurity/trufflehog@main
        with:
          path: ./
          base: ${{ github.event.repository.default_branch }}
          head: HEAD

  # Job 3: Build & Unit Tests
  build-and-test:
    name: 🏗️ Build & Test
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [18, 20]
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node ${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run TypeScript compiler
        run: npm run type-check

      - name: Build application
        run: npm run build

      - name: Run unit tests
        run: npm run test:unit -- --coverage --maxWorkers=2

      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v4
        with:
          token: ${{ secrets.CODECOV_TOKEN }}
          files: ./coverage/coverage-final.json
          flags: unittests
          name: codecov-${{ matrix.node-version }}

      - name: Archive build artifacts
        if: matrix.node-version == 20
        uses: actions/upload-artifact@v4
        with:
          name: build-artifacts
          path: dist/
          retention-days: 7

  # Job 4: SonarCloud Analysis
  sonarcloud:
    name: 📊 Code Quality Analysis
    runs-on: ubuntu-latest
    needs: [build-and-test]
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0 # Shallow clones should be disabled for better analysis

      - name: Download coverage artifacts
        uses: actions/download-artifact@v4

      - name: SonarCloud Scan
        uses: SonarSource/sonarcloud-github-action@master
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
        with:
          args: >
            -Dsonar.organization=your-org
            -Dsonar.projectKey=your-project
            -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info
            -Dsonar.qualitygate.wait=true
            -Dsonar.coverage.exclusions=**/*.test.ts,**/*.spec.ts

  # Job 5: Quality Gates
  quality-gates:
    name: ✅ Quality Gates
    runs-on: ubuntu-latest
    needs: [lint-and-format, security-scan, build-and-test, sonarcloud]
    steps:
      - name: Check all jobs passed
        run: echo "All quality gates passed! ✅"

      - name: Comment PR
        uses: actions/github-script@v7
        with:
          script: |
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: '✅ All CI checks passed! Ready for review.'
            })
```

---

### `.github/workflows/cd-dev.yml` - Deploy para DEV

```yaml
name: CD - Deploy to DEV

on:
  push:
    branches: [develop]

env:
  AWS_REGION: us-east-1
  ECR_REPOSITORY: my-app
  ECS_CLUSTER: dev-cluster
  ECS_SERVICE: my-app-service
  CONTAINER_NAME: my-app

jobs:
  integration-tests:
    name: 🧪 Integration Tests
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_DB: testdb
          POSTGRES_PASSWORD: postgres
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 5432:5432

      redis:
        image: redis:7
        options: >-
          --health-cmd "redis-cli ping"
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 6379:6379

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run database migrations
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/testdb
        run: npm run migrate

      - name: Run integration tests
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/testdb
          REDIS_URL: redis://localhost:6379
        run: npm run test:integration

      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: integration-test-results
          path: test-results/

  build-and-push:
    name: 🏗️ Build & Push Docker Image
    runs-on: ubuntu-latest
    needs: [integration-tests]
    outputs:
      image-tag: ${{ steps.image.outputs.tag }}
    steps:
      - uses: actions/checkout@v4

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ${{ env.AWS_REGION }}

      - name: Login to Amazon ECR
        id: login-ecr
        uses: aws-actions/amazon-ecr-login@v2

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Generate image tag
        id: image
        run: |
          SHORT_SHA=$(echo ${{ github.sha }} | cut -c1-7)
          TAG="dev-${SHORT_SHA}"
          echo "tag=${TAG}" >> $GITHUB_OUTPUT

      - name: Build and push Docker image
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: |
            ${{ steps.login-ecr.outputs.registry }}/${{ env.ECR_REPOSITORY }}:${{ steps.image.outputs.tag }}
            ${{ steps.login-ecr.outputs.registry }}/${{ env.ECR_REPOSITORY }}:dev-latest
          cache-from: type=gha
          cache-to: type=gha,mode=max
          build-args: |
            NODE_ENV=development
            BUILD_DATE=${{ github.event.head_commit.timestamp }}
            VCS_REF=${{ github.sha }}

      - name: Scan Docker image
        uses: aquasecurity/trivy-action@master
        with:
          image-ref: ${{ steps.login-ecr.outputs.registry }}/${{ env.ECR_REPOSITORY }}:${{ steps.image.outputs.tag }}
          format: 'table'
          exit-code: '1'
          severity: 'CRITICAL,HIGH'

  deploy-dev:
    name: 🚀 Deploy to DEV
    runs-on: ubuntu-latest
    needs: [build-and-push]
    environment:
      name: development
      url: https://dev.myapp.com
    steps:
      - uses: actions/checkout@v4

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ${{ env.AWS_REGION }}

      - name: Update ECS task definition
        id: task-def
        uses: aws-actions/amazon-ecs-render-task-definition@v1
        with:
          task-definition: .aws/task-definition-dev.json
          container-name: ${{ env.CONTAINER_NAME }}
          image: ${{ secrets.AWS_ACCOUNT_ID }}.dkr.ecr.${{ env.AWS_REGION }}.amazonaws.com/${{ env.ECR_REPOSITORY }}:${{ needs.build-and-push.outputs.image-tag }}

      - name: Deploy to ECS
        uses: aws-actions/amazon-ecs-deploy-task-definition@v1
        with:
          task-definition: ${{ steps.task-def.outputs.task-definition }}
          service: ${{ env.ECS_SERVICE }}
          cluster: ${{ env.ECS_CLUSTER }}
          wait-for-service-stability: true

      - name: Run smoke tests
        run: |
          echo "Waiting for deployment to be ready..."
          sleep 30

          # Health check
          curl -f https://dev.myapp.com/health || exit 1

          # Basic API test
          curl -f https://dev.myapp.com/api/status || exit 1

          echo "✅ Smoke tests passed!"

      - name: Notify Slack
        if: always()
        uses: slackapi/slack-github-action@v1
        with:
          payload: |
            {
              "text": "${{ job.status == 'success' && '✅' || '❌' }} DEV Deploy ${{ job.status }}",
              "blocks": [
                {
                  "type": "section",
                  "text": {
                    "type": "mrkdwn",
                    "text": "*DEV Deployment*\nStatus: ${{ job.status }}\nCommit: `${{ github.sha }}`\nAuthor: ${{ github.actor }}"
                  }
                }
              ]
            }
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK }}
```

---

### `.github/workflows/cd-production.yml` - Deploy para PRODUÇÃO

```yaml
name: CD - Production Deployment

on:
  push:
    branches: [main]
    tags:
      - 'v*.*.*'

env:
  AWS_REGION: us-east-1
  ECR_REPOSITORY: my-app
  ECS_CLUSTER: prod-cluster
  ECS_SERVICE: my-app-service

jobs:
  pre-production-checks:
    name: 🔍 Pre-Production Validation
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Validate semantic version tag
        if: startsWith(github.ref, 'refs/tags/')
        run: |
          TAG=${GITHUB_REF#refs/tags/}
          if [[ ! $TAG =~ ^v[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
            echo "Invalid version tag: $TAG"
            exit 1
          fi

      - name: Generate changelog
        id: changelog
        uses: mikepenz/release-changelog-builder-action@v4
        with:
          configuration: '.github/changelog-config.json'
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

      - name: Create GitHub Release
        if: startsWith(github.ref, 'refs/tags/')
        uses: actions/create-release@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          tag_name: ${{ github.ref_name }}
          release_name: Release ${{ github.ref_name }}
          body: ${{ steps.changelog.outputs.changelog }}
          draft: false
          prerelease: false

  build-production-image:
    name: 🏗️ Build Production Image
    runs-on: ubuntu-latest
    needs: [pre-production-checks]
    outputs:
      image-tag: ${{ steps.image.outputs.tag }}
    steps:
      - uses: actions/checkout@v4

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: ${{ secrets.AWS_PROD_ROLE_ARN }}
          aws-region: ${{ env.AWS_REGION }}

      - name: Login to Amazon ECR
        id: login-ecr
        uses: aws-actions/amazon-ecr-login@v2

      - name: Set image tag
        id: image
        run: |
          if [[ $GITHUB_REF == refs/tags/* ]]; then
            TAG=${GITHUB_REF#refs/tags/}
          else
            TAG="prod-$(echo ${{ github.sha }} | cut -c1-7)"
          fi
          echo "tag=${TAG}" >> $GITHUB_OUTPUT

      - name: Build production image
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: |
            ${{ steps.login-ecr.outputs.registry }}/${{ env.ECR_REPOSITORY }}:${{ steps.image.outputs.tag }}
            ${{ steps.login-ecr.outputs.registry }}/${{ env.ECR_REPOSITORY }}:latest
          build-args: |
            NODE_ENV=production
            BUILD_DATE=${{ github.event.head_commit.timestamp }}
            VERSION=${{ steps.image.outputs.tag }}
          cache-from: type=gha
          cache-to: type=gha,mode=max

      - name: Security scan of production image
        uses: aquasecurity/trivy-action@master
        with:
          image-ref: ${{ steps.login-ecr.outputs.registry }}/${{ env.ECR_REPOSITORY }}:${{ steps.image.outputs.tag }}
          format: 'sarif'
          output: 'trivy-results.sarif'
          severity: 'CRITICAL,HIGH,MEDIUM'

      - name: Upload Trivy results
        uses: github/codeql-action/upload-sarif@v3
        with:
          sarif_file: 'trivy-results.sarif'

      - name: Fail on critical vulnerabilities
        uses: aquasecurity/trivy-action@master
        with:
          image-ref: ${{ steps.login-ecr.outputs.registry }}/${{ env.ECR_REPOSITORY }}:${{ steps.image.outputs.tag }}
          format: 'table'
          exit-code: '1'
          severity: 'CRITICAL'

  deploy-canary:
    name: 🕯️ Canary Deploy (10%)
    runs-on: ubuntu-latest
    needs: [build-production-image]
    environment:
      name: production-canary
      url: https://app.myapp.com
    steps:
      - uses: actions/checkout@v4

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: ${{ secrets.AWS_PROD_ROLE_ARN }}
          aws-region: ${{ env.AWS_REGION }}

      - name: Deploy canary (10% traffic)
        run: |
          # Update task definition with new image
          aws ecs update-service \
            --cluster ${{ env.ECS_CLUSTER }} \
            --service ${{ env.ECS_SERVICE }}-canary \
            --force-new-deployment \
            --deployment-configuration "maximumPercent=200,minimumHealthyPercent=100"

      - name: Monitor canary metrics (15 min)
        run: |
          echo "Monitoring canary deployment for 15 minutes..."

          for i in {1..15}; do
            echo "Minute $i/15: Checking metrics..."
            
            # Check error rate from CloudWatch
            ERROR_RATE=$(aws cloudwatch get-metric-statistics \
              --namespace AWS/ECS \
              --metric-name HTTPCode_Target_5XX_Count \
              --dimensions Name=TargetGroup,Value=my-canary-tg \
              --start-time $(date -u -d '5 minutes ago' +%Y-%m-%dT%H:%M:%S) \
              --end-time $(date -u +%Y-%m-%dT%H:%M:%S) \
              --period 60 \
              --statistics Average \
              --query 'Datapoints[0].Average' \
              --output text)
            
            if (( $(echo "$ERROR_RATE > 1.0" | bc -l) )); then
              echo "❌ Error rate too high: $ERROR_RATE%"
              exit 1
            fi
            
            sleep 60
          done

          echo "✅ Canary metrics healthy!"

      - name: Run synthetic tests
        run: |
          npm ci
          npm run test:synthetic -- --env=canary

      - name: Rollback on failure
        if: failure()
        run: |
          echo "🔄 Rolling back canary deployment..."
          aws ecs update-service \
            --cluster ${{ env.ECS_CLUSTER }} \
            --service ${{ env.ECS_SERVICE }}-canary \
            --force-new-deployment

  deploy-production:
    name: 🚀 Full Production Deploy
    runs-on: ubuntu-latest
    needs: [deploy-canary]
    environment:
      name: production
      url: https://app.myapp.com
    steps:
      - uses: actions/checkout@v4

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: ${{ secrets.AWS_PROD_ROLE_ARN }}
          aws-region: ${{ env.AWS_REGION }}

      - name: Deploy to 50% traffic
        run: |
          echo "Deploying to 50% of production fleet..."
          # Implementation depends on your infrastructure
          # Could be AWS App Mesh, Istio, or custom load balancer config

      - name: Monitor metrics (30 min)
        run: |
          # Similar monitoring as canary but longer duration
          echo "Monitoring 50% rollout for 30 minutes..."

      - name: Deploy to 100% traffic
        run: |
          echo "Deploying to 100% of production fleet..."
          aws ecs update-service \
            --cluster ${{ env.ECS_CLUSTER }} \
            --service ${{ env.ECS_SERVICE }} \
            --force-new-deployment \
            --deployment-configuration "maximumPercent=200,minimumHealthyPercent=100"

      - name: Wait for deployment stability
        run: |
          aws ecs wait services-stable \
            --cluster ${{ env.ECS_CLUSTER }} \
            --services ${{ env.ECS_SERVICE }}

      - name: Run smoke tests
        run: |
          sleep 60  # Wait for deployment to fully propagate

          # Health checks
          curl -f https://app.myapp.com/health || exit 1
          curl -f https://app.myapp.com/api/status || exit 1

          # Critical user flows
          npm run test:smoke:production

      - name: Update deployment tracking
        run: |
          # Send deployment info to tracking system (DataDog, New Relic, etc.)
          curl -X POST https://api.datadoghq.com/api/v1/events \
            -H "Content-Type: application/json" \
            -H "DD-API-KEY: ${{ secrets.DATADOG_API_KEY }}" \
            -d '{
              "title": "Production Deployment",
              "text": "Deployed version ${{ needs.build-production-image.outputs.image-tag }} to production",
              "tags": ["environment:production", "service:my-app"]
            }'

      - name: Notify stakeholders
        if: always()
        uses: slackapi/slack-github-action@v1
        with:
          payload: |
            {
              "text": "${{ job.status == 'success' && '🎉' || '🚨' }} Production Deployment ${{ job.status }}",
              "blocks": [
                {
                  "type": "section",
                  "text": {
                    "type": "mrkdwn",
                    "text": "*Production Deployment*\nVersion: `${{ needs.build-production-image.outputs.image-tag }}`\nStatus: *${{ job.status }}*\nDeployed by: ${{ github.actor }}\nURL: https://app.myapp.com"
                  }
                },
                {
                  "type": "actions",
                  "elements": [
                    {
                      "type": "button",
                      "text": {"type": "plain_text", "text": "View Logs"},
                      "url": "https://github.com/${{ github.repository }}/actions/runs/${{ github.run_id }}"
                    }
                  ]
                }
              ]
            }
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK }}
```

---

## 2. Pre-commit Hooks Configuration

### `.pre-commit-config.yaml`

```yaml
# Pre-commit hooks configuration
# Install: pip install pre-commit
# Setup: pre-commit install
# Run manually: pre-commit run --all-files

repos:
  # Code formatting
  - repo: https://github.com/pre-commit/pre-commit-hooks
    rev: v4.5.0
    hooks:
      - id: trailing-whitespace
      - id: end-of-file-fixer
      - id: check-yaml
        args: ['--unsafe'] # For CloudFormation templates
      - id: check-json
      - id: check-added-large-files
        args: ['--maxkb=1000']
      - id: check-merge-conflict
      - id: detect-private-key
      - id: check-case-conflict

  # JavaScript/TypeScript linting
  - repo: https://github.com/pre-commit/mirrors-eslint
    rev: v8.56.0
    hooks:
      - id: eslint
        files: \.[jt]sx?$
        types: [file]
        additional_dependencies:
          - eslint@8.56.0
          - '@typescript-eslint/eslint-plugin@6.19.0'
          - '@typescript-eslint/parser@6.19.0'

  # Prettier formatting
  - repo: https://github.com/pre-commit/mirrors-prettier
    rev: v3.1.0
    hooks:
      - id: prettier
        args: ['--write']
        files: \.(js|jsx|ts|tsx|json|css|scss|md)$

  # Python linting
  - repo: https://github.com/astral-sh/ruff-pre-commit
    rev: v0.1.14
    hooks:
      - id: ruff
        args: [--fix, --exit-non-zero-on-fix]
      - id: ruff-format

  # Secret scanning
  - repo: https://github.com/Yelp/detect-secrets
    rev: v1.4.0
    hooks:
      - id: detect-secrets
        args: ['--baseline', '.secrets.baseline']

  # Commit message validation
  - repo: https://github.com/compilerla/conventional-pre-commit
    rev: v3.0.0
    hooks:
      - id: conventional-pre-commit
        stages: [commit-msg]

  # Dockerfile linting
  - repo: https://github.com/hadolint/hadolint
    rev: v2.12.0
    hooks:
      - id: hadolint-docker

  # Shell script linting
  - repo: https://github.com/shellcheck-py/shellcheck-py
    rev: v0.9.0.6
    hooks:
      - id: shellcheck

  # Terraform formatting
  - repo: https://github.com/antonbabenko/pre-commit-terraform
    rev: v1.86.0
    hooks:
      - id: terraform_fmt
      - id: terraform_validate
      - id: terraform_tflint
```

### `package.json` - NPM Scripts

```json
{
  "scripts": {
    "lint": "eslint . --ext .js,.jsx,.ts,.tsx --max-warnings 0",
    "lint:fix": "eslint . --ext .js,.jsx,.ts,.tsx --fix",
    "format": "prettier --write \"**/*.{js,jsx,ts,tsx,json,css,scss,md}\"",
    "format:check": "prettier --check \"**/*.{js,jsx,ts,tsx,json,css,scss,md}\"",
    "type-check": "tsc --noEmit",
    "test": "jest",
    "test:unit": "jest --testPathPattern=src/.*\\.test\\.[jt]sx?$",
    "test:integration": "jest --testPathPattern=tests/integration/.*\\.test\\.[jt]sx?$",
    "test:e2e": "playwright test",
    "test:smoke": "jest --testPathPattern=tests/smoke/.*\\.test\\.[jt]sx?$",
    "test:smoke:production": "ENVIRONMENT=production npm run test:smoke",
    "test:coverage": "jest --coverage --coverageReporters=text-lcov | coveralls",
    "build": "webpack --mode production",
    "build:dev": "webpack --mode development",
    "prepare": "husky install"
  },
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  },
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write", "jest --bail --findRelatedTests"],
    "*.{json,css,scss,md}": ["prettier --write"]
  }
}
```

---

## 3. Terraform - Infrastructure as Code

### `terraform/environments/dev/main.tf`

```hcl
terraform {
  required_version = ">= 1.5"

  backend "s3" {
    bucket         = "my-terraform-state"
    key            = "dev/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    dynamodb_table = "terraform-locks"
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Environment = "dev"
      Project     = "my-app"
      ManagedBy   = "Terraform"
      CostCenter  = "Engineering"
    }
  }
}

# VPC and Networking
module "vpc" {
  source = "../../modules/vpc"

  environment         = "dev"
  vpc_cidr            = "10.0.0.0/16"
  availability_zones  = ["us-east-1a", "us-east-1b"]
  private_subnets     = ["10.0.1.0/24", "10.0.2.0/24"]
  public_subnets      = ["10.0.101.0/24", "10.0.102.0/24"]
}

# ECS Cluster
module "ecs_cluster" {
  source = "../../modules/ecs"

  environment    = "dev"
  cluster_name   = "dev-cluster"
  vpc_id         = module.vpc.vpc_id
  private_subnets = module.vpc.private_subnet_ids

  # Cost optimization: Use spot instances for dev
  capacity_providers = ["FARGATE_SPOT"]
  default_capacity_provider_strategy = {
    capacity_provider = "FARGATE_SPOT"
    weight           = 1
    base             = 0
  }
}

# RDS Database
module "database" {
  source = "../../modules/rds"

  environment          = "dev"
  identifier           = "dev-myapp-db"
  engine               = "postgres"
  engine_version       = "15.4"
  instance_class       = "db.t4g.micro"  # Cost optimized
  allocated_storage    = 20

  vpc_id              = module.vpc.vpc_id
  subnet_ids          = module.vpc.private_subnet_ids

  # Dev-specific: Single AZ, no backups
  multi_az            = false
  backup_retention_period = 0
  skip_final_snapshot = true
}

# ElastiCache Redis
module "cache" {
  source = "../../modules/elasticache"

  environment       = "dev"
  cluster_id        = "dev-myapp-cache"
  node_type         = "cache.t4g.micro"
  num_cache_nodes   = 1

  vpc_id            = module.vpc.vpc_id
  subnet_ids        = module.vpc.private_subnet_ids
}

# Outputs
output "cluster_name" {
  value = module.ecs_cluster.cluster_name
}

output "database_endpoint" {
  value     = module.database.endpoint
  sensitive = true
}

output "redis_endpoint" {
  value = module.cache.endpoint
}
```

---

## 4. Docker Multi-stage Build

### `Dockerfile`

```dockerfile
# syntax=docker/dockerfile:1.4

#################################################
# Stage 1: Base image with common dependencies
#################################################
FROM node:20-alpine AS base

# Install system dependencies
RUN apk add --no-cache \
    dumb-init \
    curl \
    && rm -rf /var/cache/apk/*

# Create app user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

WORKDIR /app

#################################################
# Stage 2: Dependencies installation
#################################################
FROM base AS deps

# Copy package files
COPY package*.json ./

# Install production dependencies
RUN --mount=type=cache,target=/root/.npm \
    npm ci --only=production && \
    npm cache clean --force

# Install all dependencies (including dev) for build stage
FROM base AS deps-build

COPY package*.json ./

RUN --mount=type=cache,target=/root/.npm \
    npm ci

#################################################
# Stage 3: Build application
#################################################
FROM deps-build AS build

# Copy source code
COPY --chown=nodejs:nodejs . .

# Build application
ARG NODE_ENV=production
ARG VERSION=unknown
ARG BUILD_DATE=unknown

ENV NODE_ENV=${NODE_ENV} \
    VERSION=${VERSION} \
    BUILD_DATE=${BUILD_DATE}

RUN npm run build && \
    npm prune --production

#################################################
# Stage 4: Production image
#################################################
FROM base AS production

# Set environment
ENV NODE_ENV=production \
    PORT=3000

# Copy built application
COPY --from=build --chown=nodejs:nodejs /app/dist ./dist
COPY --from=deps --chown=nodejs:nodejs /app/node_modules ./node_modules
COPY --chown=nodejs:nodejs package*.json ./

# Add health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
    CMD curl -f http://localhost:${PORT}/health || exit 1

# Use non-root user
USER nodejs

# Expose port
EXPOSE ${PORT}

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/index.js"]

# Labels for metadata
LABEL org.opencontainers.image.title="my-app" \
      org.opencontainers.image.description="My awesome application" \
      org.opencontainers.image.version="${VERSION}" \
      org.opencontainers.image.created="${BUILD_DATE}" \
      org.opencontainers.image.source="https://github.com/myorg/myapp"

#################################################
# Stage 5: Development image (with hot reload)
#################################################
FROM deps-build AS development

ENV NODE_ENV=development

COPY --chown=nodejs:nodejs . .

USER nodejs

EXPOSE 3000 9229

CMD ["npm", "run", "dev"]
```

### `.dockerignore`

```text
# Git
.git
.gitignore
.gitattributes

# CI/CD
.github
.gitlab-ci.yml

# Documentation
*.md
docs/
LICENSE

# Dependencies
node_modules
npm-debug.log
yarn-error.log

# Build artifacts
dist
build
*.log

# Tests
tests/
coverage/
.nyc_output/
__tests__/

# IDE
.vscode
.idea
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Environment
.env
.env.local
.env.*.local

# Terraform
terraform/
*.tfstate
*.tfvars

# Docker
Dockerfile*
docker-compose*.yml
```

---

## 5. SonarQube Configuration

### `sonar-project.properties`

```properties
# Project identification
sonar.projectKey=my-app
sonar.organization=my-org
sonar.projectName=My Application
sonar.projectVersion=1.0

# Source code location
sonar.sources=src
sonar.tests=tests,src/**/*.test.ts

# Exclusions
sonar.exclusions=**/node_modules/**,**/*.test.ts,**/*.spec.ts,**/dist/**,**/coverage/**

# Coverage
sonar.javascript.lcov.reportPaths=coverage/lcov.info
sonar.typescript.lcov.reportPaths=coverage/lcov.info
sonar.coverage.exclusions=**/*.test.ts,**/*.spec.ts,**/*.mock.ts

# Test execution
sonar.testExecutionReportPaths=test-results/sonar-report.xml

# Code quality thresholds
sonar.qualitygate.wait=true

# Duplications
sonar.cpd.exclusions=**/*.test.ts,**/*.spec.ts

# Language
sonar.language=ts
sonar.sourceEncoding=UTF-8
```

---

## 6. Monitoring & Alerting

### `monitoring/datadog-synthetics.json`

```json
{
  "name": "Production Health Check",
  "type": "api",
  "subtype": "http",
  "config": {
    "request": {
      "method": "GET",
      "url": "https://app.myapp.com/health",
      "timeout": 30,
      "headers": {
        "User-Agent": "Datadog Synthetic Monitor"
      }
    },
    "assertions": [
      {
        "type": "statusCode",
        "operator": "is",
        "target": 200
      },
      {
        "type": "responseTime",
        "operator": "lessThan",
        "target": 1000
      },
      {
        "type": "body",
        "operator": "contains",
        "target": "\"status\":\"healthy\""
      }
    ]
  },
  "locations": ["aws:us-east-1", "aws:eu-west-1", "aws:ap-southeast-1"],
  "options": {
    "tick_every": 60,
    "retry": {
      "count": 2,
      "interval": 300
    },
    "monitor_options": {
      "renotify_interval": 120,
      "escalation_message": "Production health check failing!"
    }
  },
  "message": "@slack-alerts @pagerduty-oncall Production health check failed",
  "tags": ["env:production", "service:my-app", "priority:critical"]
}
```

---

## Próximos Passos

1. **Escolher plataforma CI/CD** (GitHub Actions, GitLab CI, etc.)
2. **Adaptar exemplos** para seu stack específico
3. **Implementar fase por fase** seguindo o roadmap
4. **Testar em ambiente de dev** primeiro
5. **Documentar processos** para o time
6. **Treinar equipe** nos novos workflows
7. **Monitorar métricas** e ajustar conforme necessário

Esses exemplos são production-ready e cobrem os casos mais comuns. Ajuste conforme as necessidades específicas da sua empresa!
