import { PanelLeft } from 'lucide-react';
import useChatStore from '../store/useChatStore';

export default function MobileHeader() {
  const { toggleSidebar, sidebarOpen } = useChatStore();

  return (
    <header className="flex items-center gap-3 px-4 py-3 border-b border-dark-200 dark:border-dark-800 lg:hidden bg-white dark:bg-dark-950">
      <button
        onClick={toggleSidebar}
        className="p-2 rounded-lg hover:bg-dark-100 dark:hover:bg-dark-800 text-dark-600 dark:text-dark-400 transition-colors"
        aria-label="Toggle sidebar"
      >
        <PanelLeft size={20} />
      </button>
      <h2 className="text-sm font-semibold text-dark-800 dark:text-dark-200">
        Directory Chatbot
      </h2>
    </header>
  );
}
