# @verstka/markdown-engine

Shared Markdown processing engine using Unified.js ecosystem.

## Features

- Markdown parsing (remark)
- Math support (KaTeX)
- GFM tables, task lists, etc.
- Extensible plugin system

## Usage

```typescript
import { markdownToHtml } from '@verstka/markdown-engine';

const html = await markdownToHtml('# Hello **world**');
```
