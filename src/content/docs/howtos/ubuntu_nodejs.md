---
title: Node.js on Ubuntu
description: Node.js
---

## Installing Node.js and Related Tools on Ubuntu 24.04

This guide will walk you through installing Node.js on your Ubuntu 24.04 system using Node Version Manager (NVM), which is the recommended approach for managing Node.js installations.

### Prerequisites

Before starting, ensure your system is up to date:

```bash
sudo apt update
sudo apt upgrade -y
```

### Installing NVM (Node Version Manager)

NVM allows you to install and manage multiple Node.js versions. Here's how to install it:

1. Install necessary build tools:

```bash
sudo apt install -y build-essential libssl-dev curl
```

2. Download and run the NVM installation script:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```

3. Set up NVM in your current shell session:

```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
```

4. Configure NVM for Zsh (if you're using Zsh):

```bash
# Add the following to your ~/.zshrc file
echo 'export NVM_DIR="$HOME/.nvm"' >> ~/.zshrc
echo '[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"' >> ~/.zshrc
echo '[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"' >> ~/.zshrc
```

5. Verify NVM installation:

```bash
nvm --version
```

### Installing Node.js

Once NVM is installed, you can install Node.js:

1. View available Node.js versions:

```bash
nvm ls-remote
```

2. Install the latest LTS (Long Term Support) version:

```bash
nvm install --lts
```

3. Alternatively, install a specific version:

```bash
nvm install 20.12.1
```

4. Verify Node.js installation:

```bash
node --version
npm --version
```

### Setting the Default Node.js Version

If you have multiple versions installed, set your default version:

```bash
nvm alias default lts/*
```

### Installing Common Global Packages

Install useful global packages:

```bash
npm install -g yarn
npm install -g pm2
npm install -g nodemon
npm install -g http-server
```

### Using Different Node.js Versions

To switch between installed versions:

```bash
# List installed versions
nvm ls

# Use a specific version
nvm use 16
# or
nvm use 20.12.1
```

### Updating NVM

To update NVM to the latest version:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```

### Troubleshooting

If you encounter any issues:

1. **NVM command not found after installation**:
   - Restart your terminal or source your profile:
   ```bash
   # For bash
   source ~/.bashrc
   
   # For zsh
   source ~/.zshrc
   ```

2. **Permission errors during npm global package installs**:
   - This shouldn't happen with NVM, but if it does, never use `sudo` with npm. Instead, fix npm permissions.

3. **Node.js not found in a new terminal**:
   - Ensure NVM initialization is in your shell profile (either `.bashrc` or `.zshrc`)
   - For zsh, make sure the following lines are in your `.zshrc`:
   ```bash
   export NVM_DIR="$HOME/.nvm"
   [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
   [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
   ```

4. **SSL errors during package installation**:
   - Verify your system time is correct and SSL certificates are up to date.

### Complete Installation Script

Below is a complete script that automates the installation process, including proper configuration for Zsh. Save this script as `install-nodejs.sh`, make it executable with `chmod +x install-nodejs.sh`, and run it with `./install-nodejs.sh`.

```sh
#!/bin/bash

# Exit on error
set -e

echo "===== Node.js Installation Script for Ubuntu 24.04 ====="
echo "This script will install NVM, Node.js, and common tools."

# Update system packages
echo "Updating system packages..."
sudo apt update
sudo apt upgrade -y

# Install dependencies
echo "Installing required dependencies..."
sudo apt install -y build-essential libssl-dev curl git

# Install NVM
echo "Installing NVM (Node Version Manager)..."
export NVM_VERSION="v0.39.7"
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/$NVM_VERSION/install.sh | bash

# Load NVM into current shell
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

# Check if NVM installation was successful
if ! command -v nvm &> /dev/null; then
    echo "NVM installation failed. Please check logs for errors."
    exit 1
fi

echo "NVM $(nvm --version) has been installed successfully!"

# Install latest LTS version of Node.js
echo "Installing latest LTS version of Node.js..."
nvm install --lts

# Set it as default
echo "Setting LTS version as default..."
nvm alias default lts/*

# Install latest stable version as well (optional)
echo "Also installing latest stable version of Node.js..."
nvm install node

# Verify installations
NODE_VERSION=$(node --version)
NPM_VERSION=$(npm --version)
echo "Node.js $NODE_VERSION has been installed successfully!"
echo "npm $NPM_VERSION has been installed successfully!"

# Install common global packages
echo "Installing useful global npm packages..."
npm install -g yarn
npm install -g pm2
npm install -g nodemon
npm install -g http-server

# Verify global packages
echo "Installed global packages:"
npm list -g --depth=0

# Ensure NVM works with zsh if it's the default shell
if [ "$SHELL" = "/usr/bin/zsh" ] || [ "$SHELL" = "/bin/zsh" ]; then
    echo "Detected zsh as default shell, configuring NVM for zsh..."
    if [ -f "$HOME/.zshrc" ]; then
        # Only add if not already present
        if ! grep -q "NVM_DIR" "$HOME/.zshrc"; then
            echo "" >> "$HOME/.zshrc"
            echo "# NVM Configuration" >> "$HOME/.zshrc"
            echo "export NVM_DIR=\"\$HOME/.nvm\"" >> "$HOME/.zshrc"
            echo "[ -s \"\$NVM_DIR/nvm.sh\" ] && \. \"\$NVM_DIR/nvm.sh\"" >> "$HOME/.zshrc"
            echo "[ -s \"\$NVM_DIR/bash_completion\" ] && \. \"\$NVM_DIR/bash_completion\"" >> "$HOME/.zshrc"
        fi
    else
        # Create .zshrc if it doesn't exist
        echo "# NVM Configuration" > "$HOME/.zshrc"
        echo "export NVM_DIR=\"\$HOME/.nvm\"" >> "$HOME/.zshrc"
        echo "[ -s \"\$NVM_DIR/nvm.sh\" ] && \. \"\$NVM_DIR/nvm.sh\"" >> "$HOME/.zshrc"
        echo "[ -s \"\$NVM_DIR/bash_completion\" ] && \. \"\$NVM_DIR/bash_completion\"" >> "$HOME/.zshrc"
    fi
    echo "NVM has been configured for zsh!"
fi

echo "===== Installation Complete ====="
echo "To use Node.js in new terminals, you may need to log out and log back in,"
echo "or run the following commands in your current terminal:"
echo "  export NVM_DIR=\"\$HOME/.nvm\""
echo "  [ -s \"\$NVM_DIR/nvm.sh\" ] && \. \"\$NVM_DIR/nvm.sh\""

# Add NVM to zsh configuration if zsh is installed
if command -v zsh &> /dev/null; then
    if [ -f "$HOME/.zshrc" ]; then
        echo "Adding NVM configuration to ~/.zshrc..."
        if ! grep -q "NVM_DIR" "$HOME/.zshrc"; then
            echo "" >> "$HOME/.zshrc"
            echo "# NVM Configuration" >> "$HOME/.zshrc"
            echo "export NVM_DIR=\"\$HOME/.nvm\"" >> "$HOME/.zshrc"
            echo "[ -s \"\$NVM_DIR/nvm.sh\" ] && \. \"\$NVM_DIR/nvm.sh\"" >> "$HOME/.zshrc"
            echo "[ -s \"\$NVM_DIR/bash_completion\" ] && \. \"\$NVM_DIR/bash_completion\"" >> "$HOME/.zshrc"
        fi
        echo "NVM has been configured for zsh!"
    else
        # Create .zshrc if it doesn't exist
        echo "Creating ~/.zshrc and adding NVM configuration..."
        echo "# NVM Configuration" > "$HOME/.zshrc"
        echo "export NVM_DIR=\"\$HOME/.nvm\"" >> "$HOME/.zshrc"
        echo "[ -s \"\$NVM_DIR/nvm.sh\" ] && \. \"\$NVM_DIR/nvm.sh\"" >> "$HOME/.zshrc"
        echo "[ -s \"\$NVM_DIR/bash_completion\" ] && \. \"\$NVM_DIR/bash_completion\"" >> "$HOME/.zshrc"
    fi
fi
echo ""
echo "You can switch Node.js versions using:"
echo "  nvm use <version>"
echo ""
echo "Available versions:"
nvm ls
```
