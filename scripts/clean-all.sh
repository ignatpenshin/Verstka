#!/bin/bash
# Clean all build artifacts

set -e

echo "🧹 Cleaning all build artifacts..."

# Clean Node.js
echo "🌐 Cleaning Node.js artifacts..."
find . -name "node_modules" -type d -prune -exec rm -rf '{}' +
find . -name "dist" -type d -prune -exec rm -rf '{}' +
find . -name ".turbo" -type d -prune -exec rm -rf '{}' +
find . -name "*.tsbuildinfo" -type f -delete

# Clean Python
echo "🐍 Cleaning Python artifacts..."
find . -name "__pycache__" -type d -prune -exec rm -rf '{}' +
find . -name "*.pyc" -type f -delete
find . -name ".pytest_cache" -type d -prune -exec rm -rf '{}' +
find . -name ".mypy_cache" -type d -prune -exec rm -rf '{}' +
find . -name ".ruff_cache" -type d -prune -exec rm -rf '{}' +

echo "✅ All artifacts cleaned!"
