---
title: Helm
description: TBD
---

This document provides detailed instructions on implementing a distribution strategy for containerized microservices running on Kubernetes using GitHub Container Registry (GHCR) and Helm.

## Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [GitHub Container Registry Setup](#github-container-registry-setup)
4. [Container Image Management](#container-image-management)
5. [Helm Chart Development](#helm-chart-development)
6. [CI/CD Implementation](#cicd-implementation)
7. [Release Strategy](#release-strategy)
8. [User Installation Guide](#user-installation-guide)
9. [Maintenance and Updates](#maintenance-and-updates)
10. [Best Practices](#best-practices)

## Overview

This distribution strategy enables users to easily install and maintain your microservices application on their Kubernetes clusters using industry-standard tools: GitHub Container Registry for container images and Helm for Kubernetes deployments.

### Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  GitHub         │     │  GitHub         │     │  User           │
│  Repository     │     │  Container      │     │  Kubernetes     │
│                 │     │  Registry       │     │  Cluster        │
│  - Source Code  │     │                 │     │                 │
│  - Helm Charts  │─────▶  - Docker       │─────▶  - Helm         │
│  - CI/CD        │     │    Images       │     │    Releases     │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

## Prerequisites

- A GitHub account and repository for your application
- Docker installed on development machines
- A Kubernetes cluster for testing (e.g., minikube, kind, or a cloud provider)
- Helm CLI installed (version 3.x)
- kubectl configured to interact with your Kubernetes cluster

## GitHub Container Registry Setup

### 1. Enable GitHub Container Registry

1. Navigate to your GitHub profile settings
2. Go to "Developer settings" > "Personal access tokens" > "Generate new token"
3. Select the `write:packages` scope
4. Generate and securely store the token

### 2. Authenticate with GitHub Container Registry

```bash
# Login to GitHub Container Registry
echo $CR_PAT | docker login ghcr.io -u USERNAME --password-stdin
```

### 3. Configure Repository for Package Visibility

1. Navigate to your GitHub repository
2. Go to "Settings" > "Packages"
3. Configure package visibility (public for open source)

## Container Image Management

### 1. Dockerfile Best Practices

Create a Dockerfile for each microservice following these best practices:

```dockerfile
# Use specific versions for base images
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files first to leverage Docker cache
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Use multi-stage builds to reduce image size
FROM node:18-alpine

WORKDIR /app

# Copy only necessary files from builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package.json ./

# Use non-root user for security
USER node

# Set environment variables
ENV NODE_ENV=production

# Expose port
EXPOSE 3000

# Define health check
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

# Start the application
CMD ["node", "dist/main.js"]
```

### 2. Image Tagging Strategy

Implement a consistent tagging strategy:

- Use semantic versioning (e.g., `v1.0.0`)
- Include git SHA for development builds (e.g., `dev-a1b2c3d`)
- Tag latest stable release with `latest`
- Consider using Docker manifest for multi-architecture support

Example:

```bash
# Tag image with semantic version
docker tag myapp:local ghcr.io/username/myapp:v1.0.0

# Tag as latest
docker tag myapp:local ghcr.io/username/myapp:latest

# Push images
docker push ghcr.io/username/myapp:v1.0.0
docker push ghcr.io/username/myapp:latest
```

### 3. Image Security Scanning

Implement container security scanning with GitHub Actions:

- Use tools like Trivy or Anchore to scan for vulnerabilities
- Configure policy to prevent publishing images with critical vulnerabilities
- Generate and store Software Bill of Materials (SBOM)

## Helm Chart Development

### 1. Helm Chart Structure

Create a Helm chart repository following this structure:

```
helm-charts/
├── charts/                  # Directory for dependent charts
├── Chart.yaml               # Chart metadata
├── values.yaml              # Default configuration
├── values.schema.json       # JSON schema for values validation
├── templates/               # Kubernetes manifest templates
│   ├── _helpers.tpl         # Template helpers
│   ├── deployment.yaml      # Deployment manifest
│   ├── service.yaml         # Service manifest
│   ├── ingress.yaml         # Ingress manifest
│   ├── configmap.yaml       # ConfigMap manifest
│   ├── secret.yaml          # Secret manifest
│   ├── serviceaccount.yaml  # Service account manifest
│   ├── NOTES.txt            # Installation notes
│   └── tests/               # Helm tests
├── crds/                    # Custom Resource Definitions (if needed)
└── README.md                # Chart documentation
```

### 2. Chart.yaml Best Practices

Create a detailed Chart.yaml file:

```yaml
apiVersion: v2
name: myapp
description: A Helm chart for MyApp microservices
type: application
version: 1.0.0 # Chart version
appVersion: 1.0.0 # Application version
kubeVersion: '>=1.19.0-0'
home: https://github.com/username/myapp
sources:
  - https://github.com/username/myapp
maintainers:
  - name: Your Name
    email: your.email@example.com
    url: https://yourwebsite.com
icon: https://raw.githubusercontent.com/username/myapp/main/icon.png
annotations:
  artifacthub.io/license: MIT
  artifacthub.io/prerelease: 'false'
dependencies:
  - name: postgresql
    version: 11.x.x
    repository: https://charts.bitnami.com/bitnami
    condition: postgresql.enabled
```

### 3. Values.yaml Configuration

Create a comprehensive values.yaml with good defaults:

```yaml
# Global configuration
global:
  imageRegistry: ghcr.io
  imagePullSecrets: []
  storageClass: ''

# Common labels
commonLabels: {}

# Common annotations
commonAnnotations: {}

# Image configuration
image:
  repository: username/myapp
  tag: latest
  pullPolicy: IfNotPresent

# Number of replicas
replicaCount: 2

# Pod resource requirements
resources:
  limits:
    cpu: 500m
    memory: 512Mi
  requests:
    cpu: 100m
    memory: 128Mi

# Autoscaling configuration
autoscaling:
  enabled: false
  minReplicas: 2
  maxReplicas: 10
  targetCPUUtilizationPercentage: 80
  targetMemoryUtilizationPercentage: 80

# Service configuration
service:
  type: ClusterIP
  port: 80
  annotations: {}

# Ingress configuration
ingress:
  enabled: false
  className: ''
  annotations:
    kubernetes.io/ingress.class: nginx
  hosts:
    - host: myapp.local
      paths:
        - path: /
          pathType: ImplementationSpecific
  tls: []

# Configuration for the application
config:
  logLevel: info
  apiKey: ''

# Database configuration
postgresql:
  enabled: true
  auth:
    username: myapp
    password: ''
    database: myapp
  primary:
    persistence:
      size: 8Gi

# Persistent volume configuration
persistence:
  enabled: false
  storageClass: ''
  accessMode: ReadWriteOnce
  size: 10Gi

# Pod security context
securityContext:
  runAsNonRoot: true
  runAsUser: 1000
  fsGroup: 1000

# Network policies
networkPolicy:
  enabled: false

# Pod affinity/anti-affinity rules
affinity: {}

# Node selector
nodeSelector: {}

# Tolerations
tolerations: []
```

### 4. Template Development

Create template files for Kubernetes resources. Example for deployment.yaml:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{ include "myapp.fullname" . }}
  labels:
    {{- include "myapp.labels" . | nindent 4 }}
  {{- with .Values.commonAnnotations }}
  annotations:
    {{- toYaml . | nindent 4 }}
  {{- end }}
spec:
  {{- if not .Values.autoscaling.enabled }}
  replicas: {{ .Values.replicaCount }}
  {{- end }}
  selector:
    matchLabels:
      {{- include "myapp.selectorLabels" . | nindent 6 }}
  template:
    metadata:
      {{- with .Values.podAnnotations }}
      annotations:
        {{- toYaml . | nindent 8 }}
      {{- end }}
      labels:
        {{- include "myapp.selectorLabels" . | nindent 8 }}
    spec:
      {{- with .Values.imagePullSecrets }}
      imagePullSecrets:
        {{- toYaml . | nindent 8 }}
      {{- end }}
      serviceAccountName: {{ include "myapp.serviceAccountName" . }}
      securityContext:
        {{- toYaml .Values.podSecurityContext | nindent 8 }}
      containers:
        - name: {{ .Chart.Name }}
          securityContext:
            {{- toYaml .Values.securityContext | nindent 12 }}
          image: "{{ .Values.global.imageRegistry }}/{{ .Values.image.repository }}:{{ .Values.image.tag | default .Chart.AppVersion }}"
          imagePullPolicy: {{ .Values.image.pullPolicy }}
          env:
            - name: LOG_LEVEL
              value: {{ .Values.config.logLevel | quote }}
            {{- if .Values.config.apiKey }}
            - name: API_KEY
              valueFrom:
                secretKeyRef:
                  name: {{ include "myapp.fullname" . }}
                  key: api-key
            {{- end }}
            {{- if .Values.postgresql.enabled }}
            - name: DB_HOST
              value: {{ include "myapp.fullname" . }}-postgresql
            - name: DB_USER
              value: {{ .Values.postgresql.auth.username }}
            - name: DB_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: {{ include "myapp.fullname" . }}-postgresql
                  key: password
            - name: DB_NAME
              value: {{ .Values.postgresql.auth.database }}
            {{- end }}
          ports:
            - name: http
              containerPort: 3000
              protocol: TCP
          livenessProbe:
            httpGet:
              path: /health
              port: http
            initialDelaySeconds: 30
            periodSeconds: 10
            timeoutSeconds: 5
            failureThreshold: 3
          readinessProbe:
            httpGet:
              path: /health
              port: http
            initialDelaySeconds: 5
            periodSeconds: 10
            timeoutSeconds: 5
            failureThreshold: 3
          resources:
            {{- toYaml .Values.resources | nindent 12 }}
          {{- if .Values.persistence.enabled }}
          volumeMounts:
            - name: data
              mountPath: /app/data
          {{- end }}
      {{- with .Values.nodeSelector }}
      nodeSelector:
        {{- toYaml . | nindent 8 }}
      {{- end }}
      {{- with .Values.affinity }}
      affinity:
        {{- toYaml . | nindent 8 }}
      {{- end }}
      {{- with .Values.tolerations }}
      tolerations:
        {{- toYaml . | nindent 8 }}
      {{- end }}
      {{- if .Values.persistence.enabled }}
      volumes:
        - name: data
          persistentVolumeClaim:
            claimName: {{ include "myapp.fullname" . }}
      {{- end }}
```

### 5. Create Helper Templates

Create \_helpers.tpl for reusable template snippets:

```
{{/*
Expand the name of the chart.
*/}}
{{- define "myapp.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create a default fully qualified app name.
*/}}
{{- define "myapp.fullname" -}}
{{- if .Values.fullnameOverride }}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- $name := default .Chart.Name .Values.nameOverride }}
{{- if contains $name .Release.Name }}
{{- .Release.Name | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}
{{- end }}

{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "myapp.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "myapp.labels" -}}
helm.sh/chart: {{ include "myapp.chart" . }}
{{ include "myapp.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{/*
Selector labels
*/}}
{{- define "myapp.selectorLabels" -}}
app.kubernetes.io/name: {{ include "myapp.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{/*
Create the name of the service account to use
*/}}
{{- define "myapp.serviceAccountName" -}}
{{- if .Values.serviceAccount.create }}
{{- default (include "myapp.fullname" .) .Values.serviceAccount.name }}
{{- else }}
{{- default "default" .Values.serviceAccount.name }}
{{- end }}
{{- end }}
```

### 6. Publishing Helm Charts

You can publish your Helm charts using GitHub Pages:

1. Create a `gh-pages` branch in your repository
2. Set up GitHub Actions to automatically update the Helm repository:

```yaml
# .github/workflows/helm-release.yml
name: Release Helm Charts

on:
  push:
    branches:
      - main
    paths:
      - 'helm-charts/**'

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
        with:
          fetch-depth: 0

      - name: Configure Git
        run: |
          git config user.name "$GITHUB_ACTOR"
          git config user.email "$GITHUB_ACTOR@users.noreply.github.com"

      - name: Install Helm
        uses: azure/setup-helm@v3
        with:
          version: v3.10.0

      - name: Run chart-releaser
        uses: helm/chart-releaser-action@v1.5.0
        with:
          charts_dir: helm-charts
        env:
          CR_TOKEN: '${{ secrets.GITHUB_TOKEN }}'
```

## CI/CD Implementation

### 1. GitHub Actions Workflow for Container Images

Create a GitHub Actions workflow to build and publish container images:

```yaml
# .github/workflows/container-build.yml
name: Build and Publish Container Images

on:
  push:
    branches:
      - main
    tags:
      - 'v*'
  pull_request:
    branches:
      - main

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}

jobs:
  build-and-push:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
      security-events: write

    steps:
      - name: Checkout repository
        uses: actions/checkout@v3

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v2

      - name: Log in to the Container registry
        uses: docker/login-action@v2
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Extract metadata (tags, labels) for Docker
        id: meta
        uses: docker/metadata-action@v4
        with:
          images: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}
          tags: |
            type=semver,pattern={{version}}
            type=semver,pattern={{major}}.{{minor}}
            type=sha,format=short
            type=ref,event=branch
            type=ref,event=pr
            type=raw,value=latest,enable=${{ github.ref == format('refs/heads/{0}', github.event.repository.default_branch) }}

      - name: Build and push Docker image
        uses: docker/build-push-action@v4
        with:
          context: .
          push: ${{ github.event_name != 'pull_request' }}
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}
          cache-from: type=gha
          cache-to: type=gha,mode=max

      - name: Run Trivy vulnerability scanner
        uses: aquasecurity/trivy-action@master
        with:
          image-ref: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:${{ steps.meta.outputs.version }}
          format: 'sarif'
          output: 'trivy-results.sarif'

      - name: Upload Trivy scan results to GitHub Security tab
        uses: github/codeql-action/upload-sarif@v2
        if: always()
        with:
          sarif_file: 'trivy-results.sarif'

      - name: Generate SBOM
        uses: anchore/sbom-action@v0.13.1
        with:
          image: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:${{ steps.meta.outputs.version }}
          format: spdx-json
          output-file: ./sbom.json

      - name: Upload SBOM
        uses: actions/upload-artifact@v3
        with:
          name: sbom
          path: ./sbom.json
```

### 2. Workflow for Testing Helm Charts

Create a workflow to test Helm charts:

```yaml
# .github/workflows/helm-test.yml
name: Test Helm Charts

on:
  push:
    branches:
      - main
    paths:
      - 'helm-charts/**'
  pull_request:
    branches:
      - main
    paths:
      - 'helm-charts/**'

jobs:
  lint-test:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
        with:
          fetch-depth: 0

      - name: Set up Helm
        uses: azure/setup-helm@v3
        with:
          version: v3.10.0

      - name: Set up python
        uses: actions/setup-python@v4
        with:
          python-version: '3.9'
          check-latest: true

      - name: Set up chart-testing
        uses: helm/chart-testing-action@v2.3.1

      - name: Run chart-testing (lint)
        run: ct lint --target-branch ${{ github.event.repository.default_branch }} --charts helm-charts/*

      - name: Create kind cluster
        uses: helm/kind-action@v1.5.0
        if: github.event_name == 'pull_request'

      - name: Run chart-testing (install)
        run: ct install --target-branch ${{ github.event.repository.default_branch }} --charts helm-charts/*
        if: github.event_name == 'pull_request'
```

## Release Strategy

### 1. Versioning

Implement semantic versioning for both application and chart versions:

- Application versions follow SemVer (MAJOR.MINOR.PATCH)
- Helm chart versions can be incremented independently
- Maintain a changelog for both

### 2. Release Process

1. Tag the repository with the new version:

   ```bash
   git tag -a v1.0.0 -m "Release v1.0.0"
   git push origin v1.0.0
   ```

2. GitHub Actions will:

   - Build and publish container images with version tags
   - Run security scans
   - Update Helm chart repository
   - Generate release artifacts

3. Create a GitHub Release with:
   - Release notes
   - Links to container images
   - Links to Helm charts
   - SBOM and security scan results

### 3. Release Cadence

- Establish a regular release cadence (e.g., monthly for feature releases)
- Publish patch releases as needed for critical bug fixes
- Maintain LTS versions for enterprise users

## User Installation Guide

Create a comprehensive installation guide for users:

### Installing from Helm Repository

1. Add the Helm repository:

   ```bash
   helm repo add myapp https://username.github.io/myapp
   helm repo update
   ```

2. Install the chart:

   ```bash
   helm install myapp myapp/myapp --namespace myapp --create-namespace
   ```

3. Customize installation with values:
   ```bash
   helm install myapp myapp/myapp --namespace myapp --create-namespace \
     --set replicaCount=3 \
     --set config.logLevel=debug \
     --values custom-values.yaml
   ```

### Configuration Options

Provide documentation on all available configuration options and their default values.

## Maintenance and Updates

### 1. Upgrading

Document the upgrade process:

```bash
# Update Helm repository
helm repo update

# Upgrade the chart
helm upgrade myapp myapp/myapp --namespace myapp
```

### 2. Rollback

Document the rollback process:

```bash
# List revision history
helm history myapp --namespace myapp

# Rollback to a previous revision
helm rollback myapp 1 --namespace myapp
```

### 3. Dependency Updates

Regularly update chart dependencies:

```bash
# Update dependencies
helm dependency update ./helm-charts/myapp

# Commit changes
git commit -am "Update chart dependencies"
```

## Best Practices

### Container Best Practices

1. **Security**:

   - Use minimal base images (Alpine, distroless)
   - Run as non-root users
   - Scan for vulnerabilities
   - Use multi-stage builds
   - Implement health checks

2. **Performance**:

   - Optimize image size
   - Layer caching
   - Minimize container startup time

3. **Tagging**:
   - Use semantic versioning
   - Never overwrite existing tags
   - Sign images for authenticity

### Helm Chart Best Practices

1. **Version Management**:

   - Keep chart and app versions separate
   - Document breaking changes
   - Follow semver

2. **Dependencies**:

   - Use specific versions for dependencies
   - Test compatibility

3. **Templating**:

   - Use helper functions for consistency
   - Validate templates
   - Document all values
   - Provide sensible defaults

4. **Security**:

   - Use security contexts
   - Implement network policies
   - Configure RBAC appropriately
   - Encrypt sensitive values

5. **Deployment**:
   - Configure resource limits
   - Implement health checks
   - Set up autoscaling
   - Configure pod disruption budgets

### CI/CD Best Practices

1. **Automation**:

   - Automate all build and release steps
   - Use infrastructure as code

2. **Testing**:

   - Test Helm charts on different Kubernetes versions
   - Validate deployments in staging environments

3. **Security**:
   - Scan containers and code
   - Generate and store SBOMs
   - Implement least privilege

## Reference Implementation

This reference implementation demonstrates the distribution strategy for a simple microservices application. The project structure and files provided follow the best practices outlined in the documentation.

## Project Structure

```
microservices-helm-example/
├── .github/
│   └── workflows/
│       ├── container-build.yml
│       ├── helm-release.yml
│       └── helm-test.yml
├── services/
│   ├── api-service/
│   │   ├── src/
│   │   ├── Dockerfile
│   │   ├── package.json
│   │   └── tsconfig.json
│   └── worker-service/
│       ├── src/
│       ├── Dockerfile
│       ├── package.json
│       └── tsconfig.json
├── helm-charts/
│   ├── microservice-common/
│   │   ├── templates/
│   │   ├── Chart.yaml
│   │   └── values.yaml
│   ├── api-service/
│   │   ├── templates/
│   │   ├── Chart.yaml
│   │   └── values.yaml
│   ├── worker-service/
│   │   ├── templates/
│   │   ├── Chart.yaml
│   │   └── values.yaml
│   └── umbrella-chart/
│       ├── templates/
│       ├── Chart.yaml
│       └── values.yaml
├── README.md
└── docker-compose.yml
```

## Services Implementation

### API Service (TypeScript)

**services/api-service/package.json**:

```json
{
  "name": "api-service",
  "version": "1.0.0",
  "description": "API Service for microservices example",
  "main": "dist/index.js",
  "scripts": {
    "build": "tsc",
    "start": "node dist/index.js",
    "dev": "ts-node-dev src/index.ts",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "helmet": "^6.1.5",
    "morgan": "^1.10.0",
    "winston": "^3.8.2"
  },
  "devDependencies": {
    "@types/express": "^4.17.17",
    "@types/cors": "^2.8.13",
    "@types/morgan": "^1.9.4",
    "@types/node": "^18.16.0",
    "ts-node-dev": "^2.0.0",
    "typescript": "^5.0.4",
    "jest": "^29.5.0",
    "ts-jest": "^29.1.0",
    "@types/jest": "^29.5.1"
  }
}
```

**services/api-service/tsconfig.json**:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "**/*.test.ts"]
}
```

**services/api-service/src/index.ts**:

```typescript
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { createLogger, format, transports } from 'winston';

// Configure logger
const logger = createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: format.combine(format.timestamp(), format.json()),
  transports: [new transports.Console()],
});

