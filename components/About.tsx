import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Button } from './ui/Button';

export const About: React.FC = () => {
  return (
    <section className="py-24 bg-black relative" id="about">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="flex -space-x-2 mb-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-black bg-gray-800 overflow-hidden">
                   <img src={`https://randomuser.me/api/portraits/thumb/men/${i + 10}.jpg`} alt="User" className="w-full h-full object-cover" />
                </div>
              ))}
              <div className="w-8 h-8 rounded-full border-2 border-black bg-gray-800 flex items-center justify-center text-[10px] text-white">
                +150
              </div>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-semibold mb-6 leading-tight">
              Design with Intent.<br />
              Build for Scale.
            </h2>
            <p className="text-brand-text text-lg mb-10 max-w-md">
              We bridge the gap between aesthetic excellence and technical performance. Whether we are architecting a seamless iOS experience or engineering a high-retention email system, our focus is always on your bottom line.
            </p>

            <div className="flex gap-12 mb-10">
              <div>
                <div className="text-3xl font-bold text-white mb-1">$50M+</div>
                <div className="text-sm text-brand-text">In Revenue Generated for Clients</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-1">150+</div>
                <div className="text-sm text-brand-text">Digital Products Launched</div>
              </div>
            </div>

            <Button variant="outline" icon={<ArrowUpRight className="w-4 h-4"/>}>
              Our Methodology
            </Button>
          </div>

          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden glass-card p-2">
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-orange-500/20 mix-blend-overlay"></div>
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80" 
                  alt="Designer working" 
                  className="rounded-xl w-full h-[500px] object-cover opacity-90 hover:scale-105 transition-transform duration-700"
                />
                
                {/* Floating UI Element */}
                <div className="absolute bottom-8 left-8 right-8 glass-card p-4 rounded-xl flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M2 12h20" /></svg>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">Design System</div>
                    <div className="text-xs text-brand-text">Updated just now</div>
                  </div>
                </div>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-10 border-t border-white/5 flex flex-wrap justify-center md:justify-between gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
             {['Circle', 'Goldline', 'Stari', 'Velocity', 'Codecraft'].map((logo) => (
               <div key={logo} className="flex items-center gap-2 text-lg font-semibold">
                 <div className="w-6 h-6 bg-white/20 rounded-full"></div> {logo}
               </div>
             ))}
        </div>
      </div>
    </section>
  );
};