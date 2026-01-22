---
title: VS Code on Ubuntu
description: Installing VS Code on Ubuntu 24.04
---
## Installing VS Code on Ubuntu 24.04

Here are the steps to install Visual Studio Code on Ubuntu 24.04:

### Method 1: Using the APT package manager (Recommended)

1. Update your package lists:
   ```bash
   sudo apt update
   ```

2. Install dependencies for downloading packages over HTTPS:
   ```bash
   sudo apt install -y apt-transport-https wget software-properties-common
   ```

3. Import the Microsoft GPG key:
   ```bash
wget -qO- https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > microsoft.gpg
sudo install -D -o root -g root -m 644 microsoft.gpg /etc/apt/keyrings/microsoft.gpg
   ```

4. Add the VS Code repository:
   ```bash
   sudo add-apt-repository "deb [arch=amd64] https://packages.microsoft.com/repos/vscode stable main"
   ```

5. Update package lists again:
   ```bash
   sudo apt update
   ```

6. Install VS Code:
   ```bash
   sudo apt install code
   ```

### Method 2: Using the .deb package

1. Download the .deb package from the official VS Code website:
   ```bash
   wget https://code.visualstudio.com/sha/download?build=stable&os=linux-deb-x64 -O vscode.deb
   ```

2. Install the package:
   ```bash
   sudo apt install ./vscode.deb
   ```

### Method 3: Using Snap

If you prefer using Snap packages:
```bash
sudo snap install code --classic
```

After installation, you can launch VS Code from your application menu or by typing `code` in the terminal.
