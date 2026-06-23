import { motion } from 'framer-motion';
import { User, Activity, Settings, Shield, Clock, Zap } from 'lucide-react';
import useChatStore from '../store/useChatStore';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const { user, logout, chats } = useChatStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const totalConversations = chats.length;
  const totalMessages = chats.reduce((acc, chat) => acc + (chat.totalMessages || 0), 0);
  
  // Calculate activity for the last 7 days
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  
  const chatsThisWeek = chats.filter(c => new Date(c.createdAt) >= oneWeekAgo).length;
  const msgThisWeek = chats
    .filter(c => new Date(c.updatedAt) >= oneWeekAgo)
    .reduce((acc, chat) => acc + (chat.totalMessages || 0), 0);

  const recentActivity = chats.slice(0, 3).map(chat => {
    const isToday = new Date(chat.updatedAt).toDateString() === new Date().toDateString();
    return {
      title: `Chatted: ${chat.title}`,
      time: isToday ? 'Today' : new Date(chat.updatedAt).toLocaleDateString()
    };
  });

  if (recentActivity.length === 0) {
    recentActivity.push({ title: 'Joined Venam AI', time: 'Recently' });
  }

  return (
    <div className="w-full p-6 md:p-10 pb-20">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Profile & Analytics</h1>
            <p className="text-dark-400 mt-1">Manage your account and view usage statistics.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Profile Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-1 glass-card p-6 rounded-3xl space-y-6"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-brand-500 to-secondary-500 flex items-center justify-center shadow-lg mb-4">
                <User size={40} className="text-white" />
              </div>
              <h2 className="text-xl font-semibold">{user?.name || 'Venam User'}</h2>
              <p className="text-dark-400 text-sm">{user?.email || 'user@venam-ai.com'}</p>
              
              <div className="mt-4 px-3 py-1 rounded-full bg-brand-500/20 text-brand-400 text-xs font-medium border border-brand-500/30">
                Early Access Member
              </div>
            </div>

            <div className="border-t border-white/5 pt-6 space-y-4">
              <button 
                onClick={() => navigate('/settings')}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-colors text-sm font-medium"
              >
                <Settings size={18} className="text-dark-400" />
                Account Settings
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-colors text-sm font-medium cursor-not-allowed opacity-50" title="Coming soon">
                <Shield size={18} className="text-dark-400" />
                Security & Privacy
              </button>
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/10 text-red-500 transition-colors text-sm font-medium"
              >
                <Activity size={18} />
                Sign Out
              </button>
            </div>
          </motion.div>

          {/* Analytics & Activity */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="glass-card p-6 rounded-3xl"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-brand-500/20 text-brand-400">
                    <MessageSquareIcon size={20} />
                  </div>
                  <h3 className="font-medium">Total Conversations</h3>
                </div>
                <p className="text-4xl font-bold">{totalConversations}</p>
                <p className={`text-sm mt-2 ${chatsThisWeek > 0 ? 'text-green-400' : 'text-dark-400'}`}>
                  {chatsThisWeek > 0 ? `+${chatsThisWeek} this week` : 'No new chats this week'}
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="glass-card p-6 rounded-3xl"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-secondary-500/20 text-secondary-400">
                    <Zap size={20} />
                  </div>
                  <h3 className="font-medium">Total Messages Sent</h3>
                </div>
                <p className="text-4xl font-bold">{totalMessages}</p>
                <p className={`text-sm mt-2 ${msgThisWeek > 0 ? 'text-green-400' : 'text-dark-400'}`}>
                  {msgThisWeek > 0 ? `+${msgThisWeek} this week` : 'Across all chats'}
                </p>
              </motion.div>
            </div>

            {/* Recent Activity */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card p-6 rounded-3xl"
            >
              <h3 className="text-lg font-semibold mb-6">Recent Activity</h3>
              <div className="space-y-6">
                {recentActivity.map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-full bg-dark-100 dark:bg-dark-800 flex items-center justify-center border border-dark-200 dark:border-white/5">
                      <Clock size={14} className="text-dark-400" />
                    </div>
                    <div>
                      <p className="font-medium text-dark-100 dark:text-white">{item.title}</p>
                      <p className="text-sm text-dark-500 mt-1">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
}

function MessageSquareIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}