// Create Express app
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('combined'));
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// API routes
app.get('/api/v1/data', (req, res) => {
  logger.info('Data request received');
  res.json({
    message: 'Hello from API Service',
    timestamp: new Date().toISOString(),
  });
});

// Start server
app.listen(port, () => {
  logger.info(`API Service listening on port ${port}`);
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  logger.info('SIGINT received, shutting down gracefully');
  process.exit(0);
});
```

**services/api-service/Dockerfile**:

```dockerfile
# Build stage
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build application
RUN npm run build

# Runtime stage
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy built assets from builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package.json ./

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Use non-root user for security
USER node

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
  CMD wget -q -O- http://localhost:3000/health || exit 1

# Start application
CMD ["node", "dist/index.js"]
```

### Worker Service (TypeScript)

**services/worker-service/package.json**:

```json
{
  "name": "worker-service",
  "version": "1.0.0",
  "description": "Worker Service for microservices example",
  "main": "dist/index.js",
  "scripts": {
    "build": "tsc",
    "start": "node dist/index.js",
    "dev": "ts-node-dev src/index.ts",
    "test": "jest"
  },
  "dependencies": {
    "amqplib": "^0.10.3",
    "winston": "^3.8.2"
  },
  "devDependencies": {
    "@types/amqplib": "^0.10.1",
    "@types/node": "^18.16.0",
    "ts-node-dev": "^2.0.0",
    "typescript": "^5.0.4",
    "jest": "^29.5.0",
    "ts-jest": "^29.1.0",
    "@types/jest": "^29.5.1"
  }
}
```

**services/worker-service/tsconfig.json**:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "**/*.test.ts"]
}
```

