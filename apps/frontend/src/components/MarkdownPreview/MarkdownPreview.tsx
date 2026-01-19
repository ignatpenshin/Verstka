import { useEffect, useRef } from 'react';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkRehype from 'remark-rehype';
import rehypeKatex from 'rehype-katex';
import rehypeStringify from 'rehype-stringify';
import rehypeRaw from 'rehype-raw';
import mermaid from 'mermaid';
import 'katex/dist/katex.min.css';
import './MarkdownPreview.css';

interface MarkdownPreviewProps {
  content: string;
}

// Initialize Mermaid
mermaid.initialize({
  startOnLoad: false,
  theme: 'default',
  securityLevel: 'loose',
});

export const MarkdownPreview = ({ content }: MarkdownPreviewProps) => {
  const previewRef = useRef<HTMLDivElement>(null);
  const mermaidCounterRef = useRef(0);

  useEffect(() => {
    const renderMarkdown = async () => {
      try {
        // Convert HTML to Markdown first (simple approach)
        // In a production app, you'd want a more robust HTML-to-Markdown converter
        const markdownContent = htmlToMarkdown(content);

        const result = await unified()
          .use(remarkParse)
          .use(remarkGfm)
          .use(remarkMath)
          .use(remarkRehype, { allowDangerousHtml: true })
          .use(rehypeRaw)
          .use(rehypeKatex)
          .use(rehypeStringify)
          .process(markdownContent);

        if (previewRef.current) {
          previewRef.current.innerHTML = String(result);

          // Render Mermaid diagrams
          const codeBlocks = previewRef.current.querySelectorAll('pre code');
          for (const block of Array.from(codeBlocks)) {
            const code = block.textContent || '';
            const parent = block.parentElement;

            // Check if this is a mermaid code block
            if (code.trim().startsWith('graph') ||
                code.trim().startsWith('sequenceDiagram') ||
                code.trim().startsWith('classDiagram') ||
                code.trim().startsWith('stateDiagram') ||
                code.trim().startsWith('erDiagram') ||
                code.trim().startsWith('gantt') ||
                code.trim().startsWith('pie') ||
                code.trim().startsWith('journey') ||
                code.trim().startsWith('flowchart')) {

              const mermaidId = `mermaid-${mermaidCounterRef.current++}`;
              const mermaidDiv = document.createElement('div');
              mermaidDiv.className = 'mermaid-diagram';
              mermaidDiv.id = mermaidId;

              try {
                const { svg } = await mermaid.render(mermaidId, code);
                mermaidDiv.innerHTML = svg;

                if (parent) {
                  parent.replaceWith(mermaidDiv);
                }
              } catch (error) {
                console.error('Error rendering mermaid diagram:', error);
                mermaidDiv.innerHTML = `<pre class="mermaid-error">Error rendering diagram:\n${error}</pre>`;
                if (parent) {
                  parent.replaceWith(mermaidDiv);
                }
              }
            }
          }
        }
      } catch (error) {
        console.error('Error rendering markdown:', error);
      }
    };

    renderMarkdown();
  }, [content]);

  return <div ref={previewRef} className="markdown-preview" />;
};

// Simple HTML to Markdown converter
// This is a basic implementation - for production, use a library like turndown
function htmlToMarkdown(html: string): string {
  let markdown = html;

  // Remove wrapper tags
  markdown = markdown.replace(/<\/?p>/g, '\n\n');

  // Headers
  markdown = markdown.replace(/<h1>(.*?)<\/h1>/g, '# $1\n\n');
  markdown = markdown.replace(/<h2>(.*?)<\/h2>/g, '## $1\n\n');
  markdown = markdown.replace(/<h3>(.*?)<\/h3>/g, '### $1\n\n');
  markdown = markdown.replace(/<h4>(.*?)<\/h4>/g, '#### $1\n\n');
  markdown = markdown.replace(/<h5>(.*?)<\/h5>/g, '##### $1\n\n');
  markdown = markdown.replace(/<h6>(.*?)<\/h6>/g, '###### $1\n\n');

  // Bold
  markdown = markdown.replace(/<strong>(.*?)<\/strong>/g, '**$1**');
  markdown = markdown.replace(/<b>(.*?)<\/b>/g, '**$1**');

  // Italic
  markdown = markdown.replace(/<em>(.*?)<\/em>/g, '*$1*');
  markdown = markdown.replace(/<i>(.*?)<\/i>/g, '*$1*');

  // Strikethrough
  markdown = markdown.replace(/<s>(.*?)<\/s>/g, '~~$1~~');

  // Code
  markdown = markdown.replace(/<code>(.*?)<\/code>/g, '`$1`');

  // Code blocks
  markdown = markdown.replace(/<pre><code[^>]*>(.*?)<\/code><\/pre>/gs, '```\n$1\n```\n');
  markdown = markdown.replace(/<pre>(.*?)<\/pre>/gs, '```\n$1\n```\n');

  // Blockquote
  markdown = markdown.replace(/<blockquote>(.*?)<\/blockquote>/gs, (_, content) => {
    return content
      .trim()
      .split('\n')
      .map((line: string) => '> ' + line)
      .join('\n') + '\n\n';
  });

  // Lists
  markdown = markdown.replace(/<ul>(.*?)<\/ul>/gs, '$1\n');
  markdown = markdown.replace(/<ol>(.*?)<\/ol>/gs, '$1\n');
  markdown = markdown.replace(/<li>(.*?)<\/li>/g, '- $1\n');

  // Horizontal rule
  markdown = markdown.replace(/<hr\s*\/?>/g, '\n---\n');

  // Clean up extra newlines
  markdown = markdown.replace(/\n{3,}/g, '\n\n');

  return markdown.trim();
}
