---
title: Flutter installation on Linux
description: Flutter installation on Linux
---

## Flutter

Run (Ubuntu 64 only)

```sh
sudo apt-get update -y && sudo apt-get upgrade -y;
sudo apt-get install -y curl git unzip xz-utils zip libglu1-mesa
```

Download Flutter SDK from https://docs.flutter.dev/get-started/install/linux/android?tab=download

```sh
tar xvf flutter_linux_3.19.6-stable.tar.xz
sudo mv flutter /usr/bin
echo "export PATH=$PATH:/usr/bin/flutter/bin" >> ~/.zshrc
source ~/.zshrc
```

Some useful commands:

```sh
flutter doctor -v
flutter doctor --android-licenses
sudo apt install clang cmake ninja-build pkg-config libgtk-3-dev
```
