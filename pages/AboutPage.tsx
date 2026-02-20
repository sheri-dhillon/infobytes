
import React from 'react';
import { ArrowUpRight, Linkedin, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { HeroHeading } from '../components/ui/HeroHeading';
import { CultureScroll } from '../components/CultureScroll';
import { WorkProcess } from '../components/WorkProcess';
import { StatsScroll } from '../components/StatsScroll';
import { VerticalTestimonials } from '../components/VerticalTestimonials';

const STATIC_CONFIG = {
    hero: {
        title_line1: "The human engine behind",
        title_line2: "your brand's retention.",
        description: "We are a boutique team of strategists, designers, and engineers obsessed with one thing: attributed revenue. At INFOBYTES, we don't just send emails; we architect full-lifecycle ecosystems that turn customer acquisition into long-term compounding growth.",
        cta_text: "Meet the Strategists",
        cta_link: "https://calendly.com/shehryar-infobytes/30min",
    },
    team: [
        { name: "Ali-Dah", role: "Lead Lifecycle Designer", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=600&fit=crop&q=80", linkedin: "https://linkedin.com/in/" },
        { name: "Schuith", role: "Technical Solutions Architect", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&h=600&fit=crop&q=80", linkedin: "https://linkedin.com/in/" },
        { name: "Ben", role: "Head of Retention Strategy", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop&q=80", linkedin: "https://linkedin.com/in/" },
        { name: "Ollie", role: "Creative Director", image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=800&h=800&fit=crop&q=80", linkedin: "https://linkedin.com/in/" },
    ],
    impact: {
        label: "We are a high-performance CRM & Retention engine built for eCommerce scale.",
        content: "We help brands grow smarter, retain longer, and extract more value from every customer — without the fluff. Data, strategy, and attributed revenue. Whether you're scaling a 7-figure D2C brand or optimizing a global enterprise lifecycle, our framework wraps around your growth goals — not the other way around."
    },
    culture_images: [
      "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=800&q=80", // Skincare products premium
      "https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=800&q=80", // Business strategy meeting
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=80", // E-commerce packaging
      "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=800&q=80", // Woman working on laptop data
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80", // Premium product shoe
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=800&q=80", // Team at whiteboard
    ],
    stats: [
      { id: 1, value: "8+", label: "Years Niche Experience", theme: "orange", x: -30, y: -25, mx: 0, my: -32 },
      { id: 2, value: "450+", label: "Custom Flows Built", theme: "white", x: -12, y: -35, mx: -5, my: -20 },
      { id: 3, value: "$120M+", label: "Attributed Revenue", theme: "purple", x: 5, y: -5, mx: 5, my: -8 },
      { id: 4, value: "250+", label: "Retention Audits", theme: "white", x: -25, y: 15, mx: -5, my: 8 },
      { id: 5, value: "15+", label: "Core Specialists", theme: "orange", x: 30, y: -15, mx: 5, my: 20 },
      { id: 6, value: "1.2M+", label: "Emails Optimized", theme: "purple", x: 20, y: 25, mx: 0, my: 32 }
    ]
};

export const AboutPage: React.FC = () => {
  return (
    <>
    {/* Hero Section - Centered Professional Layout */}
    <section className="relative min-h-[100dvh] w-full flex flex-col bg-brand-dark overflow-hidden">
      
      {/* Background Fluid Gradient */}
      <div className="absolute top-[-10%] right-[-10%] w-[90vw] md:w-[60vw] h-[60vh] md:h-[100vh] bg-gradient-to-bl from-blue-500 via-purple-600 to-transparent opacity-40 blur-[80px] md:blur-[120px] rounded-full pointer-events-none mix-blend-screen animate-pulse duration-[5000ms]" />
      <div className="absolute bottom-0 left-0 w-[60vw] md:w-[40vw] h-[60vw] md:h-[40vw] bg-purple-900/20 blur-[100px] md:blur-[150px] rounded-full pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-8 flex flex-col flex-grow justify-center pt-40 md:pt-52 pb-16">

        {/* Hero Heading - Centered */}
        <div className="w-full max-w-[56rem] lg:max-w-[62rem] mx-auto text-center">
          <HeroHeading
            pre={STATIC_CONFIG.hero.title_line1}
            main={STATIC_CONFIG.hero.title_line2}
            align="center"
            className="mb-6 animate-slide-up-fade"
          />
        </div>

        {/* Description */}
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto text-center mb-10 leading-relaxed animate-slide-up-fade" style={{ animationDelay: '200ms' }}>
          {STATIC_CONFIG.hero.description}
        </p>

        {/* CTA Button - Matching Home Page Style */}
        <div className="w-full flex justify-center mb-16 md:mb-20 relative z-30 animate-fade-in" style={{ animationDelay: '400ms' }}>
          <a
            href={STATIC_CONFIG.hero.cta_link}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative px-5 py-2.5 md:px-7 md:py-3.5 bg-gradient-to-r from-brand-orange to-brand-purple text-white rounded-full flex items-center gap-3 md:gap-4 transition-all hover:scale-105 shadow-[0_0_30px_rgba(255,107,74,0.3)] hover:shadow-[0_0_40px_rgba(185,109,243,0.4)]"
          >
            <span className="font-bold text-sm md:text-base">{STATIC_CONFIG.hero.cta_text}</span>
            <div className="w-6 h-6 md:w-8 md:h-8 bg-white rounded-full flex items-center justify-center transition-transform group-hover:rotate-45">
              <ArrowUpRight className="w-3 h-3 md:w-4 md:h-4 text-black" />
            </div>
          </a>
        </div>

        {/* Team Grid - Clean Horizontal Layout */}
        <div className="w-full max-w-5xl mx-auto animate-fade-in" style={{ animationDelay: '600ms' }}>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-5">
            {STATIC_CONFIG.team.map((member: any, idx: number) => (
              <div 
                key={idx} 
                className="relative group overflow-hidden rounded-2xl md:rounded-3xl border border-white/10 bg-[#1a1a1a] aspect-[3/4]"
              >
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0 opacity-90 group-hover:opacity-100" 
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                {/* Name & Role */}
                <div className="absolute bottom-4 left-4 z-20">
                  <h3 className="text-white font-bold text-sm md:text-base">{member.name}</h3>
                  <p className="text-gray-400 text-xs md:text-sm">{member.role}</p>
                </div>

                {/* LinkedIn Icon - Bottom Right on Hover */}
                {member.linkedin && (
                  <a 
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-4 right-4 w-9 h-9 bg-white rounded-full flex items-center justify-center translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out hover:scale-110 shadow-lg z-30"
                  >
                    <Linkedin className="w-4 h-4 text-[#0A66C2]" />
                  </a>
                )}
              </div>
            ))}

            {/* Hiring Card */}
            <Link 
              to="/careers"
              className="relative group overflow-hidden rounded-2xl md:rounded-3xl border border-white/10 bg-[#111] aspect-[3/4] flex flex-col items-center justify-center hover:bg-[#161616] hover:border-white/20 transition-all cursor-pointer"
            >
              <div className="w-14 h-14 rounded-full border-2 border-dashed border-white/20 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:border-brand-orange transition-all duration-300">
                <Plus className="w-6 h-6 text-gray-400 group-hover:text-brand-orange transition-colors" />
              </div>
              <span className="text-white font-bold text-base mb-1">Join Us</span>
              <span className="text-gray-500 text-xs">We're hiring</span>
              <div className="absolute bottom-4 left-4 right-4 flex justify-center">
                <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-[10px] font-medium">Open Positions</span>
              </div>
            </Link>
          </div>
        </div>

      </div>
    </section>
    
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

    {/* Organization & Person Schema for SEO */}
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "INFOBYTES",
          "url": "https://infobytes.io",
          "logo": "https://infobytes.io/logo.png",
          "description": "A boutique retention marketing agency specializing in eCommerce email, SMS, and lifecycle strategy.",
          "sameAs": [
            "https://linkedin.com/company/infobytes",
            "https://instagram.com/infobytes.io",
            "https://twitter.com/infobytes"
          ],
          "employee": [
            {
              "@type": "Person",
              "name": "Ben",
              "jobTitle": "Head of Retention Strategy"
            },
            {
              "@type": "Person",
              "name": "Ali-Dah",
              "jobTitle": "Lead Lifecycle Designer"
            },
            {
              "@type": "Person",
              "name": "Schuith",
              "jobTitle": "Technical Solutions Architect"
            },
            {
              "@type": "Person",
              "name": "Ollie",
              "jobTitle": "Creative Director"
            }
          ]
        })
      }}
    />
    </>
  );
};
