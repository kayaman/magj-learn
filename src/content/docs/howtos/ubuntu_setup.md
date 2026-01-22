---
title: 'Ubuntu 25'
description: ''
---

## update & upgrade

```sh
sudo apt update && sudo apt upgrade
```

## Node (Using nvm)

```sh
wget -q -O- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash
. ~/.zshrc
```

```sh
nvm --version
```

```sh
nvm install node
```

##  Docker

```sh
sudo apt install docker.io
sudo apt install docker-compose
sudo usermod -aG docker $USER
newgrp docker
```

## ZSH & oh-my-zsh

```sh
sudo apt update
sudo apt install zsh curl git
```


```sh
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

```sh
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
```

Configure `~/.zshrc` to:

```sh
...
plugins=(
    git
    zsh-autosuggestions
    zsh-syntax-highlighting
)
...
```

Then

```sh
source ~/.zshrc
```

```sh
reboot
```
