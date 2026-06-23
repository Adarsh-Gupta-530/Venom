import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import MobileHeader from './components/MobileHeader';
import useChatStore from './store/useChatStore';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import VerifyCode from './pages/VerifyCode';
import ResetPassword from './pages/ResetPassword';

import Landing from './pages/Landing';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import About from './pages/About';
import NotFound from './pages/NotFound';

function ProtectedRoute({ children }) {
  const { user, token } = useChatStore();
  if (!user || !token) {
    return <Navigate to="/" replace />;
  }
  return children;
}

function DashboardLayout({ children }) {
  const { theme, setTheme, sidebarOpen, fetchChats, user } = useChatStore();

  useEffect(() => {
    const saved = localStorage.getItem('theme') || 'dark';
    setTheme(saved);
  }, [setTheme]);

  useEffect(() => {
    if (user) fetchChats();
  }, [fetchChats, user]);

  return (
    <div className={`flex h-dvh overflow-hidden transition-colors duration-200 ${theme === 'dark' ? 'bg-dark-950 text-white' : 'bg-dark-50 text-dark-900'}`}>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden backdrop-blur-sm"
          onClick={() => useChatStore.getState().setSidebarOpen(false)}
        />
      )}

      <aside
        className={`
          fixed lg:relative z-40 h-full w-72 shrink-0
          transition-transform duration-300 ease-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 lg:hidden'}
        `}
      >
        <Sidebar />
      </aside>

      <main className="flex-1 flex flex-col min-w-0 h-full overflow-y-auto relative">
        <MobileHeader />
        {children}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-code" element={<VerifyCode />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        
        {/* Protected Dashboard Routes */}
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <ChatWindow />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Profile />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Settings />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
