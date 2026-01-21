---
title: Fedora 42 Workstation
description: new box setup
---

## First things first

```sh
sudo dnf update
```

## GitHub

- [instructions](https://www.codemarks.dev/fedora_github/)

### CLI

```sh
sudo dnf install gh
```

## zsh

```sh
sudo dnf install zsh

sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

# autosuggestions
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions

# syntax highlighting
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting

# Powerleve10k
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k
```
### `~/.zshrc`

```sh
plugins=(
    git
    zsh-autosuggestions
    zsh-syntax-highlighting
    history
    command-not-found
)
```

## dotfiles

## VSCode

- [ref](https://code.visualstudio.com/docs/setup/linux)

```sh
sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc
echo -e "[code]\nname=Visual Studio Code\nbaseurl=https://packages.microsoft.com/yumrepos/vscode\nenabled=1\nautorefresh=1\ntype=rpm-md\ngpgcheck=1\ngpgkey=https://packages.microsoft.com/keys/microsoft.asc" | sudo tee /etc/yum.repos.d/vscode.repo > /dev/null

dnf check-update
sudo dnf install code # or code-insiders
```

## Docker / Podman / Podman Desktop

```sh
sudo dnf install docker-cli containerd docker-compose docker-switch
sudo dnf install podman podman-docker
flatpak install flathub io.podman_desktop.PodmanDesktop
```

## Others

- [Warp Terminal](https://app.warp.dev/get_warp?package=rpm))
- [nvm](https://github.com/nvm-sh/nvm)
- [Helm](https://helm.sh/)
- Thunderbird

