import { Lightbulb, Code, Map, FileText, Sparkles } from 'lucide-react';

/**
 * Predefined suggestion cards shown on the empty-chat welcome view.
 * Each entry maps an icon, display text, and the prompt string sent on click.
 */
const SUGGESTIONS = [
  {
    icon: Lightbulb,
    title: 'Explain quantum computing',
    prompt: 'Explain quantum computing in simple terms',
  },
  {
    icon: Code,
    title: 'Write a Python function',
    prompt: 'Write a Python function to sort a list using merge sort',
  },
  {
    icon: Map,
    title: 'Help me plan a trip',
    prompt: 'Help me plan a 7-day trip to Japan',
  },
  {
    icon: FileText,
    title: 'Summarize a long article',
    prompt: 'Summarize this article for me in key bullet points',
  },
];

/**
 * WelcomeScreen — displayed when the conversation is empty.
 *
 * @param {Object}   props
 * @param {Function} props.onSuggestionClick – receives the suggestion prompt string
 */
export default function WelcomeScreen({ onSuggestionClick }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-16 select-none">
      {/* ——— Hero ——— */}
      <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl
        bg-gradient-to-br from-indigo-500 to-violet-500 shadow-lg shadow-indigo-500/25">
        <Sparkles className="h-7 w-7 text-white" />
      </div>

      <h1
        className="text-4xl sm:text-5xl font-bold tracking-tight
          bg-gradient-to-r from-indigo-500 to-violet-500
          bg-clip-text text-transparent"
      >
        Hello! I'm Gemini
      </h1>

      <p className="mt-3 text-lg text-gray-500 dark:text-gray-400">
        How can I help you today?
      </p>

      {/* ——— Suggestion cards (2×2) ——— */}
      <div className="mt-10 grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-2">
        {SUGGESTIONS.map(({ icon: Icon, title, prompt }) => (
          <button
            key={title}
            onClick={() => onSuggestionClick(prompt)}
            className="group flex items-start gap-3 rounded-xl p-4 text-left
              border border-gray-200 dark:border-gray-700/60
              bg-white/60 dark:bg-gray-800/50
              backdrop-blur-md
              hover:border-indigo-400 dark:hover:border-indigo-500
              hover:shadow-lg hover:shadow-indigo-500/10
              hover:-translate-y-0.5
              active:scale-[0.98]
              transition-all duration-200
              cursor-pointer"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg
              bg-gray-100 dark:bg-gray-700
              group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/40
              transition-colors duration-200">
              <Icon className="h-[18px] w-[18px] text-gray-600 dark:text-gray-300
                group-hover:text-indigo-600 dark:group-hover:text-indigo-400
                transition-colors duration-200" />
            </div>

            <span className="text-sm font-medium leading-snug
              text-gray-700 dark:text-gray-300
              group-hover:text-gray-900 dark:group-hover:text-gray-100
              transition-colors duration-200">
              {title}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
