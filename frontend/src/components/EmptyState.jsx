import useChatStore from '../store/useChatStore';

const EXAMPLE_PROMPTS = [
  {
    icon: '📁',
    title: 'Explore Files',
    prompt: 'What files and folders are in the project directory?',
  },
  {
    icon: '🔍',
    title: 'Code Review',
    prompt: 'Can you review the main source files and suggest improvements?',
  },
  {
    icon: '📝',
    title: 'Summarize',
    prompt: 'Summarize the purpose and structure of this project.',
  },
  {
    icon: '🐛',
    title: 'Debug Help',
    prompt: 'Are there any obvious bugs or issues in the codebase?',
  },
];

export default function EmptyState() {
  const { sendMessage } = useChatStore();

  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[60vh] px-4 animate-fade-in">
      {/* Branding */}
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center mb-6 shadow-lg shadow-brand-500/20">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="w-8 h-8 text-white"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
      </div>

      <h2 className="text-2xl font-semibold text-dark-900 dark:text-white mb-2">
        Directory Chatbot
      </h2>
      <p className="text-sm text-dark-500 dark:text-dark-400 mb-10 text-center max-w-sm">
        Ask me anything about your project files, code structure, or get AI assistance with your codebase.
      </p>

      {/* Example prompt cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-xl">
        {EXAMPLE_PROMPTS.map((item) => (
          <button
            key={item.title}
            onClick={() => sendMessage(item.prompt)}
            className="flex items-start gap-3 p-4 rounded-2xl text-left
              bg-dark-50 dark:bg-dark-900
              border border-dark-200 dark:border-dark-700
              hover:border-brand-500/50 hover:bg-brand-50 dark:hover:bg-dark-800
              transition-all duration-150 group active:scale-[0.98]"
          >
            <span className="text-xl shrink-0">{item.icon}</span>
            <div>
              <p className="text-sm font-medium text-dark-800 dark:text-dark-200 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                {item.title}
              </p>
              <p className="text-xs text-dark-400 dark:text-dark-500 mt-0.5 line-clamp-2">
                {item.prompt}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
