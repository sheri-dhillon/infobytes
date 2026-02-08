
import React, { useRef, useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Box, CreditCard, GraduationCap, Heart, Layers, ShoppingBag, Building2, Globe, Cpu, Shield, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

// Icon Mapping
const ICON_MAP: Record<string, any> = {
    Box, CreditCard, GraduationCap, Heart, Layers, ShoppingBag, Building2, Globe, Cpu, Shield
};

// Theme Styles Mapping (Safe for Tailwind JIT)
const THEME_STYLES: Record<string, { icon: string, bg: string, border: string }> = {
    purple: { icon: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
    yellow: { icon: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' },
    green:  { icon: 'text-green-400',  bg: 'bg-green-500/10',  border: 'border-green-500/20' },
    teal:   { icon: 'text-teal-400',   bg: 'bg-teal-500/10',   border: 'border-teal-500/20' },
    blue:   { icon: 'text-blue-400',   bg: 'bg-blue-500/10',   border: 'border-blue-500/20' },
    orange: { icon: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
    indigo: { icon: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/20' },
    pink:   { icon: 'text-pink-400',   bg: 'bg-pink-500/10',   border: 'border-pink-500/20' },
    red:    { icon: 'text-red-400',    bg: 'bg-red-500/10',    border: 'border-red-500/20' },
};

// Full Default Static Data (Matches Design)
const DEFAULT_CONFIG = {
    title: "Industries",
    description: "We work across high-impact industries, combining deep domain knowledge with cutting-edge design and AI.",
    items: [
      {
        id: "1",
        title: "AI & Machine Learning",
        description: "Designing intuitive interfaces for complex AI systems and NLP products. We bridge human-centered design with technical depth.",
        icon_name: "Cpu",
        theme: "purple"
      },
      {
        id: "2",
        title: "FinTech",
        description: "Our team builds clear, compliant, and conversion-optimized financial experiences—designed to build trust and perform at scale.",
        icon_name: "CreditCard",
        theme: "yellow"
      },
      {
        id: "3",
        title: "EdTech",
        description: "Designing education products for engagement and clarity. We create UX that empowers learning across mobile and LMS platforms.",
        icon_name: "GraduationCap",
        theme: "green"
      },
      {
        id: "4",
        title: "Healthcare",
        description: "Building patient-friendly, compliant, and trustworthy digital experiences. From medtech SaaS to wellness apps.",
        icon_name: "Heart",
        theme: "red"
      },
      {
        id: "5",
        title: "Web3 & Blockchain",
        description: "We design products for decentralized platforms and NFT ecosystems. Focusing on clarity to help Web3 startups launch with confidence.",
        icon_name: "Layers",
        theme: "blue"
      },
      {
        id: "6",
        title: "E-commerce",
        description: "From DTC brands to enterprise platforms, we create seamless shopping experiences that support product discovery and retention.",
        icon_name: "ShoppingBag",
        theme: "orange"
      },
      {
        id: "7",
        title: "Real Estate",
        description: "Designing digital platforms that bring property and people together. Intuitive search and listings for modern real estate.",
        icon_name: "Building2",
        theme: "indigo"
      }
    ]
};

export const Industries: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [config, setConfig] = useState<any>(DEFAULT_CONFIG);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const fetchConfig = async () => {
          try {
              const { data } = await supabase
                  .from('site_settings')
                  .select('value')
                  .eq('key', 'industries_section')
                  .single();
              
              if (data && data.value) {
                  // Merge with defaults to ensure structure
                  setConfig({
                      ...DEFAULT_CONFIG,
                      ...data.value,
                      items: (data.value.items && data.value.items.length > 0) ? data.value.items : DEFAULT_CONFIG.items
                  });
              }
          } catch (err) {
              console.error("Error fetching industries:", err);
          } finally {
              setLoading(false);
          }
      };
      fetchConfig();
  }, []);

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

  // We can render immediately with default config if loading to avoid layout shift, 
  // or show a loader if preferred. Since we have good defaults, we show content.
  
  return (
    <section className="bg-black py-24 border-t border-white/5 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-purple/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">{config.title}</h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              {config.description}
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
          {config.items.map((industry: any, index: number) => {
            const Icon = ICON_MAP[industry.icon_name] || Box;
            const theme = THEME_STYLES[industry.theme] || THEME_STYLES['purple'];

            return (
                <div 
                key={index}
                className={`min-w-[340px] md:min-w-[400px] bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 snap-center hover:border-white/20 hover:bg-[#111] transition-all duration-300 group flex flex-col h-full min-h-[320px] ${loading ? 'animate-pulse' : ''}`}
                >
                <div className={`w-14 h-14 rounded-2xl ${theme.bg} border border-white/5 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-7 h-7 ${theme.icon}`} />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{industry.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                    {industry.description}
                </p>
                </div>
            );
          })}
          {/* Spacer to allow scrolling past the last item */}
          <div className="w-1 shrink-0"></div>
        </div>
      </div>
    </section>
  );
};
