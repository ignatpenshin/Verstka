# Verstka Render Service

Markdown and LaTeX to PDF/HTML rendering service.

## Features

Multiple rendering pipelines:

1. **Markdown → HTML → PDF** (Puppeteer/WeasyPrint)
   - Fast rendering
   - KaTeX for math
   - Mermaid for diagrams

2. **Markdown → LaTeX → PDF** (Pandoc + TeXLive)
   - High-quality typography
   - Full LaTeX features
   - Scientific paper quality

3. **LaTeX → PDF** (TeXLive)
   - Pure LaTeX compilation
   - Overleaf-compatible

## Development

```bash
poetry install
poetry run python -m src.main
```

## Requirements

- Pandoc
- TeXLive (for LaTeX compilation)
- Chromium (for Puppeteer)
