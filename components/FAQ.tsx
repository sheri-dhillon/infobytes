
import React, { useState } from 'react';
import { Plus, Minus, ArrowRight, ChevronDown, ChevronUp, ArrowDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const STATIC_FAQ = {
    title: "Common questions",
    subtitle: "Removing the friction between your vision and execution.",
    icon_style: "plus_minus",
    items: [
        {
            q: "How do you bridge the gap between UI/UX and actual revenue?",
            a: "We believe beauty must perform. Our UI/UX process uses behavioral data to map user journeys that lead directly to conversions. When paired with our email automation, we create a closed-loop system that captures, converts, and retains customers.",
            cta: "View Our Case Studies",
            link: "/work"
        },
        {
            q: "Do you build native iOS apps or cross-platform solutions?",
            a: "We specialize in high-performance Native iOS development using Swift and SwiftUI. This ensures your app has the fastest possible response times, seamless integration with Apple’s ecosystem, and a premium 'Apple-level' feel.",
            cta: "See Our App Portfolio",
            link: "/work"
        },
        {
            q: "What is the typical timeline for a full Design-to-Launch project?",
            a: "A custom high-end project typically spans 8 to 12 weeks. This includes deep-dive strategy, UI/UX prototyping, full-stack development, and rigorous QA. We work in agile 'sprints' so you see tangible progress every two weeks.",
            cta: "Request a Timeline",
            link: "/contact"
        }
    ]
};

export const FAQ: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  // Icon Resolver
  const getIcons = (isOpen: boolean) => {
      switch(STATIC_FAQ.icon_style) {
          case 'chevron':
              return isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />;
          case 'arrow':
              return isOpen ? <ArrowDown className="w-5 h-5 text-brand-orange" /> : <ArrowRight className="w-5 h-5" />;
          case 'plus_minus':
          default:
              return isOpen ? <Minus className="w-5 h-5 text-brand-orange" /> : <Plus className="w-5 h-5" />;
      }
  };

  return (
    <section className="py-24 md:py-32 bg-black relative" id="faq">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20 md:text-center max-w-3xl mx-auto">
          <div className="text-[10px] md:text-xs font-bold tracking-widest text-brand-text uppercase mb-6 border border-white/10 bg-white/5 rounded-full px-4 py-1.5 inline-block backdrop-blur-sm">
            FAQ
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-6 tracking-tight text-white">
            {STATIC_FAQ.title}
          </h2>
          <p className="text-gray-400 text-base md:text-lg">
            {STATIC_FAQ.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Left Column: Questions List */}
          <div className="lg:col-span-5 flex flex-col">
             {STATIC_FAQ.items.map((item: any, idx: number) => {
               const isActive = activeIndex === idx;
               return (
                 <button 
                   key={idx}
                   onClick={() => setActiveIndex(idx)}
                   className={`w-full flex items-center justify-between py-6 group text-left transition-all duration-300 relative border-b border-white/5 hover:border-white/20`}
                 >
                   <span className={`text-lg md:text-xl pr-8 transition-colors duration-300 font-medium tracking-wide ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'}`}>
                     {item.q}
                   </span>
                   
                   {/* Neon underline effect for active state */}
                   {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-[1px] bg-brand-orange shadow-[0_0_15px_rgba(255,107,74,0.8)] animate-fade-in"></span>
                   )}

                   <div className={`shrink-0 transition-transform duration-300 ${isActive ? 'rotate-0' : 'text-gray-600'}`}>
                     {getIcons(isActive)}
                   </div>
                 </button>
               );
             })}
          </div>

          {/* Right Column: Answer Box */}
          <div className="lg:col-span-7 sticky top-32">
             <div className="bg-white/[0.02] backdrop-blur-2xl border border-white/10 p-10 md:p-14 rounded-[2rem] relative overflow-hidden min-h-[450px] flex flex-col justify-between group">
                
                {/* Large Background Number */}
                <div className="absolute -top-6 right-6 text-[12rem] font-bold text-white opacity-[0.03] pointer-events-none select-none font-sans leading-none">
                  {`0${activeIndex + 1}`}
                </div>
                
                {/* Decorative Mesh */}
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-brand-purple/5 to-transparent pointer-events-none"></div>

                {STATIC_FAQ.items[activeIndex] && (
                    <div className="relative z-10 animate-fade-in key={activeIndex}">
                        <h3 className="text-2xl font-bold text-white mb-6 leading-tight tracking-wide">{STATIC_FAQ.items[activeIndex].q}</h3>
                        <div className="h-px w-12 bg-brand-orange mb-8"></div>
                        <p className="text-lg text-gray-300 leading-relaxed font-light tracking-wide">
                            {STATIC_FAQ.items[activeIndex].a}
                        </p>
                    </div>
                )}

                {STATIC_FAQ.items[activeIndex]?.cta && (
                    <div className="mt-12 relative z-10">
                    <Link to={STATIC_FAQ.items[activeIndex].link || '#'}>
                        <button className="px-8 py-4 rounded-full border border-white/20 text-white font-medium tracking-wide hover:bg-white hover:text-black transition-all duration-300 flex items-center gap-3 group/btn bg-transparent">
                        {STATIC_FAQ.items[activeIndex].cta}
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                    </Link>
                    </div>
                )}
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};
