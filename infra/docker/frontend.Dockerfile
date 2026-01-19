FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml* ./
COPY apps/frontend/package.json ./apps/frontend/
COPY packages/*/package.json ./packages/

# Install pnpm and dependencies
RUN corepack enable && corepack prepare pnpm@8.14.0 --activate
RUN pnpm install --frozen-lockfile

# Copy source
COPY apps/frontend ./apps/frontend
COPY packages ./packages
COPY tsconfig.json ./

# Build
WORKDIR /app/apps/frontend
RUN pnpm build

# Production image
FROM nginx:alpine

COPY --from=builder /app/apps/frontend/dist /usr/share/nginx/html
COPY infra/docker/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
