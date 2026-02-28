
import React from 'react';

// Partner platform logos from public/partners
const PARTNER_LOGOS = [
  { url: "/partners/Shopify-partner.png", alt: "Shopify Partner" },
  { url: "/partners/Klaviyo.png", alt: "Klaviyo" },
  { url: "/partners/Mailchimp.png", alt: "Mailchimp" },
  { url: "/partners/WooCommerce.png", alt: "WooCommerce" },
  { url: "/partners/omnisend.png", alt: "Omnisend" }
];

export const TrustedBy: React.FC = () => {
  const animationStyle = {
    animationDuration: '25s',
    animationDirection: 'normal'
  };

  return (
    <section className="py-24 bg-black border-t border-white/5 overflow-hidden relative">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[300px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 mb-16 text-center relative z-10">
        <h3 className="text-white/60 font-medium text-sm md:text-base tracking-[0.2em] uppercase mb-4">
          Strategic Partner Platforms
        </h3>
        <div className="h-px w-12 bg-blue-500/50 mx-auto" />
      </div>

      <div className="flex flex-col gap-6 relative">
        {/* Fade masks for edges */}
        <div className="absolute inset-y-0 left-0 w-24 md:w-64 bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-24 md:w-64 bg-gradient-to-l from-black via-black/80 to-transparent z-10 pointer-events-none"></div>

        {/* Carousel Row */}
        <div className="flex overflow-hidden group">
          <div
            className="flex gap-12 md:gap-24 min-w-full shrink-0 items-center animate-scroll-left group-hover:[animation-play-state:paused]"
            style={animationStyle}
          >
            {/* Repeat the array multiple times for a seamless loop */}
            {[...PARTNER_LOGOS, ...PARTNER_LOGOS, ...PARTNER_LOGOS, ...PARTNER_LOGOS].map((logo, i) => (
              <div key={`partner-${i}`} className="flex items-center justify-center min-w-[140px] md:min-w-[200px] group/logo">
                <img
                  src={logo.url}
                  alt={logo.alt}
                  className="h-7 md:h-10 w-auto object-contain transition-all duration-500 opacity-40 grayscale group-hover/logo:opacity-100 group-hover/logo:grayscale-0 group-hover/logo:scale-110"
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
