
import React from 'react';
import { MousePointer2, Plus, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CultureScroll } from '../components/CultureScroll';
import { WorkProcess } from '../components/WorkProcess';
import { StatsScroll } from '../components/StatsScroll';
import { VerticalTestimonials } from '../components/VerticalTestimonials';

const STATIC_CONFIG = {
    hero: {
        pill: "Design studio for AI, SaaS & tech startups",
        title_line1: "Good design",
        title_line2: "makes life better.",
        description: "We design delightful experiences that make life simpler and more enjoyable. Our team is a collective of creative minds obsessed with quality.",
        cta_text: "Book 1:1 Meeting",
        cta_link: "https://calendly.com/shehryar-infobytes/30min",
        secondary_text: "Got an idea? Let's shape it."
    },
    team: [
        { name: "Ali-Dah", role: "Design Lead", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=600&fit=crop&q=80", span: "col-span-1" },
        { name: "Schuith", role: "Tech Lead", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&h=600&fit=crop&q=80", span: "col-span-1" },
        { name: "Ben", role: "Strategy", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop&q=80", span: "col-span-1" },
        { name: "Ollie", role: "Creative Dir.", image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=800&h=800&fit=crop&q=80", span: "col-span-2 row-span-2" },
        { name: "You?", role: "Join the Team", image: "", span: "col-span-1", isHiring: true }
    ],
    impact: {
        label: "We're a product design & AI studio built for real-world impact.",
        content: "We help teams design smarter, scale faster, and deliver better digital experiences — without the fluff. Clarity, speed, and long-term value. Whether you're building your first MVP or optimizing a complex SaaS, our work wraps around your business goals — not the other way around."
    },
    culture_images: [
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80"
    ],
    stats: [
      { id: 1, value: "2016", label: "Founded, 8 Years of experience", theme: "orange", x: -30, y: -25, mx: 0, my: -32 },
      { id: 2, value: "150+", label: "In product launches", theme: "white", x: -12, y: -35, mx: -5, my: -20 },
      { id: 3, value: "$1.35B", label: "Startup funding raised", theme: "purple", x: 5, y: -5, mx: 5, my: -8 },
      { id: 4, value: "13K+", label: "Active startups", theme: "white", x: -25, y: 15, mx: -5, my: 8 },
      { id: 5, value: "254+", label: "Team Members", theme: "orange", x: 30, y: -15, mx: 5, my: 20 },
      { id: 6, value: "25K+", label: "Funds and syndicates", theme: "purple", x: 20, y: 25, mx: 0, "my": 32 }
    ]
};

export const AboutPage: React.FC = () => {
  return (
    <>
    <div className="bg-black min-h-screen pt-32 pb-20 relative overflow-hidden flex flex-col justify-center">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-purple/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-orange/5 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />

       <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">
          {/* Left Content */}
          <div className="flex flex-col items-start lg:pr-6 sticky top-32">
             <div className="inline-flex items-center gap-2 border border-white/10 rounded-full px-4 py-1.5 mb-8 bg-white/5 backdrop-blur-sm animate-fade-in">
                <Plus className="w-3 h-3 text-brand-orange" />
                <span className="text-xs font-bold tracking-wide text-gray-300 uppercase">{STATIC_CONFIG.hero.pill}</span>
             </div>
             
             <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6 leading-[1.1] tracking-tight animate-slide-up-fade">
                {STATIC_CONFIG.hero.title_line1} <br />
                {STATIC_CONFIG.hero.title_line2}
             </h1>
             
             <p className="text-gray-400 text-lg md:text-xl max-w-lg mb-12 leading-relaxed animate-slide-up-fade" style={{ animationDelay: '100ms' }}>
                {STATIC_CONFIG.hero.description}
             </p>
             
             <div className="flex flex-col sm:flex-row items-center gap-8 animate-slide-up-fade" style={{ animationDelay: '200ms' }}>
                <a 
                  href={STATIC_CONFIG.hero.cta_link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="px-8 py-4 bg-white text-black rounded-full font-bold text-base hover:bg-gray-200 transition-transform hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                >
                   {STATIC_CONFIG.hero.cta_text}
                </a>
                
                <div className="flex items-center gap-3 text-white group cursor-pointer">
                   <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-brand-orange transition-colors border border-white/5">
                      <MousePointer2 className="w-5 h-5" />
                   </div>
                   <span className="font-medium text-sm md:text-base">{STATIC_CONFIG.hero.secondary_text}</span>
                </div>
             </div>
          </div>

          {/* Right Grid - The Gallery */}
          <div className="grid grid-cols-3 gap-3 auto-rows-min animate-fade-in" style={{ animationDelay: '300ms' }}>
             {STATIC_CONFIG.team.map((member: any, idx: number) => (
                member.isHiring ? (
                  // Hiring Card
                  <Link 
                    key={idx}
                    to="/contact"
                    className={`relative group overflow-hidden rounded-3xl border border-white/10 bg-[#111] ${member.span} aspect-square flex flex-col items-center justify-center hover:bg-[#161616] transition-colors cursor-pointer`}
                  >
                     <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform group-hover:border-brand-orange">
                        <Plus className="w-5 h-5 text-gray-400 group-hover:text-brand-orange transition-colors" />
                     </div>
                     <span className="text-white font-bold text-sm">Join Us</span>
                     <span className="text-gray-500 text-xs mt-1">We are hiring</span>
                  </Link>
                ) : (
                  // Team Member Card
                  <div 
                    key={idx} 
                    className={`relative group overflow-hidden rounded-3xl border border-white/10 bg-[#1a1a1a] ${member.span} ${member.span && member.span.includes('row-span-2') ? 'aspect-square' : 'aspect-square'}`}
                  >
                     <img 
                        src={member.image} 
                        alt={member.name} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0 opacity-90 group-hover:opacity-100" 
                     />
                     
                     {/* Overlay Gradient (Subtle) for readability of text always present */}
                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>

                     {/* Bottom Blur Overlay (On Hover) */}
                     <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent backdrop-blur-[4px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none"></div>
                     
                     {/* LinkedIn Overlay - Bottom Right */}
                     {member.linkedin && (
                       <a 
                         href={member.linkedin}
                         target="_blank"
                         rel="noopener noreferrer"
                         className="absolute bottom-3 right-3 md:bottom-4 md:right-4 w-8 h-8 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center shadow-xl translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-30 hover:bg-gray-200 hover:scale-110"
                       >
                          <Linkedin className="w-3.5 h-3.5 md:w-4 md:h-4 text-black" />
                       </a>
                     )}

                     {/* Pill Label */}
                     <div className="absolute bottom-3 left-3 md:bottom-4 md:left-4 px-3 py-1.5 md:px-4 md:py-2 bg-[#1a1a1a] rounded-full flex items-center gap-2.5 shadow-lg border border-white/5 transition-transform duration-300 group-hover:translate-y-[-2px] z-30">
                        <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]"></div>
                        <span className="text-[10px] md:text-xs font-bold text-white tracking-wide">{member.name}</span>
                     </div>
                  </div>
                )
             ))}
          </div>
       </div>
    </div>
    
    {/* Impact Statement Section */}
    <section className="bg-black py-20 md:py-32 px-6">
       <div className="max-w-[1200px] mx-auto">
          <div className="text-gray-500 text-sm md:text-base font-medium mb-8 flex items-center gap-3">
             <span className="w-5 h-[1px] bg-gray-600"></span>
             {STATIC_CONFIG.impact.label}
          </div>
          <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-[1.25] tracking-tight font-medium max-w-6xl">
             {STATIC_CONFIG.impact.content}
          </p>
       </div>
    </section>

    {/* Infinite Horizontal Scroll Section */}
    <CultureScroll images={STATIC_CONFIG.culture_images} />
    
    {/* Work Process Section */}
    <WorkProcess />

    {/* Stats Scroll Section */}
    <StatsScroll stats={STATIC_CONFIG.stats} />

    {/* Vertical Testimonials Section */}
    <VerticalTestimonials />
    </>
  );
};
