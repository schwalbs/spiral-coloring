# Extends the orbestrator agent image with the Node version pinned in .node-version.
ARG ORB_BASE
FROM ${ORB_BASE}

USER root
RUN apt-get update \
  && apt-get install -y --no-install-recommends curl unzip ca-certificates libatomic1 \
  && rm -rf /var/lib/apt/lists/*

# fnm and its Node installs live outside any home dir so the non-root agent user can use them.
ENV FNM_DIR=/opt/fnm
RUN curl -fsSL https://fnm.vercel.app/install | bash -s -- --install-dir /usr/local/bin --skip-shell

WORKDIR /tmp/node-version
COPY .node-version ./
RUN fnm install \
  && fnm default "$(cat .node-version)" \
  && chown -R agent:agent "$FNM_DIR"

# Gate commands run via `docker run` without a login shell, so `fnm env` is never sourced; put the default on PATH directly.
ENV PATH=/opt/fnm/aliases/default/bin:$PATH

USER agent
WORKDIR /work
