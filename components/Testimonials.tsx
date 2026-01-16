import React, { useRef } from 'react';
import { Star, ArrowLeft, ArrowRight } from 'lucide-react';

const testimonials = [
  {
    quote: "Nexa Studio robust security features ensure that our transactions are always safe & secure. A game changer for us.",
    name: "Miles Esther",
    role: "CTO at Innovate AI",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    stars: 5
  },
  {
    quote: "We wanted a solution that scales. The automated payment processing saved us hours every week while enhancing security.",
    name: "Sarah Lee",
    role: "Product Manager at AutoTrader",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    stars: 5
  },
  {
    quote: "Robust security features ensure that our transactions are always safe. The team's attention to detail is unmatched.",
    name: "James Park",
    role: "CEO at FintechX",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
    stars: 5
  },
  {
    quote: "We combined strategic thinking and business goals to create digital experiences that deliver real, measurable results.",
    name: "Jualriya",
    role: "CTO at Innovate AI",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80",
    stars: 5
  },
  {
    quote: "The conversion focused layouts completely transformed our user acquisition strategy. Revenue is up 40% in Q1.",
    name: "Alex Chen",
    role: "Founder at GrowthLabs",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80",
    stars: 5
  }
];

export const Testimonials: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 360; // Approximate card width + gap
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

  return (
    <section className="py-24 bg-black relative overflow-hidden">
       {/* Background Glows */}
       <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-purple-900/10 blur-[120px] rounded-full pointer-events-none" />
       <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-orange/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-20">
           <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-[10px] font-bold tracking-widest uppercase mb-6 text-gray-300">
            Testimonials
           </div>
           
           <h2 className="text-4xl md:text-6xl font-semibold text-white mb-8 tracking-tight">
             Trusted by <span className="font-serif italic text-gray-400">teams</span><br />
             around the world
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
                   <div className="text-white font-bold text-sm leading-none">Join 5,000+</div>
                   <div className="text-xs text-gray-500">satisfied members</div>
                </div>
             </div>
             
             <p className="hidden md:block text-gray-500 text-sm max-w-sm text-left leading-tight">
               We combine strategic thinking and business goals to create digital experiences that deliver results.
             </p>
           </div>
        </div>

        {/* Content Row */}
        <div className="flex flex-col md:flex-row gap-12 items-start">
           
           {/* Stat Block */}
           <div className="md:w-64 shrink-0 sticky top-32 text-center md:text-left">
              <div className="text-6xl md:text-7xl font-serif italic text-white mb-2">145+</div>
              <p className="text-gray-500 text-sm leading-relaxed max-w-[150px] mx-auto md:mx-0">
                Services provided over the last 3 years
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
                    key={i} 
                    className="min-w-[320px] md:min-w-[380px] bg-[#0a0a0a] border border-white/10 p-8 rounded-3xl snap-center group hover:border-white/20 transition-all duration-300 relative overflow-hidden flex flex-col justify-between h-[340px]"
                  >
                     {/* Hover Gradient */}
                     <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                     
                     <div>
                       <div className="flex gap-1 mb-6">
                         {[...Array(5)].map((_, idx) => (
                           <Star key={idx} className={`w-4 h-4 ${idx < t.stars ? 'fill-orange-500 text-orange-500' : 'text-gray-700'}`} />
                         ))}
                       </div>
                       <p className="text-lg text-gray-200 leading-relaxed relative z-10">
                         "{t.quote}"
                       </p>
                     </div>
  
                     <div className="flex items-center gap-4 mt-8 relative z-10 pt-8 border-t border-white/5">
                        <img src={t.image} alt={t.name} className="w-12 h-12 rounded-xl object-cover grayscale group-hover:grayscale-0 transition-all duration-300" />
                        <div>
                           <div className="text-white font-bold text-sm">{t.name}</div>
                           <div className="text-xs text-gray-500">{t.role}</div>
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
                   className="w-14 h-14 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white hover:bg-white hover:text-black hover:border-white transition-all duration-300 group"
                   aria-label="Previous testimonial"
                 >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                 </button>
                 <button 
                   onClick={() => scroll('right')} 
                   className="w-14 h-14 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white hover:bg-white hover:text-black hover:border-white transition-all duration-300 group"
                   aria-label="Next testimonial"
                 >
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                 </button>
              </div>
           </div>
        </div>

      </div>
    </section>
  );
};