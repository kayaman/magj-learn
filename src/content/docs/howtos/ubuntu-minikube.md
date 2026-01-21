---
title: Minikube on Ubuntu
description: Docker and Minikube Setup Guide for Ubuntu 24.04
---

## Docker and Minikube Setup Guide for Ubuntu 24.04

This guide provides instructions for setting up Docker and Minikube on Ubuntu 24.04, along with useful shell scripts to automate the process.

### Table of Contents

- [Manual Installation](#manual-installation)
  - [Installing Docker](#installing-docker)
  - [Installing Minikube](#installing-minikube)
  - [Starting Minikube](#starting-minikube)
  - [Additional Tips](#additional-tips)
- [Installation Scripts](#installation-scripts)
  - [How to Use the Scripts](#how-to-use-the-scripts)
  - [Script Descriptions](#script-descriptions)
- [Script Contents](#script-contents)
  - [install-docker.sh](#install-dockersh)
  - [install-minikube.sh](#install-minikubesh)
  - [minikube-utils.sh](#minikube-utilssh)
  - [setup-all.sh](#setup-allsh)

### Manual Installation

#### Installing Docker

1. First, update your system packages:
```bash
sudo apt update
sudo apt upgrade -y
```

2. Install required packages for Docker:
```bash
sudo apt install -y apt-transport-https ca-certificates curl software-properties-common
```

3. Add Docker's official GPG key:
```bash
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
```

4. Set up the Docker repository:
```bash
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

5. Update package lists again and install Docker:
```bash
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io
```

6. Verify Docker installation:
```bash
sudo docker --version
```

7. Add your user to the Docker group to run Docker without sudo:
```bash
sudo usermod -aG docker $USER
```
   Note: You'll need to log out and log back in for this change to take effect.

8. Verify Docker is working correctly:
```bash
docker run hello-world
```

#### Installing Minikube

1. Install required packages for Minikube:
```bash
sudo apt install -y curl wget apt-transport-https
```

2. Download the latest Minikube binary:
```bash
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
```

3. Install Minikube:
```bash
sudo install minikube-linux-amd64 /usr/local/bin/minikube
```

4. Install kubectl:
```bash
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
```

5. Verify the installations:
```bash
minikube version
kubectl version --client
```

#### Starting Minikube

1. Start Minikube with Docker as the driver:
```bash
minikube start --driver=docker
```

2. Verify Minikube status:
```bash
minikube status
```

3. Enable the Kubernetes dashboard (optional):
```bash
minikube dashboard
```

#### Additional Tips

- To stop Minikube when not in use:
```bash
minikube stop
```

- To delete the Minikube cluster:
```bash
minikube delete
```

- To set Docker as the default driver for Minikube:
```bash
minikube config set driver docker
```

### Installation Scripts

To make the installation process easier, you can use the following shell scripts.

#### How to Use the Scripts

1. Save all four scripts to the same directory.

2. Make them executable:
   ```bash
   chmod +x install-docker.sh install-minikube.sh minikube-utils.sh setup-all.sh
   ```

3. To perform a complete installation, run:
   ```bash
   ./setup-all.sh
   ```

4. After installation completes, log out and log back in for the Docker group changes to take effect.

5. To manage your Minikube cluster, use the utility script:
   ```bash
   ./minikube-utils.sh start     # Start Minikube
   ./minikube-utils.sh status    # Check status
   ./minikube-utils.sh dashboard # Open Kubernetes dashboard
   ./minikube-utils.sh help      # See all available commands
   ```

#### Script Descriptions

1. **install-docker.sh** - Automates the Docker installation process
2. **install-minikube.sh** - Installs Minikube and kubectl 
3. **minikube-utils.sh** - Provides a convenient interface for managing your Minikube cluster
4. **setup-all.sh** - Master script that runs the installation scripts in sequence

### Script Contents

#### install-docker.sh

```bash
#!/bin/bash

# install-docker.sh
# Script to install Docker on Ubuntu 24.04
# Usage: bash install-docker.sh

set -e  # Exit immediately if a command exits with a non-zero status

echo "=== Installing Docker on Ubuntu 24.04 ==="
echo "Updating system packages..."
sudo apt update
sudo apt upgrade -y

echo "Installing prerequisites..."
sudo apt install -y apt-transport-https ca-certificates curl software-properties-common

echo "Adding Docker's official GPG key..."
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

echo "Setting up Docker repository..."
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

echo "Installing Docker..."
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io

echo "Adding current user to the Docker group..."
sudo usermod -aG docker $USER

echo "Verifying Docker installation..."
docker --version

echo "===================================="
echo "Docker has been successfully installed!"
echo "Please log out and log back in for the group changes to take effect."
echo "After logging back in, run 'docker run hello-world' to verify the installation."
echo "===================================="
```

#### install-minikube.sh

```bash
#!/bin/bash

# install-minikube.sh
# Script to install Minikube and kubectl on Ubuntu 24.04
# Usage: bash install-minikube.sh

set -e  # Exit immediately if a command exits with a non-zero status

echo "=== Installing Minikube on Ubuntu 24.04 ==="
echo "Installing prerequisites..."
sudo apt install -y curl wget apt-transport-https

echo "Downloading Minikube..."
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64

echo "Installing Minikube..."
sudo install minikube-linux-amd64 /usr/local/bin/minikube
rm minikube-linux-amd64

echo "Downloading kubectl..."
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"

echo "Installing kubectl..."
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
rm kubectl

echo "Verifying installations..."
echo "Minikube version:"
minikube version
echo "Kubectl version:"
kubectl version --client

echo "Setting Docker as the default driver for Minikube..."
minikube config set driver docker

echo "===================================="
echo "Minikube and kubectl have been successfully installed!"
echo "To start Minikube, run: minikube start"
echo "===================================="
```

#### minikube-utils.sh

```bash
#!/bin/bash

# minikube-utils.sh
# Utility script for managing Minikube
# Usage: bash minikube-utils.sh [command]

set -e  # Exit immediately if a command exits with a non-zero status

# Show usage information
show_usage() {
  echo "Minikube Utility Script"
  echo "Usage: bash minikube-utils.sh [command]"
  echo ""
  echo "Available commands:"
  echo "  start     - Start Minikube cluster"
  echo "  stop      - Stop Minikube cluster"
  echo "  status    - Check Minikube status"
  echo "  delete    - Delete Minikube cluster"
  echo "  dashboard - Open Kubernetes dashboard"
  echo "  addons    - List and enable/disable addons"
  echo "  help      - Show this help information"
  echo ""
  echo "Examples:"
  echo "  bash minikube-utils.sh start"
  echo "  bash minikube-utils.sh addons enable ingress"
}

# Start Minikube
start_minikube() {
  echo "Starting Minikube with Docker driver..."
  minikube start --driver=docker
  echo "Minikube started successfully."
  minikube status
}

# Stop Minikube
stop_minikube() {
  echo "Stopping Minikube..."
  minikube stop
  echo "Minikube stopped."
}

# Check Minikube status
check_status() {
  echo "Checking Minikube status..."
  minikube status
}

# Delete Minikube cluster
delete_minikube() {
  echo "Deleting Minikube cluster..."
  minikube delete
  echo "Minikube cluster deleted."
}

# Open Kubernetes dashboard
open_dashboard() {
  echo "Opening Kubernetes dashboard in your default browser..."
  minikube dashboard
}

# Manage addons
manage_addons() {
  if [ "$#" -eq 0 ]; then
    echo "Listing available addons..."
    minikube addons list
    echo ""
    echo "To enable an addon: bash minikube-utils.sh addons enable ADDON_NAME"
    echo "To disable an addon: bash minikube-utils.sh addons disable ADDON_NAME"
    return
  fi
  
  action=$1
  addon=$2
  
  if [ "$action" = "enable" ]; then
    echo "Enabling $addon addon..."
    minikube addons enable $addon
    echo "$addon addon enabled."
  elif [ "$action" = "disable" ]; then
    echo "Disabling $addon addon..."
    minikube addons disable $addon
    echo "$addon addon disabled."
  else
    echo "Unknown addon action: $action"
    echo "Use 'enable' or 'disable'"
  fi
}

# Main function
main() {
  if [ "$#" -eq 0 ]; then
    show_usage
    exit 0
  fi

  command=$1
  shift  # Remove the first argument (the command) from the arguments list

  case $command in
    start)
      start_minikube
      ;;
    stop)
      stop_minikube
      ;;
    status)
      check_status
      ;;
    delete)
      delete_minikube
      ;;
    dashboard)
      open_dashboard
      ;;
    addons)
      manage_addons "$@"
      ;;
    help)
      show_usage
      ;;
    *)
      echo "Unknown command: $command"
      show_usage
      exit 1
      ;;
  esac
}

# Run the main function with all arguments
main "$@"
```

#### setup-all.sh

```bash
#!/bin/bash

# setup-all.sh
# Master script to setup Docker and Minikube on Ubuntu 24.04
# Usage: bash setup-all.sh

set -e  # Exit immediately if a command exits with a non-zero status

echo "================================================================"
echo "Starting complete Docker and Minikube setup for Ubuntu 24.04"
echo "================================================================"

# Make sure all scripts are executable
chmod +x install-docker.sh
chmod +x install-minikube.sh
chmod +x minikube-utils.sh

# Step 1: Install Docker
echo "Step 1: Installing Docker..."
./install-docker.sh

# Step 2: Install Minikube and kubectl
echo "Step 2: Installing Minikube and kubectl..."
./install-minikube.sh

echo "================================================================"
echo "Setup complete! Please log out and log back in for Docker group"
echo "changes to take effect. After logging back in, you can use"
echo "minikube-utils.sh to manage your Minikube cluster."
echo ""
echo "Example commands:"
echo "  bash minikube-utils.sh start     - Start Minikube"
echo "  bash minikube-utils.sh dashboard - Open Kubernetes dashboard"
echo "  bash minikube-utils.sh help      - See all available commands"
echo "================================================================"
```
