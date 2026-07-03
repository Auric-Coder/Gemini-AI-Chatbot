/**
 * LoadingIndicator — three bouncing dots shown while the AI generates a response.
 *
 * The bounce animation is defined via an inline <style> tag so no external
 * CSS file or Tailwind plugin is required.
 */
export default function LoadingIndicator() {
  return (
    <>
      {/* Scoped keyframe animation */}
      <style>{`
        @keyframes dotBounce {
          0%, 80%, 100% { transform: translateY(0); }
          40%            { transform: translateY(-6px); }
        }
      `}</style>

      <div className="flex items-start gap-3 px-4 py-3 max-w-3xl">
        {/* Bubble container — styled like an AI message */}
        <div
          className="inline-flex items-center gap-3 rounded-2xl px-5 py-3
            bg-gray-100 dark:bg-gray-800
            border border-gray-200 dark:border-gray-700
            transition-colors duration-200"
        >
          {/* Bouncing dots */}
          <div className="flex items-center gap-1">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="inline-block h-2 w-2 rounded-full
                  bg-indigo-500 dark:bg-violet-400"
                style={{
                  animation: 'dotBounce 1.2s ease-in-out infinite',
                  animationDelay: `${i * 0.15}s`,
                }}
              />
            ))}
          </div>

          <span className="text-sm text-gray-500 dark:text-gray-400 select-none">
            Gemini is thinking…
          </span>
        </div>
      </div>
    </>
  );
}
