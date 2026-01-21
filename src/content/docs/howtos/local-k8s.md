---
title: Local Kubernetes
description: by Claude
---

## Local Kubernetes Development with Podman, Kind, and Helm

I'll walk you through setting up a complete local development environment using Podman, Kind, and Helm to build, manage, and deploy containerized applications.

### 1. Setting Up Podman & Podman Desktop

**Install Podman:**
- On Fedora/RHEL: `sudo dnf install podman`
- On Ubuntu: `sudo apt install podman`
- On macOS: `brew install podman`

**Install Podman Desktop:**
Download from [podman-desktop.io](https://podman-desktop.io) or install via package manager:
- macOS: `brew install podman-desktop`
- Linux: Download the AppImage from the official website

**Initialize Podman Machine (macOS/Windows):**
```bash
podman machine init
podman machine start
```

**Verify Installation:**
```bash
podman info
```

### 2. Setting Up Kind (Kubernetes in Docker/Podman)

**Install Kind:**
```bash
# Using Go
go install sigs.k8s.io/kind@latest

# Using package managers
# macOS
brew install kind

# Linux
curl -Lo ./kind https://kind.sigs.k8s.io/dl/latest/kind-linux-amd64
chmod +x ./kind
sudo mv ./kind /usr/local/bin/
```

**Configure Podman for Kind:**
Kind uses the Docker socket by default. To use Podman:

```bash
export KIND_EXPERIMENTAL_PROVIDER=podman
```

**Create a Kind Cluster:**
```bash
kind create cluster --name my-cluster
```

**Verify Cluster:**
```bash
kubectl cluster-info --context kind-my-cluster
```

### 3. Install Helm

```bash
# macOS
brew install helm

# Linux
curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash
```

### 4. Building Images with Podman

**Create a Simple Application:**
Create a Dockerfile for your application:

```dockerfile
FROM nginx:alpine
COPY index.html /usr/share/nginx/html/
```

Create a simple index.html:
```html
<!DOCTYPE html>
<html>
<body>
  <h1>Hello from Podman and Kind!</h1>
</body>
</html>
```

**Build the Image:**
```bash
podman build -t my-app:latest .
```

### 5. Loading Images into Kind

Since Kind runs as a separate environment, you need to load your local images into it:

```bash
# Save the image to a tar file
podman save my-app:latest -o my-app.tar

# Load the image into Kind
kind load image-archive my-app.tar --name my-cluster
```

Alternatively, you can push to a registry that Kind can access.

### 6. Creating a Helm Chart

**Initialize a Helm Chart:**
```bash
helm create my-app
```

**Modify the Helm Chart:**
Edit `my-app/values.yaml` to use your image:
```yaml
image:
  repository: my-app
  tag: latest
  pullPolicy: IfNotPresent
```

**Install the Helm Chart:**
```bash
helm install my-release ./my-app
```

### 7. Complete Workflow Example

Here's a complete workflow script that ties everything together:

```bash
# Build the image
podman build -t my-app:latest .

# Save the image
podman save my-app:latest -o my-app.tar

# Load the image into Kind
kind load image-archive my-app.tar --name my-cluster

# Deploy with Helm
helm install my-release ./my-app
```

### 8. Accessing Your Application

After deployment, access your application:

```bash
kubectl port-forward svc/my-release-my-app 8080:80
```

Then visit `http://localhost:8080` in your browser.

### 9. Updating Your Application

When you make changes:

```bash
# Rebuild image
podman build -t my-app:latest .

# Save and load into Kind
podman save my-app:latest -o my-app.tar
kind load image-archive my-app.tar --name my-cluster

# Upgrade Helm release
helm upgrade my-release ./my-app
```

Would you like me to elaborate on any specific part of this workflow?
