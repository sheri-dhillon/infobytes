import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Link } from 'react-router-dom';

// Predefined layouts for pills to ensure they look designed
const pillLayouts = [
  // Layout 1
  [
      { top: "5%", left: "25%", rotate: "-6deg" },
      { top: "75%", left: "15%", rotate: "4deg" },
      { top: "20%", left: "45%", rotate: "-3deg" },
      { top: "65%", left: "40%", rotate: "8deg" },
  ],
  // Layout 2
  [
      { top: "10%", left: "30%", rotate: "5deg" },
      { top: "70%", left: "10%", rotate: "-4deg" },
      { top: "15%", left: "5%", rotate: "-6deg" },
      { top: "80%", left: "40%", rotate: "3deg" },
  ],
  // Layout 3
  [
      { top: "5%", left: "20%", rotate: "-5deg" },
      { top: "85%", left: "15%", rotate: "6deg" },
      { top: "25%", left: "50%", rotate: "-3deg" },
      { top: "65%", left: "45%", rotate: "4deg" },
  ],
   // Layout 4
  [
      { top: "15%", left: "10%", rotate: "5deg" },
      { top: "80%", left: "30%", rotate: "-4deg" },
      { top: "10%", left: "45%", rotate: "-2deg" },
      { top: "60%", left: "5%", rotate: "7deg" },
  ]
];

interface ServicePill {
    text: string;
    top: string;
    left: string;
    rotate: string;
}

interface ServiceItem {
    id: string;
    title: string;
    slug: string;
    description: string;
    pills: ServicePill[];
}

export const Services: React.FC = () => {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchServices = async () => {
        try {
            // Fetch services that are specifically marked as 'Active'
            const { data, error } = await supabase
                .from('services')
                .select('*')
                .eq('status', 'Active')
                .order('created_at', { ascending: true }); 

            if (error) {
                console.error('Error fetching services:', error);
                return;
            }

            if (data && isMounted) {
                const mappedServices: ServiceItem[] = data.map((item, index) => {
                    // Cycle through layouts
                    const layout = pillLayouts[index % pillLayouts.length] || [];
                    
                    // Parse pills safely with fallback
                    let rawPills: any[] = [];
                    try {
                        if (Array.isArray(item.pills)) {
                            rawPills = item.pills;
                        } else if (typeof item.pills === 'string') {
                            // Try JSON parse first
                            try {
                                const parsed = JSON.parse(item.pills);
                                if (Array.isArray(parsed)) rawPills = parsed;
                                else rawPills = item.pills.split(','); 
                            } catch {
                                // If JSON fails, split by comma
                                rawPills = item.pills.split(',');
                            }
                        }
                    } catch (err) {
                        console.warn('Error parsing pills for service:', item.title, err);
                        rawPills = [];
                    }

                    // Map pills to layout positions
                    const pills = (Array.isArray(rawPills) ? rawPills : [])
                        .filter(p => p && typeof p === 'string' && p.trim().length > 0)
                        .map((text, pIdx) => ({
                            text: text.trim(),
                            ...(layout[pIdx % layout.length] || { top: '50%', left: '50%', rotate: '0deg' })
                        }));

                    return {
                        id: `0${index + 1}`,
                        title: item.title || 'Untitled Service',
                        slug: item.slug || '#',
                        description: item.description || '', 
                        pills
                    };
                });
                setServices(mappedServices);
            }
        } catch (error) {
            console.error('Unexpected error in Services component:', error);
        } finally {
            if (isMounted) setLoading(false);
        }
    };

    fetchServices();

    return () => { isMounted = false; };
  }, []);

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
        <div className="flex flex-col min-h-[400px]">
           {loading ? (
             <div className="flex items-center justify-center py-20 text-gray-500 animate-pulse gap-2">
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
             </div>
           ) : services.length > 0 ? (
               services.map((service, idx) => (
                 <Link 
                   to={`/services/${service.slug}`}
                   key={idx}
                   className="group relative flex flex-col md:flex-row items-start md:items-center justify-between py-16 md:py-20 border-t border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer block"
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
                 </Link>
               ))
           ) : (
               <div className="py-20 text-center text-gray-500 border-t border-white/10 flex flex-col items-center">
                  <p className="mb-2">No active services found.</p>
                  <p className="text-xs opacity-50">Please ensure services are set to "Active" in the Admin Dashboard.</p>
               </div>
           )}
           <div className="border-t border-white/10" />
        </div>

      </div>
    </section>
  );
};