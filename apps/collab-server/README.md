# Verstka Collaboration Server

Y-WebSocket server for real-time CRDT synchronization.

## Features

- Real-time document synchronization using Yjs
- Presence and awareness tracking
- Redis persistence for snapshots
- Handles multiple concurrent users per document

## Development

```bash
pnpm install
pnpm dev
```

## Build

```bash
pnpm build
pnpm start
```

## Environment Variables

Copy `.env.example` to `.env` and configure:

- `PORT`: WebSocket server port (default: 1234)
- `REDIS_URL`: Redis connection URL
