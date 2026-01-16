import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Button } from './ui/Button';

export const Pricing: React.FC = () => {
  const plans = [
    {
      name: "STARTER PLAN",
      description: "Perfect for early-stage brands or one-off projects",
      price: "5,000",
      features: [
        "Brand audit & strategy session",
        "3-page custom website",
        "Basic SEO setup",
        "2 rounds of revisions"
      ]
    },
    {
      name: "GROWTH PLAN",
      description: "Built for growing teams ready to scale faster",
      price: "15,000",
      highlight: true,
      features: [
        "Full brand identity system",
        "SEO + content optimization",
        "Email automation setup",
        "Priority support"
      ]
    },
    {
      name: "CUSTOM PLAN",
      description: "For enterprise clients or large-scale campaigns",
      price: "LET'S TALK",
      customPrice: true,
      features: [
        "Full-funnel marketing strategy",
        "Dedicated account team",
        "Ongoing growth campaigns",
        "Brand workshops"
      ]
    }
  ];

  return (
    <section className="py-32 bg-black border-t border-white/5" id="pricing">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <div className="text-xs font-bold tracking-widest text-brand-text uppercase mb-4">● Pricing Plans</div>
          <h2 className="text-4xl md:text-5xl font-semibold text-white mb-6">Transparent Pricing</h2>
          <p className="text-brand-text max-w-lg mx-auto">
            Choose the perfect plan for your business needs. Simple monthly pricing with no hidden fees.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
           {plans.map((plan, idx) => (
             <div 
               key={idx} 
               className={`relative flex flex-col p-8 rounded-[2rem] transition-all duration-300 group ${
                 plan.highlight 
                   ? 'bg-[#111] border border-orange-500/50 shadow-[0_0_50px_rgba(255,107,74,0.1)]' 
                   : 'bg-[#050505] border border-white/10 hover:border-white/20'
               }`}
             >
                {/* Highlight Gradient Top */}
                {plan.highlight && (
                    <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-orange-500/10 to-transparent rounded-t-[2rem] pointer-events-none"></div>
                )}

                <div className="relative z-10 flex flex-col h-full">
                    {/* Header */}
                    <h3 className="text-xl font-bold text-white uppercase mb-3 tracking-wide">{plan.name}</h3>
                    <p className="text-gray-400 text-sm mb-8 leading-relaxed min-h-[40px]">{plan.description}</p>
                    
                    {/* Price & CTA Box */}
                    <div className={`rounded-2xl p-6 mb-8 border transition-colors duration-300 ${
                        plan.highlight 
                            ? 'bg-white border-white' 
                            : 'bg-white/5 border-white/5 group-hover:border-white/10'
                    }`}>
                       <div className="flex items-start justify-between mb-6">
                          {plan.customPrice ? (
                              <span className={`text-3xl font-bold tracking-tight ${plan.highlight ? 'text-black' : 'text-white'}`}>
                                  LET'S TALK
                              </span>
                          ) : (
                              <div className="flex items-start gap-1">
                                <span className={`text-xl font-bold mt-1 ${plan.highlight ? 'text-black' : 'text-gray-400'}`}>$</span>
                                <span className={`text-5xl font-bold tracking-tight ${plan.highlight ? 'text-black' : 'text-white'}`}>{plan.price}</span>
                              </div>
                          )}
                          
                          {!plan.customPrice && (
                             <div className={`text-[10px] font-bold uppercase tracking-wider mt-2 ${plan.highlight ? 'text-gray-500' : 'text-gray-500'}`}>
                                USD/<br/>month
                             </div>
                          )}
                       </div>
    
                       <button className={`w-full py-3.5 rounded-full text-sm font-bold transition-all duration-300 ${
                           plan.highlight 
                             ? 'bg-black text-white hover:bg-gray-800 shadow-lg' 
                             : 'bg-white/10 text-white hover:bg-white hover:text-black'
                       }`}>
                           Get Started Now
                       </button>
                    </div>
    
                    {/* Features List */}
                    <div className="space-y-4 flex-1">
                       {plan.features.map((feat, i) => (
                         <div key={i} className="flex items-start gap-3">
                           <CheckCircle2 className={`w-5 h-5 shrink-0 mt-0.5 ${plan.highlight ? 'text-orange-500' : 'text-gray-600'}`} />
                           <span className="text-sm text-gray-300 leading-snug">{feat}</span>
                         </div>
                       ))}
                    </div>
                </div>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
};