# Verstka Diagram Service

Service for rendering diagrams from code (Mermaid, Graphviz).

## Features

- **Mermaid**: Flowcharts, sequence diagrams, gantt charts
- **Graphviz**: DOT language graphs
- Output formats: SVG, PNG

## Development

```bash
pnpm install
pnpm dev
```

## API

### POST /render/mermaid
Render Mermaid diagram to SVG/PNG

### POST /render/graphviz
Render Graphviz DOT to SVG/PNG
