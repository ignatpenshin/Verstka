# Developer Guide

## Setup

### Prerequisites

- Node.js 18+
- pnpm 8+
- Python 3.11+
- Poetry
- Docker & docker-compose

### First Time Setup

1. Install dependencies:
```bash
pnpm install
cd apps/api-server && poetry install && cd ../..
cd apps/render-service && poetry install && cd ../..
```

2. Start infrastructure:
```bash
cd infra
docker-compose up -d postgres redis minio
```

3. Run database migrations (coming soon)

4. Start development servers:
```bash
./scripts/dev.sh
```

## Development Workflow

### Working on Frontend

```bash
cd apps/frontend
pnpm dev
```

The frontend runs on http://localhost:3000 with hot reload.

### Working on Backend Services

**API Server:**
```bash
cd apps/api-server
poetry run uvicorn src.main:app --reload
```

**Collaboration Server:**
```bash
cd apps/collab-server
pnpm dev
```

### Adding Dependencies

**Node.js packages:**
```bash
cd apps/frontend  # or any Node.js app/package
pnpm add <package-name>
```

**Python packages:**
```bash
cd apps/api-server  # or any Python app
poetry add <package-name>
```

### Code Style

**TypeScript/JavaScript:**
- ESLint for linting
- Prettier for formatting
- Run: `pnpm lint` and `pnpm format`

**Python:**
- Black for formatting
- Ruff for linting
- mypy for type checking

### Testing

Write tests in the `tests/` directory of each app/package.

**Node.js:**
```bash
pnpm test
```

**Python:**
```bash
poetry run pytest
```

## Common Tasks

### Adding a New API Endpoint

1. Create route in `apps/api-server/src/routes/`
2. Add schema in `apps/api-server/src/schemas/`
3. Implement service logic in `apps/api-server/src/services/`
4. Update API documentation

### Adding a New Frontend Component

1. Create component in `apps/frontend/src/components/`
2. Add types if needed
3. Write stories (Storybook - coming soon)
4. Write tests

### Working with CRDT

The document structure uses Yjs:
- `Y.XmlFragment` for the editor content
- `Y.Map` for metadata
- See `packages/yjs-models/` for shared models

## Troubleshooting

### Port Already in Use

Check running processes:
```bash
lsof -i :3000  # or other port
```

### Database Connection Issues

Reset the database:
```bash
./scripts/reset-db.sh
```

### Build Errors

Clean and rebuild:
```bash
./scripts/clean-all.sh
pnpm install
./scripts/build-all.sh
```

## Resources

- [TipTap Documentation](https://tiptap.dev/)
- [Yjs Documentation](https://docs.yjs.dev/)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Pandoc User's Guide](https://pandoc.org/MANUAL.html)
