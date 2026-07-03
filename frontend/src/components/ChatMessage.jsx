import { useState } from 'react';
import { User, Sparkles, Copy, Check } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import CodeBlock from './CodeBlock';

/**
 * ChatMessage – renders a single chat bubble.
 *
 * Layout:
 *  • User messages → right‑aligned, indigo→violet gradient, white text
 *  • AI messages   → left‑aligned, subtle bg, markdown‑rendered content
 *
 * Features:
 *  • Markdown rendering for AI responses (tables, lists, code, etc.)
 *  • Inline & fenced code handling via CodeBlock
 *  • Copy‑entire‑message button (AI only, visible on hover)
 *  • Smooth entrance animation (translateY + opacity)
 */
const ChatMessage = ({ message, darkMode = false }) => {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === 'user';

  /** Copy the raw message content to clipboard. */
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = message.content;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  /** Format timestamp as HH:MM */
  const formattedTime = message.timestamp
    ? new Date(message.timestamp).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })
    : '';

  // ── Custom markdown renderers ──────────────────────────────────────────
  const markdownComponents = {
    /**
     * `code` renderer – differentiates inline code from fenced code blocks.
     * Fenced blocks receive a className like "language‑js" from remark.
     */
    code({ className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '');

      // Fenced code block → delegate to CodeBlock
      if (match) {
        return (
          <CodeBlock language={match[1]} darkMode={darkMode}>
            {String(children).replace(/\n$/, '')}
          </CodeBlock>
        );
      }

      // Inline code
      return (
        <code
          className={`
            px-1.5 py-0.5 rounded-md text-sm font-mono
            ${darkMode
              ? 'bg-gray-700/70 text-indigo-300'
              : 'bg-gray-200/80 text-indigo-600'}
          `}
          {...props}
        >
          {children}
        </code>
      );
    },

    /* Style markdown links */
    a({ children, ...props }) {
      return (
        <a
          className="text-indigo-400 underline underline-offset-2 hover:text-indigo-300 transition-colors duration-150"
          target="_blank"
          rel="noopener noreferrer"
          {...props}
        >
          {children}
        </a>
      );
    },

    /* Tables */
    table({ children }) {
      return (
        <div className="my-3 overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm">
            {children}
          </table>
        </div>
      );
    },
    th({ children }) {
      return (
        <th
          className={`
            px-4 py-2 text-left text-xs font-semibold uppercase tracking-wider
            ${darkMode
              ? 'bg-gray-800 text-gray-300'
              : 'bg-gray-100 text-gray-600'}
          `}
        >
          {children}
        </th>
      );
    },
    td({ children }) {
      return (
        <td
          className={`
            px-4 py-2 whitespace-nowrap
            ${darkMode ? 'text-gray-300' : 'text-gray-700'}
          `}
        >
          {children}
        </td>
      );
    },

    /* Paragraphs */
    p({ children }) {
      return <p className="mb-3 last:mb-0 leading-relaxed">{children}</p>;
    },

    /* Lists */
    ul({ children }) {
      return <ul className="mb-3 ml-5 list-disc space-y-1.5">{children}</ul>;
    },
    ol({ children }) {
      return <ol className="mb-3 ml-5 list-decimal space-y-1.5">{children}</ol>;
    },

    /* Blockquotes */
    blockquote({ children }) {
      return (
        <blockquote
          className={`
            my-3 border-l-4 pl-4 italic
            ${darkMode
              ? 'border-indigo-500/50 text-gray-400'
              : 'border-indigo-400/60 text-gray-500'}
          `}
        >
          {children}
        </blockquote>
      );
    },

    /* Headings */
    h1({ children }) {
      return <h1 className="text-xl font-bold mb-3 mt-4">{children}</h1>;
    },
    h2({ children }) {
      return <h2 className="text-lg font-bold mb-2 mt-3">{children}</h2>;
    },
    h3({ children }) {
      return <h3 className="text-base font-semibold mb-2 mt-3">{children}</h3>;
    },

    /* Horizontal rule */
    hr() {
      return (
        <hr
          className={`my-4 border-t ${
            darkMode ? 'border-gray-700' : 'border-gray-200'
          }`}
        />
      );
    },
  };

  // ── Render ──────────────────────────────────────────────────────────────
  return (
    <div
      className={`
        flex gap-3 w-full animate-in
        ${isUser ? 'justify-end' : 'justify-start'}
      `}
      style={{
        animation: 'messageIn 0.35s ease-out both',
      }}
    >
      {/* AI avatar (left side) */}
      {!isUser && (
        <div
          className={`
            flex-shrink-0 mt-1 flex items-center justify-center
            h-8 w-8 rounded-full
            bg-gradient-to-br from-indigo-500 to-violet-500
            shadow-lg shadow-indigo-500/20
          `}
        >
          <Sparkles className="h-4 w-4 text-white" />
        </div>
      )}

      {/* Message bubble */}
      <div
        className={`
          group relative max-w-[80%] sm:max-w-[75%] lg:max-w-[70%]
          ${isUser ? 'order-1' : ''}
        `}
      >
        <div
          className={`
            px-4 py-3 text-[15px] leading-relaxed
            transition-all duration-200
            ${isUser
              ? 'bg-gradient-to-br from-indigo-500 to-violet-500 text-white rounded-2xl rounded-br-sm shadow-lg shadow-indigo-500/25'
              : darkMode
                ? 'bg-gray-800 text-gray-200 rounded-2xl rounded-bl-sm border border-gray-700/50'
                : 'bg-gray-100 text-gray-800 rounded-2xl rounded-bl-sm border border-gray-200/80'}
          `}
        >
          {isUser ? (
            /* User messages are plain text */
            <p className="whitespace-pre-wrap">{message.content}</p>
          ) : (
            /* AI messages are rendered as Markdown */
            <div className="prose-sm max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={markdownComponents}
              >
                {message.content}
              </ReactMarkdown>
            </div>
          )}
        </div>

        {/* ── Copy button for AI messages (hover reveal) ── */}
        {!isUser && (
          <button
            onClick={handleCopy}
            className={`
              absolute -top-2 -right-2 p-1.5 rounded-lg
              opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100
              transition-all duration-200 cursor-pointer
              ${darkMode
                ? 'bg-gray-700 hover:bg-gray-600 text-gray-400 hover:text-gray-200 shadow-lg shadow-black/30'
                : 'bg-white hover:bg-gray-50 text-gray-400 hover:text-gray-700 shadow-md shadow-gray-200/60'}
              border ${darkMode ? 'border-gray-600' : 'border-gray-200'}
            `}
            aria-label="Copy message"
          >
            {copied ? (
              <Check className="h-3.5 w-3.5 text-emerald-400" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
          </button>
        )}

        {/* Timestamp */}
        {formattedTime && (
          <p
            className={`
              mt-1.5 text-[11px] font-medium
              ${isUser ? 'text-right' : 'text-left'}
              ${darkMode ? 'text-gray-500' : 'text-gray-400'}
            `}
          >
            {formattedTime}
          </p>
        )}
      </div>

      {/* User avatar (right side) */}
      {isUser && (
        <div
          className={`
            flex-shrink-0 mt-1 flex items-center justify-center
            h-8 w-8 rounded-full
            ${darkMode
              ? 'bg-gray-700 border border-gray-600'
              : 'bg-gray-200 border border-gray-300'}
          `}
        >
          <User
            className={`h-4 w-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
          />
        </div>
      )}

      {/* Keyframes injected once – scoped via style tag */}
      <style>{`
        @keyframes messageIn {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default ChatMessage;