**services/worker-service/src/index.ts**:

```typescript
import amqplib from 'amqplib';
import { createLogger, format, transports } from 'winston';

// Configure logger
const logger = createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: format.combine(format.timestamp(), format.json()),
  transports: [new transports.Console()],
});

// RabbitMQ connection details
const rabbitmqUrl = process.env.RABBITMQ_URL || 'amqp://guest:guest@localhost:5672';
const queueName = process.env.QUEUE_NAME || 'tasks';

// Process messages
async function processMessage(msg: amqplib.ConsumeMessage | null) {
  if (!msg) return;

  try {
    const content = JSON.parse(msg.content.toString());
    logger.info(`Processing message: ${msg.content.toString()}`);

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 500));

    logger.info(`Message processed successfully: ${content.id}`);
  } catch (error) {
    logger.error(`Error processing message: ${error}`);
  }
}

// Connect to RabbitMQ and consume messages
async function startWorker() {
  try {
    // Connect to RabbitMQ
    const connection = await amqplib.connect(rabbitmqUrl);
    const channel = await connection.createChannel();

    // Assert queue exists
    await channel.assertQueue(queueName, { durable: true });
    logger.info(`Connected to RabbitMQ, waiting for messages on queue: ${queueName}`);

    // Set prefetch count
    await channel.prefetch(1);

    // Consume messages
    await channel.consume(queueName, async (msg) => {
      await processMessage(msg);
      if (msg) channel.ack(msg);
    });

    // Handle graceful shutdown
    process.on('SIGINT', async () => {
      logger.info('SIGINT received, closing connection');
      await channel.close();
      await connection.close();
      process.exit(0);
    });

    process.on('SIGTERM', async () => {
      logger.info('SIGTERM received, closing connection');
      await channel.close();
      await connection.close();
      process.exit(0);
    });
  } catch (error) {
    logger.error(`Error starting worker: ${error}`);
    process.exit(1);
  }
}

// Start worker
startWorker();
```

