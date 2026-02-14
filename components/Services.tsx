
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Predefined layouts for pills
const pillLayouts = [
  [
      { top: "5%", left: "25%", rotate: "-6deg" },
      { top: "75%", left: "15%", rotate: "4deg" },
      { top: "20%", left: "45%", rotate: "-3deg" },
      { top: "65%", left: "40%", rotate: "8deg" },
  ],
  [
      { top: "10%", left: "30%", rotate: "5deg" },
      { top: "70%", left: "10%", rotate: "-4deg" },
      { top: "15%", left: "5%", rotate: "-6deg" },
      { top: "80%", left: "40%", rotate: "3deg" },
  ],
  [
      { top: "5%", left: "20%", rotate: "-5deg" },
      { top: "85%", left: "15%", rotate: "6deg" },
      { top: "25%", left: "50%", rotate: "-3deg" },
      { top: "65%", left: "45%", rotate: "4deg" },
  ],
  [
      { top: "15%", left: "10%", rotate: "5deg" },
      { top: "80%", left: "30%", rotate: "-4deg" },
      { top: "10%", left: "45%", rotate: "-2deg" },
      { top: "60%", left: "5%", rotate: "7deg" },
  ]
];

const STATIC_SERVICES = [
    {
    id: "01",
    title: "01. Email Automation Engines",
    slug: "email-automation-engines",
    description: "We move beyond newsletters to build sophisticated, data-driven engines that nurture leads and maximize revenue on autopilot, ensuring the right message hits at the right time.",
    pills: ["Klaviyo Flows", "Abandoned Cart Recovery", "Behavioral Triggers", "Hyper-Segmentation"]
    },
    {
        id: "02",
    title: "02. SMS & Mobile Messaging",
    slug: "sms-mobile-messaging",
    description: "Cut through the noise with personalized, compliant text message campaigns. We drive immediate action and deeply connect with your mobile-first customers where they are most active.",
    pills: ["Omnisend SMS", "98% Open Rates", "TCPA Compliant", "Instant ROI"]
    },
    {
        id: "03",
    title: "03. Platform Migration & Audit",
    slug: "platform-migration-audit",
    description: "Seamlessly move to a top-tier retention platform without losing historical data. We audit, configure, and optimize your technical infrastructure for maximum inbox placement.",
    pills: ["Klaviyo Expert", "Omnisend Partner", "Deliverability Fix", "Data Integrity"]
    },
    {
        id: "04",
    title: "04. Lifecycle Strategy & CRO",
    slug: "lifecycle-strategy-cro",
    description: "A holistic approach to increasing Customer Lifetime Value. We analyze behavioral data to plug leaky funnel buckets and continuously optimize every touchpoint in the customer journey.",
    pills: ["Customer LTV", "A/B Testing", "Journey Mapping", "Zero-Party Data"]
    }
];

export const Services: React.FC = () => {
  const services = STATIC_SERVICES.map((item, index) => {
      const layout = pillLayouts[index % pillLayouts.length];
      const pills = item.pills.map((text, pIdx) => ({
          text,
          ...(layout[pIdx % layout.length] || { top: '50%', left: '50%', rotate: '0deg' })
      }));
      return { ...item, pills };
  });

  return (
    <section 
      id="services"
      className="py-20 md:py-32 bg-brand-dark relative overflow-hidden border-t border-white/5" 
    >
      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <div className="inline-block px-4 py-1.5 md:px-6 md:py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-[10px] md:text-xs font-bold tracking-widest uppercase mb-6 md:mb-8 text-white">
            OUR EXPERTISE
          </div>
          <h2 className="leading-[0.95] tracking-tight text-white">
            <span className="block text-[clamp(2.0rem,3.6vw,4.0rem)] font-serif italic mb-2">
              Turning one-time buyers
            </span>
            <span className="block text-[clamp(2.6rem,5.2vw,5.6rem)] font-black tracking-tighter mix-blend-overlay opacity-90">
              into lifetime value.
            </span>
          </h2>
        </div>

        {/* List */}
        <div className="flex flex-col min-h-[400px]">
           {services.map((service, idx) => (
             <Link 
               to={`/services/${service.slug}`}
               key={idx}
               className="group relative flex flex-col md:flex-row items-start md:items-center justify-between py-16 md:py-20 border-t border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer block"
             >
                {/* Background Hover Effect for Row (Subtle) */}
                <div className="absolute inset-0 bg-white/5 transition-opacity duration-300 -z-10 opacity-0 group-hover:opacity-100" />

                {/* Floating Pills Overlay */}
                <div className="absolute inset-0 pointer-events-none hidden md:block z-20">
                     {service.pills.map((pill, pIdx) => (
                        <div 
                            key={pIdx}
                            className="absolute transition-all duration-500 cubic-bezier(0.34, 1.56, 0.64, 1) opacity-0 group-hover:opacity-100 group-hover:scale-100 scale-50"
                            style={{ 
                                left: pill.left, 
                                top: pill.top,
                                transitionDelay: `${pIdx * 75}ms`
                            }}
                        >
                           <span 
                             className="inline-block px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-200 text-xs md:text-sm font-medium backdrop-blur-md shadow-lg transform hover:scale-110 hover:bg-white/10 transition-all duration-300"
                             style={{ transform: `rotate(${pill.rotate})` }}
                           >
                             {pill.text}
                           </span>
                        </div>
                     ))}
                </div>

                <div className="flex items-baseline gap-6 md:gap-12 lg:gap-16 mb-6 md:mb-0 max-w-full md:max-w-[70%] relative z-10">
                  <h3 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-medium text-white group-hover:translate-x-4 transition-transform duration-300 leading-tight">
                    {service.title}
                  </h3>
                </div>

                <div className="flex items-center gap-6 md:gap-12 md:max-w-xl w-full justify-between md:justify-end pl-10 md:pl-0 relative z-10">
                   {/* Description */}
                   <p className="text-sm text-gray-400 max-w-[250px] md:max-w-xs leading-relaxed hidden md:block opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                     {service.description}
                   </p>
                   <p className="text-sm text-gray-400 max-w-xs leading-relaxed md:hidden">
                     {service.description}
                   </p>

                   <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center shrink-0 bg-black z-20 relative overflow-hidden transition-all duration-300 transform group-hover:-rotate-45 group-hover:border-transparent">
                      <div className="absolute inset-0 bg-gradient-to-r from-brand-orange to-brand-purple opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-white relative z-10" />
                   </div>
                </div>
             </Link>
           ))}
           <div className="border-t border-white/10" />
        </div>

      </div>
    </section>
  );
};
