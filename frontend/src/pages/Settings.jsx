import { motion } from 'framer-motion';
import { useState } from 'react';
import { Bell, Shield, Moon, Sun, Monitor, Key, Globe, Layout, ChevronRight } from 'lucide-react';
import useChatStore from '../store/useChatStore';
import { useNavigate } from 'react-router-dom';

function Toggle({ enabled, onChange }) {
  return (
    <button
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
        enabled ? 'bg-brand-500' : 'bg-dark-700'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );
}

export default function Settings() {
  const { theme, toggleTheme, logout, user } = useChatStore();
  const navigate = useNavigate();
  
  // Local state with localStorage persistence
  const [emailNotifs, setEmailNotifs] = useState(() => JSON.parse(localStorage.getItem('emailNotifs') ?? 'true'));
  const [pushNotifs, setPushNotifs] = useState(() => JSON.parse(localStorage.getItem('pushNotifs') ?? 'true'));
  const [dataSharing, setDataSharing] = useState(() => JSON.parse(localStorage.getItem('dataSharing') ?? 'false'));
  const [autoSave, setAutoSave] = useState(() => JSON.parse(localStorage.getItem('autoSave') ?? 'true'));
  const [languageModel, setLanguageModel] = useState(() => localStorage.getItem('languageModel') || 'Venam-Pro (Recommended)');

  const handleToggle = (key, value, setter) => {
    setter(value);
    localStorage.setItem(key, JSON.stringify(value));
  };

  const sections = [
    {
      title: 'Appearance',
      icon: Layout,
      description: 'Customize how Venam AI looks on your device.',
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Theme Preferences</p>
              <p className="text-sm text-dark-400">Select your preferred color theme</p>
            </div>
            <div className="flex p-1 rounded-xl bg-dark-100 dark:bg-dark-800 border border-dark-200 dark:border-white/5">
              <button 
                onClick={() => theme !== 'light' && toggleTheme()}
                className={`p-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors ${theme === 'light' ? 'bg-dark-700 shadow-sm text-white' : 'text-dark-400 hover:text-white'}`}
              >
                <Sun size={16} /> Light
              </button>
              <button 
                onClick={() => theme !== 'dark' && toggleTheme()}
                className={`p-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors ${theme === 'dark' ? 'bg-dark-700 shadow-sm text-white' : 'text-dark-400 hover:text-white'}`}
              >
                <Moon size={16} /> Dark
              </button>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Notifications',
      icon: Bell,
      description: 'Manage how and when you receive updates.',
      content: (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Email Notifications</p>
              <p className="text-sm text-dark-400">Receive product updates and weekly reports</p>
            </div>
            <Toggle enabled={emailNotifs} onChange={(val) => handleToggle('emailNotifs', val, setEmailNotifs)} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Push Notifications</p>
              <p className="text-sm text-dark-400">Get notified when long tasks complete</p>
            </div>
            <Toggle enabled={pushNotifs} onChange={(val) => handleToggle('pushNotifs', val, setPushNotifs)} />
          </div>
        </div>
      )
    },
    {
      title: 'Privacy & Security',
      icon: Shield,
      description: 'Control your data and account security.',
      content: (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Data Sharing</p>
              <p className="text-sm text-dark-400">Allow anonymous usage data to improve models</p>
            </div>
            <Toggle enabled={dataSharing} onChange={(val) => handleToggle('dataSharing', val, setDataSharing)} />
          </div>
          <div className="pt-4 border-t border-white/5">
            <button 
              onClick={() => navigate('/forgot-password', { state: { email: user?.email } })}
              className="flex items-center justify-between w-full group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-dark-100 dark:bg-dark-800 text-dark-500 dark:text-dark-300 group-hover:text-dark-900 dark:group-hover:text-white transition-colors">
                  <Key size={18} />
                </div>
                <div className="text-left">
                  <p className="font-medium group-hover:text-brand-400 transition-colors">Change Password</p>
                  <p className="text-sm text-dark-400">Update your account credentials</p>
                </div>
              </div>
              <ChevronRight size={18} className="text-dark-500 group-hover:text-brand-400 transition-colors" />
            </button>
          </div>
        </div>
      )
    },
    {
      title: 'Chat Preferences',
      icon: Monitor,
      description: 'Configure your conversation experience.',
      content: (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Auto-save History</p>
              <p className="text-sm text-dark-400">Automatically persist chat history</p>
            </div>
            <Toggle enabled={autoSave} onChange={(val) => handleToggle('autoSave', val, setAutoSave)} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Language Model</p>
              <p className="text-sm text-dark-400">Default AI model for new conversations</p>
            </div>
            <select 
              value={languageModel}
              onChange={(e) => {
                setLanguageModel(e.target.value);
                localStorage.setItem('languageModel', e.target.value);
              }}
              className="bg-white dark:bg-dark-800 border border-dark-200 dark:border-white/10 text-dark-900 dark:text-white text-sm rounded-lg focus:ring-brand-500 focus:border-brand-500 block p-2.5"
            >
              <option value="Venam-Pro (Recommended)">Venam-Pro (Recommended)</option>
              <option value="Venam-Fast">Venam-Fast</option>
              <option value="Venam-Vision">Venam-Vision</option>
            </select>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="w-full p-6 md:p-10 pb-20">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-dark-400 mt-1">Manage your Venam AI experience.</p>
        </div>

        <div className="space-y-6">
          {sections.map((section, idx) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card rounded-3xl overflow-hidden"
            >
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-dark-50 to-dark-100 dark:from-dark-700 dark:to-dark-800 shadow-inner border border-dark-200 dark:border-white/5">
                    <section.icon size={20} className="text-brand-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">{section.title}</h2>
                    <p className="text-sm text-dark-400">{section.description}</p>
                  </div>
                </div>
                
                <div className="pl-0 md:pl-[3.25rem]">
                  {section.content}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Danger Zone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 p-6 rounded-3xl border border-red-500/20 bg-red-500/5"
        >
          <h3 className="text-lg font-semibold text-red-500 mb-2">Danger Zone</h3>
          <p className="text-sm text-dark-400 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
          <button 
            onClick={() => {
              if (window.confirm("Are you absolutely sure you want to delete your account? This action cannot be undone.")) {
                alert("Account deletion scheduled. You will be logged out.");
                logout();
                navigate('/');
              }
            }}
            className="px-4 py-2 rounded-lg bg-red-500/10 text-red-500 font-medium hover:bg-red-500/20 transition-colors text-sm"
          >
            Delete Account
          </button>
        </motion.div>

      </div>
    </div>
  );
}
