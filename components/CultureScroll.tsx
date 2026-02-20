import React from 'react';
import { MousePointer2, TrendingUp, DollarSign, ArrowUpRight, Activity, Percent, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CultureScrollProps {
    images?: string[];
}

// Row 1: 6 unique images - D2C products and lifestyle
const ROW1_IMAGES = [
  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80", // Luxury cosmetics flatlay
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80", // Premium product watch
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80", // Nike shoe product
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80", // Headphones product
  "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80", // Polaroid camera product
  "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80", // Sunglasses product
];

// Row 2: 5 unique images - Data, strategy, team
const ROW2_IMAGES = [
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80", // Data analytics dashboard
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80", // Marketing metrics screen
  "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80", // Team collaboration office
  "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80", // Strategy whiteboard session
  "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=800&q=80", // Woman analyzing data laptop
];

export const CultureScroll: React.FC<CultureScrollProps> = ({ images = [] }) => {
  // Use dedicated row images
  const finalRow1 = ROW1_IMAGES;
  const finalRow2 = ROW2_IMAGES;

  return (
    <section className="py-20 bg-black overflow-hidden flex flex-col gap-6 md:gap-8">
      
      {/* Row 1: Images Marquee (Right to Left) */}
      <div className="relative flex overflow-hidden group">
         <div className="flex gap-6 animate-scroll-left min-w-full shrink-0 items-stretch">
            {/* Duplicated set for seamless loop */}
            {[...finalRow1, ...finalRow1, ...finalRow1].map((img, i) => (
                <div key={i} className="w-[300px] md:w-[400px] h-[250px] md:h-[320px] rounded-3xl overflow-hidden shrink-0 border border-white/10 relative">
                    <img src={img} alt="Culture" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                </div>
            ))}
         </div>
      </div>

      {/* Row 2: Content Marquee (Left to Right to create contrast motion) */}
      <div className="relative flex overflow-hidden group/row2">
         <div className="flex gap-6 animate-scroll-right min-w-full shrink-0 items-stretch">
             {/* We create a composite array of items to scroll */}
             {[1, 2].map((iter) => (
               <React.Fragment key={iter}>
                  
                  {/* Item 1: Text Card */}
                  <div className="w-[400px] md:w-[500px] bg-[#111] border border-white/10 rounded-3xl p-10 flex flex-col justify-between shrink-0 h-[400px] relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-32 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                      <div className="relative z-10">
                        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-6">
                            <Activity className="text-white w-6 h-6" />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                            A collective of retention architects, data engineers, and direct-response creatives obsessed with ROI.
                        </h3>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400 text-sm font-mono uppercase tracking-widest">
                          <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse"></span>
                          eCommerce Specialists
                      </div>
                  </div>

                  {/* Item 2: Stats Card (Gradient Background) */}
                  <div className="w-[400px] md:w-[550px] bg-gradient-to-br from-brand-orange to-brand-purple rounded-3xl p-8 md:p-10 flex flex-col justify-between shrink-0 h-[400px] relative text-white group/card">
                      <div className="flex justify-between items-start">
                          <div>
                              <div className="flex items-center gap-2 mb-2 opacity-90">
                                  <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
                                  <span className="text-xs font-bold uppercase tracking-wider">Lifecycle Performance</span>
                              </div>
                              <h3 className="text-5xl md:text-6xl font-bold tracking-tighter mb-1">$12.4M+</h3>
                              <p className="font-medium text-lg opacity-90">Revenue Attributed</p>
                          </div>
                          <Link to="/work" className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg cursor-pointer">
                              <ArrowUpRight className="w-5 h-5 text-black" />
                          </Link>
                      </div>

                      {/* Detailed Stats Grid */}
                      <div className="grid grid-cols-2 gap-4 mt-6">
                          <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-md border border-white/10 hover:bg-white/20 transition-colors">
                             <div className="flex items-center gap-2 mb-2">
                                <TrendingUp className="w-4 h-4 opacity-80" />
                                <span className="text-xs font-bold uppercase opacity-80">Avg. LTV Lift</span>
                             </div>
                             <div className="text-2xl font-bold">+38%</div>
                          </div>
                          <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-md border border-white/10 hover:bg-white/20 transition-colors">
                             <div className="flex items-center gap-2 mb-2">
                                <Percent className="w-4 h-4 opacity-80" />
                                <span className="text-xs font-bold uppercase opacity-80">Email Revenue</span>
                             </div>
                             <div className="text-2xl font-bold">42%</div>
                          </div>
                          <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-md border border-white/10 hover:bg-white/20 transition-colors">
                             <div className="flex items-center gap-2 mb-2">
                                <Activity className="w-4 h-4 opacity-80" />
                                <span className="text-xs font-bold uppercase opacity-80">Churn Reduction</span>
                             </div>
                             <div className="text-2xl font-bold">-15%</div>
                          </div>
                          <Link to="/work" className="bg-black text-white rounded-2xl p-4 flex items-center justify-between cursor-pointer group/btn hover:bg-gray-900 transition-colors shadow-lg">
                              <span className="font-bold text-sm">View Case Studies</span>
                              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                          </Link>
                      </div>
                  </div>

                  {/* Item 3 & 4: Images from Row 2 */}
                  {finalRow2.map((img, i) => (
                      <div key={i} className="w-[300px] md:w-[400px] h-[400px] rounded-3xl overflow-hidden shrink-0 border border-white/10 relative">
                         <img src={img} alt="Team" className="w-full h-full object-cover grayscale group-hover/row2:grayscale-0 transition-all duration-500" />
                      </div>
                  ))}

               </React.Fragment>
             ))}
         </div>
      </div>
    </section>
  );
};
