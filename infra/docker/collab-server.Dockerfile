FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml* ./
COPY apps/collab-server/package.json ./apps/collab-server/

# Install pnpm and dependencies
RUN corepack enable && corepack prepare pnpm@8.14.0 --activate
RUN pnpm install --frozen-lockfile

# Copy source
COPY apps/collab-server ./apps/collab-server
COPY tsconfig.json ./

# Build
WORKDIR /app/apps/collab-server
RUN pnpm build

EXPOSE 1234

CMD ["node", "dist/server.js"]
