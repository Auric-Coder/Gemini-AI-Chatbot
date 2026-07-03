import { Sparkles, Plus, Sun, Moon } from 'lucide-react';

/**
 * Navbar — sticky top navigation bar with glassmorphism effect.
 *
 * @param {Object}   props
 * @param {Function} props.onNewChat      – callback fired when "New Chat" is clicked
 * @param {boolean}  props.darkMode       – current theme state
 * @param {Function} props.onToggleTheme  – callback to toggle dark / light mode
 */
export default function Navbar({ onNewChat, darkMode, onToggleTheme }) {
  return (
    <nav
      className="sticky top-0 z-50 w-full border-b
        border-gray-200 dark:border-gray-800
        bg-white/80 dark:bg-gray-900/80
        backdrop-blur-xl
        transition-colors duration-300"
    >
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        {/* ——— Left: Brand ——— */}
        <div className="flex items-center gap-2 select-none">
          <Sparkles className="h-5 w-5 text-indigo-500" />
          <span
            className="text-lg font-semibold bg-gradient-to-r from-indigo-500 to-violet-500
              bg-clip-text text-transparent"
          >
            Gemini Chat
          </span>
        </div>

        {/* ——— Right: Actions ——— */}
        <div className="flex items-center gap-2">
          {/* New Chat */}
          <button
            onClick={onNewChat}
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5
              text-sm font-medium
              text-gray-700 dark:text-gray-300
              bg-gray-100 dark:bg-gray-800
              hover:bg-gray-200 dark:hover:bg-gray-700
              active:scale-95
              transition-all duration-200
              cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">New Chat</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            aria-label="Toggle theme"
            className="relative inline-flex h-9 w-9 items-center justify-center
              rounded-lg
              text-gray-700 dark:text-gray-300
              bg-gray-100 dark:bg-gray-800
              hover:bg-gray-200 dark:hover:bg-gray-700
              active:scale-95
              transition-all duration-200
              cursor-pointer"
          >
            {/* Sun & Moon icons cross-fade based on darkMode */}
            <Sun
              className={`h-[18px] w-[18px] absolute transition-all duration-300
                ${darkMode ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'}`}
            />
            <Moon
              className={`h-[18px] w-[18px] absolute transition-all duration-300
                ${darkMode ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'}`}
            />
          </button>
        </div>
      </div>
    </nav>
  );
}
