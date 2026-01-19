# Architecture Overview

This document describes the high-level architecture of the Verstka collaborative scientific writing platform.

## System Components

### Frontend Layer

The frontend is a React single-page application built with:
- **TipTap**: ProseMirror-based rich text editor
- **Yjs**: CRDT for real-time collaboration
- **y-websocket**: WebSocket provider for Yjs
- **KaTeX**: Math formula rendering
- **Mermaid**: Diagram rendering

### Collaboration Layer

The collaboration server handles real-time document synchronization:
- WebSocket server using `y-websocket`
- CRDT document state management
- Presence tracking (cursors, selections)
- Snapshot storage in Redis

### API Layer

The API server provides RESTful endpoints for:
- User authentication and authorization
- Project management (CRUD operations)
- File management
- Version history
- Template management
- Integration with storage and rendering services

### Rendering Layer

Multiple rendering pipelines:

1. **Markdown → HTML → PDF**
   - Unified.js for Markdown processing
   - Puppeteer/WeasyPrint for PDF generation
   - Fast, suitable for most documents

2. **Markdown → LaTeX → PDF**
   - Pandoc for conversion
   - TeXLive for compilation
   - High-quality typography for scientific papers

3. **Pure LaTeX → PDF**
   - Direct TeXLive compilation
   - Full Overleaf compatibility

### Storage Layer

- **PostgreSQL**: Relational data (users, projects, metadata)
- **Redis**: Caching, presence data, CRDT snapshots
- **MinIO/S3**: Object storage for files, images, PDFs

## Data Flow

### Document Editing

```
User types → TipTap → Yjs update → WebSocket → Collab Server
                                                     ↓
Other Users ← WebSocket ← Yjs update ← Redis ← Broadcast
```

### Document Rendering

```
User requests PDF → API Server → Render Service
                                      ↓
                                 Markdown → HTML/LaTeX
                                      ↓
                                 Puppeteer/TeXLive
                                      ↓
                                    PDF ← S3 Storage
```

## Security Considerations

- JWT-based authentication
- Row-level security in PostgreSQL
- CORS configuration
- Input sanitization
- Sandboxed LaTeX compilation
- Rate limiting on API endpoints

## Scalability

- Stateless API servers (horizontal scaling)
- Redis for session storage
- CDN for static assets
- S3 for file storage
- Kubernetes for orchestration

## Monitoring

- Application logs (Winston)
- Performance metrics (Prometheus)
- Error tracking
- Health check endpoints