**services/worker-service/Dockerfile**:

```dockerfile
# Build stage
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build application
RUN npm run build

# Runtime stage
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy built assets from builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package.json ./

# Set environment variables
ENV NODE_ENV=production

# Use non-root user for security
USER node

# Start application
CMD ["node", "dist/index.js"]
```

## Docker Compose for Local Development

**docker-compose.yml**:

```yaml
version: '3.8'

services:
  api:
    build:
      context: ./services/api-service
      dockerfile: Dockerfile
    ports:
      - '3000:3000'
    environment:
      - NODE_ENV=development
      - LOG_LEVEL=debug
      - PORT=3000
      - RABBITMQ_URL=amqp://rabbitmq:5672
    volumes:
      - ./services/api-service/src:/app/src
    depends_on:
      - rabbitmq
    healthcheck:
      test: ['CMD', 'wget', '-q', '-O-', 'http://localhost:3000/health']
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 10s

  worker:
    build:
      context: ./services/worker-service
      dockerfile: Dockerfile
    environment:
      - NODE_ENV=development
      - LOG_LEVEL=debug
      - RABBITMQ_URL=amqp://rabbitmq:5672
      - QUEUE_NAME=tasks
    volumes:
      - ./services/worker-service/src:/app/src
    depends_on:
      - rabbitmq

  rabbitmq:
    image: rabbitmq:3.11-management-alpine
    ports:
      - '5672:5672'
      - '15672:15672'
    volumes:
      - rabbitmq_data:/var/lib/rabbitmq
    environment:
      - RABBITMQ_DEFAULT_USER=guest
      - RABBITMQ_DEFAULT_PASS=guest
    healthcheck:
      test: ['CMD', 'rabbitmq-diagnostics', 'check_port_connectivity']
      interval: 30s
      timeout: 10s
      retries: 3

volumes:
  rabbitmq_data:
```

## Helm Charts

### Common Library Chart

**helm-charts/microservice-common/Chart.yaml**:

```yaml
apiVersion: v2
name: microservice-common
description: Common templates for microservice applications
type: library
version: 0.1.0
appVersion: 1.0.0
```

**helm-charts/microservice-common/templates/\_helpers.tpl**:

```
{{/*
Expand the name of the chart.
*/}}
{{- define "common.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create a default fully qualified app name.
*/}}
{{- define "common.fullname" -}}
{{- if .Values.fullnameOverride }}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- $name := default .Chart.Name .Values.nameOverride }}
{{- if contains $name .Release.Name }}
{{- .Release.Name | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}
{{- end }}

{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "common.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "common.labels" -}}
helm.sh/chart: {{ include "common.chart" . }}
{{ include "common.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- with .Values.commonLabels }}
{{ toYaml . }}
{{- end }}
{{- end }}

{{/*
Selector labels
*/}}
{{- define "common.selectorLabels" -}}
app.kubernetes.io/name: {{ include "common.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{/*
Create the name of the service account to use
*/}}
{{- define "common.serviceAccountName" -}}
{{- if .Values.serviceAccount.create }}
{{- default (include "common.fullname" .) .Values.serviceAccount.name }}
{{- else }}
{{- default "default" .Values.serviceAccount.name }}
{{- end }}
{{- end }}

{{/*
Return the appropriate apiVersion for deployment.
*/}}
{{- define "common.deployment.apiVersion" -}}
{{- if semverCompare ">=1.9-0" .Capabilities.KubeVersion.GitVersion -}}
{{- print "apps/v1" -}}
{{- else -}}
{{- print "extensions/v1beta1" -}}
{{- end -}}
{{- end -}}

{{/*
Return the appropriate apiVersion for ingress.
*/}}
{{- define "common.ingress.apiVersion" -}}
{{- if semverCompare ">=1.19-0" .Capabilities.KubeVersion.GitVersion -}}
{{- print "networking.k8s.io/v1" -}}
{{- else if semverCompare ">=1.14-0" .Capabilities.KubeVersion.GitVersion -}}
{{- print "networking.k8s.io/v1beta1" -}}
{{- else -}}
{{- print "extensions/v1beta1" -}}
{{- end -}}
{{- end -}}
```

**helm-charts/microservice-common/templates/deployment.yaml**:

```yaml
{{- define "common.deployment" -}}
apiVersion: {{ include "common.deployment.apiVersion" . }}
kind: Deployment
metadata:
  name: {{ include "common.fullname" . }}
  labels:
    {{- include "common.labels" . | nindent 4 }}
  {{- with .Values.annotations }}
  annotations:
    {{- toYaml . | nindent 4 }}
  {{- end }}
spec:
  {{- if not .Values.autoscaling.enabled }}
  replicas: {{ .Values.replicaCount }}
  {{- end }}
  selector:
    matchLabels:
      {{- include "common.selectorLabels" . | nindent 6 }}
  template:
    metadata:
      {{- with .Values.podAnnotations }}
      annotations:
        {{- toYaml . | nindent 8 }}
      {{- end }}
      labels:
        {{- include "common.selectorLabels" . | nindent 8 }}
    spec:
      {{- with .Values.imagePullSecrets }}
      imagePullSecrets:
        {{- toYaml . | nindent 8 }}
      {{- end }}
      serviceAccountName: {{ include "common.serviceAccountName" . }}
      securityContext:
        {{- toYaml .Values.podSecurityContext | nindent 8 }}
      containers:
        - name: {{ .Chart.Name }}
          securityContext:
            {{- toYaml .Values.securityContext | nindent 12 }}
          image: "{{ .Values.image.repository }}:{{ .Values.image.tag | default .Chart.AppVersion }}"
          imagePullPolicy: {{ .Values.image.pullPolicy }}
          env:
            {{- range .Values.env }}
            - name: {{ .name }}
              {{- if .value }}
              value: {{ .value | quote }}
              {{- else if .valueFrom }}
              valueFrom:
                {{- toYaml .valueFrom | nindent 16 }}
              {{- end }}
            {{- end }}
          {{- if .Values.command }}
          command:
            {{- toYaml .Values.command | nindent 12 }}
          {{- end }}
          {{- if .Values.args }}
          args:
            {{- toYaml .Values.args | nindent 12 }}
          {{- end }}
          ports:
            - name: http
              containerPort: {{ .Values.service.port }}
              protocol: TCP
          {{- if .Values.livenessProbe }}
          livenessProbe:
            {{- toYaml .Values.livenessProbe | nindent 12 }}
          {{- end }}
          {{- if .Values.readinessProbe }}
          readinessProbe:
            {{- toYaml .Values.readinessProbe | nindent 12 }}
          {{- end }}
          resources:
            {{- toYaml .Values.resources | nindent 12 }}
          {{- with .Values.volumeMounts }}
          volumeMounts:
            {{- toYaml . | nindent 12 }}
          {{- end }}
      {{- with .Values.volumes }}
      volumes:
        {{- toYaml . | nindent 8 }}
      {{- end }}
      {{- with .Values.nodeSelector }}
      nodeSelector:
        {{- toYaml . | nindent 8 }}
      {{- end }}
      {{- with .Values.affinity }}
      affinity:
        {{- toYaml . | nindent 8 }}
      {{- end }}
      {{- with .Values.tolerations }}
      tolerations:
        {{- toYaml . | nindent 8 }}
      {{- end }}
{{- end -}}
```

