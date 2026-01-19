#!/bin/bash
# Development startup script

set -e

echo "🚀 Starting Verstka development environment..."

# Check if docker-compose is available
if ! command -v docker-compose &> /dev/null; then
    echo "❌ docker-compose not found. Please install Docker and docker-compose."
    exit 1
fi

# Start infrastructure services (postgres, redis, minio)
echo "📦 Starting infrastructure services..."
cd infra
docker-compose up -d postgres redis minio
cd ..

# Wait for services to be healthy
echo "⏳ Waiting for services to be ready..."
sleep 5

# Install dependencies if not already installed
if [ ! -d "node_modules" ]; then
    echo "📥 Installing dependencies..."
    pnpm install
fi

# Start development servers in parallel
echo "🔧 Starting development servers..."

# Trap SIGINT and SIGTERM to kill all background processes
trap 'echo "🛑 Shutting down..."; kill $(jobs -p); exit' INT TERM

# Start each service in the background
(cd apps/frontend && pnpm dev) &
(cd apps/collab-server && pnpm dev) &
(cd apps/api-server && poetry run uvicorn src.main:app --reload) &
(cd apps/render-service && poetry run uvicorn src.main:app --reload --port 8001) &
(cd apps/diagram-service && pnpm dev) &

echo "✅ Development environment started!"
echo ""
echo "Services running:"
echo "  Frontend:        http://localhost:3000"
echo "  API Server:      http://localhost:8000"
echo "  Collab Server:   ws://localhost:1234"
echo "  Render Service:  http://localhost:8001"
echo "  Diagram Service: http://localhost:8002"
echo "  MinIO Console:   http://localhost:9001"
echo ""
echo "Press Ctrl+C to stop all services"

# Wait for all background processes
wait
