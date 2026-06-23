import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import CodeBlock from './CodeBlock';

export default function MarkdownRenderer({ content }) {
  return (
    <div className="prose prose-sm dark:prose-invert max-w-none
        prose-p:my-1.5 prose-p:leading-relaxed
        prose-headings:font-semibold prose-headings:mt-4 prose-headings:mb-2
        prose-h1:text-lg prose-h2:text-base prose-h3:text-sm
        prose-ul:my-2 prose-ul:pl-4 prose-ol:my-2 prose-ol:pl-4
        prose-li:my-0.5
        prose-blockquote:border-l-2 prose-blockquote:border-brand-500 prose-blockquote:pl-3
        prose-blockquote:text-dark-500 dark:prose-blockquote:text-dark-400
        prose-blockquote:italic prose-blockquote:my-2
        prose-table:border-collapse prose-table:text-sm
        prose-th:bg-dark-100 dark:prose-th:bg-dark-800 prose-th:px-3 prose-th:py-2
        prose-td:border prose-td:border-dark-200 dark:prose-td:border-dark-700 prose-td:px-3 prose-td:py-2
        prose-strong:text-dark-900 dark:prose-strong:text-white
        prose-a:text-brand-500 dark:prose-a:text-brand-400 prose-a:no-underline hover:prose-a:underline
        prose-code:text-brand-600 dark:prose-code:text-brand-400
        prose-code:bg-dark-100 dark:prose-code:bg-dark-800
        prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-xs prose-code:font-mono
        prose-pre:p-0 prose-pre:bg-transparent">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            if (!inline && (match || String(children).includes('\n'))) {
              return (
                <CodeBlock language={match ? match[1] : ''}>
                  {children}
                </CodeBlock>
              );
            }
            // Inline code
            return (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
