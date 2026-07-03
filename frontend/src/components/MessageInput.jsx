import { SendHorizontal } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

/**
 * MessageInput — chat composer with an auto-resizing textarea and send button.
 *
 * @param {Object}   props
 * @param {Function} props.onSend    – callback receiving the trimmed message string
 * @param {boolean}  props.isLoading – disables the input while the AI is responding
 */
export default function MessageInput({ onSend, isLoading }) {
  const [value, setValue] = useState('');
  const textareaRef = useRef(null);

  /** Keep the textarea height in sync with its content (1 → 5 rows). */
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto'; // reset so shrinking works
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`; // cap ≈ 5 rows
  }, [value]);

  /** Auto-focus on mount. */
  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  /** Send handler — trims, dispatches, resets, and re-focuses. */
  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed || isLoading) return;

    onSend(trimmed);
    setValue('');

    // Re-focus after React's next paint
    requestAnimationFrame(() => textareaRef.current?.focus());
  };

  /** Keyboard handler — Enter sends; Shift+Enter inserts a newline. */
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const canSend = value.trim().length > 0 && !isLoading;

  return (
    <div className="w-full px-4 pb-4 pt-2">
      <div
        className="mx-auto flex max-w-3xl items-end gap-2 rounded-2xl
          border border-gray-200 dark:border-gray-700
          bg-white/80 dark:bg-gray-800/80
          backdrop-blur-xl
          px-4 py-3
          shadow-sm
          transition-colors duration-200
          focus-within:border-indigo-400 dark:focus-within:border-indigo-500
          focus-within:ring-2 focus-within:ring-indigo-500/20"
      >
        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          placeholder="Message Gemini…"
          rows={1}
          className="flex-1 resize-none bg-transparent text-sm leading-relaxed
            text-gray-900 dark:text-gray-100
            placeholder:text-gray-400 dark:placeholder:text-gray-500
            outline-none disabled:opacity-50
            transition-opacity duration-200"
        />

        {/* Send button */}
        <button
          onClick={handleSend}
          disabled={!canSend}
          aria-label="Send message"
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl
            transition-all duration-200 cursor-pointer
            ${
              canSend
                ? 'bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-md shadow-indigo-500/25 hover:shadow-lg hover:shadow-indigo-500/40 active:scale-90'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
            }`}
        >
          <SendHorizontal className="h-[18px] w-[18px]" />
        </button>
      </div>

      {/* Subtle disclaimer */}
      <p className="mt-2 text-center text-xs text-gray-400 dark:text-gray-600 select-none">
        Gemini may display inaccurate info — double-check important facts.
      </p>
    </div>
  );
}
