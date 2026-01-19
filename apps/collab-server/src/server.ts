import { WebSocketServer } from 'ws';
import * as map from 'lib0/map';
import * as Y from 'yjs';
import { setupWSConnection } from 'y-websocket/bin/utils';

const PORT = process.env.PORT || 1234;
const wss = new WebSocketServer({ port: Number(PORT) });

const docs = new Map<string, Y.Doc>();

wss.on('connection', (conn, req) => {
  setupWSConnection(conn, req, { gc: true });
});

console.log(`🚀 Collaboration server running on ws://localhost:${PORT}`);

process.on('SIGTERM', () => {
  wss.close();
  process.exit(0);
});
