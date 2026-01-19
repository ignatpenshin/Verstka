# Verstka

Collaborative scientific writing platform with Overleaf-like features.

## Features

- **Real-time Collaboration**: Google Docs-style editing with Yjs CRDT
- **Rich Markdown Editor**: TipTap-based WYSIWYG editor with extensions
- **Math Support**: KaTeX/LaTeX rendering for scientific formulas
- **Diagrams**: Mermaid and Graphviz support
- **PDF Export**: Multiple rendering pipelines (Markdown→PDF, LaTeX→PDF)
- **Version History**: CRDT-based change tracking
- **Comments & Review**: Inline commenting and suggestion mode
- **Templates**: Pre-configured document templates
- **Multi-language**: RTL/LTR text support

## Architecture

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│   Frontend  │────▶│  API Server  │────▶│  PostgreSQL │
│ (React+Yjs) │     │  (FastAPI)   │     │             │
└─────────────┘     └──────────────┘     └─────────────┘
       │                    │
       │                    │
       ▼                    ▼
┌─────────────┐     ┌──────────────┐
│ Collab      │     │   Render     │
│ Server      │     │   Service    │
│ (y-websocket)│    │  (Pandoc)    │
└─────────────┘     └──────────────┘
       │
       ▼
┌─────────────┐
│    Redis    │
└─────────────┘
```

## Tech Stack

### Frontend
- React 18
- TipTap (ProseMirror-based editor)
- Yjs (CRDT)
- KaTeX (math rendering)
- Mermaid (diagrams)
- Vite (build tool)

### Backend
- **API Server**: FastAPI (Python)
- **Collaboration**: y-websocket (Node.js)
- **Render Service**: Pandoc + Puppeteer/WeasyPrint (Python)
- **Diagram Service**: Mermaid + Graphviz (Node.js)
- **Spellcheck**: LanguageTool (Java)

### Infrastructure
- PostgreSQL (database)
- Redis (caching, presence)
- MinIO (S3-compatible storage)
- Docker + docker-compose

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm 8+
- Python 3.11+
- Poetry
- Docker & docker-compose

### Installation

1. Clone the repository:
```bash
git clone <repo-url>
cd verstka
```

2. Install Node.js dependencies:
```bash
pnpm install
```

3. Install Python dependencies:
```bash
cd apps/api-server && poetry install
cd ../render-service && poetry install
```

### Development

Start all services in development mode:

```bash
./scripts/dev.sh
```

This will start:
- Frontend: http://localhost:3000
- API Server: http://localhost:8000
- Collab Server: ws://localhost:1234
- Render Service: http://localhost:8001
- Diagram Service: http://localhost:8002
- PostgreSQL: localhost:5432
- Redis: localhost:6379
- MinIO: http://localhost:9000 (Console: http://localhost:9001)

### Building

Build all services:

```bash
./scripts/build-all.sh
```

### Testing

Run all tests:

```bash
./scripts/test-all.sh
```

### Linting

Lint and format all code:

```bash
./scripts/lint-all.sh
```

## Project Structure

```
verstka/
├── apps/                      # Applications
│   ├── frontend/              # React frontend
│   ├── collab-server/         # Yjs WebSocket server
│   ├── api-server/            # FastAPI backend
│   ├── render-service/        # PDF rendering service
│   ├── diagram-service/       # Diagram rendering service
│   ├── spellcheck-service/    # LanguageTool wrapper
│   └── tex-compiler/          # LaTeX compiler
│
├── packages/                  # Shared packages
│   ├── markdown-engine/       # Unified.js Markdown processor
│   ├── schema/                # Shared TypeScript schemas
│   ├── commons/               # Shared utilities
│   ├── yjs-models/            # Yjs document models
│   └── config/                # Configuration management
│
├── infra/                     # Infrastructure
│   ├── docker/                # Dockerfiles
│   ├── docker-compose.yaml    # Local development stack
│   ├── k8s/                   # Kubernetes manifests
│   ├── terraform/             # Infrastructure as code
│   └── monitoring/            # Monitoring configs
│
├── scripts/                   # Utility scripts
│   ├── dev.sh                 # Start dev environment
│   ├── build-all.sh           # Build all services
│   ├── test-all.sh            # Run all tests
│   └── clean-all.sh           # Clean build artifacts
│
└── docs/                      # Documentation
```

## Deployment

### Docker Compose (Development/Testing)

```bash
cd infra
docker-compose up -d
```

### Kubernetes (Production)

Coming soon - Kubernetes manifests are in `infra/k8s/`

## Development Roadmap

### Milestone 1 - Core Editor & Collaboration ✅ (Setup Complete)
- [x] Monorepo structure
- [ ] Basic editor with TipTap
- [ ] Real-time collaboration with Yjs
- [ ] Markdown preview
- [ ] PDF export

### Milestone 2 - Productionization
- [ ] Authentication & authorization
- [ ] Comments & suggestions
- [ ] Version history
- [ ] Templates
- [ ] Spell-checker integration

### Milestone 3 - Scientific Extensions
- [ ] BibTeX citation management
- [ ] Advanced LaTeX rendering
- [ ] Graphviz integration
- [ ] Review mode
- [ ] Multi-language support

## Contributing

Coming soon

## License

Coming soon

## Acknowledgments

- [Overleaf](https://www.overleaf.com/) - Inspiration
- [Yjs](https://yjs.dev/) - CRDT implementation
- [TipTap](https://tiptap.dev/) - Editor framework
- [Pandoc](https://pandoc.org/) - Document converter
