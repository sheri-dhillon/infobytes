
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Logo } from './Logo';

const CONFIG = {
    marquee_text_1: "Let's Make Something Great",
    marquee_text_2: "Together",
    contact_heading: "Got a vision?",
    contact_subheading: "Let's architect your digital legacy with precision and style.",
    email: "hello@infobytes.io",
    booking_link: "https://calendly.com/shehryar-infobytes/30min",
    copyright_text: "© 2026 InfoBytes Agency. All rights reserved.",
    social_links: [
        { name: 'Facebook', icon: 'fa-brands fa-facebook-f', href: '#' },
        { name: 'Instagram', icon: 'fa-brands fa-instagram', href: '#' },
        { name: 'LinkedIn', icon: 'fa-brands fa-linkedin-in', href: '#' },
        { name: 'Twitter', icon: 'fa-brands fa-x-twitter', href: '#' },
        { name: 'Behance', icon: 'fa-brands fa-behance', href: '#' },
        { name: 'Dribbble', icon: 'fa-brands fa-dribbble', href: '#' },
    ],
    columns: [
      {
        title: "Expertise",
        links: [
           { label: "UI/UX Design Strategy", href: "/services" },
           { label: "Native iOS Development", href: "/services" },
           { label: "Web Development", href: "/services" },
           { label: "Email Marketing", href: "/services" },
           { label: "Growth Strategy", href: "/services" }
        ]
      },
      {
        title: "Agency",
        links: [
           { label: "About Us", href: "/about" },
           { label: "Client Success", href: "/work" },
           { label: "Pricing Plans", href: "/pricing" },
           { label: "Contact", href: "/contact" },
           { label: "Privacy Policy", href: "/privacy" }
        ]
      }
    ]
};

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#050505] relative overflow-hidden font-sans pt-0 border-t border-white/5">
      {/* Background Ambience */}
      <div className="absolute top-[10%] left-[-10%] w-[600px] h-[600px] bg-brand-purple/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[600px] bg-brand-orange/5 blur-[150px] rounded-full pointer-events-none"></div>

      {/* Marquee Section */}
      <div className="w-full bg-white/[0.02] backdrop-blur-sm py-12 md:py-16 border-b border-white/5 overflow-hidden">
         <div className="flex overflow-hidden">
             <div className="flex shrink-0 animate-scroll-left items-center gap-12 md:gap-24 pr-12 md:pr-24">
                 {[1, 2].map((i) => (
                     <React.Fragment key={i}>
                         <span className="text-[10vw] font-black uppercase leading-none text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40 tracking-tighter whitespace-nowrap">
                             {CONFIG.marquee_text_1}
                         </span>
                         <span className="text-[10vw] font-black uppercase leading-none text-brand-orange font-serif italic tracking-tighter whitespace-nowrap">
                             {CONFIG.marquee_text_2}
                         </span>
                     </React.Fragment>
                 ))}
             </div>
         </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-20 md:py-28 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24">
            
            {/* Left Column: CTA & Contact */}
            <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                   <div className="inline-flex items-center gap-2 mb-10 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm w-fit">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                      <span className="text-[10px] md:text-xs font-bold tracking-widest text-white uppercase">Accepting New Projects</span>
                   </div>

                   <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">{CONFIG.contact_heading}</h3>
                   <p className="text-gray-400 text-lg md:text-xl mb-12 max-w-md">{CONFIG.contact_subheading}</p>

                   <div className="mb-12">
                       <span className="block text-xs font-bold text-brand-orange tracking-widest uppercase mb-4">Inquiry</span>
                       <a href={`mailto:${CONFIG.email}`} className="text-3xl sm:text-5xl md:text-7xl font-bold text-white hover:text-gray-300 transition-colors break-all leading-none decoration-brand-orange/50 underline-offset-8 hover:underline">
                           {CONFIG.email}
                       </a>
                   </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-5 items-start">
                     <a 
                       href={CONFIG.booking_link} 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="px-8 py-4 rounded-full bg-white text-black font-bold text-lg hover:bg-gray-200 transition-all hover:scale-105 flex items-center justify-center gap-2 group shadow-[0_0_30px_rgba(255,255,255,0.15)]"
                     >
                        Schedule Discovery Call
                        <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
                     </a>
                     <Link to="/pricing" className="px-8 py-4 rounded-full border border-white/10 text-white font-medium hover:bg-white/5 transition-all hover:border-white/30 text-lg flex items-center justify-center">
                        View Pricing
                     </Link>
                </div>
            </div>

            {/* Right Column: Links */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-10 border-t lg:border-t-0 lg:border-l border-white/10 pt-12 lg:pt-0 lg:pl-12">
                 {CONFIG.columns && CONFIG.columns.map((col, idx) => (
                     <div key={idx}>
                        <h4 className="text-white font-bold text-sm tracking-widest uppercase mb-8 opacity-70">{col.title}</h4>
                        <ul className="flex flex-col gap-4">
                           {col.links.map((link, lIdx) => (
                               <li key={lIdx}>
                                   <Link to={link.href} className="text-gray-400 hover:text-brand-orange transition-colors text-sm md:text-base font-medium">
                                       {link.label}
                                   </Link>
                               </li>
                           ))}
                        </ul>
                     </div>
                 ))}
                 
                 <div className="col-span-2 mt-4">
                     <h4 className="text-white font-bold text-sm tracking-widest uppercase mb-6 opacity-70">Follow Us</h4>
                     <div className="flex gap-4 flex-wrap">
                        {CONFIG.social_links.map((social) => (
                          <a 
                            key={social.name}
                            href={social.href} 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:bg-white hover:text-black transition-all hover:scale-110 group"
                            aria-label={`Follow us on ${social.name}`}
                          >
                               <i className={`${social.icon} text-lg`}></i>
                          </a>
                        ))}
                     </div>
                 </div>
            </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-white">
            <Link to="/" className="block">
              <Logo className="h-9 md:h-10 w-auto max-w-[220px]" />
            </Link>
            <div className="text-gray-600 text-sm font-mono">
               {CONFIG.copyright_text}
            </div>
        </div>
      </div>
    </footer>
  );
};
