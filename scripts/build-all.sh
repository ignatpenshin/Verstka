#!/bin/bash
# Build all services

set -e

echo "🔨 Building all services..."

# Build shared packages first
echo "📦 Building shared packages..."
for pkg in packages/*; do
    if [ -f "$pkg/package.json" ]; then
        echo "  Building $(basename $pkg)..."
        (cd "$pkg" && pnpm build)
    fi
done

# Build Node.js apps
echo "🌐 Building Node.js apps..."
for app in apps/frontend apps/collab-server apps/diagram-service; do
    if [ -f "$app/package.json" ]; then
        echo "  Building $(basename $app)..."
        (cd "$app" && pnpm build)
    fi
done

# Build Python apps
echo "🐍 Building Python apps..."
for app in apps/api-server apps/render-service; do
    if [ -f "$app/pyproject.toml" ]; then
        echo "  Building $(basename $app)..."
        (cd "$app" && poetry install)
    fi
done

echo "✅ All services built successfully!"
