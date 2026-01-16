import React, { useState, useEffect } from 'react';
import { Phone, X } from 'lucide-react';

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const navItems = [
    { name: 'Home', href: '#' },
    { name: 'Service', href: '#services' },
    { name: 'Portfolio', href: '#work' },
    { name: 'Contact', href: '#contact' },
    { name: 'Blog', href: '#' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 pt-6 px-4 md:px-8 pointer-events-none">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between relative z-50">
          
          {/* Left: Contact Pill (Hidden on Mobile) */}
          <div className="hidden md:flex pointer-events-auto items-center gap-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full p-2 pr-8 transition-transform hover:scale-105 cursor-pointer group shadow-lg">
             <div className="w-14 h-14 rounded-full bg-black flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-colors border border-white/10 shrink-0">
                <Phone className="w-6 h-6 fill-current" />
             </div>
             <div className="flex flex-col">
                <span className="text-base font-bold text-white leading-tight">Book a 30 mins call</span>
                <div className="flex items-center gap-2 mt-1">
                   <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                   <span className="text-sm text-gray-400 font-medium">Available now</span>
                </div>
             </div>
          </div>

          {/* Mobile Logo (Visible on Mobile, aligned left in flex container) */}
          <div className="md:hidden pointer-events-auto">
             <h1 className="text-lg font-bold tracking-widest text-white uppercase font-sans drop-shadow-lg">INFOBYTES</h1>
          </div>

          {/* Center: Desktop Logo (Absolute Center) */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-5 pointer-events-auto">
             <h1 className="text-2xl font-bold tracking-widest text-white uppercase font-sans drop-shadow-lg">INFOBYTES</h1>
          </div>

          {/* Right: Menu Toggle */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="pointer-events-auto bg-gradient-to-r from-blue-600 to-purple-600 rounded-full px-6 py-3 flex items-center gap-3 text-white font-medium text-sm hover:shadow-[0_0_20px_rgba(147,51,234,0.5)] transition-all z-50 shadow-lg min-w-[100px] justify-center"
          >
             <span>Menu</span>
             {isOpen ? (
                <X className="w-5 h-5" />
             ) : (
                <div className="w-5 flex flex-col items-end gap-1">
                  <span className="w-full h-0.5 bg-white rounded-full"></span>
                  <span className="w-3/4 h-0.5 bg-white rounded-full"></span>
               </div>
             )}
          </button>
        </div>
      </header>

      {/* Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-[#050505] z-40 flex flex-col items-center justify-center animate-fade-in">
           <nav className="flex flex-col items-center gap-6 md:gap-8 text-center p-4">
             {navItems.map((item, index) => (
               <a 
                 key={item.name} 
                 href={item.href} 
                 onClick={() => setIsOpen(false)} 
                 className="text-3xl md:text-6xl font-bold text-white hover:text-gray-400 transition-colors opacity-0 animate-slide-up-fade font-sans tracking-tight"
                 style={{ animationDelay: `${100 + index * 100}ms` }}
               >
                 {item.name}
               </a>
             ))}
           </nav>
        </div>
      )}
    </>
  );
};