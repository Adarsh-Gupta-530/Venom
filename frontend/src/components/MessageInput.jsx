import { useState, useRef, useEffect } from 'react';
import { ArrowUp, Square } from 'lucide-react';
import useChatStore from '../store/useChatStore';

export default function MessageInput() {
  const [input, setInput] = useState('');
  const { sendMessage, isStreaming } = useChatStore();
  const textareaRef = useRef(null);

  // Auto-resize textarea
  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = 'auto';
    ta.style.height = Math.min(ta.scrollHeight, 200) + 'px';
  }, [input]);

  const handleSubmit = () => {
    const trimmed = input.trim();
    if (!trimmed || isStreaming) return;
    sendMessage(trimmed);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const canSend = input.trim().length > 0 && !isStreaming;

  return (
    <div className="relative">
      <div
        className={`flex items-end gap-3 rounded-2xl transition-all duration-300
          glass-card border
          ${
            input.length > 0
              ? 'border-brand-500/50 shadow-[0_0_30px_-5px_rgba(99,102,241,0.3)] bg-white/5'
              : 'border-white/10'
          }`}
      >
        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask Venam AI anything..."
          rows={1}
          disabled={false}
          className="flex-1 resize-none bg-transparent px-5 py-4 text-[15px]
            text-dark-900 dark:text-dark-100 placeholder:text-dark-500 dark:placeholder:text-dark-400 focus:outline-none min-h-[56px] max-h-[200px]
            font-sans leading-relaxed"
        />

        {/* Send / Stop button */}
        <div className="pr-3 pb-3">
          <button
            onClick={handleSubmit}
            disabled={!canSend}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 btn-magnetic
              ${
                canSend
                  ? 'bg-gradient-to-br from-brand-500 to-secondary-500 hover:from-brand-400 hover:to-secondary-400 text-white shadow-lg shadow-brand-500/25 active:scale-95'
                  : isStreaming
                  ? 'bg-dark-800 text-dark-400 border border-white/5 cursor-not-allowed'
                  : 'bg-dark-800 text-dark-600 border border-white/5 cursor-not-allowed'
              }`}
          >
            {isStreaming ? <Square size={16} /> : <ArrowUp size={18} />}
          </button>
        </div>
      </div>

      {/* Hint */}
      <p className="text-center text-xs text-dark-500 mt-4 font-medium">
        Venam AI can make mistakes. Consider verifying important information.
      </p>
    </div>
  );
}
