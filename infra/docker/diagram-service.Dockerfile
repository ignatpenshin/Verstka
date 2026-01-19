FROM node:18-alpine

# Install Chromium for Puppeteer
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

WORKDIR /app

# Copy package files
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml* ./
COPY apps/diagram-service/package.json ./apps/diagram-service/

# Install pnpm and dependencies
RUN corepack enable && corepack prepare pnpm@8.14.0 --activate
RUN pnpm install --frozen-lockfile

# Copy source
COPY apps/diagram-service ./apps/diagram-service
COPY tsconfig.json ./

# Build
WORKDIR /app/apps/diagram-service
RUN pnpm build

EXPOSE 8002

CMD ["node", "dist/server.js"]
