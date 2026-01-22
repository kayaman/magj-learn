---
title: Terraform on Ubuntu
description: Setting Up Terraform, Packer, and Recommended Add-ons on Ubuntu 24.04
---

## Setting Up Terraform, Packer, and Recommended Add-ons on Ubuntu 24.04

This guide will walk you through installing Terraform, Packer, and recommended add-ons on a new Ubuntu 24.04 system.

### Prerequisites

First, update your system:

```bash
sudo apt update
sudo apt upgrade -y
```

Install required dependencies:

```bash
sudo apt install -y curl wget unzip software-properties-common gnupg lsb-release apt-transport-https ca-certificates
```

### Installing Terraform

#### Add HashiCorp GPG Key and Repository

```bash
wget -O- https://apt.releases.hashicorp.com/gpg | gpg --dearmor | sudo tee /usr/share/keyrings/hashicorp-archive-keyring.gpg >/dev/null
echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list
sudo apt update
```

#### Install Terraform

```bash
sudo apt install terraform -y
```

#### Verify Installation

```bash
terraform --version
```

### Installing Packer

Packer is also available from the HashiCorp repository we just added:

```bash
sudo apt install packer -y
```

#### Verify Installation

```bash
packer --version
```

### Recommended Add-ons

#### 1. Terraform-docs

Terraform-docs generates documentation from Terraform modules:

```bash
TFDOCS_VERSION=v0.16.0
curl -Lo ./terraform-docs.tar.gz https://github.com/terraform-docs/terraform-docs/releases/download/${TFDOCS_VERSION}/terraform-docs-${TFDOCS_VERSION}-linux-amd64.tar.gz
tar -xzf terraform-docs.tar.gz
chmod +x terraform-docs
sudo mv terraform-docs /usr/local/bin/
```

Verify:
```bash
terraform-docs --version
```

#### 2. TFLint

TFLint is a Terraform linter that helps identify potential issues:

```bash
curl -s https://raw.githubusercontent.com/terraform-linters/tflint/master/install_linux.sh | bash
```

Verify:
```bash
tflint --version
```

#### 3. Terragrunt

Terragrunt is a thin wrapper for Terraform that provides extra tools for keeping configurations DRY:

```bash
TERRAGRUNT_VERSION=v0.45.0
wget https://github.com/gruntwork-io/terragrunt/releases/download/${TERRAGRUNT_VERSION}/terragrunt_linux_amd64
chmod +x terragrunt_linux_amd64
sudo mv terragrunt_linux_amd64 /usr/local/bin/terragrunt
```

Verify:
```bash
terragrunt --version
```

#### 4. AWS CLI (Optional, for AWS users)

```bash
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
```

Verify:
```bash
aws --version
```

#### 5. Azure CLI (Optional, for Azure users)

```bash
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash
```

Verify:
```bash
az --version
```

#### 6. Google Cloud SDK (Optional, for GCP users)

```bash
echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] https://packages.cloud.google.com/apt cloud-sdk main" | sudo tee -a /etc/apt/sources.list.d/google-cloud-sdk.list
curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key --keyring /usr/share/keyrings/cloud.google.gpg add -
sudo apt update && sudo apt install google-cloud-sdk -y
```

Verify:
```bash
gcloud --version
```

### Setting Up Shell Completion

#### Terraform Completion

For Bash:
```bash
terraform -install-autocomplete
```

For ZSH, add to your ~/.zshrc:
```bash
autoload -U +X bashcompinit && bashcompinit
complete -o nospace -C /usr/bin/terraform terraform
```

#### Packer Completion

For Bash users, add to your ~/.bashrc:
```bash
complete -C /usr/bin/packer packer
```

For ZSH users, add to your ~/.zshrc:
```bash
autoload -U +X bashcompinit && bashcompinit
complete -o nospace -C /usr/bin/packer packer
```

### VSCode Integration (Optional)

Install Visual Studio Code:

```bash
sudo apt install software-properties-common apt-transport-https wget -y
wget -q https://packages.microsoft.com/keys/microsoft.asc -O- | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://packages.microsoft.com/repos/vscode stable main"
sudo apt update
sudo apt install code -y
```

Recommended VSCode extensions for Terraform:
- HashiCorp Terraform
- Terraform Docs Snippets
- Terragrunt

