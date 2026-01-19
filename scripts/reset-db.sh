#!/bin/bash
# Reset database

set -e

echo "⚠️  WARNING: This will delete all data in the database!"
read -p "Are you sure? (yes/no): " -r
echo

if [[ ! $REPLY =~ ^yes$ ]]; then
    echo "Cancelled."
    exit 1
fi

echo "🗑️  Resetting database..."

cd infra
docker-compose down postgres
docker volume rm verstka_postgres_data || true
docker-compose up -d postgres

echo "✅ Database reset complete!"
echo "Run migrations to set up the schema."
