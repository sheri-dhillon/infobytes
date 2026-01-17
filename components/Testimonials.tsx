import React, { useRef } from 'react';
import { Star, ArrowLeft, ArrowRight } from 'lucide-react';

const testimonials = [
  // Category 1: Email Marketing & Automation
  {
    quote: "Working with this team changed our entire retention strategy. They didn't just set up email flows; they built a high-converting revenue engine. We’ve seen a massive jump in recovered carts since the launch. Truly a professional with deep knowledge.",
    name: "Jonas Wadel",
    role: "Founder, E-com Collective",
    service: "Email Marketing & Automation",
    stars: 5
  },
  {
    quote: "The communication was exceptional, but the results were even better. They took our messy email list and turned it into an automated profit center. If you need someone who understands the technical side of email marketing, look no further.",
    name: "Thomas Poppa",
    role: "Marketing Director",
    service: "Email Marketing & Automation",
    stars: 5
  },
  {
    quote: "Simply the best. They mapped out our entire customer journey and implemented flows that actually feel personal to our users. Our repeat purchase rate has never been higher. Highly recommended for any serious brand.",
    name: "Brittany Miller",
    role: "CEO, Glow Brands",
    service: "Email Marketing & Automation",
    stars: 5
  },
  {
    quote: "Exceptional work! They simplified a very complex automation task for us. Their knowledge of email deliverability and design is top-tier. A great professional who delivers exactly what is promised, and then some.",
    name: "Edward Sullivan",
    role: "Operations Manager",
    service: "Email Marketing & Automation",
    stars: 5
  },
  {
    quote: "Clear communication and incredible execution. They built a lifecycle marketing system that works while we sleep. It's rare to find an agency that understands both the creative and the data-driven side of marketing so well.",
    name: "Dionne Richards",
    role: "Founder, Lifestyle Co.",
    service: "Email Marketing & Automation",
    stars: 5
  },

  // Category 2: Web Design & Development
  {
    quote: "Our new site is lightning fast and looks incredible. They took our vision and engineered a web experience that has already improved our conversion rate by 40%. Great work and very communicative throughout the process.",
    name: "Muhammad Afzaal",
    role: "Tech Lead",
    service: "Web Design & Development",
    stars: 5
  },
  {
    quote: "They handled our complex web development needs with total ease. Even when we ran into heavy workloads, they remained professional and delivered a high-performance site that exceeds our expectations. Highly recommended!",
    name: "Uzma Khan",
    role: "Creative Director",
    service: "Web Design & Development",
    stars: 5
  },
  {
    quote: "A truly professional experience. They didn't just build a website; they built a digital storefront that sells. Their knowledge of modern web architecture is evident in the final product. Speed, SEO, and style—they nailed it all.",
    name: "Daniel Townes",
    role: "Startup Founder",
    service: "Web Design & Development",
    stars: 5
  },
  {
    quote: "Great and fast! They turned our outdated site into a modern, responsive powerhouse. The transition was seamless, and the code is remarkably clean. We will definitely be back for our future development projects.",
    name: "Sarah Pointer",
    role: "E-commerce Manager",
    service: "Web Design & Development",
    stars: 5
  },
  {
    quote: "Communication was great, but the final build was even better. They have a unique ability to blend technical development with a high-end design aesthetic. Looking forward to working together on the next phase of our growth.",
    name: "Brooklyn Wilson",
    role: "Managing Partner",
    service: "Web Design & Development",
    stars: 5
  },

  // Category 3: UI/UX Design
  {
    quote: "The UI/UX work was transformative. They identified friction points we didn't even know existed and redesigned our user flow to be incredibly intuitive. The design is clean, modern, and perfectly aligned with our brand.",
    name: "Marcus Sterling",
    role: "Head of Product",
    service: "UI/UX Design",
    stars: 5
  },
  {
    quote: "They have a deep understanding of human-centric design. Our new interface isn't just beautiful; it's functional and easy to navigate. They truly turned our concept into a world-class digital product.",
    name: "Elena Vance",
    role: "App Founder",
    service: "UI/UX Design",
    stars: 5
  },
  {
    quote: "Highly professional design process. From wireframes to high-fidelity prototypes, every step was handled with precision. They created a design system that is scalable and absolutely stunning.",
    name: "Julian Thorne",
    role: "CEO, Fintech Solutions",
    service: "UI/UX Design",
    stars: 5
  },
  {
    quote: "They took our rough ideas and polished them into a high-end user experience. Their attention to detail in the UI elements is what sets them apart from other agencies. An amazing partner for any creative project.",
    name: "Sarah Jenkins",
    role: "Marketing Lead",
    service: "UI/UX Design",
    stars: 5
  },
  {
    quote: "The UI/UX strategy they delivered helped us secure our next round of funding. Investors were blown away by the clarity and professionalism of the interface. Exceptional knowledge and execution.",
    name: "Robert Chen",
    role: "CTO",
    service: "UI/UX Design",
    stars: 5
  },

  // Category 4: iOS App Development
  {
    quote: "The technical precision of our iOS app is outstanding. It’s fast, stable, and follows all of Apple’s latest HIG standards. They turned a complex set of features into a seamless mobile experience.",
    name: "David Rossi",
    role: "Founder, HealthTech App",
    service: "iOS App Development",
    stars: 5
  },
  {
    quote: "Working with this team on our native iOS app was the best decision we made. The communication was constant, and the technical execution was flawless. They truly know how to build for the App Store.",
    name: "Lisa Kensington",
    role: "Product Manager",
    service: "iOS App Development",
    stars: 5
  },
  {
    quote: "Clean code, great architecture, and a beautiful front-end. They handled everything from API integration to the final deployment. Our app is scaling perfectly, and user feedback has been 100% positive.",
    name: "Michael Park",
    role: "Tech Entrepreneur",
    service: "iOS App Development",
    stars: 5
  },
  {
    quote: "They delivered our iOS project ahead of schedule and with zero bugs. Their ability to solve complex technical problems on the fly is impressive. If you want a native app done right, this is the agency.",
    name: "Karen Wu",
    role: "Director of Innovation",
    service: "iOS App Development",
    stars: 5
  },
  {
    quote: "From initial consultation to the App Store launch, the journey was perfect. They are not just developers; they are strategic partners who care about the success of your product. Five stars all the way.",
    name: "Alex Turner",
    role: "Founder, Social Ventures",
    service: "iOS App Development",
    stars: 5
  }
];

export const Testimonials: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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
                    key={i} 
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
                         "{t.quote}"
                       </p>
                     </div>
  
                     <div className="mt-8 relative z-10 pt-6 border-t border-white/5">
                        <div className="mb-3">
                            <span className="text-[10px] font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-purple uppercase">
                                {t.service}
                            </span>
                        </div>
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