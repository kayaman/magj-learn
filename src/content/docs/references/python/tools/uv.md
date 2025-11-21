---
title: uv
sidebar:
  order: 0
tableOfContents:
  minHeadingLevel: 2
  maxHeadingLevel: 5
---

## About

An extremely fast Python package and project manager, written in Rust.

[Home](https://docs.astral.sh/uv/)

## Installation

```sh
curl -LsSf https://astral.sh/uv/install.sh | sh
```

## Features

### Python versions

Installing and managing Python itself.

```sh
# install Python versions
uv python install    

# view available Python versions
uv python list        

# find an installed Python version
uv python find        

# pin the current project to use a specific Python version
uv python pin         

# uninstall a Python version
uv python uninstall   
```

### Projects

Creating and working on Python projects, i.e., with a `pyproject.toml`.

```sh
# create a new project
uv init

# add a dependency to the project.
uv add

# remove a dependency from the project
uv remove

# sync the project's dependencies with the environment
uv sync

# create a lockfile for the project's dependencies
uv lock

# run a command in the project environment
uv run

# view the dependency tree for the project
uv tree

# build the project into distribution archives
uv build

# publish the project to a package index
uv publish
```

### Scripts

Executing standalone Python scripts, e.g., example.py.

```sh
# create a new script
uv init --script example.py --python 3.12

# run a script
uv run

# add a dependency to a script
uv add --script

# remove a dependency from a script
uv remove --script

# run a Python script with a specific dependency without installing it globally
uv run --with rich example.py
```

### Tools

Running and installing tools published to Python package indexes, e.g., `ruff` or `black`.

```sh
# run a tool in a temporary environment
uvx ruff --version

# install or uninstall a tool user-wide
uv tool install ruff
uv tool uninstall ruff

# manage the installed tool catalog
uv tool list
uv tool update-shell
```

### The `pip` interface

Manually managing environments and packages—intended for legacy workflows or when the higher-level commands do not provide enough control.

#### Creating virtual environments

```sh
# create a virtual environment (replacement for venv / virtualenv)
uv venv
```

#### Managing packages in an environment

```sh
# install or remove packages in the active environment
uv pip install requests
uv pip uninstall requests

# inspect package metadata and compatibility
uv pip show requests
uv pip check

# review dependency state
uv pip list
uv pip freeze
uv pip tree
```

### Utilities

Managing and inspecting uv's state, such as the cache, storage directories, or performing a self-update.

```sh
# maintain caches
uv cache clean
uv cache prune

# locate storage directories
uv cache dir
uv tool dir
uv python dir

# update uv itself
uv self update
```
