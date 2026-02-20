import React, { useRef, useEffect, useState } from 'react';

interface StatItem {
    id: number;
    value: string;
    label: string;
    theme: string;
    x: number;
    y: number;
    mx: number;
    my: number;
}

interface StatsScrollProps {
    stats?: StatItem[];
}

const DEFAULT_STATS = [
    { id: 1, value: "8+", label: "Years Niche Experience", theme: "orange", x: -30, y: -25, mx: 0, my: -32 },
    { id: 2, value: "450+", label: "Custom Flows Built", theme: "white", x: -12, y: -35, mx: -5, my: -20 },
    { id: 3, value: "$120M+", label: "Attributed Revenue", theme: "purple", x: 5, y: -5, mx: 5, my: -8 },
    { id: 4, value: "250+", label: "Retention Audits", theme: "white", x: -25, y: 15, mx: -5, my: 8 },
    { id: 5, value: "15+", label: "Core Specialists", theme: "orange", x: 30, y: -15, mx: 5, my: 20 },
    { id: 6, value: "1.2M+", label: "Emails Optimized", theme: "purple", x: 20, y: 25, mx: 0, my: 32 }
];

export const StatsScroll: React.FC<StatsScrollProps> = ({ stats = DEFAULT_STATS }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const displayStats = stats.length > 0 ? stats : DEFAULT_STATS;

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const elementHeight = rect.height;
      
      const scrollDist = elementHeight - viewportHeight;
      const scrolled = -rect.top;
      
      let p = scrolled / scrollDist;
      
      if (p < 0) p = 0;
      if (p > 1) p = 1;
      
      setProgress(p);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); 
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getThemeClasses = (theme: string) => {
    switch(theme) {
      case 'orange':
        return 'bg-brand-orange text-white';
      case 'purple':
        return 'bg-brand-purple text-white';
      default:
        return 'bg-white text-black';
    }
  };

  return (
    <section ref={containerRef} className="relative h-[250vh] bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
           <div className="absolute inset-0 bg-black z-0"></div>
           <img 
             src="https://lh3.googleusercontent.com/pw/AP1GczPwo75XMVyFtbTRnYjnMvUPaUbesHG38-EfOR8zHdR60uoLAYKsA7rKf8aHIfhJ1KX3KOSejhcuIKh-XB1_3Ik_mMcAZYLP0qaim_cvoLVHLR4cDYBQ0OBFVJQw0yhHTlP3Ni586XfErmh7aRxjei1H=w1584-h672-s-no-gm" 
             alt="Team background" 
             className="w-full h-full object-cover opacity-60"
             style={{ 
               transform: `scale(${1 + progress * 0.1})`,
               transition: 'transform 0.1s linear'
             }} 
           />
           {/* Overlays for readability */}
           <div className="absolute inset-0 bg-black/60 z-10"></div>
           <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black z-10 opacity-90"></div>
        </div>

        {/* Stats Container */}
        <div className="relative z-20 w-full max-w-[1400px] h-full pointer-events-none">
           {/* Center anchor point for calculations */}
           <div className="absolute top-1/2 left-1/2 w-0 h-0">
               {displayStats.map((stat, idx) => {
                 // Determine final position based on device
                 const targetX = isMobile ? stat.mx : stat.x;
                 const targetY = isMobile ? stat.my : stat.y;

                 const xPos = targetX * progress; 
                 const yPos = targetY * progress;
                 
                 const rotation = (progress * (idx % 2 === 0 ? 5 : -5));
                 const scale = 0.5 + (0.5 * progress);
                 const opacity = Math.min(progress * 3, 1); 

                 return (
                   <div 
                     key={stat.id}
                     className={`absolute transition-transform duration-75 ease-out shadow-2xl rounded-2xl p-6 md:p-8 w-[220px] md:w-[280px] flex flex-col justify-center pointer-events-auto ${getThemeClasses(stat.theme)}`}
                     style={{
                       // Center the element first (-50% -50%), then apply calculated offset in vw/vh
                       transform: `translate3d(calc(-50% + ${xPos}vw), calc(-50% + ${yPos}vh), 0) rotate(${rotation}deg) scale(${scale})`,
                       opacity: opacity,
                       zIndex: 10 + idx,
                       boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                       willChange: 'transform, opacity'
                     }}
                   >
                      <div className={`text-3xl md:text-5xl font-bold mb-2 tracking-tight ${stat.theme === 'white' ? 'text-black' : 'text-white'}`}>
                        {stat.value}
                      </div>
                      <div className={`text-xs md:text-sm font-medium leading-tight ${stat.theme === 'white' ? 'text-gray-500' : 'text-white/90'}`}>
                        {stat.label}
                      </div>
                      
                      {stat.theme === 'white' ? (
                         <div className="w-8 h-1 bg-gray-200 mt-4 rounded-full"></div>
                      ) : (
                         <div className="w-8 h-1 bg-white/30 mt-4 rounded-full"></div>
                      )}
                   </div>
                 );
               })}
           </div>
        </div>
        
        {/* Scroll Indicator */}
        <div 
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 transition-opacity duration-500 pointer-events-none z-30"
          style={{ opacity: Math.max(0, 1 - progress * 4) }}
        >
           <div className="text-white text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]">Scroll to Reveal</div>
           <div className="w-[1px] h-12 md:h-16 bg-gradient-to-b from-white to-transparent animate-pulse"></div>
        </div>

      </div>
    </section>
  );
};
