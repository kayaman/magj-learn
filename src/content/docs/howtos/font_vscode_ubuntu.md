---
title: FiraCode on VSCode
description: install anc change font
---

## Setting Up a Great Coding Font with Ligatures in VS Code on Ubuntu

Here's how to set up an excellent coding font with ligatures in VS Code on Ubuntu:

### Step 1: Install a Programming Font with Ligatures

Several excellent programming fonts support ligatures. Here are some top options:

```bash
# Install FiraCode (most popular choice)
sudo apt update
sudo apt install fonts-firacode

# Or install JetBrains Mono (another excellent option)
# Download from https://www.jetbrains.com/lp/mono/ and install manually
# Or use the font manager:
sudo apt install font-manager
# Then import the downloaded font using Font Manager
```

### Step 2: Configure VS Code to Use the Font with Ligatures

1. Open VS Code
2. Press `Ctrl+,` to open Settings
3. Search for "font"
4. Locate and modify these settings:
   - "Editor: Font Family" - Set to `'Fira Code'` or `'JetBrains Mono'`
   - "Editor: Font Ligatures" - Set to `true`

Alternatively, you can edit your `settings.json` directly by clicking the `{}` icon in the top right of the settings page and adding:

```json
{
    "editor.fontFamily": "'Fira Code', 'Droid Sans Mono', 'monospace'",
    "editor.fontLigatures": true,
    "editor.fontSize": 14
}
```

### Step 3: Additional Font Customization (Optional)

- Adjust font size with the "Editor: Font Size" setting
- Try different font weights with "Editor: Font Weight"
- For a more cohesive experience, you can also apply the font to the terminal:
  ```json
  "terminal.integrated.fontFamily": "'Fira Code'"
  ```

VS Code should apply the changes immediately. You'll now see coding ligatures like `=>`, `!=`, and `>=` rendered as special symbols, making your code more readable.
