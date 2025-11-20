---
title: Snippets
---

## `rich`

A Python library for rich text and beautiful formatting in the terminal.

```python title="Example usage of rich" name="example.py"
import time
from rich.progress import track

for i in track(range(20), description="For example:"):
    time.sleep(0.05)
```
