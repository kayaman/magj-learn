---
title: Up Oh-My-Zsh on Ubuntu
description: Setting Up Oh-My-Zsh on Ubuntu 24.04
---

## Setting Up Oh-My-Zsh on Ubuntu 24.04

This guide will walk you through installing and configuring Oh-My-Zsh with recommended add-ons on a fresh Ubuntu 24.04 system.

### Prerequisites

First, let's install Zsh and other required packages:

```bash
sudo apt update
sudo apt install -y zsh git curl wget fonts-powerline
```

### Installing Oh-My-Zsh

Install Oh-My-Zsh using the official installation script:

```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

When prompted, confirm that you want to make Zsh your default shell.

### Recommended Plugins

Edit your `~/.zshrc` file to add these recommended plugins:

```bash
nano ~/.zshrc
```

Find the `plugins=()` line and update it to:

```bash
plugins=(
    git
    sudo
    autojump
    web-search
    zsh-autosuggestions
    zsh-syntax-highlighting
    history
    docker
    npm
    kubectx
)
```

### Installing Additional Plugins

1. **Zsh Autosuggestions**:

```bash
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
```

2. **Zsh Syntax Highlighting**:

```bash
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
```

3. **Autojump**:

```bash
sudo apt install -y autojump
```

Add this to your `~/.zshrc`:

```bash
# Initialize autojump
[ -f /usr/share/autojump/autojump.sh ] && . /usr/share/autojump/autojump.sh
```

### Installing a Theme

Oh-My-Zsh comes with many themes. Powerlevel10k is highly recommended:

```bash
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k
```

Set it as your theme by updating `~/.zshrc`:

```bash
ZSH_THEME="powerlevel10k/powerlevel10k"
```

### Configuring Powerlevel10k

After installing, restart your terminal or run:

```bash
source ~/.zshrc
```

The Powerlevel10k configuration wizard will start automatically. If not, run:

```bash
p10k configure
```

### Additional Customizations

Add these useful aliases to your `~/.zshrc`:

```bash
# Custom aliases
alias ll='ls -alF'
alias la='ls -A'
alias l='ls -CF'
alias update='sudo apt update && sudo apt upgrade -y'
alias cls='clear'
alias zshconfig='nano ~/.zshrc'
alias ohmyzsh='nano ~/.oh-my-zsh'
```

### Plugin Usage Tips

1. **git**: Provides shortcuts for Git commands
   - `gst` (git status)
   - `ga` (git add)
   - `gcmsg` (git commit -m)

2. **sudo**: Press Esc twice to add sudo to the current command

3. **autojump**: Navigate to directories quickly
   - `j folder_name` jumps to the most used directory matching "folder_name"

4. **web-search**: Search the web from your terminal
   - `google query` searches Google
   - `github query` searches GitHub

5. **zsh-autosuggestions**: Shows suggestions based on your command history
   - Press right arrow to accept suggestions

### Finalizing Setup

After making all changes, reload your configuration:

```bash
source ~/.zshrc
```

### Troubleshooting

1. **Font issues**: Make sure you have a Nerd Font installed for the best experience with Powerlevel10k
   ```bash
   sudo apt install -y fonts-hack-ttf
   ```

2. **Plugin not working**: Verify the plugin is correctly added to both the plugins list and installed in the custom plugins directory

3. **Terminal colors**: If colors aren't displaying correctly, check that your terminal supports 256 colors
   ```bash
   echo $TERM
   ```
   Should return `xterm-256color`

## Complete script

```sh
#!/bin/bash

# Oh-My-Zsh Complete Setup Script for Ubuntu 24.04
# This script installs and configures Oh-My-Zsh with recommended plugins and themes

echo "==== Oh-My-Zsh Complete Setup Script ===="
echo "This script will install and configure Oh-My-Zsh with recommended plugins and themes."
echo "Starting installation in 5 seconds... Press Ctrl+C to cancel."
sleep 5

