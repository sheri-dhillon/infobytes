import React from 'react';
import { PageHero } from '../components/PageHero';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const ServicesPage: React.FC = () => {
  return (
    <>
      <PageHero 
        title="Our Services" 
        subtitle="Comprehensive digital solutions tailored to your unique business needs." 
      />
      
      <section className="py-24 md:py-32 bg-black flex flex-col items-center justify-center text-center min-h-[50vh] relative overflow-hidden border-t border-white/5">
         {/* Background Ambience */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-purple/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />
         
         <div className="relative z-10 px-6">
             <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-[10px] font-bold tracking-widest uppercase mb-8 text-brand-orange animate-pulse">
                Coming Soon
             </div>
             <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
                We are crafting something <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-purple">extraordinary.</span>
             </h2>
             <p className="text-gray-400 max-w-xl mx-auto mb-12 text-lg leading-relaxed">
                This page is currently under construction. We are working hard to bring you a detailed breakdown of our services and offerings.
             </p>
             <Link to="/contact" className="inline-flex px-8 py-4 rounded-full bg-white text-black font-bold hover:bg-gray-200 transition-all hover:scale-105 items-center gap-2 group shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                Contact Us In The Meantime <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
             </Link>
         </div>
      </section>
    </>
  );
};