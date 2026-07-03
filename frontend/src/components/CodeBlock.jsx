import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check } from 'lucide-react';

/**
 * CodeBlock – renders fenced code blocks inside markdown messages.
 *
 * Features:
 *  • Syntax‑highlighted via react‑syntax‑highlighter (Prism engine)
 *  • Automatic dark / light theme switching (oneDark / oneLight)
 *  • Top bar with language badge + copy‑to‑clipboard button
 *  • "Copied!" confirmation feedback for 2 seconds
 */
const CodeBlock = ({ children, language = 'text', darkMode = false }) => {
  const [copied, setCopied] = useState(false);

  /** Copy code text to clipboard and show brief confirmation. */
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for environments where Clipboard API is unavailable
      const textarea = document.createElement('textarea');
      textarea.value = children;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      className={`
        my-3 rounded-xl overflow-hidden border
        ${darkMode
          ? 'border-gray-700/60 bg-gray-900'
          : 'border-gray-200 bg-gray-50'}
        transition-all duration-200
      `}
    >
      {/* ── Top bar: language label + copy button ── */}
      <div
        className={`
          flex items-center justify-between px-4 py-2 text-xs font-medium
          ${darkMode
            ? 'bg-gray-800/80 text-gray-400 border-b border-gray-700/60'
            : 'bg-gray-100 text-gray-500 border-b border-gray-200'}
        `}
      >
        {/* Language badge */}
        <span
          className={`
            rounded-md px-2 py-0.5 uppercase tracking-wider text-[11px] font-semibold
            ${darkMode
              ? 'bg-gray-700/70 text-gray-300'
              : 'bg-gray-200 text-gray-600'}
          `}
        >
          {language}
        </span>

        {/* Copy / Copied button */}
        <button
          onClick={handleCopy}
          className={`
            flex items-center gap-1.5 rounded-md px-2.5 py-1
            text-xs font-medium transition-all duration-200 cursor-pointer
            ${copied
              ? 'text-emerald-400'
              : darkMode
                ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/60'
                : 'text-gray-500 hover:text-gray-800 hover:bg-gray-200'}
          `}
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* ── Highlighted code block ── */}
      <SyntaxHighlighter
        language={language}
        style={darkMode ? oneDark : oneLight}
        showLineNumbers={false}
        wrapLongLines
        customStyle={{
          margin: 0,
          padding: '1rem 1.25rem',
          fontSize: '0.85rem',
          lineHeight: '1.6',
          background: 'transparent',
          border: 'none',
        }}
        codeTagProps={{
          style: {
            fontFamily:
              '"Fira Code", "JetBrains Mono", "Cascadia Code", ui-monospace, monospace',
          },
        }}
      >
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;
