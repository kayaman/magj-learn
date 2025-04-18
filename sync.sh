#!/bin/bash

# Script to synchronize ./dist folder with ../magj-learn-static
# Created: 2025-04-18
# Modified: Added .git preservation with correct option order

echo "Starting synchronization of ./dist to ../magj-learn-static..."

# Use rsync with the following options:
# -a: archive mode (preserves permissions, timestamps, symlinks, etc.)
# -v: verbose output
# -h: human-readable output
# --progress: show progress during transfer
# --exclude='.git/': preserve git directory in destination (must come before --delete)
# --delete: delete files in destination that don't exist in source
# --force: force deletion of directories even if not empty

rsync -avh --progress --exclude='.git/' --delete --force ./dist/ ../magj-learn-static/

if [ $? -eq 0 ]; then
    echo "Synchronization completed successfully."
else
    echo "Error occurred during synchronization. Exit code: $?"
    exit 1
fi

echo "Done."
