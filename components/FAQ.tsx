import React, { useState } from 'react';
import { Plus, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const faqs = [
  {
    q: "How do you bridge the gap between UI/UX and actual revenue?",
    a: "We believe beauty must perform. Our UI/UX process uses behavioral data to map user journeys that lead directly to conversions. When paired with our email automation, we create a closed-loop system that captures, converts, and retains customers.",
    cta: "View Our Case Studies",
    link: "/work"
  },
  {
    q: "Do you build native iOS apps or cross-platform solutions?",
    a: "We specialize in high-performance Native iOS development using Swift and SwiftUI. This ensures your app has the fastest possible response times, seamless integration with Apple’s ecosystem, and a premium \"Apple-level\" feel for your users.",
    cta: "See Our App Portfolio",
    link: "/work"
  },
  {
    q: "Can you integrate email marketing into my existing eCommerce store?",
    a: "Absolutely. We specialize in turning \"stale\" stores into profit engines. We audit your current tech stack (Shopify, Magento, etc.) and deploy sophisticated lifecycle automations—like abandoned cart recovery and post-purchase flows—that drive immediate ROI.",
    cta: "Book a Revenue Audit",
    link: "/contact"
  },
  {
    q: "What is the typical timeline for a full Design-to-Launch project?",
    a: "A custom high-end project typically spans 8 to 12 weeks. This includes deep-dive strategy, UI/UX prototyping, full-stack development, and rigorous QA. We work in agile \"sprints\" so you see tangible progress every two weeks.",
    cta: "Request a Timeline",
    link: "/contact"
  },
  {
    q: "Are your designs \"dev-ready\" if I have my own internal team?",
    a: "Yes. We provide a complete Design System, including component libraries, documentation, and high-fidelity prototypes. Our designs are architected with engineering in mind, ensuring a seamless handover to your developers.",
    cta: "View Design Systems",
    link: "/services"
  },
  {
    q: "Do you provide long-term support after the \"Scale\" phase?",
    a: "We aren't just a vendor; we’re a partner. After launch, we offer optimization packages that include A/B testing for your email flows, monthly UI/UX refinements, and technical scaling to ensure your product grows with your user base.",
    cta: "Explore Support Plans",
    link: "/services"
  }
];

export const FAQ: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <section className="py-24 md:py-32 bg-black relative" id="faq">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20 md:text-center max-w-3xl mx-auto">
          <div className="text-[10px] md:text-xs font-bold tracking-widest text-brand-text uppercase mb-6 border border-white/10 bg-white/5 rounded-full px-4 py-1.5 inline-block backdrop-blur-sm">
            FAQ
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-6 tracking-tight text-white">
            Common questions
          </h2>
          <p className="text-gray-400 text-base md:text-lg">
            Removing the friction between your vision and execution.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Left Column: Questions List */}
          <div className="lg:col-span-5 flex flex-col">
             {faqs.map((item, idx) => {
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

                   <div className={`shrink-0 transition-transform duration-300 ${isActive ? 'rotate-45 text-brand-orange' : 'text-gray-600'}`}>
                     <Plus className="w-5 h-5" />
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

                <div className="relative z-10 animate-fade-in key={activeIndex}">
                   <h3 className="text-2xl font-bold text-white mb-6 leading-tight tracking-wide">{faqs[activeIndex].q}</h3>
                   <div className="h-px w-12 bg-brand-orange mb-8"></div>
                   <p className="text-lg text-gray-300 leading-relaxed font-light tracking-wide">
                      {faqs[activeIndex].a}
                   </p>
                </div>

                <div className="mt-12 relative z-10">
                   <Link to={faqs[activeIndex].link}>
                     <button className="px-8 py-4 rounded-full border border-white/20 text-white font-medium tracking-wide hover:bg-white hover:text-black transition-all duration-300 flex items-center gap-3 group/btn bg-transparent">
                       {faqs[activeIndex].cta}
                       <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                     </button>
                   </Link>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};