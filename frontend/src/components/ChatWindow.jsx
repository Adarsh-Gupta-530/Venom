import { useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';
import EmptyState from './EmptyState';
import TypingIndicator from './TypingIndicator';
import useChatStore from '../store/useChatStore';

export default function ChatWindow() {
  const { messages, isStreaming, activeChatId } = useChatStore();
  const bottomRef = useRef(null);
  const containerRef = useRef(null);

  // Auto-scroll on new messages
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const hasMessages = messages.length > 0;

  return (
    <div className="flex-1 flex flex-col min-h-0 relative">
      {/* Background Glow */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[20%] w-[40%] h-[40%] rounded-full bg-brand-500/5 blur-[120px] animate-pulse-glow" />
      </div>

      {/* Messages area */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto px-4 md:px-8 lg:px-16 xl:px-32 py-8 z-10"
      >
        {!hasMessages && !activeChatId ? (
          <EmptyState />
        ) : !hasMessages ? (
          <EmptyState />
        ) : (
          <div className="max-w-4xl mx-auto space-y-4">
            {messages.map((msg, index) => (
              <MessageBubble key={msg._id || index} message={msg} />
            ))}
            <div ref={bottomRef} className="h-4" />
          </div>
        )}
      </div>

      {/* Input area */}
      <div className="relative z-20 pt-4 pb-6 px-4 md:px-8 bg-gradient-to-t from-dark-50 via-dark-50/90 dark:from-dark-950 dark:via-dark-950/90 to-transparent">
        <div className="max-w-4xl mx-auto">
          <MessageInput />
        </div>
      </div>
    </div>
  );
}
