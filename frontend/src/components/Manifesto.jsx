import { motion } from 'framer-motion';

export default function Manifesto() {
  const statement1 = "Most generic AI focuses on: stochastic generation.";
  const statement2 = "We focus on: precision context.";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.2 }
    }
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section className="relative z-10 w-full min-h-[80vh] flex items-center justify-center bg-dark-950 px-6 py-32 overflow-hidden">
      {/* Background Texture / Parallax — dark marble */}
      <div 
        className="absolute inset-0 z-0 opacity-15 pointer-events-none mix-blend-overlay bg-cover bg-center"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?q=80&w=2070&auto=format&fit=crop")' }}
      />
      
      <div className="max-w-5xl mx-auto relative z-10 flex flex-col items-center text-center space-y-12">
        
        {/* First Statement */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-xl md:text-3xl text-dark-400 font-medium tracking-tight flex flex-wrap justify-center gap-2"
        >
          {statement1.split(' ').map((word, i) => (
            <motion.span key={i} variants={wordVariants} className="inline-block">
              {word}
            </motion.span>
          ))}
        </motion.div>

        {/* Second Statement */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-5xl md:text-7xl lg:text-8xl tracking-tighter flex flex-wrap justify-center gap-x-4 gap-y-2 leading-tight"
        >
          {statement2.split(' ').map((word, i) => {
            const isHighlight = word.includes("precision") || word.includes("context");
            return (
              <motion.span 
                key={i} 
                variants={wordVariants} 
                className={`inline-block font-bold ${isHighlight ? 'text-brand-400' : 'text-white'}`}
              >
                {word}
              </motion.span>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
