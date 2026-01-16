import React, { useState } from 'react';
import { Plus, Minus, ArrowRight } from 'lucide-react';
import { Button } from './ui/Button';

const faqs = [
  { 
    q: "What types of clients do you work with?", 
    a: "We partner with ambitious startups, scaling SaaS companies, and forward-thinking enterprises that value design as a competitive advantage. Our sweet spot is working with founders who want to move fast without compromising on quality." 
  },
  { 
    q: "Can we start with a single page or smaller scope?", 
    a: "Absolutely. We often start with a Homepage revamp or a specific product flow to demonstrate value. This allows us to align on style and process before committing to a larger partnership." 
  },
  { 
    q: "How fast can you deliver?", 
    a: "Speed is our core strength. Most landing pages are delivered in 5-7 days, and full MVPs in 4-6 weeks. We work in sprints to ensure you have shippable assets at the end of every week." 
  },
  { 
    q: "Do you handle development too?", 
    a: "While our primary focus is world-class design, we have a network of trusted development partners (Webflow & React experts) we collaborate with to bring these designs to life pixel-perfectly." 
  },
  { 
    q: "Are your designs dev-ready?", 
    a: "Yes. We pride ourselves on engineering-grade design files. You receive a comprehensive design system, documented states, responsive layouts, and assets optimized for development handover." 
  }
];

export const FAQ: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <section className="py-24 bg-black relative" id="faq">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 md:text-center max-w-3xl mx-auto">
          <div className="text-xs font-bold tracking-widest text-brand-text uppercase mb-4">● FAQ</div>
          <h2 className="text-4xl md:text-5xl font-semibold mb-6">Common questions</h2>
          <p className="text-brand-text">Everything you need to know about how we work, our process, and what to expect.</p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          {/* Left Column: Questions List */}
          <div className="lg:col-span-7 flex flex-col gap-3">
             {faqs.map((item, idx) => {
               const isActive = activeIndex === idx;
               return (
                 <button 
                   key={idx}
                   onClick={() => setActiveIndex(idx)}
                   className={`w-full flex items-center justify-between p-6 rounded-full transition-all duration-300 group text-left ${
                     isActive 
                       ? 'bg-white text-black scale-[1.02] shadow-xl' 
                       : 'bg-[#0a0a0a] text-gray-400 hover:bg-[#151515] border border-white/5'
                   }`}
                 >
                   <span className={`text-lg font-medium pr-8 ${isActive ? 'font-semibold' : ''}`}>{item.q}</span>
                   <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                     isActive ? 'bg-black text-white' : 'bg-white/10 text-gray-400'
                   }`}>
                     {isActive ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                   </div>
                 </button>
               );
             })}
          </div>

          {/* Right Column: Answer Box */}
          <div className="lg:col-span-5 sticky top-32">
             <div className="bg-[#111] border border-white/10 p-10 rounded-[2rem] relative overflow-hidden h-full min-h-[400px] flex flex-col justify-center shadow-2xl">
                {/* Decorative background element */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[80px] -mr-32 -mt-32 pointer-events-none"></div>
                
                <h3 className="text-3xl font-bold text-white mb-8 relative z-10">Question Answer:</h3>
                
                <div className="relative z-10 flex-grow">
                  <p key={activeIndex} className="text-lg text-gray-300 leading-relaxed animate-fade-in">
                    {faqs[activeIndex].a}
                  </p>
                </div>

                <div className="mt-12 relative z-10 pt-8 border-t border-white/5">
                   <Button variant="secondary" className="group w-auto" onClick={() => window.location.href='#about'}>
                     More About Us <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                   </Button>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};