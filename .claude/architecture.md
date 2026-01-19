                    ┌──────────────────────────────────────────────────────────┐
                    │                        FRONTEND                          │
                    │  (React/Vue + Markdown WYSIWYG + CRDT editor)            │
                    ├──────────────────────────────────────────────────────────┤
                    │ - Editor UI (Markdown + plugins)                         │
                    │ - Real-time collaboration (CRDT over WebSockets)         │
                    │ - Live preview (AST renderer)                             │
                    │ - MathJax/KaTeX, Mermaid, Graphviz                       │
                    │ - Project tree / file browser                            │
                    │ - Commenting + Review mode                                │
                    └──────────────────────────────────────────────────────────┘
                                      │ WebSocket+HTTPS
                                      ▼
┌──────────────────────────────────────────────────────────────────────────────────┐
│                             COLLABORATION BACKEND                                 │
│                         (Node.js / Go / Python possible)                          │
├──────────────────────────────────────────────────────────────────────────────────┤
│ - CRDT coordination server (y-websocket or automerge server)                      │
│ - Presence tracking (cursors, selections, authorship colors)                      │
│ - Lockless multi-user editing                                                     │
│ - Patch history + snapshots                                                       │
│ - File operations API (create, rename, delete)                                    │
│ - Notifications (comments, suggestions)                                           │
└──────────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌──────────────────────────────────────────────────────────────────────────────────┐
│                                   API BACKEND                                    │
│                     (FastAPI / Go Fiber / Node.js NestJS)                         │
├──────────────────────────────────────────────────────────────────────────────────┤
│ - Authentication (SSO/OAuth2)                                                     │
│ - Project management backend                                                      │
│ - Storage interface (object store + DB)                                           │
│ - Render service orchestration                                                    │
│ - Versioning + diff endpoint                                                      │
│ - Export endpoints (HTML/PDF/LaTeX)                                               │
│ - Citation management backend                                                     │
└──────────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌──────────────────────────────────────────────────────────────────────────────────┐
│                           RENDERING / COMPILATION LAYER                           │
├──────────────────────────────────────────────────────────────────────────────────┤
│ - Markdown → HTML pipeline (Unified.js)                                           │
│ - Markdown → PDF (WeasyPrint / Puppeteer / LaTeX behind the scenes)               │
│ - Optional: Pure LaTeX → PDF (TinyTeX or full TeX Live in Docker)                 │
│ - Graphics rendering (Mermaid/Graphviz/Matplotlib server if needed)               │
│ - Spell-check/LanguageTool API                                                    │
└──────────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌──────────────────────────────────────────────────────────────────────────────────┐
│                             STORAGE AND DATABASE                                   │
├──────────────────────────────────────────────────────────────────────────────────┤
│ Database (PostgreSQL): projects, users, metadata, ACLs, comments                  │
│ Object Store (S3/MinIO): project files, images, assets, templates                 │
│ Redis: CRDT snapshot cache, presence data                                         │
└──────────────────────────────────────────────────────────────────────────────────┘
