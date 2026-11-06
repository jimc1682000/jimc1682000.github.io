# Development tools only; application dependencies live in a workspace volume.
# Pin the multi-platform index so Apple Silicon uses arm64 without emulation.
FROM node:22.23.4-bookworm-slim@sha256:4b150b48b4116e2a22f2c39cc27025fbf4f153e2078fd3b14d159fdb5c7279da

RUN apt-get update \
    && apt-get install -y --no-install-recommends ca-certificates curl git procps sudo \
    && rm -rf /var/lib/apt/lists/* \
    && printf 'node ALL=(ALL) NOPASSWD:ALL\n' > /etc/sudoers.d/node \
    && chmod 0440 /etc/sudoers.d/node \
    && install -d -o node -g node /workspaces/site/node_modules /home/node/.npm

COPY post-create.sh /usr/local/bin/site-post-create
RUN chmod 0755 /usr/local/bin/site-post-create

ENV ASTRO_TELEMETRY_DISABLED=1
ENV NPM_CONFIG_CACHE=/home/node/.npm
WORKDIR /workspaces/site
USER node
EXPOSE 4321
CMD ["sleep", "infinity"]
