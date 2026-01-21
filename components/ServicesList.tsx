import React, { useEffect, useRef } from 'react';
import { ArrowUpRight, Monitor, Smartphone, PenTool, BarChart, Code2, Layout, Layers, Search, Mail, Cpu, Zap, Palette, Share2, Box, Fingerprint } from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  {
    id: "01",
    title: "UI/UX Design",
    description: "Intuitive interfaces that drive engagement. We design user-centric systems for web and mobile that are strategically built to convert.",
    tags: ["Website Design", "Product Design", "Wireframing"],
    image: "https://lh3.googleusercontent.com/pw/AP1GczPfhSAfQqZ1DrHsKDS-orBlGKSCsMymYAP_QnOMRtExlH5K2t99l5zrFPrJKVgRDBztXIElsKGagi3z4KePoLfDZsNY-SFHS6qdLmeo12jRdN-r119GAWOM0Z8bcIhMFoG00lYQRnYq-W3uaYBpG9ZF=w1367-h911-s-no-gm",
    icons: [
      { icon: PenTool, color: "text-purple-400" },
      { icon: Layout, color: "text-pink-400" },
      { icon: Layers, color: "text-blue-400" }
    ],
    gradient: "from-purple-500/10 to-blue-500/10",
    accent: "text-purple-400"
  },
  {
    id: "02",
    title: "iOS App Development",
    description: "Seamless mobile experiences. We build high-performance native iOS and cross-platform solutions that feel fluid and natural.",
    tags: ["iOS Development", "React Native", "Flutter"],
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80",
    icons: [
      { icon: Smartphone, color: "text-orange-400" },
      { icon: Fingerprint, color: "text-red-400" },
      { icon: Cpu, color: "text-indigo-400" }
    ],
    gradient: "from-orange-500/10 to-red-500/10",
    accent: "text-orange-400"
  },
  {
    id: "03",
    title: "Website Development",
    description: "High-performance websites using modern frameworks. We build scalable digital products that capture attention and drive growth.",
    tags: ["Frontend", "Backend", "Next.js"],
    image: "https://lh3.googleusercontent.com/pw/AP1GczNzWgz2TUnEO9XVOBAvz3ARcUnJtrW0Ii1e8hyE3GXh2gacxdA3YqZJ3zj54WsMQRL9w3_eCKSYuSyaxh6kfSoAknrqHXoxq0IC5i3pfPSEbxJ1fhJQofkVhRmrqP-__Bze_W_EuvZET4U5Sdi1mN7x=w1000-h684-s-no-gm",
    icons: [
      { icon: Monitor, color: "text-emerald-400" },
      { icon: Code2, color: "text-cyan-400" },
      { icon: Zap, color: "text-yellow-400" }
    ],
    gradient: "from-emerald-500/10 to-cyan-500/10",
    accent: "text-emerald-400"
  },
  {
    id: "04",
    title: "Branding",
    description: "Building brands with depth and clarity. We create visual identities that connect, resonate, and stay memorable.",
    tags: ["Logo Design", "Identity", "Motion"],
    image: "https://lh3.googleusercontent.com/pw/AP1GczOB5TBJ3jM5ax2OA7KJv2ZwiuTYhg8hs7HtyG-Zrt4kRwsjaxAW7gMW57ZqzVp9kgJ37foAFTkPFk5QypnPUfLeA8Swh2YlJvkrczUWurwiDXEfbh1onCZD4dT3dx65qN0ZknDpigTEEFP7aWh21_Zh=w1000-h667-s-no-gm",
    icons: [
      { icon: Palette, color: "text-rose-400" },
      { icon: Share2, color: "text-blue-400" },
      { icon: Box, color: "text-violet-400" }
    ],
    gradient: "from-rose-500/10 to-blue-500/10",
    accent: "text-rose-400"
  },
  {
    id: "05",
    title: "Email Marketing",
    description: "Data-driven strategies to boost visibility. We turn traffic into loyal customers through targeted campaigns and automation.",
    tags: ["Automation", "Retention", "Segmentation"],
    image: "https://lh3.googleusercontent.com/pw/AP1GczO8deXXov5Q6U9MtOPwgmoidb0uNZ8GEsu0j5-R-lCFTjSd0DYQBsOab7A-gZ6sliPW--IE2eUDqfFjyzPHQ7e5Lt5OJrtQx9Q1LZIEjRtSL8ne9aVpZl8cgGiS6HOSWKPPk7-ME4z6k87--bRqABXz=w963-h911-s-no-gm",
    icons: [
      { icon: BarChart, color: "text-blue-400" },
      { icon: Mail, color: "text-green-400" },
      { icon: Search, color: "text-purple-400" }
    ],
    gradient: "from-blue-500/10 to-green-500/10",
    accent: "text-blue-400"
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
                Full-Service Agency
             </div>
             <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight leading-[1]">
                Capabilities that <br/> <span className="text-gray-500">drive results.</span>
             </h2>
             <p className="text-gray-400 text-lg leading-relaxed">
                We combine strategic thinking with expert craftsmanship to deliver digital products that look great and perform even better.
             </p>
          </div>

          <div className="flex flex-col gap-0">
             {services.map((service, idx) => (
                <StickyCard key={idx} index={idx} total={services.length} service={service} />
             ))}
          </div>
       </div>
    </section>
  );
};

