FROM node:22-bookworm

# Install system dependencies
RUN apt-get update && apt-get install -y \
  git \
  curl \
  jq \
  && rm -rf /var/lib/apt/lists/*

# Install GitHub CLI
RUN curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg \
  | dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg \
  && echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" \
  | tee /etc/apt/sources.list.d/github-cli.list > /dev/null \
  && apt-get update && apt-get install -y gh \
  && rm -rf /var/lib/apt/lists/*

# Install pnpm globally
RUN npm install -g pnpm

# Rename the base image's "node" user (UID 1000) to "agent".
# chmod 777 ensures any host UID mapped in can write to home dir.
RUN usermod -d /home/agent -m -l agent node \
  && chown -R agent /home/agent \
  && chmod -R 777 /home/agent \
  && mkdir -p /home/agent/.gitconfig-dir \
  && touch /home/agent/.gitconfig \
  && chmod 777 /home/agent/.gitconfig

# Install OpenCode CLI (run as root before USER agent)
RUN npm install -g opencode-ai@latest

USER agent

WORKDIR /home/agent

ENTRYPOINT ["sleep", "infinity"]