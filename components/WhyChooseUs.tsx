import React from 'react';
import { Zap, Sliders, ShieldCheck, CheckCircle2 } from 'lucide-react';

const benefits = [
  {
    title: "Predictable Revenue Scaling",
    description: "We prioritize outcomes that impact your bottom line. Our agile sprint methodology ensures you see tangible growth in attributed revenue and repeat purchase rates every 14 days.",
    icon: Zap,
    color: "text-brand-orange",
    bg: "bg-brand-orange/10"
  },
  {
    title: "Bespoke Retention Architecture",
    description: "Every automation is custom-architected for your brand's unique customer lifecycle. We don't use generic templates; we build proprietary logic that drives long-term customer loyalty.",
    icon: Sliders,
    color: "text-brand-purple",
    bg: "bg-brand-purple/10"
  },
  {
    title: "Inbox Dominance & Security",
    description: "We build with the future in mind. Our technical setup ensures 99% deliverability and SOC2-compliant data security, protecting your digital assets and brand reputation from day one.",
    icon: ShieldCheck,
    color: "text-green-400",
    bg: "bg-green-500/10"
  }
];

const WHY_CHOOSE_US_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'eCommerce Retention Marketing',
  provider: {
    '@type': 'Organization',
    name: 'INFOBYTES'
  },
  offers: {
    '@type': 'Offer',
    description: 'Custom Klaviyo and Omnisend lifecycle automation designed for ROI and predictable scaling.'
  }
};

export const WhyChooseUs: React.FC = () => {
  return (
    <section className="py-24 md:py-32 bg-[#050505] relative overflow-hidden border-t border-white/5">
      {/* Ambient Background */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-purple/5 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-orange/5 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Column: Image Composition */}
          <div className="relative order-2 lg:order-1">
             {/* Glow Effect */}
             <div className="absolute inset-0 bg-gradient-to-tr from-brand-orange/20 to-brand-purple/20 blur-[60px] rounded-full opacity-60"></div>
             
             {/* Main Image Container */}
             <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10 bg-[#111] shadow-2xl group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10"></div>
                
                <img 
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1000&q=80" 
                  alt="INFOBYTES retention marketing team discussing Klaviyo strategy and eCommerce growth." 
                  className="w-full h-[500px] md:h-[600px] object-cover opacity-90 transition-transform duration-700 group-hover:scale-105" 
                />

                {/* Floating Badge 1 */}
                <div className="absolute bottom-8 left-8 z-20 bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-2xl flex items-center gap-4 animate-fade-in shadow-lg max-w-[260px]">
                   <div className="w-12 h-12 rounded-full bg-brand-orange flex items-center justify-center shrink-0">
                      <CheckCircle2 className="text-white w-6 h-6" />
                   </div>
                   <div>
                      <div className="text-white font-bold text-sm">100% Success Rate</div>
                     <div className="text-gray-300 text-xs mt-1">On ROI & Scale Goals</div>
                   </div>
                </div>

                 {/* Floating Badge 2 */}
                 <div className="absolute top-8 right-8 z-20 bg-black/50 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full flex items-center gap-2 animate-fade-in shadow-lg">
                   <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                   <span className="text-xs font-bold text-white uppercase tracking-wider">Available for Hire</span>
                </div>
             </div>
          </div>

          {/* Right Column: Content */}
          <div className="order-1 lg:order-2">
             <div className="inline-flex items-center gap-2 border border-white/10 bg-white/5 rounded-full px-4 py-1.5 mb-8 backdrop-blur-sm">
                 <span className="text-xs font-bold tracking-widest text-brand-orange uppercase">THE INFOBYTES EDGE</span>
             </div>

             <h2 className="text-[1.6rem] md:text-[2.1rem] lg:text-[2.6rem] font-bold text-white mb-6 leading-[1.1] tracking-tight">
               Why leading brands choose us for growth.
             </h2>

             <p className="text-gray-400 text-lg leading-relaxed mb-12 max-w-lg border-l-2 border-white/10 pl-6">
                We move beyond "vanity metrics." Our framework is built on three pillars that turn email and SMS from simple communication channels into your most profitable revenue streams.
             </p>

             <div className="space-y-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex gap-6 group">
                     <div className={`w-14 h-14 rounded-2xl ${benefit.bg} flex items-center justify-center shrink-0 border border-white/5 group-hover:scale-110 transition-transform duration-300`}>
                        <benefit.icon className={`w-7 h-7 ${benefit.color}`} />
                     </div>
                     <div>
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-brand-orange transition-colors duration-300">
                          {benefit.title}
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                          {benefit.description}
                        </p>
                     </div>
                  </div>
                ))}
             </div>
          </div>

        </div>
      </div>

      <script
        type="application/ld+json"
        id="infobytes-why-choose-us-service-schema"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(WHY_CHOOSE_US_SCHEMA) }}
      />
    </section>
  );
};