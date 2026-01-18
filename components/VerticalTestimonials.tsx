import React from 'react';
import { Star, Quote, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const column1 = [
  {
    quote: "Working with this team changed our entire retention strategy. They built a high-converting revenue engine.",
    name: "Jonas Wadel",
    role: "Founder, E-com Collective",
    image: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    quote: "They took our messy email list and turned it into an automated profit center. Truly exceptional work.",
    name: "Thomas Poppa",
    role: "Marketing Director",
    image: "https://randomuser.me/api/portraits/men/45.jpg"
  },
  {
    quote: "Our new site is lightning fast. They engineered a web experience that improved conversion by 40%.",
    name: "Muhammad Afzaal",
    role: "Tech Lead",
    image: "https://randomuser.me/api/portraits/men/22.jpg"
  },
  {
    quote: "The UI/UX work was transformative. They identified friction points we didn't even know existed.",
    name: "Marcus Sterling",
    role: "Head of Product",
    image: "https://randomuser.me/api/portraits/men/85.jpg"
  },
  {
    quote: "Clean code, great architecture, and a beautiful front-end. Our app is scaling perfectly.",
    name: "Michael Park",
    role: "Tech Entrepreneur",
    image: "https://randomuser.me/api/portraits/men/11.jpg"
  },
];

const column2 = [
  {
    quote: "Simply the best. They mapped out our entire customer journey and implemented flows that feel personal.",
    name: "Brittany Miller",
    role: "CEO, Glow Brands",
    image: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    quote: "They didn't just build a website; they built a digital storefront that sells. Speed, SEO, and style.",
    name: "Daniel Townes",
    role: "Startup Founder",
    image: "https://randomuser.me/api/portraits/men/67.jpg"
  },
  {
    quote: "They have a deep understanding of human-centric design. Our new interface isn't just beautiful; it's functional.",
    name: "Elena Vance",
    role: "App Founder",
    image: "https://randomuser.me/api/portraits/women/33.jpg"
  },
  {
    quote: "The technical precision of our iOS app is outstanding. It follows all of Apple’s latest HIG standards.",
    name: "David Rossi",
    role: "Founder, HealthTech",
    image: "https://randomuser.me/api/portraits/men/54.jpg"
  },
  {
    quote: "From initial consultation to the App Store launch, the journey was perfect. Strategic partners who care.",
    name: "Alex Turner",
    role: "Founder, Social Ventures",
    image: "https://randomuser.me/api/portraits/women/28.jpg"
  },
];

const TestimonialCard: React.FC<{ data: typeof column1[0] }> = ({ data }) => (
  <div className="bg-[#111] p-6 rounded-2xl border border-white/5 hover:border-brand-purple/30 transition-all duration-300 group hover:shadow-[0_0_30px_rgba(185,109,243,0.1)] relative overflow-hidden">
     {/* Decorative Quote Icon */}
     <Quote className="absolute top-4 right-4 w-12 h-12 text-white/[0.03] group-hover:text-brand-purple/10 transition-colors rotate-180" />
     
     <div className="flex items-center gap-4 mb-4 relative z-10">
        <div>
           <div className="text-white font-bold text-sm">{data.name}</div>
           <div className="text-xs text-gray-500">{data.role}</div>
        </div>
     </div>
     
     <p className="text-gray-400 text-sm leading-relaxed relative z-10 group-hover:text-gray-200 transition-colors">
       "{data.quote}"
     </p>

     <div className="flex gap-1 mt-4">
        {[1,2,3,4,5].map(i => (
           <Star key={i} className="w-3 h-3 text-brand-orange fill-brand-orange" />
        ))}
     </div>
  </div>
);

export const VerticalTestimonials: React.FC = () => {
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
                    {/* Triple the data to ensure seamless loop without gaps */}
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
