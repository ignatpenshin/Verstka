# Tools for Features

| Feature                  |  Tool                         |
| --------------------------------- | -------------------------------------------- |
| Real-time collaboration           | Yjs + TipTap + WebSockets                    |
| Project sharing / links           | Projects API + permissions table             |
| Version history / change tracking | CRDT snapshots + diff view UI                |
| PDF preview                       | Puppeteer or TeXLive rendering pipeline      |
| Bibliography (BibTeX)             | Pandoc CSL + citation backend                |
| Rich math                         | KaTeX / LaTeX                                |
| Diagrams (TikZ)                   | Mermaid / Graphviz / render-to-image service |
| Templates                         | S3 template storage + frontend selector      |
| Multi-file projects               | S3 folder structure + file tree UI           |
| Comments / review                 | DB + TipTap comment extension                |

# Tools:

- TeXLive Docker container per compile job
- tempfs or internal S3 bucket
- Seccomp-sandbox to isolate LaTeX
- WebSocket streaming for logs/compile errors
- AST parser for structural preview (optional)
