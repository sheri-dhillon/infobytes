
import React from 'react';
import { Star, Quote, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface TestimonialItem {
    id: number;
    name: string;
    business_name: string;
    review: string;
    stars: number;
}

const STATIC_DATA: TestimonialItem[] = [
    { id: 1, name: "David Rossi", business_name: "Founder, HealthTech", review: "The technical precision of our iOS app is outstanding. It’s fast, stable, and follows all of Apple’s latest HIG standards.", stars: 5 },
    { id: 2, name: "Lisa Kensington", business_name: "Product Manager", review: "Working with this team on our native iOS app was the best decision we made. The technical execution was flawless.", stars: 5 },
    { id: 3, name: "Michael Park", business_name: "Tech Entrepreneur", review: "Clean code, great architecture, and a beautiful front-end. Our app is scaling perfectly, and user feedback is 100% positive.", stars: 5 },
    { id: 4, name: "Karen Wu", business_name: "Director of Innovation", review: "They delivered our iOS project ahead of schedule and with zero bugs. Their ability to solve complex technical problems is impressive.", stars: 5 },
    { id: 5, name: "Alex Turner", business_name: "Founder, Social Ventures", review: "From initial consultation to the App Store launch, the journey was perfect. They are strategic partners who care.", stars: 5 },
    { id: 6, name: "Jonas Wadel", business_name: "E-com Collective", review: "Working with this team changed our entire retention strategy. They built a high-converting revenue engine.", stars: 5 },
    { id: 7, name: "Thomas Poppa", business_name: "Marketing Director", review: "The communication was exceptional. They took our messy email list and turned it into an automated profit center.", stars: 5 },
    { id: 8, name: "Muhammad Afzaal", business_name: "Tech Lead", review: "Our new site is lightning fast. They engineered a web experience that improved conversion by 40%.", stars: 5 }
];

const TestimonialCard: React.FC<{ data: TestimonialItem }> = ({ data }) => (
  <div className="bg-[#111] p-6 rounded-2xl border border-white/5 hover:border-brand-purple/30 transition-all duration-300 group hover:shadow-[0_0_30px_rgba(185,109,243,0.1)] relative overflow-hidden">
     <Quote className="absolute top-4 right-4 w-12 h-12 text-white/[0.03] group-hover:text-brand-purple/10 transition-colors rotate-180" />
     
     <div className="flex items-center gap-4 mb-4 relative z-10">
        <div>
           <div className="text-white font-bold text-sm">{data.name}</div>
           <div className="text-xs text-gray-500">{data.business_name}</div>
        </div>
     </div>
     
     <p className="text-gray-400 text-sm leading-relaxed relative z-10 group-hover:text-gray-200 transition-colors">
       "{data.review}"
     </p>

     <div className="flex gap-1 mt-4">
        {[...Array(5)].map((_, i) => (
           <Star key={i} className={`w-3 h-3 ${i < (data.stars || 5) ? 'text-brand-orange fill-brand-orange' : 'text-gray-700'}`} />
        ))}
     </div>
  </div>
);

export const VerticalTestimonials: React.FC = () => {
  const half = Math.ceil(STATIC_DATA.length / 2);
  const column1 = STATIC_DATA.slice(0, half);
  const column2 = STATIC_DATA.slice(half);

  return (
    <section className="py-24 bg-black relative border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Context & Sticky Content */}
        <div className="lg:col-span-5 relative z-20">
            <div className="sticky top-32">
                <div className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm w-fit">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-orange"></span>
                    <span className="text-xs font-bold tracking-widest text-white uppercase">Client Success</span>
                </div>

                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
                    We let our work <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-600">do the talking.</span>
                </h2>

                <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-md">
                    We partner with ambitious brands to build digital products that scale. But don't just take our word for it—hear from the founders and leaders we've worked with.
                </p>

                <div className="flex items-center gap-6">
                   <div className="flex flex-col">
                      <span className="text-3xl font-bold text-white">96%</span>
                      <span className="text-xs text-gray-500 uppercase tracking-wider mt-1">Retention Rate</span>
                   </div>
                   <div className="w-px h-12 bg-white/10"></div>
                   <div className="flex flex-col">
                      <span className="text-3xl font-bold text-white">200+</span>
                      <span className="text-xs text-gray-500 uppercase tracking-wider mt-1">Projects Shipped</span>
                   </div>
                </div>

                <div className="mt-12">
                   <Link to="/work" className="inline-flex items-center gap-2 text-white font-bold hover:text-brand-purple transition-colors group">
                      View all Case Studies 
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                   </Link>
                </div>
            </div>
        </div>

        {/* Right Column: Vertical Marquee Columns */}
        <div className="lg:col-span-7 h-[600px] md:h-[800px] overflow-hidden relative">
            {/* Fade Gradients for smooth edges */}
            <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-black via-black/80 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-black via-black/80 to-transparent z-10 pointer-events-none"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
                {/* Column 1: Scrolls Up */}
                <div className="flex flex-col gap-6 animate-scroll-up">
                    {[...column1, ...column1, ...column1].map((item, idx) => (
                        <TestimonialCard key={`c1-${idx}`} data={item} />
                    ))}
                </div>

                {/* Column 2: Scrolls Down */}
                <div className="hidden md:flex flex-col gap-6 animate-scroll-down">
                    {[...column2, ...column2, ...column2].map((item, idx) => (
                        <TestimonialCard key={`c2-${idx}`} data={item} />
                    ))}
                </div>
            </div>
        </div>

      </div>
    </section>
  );
};
