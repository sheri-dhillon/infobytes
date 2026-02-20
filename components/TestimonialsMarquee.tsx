import React from 'react';
import { Star, Quote, Loader2 } from 'lucide-react';
import { useTestimonials } from '../hooks/useTestimonials';
import reviewsData from '../reviews.json';

const MARQUEE_SECTION = reviewsData.sections.marquee;

export const TestimonialsMarquee: React.FC = () => {
  const { testimonials, loading } = useTestimonials();

  return (
    <section className="py-24 bg-black border-t border-white/5 overflow-hidden">
      <style>{`
        @keyframes testimonials-marquee-loop {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-[10px] font-bold tracking-widest uppercase mb-6 text-brand-orange">
          {MARQUEE_SECTION.tagline}
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">{MARQUEE_SECTION.headline}</h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          {MARQUEE_SECTION.subheadline}
        </p>
      </div>
      
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-8 h-8 text-brand-orange animate-spin" />
        </div>
      ) : (
        <div className="relative flex overflow-hidden">
           {/* Gradients to fade edges */}
           <div className="absolute top-0 bottom-0 left-0 w-24 md:w-48 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
           <div className="absolute top-0 bottom-0 right-0 w-24 md:w-48 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>

           <div className="flex w-max [animation:testimonials-marquee-loop_48s_linear_infinite] hover:[animation-play-state:paused]">
              {[0, 1].map((loop) => (
                <div key={loop} className="flex gap-6 pr-6">
                  {testimonials.map((t, i) => (
                 <div 
                   key={`${loop}-${t.name}-${i}`} 
                   className="w-[350px] md:w-[450px] bg-[#0d0d10] border border-white/15 p-8 rounded-3xl shrink-0 relative group hover:border-white/30 hover:bg-[#121216] transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
                 >
                    <Quote className="absolute top-6 right-6 w-8 h-8 text-white/10 group-hover:text-brand-orange/30 transition-colors" />
                    
                    <div className="flex gap-1 mb-6">
                      {[...Array(5)].map((_, starIdx) => (
                        <Star key={starIdx} className="w-4 h-4 fill-brand-orange text-brand-orange" />
                      ))}
                    </div>
                    
                    <p className="text-gray-200 text-[1.03rem] leading-relaxed mb-8 min-h-[120px]">
                      "{t.review}"
                    </p>

                    <div className="border-t border-white/10 pt-6">
                       <div>
                          <div className="text-white font-bold text-[1.05rem]">{t.name}</div>
                          <div className="text-xs text-gray-400 uppercase tracking-wider mt-0.5">{t.business_name}</div>
                       </div>
                    </div>
                 </div>
                  ))}
                </div>
              ))}
           </div>
        </div>
      )}
    </section>
  );
};