import React from 'react';
import { Zap, Sliders, ShieldCheck, CheckCircle2 } from 'lucide-react';

const benefits = [
  {
    title: "Fast & Reliable Delivery",
    description: "We prioritize timely completion without compromising quality. Our agile sprint methodology ensures you see tangible progress every two weeks.",
    icon: Zap,
    color: "text-brand-orange",
    bg: "bg-brand-orange/10"
  },
  {
    title: "Tailored to Your Needs",
    description: "Every solution is customized to fit your unique goals and challenges. We don't rely on cookie-cutter templates; we architect specifically for your growth.",
    icon: Sliders,
    color: "text-brand-purple",
    bg: "bg-brand-purple/10"
  },
  {
    title: "Enterprise-Grade Security",
    description: "We build with the future in mind. Our code is clean, documented, and secure, ensuring your digital assets are protected and scalable from day one.",
    icon: ShieldCheck,
    color: "text-green-400",
    bg: "bg-green-500/10"
  }
];

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
                  alt="Team collaborating" 
                  className="w-full h-[500px] md:h-[600px] object-cover opacity-90 transition-transform duration-700 group-hover:scale-105" 
                />

                {/* Floating Badge 1 */}
                <div className="absolute bottom-8 left-8 z-20 bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-2xl flex items-center gap-4 animate-fade-in shadow-lg max-w-[260px]">
                   <div className="w-12 h-12 rounded-full bg-brand-orange flex items-center justify-center shrink-0">
                      <CheckCircle2 className="text-white w-6 h-6" />
                   </div>
                   <div>
                      <div className="text-white font-bold text-sm">100% Success Rate</div>
                      <div className="text-gray-300 text-xs mt-1">On deliverability & timelines</div>
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
                 <span className="text-xs font-bold tracking-widest text-brand-orange uppercase">Benefit</span>
             </div>

             <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
               Why Choose <br />
               Our Services?
             </h2>

             <p className="text-gray-400 text-lg leading-relaxed mb-12 max-w-lg border-l-2 border-white/10 pl-6">
                Get high-quality results, faster delivery, and tailored solutions that grow with your business. We focus on value, efficiency, and long-term success for every project.
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
    </section>
  );
};