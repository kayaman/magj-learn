---
title: Hatch
sidebar:
  order: 1
tableOfContents: true
---

## A modern, extensible Python project manager

[Home](https://hatch.pypa.io/latest/)

### Installation

```sh
# using pipx (recommended)
pipx install hatch

# using pip
pip install hatch
```

### Features

#### Python versions

Installing and managing Python itself.

```sh
# install Python versions
hatch python install

# install a specific version
hatch python install 3.10

# view available Python versions
hatch python show

# find an installed Python version
hatch python find

# remove a Python version
hatch python remove

# update Python versions
hatch python update
```

#### Projects

Creating and working on Python projects.

```sh
# create a new project
hatch new my-project

# initialize an existing project
hatch new --init

# build the project
hatch build

# publish the project
hatch publish

# view or set the project version
hatch version

# manage configuration
hatch config
```

#### Environments

Managing project environments.

```sh
# create environments
hatch env create

# show available environments
hatch env show

# find environment location
hatch env find

# remove environments
hatch env remove

# prune all environments
hatch env prune

# run a command in an environment
hatch env run python --version

# enter an environment shell
hatch shell
```

#### Scripts & Commands

Executing commands and scripts.

```sh
# run a command in the default environment
hatch run python script.py

# run a command in a specific environment
hatch run test:pytest

# run a script with specific dependencies (inline metadata)
hatch run script.py
```

#### Testing & Quality

Built-in support for testing and formatting.

```sh
# run tests
hatch test

# run tests with coverage
hatch test --cover

# format and lint code
hatch fmt

# check formatting only
hatch fmt --check
```
