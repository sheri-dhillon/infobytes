import React from 'react';
import { MousePointer2, Plus } from 'lucide-react';

export const AboutPage: React.FC = () => {
  // Team grid configuration to match the masonry layout exactly
  // Row 1: Ali-Dah, Schuith, Ben
  // Row 2 & 3: Ollie (Large Left), Eightball (Right Top), Galloc (Right Bottom)
  // Row 4: HiskMz, Launch
  const team = [
    { 
      name: "Ali-Dah", 
      role: "Design", 
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&h=500&fit=crop&q=80", 
      span: "col-span-1" 
    },
    { 
      name: "Schuith", 
      role: "Tech", 
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&h=500&fit=crop&q=80", 
      span: "col-span-1" 
    },
    { 
      name: "Ben", 
      role: "Strategy", 
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop&q=80", 
      span: "col-span-1" 
    },
    { 
      name: "Ollie", 
      role: "Creative Director", 
      image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=800&h=800&fit=crop&q=80", 
      span: "col-span-2 row-span-2" 
    },
    { 
      name: "Eightball", 
      role: "Developer", 
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&h=500&fit=crop&q=80", 
      span: "col-span-1" 
    },
    { 
      name: "Galloc", 
      role: "Product", 
      image: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=500&h=500&fit=crop&q=80", 
      span: "col-span-1" 
    },
    { 
      name: "HiskMz", 
      role: "Marketing", 
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&h=500&fit=crop&q=80", 
      span: "col-span-1" 
    },
    { 
      name: "Launch", 
      role: "Operations", 
      image: "https://images.unsplash.com/photo-1520341280432-4749d4d7bcf9?w=500&h=500&fit=crop&q=80", 
      span: "col-span-1" 
    },
  ];

  return (
    <div className="bg-black min-h-screen pt-32 pb-20 relative overflow-hidden flex flex-col justify-center">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-purple/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-orange/5 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />

       <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">
          {/* Left Content */}
          <div className="flex flex-col items-start lg:pr-12">
             <div className="inline-flex items-center gap-2 border border-white/10 rounded-full px-4 py-1.5 mb-8 bg-white/5 backdrop-blur-sm">
                <Plus className="w-3 h-3 text-brand-orange" />
                <span className="text-xs font-bold tracking-wide text-gray-300 uppercase">Design studio for AI, SaaS & tech startups</span>
             </div>
             
             <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
                Good design <br />
                makes life better.
             </h1>
             
             <p className="text-gray-400 text-lg md:text-xl max-w-lg mb-12 leading-relaxed">
                We design delightful experiences that make life simpler and more enjoyable.
             </p>
             
             <div className="flex flex-col sm:flex-row items-center gap-8">
                <a 
                  href="https://calendly.com/shehryar-infobytes/30min" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="px-8 py-4 bg-white text-black rounded-full font-bold text-base hover:bg-gray-200 transition-transform hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                >
                   Book 1:1 Meeting
                </a>
                
                <div className="flex items-center gap-3 text-white group cursor-pointer">
                   <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-brand-orange transition-colors border border-white/5">
                      <MousePointer2 className="w-5 h-5" />
                   </div>
                   <span className="font-medium text-sm md:text-base">Got an idea? Let's shape it.</span>
                </div>
             </div>
          </div>

          {/* Right Grid */}
          <div className="grid grid-cols-3 gap-4 auto-rows-min">
             {team.map((member, idx) => (
                <div 
                   key={idx} 
                   className={`relative group overflow-hidden rounded-3xl border border-white/10 bg-[#1a1a1a] ${member.span} ${member.span.includes('row-span-2') ? 'aspect-square' : 'aspect-square'}`}
                >
                   <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0 opacity-80 group-hover:opacity-100" 
                   />
                   
                   {/* Overlay Tag - Always visible */}
                   <div className="absolute bottom-3 left-3 px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-full border border-white/10 flex items-center gap-2 transition-transform duration-300 group-hover:scale-105">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-orange"></div>
                      <span className="text-[10px] sm:text-xs font-bold text-white tracking-wide">{member.name}</span>
                   </div>
                </div>
             ))}
          </div>
       </div>
    </div>
  );
};