**helm-charts/microservice-common/templates/service.yaml**:

```yaml
{{- define "common.service" -}}
apiVersion: v1
kind: Service
metadata:
  name: {{ include "common.fullname" . }}
  labels:
    {{- include "common.labels" . | nindent 4 }}
  {{- with .Values.service.annotations }}
  annotations:
    {{- toYaml . | nindent 4 }}
  {{- end }}
spec:
  type: {{ .Values.service.type }}
  ports:
    - port: {{ .Values.service.port }}
      targetPort: http
      protocol: TCP
      name: http
      {{- if and (eq .Values.service.type "NodePort") .Values.service.nodePort }}
      nodePort: {{ .Values.service.nodePort }}
      {{- end }}
  selector:
    {{- include "common.selectorLabels" . | nindent 4 }}
{{- end -}}
```

**helm-charts/microservice-common/templates/ingress.yaml**:

```yaml
{{- define "common.ingress" -}}
{{- if .Values.ingress.enabled -}}
{{- $fullName := include "common.fullname" . -}}
{{- $svcPort := .Values.service.port -}}
apiVersion: {{ include "common.ingress.apiVersion" . }}
kind: Ingress
metadata:
  name: {{ $fullName }}
  labels:
    {{- include "common.labels" . | nindent 4 }}
  {{- with .Values.ingress.annotations }}
  annotations:
    {{- toYaml . | nindent 4 }}
  {{- end }}
spec:
  {{- if .Values.ingress.className }}
  ingressClassName: {{ .Values.ingress.className }}
  {{- end }}
  {{- if .Values.ingress.tls }}
  tls:
    {{- range .Values.ingress.tls }}
    - hosts:
        {{- range .hosts }}
        - {{ . | quote }}
        {{- end }}
      secretName: {{ .secretName }}
    {{- end }}
  {{- end }}
  rules:
    {{- range .Values.ingress.hosts }}
    - host: {{ .host | quote }}
      http:
        paths:
          {{- range .paths }}
          - path: {{ .path }}
            {{- if semverCompare ">=1.19-0" $.Capabilities.KubeVersion.GitVersion }}
            pathType: {{ .pathType }}
            {{- end }}
            backend:
              {{- if semverCompare ">=1.19-0" $.Capabilities.KubeVersion.GitVersion }}
              service:
                name: {{ $fullName }}
                port:
                  number: {{ $svcPort }}
              {{- else }}
              serviceName: {{ $fullName }}
              servicePort: {{ $svcPort }}
              {{- end }}
          {{- end }}
    {{- end }}
{{- end }}
{{- end -}}
```

**helm-charts/microservice-common/templates/serviceaccount.yaml**:

```yaml
{{- define "common.serviceaccount" -}}
{{- if .Values.serviceAccount.create -}}
apiVersion: v1
kind: ServiceAccount
metadata:
  name: {{ include "common.serviceAccountName" . }}
  labels:
    {{- include "common.labels" . | nindent 4 }}
  {{- with .Values.serviceAccount.annotations }}
  annotations:
    {{- toYaml . | nindent 4 }}
  {{- end }}
{{- end }}
{{- end -}}
```

**helm-charts/microservice-common/templates/configmap.yaml**:

```yaml
{{- define "common.configmap" -}}
{{- if .Values.config }}
apiVersion: v1
kind: ConfigMap
metadata:
  name: {{ include "common.fullname" . }}
  labels:
    {{- include "common.labels" . | nindent 4 }}
data:
  {{- toYaml .Values.config | nindent 2 }}
{{- end }}
{{- end -}}
```

**helm-charts/microservice-common/templates/secret.yaml**:

```yaml
{{- define "common.secret" -}}
{{- if .Values.secrets }}
apiVersion: v1
kind: Secret
metadata:
  name: {{ include "common.fullname" . }}
  labels:
    {{- include "common.labels" . | nindent 4 }}
type: Opaque
data:
  {{- range $key, $value := .Values.secrets }}
  {{ $key }}: {{ $value | b64enc | quote }}
  {{- end }}
{{- end }}
{{- end -}}
```

**helm-charts/microservice-common/templates/hpa.yaml**:

```yaml
{{- define "common.hpa" -}}
{{- if .Values.autoscaling.enabled }}
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: {{ include "common.fullname" . }}
  labels:
    {{- include "common.labels" . | nindent 4 }}
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: {{ include "common.fullname" . }}
  minReplicas: {{ .Values.autoscaling.minReplicas }}
  maxReplicas: {{ .Values.autoscaling.maxReplicas }}
  metrics:
    {{- if .Values.autoscaling.targetCPUUtilizationPercentage }}
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: {{ .Values.autoscaling.targetCPUUtilizationPercentage }}
    {{- end }}
    {{- if .Values.autoscaling.targetMemoryUtilizationPercentage }}
    - type: Resource
      resource:
        name: memory
        target:
          type: Utilization
          averageUtilization: {{ .Values.autoscaling.targetMemoryUtilizationPercentage }}
    {{- end }}
{{- end }}
{{- end -}}
```

### API Service Chart

**helm-charts/api-service/Chart.yaml**:

```yaml
apiVersion: v2
name: api-service
description: API Service for microservices example
type: application
version: 0.1.0
appVersion: 1.0.0
dependencies:
  - name: microservice-common
    version: 0.1.0
    repository: file://../microservice-common
```

**helm-charts/api-service/values.yaml**:

```yaml
# Default values for api-service
replicaCount: 1

image:
  repository: ghcr.io/username/api-service
  pullPolicy: IfNotPresent
  tag: ''

imagePullSecrets: []
nameOverride: ''
fullnameOverride: ''

serviceAccount:
  create: true
  annotations: {}
  name: ''

podAnnotations: {}
podSecurityContext: {}

securityContext:
  runAsNonRoot: true
  runAsUser: 1000
  capabilities:
    drop:
      - ALL
  readOnlyRootFilesystem: true

service:
  type: ClusterIP
  port: 80
  annotations: {}

env:
  - name: LOG_LEVEL
    value: 'info'
  - name: PORT
    value: '3000'
  - name: RABBITMQ_URL
    value: 'amqp://rabbitmq:5672'

livenessProbe:
  httpGet:
    path: /health
    port: http
  initialDelaySeconds: 30
  periodSeconds: 10
  timeoutSeconds: 5
  failureThreshold: 6

readinessProbe:
  httpGet:
    path: /health
    port: http
  initialDelaySeconds: 5
  periodSeconds: 10
  timeoutSeconds: 5
  failureThreshold: 3

resources:
  limits:
    cpu: 500m
    memory: 512Mi
  requests:
    cpu: 100m
    memory: 128Mi

autoscaling:
  enabled: false
  minReplicas: 1
  maxReplicas: 10
  targetCPUUtilizationPercentage: 80
  targetMemoryUtilizationPercentage: 80

nodeSelector: {}
tolerations: []
affinity: {}

ingress:
  enabled: false
  className: ''
  annotations: {}
  hosts:
    - host: chart-example.local
      paths:
        - path: /
          pathType: ImplementationSpecific
  tls: []
```

