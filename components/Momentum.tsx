import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

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
    <section ref={sectionRef} className="py-20 md:py-32 bg-black relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-brand-orange opacity-[0.05] blur-[150px] rounded-full pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-purple opacity-[0.05] blur-[120px] rounded-full pointer-events-none mix-blend-screen" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Column */}
          <div className="relative">
             <div className="inline-flex items-center gap-2 mb-6">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-orange"></span>
                </span>
               <span className="text-[10px] md:text-xs font-bold tracking-widest text-gray-400 uppercase">GLOBAL RESULTS</span>
             </div>
             
             <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-[1.05] mb-8 tracking-tight">
              We don't offer services.<br />
              We <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-purple">scale revenue.</span>
             </h2>

             <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-lg">
               In a crowded eCommerce landscape, "beautiful design" is just the baseline. We focus on the bottom line. By unifying high-converting <strong className="text-white font-semibold">Klaviyo flows</strong> with precision <strong className="text-white font-semibold">SMS marketing automation</strong>, we create a compounding growth loop. This turns your existing customer base into your store’s most profitable asset.
             </p>

             <div className="flex flex-wrap gap-4">
               <Link to="/contact" className="px-6 py-3 md:px-8 md:py-4 rounded-full bg-gradient-to-r from-brand-orange to-brand-purple text-white font-bold text-base md:text-lg hover:scale-105 transition-all flex items-center gap-2 shadow-[0_0_30px_rgba(255,107,74,0.3)]">
                 Get My Growth Projections ↗
               </Link>
             </div>
          </div>

          {/* Right Column: Stats Card */}
          <div className="relative">
             {/* Card Backdrop */}
             <div className="absolute inset-0 bg-white/5 blur-xl rounded-[40px] transform rotate-3 scale-95 opacity-50"></div>
             
             <div className="bg-[#1a1a1a] border border-white/10 rounded-[30px] md:rounded-[40px] p-8 md:p-10 relative overflow-hidden shadow-2xl flex flex-col justify-between">
                {/* Noise Texture */}
                <div className="absolute inset-0 opacity-40 pointer-events-none mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.5'/%3E%3C/svg%3E")` }}></div>

                <div className="relative z-10 flex flex-col h-full justify-end">

                   <div className="text-center">
                     <div className={`text-6xl font-bold text-brand-orange drop-shadow-[0_0_15px_rgba(255,107,74,0.6)] transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                       172%
                     </div>
                   </div>
                   
                   {/* Chart Container */}
                   <div className="relative mb-6 mt-6 px-2 md:px-4">
                       {/* Grid Area */}
                       <div className="h-[260px] relative w-full">
                           {/* Grid Lines */}
                           <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
                                <div className="w-full h-px bg-white border-t border-dashed border-white/50"></div>
                                <div className="w-full h-px bg-white border-t border-dashed border-white/50"></div>
                                <div className="w-full h-px bg-white border-t border-dashed border-white/50"></div>
                                <div className="w-full h-px bg-white border-t border-dashed border-white/50"></div>
                           </div>

                           {/* Bars Wrapper */}
                           <div className="absolute inset-0 flex items-end justify-center gap-16 md:gap-32">
                                
                                {/* Bar 1: Other Agencies */}
                                <div className="flex flex-col items-center justify-end w-32 group">
                                     <div 
                                        className="w-24 md:w-28 bg-white/10 rounded-t-sm relative transition-all duration-[2000ms] ease-out origin-bottom group-hover:bg-white/20" 
                                        style={{ height: isVisible ? '65px' : '0px' }}
                                     ></div>
                                </div>

                                {/* Bar 2: Infobytes */}
                                <div className="flex flex-col items-center justify-end w-40">
                                     <div 
                                        className="w-32 md:w-36 bg-gradient-to-t from-brand-orange to-brand-purple rounded-t-xl relative shadow-[0_0_40px_rgba(255,107,74,0.4)] transition-all duration-[2000ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] delay-200 origin-bottom" 
                                        style={{ height: isVisible ? '190px' : '0px' }}
                                     >
                                        <div className="absolute inset-0 bg-white/20 animate-pulse mix-blend-overlay"></div>
                                     </div>
                                </div>

                           </div>
                       </div>
                       
                       {/* Labels */}
                       <div className="flex justify-center gap-16 md:gap-32 mt-6">
                           <div className="w-32 text-center">
                             <div className="text-sm text-gray-400 font-medium leading-tight">Standard Agencies<br/>(Focus on Volume)</div>
                           </div>
                           <div className="w-40 text-center">
                             <div className="text-sm md:text-base text-white font-bold tracking-tight">INFOBYTES<br/>(Focus on Retention)</div>
                           </div>
                       </div>
                   </div>

                   {/* Footer Text */}
                   <p className="text-sm text-gray-400 leading-relaxed text-center border-t border-white/10 pt-6">
                     Brands that integrate our lifecycle marketing and email automation systems see an average 172% increase in Retention Revenue within the first 90 days of partnership.
                   </p>

                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};