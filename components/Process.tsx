import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

const steps = [
  {
    id: "01.",
    title: "DISCOVERY & STRATEGY",
    description: "We listen first. Through audits, workshops, and competitor analysis, we uncover opportunities.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "02.",
    title: "CREATIVE & EXECUTION",
    description: "Our team designs and develops tailored campaigns and assets that cut through the noise.",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "03.",
    title: "PUBLISH, PROMOTE & SCALE",
    description: "We publish to your CMS, distribute across relevant channels, and refine the strategy monthly based on performance data.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "04.",
    title: "ANALYSIS & REPORTING",
    description: "We utilize advanced analytics to track performance and optimize your campaigns for maximum ROI.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
  }
];

export const Process: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="py-32 bg-black relative border-t border-white/5" id="process">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-24">
           <div className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-4">Working Process</div>
           <h2 className="text-5xl md:text-7xl font-bold text-white uppercase mb-6 tracking-tight">
             OUR WORKING PROCESS
           </h2>
           <p className="text-gray-400 max-w-xl mx-auto text-lg">
             Full-funnel strategies. Top-tier execution. And We blend creativity with performance.
           </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
           
           {/* Left Column: Steps List */}
           <div className="flex flex-col gap-8">
              {steps.map((step, idx) => (
                <div 
                  key={idx}
                  className={`group cursor-pointer transition-all duration-500 py-6 border-b border-white/5 ${activeStep === idx ? 'opacity-100' : 'opacity-40 hover:opacity-70'}`}
                  onMouseEnter={() => setActiveStep(idx)}
                  onClick={() => setActiveStep(idx)}
                >
                   <div className="flex gap-6 md:gap-10">
                      <span className="text-xl font-mono text-gray-500 pt-1">{step.id}</span>
                      <div className="space-y-4">
                         <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-white transition-colors">
                           {step.title}
                         </h3>
                         <div className={`grid transition-all duration-500 ease-in-out ${activeStep === idx ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                           <p className="overflow-hidden text-gray-400 leading-relaxed text-lg">
                             {step.description}
                           </p>
                         </div>
                      </div>
                   </div>
                </div>
              ))}
           </div>

           {/* Right Column: Sticky Image */}
           <div className="relative lg:h-[600px] sticky top-32 hidden lg:block">
              {steps.map((step, idx) => (
                <div 
                  key={idx}
                  className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${
                    activeStep === idx 
                      ? 'opacity-100 translate-y-0 scale-100' 
                      : 'opacity-0 translate-y-8 scale-95'
                  }`}
                >
                   <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl border border-white/10 group">
                      <div className="absolute inset-0 bg-blue-500/10 mix-blend-overlay z-10"></div>
                      <img 
                        src={step.image} 
                        alt={step.title} 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                      />
                      
                      {/* Floating UI Element Badge */}
                      <div className="absolute bottom-8 right-8 bg-white text-black px-6 py-2 rounded-full font-bold text-sm flex items-center gap-2 z-20 shadow-lg transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                        Menu <div className="bg-black text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">+</div>
                      </div>
                   </div>
                </div>
              ))}
           </div>
           
           {/* Mobile Image (Visible only on mobile, shows active step image) */}
           <div className="lg:hidden w-full h-[300px] rounded-2xl overflow-hidden relative border border-white/10">
               <img 
                 src={steps[activeStep].image} 
                 alt={steps[activeStep].title}
                 className="w-full h-full object-cover"
               />
           </div>

        </div>

      </div>
    </section>
  );
};