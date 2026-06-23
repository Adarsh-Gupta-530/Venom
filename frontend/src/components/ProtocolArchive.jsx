import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Layers, Activity, Database } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const PROTOCOLS = [
  {
    id: '01',
    title: 'Analyze & Map Context',
    desc: 'Deep indexing of your codebase, documents, and historical dialogue to form a complete knowledge graph.',
    icon: Database,
    color: 'text-brand-300'
  },
  {
    id: '02',
    title: 'Synthesize Solutions',
    desc: 'Multi-model reasoning architecture cross-references your request against optimal programming patterns.',
    icon: Layers,
    color: 'text-brand-400'
  },
  {
    id: '03',
    title: 'Execute Protocol',
    desc: 'Lightning-fast generation of verified, production-ready code and comprehensive research reports.',
    icon: Activity,
    color: 'text-secondary-400'
  }
];

export default function ProtocolArchive() {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current;
      if (cards.length === 0) return;

      // Pin the entire container
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: `+=${cards.length * 100}%`,
        pin: true,
        scrub: 1,
      });

      // Animate each card stacking
      cards.forEach((card, i) => {
        if (i === 0) return; // First card doesn't animate in

        gsap.fromTo(card,
          { y: "100%", opacity: 0, scale: 0.9 },
          {
            y: "0%",
            opacity: 1,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: `top+=${(i - 1) * 100}% top`,
              end: `top+=${i * 100}% top`,
              scrub: 1,
            }
          }
        );

        // Previous card scales down and fades
        gsap.to(cards[i - 1], {
          scale: 0.9,
          opacity: 0.3,
          filter: "blur(10px)",
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: `top+=${(i - 1) * 100}% top`,
            end: `top+=${i * 100}% top`,
            scrub: 1,
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative z-10 h-screen w-full bg-dark-950 overflow-hidden">
      
      {PROTOCOLS.map((protocol, i) => (
        <div 
          key={i}
          ref={el => cardsRef.current[i] = el}
          className="absolute inset-0 flex items-center justify-center p-6 w-full h-full"
          style={{ zIndex: i }}
        >
          {/* Card Surface */}
          <div className="relative w-full max-w-5xl h-[70vh] rounded-[3rem] bg-dark-900 border border-white/10 shadow-[0_30px_100px_-15px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col md:flex-row">
            
            {/* Visual Column */}
            <div className="w-full md:w-1/2 bg-dark-950/50 border-b md:border-b-0 md:border-r border-white/5 flex items-center justify-center relative overflow-hidden p-10">
               {/* Abstract graphics based on step */}
               <div className={`absolute w-[150%] h-[150%] opacity-20 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] ${i === 0 ? 'from-brand-400/30' : i === 1 ? 'from-brand-500/30' : 'from-brand-300/30'} to-transparent`} />
               
               <div className="relative z-10 glass p-8 rounded-3xl border border-brand-400/10">
                 <protocol.icon size={80} className={`${protocol.color} opacity-80`} strokeWidth={1} />
               </div>
            </div>

            {/* Content Column */}
            <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center">
              <span className={`text-sm font-mono font-bold tracking-widest ${protocol.color} mb-4 block`}>
                PHASE // {protocol.id}
              </span>
              <h3 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">{protocol.title}</h3>
              <p className="text-lg text-dark-400 leading-relaxed">
                {protocol.desc}
              </p>
            </div>

          </div>
        </div>
      ))}
    </section>
  );
}
