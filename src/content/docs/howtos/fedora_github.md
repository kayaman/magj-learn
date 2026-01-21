---
title: GitHub on Fedora
description: Git and GitHub Setup on Fedora 42
---

## Git and GitHub Setup on Fedora 42

### Install Git

First, let's install Git via the terminal:

```bash
sudo dnf update
sudo dnf install git
```

### Configure Git

After installation, configure your identity:

```bash
git config --global user.name "Marco Antonio Gonzalez Junior"
git config --global user.email "m@rco.sh"
git config --global core.editor "vim"
git config --global init.defaultBranch main
```

Make sure to use the same email address as your GitHub account.

### Generate SSH Key

Using SSH keys is more secure than password authentication:

```bash
ssh-keygen -t ed25519 -C "m@rco.sh"
```

Press Enter to accept the default file location. You can set a passphrase for additional security.

### Start the SSH Agent

```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
```

### Add SSH Key to GitHub

Copy your public key to clipboard:

```bash
cat ~/.ssh/id_ed25519.pub
```

Then:

1. Go to GitHub.com and sign in
2. Click your profile photo in the upper right corner
3. Go to Settings
4. Click "SSH and GPG keys" in the sidebar
5. Click "New SSH key"
6. Give your key a descriptive title (e.g., "Fedora 42 Workstation")
7. Paste your key into the "Key" field
8. Click "Add SSH key"

### Verify Connection

Test your SSH connection:

```bash
ssh -T git@github.com
```

You should receive a confirmation message.

### Optional Git Configurations

Set default branch name:
```bash
git config --global init.defaultBranch main
```

Setup a credential helper to cache your password:
```bash
git config --global credential.helper cache
```

### Create Your First Repository

1. Create a new repository on GitHub
2. Clone it to your local machine:
   ```bash
   git clone git@github.com:yourusername/your-repo-name.git
   ```

### Basic Git Workflow

Here's a basic workflow:

```bash
# Make changes to files
git add .
git commit -m "Descriptive message about changes"
git push origin main
```

### Setting Up Signed Git Commits

Signing your Git commits adds an extra layer of verification that you are the author of the changes.

#### 1. Generate a GPG Key

First, install the GPG tools if not already present:

```bash
sudo dnf install gnupg2
```

Generate a new GPG key:

```bash
gpg --full-generate-key
```

When prompted:
- Select the key type (RSA and RSA is recommended)
- Choose a key size (4096 bits is recommended for security)
- Choose how long the key should be valid (0 = key does not expire)
- Enter your name and email address (use the same email as your GitHub account)
- Set a secure passphrase

#### 2. Get Your GPG Key ID

List your GPG keys to find the ID:

```bash
gpg --list-secret-keys --keyid-format=long
```

