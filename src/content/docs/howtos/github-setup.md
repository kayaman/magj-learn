---
title: GitHub
description: Setup GitHub basics on a new machine
---

## Global configuration

```bash
git config --global user.name "Marco Antonio Gonzalez Junior"
git config --global user.email "m@rco.sh"
git config --global core.editor "vim"
git config --global init.defaultBranch main
```


## SSH configuration

```bash
ssh-keygen -t ed25519 -C "m@rco.sh"
```

```bash
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
git config --global user.signingkey ~/.ssh/id_ed25519.pub
```

When committing changes in your local branch, add the -S flag to the git commit command:

```bash
git commit -S -m "YOUR_COMMIT_MESSAGE"
# Creates a signed commit
```

## GPG configuration

```bash
gpg --full-generate-key
gpg --list-secret-keys --keyid-format=long
gpg --armor --export <GPG key id>
# Prints the GPG key ID, in ASCII armor format
```

Copy your GPG key, beginning with `-----BEGIN PGP PUBLIC KEY BLOCK-----` and ending with `-----END PGP PUBLIC KEY BLOCK-----`

Note: not using GPG at the moment.
