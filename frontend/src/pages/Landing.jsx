import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  MessageSquare, Code, BookOpen, FileText, 
  Zap, Search, Layout, Lightbulb, CheckCircle2,
  ChevronRight, ArrowRight
} from 'lucide-react';

import Showcase from '../components/Showcase';
import Manifesto from '../components/Manifesto';
import ProtocolArchive from '../components/ProtocolArchive';

const FEATURES = [
  { icon: MessageSquare, title: 'AI Conversations', desc: 'Natural, context-aware dialogue that adapts to your needs.' },
  { icon: Code, title: 'Coding Assistant', desc: 'Write, debug, and optimize code across 50+ languages.' },
  { icon: BookOpen, title: 'Research Support', desc: 'Deep dive into complex topics with structured explanations.' },
  { icon: FileText, title: 'Document Understanding', desc: 'Summarize and analyze long-form text instantly.' },
  { icon: Zap, title: 'Instant Responses', desc: 'Lightning-fast generation powered by advanced models.' },
  { icon: Search, title: 'Smart Search', desc: 'Find exact information from your conversation history.' },
  { icon: Layout, title: 'Productivity Tools', desc: 'Generate emails, reports, and outlines in seconds.' },
  { icon: Lightbulb, title: 'Learning Companion', desc: 'Personalized tutoring across any subject matter.' },
];

export default function Landing() {
  const navigate = useNavigate();

  const scrollToShowcase = () => {
    document.getElementById('showcase')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-dark-950 text-white overflow-x-hidden selection:bg-brand-400/30">
      
      {/* Background Effects — warm gold glows */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-brand-500/15 blur-[150px] animate-pulse-glow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-brand-400/10 blur-[150px] animate-pulse-glow" style={{ animationDelay: '2s' }} />
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 glass border-b-0 border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center">
              <Zap size={18} className="text-dark-950" />
            </div>
            <span className="text-xl font-bold tracking-tight">Venam <span className="text-brand-400">AI</span></span>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/login')}
              className="text-sm font-medium text-dark-300 hover:text-white transition-colors"
            >
              Sign In
            </button>
            <button 
              onClick={() => navigate('/signup')}
              className="px-5 py-2.5 text-sm font-medium rounded-full bg-brand-400 text-dark-950 hover:bg-brand-300 transition-colors btn-magnetic"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-40 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm text-brand-400 font-medium border-brand-500/30"
          >
            <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
            Venam AI v2.0 is now live
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight leading-tight"
          >
            Intelligence meets <br className="hidden md:block" />
            <span className="font-display italic text-gradient">Precision.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-dark-400 max-w-2xl mx-auto"
          >
            Experience the future of human-machine collaboration. Automate tasks, write better code, and learn faster with an AI that understands your context.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <button 
              onClick={() => navigate('/signup')}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-brand-500 to-brand-400 hover:from-brand-400 hover:to-brand-300 text-dark-950 font-semibold flex items-center justify-center gap-2 transition-all hover:shadow-[0_0_40px_-5px_rgba(201,168,76,0.4)] btn-magnetic"
            >
              Start Chatting <ArrowRight size={18} />
            </button>
            <button 
              onClick={scrollToShowcase}
              className="w-full sm:w-auto px-8 py-4 rounded-full glass-card text-white font-medium hover:bg-white/5 transition-colors btn-magnetic"
            >
              View Showcase
            </button>
          </motion.div>
        </div>
      </section>

      {/* Interactive Showcase */}
      <Showcase />

      {/* The Manifesto */}
      <Manifesto />

      {/* Sticky Stacking Protocol Archive */}
      <ProtocolArchive />

      {/* CTA Footer */}
      <footer className="relative z-10 border-t border-brand-400/10 bg-dark-950">
        <div className="max-w-7xl mx-auto px-6 py-24 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Ready to experience</h2>
          <h2 className="text-4xl md:text-5xl font-display italic text-brand-400 mb-8">the future?</h2>
          <p className="text-xl text-dark-400 mb-10 max-w-2xl mx-auto">Join thousands of developers and professionals already using Venam AI.</p>
          <button 
            onClick={() => navigate('/signup')}
            className="px-8 py-4 rounded-full bg-brand-400 text-dark-950 font-semibold hover:bg-brand-300 transition-colors btn-magnetic hover:shadow-[0_0_40px_-5px_rgba(201,168,76,0.4)]"
          >
            Create Free Account
          </button>
        </div>
        <div className="border-t border-brand-400/10 py-8 px-6 text-center">
          <div className="flex items-center justify-center gap-2 text-sm text-dark-500">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="font-mono text-xs">System Operational</span>
            <span className="mx-4">·</span>
            <span>© 2026 Venam AI Platform</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