Look for the line that starts with `sec` and note the key ID after the `/` (it's a hexadecimal string).

#### 3. Configure Git to Use Your GPG Key

Tell Git to use your key for signing:

```bash
git config --global user.signingkey YOUR_KEY_ID
```

Enable automatic signing for all commits:

```bash
git config --global commit.gpgsign true
```

#### 4. Add Your GPG Key to GitHub

Export your public GPG key:

```bash
gpg --armor --export YOUR_KEY_ID
```

This will print your public key to the terminal. Copy it including the begin and end markers.

Then:
1. Go to GitHub.com and sign in
2. Click your profile photo → Settings
3. Go to "SSH and GPG keys"
4. Click "New GPG key"
5. Paste your key in the "Key" field
6. Click "Add GPG key"

#### 5. Configure GPG Agent

To avoid entering your passphrase every time you commit, set up the GPG agent:

Create or edit the GPG agent configuration file:

```bash
mkdir -p ~/.gnupg
echo "default-cache-ttl 34560000" >> ~/.gnupg/gpg-agent.conf
echo "max-cache-ttl 34560000" >> ~/.gnupg/gpg-agent.conf
```

Restart the GPG agent:

```bash
gpgconf --kill gpg-agent
gpg-agent --daemon
```

#### 6. Test a Signed Commit

Create a test commit to verify everything works:

```bash
# Make a change to a file
git add .
git commit -m "Test signed commit"
git push
```

You should see a "Verified" badge next to your commit on GitHub.

#### Troubleshooting

If you encounter issues with the GPG signing process:

1. Ensure the GPG key email matches your Git email:
   ```bash
   git config --global user.email
   gpg --list-keys
   ```

2. For "secret key not available" errors:
   ```bash
   export GPG_TTY=$(tty)
   ```
   Add this line to your `~/.bashrc` or `~/.zshrc` file for persistence.

3. For GPG passphrase prompt issues, install pinentry:
   ```bash
   sudo dnf install pinentry-curses
   echo "pinentry-program /usr/bin/pinentry-curses" >> ~/.gnupg/gpg-agent.conf
   gpgconf --kill gpg-agent
   ```

Now all your commits will be automatically signed, verifying your identity to others.

## Complete Setup Script

Here's a single script that does the entire GitHub setup process on Fedora 42:

```bash
#!/bin/bash

# GitHub setup script for Fedora 42
# Replace the placeholders with your information before running

# User information
GIT_USERNAME="Marco Antonio Gonzalez Junior"
GIT_EMAIL="m@rco.sh"
GITHUB_USERNAME="kayaman"

# Set colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== Setting up Git and GitHub for Fedora 42 ===${NC}"

# Update and install necessary packages
echo -e "${BLUE}Installing Git and GPG tools...${NC}"
sudo dnf update -y
sudo dnf install -y git gnupg2 pinentry-curses vim

# Configure Git
echo -e "${BLUE}Configuring Git...${NC}"
git config --global user.name "$GIT_USERNAME"
git config --global user.email "$GIT_EMAIL"
git config --global core.editor "vim"
git config --global init.defaultBranch main
git config --global credential.helper cache

# Generate SSH key
echo -e "${BLUE}Generating SSH key...${NC}"
ssh-keygen -t ed25519 -C "$GIT_EMAIL" -f ~/.ssh/id_ed25519 -N ""

# Start SSH agent and add key
echo -e "${BLUE}Setting up SSH agent...${NC}"
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519

# Display public key
echo -e "${GREEN}Your SSH public key (add this to GitHub):${NC}"
cat ~/.ssh/id_ed25519.pub
echo ""
echo -e "${BLUE}Please add this key to your GitHub account at https://github.com/settings/keys${NC}"
echo -e "${BLUE}Press Enter when done...${NC}"
read -p ""

# Test SSH connection
echo -e "${BLUE}Testing SSH connection to GitHub...${NC}"
ssh -T -o StrictHostKeyChecking=no git@github.com

# Generate GPG key for signing commits
echo -e "${BLUE}Setting up GPG for commit signing...${NC}"
echo -e "${BLUE}We will now generate a GPG key. Follow the prompts.${NC}"
echo -e "${BLUE}When asked for a key type, choose RSA and RSA (1).${NC}"
echo -e "${BLUE}For key size, choose 4096.${NC}"
echo -e "${BLUE}For expiration, choose 0 for no expiration.${NC}"
echo -e "${BLUE}Use the same email address as your GitHub account.${NC}"
echo -e "${BLUE}Press Enter to continue...${NC}"
read -p ""

gpg --full-generate-key

# Get GPG key ID
echo -e "${BLUE}Getting your GPG key ID...${NC}"
GPG_KEY_ID=$(gpg --list-secret-keys --keyid-format=long | grep sec | sed -e 's/sec *rsa[0-9]*\///' -e 's/ .*//')
echo -e "${GREEN}Your GPG key ID is: $GPG_KEY_ID${NC}"

# Configure Git to use GPG key
echo -e "${BLUE}Configuring Git to use your GPG key...${NC}"
git config --global user.signingkey $GPG_KEY_ID
git config --global commit.gpgsign true

# Export GPG public key
echo -e "${GREEN}Your GPG public key (add this to GitHub):${NC}"
gpg --armor --export $GPG_KEY_ID
echo ""
echo -e "${BLUE}Please add this key to your GitHub account at https://github.com/settings/keys${NC}"
echo -e "${BLUE}Press Enter when done...${NC}"
read -p ""

# Configure GPG agent
echo -e "${BLUE}Configuring GPG agent...${NC}"
mkdir -p ~/.gnupg
chmod 700 ~/.gnupg
echo "default-cache-ttl 34560000" >> ~/.gnupg/gpg-agent.conf
echo "max-cache-ttl 34560000" >> ~/.gnupg/gpg-agent.conf
echo "pinentry-program /usr/bin/pinentry-curses" >> ~/.gnupg/gpg-agent.conf

# Add GPG_TTY export to shell configuration
echo -e "${BLUE}Adding GPG_TTY to bash configuration...${NC}"
echo 'export GPG_TTY=$(tty)' >> ~/.bashrc
export GPG_TTY=$(tty)

# Restart GPG agent
gpgconf --kill gpg-agent
gpg-agent --daemon

echo -e "${GREEN}Setup complete!${NC}"
echo -e "${BLUE}To clone a repository, use:${NC}"
echo -e "  git clone git@github.com:$GITHUB_USERNAME/your-repo-name.git"
echo -e "${BLUE}For a basic workflow:${NC}"
echo -e "  git add ."
echo -e "  git commit -m \"Your message\""
echo -e "  git push origin main"
echo -e "${GREEN}All your commits will be automatically signed!${NC}"
```

Save this script to a file (e.g., `github_setup_fedora42.sh`), make it executable with `chmod +x github_setup_fedora42.sh`, and run it with `./github_setup_fedora42.sh`. Remember to replace the placeholder information with your own details before running the script.
