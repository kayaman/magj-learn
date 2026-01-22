---
title: GitHub cli on Ubuntu
description: gh
---

## Installing GitHub CLI (gh) on Ubuntu 24.04

The GitHub CLI (`gh`) is a powerful command-line tool that allows you to interact with GitHub directly from your terminal. Here's how to install it on your Ubuntu 24.04 system:

### Method 1: Install from APT Repository (Recommended)

GitHub provides an official APT repository for Ubuntu. This is the recommended method as it will ensure you get the latest version and automatic updates.

```bash
# 1. Install dependencies
sudo apt update
sudo apt install curl

# 2. Add the GitHub CLI repository GPG key
curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg

# 3. Add the GitHub CLI repository
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null

# 4. Update package lists and install gh
sudo apt update
sudo apt install gh
```

### Method 2: Install via Snap

If you prefer using snap packages, you can install GitHub CLI this way:

```bash
sudo snap install gh
```

### Authenticate with GitHub

After installation, you need to authenticate with your GitHub account:

```bash
gh auth login
```

Follow the interactive prompts:
- Select GitHub.com (not enterprise)
- Choose your preferred protocol (HTTPS or SSH)
- Choose how you want to authenticate (browser or token)

### Verify Installation

Verify that the CLI was installed correctly:

```bash
gh --version
```

### Basic Usage Examples

Here are some common commands to get started:

```bash
# Clone a repository
gh repo clone username/repository

# Create a new repository
gh repo create my-project

# Create a new issue
gh issue create

# Create a pull request
gh pr create

# View repository status
gh repo view

# List your pull requests
gh pr list
```

### Configure CLI Settings (Optional)

You can set various configuration options:

```bash
# Set editor
gh config set editor vim

# Set browser
gh config set browser firefox

# Display all configuration settings
gh config list
```

Now you have GitHub CLI installed and configured on your Ubuntu 24.04 system!
