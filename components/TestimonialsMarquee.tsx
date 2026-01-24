import React from 'react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "Working with this team changed our entire retention strategy. They built a high-converting revenue engine.",
    name: "Jonas Wadel",
    role: "Founder, E-com Collective",
    stars: 5
  },
  {
    quote: "The communication was exceptional. They took our messy email list and turned it into an automated profit center.",
    name: "Thomas Poppa",
    role: "Marketing Director",
    stars: 5
  },
  {
    quote: "Our new site is lightning fast. They engineered a web experience that improved conversion by 40%.",
    name: "Muhammad Afzaal",
    role: "Tech Lead",
    stars: 5
  },
  {
    quote: "The UI/UX work was transformative. They identified friction points we didn't even know existed.",
    name: "Marcus Sterling",
    role: "Head of Product",
    stars: 5
  },
  {
    quote: "Clean code, great architecture, and a beautiful front-end. Our app is scaling perfectly.",
    name: "Michael Park",
    role: "Tech Entrepreneur",
    stars: 5
  },
  {
    quote: "Simply the best. They mapped out our entire customer journey and implemented flows that feel personal.",
    name: "Brittany Miller",
    role: "CEO, Glow Brands",
    stars: 5
  }
];

export const TestimonialsMarquee: React.FC = () => {
  return (
    <section className="py-24 bg-black border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-[10px] font-bold tracking-widest uppercase mb-6 text-brand-orange">
            Client Feedback
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">Trusted by Founders</h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            See what our partners have to say about working with us to scale their digital presence.
        </p>
      </div>
      
      <div className="relative flex overflow-hidden">
         {/* Gradients to fade edges */}
         <div className="absolute top-0 bottom-0 left-0 w-24 md:w-48 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
         <div className="absolute top-0 bottom-0 right-0 w-24 md:w-48 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>

         <div className="flex gap-6 animate-scroll-left min-w-full shrink-0">
            {/* Duplicate list 3 times for seamless infinite scroll */}
            {[...testimonials, ...testimonials, ...testimonials].map((t, i) => (
               <div 
                 key={i} 
                 className="w-[350px] md:w-[450px] bg-[#0a0a0a] border border-white/10 p-8 rounded-3xl shrink-0 relative group hover:border-white/20 hover:bg-[#111] transition-all duration-300"
               >
                  <Quote className="absolute top-6 right-6 w-8 h-8 text-white/5 group-hover:text-brand-orange/20 transition-colors" />
                  
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, starIdx) => (
                      <Star key={starIdx} className="w-4 h-4 fill-brand-orange text-brand-orange" />
                    ))}
                  </div>
                  
                  <p className="text-gray-300 text-base leading-relaxed mb-8 min-h-[80px]">
                    "{t.quote}"
                  </p>

                  <div className="flex items-center gap-4 border-t border-white/5 pt-6">
                     <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-800 to-black border border-white/10 flex items-center justify-center text-xs font-bold text-white shadow-lg">
                       {t.name.charAt(0)}
                     </div>
                     <div>
                        <div className="text-white font-bold text-sm">{t.name}</div>
                        <div className="text-xs text-gray-500 uppercase tracking-wider mt-0.5">{t.role}</div>
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </div>
    </section>
  );
};