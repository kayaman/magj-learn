---
title: 'Initial setup of an OpenSUSE box'
description: 'Initial setup of an OpenSUSE box'
---

## ZSH and Oh-my-ZSH

```sh
sudo zypper install zsh

sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/o
hmyzsh/master/tools/install.sh)"

mkdir ~/Projects && $_

gh repo clone dotfiles

cat >> "$HOME/.zshrc" << 'EOZSH'
# Added by dotfiles installer
DOTFILES="$HOME/Projects/dotfiles"
for file in $DOTFILES/zsh/*.zsh; do
  [ -r "$file" ] && [ -f "$file" ] && source "$file"
done
unset file
EOZSH

source ~/.zshrc
```

## Git, GitHub and GH

See [this](https://www.codemarks.dev/fedora_github/).

```bash
sudo zypper addrepo https://cli.github.com/packages/rpm/gh-cli.repo
sudo zypper ref
sudo zypper install gh
```

## VS Code

```bash
sudo zypper addrepo https://packages.microsoft.com/yumrepos/vscode vscode
sudo zypper refresh
sudo zypper install code
```
