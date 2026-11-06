#!/bin/sh
set -eu

if [ ! -w /workspaces/site ]; then
    printf '%s\n' 'Workspace is not writable. Check bind mount ownership; for rootless Docker, see SITE_CONTAINER_USER in README.md and rebuild.' >&2
    exit 1
fi

# Named volumes may belong to root or a previous Linux host UID after a rebuild.
# Only fix these container-owned volumes, never recursively chown the source mount.
if [ "$(id -u)" -eq 0 ]; then
    chown -R 0:0 /workspaces/site/node_modules /home/node/.npm
else
    sudo chown -R "$(id -u):$(id -g)" /workspaces/site/node_modules /home/node/.npm
fi
cd /workspaces/site
npm ci --no-audit --no-fund