# Update package list and install prerequisites
echo "==> Installing prerequisites..."
sudo apt update
sudo apt install -y zsh git curl wget fonts-powerline fonts-hack-ttf autojump

# Install Oh-My-Zsh
echo "==> Installing Oh-My-Zsh..."
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" "" --unattended

# Set Zsh as default shell
echo "==> Setting Zsh as default shell..."
chsh -s $(which zsh)

# Install recommended plugins
echo "==> Installing recommended plugins..."

# Zsh Autosuggestions
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions

# Zsh Syntax Highlighting
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting

# Install Powerlevel10k theme
echo "==> Installing Powerlevel10k theme..."
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k

# Backup original .zshrc if it exists
if [ -f ~/.zshrc ]; then
    echo "==> Backing up existing .zshrc file..."
    cp ~/.zshrc ~/.zshrc.backup
fi

# Create new .zshrc with recommended configuration
echo "==> Configuring .zshrc..."
cat > ~/.zshrc << 'EOL'
# Path to your oh-my-zsh installation.
export ZSH="$HOME/.oh-my-zsh"

# Set theme to Powerlevel10k
ZSH_THEME="powerlevel10k/powerlevel10k"

# Enable command auto-correction
ENABLE_CORRECTION="true"

# Display red dots while waiting for completion
COMPLETION_WAITING_DOTS="true"

# Uncomment the following line if you want to disable marking untracked files
# under VCS as dirty. This makes repository status check for large repositories
# much, much faster.
# DISABLE_UNTRACKED_FILES_DIRTY="true"

# Plugins
plugins=(
    git
    sudo
    autojump
    web-search
    zsh-autosuggestions
    zsh-syntax-highlighting
    history
    docker
    npm
    kubectx
    command-not-found
    colored-man-pages
)

source $ZSH/oh-my-zsh.sh

# Preferred editor for local and remote sessions
if [[ -n $SSH_CONNECTION ]]; then
  export EDITOR='vim'
else
  export EDITOR='nano'
fi

# Initialize autojump
[ -f /usr/share/autojump/autojump.sh ] && . /usr/share/autojump/autojump.sh

# Custom aliases
alias ll='ls -alF'
alias la='ls -A'
alias l='ls -CF'
alias update='sudo apt update && sudo apt upgrade -y'
alias cls='clear'
alias zshconfig='nano ~/.zshrc'
alias ohmyzsh='nano ~/.oh-my-zsh'
alias sshconfig='nano ~/.ssh/config'
alias home='cd ~'
alias grep='grep --color=auto'
alias df='df -h'
alias du='du -h'

# To customize prompt, run `p10k configure` or edit ~/.p10k.zsh.
[[ ! -f ~/.p10k.zsh ]] || source ~/.p10k.zsh

# Add custom PATH additions
export PATH=$HOME/bin:/usr/local/bin:$PATH
EOL

# Create p10k configuration wizard trigger for first login
echo "==> Setting up Powerlevel10k configuration to run at first login..."
cat > ~/.p10k_setup << 'EOL'
# Run the Powerlevel10k configuration wizard
p10k configure

# Remove this file after running
rm ~/.p10k_setup
EOL

# Add the p10k_setup trigger to .zshrc
echo "# Run Powerlevel10k configuration wizard on first login" >> ~/.zshrc
echo "[ -f ~/.p10k_setup ] && source ~/.p10k_setup" >> ~/.zshrc

# Setup complete
echo ""
echo "==== Oh-My-Zsh Setup Complete! ===="
echo "Please log out and log back in, or restart your terminal."
echo "The Powerlevel10k configuration wizard will start automatically on first login."
echo "Enjoy your new terminal experience!"

# Optional: Source immediately if the user wants
read -p "Do you want to source the new configuration now? (y/n) " answer
if [[ "$answer" == "y" ]]; then
    echo "Sourcing new configuration..."
    zsh -l
fi
```
