FROM mcr.microsoft.com/devcontainers/base:ubuntu

# Install Node.js LTS
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends curl ca-certificates \
    && curl -fsSLo- https://deb.nodesource.com/setup_lts.x | bash - \
    && apt-get -y install nodejs \
    && apt-get autoremove -y && apt-get clean -y && rm -rf /var/lib/apt/lists/*

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Install other useful tools
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends \
    git \
    vim \
    jq \
    && apt-get autoremove -y && apt-get clean -y && rm -rf /var/lib/apt/lists/*

# Set up Zsh
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends zsh \
    && apt-get autoremove -y && apt-get clean -y && rm -rf /var/lib/apt/lists/*

# Install Oh My Zsh
RUN sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" "" --unattended

# Configure .zshrc for better development experience
RUN echo 'export PATH="/usr/local/bin:$PATH"' >> ~/.zshrc \
    && echo 'export PNPM_HOME="/pnpm"' >> ~/.zshrc \
    && echo 'export PATH="$PNPM_HOME:$PATH"' >> ~/.zshrc \
    && echo 'eval "$(pnpm setup)"' >> ~/.zshrc \
    && echo 'alias dev="pnpm dev"' >> ~/.zshrc \
    && echo 'alias test="pnpm test"' >> ~/.zshrc \
    && echo 'alias build="pnpm build"' >> ~/.zshrc

# Set working directory
WORKDIR /workspace

# Set default shell
SHELL ["/bin/zsh", "-c"]

# Verify installation
RUN node --version && pnpm --version

# Keep container running
CMD ["tail", "-f", "/dev/null"]
