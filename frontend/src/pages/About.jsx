import { motion } from 'framer-motion';
import { Target, Users, Zap, Globe, Github, Twitter, Linkedin } from 'lucide-react';

export default function About() {
  const stats = [
    { label: 'Active Users', value: '10M+' },
    { label: 'Lines of Code Generated', value: '5B+' },
    { label: 'Countries Supported', value: '150+' },
    { label: 'Average Response Time', value: '< 200ms' },
  ];

  const timeline = [
    { year: '2023', title: 'The Inception', desc: 'Venam AI was founded with a mission to democratize advanced intelligence.' },
    { year: '2024', title: 'Series A & Scaling', desc: 'Raised $50M to expand our infrastructure and research teams.' },
    { year: '2025', title: 'Venam-Pro Release', desc: 'Launched our flagship model achieving state-of-the-art reasoning capabilities.' },
    { year: '2026', title: 'Global Platform', desc: 'Reached 10 million active developers worldwide.' },
  ];

  return (
    <div className="w-full overflow-x-hidden selection:bg-brand-500/30 pt-10 md:pt-20">
      
      {/* Background Glow */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-brand-600/10 blur-[150px] animate-pulse-glow" />
      </div>

      <div className="max-w-5xl mx-auto px-6 pb-32 relative z-10 space-y-32">
        
        {/* Header Section */}
        <section className="text-center space-y-6 pt-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              Building the <span className="text-gradient">future</span> of intelligence.
            </h1>
            <p className="text-xl text-dark-400 mt-6 max-w-2xl mx-auto">
              We believe that artificial intelligence should empower human creativity, not replace it. Venam AI is built for builders.
            </p>
          </motion.div>
        </section>

        {/* Stats Grid */}
        <section>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {stats.map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6 glass-card rounded-3xl"
              >
                <div className="text-3xl md:text-4xl font-bold text-dark-900 dark:text-white mb-2">{stat.value}</div>
                <div className="text-sm text-dark-500 dark:text-dark-400 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="w-12 h-12 rounded-2xl bg-brand-500/20 text-brand-400 flex items-center justify-center">
              <Target size={24} />
            </div>
            <h2 className="text-3xl font-bold">Our Mission</h2>
            <p className="text-dark-400 leading-relaxed text-lg">
              To provide developers, researchers, and creators with frictionless access to the world's most capable AI models. We handle the complexity of machine learning infrastructure so you can focus on shipping great products.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="w-12 h-12 rounded-2xl bg-secondary-500/20 text-secondary-400 flex items-center justify-center">
              <Globe size={24} />
            </div>
            <h2 className="text-3xl font-bold">Our Vision</h2>
            <p className="text-dark-400 leading-relaxed text-lg">
              A world where every individual has a personalized, intelligent companion that accelerates their ability to learn, solve problems, and create value.
            </p>
          </motion.div>
        </section>

        {/* Timeline */}
        <section>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">The Journey</h2>
          </div>
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-brand-500/50 via-secondary-500/50 to-transparent transform md:-translate-x-1/2" />
            
            <div className="space-y-12">
              {timeline.map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5 }}
                  className={`relative flex items-center ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-[24px] md:left-1/2 w-2 h-2 rounded-full bg-brand-400 ring-4 ring-white dark:ring-dark-950 transform -translate-x-1/2" />
                  
                  {/* Content */}
                  <div className={`pl-20 md:pl-0 w-full md:w-1/2 ${i % 2 === 0 ? 'md:pl-12' : 'md:pr-12 md:text-right'}`}>
                    <div className="glass-card p-6 rounded-3xl inline-block w-full">
                      <span className="text-brand-400 font-mono text-sm font-bold mb-2 block">{item.year}</span>
                      <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                      <p className="text-dark-400 text-sm">{item.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer/CTA */}
        <section className="text-center pt-12 border-t border-dark-200 dark:border-white/5">
          <h2 className="text-3xl font-bold mb-8">Join the Team</h2>
          <p className="text-dark-400 max-w-2xl mx-auto mb-8">
            We are always looking for exceptional engineers, researchers, and designers to help us build the future.
          </p>
          <div className="flex items-center justify-center gap-6 text-dark-400">
            <a href="#" className="hover:text-dark-900 dark:hover:text-white transition-colors"><Github size={24} /></a>
            <a href="#" className="hover:text-brand-400 transition-colors"><Twitter size={24} /></a>
            <a href="#" className="hover:text-secondary-400 transition-colors"><Linkedin size={24} /></a>
          </div>
        </section>

      </div>
    </div>
  );
}
