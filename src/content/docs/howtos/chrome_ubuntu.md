---
title: Chrome on Ubunntu
description: Chrome on Ubunntu
---

## Method 1: Using the Terminal (Command Line)

1. Open Terminal (Ctrl+Alt+T)
2. Download the Google Chrome .deb package:
   ```bash
   wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
   ```
3. Install the package:
   ```bash
   sudo apt install ./google-chrome-stable_current_amd64.deb
   ```
4. Launch Google Chrome from the Applications menu or by typing:
   ```bash
   google-chrome-stable
   ```

## Method 2: Using the Ubuntu Software Center

1. Go to the Chrome website (https://www.google.com/chrome/) in Firefox (Ubuntu's default browser)
2. Click the "Download Chrome" button
3. Select "64 bit .deb (For Debian/Ubuntu)"
4. When the download completes, open the .deb file
5. The Ubuntu Software Center will open - click "Install"
6. Enter your password when prompted

Chrome will automatically set up its repository so you'll receive updates through Ubuntu's standard update system.
