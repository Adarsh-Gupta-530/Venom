import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

export default function Showcase() {
  return (
    <section id="showcase" className="relative z-10 py-32 px-6 bg-dark-900/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Interactive <span className="font-display italic text-brand-400">Functional</span> Artifacts</h2>
          <p className="text-dark-400 text-lg max-w-2xl mx-auto">Experience precision engineering in every interaction.</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Card 1: Diagnostic Shuffler */}
          <DiagnosticShuffler />

          {/* Card 2: Telemetry Typewriter */}
          <TelemetryTypewriter />

          {/* Card 3: Cursor Protocol Scheduler */}
          <CursorProtocolScheduler />
        </div>
      </div>
    </section>
  );
}

// -------------------------------------------------------------
// Card 1: Diagnostic Shuffler
// -------------------------------------------------------------
function DiagnosticShuffler() {
  const [cards, setCards] = useState([
    { id: 1, text: "Natural Language Dialogue", color: "bg-brand-500/20 text-brand-400" },
    { id: 2, text: "Context-Aware Memory", color: "bg-secondary-500/20 text-secondary-400" },
    { id: 3, text: "Adaptive Tone Matching", color: "bg-blue-500/20 text-blue-400" }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCards(prev => {
        const next = [...prev];
        const last = next.pop();
        next.unshift(last);
        return next;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-card rounded-[2rem] p-8 border border-white/5 shadow-2xl flex flex-col relative overflow-hidden h-[400px]">
      <h3 className="text-xl font-bold mb-2">Diagnostic Shuffler</h3>
      <p className="text-sm text-dark-400 mb-8 z-10">Continuous contextual alignment.</p>
      
      <div className="relative flex-1 flex items-center justify-center mt-10">
        <AnimatePresence>
          {cards.map((card, i) => {
            const isTop = i === 0;
            const isMiddle = i === 1;
            
            return (
              <motion.div
                key={card.id}
                layout
                initial={{ opacity: 0, y: -50, scale: 0.9 }}
                animate={{ 
                  opacity: isTop ? 1 : isMiddle ? 0.6 : 0.3,
                  y: i * 20,
                  scale: 1 - (i * 0.05),
                  zIndex: 10 - i
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`absolute w-full max-w-[240px] p-4 rounded-2xl border border-white/10 backdrop-blur-md ${isTop ? 'bg-dark-800' : 'bg-dark-900'} shadow-xl flex items-center gap-3`}
              >
                <div className={`w-3 h-3 rounded-full ${card.color.split(' ')[0]}`} />
                <span className={`text-sm font-medium ${isTop ? 'text-white' : 'text-dark-300'}`}>{card.text}</span>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// Card 2: Telemetry Typewriter
// -------------------------------------------------------------
function TelemetryTypewriter() {
  const [text, setText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const messages = [
    "> INITIALIZING CODE ASSISTANT...",
    "> SCANNING 50+ LANGUAGES...",
    "> DETECTING MEMORY LEAKS...",
    "> OPTIMIZING REACT RENDER CYCLE...",
    "> READY FOR INPUT."
  ];

  useEffect(() => {
    let timeout;
    const currentMessage = messages[currentIndex];
    
    if (text.length < currentMessage.length) {
      timeout = setTimeout(() => {
        setText(currentMessage.slice(0, text.length + 1));
      }, 50); // Type speed
    } else {
      timeout = setTimeout(() => {
        setText('');
        setCurrentIndex((prev) => (prev + 1) % messages.length);
      }, 2000); // Wait before next message
    }

    return () => clearTimeout(timeout);
  }, [text, currentIndex]);

  return (
    <div className="glass-card rounded-[2rem] p-8 border border-white/5 shadow-2xl flex flex-col h-[400px]">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xl font-bold">Telemetry Typewriter</h3>
        <div className="flex items-center gap-2 px-2 py-1 rounded-full bg-brand-500/10">
          <div className="w-2 h-2 rounded-full bg-brand-400 animate-pulse" />
          <span className="text-[10px] uppercase font-bold text-brand-400 tracking-wider">Live Feed</span>
        </div>
      </div>
      <p className="text-sm text-dark-400 mb-8">Real-time deep analysis logs.</p>
      
      <div className="flex-1 bg-dark-950 rounded-xl p-4 font-mono text-sm border border-dark-800 overflow-hidden relative group">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none" />
        <p className="text-brand-400">
          {text}
          <span className="inline-block w-2 h-4 bg-brand-400 ml-1 animate-pulse" />
        </p>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// Card 3: Cursor Protocol Scheduler
// -------------------------------------------------------------
function CursorProtocolScheduler() {
  const containerRef = useRef(null);
  const cursorRef = useRef(null);
  const saveBtnRef = useRef(null);
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const [activeDay, setActiveDay] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create a master timeline that repeats
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
      
      const targetDayIndex = 3; // Wednesday
      
      // Reset state at start of timeline
      tl.call(() => setActiveDay(null));
      
      // 1. Cursor enters from bottom right
      tl.fromTo(cursorRef.current, 
        { x: 250, y: 250, opacity: 0 },
        { x: 120, y: 150, opacity: 1, duration: 1, ease: "power3.out" }
      );
      
      // 2. Cursor moves to Wednesday cell (index 3)
      tl.to(cursorRef.current, {
        x: 35 + (targetDayIndex * 36), // approx calculation
        y: 45,
        duration: 1,
        ease: "power2.inOut"
      });
      
      // 3. Cursor clicks
      tl.to(cursorRef.current, { scale: 0.8, duration: 0.1 });
      tl.call(() => setActiveDay(targetDayIndex));
      tl.to(cursorRef.current, { scale: 1, duration: 0.2 });
      
      // 4. Cursor moves to Save button
      tl.to(cursorRef.current, {
        x: 100,
        y: 130,
        duration: 0.8,
        ease: "power2.inOut",
        delay: 0.5
      });
      
      // 5. Click Save
      tl.to(cursorRef.current, { scale: 0.8, duration: 0.1 });
      tl.to(saveBtnRef.current, { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1 }, "<");
      tl.to(cursorRef.current, { scale: 1, duration: 0.2 });
      
      // 6. Cursor exits
      tl.to(cursorRef.current, {
        x: 250, y: 250, opacity: 0,
        duration: 0.8,
        ease: "power3.in"
      }, "+=0.5");
      
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <div className="glass-card rounded-[2rem] p-8 border border-white/5 shadow-2xl flex flex-col h-[400px]" ref={containerRef}>
      <h3 className="text-xl font-bold mb-2">Cursor Protocol Scheduler</h3>
      <p className="text-sm text-dark-400 mb-8">Automated workflow execution.</p>
      
      <div className="relative flex-1 bg-dark-950 rounded-xl p-6 border border-dark-800 overflow-hidden">
        {/* Weekly Grid */}
        <div className="flex justify-between mb-8 relative z-10">
          {days.map((day, i) => (
            <div 
              key={i}
              className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-colors duration-300 ${
                activeDay === i 
                  ? 'bg-brand-400 text-dark-950 shadow-[0_0_15px_rgba(201,168,76,0.5)]' 
                  : 'bg-dark-800 text-dark-400'
              }`}
            >
              {day}
            </div>
          ))}
        </div>
        
        {/* Save Button */}
        <div className="flex justify-center mt-12 relative z-10">
          <div 
            ref={saveBtnRef}
            className="px-6 py-2 bg-brand-500 text-white text-sm font-semibold rounded-lg shadow-lg"
          >
            Save Protocol
          </div>
        </div>
        
        {/* Animated Cursor */}
        <div 
          ref={cursorRef} 
          className="absolute top-0 left-0 z-50 pointer-events-none"
          style={{ width: '24px', height: '24px' }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.5 3.21V20.8C5.5 21.43 6.24 21.76 6.71 21.34L11.44 17.13C11.66 16.93 11.95 16.82 12.25 16.82H18.5C19.16 16.82 19.5 16.03 19.04 15.56L5.5 3.21Z" fill="white" stroke="black" strokeWidth="1.5" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  );
}
