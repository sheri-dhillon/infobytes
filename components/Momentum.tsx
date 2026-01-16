import React, { useEffect, useState, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';

export const Momentum: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 bg-black relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-brand-orange opacity-[0.05] blur-[150px] rounded-full pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-purple opacity-[0.05] blur-[120px] rounded-full pointer-events-none mix-blend-screen" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          
          {/* Left Column */}
          <div className="relative">
             <div className="inline-flex items-center gap-2 mb-6">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-orange"></span>
                </span>
                <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">Global Result</span>
             </div>
             
             <h2 className="text-5xl md:text-7xl font-semibold text-white leading-[1.05] mb-8 tracking-tight">
               We don't offer <span className="text-gray-600">services.</span><br />
               We offer <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-brand-text">momentum.</span>
             </h2>

             <div className="flex flex-wrap gap-4">
               <button className="px-8 py-4 rounded-full bg-brand-orange text-white font-bold text-lg hover:bg-[#e05e40] transition-all hover:scale-105 flex items-center gap-2 shadow-[0_0_30px_rgba(255,107,74,0.3)]">
                 Let's Talk <ArrowUpRight className="w-5 h-5" />
               </button>
             </div>
          </div>

          {/* Right Column: Stats Card */}
          <div className="relative">
             {/* Card Backdrop */}
             <div className="absolute inset-0 bg-white/5 blur-xl rounded-[40px] transform rotate-3 scale-95 opacity-50"></div>
             
             <div className="bg-[#1a1a1a] border border-white/10 rounded-[40px] p-8 md:p-12 relative overflow-hidden shadow-2xl">
                {/* Noise Texture - Enhanced opacity for visibility */}
                <div className="absolute inset-0 opacity-40 pointer-events-none mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.5'/%3E%3C/svg%3E")` }}></div>

                <div className="relative z-10 flex flex-col gap-10">
                   
                   {/* Competitor Bar - Made more visible */}
                   <div className="group">
                      <div className="flex justify-between items-end mb-3">
                         <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">Other Agencies</span>
                         <span className="text-2xl font-bold text-gray-400 group-hover:text-white transition-colors">56%</span>
                      </div>
                      <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden">
                         <div 
                           className="h-full bg-gray-500 rounded-full transition-all duration-[1500ms] ease-out group-hover:bg-gray-400"
                           style={{ width: isVisible ? '30%' : '0%' }}
                         ></div>
                      </div>
                      <p className="text-xs text-gray-400 mt-2 group-hover:text-gray-300 transition-colors">Average increase in conversion within 90 days.</p>
                   </div>

                   {/* Hero Bar */}
                   <div className="group">
                      <div className="flex justify-between items-end mb-3">
                         <span className="text-xl font-bold text-white">Infobytes</span>
                         <span className="text-6xl font-bold text-brand-orange tracking-tighter drop-shadow-[0_0_15px_rgba(255,107,74,0.2)]">
                            172%
                         </span>
                      </div>
                      <div className="h-6 w-full bg-white/5 rounded-full overflow-hidden p-1">
                         <div 
                           className="h-full bg-gradient-to-r from-brand-orange to-brand-purple rounded-full relative transition-all duration-[1500ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] shadow-[0_0_20px_rgba(255,107,74,0.4)]"
                           style={{ width: isVisible ? '100%' : '0%' }}
                         >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-full -translate-x-full animate-[shimmer_3s_infinite]"></div>
                         </div>
                      </div>
                      <p className="text-base text-gray-400 mt-5 leading-relaxed">
                         Clients who worked with us for full-cycle brand and campaign strategy saw an average 172% increase in conversion within 90 days.
                      </p>
                   </div>

                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};