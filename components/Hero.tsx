
import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CONFIG = {
  pills: ['Email Marketing', 'SMS Automation', 'Klaviyo Experts', 'Omnisend Partners'],
  headline_part1: 'The Revenue-First',
  headline_part2: 'Email & SMS Agency for eCommerce.',
  cta_text: 'Audit My Retention Potential',
    cta_link: '/contact'
};

export const Hero: React.FC = () => {
  return (
    <section className="relative h-[100dvh] min-h-[600px] w-full flex flex-col bg-brand-dark overflow-hidden">
      
      {/* Background Fluid Gradient (Right Side) */}
      <div className="absolute top-[-10%] right-[-10%] w-[90vw] md:w-[60vw] h-[60vh] md:h-[100vh] bg-gradient-to-bl from-blue-500 via-purple-600 to-transparent opacity-40 blur-[80px] md:blur-[120px] rounded-full pointer-events-none mix-blend-screen animate-pulse duration-[5000ms]" />
      
      {/* Secondary Glow for depth */}
      <div className="absolute bottom-0 left-0 w-[60vw] md:w-[40vw] h-[60vw] md:h-[40vw] bg-purple-900/20 blur-[100px] md:blur-[150px] rounded-full pointer-events-none" />

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-8 flex flex-col flex-grow justify-center pb-10 md:pb-16 pt-28 md:pt-32">
        
        <div className="flex flex-col">

          {/* Floating Pills */}
          <div className="flex flex-wrap gap-2 md:gap-3 mb-6 md:mb-10 animate-slide-up-fade justify-center">
             {CONFIG.pills.map((tag, i) => (
               tag ? (
                   <span key={i} className="px-3 py-1.5 md:px-4 md:py-1.5 rounded-full bg-white/5 border border-white/5 text-[11px] md:text-xs font-medium text-gray-300 backdrop-blur-sm hover:bg-white/10 transition-colors cursor-default">
                     {tag}
                   </span>
               ) : null
             ))}
          </div>

          {/* Main Typography */}
          <div className="w-full max-w-[56rem] lg:max-w-[62rem] mx-auto relative z-20 text-center">
            <h1 className="text-[clamp(2.1rem,4vw,4.8rem)] leading-[0.95] font-serif italic text-white mb-3 animate-slide-up-fade" style={{ animationDelay: '200ms' }}>
              {CONFIG.headline_part1}
            </h1>
            {CONFIG.headline_part2 ? (
              <h2 className="text-[clamp(3.1rem,6.8vw,6.9rem)] leading-[0.86] md:leading-[0.84] font-black tracking-tighter text-white mix-blend-overlay opacity-90 animate-slide-up-fade" style={{ animationDelay: '400ms' }}>
                {CONFIG.headline_part2}
              </h2>
            ) : null}
          </div>

          {/* Main CTA Button */}
          <div className="w-full flex justify-center mt-8 md:mt-10 relative z-30 animate-fade-in" style={{ animationDelay: '600ms' }}>
            <Link
              to={CONFIG.cta_link}
              className="group relative px-5 py-2.5 md:px-7 md:py-3.5 bg-gradient-to-r from-brand-orange to-brand-purple text-white rounded-full flex items-center gap-3 md:gap-4 transition-all hover:scale-105 shadow-[0_0_30px_rgba(255,107,74,0.3)] hover:shadow-[0_0_40px_rgba(185,109,243,0.4)]"
            >
              <span className="font-bold text-sm md:text-base">{CONFIG.cta_text}</span>
              <div className="w-6 h-6 md:w-8 md:h-8 bg-white rounded-full flex items-center justify-center transition-transform group-hover:rotate-45">
                <ArrowUpRight className="w-3 h-3 md:w-4 md:h-4 text-black" />
              </div>
            </Link>
          </div>
        
        </div>

      </div>
    </section>
  );
};
