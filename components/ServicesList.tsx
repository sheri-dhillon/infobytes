
import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const STATIC_SERVICES = [
  {
    id: "01",
    title: "Email Automation Engines",
    slug: "email-automation-engines",
    description:
      "We move beyond newsletters to build sophisticated, data-driven engines that nurture leads and maximize revenue on autopilot, ensuring the right message hits at the right time.",
    pills: ["Klaviyo Flows", "Abandoned Cart Recovery", "Behavioral Triggers", "Hyper-Segmentation"],
    image: "https://images.unsplash.com/photo-1557200134-90327ee9fafa?auto=format&fit=crop&w=1200&q=80",
    accent: "text-brand-orange",
  },
  {
    id: "02",
    title: "SMS & Mobile Messaging",
    slug: "sms-mobile-messaging",
    description:
      "Cut through the noise with personalized, compliant text message campaigns. We drive immediate action and deeply connect with your mobile-first customers where they are most active.",
    pills: ["Omnisend SMS", "98% Open Rates", "TCPA Compliant", "Instant ROI"],
    image: "https://images.unsplash.com/photo-1556244573-c3686c0f0f9c?auto=format&fit=crop&w=1200&q=80",
    accent: "text-brand-purple",
  },
  {
    id: "03",
    title: "Platform Migration & Audit",
    slug: "platform-migration-audit",
    description:
      "Seamlessly move to a top-tier retention platform without losing historical data. We audit, configure, and optimize your technical infrastructure for maximum inbox placement.",
    pills: ["Klaviyo Expert", "Omnisend Partner", "Deliverability Fix", "Data Integrity"],
    image: "https://images.unsplash.com/photo-1551808525-51a94da548ce?auto=format&fit=crop&w=1200&q=80",
    accent: "text-brand-orange",
  },
  {
    id: "04",
    title: "Lifecycle Strategy & CRO",
    slug: "lifecycle-strategy-cro",
    description:
      "A holistic approach to increasing Customer Lifetime Value. We analyze behavioral data to plug leaky funnel buckets and continuously optimize every touchpoint in the customer journey.",
    pills: ["Customer LTV", "A/B Testing", "Journey Mapping", "Zero-Party Data"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    accent: "text-brand-purple",
  }
];

export const ServicesList: React.FC = () => {
  return (
    <section className="bg-black relative overflow-hidden pb-40" id="services-detailed">
       {/* Background Grid */}
       <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none"></div>

       <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="mb-20 pt-24 text-center max-w-3xl mx-auto">
             <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-[10px] md:text-xs font-bold tracking-widest uppercase mb-6 text-brand-orange">
               OUR EXPERTISE
             </div>
             <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight leading-[1]">
               Turning one-time buyers <br /> <span className="text-gray-500">into lifetime value.</span>
             </h2>
             <p className="text-gray-400 text-lg leading-relaxed">
               A four-part retention stack built to increase repeat purchases, improve deliverability, and grow LTV through lifecycle automation.
             </p>
          </div>

          <div className="flex flex-col gap-0 min-h-[400px]">
             {STATIC_SERVICES.map((service, idx) => (
                <StickyCard key={idx} index={idx} total={STATIC_SERVICES.length} service={service} />
             ))}
          </div>
       </div>
    </section>
  );
};

const StickyCard: React.FC<{ index: number; total: number; service: any }> = ({ index, total, service }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!cardRef.current || !containerRef.current) return;
      
      const windowHeight = window.innerHeight;
      
      // Adjusted sticky top to stacking context
      const stickyTop = windowHeight * 0.15 + (index * 35); 
      
      const nextCard = containerRef.current.nextElementSibling;
      
      if (nextCard) {
          const nextRect = nextCard.getBoundingClientRect();
          const gap = nextRect.top - stickyTop;
          const threshold = windowHeight * 0.8; 
          
          if (gap < threshold) {
             let progress = 1 - (gap / threshold);
             if (progress < 0) progress = 0;
             if (progress > 1) progress = 1;
             
             const scale = 1 - (progress * 0.08); 
             const brightness = 1 - (progress * 0.4); 
             const yOffset = progress * 20; 
             
             cardRef.current.style.transform = `scale(${scale}) translateY(${yOffset}px)`;
             cardRef.current.style.filter = `brightness(${brightness})`;
          } else {
             cardRef.current.style.transform = `scale(1) translateY(0px)`;
             cardRef.current.style.filter = `brightness(1)`;
          }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); 
    return () => window.removeEventListener('scroll', handleScroll);
  }, [index]);

  return (
    <div 
        ref={containerRef}
        className="sticky w-full"
        style={{ 
            top: `calc(15vh + ${index * 35}px)`,
            marginBottom: index === total - 1 ? '10vh' : '5vh',
            zIndex: index
        }}
    >
       <div 
         ref={cardRef}
         className="relative w-full bg-[#0a0a0a] rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl transition-all duration-100 ease-linear origin-top group hover:border-white/15"
         style={{
            height: '450px', 
            willChange: 'transform, filter'
         }}
       >
          <Link
            to={service.slug ? `/services/${service.slug}` : '/contact'}
            className="absolute inset-0 z-30"
            aria-label={service.slug ? `View ${service.title}` : 'Contact INFOBYTES'}
          />
          <div className="flex flex-col md:flex-row h-full">
              
              {/* Left Content Area - Solid Background */}
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-between relative z-20 bg-[#0a0a0a]">
                  <div>
                      <div className="flex items-center justify-between mb-6">
                          <div className={`text-xs font-bold tracking-widest uppercase ${service.accent} bg-white/5 px-3 py-1 rounded-full border border-white/5`}>
                              {service.id} — Service
                          </div>
                      </div>

                      <h3 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight tracking-tight">
                          {service.title}
                      </h3>
                      
                      <p className="text-gray-400 text-base leading-relaxed max-w-md mb-8">
                          {service.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                          {Array.isArray(service.pills) && service.pills.map((tag: string, tIdx: number) => (
                              tag && (
                                <span key={tIdx} className="px-4 py-2 rounded-full border border-white/10 text-xs font-bold text-gray-400 bg-white/5 hover:bg-white/10 transition-colors">
                                    {tag}
                                </span>
                              )
                          ))}
                      </div>
                  </div>
              </div>

              {/* Right Image Area - With Feather Gradient */}
              <div className="flex-1 relative h-full overflow-hidden bg-[#0a0a0a]">
                  {/* Image */}
                  <img 
                      src={service.image || "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80"} 
                      alt={service.title} 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                  />
                  
                  {/* The "Feather" Effect: Gradient from Left Background to Transparent */}
                  <div className="absolute inset-y-0 left-0 w-32 md:w-64 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/90 to-transparent z-10 pointer-events-none"></div>

                  {/* Top/Bottom subtle fades for better integration */}
                  <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#0a0a0a]/50 to-transparent pointer-events-none z-10"></div>
                  <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0a0a0a]/50 to-transparent pointer-events-none z-10"></div>
              </div>
          </div>
       </div>
    </div>
  );
};
