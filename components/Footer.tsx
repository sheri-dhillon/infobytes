import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Linkedin, Twitter, Instagram } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#050505] pt-32 pb-12 relative overflow-hidden border-t border-white/5 font-sans">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-brand-purple/5 blur-[120px] rounded-full pointer-events-none mix-blend-screen"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-brand-orange/5 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        
        {/* Top CTA Section */}
        <div className="text-center mb-24 max-w-5xl mx-auto">
           <div className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-[10px] md:text-xs font-bold tracking-widest text-white uppercase">Accepting New Projects</span>
           </div>
           
           <h2 className="text-5xl md:text-7xl lg:text-8xl font-semibold text-white mb-8 tracking-tight leading-[1.05]">
             Let’s architect your <br />
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-gray-600">digital legacy.</span>
           </h2>
           
           <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light leading-relaxed">
             We adapt to your specific growth goals—from the first wireframe to market dominance—building the digital products and revenue engines your brand truly needs.
           </p>
           
           <div className="flex flex-col sm:flex-row justify-center items-center gap-5">
             <a 
               href="https://calendly.com/shehryar-infobytes/30min" 
               target="_blank" 
               rel="noopener noreferrer"
               className="px-10 py-5 rounded-full bg-white text-black font-bold text-lg hover:bg-gray-100 transition-all hover:scale-105 flex items-center gap-2 group shadow-[0_0_30px_rgba(255,255,255,0.15)]"
             >
                Schedule a Discovery Call
                <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
             </a>
             <Link to="/pricing" className="px-10 py-5 rounded-full border border-white/10 text-white font-medium hover:bg-white/5 transition-all hover:border-white/30 text-lg">
                Explore Pricing Plans
             </Link>
           </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-20"></div>

        {/* Corporate Directory Grid */}
        <div className="grid md:grid-cols-12 gap-12 lg:gap-16 items-start mb-20">
          
          {/* Brand Column */}
          <div className="md:col-span-12 lg:col-span-5 flex flex-col items-start">
             <Link to="/" className="text-3xl md:text-4xl font-black tracking-wider text-white uppercase font-sans mb-8 block">
               INFOBYTES
             </Link>
             <p className="text-gray-500 max-w-sm leading-relaxed mb-10 text-base">
               We bridge the gap between aesthetic excellence and technical performance. A strategic partner for brands ready to transition from "business as usual" to market leaders.
             </p>
             <div className="hidden lg:block text-xs text-gray-700 font-mono">
               © 2026 InfoBytes Agency. All rights reserved.
             </div>
          </div>

          {/* Directory Columns */}
          <div className="md:col-span-12 lg:col-span-7 grid sm:grid-cols-3 gap-10 md:gap-8">
             
             {/* 01. Expertise */}
             <div className="flex flex-col gap-6">
                <h4 className="text-white font-bold text-sm tracking-widest uppercase opacity-80">01. Expertise</h4>
                <ul className="flex flex-col gap-4 text-gray-400">
                   <li><Link to="/services" className="hover:text-white transition-colors duration-300 flex items-center gap-2 group"><span className="w-0 group-hover:w-2 h-px bg-brand-orange transition-all duration-300"></span>UI/UX Design Strategy</Link></li>
                   <li><Link to="/services" className="hover:text-white transition-colors duration-300 flex items-center gap-2 group"><span className="w-0 group-hover:w-2 h-px bg-brand-orange transition-all duration-300"></span>Native iOS Development</Link></li>
                   <li><Link to="/services" className="hover:text-white transition-colors duration-300 flex items-center gap-2 group"><span className="w-0 group-hover:w-2 h-px bg-brand-orange transition-all duration-300"></span>eCommerce Solutions</Link></li>
                   <li><Link to="/services" className="hover:text-white transition-colors duration-300 flex items-center gap-2 group"><span className="w-0 group-hover:w-2 h-px bg-brand-orange transition-all duration-300"></span>Email Marketing Strategy</Link></li>
                   <li><Link to="/services" className="hover:text-white transition-colors duration-300 flex items-center gap-2 group"><span className="w-0 group-hover:w-2 h-px bg-brand-orange transition-all duration-300"></span>Web Development</Link></li>
                </ul>
             </div>

             {/* 02. Agency */}
             <div className="flex flex-col gap-6">
                <h4 className="text-white font-bold text-sm tracking-widest uppercase opacity-80">02. Agency</h4>
                <ul className="flex flex-col gap-4 text-gray-400">
                   <li><Link to="/#process" className="hover:text-white transition-colors duration-300">Our Process</Link></li>
                   <li><Link to="/work" className="hover:text-white transition-colors duration-300">Client Success Stories</Link></li>
                   <li><Link to="/pricing" className="hover:text-white transition-colors duration-300">Pricing Strategies</Link></li>
                   <li><Link to="/#faq" className="hover:text-white transition-colors duration-300">Frequently Asked Questions</Link></li>
                   <li><Link to="/privacy" className="hover:text-white transition-colors duration-300">Privacy Policy & Terms</Link></li>
                </ul>
             </div>

             {/* 03. Contact */}
             <div className="flex flex-col gap-6">
                <h4 className="text-white font-bold text-sm tracking-widest uppercase opacity-80">03. Contact</h4>
                <div className="flex flex-col gap-6">
                   <div>
                     <span className="block text-xs text-gray-600 mb-2 font-medium">New Inquiries</span>
                     <a href="mailto:hello@infobytes.io" className="text-white hover:text-brand-orange transition-colors text-lg font-medium">hello@infobytes.io</a>
                   </div>
                   <div>
                     <span className="block text-xs text-gray-600 mb-2 font-medium">Location</span>
                     <span className="text-gray-300">Faisalabad, PK / Remote</span>
                   </div>
                   
                   {/* Socials */}
                   <div className="flex gap-3 pt-2">
                       <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:bg-white hover:text-black transition-all duration-300">
                         <Linkedin className="w-4 h-4" />
                       </a>
                       <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:bg-white hover:text-black transition-all duration-300">
                         <Twitter className="w-4 h-4" />
                       </a>
                       <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:bg-white hover:text-black transition-all duration-300">
                         <Instagram className="w-4 h-4" />
                       </a>
                   </div>
                </div>
             </div>

          </div>
        </div>

        {/* Mobile Copyright (Visible only on small screens) */}
        <div className="lg:hidden text-center text-xs text-gray-700 font-mono pt-8 border-t border-white/5">
           © 2026 InfoBytes Agency. All rights reserved.
        </div>

      </div>
    </footer>
  );
};