**helm-charts/api-service/templates/deployment.yaml**:

```yaml
{ { - include "common.deployment" . - } }
```

**helm-charts/api-service/templates/service.yaml**:

```yaml
{ { - include "common.service" . - } }
```

**helm-charts/api-service/templates/ingress.yaml**:

```yaml
{ { - include "common.ingress" . - } }
```

**helm-charts/api-service/templates/serviceaccount.yaml**:

```yaml
{ { - include "common.serviceaccount" . - } }
```

**helm-charts/api-service/templates/hpa.yaml**:

```yaml
{ { - include "common.hpa" . - } }
```

### Worker Service Chart

**helm-charts/worker-service/Chart.yaml**:

```yaml
apiVersion: v2
name: worker-service
description: Worker Service for microservices example
type: application
version: 0.1.0
appVersion: 1.0.0
dependencies:
  - name: microservice-common
    version: 0.1.0
    repository: file://../microservice-common
```

**helm-charts/worker-service/values.yaml**:

```yaml
# Default values for worker-service
replicaCount: 1

image:
  repository: ghcr.io/username/worker-service
  pullPolicy: IfNotPresent
  tag: ''

imagePullSecrets: []
nameOverride: ''
fullnameOverride: ''

serviceAccount:
  create: true
  annotations: {}
  name: ''

podAnnotations: {}
podSecurityContext: {}

securityContext:
  runAsNonRoot: true
  runAsUser: 1000
  capabilities:
    drop:
      - ALL
  readOnlyRootFilesystem: true

service:
  type: ClusterIP
  port: 80
  annotations: {}

env:
  - name: LOG_LEVEL
    value: 'info'
  - name: RABBITMQ_URL
    value: 'amqp://rabbitmq:5672'
  - name: QUEUE_NAME
    value: 'tasks'

resources:
  limits:
    cpu: 500m
    memory: 512Mi
  requests:
    cpu: 100m
    memory: 128Mi

autoscaling:
  enabled: false
  minReplicas: 1
  maxReplicas: 10
  targetCPUUtilizationPercentage: 80
  targetMemoryUtilizationPercentage: 80

nodeSelector: {}
tolerations: []
affinity: {}
```

**helm-charts/worker-service/templates/deployment.yaml**:

```yaml
{ { - include "common.deployment" . - } }
```

**helm-charts/worker-service/templates/serviceaccount.yaml**:

```yaml
{ { - include "common.serviceaccount" . - } }
```

**helm-charts/worker-service/templates/hpa.yaml**:

```yaml
{ { - include "common.hpa" . - } }
```

### Umbrella Chart

**helm-charts/umbrella-chart/Chart.yaml**:

```yaml
apiVersion: v2
name: microservices-app
description: Umbrella chart for the entire microservices application
type: application
version: 0.1.0
appVersion: 1.0.0
dependencies:
  - name: api-service
    version: 0.1.0
    repository: file://../api-service
  - name: worker-service
    version: 0.1.0
    repository: file://../worker-service
  - name: rabbitmq
    version: 11.x.x
    repository: https://charts.bitnami.com/bitnami
    condition: rabbitmq.enabled
```

**helm-charts/umbrella-chart/values.yaml**:

```yaml
# Default values for umbrella chart

# API Service configuration
api-service:
  replicaCount: 2
  image:
    repository: ghcr.io/username/api-service
    tag: latest
  ingress:
    enabled: true
    className: nginx
    annotations:
      kubernetes.io/ingress.class: nginx
      cert-manager.io/cluster-issuer: letsencrypt-prod
    hosts:
      - host: api.example.com
        paths:
          - path: /
            pathType: Prefix
    tls:
      - secretName: api-tls
        hosts:
          - api.example.com
  env:
    - name: RABBITMQ_URL
      value: 'amqp://{{ .Release.Name }}-rabbitmq:5672'

# Worker Service configuration
worker-service:
  replicaCount: 2
  image:
    repository: ghcr.io/username/worker-service
    tag: latest
  env:
    - name: RABBITMQ_URL
      value: 'amqp://{{ .Release.Name }}-rabbitmq:5672'

# RabbitMQ configuration
rabbitmq:
  enabled: true
  auth:
    username: user
    password: password
  persistence:
    enabled: true
    storageClass: ''
    size: 8Gi
```

## GitHub Workflows

### Container Build Workflow

**.github/workflows/container-build.yml**:

````yaml
name: Build and Push Container Images

on:
  push:
    branches: [ main ]
    tags: [ 'v*' ]
  pull_request:
    branches: [ main ]

env:
  REGISTRY: ghcr.io
  IMAGE_NAME_PREFIX: ${{ github.repository }}

jobs:
  build-and-push-api:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
      security-events: write

    steps:
      - name: Checkout repository
        uses: actions/checkout@v3

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v2

      - name: Log in to the Container registry
        if: github.event_name != 'pull_request'
        uses: docker/login-action@v2
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Extract Docker metadata for API Service
        id: meta-api
        uses: docker/metadata-action@v4
        with:
          images: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME_PREFIX }}/api-service
          tags: |
            type=semver,pattern={{version}}
            type=semver,pattern={{major}}.{{minor}}
            type=sha,format=short
            type=ref,event=branch
            type=ref,event=pr
            type=raw,value=latest,enable=${{ github.ref == format('refs/heads/{0}', github.event.repository.default_branch) }}

      - name: Build and push API Service Docker image
        uses: docker/build-push-action@v4
        with:
          context: ./services/api-service
          push: ${{ github.event_name != 'pull_request' }}
          tags: ${{ steps.meta-api.outputs.tags }}
          labels: ${{ steps.meta-api.outputs.labels }}
          cache-from: type=gha
          cache-to: type=gha,mode=max

      - name: Run Trivy vulnerability scanner on API Service
        uses: aquasecurity/trivy-action@master
        with:
          image-ref: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME_PREFIX }}/api-service:${{ steps.meta-api.outputs.version }}
          format: 'sarif'
          output: 'trivy-results-api.sarif'
          severity: 'CRITICAL,HIGH'

      - name: Upload Trivy scan results for API Service
        uses: github/codeql-action/upload-sarif@v2
        if: always()
        with:
          sarif_file: 'trivy-results-api.sarif'

  build-and-push-worker:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
      security-events: write

    steps:
      - name: Checkout repository
        uses: actions/checkout@v3

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v2

      - name: Log in to the Container registry
        if: github.event_name != 'pull_request'
        uses: docker/login-action@v2
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Extract Docker metadata for Worker Service
        id: meta-worker
        uses: docker/metadata-action@v4
        with:
          images: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME_PREFIX }}/worker-service
          tags: |
            type=semver,pattern={{version}}
            type=semver,pattern={{major}}.{{minor}}
            type=sha,format=short
            type=ref,event=branch
            type=ref,event=pr
            type=raw,value=latest,enable=${{ github.ref == format('refs/heads/{0}', github.event.repository.default_branch) }}

      - name: Build and push Worker Service Docker image
        uses: docker/build-push-action@v4
        with:
          context: ./services/worker-service
          push: ${{ github.event_name != 'pull_request' }}
          tags: ${{ steps.meta-worker.outputs.tags }}
          labels: ${{ steps.meta-worker.outputs.labels }}
          cache-from: type=gha
          cache-to: type=gha,mode=max

      - name: Run Trivy vulnerability scanner on Worker Service
        uses: aquasecurity/trivy-action@master
        with:
          image-ref: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME_PREFIX }}/worker-service:${{ steps.meta-worker.outputs.version }}
          format: 'sarif'
          output: 'trivy-results-worker.sarif'
          severity: 'CRITICAL,HIGH'

      - name: Upload Trivy scan results for Worker Service
        uses: github/codeql-action/upload-sarif@v2
        if: always()
        with:
          sarif_file: 'trivy-results-worker.sarif'

