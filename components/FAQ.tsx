import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  { q: "What types of clients do you work with?", a: "We work with SaaS startups, AI tech companies, and forward-thinking enterprises." },
  { q: "Can we start with a single page or smaller scope?", a: "Yes, we offer flexible engagement models tailored to your specific needs." },
  { q: "How fast can you deliver?", a: "Most MVP projects are delivered within 4-6 weeks depending on complexity." },
  { q: "Do you handle development too?", a: "We primarily focus on design but have trusted partners for development." },
  { q: "Are your designs dev-ready?", a: "Absolutely. We provide pixel-perfect Figma files with full documentation." }
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16">
        <div>
          <h2 className="text-4xl font-semibold mb-6">Frequently Asked<br/>Questions</h2>
          <p className="text-brand-text">We've heard it all. Here's everything you need to know before working with us.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((item, idx) => (
            <div 
              key={idx} 
              className="border border-white/5 rounded-xl bg-[#0a0a0a] overflow-hidden transition-all"
            >
              <button 
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
              >
                <span className="font-medium text-sm md:text-base text-gray-200">{item.q}</span>
                {openIndex === idx ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
              </button>
              
              {openIndex === idx && (
                 <div className="px-6 pb-6 text-sm text-gray-400 animate-in slide-in-from-top-2">
                   {item.a}
                 </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};