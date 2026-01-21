import React from 'react';
import { ArrowDownRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const techStack = [
  { name: 'iOS', icon: 'fa-brands fa-apple' },
  { name: 'React', icon: 'fa-brands fa-react' },
  { name: 'Vue.js', icon: 'fa-brands fa-vuejs' },
  { name: 'Next.js', icon: 'fa-solid fa-layer-group' },
  { name: 'Laravel', icon: 'fa-brands fa-laravel' },
  { name: 'WordPress', icon: 'fa-brands fa-wordpress' },
  { name: 'WooCommerce', icon: 'fa-solid fa-cart-shopping' },
  { name: 'Shopify', icon: 'fa-brands fa-shopify' },
  { name: 'Klaviyo', icon: 'fa-solid fa-envelope-open-text' },
  { name: 'Omnisend', icon: 'fa-solid fa-paper-plane' },
  { name: 'Meta Ads', icon: 'fa-brands fa-meta' },
  { name: 'Figma', icon: 'fa-brands fa-figma' },
  { name: 'TikTok Ads', icon: 'fa-brands fa-tiktok' },
  { name: 'Mailchimp', icon: 'fa-brands fa-mailchimp' },
];

export const ServicesHero: React.FC = () => {
  return (
    <section className="relative min-h-[90vh] bg-black pt-32 pb-0 overflow-hidden flex flex-col justify-center">
      {/* Dynamic Background */}
      <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-brand-purple/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen animate-pulse duration-[4000ms]"></div>
      <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-brand-orange/5 blur-[120px] rounded-full pointer-events-none mix-blend-screen"></div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)] pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10 w-full mb-20">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Text Content */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8 animate-fade-in">
                <span className="w-1.5 h-1.5 bg-brand-orange rounded-full"></span>
                <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">Our Capabilities</span>
            </div>
            
            <h1 className="text-5xl sm:text-7xl lg:text-[5.5rem] font-bold text-white leading-[0.95] tracking-tight mb-8 animate-slide-up-fade">
              We architect <br/>
              <span className="font-serif italic font-normal text-gray-400">digital</span> <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-purple">futures.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-400 max-w-xl leading-relaxed mb-12 animate-slide-up-fade" style={{ animationDelay: '100ms' }}>
              We don't just build websites; we build revenue engines. From high-conversion UI/UX to scalable native apps, our services are designed to help you dominate your market.
            </p>

            <div className="flex flex-wrap gap-4 animate-slide-up-fade" style={{ animationDelay: '200ms' }}>
               <Link to="/contact" className="px-8 py-4 bg-white text-black rounded-full font-bold text-sm hover:bg-gray-200 transition-all flex items-center gap-2 group">
                 Start a Project <ArrowDownRight className="w-4 h-4 group-hover:rotate-[-45deg] transition-transform" />
               </Link>
               <a href="#services-list" className="px-8 py-4 border border-white/10 text-white rounded-full font-bold text-sm hover:bg-white/5 transition-all">
                 Explore Services
               </a>
            </div>
          </div>

          {/* Visual Interactive List */}
          <div className="lg:col-span-5 relative hidden lg:block animate-fade-in" style={{ animationDelay: '300ms' }}>
             <div className="relative z-10 flex flex-col gap-3">
               {[
                 { num: '01', title: 'Strategy & Branding', tags: ['Market Research', 'Identity', 'Positioning'] },
                 { num: '02', title: 'UI/UX Design', tags: ['Wireframing', 'Prototyping', 'Design Systems'] },
                 { num: '03', title: 'Development', tags: ['React', 'Next.js', 'iOS/Swift', 'Node.js'] },
                 { num: '04', title: 'Growth Marketing', tags: ['SEO', 'Email Automation', 'Analytics'] },
               ].map((service, idx, arr) => (
                 <div 
                   key={idx} 
                   className="group relative p-6 bg-[#0a0a0a] border border-white/10 rounded-2xl hover:bg-white hover:border-white transition-all duration-300 cursor-default"
                   style={{ 
                     marginLeft: `${idx * 24}px`, // Stepped layout
                     zIndex: 10 - idx 
                   }}
                 >
                    <div className="flex items-start justify-between relative z-10">
                       <div>
                          <div className="text-xs font-bold text-gray-500 mb-1 group-hover:text-black/50 transition-colors">{service.num}</div>
                          <h3 className="text-2xl font-bold text-white group-hover:text-black transition-colors">{service.title}</h3>
                       </div>
                       <div className="opacity-0 group-hover:opacity-100 transition-opacity text-black">
                          <ArrowRight className="w-5 h-5 -rotate-45" />
                       </div>
                    </div>
                    
                    {/* Tags Reveal on Hover */}
                    <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-300 relative z-10">
                        <div className="overflow-hidden">
                           <div className="mt-4 flex flex-wrap gap-2">
                                {service.tags.map((tag, tIdx) => (
                                   <span key={tIdx} className="text-[10px] font-bold uppercase tracking-wider border border-black/10 px-2 py-1 rounded-md text-black/70">
                                     {tag}
                                   </span>
                                ))}
                           </div>
                        </div>
                    </div>

                    {/* Connector Arrow (Visible on all except last) */}
                    {idx < arr.length - 1 && (
                        <div className="absolute -bottom-[28px] -left-[14px] w-[60px] h-[60px] z-20 pointer-events-none text-brand-orange/40 group-hover:text-brand-orange transition-colors duration-300">
                             <svg width="100%" height="100%" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path 
                                    d="M 25 10 C 5 25, 15 45, 45 50" 
                                    stroke="currentColor" 
                                    strokeWidth="2" 
                                    strokeLinecap="round" 
                                    strokeDasharray="4 3"
                                    markerEnd="url(#arrowhead)"
                                />
                                <defs>
                                    <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                                       <path d="M0 0 L6 3 L0 6 L1.5 3 Z" fill="currentColor" />
                                    </marker>
                                </defs>
                            </svg>
                        </div>
                    )}
                 </div>
               ))}
             </div>
             
             {/* Glow behind cards */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand-purple/10 blur-[80px] pointer-events-none z-0"></div>
          </div>
        </div>
      </div>

      {/* Tech Stack Marquee */}
      <div className="w-full relative z-10 border-t border-white/5 pt-10 pb-10 bg-gradient-to-b from-transparent to-black/40 backdrop-blur-sm mt-auto">
          <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
               <p className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em] animate-fade-in">Powering Growth with Modern Tech</p>
          </div>
          
          <div className="flex overflow-hidden relative">
               {/* Gradients for fade effect */}
               <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-black to-transparent z-10"></div>
               <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-black to-transparent z-10"></div>

               <div className="flex gap-4 animate-scroll-left min-w-full shrink-0">
                  {[...techStack, ...techStack].map((tech, idx) => (
                      <div 
                        key={idx} 
                        className="flex items-center gap-3 px-6 py-3 rounded-full border border-white/5 bg-[#111] backdrop-blur-md whitespace-nowrap hover:border-white/20 hover:bg-white/10 transition-all duration-300 group cursor-default shadow-lg"
                      >
                          <i className={`${tech.icon} text-gray-500 group-hover:text-brand-orange transition-colors text-lg`}></i>
                          <span className="text-sm font-bold text-gray-400 group-hover:text-white transition-colors">{tech.name}</span>
                      </div>
                  ))}
               </div>
          </div>
      </div>
    </section>
  );
};