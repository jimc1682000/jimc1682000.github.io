#!/bin/sh
set -eu

usage() {
    cat <<'EOF'
Usage: scripts/devcontainer.sh <command> [arguments]

  build       Build the standalone jimc-site-dev image
  up          Create or start the development container
  rebuild     Replace the container, retaining workspace and dependency volumes
  validate    Run the full website validation inside the running container
  dev         Start Astro on 0.0.0.0 inside the running container
  exec CMD    Run a command inside the running container

CONTAINER_ENGINE defaults to docker; podman is also accepted (not yet validated).
Docker rootless mode selects SITE_CONTAINER_USER=root automatically.
An explicit SITE_CONTAINER_USER overrides that selection.
EOF
}

action=${1:-help}
case "$action" in
    help|-h|--help) usage; exit 0 ;;
    build|up|rebuild|validate|dev|exec) shift ;;
    *) usage >&2; exit 2 ;;
esac
if [ "$action" = exec ]; then
    if [ "$#" -eq 0 ]; then
        printf '%s\n' 'exec requires a command.' >&2
        exit 2
    fi
elif [ "$#" -ne 0 ]; then
    printf '%s\n' 'Only exec accepts additional arguments.' >&2
    exit 2
fi

workspace=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd -P)
engine=${CONTAINER_ENGINE:-docker}
case "$engine" in
    docker|podman) ;;
    *) printf '%s\n' 'CONTAINER_ENGINE must be docker or podman.' >&2; exit 2 ;;
esac
if ! command -v "$engine" >/dev/null 2>&1; then
    printf '%s\n' "$engine is not installed or is not on PATH." >&2
    exit 1
fi

if [ "$action" = build ]; then
    exec "$engine" build -t jimc-site-dev "$workspace/.devcontainer"
fi

if [ "$engine" = docker ]; then
    security_options=$(docker info --format '{{json .SecurityOptions}}')
    if printf '%s\n' "$security_options" | grep -Fq '"name=rootless"'; then
        SITE_CONTAINER_USER=${SITE_CONTAINER_USER:-root}
    else
        SITE_CONTAINER_USER=${SITE_CONTAINER_USER:-node}
    fi
else
    SITE_CONTAINER_USER=${SITE_CONTAINER_USER:-node}
fi
export SITE_CONTAINER_USER

if ! command -v npm >/dev/null 2>&1; then
    printf '%s\n' 'npm is required to run the pinned Dev Containers CLI.' >&2
    exit 1
fi
printf 'Engine: %s; container user: %s\n' "$engine" "$SITE_CONTAINER_USER" >&2

devcontainer() {
    subcommand=$1
    shift
    npm exec --yes --package=@devcontainers/cli@0.90.0 -- devcontainer \
        "$subcommand" --docker-path "$engine" --workspace-folder "$workspace" "$@"
}

case "$action" in
    up) devcontainer up ;;
    rebuild) devcontainer up --remove-existing-container ;;
    validate) devcontainer exec npm run validate ;;
    dev) devcontainer exec npm run dev -- --host 0.0.0.0 ;;
    exec) devcontainer exec "$@" ;;
esac
