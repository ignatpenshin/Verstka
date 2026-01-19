import express from 'express';

const app = express();
const PORT = process.env.PORT || 8002;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Verstka Diagram Service' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.post('/render/mermaid', async (req, res) => {
  // TODO: Implement Mermaid rendering
  res.json({ status: 'not_implemented', message: 'Mermaid rendering coming soon' });
});

app.post('/render/graphviz', async (req, res) => {
  // TODO: Implement Graphviz rendering
  res.json({ status: 'not_implemented', message: 'Graphviz rendering coming soon' });
});

app.listen(PORT, () => {
  console.log(`🎨 Diagram service running on http://localhost:${PORT}`);
});
