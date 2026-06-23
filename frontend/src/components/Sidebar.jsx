import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Plus,
  Search,
  MessageSquare,
  MoreHorizontal,
  Pencil,
  Trash2,
  Check,
  X,
  Sun,
  Moon,
  PanelLeftClose,
  Zap,
  User,
  Settings,
  Info
} from 'lucide-react';
import useChatStore from '../store/useChatStore';

export default function Sidebar() {
  const {
    chats,
    activeChatId,
    searchQuery,
    theme,
    setSearchQuery,
    createChat,
    setActiveChat,
    renameChat,
    deleteChat,
    toggleTheme,
    setSidebarOpen,
    user,
  } = useChatStore();

  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpenId, setMenuOpenId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const editInputRef = useRef(null);
  const menuRef = useRef(null);

  const filtered = chats.filter((c) =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpenId(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    if (editingId && editInputRef.current) {
      editInputRef.current.focus();
      editInputRef.current.select();
    }
  }, [editingId]);

  const handleNewChat = async () => {
    await createChat();
    navigate('/chat');
    if (window.innerWidth < 1024) setSidebarOpen(false);
  };

  const handleSelectChat = (id) => {
    setActiveChat(id);
    navigate('/chat');
    if (window.innerWidth < 1024) setSidebarOpen(false);
  };

  const startRename = (chat) => {
    setEditingId(chat._id);
    setEditTitle(chat.title);
    setMenuOpenId(null);
  };

  const confirmRename = () => {
    if (editTitle.trim()) {
      renameChat(editingId, editTitle.trim());
    }
    setEditingId(null);
  };

  const handleDelete = (id) => {
    deleteChat(id);
    setMenuOpenId(null);
  };

  const navItems = [
    { label: 'Chat', icon: MessageSquare, path: '/chat' },
    { label: 'Profile', icon: User, path: '/profile' },
    { label: 'Settings', icon: Settings, path: '/settings' },
    { label: 'About', icon: Info, path: '/about' },
  ];

  return (
    <div className="w-72 h-full flex flex-col bg-white/5 dark:bg-dark-900/50 backdrop-blur-xl border-r border-dark-200/50 dark:border-white/5">
      {/* Header */}
      <div className="p-5 flex items-center justify-between border-b border-dark-200/50 dark:border-white/5">
        <button onClick={() => navigate('/')} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center shadow-lg">
            <Zap size={16} className="text-dark-950" />
          </div>
          <span className="text-lg font-bold tracking-tight text-dark-900 dark:text-white">Venam <span className="text-brand-400">AI</span></span>
        </button>
        <button
          onClick={() => setSidebarOpen(false)}
          className="p-2 rounded-xl hover:bg-dark-200 dark:hover:bg-white/5 text-dark-500 dark:text-dark-400 transition-colors lg:hidden"
        >
          <PanelLeftClose size={18} />
        </button>
      </div>

      {/* Main Navigation */}
      <div className="px-3 py-4 space-y-1 border-b border-dark-200/50 dark:border-white/5">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => {
                navigate(item.path);
                if (window.innerWidth < 1024) setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-brand-500/10 text-brand-500 dark:text-brand-400'
                  : 'text-dark-600 dark:text-dark-400 hover:bg-dark-100 dark:hover:bg-white/5'
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          );
        })}
      </div>

      {/* New Chat Button */}
      <div className="p-4">
        <button
          onClick={handleNewChat}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl
            bg-gradient-to-r from-brand-500 to-brand-400 hover:from-brand-400 hover:to-brand-300 
            text-dark-950 text-sm font-semibold shadow-lg shadow-brand-400/20
            transition-all duration-200 active:scale-[0.98]"
        >
          <Plus size={16} />
          New Conversation
        </button>
      </div>

      {/* Search */}
      <div className="px-4 pb-2">
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400" />
          <input
            type="text"
            placeholder="Search history..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2.5 rounded-xl text-sm
              bg-dark-50 dark:bg-black/20 border border-dark-200 dark:border-white/5
              text-dark-900 dark:text-white placeholder:text-dark-400
              focus:outline-none focus:ring-2 focus:ring-brand-400/30 focus:border-brand-400
              transition-all duration-200"
          />
        </div>
      </div>

      {/* Chat list */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1 scrollbar-hide">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-4 opacity-50">
            <MessageSquare size={24} className="mb-3 text-dark-400" />
            <p className="text-xs text-dark-400">No conversations</p>
          </div>
        ) : (
          filtered.map((chat) => {
            const isChatActive = location.pathname === '/chat' && activeChatId === chat._id;
            return (
              <div
                key={chat._id}
                className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm cursor-pointer select-none transition-colors ${
                  isChatActive
                    ? 'bg-dark-100 dark:bg-white/10 text-dark-900 dark:text-white font-medium'
                    : 'text-dark-600 dark:text-dark-400 hover:bg-dark-50 dark:hover:bg-white/5'
                }`}
                onClick={() => editingId !== chat._id && handleSelectChat(chat._id)}
              >
                <MessageSquare size={16} className="shrink-0 opacity-50" />

                {editingId === chat._id ? (
                  <div className="flex-1 flex items-center gap-1">
                    <input
                      ref={editInputRef}
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') confirmRename();
                        if (e.key === 'Escape') setEditingId(null);
                      }}
                      className="flex-1 bg-white dark:bg-dark-800 px-2 py-1 rounded-lg text-sm
                        border border-brand-500 focus:outline-none text-dark-900 dark:text-white"
                      onClick={(e) => e.stopPropagation()}
                    />
                    <button onClick={(e) => { e.stopPropagation(); confirmRename(); }} className="p-1 hover:text-green-500 text-dark-400"><Check size={14} /></button>
                    <button onClick={(e) => { e.stopPropagation(); setEditingId(null); }} className="p-1 hover:text-red-500 text-dark-400"><X size={14} /></button>
                  </div>
                ) : (
                  <>
                    <span className="flex-1 truncate">{chat.title}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setMenuOpenId(menuOpenId === chat._id ? null : chat._id);
                      }}
                      className="p-1 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-dark-200 dark:hover:bg-white/10 transition-all"
                    >
                      <MoreHorizontal size={14} />
                    </button>

                    {menuOpenId === chat._id && (
                      <div ref={menuRef} className="absolute right-2 top-full mt-1 z-50 w-36 glass border border-white/10 rounded-xl shadow-2xl py-1 animate-fade-in">
                        <button onClick={(e) => { e.stopPropagation(); startRename(chat); }} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-dark-600 dark:text-dark-300 hover:bg-dark-100 dark:hover:bg-white/5 transition-colors">
                          <Pencil size={14} /> Rename
                        </button>
                        <button onClick={(e) => { e.stopPropagation(); handleDelete(chat._id); }} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-500/10 transition-colors">
                          <Trash2 size={14} /> Delete
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* User Profile Footer */}
      <div className="p-4 border-t border-dark-200/50 dark:border-white/5 bg-dark-50/50 dark:bg-black/20">
        {user ? (
          <div className="flex items-center justify-between mb-4 px-1">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-8 h-8 rounded-full bg-brand-400/20 text-brand-400 flex items-center justify-center shrink-0">
                <User size={16} />
              </div>
              <div className="truncate">
                <p className="text-sm font-semibold text-dark-900 dark:text-white truncate">{user.name}</p>
                <p className="text-xs text-dark-500 dark:text-dark-400 truncate">Early Access</p>
              </div>
            </div>
            <button
              onClick={() => {
                useChatStore.getState().logout();
                navigate('/');
              }}
              className="text-xs font-medium text-red-500 hover:text-red-400 px-2 py-1 rounded-lg hover:bg-red-500/10 transition-colors"
            >
              Sign out
            </button>
          </div>
        ) : null}
        
        <button
          onClick={toggleTheme}
          className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium
            text-dark-600 dark:text-dark-400 bg-white dark:bg-white/5 border border-dark-200 dark:border-white/5
            hover:border-dark-300 dark:hover:border-white/10 hover:text-dark-900 dark:hover:text-white transition-all shadow-sm"
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
    </div>
  );
}
