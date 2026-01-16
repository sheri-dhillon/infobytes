import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black pt-24 pb-12 relative overflow-hidden">
      {/* Bottom Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-t from-purple-900/30 to-transparent blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
           <div className="text-xs text-gray-500 mb-4">● We have AI + Product Agencies</div>
           <h2 className="text-5xl md:text-7xl font-semibold mb-6 tracking-tight">Get started for free</h2>
           <p className="text-gray-400 max-w-lg mx-auto mb-10">From idea to investment, MVP to market — we adapt to your goals and build around what your product truly needs.</p>
           
           <div className="flex justify-center items-center gap-4">
             <button className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-gray-200 transition-colors">Get Started</button>
             <button className="bg-white/10 border border-white/10 text-white px-8 py-3 rounded-full font-medium hover:bg-white/20 transition-colors">Explore Pricing Plan</button>
           </div>
           
           <div className="mt-6 text-xs text-purple-400 flex justify-center items-center gap-2">
             <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse"></span>
             Got a concept? Let's design it right.
           </div>
        </div>

        <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center gap-8 text-xs text-gray-500">
          <div className="flex items-center gap-2 text-white text-xl font-bold opacity-50">
             <div className="w-6 h-6 rounded-full bg-orange-500"></div> soale
          </div>
          
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">Facebook</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-white transition-colors">X</a>
          </div>

          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">About Us</a>
            <a href="#" className="hover:text-white transition-colors">Work</a>
            <a href="#" className="hover:text-white transition-colors">Services</a>
            <a href="#" className="hover:text-white transition-colors">Pricing</a>
            <a href="#" className="hover:text-white transition-colors">Blog</a>
          </div>

          <div>
             © 2025 Soale Agency. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};