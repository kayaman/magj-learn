---
title: 'Linux Mint setup'
description: ''
---

## Google Chrome

Make sure you have downloaded the most recent and stable version of `.deb package (64-bit)`.

```sh
sudo apt install ./<file>.deb
sudo apt-get install -f
```

## Git

```sh
sudo apt install git
```

## GitHub

### User configuration

```sh
git config --global user.name "Marco Antonio Gonzalez Junior"
git config --global user.email "m@rco.sh"
```

### SSH configuration

```sh
ssh-keygen -t ed25519 -C "m@rco.sh"
```

```sh
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
cat ~/.ssh/id_ed25519.pub
```

Using the output above, create new Authentication and Signing keys on [GitHUb](https://github.com/settings/keys)

```bash title="Testing the configuration"
ssh -T git@github.com
```

### SSH commit signature verification

```bash
git config --global gpg.format ssh
git config --global user.signingkey </PATH/TO/.SSH/KEY.PUB>
```
