---
title: GitHub on Ubuntu
description: Git and GitHub Setup on Ubuntu 24.04
---

## Git and GitHub Setup on Ubuntu 24.04

### Install Git

First, let's install Git via the terminal:

```bash
sudo apt update
sudo apt install git
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
6. Give your key a descriptive title (e.g., "Ubuntu Notebook")
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

Is there any specific part of Git or GitHub setup you'd like me to elaborate on?

### Follow-up Question
**Human**: Provide instructions to all commits be signed

**Assistant**: # Setting Up Signed Git Commits

Signing your Git commits adds an extra layer of verification that you are the author of the changes. Here's how to set up commit signing on your Ubuntu 24.04 system:

### 1. Generate a GPG Key

First, install the GPG tools if not already present:

```bash
sudo apt update
sudo apt install gnupg
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

### 2. Get Your GPG Key ID

List your GPG keys to find the ID:

```bash
gpg --list-secret-keys --keyid-format=long
```

Look for the line that starts with `sec` and note the key ID after the `/` (it's a hexadecimal string).

### 3. Configure Git to Use Your GPG Key

Tell Git to use your key for signing:

```bash
git config --global user.signingkey YOUR_KEY_ID
```

Enable automatic signing for all commits:

```bash
git config --global commit.gpgsign true
```

### 4. Add Your GPG Key to GitHub

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

### 5. Configure GPG Agent (Optional but Recommended)

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

### 6. Test a Signed Commit

Create a test commit to verify everything works:

```bash
# Make a change to a file
git add .
git commit -m "Test signed commit"
git push
```

You should see a "Verified" badge next to your commit on GitHub.

### Troubleshooting

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
   sudo apt install pinentry-curses
   echo "pinentry-program /usr/bin/pinentry-curses" >> ~/.gnupg/gpg-agent.conf
   gpgconf --kill gpg-agent
   ```

Now all your commits will be automatically signed, verifying your identity to others.
