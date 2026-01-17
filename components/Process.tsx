import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

const steps = [
  {
    id: "01.",
    title: "Strategic Blueprinting",
    description: "We don’t start with a canvas; we start with your data. We audit your current ecosystem to identify \"revenue leaks\" in your funnel and map out a high-conversion architecture for your iOS app or eCommerce store.",
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "02.",
    title: "Engineering & UI/UX Fusion",
    description: "This is where performance meets aesthetics. Our team builds intuitive, friction-free interfaces for iOS and Web, ensuring your product doesn't just look world-class—it feels effortless to use.",
    image: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "03.",
    title: "The Growth Engine Launch",
    description: "Launching is just the beginning. We deploy your digital assets and immediately ignite your email marketing automation. We focus on capturing every lead and turning new visitors into repeat buyers from day one.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "04.",
    title: "Perpetual Optimization",
    description: "We don't \"set it and forget it.\" Through deep analysis and behavioral tracking, we refine your UI and email flows based on real user data, ensuring your brand continues to scale and outpace the competition.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
  }
];

export const Process: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="py-20 md:py-32 bg-black relative border-t border-white/5" id="process">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
           <div className="text-[10px] md:text-xs font-bold tracking-widest text-gray-500 uppercase mb-4">Working Process</div>
           <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
             From Blueprint to Benchmark.
           </h2>
           <p className="text-gray-400 max-w-xl mx-auto text-base md:text-lg">
             We’ve distilled our years of experience into a four-phase framework designed to eliminate guesswork and maximize ROI.
           </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
           
           {/* Left Column: Steps List */}
           <div className="flex flex-col gap-6 md:gap-8">
              {steps.map((step, idx) => (
                <div 
                  key={idx}
                  className={`group cursor-pointer transition-all duration-500 py-4 md:py-6 border-b border-white/5 ${activeStep === idx ? 'opacity-100' : 'opacity-40 hover:opacity-70'}`}
                  onMouseEnter={() => setActiveStep(idx)}
                  onClick={() => setActiveStep(idx)}
                >
                   <div className="flex gap-4 md:gap-10">
                      <span className="text-lg md:text-xl font-mono text-gray-500 pt-1 shrink-0">{step.id}</span>
                      <div className="space-y-2 md:space-y-4">
                         <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white group-hover:text-white transition-colors leading-tight">
                           {step.title}
                         </h3>
                         <div className={`grid transition-all duration-500 ease-in-out ${activeStep === idx ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                           <p className="overflow-hidden text-gray-400 leading-relaxed text-sm md:text-lg">
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
                        View Phase <div className="bg-black text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">+</div>
                      </div>
                   </div>
                </div>
              ))}
           </div>
           
           {/* Mobile Image (Visible only on mobile, shows active step image) */}
           <div className="lg:hidden w-full h-[250px] md:h-[350px] rounded-2xl overflow-hidden relative border border-white/10 mt-4">
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