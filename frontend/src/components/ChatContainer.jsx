import { useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';
import LoadingIndicator from './LoadingIndicator';
import WelcomeScreen from './WelcomeScreen';

/**
 * ChatContainer – the scrollable messages viewport.
 *
 * Responsibilities:
 *  • Displays the WelcomeScreen when the conversation is empty
 *  • Renders the message list via ChatMessage
 *  • Shows a LoadingIndicator while the AI is generating
 *  • Auto‑scrolls to the latest message on update
 *  • Provides a custom thin scrollbar that blends with the theme
 */
const ChatContainer = ({
  messages = [],
  isLoading = false,
  darkMode = false,
  onSuggestionClick,
}) => {
  const scrollRef = useRef(null);
  const bottomRef = useRef(null);

  // Auto‑scroll to bottom whenever messages change or loading state toggles
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // ── Empty state ─────────────────────────────────────────────────────────
  if (messages.length === 0 && !isLoading) {
    return (
      <div
        ref={scrollRef}
        className={`
          flex-1 overflow-y-auto
          ${darkMode ? 'bg-gray-950' : 'bg-white'}
          transition-colors duration-200
        `}
      >
        <WelcomeScreen darkMode={darkMode} onSuggestionClick={onSuggestionClick} />
      </div>
    );
  }

  // ── Conversation view ──────────────────────────────────────────────────
  return (
    <div
      ref={scrollRef}
      className={`
        flex-1 overflow-y-auto
        scroll-smooth
        ${darkMode ? 'bg-gray-950' : 'bg-white'}
        transition-colors duration-200
      `}
      /* ── Custom scrollbar (Tailwind v4 arbitrary CSS) ── */
      style={{
        scrollbarWidth: 'thin',
        scrollbarColor: darkMode
          ? 'rgba(75,85,99,0.5) transparent'
          : 'rgba(209,213,219,0.7) transparent',
      }}
    >
      {/* Centred, readable‑width column */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {messages.map((msg, index) => (
          <ChatMessage
            key={msg.id ?? index}
            message={msg}
            darkMode={darkMode}
          />
        ))}

        {/* Loading indicator */}
        {isLoading && (
          <div className="flex justify-start gap-3">
            {/* Placeholder avatar aligned with AI messages */}
            <div
              className="
                flex-shrink-0 mt-1 flex items-center justify-center
                h-8 w-8 rounded-full
                bg-gradient-to-br from-indigo-500 to-violet-500
                shadow-lg shadow-indigo-500/20
              "
            >
              <span className="text-white text-xs font-bold">✦</span>
            </div>
            <LoadingIndicator darkMode={darkMode} />
          </div>
        )}

        {/* Invisible anchor for auto‑scroll */}
        <div ref={bottomRef} aria-hidden="true" />
      </div>

      {/* ── WebKit custom scrollbar styles ── */}
      <style>{`
        /* Chrome, Safari, Edge */
        div::-webkit-scrollbar {
          width: 6px;
        }
        div::-webkit-scrollbar-track {
          background: transparent;
        }
        div::-webkit-scrollbar-thumb {
          border-radius: 9999px;
          background: ${darkMode ? 'rgba(75,85,99,0.5)' : 'rgba(209,213,219,0.7)'};
        }
        div::-webkit-scrollbar-thumb:hover {
          background: ${darkMode ? 'rgba(107,114,128,0.7)' : 'rgba(156,163,175,0.8)'};
        }
      `}</style>
    </div>
  );
};

export default ChatContainer;
