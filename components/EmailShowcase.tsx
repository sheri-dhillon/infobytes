
import React from 'react';

const TEMPLATE_IMAGES = [
  { url: "/templates/template 1.png", alt: "Modern E-commerce Layout" },
  { url: "/templates/template 2.png", alt: "Minimalist Brand Newsletter" },
  { url: "/templates/template 3.png", alt: "High-Conversion Sale Promo" },
  { url: "/templates/template 4.png", alt: "Product Launch Sequence" },
  { url: "/templates/template 5.png", alt: "Luxury Brand Showcase" },
  { url: "/templates/template 6.png", alt: "Editorial Content Design" },
  { url: "/templates/template 7.png", alt: "Seasonal Campaign Layout" },
  { url: "/templates/template 8.png", alt: "Direct Response Architecture" },
  { url: "/templates/template 9.png", alt: "Lifestyle Engagement Series" }
];

export const EmailShowcase: React.FC = () => {
  const animationStyle = {
    animationDuration: '80s',
    animationDirection: 'normal'
  };

  return (
    <section className="py-24 bg-[#0a0a0a] border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-[10px] font-bold tracking-widest uppercase mb-6 text-brand-orange">
          DESIGN SHOWCASE
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
          Designs that do more than look good.
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          A curated showcase of high-yield email layouts built to turn every open into a measurable result. Every pixel is designed to drive revenue and reinforce brand identity across Klaviyo and Omnisend.
        </p>
      </div>

      <div className="flex flex-col gap-6 relative">
        {/* Fade masks for edges */}
        <div className="absolute inset-y-0 left-0 w-24 md:w-64 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-24 md:w-64 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none"></div>

        {/* Carousel Row */}
        <div className="flex overflow-hidden">
          <div
            className="flex gap-4 min-w-full shrink-0 items-center animate-scroll-left"
            style={animationStyle}
          >
            {/* Triple the array to ensure seamless loop with 4 visible items */}
            {[...TEMPLATE_IMAGES, ...TEMPLATE_IMAGES, ...TEMPLATE_IMAGES].map((item, i) => (
              <div
                key={`template-${i}`}
                className="w-[calc(25vw-1rem)] md:w-[calc(25vw-1.5rem)] aspect-[3/4] flex items-center justify-center"
              >
                <img
                  src={item.url}
                  alt={item.alt}
                  className="max-w-full max-h-full object-contain"
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
