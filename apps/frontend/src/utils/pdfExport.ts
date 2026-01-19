const RENDER_SERVICE_URL = import.meta.env.VITE_RENDER_SERVICE_URL || 'http://localhost:8001';

export interface ExportOptions {
  content: string;
  format: 'markdown' | 'html';
  filename?: string;
  customCss?: string;
}

export async function exportToPDF(options: ExportOptions): Promise<void> {
  const { content, format, filename = 'document.pdf', customCss = '' } = options;

  try {
    const response = await fetch(`${RENDER_SERVICE_URL}/render/pdf`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content,
        format,
        custom_css: customCss,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to export PDF');
    }

    // Download the PDF
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error exporting PDF:', error);
    throw error;
  }
}

// Helper to convert HTML to Markdown (simple implementation)
export function htmlToMarkdown(html: string): string {
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
