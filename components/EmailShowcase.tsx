
import React from 'react';

const STATIC_EMAILS = [
  { url: "https://cdn.dribbble.com/users/2364329/screenshots/15697240/media/790b9f029323382760775d7963d09a47.png", alt: "Fashion Newsletter" },
  { url: "https://cdn.dribbble.com/users/3532588/screenshots/19222383/media/4c06f3630f9a72b220300df87630733d.png", alt: "Tech Promo" },
  { url: "https://cdn.dribbble.com/users/6034870/screenshots/16658097/media/e24e2c94970030224676644464096009.png", alt: "E-commerce Sale" },
  { url: "https://cdn.dribbble.com/users/6234/screenshots/15671753/media/5e876007e003057376c72930263309a4.png", alt: "App Launch" }
];

export const EmailShowcase: React.FC = () => {
  const animationStyle = {
      animationDuration: '60s',
      animationDirection: 'normal'
  };

  return (
    <section className="py-24 bg-[#0a0a0a] border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-[10px] font-bold tracking-widest uppercase mb-6 text-brand-orange">
            Our Portfolio
        </div>
        <h3 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
          High-Converting Email Designs
        </h3>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Beautiful, responsive, and effective. We craft email templates that get clicked.
        </p>
      </div>
      
      <div className="flex flex-col gap-6 relative">
         {/* Fade masks for edges */}
         <div className="absolute inset-y-0 left-0 w-24 md:w-64 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none"></div>
         <div className="absolute inset-y-0 right-0 w-24 md:w-64 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none"></div>

         {/* Carousel Row */}
         <div className="flex overflow-hidden group">
           <div 
             className="flex gap-8 md:gap-12 min-w-full shrink-0 items-center animate-scroll-left group-hover:[animation-play-state:paused]"
             style={animationStyle}
           >
             {/* Triple the array to ensure seamless loop */}
             {[...STATIC_EMAILS, ...STATIC_EMAILS, ...STATIC_EMAILS].map((item, i) => (
               <div 
                 key={`email-${i}`} 
                 className="w-[280px] md:w-[350px] aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 bg-[#111] hover:border-white/30 transition-all duration-300 relative group/item shadow-xl"
               >
                 <img 
                    src={item.url} 
                    alt={item.alt} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover/item:scale-105" 
                    loading="lazy"
                 />
                 <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="bg-white text-black px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide transform translate-y-4 group-hover/item:translate-y-0 transition-transform">
                        {item.alt}
                    </span>
                 </div>
               </div>
             ))}
           </div>
         </div>
      </div>
    </section>
  );
};
