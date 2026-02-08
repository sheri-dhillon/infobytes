import React, { useRef, useEffect, useState } from 'react';
import { Star, ArrowLeft, ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface TestimonialItem {
    id: number;
    name: string;
    business_name: string; // role in UI
    service_name: string;
    review: string;
    stars: number;
}

export const Testimonials: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const fetchTestimonials = async () => {
          try {
              const { data, error } = await supabase
                  .from('testimonials')
                  .select('*')
                  .eq('status', 'Active')
                  .order('created_at', { ascending: false }); // Newest first

              if (!error && data) {
                  setTestimonials(data);
              }
          } catch (err) {
              console.error("Error loading testimonials:", err);
          } finally {
              setLoading(false);
          }
      };

      fetchTestimonials();
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400; // Increased scroll amount for larger cards
      const currentScroll = scrollContainerRef.current.scrollLeft;
      const targetScroll = direction === 'left' 
        ? currentScroll - scrollAmount 
        : currentScroll + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  if (loading) return null; // Or a loading skeleton if preferred
  if (testimonials.length === 0) return null;

  return (
    <section className="py-20 md:py-24 bg-black relative overflow-hidden">
       {/* Background Glows */}
       <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-purple-900/10 blur-[120px] rounded-full pointer-events-none" />
       <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-orange/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-20">
           <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-[10px] font-bold tracking-widest uppercase mb-6 text-gray-300">
            Testimonials
           </div>
           
           <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-8 tracking-tight max-w-4xl mx-auto">
             Fueling the next generation of <span className="font-serif italic text-gray-400">digital icons.</span>
           </h2>

           <div className="flex flex-col md:flex-row items-center gap-6">
             <div className="flex items-center gap-4 bg-[#111] border border-white/10 rounded-full px-2 py-2 pr-6 shadow-xl">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-[#111] overflow-hidden">
                       <img src={`https://randomuser.me/api/portraits/thumb/women/${i + 40}.jpg`} alt="User" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <div className="text-left">
                   <div className="text-white font-bold text-sm leading-none">Join 200+</div>
                   <div className="text-xs text-gray-500">Growth-Focused Founders</div>
                </div>
             </div>
             
             <p className="hidden md:block text-gray-500 text-sm max-w-md text-left leading-tight">
               We don’t just deliver projects; we build long-term success stories. See why global founders trust us to architect their vision and scale their revenue.
             </p>
           </div>
        </div>

        {/* Content Row */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
           
           {/* Stat Block */}
           <div className="md:w-64 shrink-0 sticky top-32 text-center md:text-left mx-auto md:mx-0">
              <div className="text-5xl md:text-6xl lg:text-7xl font-serif italic text-white mb-2">100%</div>
              <p className="text-gray-500 text-xs md:text-sm leading-relaxed max-w-[150px] mx-auto md:mx-0">
                Client Satisfaction Rate over the last 3 years
              </p>
              
              {/* Decoration Line */}
              <div className="mt-8 h-px w-24 bg-gradient-to-r from-white/20 to-transparent hidden md:block"></div>
           </div>

           {/* Carousel Container */}
           <div className="w-full overflow-hidden">
              {/* Cards wrapper */}
              <div 
                ref={scrollContainerRef}
                className="flex gap-6 overflow-x-auto pb-4 snap-x [&::-webkit-scrollbar]:hidden"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {testimonials.map((t, i) => (
                  <div 
                    key={t.id || i} 
                    className="min-w-[300px] md:min-w-[380px] lg:min-w-[420px] bg-[#0a0a0a] border border-white/10 p-6 md:p-8 rounded-3xl snap-center group hover:border-white/20 transition-all duration-300 relative overflow-hidden flex flex-col justify-between min-h-[360px]"
                  >
                     {/* Hover Gradient */}
                     <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                     
                     <div className="relative z-10">
                       <div className="flex gap-1 mb-6">
                         {[...Array(5)].map((_, idx) => (
                           <Star key={idx} className={`w-3 h-3 md:w-4 md:h-4 ${idx < t.stars ? 'fill-orange-500 text-orange-500' : 'text-gray-700'}`} />
                         ))}
                       </div>
                       <p className="text-base md:text-lg text-gray-200 leading-relaxed">
                         "{t.review}"
                       </p>
                     </div>
  
                     <div className="mt-8 relative z-10 pt-6 border-t border-white/5">
                        <div className="mb-3">
                            <span className="text-[10px] font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-purple uppercase">
                                {t.service_name}
                            </span>
                        </div>
                        <div>
                           <div className="text-white font-bold text-sm">{t.name}</div>
                           <div className="text-xs text-gray-500">{t.business_name}</div>
                        </div>
                     </div>
                  </div>
                ))}
                
                {/* Spacer for right padding effect in overflow */}
                <div className="min-w-[1px] shrink-0"></div>
              </div>

              {/* Navigation Arrows */}
              <div className="flex gap-4 mt-8">
                 <button 
                   onClick={() => scroll('left')} 
                   className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white hover:bg-white hover:text-black hover:border-white transition-all duration-300 group"
                   aria-label="Previous testimonial"
                 >
                    <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 group-hover:-translate-x-1 transition-transform" />
                 </button>
                 <button 
                   onClick={() => scroll('right')} 
                   className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white hover:bg-white hover:text-black hover:border-white transition-all duration-300 group"
                   aria-label="Next testimonial"
                 >
                    <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                 </button>
              </div>
           </div>
        </div>

      </div>
    </section>
  );
};