Install these extensions from the command line:

```bash
code --install-extension hashicorp.terraform
code --install-extension mindginative.terraform-snippets
code --install-extension 4ops.terraform
```

### Final Steps

Remember to reload your shell configuration after making changes:

```bash
source ~/.bashrc  # for Bash
# OR
source ~/.zshrc   # for ZSH
```

Now your Ubuntu 24.04 system is ready for infrastructure as code development with Terraform and Packer!

## Complete script

```sh
#!/bin/bash
# Script to set up Terraform, Packer, and recommended add-ons on Ubuntu 24.04
# Optimized for ZSH users

# Exit on error
set -e

echo "=== Starting Terraform, Packer, and tools installation ==="

# Update system
echo "=== Updating system packages ==="
sudo apt update
sudo apt upgrade -y

# Install dependencies
echo "=== Installing dependencies ==="
sudo apt install -y curl wget unzip software-properties-common gnupg lsb-release apt-transport-https ca-certificates jq git

# Add HashiCorp GPG key and repository
echo "=== Adding HashiCorp repository ==="
wget -O- https://apt.releases.hashicorp.com/gpg | gpg --dearmor | sudo tee /usr/share/keyrings/hashicorp-archive-keyring.gpg >/dev/null
echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list
sudo apt update

# Install Terraform and Packer
echo "=== Installing Terraform and Packer ==="
sudo apt install -y terraform packer

# Verify installations
terraform --version
packer --version

# Install terraform-docs
echo "=== Installing terraform-docs ==="
TFDOCS_VERSION=v0.16.0
curl -Lo ./terraform-docs.tar.gz https://github.com/terraform-docs/terraform-docs/releases/download/${TFDOCS_VERSION}/terraform-docs-${TFDOCS_VERSION}-linux-amd64.tar.gz
tar -xzf terraform-docs.tar.gz
chmod +x terraform-docs
sudo mv terraform-docs /usr/local/bin/
rm terraform-docs.tar.gz
terraform-docs --version

# Install TFLint
echo "=== Installing TFLint ==="
curl -s https://raw.githubusercontent.com/terraform-linters/tflint/master/install_linux.sh | bash
tflint --version

# Install Terragrunt
echo "=== Installing Terragrunt ==="
TERRAGRUNT_VERSION=v0.45.0
wget https://github.com/gruntwork-io/terragrunt/releases/download/${TERRAGRUNT_VERSION}/terragrunt_linux_amd64
chmod +x terragrunt_linux_amd64
sudo mv terragrunt_linux_amd64 /usr/local/bin/terragrunt
terragrunt --version

# Prompt for cloud provider CLI installations
echo "=== Cloud Provider CLI installations ==="
read -p "Install AWS CLI? (y/n): " install_aws
if [[ $install_aws == "y" || $install_aws == "Y" ]]; then
  echo "Installing AWS CLI..."
  curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
  unzip awscliv2.zip
  sudo ./aws/install
  rm -rf aws awscliv2.zip
  aws --version
fi

read -p "Install Azure CLI? (y/n): " install_azure
if [[ $install_azure == "y" || $install_azure == "Y" ]]; then
  echo "Installing Azure CLI..."
  curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash
  az --version
fi

read -p "Install Google Cloud SDK? (y/n): " install_gcp
if [[ $install_gcp == "y" || $install_gcp == "Y" ]]; then
  echo "Installing Google Cloud SDK..."
  echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] https://packages.cloud.google.com/apt cloud-sdk main" | sudo tee -a /etc/apt/sources.list.d/google-cloud-sdk.list
  curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key --keyring /usr/share/keyrings/cloud.google.gpg add -
  sudo apt update && sudo apt install google-cloud-sdk -y
  gcloud --version
fi

# Set up shell completions for ZSH
echo "=== Setting up ZSH completions ==="
if [ -f ~/.zshrc ]; then
  # Check if completions are already configured
  if ! grep -q "terraform completion" ~/.zshrc; then
    cat << 'EOF' >> ~/.zshrc

# HashiCorp tool completions
autoload -U +X bashcompinit && bashcompinit
complete -o nospace -C /usr/bin/terraform terraform
complete -o nospace -C /usr/bin/packer packer
complete -o nospace -C /usr/local/bin/terragrunt terragrunt

# Add aliases for common Terraform commands
alias tf='terraform'
alias tfi='terraform init'
alias tfp='terraform plan'
alias tfa='terraform apply'
alias tfd='terraform destroy'
alias tfo='terraform output'
alias tfs='terraform state'
alias tfv='terraform validate'
alias tfmt='terraform fmt'

# Add aliases for common Packer commands
alias pk='packer'
alias pkb='packer build'
alias pkv='packer validate'
alias pkf='packer fmt'

# Add aliases for Terragrunt
alias tg='terragrunt'
alias tgi='terragrunt init'
alias tgp='terragrunt plan'
alias tga='terragrunt apply'
alias tgd='terragrunt destroy'
EOF
    echo "Added tool completions and aliases to ~/.zshrc"
  else
    echo "ZSH completions already configured"
  fi
else
  echo "ZSH configuration file (~/.zshrc) not found"
fi

# Install VSCode and extensions (optional)
read -p "Install Visual Studio Code and Terraform extensions? (y/n): " install_vscode
if [[ $install_vscode == "y" || $install_vscode == "Y" ]]; then
  echo "Installing VSCode and extensions..."
  sudo apt install software-properties-common apt-transport-https wget -y
  wget -q https://packages.microsoft.com/keys/microsoft.asc -O- | sudo apt-key add -
  sudo add-apt-repository "deb [arch=amd64] https://packages.microsoft.com/repos/vscode stable main"
  sudo apt update
  sudo apt install code -y
  code --install-extension hashicorp.terraform
  code --install-extension mindginative.terraform-snippets
  code --install-extension 4ops.terraform
  code --install-extension ms-azuretools.vscode-azureterraform
  echo "VSCode and Terraform extensions installed"
fi

# Create sample Terraform configuration
read -p "Create a sample Terraform project structure? (y/n): " create_sample
if [[ $create_sample == "y" || $create_sample == "Y" ]]; then
  echo "Creating sample Terraform project structure..."
  mkdir -p ~/terraform-sample/{modules,environments/{dev,prod},scripts}
  
  # Create main.tf
  cat << 'EOF' > ~/terraform-sample/environments/dev/main.tf
terraform {
  required_version = ">= 1.0.0"
  
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }
  
  # Uncomment to enable backend configuration
  # backend "s3" {
  #   bucket         = "my-terraform-state"
  #   key            = "dev/terraform.tfstate"
  #   region         = "us-west-2"
  #   dynamodb_table = "terraform-lock"
  # }
}

provider "aws" {
  region = var.region
}

module "example" {
  source = "../../modules/example"
  
  environment = var.environment
}
EOF

  # Create variables.tf
  cat << 'EOF' > ~/terraform-sample/environments/dev/variables.tf
variable "region" {
  description = "AWS region"
  type        = string
  default     = "us-west-2"
}

variable "environment" {
  description = "Environment name"
  type        = string
  default     = "dev"
}
EOF

  # Create outputs.tf
  cat << 'EOF' > ~/terraform-sample/environments/dev/outputs.tf
output "example_output" {
  description = "Example output from the module"
  value       = module.example.example_output
}
EOF

  # Create example module
  mkdir -p ~/terraform-sample/modules/example
  
  cat << 'EOF' > ~/terraform-sample/modules/example/main.tf
resource "aws_s3_bucket" "example" {
  bucket = "example-${var.environment}-${random_string.suffix.result}"
  
  tags = {
    Name        = "Example Bucket"
    Environment = var.environment
  }
}

resource "random_string" "suffix" {
  length  = 8
  special = false
  upper   = false
}
EOF

  cat << 'EOF' > ~/terraform-sample/modules/example/variables.tf
variable "environment" {
  description = "Environment name"
  type        = string
}
EOF

  cat << 'EOF' > ~/terraform-sample/modules/example/outputs.tf
output "example_output" {
  description = "S3 bucket name"
  value       = aws_s3_bucket.example.bucket
}
EOF

  echo "Sample Terraform project created at ~/terraform-sample"
fi

# Final instructions
echo "=== Installation Complete ==="
echo "To activate the changes in your current shell, run:"
echo "  source ~/.zshrc"
echo ""
echo "Terraform and Packer are now installed and configured on your system."
echo "Happy infrastructure-as-code development!"
```
