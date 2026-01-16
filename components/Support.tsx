import React from 'react';
import { Download, CheckCircle, ArrowUpRight } from 'lucide-react';

export const Support: React.FC = () => {
  return (
    <section className="py-24 bg-brand-dark">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-semibold mb-4">Your success, supported</h2>
          <p className="text-brand-text max-w-lg mx-auto">
            Quick responses, thoughtful revisions, and flexible post-launch care built for modern teams.
          </p>
        </div>

        <div className="grid md:grid-cols-12 gap-6">
          
          {/* Card 1: Image */}
          <div className="md:col-span-4 relative group overflow-hidden rounded-3xl h-[400px]">
             <img 
               src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80" 
               alt="Support" 
               className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8">
               <div className="flex items-center justify-between mb-2">
                 <h3 className="text-white font-semibold">24/7 Priority Response</h3>
                 <ArrowUpRight className="text-white w-5 h-5" />
               </div>
               <p className="text-sm text-gray-300">Urgent updates handled fast. Priority requests completed within 24H.</p>
             </div>
          </div>

          {/* Card 2: Brand Kit */}
          <div className="md:col-span-3 bg-[#111] border border-white/5 rounded-3xl p-8 flex flex-col justify-between h-[400px] relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-32 bg-orange-500/10 rounded-full blur-3xl -mr-16 -mt-16 transition-all group-hover:bg-orange-500/20"></div>
             
             <div className="relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-orange-900/20">
                   <Download className="text-white w-7 h-7" />
                </div>
                <div className="bg-white/5 rounded-lg p-2 w-max mb-4 rotate-3 border border-white/10">
                  <div className="w-8 h-8 rounded-full bg-green-400/20"></div>
                </div>
             </div>

             <div className="relative z-10">
                <h3 className="text-xl font-semibold mb-2">Download Your Brand Kit</h3>
                <p className="text-sm text-brand-text mb-6">Access all design assets in one click — fonts, color codes, social templates & more.</p>
                <button className="w-full py-3 bg-white text-black rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors">Download Toolkit</button>
             </div>
          </div>

          {/* Card 3: Checklist */}
          <div className="md:col-span-5 bg-[#111] border border-white/5 rounded-3xl p-8 h-[400px] relative overflow-hidden">
             <div className="absolute top-4 right-4 flex -space-x-2">
                 {[1,2,3].map(i => (
                    <img key={i} src={`https://randomuser.me/api/portraits/thumb/women/${i+20}.jpg`} className="w-8 h-8 rounded-full border-2 border-black" alt="team" />
                 ))}
             </div>
             
             <div className="mt-8 mb-6">
                <div className="bg-white text-black px-4 py-2 rounded-full inline-block text-sm font-bold mb-4">
                  Need to fine-tune something after launch?
                </div>
             </div>

             <div className="space-y-3">
               {[
                 'Adjust font sizes for mobile',
                 'Swap hero visuals or video',
                 'Align content spacing & margins',
                 'Replace or update images',
                 'Optimize for SEO basics'
               ].map((item, idx) => (
                 <div key={idx} className="flex items-center gap-3 text-sm text-gray-300">
                   <div className="w-4 h-4 rounded-full bg-orange-500/20 flex items-center justify-center">
                     <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                   </div>
                   {item}
                 </div>
               ))}
             </div>
             
             <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-purple-600"></div>
             <p className="absolute bottom-8 left-8 text-xs text-brand-text">Valid for 90 days after launch<br/>Includes up to 5 minor revisions - no extra cost.</p>
          </div>

        </div>
      </div>
    </section>
  );
};