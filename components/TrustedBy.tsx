import React from 'react';
import { Hexagon, Triangle, Circle, Square, Box, Layers, Command, Ghost, Zap, Activity } from 'lucide-react';

const logos = [
  { name: "Logoipsum", icon: Hexagon },
  { name: "Logoipsum", icon: Triangle },
  { name: "Logoipsum", icon: Circle },
  { name: "Logoipsum", icon: Square },
  { name: "Logoipsum", icon: Box },
  { name: "Logoipsum", icon: Layers },
  { name: "Logoipsum", icon: Command },
  { name: "Logoipsum", icon: Ghost },
  { name: "Logoipsum", icon: Zap },
  { name: "Logoipsum", icon: Activity },
];

export const TrustedBy: React.FC = () => {
  return (
    <section className="py-24 bg-black border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <h3 className="text-white font-medium text-lg md:text-xl tracking-wide">
          Trusted by 10,000+ founders & business owners.
        </h3>
      </div>
      
      <div className="flex flex-col gap-8 relative">
         {/* Fade masks for edges */}
         <div className="absolute inset-y-0 left-0 w-24 md:w-64 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
         <div className="absolute inset-y-0 right-0 w-24 md:w-64 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>

         {/* Row 1: Scrolling Left */}
         <div className="flex overflow-hidden">
           <div className="flex gap-6 animate-scroll-left min-w-full shrink-0 items-center">
             {[...logos, ...logos, ...logos, ...logos].map((logo, i) => (
               <div key={i} className="flex items-center gap-3 bg-[#111] border border-white/10 px-8 py-4 rounded-full min-w-[200px] justify-center hover:bg-white/10 hover:border-white/20 transition-all duration-300 group cursor-default">
                 <logo.icon className="w-6 h-6 text-white group-hover:text-brand-orange transition-colors duration-300" />
                 <span className="font-bold text-white tracking-tight text-lg">{logo.name}</span>
               </div>
             ))}
           </div>
         </div>
         
         {/* Row 2: Scrolling Right */}
          <div className="flex overflow-hidden">
           <div className="flex gap-6 animate-scroll-right min-w-full shrink-0 items-center">
             {[...logos, ...logos, ...logos, ...logos].reverse().map((logo, i) => (
               <div key={i} className="flex items-center gap-3 bg-[#111] border border-white/10 px-8 py-4 rounded-full min-w-[200px] justify-center hover:bg-white/10 hover:border-white/20 transition-all duration-300 group cursor-default">
                 <logo.icon className="w-6 h-6 text-white group-hover:text-brand-purple transition-colors duration-300" />
                 <span className="font-bold text-white tracking-tight text-lg">{logo.name}</span>
               </div>
             ))}
           </div>
         </div>
      </div>
    </section>
  );
};