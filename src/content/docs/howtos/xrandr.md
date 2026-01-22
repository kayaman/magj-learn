---
title: 3840 Res Rescue
description: 3840x2160
---

```sh
xrandr --listmonitors

xrandr --output YOUR_DISPLAY_NAME --mode 3840x2160

# if unhappy:

```sh
# Generate the modeline
cvt 3840 2160

# Add the mode (replace with output from previous command)
xrandr --newmode "3840x2160_60.00" 712.75 3840 4160 4576 5312 2160 2163 2168 2237 -hsync +vsync

# Add the mode to your display
xrandr --addmode YOUR_DISPLAY_NAME 3840x2160_60.00

# Switch to that mode
xrandr --output YOUR_DISPLAY_NAME --mode 3840x2160_60.00
```

