import React, { useRef } from 'react';
import { ArrowLeft, ArrowRight, Box, CreditCard, GraduationCap, Heart, Layers, ShoppingBag, Building2 } from 'lucide-react';

const industries = [
  {
    title: "AI & Machine",
    description: "Designing intuitive interfaces for complex AI systems, and NLP products. We bridge human-centered design with technical depth to deliver real-world results.",
    icon: Box,
    color: "text-purple-400",
    bg: "bg-purple-500/10"
  },
  {
    title: "FinTech",
    description: "Our team builds clear, compliant, and conversion-optimized financial experiences—designed to build trust and perform at scale.",
    icon: CreditCard,
    color: "text-yellow-400",
    bg: "bg-yellow-500/10"
  },
  {
    title: "EdTech",
    description: "Designing education products for engagement and clarity—across mobile, desktop, and LMS platforms. We create UX that empowers learning, not distracts from it.",
    icon: GraduationCap,
    color: "text-green-400",
    bg: "bg-green-500/10"
  },
  {
    title: "Healthcare",
    description: "Building patient-friendly, compliant, and trustworthy digital experiences. From medtech SaaS to wellness apps, we blend usability with accessibility.",
    icon: Heart,
    color: "text-teal-400",
    bg: "bg-teal-500/10"
  },
  {
    title: "Web3 & Blockchain",
    description: "We design products for decentralized platforms, NFT ecosystems, and token-based systems. With a focus on clarity and community, we help Web3 startups launch with confidence.",
    icon: Layers,
    color: "text-blue-400",
    bg: "bg-blue-500/10"
  },
  {
    title: "E-commerce",
    description: "From DTC brands to enterprise platforms, we create seamless shopping experiences. Our work supports product discovery, sales, retention, and end-to-end user journeys.",
    icon: ShoppingBag,
    color: "text-orange-400",
    bg: "bg-orange-500/10"
  },
  {
    title: "Real Estate",
    description: "Designing digital platforms that bring property and people together. We craft intuitive property search, listings, and CMS-powered backends for real estate success.",
    icon: Building2,
    color: "text-indigo-400",
    bg: "bg-indigo-500/10"
  }
];

export const Industries: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = 420; // Width of card + gap
      if (direction === 'left') {
        current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="bg-black py-24 border-t border-white/5 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-purple/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">Industries</h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              We work across high-impact industries, combining deep domain knowledge with cutting-edge design and AI.
            </p>
          </div>
          
          {/* Navigation Buttons */}
          <div className="flex gap-4">
            <button 
              onClick={() => scroll('left')}
              className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white hover:bg-white hover:text-black hover:border-white transition-all duration-300 group"
              aria-label="Scroll left"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white hover:bg-white hover:text-black hover:border-white transition-all duration-300 group"
              aria-label="Scroll right"
            >
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Scroll Container */}
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-8 snap-x mandatory [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {industries.map((industry, index) => (
            <div 
              key={index}
              className="min-w-[340px] md:min-w-[400px] bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 snap-center hover:border-white/20 hover:bg-[#111] transition-all duration-300 group flex flex-col h-full min-h-[320px]"
            >
              <div className={`w-14 h-14 rounded-2xl ${industry.bg} border border-white/5 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300`}>
                <industry.icon className={`w-7 h-7 ${industry.color}`} />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{industry.title}</h3>
              <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                {industry.description}
              </p>
            </div>
          ))}
          {/* Spacer to allow scrolling past the last item */}
          <div className="w-1 shrink-0"></div>
        </div>
      </div>
    </section>
  );
};