const StickyCard: React.FC<{ index: number; total: number; service: typeof services[0] }> = ({ index, total, service }) => {
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
         className="relative w-full bg-[#0a0a0a] rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl transition-all duration-100 ease-linear origin-top group"
         style={{
            height: '450px', // Reduced height as requested
            willChange: 'transform, filter'
         }}
       >
          <div className="flex flex-col md:flex-row h-full">
              
              {/* Left Content Area - Solid Background */}
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-between relative z-20 bg-[#0a0a0a]">
                  <div>
                      <div className="flex items-center justify-between mb-6">
                          <div className={`text-xs font-bold tracking-widest uppercase ${service.accent} bg-white/5 px-3 py-1 rounded-full border border-white/5`}>
                              {service.id} — Service
                          </div>
                          {/* Icons */}
                          <div className="flex -space-x-2">
                              {service.icons.map((item, i) => (
                                  <div key={i} className={`w-9 h-9 rounded-full bg-[#111] border border-white/10 flex items-center justify-center relative z-[${10-i}] shadow-lg`}>
                                      <item.icon className={`w-3.5 h-3.5 ${item.color}`} />
                                  </div>
                              ))}
                          </div>
                      </div>

                      <h3 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight tracking-tight">
                          {service.title}
                      </h3>
                      
                      <p className="text-gray-400 text-base leading-relaxed max-w-md mb-8">
                          {service.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                          {service.tags.map((tag, tIdx) => (
                              <span key={tIdx} className="px-4 py-2 rounded-full border border-white/10 text-xs font-bold text-gray-400 bg-white/5 hover:bg-white/10 transition-colors">
                                  {tag}
                              </span>
                          ))}
                      </div>
                  </div>

                  <div className="pt-2">
                      <Link 
                        to="/contact" 
                        className="group relative inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-brand-orange to-brand-purple text-white rounded-full font-bold text-sm tracking-wide transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,107,74,0.3)] hover:shadow-[0_0_30px_rgba(185,109,243,0.4)]"
                      >
                          Start Project
                          <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center transition-transform group-hover:rotate-45">
                             <ArrowUpRight className="w-3 h-3 text-black" />
                          </div>
                      </Link>
                  </div>
              </div>

              {/* Right Image Area - With Feather Gradient */}
              <div className="flex-1 relative h-full overflow-hidden bg-[#0a0a0a]">
                  {/* Image */}
                  <img 
                      src={service.image} 
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