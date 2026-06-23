import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-dark-950 text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full bg-brand-600/10 blur-[150px] animate-pulse-glow" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 text-center space-y-8 max-w-lg w-full"
      >
        <div className="w-24 h-24 mx-auto rounded-full bg-red-500/10 flex items-center justify-center shadow-[0_0_50px_-10px_rgba(239,68,68,0.2)]">
          <AlertCircle size={48} className="text-red-500" />
        </div>
        
        <div className="space-y-4">
          <h1 className="text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-dark-400">
            404
          </h1>
          <h2 className="text-2xl font-semibold">Page not found</h2>
          <p className="text-dark-400">
            The intelligent node you are looking for has been disconnected from the Venam network.
          </p>
        </div>

        <button 
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold hover:bg-dark-100 transition-colors"
        >
          <ArrowLeft size={18} />
          Return to Hub
        </button>
      </motion.div>
    </div>
  );
}
