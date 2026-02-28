
import React from 'react';

// Partner platform logos from public/partners
const PARTNER_LOGOS = [
  { url: "/partners/shopify-partner.png", alt: "Shopify Partner" },
  { url: "/partners/Klaviyo.png", alt: "Klaviyo" },
  { url: "/partners/omnisend.png", alt: "Omnisend" },
  { url: "/partners/Mailchimp.png", alt: "Mailchimp" },
  { url: "/partners/WooCommerce.png", alt: "WooCommerce" }
];

export const TrustedBy: React.FC = () => {
  return (
    <section className="py-24 bg-black border-t border-white/5 overflow-hidden relative">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h3 className="text-white/60 font-medium text-sm md:text-base tracking-[0.2em] uppercase mb-4">
            Our Strategic Partner Platforms
          </h3>
          <div className="h-px w-12 bg-blue-500/50 mx-auto" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {PARTNER_LOGOS.map((logo, i) => (
            <div
              key={`partner-${i}`}
              className="group relative flex items-center justify-center p-8 bg-white/[0.02] border border-white/5 rounded-2xl transition-all duration-500 hover:bg-white/[0.05] hover:border-blue-500/30 hover:shadow-[0_0_30px_-10px_rgba(59,130,246,0.3)]"
            >
              {/* Card Glow Effect */}
              <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/5 transition-colors duration-500 rounded-2xl pointer-events-none" />

              <img
                src={logo.url}
                alt={logo.alt}
                className="h-8 md:h-10 w-auto object-contain transition-all duration-500 grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
