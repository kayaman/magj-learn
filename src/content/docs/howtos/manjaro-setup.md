---
title: 'Manjaro setup'
description: ''
---

**Enable `AUR` and `Flatpak` support**

## Installing `yay`

```sh
sudo pacman -S --needed git base-devel
git clone https://aur.archlinux.org/yay.git
cd yay
makepkg -si
```

## Warp Terminal

```sh
yay -S warp-terminal
```

## Google Chrome

```sh
pamac build google-chrome
```

## VS Code

```sh
pamac build visual-studio-code-bin
```

## Docker

```sh
sudo pacman -Syu
sudo pacman -S docker
sudo systemctl enable --now docker.service
sudo usermod -aG docker $USER
newgrp docker
```
## Minikube

```sh
sudo pacman -Syu libvirt qemu dnsmasq
sudo systemctl enable  libvirtd.service --now
sudo systemctl enable virtlogd.service --now


## Flutter

```sh
curl -L -O https://storage.googleapis.com/flutter_infra_release/releases/stable/linux/flutter_linux_3.19.5-stable.tar.xz
tar -xvf flutter_linux_3.19.5-stable.tar.xz
sudo mv fllutter /usr/bin
echo 'export PATH="/usr/bin/flutter/bin:$PATH"' >> ~/.zshrc
```

## GitHub CLI

```sh
curl -L -O https://github.com/cli/cli/releases/download/v2.69.0/gh_2.69.0_linux_amd64.tar.gz
tar -zxvf gh_2.69.0_linux_amd64.tar.gz
sudo mv gh_2.69.0_linux_amd64/bin/gh /usr/local/bin/
gh --version
```

## Android Studio

```sh
sudo pacman -Syu
sudo pacman -S --needed --noconfirm base-devel git
sudo pacman -S yay
yay -S android-studio --noconfirm
```


