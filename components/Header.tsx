import React, { useState, useEffect } from 'react';
import { Phone, X } from 'lucide-react';

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  // Handle scroll for background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#' },
    { name: 'Service', href: '#services' },
    { name: 'Portfolio', href: '#work' },
    { name: 'Contact', href: '#contact' },
    { name: 'Blog', href: '#' },
  ];

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 px-4 md:px-8 transition-all duration-500 ease-in-out ${
          isScrolled 
            ? 'py-2 bg-black/80 backdrop-blur-md border-b border-white/5 shadow-lg' 
            : 'pt-6 pb-2 bg-transparent pointer-events-none'
        }`}
      >
        <div className="max-w-[1400px] mx-auto flex items-center justify-between relative z-50">
          
          {/* Left: Contact Pill (Hidden on Mobile) */}
          <div className={`hidden md:flex pointer-events-auto items-center gap-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full transition-all duration-500 hover:scale-105 cursor-pointer group shadow-lg ${isScrolled ? 'p-1.5 pr-5' : 'p-2 pr-8'}`}>
             <div className={`rounded-full bg-black flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all duration-500 border border-white/10 shrink-0 ${isScrolled ? 'w-10 h-10' : 'w-14 h-14'}`}>
                <Phone className={`fill-current transition-all duration-500 ${isScrolled ? 'w-4 h-4' : 'w-6 h-6'}`} />
             </div>
             <div className="flex flex-col">
                <span className={`font-bold text-white leading-tight transition-all duration-500 ${isScrolled ? 'text-sm' : 'text-base'}`}>Book a 30 mins call</span>
                <div className={`flex items-center gap-2 transition-all duration-500 ${isScrolled ? 'mt-0' : 'mt-1'}`}>
                   <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                   <span className={`text-gray-400 font-medium transition-all duration-500 ${isScrolled ? 'text-xs' : 'text-sm'}`}>Available now</span>
                </div>
             </div>
          </div>

          {/* Mobile Logo (Visible on Mobile, aligned left in flex container) */}
          <div className="md:hidden pointer-events-auto">
             <h1 className="text-lg font-bold tracking-widest text-white uppercase font-sans drop-shadow-lg">INFOBYTES</h1>
          </div>

          {/* Center: Desktop Logo (Absolute Center) */}
          <div className={`hidden md:block absolute left-1/2 -translate-x-1/2 pointer-events-auto transition-all duration-500 ease-in-out ${isScrolled ? 'top-1/2 -translate-y-1/2' : 'top-8'}`}>
             <h1 className={`font-bold tracking-widest text-white uppercase font-sans drop-shadow-lg transition-all duration-500 ${isScrolled ? 'text-xl' : 'text-2xl'}`}>INFOBYTES</h1>
          </div>

          {/* Right: Menu Toggle */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className={`pointer-events-auto bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center gap-3 text-white font-medium text-sm hover:shadow-[0_0_20px_rgba(147,51,234,0.5)] transition-all duration-500 z-50 shadow-lg justify-center ${isScrolled ? 'px-5 py-2 min-w-[90px]' : 'px-6 py-3 min-w-[100px]'}`}
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