### Helm Chart Test Workflow

**.github/workflows/helm-test.yml**:
```yaml
name: Test Helm Charts

on:
  push:
    branches: [ main ]
    paths:
      - 'helm-charts/**'
  pull_request:
    branches: [ main ]
    paths:
      - 'helm-charts/**'

jobs:
  lint-and-test:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
        with:
          fetch-depth: 0

      - name: Set up Helm
        uses: azure/setup-helm@v3
        with:
          version: v3.10.0

      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: 3.9

      - name: Set up chart-testing
        uses: helm/chart-testing-action@v2.3.1

      - name: Run chart-testing (lint)
        run: ct lint --target-branch ${{ github.event.repository.default_branch }} --charts helm-charts/*

      - name: Create kind cluster
        uses: helm/kind-action@v1.5.0
        if: github.event_name == 'pull_request'

      - name: Build dependencies
        run: |
          for chart in helm-charts/*/; do
            if [ -f "$chart/Chart.yaml" ]; then
              helm dependency build "$chart"
            fi
          done

      - name: Run chart-testing (install)
        run: ct install --target-branch ${{ github.event.repository.default_branch }} --charts helm-charts/*
        if: github.event_name == 'pull_request'
````

### TypeScript CI Workflow

**.github/workflows/typescript-ci.yml**:

```yaml
name: TypeScript CI

on:
  push:
    branches: [main]
    paths:
      - 'services/**/*.ts'
      - 'services/**/package*.json'
      - 'services/**/tsconfig.json'
  pull_request:
    branches: [main]
    paths:
      - 'services/**/*.ts'
      - 'services/**/package*.json'
      - 'services/**/tsconfig.json'

jobs:
  build-and-test:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        service: [api-service, worker-service]
        node-version: [18.x]

    steps:
      - name: Checkout repository
        uses: actions/checkout@v3

      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'
          cache-dependency-path: services/${{ matrix.service }}/package-lock.json

      - name: Install dependencies
        working-directory: services/${{ matrix.service }}
        run: npm ci

      - name: Lint
        working-directory: services/${{ matrix.service }}
        run: |
          if [ -f ".eslintrc.js" ] || [ -f ".eslintrc.json" ]; then
            npm run lint
          else
            echo "Linting not configured, skipping"
          fi

      - name: Type check
        working-directory: services/${{ matrix.service }}
        run: npx tsc --noEmit

      - name: Build
        working-directory: services/${{ matrix.service }}
        run: npm run build

      - name: Run tests
        working-directory: services/${{ matrix.service }}
        run: |
          if [ -d "__tests__" ] || grep -q "test" package.json; then
            npm test
          else
            echo "Tests not configured, skipping"
          fi
```

### Helm Chart Release Workflow

**.github/workflows/helm-release.yml**:

```yaml
name: Release Helm Charts

