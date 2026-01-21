---
title: Tmux Cheatsheet
description: tmux
---

## Basic Commands

### Session Management
- `tmux new -s <name>` - Create a new session with name
- `tmux ls` - List all sessions
- `tmux attach -t <name>` - Attach to a session
- `tmux kill-session -t <name>` - Kill a session
- `tmux rename-session -t <old-name> <new-name>` - Rename a session

### Key Bindings
All commands are prefixed with the key combination `Ctrl+b` (default prefix)

### Windows (tabs)
- `<prefix> c` - Create a new window
- `<prefix> ,` - Rename the current window
- `<prefix> n` - Move to the next window
- `<prefix> p` - Move to the previous window
- `<prefix> <number>` - Switch to window number
- `<prefix> w` - List all windows
- `<prefix> &` - Kill the current window

### Panes (splits)
- `<prefix> %` - Split pane horizontally
- `<prefix> "` - Split pane vertically
- `<prefix> arrow key` - Switch to pane in the specified direction
- `<prefix> z` - Toggle pane zoom
- `<prefix> x` - Kill the current pane
- `<prefix> q` - Show pane numbers
- `<prefix> }` - Swap with the next pane
- `<prefix> {` - Swap with the previous pane
- `<prefix> <space>` - Cycle through pane layouts

### Resizing Panes
- `<prefix> Ctrl+arrow key` - Resize the current pane
- `<prefix> Alt+arrow key` - Resize the current pane in smaller increments

### Synchronizing Panes
- `:setw synchronize-panes on` - Turn synchronize-panes on
- `:setw synchronize-panes off` - Turn synchronize-panes off

### Copy Mode
- `<prefix> [` - Enter copy mode
- `<prefix> ]` - Paste from buffer
- In copy mode:
  - `<space>` - Start selection
  - `<enter>` - Copy selection
  - `q` - Quit copy mode

## Customization

### Configuration File
The tmux configuration file is located at `~/.tmux.conf`. Here are some common customizations:

```bash
# Change the prefix key
unbind C-b
set-option -g prefix C-a
bind-key C-a send-prefix

# Enable mouse mode
set -g mouse on

# Start window numbering at 1
set -g base-index 1

# Start pane numbering at 1
setw -g pane-base-index 1

# Reload config file
bind r source-file ~/.tmux.conf \; display "Reloaded!"

# Split panes using | and -
bind | split-window -h
bind - split-window -v
unbind '"'
unbind %

# Switch panes using Alt-arrow without prefix
bind -n M-Left select-pane -L
bind -n M-Right select-pane -R
bind -n M-Up select-pane -U
bind -n M-Down select-pane -D

# Status bar customization
set -g status-style bg=black,fg=white
set -g window-status-current-style bg=white,fg=black,bold
```

### Color Schemes
Add to `~/.tmux.conf`:

```bash
# Set terminal color
set -g default-terminal "screen-256color"

# Theme settings
set -g status-bg colour235
set -g status-fg colour136
set -g window-status-current-style fg=colour166,bg=default,bright
```

## Recommended Plugins

Tmux has a plugin manager called TPM (Tmux Plugin Manager). Here's how to install and use it:

1. Install TPM:
```bash
git clone https://github.com/tmux-plugins/tpm ~/.tmux/plugins/tpm
```

2. Add to `~/.tmux.conf`:
```bash
# List of plugins
set -g @plugin 'tmux-plugins/tpm'
set -g @plugin 'tmux-plugins/tmux-sensible'

# Initialize TMUX plugin manager (keep this line at the very bottom of tmux.conf)
run '~/.tmux/plugins/tpm/tpm'
```

### Useful Plugins
- `tmux-plugins/tmux-resurrect` - Restore tmux sessions after system restart
- `tmux-plugins/tmux-continuum` - Automatic saving of tmux environment
- `tmux-plugins/tmux-copycat` - Enhanced copy mode with regex search
- `tmux-plugins/tmux-yank` - Copy to system clipboard
- `tmux-plugins/tmux-open` - Open highlighted text in app
- `tmux-plugins/tmux-sidebar` - Directory tree sidebar
- `christoomey/vim-tmux-navigator` - Seamless navigation between tmux panes and vim splits

## Integrations

### Vim Integration
- Install the vim plugin `vim-tmux-navigator` for seamless navigation
- Add to your `.vimrc`:
```vim
" Smart pane switching with awareness of Vim splits
Plug 'christoomey/vim-tmux-navigator'
```

### Shell Integration
Add to your `.bashrc` or `.zshrc`:
```bash
# Aliases for tmux
alias ta='tmux attach -t'
alias tl='tmux list-sessions'
alias tn='tmux new-session -s'
```

### Status Line Integration
- `wfxr/tmux-power` - Powerline-like status bar
- `erikw/tmux-powerline` - Advanced powerline status bar

### Common Workflows

1. **Development Environment**:
   ```bash
   # Start a new session named 'dev'
   tmux new -s dev
   
   # Split into code and terminal panes
   <prefix> %
   
   # In one pane, start your editor
   vim app.js
   
   # In the other pane, run your server/tests
   npm start
   ```

2. **Multiple Projects**:
   ```bash
   # Create a session for each project
   tmux new -s project1 -d
   tmux new -s project2 -d
   
   # Attach to one
   tmux attach -t project1
   
   # Switch sessions without detaching
   <prefix> s (then select)
   ```

3. **Server Monitoring**:
   ```bash
   # Create a new session
   tmux new -s monitor
   
   # Create multiple panes for different stats
   <prefix> %
   <prefix> "
   
   # Run monitoring tools in each
   htop
   watch df -h
   tail -f /var/log/syslog
   
   # Turn on synchronize-panes to issue commands to all panes
   <prefix> : setw synchronize-panes on
   ```
