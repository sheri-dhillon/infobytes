
import React, { useState, useEffect } from 'react';
import { Phone, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from './Logo';

// Static Configuration
const CONFIG = {
    logo_url: '', 
    logo_alt: 'InfoBytes Agency', 
  cta_text: 'Book Your Revenue Audit',
    cta_link: 'https://calendly.com/shehryar-infobytes/30min',
    availability_status: 'available', 
    menu_items: [
        { label: 'Home', href: '/' },
        { label: 'About', href: '/about' },
        { label: 'Service', href: '/services' },
        { label: 'Portfolio', href: '/work' },
        { label: 'Contact', href: '/contact' },
    ]
};

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden'; 
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isOpen]);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
  }, [location]);

  // Handle scroll for background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Helper for status visual
  const getStatusDisplay = (status: string) => {
      switch(status) {
          case 'partially_available':
              return { color: 'bg-yellow-500', text: 'Limited availability' };
          case 'not_available':
              return { color: 'bg-red-500', text: 'Fully booked' };
          default:
          return { color: 'bg-green-500', text: 'Spots Available' };
      }
  };

  const statusDisplay = getStatusDisplay(CONFIG.availability_status || 'available');

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 px-4 md:px-8 transition-all duration-500 ease-in-out ${
          isScrolled 
            ? (isOpen ? 'py-2 bg-transparent border-none' : 'py-2 bg-black/80 backdrop-blur-md border-b border-white/5 shadow-lg') 
            : 'pt-8 pb-4 bg-transparent pointer-events-none'
        }`}
      >
        <div className="max-w-[1400px] mx-auto flex items-center justify-between relative z-50">
          
          {/* Left: Contact Pill (Dynamic CTA) */}
          <a 
            href={CONFIG.cta_link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className={`hidden md:flex pointer-events-auto items-center gap-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full transition-all duration-500 hover:scale-105 cursor-pointer group shadow-lg ${
              isScrolled ? 'p-1.5 pr-5' : 'p-2 pr-8'
            } ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
          >
             <div className={`rounded-full bg-black flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all duration-500 border border-white/10 shrink-0 ${isScrolled ? 'w-10 h-10' : 'w-14 h-14'}`}>
                <Phone className={`fill-current transition-all duration-500 ${isScrolled ? 'w-4 h-4' : 'w-6 h-6'}`} />
             </div>
             <div className="flex flex-col">
                <span className={`font-bold text-white leading-tight transition-all duration-500 ${isScrolled ? 'text-sm' : 'text-base'}`}>{CONFIG.cta_text}</span>
                <div className={`flex items-center gap-2 transition-all duration-500 ${isScrolled ? 'mt-0' : 'mt-1'}`}>
                   <span className={`w-2 h-2 rounded-full ${statusDisplay.color} animate-pulse`}></span>
                   <span className={`text-gray-400 font-medium transition-all duration-500 ${isScrolled ? 'text-xs' : 'text-sm'}`}>{statusDisplay.text}</span>
                </div>
             </div>
          </a>

          {/* Mobile Logo */}
          <div className={`md:hidden pointer-events-auto transition-opacity duration-300 text-white ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
             <Link to="/" className="block">
                {CONFIG.logo_url ? (
               <img src={CONFIG.logo_url} alt={CONFIG.logo_alt || "InfoBytes Logo"} className="h-[54px] w-auto max-w-[240px] object-contain" />
                ) : (
               <Logo className="h-[54px] w-auto max-w-[240px]" />
                )}
             </Link>
          </div>

          {/* Center: Desktop Logo */}
          <div className={`hidden md:block absolute left-1/2 -translate-x-1/2 pointer-events-auto transition-all duration-500 ease-in-out text-white ${isScrolled ? 'top-1/2 -translate-y-1/2' : 'top-1/2 -translate-y-1/2'} ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
             <Link to="/" className="block">
                {CONFIG.logo_url ? (
               <img src={CONFIG.logo_url} alt={CONFIG.logo_alt || "InfoBytes Logo"} className={`w-auto max-w-[360px] object-contain transition-all duration-500 ${isScrolled ? 'h-[54px]' : 'h-[72px]'}`} />
                ) : (
               <Logo className={`w-auto max-w-[360px] transition-all duration-500 ${isScrolled ? 'h-[54px]' : 'h-[72px]'}`} />
                )}
             </Link>
          </div>

          {/* Right: Actions Group */}
          <div className={`flex items-center gap-3 pointer-events-auto z-50 ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
             
             {/* Menu Toggle */}
             <button 
                onClick={() => setIsOpen(!isOpen)}
                className={`bg-gradient-to-r from-brand-orange to-brand-purple rounded-full flex items-center gap-3 text-white font-medium text-sm hover:shadow-[0_0_20px_rgba(255,107,74,0.4)] transition-all duration-500 shadow-lg justify-center ${isScrolled ? 'px-5 py-2 min-w-[90px]' : 'px-6 py-3 min-w-[100px]'}`}
             >
                <span>Menu</span>
                <div className="w-5 flex flex-col items-end gap-1">
                  <span className="w-full h-0.5 bg-white rounded-full"></span>
                  <span className="w-3/4 h-0.5 bg-white rounded-full"></span>
               </div>
             </button>
          </div>
          
          {/* Close Button for Menu */}
          {isOpen && (
            <button 
                onClick={() => setIsOpen(false)}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 pointer-events-auto bg-white/10 hover:bg-white/20 rounded-full p-2 text-white transition-all z-[60]"
            >
                <X className="w-6 h-6" />
            </button>
          )}

        </div>
      </header>

      {/* Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-[#050505] z-40 flex flex-col items-center justify-center animate-fade-in">
           {/* Background Glow */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-purple/5 blur-[120px] rounded-full pointer-events-none"></div>

           <nav className="flex flex-col items-center gap-6 md:gap-8 text-center p-4 relative z-10">
             {CONFIG.menu_items.map((item, index) => (
               <Link 
                 key={index} 
                 to={item.href} 
                 onClick={() => setIsOpen(false)} 
                 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-brand-orange hover:to-brand-purple transition-all opacity-0 animate-slide-up-fade font-sans tracking-tight"
                 style={{ animationDelay: `${100 + index * 100}ms` }}
               >
                 {item.label}
               </Link>
             ))}
           </nav>
        </div>
      )}
    </>
  );
};
