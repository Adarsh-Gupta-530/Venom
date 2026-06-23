import MarkdownRenderer from './MarkdownRenderer';
import TypingIndicator from './TypingIndicator';

function formatTime(isoString) {
  try {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } catch {
    return '';
  }
}

export default function MessageBubble({ message }) {
  const isUser = message.senderType === 'user';
  const isStreaming = message.isStreaming;
  const isEmpty = message.content === '';

  // Show typing indicator when streaming and content is empty
  if (!isUser && isStreaming && isEmpty) {
    return <TypingIndicator />;
  }

  return (
    <div
      className={`flex items-start gap-4 py-4 animate-slide-up ${
        isUser ? 'flex-row-reverse' : 'flex-row'
      }`}
    >
      {/* Avatar */}
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-lg border border-white/5 ${
          isUser
            ? 'bg-dark-800 text-dark-300'
            : 'bg-gradient-to-br from-brand-500 to-secondary-500 text-white'
        }`}
      >
        {isUser ? <span className="font-medium text-sm">US</span> : <span className="font-bold text-sm">AI</span>}
      </div>

      {/* Bubble + timestamp */}
      <div className={`flex flex-col gap-2 max-w-[85%] md:max-w-[75%] ${isUser ? 'items-end' : 'items-start'}`}>
        {isUser ? (
          // User message
          <div className="bg-brand-600 text-white px-5 py-3.5 rounded-3xl rounded-tr-sm shadow-md">
            <p className="text-[15px] leading-relaxed whitespace-pre-wrap">{message.content}</p>
          </div>
        ) : (
          // AI message
          <div className="glass-card px-5 py-4 rounded-3xl rounded-tl-sm text-dark-100 shadow-xl border-white/10">
            {isStreaming && message.content ? (
              // Streaming with partial content
              <div className="relative">
                <MarkdownRenderer content={message.content} />
                <span className="inline-block w-1 h-4 bg-brand-400 ml-1 animate-pulse align-text-bottom rounded-full" />
              </div>
            ) : (
              <MarkdownRenderer content={message.content} />
            )}
          </div>
        )}

        {/* Timestamp */}
        {message.createdAt && (
          <span className="text-[11px] text-dark-400 dark:text-dark-500 px-1">
            {formatTime(message.createdAt)}
          </span>
        )}
      </div>
    </div>
  );
}
