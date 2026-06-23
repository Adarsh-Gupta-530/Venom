export default function TypingIndicator() {
  return (
    <div className="flex items-start gap-3 py-3 animate-fade-in">
      {/* AI Avatar */}
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white text-xs font-bold shrink-0">
        AI
      </div>
      {/* Dots */}
      <div className="bg-dark-100 dark:bg-dark-800 rounded-2xl rounded-bl-md px-4 py-3.5 flex items-center gap-1.5">
        <span className="typing-dot" />
        <span className="typing-dot" />
        <span className="typing-dot" />
      </div>
    </div>
  );
}
