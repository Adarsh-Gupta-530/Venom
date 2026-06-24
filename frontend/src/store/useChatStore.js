import { create } from 'zustand';

// In production, VITE_API_URL will point to the Railway backend domain
const API_BASE = import.meta.env.VITE_API_URL || '/api';

const useChatStore = create((set, get) => ({
  // ── Auth state ──
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,

  // ── Chat list ──
  chats: [],
  activeChatId: null,
  searchQuery: '',

  // ── Messages for active chat ──
  messages: [],

  // ── UI state ──
  isLoading: false,
  isStreaming: false,
  sidebarOpen: true,

  // ── Theme ──
  theme: localStorage.getItem('theme') || 'dark',

  // ────────────────────────────────
  // Theme
  // ────────────────────────────────
  setTheme: (theme) => {
    localStorage.setItem('theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
    set({ theme });
  },

  toggleTheme: () => {
    const next = get().theme === 'dark' ? 'light' : 'dark';
    get().setTheme(next);
  },

  // ────────────────────────────────
  // Sidebar
  // ────────────────────────────────
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  setSearchQuery: (q) => set({ searchQuery: q }),

  // ────────────────────────────────
  // Auth actions
  // ────────────────────────────────
  login: async (email, password) => {
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');
      
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      set({ user: data.user, token: data.token });
      return true;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  register: async (name, email, password) => {
    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Registration failed');
      
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      set({ user: data.user, token: data.token });
      return true;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    set({ user: null, token: null, chats: [], messages: [], activeChatId: null, _messageCache: {} });
  },

  // ────────────────────────────────
  // Password Reset
  // ────────────────────────────────
  requestPasswordReset: async (email) => {
    try {
      const res = await fetch(`${API_BASE}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send reset code');
      return true;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  verifyResetCode: async (email, code) => {
    try {
      const res = await fetch(`${API_BASE}/auth/verify-reset-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Invalid or expired code');
      return true;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  resetPassword: async (email, code, newPassword) => {
    try {
      const res = await fetch(`${API_BASE}/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to reset password');
      return true;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  // ────────────────────────────────
  // Fetch all chats
  // ────────────────────────────────
  fetchChats: async () => {
    const { token } = get();
    if (!token) return;
    try {
      const res = await fetch(`${API_BASE}/chats`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to fetch chats');
      const chats = await res.json();
      set({ chats });
    } catch (err) {
      console.error('fetchChats error:', err);
    }
  },

  // ────────────────────────────────
  // Create a new chat
  // ────────────────────────────────
  createChat: async () => {
    const { token } = get();
    if (!token) return null;
    try {
      const res = await fetch(`${API_BASE}/chat/new`, { 
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to create chat');
      const chat = await res.json();
      set((s) => ({
        chats: [chat, ...s.chats],
        activeChatId: chat._id,
        messages: [],
      }));
      return chat._id;
    } catch (err) {
      console.error('createChat error:', err);
      return null;
    }
  },

  // ────────────────────────────────
  // Set active chat and load messages
  // ────────────────────────────────
  setActiveChat: async (chatId) => {
    if (chatId === get().activeChatId) return;
    set({ activeChatId: chatId, messages: [], isLoading: true });
    
    const cached = get()._messageCache?.[chatId];
    if (cached && cached.length > 0) {
      set({ messages: cached, isLoading: false });
      return;
    }

    const { token } = get();
    if (!token) {
      set({ isLoading: false });
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/chat/${chatId}/messages`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to fetch messages');
      const messages = await res.json();
      
      set((s) => ({
        messages,
        isLoading: false,
        _messageCache: { ...s._messageCache, [chatId]: messages }
      }));
    } catch (err) {
      console.error('fetchMessages error:', err);
      set({ isLoading: false });
    }
  },

  // ────────────────────────────────
  // Rename a chat
  // ────────────────────────────────
  renameChat: async (chatId, title) => {
    const { token } = get();
    if (!token) return;
    try {
      const res = await fetch(`${API_BASE}/chat/${chatId}`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ title }),
      });
      if (!res.ok) throw new Error('Failed to rename');
      const updated = await res.json();
      set((s) => ({
        chats: s.chats.map((c) => (c._id === chatId ? updated : c)),
      }));
    } catch (err) {
      console.error('renameChat error:', err);
    }
  },

  // ────────────────────────────────
  // Delete a chat
  // ────────────────────────────────
  deleteChat: async (chatId) => {
    const { token } = get();
    if (!token) return;
    try {
      const res = await fetch(`${API_BASE}/chat/${chatId}`, { 
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to delete');
      set((s) => {
        const chats = s.chats.filter((c) => c._id !== chatId);
        const newCache = { ...s._messageCache };
        delete newCache[chatId];
        return {
          chats,
          activeChatId: s.activeChatId === chatId ? null : s.activeChatId,
          messages: s.activeChatId === chatId ? [] : s.messages,
          _messageCache: newCache,
        };
      });
    } catch (err) {
      console.error('deleteChat error:', err);
    }
  },

  // ────────────────────────────────
  // Send message (SSE streaming)
  // ────────────────────────────────
  sendMessage: async (content) => {
    let chatId = get().activeChatId;

    // Auto-create chat if none active
    if (!chatId) {
      chatId = await get().createChat();
      if (!chatId) return;
    }

    const userMessage = {
      _id: `temp-user-${Date.now()}`,
      chatId,
      senderType: 'user',
      content,
      createdAt: new Date().toISOString(),
    };

    const assistantMessage = {
      _id: `temp-assistant-${Date.now()}`,
      chatId,
      senderType: 'assistant',
      content: '',
      createdAt: new Date().toISOString(),
      isStreaming: true,
    };

    set((s) => ({
      messages: [...s.messages, userMessage, assistantMessage],
      isStreaming: true,
    }));

    const { token } = get();
    if (!token) return;

    try {
      const res = await fetch(`${API_BASE}/chat`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ chatId, message: content }),
      });

      if (!res.ok) throw new Error('Stream request failed');

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const payload = line.slice(6).trim();
            if (!payload) continue;

            try {
              const data = JSON.parse(payload);
              if (data.token) {
                set((s) => {
                  const msgs = [...s.messages];
                  const last = msgs[msgs.length - 1];
                  if (last && last.senderType === 'assistant') {
                    msgs[msgs.length - 1] = {
                      ...last,
                      content: last.content + data.token,
                    };
                  }
                  return { messages: msgs };
                });
              }
            } catch {
              // skip malformed JSON
            }
          } else if (line.startsWith('event: done')) {
            // Stream complete
          } else if (line.startsWith('event: error')) {
            console.error('SSE error event');
          }
        }
      }

      // Mark streaming done
      set((s) => {
        const msgs = s.messages.map((m) =>
          m.isStreaming ? { ...m, isStreaming: false } : m
        );
        // Cache messages
        const cache = { ...s._messageCache, [chatId]: msgs };
        return { messages: msgs, isStreaming: false, _messageCache: cache };
      });

      // Auto-rename chat if it's the first message
      const chat = get().chats.find((c) => c._id === chatId);
      if (chat && chat.title === 'New Chat') {
        const title =
          content.length > 40 ? content.slice(0, 37) + '...' : content;
        get().renameChat(chatId, title);
      }
    } catch (err) {
      console.error('sendMessage error:', err);
      set((s) => {
        const msgs = s.messages.filter((m) => !m.isStreaming);
        return { messages: msgs, isStreaming: false };
      });
    }
  },

  // ── Internal message cache (keyed by chatId) ──
  _messageCache: {},
}));

export default useChatStore;
