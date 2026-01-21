import React from 'react';
import { Check } from 'lucide-react';

export const Pricing: React.FC = () => {
  const plans = [
    {
      name: "The Launchpad",
      tagline: "Design Focus",
      description: "Best for early-stage brands needing a world-class foundation.",
      price: "5,000",
      features: [
        "Premium UI/UX Strategy & Wireframing",
        "High-Performance Custom Website (Up to 5 Pages)",
        "Foundational SEO & Speed Optimization",
        "Brand Style Guide & Component Library",
        "2 Rounds of High-Fidelity Revisions"
      ]
    },
    {
      name: "The Accelerator",
      tagline: "Development & Email Focus",
      description: "Our most popular plan for scaling eCommerce and Mobile products.",
      price: "12,500",
      highlight: true,
      features: [
        "iOS App Development (Native Swift/SwiftUI)",
        "Advanced eCommerce Optimization",
        "Revenue-Generating Email Marketing",
        "Comprehensive Lead Capture Systems",
        "Priority Engineering Support & Weekly Sprints"
      ]
    },
    {
      name: "The Enterprise",
      tagline: "Scale Focus",
      description: "A full-cycle partnership for global market dominance.",
      price: "Custom Quote",
      customPrice: true,
      features: [
        "Full-Funnel Email Marketing & Retention",
        "Cross-Platform Development (iOS + Web + Backend)",
        "Dedicated Project Manager & Senior Architect",
        "Quarterly Brand Workshops & Competitor Audits",
        "Continuous A/B Testing & Lifecycle Optimization"
      ]
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-[#050505] relative overflow-hidden" id="pricing">
      {/* Background Mesh Gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-gradient-to-tr from-brand-purple/10 via-brand-orange/5 to-transparent blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20 md:mb-24 max-w-4xl mx-auto">
          <div className="text-[10px] md:text-xs font-bold tracking-widest text-brand-text uppercase mb-6 border border-white/10 bg-white/5 rounded-full px-4 py-1.5 inline-block backdrop-blur-sm">
             Pricing Strategy
          </div>
          <h2 className="text-4xl md:text-6xl font-semibold text-white mb-6 tracking-tight">
            Investment in <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Unstoppable Growth.</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Transparent pricing designed for brands ready to transition from "business as usual" to digital market leaders. No hidden fees, just pure performance.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
           {plans.map((plan, idx) => (
             <div key={idx} className="h-full">
               {plan.highlight ? (
                 // Highlighted Card with Gradient Border Wrapper
                 <div className="h-full relative p-[1px] rounded-[2rem] bg-gradient-to-b from-brand-orange to-brand-purple shadow-[0_0_40px_rgba(185,109,243,0.15)] transition-transform duration-300 hover:scale-[1.01]">
                    <div className="h-full flex flex-col p-8 md:p-10 rounded-[2rem] bg-[#080808]/90 backdrop-blur-xl relative overflow-hidden">
                       <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                       <CardContent plan={plan} />
                    </div>
                 </div>
               ) : (
                 // Standard Glass Card
                 <div className="h-full flex flex-col p-8 md:p-10 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all duration-300 backdrop-blur-md">
                    <CardContent plan={plan} />
                 </div>
               )}
             </div>
           ))}
        </div>
      </div>
    </section>
  );
};

const CardContent: React.FC<{ plan: any }> = ({ plan }) => (
  <>
    <div className="mb-8">
        <div className={`text-xs font-bold tracking-wider uppercase mb-3 ${plan.highlight ? 'text-brand-orange' : 'text-gray-500'}`}>
          {plan.tagline}
        </div>
        <h3 className="text-2xl font-bold text-white mb-4">{plan.name}</h3>
        <p className="text-gray-400 text-sm leading-relaxed min-h-[40px]">{plan.description}</p>
    </div>

    <div className="mb-10 pb-8 border-b border-white/5">
        {plan.customPrice ? (
            <div className="text-3xl md:text-4xl font-bold text-white tracking-tight py-1">
                Custom Quote
            </div>
        ) : (
            <div className="flex items-baseline gap-1">
                <span className="text-xl text-gray-500 font-medium">$</span>
                <span className="text-4xl md:text-5xl font-bold text-white tracking-tight">{plan.price}</span>
                <span className="text-sm text-gray-500 font-medium ml-2">/ month</span>
            </div>
        )}
    </div>

    <div className="space-y-5 mb-12 flex-1">
        {plan.features.map((feat: string, i: number) => (
            <div key={i} className="flex items-start gap-4 group/item">
            <div className={`mt-0.5 flex items-center justify-center w-5 h-5 rounded-full shrink-0 ${plan.highlight ? 'bg-white text-black' : 'bg-white/10 text-gray-400'}`}>
                <Check className="w-3 h-3" strokeWidth={3} />
            </div>
            <span className={`text-sm leading-snug transition-colors ${plan.highlight ? 'text-gray-300 group-hover/item:text-white' : 'text-gray-400 group-hover/item:text-gray-200'}`}>
                {feat}
            </span>
            </div>
        ))}
    </div>

    <button 
        className={`w-full py-4 rounded-full text-sm font-bold tracking-wide transition-all duration-300 ${
        plan.highlight 
            ? 'bg-white text-black hover:bg-gray-200 shadow-lg shadow-white/5' 
            : 'bg-transparent border border-white/10 text-white hover:bg-white hover:text-black'
        }`}
    >
        Get Started
    </button>
  </>
);