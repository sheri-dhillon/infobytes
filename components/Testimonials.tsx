import React from 'react';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-24 bg-black border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="text-xs font-bold tracking-widest text-brand-text uppercase mb-8">● Testimonial</div>
        <h2 className="text-3xl md:text-5xl font-semibold mb-6">Trusted by forward -<br/>Thinking teams</h2>
        <p className="text-brand-text mb-16 max-w-lg mx-auto">Empowering fast-growing companies with design-driven, AI-powered solutions built for scale.</p>

        <div className="relative max-w-3xl mx-auto bg-[#0a0a0a] border border-white/5 rounded-3xl p-10 flex flex-col md:flex-row items-center gap-8 text-left">
           <div className="relative shrink-0">
             <img 
               src="https://randomuser.me/api/portraits/men/32.jpg" 
               alt="Jonas Berg" 
               className="w-32 h-32 rounded-2xl object-cover border border-white/10"
             />
             <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-bold px-2 py-1 rounded shadow-lg whitespace-nowrap">
                99.8% / &lt; 500ms
             </div>
           </div>
           
           <div>
             <p className="text-lg md:text-xl text-white font-medium italic mb-6">
               "They worked like an internal team — fast, flexible, and always clear. Product delivery felt seamless."
             </p>
             <div>
               <div className="text-white font-bold">Jonas Berg</div>
               <div className="text-xs text-gray-500">Founder, FrameOps</div>
             </div>
           </div>

           <div className="absolute right-8 bottom-8">
             <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center">
                <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
             </div>
           </div>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          <div className="w-2 h-2 rounded-full bg-white"></div>
          <div className="w-2 h-2 rounded-full bg-white/20"></div>
          <div className="w-2 h-2 rounded-full bg-white/20"></div>
          <div className="w-2 h-2 rounded-full bg-white/20"></div>
        </div>
      </div>
    </section>
  );
};