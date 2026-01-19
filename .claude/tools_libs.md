## **Frontend**

### Editor with real-time collaboration (CRDT)

* **React + TipTap** (ProseMirror-based, powerful)
* **tiptap-markdown** plugin
* **yjs** for real-time CRDT
* **y-websocket** for syncing

Why this stack?
✔ Overleaf-like experience (cursor colors, selections, real-time sync)
✔ TipTap is the best WYSIWYG Markdown editor today
✔ Yjs gives Google Docs-level collaboration

### Math / Graphics / Tables support

* **KaTeX**: fast math formulas (like Overleaf)
* **Mermaid**: diagrams
* **flowchart.js** or **Graphviz server**
* **Tables** via Markdown renderer or TipTap table extension
* **Multi-language RTL/LTR**: TipTap + CSS bidi support

### Preview engine

* **Unified.js** (remark + rehype) for AST-based rendering
* Plugins: `remark-math`, `rehype-katex`, `remark-gfm`, `rehype-raw`, `remark-mermaidjs`

### UI/UX components

* File tree panel
* Commenting sidebar
* Revision history UI
* Templates dropdown

---

## **Collaboration Backend**

* **y-websocket** (Node.js) → extremely mature and fast
* **Redis** for presence + awareness + snapshot caching
* **JWT** or SSO tokens passed through WebSocket authentication

This gives you Overleaf-style synchronous editing with almost no custom logic.

---

## **API Backend**

Choose based on company stack:

**Option 1 (fastest)** → **FastAPI** (Python)
**Option 2 (high-perf)** → **Go Fiber**
**Option 3 (enterprise)** → **NestJS** (Node.js)

Responsibilities:

* Authentication (SSO, OAuth2, company login)
* Project management
* File CRUD
* History/versioning (stored as CRDT snapshots + compressed diffs)
* Search (ElasticSearch optional)
* Citation manager API (BibTeX import/export)

---

## **Rendering / Compilation**

### Markdown → PDF (scientific)

Two approaches:

### **Option A — HTML→PDF using Chromium (fastest)**

* Markdown → HTML (Unified.js)
* HTML → PDF using **Puppeteer**
* KaTeX renders math reliably
* CSS templates for scientific formatting

Pros: fast, sandboxed, simple
Cons: not 100% LaTeX-quality typography (but often enough)

---

### **Option B — Markdown → LaTeX → PDF (near-Overleaf quality)**

Use:

* **Pandoc** for MD → LaTeX
* **TinyTeX** or **TeXLive docker** for compilation

This gives:
✔ full LaTeX quality
✔ tables, citation support, multi-language
✔ most Overleaf features

Best for scientific papers.

---

### Optional: **Pure LaTeX mode**

If your users want `.tex` files:

* Use a **TeXLive Docker container**
* Run compile in a sandbox (like Overleaf)
* Stream logs back to frontend
* Show errors inline
  → Absolutely possible.

---

## **Diagram + Plot Rendering**

* **Mermaid JS** (inline diagrams)
* **Graphviz server** (dot → svg)
* Optional: Python microservice for Matplotlib → SVG/PNG when user includes special blocks.

---

## **Tables & Multi-language support**

* `remark-gfm` → GitHub-style tables
* RTL/LTR detection based on Unicode
* Optional: `polyglossia` if compiling via LaTeX

---

## **Spell-check / Grammar**

* **LanguageTool Server (self-hosted)**: many languages
* Frontend: highlight errors in text editor

---

## **Search / indexing**

* ElasticSearch or MeiliSearch for full project search
* Index Markdown AST nodes for instant “find section/figure/table” results