on:
  push:
    branches: [main]
    paths:
      - 'helm-charts/**'
    tags: ['chart-v*']

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
        with:
          fetch-depth: 0

      - name: Configure Git
        run: |
          git config user.name "$GITHUB_ACTOR"
          git config user.email "$GITHUB_ACTOR@users.noreply.github.com"

      - name: Install Helm
        uses: azure/setup-helm@v3
        with:
          version: v3.10.0

      - name: Add Helm repositories for dependencies
        run: |
          helm repo add bitnami https://charts.bitnami.com/bitnami
          helm repo update

      - name: Build dependencies
        run: |
          for chart in helm-charts/*/; do
            if [ -f "$chart/Chart.yaml" ]; then
              helm dependency build "$chart"
            fi
          done

      - name: Run chart-releaser
        uses: helm/chart-releaser-action@v1.5.0
        with:
          charts_dir: helm-charts
          config: cr.yaml
        env:
          CR_TOKEN: '${{ secrets.GITHUB_TOKEN }}'
```

## README.md

**README.md**:

````markdown
# Microservices Helm Example

This repository contains a reference implementation for distributing containerized microservices using GitHub Container Registry (GHCR) and Helm charts.

## Repository Structure

- `services/` - Source code for microservices
  - `api-service/` - REST API service (TypeScript)
  - `worker-service/` - Background worker service (TypeScript)
- `helm-charts/` - Helm charts for deployment
  - `microservice-common/` - Common templates library
  - `api-service/` - Chart for API service
  - `worker-service/` - Chart for worker service
  - `umbrella-chart/` - Main chart for deploying the entire application

## Development

### Prerequisites

- Docker & Docker Compose
- Node.js 18+
- Kubernetes cluster (for testing)
- Helm 3

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/username/microservices-helm-example.git
   cd microservices-helm-example
   ```
````

2. Start the development environment:

   ```bash
   docker-compose up -d
   ```

3. Access the API service at localhost:3000

### Building Container Images

Container images are automatically built and published to GitHub Container Registry by GitHub Actions.

To build manually:

```bash
# Build API Service
docker build -t ghcr.io/username/api-service:latest ./services/api-service

# Build Worker Service
docker build -t ghcr.io/username/worker-service:latest ./services/worker-service

# Push to GitHub Container Registry
docker push ghcr.io/username/api-service:latest
docker push ghcr.io/username/worker-service:latest
```

## Deployment

### Using Helm

1. Add the Helm repository:

   ```bash
   helm repo add microservices-helm-example https://username.github.io/microservices-helm-example
   helm repo update
   ```

2. Install the application:

   ```bash
   helm install myapp microservices-helm-example/microservices-app
   ```

3. Customize the installation with values:
   ```bash
   helm install myapp microservices-helm-example/microservices-app \
     --set api-service.replicas=3 \
     --set worker-service.replicas=2 \
     --values custom-values.yaml
   ```

### Configuration Options

See the values.yaml `helm-charts/umbrella-chart/values.yaml` file for all configuration options.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

**cr.yaml**:

```yaml
# Chart Releaser configuration file
owner: username # Replace with your GitHub username or organization
git-base-url: https://api.github.com/
chart-dirs:
  - helm-charts
index-path: ./index.yaml
release-name-template: 'chart-{{ .Version }}'
pages-branch: gh-pages
pages-index-path: index.yaml
charts-repo-url: https://username.github.io/microservices-helm-example # Replace with your actual GitHub Pages URL
```

## Implementation Guide for Containerized Microservices Distribution with GitHub Container Registry and Helm

This guide explains how to implement the distribution strategy for your containerized microservices using GitHub Container Registry (GHCR) and Helm charts based on the provided reference implementation.

## Overview

The distribution strategy we've designed allows you to:

1. Build and publish container images to GitHub Container Registry
2. Package and distribute your Kubernetes deployments as Helm charts
3. Implement automated CI/CD workflows for testing and releasing
4. Provide users with a simple installation experience

## Getting Started

### 1. Repository Structure

First, organize your repository following this structure:

```
your-project/
├── .github/                   # GitHub Actions workflows
├── services/                  # Microservices source code
├── helm-charts/               # Helm charts for deployment
│   ├── common-library/        # Common chart templates
│   ├── individual-services/   # Charts for each service
│   └── umbrella-chart/        # Main chart for complete app
├── README.md                  # Documentation
└── docker-compose.yml         # Local development setup
```

### 2. Setting Up GitHub Container Registry

1. Enable GitHub Container Registry in your repository:

   - Go to your repository settings
   - Navigate to "Packages" section
   - Ensure it's configured for public packages (for open source)

2. Create appropriate repository secrets for CI/CD:
   - If needed, create a `CR_PAT` secret with a personal access token that has the `write:packages` scope

### 3. Implementing Services

1. Create a Dockerfile for each service following the multi-stage build pattern for optimization
2. Use proper tagging strategy with semantic versioning
3. Implement comprehensive health checks
4. Configure security best practices (non-root user, minimal permissions)

### 4. Helm Chart Development

#### Library Chart

1. Create a common library chart with reusable templates:

   - Deployment template
   - Service template
   - Ingress template
   - ConfigMap/Secret templates
   - Helper functions

2. Use these templates in service-specific charts to maintain consistency

#### Service Charts

1. Create individual Helm charts for each microservice:
   - Define appropriate dependencies
   - Set sensible defaults in values.yaml
   - Include service-specific configurations

#### Umbrella Chart

1. Create an umbrella chart that depends on all service charts:
   - This allows users to deploy the entire application with a single command
   - Provides centralized configuration

### 5. Setting Up CI/CD Workflows

1. Container Build Workflow:

   - Builds and pushes container images to GHCR
   - Runs security scanning
   - Generates SBOMs

2. TypeScript CI Workflow:

   - Runs linting, type checking, and tests on TypeScript code
   - Ensures code quality before deployment

3. Helm Test Workflow:

   - Validates Helm charts
   - Tests chart installation in a kind cluster

4. Helm Release Workflow:
   - Packages and publishes Helm charts to GitHub Pages
   - Creates GitHub Releases with proper versioning

### 6. Documentation

1. Create comprehensive documentation:
   - Installation instructions
   - Configuration options
   - Upgrade procedures
   - Contribution guidelines

## Implementation Steps

### Step 1: Set Up Repository

1. Create a new GitHub repository for your project
2. Initialize the basic directory structure
3. Add initial documentation

### Step 2: Implement Microservices

1. Develop and test your microservices locally
2. Create Dockerfiles for each service
3. Add health check endpoints for Kubernetes compatibility
4. Implement proper logging and error handling

### Step 3: Create Docker Compose for Local Development

1. Create a `docker-compose.yml` file for local development:

   - Define all required services
   - Set up development environment variables
   - Configure appropriate volumes for hot reloading
   - Add any dependencies (databases, message queues, etc.)

2. Test locally to ensure everything works correctly:
   ```bash
   docker-compose up -d
   ```

### Step 4: Create GitHub Actions Workflows

1. Create the Container Build workflow:

   - Configure it to trigger on relevant pushes/PRs
   - Add steps for building and pushing to GHCR
   - Set up vulnerability scanning
   - Generate and store SBOMs

2. Create the TypeScript CI workflow:

   - Configure it to run on relevant code changes
   - Set up steps for linting, testing, and building
   - Ensure proper caching for dependencies

3. Test the workflows by pushing to GitHub

### Step 5: Develop Helm Charts

1. Create the common library chart:

   - Implement reusable templates
   - Add helper functions
   - Document the templates properly

2. Create service-specific charts:

   - Define each service's specific requirements
   - Set appropriate defaults
   - Include comprehensive documentation

3. Create the umbrella chart:

   - Add dependencies to all service charts
   - Configure service interactions
   - Add appropriate default values

4. Test the charts locally:
   ```bash
   helm lint helm-charts/*
   helm template helm-charts/umbrella-chart
   ```

### Step 6: Set Up Helm Release Workflow

1. Create a GitHub Pages branch for hosting the Helm repository:

   ```bash
   git checkout --orphan gh-pages
   git reset --hard
   git commit --allow-empty -m "Initialize gh-pages branch"
   git push origin gh-pages
   ```

2. Create the Helm Release workflow:

   - Configure it to trigger on chart changes and tags
   - Set up chart-releaser action
   - Add appropriate configuration

3. Add configuration for chart-releaser in `cr.yaml`

### Step 7: Test End-to-End

1. Push changes to trigger the workflows
2. Verify container images are published to GHCR
3. Confirm Helm charts are published to GitHub Pages
4. Test chart installation in a test cluster:
   ```bash
   helm repo add myapp https://username.github.io/myapp
   helm repo update
   helm install test-release myapp/umbrella-chart
   ```

### Step 8: Document the Process

1. Update your README.md with comprehensive information:

   - Overview of the project architecture
   - Local development instructions
   - Deployment options
   - Configuration details
   - Contributing guidelines

2. Add a CHANGELOG.md to track changes
3. Add a CONTRIBUTING.md to guide contributors

## Best Practices

### Container Best Practices

1. **Security**:

   - Use minimal base images (Alpine, distroless)
   - Avoid running as root
   - Scan for vulnerabilities regularly
   - Keep dependencies updated

2. **Performance**:

   - Use multi-stage builds
   - Minimize image size
   - Optimize layer caching
   - Implement proper health checks

3. **CI/CD**:
   - Automate image building
   - Implement proper tagging strategy
   - Use immutable tags
   - Sign your images

### Helm Chart Best Practices

1. **Structure**:

   - Use library charts for common templates
   - Follow standard naming conventions
   - Provide comprehensive documentation
   - Set sensible defaults

2. **Values**:

   - Document all configurable values
   - Provide validation (using JSON schema)
   - Use consistent structure across charts
   - Support common Kubernetes patterns

3. **Testing**:

   - Lint charts as part of CI
   - Test installation in CI
   - Validate against multiple Kubernetes versions
   - Include Helm tests for runtime validation

4. **Versioning**:
   - Follow semantic versioning
   - Document breaking changes
   - Maintain a changelog
   - Support backward compatibility where possible

## Troubleshooting

### Common Issues and Solutions

1. **GitHub Container Registry Access Issues**:

   - Ensure proper permissions on the repository
   - Verify GitHub token has appropriate scopes
   - Check Docker login configuration

2. **Helm Chart Publishing Problems**:

   - Verify gh-pages branch exists and is properly configured
   - Check GitHub Actions permissions
   - Validate chart versions are incremented
   - Inspect chart-releaser logs

3. **Container Build Failures**:

   - Check Dockerfile syntax
   - Verify base images are accessible
   - Ensure build context is correct
   - Look for dependency issues

4. **Chart Installation Issues**:
   - Validate chart against Kubernetes version
   - Check for missing dependencies
   - Verify values configuration
   - Use `--debug` flag with Helm commands

## Maintenance and Updates

### Regular Maintenance Tasks

1. **Dependency Updates**:

   - Regularly update base images
   - Keep Node.js dependencies current
   - Update Helm chart dependencies
   - Apply security patches promptly

2. **Chart Updates**:

   - Increment chart versions appropriately
   - Document changes in changelogs
   - Test thoroughly before release
   - Consider backward compatibility

3. **Documentation**:
   - Keep README up to date
   - Document new features
   - Update installation instructions
   - Maintain versioned documentation

### Upgrade Process

1. **Patch Updates** (bug fixes):

   - Increment patch version
   - Maintain backward compatibility
   - Document fixes in changelog
   - Automated deployment usually safe

2. **Minor Updates** (new features):

   - Increment minor version
   - Maintain backward compatibility
   - Document new features
   - Test thoroughly before release

3. **Major Updates** (breaking changes):
   - Increment major version
   - Clearly document breaking changes
   - Provide migration guides
   - Consider supporting previous version temporarily

## Conclusion

By following this implementation guide, you can establish a robust and user-friendly distribution strategy for your containerized microservices application. The combination of GitHub Container Registry and Helm provides an industry-standard approach that users will find familiar and easy to work with.

The reference implementation provides a concrete starting point that you can adapt to your specific needs. Remember to maintain proper documentation and follow best practices to ensure a positive experience for your users.
