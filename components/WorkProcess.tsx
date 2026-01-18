import React from 'react';
import { Sparkles } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: "Discover",
    description: "We get to know your brand, goals, and audience to build a solid foundation.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-12 h-12 md:w-16 md:h-16 text-brand-orange transition-transform duration-500 group-hover:rotate-90">
         <path d="M20 4C22 14 26 18 36 20C26 22 22 26 20 36C18 26 14 22 4 20C14 18 18 14 20 4Z" fill="currentColor" />
         <circle cx="20" cy="20" r="4" fill="white" className="opacity-20" />
      </svg>
    ),
    layout: "text-top"
  },
  {
    id: 2,
    title: "Design",
    description: "We craft visual strategies and intuitive interfaces that align with your vision.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-12 h-12 md:w-16 md:h-16 text-brand-orange transition-transform duration-500 group-hover:scale-110">
         <path d="M14 8C8 12 4 18 4 20C4 22 8 28 14 32" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
         <path d="M26 8C32 12 36 18 36 20C36 22 32 28 26 32" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      </svg>
    ),
    layout: "icon-top"
  },
  {
    id: 3,
    title: "Develop",
    description: "We build scalable, high-performance solutions using modern tech stacks.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-12 h-12 md:w-16 md:h-16 text-brand-orange transition-transform duration-500 group-hover:-translate-x-1">
         <path d="M8 24L16 16L24 24L32 16" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
         <path d="M8 32L20 32" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="opacity-50" />
      </svg>
    ),
    layout: "text-top"
  },
  {
    id: 4,
    title: "Launch",
    description: "We ensure a smooth deployment, market entry, and post-launch optimization.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-12 h-12 md:w-16 md:h-16 text-brand-orange transition-transform duration-500 group-hover:scale-110">
         <circle cx="20" cy="20" r="14" stroke="currentColor" strokeWidth="4" className="opacity-30" />
         <circle cx="20" cy="20" r="6" fill="currentColor" />
         <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="opacity-50 rotate-45" />
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
                  <span className="font-bold uppercase tracking-widest text-xs">Process</span>
               </div>
               <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-[1.1] uppercase tracking-tight">
                 Guiding Lights <br/> of Our Works
               </h2>
            </div>
            <p className="text-gray-400 max-w-sm text-sm md:text-base leading-relaxed text-right md:text-left">
              Our services help you create digital products and solve your problems with objectivity, strategy, technology, and analysis.
            </p>
         </div>

         {/* Grid Section */}
         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step) => (
               <div 
                 key={step.id}
                 className="group bg-[#0a0a0a] border border-white/10 p-8 md:p-10 rounded-3xl flex flex-col justify-between h-[350px] md:h-[400px] hover:bg-[#111] hover:border-white/20 transition-all duration-300 relative overflow-hidden"
               >
                  {/* Subtle Gradient Glow on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                  {step.layout === 'text-top' ? (
                     // Layout: Title Top, Icon Bottom
                     <>
                        <div className="relative z-10">
                           <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">{step.title}</h3>
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
                           <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">{step.title}</h3>
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
