
import React from 'react';

// Default static logos
const LOGOS = [
  { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Shopify_logo_2018.svg/2560px-Shopify_logo_2018.svg.png", alt: "Shopify" },
  { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/WooCommerce_logo.svg/1200px-WooCommerce_logo.svg.png", alt: "WooCommerce" },
  { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png", alt: "React" },
  { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/1184px-Vue.js_Logo_2.svg.png", alt: "Vue" },
  { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Nextjs-logo.svg/2560px-Nextjs-logo.svg.png", alt: "Next.js" },
  { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Laravel.svg/1969px-Laravel.svg.png", alt: "Laravel" }
];

export const TrustedBy: React.FC = () => {
  const animationStyle = {
      animationDuration: '30s',
      animationDirection: 'normal'
  };

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

         {/* Carousel Row */}
         <div className="flex overflow-hidden group">
           <div 
             className="flex gap-8 md:gap-16 min-w-full shrink-0 items-center animate-scroll-left group-hover:[animation-play-state:paused]"
             style={animationStyle}
           >
             {/* Triple the array to ensure seamless loop */}
             {[...LOGOS, ...LOGOS, ...LOGOS].map((logo, i) => (
               <div key={`logo-${i}`} className="flex items-center justify-center min-w-[120px] md:min-w-[160px] opacity-50 hover:opacity-100 transition-opacity duration-300">
                 <img 
                    src={logo.url} 
                    alt={logo.alt} 
                    className="h-8 md:h-12 w-auto object-contain brightness-0 invert" 
                    loading="lazy"
                 />
               </div>
             ))}
           </div>
         </div>
      </div>
    </section>
  );
};
