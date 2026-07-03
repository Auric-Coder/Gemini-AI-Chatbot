import { useState, useEffect, useCallback } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import Navbar from './components/Navbar';
import ChatContainer from './components/ChatContainer';
import MessageInput from './components/MessageInput';
import ConfirmDialog from './components/ConfirmDialog';
import { sendMessage } from './api';
import './index.css';

// localStorage keys
const STORAGE_KEY_MESSAGES = 'gemini-chat-messages';
const STORAGE_KEY_THEME = 'gemini-chat-theme';

function App() {
  // Theme state — defaults to dark mode
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY_THEME);
    return saved !== null ? JSON.parse(saved) : true;
  });

  // Chat messages state — persisted in localStorage
  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_MESSAGES);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Loading state for AI response
  const [isLoading, setIsLoading] = useState(false);

  // Confirm dialog state for clearing chat
  const [showConfirm, setShowConfirm] = useState(false);

  // Apply dark mode class to HTML element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem(STORAGE_KEY_THEME, JSON.stringify(darkMode));
  }, [darkMode]);

  // Persist messages to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_MESSAGES, JSON.stringify(messages));
  }, [messages]);

  // Toggle dark/light theme
  const toggleTheme = useCallback(() => {
    setDarkMode((prev) => !prev);
  }, []);

  // Handle new chat button
  const handleNewChat = useCallback(() => {
    if (messages.length === 0) return;
    setShowConfirm(true);
  }, [messages.length]);

  // Confirm clear chat
  const confirmClearChat = useCallback(() => {
    setMessages([]);
    setShowConfirm(false);
    toast.success('Chat cleared!', {
      style: {
        background: darkMode ? '#1f2937' : '#ffffff',
        color: darkMode ? '#f3f4f6' : '#111827',
        border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
      },
    });
  }, [darkMode]);

  // Send a message
  const handleSendMessage = useCallback(
    async (content) => {
      // Add user message
      const userMessage = {
        role: 'user',
        content,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);

      try {
        // Call the backend API
        const reply = await sendMessage(content);

        // Add AI response
        const aiMessage = {
          role: 'assistant',
          content: reply,
          timestamp: Date.now(),
        };

        setMessages((prev) => [...prev, aiMessage]);
      } catch (error) {
        // Show error toast
        toast.error(error.message || 'Failed to get a response. Please try again.', {
          duration: 5000,
          style: {
            background: darkMode ? '#1f2937' : '#ffffff',
            color: darkMode ? '#f3f4f6' : '#111827',
            border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
          },
        });
      } finally {
        setIsLoading(false);
      }
    },
    [darkMode]
  );

  // Handle suggestion click from welcome screen
  const handleSuggestionClick = useCallback(
    (suggestion) => {
      handleSendMessage(suggestion);
    },
    [handleSendMessage]
  );

  return (
    <div className={`h-screen flex flex-col ${
      darkMode ? 'bg-gray-950' : 'bg-gray-50'
    } transition-colors duration-300`}>
      {/* Toast notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
        }}
      />

      {/* Navigation bar */}
      <Navbar
        onNewChat={handleNewChat}
        darkMode={darkMode}
        onToggleTheme={toggleTheme}
      />

      {/* Chat messages area */}
      <ChatContainer
        messages={messages}
        isLoading={isLoading}
        darkMode={darkMode}
        onSuggestionClick={handleSuggestionClick}
      />

      {/* Message input */}
      <div className={`border-t ${
        darkMode ? 'border-gray-800 bg-gray-950' : 'border-gray-200 bg-gray-50'
      } transition-colors duration-300`}>
        <div className="max-w-3xl mx-auto w-full px-4 py-4">
          <MessageInput
            onSend={handleSendMessage}
            isLoading={isLoading}
            darkMode={darkMode}
          />
          <p className={`text-xs text-center mt-2 ${
            darkMode ? 'text-gray-600' : 'text-gray-400'
          }`}>
            Gemini can make mistakes. Verify important information.
          </p>
        </div>
      </div>

      {/* Clear chat confirmation dialog */}
      <ConfirmDialog
        isOpen={showConfirm}
        onConfirm={confirmClearChat}
        onCancel={() => setShowConfirm(false)}
        title="Clear conversation?"
        message="This will permanently delete all messages in this chat. This action cannot be undone."
      />
    </div>
  );
}

export default App;
