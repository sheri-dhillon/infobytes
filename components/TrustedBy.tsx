import React from 'react';
import { ShoppingBag, Store, Mail, MessageSquare, Code2, AppWindow, Layers, Smartphone, Database, FileText } from 'lucide-react';

const logos = [
  { name: "Shopify Partner", icon: ShoppingBag },
  { name: "WooCommerce", icon: Store },
  { name: "Omnisend", icon: Mail },
  { name: "Klaviyo", icon: MessageSquare },
  { name: "React JS", icon: Code2 },
  { name: "Vue JS", icon: AppWindow },
  { name: "Next JS", icon: Layers },
  { name: "App Store", icon: Smartphone },
  { name: "Laravel", icon: Database },
  { name: "WordPress", icon: FileText },
];

export const TrustedBy: React.FC = () => {
  return (
    <section className="py-24 bg-black border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <h3 className="text-white font-medium text-lg md:text-xl tracking-wide">
          Our Tech Stack & Partnerships
        </h3>
      </div>
      
      <div className="flex flex-col gap-6 relative">
         {/* Fade masks for edges */}
         <div className="absolute inset-y-0 left-0 w-24 md:w-64 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
         <div className="absolute inset-y-0 right-0 w-24 md:w-64 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>

         {/* Row 1: Scrolling Left */}
         <div className="flex overflow-hidden">
           <div className="flex gap-6 animate-scroll-left min-w-full shrink-0 items-center">
             {[...logos, ...logos, ...logos].map((logo, i) => (
               <div key={`l1-${i}`} className="flex items-center gap-3 bg-[#111] border border-white/10 px-6 py-3 md:px-8 md:py-4 rounded-full min-w-[200px] justify-center hover:bg-white/10 hover:border-white/20 transition-all duration-300 group cursor-default">
                 <logo.icon className="w-5 h-5 md:w-6 md:h-6 text-gray-400 group-hover:text-brand-orange transition-colors duration-300" />
                 <span className="font-bold text-gray-300 group-hover:text-white transition-colors duration-300 tracking-tight text-base md:text-lg">{logo.name}</span>
               </div>
             ))}
           </div>
         </div>

         {/* Row 2: Scrolling Right */}
         <div className="flex overflow-hidden">
           <div className="flex gap-6 animate-scroll-right min-w-full shrink-0 items-center">
             {[...logos, ...logos, ...logos].map((logo, i) => (
               <div key={`l2-${i}`} className="flex items-center gap-3 bg-[#111] border border-white/10 px-6 py-3 md:px-8 md:py-4 rounded-full min-w-[200px] justify-center hover:bg-white/10 hover:border-white/20 transition-all duration-300 group cursor-default">
                 <logo.icon className="w-5 h-5 md:w-6 md:h-6 text-gray-400 group-hover:text-brand-purple transition-colors duration-300" />
                 <span className="font-bold text-gray-300 group-hover:text-white transition-colors duration-300 tracking-tight text-base md:text-lg">{logo.name}</span>
               </div>
             ))}
           </div>
         </div>
      </div>
    </section>
  );
};