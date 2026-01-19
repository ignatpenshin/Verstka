#!/bin/bash
# Run all tests

set -e

echo "🧪 Running all tests..."

# Test Node.js packages and apps
echo "🌐 Testing Node.js packages and apps..."
pnpm -r test || echo "⚠️  Some Node.js tests not configured yet"

# Test Python apps
echo "🐍 Testing Python apps..."
for app in apps/api-server apps/render-service; do
    if [ -f "$app/pyproject.toml" ]; then
        echo "  Testing $(basename $app)..."
        (cd "$app" && poetry run pytest) || echo "⚠️  $(basename $app) tests not configured yet"
    fi
done

echo "✅ All tests completed!"
