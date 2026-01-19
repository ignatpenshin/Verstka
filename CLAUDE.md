# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Verstka is a collaborative scientific writing platform with Overleaf-like features, built as a microservices architecture with real-time collaboration using Yjs CRDT and TipTap editor.

## Common Commands

### Development
```bash
# Start all services (infrastructure + dev servers)
./scripts/dev.sh

# Start infrastructure only (postgres, redis, minio)
cd infra && docker-compose up -d postgres redis minio
```

### Building
```bash
# Build all services
./scripts/build-all.sh

# Build specific Node.js app/package
cd apps/frontend && pnpm build
cd packages/markdown-engine && pnpm build

# Build specific Python app
cd apps/api-server && poetry build
```

### Testing
```bash
# Run all tests
./scripts/test-all.sh

# Test specific Node.js package
cd packages/markdown-engine && pnpm test

# Test specific Python app
cd apps/api-server && poetry run pytest
cd apps/api-server && poetry run pytest tests/test_specific.py  # Single test file
cd apps/api-server && poetry run pytest -k test_function_name    # Single test
```

### Linting
```bash
# Lint and format all code
./scripts/lint-all.sh

# Lint Node.js code only
pnpm lint

# Format with Prettier
pnpm format

# Lint Python code
cd apps/api-server && poetry run black src/ && poetry run ruff check src/
```

### Type Checking
```bash
# Type check all TypeScript
pnpm type-check

# Type check specific package
cd apps/frontend && pnpm type-check
```

### Dependency Management
```bash
# Install all Node.js dependencies
pnpm install

# Install Python dependencies for an app
cd apps/api-server && poetry install
cd apps/render-service && poetry install

# Add Node.js dependency to workspace package
cd packages/schema && pnpm add zod

# Add Python dependency
cd apps/api-server && poetry add fastapi
```

## Architecture

### Monorepo Structure
- **pnpm workspaces** for Node.js/TypeScript packages
- **Poetry** for individual Python applications
- Shared packages in `packages/` consumed by `apps/`

### Service Communication
```
Frontend (React + Yjs)
    │
    ├─→ Collab Server (WebSocket) ←─→ Redis (Yjs persistence)
    │
    ├─→ API Server (FastAPI) ←─→ PostgreSQL (metadata, users, docs)
    │
    └─→ Render Service (Pandoc/Puppeteer) ← PDF export
         Diagram Service (Mermaid/Graphviz) ← Diagrams
         Spellcheck Service (LanguageTool) ← Spelling
```

### Key Architectural Patterns

1. **Real-time Collaboration**: Frontend connects to Collab Server via WebSocket using y-websocket protocol. Yjs CRDT handles conflict resolution. Redis persistence layer for document recovery.

2. **Shared Packages**: TypeScript packages in `packages/` are imported by apps using workspace protocol (`@verstka/schema`, `@verstka/yjs-models`, `@verstka/markdown-engine`). These must be built before apps that depend on them.

3. **Document Processing Pipeline**:
   - Editor: TipTap (ProseMirror) → Yjs Y.Doc
   - Export: Y.Doc → Markdown → Pandoc → PDF/LaTeX
   - Math: KaTeX rendering in browser, LaTeX in PDF
   - Diagrams: Mermaid/Graphviz rendered by diagram-service

4. **Python Services**: Each Python app (`api-server`, `render-service`) has independent Poetry virtualenv. No shared Python packages yet - each uses its own dependencies.

5. **Storage**: MinIO (S3-compatible) for binary assets (images, PDFs). PostgreSQL for structured metadata (users, documents, permissions). Redis for ephemeral state (presence, collaboration sessions).

### Service Ports
- Frontend: `3000`
- API Server: `8000`
- Collab Server: `1234` (WebSocket)
- Render Service: `8001`
- Diagram Service: `8002`
- Spellcheck Service: `8010`
- PostgreSQL: `5432`
- Redis: `6379`
- MinIO: `9000` (API), `9001` (Console)

## Important Development Notes

### Environment Setup
- Copy `.env.example` to `.env` in project root
- Python apps load environment from their own directory context
- Node.js apps use Vite/esbuild env handling (VITE_ prefix for frontend)

### Working with Shared Packages
When modifying packages in `packages/`:
1. Make changes in the package
2. Run `pnpm build` in that package directory
3. Consumer apps will pick up changes (may need restart in dev mode)

Alternatively, use `pnpm dev` in the package for watch mode during active development.

### Database Migrations
```bash
# Create new migration
cd apps/api-server
poetry run alembic revision --autogenerate -m "description"

# Apply migrations
poetry run alembic upgrade head

# Reset database (destructive)
./scripts/reset-db.sh
```

### Code Style
- **TypeScript**: ESLint + Prettier, strict mode enabled
- **Python**: Black (formatting) + Ruff (linting), type hints required
- **Commits**: Conventional commits format (`feat:`, `fix:`, `docs:`, etc.)

### Testing Strategy
- Tests not fully configured yet (many return warning "not configured yet")
- When adding tests, follow patterns:
  - Node.js: Jest or Vitest (check package.json)
  - Python: pytest with async support

### Docker Development
- `infra/docker-compose.yaml` defines all services
- Can run full stack with: `cd infra && docker-compose up`
- Dev mode (`./scripts/dev.sh`) runs infrastructure in Docker but apps natively for hot reload

### Known Limitations
- No authentication/authorization implemented yet
- Version history/comments features pending
- Tests incomplete across many packages
- Kubernetes manifests in `infra/k8s/` but deployment not documented
