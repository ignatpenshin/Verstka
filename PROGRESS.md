# Development Progress

## Current Status (2026-01-20)

### ✅ Completed - Milestone 1: Core Editor

**Working Features:**
- ✅ Service stack runs successfully via `./scripts/dev.sh`
- ✅ Frontend editor loads without crashes
- ✅ TipTap editor with collaborative extensions initialized correctly
- ✅ Basic text editing and formatting (bold, italic, headings, lists, code blocks)
- ✅ Toolbar with formatting controls
- ✅ WebSocket connection to collaboration server (port 1234)
- ✅ Real-time collaboration infrastructure (Yjs CRDT)
- ✅ Basic rendering in preview pane
- ✅ All microservices start up properly:
  - Frontend (React + Vite) on port 3000
  - API Server (FastAPI) on port 8000
  - Collab Server (WebSocket) on port 1234
  - Render Service on port 8001
  - Diagram Service on port 8002
  - Infrastructure (PostgreSQL, Redis, MinIO)

**Recent Fixes:**
- Fixed TipTap schema initialization error (missing 'doc' node)
- Conditional undo/redo buttons (hidden when history extension disabled for Yjs)
- Improved editor loading states and WebSocket connection handling
- Better status indicators for collaboration state

### 🔧 Known Issues

**High Priority:**
1. **Preview pane shows rendered HTML instead of raw markdown** - Left pane should display editable raw markdown source, right pane should show rendered preview
2. **PDF export not working** - Export to PDF button exists but export functionality fails
3. **No containerization** - Services run natively via dev scripts, not containerized for production deployment

**Medium Priority:**
4. **Specific rendering packages untested** - Need to verify:
   - LaTeX math rendering (KaTeX integration)
   - Mermaid diagrams
   - Graphviz diagrams
   - Special scientific notation packages
   - Bibliography/citations
   - Custom LaTeX packages

**Low Priority:**
5. React Router deprecation warnings (v7 future flags)
6. Authentication/authorization not implemented
7. Version history feature pending
8. Comments feature pending

### 📋 Next Session Goals

1. **Fix preview pane** - Make left side show raw markdown editor, right side show rendered preview
2. **Debug and fix PDF export** - Investigate render-service integration, test Pandoc pipeline
3. **Test scientific rendering packages**:
   - Math equations with KaTeX/LaTeX
   - Diagrams (Mermaid, Graphviz)
   - Code syntax highlighting
   - Tables and figures
   - Bibliography support
4. **Consider containerization approach** - Docker Compose for production deployment

### 🎯 Milestone Tracking

**Milestone 1: Core Editor & Collaboration** ✅ (Complete with known issues)
- Real-time collaborative editing
- Basic formatting toolbar
- WebSocket-based collaboration
- Microservices architecture running

**Milestone 2: Document Processing** 🔄 (In Progress)
- Raw markdown editing
- PDF export pipeline
- Scientific package rendering
- Math and diagram support

**Milestone 3: Production Readiness** ⏳ (Pending)
- Containerization
- Authentication
- Version history
- Comments and review features

---

## Development Notes

### Architecture Decisions Made
- Using Yjs CRDT for conflict-free collaborative editing
- TipTap (ProseMirror) as the editor foundation
- Disabled native history extension in favor of Yjs history
- Monorepo structure with pnpm workspaces (Node.js) and Poetry (Python)

### Technical Debt
- Tests not fully configured across packages
- No error boundaries in React components
- MinIO integration not tested
- Database migrations need review
- No production configuration for services

### Environment
- All services running on localhost
- Development mode with hot reload
- SQLite persistence for Yjs documents via Redis
- PostgreSQL for metadata storage
