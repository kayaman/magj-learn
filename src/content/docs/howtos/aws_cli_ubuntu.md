---
title: AWS CLI on Ubuntu
description: Installing and Configuring AWS CLI on Ubuntu 24.04
---

## Installing and Configuring AWS CLI on Ubuntu 24.04

### Prerequisites
- Ubuntu 24.04 LTS installed
- User with sudo privileges
- Internet connection

### Installation Methods

#### Method 1: Using APT (Recommended)

```bash
# Update package lists
sudo apt update

# Install AWS CLI
sudo apt install awscli -y

# Verify installation
aws --version
```

#### Method 2: Using PIP

```bash
# Update package lists
sudo apt update

# Install Python and PIP if not already installed
sudo apt install python3 python3-pip -y

# Install AWS CLI
pip3 install awscli --upgrade --user

# Add to PATH if needed (add to ~/.bashrc)
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc

# Verify installation
aws --version
```

#### Method 3: Using the Bundled Installer

```bash
# Update package lists
sudo apt update

# Install required dependencies
sudo apt install unzip curl -y

# Download the AWS CLI installer
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"

# Unzip the installer
unzip awscliv2.zip

# Run the install script
sudo ./aws/install

# Verify installation
aws --version
```

### Configuration

Configure AWS CLI with your credentials:

```bash
aws configure
```

You'll be prompted to enter:
1. AWS Access Key ID
2. AWS Secret Access Key
3. Default region name (e.g., us-east-1, eu-west-1)
4. Default output format (json, text, or yaml)

### Creating Named Profiles

To create additional named profiles:

```bash
aws configure --profile profilename
```

### Verifying Configuration

Your configuration is stored in:
- `~/.aws/credentials` - Contains your access keys
- `~/.aws/config` - Contains region and output settings

To test your configuration:

```bash
# Using default profile
aws s3 ls

# Using named profile
aws s3 ls --profile profilename
```

### Updating AWS CLI

To update an installation done via apt:

```bash
sudo apt update && sudo apt upgrade awscli
```

To update an installation done via pip:

```bash
pip3 install awscli --upgrade --user
```
