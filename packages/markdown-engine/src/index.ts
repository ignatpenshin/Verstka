import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import rehypeStringify from 'rehype-stringify';

export interface MarkdownProcessorOptions {
  allowDangerousHtml?: boolean;
}

export async function markdownToHtml(
  markdown: string,
  options: MarkdownProcessorOptions = {}
): Promise<string> {
  const processor = unified()
    .use(remarkParse)
    .use(remarkMath)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: options.allowDangerousHtml ?? true })
    .use(rehypeRaw)
    .use(rehypeKatex)
    .use(rehypeStringify);

  const result = await processor.process(markdown);
  return String(result);
}

export { unified } from 'unified';
