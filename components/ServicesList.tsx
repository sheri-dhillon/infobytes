import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Monitor, Smartphone, PenTool, BarChart, Code2, Layout, Layers, Search, Mail, Cpu, Zap, Palette, Share2, Box, Fingerprint, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

// Fallback static data in case DB is empty or loading fails initially
const fallbackServices = [
  {
    id: "01",
    title: "UI/UX Design",
    slug: "ui-ux-design",
    description: "Intuitive interfaces that drive engagement. We design user-centric systems for web and mobile that are strategically built to convert.",
    pills: ["Website Design", "Product Design", "Wireframing"],
    // Default image if none provided
    image: "https://lh3.googleusercontent.com/pw/AP1GczPfhSAfQqZ1DrHsKDS-orBlGKSCsMymYAP_QnOMRtExlH5K2t99l5zrFPrJKVgRDBztXIElsKGagi3z4KePoLfDZsNY-SFHS6qdLmeo12jRdN-r119GAWOM0Z8bcIhMFoG00lYQRnYq-W3uaYBpG9ZF=w1367-h911-s-no-gm",
  }
];

// Helper to map DB services to UI style props (icons/gradients) based on index
const getStyleProps = (index: number) => {
    const styles = [
        {
            icons: [{ icon: PenTool, color: "text-purple-400" }, { icon: Layout, color: "text-pink-400" }, { icon: Layers, color: "text-blue-400" }],
            accent: "text-purple-400",
        },
        {
            icons: [{ icon: Smartphone, color: "text-orange-400" }, { icon: Fingerprint, color: "text-red-400" }, { icon: Cpu, color: "text-indigo-400" }],
            accent: "text-orange-400",
        },
        {
            icons: [{ icon: Monitor, color: "text-emerald-400" }, { icon: Code2, color: "text-cyan-400" }, { icon: Zap, color: "text-yellow-400" }],
            accent: "text-emerald-400",
        },
        {
            icons: [{ icon: Palette, color: "text-rose-400" }, { icon: Share2, color: "text-blue-400" }, { icon: Box, color: "text-violet-400" }],
            accent: "text-rose-400",
        },
        {
            icons: [{ icon: BarChart, color: "text-blue-400" }, { icon: Mail, color: "text-green-400" }, { icon: Search, color: "text-purple-400" }],
            accent: "text-blue-400",
        }
    ];
    return styles[index % styles.length];
};

export const ServicesList: React.FC = () => {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
        try {
            const { data, error } = await supabase
                .from('services')
                .select('*')
                .eq('status', 'Active')
                .order('id', { ascending: true });

            if (!error && data && data.length > 0) {
                // Parse pills if they come as string
                const formattedData = data.map((s: any, i: number) => ({
                    ...s,
                    id: `0${i + 1}`,
                    pills: typeof s.pills === 'string' ? JSON.parse(s.pills) : (s.pills || []),
                    // Merge with style props
                    ...getStyleProps(i)
                }));
                setServices(formattedData);
            } else {
                // Use fallback formatted with styles
                setServices(fallbackServices.map((s, i) => ({ ...s, ...getStyleProps(i) })));
            }
        } catch (err) {
            console.error(err);
             setServices(fallbackServices.map((s, i) => ({ ...s, ...getStyleProps(i) })));
        } finally {
            setLoading(false);
        }
    };
    fetchServices();
  }, []);

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

          <div className="flex flex-col gap-0 min-h-[400px]">
             {loading ? (
                <div className="flex justify-center items-center py-20">
                    <Loader2 className="w-8 h-8 text-brand-purple animate-spin" />
                </div>
             ) : (
                 services.map((service, idx) => (
                    <StickyCard key={idx} index={idx} total={services.length} service={service} />
                 ))
             )}
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
                          {/* Icons - Styled based on merged props */}
                          <div className="flex -space-x-2">
                              {service.icons && service.icons.map((item: any, i: number) => (
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
                          {Array.isArray(service.pills) && service.pills.map((tag: string, tIdx: number) => (
                              tag && (
                                <span key={tIdx} className="px-4 py-2 rounded-full border border-white/10 text-xs font-bold text-gray-400 bg-white/5 hover:bg-white/10 transition-colors">
                                    {tag}
                                </span>
                              )
                          ))}
                      </div>
                  </div>

                  <div className="pt-2">
                      <Link 
                        to={service.slug ? `/services/${service.slug}` : '/contact'} 
                        className="group relative inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-brand-orange to-brand-purple text-white rounded-full font-bold text-sm tracking-wide transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,107,74,0.3)] hover:shadow-[0_0_30px_rgba(185,109,243,0.4)]"
                      >
                          {service.slug ? 'View Details' : 'Start Project'}
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