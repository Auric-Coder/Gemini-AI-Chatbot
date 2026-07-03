import { AlertTriangle } from 'lucide-react';

/**
 * ConfirmDialog — a modal confirmation prompt with backdrop blur.
 *
 * @param {Object}   props
 * @param {boolean}  props.isOpen    – controls visibility
 * @param {Function} props.onConfirm – fires when the user confirms the action
 * @param {Function} props.onCancel  – fires when the user cancels / clicks backdrop
 * @param {string}   props.title     – dialog heading
 * @param {string}   props.message   – dialog body text
 */
export default function ConfirmDialog({ isOpen, onConfirm, onCancel, title, message }) {
  if (!isOpen) return null;

  return (
    /* ——— Backdrop ——— */
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center
        bg-black/50 backdrop-blur-sm
        animate-[fadeIn_150ms_ease-out]"
      onClick={onCancel}
    >
      {/* Inline keyframes for the entrance animation */}
      <style>{`
        @keyframes fadeIn   { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleIn  { from { opacity: 0; transform: scale(0.92); }
                              to   { opacity: 1; transform: scale(1); } }
      `}</style>

      {/* ——— Dialog Card ——— */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md mx-4 rounded-2xl p-6
          bg-white dark:bg-gray-900
          border border-gray-200 dark:border-gray-700
          shadow-2xl
          animate-[scaleIn_200ms_ease-out]
          transition-colors duration-200"
      >
        {/* Warning icon */}
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center
          rounded-full bg-red-100 dark:bg-red-900/30">
          <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
        </div>

        {/* Title */}
        <h3 className="text-center text-lg font-semibold text-gray-900 dark:text-gray-100">
          {title}
        </h3>

        {/* Message */}
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          {message}
        </p>

        {/* Actions */}
        <div className="mt-6 flex items-center justify-center gap-3">
          {/* Cancel (ghost) */}
          <button
            onClick={onCancel}
            className="rounded-lg px-4 py-2 text-sm font-medium
              text-gray-700 dark:text-gray-300
              hover:bg-gray-100 dark:hover:bg-gray-800
              active:scale-95
              transition-all duration-200
              cursor-pointer"
          >
            Cancel
          </button>

          {/* Confirm (danger) */}
          <button
            onClick={onConfirm}
            className="rounded-lg px-4 py-2 text-sm font-medium text-white
              bg-red-600 hover:bg-red-700
              dark:bg-red-600 dark:hover:bg-red-500
              active:scale-95
              transition-all duration-200
              cursor-pointer"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
