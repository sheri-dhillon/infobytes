import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[100dvh] w-full flex flex-col justify-center bg-brand-dark overflow-hidden pt-24 pb-12 md:pt-0 md:pb-0">
      
      {/* Background Fluid Gradient (Right Side) */}
      <div className="absolute top-[-10%] right-[-10%] w-[90vw] md:w-[60vw] h-[60vh] md:h-[100vh] bg-gradient-to-bl from-blue-500 via-purple-600 to-transparent opacity-40 blur-[80px] md:blur-[120px] rounded-full pointer-events-none mix-blend-screen animate-pulse duration-[5000ms]" />
      
      {/* Secondary Glow for depth */}
      <div className="absolute bottom-0 left-0 w-[60vw] md:w-[40vw] h-[60vw] md:h-[40vw] bg-purple-900/20 blur-[100px] md:blur-[150px] rounded-full pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-8 flex flex-col h-full justify-center">
        
        {/* Floating Tags */}
        <div className="flex flex-wrap gap-2 md:gap-3 mb-6 md:mb-10 animate-slide-up-fade justify-start">
           {['Marketing', 'UI/UX Design', 'Strategy', 'Development'].map((tag, i) => (
             <span key={i} className="px-3 py-1.5 md:px-4 md:py-1.5 rounded-full bg-white/5 border border-white/5 text-[11px] md:text-xs font-medium text-gray-300 backdrop-blur-sm hover:bg-white/10 transition-colors cursor-default">
               {tag}
             </span>
           ))}
        </div>

        {/* Main Typography */}
        <div className="flex flex-col">
          <h1 className="text-[2.75rem] sm:text-5xl md:text-6xl lg:text-[5.5rem] xl:text-[6.5rem] leading-[0.95] font-serif italic text-white mb-2 md:ml-4 animate-slide-up-fade" style={{ animationDelay: '200ms' }}>
             Design. Develop.
          </h1>
          <h2 className="text-[15vw] sm:text-[12vw] md:text-[9rem] lg:text-[10rem] xl:text-[12rem] leading-[0.85] md:leading-[0.8] font-black tracking-tighter text-white uppercase mix-blend-overlay opacity-90 animate-slide-up-fade" style={{ animationDelay: '400ms' }}>
             & SCALE.
          </h2>
        </div>

        {/* Floating CTA Button */}
        <div className="flex justify-start md:justify-end md:mr-0 lg:mr-24 mt-8 md:-mt-8 lg:-mt-16 relative z-20 animate-fade-in" style={{ animationDelay: '600ms' }}>
           <button className="group relative px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-brand-orange to-brand-purple text-white rounded-full flex items-center gap-3 md:gap-4 transition-all hover:scale-105 shadow-[0_0_30px_rgba(255,107,74,0.3)] hover:shadow-[0_0_40px_rgba(185,109,243,0.4)]">
              <span className="font-bold text-sm md:text-base lg:text-lg">Let's Talk</span>
              <div className="w-6 h-6 md:w-8 md:h-8 bg-white rounded-full flex items-center justify-center transition-transform group-hover:rotate-45">
                 <ArrowUpRight className="w-3 h-3 md:w-4 md:h-4 text-black" />
              </div>
           </button>
        </div>

      </div>
    </section>
  );
};