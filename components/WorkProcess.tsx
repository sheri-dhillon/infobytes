import React from 'react';
import { Sparkles } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: "Deep Audit & Insight",
    hook: "Finding the leaks.",
    description: "We tear apart your current data to find where your revenue is disappearing. We identify high-impact opportunities in your existing traffic and build a technical roadmap to plug the holes from day one.",
    icon: (
      // Magnifying glass with data points - represents auditing/finding insights
      <svg viewBox="0 0 40 40" fill="none" className="w-12 h-12 md:w-16 md:h-16 text-brand-orange transition-transform duration-500 group-hover:scale-110">
         <circle cx="16" cy="16" r="10" stroke="currentColor" strokeWidth="3" fill="none" />
         <path d="M24 24L34 34" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
         <circle cx="12" cy="14" r="2" fill="currentColor" className="opacity-60" />
         <circle cx="18" cy="12" r="2" fill="currentColor" className="opacity-80" />
         <circle cx="16" cy="19" r="2" fill="currentColor" />
      </svg>
    ),
    layout: "text-top"
  },
  {
    id: 2,
    title: "Lifecycle Architecture",
    hook: "Mapping the journey.",
    description: "We don't do \"templates.\" We map out every touchpoint of your customer's journey, building bespoke segmentation and behavioral triggers designed to resonate at every stage of the funnel.",
    icon: (
      // Connected journey path with nodes - represents customer journey mapping
      <svg viewBox="0 0 40 40" fill="none" className="w-12 h-12 md:w-16 md:h-16 text-brand-orange transition-transform duration-500 group-hover:translate-x-1">
         <path d="M4 20H12M20 12V4M20 36V28M28 20H36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="opacity-40" />
         <circle cx="20" cy="20" r="6" fill="currentColor" />
         <circle cx="4" cy="20" r="3" fill="currentColor" className="opacity-60" />
         <circle cx="36" cy="20" r="3" fill="currentColor" className="opacity-60" />
         <circle cx="20" cy="4" r="3" fill="currentColor" className="opacity-60" />
         <circle cx="20" cy="36" r="3" fill="currentColor" className="opacity-60" />
         <path d="M12 12L16 16M24 16L28 12M24 24L28 28M16 24L12 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="opacity-30" />
      </svg>
    ),
    layout: "icon-top"
  },
  {
    id: 3,
    title: "Technical Automation",
    hook: "Building the engine.",
    description: "We build the high-performance engine that fuels your scale. From advanced Klaviyo flows to high-yield SMS sequences, we deploy technical systems that generate revenue while you sleep.",
    icon: (
      // Interlocking gears - represents automation/engine
      <svg viewBox="0 0 40 40" fill="none" className="w-12 h-12 md:w-16 md:h-16 text-brand-orange transition-transform duration-500 group-hover:rotate-180">
         <path d="M14 8L16 4H24L26 8M32 14L36 16V24L32 26M26 32L24 36H16L14 32M8 26L4 24V16L8 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
         <circle cx="20" cy="20" r="8" stroke="currentColor" strokeWidth="3" fill="none" />
         <circle cx="20" cy="20" r="3" fill="currentColor" />
         <path d="M20 12V14M20 26V28M12 20H14M26 20H28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="opacity-60" />
      </svg>
    ),
    layout: "text-top"
  },
  {
    id: 4,
    title: "Iterative Optimization",
    hook: "Scaling the results.",
    description: "A launch is just the starting line. We run continuous A/B tests, cohort analyses, and deliverability audits to ensure your retention stack keeps evolving alongside your brand.",
    icon: (
      // Rising chart with loop arrow - represents continuous optimization/scaling
      <svg viewBox="0 0 40 40" fill="none" className="w-12 h-12 md:w-16 md:h-16 text-brand-orange transition-transform duration-500 group-hover:scale-110">
         <path d="M4 32L14 22L22 28L36 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
         <path d="M28 12H36V20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
         <circle cx="14" cy="22" r="2" fill="currentColor" />
         <circle cx="22" cy="28" r="2" fill="currentColor" />
         <path d="M4 36H36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="opacity-30" />
      </svg>
    ),
    layout: "icon-top"
  }
];

export const WorkProcess: React.FC = () => {
  return (
    <section className="py-24 md:py-32 bg-black relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
         
         {/* Header Section */}
         <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-24 gap-8">
            <div className="max-w-2xl">
               <div className="flex items-center gap-2 text-brand-orange mb-6">
                  <Sparkles className="w-4 h-4" />
                  <span className="font-bold uppercase tracking-widest text-xs">Our Methodology</span>
               </div>
               <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-[1.1] uppercase tracking-tight">
                 The Blueprint for <br/> Compounding Growth.
               </h2>
            </div>
            <p className="text-gray-400 max-w-sm text-sm md:text-base leading-relaxed text-right md:text-left">
              We've traded generic "to-do lists" for a data-driven methodology that turns abandoned carts into loyal advocates and data points into attributed revenue.
            </p>
         </div>

         {/* Grid Section */}
         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step) => (
               <div 
                 key={step.id}
                 className="group bg-[#0a0a0a] border border-white/10 p-8 md:p-10 rounded-3xl flex flex-col justify-between h-[380px] md:h-[430px] hover:bg-[#111] hover:border-white/20 transition-all duration-300 relative overflow-hidden"
               >
                  {/* Subtle Gradient Glow on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                  {step.layout === 'text-top' ? (
                     // Layout: Title Top, Icon Bottom
                     <>
                        <div className="relative z-10">
                           <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{step.title}</h3>
                           <p className="text-brand-orange text-sm font-medium mb-3">{step.hook}</p>
                           <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
                        </div>
                        <div className="relative z-10 self-start mt-auto">
                           {step.icon}
                        </div>
                     </>
                  ) : (
                     // Layout: Icon Top, Title Bottom
                     <>
                        <div className="relative z-10 self-start mb-auto">
                           {step.icon}
                        </div>
                        <div className="relative z-10">
                           <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{step.title}</h3>
                           <p className="text-brand-orange text-sm font-medium mb-3">{step.hook}</p>
                           <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
                        </div>
                     </>
                  )}
               </div>
            ))}
         </div>

      </div>
    </section>
  );
};
