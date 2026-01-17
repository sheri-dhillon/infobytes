import React from 'react';
import { ArrowRight } from 'lucide-react';

const services = [
  {
    id: "01",
    title: "Digital Marketing",
    description: "Data-driven strategies to boost visibility, engagement, and ROI across all channels.",
    pills: [
      { text: "SEO Ranking", top: "5%", left: "25%", rotate: "-6deg" },
      { text: "Social Campaigns", top: "75%", left: "15%", rotate: "4deg" },
      { text: "Email Flows", top: "20%", left: "45%", rotate: "-3deg" },
      { text: "Growth Analytics", top: "65%", left: "40%", rotate: "8deg" },
    ]
  },
  {
    id: "02",
    title: "Website Design & Development",
    description: "Custom, high-performance websites that tell your story and drive conversions.",
    pills: [
        { text: "React & Next.js", top: "10%", left: "30%", rotate: "5deg" },
        { text: "CMS Integration", top: "70%", left: "10%", rotate: "-4deg" },
        { text: "3D Interaction", top: "15%", left: "5%", rotate: "-6deg" },
        { text: "Responsive", top: "80%", left: "40%", rotate: "3deg" },
    ]
  },
  {
    id: "03",
    title: "UI/UX Design",
    description: "Intuitive, user-centric interfaces designed to delight users and solve complex problems.",
    pills: [
        { text: "Design Systems", top: "5%", left: "20%", rotate: "-5deg" },
        { text: "User Research", top: "85%", left: "15%", rotate: "6deg" },
        { text: "Figma Prototyping", top: "25%", left: "50%", rotate: "-3deg" },
        { text: "Wireframing", top: "65%", left: "45%", rotate: "4deg" },
    ]
  },
  {
    id: "04",
    title: "iOS App Design & Development",
    description: "Native iOS applications crafted for performance, scalability, and seamless user experience.",
    pills: [
        { text: "SwiftUI", top: "15%", left: "10%", rotate: "5deg" },
        { text: "App Store Launch", top: "80%", left: "30%", rotate: "-4deg" },
        { text: "Native Performance", top: "10%", left: "45%", rotate: "-2deg" },
        { text: "User Testing", top: "60%", left: "5%", rotate: "7deg" },
    ]
  }
];

export const Services: React.FC = () => {
  return (
    <section 
      id="services"
      className="py-20 md:py-32 bg-brand-dark relative overflow-hidden border-t border-white/5" 
    >
      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <div className="inline-block px-4 py-1.5 md:px-6 md:py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-[10px] md:text-xs font-bold tracking-widest uppercase mb-6 md:mb-8 text-white">
            Our Services
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-white leading-[1.1] tracking-tight">
            From idea to <span className="font-serif italic text-gray-400">execution</span><br />
            we've got you covered
          </h2>
        </div>

        {/* List */}
        <div className="flex flex-col">
           {services.map((service, idx) => (
             <div 
               key={idx}
               className="group relative flex flex-col md:flex-row items-start md:items-center justify-between py-16 md:py-20 border-t border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer"
             >
                {/* Background Hover Effect for Row (Subtle) */}
                <div className="absolute inset-0 bg-white/5 transition-opacity duration-300 -z-10 opacity-0 group-hover:opacity-100" />

                {/* Floating Pills Overlay */}
                <div className="absolute inset-0 pointer-events-none hidden md:block">
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
                  <span className="text-xs md:text-sm font-mono text-gray-500 font-medium shrink-0">
                    {service.id}
                  </span>
                  <h3 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-medium text-white group-hover:translate-x-4 transition-transform duration-300 leading-tight">
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
             </div>
           ))}
           <div className="border-t border-white/10" />
        </div>

      </div>
    </section>
  );
};