import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen w-full flex flex-col justify-center bg-brand-dark overflow-hidden pt-32 pb-12">
      
      {/* Background Fluid Gradient (Right Side) */}
      <div className="absolute top-[-10%] right-[-10%] w-[90vw] md:w-[60vw] h-[100vh] bg-gradient-to-bl from-blue-500 via-purple-600 to-transparent opacity-40 blur-[120px] rounded-full pointer-events-none mix-blend-screen animate-pulse duration-[5000ms]" />
      
      {/* Secondary Glow for depth */}
      <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-purple-900/20 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-8 flex flex-col h-full justify-center">
        
        {/* Floating Tags */}
        <div className="flex flex-wrap gap-3 mb-8 md:mb-12 animate-slide-up-fade">
           {['Branding', 'UI/UX Design', 'Strategy', 'Development'].map((tag, i) => (
             <span key={i} className="px-5 py-2 rounded-full bg-white/5 border border-white/5 text-sm font-medium text-gray-300 backdrop-blur-sm hover:bg-white/10 transition-colors cursor-default">
               {tag}
             </span>
           ))}
        </div>

        {/* Main Typography */}
        <div className="flex flex-col">
          <h1 className="text-6xl md:text-8xl lg:text-[7rem] leading-[0.9] font-serif italic text-white mb-2 md:ml-4 animate-slide-up-fade" style={{ animationDelay: '200ms' }}>
             Creative design
          </h1>
          <h2 className="text-[18vw] md:text-[14rem] leading-[0.75] font-black tracking-tighter text-white uppercase mix-blend-overlay opacity-90 animate-slide-up-fade" style={{ animationDelay: '400ms' }}>
             STRATEGY
          </h2>
        </div>

        {/* Floating CTA Button - Positioned relative to typography */}
        <div className="flex justify-end md:mr-24 mt-12 md:-mt-16 relative z-20 animate-fade-in" style={{ animationDelay: '600ms' }}>
           <button className="group relative px-8 py-4 bg-[#1a1a1a] hover:bg-[#252525] text-white rounded-full flex items-center gap-4 transition-all hover:scale-105 border border-white/10 shadow-2xl shadow-purple-900/20">
              <span className="font-bold text-lg">Let's Talk</span>
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center transition-transform group-hover:rotate-45">
                 <ArrowUpRight className="w-4 h-4 text-black" />
              </div>
           </button>
        </div>

      </div>
    </section>
  );
};