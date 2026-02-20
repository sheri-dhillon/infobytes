
import React from 'react';
import { Star, Quote, ArrowRight, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTestimonials, Testimonial } from '../hooks/useTestimonials';
import reviewsData from '../reviews.json';

const VERTICAL_SECTION = reviewsData.sections.vertical;

const TestimonialCard: React.FC<{ data: Testimonial }> = ({ data }) => (
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
  const { testimonials, loading } = useTestimonials();
  
  const half = Math.ceil(testimonials.length / 2);
  const column1 = testimonials.slice(0, half);
  const column2 = testimonials.slice(half);

  return (
    <section className="py-24 bg-black relative border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Context & Sticky Content */}
        <div className="lg:col-span-5 relative z-20">
            <div className="sticky top-32">
                <div className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm w-fit">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-orange"></span>
                    <span className="text-xs font-bold tracking-widest text-white uppercase">{VERTICAL_SECTION.tagline}</span>
                </div>

                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
                    {VERTICAL_SECTION.headlineLine1} <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-600">{VERTICAL_SECTION.headlineAccent}</span>
                </h2>

                <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-md">
                    {VERTICAL_SECTION.subheadline}
                </p>

                <div className="flex items-center gap-6">
                   <div className="flex flex-col">
                             <span className="text-3xl font-bold text-white">{VERTICAL_SECTION.stat1Value}</span>
                             <span className="text-xs text-gray-500 uppercase tracking-wider mt-1">{VERTICAL_SECTION.stat1Label}</span>
                   </div>
                   <div className="w-px h-12 bg-white/10"></div>
                   <div className="flex flex-col">
                             <span className="text-3xl font-bold text-white">{VERTICAL_SECTION.stat2Value}</span>
                             <span className="text-xs text-gray-500 uppercase tracking-wider mt-1">{VERTICAL_SECTION.stat2Label}</span>
                   </div>
                </div>

                <div className="mt-12">
                   <Link to="/work" className="inline-flex items-center gap-2 text-white font-bold hover:text-brand-purple transition-colors group">
                             {VERTICAL_SECTION.ctaLabel}
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

            {loading ? (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="w-8 h-8 text-brand-orange animate-spin" />
              </div>
            ) : (
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
            )}
        </div>

      </div>
    </section>
  );
};
