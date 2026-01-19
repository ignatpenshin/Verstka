#!/bin/bash
# Lint all code

set -e

echo "🔍 Linting all code..."

# Lint Node.js code
echo "🌐 Linting TypeScript/JavaScript..."
pnpm lint

# Format with Prettier
echo "✨ Formatting with Prettier..."
pnpm format

# Lint Python code
echo "🐍 Linting Python..."
for app in apps/api-server apps/render-service; do
    if [ -f "$app/pyproject.toml" ]; then
        echo "  Linting $(basename $app)..."
        (cd "$app" && poetry run black src/)
        (cd "$app" && poetry run ruff check src/)
    fi
done

echo "✅ All code linted!"
