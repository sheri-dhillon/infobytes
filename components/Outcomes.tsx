import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

const services = [
  {
    id: "01",
    title: "UI/UX",
    description: "Custom websites designed to captivate your audience and drive conversions.",
    image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: "02",
    title: "Growth",
    description: "Enhance your online visibility and attract qualified traffic with our proven SEO strategies.",
    image: "https://images.pexels.com/photos/6476589/pexels-photo-6476589.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: "03",
    title: "Branding",
    description: "Craft a memorable brand identity with impactful design and unified messaging.",
    image: "https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: "04",
    title: "Code",
    description: "Build and scale your online store with seamless e-commerce solutions tailored for growth.",
    image: "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: "05",
    title: "Website",
    description: "High-performance web development that turns visitors into loyal customers.",
    image: "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=600"
  }
];

export const Outcomes: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    // clientX and clientY are relative to the viewport, which works perfectly with fixed positioning
    setCursorPos({ x: e.clientX, y: e.clientY });
  };

  return (
    <section 
      className="py-32 bg-brand-dark relative overflow-hidden" 
      onMouseMove={handleMouseMove}
    >
      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-24">
          <div className="inline-block px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-xs font-bold tracking-widest uppercase mb-8 text-white">
            Our Services
          </div>
          <h2 className="text-5xl md:text-7xl font-medium text-white leading-[1.1] tracking-tight">
            From idea to <span className="font-serif italic text-gray-400">execution</span><br />
            we've got you covered
          </h2>
        </div>

        {/* List */}
        <div className="flex flex-col">
           {services.map((service, idx) => (
             <div 
               key={idx}
               className="group relative flex flex-col md:flex-row items-start md:items-center justify-between py-10 md:py-14 border-t border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer"
               onMouseEnter={() => setHoveredIndex(idx)}
               onMouseLeave={() => setHoveredIndex(null)}
             >
                {/* Background Hover Effect for Row (Subtle) */}
                <div className={`absolute inset-0 bg-white/5 transition-opacity duration-300 -z-10 ${hoveredIndex === idx ? 'opacity-100' : 'opacity-0'}`} />

                <div className="flex items-baseline gap-8 md:gap-16 mb-6 md:mb-0">
                  <span className="text-sm font-mono text-gray-500 font-medium">
                    {service.id}
                  </span>
                  <h3 className="text-4xl md:text-6xl font-medium text-white group-hover:translate-x-4 transition-transform duration-300">
                    {service.title}
                  </h3>
                </div>

                <div className="flex items-center gap-6 md:gap-12 md:max-w-xl w-full justify-between md:justify-end">
                   {/* Description: Hidden on desktop until hover, visible on mobile */}
                   <p className="text-sm text-gray-400 max-w-xs leading-relaxed hidden md:block opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                     {service.description}
                   </p>
                   <p className="text-sm text-gray-400 max-w-xs leading-relaxed md:hidden">
                     {service.description}
                   </p>

                   <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300 transform group-hover:-rotate-45 shrink-0 bg-black z-20">
                      <ArrowRight className="w-5 h-5" />
                   </div>
                </div>
             </div>
           ))}
           <div className="border-t border-white/10" />
        </div>

      </div>

      {/* Floating Image Overlay - Fixed to viewport to follow cursor smoothly */}
      <div 
        className="fixed top-0 left-0 pointer-events-none z-50 hidden md:block"
        style={{
          transform: `translate(${cursorPos.x}px, ${cursorPos.y}px)`,
          left: '-175px', // Offset to center (350px width / 2)
          top: '-125px',  // Offset to center (250px height / 2)
          opacity: hoveredIndex !== null ? 1 : 0,
          transition: 'opacity 0.2s ease, transform 0.1s ease-out' 
        }}
      >
         <div className="w-[350px] h-[250px] rounded-lg overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] relative bg-black border border-white/10">
            {services.map((service, idx) => (
              <img 
                key={idx}
                src={service.image} 
                alt={service.title}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${hoveredIndex === idx ? 'opacity-100' : 'opacity-0'}`}
              />
            ))}
            {/* Overlay gradient on image for better text contrast if needed (optional) */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
         </div>
      </div>

    </section>
  );
};