import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { Button } from './ui/Button';

export const Pricing: React.FC = () => {
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      name: "Starter",
      price: "$899",
      desc: "For early SaaS/AI MVPs",
      features: ["4-page custom design", "Starter UI kit access", "Figma prototypes", "Access to design checklist", "Email support"]
    },
    {
      name: "Growth",
      price: "$2,199",
      desc: "For UX & activation teams",
      highlight: true,
      features: ["Home + 4 custom pages", "Foundational UX strategy", "MVP-ready UI design", "Interactive prototypes", "Prompt flows for experiences"]
    },
    {
      name: "Scale",
      price: "$3,999",
      desc: "Multi-product AI/SaaS ready",
      features: ["10 custom product pages", "Mobile & tablet optimization", "Monthly UX reports", "Design sprint access", "AI onboarding flows"]
    },
    {
      name: "Enterprise",
      price: "Custom",
      desc: "For scalable, secure builds",
      features: ["Core includes all", "Dashboard or web app UI", "Design system & reusable", "Product onboarding", "Access to AI/UX specialists"]
    }
  ];

  return (
    <section className="py-24 bg-black border-t border-white/5" id="pricing">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="text-xs font-bold tracking-widest text-brand-text uppercase mb-4">● Pricing Plan</div>
          <h2 className="text-4xl font-semibold mb-4">Flexible Pricing</h2>
          <p className="text-brand-text mb-8">From lean MVPs to enterprise-ready builds, choose a plan that fits your roadmap.</p>
          
          <div className="inline-flex bg-white/5 rounded-full p-1 border border-white/10">
            <button 
              onClick={() => setBilling('monthly')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${billing === 'monthly' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              Monthly
            </button>
            <button 
              onClick={() => setBilling('yearly')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${billing === 'yearly' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              Yearly <span className="text-orange-500 text-xs ml-1">Save 40%</span>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
           {plans.map((plan, idx) => (
             <div key={idx} className={`p-6 rounded-2xl flex flex-col ${plan.highlight ? 'bg-[#1a1a1a] border border-orange-500/50' : 'bg-black border border-white/10'}`}>
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-gray-300 mb-2">{plan.name}</h3>
                  <div className="text-3xl font-bold text-white mb-1">{plan.price}<span className="text-sm font-normal text-gray-500">/mo</span></div>
                  <p className="text-xs text-gray-500">{plan.desc}</p>
                </div>

                <div className="my-6">
                  <Button variant={plan.highlight ? 'primary' : 'outline'} className="w-full justify-center">Get Started</Button>
                </div>
                
                <div className="space-y-3 flex-1">
                   {plan.features.map((feat, i) => (
                     <div key={i} className="flex items-start gap-3 text-xs text-gray-400">
                       <Check className="w-3 h-3 text-orange-500 mt-0.5" />
                       <span>{feat}</span>
                     </div>
                   ))}
                </div>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
};